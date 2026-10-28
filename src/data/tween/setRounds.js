/**
 * Geradores de exercícios de conjuntos (9 a 12 anos).
 * Cada partida sorteia questões diferentes; a dificuldade muda o tamanho do universo,
 * a forma de descrever o conjunto e a ajuda disponível.
 *
 * Uma questão: { id, universe: number[], notation, words, hint, elements: number[] }
 *
 * Diferente da faixa 13+ (data/teen/setRounds.js), aqui a notação é apresentada sem
 * ℕ e ℕ*: o universo é sempre um intervalo de números que a criança conhece.
 */

const range = (from, to) => Array.from({ length: to - from + 1 }, (_, index) => from + index);
const pick = (list) => list[Math.floor(Math.random() * list.length)];
const shuffle = (list) => [...list].sort(() => Math.random() - 0.5);
const isPrime = (n) => n > 1 && range(2, Math.floor(Math.sqrt(n))).every((d) => n % d !== 0);

function build(id, { from = 1, to, notation, words, test, hint = null, hintId = `f1a.hint.${id}` }) {
  const universe = range(from, to);
  return { id, universe, notation, words, hint, hintId, elements: universe.filter(test) };
}

// Fácil: universo até 10, descrição em palavras (a notação aparece como apoio).
const EASY = [
  () => build('easy-even', {
    to: 10,
    words: 'Os números pares de 1 a 10.',
    notation: 'A = {x | x é par e x ≤ 10}',
    test: (x) => x % 2 === 0,
    hint: 'Os pares terminam em 0, 2, 4, 6 ou 8.',
  }),
  () => build('easy-odd', {
    to: 10,
    words: 'Os números ímpares de 1 a 10.',
    notation: 'A = {x | x é ímpar e x ≤ 10}',
    test: (x) => x % 2 === 1,
    hint: 'Os ímpares terminam em 1, 3, 5, 7 ou 9.',
  }),
  (n = pick([4, 5, 6, 7])) => {
    return build(`easy-gt-${n}`, {
      to: 10,
      words: `Os números maiores que ${n}, de 1 a 10.`,
      notation: `A = {x | x > ${n} e x ≤ 10}`,
      test: (x) => x > n,
      hint: `"Maior que ${n}" não inclui o ${n}: comece no ${n + 1}.`,
    });
  },
  (n = pick([5, 6, 7, 8])) => {
    return build(`easy-lt-${n}`, {
      to: 10,
      words: `Os números menores que ${n}.`,
      notation: `A = {x | x < ${n}}`,
      test: (x) => x < n,
      hint: `"Menor que ${n}" não inclui o ${n}: pare no ${n - 1}.`,
    });
  },
  () => build('easy-mult5', {
    to: 20,
    words: 'Os múltiplos de 5, de 1 a 20.',
    notation: 'A = {x | x é múltiplo de 5 e x ≤ 20}',
    test: (x) => x % 5 === 0,
    hint: 'Os múltiplos de 5 terminam em 0 ou 5: 5, 10, 15, 20.',
  }),
];

// Médio: universo até 20, descrição por propriedade (a leitura em palavras acompanha).
const MEDIUM = [
  (k = pick([3, 4, 5])) => {
    return build(`medium-mult-${k}`, {
      to: 20,
      words: `Os múltiplos de ${k}, de 1 a 20.`,
      notation: `A = {x | x é múltiplo de ${k} e x ≤ 20}`,
      test: (x) => x % k === 0,
      hint: `Some ${k} a cada passo: ${k}, ${2 * k}, ${3 * k}…`,
    });
  },
  (a = pick([4, 5, 6, 7]), b = a + pick([4, 5, 6])) => {
    return build(`medium-interval-${a}-${b}`, {
      to: 20,
      words: `Os números maiores que ${a} e menores ou iguais a ${b}.`,
      notation: `A = {x | ${a} < x ≤ ${b}}`,
      test: (x) => x > a && x <= b,
      hint: 'O "<" não inclui o número da ponta; o "≤" inclui.',
      hintId: 'f1a.hint.medium-interval',
    });
  },
  (n = pick([12, 15, 16, 18])) => {
    return build(`medium-div-${n}`, {
      to: 20,
      words: `Os divisores de ${n}.`,
      notation: `A = {x | x é divisor de ${n}}`,
      test: (x) => n % x === 0,
      hint: `Um divisor divide ${n} sem sobrar resto. Não esqueça o 1 e o próprio ${n}.`,
    });
  },
  (n = pick([11, 13, 15, 17, 19])) => {
    return build(`medium-odd-${n}`, {
      to: 20,
      words: `Os números ímpares menores que ${n}.`,
      notation: `A = {x | x é ímpar e x < ${n}}`,
      test: (x) => x % 2 === 1 && x < n,
      hint: `São os ímpares de 1 até ${n - 2} (o ${n} não entra, por causa do "<").`,
    });
  },
];

// Difícil: universo até 30, propriedades combinadas e só a notação. A dica explica a regra, sem dar elementos.
const HARD = [
  () => build('hard-mult-2-and-3', {
    to: 30,
    notation: 'A = {x | x é múltiplo de 2 e de 3, x ≤ 30}',
    test: (x) => x % 2 === 0 && x % 3 === 0,
    hint: 'O "e" pede as duas coisas ao mesmo tempo: o número precisa estar na tabuada do 2 e também na do 3.',
  }),
  () => build('hard-primes', {
    to: 20,
    notation: 'A = {x | x é primo e x < 20}',
    test: (x) => isPrime(x),
    hint: 'Um número primo é maior que 1 e só tem dois divisores: 1 e ele mesmo. O 1 não é primo!',
  }),
  () => build('hard-squares', {
    to: 25,
    notation: 'A = {x | x é um quadrado perfeito, x ≤ 25}',
    test: (x) => Number.isInteger(Math.sqrt(x)),
    hint: 'Quadrados perfeitos vêm de um número multiplicado por ele mesmo: 1·1, 2·2, 3·3, 4·4, 5·5.',
  }),
  () => build('hard-div-24', {
    to: 24,
    notation: 'A = {x | x é divisor de 24}',
    test: (x) => 24 % x === 0,
    hint: 'Procure os pares que multiplicados dão 24: 1·24, 2·12, 3·8, 4·6.',
  }),
  () => build('hard-odd-mult5', {
    to: 30,
    notation: 'A = {x | x é ímpar e múltiplo de 5, x ≤ 30}',
    test: (x) => x % 2 === 1 && x % 5 === 0,
    hint: 'O "e" pede os dois: ser ímpar e estar na tabuada do 5 ao mesmo tempo.',
  }),
];

const POOLS = { easy: EASY, medium: MEDIUM, hard: HARD };

/** Todas as variantes, sem sorteio: catálogo para produzir e conferir a narração. */
export function tweenSetRoundCatalog() {
  return [
    EASY[0](), EASY[1](),
    ...[4, 5, 6, 7].map((n) => EASY[2](n)),
    ...[5, 6, 7, 8].map((n) => EASY[3](n)), EASY[4](),
    ...[3, 4, 5].map((k) => MEDIUM[0](k)),
    ...[4, 5, 6, 7].flatMap((a) => [4, 5, 6].map((offset) => MEDIUM[1](a, a + offset))),
    ...[12, 15, 16, 18].map((n) => MEDIUM[2](n)),
    ...[11, 13, 15, 17, 19].map((n) => MEDIUM[3](n)),
    ...HARD.map((make) => make()), tweenTutorialRound(),
  ];
}

/** Sorteia `count` questões diferentes da dificuldade pedida. */
export function generateTweenSetRounds(difficulty, count = 3) {
  const pool = POOLS[difficulty] ?? EASY;
  return shuffle(pool).slice(0, count).map((make) => make());
}

/** Questão do aquecimento guiado (igual em todas as dificuldades, sem valer estrelas). */
export function tweenTutorialRound() {
  return build('tween-tutorial-even', {
    to: 10,
    words: 'Os números pares menores que 10.',
    notation: 'A = {x | x é par e x < 10}',
    test: (x) => x % 2 === 0 && x < 10,
    hint: 'Os pares terminam em 0, 2, 4, 6 ou 8. Pare antes do 10.',
  });
}
