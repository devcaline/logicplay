"""Gera amostras do Pipo pela demonstração pública gratuita do Qwen3-TTS.

pip install gradio_client==2.7.2
python scripts/experimentar-voz-qwen.py --variant natural

Requer Node.js e ffmpeg no PATH. A demonstração pode ter filas e cotas;
não é um serviço garantido para uso em produção. Envia apenas o texto e
a descrição da voz; não utiliza clonagem de voz de uma pessoa real.
"""

import argparse
import json
from pathlib import Path
import shutil
import subprocess

from gradio_client import Client

ROOT = Path(__file__).resolve().parents[1]
DESCRIPTIONS = {
    'natural': (
        'A native Brazilian Portuguese young adult male voice, warm and bright, '
        'friendly and curious. Natural conversational delivery with relaxed rhythm, '
        'clear Brazilian pronunciation and subtle playful energy, as a friendly '
        'animated companion talking to one child. Medium pitch, soft timbre, gentle '
        'smile in the voice. Human and believable, no announcer delivery, no '
        'exaggerated cartoon squeak.'
    ),
    'leve': (
        'Native Brazilian Portuguese, neutral southeastern Brazilian accent. '
        'A cheerful youthful male animated companion with a light clear voice, '
        'soft rounded timbre, gentle smile and lively curious intonation. Speak '
        'intimately and naturally to one child, like a kind older brother inviting '
        'them to play. Moderate conversational pace with natural pauses and subtle '
        'emotion. The delivery is human, warm and spontaneous. Keep the voice '
        'believable with a comfortable medium-high register, never nasal or shrill.'
    ),
}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--variant', choices=DESCRIPTIONS, default='natural')
    args = parser.parse_args()
    for tool in ['node', 'ffmpeg']:
        if not shutil.which(tool):
            raise SystemExit(f'{tool} precisa estar no PATH.')
    result = subprocess.run(
        ['node', '--input-type=module', '-e',
         "import c from './src/data/forest/forest-1-kids.js'; console.log(JSON.stringify(c.intro[0]));"],
        cwd=ROOT, capture_output=True, encoding='utf-8', check=True,
    )
    line = json.loads(result.stdout)
    client = Client('Qwen/Qwen3-TTS', verbose=False)
    audio, status = client.predict(
        text=line['text'], language='Portuguese',
        voice_description=DESCRIPTIONS[args.variant], api_name='/generate_voice_design',
    )
    if not audio:
        raise RuntimeError(status)
    output = ROOT / 'docs' / 'audio' / f'pipo-qwen-{args.variant}.mp3'
    subprocess.run(
        ['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', '-i', str(audio),
         '-af', 'loudnorm=I=-18:TP=-2:LRA=7', '-codec:a', 'libmp3lame',
         '-b:a', '128k', str(output)], check=True,
    )
    print(f'{status}\n{output}')


if __name__ == '__main__':
    main()
