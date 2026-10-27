/**
 * Geradores de exercícios de notação de conjuntos (13 anos ou mais).
 * Cada partida sorteia questões diferentes; a dificuldade muda o tamanho do universo,
 * a forma de descrever o conjunto e a ajuda disponível.
 *
 * Uma questão: { id, universe: number[], notation, words, elements: number[], hint }
 */

const range = (from, to) => Array.from({ length: to - from + 1 }, (_, index) => from + index);
const pick = (list) => list[Math.floor(Math.random() * list.length)];
const shuffle = (list) => [...list].sort(() => Math.random() - 0.5);
const isPrime = (n) => n > 1 && range(2, Math.floor(Math.sqrt(n))).every((d) => n % d !== 0);

function build(id, { from = 1, to, notation, words, test, hint = null }) {
  const universe = range(from, to);
  return { id, universe, notation, words, hint, elements: universe.filter(test) };
}

// Fácil: universo pequeno e descrição em palavras (a notação aparece como apoio).
const EASY = [
  () => build('easy-even', {
    to: 10,
    words: 'Os números pares de 1 a 10.',
    notation: 'A = {x | x é par, 1 ≤ x ≤ 10}',
    test: (x) => x % 2 === 0,
    hint: 'Números pares terminam em 0, 2, 4, 6 ou 8.',
  }),
  () => build('easy-odd', {
    to: 10,
    words: 'Os números ímpares de 1 a 10.',
    notation: 'A = {x | x é ímpar, 1 ≤ x ≤ 10}',
    test: (x) => x % 2 === 1,
    hint: 'Números ímpares terminam em 1, 3, 5, 7 ou 9.',
  }),
  () => {
    const n = pick([4, 5, 6, 7]);
    return build(`easy-gt-${n}`, {
      to: 10,
      words: `Os números maiores que ${n}, de 1 a 10.`,
      notation: `A = {x | x > ${n}, 1 ≤ x ≤ 10}`,
      test: (x) => x > n,
      hint: `"Maior que ${n}" não inclui o ${n}: comece no ${n + 1}.`,
    });
  },
  () => {
    const n = pick([5, 6, 7]);
    return build(`easy-lt-${n}`, {
      to: 10,
      words: `Os números menores que ${n}, de 1 a 10.`,
      notation: `A = {x | x < ${n}, 1 ≤ x ≤ 10}`,
      test: (x) => x < n,
      hint: `"Menor que ${n}" não inclui o ${n}: vá até o ${n - 1}.`,
    });
  },
  () => build('easy-mult3', {
    to: 12,
    words: 'Os múltiplos de 3 de 1 a 12.',
    notation: 'A = {x | x é múltiplo de 3, 1 ≤ x ≤ 12}',
    test: (x) => x % 3 === 0,
    hint: 'Comece no 3 e vá somando 3.',
  }),
];

// Médio: universo de 1 a 20, descrição por propriedade em notação.
const MEDIUM = [
  () => {
    const k = pick([3, 4, 5]);
    return build(`medium-mult-${k}`, {
      to: 20,
      words: `Múltiplos de ${k} entre 1 e 20.`,
      notation: `A = {x ∈ ℕ | x é múltiplo de ${k}, 1 ≤ x ≤ 20}`,
      test: (x) => x % k === 0,
      hint: `Múltiplos de ${k}: ${k}, ${2 * k}, ${3 * k}... (some ${k} a cada passo).`,
    });
  },
  () => {
    const a = pick([5, 6, 7, 8, 9]);
    const b = a + pick([4, 5, 6, 7]);
    return build(`medium-interval-${a}-${b}`, {
      to: 20,
      words: `Números maiores que ${a} e menores ou iguais a ${b}.`,
      notation: `A = {x ∈ ℕ | ${a} < x ≤ ${b}}`,
      test: (x) => x > a && x <= b,
      hint: '"<" não inclui o número da ponta; "≤" inclui.',
    });
  },
  () => {
    const n = pick([12, 18, 20]);
    return build(`medium-div-${n}`, {
      to: 20,
      words: `Divisores de ${n}.`,
      notation: `A = {x ∈ ℕ | x é divisor de ${n}}`,
      test: (x) => n % x === 0,
      hint: `Um divisor de ${n} divide ${n} sem sobrar resto. Não esqueça do 1 e do próprio ${n}.`,
    });
  },
  () => {
    const n = pick([11, 13, 15, 17]);
    return build(`medium-odd-${n}`, {
      to: 20,
      words: `Números ímpares menores que ${n}.`,
      notation: `A = {x ∈ ℕ | x é ímpar e x < ${n}}`,
      test: (x) => x % 2 === 1 && x < n,
      hint: `São os ímpares de 1 até ${n - 2} (o ${n} não entra, porque é "<").`,
    });
  },
];

// Difícil: universo de 1 a 50, propriedades combinadas e só notação. A dica explica a notação, sem dar elementos.
const HARD = [
  () => {
    const [a, b] = pick([[3, 4], [2, 9], [4, 6]]);
    return build(`hard-mult-${a}-${b}`, {
      to: 50,
      notation: `A = {x ∈ ℕ* | x é múltiplo de ${a} e de ${b}, x ≤ 50}`,
      test: (x) => x % a === 0 && x % b === 0,
      hint: `Leia: os naturais sem o zero (ℕ*) que são múltiplos de ${a} e também de ${b}, até 50. O "e" exige as duas coisas ao mesmo tempo: o número precisa estar na tabuada do ${a} e na do ${b}.`,
    });
  },
  () => {
    const [a, b] = pick([[20, 40], [30, 50], [10, 30]]);
    return build(`hard-prime-${a}-${b}`, {
      to: 50,
      notation: `A = {x ∈ ℕ | x é primo e ${a} < x < ${b}}`,
      test: (x) => isPrime(x) && x > a && x < b,
      hint: `Um número primo é maior que 1 e só pode ser dividido exatamente por 1 e por ele mesmo. A condição ${a} < x < ${b} usa "<" dos dois lados: o ${a} e o ${b} não entram, só os números entre eles.`,
    });
  },
  () => build('hard-squares', {
    to: 50,
    notation: 'A = {x ∈ ℕ* | x = n², n ∈ ℕ*, x ≤ 50}',
    test: (x) => Number.isInteger(Math.sqrt(x)),
    hint: 'x = n² quer dizer que x é um número natural n multiplicado por ele mesmo (n · n). Como n ∈ ℕ*, o n começa em 1. São os chamados quadrados perfeitos, até 50.',
  }),
  () => {
    const n = pick([36, 48]);
    return build(`hard-div-${n}`, {
      to: 50,
      notation: `A = {x ∈ ℕ* | x é divisor de ${n}}`,
      test: (x) => n % x === 0,
      hint: `Um divisor de ${n} é um número que divide ${n} sem deixar resto. Uma forma de achar: procure os pares de números que, multiplicados, dão ${n}.`,
    });
  },
  () => build('hard-even-mult5', {
    to: 50,
    notation: 'A = {x ∈ ℕ* | x é par e múltiplo de 5, x ≤ 50}',
    test: (x) => x % 2 === 0 && x % 5 === 0,
    hint: 'O "e" exige as duas condições juntas: o número precisa ser par e também estar na tabuada do 5, até 50.',
  }),
];

const POOLS = { easy: EASY, medium: MEDIUM, hard: HARD };

/** Sorteia `count` questões diferentes da dificuldade pedida. */
export function generateSetRounds(difficulty, count = 3) {
  const pool = POOLS[difficulty] ?? EASY;
  return shuffle(pool).slice(0, count).map((make) => make());
}

/** Escreve um conjunto em notação de lista: {2, 4, 6}. */
export function formatSet(elements) {
  return elements.length ? `{${[...elements].sort((x, y) => x - y).join(', ')}}` : '{ }';
}

/** Questão do aquecimento guiado (igual em todas as dificuldades). */
export function tutorialRound() {
  return build('tutorial-odd', {
    from: 0,
    to: 10,
    words: 'Os números naturais ímpares menores que 10.',
    notation: 'A = {x ∈ ℕ | x é ímpar e x < 10}',
    test: (x) => x % 2 === 1 && x < 10,
    hint: 'Ímpares terminam em 1, 3, 5, 7 ou 9. O 0 é natural, mas é par, então não entra.',
  });
}
