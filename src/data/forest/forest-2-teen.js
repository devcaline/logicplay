/**
 * Floresta dos Conjuntos · fase 2 · 13 anos ou mais — "Quem Pertence Aqui?".
 * Completar afirmações com ∈, ∉, ⊂ ou ⊄; aquecimento e questões em data/teen/membershipRounds.js.
 */

export default {
  id: 'forest-2-teen',
  type: 'set-membership',
  levelId: 'forest-2',
  ageGroup: '13+',
  scene: 'study',
  quiet: true,
  rounds: 3,

  intro: [
    {
      id: 't.f2.intro',
      mood: 'curious',
      illustration: 'membership-notation',
      text: 'Para dizer que um elemento faz parte de um conjunto usamos ∈ (pertence). Quando não faz parte, usamos ∉ (não pertence). Assim: 4 ∈ A e 5 ∉ A.',
    },
  ],

  mission: { id: 't.f2.mission', text: 'Complete cada afirmação com o símbolo certo.' },

  // Aquecimento guiado: os itens e as falas ficam em data/teen/membershipRounds.js.
  tutorial: true,

  symbols: [
    ['∈', 'pertence a'],
    ['∉', 'não pertence a'],
    ['⊂', 'está contido em (todos os elementos estão lá)'],
    ['⊄', 'não está contido em'],
    ['ℕ', 'números naturais: 0, 1, 2, 3…'],
    ['ℕ*', 'naturais sem o zero: 1, 2, 3…'],
    ['ℤ', 'números inteiros: …, −2, −1, 0, 1, 2…'],
    ['|', 'tal que'],
    ['< / ≤', 'menor que / menor ou igual a'],
    ['x²', 'x vezes x'],
  ],

  feedback: {
    success: {
      id: 't.f2.success',
      title: 'Fase concluída!',
      text: 'Você decidiu, elemento por elemento, quem pertence a cada conjunto.',
    },
  },

  complete: {
    id: 't.f2.complete',
    title: 'Pertinência: concluída!',
    text: 'Para qualquer elemento só existem duas respostas: ele pertence (∈) ou não pertence (∉) ao conjunto.',
  },
};
