/**
 * Laboratório da Verdade · fase 3 · 5–8 anos — "A Máquina do OU".
 * Basta uma alavanca ligada para a máquina funcionar.
 */

export default {
  id: 'lab-3-kids',
  type: 'lever-machine',
  levelId: 'lab-3',
  ageGroup: '5-8',
  scene: 'lab',
  gate: 'OU',

  levers: {
    a: { label: 'azul', color: '#3B95E8' },
    b: { label: 'rosa', color: '#F7619F' },
  },

  intro: [
    {
      id: 'l3k.intro.1',
      mood: 'happy',
      illustration: 'lever-example',
      example: { a: true, b: false, state: 'working' },
      text: 'Esta é a Máquina do OU! Ela tem duas alavancas. Se a alavanca azul OU a alavanca rosa estiver ligada, as engrenagens giram!',
    },
    {
      id: 'l3k.intro.2',
      mood: 'curious',
      illustration: 'lever-example',
      example: { a: false, b: false, state: 'stopped' },
      text: 'Mas se as duas alavancas estiverem desligadas, a máquina fica parada. Vamos testar?',
    },
  ],

  mission: {
    id: 'l3k.mission',
    text: 'Olhe as alavancas e descubra: a Máquina do OU vai funcionar?',
    short: 'A Máquina do OU',
  },

  answers: {
    yes: 'Funciona',
    no: 'Não funciona',
  },

  // predict: a criança diz se funciona com as alavancas mostradas.
  // act: a criança mexe nas alavancas para a máquina funcionar (uma delas pode estar emperrada).
  rounds: [
    {
      id: 'or-1',
      kind: 'predict',
      values: { a: true, b: false },
      question: { id: 'l3k.q.1', text: 'A alavanca azul está ligada e a rosa está desligada. A Máquina do OU funciona?' },
      hint: { id: 'l3k.h.1', text: 'A alavanca azul está ligada! Com o OU, basta uma alavanca ligada para a máquina funcionar.' },
    },
    {
      id: 'or-2',
      kind: 'predict',
      values: { a: false, b: false },
      question: { id: 'l3k.q.2', text: 'As duas alavancas estão desligadas. A Máquina do OU funciona?' },
      hint: { id: 'l3k.h.2', text: 'Nenhuma alavanca está ligada. Sem nenhuma ligada, a Máquina do OU fica parada.' },
    },
    {
      id: 'or-3',
      kind: 'predict',
      values: { a: true, b: true },
      question: { id: 'l3k.q.3', text: 'As duas alavancas estão ligadas. A Máquina do OU funciona?' },
      hint: { id: 'l3k.h.3', text: 'As duas estão ligadas! Se uma já basta, com as duas a máquina funciona também.' },
    },
    {
      id: 'or-4',
      kind: 'predict',
      values: { a: false, b: true },
      question: { id: 'l3k.q.4', text: 'A alavanca azul está desligada e a rosa está ligada. A Máquina do OU funciona?' },
      hint: { id: 'l3k.h.4', text: 'A alavanca rosa está ligada! Com o OU, basta uma ligada.' },
    },
    {
      id: 'or-5',
      kind: 'act',
      values: { a: false, b: false },
      stuck: 'a',
      question: { id: 'l3k.q.5', text: 'Ih, a alavanca azul emperrou! Ligue uma alavanca para a Máquina do OU funcionar.' },
      stuckHint: { id: 'l3k.h.5', text: 'Essa alavanca está emperrada. Tente a outra! Com o OU, basta uma.' },
    },
  ],

  feedback: {
    success: {
      id: 'l3k.success',
      title: 'Muito bem! A Máquina do OU está funcionando!',
      text: 'Com o OU, basta uma alavanca ligada. A máquina só fica parada quando as duas estão desligadas.',
    },
  },

  complete: {
    id: 'l3k.complete',
    title: 'Terceira missão do laboratório concluída!',
    text: 'Você descobriu o OU: basta uma alavanca ligada para a máquina funcionar. Ela só para quando todas estão desligadas.',
  },
};
