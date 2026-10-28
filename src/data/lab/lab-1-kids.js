/**
 * Laboratório da Verdade · fase 1 · 5–8 anos — "Luzes da Verdade".
 * Cada frase acende a lâmpada (verdadeiro) ou deixa apagada (falso).
 */

export default {
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
};
