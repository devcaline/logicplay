/**
 * Fase 4 para 9 a 12 anos: "O Portal do OU" com bolinhas numeradas e coloridas.
 * As bolinhas sobem em bolhas e o jogador estoura as que pertencem a A ou a B (ou aos dois).
 * Duas missões: uma cor ou uma regra; depois duas regras do número.
 * Ao terminar, a união aparece escrita com ∪, ao lado da interseção (∩) para comparar.
 *
 * Uma bolinha: { id, n, color, groups: ('a' | 'b')[], nope }
 * Uma missão: { id, text, sets, balls, reveal }
 */
import { COLORS, formatSet } from './colorSets.js';
import { RULES, VENN_PALETTE } from './vennBalls.js';

const range = (from, to) => Array.from({ length: to - from + 1 }, (_, index) => from + index);
const shuffle = (list) => [...list].sort(() => Math.random() - 0.5);
const pick = (list) => list[Math.floor(Math.random() * list.length)];
const COLOR_IDS = Object.keys(COLORS);
const cap = (text) => text.charAt(0).toUpperCase() + text.slice(1);

const SIZES = {
  easy: { max: 12, inUnion: 5, outside: 3 },
  medium: { max: 20, inUnion: 6, outside: 4 },
  hard: { max: 30, inUnion: 7, outside: 5 },
};

const MISSION_RULES = {
  easy: { first: ['odd', 'even'], second: [['even', 'lt6'], ['odd', 'lt6']] },
  medium: { first: ['even', 'mult3', 'odd'], second: [['mult5', 'mult3'], ['odd', 'gt10'], ['even', 'mult5']] },
  hard: { first: ['mult3', 'mult4', 'gt15'], second: [['mult4', 'mult5'], ['mult3', 'gt15'], ['mult5', 'gt15']] },
};

const regionOf = (groups) => (groups.length === 2 ? 'both' : groups[0] ?? 'out');

/** Sorteia bolinhas: algumas só em A, algumas nos dois, algumas só em B e algumas fora. */
function makeBalls(difficulty, testA, testB, colorFor, nope) {
  const { max, inUnion, outside } = SIZES[difficulty];
  for (let attempt = 0; attempt < 800; attempt += 1) {
    const all = shuffle(range(1, max)).map((n) => {
      const ball = { id: `n${n}`, n, color: colorFor(n) };
      ball.groups = [testA(ball) && 'a', testB(ball) && 'b'].filter(Boolean);
      return ball;
    });
    const by = { a: [], both: [], b: [], out: [] };
    all.forEach((ball) => by[regionOf(ball.groups)].push(ball));
    if (by.a.length < 1 || by.both.length < 1 || by.b.length < 1 || by.out.length < outside) continue;
    const union = [by.a[0], by.both[0], by.b[0], ...shuffle([...by.a.slice(1), ...by.both.slice(1, 2), ...by.b.slice(1)])].slice(0, inUnion);
    if (union.length < inUnion) continue;
    const balls = [...union, ...by.out.slice(0, outside)].map((ball) => ({ ...ball, nope: ball.groups.length ? null : nope(ball) }));
    return shuffle(balls);
  }
  throw new Error('Não foi possível sortear as bolinhas.');
}

function reveal(letterA, letterB, balls) {
  const list = (test) => balls.filter(test).map((b) => b.n);
  const listA = list((b) => b.groups.includes('a'));
  const listB = list((b) => b.groups.includes('b'));
  return [
    `${letterA} = ${formatSet(listA)}`,
    `${letterB} = ${formatSet(listB)}`,
    `${letterA} ∪ ${letterB} = ${formatSet(list((b) => b.groups.length > 0))}`,
    `${letterA} ∩ ${letterB} = ${formatSet(list((b) => b.groups.length === 2))}`,
  ];
}

function colorMission(difficulty) {
  const rule = RULES[pick(MISSION_RULES[difficulty].first)];
  const colorId = pick(COLOR_IDS);
  const color = COLORS[colorId];
  const others = COLOR_IDS.filter((c) => c !== colorId);
  const balls = makeBalls(
    difficulty,
    (b) => b.color === colorId,
    (b) => rule.test(b.n),
    () => (Math.random() < 0.4 ? colorId : pick(others)),
    (b) => `A bolinha do ${b.n} é ${COLORS[b.color].name}, não ${color.name}, e o ${b.n} não é ${rule.tip}. Ela não está em nenhum dos dois grupos!`,
  );
  return {
    id: 'color-rule',
    text: `O portal só deixa passar bolinhas ${color.plural} OU com número ${rule.tip}. Basta uma das duas coisas! Estoure as bolhas certas.`,
    sets: {
      a: { label: cap(color.plural), letter: color.letter, color: VENN_PALETTE[colorId] },
      b: { label: cap(rule.name), letter: rule.letter, color: VENN_PALETTE.ruleA },
      both: { label: 'Os dois', color: VENN_PALETTE.both },
    },
    caption: `${cap(color.plural)} OU ${rule.name}`,
    balls,
    reveal: {
      math: reveal(color.letter, rule.letter, balls),
      text: `Juntar dois grupos tem um nome: união. O símbolo parece um U, de união! ${color.letter} união ${rule.letter} tem todas as bolinhas que estão em pelo menos um dos grupos. Compare com a interseção, que só tem o meio.`,
    },
  };
}

function ruleMission(difficulty) {
  const [idA, idB] = pick(MISSION_RULES[difficulty].second);
  const ruleA = RULES[idA];
  const ruleB = RULES[idB];
  const balls = makeBalls(
    difficulty,
    (b) => ruleA.test(b.n),
    (b) => ruleB.test(b.n),
    () => pick(COLOR_IDS),
    (b) => `O ${b.n} não é ${ruleA.tip} e também não é ${ruleB.tip}. O portal não deixa passar!`,
  );
  return {
    id: 'rule-rule',
    text: `Agora a cor não importa! O portal deixa passar números ${ruleA.name} OU ${ruleB.name}.`,
    sets: {
      a: { label: cap(ruleA.name), letter: ruleA.letter, color: VENN_PALETTE.ruleA },
      b: { label: cap(ruleB.name), letter: ruleB.letter, color: VENN_PALETTE.ruleB },
      both: { label: 'Os dois', color: VENN_PALETTE.both },
    },
    caption: `${cap(ruleA.name)} OU ${ruleB.name}`,
    balls,
    reveal: {
      math: reveal(ruleA.letter, ruleB.letter, balls),
      text: `${ruleA.letter} união ${ruleB.letter}: todos os números que são ${ruleA.tip}, ou ${ruleB.tip}, ou as duas coisas. A união junta tudo; a interseção fica só com o meio.`,
    },
  };
}

/** As duas missões da fase. */
export function generateTweenUnion(difficulty) {
  const level = SIZES[difficulty] ? difficulty : 'easy';
  return [colorMission(level), ruleMission(level)];
}
