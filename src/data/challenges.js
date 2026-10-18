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
};

export function getChallenge(challengeId) {
  return CHALLENGES[challengeId] ?? null;
}
