/**
 * Laboratório da Verdade · fase 2 · 5–8 anos — "A Máquina do E".
 * A lâmpada grande só acende se as duas frases forem verdade.
 */

export default {
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
};
