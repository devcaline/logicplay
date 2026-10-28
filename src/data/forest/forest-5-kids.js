/**
 * Floresta dos Conjuntos · fase 5 · 5–8 anos — "O Guardião da Floresta".
 * O desafio final da floresta: cinco perguntas para acordar o Guardião.
 */
import { ANIMAL_PURPLE_COLORS } from './shared.js';

export default {
  id: 'forest-5-kids',
  type: 'guardian-quiz',
  levelId: 'forest-5',
  ageGroup: '5-8',
  scene: 'guardian', // a própria árvore do Guardião é o cenário (GuardianScene)

  intro: [
    {
      id: 'f5k.intro.1',
      mood: 'curious',
      illustration: 'guardian',
      example: { lit: 0 },
      text: 'Este é o Guardião da Floresta. Ele caiu num sono profundo, e a floresta perdeu as suas cores!',
    },
    {
      id: 'f5k.intro.2',
      mood: 'happy',
      illustration: 'guardian',
      example: { lit: 1 },
      text: 'Para acordar o Guardião, vamos usar tudo o que aprendemos. Cada acerto acende uma pedra mágica. Vamos lá?',
    },
  ],

  mission: {
    id: 'f5k.mission',
    text: 'Acerte os cinco desafios para acordar o Guardião!',
    short: 'Desafio final',
  },

  // Nomes dos elementos usados nos desafios.
  elements: {
    fish: 'Peixe', dolphin: 'Golfinho', octopus: 'Polvo', rabbit: 'Coelho', chicken: 'Galinha', butterfly: 'Borboleta',
    apple: 'Maçã', banana: 'Banana', grapes: 'Uva', strawberry: 'Morango', ball: 'Bola', car: 'Carrinho', shoe: 'Sapato',
  },

  rounds: [
    {
      id: 'set',
      symbol: '{ }',
      concept: 'Conjunto',
      kind: 'pick-one',
      display: { type: 'group', label: 'Vivem na água', theme: 'water' },
      prompt: { id: 'f5k.r1.prompt', text: 'Primeiro desafio: qual destes grupos é o conjunto dos animais que vivem na água?' },
      options: [
        { key: 'g-land', items: ['rabbit', 'chicken', 'butterfly'] },
        { key: 'g-water', items: ['fish', 'dolphin', 'octopus'] },
        { key: 'g-mixed', items: ['fish', 'rabbit', 'octopus'] },
      ],
      answer: ['g-water'],
      hint: { id: 'f5k.r1.hint', text: 'Quase! Procure o grupo em que todos os bichinhos nadam na água.' },
    },
    {
      id: 'member',
      symbol: '∈',
      concept: 'Pertence',
      kind: 'pick-one',
      display: { type: 'group', label: 'Frutas', theme: 'fruits' },
      prompt: { id: 'f5k.r2.prompt', text: 'Qual destes pertence ao grupo das frutas?' },
      options: ['car', 'grapes', 'shoe'],
      answer: ['grapes'],
      hint: { id: 'f5k.r2.hint', text: 'Quase! Qual destes a gente pode comer? Ele é uma fruta!' },
    },
    {
      id: 'not-member',
      symbol: '∉',
      concept: 'Não pertence',
      kind: 'pick-one',
      display: { type: 'group', label: 'Vivem na água', theme: 'water' },
      prompt: { id: 'f5k.r3.prompt', text: 'Agora o contrário: quem NÃO pertence ao grupo dos animais da água?' },
      options: ['dolphin', 'butterfly', 'fish'],
      answer: ['butterfly'],
      hint: { id: 'f5k.r3.hint', text: 'Quase! Dois deles nadam. Quem voa pelo céu e não vive na água?' },
    },
    {
      id: 'and',
      symbol: '∩',
      concept: 'E',
      kind: 'pick-one',
      display: { type: 'venn', a: 'Vermelhos', b: 'Frutas', highlight: 'both' },
      prompt: { id: 'f5k.r4.prompt', text: 'A Ponte do E! Qual destes é vermelho E é fruta ao mesmo tempo?' },
      options: ['car', 'banana', 'strawberry'],
      answer: ['strawberry'],
      hint: { id: 'f5k.r4.hint', text: 'Quase! Com o E, precisa ser as duas coisas: vermelho e fruta.' },
    },
    {
      id: 'or',
      symbol: '∪',
      concept: 'OU',
      kind: 'pick-many',
      display: { type: 'venn', a: 'Animais', b: 'Roxos', highlight: 'union', colors: ANIMAL_PURPLE_COLORS },
      prompt: { id: 'f5k.r5.prompt', text: 'Último desafio, o Portal do OU! Toque em TODOS que são animais OU roxos, e depois em Pronto.' },
      options: ['fish', 'ball', 'octopus', 'grapes'],
      answer: ['fish', 'octopus', 'grapes'],
      hint: { id: 'f5k.r5.hint', text: 'Quase! Com o OU, basta ser animal ou ser roxo. E quem é os dois também vale!' },
    },
  ],

  feedback: {
    success: {
      id: 'f5k.success',
      title: 'O Guardião acordou!',
      text: 'Você acendeu todas as pedras mágicas, e a floresta ganhou as suas cores de volta. Obrigado, amiguinho!',
    },
    visualHint: {
      id: 'f5k.hint.visual',
      text: 'Vou te dar uma ajudinha: olha a resposta brilhando!',
    },
    pickMore: {
      id: 'f5k.hint.pickMore',
      text: 'Toque em pelo menos um antes de apertar Pronto!',
    },
  },

  /** Erros no mesmo desafio até a resposta certa brilhar. */
  visualHintAfter: 2,

  complete: {
    id: 'f5k.complete',
    title: 'Floresta dos Conjuntos restaurada!',
    text: 'Você acordou o Guardião! Agora você sabe o que é um conjunto, o que pertence a um grupo, e conhece o E e o OU. Que aventura incrível!',
  },
};
