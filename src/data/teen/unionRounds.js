/**
 * Geradores de exercícios de união (13 anos ou mais).
 *
 * Dois tipos de questão:
 * - build: juntar os elementos de A e de B na caixa A ∪ B (sem repetir) e depois dizer n(A ∪ B);
 * - problem: um problema com quantidades, resolvido com n(A ∪ B) = n(A) + n(B) − n(A ∩ B).
 *
 * build:   { id, kind, a: { notation, words, list }, b: {...}, union, intersection, count: { options, answer }, hint }
 * problem: { id, kind, text, notation, ask, answer, options, counts: { a, b, both }, explain, hint }
 */

const range = (from, to) => Array.from({ length: to - from + 1 }, (_, index) => from + index);
const pick = (list) => list[Math.floor(Math.random() * list.length)];
const shuffle = (list) => [...list].sort(() => Math.random() - 0.5);
const sortNum = (list) => [...list].sort((x, y) => x - y);
export const formatList = (list) => (list.length ? `{${sortNum(list).join(', ')}}` : '{ }');

/** Opções de resposta: a certa, as armadilhas pedidas e vizinhas para completar 4, sem repetir. */
function makeOptions(answer, traps) {
  const options = [answer];
  [...traps, answer + 1, answer - 1, answer + 2].forEach((value) => {
    if (options.length < 4 && value > 0 && !options.includes(value)) options.push(value);
  });
  return shuffle(options);
}

function buildRound(id, a, b, hint) {
  const union = sortNum([...new Set([...a.list, ...b.list])]);
  const intersection = a.list.filter((x) => b.list.includes(x));
  const answer = union.length;
  return {
    id,
    kind: 'build',
    a,
    b,
    union,
    intersection,
    // A armadilha clássica: somar n(A) + n(B) e contar os repetidos duas vezes.
    count: { answer, options: makeOptions(answer, [a.list.length + b.list.length, answer + intersection.length]) },
    hint,
  };
}

const BUILD_HINT = 'A ∪ B junta tudo o que está em A ou em B. Um número que aparece nas duas listas entra uma vez só.';

// Fácil: listas pequenas sorteadas, com 1 ou 2 elementos em comum.
function easyBuild(index) {
  const pool = shuffle(range(1, 15));
  const common = pool.slice(0, pick([1, 2]));
  const listA = sortNum([...common, ...pool.slice(2, 2 + pick([2, 3]))]);
  const listB = sortNum([...common, ...pool.slice(5, 5 + pick([2, 3]))]);
  return buildRound(
    `easy-build-${index}-${listA.join('_')}`,
    { notation: `A = ${formatList(listA)}`, words: null, list: listA },
    { notation: `B = ${formatList(listB)}`, words: null, list: listB },
    BUILD_HINT,
  );
}

// Médio: conjuntos por propriedade (a lista aparece nas fichas para juntar).
const MEDIUM_BUILDS = [
  () => {
    const [p, q] = pick([[2, 3], [3, 4], [2, 5]]);
    const top = 15;
    const listA = range(1, top).filter((x) => x % p === 0);
    const listB = range(1, top).filter((x) => x % q === 0);
    return buildRound(
      `medium-build-mult-${p}-${q}`,
      { notation: `A = {x ∈ ℕ* | x é múltiplo de ${p}, x ≤ ${top}}`, words: `Múltiplos de ${p} até ${top}.`, list: listA },
      { notation: `B = {x ∈ ℕ* | x é múltiplo de ${q}, x ≤ ${top}}`, words: `Múltiplos de ${q} até ${top}.`, list: listB },
      `${BUILD_HINT} Aqui, quem é múltiplo de ${p} e de ${q} ao mesmo tempo aparece nas duas listas.`,
    );
  },
  () => {
    const n = pick([12, 18, 20]);
    const m = pick([8, 9, 10].filter((x) => x !== n));
    const listA = range(1, n).filter((x) => n % x === 0);
    const listB = range(1, m).filter((x) => m % x === 0);
    return buildRound(
      `medium-build-div-${n}-${m}`,
      { notation: `A = {x ∈ ℕ* | x é divisor de ${n}}`, words: `Divisores de ${n}.`, list: listA },
      { notation: `B = {x ∈ ℕ* | x é divisor de ${m}}`, words: `Divisores de ${m}.`, list: listB },
      `${BUILD_HINT} O 1 divide qualquer número, então ele está nas duas listas.`,
    );
  },
  () => {
    const a = pick([3, 4, 5]);
    const b = a + pick([3, 4]);
    const listA = range(1, b - 1);
    const listB = range(a, b + 4);
    return buildRound(
      `medium-build-interval-${a}-${b}`,
      { notation: `A = {x ∈ ℕ* | x < ${b}}`, words: `Os naturais de 1 até antes de ${b}.`, list: listA },
      { notation: `B = {x ∈ ℕ | ${a} ≤ x ≤ ${b + 4}}`, words: `Os naturais de ${a} até ${b + 4}.`, list: listB },
      `${BUILD_HINT} As duas faixas se encostam: os números de ${a} até ${b - 1} estão nas duas.`,
    );
  },
];

// Problemas com quantidades.
const CONTEXTS = [
  { group: 'Numa turma', a: 'jogam futebol', b: 'jogam vôlei', both: 'jogam os dois', who: 'alunos', A: 'F', B: 'V' },
  { group: 'Numa pesquisa', a: 'têm cachorro', b: 'têm gato', both: 'têm os dois', who: 'pessoas', A: 'C', B: 'G' },
  { group: 'Numa escola de idiomas', a: 'estudam inglês', b: 'estudam espanhol', both: 'estudam os dois', who: 'estudantes', A: 'I', B: 'E' },
  { group: 'Num grupo de amigos', a: 'leem mangá', b: 'jogam videogame', both: 'fazem as duas coisas', who: 'amigos', A: 'M', B: 'J' },
];

function problemRound(index, mode) {
  const ctx = pick(CONTEXTS);
  const both = pick([3, 4, 5, 6, 7]);
  const a = both + pick([5, 6, 8, 9, 11]);
  const b = both + pick([4, 6, 7, 10]);
  const total = a + b - both;
  const counts = { a, b, both };
  const sets = `${ctx.A} = ${ctx.who} que ${ctx.a}; ${ctx.B} = ${ctx.who} que ${ctx.b}.`;

  if (mode === 'reverse') {
    return {
      id: `problem-rev-${index}-${a}-${b}-${both}`,
      kind: 'problem',
      text: `${ctx.group}, ${total} ${ctx.who} responderam e todos ${ctx.a} ou ${ctx.b}. ${a} ${ctx.a} e ${b} ${ctx.b}. Quantos ${ctx.both}?`,
      sets,
      notation: `n(${ctx.A} ∪ ${ctx.B}) = ${total}, n(${ctx.A}) = ${a}, n(${ctx.B}) = ${b}, n(${ctx.A} ∩ ${ctx.B}) = ?`,
      answer: both,
      options: makeOptions(both, [a + b - total + 1, total - a, total - b].filter((x) => x !== both)),
      counts,
      names: [ctx.A, ctx.B],
      explain: `${a} + ${b} = ${a + b}, mas só existem ${total} ${ctx.who}. Os ${a + b - total} que sobram foram contados duas vezes: são os que ${ctx.both}.`,
      hint: `Use n(${ctx.A} ∪ ${ctx.B}) = n(${ctx.A}) + n(${ctx.B}) − n(${ctx.A} ∩ ${ctx.B}) e descubra o número que falta. Se somar ${ctx.A} e ${ctx.B}, quem faz as duas coisas entra duas vezes.`,
    };
  }

  return {
    id: `problem-${index}-${a}-${b}-${both}`,
    kind: 'problem',
    text: `${ctx.group}, ${a} ${ctx.who} ${ctx.a}, ${b} ${ctx.b} e ${both} ${ctx.both}. Quantos ${ctx.a} ou ${ctx.b} (pelo menos um dos dois)?`,
    sets,
    notation: `n(${ctx.A}) = ${a}, n(${ctx.B}) = ${b}, n(${ctx.A} ∩ ${ctx.B}) = ${both}, n(${ctx.A} ∪ ${ctx.B}) = ?`,
    answer: total,
    options: makeOptions(total, [a + b, a + b - 2 * both]),
    counts,
    names: [ctx.A, ctx.B],
    explain: `${a} + ${b} − ${both} = ${total}. Os ${both} que ${ctx.both} já estavam nos ${a} e também nos ${b}: tiramos uma vez para não contar duas.`,
    hint: `Quem ${ctx.both} aparece no grupo dos que ${ctx.a} e também no dos que ${ctx.b}. Se você só somar ${a} + ${b}, essas pessoas entram duas vezes.`,
  };
}

/** Sorteia as questões: o fácil só junta conjuntos; o médio termina com um problema; o difícil tem dois. */
export function generateUnionRounds(difficulty, count = 3) {
  if (difficulty === 'hard') {
    const build = shuffle(MEDIUM_BUILDS)[0]();
    return [build, problemRound(1, 'direct'), problemRound(2, 'reverse')].slice(0, count);
  }
  if (difficulty === 'medium') {
    const builds = shuffle(MEDIUM_BUILDS).slice(0, count - 1).map((make) => make());
    return [...builds, problemRound(count, 'direct')];
  }
  return range(1, count).map(easyBuild);
}

/** Aquecimento guiado (igual em todas as dificuldades). */
export function unionWarmup() {
  return buildRound(
    'warmup',
    { notation: 'A = {1, 2, 3}', words: null, list: [1, 2, 3] },
    { notation: 'B = {3, 4}', words: null, list: [3, 4] },
    'Toque em todas as fichas de A e de B. O 3 está nas duas: ele entra só uma vez.',
  );
}
