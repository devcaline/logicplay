# LogicPlay

Jogo educativo de aventura para aprender **conjuntos** e **tabela-verdade**. O jogador explora o
Mundo da Lógica ao lado do **Pipo**, um patinho ciborgue gentil, e restaura a organização do mundo
completando desafios. Feito para crianças a partir de 5 anos, pré-adolescentes e adolescentes.

> Versão 0.1: o Mundo 1 (Floresta dos Conjuntos) completo, com cinco fases jogáveis para a faixa de 5 a 8 anos, e as quatro primeiras fases do Mundo 2 (Laboratório da Verdade).

![Tela inicial do LogicPlay](docs/prints/01-inicio.png)

## Prints

| Escolha da faixa etária | Mapa da aventura |
|---|---|
| ![Escolha da faixa etária](docs/prints/02-faixa-etaria.png) | ![Mapa da aventura](docs/prints/03-mapa.png) |

| Fase 1: introdução | Fase 1: arrastar e soltar |
|---|---|
| ![Introdução da fase 1](docs/prints/04-fase1-introducao.png) | ![Fase 1 em andamento](docs/prints/05-fase1-jogo.png) |

| Fase 1: acerto | Missão concluída |
|---|---|
| ![Comemoração de acerto](docs/prints/06-fase1-acerto.png) | ![Tela de missão concluída](docs/prints/07-missao-concluida.png) |

| Fase 2: pertence ou não pertence? | Fase 3: introdução à interseção |
|---|---|
| ![Fase 2 em andamento](docs/prints/08-fase2-jogo.png) | ![Introdução da fase 3](docs/prints/12-fase3-introducao.png) |

| Fase 3: A Ponte do E | Fase 4: introdução à união |
|---|---|
| ![Fase 3 em andamento](docs/prints/13-fase3-jogo.png) | ![Introdução da fase 4](docs/prints/14-fase4-introducao.png) |

| Fase 4: O Portal do OU | Fase 5: O Guardião da Floresta |
|---|---|
| ![Fase 4 em andamento](docs/prints/15-fase4-jogo.png) | ![Fase 5 em andamento](docs/prints/16-fase5-jogo.png) |

| Fase 5: o Guardião acordado |
|---|
| ![Guardião acordado no fim da fase 5](docs/prints/17-fase5-guardiao-acordado.png) |

| Laboratório: Luzes da Verdade | Laboratório: A Máquina do E |
|---|---|
| ![Fase 1 do Laboratório da Verdade](docs/prints/18-lab1-jogo.png) | ![Fase 2 do Laboratório da Verdade](docs/prints/19-lab2-maquina-do-e.png) |

| Laboratório: A Máquina do OU | Laboratório: O Espelho do NÃO |
|---|---|
| ![Fase 3 do Laboratório da Verdade](docs/prints/20-lab3-maquina-do-ou.png) | ![Fase 4 do Laboratório da Verdade](docs/prints/21-lab4-espelho-do-nao.png) |

### No celular

<p>
  <img src="docs/prints/09-celular-inicio.png" alt="Tela inicial no celular" width="250">
  <img src="docs/prints/10-celular-mapa.png" alt="Mapa no celular" width="250">
  <img src="docs/prints/11-celular-fase1.png" alt="Fase 1 no celular" width="250">
</p>

## Funcionalidades

- **Três faixas etárias:** 5–8 anos vai direto ao mapa; 9–12 e 13+ escolhem a dificuldade (Fácil, Médio, Difícil).
- **Mapa de aventura** com dois mundos (Floresta dos Conjuntos e Laboratório da Verdade), fases bloqueadas, concluídas com estrelas e "Em breve".
- **Fase 1 — Conhecendo os Grupos:** arrastar e soltar os animais que vivem na água para dentro do conjunto, num cenário subaquático. Funciona com mouse, toque, e também tocando no animal e depois no destino.
- **Fase 2 — Quem Pertence Aqui?:** um elemento por vez, a criança decide se ele *pertence* ou *não pertence* ao grupo das frutas.
- **Fase 3 — A Ponte do E:** dois grupos que se cruzam (vermelhos e frutas). A criança descobre a *interseção*: o que é vermelho **e** fruta fica no meio.
- **Fase 4 — O Portal do OU:** bolhas mágicas sobem pela tela e a criança estoura as que têm animal **ou** coisa roxa. Passa o que é só animal, o que é só roxo e também o que é os dois (o polvo): a *união* inclui a interseção. Cada acerto acende o portal e aparece no mini diagrama. Dois erros seguidos deixam as bolhas certas douradas, e o brilho some no próximo acerto. Com movimento reduzido ativado no sistema, as bolhas ficam paradas.
- **Fase 5 — O Guardião da Floresta:** desafio final do mundo. O Guardião é uma árvore gigante, dormindo e sem cor: no celular ela ocupa o fundo da tela; em tablet e computador fica numa faixa à esquerda (35% da tela), com o jogo à direita. Cinco perguntas rápidas aparecem no meio da tela e revisam tudo: conjunto, pertence, não pertence, E (vermelho e fruta) e OU (animal ou roxo, escolhendo várias respostas). Cada acerto acende uma pedra mágica nas raízes, e o Guardião vai acordando enquanto a floresta recupera as cores.
- **Laboratório, fase 1 — Luzes da Verdade:** uma máquina com quatro lâmpadas. Ao tocar numa lâmpada, a tela aproxima o desafio dela (como nos jogos de puzzle): uma frase ilustrada, como "O peixe vive na água" ou "A banana é vermelha", e a criança escolhe verdadeiro (a lâmpada acende) ou falso (fica apagada). Depois liga a máquina para conferir; as lâmpadas erradas piscam e o Pipo dá uma dica.
- **Laboratório, fase 2 — A Máquina do E:** quatro máquinas no laboratório; ao tocar numa delas, a tela aproxima a máquina, com duas frases ligadas por fios a uma porta "E" e uma lâmpada grande. A criança dá o palpite (acende ou não acende?) e a máquina mostra o resultado: as frases verdadeiras acendem, a energia corre e a lâmpada grande só acende se as duas forem verdade. As quatro máquinas cobrem a tabela-verdade do E.
- **Laboratório, fase 3 — A Máquina do OU:** uma máquina de engrenagens com duas alavancas (azul e rosa). Em cada rodada o jogo mostra uma combinação de alavancas ligadas e desligadas, e a criança diz se a máquina funciona: se funcionar, as engrenagens giram e saem bolhas; se não, ela trava e solta fumaça. As quatro rodadas cobrem a tabela-verdade do OU, e na última a alavanca azul emperra e a própria criança liga a outra.
- **Laboratório, fase 4 — O Espelho do NÃO:** um espelho mágico que mostra tudo ao contrário. Primeiro com objetos: a criança toca nos reflexos para virá-los (lâmpada acesa vira apagada, alavanca ligada vira desligada, porta fechada vira aberta) e olha no espelho para conferir. Depois com frases, uma por vez: a frase de verdade aparece com a luz já respondida, o espelho mostra a frase com NÃO e a criança escolhe se a luz do espelho acende ou apaga. "O peixe NÃO vive na água" apaga, e "A banana NÃO é vermelha" acende.
- **Pipo, o mascote:** ilustração própria em SVG, com expressões (feliz, curioso, comemorando, incentivando) e bico que se mexe enquanto fala.
- **Feedback sem punição:** dicas gentis a cada erro e dica visual depois de algumas tentativas.
- **Voz e sons:** narração em português, botão de ouvir em todas as falas, efeitos sonoros suaves e botão para silenciar. Nada toca antes do primeiro toque do jogador.
- **Progresso salvo** no navegador, separado por faixa etária e dificuldade.
- **Responsivo:** pensado primeiro para celular.

## Tecnologias

- [React 19](https://react.dev) + [Vite 8](https://vite.dev), em JavaScript
- CSS puro (layout responsivo e animações)
- [Lucide React](https://lucide.dev) para ícones
- Fontes Fredoka e Nunito via [Fontsource](https://fontsource.org)
- Web Speech API (voz), Web Audio API (efeitos sonoros), LocalStorage (progresso) e Pointer Events (arrastar e soltar)
- Todas as ilustrações são SVG feitos no próprio código, sem imagens externas

Não há backend, banco de dados nem login nesta versão.

## Como executar

Requer [Node.js](https://nodejs.org) 20 ou superior.

```bash
npm install
npm run dev
```

Abra o endereço mostrado no terminal (normalmente http://localhost:5173).

Para testar no celular na mesma rede Wi-Fi, rode `npm run dev -- --host` e acesse o endereço "Network" exibido.

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Gera a versão de produção em `dist/` |
| `npm run preview` | Abre a versão de produção localmente |
| `npm run roteiro` | Gera o roteiro de gravação da voz do Pipo |

## Como publicar

O jogo é um site estático: `npm run build` gera a pasta `dist/`, que pode ser enviada para qualquer hospedagem
(na Hostinger, pelo Gerenciador de Arquivos, dentro de `public_html` ou de uma subpasta). Os caminhos são relativos,
então o site funciona tanto na raiz do domínio quanto dentro de uma pasta.

## Estrutura

```
src/
  App.jsx                  navegação entre telas e proteções de acesso
  config/                  faixas etárias, dificuldades, mundos e fases
  data/                    textos e conteúdo dos desafios, falas do Pipo
  logic/                   validação das respostas, progresso, armazenamento
  audio/                   narração (voz gravada ou sintetizada) e efeitos sonoros
  state/                   estado global e hooks de narração
  assets/voz/              gravações da voz do Pipo
  components/              mascote, ilustrações, cenários e componentes de interface
  screens/                 telas (início, idade, dificuldade, mapa, introdução, jogos, conclusão)
scripts/roteiro.mjs        gerador do roteiro de gravação
docs/prints/               prints do README
```

O conteúdo das fases fica separado da lógica: textos, elementos e dicas estão em `src/data/challenges.js`.

## Como expandir

**Nova fase:** adicione o conteúdo em `src/data/challenges.js` e ligue-o à fase em `src/config/worlds.js`:

```js
content: { '5-8': 'forest-3-kids' }
```

A fase passa a ser jogável para essa faixa etária. Um novo tipo de jogo precisa de um componente
registrado em `GAME_COMPONENTS` no `App.jsx`. O cenário de fundo de cada fase vem do campo `scene`
do desafio (`'forest'`, `'ocean'`...).

**Voz gravada do Pipo:** rode `npm run roteiro` para gerar o [ROTEIRO_DE_GRAVACAO.md](ROTEIRO_DE_GRAVACAO.md),
com todas as falas, o nome de cada arquivo e o tom sugerido. Coloque as gravações em `src/assets/voz/`
com esses nomes (mp3, m4a, wav, ogg ou webm) e o jogo as usa automaticamente. Falas sem gravação usam a voz do navegador.

**Efeitos sonoros:** são sintetizados em `src/audio/sfx.js`. Para usar um arquivo gravado, mapeie o nome do som em `SFX_FILES`.

**Arte oficial do mascote:** substitua o SVG de `src/components/mascot/Mascot.jsx`, mantendo as props `mood`, `talking` e `size`.

## Próximos passos

- Fase 5 do Laboratório da Verdade (a Tabela Mestra)
- Conteúdo para as faixas 9–12 e 13+
- Gravação da voz oficial do Pipo

## Autoria

Desenvolvido por Victória Caroline Bittencourt ([@devcaline](https://github.com/devcaline)).
