# Amostra da voz do Pipo

## Fase 1 de 9–12 anos: Jessica

`pipo-eleven-fase1-sweet-9-12.mp3` reúne uma prévia da fase dos conjuntos
numéricos. As 47 gravações incluem introduções, missão, todas as partes do
pergaminho/tutorial, três elogios, conclusão e 30 dicas diferentes. As dicas
cobrem as 41 variantes possíveis dos exercícios e do aquecimento, incluindo
as dificuldades Fácil, Médio e Difícil. Variantes com a mesma dica compartilham
o mesmo áudio; seus identificadores começam com `f1a.hint.`.

Esta geração consumiu **4.092 créditos**, conforme os cabeçalhos da API.

A direção mantém Jessica acolhedora e curiosa, com explicações calmas e elogios
mais alegres. Para a pronúncia, o texto enviado à síntese expande `x` para
“xis”, `<` para “menor que”, `≤` para “menor ou igual a” e `·` para “vezes”.
A notação mostrada ao jogador permanece igual. A última peça do tutorial
espera o fim da narração antes de passar automaticamente à leitura completa.

Para gerar e instalar esta faixa:

```powershell
python scripts/gerar-fase1-elevenlabs.py --age-group 9-12 --install
```

Defina `ELEVENLABS_API_KEY` apenas no ambiente do processo. O cache fica em
`.local/pipo-voice/eleven-jessica-sweet-9-12/`. Os parâmetros e custos da API
estão em `pipo-eleven-fase1-sweet-9-12.json`. O jogo usa os arquivos prontos,
sem chamar a ElevenLabs durante a partida.

## Versão atual da primeira fase de 5–8 anos: Jessica doce e expressiva

A primeira fase de 5–8 anos usa agora **Jessica / Eleven v3** nas 16 falas:
introduções, missão, seis nomes de animais, dicas, acerto e conclusão.
O arquivo `pipo-eleven-fase1-sweet.mp3` reúne os principais momentos para ouvir
fora do jogo. `pipo-eleven-fase1-sweet.json` registra todos os textos,
direções, parâmetros e créditos informados pela API.

Direção pretendida: jovem, doce e acolhedora, com curiosidade nas explicações,
incentivo nas dicas e alegria nas comemorações. As audio tags (`sweetly`,
`gently`, `curious`, `encouraging`, `happy`, `cheerful`, `warmly`) são enviadas
somente ao gerador; não aparecem nos textos do jogo. Estabilidade 0.5,
velocidade entre 0.96 e 1.0, sem alterar a altura da voz. Os arquivos individuais
são os MP3 originais da API, a 44.1 kHz e 128 kbps.

Para gerar e instalar novamente, defina `ELEVENLABS_API_KEY` apenas no ambiente
do processo e execute `python scripts/gerar-fase1-elevenlabs.py --install`.
Requer Python, Node.js e ffmpeg. Gerações idênticas são reutilizadas de
`.local/pipo-voice/eleven-jessica-sweet/`, sem nova chamada paga. A versão anterior
dos arquivos é preservada em `.local/pipo-voice/backups/` antes da substituição.
O jogo reproduz os arquivos prontos e não usa a chave ou a API durante a partida.

## Amostras anteriores com ElevenLabs

`pipo-eleven-jessica-acolhedora.mp3` é o teste seguinte, solicitado com voz
jovem, acolhedora e emoção discreta: Jessica, `eleven_v3`, idioma `pt`,
direção `[warmly]`, estabilidade 0.5 e velocidade 0.96. Consumiu 110 créditos
conforme a API. O arquivo conserva o áudio original gerado, sem alteração
posterior de pitch. Jessica é uma voz padrão originalmente inglesa;
a adequação da pronúncia e da interpretação deve ser avaliada ouvindo.

`pipo-eleven-will.mp3` e `pipo-eleven-liam.mp3` contêm a primeira fala da fase,
gerada com `eleven_v3` e idioma `pt`. São duas vozes padrão de perfil jovem:
Will (descontraída) e Liam (energética). As vozes são originalmente inglesas;
pronúncia brasileira e adequação ao Pipo ainda precisam de avaliação auditiva.
O áudio é o MP3 original da API, sem alteração de pitch ou velocidade.

Cada geração consumiu 101 créditos, conforme o cabeçalho `character-cost`
da API: 202 no total. Os arquivos JSON de mesmo nome registram os parâmetros.
A tentativa com a voz brasileira Victor Pinho foi recusada com HTTP 402:
o plano gratuito não permite vozes da biblioteca pela API. Nenhum áudio foi
gerado nessa tentativa.

Para repetir o teste, use `scripts/experimentar-voz-elevenlabs.py` com a chave
apenas na variável de ambiente `ELEVENLABS_API_KEY`. Nenhuma chave é gravada
no script ou nos arquivos de saída. O script recusa sobrescrever uma amostra
existente sem `--force`. Os testes ainda não substituem as falas da fase.

Áudios gerados no plano gratuito estão sujeitos a uso não comercial e atribuição,
conforme os [termos do provedor](https://elevenlabs.io/docs/help-center/legal/can-i-publish-the-content-i-generate-on-the-platform).

## Novas opções após avaliação do Kokoro

A amostra do Kokoro foi rejeitada por falta de naturalidade. Os arquivos
`pipo-qwen-natural.mp3` e `pipo-qwen-leve.mp3` são novos testes da primeira fala,
gerados com [Qwen3-TTS-12Hz-1.7B-VoiceDesign](https://huggingface.co/Qwen/Qwen3-TTS-12Hz-1.7B-VoiceDesign)
(Apache 2.0) pela [demonstração pública oficial](https://huggingface.co/spaces/Qwen/Qwen3-TTS).
Ambos usam `language=Portuguese` e uma descrição de voz masculina brasileira;
não há alteração de pitch ou velocidade depois da geração. O MP3 recebe apenas
normalização de volume. As descrições estão em `scripts/experimentar-voz-qwen.py`.

Esses testes ainda não substituem as falas da fase. A demonstração foi usada sem
cobrança, mas tem cotas e disponibilidade variável; o jogo não deve depender dela
em tempo real. A voz pode ser gerada antecipadamente e distribuída como arquivo.
O script requer `gradio_client==2.7.2`, Node.js e ffmpeg. Uma nova execução pode
produzir timbre diferente, pois o serviço não expõe uma semente fixa neste endpoint.

## Primeira amostra: Kokoro

Fase: **Conhecendo os Grupos**, Floresta dos Conjuntos, faixa de **5 a 8 anos**.

Ouça `pipo-fase1-demo.mp3` para a antiga sequência de introdução, missão, dica,
acerto e conclusão com Kokoro. As gravações individuais dessa versão foram
substituídas pela Jessica em `src/assets/voz/`; uma cópia anterior foi preservada
em `.local/pipo-voice/backups/`. Os nomes dos animais usam identificadores próprios
desta fase. As outras fases continuam com a configuração anterior.

Modelo: [Kokoro-82M v1.0](https://huggingface.co/hexgrad/Kokoro-82M),
licença Apache 2.0. Voz: **pf_dora**, português brasileiro.
Execução local em CPU por [kokoro-onnx](https://github.com/thewh1teagle/kokoro-onnx),
licença MIT. A API de terceiros não é utilizada. Os arquivos distribuídos
com o jogo dispensam executar o modelo no dispositivo do jogador.

Direção pretendida: voz leve e acolhedora, explicações com ritmo calmo
(`speed=0.96`) e acerto um pouco mais ágil (`speed=1.0`). A altura natural
da voz foi preservada. O modelo não oferece direção emocional detalhada;
a adequação da interpretação deve ser avaliada ouvindo a amostra.
MP3 mono, 24 kHz, 96 kbps, normalização de volume com ffmpeg.

## Reproduzir o teste antigo com Kokoro no Windows

Os comandos abaixo substituem a voz atual da primeira fase pela versão Kokoro.

Requer Python 3.12, Node.js e ffmpeg no PATH. Execute na raiz do projeto:

```powershell
python -m venv .local/pipo-voice/venv
.local/pipo-voice/venv/Scripts/python -m pip install -r scripts/voz-requirements.txt
.local/pipo-voice/venv/Scripts/python scripts/gerar-voz-pipo.py --force
npm run roteiro
```

O primeiro uso baixa aproximadamente 354 MB de modelo e vozes. Os downloads
e o ambiente Python ficam em `.local/`, ignorado pelo Git. A geração usa
os recursos do computador, sem cobrança por fala. Para comparar com uma voz
masculina, use `--voice pm_alex --force`; isso substitui a amostra desta fase.

`pipo-fase1-manifest.json` registra os textos, voz, velocidade, duração e
tamanho de cada arquivo. Depois de editar os textos da fase, gere novamente
para que as gravações correspondam ao conteúdo atual.
