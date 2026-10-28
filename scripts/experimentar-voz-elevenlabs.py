"""Gera uma amostra curta do Pipo com ElevenLabs.

Requer ELEVENLABS_API_KEY no ambiente do processo. A chave nunca é gravada
nos arquivos de saída. Usa somente a biblioteca padrão do Python.

python scripts/experimentar-voz-elevenlabs.py --voice-id ID --name victor
"""

import argparse
import json
import os
from pathlib import Path
import re
import subprocess
import urllib.error
import urllib.request

ROOT = Path(__file__).resolve().parents[1]


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--voice-id', required=True)
    parser.add_argument('--name', required=True)
    parser.add_argument('--model', default='eleven_v3')
    parser.add_argument('--direction', default='', help='Direção breve em audio tag, por exemplo warmly.')
    parser.add_argument('--speed', type=float, default=1.0)
    parser.add_argument('--force', action='store_true')
    args = parser.parse_args()
    key = os.environ.get('ELEVENLABS_API_KEY')
    if not key:
        raise SystemExit('Defina ELEVENLABS_API_KEY no ambiente do processo.')
    if not re.fullmatch(r'[a-z0-9-]+', args.name):
        raise SystemExit('--name aceita apenas letras minúsculas, números e hífen.')
    if not 0.7 <= args.speed <= 1.2:
        raise SystemExit('--speed deve ficar entre 0.7 e 1.2.')
    if args.direction and not re.fullmatch(r'[A-Za-z ,\-]+', args.direction):
        raise SystemExit('--direction aceita uma descrição curta em inglês, sem colchetes.')
    if args.direction and args.model != 'eleven_v3':
        raise SystemExit('--direction está habilitado neste script apenas para eleven_v3.')
    output = ROOT / 'docs' / 'audio' / f'pipo-eleven-{args.name}.mp3'
    if output.exists() and not args.force:
        raise SystemExit('A amostra já existe. Use --force se quiser gerar novamente.')
    exported = subprocess.run(
        ['node', '--input-type=module', '-e',
         "import c from './src/data/forest/forest-1-kids.js'; console.log(JSON.stringify(c.intro[0]));"],
        cwd=ROOT, capture_output=True, encoding='utf-8', check=True,
    )
    line = json.loads(exported.stdout)
    settings = {'stability': 0.5, 'similarity_boost': 0.75, 'speed': args.speed}
    synthesis_text = f'[{args.direction}] {line["text"]}' if args.direction else line['text']
    body = {'text': synthesis_text, 'model_id': args.model,
            'language_code': 'pt', 'voice_settings': settings}
    request = urllib.request.Request(
        'https://api.elevenlabs.io/v1/text-to-speech/' + args.voice_id
        + '?output_format=mp3_44100_128',
        data=json.dumps(body).encode('utf-8'),
        headers={'xi-api-key': key, 'Content-Type': 'application/json', 'Accept': 'audio/mpeg'},
        method='POST',
    )
    try:
        with urllib.request.urlopen(request, timeout=120) as response:
            audio = response.read()
            mime = response.headers.get('Content-Type', '')
            if 'audio' not in mime or len(audio) < 1000:
                raise RuntimeError('A API não retornou um arquivo de áudio válido.')
            metadata = {
                'provider': 'ElevenLabs', 'voice_id': args.voice_id,
                'model_id': args.model, 'line_id': line['id'], 'text': line['text'],
                'synthesis_text': synthesis_text, 'direction': args.direction,
                'language_code': 'pt', 'voice_settings': settings,
                'input_characters': len(synthesis_text), 'bytes': len(audio),
                'request_id': response.headers.get('request-id'),
                'character_cost': response.headers.get('character-cost'),
            }
    except urllib.error.HTTPError as error:
        # A resposta pode conter dados do provedor; a chave é sempre removida.
        message = error.read().decode('utf-8', errors='replace').replace(key, '[REDACTED]')
        raise SystemExit(f'ElevenLabs HTTP {error.code}: {message[:1800]}') from None
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_bytes(audio)
    output.with_suffix('.json').write_text(
        json.dumps(metadata, ensure_ascii=False, indent=2) + '\n', encoding='utf-8',
    )
    print(json.dumps({'file': str(output), **metadata}, ensure_ascii=False))


if __name__ == '__main__':
    main()
