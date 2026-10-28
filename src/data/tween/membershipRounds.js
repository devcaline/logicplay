/**
 * Geradores de exercícios de pertinência (9 a 12 anos): ∈ e ∉.
 * Cada questão é um conjunto com algumas afirmações para completar com o símbolo certo.
 *
 * Uma questão: { id, name, notation, words, list: number[] | null, items, setHint }
 * Um item: { id, kind: 'element', left, belongs, reason, hint, talk? }
 *
 * Diferente da faixa 13+ (data/teen/membershipRounds.js), aqui não há ⊂/⊄ e a
 * notação vem sem ℕ/ℕ*: os conjuntos vivem nos números que a criança já conhece.
 */

const range = (from, to) => Array.from({ length: to - from + 1 }, (_, index) => from + index);
const pick = (list) => list[Math.floor(Math.random() * list.length)];
const shuffle = (list) => [...list].sort(() => Math.random() - 0.5);
const isPrime = (n) => n > 1 && range(2, Math.floor(Math.sqrt(n))).every((d) => n % d !== 0);
const smallestDivisor = (n) => range(2, n).find((d) => n % d === 0);
const fmt = (n) => (n < 0 ? `−${-n}` : String(n));
const formatList = (list) => `{${list.map(fmt).join(', ')}}`;

/**
 * Um modelo de conjunto: como ele é escrito, quem pertence (`test`), de onde vêm os números
 * das afirmações (`candidates`, com os casos de borda em `tricky`) e como explicar cada um.
 */
function template({ id, notation, words, list = null, test, candidates, tricky = [], reason, ask, setHint }) {
  return { id, notation, words, list, test, candidates, tricky, reason, ask, setHint };
}

// Fácil: o conjunto aparece listado, além da descrição em palavras.
function listed(id, words, elements, candidates, property) {
  const notation = `A = ${formatList(elements)}`;
  return template({
    id,
    notation,
    words,
    list: elements,
    test: (x) => elements.includes(x),
    candidates,
    reason: (x, inSet) => (inSet
      ? `${fmt(x)} aparece dentro das chaves de A${property ? ` (${property(x)})` : ''}.`
      : `${fmt(x)} não aparece dentro das chaves de A${property ? ` (${property(x)})` : ''}.`),
    ask: (x) => `Procure o ${fmt(x)} dentro das chaves de A.`,
    setHint: 'Se o número aparece na lista de A, ele pertence (∈). Se não aparece, não pertence (∉).',
  });
}

const parity = (x) => (x % 2 === 0 ? `${x} é par` : `${x} é ímpar`);

const EASY = [
  () => listed('easy-even', 'Os números pares de 2 a 10.', [2, 4, 6, 8, 10], range(1, 12), parity),
  () => listed('easy-odd', 'Os números ímpares de 1 a 9.', [1, 3, 5, 7, 9], range(1, 11), parity),
  () => listed('easy-mult5', 'Os múltiplos de 5 de 5 a 30.', [5, 10, 15, 20, 25, 30], range(1, 35)),
  () => listed('easy-lt6', 'Os números naturais menores que 6.', range(0, 5), range(0, 9)),
  () => listed('easy-div12', 'Os divisores de 12.', [1, 2, 3, 4, 6, 12], range(1, 13)),
];

// Médio: só a propriedade, com a leitura em palavras.
const MEDIUM = [
  () => {
    const k = pick([3, 4, 5, 6]);
    return template({
      id: `medium-mult-${k}`,
      notation: `A = {x | x é múltiplo de ${k}}`,
      words: `Os números que são múltiplos de ${k}.`,
      test: (x) => x % k === 0,
      candidates: range(1, 10 * k),
      tricky: [k * 5 + 1, k * 7 - 1, k * 8, k + 1],
      reason: (x, inSet) => (inSet ? `${x} = ${k} · ${x / k}, então é múltiplo de ${k}.` : `${x} ÷ ${k} deixa resto ${x % k}, então não é múltiplo de ${k}.`),
      ask: (x) => `Pergunte-se: ${x} está na tabuada do ${k}?`,
      setHint: `Múltiplos de ${k} são os resultados da tabuada do ${k}: divididos por ${k}, não deixam resto.`,
    });
  },
  () => {
    const a = pick([5, 6, 7, 8]);
    const b = a + pick([4, 5, 6]);
    return template({
      id: `medium-interval-${a}-${b}`,
      notation: `A = {x | ${a} < x ≤ ${b}}`,
      words: `Os números maiores que ${a} e menores ou iguais a ${b}.`,
      test: (x) => x > a && x <= b,
      candidates: range(1, b + 5),
      tricky: [a, a + 1, b, b + 1],
      reason: (x, inSet) => {
        if (inSet) return `${x} é maior que ${a} e não passa de ${b}.`;
        if (x === a) return `${a} não é maior que ${a}: o "<" não inclui a ponta.`;
        if (x < a) return `${x} não é maior que ${a}.`;
        return `${x} é maior que ${b}, então passou da ponta.`;
      },
      ask: (x) => `Compare o ${x} com as duas pontas: ${a} e ${b}.`,
      setHint: 'O "<" não inclui o número da ponta; o "≤" inclui.',
    });
  },
  () => {
    const n = pick([12, 15, 16, 18]);
    return template({
      id: `medium-div-${n}`,
      notation: `A = {x | x é divisor de ${n}}`,
      words: `Os divisores de ${n}.`,
      test: (x) => n % x === 0,
      candidates: range(1, n + 4),
      tricky: [1, n, 5, 7],
      reason: (x, inSet) => (inSet ? `${n} ÷ ${x} = ${n / x}, sem resto.` : `${n} ÷ ${x} deixa resto ${n % x}.`),
      ask: (x) => `Pergunte-se: ${n} dividido por ${x} dá exato, sem sobrar resto?`,
      setHint: `Um divisor de ${n} divide ${n} sem deixar resto. O 1 e o próprio ${n} sempre entram.`,
    });
  },
  () => template({
    id: 'medium-even-lt15',
    notation: 'A = {x | x é par e x < 15}',
    words: 'Os números pares menores que 15.',
    test: (x) => x % 2 === 0 && x < 15,
    candidates: range(1, 20),
    tricky: [14, 15, 16, 2],
    reason: (x, inSet) => {
      if (inSet) return `${x} é par e menor que 15.`;
      if (x >= 15) return `${x} não é menor que 15.`;
      return `${x} é ímpar.`;
    },
    ask: (x) => `Duas perguntas: ${x} é par? E é menor que 15?`,
    setHint: 'A regra pede as duas coisas ao mesmo tempo: ser par e ser menor que 15.',
  }),
];

// Difícil: só a notação, propriedades combinadas (o "e" conecta as condições).
const HARD = [
  () => template({
    id: 'hard-prime-20',
    notation: 'A = {x | x é primo e x < 20}',
    words: 'Os números primos menores que 20.',
    test: (x) => isPrime(x) && x < 20,
    candidates: range(0, 24),
    tricky: [1, 2, 9, 15, 21],
    reason: (x, inSet) => {
      if (inSet) return `${x} só é dividido exatamente por 1 e por ele mesmo, e é menor que 20.`;
      if (x <= 1) return `${x} não é primo: um primo precisa ser maior que 1 e ter exatamente dois divisores.`;
      if (!isPrime(x)) return `${x} = ${smallestDivisor(x)} · ${x / smallestDivisor(x)}, então tem mais divisores além do 1 e dele mesmo.`;
      return `${x} é primo, mas não é menor que 20.`;
    },
    ask: (x) => `Duas perguntas: ${x} tem exatamente dois divisores (1 e ele mesmo)? E é menor que 20?`,
    setHint: 'Um primo é maior que 1 e só tem dois divisores: 1 e ele mesmo.',
  }),
  () => template({
    id: 'hard-even-mult3',
    notation: 'A = {x | x é par e múltiplo de 3}',
    words: 'Os números que são pares e também múltiplos de 3.',
    test: (x) => x % 2 === 0 && x % 3 === 0,
    candidates: range(1, 40),
    tricky: [3, 6, 9, 12, 20],
    reason: (x, inSet) => {
      if (inSet) return `${x} é par e múltiplo de 3: está na tabuada do 2 e na do 3.`;
      if (x % 2 === 0) return `${x} é par, mas não é múltiplo de 3.`;
      if (x % 3 === 0) return `${x} é múltiplo de 3, mas é ímpar.`;
      return `${x} não é par e não é múltiplo de 3.`;
    },
    ask: (x) => `Duas perguntas: ${x} é par? E está na tabuada do 3?`,
    setHint: 'O "e" exige as duas coisas ao mesmo tempo: ser par e ser múltiplo de 3.',
  }),
  () => template({
    id: 'hard-odd-10-20',
    notation: 'A = {x | x é ímpar e 10 < x < 20}',
    words: 'Os números ímpares maiores que 10 e menores que 20.',
    test: (x) => x % 2 === 1 && x > 10 && x < 20,
    candidates: range(5, 25),
    tricky: [10, 20, 11, 19],
    reason: (x, inSet) => {
      if (inSet) return `${x} é ímpar e está entre 10 e 20, sem incluir as pontas.`;
      if (x === 10 || x === 20) return `${x} é uma das pontas, e o "<" não inclui as pontas.`;
      if (x % 2 === 0) return `${x} é par.`;
      return `${x} é ímpar, mas não está entre 10 e 20.`;
    },
    ask: (x) => `Duas perguntas: ${x} é ímpar? E está entre 10 e 20, sem contar as pontas?`,
    setHint: 'O "e" exige as duas coisas; o "<" não inclui as pontas.',
  }),
  () => template({
    id: 'hard-div-24-even',
    notation: 'A = {x | x é divisor de 24 e x é par}',
    words: 'Os divisores pares de 24.',
    test: (x) => 24 % x === 0 && x % 2 === 0,
    candidates: range(1, 30),
    tricky: [1, 3, 12, 24, 30],
    reason: (x, inSet) => {
      if (inSet) return `${x} divide 24 sem resto e é par.`;
      if (x % 2 === 0) return `${x} é par, mas não divide 24.`;
      if (24 % x === 0) return `${x} divide 24, mas é ímpar.`;
      return `${x} não divide 24 e é ímpar.`;
    },
    ask: (x) => `Duas perguntas: ${x} divide 24 sem resto? E é par?`,
    setHint: 'O "e" exige as duas coisas: dividir 24 e ser par.',
  }),
];

const POOLS = { easy: EASY, medium: MEDIUM, hard: HARD };
const ELEMENT_ITEMS = { easy: 3, medium: 4, hard: 4 };

function elementItem(t, x, roundId) {
  const belongs = t.test(x);
  return { id: `${roundId}-${x}`, kind: 'element', left: fmt(x), belongs, reason: t.reason(x, belongs), hint: t.ask(x) };
}

/** Escolhe os números das afirmações: pelo menos um dentro, um fora e um caso de borda. */
function pickNumbers(t, count) {
  const inside = shuffle(t.candidates.filter((x) => t.test(x)));
  const outside = shuffle(t.candidates.filter((x) => !t.test(x)));
  const tricky = shuffle(t.tricky.filter((x) => t.candidates.includes(x)));
  const chosen = [];
  const add = (x) => x !== undefined && !chosen.includes(x) && chosen.length < count && chosen.push(x);
  add(tricky[0]);
  add(inside.find((x) => !chosen.includes(x)));
  add(outside.find((x) => !chosen.includes(x)));
  shuffle([...tricky.slice(1), ...inside, ...outside]).forEach(add);
  return shuffle(chosen);
}

function buildRound(t, difficulty, index) {
  const roundId = `${t.id}-${index}`;
  const numbers = pickNumbers(t, ELEMENT_ITEMS[difficulty]);
  return {
    id: roundId,
    name: 'A',
    notation: t.notation,
    words: t.words,
    list: t.list,
    setHint: t.setHint,
    items: numbers.map((x) => elementItem(t, x, roundId)),
  };
}

/** Sorteia `count` conjuntos diferentes da dificuldade pedida. */
export function generateTweenMembershipRounds(difficulty, count = 3) {
  const pool = POOLS[difficulty] ?? EASY;
  return shuffle(pool).slice(0, count).map((make, index) => buildRound(make(), difficulty, index));
}

/** Aquecimento guiado (a caixinha A aparece listada; o Pipo apresenta ∈ e ∉). */
export function tweenMembershipWarmup() {
  return {
    id: 'f2a-warmup',
    name: 'A',
    notation: 'A = {2, 4, 6, 8}',
    words: 'Os números pares de 2 a 8.',
    list: [2, 4, 6, 8],
    setHint: 'Se o número aparece dentro das chaves, ele pertence (∈). Se não aparece, não pertence (∉).',
    items: [
      {
        id: 'f2a.warm.4',
        kind: 'element',
        left: '4',
        belongs: true,
        talk: 'Este símbolo novo quer dizer "pertence". Pense em A como uma caixa com números dentro. O 4 está dentro da caixa?',
        reason: 'O 4 está dentro das chaves de A: ele pertence a A. Lemos assim: "4 pertence a A".',
        hint: 'Procure o 4 dentro das chaves de A.',
      },
      {
        id: 'f2a.warm.5',
        kind: 'element',
        left: '5',
        belongs: false,
        talk: 'Agora, quando cortamos esse símbolo com uma barrinha, ele vira o "não pertence". E o 5, será que está na caixa?',
        reason: 'O 5 não aparece dentro das chaves de A: ele não pertence a A. Lemos assim: "5 não pertence a A".',
        hint: 'Procure o 5 dentro das chaves de A.',
      },
    ],
  };
}
