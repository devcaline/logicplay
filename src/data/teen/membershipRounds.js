/**
 * Geradores de exercícios de pertinência (13 anos ou mais): ∈ / ∉ e, no difícil, ⊂ / ⊄.
 * Cada questão é um conjunto com algumas afirmações para completar com o símbolo certo.
 *
 * Uma questão: { id, name, notation, words, list: number[] | null, items, setHint }
 * Um item: { id, kind: 'element' | 'subset', left, belongs, reason, hint, talk? }
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
  () => listed('easy-odd', 'Os números ímpares de 1 a 9.', [1, 3, 5, 7, 9], range(0, 11), parity),
  () => listed('easy-mult5', 'Os múltiplos de 5 de 5 a 30.', [5, 10, 15, 20, 25, 30], range(1, 35)),
  () => listed('easy-lt6', 'Os números naturais menores que 6.', range(0, 5), range(0, 9)),
  () => listed('easy-div12', 'Os divisores de 12.', [1, 2, 3, 4, 6, 12], range(1, 13)),
];

// Médio: só a notação por propriedade, com a leitura em palavras.
const MEDIUM = [
  () => {
    const k = pick([3, 4, 6, 7]);
    return template({
      id: `medium-mult-${k}`,
      notation: `A = {x ∈ ℕ | x é múltiplo de ${k}}`,
      words: `Os números naturais que são múltiplos de ${k}.`,
      test: (x) => x % k === 0,
      candidates: range(1, 10 * k),
      tricky: [k * 5 + 1, k * 7 - 1, k * 8, k + 2],
      reason: (x, inSet) => (inSet ? `${x} = ${k} · ${x / k}, então é múltiplo de ${k}.` : `${x} ÷ ${k} deixa resto ${x % k}, então não é múltiplo de ${k}.`),
      ask: (x) => `Pergunte-se: ${x} está na tabuada do ${k}? Tente dividir ${x} por ${k}.`,
      setHint: `Múltiplos de ${k} são os resultados da tabuada do ${k}: divididos por ${k}, não deixam resto.`,
    });
  },
  () => {
    const a = pick([4, 5, 6, 7, 8]);
    const b = a + pick([5, 6, 7, 8]);
    return template({
      id: `medium-interval-${a}-${b}`,
      notation: `A = {x ∈ ℕ | ${a} < x ≤ ${b}}`,
      words: `Os números naturais maiores que ${a} e menores ou iguais a ${b}.`,
      test: (x) => x > a && x <= b,
      candidates: range(0, b + 6),
      tricky: [a, a + 1, b, b + 1],
      reason: (x, inSet) => {
        if (inSet) return `${x} é maior que ${a} e menor ou igual a ${b}.`;
        if (x === a) return `${a} não é maior que ${a}: o "<" não inclui a ponta.`;
        if (x < a) return `${x} não é maior que ${a}.`;
        return `${x} é maior que ${b}, então passou da ponta.`;
      },
      ask: (x) => `Compare o ${x} com as duas pontas: ${a} e ${b}.`,
      setHint: 'O "<" não inclui o número da ponta; o "≤" inclui.',
    });
  },
  () => {
    const n = pick([12, 18, 20, 24, 30]);
    return template({
      id: `medium-div-${n}`,
      notation: `A = {x ∈ ℕ* | x é divisor de ${n}}`,
      words: `Os divisores de ${n}.`,
      test: (x) => n % x === 0,
      candidates: range(1, n + 4),
      tricky: [1, n, n / 2 + 1, 7],
      reason: (x, inSet) => (inSet ? `${n} ÷ ${x} = ${n / x}, sem resto.` : `${n} ÷ ${x} deixa resto ${n % x}.`),
      ask: (x) => `Pergunte-se: ${n} dividido por ${x} dá exato, sem sobrar resto?`,
      setHint: `Um divisor de ${n} divide ${n} sem deixar resto. O 1 e o próprio ${n} sempre são divisores.`,
    });
  },
  () => template({
    id: 'medium-even-nstar',
    notation: 'A = {x ∈ ℕ* | x é par}',
    words: 'Os números naturais pares, sem o zero.',
    test: (x) => x > 0 && x % 2 === 0,
    candidates: range(0, 40),
    tricky: [0, 2, 31, 38],
    reason: (x, inSet) => {
      if (inSet) return `${x} é par e é diferente de zero.`;
      if (x === 0) return '0 é par, mas ℕ* não tem o zero.';
      return `${x} é ímpar.`;
    },
    ask: (x) => `Duas perguntas: ${x} está em ℕ* (sem o zero)? E ${x} é par?`,
    setHint: 'O asterisco em ℕ* tira o zero. Depois, a regra pede números pares.',
  }),
];

// Difícil: só a notação, propriedades combinadas e afirmações com ⊂ / ⊄.
const HARD = [
  () => template({
    id: 'hard-prime-30',
    notation: 'A = {x ∈ ℕ | x é primo e x < 30}',
    words: 'Os números primos menores que 30.',
    test: (x) => isPrime(x) && x < 30,
    candidates: range(0, 35),
    tricky: [1, 2, 9, 21, 27, 29, 31],
    reason: (x, inSet) => {
      if (inSet) return `${x} só é divisível por 1 e por ele mesmo, e é menor que 30.`;
      if (x <= 1) return `${x} não é primo: um primo tem exatamente dois divisores.`;
      if (!isPrime(x)) return `${x} = ${smallestDivisor(x)} · ${x / smallestDivisor(x)}, então não é primo.`;
      return `${x} é primo, mas não é menor que 30.`;
    },
    ask: (x) => `Duas condições: ${x} tem exatamente dois divisores (1 e ele mesmo)? E é menor que 30?`,
    setHint: 'Um primo é maior que 1 e só é dividido exatamente por 1 e por ele mesmo. O "e" exige as duas condições.',
  }),
  () => template({
    id: 'hard-odd-formula',
    notation: 'A = {x | x = 2n + 1, n ∈ ℕ}',
    words: 'Os números que podem ser escritos como 2n + 1, com n natural.',
    test: (x) => x % 2 === 1,
    candidates: range(0, 99),
    tricky: [0, 1, 37, 48, 99, 100],
    reason: (x, inSet) => (inSet ? `${x} = 2 · ${(x - 1) / 2} + 1.` : `${x} é par, e 2n + 1 nunca dá um número par.`),
    ask: (x) => `Tente achar um n natural com 2 · n + 1 = ${x}.`,
    setHint: '2n é sempre um número par. Somando 1, o resultado muda de tipo.',
  }),
  () => {
    const [a, b] = pick([[-3, 2], [-5, 0], [-2, 3]]);
    return template({
      id: `hard-z-${a}-${b}`,
      notation: `A = {x ∈ ℤ | ${fmt(a)} ≤ x < ${fmt(b)}}`,
      words: `Os inteiros de ${fmt(a)} até antes de ${fmt(b)}.`,
      test: (x) => x >= a && x < b,
      candidates: range(a - 3, b + 3),
      tricky: [a, a - 1, b, b - 1, 0],
      reason: (x, inSet) => {
        if (inSet) return `${fmt(x)} é inteiro, maior ou igual a ${fmt(a)} e menor que ${fmt(b)}.`;
        if (x === b) return `${fmt(b)} não é menor que ${fmt(b)}: o "<" não inclui a ponta.`;
        if (x < a) return `${fmt(x)} é menor que ${fmt(a)}.`;
        return `${fmt(x)} é maior que ${fmt(b)}.`;
      },
      ask: (x) => `Coloque o ${fmt(x)} numa reta numérica e compare com ${fmt(a)} e ${fmt(b)}.`,
      setHint: 'ℤ são os inteiros: também valem os negativos. O "≤" inclui a ponta; o "<" não inclui.',
    });
  },
  () => template({
    id: 'hard-square-30',
    notation: 'A = {x ∈ ℕ | x² < 30}',
    words: 'Os naturais cujo quadrado é menor que 30.',
    test: (x) => x * x < 30,
    candidates: range(0, 9),
    tricky: [0, 5, 6],
    reason: (x, inSet) => (inSet ? `${x}² = ${x * x}, que é menor que 30.` : `${x}² = ${x * x}, que não é menor que 30.`),
    ask: (x) => `Calcule ${x}² (${x} · ${x}) e compare com 30.`,
    setHint: 'A regra não fala do x, e sim do x² (x vezes x). Quem entra é o x, não o quadrado.',
  }),
  () => template({
    id: 'hard-mult-3-4',
    notation: 'A = {x ∈ ℕ* | x é múltiplo de 3 e de 4}',
    words: 'Os naturais (sem o zero) que são múltiplos de 3 e também de 4.',
    test: (x) => x > 0 && x % 12 === 0,
    candidates: range(0, 72),
    tricky: [0, 6, 8, 12, 24, 30, 36, 40],
    reason: (x, inSet) => {
      if (inSet) return `${x} = 3 · ${x / 3} e ${x} = 4 · ${x / 4}.`;
      if (x === 0) return '0 é múltiplo de tudo, mas ℕ* não tem o zero.';
      if (x % 3 === 0) return `${x} é múltiplo de 3, mas não de 4.`;
      if (x % 4 === 0) return `${x} é múltiplo de 4, mas não de 3.`;
      return `${x} não é múltiplo nem de 3 nem de 4.`;
    },
    ask: (x) => `Duas perguntas: ${x} está na tabuada do 3? E na do 4?`,
    setHint: 'O "e" exige as duas coisas ao mesmo tempo, e o ℕ* não tem o zero.',
  }),
];

const POOLS = { easy: EASY, medium: MEDIUM, hard: HARD };
const ELEMENT_ITEMS = { easy: 4, medium: 4, hard: 3 };

function elementItem(t, x, roundId) {
  const belongs = t.test(x);
  return { id: `${roundId}-${x}`, kind: 'element', left: fmt(x), belongs, reason: t.reason(x, belongs), hint: t.ask(x) };
}

/** Afirmação do tipo {a, b} ⊂ A: às vezes todos pertencem, às vezes um fica de fora. */
function subsetItem(t, roundId, used) {
  const members = shuffle(t.candidates.filter((x) => t.test(x) && !used.includes(x)));
  const outsiders = shuffle(t.candidates.filter((x) => !t.test(x)));
  const contained = Math.random() < 0.5;
  const size = members.length >= 3 && Math.random() < 0.5 ? 3 : 2;
  const chosen = contained ? members.slice(0, size) : [...members.slice(0, size - 1), outsiders[0]];
  const sorted = [...chosen].sort((x, y) => x - y);
  const left = formatList(sorted);
  const outside = sorted.find((x) => !t.test(x));
  return {
    id: `${roundId}-sub-${sorted.join('_')}`,
    kind: 'subset',
    left,
    belongs: contained,
    reason: contained
      ? `Todos os elementos de ${left} pertencem a A, então ${left} ⊂ A.`
      : `${fmt(outside)} ∉ A. Basta um elemento ficar de fora para ${left} ⊄ A.`,
    hint: `${left} ⊂ A quer dizer que cada elemento de ${left} pertence a A. Confira um por um.`,
  };
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
  const items = numbers.map((x) => elementItem(t, x, roundId));
  if (difficulty === 'hard') items.push(subsetItem(t, roundId, numbers));
  return { id: roundId, name: 'A', notation: t.notation, words: t.words, list: t.list, setHint: t.setHint, items };
}

/** Sorteia `count` conjuntos diferentes da dificuldade pedida. */
export function generateMembershipRounds(difficulty, count = 3) {
  const pool = POOLS[difficulty] ?? EASY;
  return shuffle(pool).slice(0, count).map((make, index) => buildRound(make(), difficulty, index));
}

/** Aquecimento guiado (o ⊂ só aparece para quem vai encontrá-lo nas questões). */
export function membershipWarmup(difficulty) {
  const items = [
    {
      id: 'warm-4',
      kind: 'element',
      left: '4',
      belongs: true,
      talk: 'O símbolo ∈ quer dizer “pertence”. Pense em A como uma caixa: o 4 está dentro dela?',
      reason: 'O 4 está dentro das chaves de A, então 4 ∈ A. Lemos: “4 pertence a A”.',
      hint: 'Procure o 4 dentro das chaves de A.',
    },
    {
      id: 'warm-5',
      kind: 'element',
      left: '5',
      belongs: false,
      talk: 'Agora o ∉, o “pertence” cortado: ele quer dizer “não pertence”. E o 5, está na caixa?',
      reason: 'O 5 não aparece em A, então 5 ∉ A. Lemos: “5 não pertence a A”.',
      hint: 'Procure o 5 dentro das chaves de A.',
    },
  ];
  if (difficulty === 'hard') {
    items.push({
      id: 'warm-sub',
      kind: 'subset',
      left: '{2, 8}',
      belongs: true,
      talk: 'No difícil aparece o ⊂, “está contido”: ele compara um conjunto inteiro com A. Todo elemento de {2, 8} está em A?',
      reason: 'O 2 e o 8 pertencem a A, então {2, 8} ⊂ A. Se um deles ficasse de fora, seria ⊄.',
      hint: 'Confira se o 2 está em A, e depois se o 8 está em A.',
    });
  }
  return {
    id: 'warmup',
    name: 'A',
    notation: 'A = {2, 4, 6, 8}',
    words: 'Os números pares de 2 a 8.',
    list: [2, 4, 6, 8],
    setHint: 'Se o número aparece dentro das chaves, ele pertence (∈). Se não aparece, não pertence (∉).',
    items,
  };
}

/** Os dois símbolos que completam cada tipo de afirmação. */
export const RELATION_SYMBOLS = {
  element: { yes: '∈', no: '∉', yesLabel: 'pertence', noLabel: 'não pertence' },
  subset: { yes: '⊂', no: '⊄', yesLabel: 'está contido', noLabel: 'não está contido' },
};
