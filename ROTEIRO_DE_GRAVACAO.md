# Roteiro de gravação — voz do Pipo

Gerado automaticamente pelo comando `npm run roteiro` (rode de novo depois de gravar para atualizar o progresso).

**Progresso: 0 de 40 falas gravadas.**

## Como gravar e colocar no jogo

1. Grave cada fala em um arquivo separado.
2. Dê ao arquivo **exatamente** o nome da coluna "Arquivo" (pode ser `.mp3`, `.m4a`, `.wav`, `.ogg` ou `.webm`).
3. Coloque os arquivos na pasta `src/assets/voz/`.
4. Pronto: o jogo usa sua gravação automaticamente. Falas sem gravação continuam com a voz do navegador.

Dicas: ambiente silencioso, celular ou microfone a um palmo da boca, corte o silêncio do começo e do fim,
e mantenha o mesmo volume em todas as falas. Não precisa ler palavra por palavra: se uma frase soar
melhor de outro jeito, grave assim e me avise para eu ajustar o texto na tela.

## Telas gerais

| ✓ | Arquivo | Onde aparece | Tom | Fala |
|---|---|---|---|---|
| ⬜ | `age.question.mp3` | Escolha da idade | curioso, explicando com calma | Quantos anos você tem? Toque no cartão da sua idade. |
| ⬜ | `difficulty.question.mp3` | Escolha da dificuldade | carinhoso, incentivando | Escolha o nível de desafio. Você pode trocar quando quiser! |
| ⬜ | `map.kids.mp3` | Mapa — quando há fase para jogar | alegre, acolhedor | Toque na fase que está brilhando para começar a nossa aventura! |
| ⬜ | `map.kidsDone.mp3` | Mapa — quando as próximas fases ainda não existem | comemorando, bem animado | Você é incrível! As próximas fases estão chegando em breve. |
| ⬜ | `map.inDevelopment.mp3` | Mapa — idades 9–12 e 13+ | carinhoso, incentivando | As missões para a sua idade estão sendo preparadas com muito carinho. Volte em breve! |
| ⬜ | `help.howToPlay.mp3` | "Como jogar?" | calmo, convidativo | Escolha uma fase no mapa, ouça a missão e arraste os elementos para o lugar certo. Depois, toque em verificar! |

## Fase: Conhecendo os Grupos (5-8 anos)

| ✓ | Arquivo | Onde aparece | Tom | Fala |
|---|---|---|---|---|
| ⬜ | `f1k.intro.1.mp3` | Introdução 1 | alegre, acolhedor | Oi, amiguinho! Alguns animais estão perdidos por aqui. Você pode me ajudar a encontrar o lugar deles? |
| ⬜ | `f1k.intro.2.mp3` | Introdução 2 | curioso, explicando com calma | Um conjunto é um grupo de coisas que têm alguma característica em comum. Vamos descobrir quais animais fazem parte do nosso grupo? |
| ⬜ | `f1k.mission.mp3` | Missão | curioso, explicando com calma | Coloque dentro do círculo os animais que vivem na água. |
| ⬜ | `item.fish.mp3` | Ao tocar no animal | só o nome, claro e simpático | Peixe! |
| ⬜ | `item.rabbit.mp3` | Ao tocar no animal | só o nome, claro e simpático | Coelho! |
| ⬜ | `item.dolphin.mp3` | Ao tocar no animal | só o nome, claro e simpático | Golfinho! |
| ⬜ | `item.chicken.mp3` | Ao tocar no animal | só o nome, claro e simpático | Galinha! |
| ⬜ | `item.octopus.mp3` | Ao tocar no animal | só o nome, claro e simpático | Polvo! |
| ⬜ | `item.butterfly.mp3` | Ao tocar no animal | só o nome, claro e simpático | Borboleta! |
| ⬜ | `f1k.hint.empty.mp3` | Dica — apertou Verificar sem nada no círculo | carinhoso, incentivando | Vamos começar? Arraste para dentro do círculo um animal que vive na água. |
| ⬜ | `f1k.hint.wrongInside.mp3` | Dica — tem animal errado dentro | carinhoso, incentivando | Quase lá! Tem um animal no círculo que gosta mais da terra ou do céu. Vamos olhar de novo? |
| ⬜ | `f1k.hint.missing.mp3` | Dica — falta animal dentro | carinhoso, incentivando | Quase lá! Ainda tem animal da água esperando do lado de fora. Vamos observar? |
| ⬜ | `f1k.hint.generic.mp3` | Dica — genérica | carinhoso, incentivando | Quase lá! Vamos observar quais animais vivem na água? |
| ⬜ | `f1k.hint.visual.mp3` | Dica com gotinhas (após 2 tentativas) | carinhoso, incentivando | Olha só! Coloquei gotinhas de água nos animais que nadam. Eles adoram a água! |
| ⬜ | `f1k.success.mp3` | Acertou tudo | comemorando, bem animado | O peixe, o golfinho e o polvo vivem na água. Por isso, eles fazem parte do conjunto! |
| ⬜ | `f1k.complete.mp3` | Tela final da fase | comemorando, bem animado | Primeira missão concluída! Você criou um conjunto! Um conjunto é um grupo de elementos. Neste, colocamos os animais que vivem na água. |

## Fase: Quem Pertence Aqui? (5-8 anos)

| ✓ | Arquivo | Onde aparece | Tom | Fala |
|---|---|---|---|---|
| ⬜ | `f2k.intro.1.mp3` | Introdução 1 | alegre, acolhedor | Que bagunça! Frutas e brinquedos se misturaram no caminho. Vamos arrumar? |
| ⬜ | `f2k.intro.2.mp3` | Introdução 2 | curioso, explicando com calma | Quando uma coisa faz parte do grupo, dizemos que ela pertence ao grupo. A maçã pertence ao grupo das frutas. A bola não pertence! |
| ⬜ | `f2k.mission.mp3` | Missão | curioso, explicando com calma | Olhe cada coisa e responda: ela pertence ao grupo das frutas? |
| ⬜ | `f2k.q.banana.mp3` | Pergunta — Banana | curioso, explicando com calma | Olha a banana! Ela pertence ao grupo das frutas? |
| ⬜ | `f2k.hint.banana.mp3` | Dica — errou Banana | carinhoso, incentivando | Hmm... a banana é amarelinha e gostosa de comer. Será que ela é uma fruta? |
| ⬜ | `f2k.q.ball.mp3` | Pergunta — Bola | curioso, explicando com calma | E a bola? Ela pertence ao grupo das frutas? |
| ⬜ | `f2k.hint.ball.mp3` | Dica — errou Bola | carinhoso, incentivando | Será que a gente come a bola? A bola é para brincar! Vamos pensar de novo? |
| ⬜ | `f2k.q.apple.mp3` | Pergunta — Maçã | curioso, explicando com calma | Olha a maçã! Ela pertence ao grupo das frutas? |
| ⬜ | `f2k.hint.apple.mp3` | Dica — errou Maçã | carinhoso, incentivando | A maçã é vermelhinha e nasce na árvore. Será que ela é uma fruta? |
| ⬜ | `f2k.q.car.mp3` | Pergunta — Carrinho | curioso, explicando com calma | E o carrinho? Ele pertence ao grupo das frutas? |
| ⬜ | `f2k.hint.car.mp3` | Dica — errou Carrinho | carinhoso, incentivando | O carrinho tem rodinhas e serve para brincar. Será que ele é uma fruta? |
| ⬜ | `f2k.q.grapes.mp3` | Pergunta — Uva | curioso, explicando com calma | Olha a uva! Ela pertence ao grupo das frutas? |
| ⬜ | `f2k.hint.grapes.mp3` | Dica — errou Uva | carinhoso, incentivando | A uva é pequenininha, redondinha e docinha. Será que ela é uma fruta? |
| ⬜ | `f2k.q.shoe.mp3` | Pergunta — Sapato | curioso, explicando com calma | E o sapato? Ele pertence ao grupo das frutas? |
| ⬜ | `f2k.hint.shoe.mp3` | Dica — errou Sapato | carinhoso, incentivando | O sapato a gente coloca nos pés para passear. Será que ele é uma fruta? |
| ⬜ | `f2k.hint.visual.mp3` | Dica — 2º erro no mesmo elemento | carinhoso, incentivando | Vou te dar uma ajudinha: olha o botão que está brilhando! |
| ⬜ | `f2k.success.mp3` | Acertou tudo | comemorando, bem animado | A banana, a maçã e a uva pertencem ao grupo das frutas. A bola, o carrinho e o sapato não pertencem. |
| ⬜ | `f2k.complete.mp3` | Tela final da fase | comemorando, bem animado | Segunda missão concluída! Quando um elemento faz parte de um conjunto, dizemos que ele pertence ao conjunto. A banana pertence ao conjunto das frutas. A bola não pertence. |

