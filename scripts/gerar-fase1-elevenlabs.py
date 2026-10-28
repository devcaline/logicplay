"""Gera e integra a fase 1 (5–8 ou 9–12) com Jessica / Eleven v3.

Requer ELEVENLABS_API_KEY no ambiente, Node.js e ffmpeg no PATH.
python scripts/gerar-fase1-elevenlabs.py --install
python scripts/gerar-fase1-elevenlabs.py --age-group 9-12 --install

Reutiliza gerações idênticas do cache e só instala após obter a fase completa.
As gravações anteriores são copiadas para .local/pipo-voice/backups/.
"""

import argparse
from datetime import datetime
import hashlib
import json
import os
from pathlib import Path
import re
import shutil
import subprocess
import urllib.error
import urllib.request

ROOT = Path(__file__).resolve().parents[1]
VOICE = 'cgSgspJ2msm6clMCkdW9'
MODEL = 'eleven_v3'
PREVIEW_IDS = ['f1k.intro.1', 'f1k.intro.2', 'f1k.mission',
               'f1k.hint.wrongInside', 'f1k.success', 'f1k.complete']


def direction(line):
    identifier, text = line['id'], line['text']
    if identifier.startswith('f1a.'):
        text = re.sub(r'\bx\b', 'xis', text)
        for symbol, reading in [('≤', ' menor ou igual a '), ('<', ' menor que '), ('>', ' maior que '), ('·', ' vezes ')]:
            text = text.replace(symbol, reading)
        if '.praise.' in identifier or identifier.endswith(('.success', '.complete', '.tut.done')):
            return '[happy] ' + text, 1.0
        if '.hint.' in identifier:
            return '[encouraging] ' + text, 0.98
        if identifier.endswith('.intro.1'):
            return '[warmly] ' + text, 0.98
        if identifier.endswith(('.intro.2', '.tut.start')):
            return '[curious] ' + text, 0.98
        return '[gently] ' + text, 0.96
    if identifier == 'f1k.intro.1':
        return '[sweetly] ' + text.replace('Você pode', '[curious] Você pode'), 0.98
    if identifier == 'f1k.intro.2':
        return '[gently] ' + text.replace('Vamos descobrir', '[curious] Vamos descobrir'), 0.96
    if identifier == 'f1k.success':
        return '[happy] ' + text, 1.0
    if identifier == 'f1k.complete':
        return '[happy] ' + text.replace('Um conjunto é', '[warmly] Um conjunto é'), 0.98
    if identifier.startswith('f1k.item.'):
        return '[cheerful] ' + text, 1.0
    if identifier == 'f1k.mission':
        return '[gently] ' + text, 0.96
    return '[encouraging] ' + text, 0.98


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--install', action='store_true', help='Substitui os áudios desta fase no jogo.')
    parser.add_argument('--age-group', choices=['5-8', '9-12'], default='5-8')
    parser.add_argument('--dry-run', action='store_true', help='Mostra o catálogo, sem chamar a API.')
    args = parser.parse_args()
    key = os.environ.get('ELEVENLABS_API_KEY')
    if not key and not args.dry_run:
        raise SystemExit('Defina ELEVENLABS_API_KEY no ambiente do processo.')
    for tool in ['node', 'ffmpeg']:
        if not shutil.which(tool):
            raise SystemExit(f'{tool} precisa estar no PATH.')
    export = """
      import c from 'CHALLENGE_PATH';
      console.log(JSON.stringify([
        ...c.intro, c.mission,
        ...(c.items ?? []).map(i => ({id:i.narrationId, text:i.name+'!'})),
        ...(c.tutorial ? [c.tutorial.start, ...c.tutorial.parts.map(p => ({id:p.lineId ?? p.id, text:p.text})),
          c.tutorial.reading, c.tutorial.build, c.tutorial.done] : []),
        ...Object.values(c.feedback).flatMap(l => Array.isArray(l) ? l : [{...l, text:l.title ? l.title+' '+l.text : l.text}]),
        ...new Map((c.roundsCatalog?.() ?? []).filter(r => r.hint)
          .map(r => [r.hintId, {id:r.hintId, text:r.hint}])).values(),
        {...c.complete, text:c.complete.title+' '+c.complete.text},
      ].map(({id,text}) => ({id,text}))));
    """
    challenge_name = 'forest-1-kids' if args.age_group == '5-8' else 'forest-1-tween'
    export = export.replace('CHALLENGE_PATH', f'./src/data/forest/{challenge_name}.js')
    result = subprocess.run(['node', '--input-type=module', '-e', export], cwd=ROOT,
                            capture_output=True, encoding='utf-8', check=True)
    lines = json.loads(result.stdout)
    assert lines and all(line.get('id') and line.get('text') for line in lines)
    assert len({line['id'] for line in lines}) == len(lines)
    if args.dry_run:
        print(json.dumps({'age_group': args.age_group, 'lines': len(lines),
                          'input_characters': sum(len(direction(line)[0]) for line in lines),
                          'catalog': lines}, ensure_ascii=True, indent=2))
        return
    suffix = '' if args.age_group == '5-8' else '-9-12'
    cache = ROOT / '.local' / 'pipo-voice' / ('eleven-jessica-sweet' + suffix)
    cache.mkdir(parents=True, exist_ok=True)
    outputs, records = {}, []
    for index, line in enumerate(lines, 1):
        text, speed = direction(line)
        settings = {'stability': 0.5, 'similarity_boost': 0.75, 'speed': speed}
        body = {'text': text, 'model_id': MODEL, 'language_code': 'pt', 'voice_settings': settings}
        digest = hashlib.sha256(json.dumps({'voice_id': VOICE, **body}, sort_keys=True).encode()).hexdigest()[:16]
        output = cache / f"{line['id']}-{digest}.mp3"
        metadata_file = output.with_suffix('.json')
        if output.exists() and metadata_file.exists():
            record = json.loads(metadata_file.read_text(encoding='utf-8'))
            print(f"[{index}/{len(lines)}] {line['id']} (cache)", flush=True)
        else:
            print(f"[{index}/{len(lines)}] {line['id']} (ElevenLabs)", flush=True)
            request = urllib.request.Request(
                f'https://api.elevenlabs.io/v1/text-to-speech/{VOICE}?output_format=mp3_44100_128',
                data=json.dumps(body).encode('utf-8'), method='POST',
                headers={'xi-api-key': key, 'Content-Type': 'application/json', 'Accept': 'audio/mpeg'},
            )
            try:
                with urllib.request.urlopen(request, timeout=120) as response:
                    audio = response.read()
                    if 'audio' not in response.headers.get('Content-Type', '') or len(audio) < 1000:
                        raise RuntimeError('A API não retornou áudio válido.')
                    record = {**line, 'synthesis_text': text, 'voice_id': VOICE, 'voice_name': 'Jessica',
                              'model_id': MODEL, 'language_code': 'pt', 'voice_settings': settings,
                              'input_characters': len(text), 'bytes': len(audio),
                              'character_cost': response.headers.get('character-cost'),
                              'request_id': response.headers.get('request-id')}
            except urllib.error.HTTPError as error:
                message = error.read().decode('utf-8', errors='replace').replace(key, '[REDACTED]')
                raise SystemExit(f'ElevenLabs HTTP {error.code}: {message[:1800]}') from None
            output.write_bytes(audio)
            metadata_file.write_text(json.dumps(record, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
        # Decodifica cada arquivo antes de permitir a instalação da fase.
        subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-i', str(output),
                        '-f', 'null', '-'], check=True)
        outputs[line['id']] = output
        records.append(record)

    preview_dir = ROOT / 'docs' / 'audio'
    preview_dir.mkdir(parents=True, exist_ok=True)
    preview_ids = PREVIEW_IDS if args.age_group == '5-8' else [
        'f1a.intro.1', 'f1a.tut.element', 'f1a.tut.rule', 'f1a.mission', 'f1a.praise.1', 'f1a.complete']
    preview_name = 'pipo-eleven-fase1-sweet' + suffix
    command = ['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y']
    for identifier in preview_ids:
        command.extend(['-i', str(outputs[identifier])])
    filters = [f'[{i}:a]aformat=sample_rates=44100:channel_layouts=mono,apad=pad_dur=0.5[a{i}]'
               for i in range(len(preview_ids))]
    filters.append(''.join(f'[a{i}]' for i in range(len(preview_ids)))
                   + f'concat=n={len(preview_ids)}:v=0:a=1[out]')
    command.extend(['-filter_complex', ';'.join(filters), '-map', '[out]', '-codec:a', 'libmp3lame',
                    '-b:a', '128k', str(preview_dir / (preview_name + '.mp3'))])
    subprocess.run(command, check=True)
    if args.install:
        voice_dir = ROOT / 'src' / 'assets' / 'voz'
        backup = ROOT / '.local' / 'pipo-voice' / 'backups' / datetime.now().strftime('%Y%m%d-%H%M%S-%f')
        backup.mkdir(parents=True, exist_ok=False)
        voice_dir.mkdir(parents=True, exist_ok=True)
        for identifier, source in outputs.items():
            target = voice_dir / f'{identifier}.mp3'
            if target.exists():
                shutil.copy2(target, backup / target.name)
            shutil.copy2(source, target)
        print(f'{len(lines)} áudios instalados na fase 1 ({args.age_group}); cópia anterior preservada em .local/.', flush=True)
    manifest = {'provider': 'ElevenLabs', 'voice': 'Jessica', 'model': MODEL, 'age_group': args.age_group,
                'installed': args.install, 'lines': records,
                'character_cost_total': sum(int(record['character_cost']) for record in records
                                            if record['character_cost'] is not None)}
    (preview_dir / (preview_name + '.json')).write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
    print(f"Créditos das {len(lines)} gravações: {manifest['character_cost_total']}", flush=True)


if __name__ == '__main__':
    main()
