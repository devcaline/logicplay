/**
 * Geradores de exercícios de interseção (13 anos ou mais).
 * Cada questão traz dois conjuntos A e B e um universo de números para levar ao diagrama de Venn:
 * só em A, em A e em B (A ∩ B), só em B ou fora dos dois.
 *
 * Uma questão: { id, a, b, universe, regions: { [n]: região }, intersection, hint, question? }
 * Um conjunto: { notation, words, list: number[] | null }
 */

const range = (from, to) => Array.from({ length: to - from + 1 }, (_, index) => from + index);
const pick = (list) => list[Math.floor(Math.random() * list.length)];
const shuffle = (list) => [...list].sort(() => Math.random() - 0.5);
const isPrime = (n) => n > 1 && range(2, Math.floor(Math.sqrt(n))).every((d) => n % d !== 0);
const formatList = (list) => (list.length ? `{${[...list].sort((x, y) => x - y).join(', ')}}` : '{ }');

/** Regiões do diagrama, na ordem em que aparecem. */
export const REGIONS = {
  a: 'só em A',
  both: 'em A e em B',
  b: 'só em B',
  out: 'fora de A e de B',
};

export function regionOf(inA, inB) {
  if (inA && inB) return 'both';
  if (inA) return 'a';
  if (inB) return 'b';
  return 'out';
}

function makeRound(id, { a, b, testA, testB, universe, hint, question = null }) {
  const sorted = [...universe].sort((x, y) => x - y);
  const regions = Object.fromEntries(sorted.map((n) => [n, regionOf(testA(n), testB(n))]));
  const intersection = sorted.filter((n) => regions[n] === 'both');
  return { id, a, b, universe: sorted, regions, intersection, hint, question };
}

// Fácil: A e B listados, sorteados entre 1 e 12, com 2 ou 3 elementos em comum.
function easyRound(index) {
  const pool = shuffle(range(1, 12));
  const common = pool.slice(0, pick([2, 3]));
  const onlyA = pool.slice(3, 3 + pick([2, 3]));
  const onlyB = pool.slice(6, 6 + pick([2, 3]));
  const outside = pool.slice(9, 9 + pick([1, 2]));
  const listA = [...common, ...onlyA].sort((x, y) => x - y);
  const listB = [...common, ...onlyB].sort((x, y) => x - y);
  return makeRound(`easy-${index}-${listA.join('_')}`, {
    a: { notation: `A = ${formatList(listA)}`, words: null, list: listA },
    b: { notation: `B = ${formatList(listB)}`, words: null, list: listB },
    testA: (x) => listA.includes(x),
    testB: (x) => listB.includes(x),
    universe: [...listA, ...onlyB, ...outside],
    hint: 'Um número vai para o meio quando aparece nas duas listas. Se está só em uma lista, vai para o lado dela. Se não está em nenhuma, fica fora dos círculos.',
  });
}

// Médio: A e B por propriedade, com a leitura em palavras; universo de 1 a 12.
const MEDIUM = [
  {
    id: 'medium-even-mult3',
    a: { notation: 'A = {x ∈ U | x é par}', words: 'Os números pares.' },
    b: { notation: 'B = {x ∈ U | x é múltiplo de 3}', words: 'Os múltiplos de 3.' },
    testA: (x) => x % 2 === 0,
    testB: (x) => x % 3 === 0,
    hint: 'Para cada número, faça duas perguntas: ele é par? Ele está na tabuada do 3? Se as duas respostas forem sim, ele vai para o meio.',
  },
  {
    id: 'medium-lt7-gt4',
    a: { notation: 'A = {x ∈ U | x < 7}', words: 'Os números menores que 7.' },
    b: { notation: 'B = {x ∈ U | x > 4}', words: 'Os números maiores que 4.' },
    testA: (x) => x < 7,
    testB: (x) => x > 4,
    hint: 'O meio recebe os números que são menores que 7 e, ao mesmo tempo, maiores que 4. O "<" e o ">" não incluem o número da ponta.',
  },
  {
    id: 'medium-mult4-even',
    a: { notation: 'A = {x ∈ U | x é múltiplo de 4}', words: 'Os múltiplos de 4.' },
    b: { notation: 'B = {x ∈ U | x é par}', words: 'Os números pares.' },
    testA: (x) => x % 4 === 0,
    testB: (x) => x % 2 === 0,
    hint: 'Todo múltiplo de 4 também é par. Pense nisso antes de usar a parte "só em A".',
  },
  {
    id: 'medium-odd-prime',
    a: { notation: 'A = {x ∈ U | x é ímpar}', words: 'Os números ímpares.' },
    b: { notation: 'B = {x ∈ U | x é primo}', words: 'Os números primos.' },
    testA: (x) => x % 2 === 1,
    testB: isPrime,
    hint: 'Primo é o número maior que 1 que só é dividido exatamente por 1 e por ele mesmo. Lembre: o 1 não é primo, e o 2 é primo mas é par.',
  },
  {
    id: 'medium-div12-even',
    a: { notation: 'A = {x ∈ U | x é divisor de 12}', words: 'Os divisores de 12.' },
    b: { notation: 'B = {x ∈ U | x é par}', words: 'Os números pares.' },
    testA: (x) => 12 % x === 0,
    testB: (x) => x % 2 === 0,
    hint: 'Um divisor de 12 divide o 12 sem deixar resto. Depois, confira se o número é par.',
  },
];

// Difícil: só a notação, universo sorteado entre números maiores e uma pergunta final sobre A ∩ B.
const HARD = [
  {
    id: 'hard-mult2-mult3',
    a: { notation: 'A = {x ∈ U | x é múltiplo de 2}' },
    b: { notation: 'B = {x ∈ U | x é múltiplo de 3}' },
    testA: (x) => x % 2 === 0,
    testB: (x) => x % 3 === 0,
    pool: range(1, 30),
    hint: 'Para entrar em A ∩ B, o número precisa estar na tabuada do 2 e também na do 3.',
    question: {
      prompt: 'Que propriedade descreve A ∩ B?',
      options: ['x é múltiplo de 6', 'x é múltiplo de 5', 'x é par ou múltiplo de 3'],
    },
  },
  {
    id: 'hard-prime-odd',
    a: { notation: 'A = {x ∈ U | x é primo}' },
    b: { notation: 'B = {x ∈ U | x é ímpar}' },
    testA: isPrime,
    testB: (x) => x % 2 === 1,
    pool: range(1, 30),
    must: [2, 9],
    hint: 'Um primo é maior que 1 e tem exatamente dois divisores: 1 e ele mesmo. Existe só um primo par.',
    question: {
      prompt: 'Que propriedade descreve A ∩ B?',
      options: ['x é primo e diferente de 2', 'x é ímpar', 'x é primo'],
    },
  },
  {
    id: 'hard-interval',
    a: { notation: 'A = {x ∈ U | x ≤ 15}' },
    b: { notation: 'B = {x ∈ U | x > 9}' },
    testA: (x) => x <= 15,
    testB: (x) => x > 9,
    pool: range(1, 24),
    must: [9, 10, 15],
    hint: 'O "≤" inclui o número da ponta; o ">" não inclui. A ∩ B junta as duas condições numa só faixa de números.',
    question: {
      prompt: 'Que propriedade descreve A ∩ B?',
      options: ['9 < x ≤ 15', '9 ≤ x ≤ 15', 'x ≤ 9 ou x > 15'],
    },
  },
  {
    id: 'hard-mult4-mult6',
    a: { notation: 'A = {x ∈ U | x é múltiplo de 4}' },
    b: { notation: 'B = {x ∈ U | x é múltiplo de 6}' },
    testA: (x) => x % 4 === 0,
    testB: (x) => x % 6 === 0,
    pool: range(1, 40),
    must: [12],
    hint: 'Os números em A ∩ B estão na tabuada do 4 e na do 6. Procure o menor número que está nas duas: os outros são múltiplos dele.',
    question: {
      prompt: 'Que propriedade descreve A ∩ B?',
      options: ['x é múltiplo de 12', 'x é múltiplo de 24', 'x é múltiplo de 2'],
    },
  },
  {
    id: 'hard-div24-div18',
    a: { notation: 'A = {x ∈ U | x é divisor de 24}' },
    b: { notation: 'B = {x ∈ U | x é divisor de 18}' },
    testA: (x) => 24 % x === 0,
    testB: (x) => 18 % x === 0,
    pool: range(1, 24),
    must: [3, 7],
    hint: 'Um divisor divide o número sem deixar resto. A ∩ B são os divisores comuns de 24 e 18.',
    question: {
      prompt: 'Que propriedade descreve A ∩ B?',
      options: ['x é divisor de 6', 'x é divisor de 42', 'x é par'],
    },
  },
];

const CAPS = { a: 6, both: 5, b: 6, out: 5 };

/** Sorteia 12 números do universo com todas as regiões representadas (o meio com pelo menos 2). */
function sampleUniverse(t) {
  // `must`: números que a pergunta final precisa no universo para ter uma só resposta certa.
  const must = t.must ?? [];
  const regionOfN = (n) => regionOf(t.testA(n), t.testB(n));
  const chosen = [...must];
  const counts = { a: 0, both: 0, b: 0, out: 0 };
  must.forEach((n) => { counts[regionOfN(n)] += 1; });
  const minimum = { a: 1, both: 2, b: 1, out: 1 };
  const rest = shuffle(t.pool.filter((n) => !must.includes(n)));
  // Primeiro garante o mínimo de cada região, depois completa até 12 sem passar dos limites.
  for (const pass of ['minimum', 'fill']) {
    for (const n of rest) {
      if (chosen.length >= 12 || chosen.includes(n)) continue;
      const region = regionOfN(n);
      const limit = pass === 'minimum' ? minimum[region] : CAPS[region];
      if (counts[region] < limit) {
        chosen.push(n);
        counts[region] += 1;
      }
    }
  }
  return chosen;
}

function fromTemplate(t, difficulty, index) {
  const universe = difficulty === 'hard' ? sampleUniverse(t) : range(1, 12);
  const question = t.question
    ? { prompt: t.question.prompt, options: shuffle(t.question.options.map((text, i) => ({ text, correct: i === 0 }))) }
    : null;
  return makeRound(`${t.id}-${index}`, {
    a: { ...t.a, list: null },
    b: { ...t.b, list: null },
    testA: t.testA,
    testB: t.testB,
    universe,
    hint: t.hint,
    question,
  });
}

/** Sorteia `count` questões da dificuldade pedida. */
export function generateIntersectionRounds(difficulty, count = 3) {
  if (difficulty === 'easy') return range(1, count).map(easyRound);
  const pool = difficulty === 'hard' ? HARD : MEDIUM;
  return shuffle(pool).slice(0, count).map((t, index) => fromTemplate(t, difficulty, index));
}

/** Aquecimento guiado (igual em todas as dificuldades). */
export function intersectionWarmup() {
  const listA = [1, 2, 3, 4];
  const listB = [3, 4, 5, 6];
  return makeRound('warmup', {
    a: { notation: 'A = {1, 2, 3, 4}', words: null, list: listA },
    b: { notation: 'B = {3, 4, 5, 6}', words: null, list: listB },
    testA: (x) => listA.includes(x),
    testB: (x) => listB.includes(x),
    universe: range(1, 7),
    hint: 'O 3 e o 4 aparecem nas duas listas. O 7 não aparece em nenhuma.',
  });
}

export { formatList };
