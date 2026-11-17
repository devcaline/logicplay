/**
 * Laboratório, fase 2, para 13 anos ou mais: a conjunção (∧, "e").
 * p ∧ q só é V quando p e q são V ao mesmo tempo.
 *
 * Questões:
 *  - eval:  { kind: 'eval', items: [{ id, lines: [{ name, text, value }], ask, answer, why, hint }] }
 *  - findx: { kind: 'findx', parts, universe, solution, hint }
 *  - table: { kind: 'table', columns: ['p ∧ q'] ou ['p ∧ q', 'q ∧ p'], hint }
 */

const range = (from, to) => Array.from({ length: to - from + 1 }, (_, index) => from + index);
const pick = (list) => list[Math.floor(Math.random() * list.length)];
const shuffle = (list) => [...list].sort(() => Math.random() - 0.5);
const isPrime = (n) => n > 1 && range(2, Math.floor(Math.sqrt(n))).every((d) => n % d !== 0);
const VF = (value) => (value ? 'V' : 'F');

// ---------- Frases com valor escolhido ----------
const FACTS = {
  parity: (value) => {
    const n = pick(range(2, 40));
    const even = n % 2 === 0;
    return { text: `${n} é ${even === value ? 'par' : 'ímpar'}.`, why: `${n} é ${even ? 'par' : 'ímpar'}` };
  },
  compare: (value) => {
    const a = pick(range(5, 60));
    const b = value ? pick(range(2, a - 1)) : pick(range(a + 1, a + 30));
    return { text: `${a} > ${b}.`, why: `${a} ${value ? '>' : '<'} ${b}` };
  },
  multiple: (value) => {
    const k = pick([3, 4, 5, 6]);
    const n = k * pick(range(2, 9)) + (value ? 0 : pick([1, 2]));
    return { text: `${n} é múltiplo de ${k}.`, why: value ? `${n} = ${k} · ${n / k}` : `${n} ÷ ${k} deixa resto ${n % k}` };
  },
  sum: (value) => {
    const a = pick(range(4, 30));
    const b = pick(range(4, 30));
    return { text: `${a} + ${b} = ${value ? a + b : a + b + pick([-2, -1, 1, 2])}.`, why: `${a} + ${b} = ${a + b}` };
  },
  prime: (value) => {
    const n = pick(range(2, 40).filter((x) => isPrime(x) === value));
    return { text: `${n} é primo.`, why: value ? `${n} é primo` : `${n} não é primo` };
  },
  member: (value) => {
    const set = shuffle(range(1, 12)).slice(0, 4).sort((x, y) => x - y);
    const n = value ? pick(set) : pick(range(1, 12).filter((x) => !set.includes(x)));
    return { text: `${n} ∈ {${set.join(', ')}}.`, why: `${n} ${value ? 'está' : 'não está'} no conjunto` };
  },
  square: (value) => {
    const a = pick(range(3, 12));
    return { text: `${a}² = ${value ? a * a : a * a + pick([-1, 1, a])}.`, why: `${a}² = ${a * a}` };
  },
};

const LEVELS = {
  easy: { facts: ['parity', 'compare', 'multiple', 'sum'], plan: ['eval', 'eval', 'table'], names: 2 },
  medium: { facts: ['parity', 'multiple', 'sum', 'prime', 'member'], plan: ['eval', 'findx', 'table'], names: 2 },
  hard: { facts: ['prime', 'member', 'square', 'multiple', 'compare'], plan: ['eval', 'findx', 'table'], names: 3 },
};

const NAMES = ['p', 'q', 'r'];
const joinAnd = (names) => names.join(' ∧ ');

/** Monta as linhas (p, q, talvez r) com valores escolhidos, sem repetir o tipo de frase. */
function makeLines(facts, values) {
  const kinds = shuffle(facts);
  return values.map((value, index) => ({ name: NAMES[index], value, ...FACTS[kinds[index % kinds.length]](value) }));
}

function andWhy(lines) {
  const parts = lines.map((line) => `V(${line.name}) = ${VF(line.value)}`).join(', ');
  const all = lines.every((line) => line.value);
  if (all) return `${parts}: todas são V, então ${joinAnd(lines.map((line) => line.name))} é V.`;
  const falses = lines.filter((line) => !line.value).map((line) => line.name);
  return `${parts}: ${falses.length === 1 ? `${falses[0]} é F` : `${falses.join(' e ')} são F`}, e basta uma parte F para o ∧ ser F.`;
}

const AND_HINT = {
  easy: 'p ∧ q se lê “p e q”. Ela só é V quando p é V e q também é V. Quais valores você encontrou para p e q?',
  medium: 'Descubra primeiro o valor de cada parte. O ∧ só dá V se as duas forem V.',
  hard: 'Descubra o valor de cada parte. Basta uma parte F para tudo ser F; para dar V, todas precisam ser V.',
};

function andItem(level, difficulty, values, id) {
  const lines = makeLines(level.facts, values);
  const ask = joinAnd(lines.map((line) => line.name));
  return { id, lines, ask, answer: values.every(Boolean), why: andWhy(lines), hint: AND_HINT[difficulty] };
}

/** Combinações de valores para uma questão: sempre há pelo menos um caso V e um F. */
function valueSets(count, names) {
  const all = names === 3
    ? [[true, true, true], [true, true, false], [true, false, true], [false, true, true], [false, false, true], [true, false, false]]
    : [[true, true], [true, false], [false, true], [false, false]];
  const allTrue = all[0];
  const rest = shuffle(all.slice(1));
  return shuffle([allTrue, ...rest.slice(0, count - 1)]);
}

function makeEval(level, difficulty, round) {
  if (difficulty === 'easy') {
    // Primeiro par passo a passo: V(p), V(q) e V(p ∧ q). Depois mais um par direto.
    const [first, second] = valueSets(2, 2);
    const lines = makeLines(level.facts, first);
    const stepped = [
      ...lines.map((line, index) => ({
        id: `r${round}-s${index}`,
        lines,
        ask: line.name,
        focus: index,
        answer: line.value,
        why: `${line.why}, então V(${line.name}) = ${VF(line.value)}.`,
        hint: 'Confira a conta ou a regra da frase: ela é verdadeira ou falsa?',
      })),
      { id: `r${round}-s2`, lines, showValues: true, ask: 'p ∧ q', answer: first.every(Boolean), why: andWhy(lines), hint: AND_HINT.easy },
    ];
    return { kind: 'eval', items: [...stepped, andItem(level, difficulty, second, `r${round}-s3`)] };
  }
  const names = difficulty === 'hard' ? [2, 3, 3, 3] : [2, 2, 2, 2];
  const twoSets = valueSets(4, 2);
  const threeSets = valueSets(3, 3);
  const items = names.map((n, index) => andItem(level, difficulty, n === 3 ? threeSets[index - 1] : twoSets[index], `r${round}-i${index}`));
  return { kind: 'eval', items };
}

// ---------- Encontre x ----------
const CONDITIONS = {
  even: { text: 'x é par', test: (x) => x % 2 === 0 },
  odd: { text: 'x é ímpar', test: (x) => x % 2 === 1 },
  prime: { text: 'x é primo', test: isPrime },
  mult3: { text: 'x é múltiplo de 3', test: (x) => x % 3 === 0 },
  greater: (k) => ({ text: `x > ${k}`, test: (x) => x > k }),
  less: (k) => ({ text: `x < ${k}`, test: (x) => x < k }),
};

function makeFindX(difficulty) {
  const max = difficulty === 'hard' ? 20 : 12;
  const universe = range(1, max);
  for (let attempt = 0; attempt < 200; attempt += 1) {
    const first = pick(difficulty === 'hard' ? ['even', 'odd', 'prime', 'mult3'] : ['even', 'odd', 'mult3']);
    const parts = [CONDITIONS[first]];
    if (difficulty === 'hard' && coinFlip()) {
      parts.push(CONDITIONS.greater(pick(range(2, 8))), CONDITIONS.less(pick(range(12, 18))));
    } else {
      parts.push(coinFlip() ? CONDITIONS.greater(pick(range(3, max - 4))) : CONDITIONS.less(pick(range(5, max - 1))));
    }
    const solution = universe.filter((x) => parts.every((part) => part.test(x)));
    if (solution.length >= 2 && solution.length <= 5) {
      return {
        kind: 'findx',
        parts: parts.map((part) => part.text),
        universe,
        solution,
        hint:
          difficulty === 'hard'
            ? 'Cada valor de x transforma a sentença numa proposição. Ela só é V se todas as partes forem V para aquele x.'
            : 'Teste cada número nas duas partes. Ele só serve se as duas forem V ao mesmo tempo.',
      };
    }
  }
  return { kind: 'findx', parts: ['x é par', 'x > 6'], universe, solution: universe.filter((x) => x % 2 === 0 && x > 6), hint: 'Teste cada número nas duas partes.' };
}

function coinFlip() {
  return Math.random() < 0.5;
}

/** As questões da fase, conforme a dificuldade. */
export function generateAndRounds(difficulty) {
  const level = LEVELS[difficulty] ?? LEVELS.easy;
  const id = LEVELS[difficulty] ? difficulty : 'easy';
  return level.plan.map((kind, index) => {
    const round = index + 1;
    if (kind === 'eval') return { id: `round-${round}`, ...makeEval(level, id, round) };
    if (kind === 'findx') return { id: `round-${round}`, ...makeFindX(id) };
    return {
      id: `round-${round}`,
      kind: 'table',
      columns: id === 'hard' ? ['p ∧ q', 'q ∧ p'] : ['p ∧ q'],
      hint:
        id === 'hard'
          ? 'Em cada linha, olhe p e q. O ∧ só dá V quando os dois são V. Será que trocar a ordem muda alguma coisa?'
          : 'Em cada linha, olhe p e q. O ∧ só dá V quando os dois são V.',
    };
  });
}

/** Aquecimento guiado (igual em todas as dificuldades). */
export function andWarmup() {
  const p = { name: 'p', text: '6 é par.', value: true };
  return {
    id: 'warmup',
    kind: 'eval',
    items: [
      {
        id: 'w0',
        lines: [p, { name: 'q', text: '6 > 4.', value: true }],
        ask: 'p ∧ q',
        answer: true,
        why: 'p é verdadeira e q é verdadeira. As duas partes são verdadeiras, então “p e q” é verdadeira.',
        hint: AND_HINT.easy,
        talk: 'Aquele símbolo em forma de chapéu se lê “e”. A frase “p e q” diz: 6 é par e 6 é maior que 4. Ela só é verdadeira quando as duas partes são verdadeiras. E aqui?',
      },
      {
        id: 'w1',
        lines: [p, { name: 'q', text: '6 > 10.', value: false }],
        ask: 'p ∧ q',
        answer: false,
        why: 'q é falsa. Basta uma parte falsa para “p e q” ser falsa.',
        hint: AND_HINT.easy,
        talk: 'Agora q mudou: 6 não é maior que 10. O que acontece com “p e q” quando uma das partes é falsa?',
      },
      {
        id: 'w2',
        lines: [{ name: 'p', text: '6 é ímpar.', value: false }, { name: 'q', text: '6 > 10.', value: false }],
        ask: 'p ∧ q',
        answer: false,
        why: 'As duas partes são falsas, então “p e q” também é falsa.',
        hint: AND_HINT.easy,
        talk: 'E quando as duas partes são falsas?',
      },
    ],
  };
}

export const AND_ROWS = [
  { p: true, q: true },
  { p: true, q: false },
  { p: false, q: true },
  { p: false, q: false },
];
