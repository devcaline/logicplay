/**
 * Fase 2 para 9 a 12 anos: "Quem pertence aqui?" com bolinhas numeradas e coloridas.
 * Três grupos, um de cada vez, e as bolinhas chegam uma por vez para o jogador responder
 * ∈ (pertence) ou ∉ (não pertence):
 *   1) um grupo descrito por uma regra do número (P = números pares);
 *   2) um grupo escrito com chaves (A = {3, 7, 10}): a cor não importa, só o número;
 *   3) um grupo com duas condições (bolinhas vermelhas e com número par).
 *
 * Um grupo: { id, letter, label, outLabel, display, words, balls, intro }
 * Uma bolinha: { id, n, color, belongs, question, hint, why }
 */
import { COLORS, formatSet } from './colorSets.js';

const range = (from, to) => Array.from({ length: to - from + 1 }, (_, index) => from + index);
const shuffle = (list) => [...list].sort(() => Math.random() - 0.5);
const pick = (list) => list[Math.floor(Math.random() * list.length)];
const COLOR_IDS = Object.keys(COLORS);

const SETTINGS = {
  easy: { balls: 4, max: 10 },
  medium: { balls: 5, max: 20 },
  hard: { balls: 6, max: 30 },
};

const RULES = {
  easy: [
    { letter: 'P', name: 'pares', one: 'par', test: (n) => n % 2 === 0, why: (n, ok) => (ok ? `${n} é par` : `${n} é ímpar`), tip: 'Números pares terminam em 0, 2, 4, 6 ou 8.' },
    { letter: 'I', name: 'ímpares', one: 'ímpar', test: (n) => n % 2 === 1, why: (n, ok) => (ok ? `${n} é ímpar` : `${n} é par`), tip: 'Números ímpares terminam em 1, 3, 5, 7 ou 9.' },
  ],
  medium: [
    { letter: 'T', name: 'múltiplos de 3', one: 'múltiplo de 3', test: (n) => n % 3 === 0, why: (n, ok) => (ok ? `${n} está na tabuada do 3` : `${n} não está na tabuada do 3`), tip: 'Os múltiplos de 3 estão na tabuada do 3: 3, 6, 9, 12, 15, 18…' },
    { letter: 'C', name: 'múltiplos de 5', one: 'múltiplo de 5', test: (n) => n % 5 === 0, why: (n, ok) => (ok ? `${n} termina em 0 ou 5` : `${n} não termina em 0 nem em 5`), tip: 'Os múltiplos de 5 terminam em 0 ou em 5.' },
  ],
  hard: [
    { letter: 'Q', name: 'múltiplos de 4', one: 'múltiplo de 4', test: (n) => n % 4 === 0, why: (n, ok) => (ok ? `${n} = 4 × ${n / 4}` : `${n} não está na tabuada do 4`), tip: 'Os múltiplos de 4 estão na tabuada do 4: 4, 8, 12, 16, 20, 24, 28…' },
    { letter: 'G', name: 'maiores que 12', one: 'maior que 12', test: (n) => n > 12, why: (n, ok) => (ok ? `${n} é maior que 12` : n === 12 ? '12 não é maior que ele mesmo' : `${n} é menor que 12`), tip: '"Maior que 12" não inclui o próprio 12.' },
  ],
};

/** Escolhe números com uma mistura de "pertence" e "não pertence" (pelo menos 2 de cada quando dá). */
function mixed(candidates, test, count) {
  const yes = shuffle(candidates.filter(test));
  const no = shuffle(candidates.filter((n) => !test(n)));
  const half = Math.ceil(count / 2);
  const chosen = [...yes.slice(0, half), ...no.slice(0, count - half)];
  return shuffle(chosen);
}

const ask = (n, color, group) => (color ? `A bolinha ${COLORS[color].name} com o ${n} pertence ao grupo ${group}?` : `O ${n} pertence ao grupo ${group}?`);

function ruleGroup(difficulty) {
  const { balls, max } = SETTINGS[difficulty];
  const rule = pick(RULES[difficulty]);
  const numbers = mixed(range(1, max), rule.test, balls);
  return {
    id: 'rule',
    letter: rule.letter,
    label: `${rule.letter}: ${rule.name}`,
    outLabel: `Não pertencem a ${rule.letter}`,
    display: `${rule.letter} = números ${rule.name}`,
    words: `O grupo ${rule.letter} tem os números ${rule.name}.`,
    intro: `Primeiro grupo: o grupo ${rule.letter} tem os números ${rule.name}. Para cada bolinha, responda: pertence ou não pertence?`,
    balls: numbers.map((n, index) => {
      const belongs = rule.test(n);
      return {
        id: `rule-${n}-${index}`,
        n,
        color: pick(COLOR_IDS),
        belongs,
        question: ask(n, null, rule.letter),
        hint: `${rule.tip} O ${n} é ${rule.one}?`,
        why: `${rule.why(n, belongs)}.`,
      };
    }),
  };
}

function listGroup(difficulty) {
  const { balls, max } = SETTINGS[difficulty];
  const members = shuffle(range(1, max)).slice(0, difficulty === 'easy' ? 4 : 5).sort((x, y) => x - y);
  const outsiders = shuffle(range(1, max).filter((n) => !members.includes(n)));
  const half = Math.ceil(balls / 2);
  // Um mesmo número pode aparecer com outra cor: a cor não muda a resposta.
  const numbers = shuffle([...shuffle(members).slice(0, half), ...outsiders.slice(0, balls - half)]);
  return {
    id: 'list',
    letter: 'A',
    label: `A = ${formatSet(members)}`,
    outLabel: 'Não pertencem a A',
    display: `A = ${formatSet(members)}`,
    words: 'Os elementos de A são os números que estão dentro das chaves.',
    intro: 'Agora o grupo A está escrito com chaves. Repare: aqui a cor não importa, só o número que está dentro das chaves!',
    balls: numbers.map((n, index) => {
      const belongs = members.includes(n);
      return {
        id: `list-${n}-${index}`,
        n,
        color: pick(COLOR_IDS),
        belongs,
        question: ask(n, null, 'A'),
        hint: `Procure o número ${n} dentro das chaves de A. A cor da bolinha não importa.`,
        why: belongs ? `o ${n} aparece dentro das chaves de A.` : `o ${n} não aparece dentro das chaves de A.`,
      };
    }),
  };
}

function bothGroup(difficulty) {
  const { balls, max } = SETTINGS[difficulty];
  const rule = pick(RULES[difficulty]);
  const colorId = pick(COLOR_IDS);
  const color = COLORS[colorId];
  const others = COLOR_IDS.filter((c) => c !== colorId);
  // Mistura os quatro casos: só a cor certa, só o número certo, os dois e nenhum.
  const yes = shuffle(range(1, max).filter(rule.test));
  const no = shuffle(range(1, max).filter((n) => !rule.test(n)));
  const plan = shuffle([
    [yes[0], colorId],
    [yes[1], colorId],
    [no[0], colorId],
    [yes[2], pick(others)],
    [no[1], pick(others)],
    [yes[3], colorId],
  ]).slice(0, balls);
  if (!plan.some(([n, c]) => c === colorId && rule.test(n))) plan[0] = [yes[0], colorId];
  return {
    id: 'both',
    letter: 'B',
    label: `B: ${color.plural} e ${rule.name}`,
    outLabel: 'Não pertencem a B',
    display: `B = bolinhas ${color.plural} e com números ${rule.name}`,
    words: `Para pertencer a B, a bolinha precisa ser ${color.name} e o número precisa ser ${rule.one}.`,
    intro: `Último grupo, o desafio! Para pertencer a B, a bolinha precisa ser ${color.name} e o número precisa ser ${rule.one}. As duas coisas juntas!`,
    balls: plan.map(([n, c], index) => {
      const okColor = c === colorId;
      const okRule = rule.test(n);
      const belongs = okColor && okRule;
      let why = `a bolinha é ${color.name} e ${rule.why(n, true)}.`;
      if (!okColor && !okRule) why = `a bolinha não é ${color.name} e ${rule.why(n, false)}.`;
      else if (!okColor) why = `${rule.why(n, true)}, mas a bolinha é ${COLORS[c].name}.`;
      else if (!okRule) why = `a bolinha é ${color.name}, mas ${rule.why(n, false)}.`;
      return {
        id: `both-${n}-${c}-${index}`,
        n,
        color: c,
        belongs,
        question: ask(n, c, 'B'),
        hint: `Confira as duas coisas: a bolinha é ${color.name}? E o ${n} é ${rule.one}? Só pertence se as duas respostas forem sim.`,
        why,
      };
    }),
  };
}

/** Os três grupos da fase, do mais simples ao desafio. */
export function generateTweenMembership(difficulty) {
  const level = SETTINGS[difficulty] ? difficulty : 'easy';
  return [ruleGroup(level), listGroup(level), bothGroup(level)];
}
