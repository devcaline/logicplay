# Roteiro de gravação — voz do Pipo

Gerado automaticamente pelo comando `npm run roteiro` em 17/11/2026 (rode de novo depois de gravar para atualizar o progresso).

**Progresso: 0 de 636 falas gravadas.**

## Como gravar e colocar no jogo

1. Grave cada fala em um arquivo separado.
2. Dê ao arquivo **exatamente** o nome da coluna "Arquivo" (pode ser `.mp3`, `.m4a`, `.wav`, `.ogg` ou `.webm`).
3. Coloque os arquivos na pasta `src/assets/voz/`.
4. Pronto: o jogo usa sua gravação automaticamente. Falas sem gravação continuam com a voz do navegador.

Falas com símbolos trazem uma sugestão de leitura em palavras: a voz do Pipo nunca lê o símbolo.
Frases que o jogo monta na hora com números sorteados (por exemplo "O 7 é ímpar e o 4 é par") são
milhares de combinações e continuam com a voz do navegador.

## Telas gerais

Falas fora das fases: escolha da idade, mapa e ajuda.

| ✓ | Arquivo | Onde aparece | Tom | Fala |
|---|---|---|---|---|
| ⬜ | `home.welcome.mp3` | Tela inicial | alegre, acolhedor | Um mundo cheio de mistérios espera por você! Vamos aprender e viver uma aventura? |
| ⬜ | `age.question.mp3` | Escolha da idade | alegre, acolhedor | Quantos anos você tem? Toque no cartão da sua idade. |
| ⬜ | `difficulty.question.mp3` | Escolha da dificuldade (9 anos ou mais) | alegre, acolhedor | Escolha o nível de desafio. Você pode trocar quando quiser! |
| ⬜ | `map.kids.mp3` | Mapa — há fase para jogar | alegre, acolhedor | Toque na fase que está brilhando para começar a nossa aventura! |
| ⬜ | `map.kidsDone.mp3` | Mapa — todas as fases concluídas | alegre, acolhedor | Você é incrível! As próximas fases estão chegando em breve. |
| ⬜ | `map.teen.mp3` | Mapa (9 anos ou mais) | alegre, acolhedor | Selecione a fase destacada para começar. |
| ⬜ | `map.teenDone.mp3` | Mapa — todas as fases concluídas (9 anos ou mais) | alegre, acolhedor | Novas fases para a sua faixa estão a caminho. |
| ⬜ | `map.inDevelopment.mp3` | Mapa — fases ainda em preparação | alegre, acolhedor | As missões para a sua idade estão sendo preparadas com muito carinho. Volte em breve! |
| ⬜ | `help.howToPlay.mp3` | Botão “Como jogar?” | calmo, convidativo | Escolha uma fase no mapa, ouça a missão e arraste os elementos para o lugar certo. Depois, toque em verificar! |

## 5 a 8 anos · Floresta dos Conjuntos · Fase 1: Conhecendo os Grupos

| ✓ | Arquivo | Onde aparece | Tom | Fala |
|---|---|---|---|---|
| ⬜ | `f1k.intro.1.mp3` | Introdução 1 | alegre, acolhedor | Oi, amiguinho! Alguns animais estão perdidos por aqui. Você pode me ajudar a encontrar o lugar deles? |
| ⬜ | `f1k.intro.2.mp3` | Introdução 2 | curioso, explicando com calma | Um conjunto é um grupo de coisas que têm alguma característica em comum. Vamos descobrir quais animais fazem parte do nosso grupo? |
| ⬜ | `f1k.mission.mp3` | Missão | curioso, explicando com calma | Coloque dentro do círculo os animais que vivem na água. |
| ⬜ | `item.fish.mp3` | Ao tocar no elemento | só o nome, claro e simpático | Peixe! |
| ⬜ | `item.rabbit.mp3` | Ao tocar no elemento | só o nome, claro e simpático | Coelho! |
| ⬜ | `item.dolphin.mp3` | Ao tocar no elemento | só o nome, claro e simpático | Golfinho! |
| ⬜ | `item.chicken.mp3` | Ao tocar no elemento | só o nome, claro e simpático | Galinha! |
| ⬜ | `item.octopus.mp3` | Ao tocar no elemento | só o nome, claro e simpático | Polvo! |
| ⬜ | `item.butterfly.mp3` | Ao tocar no elemento | só o nome, claro e simpático | Borboleta! |
| ⬜ | `f1k.hint.empty.mp3` | Dica — Verificar sem nada no círculo | carinhoso, incentivando | Vamos começar? Arraste para dentro do círculo um animal que vive na água. |
| ⬜ | `f1k.hint.wrongInside.mp3` | Dica — tem elemento errado dentro | carinhoso, incentivando | Quase lá! Tem um animal no círculo que gosta mais da terra ou do céu. Vamos olhar de novo? |
| ⬜ | `f1k.hint.missing.mp3` | Dica — falta elemento dentro | carinhoso, incentivando | Quase lá! Ainda tem animal da água esperando do lado de fora. Vamos observar? |
| ⬜ | `f1k.hint.generic.mp3` | Dica — genérica | carinhoso, incentivando | Quase lá! Vamos observar quais animais vivem na água? |
| ⬜ | `f1k.hint.visual.mp3` | Dica com destaque (após 2 tentativas) | carinhoso, incentivando | Olha só! Coloquei gotinhas de água nos animais que nadam. Eles adoram a água! |
| ⬜ | `f1k.success.mp3` | Acertou tudo | comemorando, bem animado | O peixe, o golfinho e o polvo vivem na água. Por isso, eles fazem parte do conjunto! |
| ⬜ | `f1k.complete.mp3` | Tela final da fase | comemorando, bem animado | Primeira missão concluída! Você criou um conjunto! Um conjunto é um grupo de elementos. Neste, colocamos os animais que vivem na água. |

## 5 a 8 anos · Floresta dos Conjuntos · Fase 2: Quem Pertence Aqui?

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

## 5 a 8 anos · Floresta dos Conjuntos · Fase 3: A Ponte do E

| ✓ | Arquivo | Onde aparece | Tom | Fala |
|---|---|---|---|---|
| ⬜ | `f3k.intro.1.mp3` | Introdução 1 | alegre, acolhedor | Chegamos na Ponte do E! Para atravessar, vamos arrumar estas coisas em dois grupos: coisas vermelhas e frutas. |
| ⬜ | `f3k.intro.2.mp3` | Introdução 2 | curioso, explicando com calma | Olha a maçã: ela é vermelha E é fruta! Por isso ela fica no meio, onde os dois grupos se encontram. Esse lugar se chama interseção. |
| ⬜ | `f3k.mission.mp3` | Missão | curioso, explicando com calma | Coloque cada coisa no lugar certo: nos vermelhos, nas frutas, no meio se for os dois, ou fora. |
| ⬜ | `item.apple.mp3` | Ao tocar no elemento | só o nome, claro e simpático | Maçã! |
| ⬜ | `item.car.mp3` | Ao tocar no elemento | só o nome, claro e simpático | Carrinho! |
| ⬜ | `item.banana.mp3` | Ao tocar no elemento | só o nome, claro e simpático | Banana! |
| ⬜ | `item.ball.mp3` | Ao tocar no elemento | só o nome, claro e simpático | Bola! |
| ⬜ | `item.strawberry.mp3` | Ao tocar no elemento | só o nome, claro e simpático | Morango! |
| ⬜ | `item.grapes.mp3` | Ao tocar no elemento | só o nome, claro e simpático | Uva! |
| ⬜ | `f3k.hint.empty.mp3` | Dica — Verificar sem nada nos grupos | carinhoso, incentivando | Vamos começar? Arraste cada coisa para o grupo dela. Comece pela maçã! |
| ⬜ | `f3k.hint.missingBoth.mp3` | Dica — algo dos dois grupos fora do meio | carinhoso, incentivando | Quase lá! Tem coisa que é vermelha E é fruta ao mesmo tempo. Ela vai no meio, na ponte entre os dois grupos! |
| ⬜ | `f3k.hint.wrongBoth.mp3` | Dica — algo no meio que não é dos dois | carinhoso, incentivando | Quase lá! No meio só fica o que é vermelho E fruta ao mesmo tempo. Vamos olhar de novo? |
| ⬜ | `f3k.hint.generic.mp3` | Dica — elemento no grupo errado | carinhoso, incentivando | Quase lá! Olhe cada coisa e pergunte: ela é vermelha? Ela é fruta? Ou nenhum dos dois? |
| ⬜ | `f3k.hint.visual.mp3` | Dica com marquinhas (após 2 tentativas) | carinhoso, incentivando | Coloquei marquinhas para te ajudar: bolinha vermelha é para vermelho, e a maçãzinha é para fruta! |
| ⬜ | `f3k.success.mp3` | Acertou tudo | comemorando, bem animado | A maçã e o morango são vermelhos E são frutas, então ficam no meio! O carrinho é só vermelho, a banana e a uva são só frutas, e a bola fica de fora. |
| ⬜ | `f3k.complete.mp3` | Tela final da fase | comemorando, bem animado | Terceira missão concluída! Você descobriu a interseção! É o lugar onde ficam os elementos que estão nos dois grupos ao mesmo tempo, como a maçã e o morango: vermelhos E frutas. |

## 5 a 8 anos · Floresta dos Conjuntos · Fase 4: O Portal do OU

| ✓ | Arquivo | Onde aparece | Tom | Fala |
|---|---|---|---|---|
| ⬜ | `f4k.intro.1.mp3` | Introdução 1 | alegre, acolhedor | Uau, o Portal do OU! Ele está fechado, e várias bolhas mágicas estão flutuando por aqui. |
| ⬜ | `f4k.intro.2.mp3` | Introdução 2 | curioso, explicando com calma | O portal deixa passar quem é animal OU quem é roxo. Basta ser um dos dois, e quem é os dois também passa! Juntar dois grupos assim se chama união. |
| ⬜ | `f4k.mission.mp3` | Missão | curioso, explicando com calma | Estoure as bolhas que têm animal OU coisa roxa para abrir o portal! |
| ⬜ | `f4k.nope.apple.mp3` | Tocou numa bolha que não passa — Maçã | carinhoso, incentivando | A maçã não é animal e não é roxa. O portal não deixa passar! |
| ⬜ | `f4k.nope.ball.mp3` | Tocou numa bolha que não passa — Bola | carinhoso, incentivando | A bola não é animal e não é roxa. Ela fica de fora! |
| ⬜ | `f4k.nope.car.mp3` | Tocou numa bolha que não passa — Carrinho | carinhoso, incentivando | O carrinho não é animal e não é roxo. O portal não deixa passar! |
| ⬜ | `f4k.nope.banana.mp3` | Tocou numa bolha que não passa — Banana | carinhoso, incentivando | A banana não é animal e não é roxa. Ela fica de fora! |
| ⬜ | `f4k.nope.strawberry.mp3` | Tocou numa bolha que não passa — Morango | carinhoso, incentivando | O morango não é animal e não é roxo. Ele fica de fora! |
| ⬜ | `f4k.hint.visual.mp3` | Dica — bolhas douradas (após 2 toques errados) | carinhoso, incentivando | Vou te ajudar: as bolhas certas estão brilhando douradas! |
| ⬜ | `f4k.hint.idle.mp3` | Dica — criança parada sem tocar | carinhoso, incentivando | Toque numa bolha que tem animal ou coisa roxa! |
| ⬜ | `f4k.success.mp3` | Acertou tudo | comemorando, bem animado | O portal abriu! Passaram os animais, as coisas roxas, e também o polvo, que é os dois. Com o OU, basta ser um! |
| ⬜ | `f4k.complete.mp3` | Tela final da fase | comemorando, bem animado | Quarta missão concluída! Você descobriu a união! Com o OU, basta estar em um dos grupos para entrar. E quem está nos dois também entra, como o polvo: animal E roxo. |

## 5 a 8 anos · Floresta dos Conjuntos · Fase 5: O Guardião da Floresta

| ✓ | Arquivo | Onde aparece | Tom | Fala |
|---|---|---|---|---|
| ⬜ | `f5k.intro.1.mp3` | Introdução 1 | curioso, explicando com calma | Este é o Guardião da Floresta. Ele caiu num sono profundo, e a floresta perdeu as suas cores! |
| ⬜ | `f5k.intro.2.mp3` | Introdução 2 | alegre, acolhedor | Para acordar o Guardião, vamos usar tudo o que aprendemos. Cada acerto acende uma pedra mágica. Vamos lá? |
| ⬜ | `f5k.r1.prompt.mp3` | Desafio 1 (Conjunto) — pergunta | curioso, explicando com calma | Primeiro desafio: qual destes grupos é o conjunto dos animais que vivem na água? |
| ⬜ | `f5k.r1.hint.mp3` | Desafio 1 — dica ao errar | carinhoso, incentivando | Quase! Procure o grupo em que todos os bichinhos nadam na água. |
| ⬜ | `f5k.r2.prompt.mp3` | Desafio 2 (Pertence) — pergunta | curioso, explicando com calma | Qual destes pertence ao grupo das frutas? |
| ⬜ | `f5k.r2.hint.mp3` | Desafio 2 — dica ao errar | carinhoso, incentivando | Quase! Qual destes a gente pode comer? Ele é uma fruta! |
| ⬜ | `f5k.r3.prompt.mp3` | Desafio 3 (Não pertence) — pergunta | curioso, explicando com calma | Agora o contrário: quem NÃO pertence ao grupo dos animais da água? |
| ⬜ | `f5k.r3.hint.mp3` | Desafio 3 — dica ao errar | carinhoso, incentivando | Quase! Dois deles nadam. Quem voa pelo céu e não vive na água? |
| ⬜ | `f5k.r4.prompt.mp3` | Desafio 4 (E) — pergunta | curioso, explicando com calma | A Ponte do E! Qual destes é vermelho E é fruta ao mesmo tempo? |
| ⬜ | `f5k.r4.hint.mp3` | Desafio 4 — dica ao errar | carinhoso, incentivando | Quase! Com o E, precisa ser as duas coisas: vermelho e fruta. |
| ⬜ | `f5k.r5.prompt.mp3` | Desafio 5 (OU) — pergunta | curioso, explicando com calma | Último desafio, o Portal do OU! Toque em TODOS que são animais OU roxos, e depois em Pronto. |
| ⬜ | `f5k.r5.hint.mp3` | Desafio 5 — dica ao errar | carinhoso, incentivando | Quase! Com o OU, basta ser animal ou ser roxo. E quem é os dois também vale! |
| ⬜ | `f5k.hint.visual.mp3` | Dica — resposta brilhando (após 2 erros) | carinhoso, incentivando | Vou te dar uma ajudinha: olha a resposta brilhando! |
| ⬜ | `f5k.hint.pickMore.mp3` | Apertou Pronto sem escolher nada | carinhoso, incentivando | Toque em pelo menos um antes de apertar Pronto! |
| ⬜ | `f5k.success.mp3` | Acertou tudo | comemorando, bem animado | Você acendeu todas as pedras mágicas, e a floresta ganhou as suas cores de volta. Obrigado, amiguinho! |
| ⬜ | `f5k.complete.mp3` | Tela final da fase | comemorando, bem animado | Floresta dos Conjuntos restaurada! Você acordou o Guardião! Agora você sabe o que é um conjunto, o que pertence a um grupo, e conhece o E e o OU. Que aventura incrível! |

## 5 a 8 anos · Laboratório da Verdade · Fase 1: Luzes da Verdade

| ✓ | Arquivo | Onde aparece | Tom | Fala |
|---|---|---|---|---|
| ⬜ | `l1k.intro.1.mp3` | Introdução 1 | alegre, acolhedor | Bem-vindo ao Laboratório da Verdade! Aqui as máquinas só funcionam quando a gente descobre o que é verdade. |
| ⬜ | `l1k.intro.2.mp3` | Introdução 2 | curioso, explicando com calma | Uma frase pode ser verdadeira ou falsa. O peixe vive na água: é verdade, a luz acende! A banana é vermelha: é falso, a luz fica apagada. |
| ⬜ | `l1k.mission.mp3` | Missão | curioso, explicando com calma | Toque em cada lâmpada da máquina, escute a frase e escolha: verdadeiro ou falso. Depois, ligue a máquina! |
| ⬜ | `l1k.s.fish.mp3` | Frase do cartão (botão de ouvir) | calmo, convidativo | O peixe vive na água. |
| ⬜ | `l1k.h.fish.mp3` | Dica — errou esta frase | carinhoso, incentivando | Pense no peixe: onde ele nada? Ele vive na água! |
| ⬜ | `l1k.s.banana.mp3` | Frase do cartão (botão de ouvir) | calmo, convidativo | A banana é vermelha. |
| ⬜ | `l1k.h.banana.mp3` | Dica — errou esta frase | carinhoso, incentivando | Olhe bem a cor da banana. Ela é vermelha ou amarela? |
| ⬜ | `l1k.s.rabbit.mp3` | Frase do cartão (botão de ouvir) | calmo, convidativo | O coelho voa. |
| ⬜ | `l1k.h.rabbit.mp3` | Dica — errou esta frase | carinhoso, incentivando | O coelho tem asas? Ele pula, mas será que voa? |
| ⬜ | `l1k.s.grapes.mp3` | Frase do cartão (botão de ouvir) | calmo, convidativo | A uva é roxa. |
| ⬜ | `l1k.h.grapes.mp3` | Dica — errou esta frase | carinhoso, incentivando | Olhe a cor da uva. Ela é roxinha! |
| ⬜ | `l1k.hint.unanswered.mp3` | Dica — ligou a máquina com frase sem resposta | carinhoso, incentivando | Ainda tem lâmpada com ponto de interrogação. Toque nela para ver a frase! |
| ⬜ | `l1k.success.mp3` | Acertou tudo | comemorando, bem animado | O peixe vive na água e a uva é roxa: verdade! A banana vermelha e o coelho que voa: falso! |
| ⬜ | `l1k.complete.mp3` | Tela final da fase | comemorando, bem animado | Primeira missão do laboratório concluída! Agora você sabe: uma frase pode ser verdadeira ou falsa. Quando é verdade, a luz acende! |

## 5 a 8 anos · Laboratório da Verdade · Fase 2: A Máquina do E

| ✓ | Arquivo | Onde aparece | Tom | Fala |
|---|---|---|---|---|
| ⬜ | `l2k.intro.1.mp3` | Introdução 1 | alegre, acolhedor | Esta é a Máquina do E. Ela tem duas frases. A lâmpada grande só acende se a primeira frase E a segunda frase forem verdade! |
| ⬜ | `l2k.intro.2.mp3` | Introdução 2 | curioso, explicando com calma | O peixe vive na água, mas o carrinho não voa. Se uma das frases for falsa, a Máquina do E fica apagada. Vamos testar as máquinas do laboratório? |
| ⬜ | `l2k.mission.mp3` | Missão | curioso, explicando com calma | Toque em cada Máquina do E e descubra: a lâmpada grande vai acender? |
| ⬜ | `l2k.q.1.mp3` | Máquina 1 — pergunta | curioso, explicando com calma | O peixe vive na água E a uva é roxa. A Máquina do E acende? |
| ⬜ | `l2k.h.1.mp3` | Máquina 1 — explicação ao errar | carinhoso, incentivando | As duas frases são verdade! Quando as duas são verdade, a Máquina do E acende. |
| ⬜ | `l2k.q.2.mp3` | Máquina 2 — pergunta | curioso, explicando com calma | A maçã é vermelha E o carrinho voa. A Máquina do E acende? |
| ⬜ | `l2k.h.2.mp3` | Máquina 2 — explicação ao errar | carinhoso, incentivando | O carrinho não voa! Uma frase é falsa, então a Máquina do E fica apagada. |
| ⬜ | `l2k.q.3.mp3` | Máquina 3 — pergunta | curioso, explicando com calma | A banana é azul E o golfinho vive na água. A Máquina do E acende? |
| ⬜ | `l2k.h.3.mp3` | Máquina 3 — explicação ao errar | carinhoso, incentivando | A banana não é azul! Uma frase é falsa, então a Máquina do E fica apagada. |
| ⬜ | `l2k.q.4.mp3` | Máquina 4 — pergunta | curioso, explicando com calma | A galinha vive na água E o polvo é amarelo. A Máquina do E acende? |
| ⬜ | `l2k.h.4.mp3` | Máquina 4 — explicação ao errar | carinhoso, incentivando | As duas frases são falsas! Para a Máquina do E acender, as duas precisam ser verdade. |
| ⬜ | `l2k.success.mp3` | Acertou tudo | comemorando, bem animado | A Máquina do E só acende quando as duas frases são verdade. Se uma for falsa, ela fica apagada. |
| ⬜ | `l2k.complete.mp3` | Tela final da fase | comemorando, bem animado | Segunda missão do laboratório concluída! Você descobriu o E: a lâmpada só acende quando as duas frases são verdade ao mesmo tempo. |

## 5 a 8 anos · Laboratório da Verdade · Fase 3: A Máquina do OU

| ✓ | Arquivo | Onde aparece | Tom | Fala |
|---|---|---|---|---|
| ⬜ | `l3k.intro.1.mp3` | Introdução 1 | alegre, acolhedor | Esta é a Máquina do OU! Ela tem duas alavancas. Se a alavanca azul OU a alavanca rosa estiver ligada, as engrenagens giram! |
| ⬜ | `l3k.intro.2.mp3` | Introdução 2 | curioso, explicando com calma | Mas se as duas alavancas estiverem desligadas, a máquina fica parada. Vamos testar? |
| ⬜ | `l3k.mission.mp3` | Missão | curioso, explicando com calma | Olhe as alavancas e descubra: a Máquina do OU vai funcionar? |
| ⬜ | `l3k.q.1.mp3` | Rodada 1 — pergunta | curioso, explicando com calma | A alavanca azul está ligada e a rosa está desligada. A Máquina do OU funciona? |
| ⬜ | `l3k.h.1.mp3` | Rodada 1 — explicação ao errar | carinhoso, incentivando | A alavanca azul está ligada! Com o OU, basta uma alavanca ligada para a máquina funcionar. |
| ⬜ | `l3k.q.2.mp3` | Rodada 2 — pergunta | curioso, explicando com calma | As duas alavancas estão desligadas. A Máquina do OU funciona? |
| ⬜ | `l3k.h.2.mp3` | Rodada 2 — explicação ao errar | carinhoso, incentivando | Nenhuma alavanca está ligada. Sem nenhuma ligada, a Máquina do OU fica parada. |
| ⬜ | `l3k.q.3.mp3` | Rodada 3 — pergunta | curioso, explicando com calma | As duas alavancas estão ligadas. A Máquina do OU funciona? |
| ⬜ | `l3k.h.3.mp3` | Rodada 3 — explicação ao errar | carinhoso, incentivando | As duas estão ligadas! Se uma já basta, com as duas a máquina funciona também. |
| ⬜ | `l3k.q.4.mp3` | Rodada 4 — pergunta | curioso, explicando com calma | A alavanca azul está desligada e a rosa está ligada. A Máquina do OU funciona? |
| ⬜ | `l3k.h.4.mp3` | Rodada 4 — explicação ao errar | carinhoso, incentivando | A alavanca rosa está ligada! Com o OU, basta uma ligada. |
| ⬜ | `l3k.q.5.mp3` | Rodada 5 — pergunta | curioso, explicando com calma | Ih, a alavanca azul emperrou! Ligue uma alavanca para a Máquina do OU funcionar. |
| ⬜ | `l3k.h.5.mp3` | Rodada 5 — tocou na alavanca emperrada | carinhoso, incentivando | Essa alavanca está emperrada. Tente a outra! Com o OU, basta uma. |
| ⬜ | `l3k.success.mp3` | Acertou tudo | comemorando, bem animado | Com o OU, basta uma alavanca ligada. A máquina só fica parada quando as duas estão desligadas. |
| ⬜ | `l3k.complete.mp3` | Tela final da fase | comemorando, bem animado | Terceira missão do laboratório concluída! Você descobriu o OU: basta uma alavanca ligada para a máquina funcionar. Ela só para quando todas estão desligadas. |

## 5 a 8 anos · Laboratório da Verdade · Fase 4: O Espelho do NÃO

| ✓ | Arquivo | Onde aparece | Tom | Fala |
|---|---|---|---|---|
| ⬜ | `l4k.intro.1.mp3` | Introdução 1 | alegre, acolhedor | Este é o Espelho do NÃO! Ele mostra tudo ao contrário. A lâmpada acesa, no espelho, fica apagada! |
| ⬜ | `l4k.intro.2.mp3` | Introdução 2 | curioso, explicando com calma | Com as frases também! O peixe vive na água: é verdade. Com o NÃO, a frase vira falsa. |
| ⬜ | `l4k.stage.1.mp3` | Parte 1 (Objetos no espelho) — instrução | curioso, explicando com calma | O espelho está bagunçado! Toque nos reflexos para deixar tudo ao contrário. |
| ⬜ | `l4k.h.lamp.mp3` | Parte 1 — reflexo errado | carinhoso, incentivando | A lâmpada está acesa. No Espelho do NÃO, ela fica apagada! |
| ⬜ | `l4k.h.lever.mp3` | Parte 1 — reflexo errado | carinhoso, incentivando | A alavanca está ligada. No Espelho do NÃO, ela fica desligada! |
| ⬜ | `l4k.h.door.mp3` | Parte 1 — reflexo errado | carinhoso, incentivando | A porta está fechada. No Espelho do NÃO, ela fica aberta! |
| ⬜ | `l4k.stage.2.mp3` | Parte 2 (Frases no espelho) — instrução | curioso, explicando com calma | Agora as frases! O espelho do NÃO também deixa as frases ao contrário. A luz do espelho acende ou apaga? |
| ⬜ | `l4k.h.fish.mp3` | Parte 2 — reflexo errado | carinhoso, incentivando | A luz do peixe está acesa. No espelho fica ao contrário: a luz apaga! |
| ⬜ | `l4k.h.banana.mp3` | Parte 2 — reflexo errado | carinhoso, incentivando | A luz da banana está apagada, porque ela não é vermelha. No espelho fica ao contrário: a luz acende! |
| ⬜ | `l4k.h.grapes.mp3` | Parte 2 — reflexo errado | carinhoso, incentivando | A luz da uva está acesa. No espelho fica ao contrário: a luz apaga! |
| ⬜ | `l4k.hint.unset.mp3` | Dica — reflexo ainda sem resposta | carinhoso, incentivando | Ainda tem reflexo com ponto de interrogação. Toque nele para escolher! |
| ⬜ | `l4k.success.mp3` | Acertou tudo | comemorando, bem animado | O NÃO deixa tudo ao contrário: o que era verdade vira falso, e o que era falso vira verdade. |
| ⬜ | `l4k.complete.mp3` | Tela final da fase | comemorando, bem animado | Quarta missão do laboratório concluída! Você descobriu o NÃO: ele vira tudo ao contrário. Verdade vira falso, e falso vira verdade. |

## 5 a 8 anos · Laboratório da Verdade · Fase 5: A Tabela Mestra

| ✓ | Arquivo | Onde aparece | Tom | Fala |
|---|---|---|---|---|
| ⬜ | `l5k.intro.1.mp3` | Introdução 1 | alegre, acolhedor | A Tabela Mestra está sem energia! As alavancas ligadas ficam verdes e mandam energia pelos fios até a lâmpada. |
| ⬜ | `l5k.intro.2.mp3` | Introdução 2 | curioso, explicando com calma | Na Máquina do E, a lâmpada precisa da energia das duas alavancas. Com uma só, ela só pisca fraquinho. Vamos testar? |
| ⬜ | `l5k.col.and.mp3` | Máquina do E — começo | curioso, explicando com calma | Primeiro a Máquina do E! Ela precisa da energia das duas alavancas para acender a luz. |
| ⬜ | `l5k.and.0.mp3` | Máquina do E — teste 1 | curioso, explicando com calma | As duas alavancas estão ligadas. Com o E, a luz acende? |
| ⬜ | `l5k.and.1.mp3` | Máquina do E — teste 2 | curioso, explicando com calma | Só a alavanca 1 está ligada. Com o E, a luz acende? |
| ⬜ | `l5k.and.2.mp3` | Máquina do E — teste 3 | curioso, explicando com calma | Só a alavanca 2 está ligada. Com o E, a luz acende? |
| ⬜ | `l5k.and.3.mp3` | Máquina do E — teste 4 | curioso, explicando com calma | Nenhuma alavanca está ligada. Com o E, a luz acende? |
| ⬜ | `l5k.and.h2.mp3` | Máquina do E — errou (2 alavanca(s) ligada(s)) | carinhoso, incentivando | As duas alavancas mandaram energia! Com o E, quando chega a energia das duas, a luz acende. |
| ⬜ | `l5k.and.h1.mp3` | Máquina do E — errou (1 alavanca(s) ligada(s)) | carinhoso, incentivando | Só uma alavanca mandou energia. O E precisa das duas, então a luz só pisca fraquinho e não acende. |
| ⬜ | `l5k.and.h0.mp3` | Máquina do E — errou (0 alavanca(s) ligada(s)) | carinhoso, incentivando | Nenhuma alavanca está ligada, então não sai energia e a luz fica apagada. |
| ⬜ | `l5k.col.or.mp3` | Máquina do OU — começo | curioso, explicando com calma | Agora a Máquina do OU! Com o OU, a energia de uma alavanca já basta para acender a luz. |
| ⬜ | `l5k.or.0.mp3` | Máquina do OU — teste 1 | curioso, explicando com calma | As duas alavancas estão ligadas. Com o OU, a luz acende? |
| ⬜ | `l5k.or.1.mp3` | Máquina do OU — teste 2 | curioso, explicando com calma | Só a alavanca 1 está ligada. Com o OU, a luz acende? |
| ⬜ | `l5k.or.2.mp3` | Máquina do OU — teste 3 | curioso, explicando com calma | Só a alavanca 2 está ligada. Com o OU, a luz acende? |
| ⬜ | `l5k.or.3.mp3` | Máquina do OU — teste 4 | curioso, explicando com calma | Nenhuma alavanca está ligada. Com o OU, a luz acende? |
| ⬜ | `l5k.or.h2.mp3` | Máquina do OU — errou (2 alavanca(s) ligada(s)) | carinhoso, incentivando | As duas alavancas mandaram energia! Com o OU, a luz acende. |
| ⬜ | `l5k.or.h1.mp3` | Máquina do OU — errou (1 alavanca(s) ligada(s)) | carinhoso, incentivando | Uma alavanca mandou energia, e com o OU uma já basta: a luz acende! |
| ⬜ | `l5k.or.h0.mp3` | Máquina do OU — errou (0 alavanca(s) ligada(s)) | carinhoso, incentivando | Nenhuma alavanca está ligada, então não sai energia e a luz fica apagada. |
| ⬜ | `l5k.tableDone.mp3` | Tabela Mestra completa | comemorando, bem animado | Olha a Tabela Mestra completa, com tudo que você descobriu! O laboratório tem energia de novo! |
| ⬜ | `l5k.success.mp3` | Acertou tudo | comemorando, bem animado | Você descobriu quando a energia acende a luz no E e no OU. O laboratório está funcionando de novo. Obrigado, amiguinho! |
| ⬜ | `l5k.complete.mp3` | Tela final da fase | comemorando, bem animado | Laboratório da Verdade restaurado! Você descobriu o verdadeiro e o falso, a Máquina do E, a Máquina do OU, o Espelho do NÃO e montou a Tabela Mestra. Que cientista incrível! |

## 9 a 12 anos · Floresta dos Conjuntos · Fase 1: Conhecendo os Grupos

| ✓ | Arquivo | Onde aparece | Tom | Fala |
|---|---|---|---|---|
| ⬜ | `t9.f1.intro.1.mp3` | Introdução · 1 | alegre, acolhedor | Olá, aventureiro! Bolinhas coloridas com números se espalharam pela floresta. Vamos organizar tudo em grupos? |
| ⬜ | `t9.f1.intro.2.mp3` | Introdução · 2 | curioso, explicando com calma | Um conjunto é um grupo de elementos que têm algo em comum. Pode ser a cor da bolinha, ou alguma coisa do próprio número! |
| ⬜ | `t9.f1.mission.mp3` | Missão | curioso, explicando com calma | Complete as três missões para formar os grupos. |
| ⬜ | `t9.f1.success.mp3` | Retorno: acertou tudo | comemorando, bem animado | Você formou grupos pela cor, por uma regra dos números e pelas duas coisas juntas. E ainda aprendeu a escrever um conjunto com chaves! |
| ⬜ | `t9.f1.hint.empty.mp3` | Retorno: dica — Verificar sem nada colocado | carinhoso, incentivando | Vamos começar? Arraste para o círculo uma bolinha que combina com a missão. |
| ⬜ | `t9.f1.hint.wrongInside.mp3` | Retorno: dica — tem bolinha errada dentro (1ª parte) | carinhoso, incentivando | Quase! Tem bolinha no círculo que não combina com a missão. |
| ⬜ | `t9.f1.hint.missing.mp3` | Retorno: dica — falta bolinha (1ª parte) | carinhoso, incentivando | Quase! Ainda tem bolinha certa esperando do lado de fora. |
| ⬜ | `t9.f1.hint.generic.mp3` | Retorno: dica — bolinha no lugar errado (1ª parte) | carinhoso, incentivando | Quase lá! Vamos olhar de novo? |
| ⬜ | `t9.f1.hint.visual.mp3` | Retorno: dica com destaque | carinhoso, incentivando | Olha só: as bolinhas que brilham são as que entram no círculo. |
| ⬜ | `v-f14b9344.mp3` | Missão sorteada | curioso, explicando com calma | Agora a cor não importa! Coloque no círculo os números ímpares. |
| ⬜ | `v-224530f6.mp3` | Missão sorteada | curioso, explicando com calma | Agora a cor não importa! Coloque no círculo os números maiores que 15. |
| ⬜ | `v-d24cb477.mp3` | Missão sorteada | curioso, explicando com calma | Agora a cor não importa! Coloque no círculo os números múltiplos de 3. |
| ⬜ | `v-f097bec6.mp3` | Missão sorteada | curioso, explicando com calma | Agora a cor não importa! Coloque no círculo os números pares. |
| ⬜ | `v-11923058.mp3` | Missão sorteada | curioso, explicando com calma | Coloque dentro do círculo todas as bolinhas amarelas. |
| ⬜ | `v-78ab02d2.mp3` | Missão sorteada | curioso, explicando com calma | Coloque dentro do círculo todas as bolinhas azuis. |
| ⬜ | `v-24604439.mp3` | Missão sorteada | curioso, explicando com calma | Coloque dentro do círculo todas as bolinhas vermelhas. |
| ⬜ | `v-8ed934c9.mp3` | Missão sorteada | curioso, explicando com calma | Desafio! Coloque no círculo só os números ímpares que pertencem ao grupo das amarelas. |
| ⬜ | `v-19e48ae1.mp3` | Missão sorteada | curioso, explicando com calma | Desafio! Coloque no círculo só os números ímpares que pertencem ao grupo das azuis. |
| ⬜ | `v-56cc34f6.mp3` | Missão sorteada | curioso, explicando com calma | Desafio! Coloque no círculo só os números ímpares que pertencem ao grupo das vermelhas. |
| ⬜ | `v-49dd6f43.mp3` | Missão sorteada | curioso, explicando com calma | Desafio! Coloque no círculo só os números maiores que 15 que pertencem ao grupo das amarelas. |
| ⬜ | `v-8824d8b7.mp3` | Missão sorteada | curioso, explicando com calma | Desafio! Coloque no círculo só os números maiores que 15 que pertencem ao grupo das azuis. |
| ⬜ | `v-a962c8e8.mp3` | Missão sorteada | curioso, explicando com calma | Desafio! Coloque no círculo só os números maiores que 15 que pertencem ao grupo das vermelhas. |
| ⬜ | `v-4b9bcdfe.mp3` | Missão sorteada | curioso, explicando com calma | Desafio! Coloque no círculo só os números múltiplos de 3 que pertencem ao grupo das amarelas. |
| ⬜ | `v-d327ebf4.mp3` | Missão sorteada | curioso, explicando com calma | Desafio! Coloque no círculo só os números múltiplos de 3 que pertencem ao grupo das azuis. |
| ⬜ | `v-bf37e1df.mp3` | Missão sorteada | curioso, explicando com calma | Desafio! Coloque no círculo só os números múltiplos de 3 que pertencem ao grupo das vermelhas. |
| ⬜ | `v-dc6350c3.mp3` | Missão sorteada | curioso, explicando com calma | Desafio! Coloque no círculo só os números pares que pertencem ao grupo das amarelas. |
| ⬜ | `v-96c80d37.mp3` | Missão sorteada | curioso, explicando com calma | Desafio! Coloque no círculo só os números pares que pertencem ao grupo das azuis. |
| ⬜ | `v-d224c568.mp3` | Missão sorteada | curioso, explicando com calma | Desafio! Coloque no círculo só os números pares que pertencem ao grupo das vermelhas. |
| ⬜ | `v-767be934.mp3` | Dica da missão (2ª parte, depois do “Quase!”) | carinhoso, incentivando | "Maior que 15" não inclui o próprio 15. |
| ⬜ | `v-80f7aafd.mp3` | Dica da missão (2ª parte, depois do “Quase!”) | carinhoso, incentivando | A bolinha precisa ser amarela e o número precisa ser ímpar: as duas coisas juntas! |
| ⬜ | `v-d404dc5f.mp3` | Dica da missão (2ª parte, depois do “Quase!”) | carinhoso, incentivando | A bolinha precisa ser amarela e o número precisa ser maior que 15: as duas coisas juntas! |
| ⬜ | `v-26f4b5fb.mp3` | Dica da missão (2ª parte, depois do “Quase!”) | carinhoso, incentivando | A bolinha precisa ser amarela e o número precisa ser múltiplo de 3: as duas coisas juntas! |
| ⬜ | `v-eb7fd57b.mp3` | Dica da missão (2ª parte, depois do “Quase!”) | carinhoso, incentivando | A bolinha precisa ser amarela e o número precisa ser par: as duas coisas juntas! |
| ⬜ | `v-e73310be.mp3` | Dica da missão (2ª parte, depois do “Quase!”) | carinhoso, incentivando | A bolinha precisa ser azul e o número precisa ser ímpar: as duas coisas juntas! |
| ⬜ | `v-08f1947a.mp3` | Dica da missão (2ª parte, depois do “Quase!”) | carinhoso, incentivando | A bolinha precisa ser azul e o número precisa ser maior que 15: as duas coisas juntas! |
| ⬜ | `v-bd768988.mp3` | Dica da missão (2ª parte, depois do “Quase!”) | carinhoso, incentivando | A bolinha precisa ser azul e o número precisa ser múltiplo de 3: as duas coisas juntas! |
| ⬜ | `v-49be9ad8.mp3` | Dica da missão (2ª parte, depois do “Quase!”) | carinhoso, incentivando | A bolinha precisa ser azul e o número precisa ser par: as duas coisas juntas! |
| ⬜ | `v-3d3cf526.mp3` | Dica da missão (2ª parte, depois do “Quase!”) | carinhoso, incentivando | A bolinha precisa ser vermelha e o número precisa ser ímpar: as duas coisas juntas! |
| ⬜ | `v-663dca42.mp3` | Dica da missão (2ª parte, depois do “Quase!”) | carinhoso, incentivando | A bolinha precisa ser vermelha e o número precisa ser maior que 15: as duas coisas juntas! |
| ⬜ | `v-6f646af0.mp3` | Dica da missão (2ª parte, depois do “Quase!”) | carinhoso, incentivando | A bolinha precisa ser vermelha e o número precisa ser múltiplo de 3: as duas coisas juntas! |
| ⬜ | `v-487a3100.mp3` | Dica da missão (2ª parte, depois do “Quase!”) | carinhoso, incentivando | A bolinha precisa ser vermelha e o número precisa ser par: as duas coisas juntas! |
| ⬜ | `v-278f3c9e.mp3` | Dica da missão (2ª parte, depois do “Quase!”) | carinhoso, incentivando | Números ímpares terminam em 1, 3, 5, 7 ou 9. |
| ⬜ | `v-fc06a051.mp3` | Dica da missão (2ª parte, depois do “Quase!”) | carinhoso, incentivando | Números pares terminam em 0, 2, 4, 6 ou 8. |
| ⬜ | `v-ef197842.mp3` | Dica da missão (2ª parte, depois do “Quase!”) | carinhoso, incentivando | Olhe só a cor da bolinha: o número não importa agora. |
| ⬜ | `v-030a43c9.mp3` | Dica da missão (2ª parte, depois do “Quase!”) | carinhoso, incentivando | Os múltiplos de 3 estão na tabuada do 3: 3, 6, 9, 12… |
| ⬜ | `t9.f1.complete.mp3` | Tela final da fase | comemorando, bem animado | Primeira fase concluída! Um conjunto se escreve com uma letra e os elementos entre chaves. E agora você conhece o símbolo de “pertence” e o de “não pertence”. |

## 9 a 12 anos · Floresta dos Conjuntos · Fase 2: Quem Pertence Aqui?

| ✓ | Arquivo | Onde aparece | Tom | Fala |
|---|---|---|---|---|
| ⬜ | `t9.f2.intro.1.mp3` | Introdução · 1 | alegre, acolhedor | Quando um elemento faz parte de um grupo, dizemos que ele pertence ao grupo. Quando não faz parte, ele não pertence. |
| ⬜ | `t9.f2.intro.2.mp3` | Introdução · 2 | curioso, explicando com calma | Os matemáticos têm um símbolo para isso: parece um E arredondado e quer dizer “pertence”. Com um risquinho, quer dizer “não pertence”. Vamos usar os dois! |
| ⬜ | `t9.f2.mission.mp3` | Missão | curioso, explicando com calma | Responda se cada bolinha pertence ao grupo. |
| ⬜ | `t9.f2.success.mp3` | Retorno: acertou tudo | comemorando, bem animado | Você decidiu quem pertence a cada grupo e ainda escreveu tudo do jeito dos matemáticos. |
| ⬜ | `t9.f2.hint.visual.mp3` | Retorno: dica com destaque | carinhoso, incentivando | Olha só: o botão certo está brilhando. Leia de novo a regra do grupo! |
| ⬜ | `v-5b17380a.mp3` | Apresentação do grupo sorteado | curioso, explicando com calma | Agora o grupo A está escrito com chaves. Repare: aqui a cor não importa, só o número que está dentro das chaves! |
| ⬜ | `v-d4267767.mp3` | Apresentação do grupo sorteado | curioso, explicando com calma | Primeiro grupo: o grupo C tem os números múltiplos de 5. Para cada bolinha, responda: pertence ou não pertence? |
| ⬜ | `v-a4456c7f.mp3` | Apresentação do grupo sorteado | curioso, explicando com calma | Primeiro grupo: o grupo G tem os números maiores que 12. Para cada bolinha, responda: pertence ou não pertence? |
| ⬜ | `v-3d5d0070.mp3` | Apresentação do grupo sorteado | curioso, explicando com calma | Primeiro grupo: o grupo I tem os números ímpares. Para cada bolinha, responda: pertence ou não pertence? |
| ⬜ | `v-82770bc7.mp3` | Apresentação do grupo sorteado | curioso, explicando com calma | Primeiro grupo: o grupo P tem os números pares. Para cada bolinha, responda: pertence ou não pertence? |
| ⬜ | `v-81bc8e3a.mp3` | Apresentação do grupo sorteado | curioso, explicando com calma | Primeiro grupo: o grupo Q tem os números múltiplos de 4. Para cada bolinha, responda: pertence ou não pertence? |
| ⬜ | `v-9d510270.mp3` | Apresentação do grupo sorteado | curioso, explicando com calma | Primeiro grupo: o grupo T tem os números múltiplos de 3. Para cada bolinha, responda: pertence ou não pertence? |
| ⬜ | `v-9a174dff.mp3` | Apresentação do grupo sorteado | curioso, explicando com calma | Último grupo, o desafio! Para pertencer a B, a bolinha precisa ser amarela e o número precisa ser ímpar. As duas coisas juntas! |
| ⬜ | `v-bf45e29c.mp3` | Apresentação do grupo sorteado | curioso, explicando com calma | Último grupo, o desafio! Para pertencer a B, a bolinha precisa ser amarela e o número precisa ser maior que 12. As duas coisas juntas! |
| ⬜ | `v-5bab6c65.mp3` | Apresentação do grupo sorteado | curioso, explicando com calma | Último grupo, o desafio! Para pertencer a B, a bolinha precisa ser amarela e o número precisa ser múltiplo de 3. As duas coisas juntas! |
| ⬜ | `v-1014d6b0.mp3` | Apresentação do grupo sorteado | curioso, explicando com calma | Último grupo, o desafio! Para pertencer a B, a bolinha precisa ser amarela e o número precisa ser múltiplo de 4. As duas coisas juntas! |
| ⬜ | `v-401bff03.mp3` | Apresentação do grupo sorteado | curioso, explicando com calma | Último grupo, o desafio! Para pertencer a B, a bolinha precisa ser amarela e o número precisa ser múltiplo de 5. As duas coisas juntas! |
| ⬜ | `v-17030b65.mp3` | Apresentação do grupo sorteado | curioso, explicando com calma | Último grupo, o desafio! Para pertencer a B, a bolinha precisa ser amarela e o número precisa ser par. As duas coisas juntas! |
| ⬜ | `v-c0542e44.mp3` | Apresentação do grupo sorteado | curioso, explicando com calma | Último grupo, o desafio! Para pertencer a B, a bolinha precisa ser azul e o número precisa ser ímpar. As duas coisas juntas! |
| ⬜ | `v-fa3ca06d.mp3` | Apresentação do grupo sorteado | curioso, explicando com calma | Último grupo, o desafio! Para pertencer a B, a bolinha precisa ser azul e o número precisa ser maior que 12. As duas coisas juntas! |
| ⬜ | `v-3607701e.mp3` | Apresentação do grupo sorteado | curioso, explicando com calma | Último grupo, o desafio! Para pertencer a B, a bolinha precisa ser azul e o número precisa ser múltiplo de 3. As duas coisas juntas! |
| ⬜ | `v-814dbd97.mp3` | Apresentação do grupo sorteado | curioso, explicando com calma | Último grupo, o desafio! Para pertencer a B, a bolinha precisa ser azul e o número precisa ser múltiplo de 4. As duas coisas juntas! |
| ⬜ | `v-95fa4bf4.mp3` | Apresentação do grupo sorteado | curioso, explicando com calma | Último grupo, o desafio! Para pertencer a B, a bolinha precisa ser azul e o número precisa ser múltiplo de 5. As duas coisas juntas! |
| ⬜ | `v-782bbf8e.mp3` | Apresentação do grupo sorteado | curioso, explicando com calma | Último grupo, o desafio! Para pertencer a B, a bolinha precisa ser azul e o número precisa ser par. As duas coisas juntas! |
| ⬜ | `v-196ca478.mp3` | Apresentação do grupo sorteado | curioso, explicando com calma | Último grupo, o desafio! Para pertencer a B, a bolinha precisa ser vermelha e o número precisa ser ímpar. As duas coisas juntas! |
| ⬜ | `v-4f2d6539.mp3` | Apresentação do grupo sorteado | curioso, explicando com calma | Último grupo, o desafio! Para pertencer a B, a bolinha precisa ser vermelha e o número precisa ser maior que 12. As duas coisas juntas! |
| ⬜ | `v-c155d58a.mp3` | Apresentação do grupo sorteado | curioso, explicando com calma | Último grupo, o desafio! Para pertencer a B, a bolinha precisa ser vermelha e o número precisa ser múltiplo de 3. As duas coisas juntas! |
| ⬜ | `v-531217eb.mp3` | Apresentação do grupo sorteado | curioso, explicando com calma | Último grupo, o desafio! Para pertencer a B, a bolinha precisa ser vermelha e o número precisa ser múltiplo de 4. As duas coisas juntas! |
| ⬜ | `v-5efed3f8.mp3` | Apresentação do grupo sorteado | curioso, explicando com calma | Último grupo, o desafio! Para pertencer a B, a bolinha precisa ser vermelha e o número precisa ser múltiplo de 5. As duas coisas juntas! |
| ⬜ | `v-660f69d2.mp3` | Apresentação do grupo sorteado | curioso, explicando com calma | Último grupo, o desafio! Para pertencer a B, a bolinha precisa ser vermelha e o número precisa ser par. As duas coisas juntas! |
| ⬜ | `t9.f2.complete.mp3` | Tela final da fase | comemorando, bem animado | Pertinência: concluída! Para cada elemento só existem duas respostas: ele pertence ou não pertence ao grupo. E a cor da bolinha só importa quando a regra fala dela! |

## 9 a 12 anos · Floresta dos Conjuntos · Fase 3: A Ponte do E

| ✓ | Arquivo | Onde aparece | Tom | Fala |
|---|---|---|---|---|
| ⬜ | `t9.f3.intro.1.mp3` | Introdução · 1 | curioso, explicando com calma | Às vezes um elemento pertence a dois grupos ao mesmo tempo! Quando isso acontece, ele fica no meio, na ponte entre os dois grupos. |
| ⬜ | `t9.f3.intro.2.mp3` | Introdução · 2 | alegre, acolhedor | Lembra da missão das bolinhas que eram de uma cor e também ímpares? Hoje essa parte do meio vai ganhar um nome e um símbolo só dela! |
| ⬜ | `t9.f3.mission.mp3` | Missão | curioso, explicando com calma | Coloque cada bolinha no lugar certo do diagrama. |
| ⬜ | `t9.f3.success.mp3` | Retorno: acertou tudo | comemorando, bem animado | Você encontrou as bolinhas que estão nos dois grupos ao mesmo tempo. Essa parte do meio se chama interseção. |
| ⬜ | `t9.f3.hint.empty.mp3` | Retorno: dica — Verificar sem nada colocado | carinhoso, incentivando | Vamos começar? Arraste cada bolinha para o grupo dela. |
| ⬜ | `t9.f3.hint.missingBoth.mp3` | Retorno: dica — bolinha dos dois grupos fora do meio (1ª parte) | carinhoso, incentivando | Quase! Tem bolinha que pertence aos dois grupos e deveria estar no meio. |
| ⬜ | `t9.f3.hint.wrongBoth.mp3` | Retorno: dica — bolinha no meio que não é dos dois (1ª parte) | carinhoso, incentivando | Quase! No meio só fica quem pertence aos dois grupos ao mesmo tempo. |
| ⬜ | `t9.f3.hint.generic.mp3` | Retorno: dica — bolinha no lugar errado (1ª parte) | carinhoso, incentivando | Quase! Tem bolinha no lugar errado. |
| ⬜ | `t9.f3.hint.visual.mp3` | Retorno: dica com destaque | carinhoso, incentivando | Coloquei etiquetas nas bolinhas: cada letra mostra um grupo a que ela pertence. Duas letras? Vai para o meio! |
| ⬜ | `v-80f2c6ef.mp3` | Missão sorteada | curioso, explicando com calma | Agora a cor não importa! Um grupo tem os números ímpares e o outro, os maiores que 10. Coloque cada bolinha no lugar certo. |
| ⬜ | `v-bbccb99f.mp3` | Missão sorteada | curioso, explicando com calma | Agora a cor não importa! Um grupo tem os números ímpares e o outro, os menores que 6. Coloque cada bolinha no lugar certo. |
| ⬜ | `v-3a5bea09.mp3` | Missão sorteada | curioso, explicando com calma | Agora a cor não importa! Um grupo tem os números múltiplos de 3 e o outro, os maiores que 15. Coloque cada bolinha no lugar certo. |
| ⬜ | `v-062070d7.mp3` | Missão sorteada | curioso, explicando com calma | Agora a cor não importa! Um grupo tem os números múltiplos de 3 e o outro, os múltiplos de 4. Coloque cada bolinha no lugar certo. |
| ⬜ | `v-7abcbd6f.mp3` | Missão sorteada | curioso, explicando com calma | Agora a cor não importa! Um grupo tem os números múltiplos de 5 e o outro, os pares. Coloque cada bolinha no lugar certo. |
| ⬜ | `v-ec283919.mp3` | Missão sorteada | curioso, explicando com calma | Agora a cor não importa! Um grupo tem os números pares e o outro, os menores que 6. Coloque cada bolinha no lugar certo. |
| ⬜ | `v-8cf4a149.mp3` | Missão sorteada | curioso, explicando com calma | Agora a cor não importa! Um grupo tem os números pares e o outro, os múltiplos de 3. Coloque cada bolinha no lugar certo. |
| ⬜ | `v-436615cf.mp3` | Missão sorteada | curioso, explicando com calma | Agora a cor não importa! Um grupo tem os números pares e o outro, os múltiplos de 5. Coloque cada bolinha no lugar certo. |
| ⬜ | `v-a5ac3dd8.mp3` | Missão sorteada | curioso, explicando com calma | Coloque cada bolinha no lugar certo: no grupo das amarelas, no grupo dos ímpares, no meio se for as duas coisas, ou fora. |
| ⬜ | `v-6d3c7f44.mp3` | Missão sorteada | curioso, explicando com calma | Coloque cada bolinha no lugar certo: no grupo das amarelas, no grupo dos maiores que 15, no meio se for as duas coisas, ou fora. |
| ⬜ | `v-e2b7ad85.mp3` | Missão sorteada | curioso, explicando com calma | Coloque cada bolinha no lugar certo: no grupo das amarelas, no grupo dos múltiplos de 3, no meio se for as duas coisas, ou fora. |
| ⬜ | `v-56c12596.mp3` | Missão sorteada | curioso, explicando com calma | Coloque cada bolinha no lugar certo: no grupo das amarelas, no grupo dos múltiplos de 4, no meio se for as duas coisas, ou fora. |
| ⬜ | `v-8d4d536a.mp3` | Missão sorteada | curioso, explicando com calma | Coloque cada bolinha no lugar certo: no grupo das amarelas, no grupo dos pares, no meio se for as duas coisas, ou fora. |
| ⬜ | `v-97557d22.mp3` | Missão sorteada | curioso, explicando com calma | Coloque cada bolinha no lugar certo: no grupo das azuis, no grupo dos ímpares, no meio se for as duas coisas, ou fora. |
| ⬜ | `v-60bb583e.mp3` | Missão sorteada | curioso, explicando com calma | Coloque cada bolinha no lugar certo: no grupo das azuis, no grupo dos maiores que 15, no meio se for as duas coisas, ou fora. |
| ⬜ | `v-28ca4393.mp3` | Missão sorteada | curioso, explicando com calma | Coloque cada bolinha no lugar certo: no grupo das azuis, no grupo dos múltiplos de 3, no meio se for as duas coisas, ou fora. |
| ⬜ | `v-35d27d20.mp3` | Missão sorteada | curioso, explicando com calma | Coloque cada bolinha no lugar certo: no grupo das azuis, no grupo dos múltiplos de 4, no meio se for as duas coisas, ou fora. |
| ⬜ | `v-f26e0f4c.mp3` | Missão sorteada | curioso, explicando com calma | Coloque cada bolinha no lugar certo: no grupo das azuis, no grupo dos pares, no meio se for as duas coisas, ou fora. |
| ⬜ | `v-089bc225.mp3` | Missão sorteada | curioso, explicando com calma | Coloque cada bolinha no lugar certo: no grupo das vermelhas, no grupo dos ímpares, no meio se for as duas coisas, ou fora. |
| ⬜ | `v-7aff8663.mp3` | Missão sorteada | curioso, explicando com calma | Coloque cada bolinha no lugar certo: no grupo das vermelhas, no grupo dos maiores que 15, no meio se for as duas coisas, ou fora. |
| ⬜ | `v-fe1d4a06.mp3` | Missão sorteada | curioso, explicando com calma | Coloque cada bolinha no lugar certo: no grupo das vermelhas, no grupo dos múltiplos de 3, no meio se for as duas coisas, ou fora. |
| ⬜ | `v-69e582b5.mp3` | Missão sorteada | curioso, explicando com calma | Coloque cada bolinha no lugar certo: no grupo das vermelhas, no grupo dos múltiplos de 4, no meio se for as duas coisas, ou fora. |
| ⬜ | `v-862200bb.mp3` | Missão sorteada | curioso, explicando com calma | Coloque cada bolinha no lugar certo: no grupo das vermelhas, no grupo dos pares, no meio se for as duas coisas, ou fora. |
| ⬜ | `v-46eefaa3.mp3` | Dica da missão (2ª parte, depois do “Quase!”) | carinhoso, incentivando | Olhe só o número: ele é ímpar? Ele é maior que 10? Se for as duas coisas, vai no meio. A cor da bolinha não conta. |
| ⬜ | `v-c71f9159.mp3` | Dica da missão (2ª parte, depois do “Quase!”) | carinhoso, incentivando | Olhe só o número: ele é ímpar? Ele é menor que 6? Se for as duas coisas, vai no meio. A cor da bolinha não conta. |
| ⬜ | `v-835fd740.mp3` | Dica da missão (2ª parte, depois do “Quase!”) | carinhoso, incentivando | Olhe só o número: ele é múltiplo de 3? Ele é maior que 15? Se for as duas coisas, vai no meio. A cor da bolinha não conta. |
| ⬜ | `v-eb09e9df.mp3` | Dica da missão (2ª parte, depois do “Quase!”) | carinhoso, incentivando | Olhe só o número: ele é múltiplo de 3? Ele é múltiplo de 4? Se for as duas coisas, vai no meio. A cor da bolinha não conta. |
| ⬜ | `v-d583250e.mp3` | Dica da missão (2ª parte, depois do “Quase!”) | carinhoso, incentivando | Olhe só o número: ele é múltiplo de 5? Ele é par? Se for as duas coisas, vai no meio. A cor da bolinha não conta. |
| ⬜ | `v-517647b3.mp3` | Dica da missão (2ª parte, depois do “Quase!”) | carinhoso, incentivando | Olhe só o número: ele é par? Ele é menor que 6? Se for as duas coisas, vai no meio. A cor da bolinha não conta. |
| ⬜ | `v-9f5b7c44.mp3` | Dica da missão (2ª parte, depois do “Quase!”) | carinhoso, incentivando | Olhe só o número: ele é par? Ele é múltiplo de 3? Se for as duas coisas, vai no meio. A cor da bolinha não conta. |
| ⬜ | `v-662aff7a.mp3` | Dica da missão (2ª parte, depois do “Quase!”) | carinhoso, incentivando | Olhe só o número: ele é par? Ele é múltiplo de 5? Se for as duas coisas, vai no meio. A cor da bolinha não conta. |
| ⬜ | `v-4c4bf977.mp3` | Dica da missão (2ª parte, depois do “Quase!”) | carinhoso, incentivando | Pergunte para cada bolinha: ela é amarela? O número é ímpar? Se as duas respostas forem sim, ela vai no meio. |
| ⬜ | `v-8bf64801.mp3` | Dica da missão (2ª parte, depois do “Quase!”) | carinhoso, incentivando | Pergunte para cada bolinha: ela é amarela? O número é maior que 15? Se as duas respostas forem sim, ela vai no meio. |
| ⬜ | `v-e0c13c4d.mp3` | Dica da missão (2ª parte, depois do “Quase!”) | carinhoso, incentivando | Pergunte para cada bolinha: ela é amarela? O número é múltiplo de 3? Se as duas respostas forem sim, ela vai no meio. |
| ⬜ | `v-88d82988.mp3` | Dica da missão (2ª parte, depois do “Quase!”) | carinhoso, incentivando | Pergunte para cada bolinha: ela é amarela? O número é múltiplo de 4? Se as duas respostas forem sim, ela vai no meio. |
| ⬜ | `v-f897e74d.mp3` | Dica da missão (2ª parte, depois do “Quase!”) | carinhoso, incentivando | Pergunte para cada bolinha: ela é amarela? O número é par? Se as duas respostas forem sim, ela vai no meio. |
| ⬜ | `v-25c21606.mp3` | Dica da missão (2ª parte, depois do “Quase!”) | carinhoso, incentivando | Pergunte para cada bolinha: ela é azul? O número é ímpar? Se as duas respostas forem sim, ela vai no meio. |
| ⬜ | `v-85cc6ae2.mp3` | Dica da missão (2ª parte, depois do “Quase!”) | carinhoso, incentivando | Pergunte para cada bolinha: ela é azul? O número é maior que 15? Se as duas respostas forem sim, ela vai no meio. |
| ⬜ | `v-5e53f450.mp3` | Dica da missão (2ª parte, depois do “Quase!”) | carinhoso, incentivando | Pergunte para cada bolinha: ela é azul? O número é múltiplo de 3? Se as duas respostas forem sim, ela vai no meio. |
| ⬜ | `v-9fd1a875.mp3` | Dica da missão (2ª parte, depois do “Quase!”) | carinhoso, incentivando | Pergunte para cada bolinha: ela é azul? O número é múltiplo de 4? Se as duas respostas forem sim, ela vai no meio. |
| ⬜ | `v-cbd102c0.mp3` | Dica da missão (2ª parte, depois do “Quase!”) | carinhoso, incentivando | Pergunte para cada bolinha: ela é azul? O número é par? Se as duas respostas forem sim, ela vai no meio. |
| ⬜ | `v-4dd8c996.mp3` | Dica da missão (2ª parte, depois do “Quase!”) | carinhoso, incentivando | Pergunte para cada bolinha: ela é vermelha? O número é ímpar? Se as duas respostas forem sim, ela vai no meio. |
| ⬜ | `v-b9cf1d32.mp3` | Dica da missão (2ª parte, depois do “Quase!”) | carinhoso, incentivando | Pergunte para cada bolinha: ela é vermelha? O número é maior que 15? Se as duas respostas forem sim, ela vai no meio. |
| ⬜ | `v-ce65c360.mp3` | Dica da missão (2ª parte, depois do “Quase!”) | carinhoso, incentivando | Pergunte para cada bolinha: ela é vermelha? O número é múltiplo de 3? Se as duas respostas forem sim, ela vai no meio. |
| ⬜ | `v-82502d45.mp3` | Dica da missão (2ª parte, depois do “Quase!”) | carinhoso, incentivando | Pergunte para cada bolinha: ela é vermelha? O número é múltiplo de 4? Se as duas respostas forem sim, ela vai no meio. |
| ⬜ | `v-d9d233d0.mp3` | Dica da missão (2ª parte, depois do “Quase!”) | carinhoso, incentivando | Pergunte para cada bolinha: ela é vermelha? O número é par? Se as duas respostas forem sim, ela vai no meio. |
| ⬜ | `v-ddbfe3c7.mp3` | Quadro final da missão | comemorando, bem animado | De novo a interseção! C interseção P são os números que estão nos dois grupos: múltiplos de 5 e também pares. O símbolo da interseção é o símbolo do E. |
| ⬜ | `v-22388f78.mp3` | Quadro final da missão | comemorando, bem animado | De novo a interseção! I interseção G são os números que estão nos dois grupos: ímpares e também maiores que 10. O símbolo da interseção é o símbolo do E. |
| ⬜ | `v-03700068.mp3` | Quadro final da missão | comemorando, bem animado | De novo a interseção! I interseção M são os números que estão nos dois grupos: ímpares e também menores que 6. O símbolo da interseção é o símbolo do E. |
| ⬜ | `v-5012ae6f.mp3` | Quadro final da missão | comemorando, bem animado | De novo a interseção! P interseção C são os números que estão nos dois grupos: pares e também múltiplos de 5. O símbolo da interseção é o símbolo do E. |
| ⬜ | `v-bf77329f.mp3` | Quadro final da missão | comemorando, bem animado | De novo a interseção! P interseção M são os números que estão nos dois grupos: pares e também menores que 6. O símbolo da interseção é o símbolo do E. |
| ⬜ | `v-a0ef1892.mp3` | Quadro final da missão | comemorando, bem animado | De novo a interseção! P interseção T são os números que estão nos dois grupos: pares e também múltiplos de 3. O símbolo da interseção é o símbolo do E. |
| ⬜ | `v-211282bb.mp3` | Quadro final da missão | comemorando, bem animado | De novo a interseção! T interseção G são os números que estão nos dois grupos: múltiplos de 3 e também maiores que 15. O símbolo da interseção é o símbolo do E. |
| ⬜ | `v-02e8b6cb.mp3` | Quadro final da missão | comemorando, bem animado | De novo a interseção! T interseção Q são os números que estão nos dois grupos: múltiplos de 3 e também múltiplos de 4. O símbolo da interseção é o símbolo do E. |
| ⬜ | `v-f60009ac.mp3` | Quadro final da missão | comemorando, bem animado | O meio do diagrama tem um nome: interseção. Os matemáticos escrevem com um símbolo que parece um U de cabeça para baixo, e lemos: A interseção G. São as bolinhas que estão nos dois grupos ao mesmo tempo. |
| ⬜ | `v-4bdfb406.mp3` | Quadro final da missão | comemorando, bem animado | O meio do diagrama tem um nome: interseção. Os matemáticos escrevem com um símbolo que parece um U de cabeça para baixo, e lemos: A interseção I. São as bolinhas que estão nos dois grupos ao mesmo tempo. |
| ⬜ | `v-e74683f7.mp3` | Quadro final da missão | comemorando, bem animado | O meio do diagrama tem um nome: interseção. Os matemáticos escrevem com um símbolo que parece um U de cabeça para baixo, e lemos: A interseção P. São as bolinhas que estão nos dois grupos ao mesmo tempo. |
| ⬜ | `v-e8758c5e.mp3` | Quadro final da missão | comemorando, bem animado | O meio do diagrama tem um nome: interseção. Os matemáticos escrevem com um símbolo que parece um U de cabeça para baixo, e lemos: A interseção Q. São as bolinhas que estão nos dois grupos ao mesmo tempo. |
| ⬜ | `v-d6760a9b.mp3` | Quadro final da missão | comemorando, bem animado | O meio do diagrama tem um nome: interseção. Os matemáticos escrevem com um símbolo que parece um U de cabeça para baixo, e lemos: A interseção T. São as bolinhas que estão nos dois grupos ao mesmo tempo. |
| ⬜ | `v-4a084cf8.mp3` | Quadro final da missão | comemorando, bem animado | O meio do diagrama tem um nome: interseção. Os matemáticos escrevem com um símbolo que parece um U de cabeça para baixo, e lemos: M interseção G. São as bolinhas que estão nos dois grupos ao mesmo tempo. |
| ⬜ | `v-a012b94a.mp3` | Quadro final da missão | comemorando, bem animado | O meio do diagrama tem um nome: interseção. Os matemáticos escrevem com um símbolo que parece um U de cabeça para baixo, e lemos: M interseção I. São as bolinhas que estão nos dois grupos ao mesmo tempo. |
| ⬜ | `v-0b451f7b.mp3` | Quadro final da missão | comemorando, bem animado | O meio do diagrama tem um nome: interseção. Os matemáticos escrevem com um símbolo que parece um U de cabeça para baixo, e lemos: M interseção P. São as bolinhas que estão nos dois grupos ao mesmo tempo. |
| ⬜ | `v-70a0d9e2.mp3` | Quadro final da missão | comemorando, bem animado | O meio do diagrama tem um nome: interseção. Os matemáticos escrevem com um símbolo que parece um U de cabeça para baixo, e lemos: M interseção Q. São as bolinhas que estão nos dois grupos ao mesmo tempo. |
| ⬜ | `v-8dcab657.mp3` | Quadro final da missão | comemorando, bem animado | O meio do diagrama tem um nome: interseção. Os matemáticos escrevem com um símbolo que parece um U de cabeça para baixo, e lemos: M interseção T. São as bolinhas que estão nos dois grupos ao mesmo tempo. |
| ⬜ | `v-2a7e6b81.mp3` | Quadro final da missão | comemorando, bem animado | O meio do diagrama tem um nome: interseção. Os matemáticos escrevem com um símbolo que parece um U de cabeça para baixo, e lemos: V interseção G. São as bolinhas que estão nos dois grupos ao mesmo tempo. |
| ⬜ | `v-6e1dda73.mp3` | Quadro final da missão | comemorando, bem animado | O meio do diagrama tem um nome: interseção. Os matemáticos escrevem com um símbolo que parece um U de cabeça para baixo, e lemos: V interseção I. São as bolinhas que estão nos dois grupos ao mesmo tempo. |
| ⬜ | `v-d3db8132.mp3` | Quadro final da missão | comemorando, bem animado | O meio do diagrama tem um nome: interseção. Os matemáticos escrevem com um símbolo que parece um U de cabeça para baixo, e lemos: V interseção P. São as bolinhas que estão nos dois grupos ao mesmo tempo. |
| ⬜ | `v-b66a140b.mp3` | Quadro final da missão | comemorando, bem animado | O meio do diagrama tem um nome: interseção. Os matemáticos escrevem com um símbolo que parece um U de cabeça para baixo, e lemos: V interseção Q. São as bolinhas que estão nos dois grupos ao mesmo tempo. |
| ⬜ | `v-7c52c7ce.mp3` | Quadro final da missão | comemorando, bem animado | O meio do diagrama tem um nome: interseção. Os matemáticos escrevem com um símbolo que parece um U de cabeça para baixo, e lemos: V interseção T. São as bolinhas que estão nos dois grupos ao mesmo tempo. |
| ⬜ | `t9.f3.complete.mp3` | Tela final da fase | comemorando, bem animado | Interseção: concluída! A interseção é a parte do meio: os elementos que estão nos dois grupos ao mesmo tempo. O símbolo dela parece um U de cabeça para baixo. |

## 9 a 12 anos · Floresta dos Conjuntos · Fase 4: O Portal do OU

| ✓ | Arquivo | Onde aparece | Tom | Fala |
|---|---|---|---|---|
| ⬜ | `t9.f4.intro.1.mp3` | Introdução · 1 | curioso, explicando com calma | Este portal é diferente: ele deixa passar quem está em um grupo OU no outro. Basta uma das duas coisas, e quem está nos dois também passa! |
| ⬜ | `t9.f4.intro.2.mp3` | Introdução · 2 | alegre, acolhedor | As bolinhas vão subir dentro de bolhas. Estoure só as que o portal deixa passar! |
| ⬜ | `t9.f4.mission.mp3` | Missão | curioso, explicando com calma | Estoure as bolhas das bolinhas que podem passar pelo portal. |
| ⬜ | `t9.f4.success.mp3` | Retorno: acertou tudo | comemorando, bem animado | Você juntou dois grupos em um só. Isso se chama união: está em um grupo, ou no outro, ou nos dois. |
| ⬜ | `t9.f4.hint.visual.mp3` | Retorno: dica com destaque | carinhoso, incentivando | Olha só: as bolhas que brilham são as que o portal deixa passar! |
| ⬜ | `t9.f4.hint.idle.mp3` | Retorno: dica — parado sem tocar | carinhoso, incentivando | Escolha uma bolha! Pergunte: essa bolinha está em algum dos dois grupos? |
| ⬜ | `v-870c722a.mp3` | Missão sorteada | curioso, explicando com calma | Agora a cor não importa! O portal deixa passar números ímpares OU maiores que 10. |
| ⬜ | `v-7bf17c6a.mp3` | Missão sorteada | curioso, explicando com calma | Agora a cor não importa! O portal deixa passar números ímpares OU menores que 6. |
| ⬜ | `v-86244410.mp3` | Missão sorteada | curioso, explicando com calma | Agora a cor não importa! O portal deixa passar números múltiplos de 3 OU maiores que 15. |
| ⬜ | `v-96a20d84.mp3` | Missão sorteada | curioso, explicando com calma | Agora a cor não importa! O portal deixa passar números múltiplos de 4 OU múltiplos de 5. |
| ⬜ | `v-d1bc1d9a.mp3` | Missão sorteada | curioso, explicando com calma | Agora a cor não importa! O portal deixa passar números múltiplos de 5 OU maiores que 15. |
| ⬜ | `v-b829fed3.mp3` | Missão sorteada | curioso, explicando com calma | Agora a cor não importa! O portal deixa passar números múltiplos de 5 OU múltiplos de 3. |
| ⬜ | `v-2d075ca8.mp3` | Missão sorteada | curioso, explicando com calma | Agora a cor não importa! O portal deixa passar números pares OU menores que 6. |
| ⬜ | `v-f2583fe6.mp3` | Missão sorteada | curioso, explicando com calma | Agora a cor não importa! O portal deixa passar números pares OU múltiplos de 5. |
| ⬜ | `v-47bcbe80.mp3` | Missão sorteada | curioso, explicando com calma | O portal só deixa passar bolinhas amarelas OU com número ímpar. Basta uma das duas coisas! Estoure as bolhas certas. |
| ⬜ | `v-ef2ca252.mp3` | Missão sorteada | curioso, explicando com calma | O portal só deixa passar bolinhas amarelas OU com número maior que 15. Basta uma das duas coisas! Estoure as bolhas certas. |
| ⬜ | `v-f9ecb45e.mp3` | Missão sorteada | curioso, explicando com calma | O portal só deixa passar bolinhas amarelas OU com número múltiplo de 3. Basta uma das duas coisas! Estoure as bolhas certas. |
| ⬜ | `v-f38e05b3.mp3` | Missão sorteada | curioso, explicando com calma | O portal só deixa passar bolinhas amarelas OU com número múltiplo de 4. Basta uma das duas coisas! Estoure as bolhas certas. |
| ⬜ | `v-00b2be5e.mp3` | Missão sorteada | curioso, explicando com calma | O portal só deixa passar bolinhas amarelas OU com número par. Basta uma das duas coisas! Estoure as bolhas certas. |
| ⬜ | `v-615dbdc0.mp3` | Missão sorteada | curioso, explicando com calma | O portal só deixa passar bolinhas azuis OU com número ímpar. Basta uma das duas coisas! Estoure as bolhas certas. |
| ⬜ | `v-2535a392.mp3` | Missão sorteada | curioso, explicando com calma | O portal só deixa passar bolinhas azuis OU com número maior que 15. Basta uma das duas coisas! Estoure as bolhas certas. |
| ⬜ | `v-c8969f1e.mp3` | Missão sorteada | curioso, explicando com calma | O portal só deixa passar bolinhas azuis OU com número múltiplo de 3. Basta uma das duas coisas! Estoure as bolhas certas. |
| ⬜ | `v-1cbb4f73.mp3` | Missão sorteada | curioso, explicando com calma | O portal só deixa passar bolinhas azuis OU com número múltiplo de 4. Basta uma das duas coisas! Estoure as bolhas certas. |
| ⬜ | `v-4a582a9e.mp3` | Missão sorteada | curioso, explicando com calma | O portal só deixa passar bolinhas azuis OU com número par. Basta uma das duas coisas! Estoure as bolhas certas. |
| ⬜ | `v-aed85041.mp3` | Missão sorteada | curioso, explicando com calma | O portal só deixa passar bolinhas vermelhas OU com número ímpar. Basta uma das duas coisas! Estoure as bolhas certas. |
| ⬜ | `v-358ab78d.mp3` | Missão sorteada | curioso, explicando com calma | O portal só deixa passar bolinhas vermelhas OU com número maior que 15. Basta uma das duas coisas! Estoure as bolhas certas. |
| ⬜ | `v-549eae3b.mp3` | Missão sorteada | curioso, explicando com calma | O portal só deixa passar bolinhas vermelhas OU com número múltiplo de 3. Basta uma das duas coisas! Estoure as bolhas certas. |
| ⬜ | `v-e72ad3c6.mp3` | Missão sorteada | curioso, explicando com calma | O portal só deixa passar bolinhas vermelhas OU com número múltiplo de 4. Basta uma das duas coisas! Estoure as bolhas certas. |
| ⬜ | `v-da6def0b.mp3` | Missão sorteada | curioso, explicando com calma | O portal só deixa passar bolinhas vermelhas OU com número par. Basta uma das duas coisas! Estoure as bolhas certas. |
| ⬜ | `v-045c46d0.mp3` | Quadro final da missão | comemorando, bem animado | C união G: todos os números que são múltiplo de 5, ou maior que 15, ou as duas coisas. A união junta tudo; a interseção fica só com o meio. |
| ⬜ | `v-862ac923.mp3` | Quadro final da missão | comemorando, bem animado | C união T: todos os números que são múltiplo de 5, ou múltiplo de 3, ou as duas coisas. A união junta tudo; a interseção fica só com o meio. |
| ⬜ | `v-26324dc7.mp3` | Quadro final da missão | comemorando, bem animado | I união G: todos os números que são ímpar, ou maior que 10, ou as duas coisas. A união junta tudo; a interseção fica só com o meio. |
| ⬜ | `v-78a7ed47.mp3` | Quadro final da missão | comemorando, bem animado | I união M: todos os números que são ímpar, ou menor que 6, ou as duas coisas. A união junta tudo; a interseção fica só com o meio. |
| ⬜ | `v-89ac3b2c.mp3` | Quadro final da missão | comemorando, bem animado | Juntar dois grupos tem um nome: união. O símbolo parece um U, de união! A união G tem todas as bolinhas que estão em pelo menos um dos grupos. Compare com a interseção, que só tem o meio. |
| ⬜ | `v-4064cb8e.mp3` | Quadro final da missão | comemorando, bem animado | Juntar dois grupos tem um nome: união. O símbolo parece um U, de união! A união I tem todas as bolinhas que estão em pelo menos um dos grupos. Compare com a interseção, que só tem o meio. |
| ⬜ | `v-3cb1791d.mp3` | Quadro final da missão | comemorando, bem animado | Juntar dois grupos tem um nome: união. O símbolo parece um U, de união! A união P tem todas as bolinhas que estão em pelo menos um dos grupos. Compare com a interseção, que só tem o meio. |
| ⬜ | `v-dd009456.mp3` | Quadro final da missão | comemorando, bem animado | Juntar dois grupos tem um nome: união. O símbolo parece um U, de união! A união Q tem todas as bolinhas que estão em pelo menos um dos grupos. Compare com a interseção, que só tem o meio. |
| ⬜ | `v-67b5fef1.mp3` | Quadro final da missão | comemorando, bem animado | Juntar dois grupos tem um nome: união. O símbolo parece um U, de união! A união T tem todas as bolinhas que estão em pelo menos um dos grupos. Compare com a interseção, que só tem o meio. |
| ⬜ | `v-d1915d70.mp3` | Quadro final da missão | comemorando, bem animado | Juntar dois grupos tem um nome: união. O símbolo parece um U, de união! M união G tem todas as bolinhas que estão em pelo menos um dos grupos. Compare com a interseção, que só tem o meio. |
| ⬜ | `v-0609595a.mp3` | Quadro final da missão | comemorando, bem animado | Juntar dois grupos tem um nome: união. O símbolo parece um U, de união! M união I tem todas as bolinhas que estão em pelo menos um dos grupos. Compare com a interseção, que só tem o meio. |
| ⬜ | `v-1682ee39.mp3` | Quadro final da missão | comemorando, bem animado | Juntar dois grupos tem um nome: união. O símbolo parece um U, de união! M união P tem todas as bolinhas que estão em pelo menos um dos grupos. Compare com a interseção, que só tem o meio. |
| ⬜ | `v-6e2ede72.mp3` | Quadro final da missão | comemorando, bem animado | Juntar dois grupos tem um nome: união. O símbolo parece um U, de união! M união Q tem todas as bolinhas que estão em pelo menos um dos grupos. Compare com a interseção, que só tem o meio. |
| ⬜ | `v-03c65d05.mp3` | Quadro final da missão | comemorando, bem animado | Juntar dois grupos tem um nome: união. O símbolo parece um U, de união! M união T tem todas as bolinhas que estão em pelo menos um dos grupos. Compare com a interseção, que só tem o meio. |
| ⬜ | `v-da4059e5.mp3` | Quadro final da missão | comemorando, bem animado | Juntar dois grupos tem um nome: união. O símbolo parece um U, de união! V união G tem todas as bolinhas que estão em pelo menos um dos grupos. Compare com a interseção, que só tem o meio. |
| ⬜ | `v-74782d73.mp3` | Quadro final da missão | comemorando, bem animado | Juntar dois grupos tem um nome: união. O símbolo parece um U, de união! V união I tem todas as bolinhas que estão em pelo menos um dos grupos. Compare com a interseção, que só tem o meio. |
| ⬜ | `v-8211e934.mp3` | Quadro final da missão | comemorando, bem animado | Juntar dois grupos tem um nome: união. O símbolo parece um U, de união! V união P tem todas as bolinhas que estão em pelo menos um dos grupos. Compare com a interseção, que só tem o meio. |
| ⬜ | `v-4877fe2b.mp3` | Quadro final da missão | comemorando, bem animado | Juntar dois grupos tem um nome: união. O símbolo parece um U, de união! V união Q tem todas as bolinhas que estão em pelo menos um dos grupos. Compare com a interseção, que só tem o meio. |
| ⬜ | `v-c465a7d0.mp3` | Quadro final da missão | comemorando, bem animado | Juntar dois grupos tem um nome: união. O símbolo parece um U, de união! V união T tem todas as bolinhas que estão em pelo menos um dos grupos. Compare com a interseção, que só tem o meio. |
| ⬜ | `v-3d4f9af7.mp3` | Quadro final da missão | comemorando, bem animado | P união C: todos os números que são par, ou múltiplo de 5, ou as duas coisas. A união junta tudo; a interseção fica só com o meio. |
| ⬜ | `v-86641aac.mp3` | Quadro final da missão | comemorando, bem animado | P união M: todos os números que são par, ou menor que 6, ou as duas coisas. A união junta tudo; a interseção fica só com o meio. |
| ⬜ | `v-77a01c65.mp3` | Quadro final da missão | comemorando, bem animado | Q união C: todos os números que são múltiplo de 4, ou múltiplo de 5, ou as duas coisas. A união junta tudo; a interseção fica só com o meio. |
| ⬜ | `v-0ee7df3b.mp3` | Quadro final da missão | comemorando, bem animado | T união G: todos os números que são múltiplo de 3, ou maior que 15, ou as duas coisas. A união junta tudo; a interseção fica só com o meio. |
| ⬜ | `t9.f4.complete.mp3` | Tela final da fase | comemorando, bem animado | União: concluída! A união junta tudo o que está em pelo menos um dos grupos. O símbolo dela parece um U, de união! |

## 9 a 12 anos · Floresta dos Conjuntos · Fase 5: O Guardião da Floresta

| ✓ | Arquivo | Onde aparece | Tom | Fala |
|---|---|---|---|---|
| ⬜ | `t9.f5.intro.1.mp3` | Introdução · 1 | curioso, explicando com calma | Este é o Guardião da Floresta. Ele está dormindo, e a floresta perdeu as cores! |
| ⬜ | `t9.f5.intro.2.mp3` | Introdução · 2 | alegre, acolhedor | Cada desafio acende uma pedra mágica. São cinco desafios com tudo o que você aprendeu: chaves, pertence, interseção e união. Acenda todas para acordar o Guardião! |
| ⬜ | `t9.f5.mission.mp3` | Missão | curioso, explicando com calma | Acerte os cinco desafios para acordar o Guardião. |
| ⬜ | `t9.f5.success.mp3` | Retorno: acertou tudo | comemorando, bem animado | Você acendeu todas as pedras mágicas e a floresta ganhou as cores de volta. Você completou a Floresta dos Conjuntos! |
| ⬜ | `t9.f5.hint.visual.mp3` | Retorno: dica com destaque | carinhoso, incentivando | Olha só: a resposta certa está brilhando! |
| ⬜ | `v-67cc3292.mp3` | Pergunta do desafio sorteado | curioso, explicando com calma | Desafio final! Toque em todas as bolinhas da interseção: números ímpares e também maiores que 10. Depois toque em Pronto. |
| ⬜ | `v-3e7d2a86.mp3` | Pergunta do desafio sorteado | curioso, explicando com calma | Desafio final! Toque em todas as bolinhas da interseção: números ímpares e também menores que 6. Depois toque em Pronto. |
| ⬜ | `v-b341ec2e.mp3` | Pergunta do desafio sorteado | curioso, explicando com calma | Desafio final! Toque em todas as bolinhas da interseção: números múltiplos de 3 e também maiores que 15. Depois toque em Pronto. |
| ⬜ | `v-ac0eaea4.mp3` | Pergunta do desafio sorteado | curioso, explicando com calma | Desafio final! Toque em todas as bolinhas da interseção: números múltiplos de 3 e também múltiplos de 4. Depois toque em Pronto. |
| ⬜ | `v-6f76d05c.mp3` | Pergunta do desafio sorteado | curioso, explicando com calma | Desafio final! Toque em todas as bolinhas da interseção: números múltiplos de 5 e também pares. Depois toque em Pronto. |
| ⬜ | `v-af7dc558.mp3` | Pergunta do desafio sorteado | curioso, explicando com calma | Desafio final! Toque em todas as bolinhas da interseção: números pares e também menores que 6. Depois toque em Pronto. |
| ⬜ | `v-0e86a508.mp3` | Pergunta do desafio sorteado | curioso, explicando com calma | Desafio final! Toque em todas as bolinhas da interseção: números pares e também múltiplos de 3. Depois toque em Pronto. |
| ⬜ | `v-9dbf0852.mp3` | Pergunta do desafio sorteado | curioso, explicando com calma | Desafio final! Toque em todas as bolinhas da interseção: números pares e também múltiplos de 5. Depois toque em Pronto. |
| ⬜ | `v-eb6945d8.mp3` | Pergunta do desafio sorteado | curioso, explicando com calma | O grupo G tem os números maiores que 15. Qual frase está certa? |
| ⬜ | `v-45b49de2.mp3` | Pergunta do desafio sorteado | curioso, explicando com calma | O grupo I tem os números ímpares. Qual frase está certa? |
| ⬜ | `v-dbb7590d.mp3` | Pergunta do desafio sorteado | curioso, explicando com calma | O grupo P tem os números pares. Qual frase está certa? |
| ⬜ | `v-3f20709c.mp3` | Pergunta do desafio sorteado | curioso, explicando com calma | O grupo Q tem os números múltiplos de 4. Qual frase está certa? |
| ⬜ | `v-f5c2279e.mp3` | Pergunta do desafio sorteado | curioso, explicando com calma | O grupo T tem os números múltiplos de 3. Qual frase está certa? |
| ⬜ | `v-5a8b1282.mp3` | Pergunta do desafio sorteado | curioso, explicando com calma | Quais bolinhas estão na interseção: são amarelas e também têm número ímpar? |
| ⬜ | `v-9c88217e.mp3` | Pergunta do desafio sorteado | curioso, explicando com calma | Quais bolinhas estão na interseção: são amarelas e também têm número maior que 15? |
| ⬜ | `v-3cee97a4.mp3` | Pergunta do desafio sorteado | curioso, explicando com calma | Quais bolinhas estão na interseção: são amarelas e também têm número múltiplo de 3? |
| ⬜ | `v-3cfb6397.mp3` | Pergunta do desafio sorteado | curioso, explicando com calma | Quais bolinhas estão na interseção: são amarelas e também têm número múltiplo de 4? |
| ⬜ | `v-dbeebf94.mp3` | Pergunta do desafio sorteado | curioso, explicando com calma | Quais bolinhas estão na interseção: são amarelas e também têm número par? |
| ⬜ | `v-6517ab1e.mp3` | Pergunta do desafio sorteado | curioso, explicando com calma | Quais bolinhas estão na interseção: são azuis e também têm número ímpar? |
| ⬜ | `v-6287a26a.mp3` | Pergunta do desafio sorteado | curioso, explicando com calma | Quais bolinhas estão na interseção: são azuis e também têm número maior que 15? |
| ⬜ | `v-43237b58.mp3` | Pergunta do desafio sorteado | curioso, explicando com calma | Quais bolinhas estão na interseção: são azuis e também têm número múltiplo de 3? |
| ⬜ | `v-c31bf613.mp3` | Pergunta do desafio sorteado | curioso, explicando com calma | Quais bolinhas estão na interseção: são azuis e também têm número múltiplo de 4? |
| ⬜ | `v-20ba0090.mp3` | Pergunta do desafio sorteado | curioso, explicando com calma | Quais bolinhas estão na interseção: são azuis e também têm número par? |
| ⬜ | `v-8c2e3d5d.mp3` | Pergunta do desafio sorteado | curioso, explicando com calma | Quais bolinhas estão na interseção: são vermelhas e também têm número ímpar? |
| ⬜ | `v-088cd507.mp3` | Pergunta do desafio sorteado | curioso, explicando com calma | Quais bolinhas estão na interseção: são vermelhas e também têm número maior que 15? |
| ⬜ | `v-c18b765b.mp3` | Pergunta do desafio sorteado | curioso, explicando com calma | Quais bolinhas estão na interseção: são vermelhas e também têm número múltiplo de 3? |
| ⬜ | `v-4192fba0.mp3` | Pergunta do desafio sorteado | curioso, explicando com calma | Quais bolinhas estão na interseção: são vermelhas e também têm número múltiplo de 4? |
| ⬜ | `v-8ecc7c1b.mp3` | Pergunta do desafio sorteado | curioso, explicando com calma | Quais bolinhas estão na interseção: são vermelhas e também têm número par? |
| ⬜ | `v-c0c89a64.mp3` | Pergunta do desafio sorteado | curioso, explicando com calma | Quais bolinhas estão na união: são amarelas ou têm número ímpar? |
| ⬜ | `v-4748ad30.mp3` | Pergunta do desafio sorteado | curioso, explicando com calma | Quais bolinhas estão na união: são amarelas ou têm número maior que 15? |
| ⬜ | `v-c1622c3e.mp3` | Pergunta do desafio sorteado | curioso, explicando com calma | Quais bolinhas estão na união: são amarelas ou têm número múltiplo de 3? |
| ⬜ | `v-c150e31d.mp3` | Pergunta do desafio sorteado | curioso, explicando com calma | Quais bolinhas estão na união: são amarelas ou têm número múltiplo de 4? |
| ⬜ | `v-041521ee.mp3` | Pergunta do desafio sorteado | curioso, explicando com calma | Quais bolinhas estão na união: são amarelas ou têm número par? |
| ⬜ | `v-0c26e296.mp3` | Pergunta do desafio sorteado | curioso, explicando com calma | Quais bolinhas estão na união: são azuis ou têm número ímpar? |
| ⬜ | `v-01777fe2.mp3` | Pergunta do desafio sorteado | curioso, explicando com calma | Quais bolinhas estão na união: são azuis ou têm número maior que 15? |
| ⬜ | `v-b9580630.mp3` | Pergunta do desafio sorteado | curioso, explicando com calma | Quais bolinhas estão na união: são azuis ou têm número múltiplo de 3? |
| ⬜ | `v-395080eb.mp3` | Pergunta do desafio sorteado | curioso, explicando com calma | Quais bolinhas estão na união: são azuis ou têm número múltiplo de 4? |
| ⬜ | `v-8ab19528.mp3` | Pergunta do desafio sorteado | curioso, explicando com calma | Quais bolinhas estão na união: são azuis ou têm número par? |
| ⬜ | `v-8750078d.mp3` | Pergunta do desafio sorteado | curioso, explicando com calma | Quais bolinhas estão na união: são vermelhas ou têm número ímpar? |
| ⬜ | `v-06c564b7.mp3` | Pergunta do desafio sorteado | curioso, explicando com calma | Quais bolinhas estão na união: são vermelhas ou têm número maior que 15? |
| ⬜ | `v-015220cb.mp3` | Pergunta do desafio sorteado | curioso, explicando com calma | Quais bolinhas estão na união: são vermelhas ou têm número múltiplo de 3? |
| ⬜ | `v-8159a610.mp3` | Pergunta do desafio sorteado | curioso, explicando com calma | Quais bolinhas estão na união: são vermelhas ou têm número múltiplo de 4? |
| ⬜ | `v-b6ebd74b.mp3` | Pergunta do desafio sorteado | curioso, explicando com calma | Quais bolinhas estão na união: são vermelhas ou têm número par? |
| ⬜ | `v-0bf0801d.mp3` | Pergunta do desafio sorteado | curioso, explicando com calma | Qual é o jeito certo de escrever o grupo das bolinhas amarelas? |
| ⬜ | `v-8d21718b.mp3` | Pergunta do desafio sorteado | curioso, explicando com calma | Qual é o jeito certo de escrever o grupo das bolinhas azuis? |
| ⬜ | `v-3d09dfd0.mp3` | Pergunta do desafio sorteado | curioso, explicando com calma | Qual é o jeito certo de escrever o grupo das bolinhas vermelhas? |
| ⬜ | `v-1e401e59.mp3` | Dica ao errar o desafio | carinhoso, incentivando | A interseção é o meio do diagrama: a bolinha precisa ser amarela e o número precisa ser ímpar, as duas coisas juntas. |
| ⬜ | `v-257d4815.mp3` | Dica ao errar o desafio | carinhoso, incentivando | A interseção é o meio do diagrama: a bolinha precisa ser amarela e o número precisa ser maior que 15, as duas coisas juntas. |
| ⬜ | `v-4e0ef263.mp3` | Dica ao errar o desafio | carinhoso, incentivando | A interseção é o meio do diagrama: a bolinha precisa ser amarela e o número precisa ser múltiplo de 3, as duas coisas juntas. |
| ⬜ | `v-6219810e.mp3` | Dica ao errar o desafio | carinhoso, incentivando | A interseção é o meio do diagrama: a bolinha precisa ser amarela e o número precisa ser múltiplo de 4, as duas coisas juntas. |
| ⬜ | `v-fda1c293.mp3` | Dica ao errar o desafio | carinhoso, incentivando | A interseção é o meio do diagrama: a bolinha precisa ser amarela e o número precisa ser par, as duas coisas juntas. |
| ⬜ | `v-d42098e8.mp3` | Dica ao errar o desafio | carinhoso, incentivando | A interseção é o meio do diagrama: a bolinha precisa ser azul e o número precisa ser ímpar, as duas coisas juntas. |
| ⬜ | `v-f601bfb2.mp3` | Dica ao errar o desafio | carinhoso, incentivando | A interseção é o meio do diagrama: a bolinha precisa ser azul e o número precisa ser maior que 15, as duas coisas juntas. |
| ⬜ | `v-530e4fde.mp3` | Dica ao errar o desafio | carinhoso, incentivando | A interseção é o meio do diagrama: a bolinha precisa ser azul e o número precisa ser múltiplo de 3, as duas coisas juntas. |
| ⬜ | `v-2d5f0d73.mp3` | Dica ao errar o desafio | carinhoso, incentivando | A interseção é o meio do diagrama: a bolinha precisa ser azul e o número precisa ser múltiplo de 4, as duas coisas juntas. |
| ⬜ | `v-8eb490b6.mp3` | Dica ao errar o desafio | carinhoso, incentivando | A interseção é o meio do diagrama: a bolinha precisa ser azul e o número precisa ser par, as duas coisas juntas. |
| ⬜ | `v-e359bb9c.mp3` | Dica ao errar o desafio | carinhoso, incentivando | A interseção é o meio do diagrama: a bolinha precisa ser vermelha e o número precisa ser ímpar, as duas coisas juntas. |
| ⬜ | `v-0ac9a916.mp3` | Dica ao errar o desafio | carinhoso, incentivando | A interseção é o meio do diagrama: a bolinha precisa ser vermelha e o número precisa ser maior que 15, as duas coisas juntas. |
| ⬜ | `v-5991103a.mp3` | Dica ao errar o desafio | carinhoso, incentivando | A interseção é o meio do diagrama: a bolinha precisa ser vermelha e o número precisa ser múltiplo de 3, as duas coisas juntas. |
| ⬜ | `v-5c35f427.mp3` | Dica ao errar o desafio | carinhoso, incentivando | A interseção é o meio do diagrama: a bolinha precisa ser vermelha e o número precisa ser múltiplo de 4, as duas coisas juntas. |
| ⬜ | `v-2b13505a.mp3` | Dica ao errar o desafio | carinhoso, incentivando | A interseção é o meio do diagrama: a bolinha precisa ser vermelha e o número precisa ser par, as duas coisas juntas. |
| ⬜ | `v-d8e5737c.mp3` | Dica ao errar o desafio | carinhoso, incentivando | A união junta os dois grupos: basta a bolinha ser amarela, ou o número ser ímpar. Quem é as duas coisas também entra. |
| ⬜ | `v-6a3cf2ee.mp3` | Dica ao errar o desafio | carinhoso, incentivando | A união junta os dois grupos: basta a bolinha ser amarela, ou o número ser maior que 15. Quem é as duas coisas também entra. |
| ⬜ | `v-09895652.mp3` | Dica ao errar o desafio | carinhoso, incentivando | A união junta os dois grupos: basta a bolinha ser amarela, ou o número ser múltiplo de 3. Quem é as duas coisas também entra. |
| ⬜ | `v-c33ce92d.mp3` | Dica ao errar o desafio | carinhoso, incentivando | A união junta os dois grupos: basta a bolinha ser amarela, ou o número ser múltiplo de 4. Quem é as duas coisas também entra. |
| ⬜ | `v-ac4dee1a.mp3` | Dica ao errar o desafio | carinhoso, incentivando | A união junta os dois grupos: basta a bolinha ser amarela, ou o número ser par. Quem é as duas coisas também entra. |
| ⬜ | `v-c391b6b5.mp3` | Dica ao errar o desafio | carinhoso, incentivando | A união junta os dois grupos: basta a bolinha ser azul, ou o número ser ímpar. Quem é as duas coisas também entra. |
| ⬜ | `v-495fa339.mp3` | Dica ao errar o desafio | carinhoso, incentivando | A união junta os dois grupos: basta a bolinha ser azul, ou o número ser maior que 15. Quem é as duas coisas também entra. |
| ⬜ | `v-5e5b7c67.mp3` | Dica ao errar o desafio | carinhoso, incentivando | A união junta os dois grupos: basta a bolinha ser azul, ou o número ser múltiplo de 3. Quem é as duas coisas também entra. |
| ⬜ | `v-1a009148.mp3` | Dica ao errar o desafio | carinhoso, incentivando | A união junta os dois grupos: basta a bolinha ser azul, ou o número ser múltiplo de 4. Quem é as duas coisas também entra. |
| ⬜ | `v-e1ca46f7.mp3` | Dica ao errar o desafio | carinhoso, incentivando | A união junta os dois grupos: basta a bolinha ser azul, ou o número ser par. Quem é as duas coisas também entra. |
| ⬜ | `v-d14f33e1.mp3` | Dica ao errar o desafio | carinhoso, incentivando | A união junta os dois grupos: basta a bolinha ser vermelha, ou o número ser ímpar. Quem é as duas coisas também entra. |
| ⬜ | `v-3854cfb5.mp3` | Dica ao errar o desafio | carinhoso, incentivando | A união junta os dois grupos: basta a bolinha ser vermelha, ou o número ser maior que 15. Quem é as duas coisas também entra. |
| ⬜ | `v-eb0137ab.mp3` | Dica ao errar o desafio | carinhoso, incentivando | A união junta os dois grupos: basta a bolinha ser vermelha, ou o número ser múltiplo de 3. Quem é as duas coisas também entra. |
| ⬜ | `v-b1e9fbc4.mp3` | Dica ao errar o desafio | carinhoso, incentivando | A união junta os dois grupos: basta a bolinha ser vermelha, ou o número ser múltiplo de 4. Quem é as duas coisas também entra. |
| ⬜ | `v-677358b3.mp3` | Dica ao errar o desafio | carinhoso, incentivando | A união junta os dois grupos: basta a bolinha ser vermelha, ou o número ser par. Quem é as duas coisas também entra. |
| ⬜ | `v-a2b3d7e7.mp3` | Dica ao errar o desafio | carinhoso, incentivando | Conte as bolinhas amarelas: todas precisam estar dentro das chaves, e nenhuma de outra cor. |
| ⬜ | `v-50bbb7c9.mp3` | Dica ao errar o desafio | carinhoso, incentivando | Conte as bolinhas azuis: todas precisam estar dentro das chaves, e nenhuma de outra cor. |
| ⬜ | `v-8d6a7e3a.mp3` | Dica ao errar o desafio | carinhoso, incentivando | Conte as bolinhas vermelhas: todas precisam estar dentro das chaves, e nenhuma de outra cor. |
| ⬜ | `v-6bc33830.mp3` | Dica ao errar o desafio | carinhoso, incentivando | O símbolo sem risquinho quer dizer “pertence”; com o risquinho, “não pertence”. Confira se cada número é ímpar. |
| ⬜ | `v-63798f72.mp3` | Dica ao errar o desafio | carinhoso, incentivando | O símbolo sem risquinho quer dizer “pertence”; com o risquinho, “não pertence”. Confira se cada número é maior que 15. |
| ⬜ | `v-4db37ba6.mp3` | Dica ao errar o desafio | carinhoso, incentivando | O símbolo sem risquinho quer dizer “pertence”; com o risquinho, “não pertence”. Confira se cada número é múltiplo de 3. |
| ⬜ | `v-6fb17295.mp3` | Dica ao errar o desafio | carinhoso, incentivando | O símbolo sem risquinho quer dizer “pertence”; com o risquinho, “não pertence”. Confira se cada número é múltiplo de 4. |
| ⬜ | `v-898c7bfe.mp3` | Dica ao errar o desafio | carinhoso, incentivando | O símbolo sem risquinho quer dizer “pertence”; com o risquinho, “não pertence”. Confira se cada número é par. |
| ⬜ | `v-3c3b306f.mp3` | Dica ao errar o desafio | carinhoso, incentivando | Para cada bolinha pergunte: o número é ímpar? E é maior que 10? Só toque nas que têm as duas respostas sim. A cor não importa! |
| ⬜ | `v-4f5eb81b.mp3` | Dica ao errar o desafio | carinhoso, incentivando | Para cada bolinha pergunte: o número é ímpar? E é menor que 6? Só toque nas que têm as duas respostas sim. A cor não importa! |
| ⬜ | `v-8bae713a.mp3` | Dica ao errar o desafio | carinhoso, incentivando | Para cada bolinha pergunte: o número é múltiplo de 3? E é maior que 15? Só toque nas que têm as duas respostas sim. A cor não importa! |
| ⬜ | `v-9d804da5.mp3` | Dica ao errar o desafio | carinhoso, incentivando | Para cada bolinha pergunte: o número é múltiplo de 3? E é múltiplo de 4? Só toque nas que têm as duas respostas sim. A cor não importa! |
| ⬜ | `v-91565b62.mp3` | Dica ao errar o desafio | carinhoso, incentivando | Para cada bolinha pergunte: o número é múltiplo de 5? E é par? Só toque nas que têm as duas respostas sim. A cor não importa! |
| ⬜ | `v-7533b54d.mp3` | Dica ao errar o desafio | carinhoso, incentivando | Para cada bolinha pergunte: o número é par? E é menor que 6? Só toque nas que têm as duas respostas sim. A cor não importa! |
| ⬜ | `v-16c87b08.mp3` | Dica ao errar o desafio | carinhoso, incentivando | Para cada bolinha pergunte: o número é par? E é múltiplo de 3? Só toque nas que têm as duas respostas sim. A cor não importa! |
| ⬜ | `v-6f389006.mp3` | Dica ao errar o desafio | carinhoso, incentivando | Para cada bolinha pergunte: o número é par? E é múltiplo de 5? Só toque nas que têm as duas respostas sim. A cor não importa! |
| ⬜ | `t9.f5.complete.mp3` | Tela final da fase | comemorando, bem animado | Floresta dos Conjuntos: concluída! Agora você sabe escrever grupos com chaves, dizer quem pertence e juntar grupos com a interseção e a união. |

## 9 a 12 anos · Laboratório da Verdade · Fase 1: Luzes da Verdade

| ✓ | Arquivo | Onde aparece | Tom | Fala |
|---|---|---|---|---|
| ⬜ | `t9.l1.intro.1.mp3` | Introdução · 1 | alegre, acolhedor | Bem-vindo ao Laboratório da Verdade! Aqui cada lâmpada guarda uma frase. Se a frase é verdadeira, a lâmpada acende. Se é falsa, fica apagada. |
| ⬜ | `t9.l1.intro.2.mp3` | Introdução · 2 | curioso, explicando com calma | Os matemáticos dão nomes curtos para as frases, como p e q, e escrevem a letra V para verdadeiro e a letra F para falso. Vamos usar esse jeito também! |
| ⬜ | `t9.l1.mission.mp3` | Missão | curioso, explicando com calma | Responda V ou F em cada lâmpada e ligue a máquina. |
| ⬜ | `t9.l1.success.mp3` | Retorno: acertou tudo | comemorando, bem animado | Você descobriu o valor de cada frase: V para verdadeiro e F para falso. Isso é o começo da lógica! |
| ⬜ | `t9.l1.hint.unanswered.mp3` | Retorno: dica — sem resposta | carinhoso, incentivando | Ainda tem lâmpada com ponto de interrogação. Toque nela para ler a frase! |
| ⬜ | `v-705fd0a2.mp3` | Missão · bolinhas | curioso, explicando com calma | Primeira máquina! Toque em cada lâmpada, leia a frase sobre a bolinha e escolha V ou F. Depois ligue a máquina. |
| ⬜ | `v-5ebe20db.mp3` | Missão · símbolos | curioso, explicando com calma | Segunda máquina: agora as frases usam os símbolos da floresta! Olhe os grupos lá em cima antes de responder. |
| ⬜ | `v-76002f8c.mp3` | Quadro final · bolinhas | comemorando, bem animado | A máquina ligou! Cada frase que pode ser verdadeira ou falsa se chama proposição. Veja como ficou escrito: o nome da frase e a letra V ou F. |
| ⬜ | `v-36e36b2a.mp3` | Quadro final · símbolos | comemorando, bem animado | Ligou de novo! Até as frases com símbolos são proposições: cada uma é verdadeira ou falsa. |
| ⬜ | `t9.l1.complete.mp3` | Tela final da fase | comemorando, bem animado | Luzes da Verdade: concluída! Uma proposição é uma frase que pode ser verdadeira ou falsa. Os matemáticos dão nomes como p e q, e escrevem V ou F. |

## 9 a 12 anos · Laboratório da Verdade · Fase 2: A Máquina do E

| ✓ | Arquivo | Onde aparece | Tom | Fala |
|---|---|---|---|---|
| ⬜ | `t9.l2.intro.1.mp3` | Introdução · 1 | alegre, acolhedor | Esta é a Máquina do E. Ela tem duas frases, p e q. A lâmpada grande só acende se a frase p E a frase q forem verdadeiras. |
| ⬜ | `t9.l2.intro.2.mp3` | Introdução · 2 | curioso, explicando com calma | Os matemáticos escrevem o E com um símbolo que parece um telhadinho. Repare: ele parece a interseção da floresta, porque os dois querem dizer “os dois ao mesmo tempo”! |
| ⬜ | `t9.l2.mission.mp3` | Missão | curioso, explicando com calma | Toque em cada máquina, leia as frases p e q e dê seu palpite: a lâmpada grande acende? |
| ⬜ | `t9.l2.table.mp3` | Tabela no fim | comemorando, bem animado | Você testou as quatro máquinas! Juntas, elas formam a tabela do E: a lâmpada só acende na linha em que p e q são verdadeiras. |
| ⬜ | `t9.l2.success.mp3` | Retorno: acertou tudo | comemorando, bem animado | A Máquina do E só acende quando as duas frases são verdadeiras. Você montou a tabela do E! |
| ⬜ | `v-c6bbb14c.mp3` | Explicação ao errar o palpite | carinhoso, incentivando | A frase p é falsa. Basta uma frase falsa para a Máquina do E ficar apagada. |
| ⬜ | `v-65a3671f.mp3` | Explicação ao errar o palpite | carinhoso, incentivando | A frase q é falsa. Basta uma frase falsa para a Máquina do E ficar apagada. |
| ⬜ | `v-dcf07ee4.mp3` | Explicação ao errar o palpite | carinhoso, incentivando | As duas frases são falsas. A Máquina do E só acende quando as duas são verdadeiras. |
| ⬜ | `v-6e7f7592.mp3` | Explicação ao errar o palpite | carinhoso, incentivando | As duas frases são verdadeiras! Quando p e q são V, a Máquina do E acende. |
| ⬜ | `t9.l2.complete.mp3` | Tela final da fase | comemorando, bem animado | A Máquina do E: concluída! O E só é verdadeiro quando as duas frases são verdadeiras ao mesmo tempo, igual à interseção da floresta. |

## 9 a 12 anos · Laboratório da Verdade · Fase 3: A Máquina do OU

| ✓ | Arquivo | Onde aparece | Tom | Fala |
|---|---|---|---|---|
| ⬜ | `t9.l3.intro.1.mp3` | Introdução · 1 | alegre, acolhedor | Esta é a Máquina do OU! Cada alavanca guarda uma frase: p e q. Quando a frase é verdadeira, a alavanca sobe. Basta uma alavanca para cima para as engrenagens girarem! |
| ⬜ | `t9.l3.intro.2.mp3` | Introdução · 2 | curioso, explicando com calma | Se as duas frases forem falsas, a máquina para. Os matemáticos escrevem o OU com um símbolo que parece um V, e ele lembra a união da floresta! |
| ⬜ | `t9.l3.mission.mp3` | Missão | curioso, explicando com calma | Leia as frases p e q e descubra: a Máquina do OU funciona? |
| ⬜ | `t9.l3.table.mp3` | Tabela no fim | comemorando, bem animado | As quatro rodadas formam a tabela do OU: a máquina só fica parada quando p e q são falsas. |
| ⬜ | `t9.l3.success.mp3` | Retorno: acertou tudo | comemorando, bem animado | Com o OU, basta uma frase verdadeira. A máquina só para quando as duas são falsas. |
| ⬜ | `v-00d1ae4e.mp3` | actHint | carinhoso, incentivando | Essa frase é falsa, então a alavanca q ficou para baixo. Com p falsa, a máquina só funciona se q for verdadeira. |
| ⬜ | `v-decfeafa.mp3` | Explicação ao errar o palpite | carinhoso, incentivando | A frase p é verdadeira. Para a Máquina do OU funcionar, basta uma frase verdadeira. |
| ⬜ | `v-e5bc5295.mp3` | Explicação ao errar o palpite | carinhoso, incentivando | A frase q é verdadeira. Para a Máquina do OU funcionar, basta uma frase verdadeira. |
| ⬜ | `v-0f43f6b6.mp3` | Explicação ao errar o palpite | carinhoso, incentivando | As duas frases são falsas, então a Máquina do OU fica parada. |
| ⬜ | `v-a8ad9ed6.mp3` | Explicação ao errar o palpite | carinhoso, incentivando | As duas frases são verdadeiras! Para a Máquina do OU, basta uma. |
| ⬜ | `t9.l3.complete.mp3` | Tela final da fase | comemorando, bem animado | A Máquina do OU: concluída! O OU é verdadeiro quando pelo menos uma frase é verdadeira, igual à união da floresta. |

## 9 a 12 anos · Laboratório da Verdade · Fase 4: O Espelho do NÃO

| ✓ | Arquivo | Onde aparece | Tom | Fala |
|---|---|---|---|---|
| ⬜ | `t9.l4.intro.1.mp3` | Introdução · 1 | alegre, acolhedor | Este é o Espelho do NÃO! Ele mostra cada frase ao contrário. Se a frase p é verdadeira, no espelho ela vira falsa. Se p é falsa, no espelho vira verdadeira! |
| ⬜ | `t9.l4.intro.2.mp3` | Introdução · 2 | curioso, explicando com calma | Os matemáticos escrevem o NÃO com um sinal que parece um tracinho com uma perninha, antes da letra. Lemos: não p. |
| ⬜ | `t9.l4.mission.mp3` | Missão | curioso, explicando com calma | Olhe a frase p e descubra: no espelho, a luz acende ou apaga? |
| ⬜ | `t9.l4.part.single.mp3` | Parte · um espelho | curioso, explicando com calma | Olhe a frase p e a lâmpada dela. No espelho do NÃO, a luz acende ou apaga? |
| ⬜ | `t9.l4.part.double.mp3` | Parte · dois espelhos | curioso, explicando com calma | Agora são dois espelhos! O segundo espelho vira de novo o que o primeiro virou. O que acontece com a luz? |
| ⬜ | `t9.l4.table.mp3` | Tabela no fim | comemorando, bem animado | Aqui está a tabela do NÃO: ele sempre troca o V pelo F e o F pelo V. E com dois espelhos, tudo volta a ser como era! |
| ⬜ | `t9.l4.success.mp3` | Retorno: acertou tudo | comemorando, bem animado | O NÃO troca verdadeiro por falso e falso por verdadeiro. E dois NÃOs se cancelam! |
| ⬜ | `v-e37dfb4d.mp3` | Dica — reflexo errado | carinhoso, incentivando | A frase p é falsa, então a lâmpada dela está apagada. No espelho fica ao contrário: a luz de não p acende! |
| ⬜ | `v-95ca9efe.mp3` | Dica — reflexo errado | carinhoso, incentivando | A frase p é verdadeira, então a lâmpada dela está acesa. No espelho fica ao contrário: a luz de não p apaga. |
| ⬜ | `v-f9674b54.mp3` | Dica — dois espelhos errado | carinhoso, incentivando | O primeiro espelho vira p ao contrário. O segundo espelho vira de novo: volta a ser igual a p, que é falsa. |
| ⬜ | `v-18561c7c.mp3` | Dica — dois espelhos errado | carinhoso, incentivando | O primeiro espelho vira p ao contrário. O segundo espelho vira de novo: volta a ser igual a p, que é verdadeira. |
| ⬜ | `t9.l4.complete.mp3` | Tela final da fase | comemorando, bem animado | O Espelho do NÃO: concluída! O NÃO deixa tudo ao contrário: o que era V vira F, e o que era F vira V. |

## 9 a 12 anos · Laboratório da Verdade · Fase 5: A Tabela Mestra

| ✓ | Arquivo | Onde aparece | Tom | Fala |
|---|---|---|---|---|
| ⬜ | `t9.l5.intro.1.mp3` | Introdução · 1 | alegre, acolhedor | Chegou o desafio final do laboratório: a Tabela Mestra! As alavancas p e q mandam energia quando estão em V. A porta decide se a luz acende. |
| ⬜ | `t9.l5.intro.2.mp3` | Introdução · 2 | curioso, explicando com calma | Na porta do E, a luz precisa da energia das duas alavancas. Com uma só, ela só pisca fraquinho. No fim, você vai completar a tabela sozinho! |
| ⬜ | `t9.l5.mission.mp3` | Missão | curioso, explicando com calma | Descubra se a luz acende em cada circuito e complete a Tabela Mestra. |
| ⬜ | `t9.l5.col.and.mp3` | Máquina · 1 · começo | curioso, explicando com calma | Primeiro a porta do E! Para a luz acender, p e q precisam estar em V. |
| ⬜ | `t9.l5.and.h0.mp3` | Máquina · 1 · dica ao errar · 0 | carinhoso, incentivando | As duas alavancas estão em F: não sai energia e a luz fica apagada. |
| ⬜ | `t9.l5.and.h1.mp3` | Máquina · 1 · dica ao errar · 1 | carinhoso, incentivando | Só uma alavanca está em V. O E precisa das duas, então a luz só pisca fraquinho. |
| ⬜ | `t9.l5.and.h2.mp3` | Máquina · 1 · dica ao errar · 2 | carinhoso, incentivando | As duas alavancas estão em V e mandaram energia. Com o E, a luz acende! |
| ⬜ | `t9.l5.col.or.mp3` | Máquina · 2 · começo | curioso, explicando com calma | Agora a porta do OU! Com o OU, uma alavanca em V já basta para acender a luz. |
| ⬜ | `t9.l5.or.h0.mp3` | Máquina · 2 · dica ao errar · 0 | carinhoso, incentivando | As duas alavancas estão em F: não sai energia e a luz fica apagada. |
| ⬜ | `t9.l5.or.h1.mp3` | Máquina · 2 · dica ao errar · 1 | carinhoso, incentivando | Uma alavanca está em V, e com o OU uma já basta: a luz acende! |
| ⬜ | `t9.l5.or.h2.mp3` | Máquina · 2 · dica ao errar · 2 | carinhoso, incentivando | As duas alavancas estão em V. Com o OU, a luz acende! |
| ⬜ | `t9.l5.table.start.mp3` | Tabela Mestra — começo | comemorando, bem animado | A Tabela Mestra já tem o E e o OU que você descobriu. Falta a última coluna: o não p! Toque em cada casa e escolha V ou F. |
| ⬜ | `t9.l5.table.hint.mp3` | Dica — coluna ¬p errada | carinhoso, incentivando | Quase! O não p é sempre o contrário de p. Olhe a primeira coluna: onde p é V, não p é F. |
| ⬜ | `t9.l5.table.unset.mp3` | Dica — coluna ¬p incompleta | carinhoso, incentivando | Ainda tem casa com ponto de interrogação. Toque nela para escolher V ou F. |
| ⬜ | `t9.l5.table.done.mp3` | Retorno: tabela completa | comemorando, bem animado | A Tabela Mestra está completa! O laboratório tem energia de novo! |
| ⬜ | `t9.l5.success.mp3` | Retorno: acertou tudo | comemorando, bem animado | Você completou a Tabela Mestra com o E, o OU e o NÃO. Você completou o Laboratório da Verdade! |
| ⬜ | `t9.l5.complete.mp3` | Tela final da fase | comemorando, bem animado | Laboratório da Verdade: concluído! Agora você conhece as frases verdadeiras e falsas, o E, o OU e o NÃO, e sabe montar uma tabela-verdade. |

## 13 anos ou mais · Floresta dos Conjuntos · Fase 1: Conhecendo os Grupos

| ✓ | Arquivo | Onde aparece | Tom | Fala |
|---|---|---|---|---|
| ⬜ | `t.f1.intro.mp3` | Introdução · 1 | tranquilo, como um colega explicando | Um conjunto é uma coleção de elementos. Ele pode ser descrito listando os elementos, como A = {2, 4, 6, 8}, ou por uma propriedade que todos eles têm: A = {x ∈ ℕ \| x é par e 0 < x < 10}. O número de elementos é indicado por n(A).<br>*Leia: Um conjunto é uma coleção de elementos. Ele pode ser descrito listando os elementos, como A igual a o conjunto 2, 4, 6, 8, ou por uma propriedade que todos eles têm: A igual a o conjunto x pertence a naturais tal que x é par e 0 menor que x menor que 10. O número de elementos é indicado por n de A.* |
| ⬜ | `t.f1.mission.mp3` | Missão | tranquilo, como um colega explicando | Monte cada conjunto selecionando os elementos no universo. |
| ⬜ | `t.f1.tut.start.mp3` | Aquecimento · começo | tranquilo, como um colega explicando | Antes de começar, vamos decifrar essa escrita! Toque em cada parte colorida para descobrir o que ela quer dizer. |
| ⬜ | `name.mp3` | Aquecimento · Parte · 1 | tranquilo, como um colega explicando | A é o nome do conjunto. Lemos assim: “o conjunto A é…”. |
| ⬜ | `braces.mp3` | Aquecimento · Parte · 2 | tranquilo, como um colega explicando | As chaves funcionam como uma caixa: dentro delas ficam os elementos do conjunto. |
| ⬜ | `element.mp3` | Aquecimento · Parte · 3 | tranquilo, como um colega explicando | O x representa cada número. O símbolo ∈ quer dizer “pertence”, e ℕ são os números naturais: 0, 1, 2, 3, 4…<br>*Leia: O x representa cada número. O símbolo pertence a quer dizer “pertence”, e naturais são os números naturais: 0, 1, 2, 3, 4…* |
| ⬜ | `such.mp3` | Aquecimento · Parte · 4 | tranquilo, como um colega explicando | Essa barrinha se lê “tal que”. Depois dela vem a regra que os números precisam seguir. |
| ⬜ | `rule.mp3` | Aquecimento · Parte · 5 | tranquilo, como um colega explicando | A regra: só entram os números ímpares que também são menores que 10. O < quer dizer “menor que”.<br>*Leia: A regra: só entram os números ímpares que também são menores que 10. O menor que quer dizer “menor que”.* |
| ⬜ | `t.f1.tut.reading.mp3` | Aquecimento · reading | tranquilo, como um colega explicando | Lendo tudo junto: A é o conjunto dos números naturais x, tal que x é ímpar e x é menor que 10. |
| ⬜ | `t.f1.tut.build.mp3` | Aquecimento · montar | tranquilo, como um colega explicando | Agora monte esse conjunto! Aqui os erros não contam, é só para treinar. |
| ⬜ | `t.f1.tut.done.mp3` | Aquecimento · concluído | tranquilo, como um colega explicando | Isso! Agora você já sabe ler essa notação. Vamos às questões valendo estrelas! |
| ⬜ | `t.f1.success.mp3` | Retorno: acertou tudo | tranquilo, como um colega explicando | Você passou da descrição de um conjunto para a lista dos seus elementos. |
| ⬜ | `t.f1.complete.mp3` | Tela final da fase | tranquilo, como um colega explicando | Notação de conjuntos: concluída! Descrever um conjunto por propriedade e listar seus elementos são duas formas de representar a mesma coisa. |

## 13 anos ou mais · Floresta dos Conjuntos · Fase 2: Quem Pertence Aqui?

| ✓ | Arquivo | Onde aparece | Tom | Fala |
|---|---|---|---|---|
| ⬜ | `t.f2.intro.mp3` | Introdução · 1 | tranquilo, como um colega explicando | Para dizer que um elemento faz parte de um conjunto usamos ∈ (pertence). Quando não faz parte, usamos ∉ (não pertence). Assim: 4 ∈ A e 5 ∉ A.<br>*Leia: Para dizer que um elemento faz parte de um conjunto usamos “pertence”. Quando não faz parte, usamos “não pertence”. Assim: 4 pertence a A e 5 não pertence a A.* |
| ⬜ | `t.f2.mission.mp3` | Missão | tranquilo, como um colega explicando | Complete cada afirmação com o símbolo certo. |
| ⬜ | `t.f2.success.mp3` | Retorno: acertou tudo | tranquilo, como um colega explicando | Você decidiu, elemento por elemento, quem pertence a cada conjunto. |
| ⬜ | `forest-2-teen.warm-4.mp3` | Aquecimento 1 — explicação | tranquilo, como um colega explicando | O símbolo ∈ quer dizer “pertence”. Pense em A como uma caixa: o 4 está dentro dela?<br>*Leia: O símbolo pertence a quer dizer “pertence”. Pense em A como uma caixa: o 4 está dentro dela?* |
| ⬜ | `forest-2-teen.warm-4.done.mp3` | Aquecimento 1 — depois de responder | tranquilo, como um colega explicando | O 4 está dentro das chaves de A, então 4 ∈ A. Lemos: “4 pertence a A”.<br>*Leia: O 4 está dentro das chaves de A, então 4 pertence a A. Lemos: “4 pertence a A”.* |
| ⬜ | `forest-2-teen.warm-5.mp3` | Aquecimento 2 — explicação | tranquilo, como um colega explicando | Agora o ∉, o “pertence” cortado: ele quer dizer “não pertence”. E o 5, está na caixa?<br>*Leia: Agora o símbolo, o “pertence” cortado: ele quer dizer “não pertence”. E o 5, está na caixa?* |
| ⬜ | `forest-2-teen.warm-5.done.mp3` | Aquecimento 2 — depois de responder | tranquilo, como um colega explicando | O 5 não aparece em A, então 5 ∉ A. Lemos: “5 não pertence a A”.<br>*Leia: O 5 não aparece em A, então 5 não pertence a A. Lemos: “5 não pertence a A”.* |
| ⬜ | `forest-2-teen.warm-sub.mp3` | Aquecimento 3 — explicação | tranquilo, como um colega explicando | No difícil aparece o ⊂, “está contido”: ele compara um conjunto inteiro com A. Todo elemento de {2, 8} está em A?<br>*Leia: No difícil aparece o símbolo, “está contido”: ele compara um conjunto inteiro com A. Todo elemento de o conjunto 2, 8 está em A?* |
| ⬜ | `forest-2-teen.warm-sub.done.mp3` | Aquecimento 3 — depois de responder | tranquilo, como um colega explicando | O 2 e o 8 pertencem a A, então {2, 8} ⊂ A. Se um deles ficasse de fora, seria ⊄.<br>*Leia: O 2 e o 8 pertencem a A, então o conjunto 2, 8 está contido em A. Se um deles ficasse de fora, seria não está contido em.* |
| ⬜ | `t.f2.complete.mp3` | Tela final da fase | tranquilo, como um colega explicando | Pertinência: concluída! Para qualquer elemento só existem duas respostas: ele pertence (∈) ou não pertence (∉) ao conjunto.<br>*Leia: Pertinência: concluída! Para qualquer elemento só existem duas respostas: ele pertence ou não pertence ao conjunto.* |

## 13 anos ou mais · Floresta dos Conjuntos · Fase 3: A Ponte do E

| ✓ | Arquivo | Onde aparece | Tom | Fala |
|---|---|---|---|---|
| ⬜ | `t.f3.intro.mp3` | Introdução · 1 | tranquilo, como um colega explicando | A interseção A ∩ B é o conjunto dos elementos que estão em A e em B ao mesmo tempo. No diagrama de Venn, ela é a parte do meio, onde os dois círculos se encontram.<br>*Leia: A interseção A interseção B é o conjunto dos elementos que estão em A e em B ao mesmo tempo. No diagrama de Venn, ela é a parte do meio, onde os dois círculos se encontram.* |
| ⬜ | `t.f3.mission.mp3` | Missão | tranquilo, como um colega explicando | Coloque cada número na região certa do diagrama e descubra A ∩ B.<br>*Leia: Coloque cada número na região certa do diagrama e descubra A interseção B.* |
| ⬜ | `t.f3.tut.start.mp3` | Aquecimento · começo | tranquilo, como um colega explicando | O ∩ se lê “interseção” e quer dizer “em A e em B”. Toque na região de cada número: o meio é para quem está nas duas listas, e o lado de fora para quem não está em nenhuma.<br>*Leia: O símbolo se lê “interseção” e quer dizer “em A e em B”. Toque na região de cada número: o meio é para quem está nas duas listas, e o lado de fora para quem não está em nenhuma.* |
| ⬜ | `t.f3.tut.done.mp3` | Aquecimento · concluído | tranquilo, como um colega explicando | Isso! A ∩ B = {3, 4}: só os números que estão nos dois conjuntos. Agora vamos às questões valendo estrelas!<br>*Leia: Isso! A interseção B igual a o conjunto 3, 4: só os números que estão nos dois conjuntos. Agora vamos às questões valendo estrelas!* |
| ⬜ | `t.f3.success.mp3` | Retorno: acertou tudo | tranquilo, como um colega explicando | Você encontrou os elementos que dois conjuntos têm em comum. |
| ⬜ | `t.f3.complete.mp3` | Tela final da fase | tranquilo, como um colega explicando | Interseção: concluída! A ∩ B guarda só o que está nos dois conjuntos: é o “e” da matemática.<br>*Leia: Interseção: concluída! A interseção B guarda só o que está nos dois conjuntos: é o “e” da matemática.* |

## 13 anos ou mais · Floresta dos Conjuntos · Fase 4: O Portal do OU

| ✓ | Arquivo | Onde aparece | Tom | Fala |
|---|---|---|---|---|
| ⬜ | `t.f4.intro.mp3` | Introdução · 1 | tranquilo, como um colega explicando | A união A ∪ B junta todos os elementos que estão em A ou em B. Quem está nos dois aparece uma vez só, por isso n(A ∪ B) = n(A) + n(B) − n(A ∩ B).<br>*Leia: A união A união B junta todos os elementos que estão em A ou em B. Quem está nos dois aparece uma vez só, por isso n de A união B igual a n de A mais n de B menos n de A interseção B.* |
| ⬜ | `t.f4.mission.mp3` | Missão | tranquilo, como um colega explicando | Junte os conjuntos sem repetir elementos e conte quantos ficaram. |
| ⬜ | `t.f4.tut.start.mp3` | Aquecimento · começo | tranquilo, como um colega explicando | O ∪ se lê “união”: junta tudo o que está em A ou em B. Toque em todas as fichas, de A e de B, para levar os números para a caixa A ∪ B.<br>*Leia: O símbolo se lê “união”: junta tudo o que está em A ou em B. Toque em todas as fichas, de A e de B, para levar os números para a caixa A união B.* |
| ⬜ | `t.f4.tut.dup.mp3` | Aquecimento · número repetido | tranquilo, como um colega explicando | Viu? O 3 já estava na caixa, então ele não entra de novo. Na união, cada elemento aparece uma vez só. |
| ⬜ | `t.f4.tut.count.mp3` | Aquecimento · contar | tranquilo, como um colega explicando | Agora conte: quantos elementos tem A ∪ B?<br>*Leia: Agora conte: quantos elementos tem A união B?* |
| ⬜ | `t.f4.tut.done.mp3` | Aquecimento · concluído | tranquilo, como um colega explicando | Isso! A tem 3 e B tem 2, mas A ∪ B tem 4, porque o 3 não conta duas vezes. Agora vamos às questões valendo estrelas!<br>*Leia: Isso! A tem 3 e B tem 2, mas A união B tem 4, porque o 3 não conta duas vezes. Agora vamos às questões valendo estrelas!* |
| ⬜ | `t.f4.success.mp3` | Retorno: acertou tudo | tranquilo, como um colega explicando | Você juntou conjuntos sem repetir elementos e contou a união do jeito certo. |
| ⬜ | `t.f4.complete.mp3` | Tela final da fase | tranquilo, como um colega explicando | União: concluída! Para contar A ∪ B, some n(A) e n(B) e tire n(A ∩ B), que foi contado duas vezes.<br>*Leia: União: concluída! Para contar A união B, some n de A e n de B e tire n de A interseção B, que foi contado duas vezes.* |

## 13 anos ou mais · Floresta dos Conjuntos · Fase 5: O Guardião da Floresta

| ✓ | Arquivo | Onde aparece | Tom | Fala |
|---|---|---|---|---|
| ⬜ | `t.f5.intro.mp3` | Introdução · 1 | tranquilo, como um colega explicando | O Guardião da Floresta está adormecido. Cada desafio revisa uma parte do que você aprendeu: notação, pertinência, interseção e união. Cada acerto acende uma pedra mágica, e com as cinco acesas ele acorda. |
| ⬜ | `t.f5.mission.mp3` | Missão | tranquilo, como um colega explicando | Acerte os cinco desafios para acender as pedras e acordar o Guardião. |
| ⬜ | `t.f5.tut.start.mp3` | Aquecimento · começo | tranquilo, como um colega explicando | Antes de acordar o Guardião, vamos relembrar os símbolos. Este aqui ainda não acende pedra nenhuma. |
| ⬜ | `t.f5.tut.done.mp3` | Aquecimento · concluído | tranquilo, como um colega explicando | Isso! Você está pronto. Agora cada acerto acende uma pedra mágica. |
| ⬜ | `t.f5.success.mp3` | Retorno: acertou tudo | tranquilo, como um colega explicando | Você revisou toda a Floresta dos Conjuntos. |
| ⬜ | `t.f5.complete.mp3` | Tela final da fase | tranquilo, como um colega explicando | Floresta dos Conjuntos: concluída! Notação, pertinência, interseção e união: agora você fala a língua dos conjuntos. |

## 13 anos ou mais · Laboratório da Verdade · Fase 1: Luzes da Verdade

| ✓ | Arquivo | Onde aparece | Tom | Fala |
|---|---|---|---|---|
| ⬜ | `t.l1.intro.mp3` | Introdução · 1 | tranquilo, como um colega explicando | Uma proposição é uma frase declarativa que é verdadeira (V) ou falsa (F), nunca as duas. Perguntas, ordens e exclamações não são proposições, e nem sentenças abertas como x + 1 = 5, cujo valor depende de x.<br>*Leia: Uma proposição é uma frase declarativa que é verdadeira (V) ou falsa (F), nunca as duas. Perguntas, ordens e exclamações não são proposições, e nem sentenças abertas como x mais 1 igual a 5, cujo valor depende de x.* |
| ⬜ | `t.l1.mission.mp3` | Missão | tranquilo, como um colega explicando | Classifique cada frase: V, F ou não é proposição. |
| ⬜ | `t.l1.success.mp3` | Retorno: acertou tudo | tranquilo, como um colega explicando | Você separou proposições de frases que não são proposições e encontrou o valor lógico de cada uma. |
| ⬜ | `lab-1-teen.w0.mp3` | Aquecimento 1 — explicação | tranquilo, como um colega explicando | Uma proposição é uma frase que afirma algo e que é verdadeira ou falsa, nunca as duas coisas. Esta frase afirma algo sobre o 7. Ela é V ou F? |
| ⬜ | `lab-1-teen.w0.ok.mp3` | Aquecimento 1 — acertou | comemorando, bem animado | Isso! 7 só é divisível por 1 e por 7. |
| ⬜ | `lab-1-teen.w0.retry.mp3` | Aquecimento 1 — errou | carinhoso, incentivando | Quase. 7 só é divisível por 1 e por 7. |
| ⬜ | `lab-1-teen.w1.mp3` | Aquecimento 2 — explicação | tranquilo, como um colega explicando | E esta? Ela não afirma nada: é um pedido. Frases assim não são proposições. |
| ⬜ | `lab-1-teen.w1.ok.mp3` | Aquecimento 2 — acertou | comemorando, bem animado | Isso! É uma ordem: não faz sentido dizer que uma ordem é verdadeira ou falsa. |
| ⬜ | `lab-1-teen.w1.retry.mp3` | Aquecimento 2 — errou | carinhoso, incentivando | Quase. É uma ordem: não faz sentido dizer que uma ordem é verdadeira ou falsa. |
| ⬜ | `lab-1-teen.w2.mp3` | Aquecimento 3 — explicação | tranquilo, como um colega explicando | Cuidado com esta: ela tem um x. Sem saber quem é o x, não dá para dizer se é V ou F. Isso se chama sentença aberta. |
| ⬜ | `lab-1-teen.w2.ok.mp3` | Aquecimento 3 — acertou | comemorando, bem animado | Isso! É uma sentença aberta: com x = 4 é V, com qualquer outro x é F.<br>*Leia: Isso! É uma sentença aberta: com x igual a 4 é V, com qualquer outro x é F.* |
| ⬜ | `lab-1-teen.w2.retry.mp3` | Aquecimento 3 — errou | carinhoso, incentivando | Quase. É uma sentença aberta: com x = 4 é V, com qualquer outro x é F.<br>*Leia: Quase. É uma sentença aberta: com x igual a 4 é V, com qualquer outro x é F.* |
| ⬜ | `t.l1.complete.mp3` | Tela final da fase | tranquilo, como um colega explicando | Proposições: concluída! Toda proposição tem um único valor lógico: V ou F. Frases sem valor definido não são proposições. |

## 13 anos ou mais · Laboratório da Verdade · Fase 2: A Máquina do E

| ✓ | Arquivo | Onde aparece | Tom | Fala |
|---|---|---|---|---|
| ⬜ | `t.l2.intro.mp3` | Introdução · 1 | tranquilo, como um colega explicando | A conjunção junta duas proposições com “e”, escrito ∧. A proposição p ∧ q só é verdadeira quando p e q são verdadeiras ao mesmo tempo. Basta uma parte falsa para tudo ser falso.<br>*Leia: A conjunção junta duas proposições com “e”, escrito e. A proposição p e q só é verdadeira quando p e q são verdadeiras ao mesmo tempo. Basta uma parte falsa para tudo ser falso.* |
| ⬜ | `t.l2.mission.mp3` | Missão | tranquilo, como um colega explicando | Descubra o valor lógico das conjunções e complete a tabela-verdade do ∧.<br>*Leia: Descubra o valor lógico das conjunções e complete a tabela-verdade do e.* |
| ⬜ | `t.l2.success.mp3` | Retorno: acertou tudo | tranquilo, como um colega explicando | Você avaliou conjunções e montou a tabela-verdade do ∧.<br>*Leia: Você avaliou conjunções e montou a tabela-verdade do e.* |
| ⬜ | `lab-2-teen.w0.mp3` | Aquecimento 1 — explicação | tranquilo, como um colega explicando | Aquele símbolo em forma de chapéu se lê “e”. A frase “p e q” diz: 6 é par e 6 é maior que 4. Ela só é verdadeira quando as duas partes são verdadeiras. E aqui? |
| ⬜ | `lab-2-teen.w0.ok.mp3` | Aquecimento 1 — acertou | comemorando, bem animado | Isso! p é verdadeira e q é verdadeira. As duas partes são verdadeiras, então “p e q” é verdadeira. |
| ⬜ | `lab-2-teen.w0.retry.mp3` | Aquecimento 1 — errou | carinhoso, incentivando | Quase. p é verdadeira e q é verdadeira. As duas partes são verdadeiras, então “p e q” é verdadeira. |
| ⬜ | `lab-2-teen.w1.mp3` | Aquecimento 2 — explicação | tranquilo, como um colega explicando | Agora q mudou: 6 não é maior que 10. O que acontece com “p e q” quando uma das partes é falsa? |
| ⬜ | `lab-2-teen.w1.ok.mp3` | Aquecimento 2 — acertou | comemorando, bem animado | Isso! q é falsa. Basta uma parte falsa para “p e q” ser falsa. |
| ⬜ | `lab-2-teen.w1.retry.mp3` | Aquecimento 2 — errou | carinhoso, incentivando | Quase. q é falsa. Basta uma parte falsa para “p e q” ser falsa. |
| ⬜ | `lab-2-teen.w2.mp3` | Aquecimento 3 — explicação | tranquilo, como um colega explicando | E quando as duas partes são falsas? |
| ⬜ | `lab-2-teen.w2.ok.mp3` | Aquecimento 3 — acertou | comemorando, bem animado | Isso! As duas partes são falsas, então “p e q” também é falsa. |
| ⬜ | `lab-2-teen.w2.retry.mp3` | Aquecimento 3 — errou | carinhoso, incentivando | Quase. As duas partes são falsas, então “p e q” também é falsa. |
| ⬜ | `t.l2.complete.mp3` | Tela final da fase | tranquilo, como um colega explicando | Conjunção: concluída! p ∧ q é V só quando p e q são V. Em qualquer outro caso, é F.<br>*Leia: Conjunção: concluída! p e q é V só quando p e q são V. Em qualquer outro caso, é F.* |

## 13 anos ou mais · Laboratório da Verdade · Fase 3: A Máquina do OU

| ✓ | Arquivo | Onde aparece | Tom | Fala |
|---|---|---|---|---|
| ⬜ | `t.l3.intro.mp3` | Introdução · 1 | tranquilo, como um colega explicando | A disjunção junta duas proposições com “ou”, escrito ∨. A proposição p ∨ q é verdadeira quando pelo menos uma das partes é verdadeira, e só é falsa quando as duas são falsas. Na lógica, o “ou” é inclusivo: as duas partes podem ser verdadeiras ao mesmo tempo. Nesta fase você vai montar frases com cartas e resolver casos de detetive.<br>*Leia: A disjunção junta duas proposições com “ou”, escrito ou. A proposição p ou q é verdadeira quando pelo menos uma das partes é verdadeira, e só é falsa quando as duas são falsas. Na lógica, o “ou” é inclusivo: as duas partes podem ser verdadeiras ao mesmo tempo. Nesta fase você vai montar frases com cartas e resolver casos de detetive.* |
| ⬜ | `t.l3.mission.mp3` | Missão | tranquilo, como um colega explicando | Monte disjunções com o valor pedido e deduza valores a partir de pistas. |
| ⬜ | `t.l3.success.mp3` | Retorno: acertou tudo | tranquilo, como um colega explicando | Você montou disjunções com cartas e resolveu os casos de detetive. |
| ⬜ | `lab-3-teen.w0.mp3` | Aquecimento 1 — explicação | tranquilo, como um colega explicando | Este símbolo, parecido com um V, se lê “ou”. A frase “p ou q” é verdadeira quando pelo menos uma parte é verdadeira. Escolha duas cartas para montar uma frase verdadeira. |
| ⬜ | `lab-3-teen.w0.ok.mp3` | Aquecimento 1 — acertou | comemorando, bem animado | Isso! Basta uma parte verdadeira para “p ou q” ser verdadeira. E, na lógica, as duas também podem ser verdadeiras. |
| ⬜ | `lab-3-teen.w1.mp3` | Aquecimento 2 — explicação | tranquilo, como um colega explicando | Agora o contrário: monte uma frase “p ou q” falsa. Qual é o único jeito? |
| ⬜ | `lab-3-teen.w1.ok.mp3` | Aquecimento 2 — acertou | comemorando, bem animado | Isso! O “ou” só é falso quando as duas partes são falsas. |
| ⬜ | `lab-3-teen.w2.mp3` | Aquecimento 3 — explicação | tranquilo, como um colega explicando | Agora você é o detetive. Sabemos que “p ou q” é verdadeira e que p é falsa. O que dá para concluir sobre q? |
| ⬜ | `lab-3-teen.w2.ok.mp3` | Aquecimento 3 — acertou | comemorando, bem animado | Isso! Se p é falsa e “p ou q” é verdadeira, q tem que ser verdadeira. Às vezes as pistas não bastam: aí a resposta é “não dá para saber”. |
| ⬜ | `lab-3-teen.w2.retry.mp3` | Aquecimento 3 — errou | carinhoso, incentivando | Quase. Como p é F, se q fosse F, p ∨ q não poderia ser V. Então q só pode ser V.<br>*Leia: Quase. Como p é F, se q fosse F, p ou q não poderia ser V. Então q só pode ser V.* |
| ⬜ | `t.l3.complete.mp3` | Tela final da fase | tranquilo, como um colega explicando | Disjunção: concluída! p ∨ q é V quando pelo menos uma parte é V. Só é F quando p e q são F.<br>*Leia: Disjunção: concluída! p ou q é V quando pelo menos uma parte é V. Só é F quando p e q são F.* |

## 13 anos ou mais · Laboratório da Verdade · Fase 4: O Espelho do NÃO

| ✓ | Arquivo | Onde aparece | Tom | Fala |
|---|---|---|---|---|
| ⬜ | `t.l4.intro.mp3` | Introdução · 1 | tranquilo, como um colega explicando | A negação de p, escrita ¬p, diz exatamente o contrário de p e sempre tem o valor oposto. O desafio é negar direito: o contrário de “maior que” é “menor ou igual”, e o contrário de “todo” é “existe um que não”.<br>*Leia: A negação de p, escrita não p, diz exatamente o contrário de p e sempre tem o valor oposto. O desafio é negar direito: o contrário de “maior que” é “menor ou igual”, e o contrário de “todo” é “existe um que não”.* |
| ⬜ | `t.l4.mission.mp3` | Missão | tranquilo, como um colega explicando | Ligue cada frase à sua negação e escolha a negação certa entre frases parecidas. |
| ⬜ | `t.l4.success.mp3` | Retorno: acertou tudo | tranquilo, como um colega explicando | Você ligou frases às suas negações e escapou das armadilhas da negação. |
| ⬜ | `lab-4-teen.w0.mp3` | Aquecimento 1 — explicação | tranquilo, como um colega explicando | Negar uma frase é dizer o contrário dela. O símbolo da negação parece um gancho e se lê “não”. Qual destas frases diz o contrário de “8 é par”? |
| ⬜ | `lab-4-teen.w0.ok.mp3` | Aquecimento 1 — acertou | comemorando, bem animado | Isso! “8 é ímpar” diz exatamente o contrário de “8 é par”. |
| ⬜ | `lab-4-teen.w0.retry.mp3` | Aquecimento 1 — errou | carinhoso, incentivando | Quase. Um número que não é par é ímpar. A negação fala do mesmo 8 e diz o contrário. |
| ⬜ | `lab-4-teen.w1.mp3` | Aquecimento 2 — explicação | tranquilo, como um colega explicando | Agora uma armadilha clássica. O contrário de “maior que” não é só “menor que”: os números também podem ser iguais. Qual opção cobre os dois casos? |
| ⬜ | `lab-4-teen.w1.ok.mp3` | Aquecimento 2 — acertou | comemorando, bem animado | Isso! O contrário de “maior que” é “menor ou igual”. |
| ⬜ | `lab-4-teen.w1.retry.mp3` | Aquecimento 2 — errou | carinhoso, incentivando | Quase. O contrário de “maior que” é “menor ou igual”. Só “menor que” esquece o caso em que os números são iguais. |
| ⬜ | `lab-4-teen.w2.mp3` | Aquecimento 3 — explicação | tranquilo, como um colega explicando | Por último: como negar uma frase com “todo”? Pense no que basta para mostrar que ela está errada. |
| ⬜ | `lab-4-teen.w2.ok.mp3` | Aquecimento 3 — acertou | comemorando, bem animado | Isso! Para negar um “todo”, basta existir um que não cumpre a regra, como o 2. |
| ⬜ | `lab-4-teen.w2.retry.mp3` | Aquecimento 3 — errou | carinhoso, incentivando | Quase. Para derrubar um “todo”, basta um exemplo que não cumpre a regra: o 2 é primo e não é ímpar. |
| ⬜ | `t.l4.complete.mp3` | Tela final da fase | tranquilo, como um colega explicando | Negação: concluída! ¬p diz o contrário de p e tem o valor oposto. O contrário de “>” é “≤”, e o de “todo” é “existe um que não”.<br>*Leia: Negação: concluída! não p diz o contrário de p e tem o valor oposto. O contrário de “>” é “menor ou igual a”, e o de “todo” é “existe um que não”.* |

## 13 anos ou mais · Laboratório da Verdade · Fase 5: A Tabela Mestra

| ✓ | Arquivo | Onde aparece | Tom | Fala |
|---|---|---|---|---|
| ⬜ | `t.l5.intro.mp3` | Introdução · 1 | tranquilo, como um colega explicando | A tabela-verdade lista todas as combinações de valores e o resultado de uma fórmula em cada uma. Com ela dá para descobrir uma fórmula pela coluna, saber se ela é sempre V (tautologia), sempre F (contradição) ou se depende (contingência), e provar se duas fórmulas são equivalentes. |
| ⬜ | `t.l5.mission.mp3` | Missão | tranquilo, como um colega explicando | Descubra fórmulas, classifique-as e prove equivalências com a Tabela Mestra. |
| ⬜ | `t.l5.success.mp3` | Retorno: acertou tudo | tranquilo, como um colega explicando | Você dominou a Tabela Mestra: descobriu fórmulas, classificou-as e provou equivalências. |
| ⬜ | `lab-5-teen.w0.mp3` | Aquecimento 1 — explicação | tranquilo, como um colega explicando | Bem-vindo à Tabela Mestra! Cada linha é uma combinação de valores. A coluna misteriosa mostra o resultado de uma fórmula. Ela dá F quando p é verdadeira e V quando p é falsa. Qual fórmula é essa? |
| ⬜ | `lab-5-teen.w0.ok.mp3` | Aquecimento 1 — acertou | comemorando, bem animado | Isso! A negação de p troca cada valor da coluna de p. |
| ⬜ | `lab-5-teen.w0.retry.mp3` | Aquecimento 1 — errou | carinhoso, incentivando | Quase. A coluna é o contrário de p: é a negação de p. |
| ⬜ | `lab-5-teen.w1.mp3` | Aquecimento 2 — explicação | tranquilo, como um colega explicando | Algumas fórmulas são verdadeiras em todas as linhas: são as tautologias. As sempre falsas são contradições. As que mudam conforme a linha são contingências. Toque no rascunho para anotar, se quiser. E esta fórmula, “p ou não p”? |
| ⬜ | `lab-5-teen.w1.ok.mp3` | Aquecimento 2 — acertou | comemorando, bem animado | Isso! “p ou não p” é sempre verdadeira: ou p vale, ou a negação dela vale. É uma tautologia. |
| ⬜ | `lab-5-teen.w1.retry.mp3` | Aquecimento 2 — errou | carinhoso, incentivando | Quase. p ∨ ¬p dá V em todas as 2 linhas: é uma tautologia.<br>*Leia: Quase. p ou não p dá V em todas as 2 linhas: é uma tautologia.* |
| ⬜ | `lab-5-teen.w2.mp3` | Aquecimento 3 — explicação | tranquilo, como um colega explicando | Duas fórmulas são equivalentes quando têm a mesma coluna, linha por linha. Negar p duas vezes dá o mesmo que p? |
| ⬜ | `lab-5-teen.w2.ok.mp3` | Aquecimento 3 — acertou | comemorando, bem animado | Isso! Negar duas vezes volta ao começo: as duas colunas são iguais. |
| ⬜ | `lab-5-teen.w2.retry.mp3` | Aquecimento 3 — errou | carinhoso, incentivando | Quase. São equivalentes: as duas colunas são iguais em todas as 2 linhas. |
| ⬜ | `t.l5.complete.mp3` | Tela final da fase | tranquilo, como um colega explicando | Laboratório da Verdade: concluído! Proposições, ∧, ∨, ¬ e tabelas-verdade: agora você raciocina como um lógico.<br>*Leia: Laboratório da Verdade: concluído! Proposições, e, ou, não e tabelas-verdade: agora você raciocina como um lógico.* |

