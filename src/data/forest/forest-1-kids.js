/**
 * Floresta dos Conjuntos · fase 1 · 5–8 anos — "Conhecendo os Grupos".
 * Arrastar para dentro do conjunto os animais que vivem na água.
 */

export default {
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
    { id: 'fish', name: 'Peixe', belongs: true, narrationId: 'f1k.item.fish' },
    { id: 'rabbit', name: 'Coelho', belongs: false, narrationId: 'f1k.item.rabbit' },
    { id: 'dolphin', name: 'Golfinho', belongs: true, narrationId: 'f1k.item.dolphin' },
    { id: 'chicken', name: 'Galinha', belongs: false, narrationId: 'f1k.item.chicken' },
    { id: 'octopus', name: 'Polvo', belongs: true, narrationId: 'f1k.item.octopus' },
    { id: 'butterfly', name: 'Borboleta', belongs: false, narrationId: 'f1k.item.butterfly' },
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
};
