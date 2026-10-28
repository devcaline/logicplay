/**
 * Floresta dos Conjuntos · fase 1 · 13 anos ou mais — "Conhecendo os Grupos".
 * Montar o conjunto A a partir da descrição; questões sorteadas em data/teen/setRounds.js.
 */

export default {
  id: 'forest-1-teen',
  type: 'set-builder',
  levelId: 'forest-1',
  ageGroup: '13+',
  scene: 'study',
  quiet: true, // sem narração automática; o Pipo aparece pequeno e só para dicas
  rounds: 3,

  intro: [
    {
      id: 't.f1.intro',
      mood: 'curious',
      illustration: 'notation-example',
      text: 'Um conjunto é uma coleção de elementos. Ele pode ser descrito listando os elementos, como A = {2, 4, 6, 8}, ou por uma propriedade que todos eles têm: A = {x ∈ ℕ | x é par e 0 < x < 10}. O número de elementos é indicado por n(A).',
    },
  ],

  mission: { id: 't.f1.mission', text: 'Monte cada conjunto selecionando os elementos no universo.' },

  // Aquecimento: decifrar a notação peça por peça antes das questões valendo estrelas.
  tutorial: {
    start: { id: 't.f1.tut.start', text: 'Antes de começar, vamos decifrar essa escrita! Toque em cada parte colorida para descobrir o que ela quer dizer.' },
    parts: [
      { id: 'name', label: 'A =', text: 'A é o nome do conjunto. Lemos assim: “o conjunto A é…”.' },
      { id: 'braces', label: '{ }', text: 'As chaves funcionam como uma caixa: dentro delas ficam os elementos do conjunto.' },
      { id: 'element', label: 'x ∈ ℕ', text: 'O x representa cada número. O símbolo ∈ quer dizer “pertence”, e ℕ são os números naturais: 0, 1, 2, 3, 4…' },
      { id: 'such', label: '|', text: 'Essa barrinha se lê “tal que”. Depois dela vem a regra que os números precisam seguir.' },
      { id: 'rule', label: 'x é ímpar e x < 10', text: 'A regra: só entram os números ímpares que também são menores que 10. O < quer dizer “menor que”.' },
    ],
    reading: { id: 't.f1.tut.reading', text: 'Lendo tudo junto: A é o conjunto dos números naturais x, tal que x é ímpar e x é menor que 10.' },
    build: { id: 't.f1.tut.build', text: 'Agora monte esse conjunto! Aqui os erros não contam, é só para treinar.' },
    done: { id: 't.f1.tut.done', text: 'Isso! Agora você já sabe ler essa notação. Vamos às questões valendo estrelas!' },
  },

  // Legenda de consulta, disponível em qualquer dificuldade.
  symbols: [
    ['∈', 'pertence a'],
    ['ℕ', 'números naturais: 0, 1, 2, 3…'],
    ['ℕ*', 'naturais sem o zero: 1, 2, 3…'],
    ['|', 'tal que'],
    ['<', 'menor que'],
    ['≤', 'menor ou igual a'],
    ['n(A)', 'quantidade de elementos de A'],
  ],

  feedback: {
    success: {
      id: 't.f1.success',
      title: 'Fase concluída!',
      text: 'Você passou da descrição de um conjunto para a lista dos seus elementos.',
    },
  },

  complete: {
    id: 't.f1.complete',
    title: 'Notação de conjuntos: concluída!',
    text: 'Descrever um conjunto por propriedade e listar seus elementos são duas formas de representar a mesma coisa.',
  },
};
