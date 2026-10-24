/** Cores do diagrama para os grupos "Animais" e "Roxos". */
const ANIMAL_PURPLE_COLORS = {
  a: { fill: '#5FD99B', label: '#33B877', shadow: '#1E8C55' },
  b: { fill: '#B98CFF', label: '#9B6BE0', shadow: '#6E3FC0' },
  both: { fill: '#7FA6E8', label: '#5B7FD6', shadow: '#3A5BA8' },
};

/**
 * Conteúdo dos desafios (textos, falas, elementos).
 * Cada fala tem um `id` estável: um áudio gravado pode substituí-la depois
 * em audio/audioManifest.js, sem mudar nada aqui.
 */
export const CHALLENGES = {
  'forest-1-kids': {
    id: 'forest-1-kids',
    type: 'set-sorting',
    levelId: 'forest-1',
    ageGroup: '5-8',
    scene: 'ocean', // cenário de fundo: 'forest' | 'ocean' (components/scenery/scenes.js)

    intro: [
      {
        id: 'f1k.intro.1',
        mood: 'happy',
        illustration: 'all-items',
        text: 'Oi, amiguinho! Alguns animais estão perdidos por aqui. Você pode me ajudar a encontrar o lugar deles?',
      },
      {
        id: 'f1k.intro.2',
        mood: 'curious',
        illustration: 'set-example',
        text: 'Um conjunto é um grupo de coisas que têm alguma característica em comum. Vamos descobrir quais animais fazem parte do nosso grupo?',
      },
    ],

    mission: {
      id: 'f1k.mission',
      text: 'Coloque dentro do círculo os animais que vivem na água.',
      short: 'Animais que vivem na água',
    },

    set: {
      label: 'Vivem na água',
      theme: 'water',
    },

    items: [
      { id: 'fish', name: 'Peixe', belongs: true },
      { id: 'rabbit', name: 'Coelho', belongs: false },
      { id: 'dolphin', name: 'Golfinho', belongs: true },
      { id: 'chicken', name: 'Galinha', belongs: false },
      { id: 'octopus', name: 'Polvo', belongs: true },
      { id: 'butterfly', name: 'Borboleta', belongs: false },
    ],

    feedback: {
      success: {
        id: 'f1k.success',
        title: 'Muito bem! Você conseguiu!',
        text: 'O peixe, o golfinho e o polvo vivem na água. Por isso, eles fazem parte do conjunto!',
      },
      empty: {
        id: 'f1k.hint.empty',
        text: 'Vamos começar? Arraste para dentro do círculo um animal que vive na água.',
      },
      wrongInside: {
        id: 'f1k.hint.wrongInside',
        text: 'Quase lá! Tem um animal no círculo que gosta mais da terra ou do céu. Vamos olhar de novo?',
      },
      missing: {
        id: 'f1k.hint.missing',
        text: 'Quase lá! Ainda tem animal da água esperando do lado de fora. Vamos observar?',
      },
      generic: {
        id: 'f1k.hint.generic',
        text: 'Quase lá! Vamos observar quais animais vivem na água?',
      },
      visualHint: {
        id: 'f1k.hint.visual',
        text: 'Olha só! Coloquei gotinhas de água nos animais que nadam. Eles adoram a água!',
      },
    },

    /** Depois de quantas tentativas sem acerto mostramos a dica visual. */
    visualHintAfter: 2,

    complete: {
      id: 'f1k.complete',
      title: 'Primeira missão concluída!',
      text: 'Você criou um conjunto! Um conjunto é um grupo de elementos. Neste, colocamos os animais que vivem na água.',
    },
  },
  'forest-2-kids': {
    id: 'forest-2-kids',
    type: 'membership',
    levelId: 'forest-2',
    ageGroup: '5-8',
    scene: 'forest',

    intro: [
      {
        id: 'f2k.intro.1',
        mood: 'happy',
        illustration: 'all-items',
        text: 'Que bagunça! Frutas e brinquedos se misturaram no caminho. Vamos arrumar?',
      },
      {
        id: 'f2k.intro.2',
        mood: 'curious',
        illustration: 'belongs-example',
        example: { inside: 'apple', outside: 'ball' },
        text: 'Quando uma coisa faz parte do grupo, dizemos que ela pertence ao grupo. A maçã pertence ao grupo das frutas. A bola não pertence!',
      },
    ],

    mission: {
      id: 'f2k.mission',
      text: 'Olhe cada coisa e responda: ela pertence ao grupo das frutas?',
      short: 'Frutas',
    },

    set: {
      label: 'Frutas',
      outLabel: 'Não são frutas',
      theme: 'fruits',
    },

    // A ordem aqui é a ordem em que os elementos aparecem.
    items: [
      {
        id: 'banana',
        name: 'Banana',
        belongs: true,
        question: { id: 'f2k.q.banana', text: 'Olha a banana! Ela pertence ao grupo das frutas?' },
        hint: { id: 'f2k.hint.banana', text: 'Hmm... a banana é amarelinha e gostosa de comer. Será que ela é uma fruta?' },
      },
      {
        id: 'ball',
        name: 'Bola',
        belongs: false,
        question: { id: 'f2k.q.ball', text: 'E a bola? Ela pertence ao grupo das frutas?' },
        hint: { id: 'f2k.hint.ball', text: 'Será que a gente come a bola? A bola é para brincar! Vamos pensar de novo?' },
      },
      {
        id: 'apple',
        name: 'Maçã',
        belongs: true,
        question: { id: 'f2k.q.apple', text: 'Olha a maçã! Ela pertence ao grupo das frutas?' },
        hint: { id: 'f2k.hint.apple', text: 'A maçã é vermelhinha e nasce na árvore. Será que ela é uma fruta?' },
      },
      {
        id: 'car',
        name: 'Carrinho',
        belongs: false,
        question: { id: 'f2k.q.car', text: 'E o carrinho? Ele pertence ao grupo das frutas?' },
        hint: { id: 'f2k.hint.car', text: 'O carrinho tem rodinhas e serve para brincar. Será que ele é uma fruta?' },
      },
      {
        id: 'grapes',
        name: 'Uva',
        belongs: true,
        question: { id: 'f2k.q.grapes', text: 'Olha a uva! Ela pertence ao grupo das frutas?' },
        hint: { id: 'f2k.hint.grapes', text: 'A uva é pequenininha, redondinha e docinha. Será que ela é uma fruta?' },
      },
      {
        id: 'shoe',
        name: 'Sapato',
        belongs: false,
        question: { id: 'f2k.q.shoe', text: 'E o sapato? Ele pertence ao grupo das frutas?' },
        hint: { id: 'f2k.hint.shoe', text: 'O sapato a gente coloca nos pés para passear. Será que ele é uma fruta?' },
      },
    ],

    answers: {
      yes: 'Pertence',
      no: 'Não pertence',
    },

    feedback: {
      success: {
        id: 'f2k.success',
        title: 'Muito bem! Você conseguiu!',
        text: 'A banana, a maçã e a uva pertencem ao grupo das frutas. A bola, o carrinho e o sapato não pertencem.',
      },
      visualHint: {
        id: 'f2k.hint.visual',
        text: 'Vou te dar uma ajudinha: olha o botão que está brilhando!',
      },
    },

    /** Depois de quantos erros no mesmo elemento destacamos o botão certo. */
    visualHintAfter: 2,

    complete: {
      id: 'f2k.complete',
      title: 'Segunda missão concluída!',
      text: 'Quando um elemento faz parte de um conjunto, dizemos que ele pertence ao conjunto. A banana pertence ao conjunto das frutas. A bola não pertence.',
    },
  },
  'forest-3-kids': {
    id: 'forest-3-kids',
    type: 'venn-sorting',
    levelId: 'forest-3',
    ageGroup: '5-8',
    scene: 'forest',

    intro: [
      {
        id: 'f3k.intro.1',
        mood: 'happy',
        illustration: 'all-items',
        text: 'Chegamos na Ponte do E! Para atravessar, vamos arrumar estas coisas em dois grupos: coisas vermelhas e frutas.',
      },
      {
        id: 'f3k.intro.2',
        mood: 'curious',
        illustration: 'venn-example',
        example: { a: 'car', both: 'apple', b: 'banana' },
        text: 'Olha a maçã: ela é vermelha E é fruta! Por isso ela fica no meio, onde os dois grupos se encontram. Esse lugar se chama interseção.',
      },
    ],

    mission: {
      id: 'f3k.mission',
      text: 'Coloque cada coisa no lugar certo: nos vermelhos, nas frutas, no meio se for os dois, ou fora.',
      short: 'Vermelhos e frutas',
    },

    sets: {
      a: { label: 'Vermelhos', trait: 'red' },
      b: { label: 'Frutas', trait: 'fruit' },
      both: { label: 'Vermelho E fruta' },
      outLabel: 'Fora dos grupos',
    },

    // groups: em quais grupos o elemento está ('a' = vermelhos, 'b' = frutas).
    items: [
      { id: 'apple', name: 'Maçã', groups: ['a', 'b'] },
      { id: 'car', name: 'Carrinho', groups: ['a'] },
      { id: 'banana', name: 'Banana', groups: ['b'] },
      { id: 'ball', name: 'Bola', groups: [] },
      { id: 'strawberry', name: 'Morango', groups: ['a', 'b'] },
      { id: 'grapes', name: 'Uva', groups: ['b'] },
    ],

    feedback: {
      success: {
        id: 'f3k.success',
        title: 'Muito bem! Você conseguiu!',
        text: 'A maçã e o morango são vermelhos E são frutas, então ficam no meio! O carrinho é só vermelho, a banana e a uva são só frutas, e a bola fica de fora.',
      },
      empty: {
        id: 'f3k.hint.empty',
        text: 'Vamos começar? Arraste cada coisa para o grupo dela. Comece pela maçã!',
      },
      missingBoth: {
        id: 'f3k.hint.missingBoth',
        text: 'Quase lá! Tem coisa que é vermelha E é fruta ao mesmo tempo. Ela vai no meio, na ponte entre os dois grupos!',
      },
      wrongBoth: {
        id: 'f3k.hint.wrongBoth',
        text: 'Quase lá! No meio só fica o que é vermelho E fruta ao mesmo tempo. Vamos olhar de novo?',
      },
      generic: {
        id: 'f3k.hint.generic',
        text: 'Quase lá! Olhe cada coisa e pergunte: ela é vermelha? Ela é fruta? Ou nenhum dos dois?',
      },
      visualHint: {
        id: 'f3k.hint.visual',
        text: 'Coloquei marquinhas para te ajudar: bolinha vermelha é para vermelho, e a maçãzinha é para fruta!',
      },
    },

    visualHintAfter: 2,

    complete: {
      id: 'f3k.complete',
      title: 'Terceira missão concluída!',
      text: 'Você descobriu a interseção! É o lugar onde ficam os elementos que estão nos dois grupos ao mesmo tempo, como a maçã e o morango: vermelhos E frutas.',
    },
  },
  'forest-4-kids': {
    id: 'forest-4-kids',
    type: 'union-catch',
    levelId: 'forest-4',
    ageGroup: '5-8',
    scene: 'magic',

    intro: [
      {
        id: 'f4k.intro.1',
        mood: 'happy',
        illustration: 'all-items',
        text: 'Uau, o Portal do OU! Ele está fechado, e várias bolhas mágicas estão flutuando por aqui.',
      },
      {
        id: 'f4k.intro.2',
        mood: 'curious',
        illustration: 'union-example',
        example: { a: 'fish', both: 'octopus', b: 'grapes', out: 'apple' },
        text: 'O portal deixa passar quem é animal OU quem é roxo. Basta ser um dos dois, e quem é os dois também passa! Juntar dois grupos assim se chama união.',
      },
    ],

    mission: {
      id: 'f4k.mission',
      text: 'Estoure as bolhas que têm animal OU coisa roxa para abrir o portal!',
      short: 'Animais OU roxos',
    },

    sets: {
      a: { label: 'Animais', color: ANIMAL_PURPLE_COLORS.a },
      b: { label: 'Roxos', color: ANIMAL_PURPLE_COLORS.b },
      both: { label: 'Animal E roxo', color: ANIMAL_PURPLE_COLORS.both },
    },

    // groups: 'a' = animais, 'b' = roxos. Sem grupo = o portal não deixa passar.
    items: [
      { id: 'fish', name: 'Peixe', groups: ['a'] },
      { id: 'apple', name: 'Maçã', groups: [], nope: { id: 'f4k.nope.apple', text: 'A maçã não é animal e não é roxa. O portal não deixa passar!' } },
      { id: 'octopus', name: 'Polvo', groups: ['a', 'b'] },
      { id: 'grapes', name: 'Uva', groups: ['b'] },
      { id: 'ball', name: 'Bola', groups: [], nope: { id: 'f4k.nope.ball', text: 'A bola não é animal e não é roxa. Ela fica de fora!' } },
      { id: 'rabbit', name: 'Coelho', groups: ['a'] },
      { id: 'car', name: 'Carrinho', groups: [], nope: { id: 'f4k.nope.car', text: 'O carrinho não é animal e não é roxo. O portal não deixa passar!' } },
      { id: 'shoe', name: 'Sapato', groups: ['b'] },
      { id: 'banana', name: 'Banana', groups: [], nope: { id: 'f4k.nope.banana', text: 'A banana não é animal e não é roxa. Ela fica de fora!' } },
      { id: 'dolphin', name: 'Golfinho', groups: ['a'] },
      { id: 'strawberry', name: 'Morango', groups: [], nope: { id: 'f4k.nope.strawberry', text: 'O morango não é animal e não é roxo. Ele fica de fora!' } },
    ],

    feedback: {
      success: {
        id: 'f4k.success',
        title: 'Muito bem! Você conseguiu!',
        text: 'O portal abriu! Passaram os animais, as coisas roxas, e também o polvo, que é os dois. Com o OU, basta ser um!',
      },
      visualHint: {
        id: 'f4k.hint.visual',
        text: 'Vou te ajudar: as bolhas certas estão brilhando douradas!',
      },
      idle: {
        id: 'f4k.hint.idle',
        text: 'Toque numa bolha que tem animal ou coisa roxa!',
      },
    },

    /** Erros seguidos até as bolhas certas brilharem. O brilho some no próximo acerto. */
    visualHintAfter: 2,

    complete: {
      id: 'f4k.complete',
      title: 'Quarta missão concluída!',
      text: 'Você descobriu a união! Com o OU, basta estar em um dos grupos para entrar. E quem está nos dois também entra, como o polvo: animal E roxo.',
    },
  },

  'forest-5-kids': {
    id: 'forest-5-kids',
    type: 'guardian-quiz',
    levelId: 'forest-5',
    ageGroup: '5-8',
    scene: 'guardian', // a própria árvore do Guardião é o cenário (GuardianScene)

    intro: [
      {
        id: 'f5k.intro.1',
        mood: 'curious',
        illustration: 'guardian',
        example: { lit: 0 },
        text: 'Este é o Guardião da Floresta. Ele caiu num sono profundo, e a floresta perdeu as suas cores!',
      },
      {
        id: 'f5k.intro.2',
        mood: 'happy',
        illustration: 'guardian',
        example: { lit: 1 },
        text: 'Para acordar o Guardião, vamos usar tudo o que aprendemos. Cada acerto acende uma pedra mágica. Vamos lá?',
      },
    ],

    mission: {
      id: 'f5k.mission',
      text: 'Acerte os cinco desafios para acordar o Guardião!',
      short: 'Desafio final',
    },

    // Nomes dos elementos usados nos desafios.
    elements: {
      fish: 'Peixe', dolphin: 'Golfinho', octopus: 'Polvo', rabbit: 'Coelho', chicken: 'Galinha', butterfly: 'Borboleta',
      apple: 'Maçã', banana: 'Banana', grapes: 'Uva', strawberry: 'Morango', ball: 'Bola', car: 'Carrinho', shoe: 'Sapato',
    },

    rounds: [
      {
        id: 'set',
        symbol: '{ }',
        concept: 'Conjunto',
        kind: 'pick-one',
        display: { type: 'group', label: 'Vivem na água', theme: 'water' },
        prompt: { id: 'f5k.r1.prompt', text: 'Primeiro desafio: qual destes grupos é o conjunto dos animais que vivem na água?' },
        options: [
          { key: 'g-land', items: ['rabbit', 'chicken', 'butterfly'] },
          { key: 'g-water', items: ['fish', 'dolphin', 'octopus'] },
          { key: 'g-mixed', items: ['fish', 'rabbit', 'octopus'] },
        ],
        answer: ['g-water'],
        hint: { id: 'f5k.r1.hint', text: 'Quase! Procure o grupo em que todos os bichinhos nadam na água.' },
      },
      {
        id: 'member',
        symbol: '∈',
        concept: 'Pertence',
        kind: 'pick-one',
        display: { type: 'group', label: 'Frutas', theme: 'fruits' },
        prompt: { id: 'f5k.r2.prompt', text: 'Qual destes pertence ao grupo das frutas?' },
        options: ['car', 'grapes', 'shoe'],
        answer: ['grapes'],
        hint: { id: 'f5k.r2.hint', text: 'Quase! Qual destes a gente pode comer? Ele é uma fruta!' },
      },
      {
        id: 'not-member',
        symbol: '∉',
        concept: 'Não pertence',
        kind: 'pick-one',
        display: { type: 'group', label: 'Vivem na água', theme: 'water' },
        prompt: { id: 'f5k.r3.prompt', text: 'Agora o contrário: quem NÃO pertence ao grupo dos animais da água?' },
        options: ['dolphin', 'butterfly', 'fish'],
        answer: ['butterfly'],
        hint: { id: 'f5k.r3.hint', text: 'Quase! Dois deles nadam. Quem voa pelo céu e não vive na água?' },
      },
      {
        id: 'and',
        symbol: '∩',
        concept: 'E',
        kind: 'pick-one',
        display: { type: 'venn', a: 'Vermelhos', b: 'Frutas', highlight: 'both' },
        prompt: { id: 'f5k.r4.prompt', text: 'A Ponte do E! Qual destes é vermelho E é fruta ao mesmo tempo?' },
        options: ['car', 'banana', 'strawberry'],
        answer: ['strawberry'],
        hint: { id: 'f5k.r4.hint', text: 'Quase! Com o E, precisa ser as duas coisas: vermelho e fruta.' },
      },
      {
        id: 'or',
        symbol: '∪',
        concept: 'OU',
        kind: 'pick-many',
        display: { type: 'venn', a: 'Animais', b: 'Roxos', highlight: 'union', colors: ANIMAL_PURPLE_COLORS },
        prompt: { id: 'f5k.r5.prompt', text: 'Último desafio, o Portal do OU! Toque em TODOS que são animais OU roxos, e depois em Pronto.' },
        options: ['fish', 'ball', 'octopus', 'grapes'],
        answer: ['fish', 'octopus', 'grapes'],
        hint: { id: 'f5k.r5.hint', text: 'Quase! Com o OU, basta ser animal ou ser roxo. E quem é os dois também vale!' },
      },
    ],

    feedback: {
      success: {
        id: 'f5k.success',
        title: 'O Guardião acordou!',
        text: 'Você acendeu todas as pedras mágicas, e a floresta ganhou as suas cores de volta. Obrigado, amiguinho!',
      },
      visualHint: {
        id: 'f5k.hint.visual',
        text: 'Vou te dar uma ajudinha: olha a resposta brilhando!',
      },
      pickMore: {
        id: 'f5k.hint.pickMore',
        text: 'Toque em pelo menos um antes de apertar Pronto!',
      },
    },

    /** Erros no mesmo desafio até a resposta certa brilhar. */
    visualHintAfter: 2,

    complete: {
      id: 'f5k.complete',
      title: 'Floresta dos Conjuntos restaurada!',
      text: 'Você acordou o Guardião! Agora você sabe o que é um conjunto, o que pertence a um grupo, e conhece o E e o OU. Que aventura incrível!',
    },
  },
  'lab-1-kids': {
    id: 'lab-1-kids',
    type: 'truth-lights',
    levelId: 'lab-1',
    ageGroup: '5-8',
    scene: 'lab',

    intro: [
      {
        id: 'l1k.intro.1',
        mood: 'happy',
        illustration: 'all-items',
        text: 'Bem-vindo ao Laboratório da Verdade! Aqui as máquinas só funcionam quando a gente descobre o que é verdade.',
      },
      {
        id: 'l1k.intro.2',
        mood: 'curious',
        illustration: 'truth-example',
        example: { yes: 'fish', no: 'banana' },
        text: 'Uma frase pode ser verdadeira ou falsa. O peixe vive na água: é verdade, a luz acende! A banana é vermelha: é falso, a luz fica apagada.',
      },
    ],

    mission: {
      id: 'l1k.mission',
      text: 'Toque em cada lâmpada da máquina, escute a frase e escolha: verdadeiro ou falso. Depois, ligue a máquina!',
      short: 'Verdadeiro ou falso',
    },

    // Elementos usados nas ilustrações (introdução).
    items: [
      { id: 'fish', name: 'Peixe' },
      { id: 'banana', name: 'Banana' },
      { id: 'rabbit', name: 'Coelho' },
      { id: 'grapes', name: 'Uva' },
    ],

    // Cada frase: quem (subject), o que se diz (property) e se é verdade (value).
    statements: [
      {
        id: 'fish-water',
        subject: 'fish',
        property: { kind: 'water' },
        value: true,
        line: { id: 'l1k.s.fish', text: 'O peixe vive na água.' },
        hint: { id: 'l1k.h.fish', text: 'Pense no peixe: onde ele nada? Ele vive na água!' },
      },
      {
        id: 'banana-red',
        subject: 'banana',
        property: { kind: 'color', color: '#F0546A' },
        value: false,
        line: { id: 'l1k.s.banana', text: 'A banana é vermelha.' },
        hint: { id: 'l1k.h.banana', text: 'Olhe bem a cor da banana. Ela é vermelha ou amarela?' },
      },
      {
        id: 'rabbit-fly',
        subject: 'rabbit',
        property: { kind: 'fly' },
        value: false,
        line: { id: 'l1k.s.rabbit', text: 'O coelho voa.' },
        hint: { id: 'l1k.h.rabbit', text: 'O coelho tem asas? Ele pula, mas será que voa?' },
      },
      {
        id: 'grapes-purple',
        subject: 'grapes',
        property: { kind: 'color', color: '#9B6BE0' },
        value: true,
        line: { id: 'l1k.s.grapes', text: 'A uva é roxa.' },
        hint: { id: 'l1k.h.grapes', text: 'Olhe a cor da uva. Ela é roxinha!' },
      },
    ],

    answers: {
      yes: 'Verdadeiro',
      no: 'Falso',
    },

    feedback: {
      success: {
        id: 'l1k.success',
        title: 'Muito bem! A máquina ligou!',
        text: 'O peixe vive na água e a uva é roxa: verdade! A banana vermelha e o coelho que voa: falso!',
      },
      unanswered: {
        id: 'l1k.hint.unanswered',
        text: 'Ainda tem lâmpada com ponto de interrogação. Toque nela para ver a frase!',
      },
    },

    complete: {
      id: 'l1k.complete',
      title: 'Primeira missão do laboratório concluída!',
      text: 'Agora você sabe: uma frase pode ser verdadeira ou falsa. Quando é verdade, a luz acende!',
    },
  },
  'lab-2-kids': {
    id: 'lab-2-kids',
    type: 'gate-machines',
    levelId: 'lab-2',
    ageGroup: '5-8',
    scene: 'lab',
    gate: 'E',

    intro: [
      {
        id: 'l2k.intro.1',
        mood: 'happy',
        illustration: 'gate-example',
        example: {
          a: { subject: 'fish', property: { kind: 'water' }, value: true },
          b: { subject: 'grapes', property: { kind: 'color', color: '#9B6BE0' }, value: true },
        },
        text: 'Esta é a Máquina do E. Ela tem duas frases. A lâmpada grande só acende se a primeira frase E a segunda frase forem verdade!',
      },
      {
        id: 'l2k.intro.2',
        mood: 'curious',
        illustration: 'gate-example',
        example: {
          a: { subject: 'fish', property: { kind: 'water' }, value: true },
          b: { subject: 'car', property: { kind: 'fly' }, value: false },
        },
        text: 'O peixe vive na água, mas o carrinho não voa. Se uma das frases for falsa, a Máquina do E fica apagada. Vamos testar as máquinas do laboratório?',
      },
    ],

    mission: {
      id: 'l2k.mission',
      text: 'Toque em cada Máquina do E e descubra: a lâmpada grande vai acender?',
      short: 'A Máquina do E',
    },

    answers: {
      yes: 'Acende',
      no: 'Não acende',
    },

    // Cada máquina: duas frases (a, b). A saída é a E b.
    machines: [
      {
        id: 'and-1',
        a: { subject: 'fish', property: { kind: 'water' }, value: true, text: 'O peixe vive na água.' },
        b: { subject: 'grapes', property: { kind: 'color', color: '#9B6BE0' }, value: true, text: 'A uva é roxa.' },
        question: { id: 'l2k.q.1', text: 'O peixe vive na água E a uva é roxa. A Máquina do E acende?' },
        hint: { id: 'l2k.h.1', text: 'As duas frases são verdade! Quando as duas são verdade, a Máquina do E acende.' },
      },
      {
        id: 'and-2',
        a: { subject: 'apple', property: { kind: 'color', color: '#F0546A' }, value: true, text: 'A maçã é vermelha.' },
        b: { subject: 'car', property: { kind: 'fly' }, value: false, text: 'O carrinho voa.' },
        question: { id: 'l2k.q.2', text: 'A maçã é vermelha E o carrinho voa. A Máquina do E acende?' },
        hint: { id: 'l2k.h.2', text: 'O carrinho não voa! Uma frase é falsa, então a Máquina do E fica apagada.' },
      },
      {
        id: 'and-3',
        a: { subject: 'banana', property: { kind: 'color', color: '#4DA8F0' }, value: false, text: 'A banana é azul.' },
        b: { subject: 'dolphin', property: { kind: 'water' }, value: true, text: 'O golfinho vive na água.' },
        question: { id: 'l2k.q.3', text: 'A banana é azul E o golfinho vive na água. A Máquina do E acende?' },
        hint: { id: 'l2k.h.3', text: 'A banana não é azul! Uma frase é falsa, então a Máquina do E fica apagada.' },
      },
      {
        id: 'and-4',
        a: { subject: 'chicken', property: { kind: 'water' }, value: false, text: 'A galinha vive na água.' },
        b: { subject: 'octopus', property: { kind: 'color', color: '#FFC21A' }, value: false, text: 'O polvo é amarelo.' },
        question: { id: 'l2k.q.4', text: 'A galinha vive na água E o polvo é amarelo. A Máquina do E acende?' },
        hint: { id: 'l2k.h.4', text: 'As duas frases são falsas! Para a Máquina do E acender, as duas precisam ser verdade.' },
      },
    ],

    feedback: {
      success: {
        id: 'l2k.success',
        title: 'Muito bem! Você consertou as máquinas!',
        text: 'A Máquina do E só acende quando as duas frases são verdade. Se uma for falsa, ela fica apagada.',
      },
    },

    complete: {
      id: 'l2k.complete',
      title: 'Segunda missão do laboratório concluída!',
      text: 'Você descobriu o E: a lâmpada só acende quando as duas frases são verdade ao mesmo tempo.',
    },
  },
};

export function getChallenge(challengeId) {
  return CHALLENGES[challengeId] ?? null;
}
