/**
 * Fase 3 para 9 a 12 anos: "A Ponte do E" com bolinhas numeradas e coloridas no diagrama de Venn.
 * Duas missões:
 *   1) um grupo pela cor e outro por uma regra do número (vermelhas e ímpares);
 *   2) os dois grupos por regras do número (pares e múltiplos de 3): a cor não importa.
 * Depois de cada missão, aparece a interseção escrita com o símbolo ∩.
 *
 * Uma bolinha: { id, n, color, groups: ('a' | 'b')[] }
 * Uma missão: { id, text, sets, balls, hint, reveal }
 */
import { COLORS, formatSet } from './colorSets.js';

const range = (from, to) => Array.from({ length: to - from + 1 }, (_, index) => from + index);
const shuffle = (list) => [...list].sort(() => Math.random() - 0.5);
const pick = (list) => list[Math.floor(Math.random() * list.length)];
const COLOR_IDS = Object.keys(COLORS);
const cap = (text) => text.charAt(0).toUpperCase() + text.slice(1);

const SIZES = {
  easy: { count: 7, max: 10 },
  medium: { count: 8, max: 20 },
  hard: { count: 9, max: 30 },
};

const RULES = {
  odd: { letter: 'I', name: 'ímpares', test: (n) => n % 2 === 1, tip: 'ímpar' },
  even: { letter: 'P', name: 'pares', test: (n) => n % 2 === 0, tip: 'par' },
  mult3: { letter: 'T', name: 'múltiplos de 3', test: (n) => n % 3 === 0, tip: 'múltiplo de 3' },
  mult4: { letter: 'Q', name: 'múltiplos de 4', test: (n) => n % 4 === 0, tip: 'múltiplo de 4' },
  mult5: { letter: 'C', name: 'múltiplos de 5', test: (n) => n % 5 === 0, tip: 'múltiplo de 5' },
  lt6: { letter: 'M', name: 'menores que 6', test: (n) => n < 6, tip: 'menor que 6' },
  gt10: { letter: 'G', name: 'maiores que 10', test: (n) => n > 10, tip: 'maior que 10' },
  gt15: { letter: 'G', name: 'maiores que 15', test: (n) => n > 15, tip: 'maior que 15' },
};

// Missão 1: cor × regra. Missão 2: regra × regra.
const MISSION_RULES = {
  easy: { first: ['odd', 'even'], second: [['even', 'lt6'], ['odd', 'lt6']] },
  medium: { first: ['odd', 'even', 'mult3'], second: [['even', 'mult3'], ['odd', 'gt10'], ['mult5', 'even']] },
  hard: { first: ['mult3', 'mult4', 'gt15'], second: [['mult3', 'mult4'], ['even', 'mult5'], ['mult3', 'gt15']] },
};

// Cores do diagrama: um grupo de cor usa a cor das bolinhas; os grupos de regra usam lilás e verde,
// cores que nenhuma bolinha tem, para a etiqueta nunca confundir com a cor da bolinha.
const PALETTE = {
  red: { fill: '#FF6B63', label: '#E5483F', shadow: '#B7322B' },
  blue: { fill: '#5AA9F0', label: '#3B95E8', shadow: '#2A6FB0' },
  yellow: { fill: '#FFD34D', label: '#D99A00', shadow: '#A87800' },
  ruleA: { fill: '#A99CF7', label: '#7C6CF0', shadow: '#5443C4' },
  ruleB: { fill: '#5FD69B', label: '#2FB273', shadow: '#1E8653' },
  both: { fill: '#C9C4DA', label: '#5B5577', shadow: '#3A3552' },
};

const regionOf = (groups) => (groups.length === 2 ? 'both' : groups[0] ?? 'out');

/** Sorteia bolinhas com todas as regiões representadas e nenhuma lotada. */
function makeBalls(difficulty, testA, testB, colorFor) {
  const { count, max } = SIZES[difficulty];
  for (let attempt = 0; attempt < 800; attempt += 1) {
    const balls = shuffle(range(1, max))
      .slice(0, count)
      .map((n) => {
        const color = colorFor(n);
        const ball = { id: `n${n}`, n, color };
        ball.groups = [testA(ball) && 'a', testB(ball) && 'b'].filter(Boolean);
        return ball;
      });
    const counts = { a: 0, b: 0, both: 0, out: 0 };
    balls.forEach((ball) => { counts[regionOf(ball.groups)] += 1; });
    if (counts.both >= 2 && counts.both <= 3 && counts.a >= 1 && counts.a <= 3 && counts.b >= 1 && counts.b <= 3 && counts.out >= 1) {
      return balls;
    }
  }
  throw new Error('Não foi possível sortear as bolinhas.');
}

function colorMission(difficulty) {
  const rule = RULES[pick(MISSION_RULES[difficulty].first)];
  const colorId = pick(COLOR_IDS);
  const color = COLORS[colorId];
  const others = COLOR_IDS.filter((c) => c !== colorId);
  // Cerca de metade das bolinhas tem a cor do grupo, para o meio nunca ficar vazio.
  const balls = makeBalls(difficulty, (b) => b.color === colorId, (b) => rule.test(b.n), () => (Math.random() < 0.5 ? colorId : pick(others)));
  const listA = balls.filter((b) => b.groups.includes('a')).map((b) => b.n);
  const listB = balls.filter((b) => b.groups.includes('b')).map((b) => b.n);
  const both = balls.filter((b) => b.groups.length === 2).map((b) => b.n);
  return {
    id: 'color-rule',
    text: `Coloque cada bolinha no lugar certo: no grupo das ${color.plural}, no grupo dos ${rule.name}, no meio se for as duas coisas, ou fora.`,
    hint: `Pergunte para cada bolinha: ela é ${color.name}? O número é ${rule.tip}? Se as duas respostas forem sim, ela vai no meio.`,
    sets: {
      a: { label: cap(color.plural), letter: color.letter, color: PALETTE[colorId] },
      b: { label: cap(rule.name), letter: rule.letter, color: PALETTE.ruleA },
      both: { label: `${cap(color.plural)} e ${rule.name}`, color: PALETTE.both },
      outLabel: 'Fora dos grupos',
    },
    balls,
    reveal: {
      math: [`${color.letter} = ${formatSet(listA)}`, `${rule.letter} = ${formatSet(listB)}`, `${color.letter} ∩ ${rule.letter} = ${formatSet(both)}`],
      text: `O meio do diagrama tem um nome: interseção. Os matemáticos escrevem com um símbolo que parece um U de cabeça para baixo, e lemos: ${color.letter} interseção ${rule.letter}. São as bolinhas que estão nos dois grupos ao mesmo tempo.`,
    },
  };
}

function ruleMission(difficulty) {
  const [idA, idB] = pick(MISSION_RULES[difficulty].second);
  const ruleA = RULES[idA];
  const ruleB = RULES[idB];
  const balls = makeBalls(difficulty, (b) => ruleA.test(b.n), (b) => ruleB.test(b.n), () => pick(COLOR_IDS));
  const listA = balls.filter((b) => b.groups.includes('a')).map((b) => b.n);
  const listB = balls.filter((b) => b.groups.includes('b')).map((b) => b.n);
  const both = balls.filter((b) => b.groups.length === 2).map((b) => b.n);
  return {
    id: 'rule-rule',
    text: `Agora a cor não importa! Um grupo tem os números ${ruleA.name} e o outro, os ${ruleB.name}. Coloque cada bolinha no lugar certo.`,
    hint: `Olhe só o número: ele é ${ruleA.tip}? Ele é ${ruleB.tip}? Se for as duas coisas, vai no meio. A cor da bolinha não conta.`,
    sets: {
      a: { label: cap(ruleA.name), letter: ruleA.letter, color: PALETTE.ruleA },
      b: { label: cap(ruleB.name), letter: ruleB.letter, color: PALETTE.ruleB },
      both: { label: `${cap(ruleA.name)} e ${ruleB.name}`, color: PALETTE.both },
      outLabel: 'Fora dos grupos',
    },
    balls,
    reveal: {
      math: [`${ruleA.letter} = ${formatSet(listA)}`, `${ruleB.letter} = ${formatSet(listB)}`, `${ruleA.letter} ∩ ${ruleB.letter} = ${formatSet(both)}`],
      text: `De novo a interseção! ${ruleA.letter} interseção ${ruleB.letter} são os números que estão nos dois grupos: ${ruleA.name} e também ${ruleB.name}. O símbolo da interseção é o símbolo do E.`,
    },
  };
}

export { PALETTE as VENN_PALETTE };

/** As duas missões da fase. */
export function generateTweenVenn(difficulty) {
  const level = SIZES[difficulty] ? difficulty : 'easy';
  return [colorMission(level), ruleMission(level)];
}
