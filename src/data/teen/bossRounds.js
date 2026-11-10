/**
 * Desafio final da Floresta para 13 anos ou mais: cinco desafios, um por pedra mágica do Guardião,
 * revisando notação, pertinência, interseção, união e, no último, tudo junto.
 *
 * Um desafio: { id, concept, symbol, prompt, lines: string[], options: [{ text, correct }], explain, hint }
 */
import { problemRound } from './unionRounds.js';

const range = (from, to) => Array.from({ length: to - from + 1 }, (_, index) => from + index);
const pick = (list) => list[Math.floor(Math.random() * list.length)];
const shuffle = (list) => [...list].sort(() => Math.random() - 0.5);
const sortNum = (list) => [...new Set(list)].sort((x, y) => x - y);
const fmtN = (n) => (n < 0 ? `−${-n}` : String(n));
const set = (list) => (list.length ? `{${sortNum(list).map(fmtN).join(', ')}}` : '∅');

/** Opções sem repetir o texto: a primeira é a certa. Completa com `extras` se faltar. */
function options(correct, wrongs, extras = []) {
  const list = [{ text: correct, correct: true }];
  [...wrongs, ...extras].forEach((text) => {
    if (list.length < 4 && !list.some((item) => item.text === text)) list.push({ text, correct: false });
  });
  return shuffle(list);
}

/** Uma lista com um elemento a mais ou a menos (distratores de conjuntos). */
const without = (list, x) => list.filter((n) => n !== x);
const withExtra = (list, x) => sortNum([...list, x]);

// ---------- 1. Notação: qual lista é o conjunto? ----------
function notationRound(difficulty) {
  const base = { id: 'notation', concept: 'Notação', symbol: '{ }', prompt: 'Qual lista representa o conjunto A?' };
  if (difficulty === 'easy') {
    const n = pick([9, 10, 11, 12]);
    const elements = range(0, n - 1).filter((x) => x % 2 === 1);
    return {
      ...base,
      lines: [`A = {x ∈ ℕ | x é ímpar e x < ${n}}`, `Os números naturais ímpares menores que ${n}.`],
      options: options(set(elements), [set(withExtra(elements, n % 2 === 1 ? n : n + 1)), set(range(0, n - 1).filter((x) => x % 2 === 0)), set(without(elements, 1))]),
      explain: `Os ímpares menores que ${n} são ${set(elements)}. O "<" não deixa o ${n} entrar.`,
      hint: 'Ímpares terminam em 1, 3, 5, 7 ou 9. O "<" não inclui o número da ponta.',
    };
  }
  if (difficulty === 'medium') {
    const k = pick([3, 4]);
    const m = k * pick([4, 5]);
    const elements = range(0, m).filter((x) => x % k === 0);
    return {
      ...base,
      lines: [`A = {x ∈ ℕ | x é múltiplo de ${k} e x ≤ ${m}}`, `Os múltiplos de ${k}, de 0 até ${m}.`],
      options: options(set(elements), [set(without(elements, 0)), set(without(elements, m)), set(range(1, m).filter((x) => x % (k + 1) === 0))]),
      explain: `O 0 é natural e é múltiplo de ${k} (${k} · 0 = 0), e o "≤" deixa o ${m} entrar: A = ${set(elements)}.`,
      hint: `Múltiplos de ${k} são os resultados da tabuada do ${k}, começando em ${k} · 0. O "≤" inclui o número da ponta.`,
    };
  }
  const m = pick([20, 30, 40, 50]);
  const elements = range(1, 10).filter((x) => x * x < m);
  const root = Math.floor(Math.sqrt(m));
  return {
    ...base,
    lines: [`A = {x ∈ ℕ* | x² < ${m}}`],
    options: options(set(elements), [set([0, ...elements]), set(elements.map((x) => x * x)), set(range(1, root + 1))]),
    explain: `${elements.map((x) => `${x}² = ${x * x}`).join(', ')}: todos menores que ${m}. ${elements.length + 1}² = ${(elements.length + 1) ** 2} já passa. E ℕ* não tem o zero.`,
    hint: `A regra fala do quadrado de x (x · x), mas quem entra no conjunto é o próprio x. Lembre que ℕ* começa no 1.`,
  };
}

// ---------- 2. Pertinência: qual afirmação é verdadeira? ----------
function membershipRound(difficulty) {
  const base = { id: 'membership', concept: 'Pertinência', symbol: '∈', prompt: 'Qual afirmação é verdadeira?' };
  if (difficulty === 'easy') {
    const list = sortNum(shuffle(range(1, 12)).slice(0, 5));
    const inside = shuffle(list);
    const outside = shuffle(range(1, 12).filter((x) => !list.includes(x)));
    const trueOne = pick([`${inside[0]} ∈ A`, `${outside[0]} ∉ A`]);
    return {
      ...base,
      lines: [`A = ${set(list)}`],
      options: options(trueOne, [`${inside[1]} ∉ A`, `${outside[1]} ∈ A`, `${inside[2]} ∉ A`, `${outside[2]} ∈ A`]),
      explain: `Só "${trueOne}" combina com a lista de A. ∈ quer dizer "pertence" e ∉ quer dizer "não pertence".`,
      hint: 'Leia cada afirmação procurando o número dentro das chaves de A: ∈ diz que ele está lá, ∉ diz que não está.',
    };
  }
  if (difficulty === 'medium') {
    const n = pick([12, 18, 20]);
    const divisors = range(1, n).filter((x) => n % x === 0);
    const others = range(2, n).filter((x) => n % x !== 0);
    const d = shuffle(without(without(divisors, 1), n));
    const o = shuffle(others);
    const trueOne = pick([`${d[0]} ∈ A`, `${o[0]} ∉ A`, `${n} ∈ A`]);
    return {
      ...base,
      lines: [`A = {x ∈ ℕ* | x é divisor de ${n}}`],
      options: options(trueOne, [`${o[1]} ∈ A`, `${d[1]} ∉ A`, `1 ∉ A`, `${n * 2} ∈ A`]),
      explain: `Os divisores de ${n} são ${set(divisors)}. Confira cada afirmação nessa lista.`,
      hint: `x ∈ A quer dizer que ${n} ÷ x dá exato, sem resto. O 1 e o próprio ${n} sempre dividem ${n}.`,
    };
  }
  const [a, b] = pick([[-2, 3], [-3, 2], [-1, 4]]);
  const elements = range(a, b - 1);
  const inside = shuffle(elements);
  const subset = set(inside.slice(0, 2));
  const trueOne = `${subset} ⊂ A`;
  return {
    ...base,
    lines: [`A = {x ∈ ℤ | ${fmtN(a)} ≤ x < ${fmtN(b)}}`],
    options: options(trueOne, [`${fmtN(b)} ∈ A`, `${fmtN(a)} ∉ A`, `{${fmtN(a - 1)}, 0} ⊂ A`, `{0, ${fmtN(b)}} ⊂ A`]),
    explain: `A = ${set(elements)}: o "≤" inclui o ${fmtN(a)} e o "<" deixa o ${fmtN(b)} de fora. Todos os elementos de ${subset} estão em A.`,
    hint: 'ℤ inclui os negativos. Para ⊂, todos os elementos do conjunto da esquerda precisam estar em A; basta um de fora para ser falso.',
  };
}

// Conjuntos A e B usados na interseção, na união e no desafio final.
function pairFor(difficulty) {
  if (difficulty === 'easy') {
    const pool = shuffle(range(1, 12));
    const common = pool.slice(0, 2);
    const listA = sortNum([...common, ...pool.slice(2, 5)]);
    const listB = sortNum([...common, ...pool.slice(5, 7)]);
    return { a: `A = ${set(listA)}`, b: `B = ${set(listB)}`, listA, listB };
  }
  if (difficulty === 'medium') {
    const [p, q] = pick([[2, 3], [3, 4], [2, 5]]);
    const listA = range(1, 15).filter((x) => x % p === 0);
    const listB = range(1, 15).filter((x) => x % q === 0);
    return { a: `A = {x ∈ ℕ* | x é múltiplo de ${p}, x ≤ 15}`, b: `B = {x ∈ ℕ* | x é múltiplo de ${q}, x ≤ 15}`, listA, listB, p, q };
  }
  const [p, q] = pick([[4, 6], [6, 9], [4, 10]]);
  const listA = range(1, 40).filter((x) => x % p === 0);
  const listB = range(1, 40).filter((x) => x % q === 0);
  return { a: `A = {x ∈ ℕ* | x é múltiplo de ${p}, x ≤ 40}`, b: `B = {x ∈ ℕ* | x é múltiplo de ${q}, x ≤ 40}`, listA, listB, p, q };
}

// ---------- 3. Interseção ----------
function intersectionRound(difficulty) {
  const pair = pairFor(difficulty);
  const inter = pair.listA.filter((x) => pair.listB.includes(x));
  const union = sortNum([...pair.listA, ...pair.listB]);
  const onlyA = pair.listA.filter((x) => !inter.includes(x));
  return {
    id: 'intersection',
    concept: 'Interseção',
    symbol: '∩',
    prompt: 'Quanto vale A ∩ B?',
    lines: [pair.a, pair.b],
    options: options(`A ∩ B = ${set(inter)}`, [`A ∩ B = ${set(union)}`, `A ∩ B = ${set(onlyA)}`, `A ∩ B = ${set(inter.slice(0, -1))}`, `A ∩ B = ${set(withExtra(inter, onlyA[0]))}`]),
    explain: `A ∩ B tem só o que está em A e em B ao mesmo tempo: ${set(inter)}.`,
    hint: difficulty === 'easy'
      ? 'Procure os números que aparecem nas duas listas.'
      : `Liste A e B e procure os números que estão nas duas. Quem é múltiplo de ${pair.p} e de ${pair.q} ao mesmo tempo?`,
  };
}

// ---------- 4. União ----------
function unionRound(difficulty) {
  const base = { id: 'union', concept: 'União', symbol: '∪' };
  if (difficulty === 'hard') {
    const problem = problemRound(4, 'direct');
    return {
      ...base,
      prompt: problem.text,
      lines: [problem.sets],
      options: options(String(problem.answer), problem.options.filter((x) => x !== problem.answer).map(String)),
      explain: problem.explain,
      hint: problem.hint,
    };
  }
  const pair = pairFor(difficulty);
  const inter = pair.listA.filter((x) => pair.listB.includes(x));
  const union = sortNum([...pair.listA, ...pair.listB]);
  if (difficulty === 'easy') {
    return {
      ...base,
      prompt: 'Quanto vale A ∪ B?',
      lines: [pair.a, pair.b],
      options: options(`A ∪ B = ${set(union)}`, [`A ∪ B = ${set(inter)}`, `A ∪ B = ${set(without(union, pair.listB.find((x) => !inter.includes(x))))}`, `A ∪ B = ${set(pair.listA)}`]),
      explain: `A ∪ B junta tudo o que está em A ou em B, sem repetir: ${set(union)}.`,
      hint: 'Junte todos os números das duas listas. Quem aparece nas duas entra uma vez só.',
    };
  }
  const total = union.length;
  return {
    ...base,
    prompt: 'Quantos elementos tem A ∪ B?',
    lines: [pair.a, pair.b],
    options: options(`n(A ∪ B) = ${total}`, [`n(A ∪ B) = ${pair.listA.length + pair.listB.length}`, `n(A ∪ B) = ${total - 1}`, `n(A ∪ B) = ${total + 1}`, `n(A ∪ B) = ${total + 2}`]),
    explain: `n(A) + n(B) − n(A ∩ B) = ${pair.listA.length} + ${pair.listB.length} − ${inter.length} = ${total}.`,
    hint: 'Somar n(A) + n(B) conta duas vezes quem está nas duas listas. Descubra quantos são e tire uma vez.',
  };
}

// ---------- 5. Desafio final: tudo junto ----------
function finalRound(difficulty) {
  const base = { id: 'final', concept: 'Desafio final', symbol: '★' };
  if (difficulty === 'easy') {
    const pair = pairFor('easy');
    const inter = pair.listA.filter((x) => pair.listB.includes(x));
    const onlyOne = sortNum([...pair.listA, ...pair.listB]).filter((x) => !inter.includes(x));
    const outside = range(1, 12).find((x) => !pair.listA.includes(x) && !pair.listB.includes(x));
    return {
      ...base,
      prompt: 'Qual número está em A ∪ B, mas não está em A ∩ B?',
      lines: [pair.a, pair.b],
      options: options(String(pick(onlyOne)), [...inter.map(String), String(outside)], range(13, 20).map(String)),
      explain: `A ∩ B = ${set(inter)}. Os números de A ∪ B que não estão nas duas listas são ${set(onlyOne)}.`,
      hint: 'Primeiro encontre A ∩ B (os números das duas listas). A resposta está em uma das listas, mas não nas duas.',
    };
  }
  if (difficulty === 'medium') {
    const pool = shuffle(range(1, 12));
    const listA = sortNum(pool.slice(0, 5));
    const listB = sortNum([...pool.slice(3, 7)]);
    const listC = sortNum([...pool.slice(8, 10)]);
    const inter = listA.filter((x) => listB.includes(x));
    const answer = sortNum([...inter, ...listC]);
    return {
      ...base,
      prompt: 'Quanto vale (A ∩ B) ∪ C?',
      lines: [`A = ${set(listA)}`, `B = ${set(listB)}`, `C = ${set(listC)}`],
      options: options(set(answer), [set(sortNum([...listA, ...listB, ...listC])), set(inter), set(sortNum([...listA, ...listC]))]),
      explain: `Primeiro o parêntese: A ∩ B = ${set(inter)}. Depois junte com C: ${set(answer)}.`,
      hint: 'Resolva primeiro o que está entre parênteses (A ∩ B) e só depois faça a união com C.',
    };
  }
  const k = pick([8, 9, 10]);
  const universe = range(1, 15);
  const listA = universe.filter((x) => x % 2 === 0);
  const listB = universe.filter((x) => x % 3 === 0);
  const listC = universe.filter((x) => x > k);
  const union = sortNum([...listA, ...listB]);
  const answer = union.filter((x) => listC.includes(x));
  return {
    ...base,
    prompt: 'Quanto vale (A ∪ B) ∩ C?',
    lines: ['U = {1, 2, 3, …, 15}', 'A = {x ∈ U | x é par}', 'B = {x ∈ U | x é múltiplo de 3}', `C = {x ∈ U | x > ${k}}`],
    options: options(set(answer), [set(listA.filter((x) => listB.includes(x) && listC.includes(x))), set(listC), set(union.filter((x) => x >= k))]),
    explain: `A ∪ B = ${set(union)}. Desses, os maiores que ${k} são ${set(answer)}.`,
    hint: `Faça primeiro A ∪ B (par ou múltiplo de 3). Depois fique só com os que também são maiores que ${k}: o ∩ exige as duas coisas.`,
  };
}

/** Os cinco desafios do Guardião, na ordem das pedras. */
export function generateBossRounds(difficulty) {
  return [notationRound, membershipRound, intersectionRound, unionRound, finalRound].map((make, index) => ({
    ...make(difficulty),
    id: `${make.name}-${index}`,
  }));
}

/** Aquecimento: relembrar os símbolos antes de acordar o Guardião (igual em todas as dificuldades). */
export function bossWarmup() {
  return {
    id: 'warmup',
    concept: 'Aquecimento',
    symbol: '?',
    prompt: 'Qual símbolo quer dizer “em A e em B ao mesmo tempo”?',
    lines: [],
    options: shuffle([
      { text: '∩', correct: true },
      { text: '∪', correct: false },
      { text: '∈', correct: false },
      { text: '⊂', correct: false },
    ]),
    explain: '∩ é a interseção: os elementos comuns. O ∪ junta tudo, o ∈ liga um elemento a um conjunto e o ⊂ compara dois conjuntos.',
    hint: 'Pense no desenho do diagrama: a parte do meio, onde os círculos se encontram.',
  };
}

