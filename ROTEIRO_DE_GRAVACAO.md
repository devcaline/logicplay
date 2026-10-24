# Roteiro de gravação — voz do Pipo

Gerado automaticamente pelo comando `npm run roteiro` (rode de novo depois de gravar para atualizar o progresso).

**Progresso: 0 de 126 falas gravadas.**

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

## Fase: A Ponte do E (5-8 anos)

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
| ⬜ | `f3k.hint.empty.mp3` | Dica — apertou Verificar sem colocar nada nos grupos | carinhoso, incentivando | Vamos começar? Arraste cada coisa para o grupo dela. Comece pela maçã! |
| ⬜ | `f3k.hint.missingBoth.mp3` | Dica — algo que é dos dois grupos não está no meio | carinhoso, incentivando | Quase lá! Tem coisa que é vermelha E é fruta ao mesmo tempo. Ela vai no meio, na ponte entre os dois grupos! |
| ⬜ | `f3k.hint.wrongBoth.mp3` | Dica — algo no meio que não é dos dois grupos | carinhoso, incentivando | Quase lá! No meio só fica o que é vermelho E fruta ao mesmo tempo. Vamos olhar de novo? |
| ⬜ | `f3k.hint.generic.mp3` | Dica — elemento no grupo errado | carinhoso, incentivando | Quase lá! Olhe cada coisa e pergunte: ela é vermelha? Ela é fruta? Ou nenhum dos dois? |
| ⬜ | `f3k.hint.visual.mp3` | Dica com marquinhas (após 2 tentativas) | carinhoso, incentivando | Coloquei marquinhas para te ajudar: bolinha vermelha é para vermelho, e a maçãzinha é para fruta! |
| ⬜ | `f3k.success.mp3` | Acertou tudo | comemorando, bem animado | A maçã e o morango são vermelhos E são frutas, então ficam no meio! O carrinho é só vermelho, a banana e a uva são só frutas, e a bola fica de fora. |
| ⬜ | `f3k.complete.mp3` | Tela final da fase | comemorando, bem animado | Terceira missão concluída! Você descobriu a interseção! É o lugar onde ficam os elementos que estão nos dois grupos ao mesmo tempo, como a maçã e o morango: vermelhos E frutas. |

## Fase: O Portal do OU (5-8 anos)

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

## Fase: O Guardião da Floresta (5-8 anos)

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

## Fase: Luzes da Verdade (5-8 anos)

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

## Fase: A Máquina do E (5-8 anos)

| ✓ | Arquivo | Onde aparece | Tom | Fala |
|---|---|---|---|---|
| ⬜ | `l2k.intro.1.mp3` | Introdução 1 | alegre, acolhedor | Esta é a Máquina do E. Ela tem duas frases. A lâmpada grande só acende se a primeira frase E a segunda frase forem verdade! |
| ⬜ | `l2k.intro.2.mp3` | Introdução 2 | curioso, explicando com calma | O peixe vive na água, mas o carrinho não voa. Se uma das frases for falsa, a Máquina do E fica apagada. Vamos testar as máquinas do laboratório? |
| ⬜ | `l2k.mission.mp3` | Missão | curioso, explicando com calma | Toque em cada Máquina do E e descubra: a lâmpada grande vai acender? |
| ⬜ | `l2k.q.1.mp3` | Máquina 1 — pergunta (ao abrir) | curioso, explicando com calma | O peixe vive na água E a uva é roxa. A Máquina do E acende? |
| ⬜ | `l2k.h.1.mp3` | Máquina 1 — explicação ao errar o palpite | carinhoso, incentivando | As duas frases são verdade! Quando as duas são verdade, a Máquina do E acende. |
| ⬜ | `l2k.q.2.mp3` | Máquina 2 — pergunta (ao abrir) | curioso, explicando com calma | A maçã é vermelha E o carrinho voa. A Máquina do E acende? |
| ⬜ | `l2k.h.2.mp3` | Máquina 2 — explicação ao errar o palpite | carinhoso, incentivando | O carrinho não voa! Uma frase é falsa, então a Máquina do E fica apagada. |
| ⬜ | `l2k.q.3.mp3` | Máquina 3 — pergunta (ao abrir) | curioso, explicando com calma | A banana é azul E o golfinho vive na água. A Máquina do E acende? |
| ⬜ | `l2k.h.3.mp3` | Máquina 3 — explicação ao errar o palpite | carinhoso, incentivando | A banana não é azul! Uma frase é falsa, então a Máquina do E fica apagada. |
| ⬜ | `l2k.q.4.mp3` | Máquina 4 — pergunta (ao abrir) | curioso, explicando com calma | A galinha vive na água E o polvo é amarelo. A Máquina do E acende? |
| ⬜ | `l2k.h.4.mp3` | Máquina 4 — explicação ao errar o palpite | carinhoso, incentivando | As duas frases são falsas! Para a Máquina do E acender, as duas precisam ser verdade. |
| ⬜ | `l2k.success.mp3` | Acertou tudo | comemorando, bem animado | A Máquina do E só acende quando as duas frases são verdade. Se uma for falsa, ela fica apagada. |
| ⬜ | `l2k.complete.mp3` | Tela final da fase | comemorando, bem animado | Segunda missão do laboratório concluída! Você descobriu o E: a lâmpada só acende quando as duas frases são verdade ao mesmo tempo. |

## Fase: A Máquina do OU (5-8 anos)

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

