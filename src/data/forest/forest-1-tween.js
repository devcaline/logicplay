/**
 * Floresta dos Conjuntos · fase 1 · 9–12 anos — "Conhecendo os Grupos".
 * Montar conjuntos de números a partir da descrição; questões sorteadas em data/tween/setRounds.js.
 */
import { generateTweenSetRounds, tweenTutorialRound, tweenSetRoundCatalog } from '../tween/setRounds.js';

export default {
  id: 'forest-1-tween',
  type: 'set-builder',
  levelId: 'forest-1',
  ageGroup: '9-12',
  scene: 'forest',
  rounds: 3,

  intro: [
    {
      id: 'f1a.intro.1',
      mood: 'happy',
      illustration: 'numbers-example',
      text: 'Aventureiro! Bem-vindo à Trilha dos Números! Os conjuntos da floresta também são feitos de números que têm algo em comum. Podemos escrever um conjunto listando os elementos, como o A formado por dois, quatro, seis e oito.',
    },
    {
      id: 'f1a.intro.2',
      mood: 'curious',
      illustration: 'numbers-example',
      text: 'E dá para escrever por uma regra, como um mapa do tesouro: o conjunto A é formado pelos números x, tal que x é par e x menor que dez. Cada conjunto que você montar guarda um cristal da floresta. Vamos começar a coleção?',
    },
  ],

  mission: {
    id: 'f1a.mission',
    text: 'Missão do explorador: toque em todos os números do universo que seguem a regra e monte o conjunto!',
    short: 'Montar conjuntos',
  },

  // Aquecimento: decifrar a notação peça por peça antes das questões valendo estrelas.
  tutorial: {
    start: { id: 'f1a.tut.start', text: 'Achamos um pergaminho misterioso com a escrita dos conjuntos! Toque em cada parte colorida para decifrar o que ela quer dizer.' },
    parts: [
      { id: 'name', lineId: 'f1a.tut.name', label: 'A =', text: 'A é o nome do conjunto. Lemos assim: "o conjunto A é…".' },
      { id: 'braces', lineId: 'f1a.tut.braces', label: '{ }', text: 'As chaves funcionam como uma caixa: dentro delas ficam os elementos do conjunto.' },
      { id: 'element', lineId: 'f1a.tut.element', label: 'x', text: 'O x representa cada número que queremos testar, um por um.' },
      { id: 'such', lineId: 'f1a.tut.such', label: '|', text: 'A barrinha se lê "tal que". Depois dela vem a regra que os números precisam seguir.' },
      { id: 'rule', lineId: 'f1a.tut.rule', label: 'x é par e x < 10', text: 'A regra do nosso conjunto: só entram os números pares que também são menores que 10. O menor que não inclui o 10.' },
    ],
    reading: { id: 'f1a.tut.reading', text: 'Lendo tudo junto: o conjunto A é formado pelos números pares menores que 10.' },
    build: { id: 'f1a.tut.build', text: 'Agora monte esse conjunto! Aqui os erros não contam, é só para treinar.' },
    done: { id: 'f1a.tut.done', text: 'Você decifrou o pergaminho! Agora sim: missões valendo estrelas e cristais!' },
  },

  // Legenda de consulta, disponível em qualquer dificuldade.
  symbols: [
    ['{ }', 'as chaves guardam os elementos'],
    ['|', 'tal que'],
    ['<', 'menor que'],
    ['≤', 'menor ou igual a'],
    ['>', 'maior que'],
    ['n(A)', 'quantos elementos A tem'],
  ],

  roundsGenerator: generateTweenSetRounds,
  warmupGenerator: tweenTutorialRound,
  roundsCatalog: tweenSetRoundCatalog,

  feedback: {
    success: {
      id: 'f1a.success',
      title: 'Muito bem! Fase concluída!',
      text: 'Você montou conjuntos de números de verdade! O Pipo vai guardar esses cristais na coleção com todo o carinho.',
    },
    // Elogios do Pipo a cada conjunto montado: um é sorteado a cada acerto.
    praise: [
      { id: 'f1a.praise.1', text: 'Isso! Mais um cristal brilhante para a nossa coleção!' },
      { id: 'f1a.praise.2', text: 'Muito bem! Você é um verdadeiro explorador de conjuntos!' },
      { id: 'f1a.praise.3', text: 'Que demais! A floresta fica mais colorida com esse conjunto!' },
    ],
  },

  complete: {
    id: 'f1a.complete',
    title: 'Primeira missão concluída!',
    text: 'Um conjunto é um grupo de elementos. Você pode escrevê-lo listando os elementos ou descrevendo a propriedade que todos têm em comum.',
  },
};
