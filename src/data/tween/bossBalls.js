/**
 * Fase 5 para 9 a 12 anos: o Guardião da Floresta. Cinco desafios com bolinhas numeradas,
 * um por pedra mágica, revisando o que a faixa aprendeu: chaves, ∈, ∩, ∪ e um desafio final.
 *
 * Um desafio: {
 *   id, concept, symbol,
 *   prompt,                 // texto narrado (sem símbolos, para a voz)
 *   lines,                  // o que aparece escrito, com os símbolos
 *   balls,                  // bolinhas mostradas no desafio (opcional)
 *   kind: 'choice' | 'pick',
 *   options,                // choice: [{ key, text } | { key, label, balls }]; pick: as próprias bolinhas
 *   answer,                 // chaves certas
 *   hint, explain,
 * }
 */
import { COLORS, formatSet } from './colorSets.js';
import { RULES } from './vennBalls.js';

const range = (from, to) => Array.from({ length: to - from + 1 }, (_, index) => from + index);
const shuffle = (list) => [...list].sort(() => Math.random() - 0.5);
const pick = (list) => list[Math.floor(Math.random() * list.length)];
const COLOR_IDS = Object.keys(COLORS);
const sortNum = (list) => [...list].sort((x, y) => x - y);

const SETTINGS = {
  easy: { max: 10, rules: ['odd', 'even'], pairs: [['even', 'lt6'], ['odd', 'lt6']] },
  medium: { max: 20, rules: ['odd', 'even', 'mult3'], pairs: [['even', 'mult3'], ['odd', 'gt10'], ['mult5', 'even']] },
  hard: { max: 30, rules: ['mult3', 'mult4', 'gt15'], pairs: [['mult3', 'mult4'], ['even', 'mult5'], ['mult3', 'gt15']] },
};

const ball = (n, color) => ({ id: `n${n}`, n, color });

/** Bolinhas em que A e B têm interseção, partes só de A, só de B e de fora. */
function pool(max, testA, testB, colorFor, size = 7) {
  for (let attempt = 0; attempt < 800; attempt += 1) {
    const balls = shuffle(range(1, max)).slice(0, size).map((n) => ball(n, colorFor(n)));
    const inA = balls.filter(testA);
    const inB = balls.filter(testB);
    const both = inA.filter(testB);
    const out = balls.filter((b) => !testA(b) && !testB(b));
    if (both.length >= 1 && both.length <= 3 && inA.length > both.length && inB.length > both.length && out.length >= 1) return balls;
  }
  throw new Error('Não foi possível sortear as bolinhas.');
}

const setOption = (key, letterExpr, balls) => ({ key, label: `${letterExpr} = ${formatSet(balls.map((b) => b.n))}`, balls: sortNum(balls.map((b) => b.n)).map((n) => balls.find((b) => b.n === n)) });

// ---------- 1. Chaves: o jeito certo de escrever um grupo ----------
function notationRound(level) {
  const colorId = pick(COLOR_IDS);
  const color = COLORS[colorId];
  const others = COLOR_IDS.filter((c) => c !== colorId);
  const numbers = shuffle(range(1, level.max)).slice(0, 7);
  const balls = numbers.map((n, index) => ball(n, index < 3 ? colorId : pick(others)));
  const members = sortNum(balls.filter((b) => b.color === colorId).map((b) => b.n));
  const outsider = balls.find((b) => b.color !== colorId).n;
  const letter = color.letter;
  return {
    id: 'notation',
    concept: 'Chaves',
    symbol: '{ }',
    prompt: `Qual é o jeito certo de escrever o grupo das bolinhas ${color.plural}?`,
    lines: [`${letter} = grupo das bolinhas ${color.plural}`],
    balls,
    kind: 'choice',
    options: shuffle([
      { key: 'right', text: `${letter} = ${formatSet(members)}` },
      { key: 'missing', text: `${letter} = ${formatSet(members.slice(0, -1))}` },
      { key: 'extra', text: `${letter} = ${formatSet([...members, outsider])}` },
      { key: 'nobraces', text: `${letter} = ${members.join(', ')}` },
    ]),
    answer: ['right'],
    hint: `Conte as bolinhas ${color.plural}: todas precisam estar dentro das chaves, e nenhuma de outra cor.`,
    explain: `O grupo tem uma letra, um sinal de igual e todos os elementos dentro das chaves: ${letter} = ${formatSet(members)}.`,
  };
}

// ---------- 2. Pertence ou não pertence ----------
function membershipRound(level) {
  const rule = RULES[pick(level.rules)];
  const inside = shuffle(range(1, level.max).filter(rule.test));
  const outside = shuffle(range(1, level.max).filter((n) => !rule.test(n)));
  const L = rule.letter;
  // Uma frase verdadeira e duas falsas (uma com ∈ e outra com ∉).
  const trueOne = Math.random() < 0.5 ? `${inside[0]} ∈ ${L}` : `${outside[0]} ∉ ${L}`;
  return {
    id: 'membership',
    concept: 'Pertence',
    symbol: '∈',
    prompt: `O grupo ${L} tem os números ${rule.name}. Qual frase está certa?`,
    lines: [`${L} = números ${rule.name}`],
    kind: 'choice',
    options: shuffle([
      { key: 'right', text: trueOne },
      { key: 'wrong-in', text: `${outside[1]} ∈ ${L}` },
      { key: 'wrong-out', text: `${inside[1]} ∉ ${L}` },
    ]),
    answer: ['right'],
    hint: `O símbolo sem risquinho quer dizer “pertence”; com o risquinho, “não pertence”. Confira se cada número é ${rule.tip}.`,
    explain: `${trueOne.split(' ')[0]} ${trueOne.includes('∉') ? 'não é' : 'é'} ${rule.tip}, então “${trueOne}” está certa.`,
  };
}

/** Grupo de cor × grupo de regra, com as bolinhas sorteadas (usado em ∩ e ∪). */
function colorRulePair(level) {
  const rule = RULES[pick(level.rules)];
  const colorId = pick(COLOR_IDS);
  const color = COLORS[colorId];
  const others = COLOR_IDS.filter((c) => c !== colorId);
  const testA = (b) => b.color === colorId;
  const testB = (b) => rule.test(b.n);
  const balls = pool(level.max, testA, testB, () => (Math.random() < 0.45 ? colorId : pick(others)));
  return { rule, color, testA, testB, balls, A: color.letter, B: rule.letter };
}

// ---------- 3. Interseção ----------
function intersectionRound(level) {
  const p = colorRulePair(level);
  const both = p.balls.filter((b) => p.testA(b) && p.testB(b));
  const union = p.balls.filter((b) => p.testA(b) || p.testB(b));
  const onlyA = p.balls.filter(p.testA);
  return {
    id: 'intersection',
    concept: 'Interseção',
    symbol: '∩',
    prompt: `Quais bolinhas estão na interseção: são ${p.color.plural} e também têm número ${p.rule.tip}?`,
    lines: [`${p.A} = bolinhas ${p.color.plural}`, `${p.B} = números ${p.rule.name}`],
    balls: p.balls,
    kind: 'choice',
    options: shuffle([setOption('right', `${p.A} ∩ ${p.B}`, both), setOption('union', `${p.A} ∩ ${p.B}`, union), setOption('onlyA', `${p.A} ∩ ${p.B}`, onlyA)]),
    answer: ['right'],
    hint: `A interseção é o meio do diagrama: a bolinha precisa ser ${p.color.name} e o número precisa ser ${p.rule.tip}, as duas coisas juntas.`,
    explain: both.length === 1
      ? `Só o ${both[0].n} é ${p.color.name} e ${p.rule.tip} ao mesmo tempo.`
      : `Só ${formatSet(both.map((b) => b.n))} são ${p.color.plural} e ${p.rule.name} ao mesmo tempo.`,
  };
}

// ---------- 4. União ----------
function unionRound(level) {
  const p = colorRulePair(level);
  const both = p.balls.filter((b) => p.testA(b) && p.testB(b));
  const union = p.balls.filter((b) => p.testA(b) || p.testB(b));
  const missing = union.filter((b) => !(p.testA(b) && p.testB(b)));
  return {
    id: 'union',
    concept: 'União',
    symbol: '∪',
    prompt: `Quais bolinhas estão na união: são ${p.color.plural} ou têm número ${p.rule.tip}?`,
    lines: [`${p.A} = bolinhas ${p.color.plural}`, `${p.B} = números ${p.rule.name}`],
    balls: p.balls,
    kind: 'choice',
    options: shuffle([
      setOption('right', `${p.A} ∪ ${p.B}`, union),
      setOption('inter', `${p.A} ∪ ${p.B}`, both),
      setOption('missing', `${p.A} ∪ ${p.B}`, union.filter((b) => b !== missing[0])),
    ]),
    answer: ['right'],
    hint: `A união junta os dois grupos: basta a bolinha ser ${p.color.name}, ou o número ser ${p.rule.tip}. Quem é as duas coisas também entra.`,
    explain: `${formatSet(union.map((b) => b.n))}: todas as bolinhas que estão em pelo menos um dos grupos.`,
  };
}

// ---------- 5. Desafio final: tocar em todas as bolinhas da interseção de duas regras ----------
function finalRound(level) {
  const [idA, idB] = pick(level.pairs);
  const ruleA = RULES[idA];
  const ruleB = RULES[idB];
  const testA = (b) => ruleA.test(b.n);
  const testB = (b) => ruleB.test(b.n);
  const balls = pool(level.max, testA, testB, () => pick(COLOR_IDS), 8);
  const answer = balls.filter((b) => testA(b) && testB(b));
  return {
    id: 'final',
    concept: 'Desafio final',
    symbol: '★',
    prompt: `Desafio final! Toque em todas as bolinhas da interseção: números ${ruleA.name} e também ${ruleB.name}. Depois toque em Pronto.`,
    lines: [`${ruleA.letter} = números ${ruleA.name}`, `${ruleB.letter} = números ${ruleB.name}`, `Toque em todas as bolinhas de ${ruleA.letter} ∩ ${ruleB.letter}`],
    kind: 'pick',
    options: balls,
    answer: answer.map((b) => b.id),
    hint: `Para cada bolinha pergunte: o número é ${ruleA.tip}? E é ${ruleB.tip}? Só toque nas que têm as duas respostas sim. A cor não importa!`,
    explain: `${ruleA.letter} ∩ ${ruleB.letter} = ${formatSet(answer.map((b) => b.n))}: números ${ruleA.name} e também ${ruleB.name}.`,
  };
}

/** Os cinco desafios, na ordem das pedras do Guardião. */
export function generateTweenBoss(difficulty) {
  const level = SETTINGS[difficulty] ?? SETTINGS.easy;
  return [notationRound(level), membershipRound(level), intersectionRound(level), unionRound(level), finalRound(level)];
}
