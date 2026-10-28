/**
 * Laboratório da Verdade · fase 5 · 5–8 anos — "A Tabela Mestra".
 * O desafio final do laboratório: as tabelas-verdade do E e do OU.
 */

export default {
  id: 'lab-5-kids',
  type: 'master-table',
  levelId: 'lab-5',
  ageGroup: '5-8',
  scene: 'lab',

  levers: {
    a: { label: '1' },
    b: { label: '2' },
  },

  // As quatro combinações das alavancas (linhas da Tabela Mestra).
  rows: [
    { a: true, b: true },
    { a: true, b: false },
    { a: false, b: true },
    { a: false, b: false },
  ],

  intro: [
    {
      id: 'l5k.intro.1',
      mood: 'happy',
      illustration: 'circuit-example',
      example: { gate: 'E', a: true, b: true },
      text: 'A Tabela Mestra está sem energia! As alavancas ligadas ficam verdes e mandam energia pelos fios até a lâmpada.',
    },
    {
      id: 'l5k.intro.2',
      mood: 'curious',
      illustration: 'circuit-example',
      example: { gate: 'E', a: true, b: false },
      text: 'Na Máquina do E, a lâmpada precisa da energia das duas alavancas. Com uma só, ela só pisca fraquinho. Vamos testar?',
    },
  ],

  mission: {
    id: 'l5k.mission',
    text: 'Olhe as alavancas: a energia vai acender a luz?',
    short: 'A Tabela Mestra',
  },

  answers: {
    on: 'Acende',
    off: 'Não acende',
  },

  // Colunas da tabela (E e depois OU). Cada combinação é testada uma de cada vez.
  columns: [
    {
      id: 'and',
      gate: 'E',
      start: { id: 'l5k.col.and', text: 'Primeiro a Máquina do E! Ela precisa da energia das duas alavancas para acender a luz.' },
      questions: [
        { id: 'l5k.and.0', text: 'As duas alavancas estão ligadas. Com o E, a luz acende?' },
        { id: 'l5k.and.1', text: 'Só a alavanca 1 está ligada. Com o E, a luz acende?' },
        { id: 'l5k.and.2', text: 'Só a alavanca 2 está ligada. Com o E, a luz acende?' },
        { id: 'l5k.and.3', text: 'Nenhuma alavanca está ligada. Com o E, a luz acende?' },
      ],
      // explicação ao errar, pela quantidade de alavancas ligadas
      hints: {
        2: { id: 'l5k.and.h2', text: 'As duas alavancas mandaram energia! Com o E, quando chega a energia das duas, a luz acende.' },
        1: { id: 'l5k.and.h1', text: 'Só uma alavanca mandou energia. O E precisa das duas, então a luz só pisca fraquinho e não acende.' },
        0: { id: 'l5k.and.h0', text: 'Nenhuma alavanca está ligada, então não sai energia e a luz fica apagada.' },
      },
    },
    {
      id: 'or',
      gate: 'OU',
      start: { id: 'l5k.col.or', text: 'Agora a Máquina do OU! Com o OU, a energia de uma alavanca já basta para acender a luz.' },
      questions: [
        { id: 'l5k.or.0', text: 'As duas alavancas estão ligadas. Com o OU, a luz acende?' },
        { id: 'l5k.or.1', text: 'Só a alavanca 1 está ligada. Com o OU, a luz acende?' },
        { id: 'l5k.or.2', text: 'Só a alavanca 2 está ligada. Com o OU, a luz acende?' },
        { id: 'l5k.or.3', text: 'Nenhuma alavanca está ligada. Com o OU, a luz acende?' },
      ],
      hints: {
        2: { id: 'l5k.or.h2', text: 'As duas alavancas mandaram energia! Com o OU, a luz acende.' },
        1: { id: 'l5k.or.h1', text: 'Uma alavanca mandou energia, e com o OU uma já basta: a luz acende!' },
        0: { id: 'l5k.or.h0', text: 'Nenhuma alavanca está ligada, então não sai energia e a luz fica apagada.' },
      },
    },
  ],

  feedback: {
    tableDone: {
      id: 'l5k.tableDone',
      text: 'Olha a Tabela Mestra completa, com tudo que você descobriu! O laboratório tem energia de novo!',
    },
    success: {
      id: 'l5k.success',
      title: 'A Tabela Mestra ligou!',
      text: 'Você descobriu quando a energia acende a luz no E e no OU. O laboratório está funcionando de novo. Obrigado, amiguinho!',
    },
  },

  complete: {
    id: 'l5k.complete',
    title: 'Laboratório da Verdade restaurado!',
    text: 'Você descobriu o verdadeiro e o falso, a Máquina do E, a Máquina do OU, o Espelho do NÃO e montou a Tabela Mestra. Que cientista incrível!',
  },
};
