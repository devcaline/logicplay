/**
 * Laboratório para 9 a 12 anos: máquinas lógicas com duas frases sobre bolinhas numeradas (p e q).
 * As quatro máquinas cobrem as quatro combinações (V e V, V e F, F e V, F e F), então juntas
 * formam a tabela-verdade da porta.
 *
 * Uma máquina: { id, a, b, question, hint }
 * Uma entrada: { ball, value, name, text, speech }
 */
import { COLORS } from './colorSets.js';
import { ballStatement, TRUTH_SETTINGS } from './truthBalls.js';

const range = (from, to) => Array.from({ length: to - from + 1 }, (_, index) => from + index);
const shuffle = (list) => [...list].sort(() => Math.random() - 0.5);
const pick = (list) => list[Math.floor(Math.random() * list.length)];
const COLOR_IDS = Object.keys(COLORS);

const COMBINATIONS = [
  [true, true],
  [true, false],
  [false, true],
  [false, false],
];

const WORD = { E: 'e', OU: 'ou' };
const VERB = { E: 'acende', OU: 'funciona' };

/** Dica de cada combinação, conforme a porta. */
function hintFor(gate, a, b) {
  if (gate === 'E') {
    if (a && b) return 'As duas frases são verdadeiras! Quando p e q são V, a Máquina do E acende.';
    if (!a && !b) return 'As duas frases são falsas. A Máquina do E só acende quando as duas são verdadeiras.';
    return `A frase ${a ? 'q' : 'p'} é falsa. Basta uma frase falsa para a Máquina do E ficar apagada.`;
  }
  if (!a && !b) return 'As duas frases são falsas, então a Máquina do OU fica parada.';
  if (a && b) return 'As duas frases são verdadeiras! Para a Máquina do OU, basta uma.';
  return `A frase ${a ? 'p' : 'q'} é verdadeira. Para a Máquina do OU funcionar, basta uma frase verdadeira.`;
}

export function generateGateMachines(difficulty, gate = 'E') {
  const level = TRUTH_SETTINGS[difficulty] ?? TRUTH_SETTINGS.easy;
  const kinds = [...new Set(level.kinds)];
  const numbers = shuffle(range(1, level.max));
  return shuffle(COMBINATIONS).map(([valueA, valueB], index) => {
    const input = (name, value, n) => {
      const ball = { n, color: pick(COLOR_IDS) };
      const made = ballStatement(kinds, ball, value);
      return { ball, value, name, text: `${name}: ${made.text}`, speech: made.speech, why: made.why };
    };
    const a = input('p', valueA, numbers[index * 2 % numbers.length]);
    const b = input('q', valueB, numbers[(index * 2 + 1) % numbers.length]);
    return {
      id: `${gate}-${index}`,
      a,
      b,
      question: {
        id: `t9.gate.${gate}.${index}`,
        text: `${a.speech.replace(/\.$/, '')} ${WORD[gate]} ${b.speech.charAt(0).toLowerCase()}${b.speech.slice(1)} A Máquina do ${gate} ${VERB[gate]}?`,
      },
      hint: { id: `t9.gate.${gate}.${index}.hint`, text: hintFor(gate, valueA, valueB) },
    };
  });
}

/**
 * Rodada prática da Máquina do OU: a alavanca p emperrou numa frase falsa, e o jogador escolhe
 * para q uma frase que faça a máquina funcionar (só uma das três opções é verdadeira).
 */
export function generateStuckRound(difficulty) {
  const level = TRUTH_SETTINGS[difficulty] ?? TRUTH_SETTINGS.easy;
  const kinds = [...new Set(level.kinds)];
  const numbers = shuffle(range(1, level.max));
  const make = (name, value, n) => {
    const ball = { n, color: pick(COLOR_IDS) };
    const made = ballStatement(kinds, ball, value);
    return { ball, value, name, text: `${name}: ${made.text}`, speech: made.speech, why: made.why };
  };
  const stuck = make('p', false, numbers[0]);
  const options = shuffle([make('q', true, numbers[1]), make('q', false, numbers[2]), make('q', false, numbers[3])]).map((option, index) => ({ ...option, id: `opt-${index}` }));
  return { stuck, options };
}
