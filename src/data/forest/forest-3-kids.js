/**
 * Floresta dos Conjuntos · fase 3 · 5–8 anos — "A Ponte do E".
 * A interseção: o que é vermelho E fruta fica no meio da ponte.
 */

export default {
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
};
