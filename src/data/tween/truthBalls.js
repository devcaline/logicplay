/**
 * Laboratório, fase 1, para 9 a 12 anos: "Luzes da Verdade" com bolinhas numeradas.
 * Duas máquinas de quatro lâmpadas. Cada lâmpada guarda uma frase (proposição) com nome curto
 * (p, q, r, s) e o jogador decide V (verdadeiro, acende) ou F (falso, apaga).
 *   1) frases sobre as bolinhas: cor, par/ímpar, comparação, múltiplos;
 *   2) frases com os símbolos da Floresta: ∈, ∉ e (no difícil) ∩.
 *
 * Uma frase: { id, name, text, speech, ball?, value, hint, why }
 *   text   → o que aparece escrito (pode ter símbolos)
 *   speech → o que o Pipo fala (sem símbolos)
 * Uma máquina: { id, title, groups: string[], statements }
 */
import { COLORS, formatSet } from './colorSets.js';
import { RULES } from './vennBalls.js';

const range = (from, to) => Array.from({ length: to - from + 1 }, (_, index) => from + index);
const shuffle = (list) => [...list].sort(() => Math.random() - 0.5);
const pick = (list) => list[Math.floor(Math.random() * list.length)];
const COLOR_IDS = Object.keys(COLORS);
const NAMES = ['p', 'q', 'r', 's'];

const SETTINGS = {
  easy: { max: 10, kinds: ['color', 'parity', 'parity', 'color'], rule: 'even' },
  medium: { max: 20, kinds: ['color', 'parity', 'compare', 'mult'], rule: 'mult3' },
  hard: { max: 30, kinds: ['color', 'compare', 'mult', 'mult'], rule: 'mult4' },
};

// Frases sobre uma bolinha. `wantTrue` decide se a frase sorteada é verdadeira ou falsa.
const BALL_STATEMENTS = {
  color: (b, wantTrue) => {
    const said = wantTrue ? b.color : pick(COLOR_IDS.filter((c) => c !== b.color));
    const text = `A bolinha do ${b.n} é ${COLORS[said].name}.`;
    return { text, speech: text, hint: 'Olhe bem a cor da bolinha.', why: `A bolinha do ${b.n} é ${COLORS[b.color].name}.` };
  },
  parity: (b, wantTrue) => {
    const even = b.n % 2 === 0;
    const said = wantTrue ? even : !even;
    const text = `O ${b.n} é ${said ? 'par' : 'ímpar'}.`;
    return { text, speech: text, hint: 'Pares terminam em 0, 2, 4, 6 ou 8. Ímpares terminam em 1, 3, 5, 7 ou 9.', why: `O ${b.n} é ${even ? 'par' : 'ímpar'}.` };
  },
  compare: (b, wantTrue) => {
    const other = pick(range(Math.max(1, b.n - 6), b.n + 6).filter((x) => x !== b.n));
    const bigger = b.n > other;
    const saysBigger = wantTrue ? bigger : !bigger;
    const text = `O ${b.n} é ${saysBigger ? 'maior' : 'menor'} que ${other}.`;
    return { text, speech: text, hint: `Pense na ordem dos números: quem vem depois na contagem é maior.`, why: `O ${b.n} é ${bigger ? 'maior' : 'menor'} que ${other}.` };
  },
  mult: (b, wantTrue) => {
    const divisors = [3, 4, 5].filter((k) => (b.n % k === 0) === wantTrue);
    const k = divisors.length ? pick(divisors) : null;
    if (!k) return null;
    const text = `O ${b.n} é múltiplo de ${k}.`;
    return { text, speech: text, hint: `Pense na tabuada do ${k}: o ${b.n} aparece nela?`, why: b.n % k === 0 ? `${b.n} = ${k} × ${b.n / k}.` : `O ${b.n} não está na tabuada do ${k}.` };
  },
};

/** Uma frase sobre uma bolinha (verdadeira ou falsa), de um dos tipos disponíveis na dificuldade. */
export function ballStatement(kinds, ball, wantTrue) {
  for (const kind of shuffle(kinds)) {
    const made = BALL_STATEMENTS[kind](ball, wantTrue);
    if (made) return made;
  }
  return BALL_STATEMENTS.parity(ball, wantTrue);
}

export { SETTINGS as TRUTH_SETTINGS };

function ballMachine(level) {
  for (let attempt = 0; attempt < 200; attempt += 1) {
    const truths = shuffle([true, true, false, false]);
    const numbers = shuffle(range(1, level.max)).slice(0, 4);
    const statements = level.kinds.map((kind, index) => {
      const ball = { n: numbers[index], color: pick(COLOR_IDS) };
      const made = BALL_STATEMENTS[kind](ball, truths[index]);
      return made && { id: `ball-${index}`, name: NAMES[index], ball, value: truths[index], ...made };
    });
    if (statements.every(Boolean)) return { id: 'balls', title: 'Frases sobre as bolinhas', groups: [], statements: shuffleNames(statements) };
  }
  throw new Error('Não foi possível sortear as frases.');
}

/** Embaralha a ordem das lâmpadas, mantendo os nomes p, q, r, s em sequência. */
function shuffleNames(statements) {
  return shuffle(statements).map((statement, index) => ({ ...statement, id: `${statement.id}-${NAMES[index]}`, name: NAMES[index] }));
}

function symbolMachine(level, difficulty) {
  const rule = RULES[level.rule];
  const L = rule.letter;
  const members = shuffle(range(1, level.max)).slice(0, 4).sort((x, y) => x - y);
  const outside = shuffle(range(1, level.max).filter((n) => !members.includes(n)));
  const inRule = shuffle(range(1, level.max).filter(rule.test));
  const outRule = shuffle(range(1, level.max).filter((n) => !rule.test(n)));
  const groups = [`A = ${formatSet(members)}`, `${L} = números ${rule.name}`];

  const statements = [
    // Pertence a A (lista): uma verdadeira ou falsa.
    Math.random() < 0.5
      ? { value: true, text: `${members[1]} ∈ A`, speech: `O ${members[1]} pertence ao grupo A.`, hint: 'Procure o número dentro das chaves de A.', why: `O ${members[1]} está dentro das chaves de A.` }
      : { value: false, text: `${outside[0]} ∈ A`, speech: `O ${outside[0]} pertence ao grupo A.`, hint: 'Procure o número dentro das chaves de A.', why: `O ${outside[0]} não está dentro das chaves de A.` },
    // Não pertence a A.
    Math.random() < 0.5
      ? { value: true, text: `${outside[1]} ∉ A`, speech: `O ${outside[1]} não pertence ao grupo A.`, hint: 'O símbolo com risquinho quer dizer “não pertence”. O número está nas chaves?', why: `O ${outside[1]} não está em A, então a frase é verdadeira.` }
      : { value: false, text: `${members[0]} ∉ A`, speech: `O ${members[0]} não pertence ao grupo A.`, hint: 'O símbolo com risquinho quer dizer “não pertence”. O número está nas chaves?', why: `O ${members[0]} está em A, então dizer que não pertence é falso.` },
    // Pertence ao grupo da regra.
    Math.random() < 0.5
      ? { value: true, text: `${inRule[0]} ∈ ${L}`, speech: `O ${inRule[0]} pertence ao grupo ${L}.`, hint: `O grupo ${L} tem os números ${rule.name}.`, why: `O ${inRule[0]} é ${rule.tip}.` }
      : { value: false, text: `${outRule[0]} ∈ ${L}`, speech: `O ${outRule[0]} pertence ao grupo ${L}.`, hint: `O grupo ${L} tem os números ${rule.name}.`, why: `O ${outRule[0]} não é ${rule.tip}.` },
  ];

  if (difficulty === 'hard') {
    // Interseção: o número precisa estar em A e em L.
    const both = members.filter(rule.test);
    const onlyOne = members.filter((n) => !rule.test(n));
    const useTrue = both.length > 0 && Math.random() < 0.5;
    const n = useTrue ? both[0] : onlyOne[0] ?? outside[2];
    statements.push({
      value: useTrue,
      text: `${n} ∈ A ∩ ${L}`,
      speech: `O ${n} pertence à interseção de A com ${L}.`,
      hint: `Na interseção, o número precisa estar em A e também ser ${rule.tip}.`,
      why: useTrue ? `O ${n} está em A e é ${rule.tip}.` : `O ${n} não está nos dois grupos ao mesmo tempo.`,
    });
  } else {
    statements.push(
      Math.random() < 0.5
        ? { value: true, text: `${outRule[1]} ∉ ${L}`, speech: `O ${outRule[1]} não pertence ao grupo ${L}.`, hint: `O grupo ${L} tem os números ${rule.name}.`, why: `O ${outRule[1]} não é ${rule.tip}.` }
        : { value: false, text: `${inRule[1]} ∉ ${L}`, speech: `O ${inRule[1]} não pertence ao grupo ${L}.`, hint: `O grupo ${L} tem os números ${rule.name}.`, why: `O ${inRule[1]} é ${rule.tip}, então ele pertence.` },
    );
  }

  const named = statements.map((statement, index) => ({ ...statement, id: `sym-${index}`, name: NAMES[index] }));
  return { id: 'symbols', title: 'Frases com símbolos', groups, statements: shuffleNames(named) };
}

/** As duas máquinas da fase. */
export function generateTweenTruth(difficulty) {
  const level = SETTINGS[difficulty] ?? SETTINGS.easy;
  const levelId = SETTINGS[difficulty] ? difficulty : 'easy';
  // A máquina dos símbolos sempre mistura frases verdadeiras e falsas.
  let symbols = symbolMachine(level, levelId);
  while (symbols.statements.every((st) => st.value) || symbols.statements.every((st) => !st.value)) symbols = symbolMachine(level, levelId);
  return [ballMachine(level), symbols];
}
