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
        correct: { id: 'f2k.ok.banana', text: 'Isso! A banana é uma fruta. Ela pertence ao grupo!' },
        hint: { id: 'f2k.hint.banana', text: 'Hmm... a banana é amarelinha e gostosa de comer. Será que ela é uma fruta?' },
      },
      {
        id: 'ball',
        name: 'Bola',
        belongs: false,
        question: { id: 'f2k.q.ball', text: 'E a bola? Ela pertence ao grupo das frutas?' },
        correct: { id: 'f2k.ok.ball', text: 'Muito bem! A bola é um brinquedo. Ela não pertence ao grupo das frutas.' },
        hint: { id: 'f2k.hint.ball', text: 'Será que a gente come a bola? A bola é para brincar! Vamos pensar de novo?' },
      },
      {
        id: 'apple',
        name: 'Maçã',
        belongs: true,
        question: { id: 'f2k.q.apple', text: 'Olha a maçã! Ela pertence ao grupo das frutas?' },
        correct: { id: 'f2k.ok.apple', text: 'Isso mesmo! A maçã é uma fruta. Ela pertence ao grupo!' },
        hint: { id: 'f2k.hint.apple', text: 'A maçã é vermelhinha e nasce na árvore. Será que ela é uma fruta?' },
      },
      {
        id: 'car',
        name: 'Carrinho',
        belongs: false,
        question: { id: 'f2k.q.car', text: 'E o carrinho? Ele pertence ao grupo das frutas?' },
        correct: { id: 'f2k.ok.car', text: 'Muito bem! O carrinho é um brinquedo. Ele não pertence ao grupo das frutas.' },
        hint: { id: 'f2k.hint.car', text: 'O carrinho tem rodinhas e serve para brincar. Será que ele é uma fruta?' },
      },
      {
        id: 'grapes',
        name: 'Uva',
        belongs: true,
        question: { id: 'f2k.q.grapes', text: 'Olha a uva! Ela pertence ao grupo das frutas?' },
        correct: { id: 'f2k.ok.grapes', text: 'Isso! A uva é uma fruta. Ela pertence ao grupo!' },
        hint: { id: 'f2k.hint.grapes', text: 'A uva é pequenininha, redondinha e docinha. Será que ela é uma fruta?' },
      },
      {
        id: 'shoe',
        name: 'Sapato',
        belongs: false,
        question: { id: 'f2k.q.shoe', text: 'E o sapato? Ele pertence ao grupo das frutas?' },
        correct: { id: 'f2k.ok.shoe', text: 'Muito bem! O sapato a gente usa nos pés. Ele não pertence ao grupo das frutas.' },
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
        example: { a: 'car', both: 'apple', b: 'banana', out: 'fish' },
        text: 'O portal deixa passar quem é vermelho OU quem é fruta. Basta ser um dos dois, e quem é os dois também passa! Juntar dois grupos assim se chama união.',
      },
    ],

    mission: {
      id: 'f4k.mission',
      text: 'Estoure as bolhas que têm coisa vermelha OU fruta para abrir o portal!',
      short: 'Vermelhos OU frutas',
    },

    sets: {
      a: { label: 'Vermelhos' },
      b: { label: 'Frutas' },
      both: { label: 'Vermelho E fruta' },
    },

    // groups: 'a' = vermelhos, 'b' = frutas. Sem grupo = o portal não deixa passar.
    items: [
      { id: 'apple', name: 'Maçã', groups: ['a', 'b'], yes: { id: 'f4k.yes.apple', text: 'A maçã é vermelha E é fruta. Com o OU, ela passa também!' } },
      { id: 'fish', name: 'Peixe', groups: [], nope: { id: 'f4k.nope.fish', text: 'O peixe não é vermelho e não é fruta. O portal não deixa passar!' } },
      { id: 'car', name: 'Carrinho', groups: ['a'], yes: { id: 'f4k.yes.car', text: 'O carrinho é vermelho. Não é fruta, mas com o OU basta um!' } },
      { id: 'banana', name: 'Banana', groups: ['b'], yes: { id: 'f4k.yes.banana', text: 'A banana é fruta. Não é vermelha, mas com o OU basta um!' } },
      { id: 'ball', name: 'Bola', groups: [], nope: { id: 'f4k.nope.ball', text: 'A bola não é vermelha e não é fruta. Ela fica de fora!' } },
      { id: 'strawberry', name: 'Morango', groups: ['a', 'b'], yes: { id: 'f4k.yes.strawberry', text: 'O morango é vermelho E é fruta. Com o OU, ele passa também!' } },
      { id: 'rabbit', name: 'Coelho', groups: [], nope: { id: 'f4k.nope.rabbit', text: 'O coelho não é vermelho e não é fruta. Ele fica de fora!' } },
      { id: 'grapes', name: 'Uva', groups: ['b'], yes: { id: 'f4k.yes.grapes', text: 'A uva é fruta. Não é vermelha, mas com o OU basta um!' } },
      { id: 'shoe', name: 'Sapato', groups: [], nope: { id: 'f4k.nope.shoe', text: 'O sapato não é vermelho e não é fruta. O portal não deixa passar!' } },
      { id: 'octopus', name: 'Polvo', groups: [], nope: { id: 'f4k.nope.octopus', text: 'O polvo não é vermelho e não é fruta. Ele fica de fora!' } },
    ],

    feedback: {
      success: {
        id: 'f4k.success',
        title: 'Muito bem! Você conseguiu!',
        text: 'O portal abriu! Passou tudo que é vermelho, tudo que é fruta, e também o que é os dois. Com o OU, basta ser um!',
      },
      visualHint: {
        id: 'f4k.hint.visual',
        text: 'Vou te ajudar: as bolhas certas estão brilhando douradas!',
      },
      idle: {
        id: 'f4k.hint.idle',
        text: 'Toque numa bolha que tem coisa vermelha ou fruta!',
      },
    },

    /** Erros seguidos até as bolhas certas brilharem. O brilho some no próximo acerto. */
    visualHintAfter: 2,

    complete: {
      id: 'f4k.complete',
      title: 'Quarta missão concluída!',
      text: 'Você descobriu a união! Com o OU, basta estar em um dos grupos para entrar. E quem está nos dois também entra, como a maçã e o morango.',
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
        ok: { id: 'f5k.r1.ok', text: 'Isso! Peixe, golfinho e polvo: todos vivem na água. Primeira pedra acesa!' },
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
        ok: { id: 'f5k.r2.ok', text: 'Muito bem! A uva pertence ao grupo das frutas!' },
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
        ok: { id: 'f5k.r3.ok', text: 'Isso mesmo! A borboleta voa, ela não pertence ao grupo da água!' },
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
        ok: { id: 'f5k.r4.ok', text: 'Perfeito! O morango é vermelho E é fruta. Ele fica no meio, na interseção!' },
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
        ok: { id: 'f5k.r5.ok', text: 'Isso! O peixe é animal, a uva é roxa e o polvo é os dois: todos passam pelo OU. A bola fica de fora!' },
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
};

export function getChallenge(challengeId) {
  return CHALLENGES[challengeId] ?? null;
}
