/**
 * Laboratório da Verdade · fase 4 · 5–8 anos — "O Espelho do NÃO".
 * O reflexo do NÃO: objetos e frases ao contrário.
 */

export default {
  id: 'lab-4-kids',
  type: 'not-mirror',
  levelId: 'lab-4',
  ageGroup: '5-8',
  scene: 'lab',

  intro: [
    {
      id: 'l4k.intro.1',
      mood: 'happy',
      illustration: 'mirror-example',
      example: { kind: 'lamp', value: true },
      text: 'Este é o Espelho do NÃO! Ele mostra tudo ao contrário. A lâmpada acesa, no espelho, fica apagada!',
    },
    {
      id: 'l4k.intro.2',
      mood: 'curious',
      illustration: 'mirror-example',
      example: { kind: 'phrase', subject: 'fish', property: { kind: 'water' }, value: true, text: 'O peixe vive na água.', notText: 'O peixe NÃO vive na água.' },
      text: 'Com as frases também! O peixe vive na água: é verdade. Com o NÃO, a frase vira falsa.',
    },
  ],

  mission: {
    id: 'l4k.mission',
    text: 'O espelho está bagunçado! Toque nos reflexos para deixar tudo ao contrário.',
    short: 'O Espelho do NÃO',
  },

  // Cada parte: coisas de verdade (à esquerda) e o reflexo no espelho (à direita), que deve ser o contrário.
  stages: [
    {
      id: 'objects',
      title: 'Objetos no espelho',
      instruction: { id: 'l4k.stage.1', text: 'O espelho está bagunçado! Toque nos reflexos para deixar tudo ao contrário.' },
      rows: [
        {
          id: 'lamp',
          kind: 'lamp',
          value: true,
          start: true,
          states: { on: 'Acesa', off: 'Apagada' },
          hint: { id: 'l4k.h.lamp', text: 'A lâmpada está acesa. No Espelho do NÃO, ela fica apagada!' },
        },
        {
          id: 'lever',
          kind: 'lever',
          value: true,
          start: false,
          states: { on: 'Ligada', off: 'Desligada' },
          hint: { id: 'l4k.h.lever', text: 'A alavanca está ligada. No Espelho do NÃO, ela fica desligada!' },
        },
        {
          id: 'door',
          kind: 'door',
          value: false,
          start: false,
          states: { on: 'Aberta', off: 'Fechada' },
          hint: { id: 'l4k.h.door', text: 'A porta está fechada. No Espelho do NÃO, ela fica aberta!' },
        },
      ],
    },
    {
      id: 'phrases',
      title: 'Frases no espelho',
      mode: 'one-by-one', // uma frase por vez, com dois botões grandes
      instruction: { id: 'l4k.stage.2', text: 'Agora as frases! O espelho do NÃO também deixa as frases ao contrário. A luz do espelho acende ou apaga?' },
      rows: [
        {
          id: 'fish',
          kind: 'phrase',
          subject: 'fish',
          property: { kind: 'water' },
          value: true,
          text: 'O peixe vive na água.',
          notText: 'O peixe NÃO vive na água.',
          hint: { id: 'l4k.h.fish', text: 'A luz do peixe está acesa. No espelho fica ao contrário: a luz apaga!' },
        },
        {
          id: 'banana',
          kind: 'phrase',
          subject: 'banana',
          property: { kind: 'color', color: '#F0546A' },
          value: false,
          text: 'A banana é vermelha.',
          notText: 'A banana NÃO é vermelha.',
          hint: { id: 'l4k.h.banana', text: 'A luz da banana está apagada, porque ela não é vermelha. No espelho fica ao contrário: a luz acende!' },
        },
        {
          id: 'grapes',
          kind: 'phrase',
          subject: 'grapes',
          property: { kind: 'color', color: '#9B6BE0' },
          value: true,
          text: 'A uva é roxa.',
          notText: 'A uva NÃO é roxa.',
          hint: { id: 'l4k.h.grapes', text: 'A luz da uva está acesa. No espelho fica ao contrário: a luz apaga!' },
        },
      ],
    },
  ],

  answers: {
    on: 'Acende',
    off: 'Apaga',
  },

  feedback: {
    unset: {
      id: 'l4k.hint.unset',
      text: 'Ainda tem reflexo com ponto de interrogação. Toque nele para escolher!',
    },
    success: {
      id: 'l4k.success',
      title: 'Muito bem! O espelho está arrumado!',
      text: 'O NÃO deixa tudo ao contrário: o que era verdade vira falso, e o que era falso vira verdade.',
    },
  },

  complete: {
    id: 'l4k.complete',
    title: 'Quarta missão do laboratório concluída!',
    text: 'Você descobriu o NÃO: ele vira tudo ao contrário. Verdade vira falso, e falso vira verdade.',
  },
};
