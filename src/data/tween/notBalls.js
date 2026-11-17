/**
 * Laboratório, fase 4, para 9 a 12 anos: "O Espelho do NÃO" com frases sobre bolinhas numeradas.
 * Parte 1: a frase p e o reflexo ¬p ("não p"); o jogador diz se a luz do espelho acende (V) ou apaga (F).
 * Parte 2: dois espelhos, ¬(¬p): o reflexo do reflexo volta a ser igual a p.
 *
 * Uma frase: { id, ball, value, text, notText, speech, notSpeech, hint }
 */
import { COLORS } from './colorSets.js';
import { ballStatement, TRUTH_SETTINGS } from './truthBalls.js';

const range = (from, to) => Array.from({ length: to - from + 1 }, (_, index) => from + index);
const shuffle = (list) => [...list].sort(() => Math.random() - 0.5);
const pick = (list) => list[Math.floor(Math.random() * list.length)];
const COLOR_IDS = Object.keys(COLORS);

/** "O 7 é ímpar." → "O 7 NÃO é ímpar." (todas as frases das bolinhas têm um único " é "). */
const negate = (text) => text.replace(' é ', ' NÃO é ');
const lower = (text) => text.charAt(0).toLowerCase() + text.slice(1);

export function generateTweenNot(difficulty) {
  const level = TRUTH_SETTINGS[difficulty] ?? TRUTH_SETTINGS.easy;
  const kinds = [...new Set(level.kinds)];
  const numbers = shuffle(range(1, level.max));
  const doubles = difficulty === 'easy' ? 1 : 2;
  const values = [...shuffle([true, true, false, false]), ...shuffle([true, false]).slice(0, doubles)];

  const rows = values.map((value, index) => {
    const ball = { n: numbers[index], color: pick(COLOR_IDS) };
    const made = ballStatement(kinds, ball, value);
    const notText = negate(made.text);
    return {
      id: `p-${index}`,
      ball,
      value,
      text: made.text,
      notText,
      speech: made.speech,
      notSpeech: negate(made.speech).replace('NÃO', 'não'),
      doubleText: `Não é verdade que ${lower(notText)}`,
      why: made.why,
      hint: value
        ? `A frase p é verdadeira, então a lâmpada dela está acesa. No espelho fica ao contrário: a luz de não p apaga.`
        : `A frase p é falsa, então a lâmpada dela está apagada. No espelho fica ao contrário: a luz de não p acende!`,
      doubleHint: `O primeiro espelho vira p ao contrário. O segundo espelho vira de novo: volta a ser igual a p, que é ${value ? 'verdadeira' : 'falsa'}.`,
    };
  });

  return {
    single: rows.slice(0, 4),
    double: rows.slice(4),
  };
}
