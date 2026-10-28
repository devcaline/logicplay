/**
 * Floresta dos Conjuntos · fase 2 · 5–8 anos — "Quem Pertence Aqui?".
 * Um elemento por vez: decidir se pertence ou não ao grupo das frutas.
 */

export default {
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
};
