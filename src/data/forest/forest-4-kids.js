/**
 * Floresta dos Conjuntos · fase 4 · 5–8 anos — "O Portal do OU".
 * A união: o portal deixa passar quem é animal OU coisa roxa.
 */
import { ANIMAL_PURPLE_COLORS } from './shared.js';

export default {
  id: 'forest-4-kids',
  type: 'union-catch',
  levelId: 'forest-4',
  ageGroup: '5-8',
  scene: 'magic',

  intro: [
    {
      id: 'f4k.intro.1',
      mood: 'happy',
      illustration: 'all-items',
      text: 'Uau, o Portal do OU! Ele está fechado, e várias bolhas mágicas estão flutuando por aqui.',
    },
    {
      id: 'f4k.intro.2',
      mood: 'curious',
      illustration: 'union-example',
      example: { a: 'fish', both: 'octopus', b: 'grapes', out: 'apple' },
      text: 'O portal deixa passar quem é animal OU quem é roxo. Basta ser um dos dois, e quem é os dois também passa! Juntar dois grupos assim se chama união.',
    },
  ],

  mission: {
    id: 'f4k.mission',
    text: 'Estoure as bolhas que têm animal OU coisa roxa para abrir o portal!',
    short: 'Animais OU roxos',
  },

  sets: {
    a: { label: 'Animais', color: ANIMAL_PURPLE_COLORS.a },
    b: { label: 'Roxos', color: ANIMAL_PURPLE_COLORS.b },
    both: { label: 'Animal E roxo', color: ANIMAL_PURPLE_COLORS.both },
  },

  // groups: 'a' = animais, 'b' = roxos. Sem grupo = o portal não deixa passar.
  items: [
    { id: 'fish', name: 'Peixe', groups: ['a'] },
    { id: 'apple', name: 'Maçã', groups: [], nope: { id: 'f4k.nope.apple', text: 'A maçã não é animal e não é roxa. O portal não deixa passar!' } },
    { id: 'octopus', name: 'Polvo', groups: ['a', 'b'] },
    { id: 'grapes', name: 'Uva', groups: ['b'] },
    { id: 'ball', name: 'Bola', groups: [], nope: { id: 'f4k.nope.ball', text: 'A bola não é animal e não é roxa. Ela fica de fora!' } },
    { id: 'rabbit', name: 'Coelho', groups: ['a'] },
    { id: 'car', name: 'Carrinho', groups: [], nope: { id: 'f4k.nope.car', text: 'O carrinho não é animal e não é roxo. O portal não deixa passar!' } },
    { id: 'shoe', name: 'Sapato', groups: ['b'] },
    { id: 'banana', name: 'Banana', groups: [], nope: { id: 'f4k.nope.banana', text: 'A banana não é animal e não é roxa. Ela fica de fora!' } },
    { id: 'dolphin', name: 'Golfinho', groups: ['a'] },
    { id: 'strawberry', name: 'Morango', groups: [], nope: { id: 'f4k.nope.strawberry', text: 'O morango não é animal e não é roxo. Ele fica de fora!' } },
  ],

  feedback: {
    success: {
      id: 'f4k.success',
      title: 'Muito bem! Você conseguiu!',
      text: 'O portal abriu! Passaram os animais, as coisas roxas, e também o polvo, que é os dois. Com o OU, basta ser um!',
    },
    visualHint: {
      id: 'f4k.hint.visual',
      text: 'Vou te ajudar: as bolhas certas estão brilhando douradas!',
    },
    idle: {
      id: 'f4k.hint.idle',
      text: 'Toque numa bolha que tem animal ou coisa roxa!',
    },
  },

  /** Erros seguidos até as bolhas certas brilharem. O brilho some no próximo acerto. */
  visualHintAfter: 2,

  complete: {
    id: 'f4k.complete',
    title: 'Quarta missão concluída!',
    text: 'Você descobriu a união! Com o OU, basta estar em um dos grupos para entrar. E quem está nos dois também entra, como o polvo: animal E roxo.',
  },
};
