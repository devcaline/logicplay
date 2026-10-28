"""Gera a amostra da fase 1 com Kokoro local, sem serviço pago.

Windows / PowerShell:
  python -m venv .local/pipo-voice/venv
  .local/pipo-voice/venv/Scripts/python -m pip install -r scripts/voz-requirements.txt
  .local/pipo-voice/venv/Scripts/python scripts/gerar-voz-pipo.py

Requer Node.js e ffmpeg no PATH. Baixa os pesos na primeira execução.
"""

import argparse
import json
from pathlib import Path
import shutil
import subprocess
import urllib.request

import numpy as np
import soundfile as sf
from kokoro_onnx import Kokoro

ROOT = Path(__file__).resolve().parents[1]
CACHE = ROOT / '.local' / 'pipo-voice'
RELEASE = 'https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.1/'


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--voice', default='pf_dora', choices=['pf_dora', 'pm_alex', 'pm_santa'])
    parser.add_argument('--force', action='store_true', help='Substitui os áudios da amostra existente.')
    args = parser.parse_args()
    for tool in ['node', 'ffmpeg']:
        if not shutil.which(tool):
            raise SystemExit(f'Instale {tool} e adicione-o ao PATH.')
    CACHE.mkdir(parents=True, exist_ok=True)
    for name in ['kokoro-v1.0.onnx', 'voices-v1.0.bin']:
        target = CACHE / name
        if not target.exists():
            print(f'Baixando {name}...', flush=True)
            temporary = target.with_suffix('.download')
            urllib.request.urlretrieve(RELEASE + name, temporary)
            temporary.replace(target)

    # Lê o conteúdo atual da fase, sem duplicar os textos no gerador.
    export = """
      import c from './src/data/forest/forest-1-kids.js';
      console.log(JSON.stringify([
        ...c.intro, c.mission,
        ...c.items.map(i => ({id: i.narrationId, text: i.name + '!'})),
        ...Object.values(c.feedback),
        {...c.complete, text: c.complete.title + ' ' + c.complete.text},
      ].map(({id, text}) => ({id, text}))));
    """
    result = subprocess.run(['node', '--input-type=module', '-e', export],
                            cwd=ROOT, capture_output=True, check=True, encoding='utf-8')
    lines = json.loads(result.stdout)
    output = ROOT / 'src' / 'assets' / 'voz'
    output.mkdir(parents=True, exist_ok=True)
    existing = [line['id'] for line in lines if (output / (line['id'] + '.mp3')).exists()]
    if existing and not args.force:
        raise SystemExit('Amostra já existe. Use --force para gerar novamente.')
    kokoro = Kokoro(str(CACHE / 'kokoro-v1.0.onnx'), str(CACHE / 'voices-v1.0.bin'))
    details = []
    preview_parts = []
    preview_ids = {'f1k.intro.1', 'f1k.intro.2', 'f1k.mission',
                   'f1k.hint.wrongInside', 'f1k.success', 'f1k.complete'}

    def encode(source, target):
        subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y',
                        '-i', str(source), '-af', 'loudnorm=I=-18:TP=-2:LRA=7',
                        '-ar', '24000', '-ac', '1', '-codec:a', 'libmp3lame',
                        '-b:a', '96k', str(target)], check=True)

    for index, line in enumerate(lines, 1):
        # Ritmo calmo nas explicações; comemoração um pouco mais ágil.
        speed = 1.0 if line['id'] == 'f1k.success' else 0.96
        print(f"[{index}/{len(lines)}] {line['id']} ({args.voice})", flush=True)
        audio, sample_rate = kokoro.create(line['text'], voice=args.voice,
                                           speed=speed, lang='pt-br')
        audio = np.asarray(audio, dtype=np.float32)
        if not np.isfinite(audio).all() or not np.any(np.abs(audio) > 0.003):
            raise RuntimeError(f"Áudio inválido: {line['id']}")
        # Remove apenas silêncio nas pontas, mantendo uma pequena margem.
        active = np.flatnonzero(np.abs(audio) > 0.003)
        margin = int(sample_rate * 0.08)
        audio = audio[max(0, active[0] - margin):min(len(audio), active[-1] + margin)]
        raw = CACHE / (line['id'] + '.wav')
        sf.write(raw, audio, sample_rate)
        target = output / (line['id'] + '.mp3')
        encode(raw, target)
        details.append({**line, 'voice': args.voice, 'speed': speed,
                        'duration': round(len(audio) / sample_rate, 2),
                        'bytes': target.stat().st_size})
        if line['id'] in preview_ids:
            preview_parts.extend([audio, np.zeros(int(sample_rate * 0.7), dtype=np.float32)])

    preview_dir = ROOT / 'docs' / 'audio'
    preview_dir.mkdir(parents=True, exist_ok=True)
    raw_preview = CACHE / 'pipo-fase1-demo.wav'
    sf.write(raw_preview, np.concatenate(preview_parts), sample_rate)
    encode(raw_preview, preview_dir / 'pipo-fase1-demo.mp3')
    (preview_dir / 'pipo-fase1-manifest.json').write_text(
        json.dumps(details, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(f'Pronto: {len(lines)} falas e docs/audio/pipo-fase1-demo.mp3', flush=True)


if __name__ == '__main__':
    main()
