/**
 * Laboratório, fase 3, para 13 anos ou mais: a disjunção (∨, "ou").
 * p ∨ q é V quando pelo menos uma das partes é V; só é F quando todas são F.
 *
 * Duas dinâmicas diferentes da fase 2:
 *  - build (Monte): o jogador escolhe cartas-frase para os espaços p, q (r) e monta uma
 *    expressão com o valor pedido. { kind: 'build', expr, target, require, cards, hint }
 *  - detective (Detetive): pelas pistas, deduz o valor de uma parte (V, F ou "não dá para saber").
 *    { kind: 'detective', clues: [{ text }], ask, answer: 'V' | 'F' | '?', why, hint }
 */
import { range, pick, shuffle, VF, FACTS } from './andRounds.js';

export const EXPRESSIONS = {
  or2: { names: ['p', 'q'], text: 'p ∨ q', value: ({ p, q }) => p || q },
  or3: { names: ['p', 'q', 'r'], text: 'p ∨ q ∨ r', value: ({ p, q, r }) => p || q || r },
  andOr: { names: ['p', 'q', 'r'], text: '(p ∧ q) ∨ r', value: ({ p, q, r }) => (p && q) || r },
  orAnd: { names: ['p', 'q', 'r'], text: 'p ∧ (q ∨ r)', value: ({ p, q, r }) => p && (q || r) },
};

const FACT_KINDS = {
  easy: ['parity', 'compare', 'multiple', 'sum'],
  medium: ['parity', 'multiple', 'sum', 'prime', 'member'],
  hard: ['prime', 'member', 'square', 'multiple', 'compare'],
};

/** Banco de cartas com `trues` verdadeiras e `falses` falsas, sem repetir texto. */
function makeCards(difficulty, trues, falses, prefix) {
  const used = new Set();
  const values = shuffle([...Array(trues).fill(true), ...Array(falses).fill(false)]);
  return values.map((value, index) => {
    let fact;
    do fact = FACTS[pick(FACT_KINDS[difficulty])](value);
    while (used.has(fact.text));
    used.add(fact.text);
    return { id: `${prefix}-c${index}`, text: fact.text, value, why: fact.why };
  });
}

const BUILD_HINT = {
  or2: 'p ∨ q só é F quando p e q são F. Para ser V, basta uma parte V. Descubra o valor de cada carta antes de escolher.',
  or3: 'p ∨ q ∨ r só é F quando todas as partes são F. Para ser V, basta uma parte V.',
  andOr: 'Pense em duas partes: (p ∧ q) e r. O ∨ precisa de pelo menos uma delas V. E p ∧ q só é V com p e q verdadeiras.',
  orAnd: 'O ∧ de fora precisa de p V e de (q ∨ r) V ao mesmo tempo. Se qualquer um dos dois for F, tudo é F.',
};

/** Um desafio de montar. `require` fixa o valor de alguns espaços, por exemplo { p: false }. */
function build(difficulty, expr, target, require, id, cardCounts = [3, 3]) {
  return {
    id,
    kind: 'build',
    expr,
    target,
    require: require ?? {},
    cards: makeCards(difficulty, cardCounts[0], cardCounts[1], id),
    hint: BUILD_HINT[expr],
  };
}

// ---------- Detetive ----------
const METHOD_HINT = 'Teste as duas possibilidades: com a parte pedida V, as pistas continuam valendo? E com ela F? Se só uma funciona, essa é a resposta. Se as duas funcionam, não dá para saber.';

const clue = (expr, value) => ({ text: `V(${expr}) = ${VF(value)}` });

/** Casos de dedução: o valor conhecido da expressão, os valores já descobertos e a parte pedida. */
const CASES = {
  or2: [
    { known: true, facts: { p: false }, ask: 'q' },
    { known: true, facts: { q: false }, ask: 'p' },
    { known: true, facts: { p: true }, ask: 'q' },
    { known: false, facts: {}, ask: 'p' },
    { known: false, facts: {}, ask: 'q' },
  ],
  and2: [
    { known: true, facts: {}, ask: 'p' },
    { known: false, facts: { p: true }, ask: 'q' },
    { known: false, facts: { q: false }, ask: 'p' },
  ],
  or3: [
    { known: true, facts: { p: false, q: false }, ask: 'r' },
    { known: true, facts: { p: true }, ask: 'r' },
    { known: false, facts: {}, ask: 'q' },
  ],
  andOr: [
    { known: false, facts: {}, ask: 'r' },
    { known: true, facts: { r: false }, ask: 'p' },
    { known: true, facts: { p: false }, ask: 'r' },
    { known: true, facts: { r: true }, ask: 'q' },
  ],
  orAnd: [
    { known: true, facts: {}, ask: 'p' },
    { known: true, facts: { q: false }, ask: 'r' },
    { known: false, facts: { p: true, q: false }, ask: 'r' },
    { known: false, facts: { q: true }, ask: 'p' },
  ],
};
const AND2 = { names: ['p', 'q'], text: 'p ∧ q', value: ({ p, q }) => p && q };
const exprOf = (key) => (key === 'and2' ? AND2 : EXPRESSIONS[key]);

/** Testa V e F para a parte pedida, preenchendo as outras de todos os jeitos possíveis. */
function deduce(expr, known, facts, ask) {
  const free = expr.names.filter((name) => name !== ask && !(name in facts));
  const works = (askValue) =>
    range(0, 2 ** free.length - 1).some((mask) => {
      const values = { ...facts, [ask]: askValue };
      free.forEach((name, bit) => {
        values[name] = Boolean(mask & (1 << bit));
      });
      return expr.value(values) === known;
    });
  const canV = works(true);
  const canF = works(false);
  if (canV && canF) return '?';
  return canV ? 'V' : 'F';
}

function detectiveWhy(expr, known, facts, ask, answer) {
  const factText = Object.entries(facts).map(([name, value]) => `${name} é ${VF(value)}`).join(' e ');
  const given = factText ? `Como ${factText}, ` : '';
  if (answer === '?') return `${given}a pista V(${expr.text}) = ${VF(known)} vale tanto com ${ask} = V quanto com ${ask} = F. Não dá para saber.`;
  const other = answer === 'V' ? 'F' : 'V';
  return `${given ? `${given}se` : 'Se'} ${ask} fosse ${other}, ${expr.text} não poderia ser ${VF(known)}. Então ${ask} só pode ser ${answer}.`;
}

function detective(key, kase, id, hint) {
  const expr = exprOf(key);
  const answer = deduce(expr, kase.known, kase.facts, kase.ask);
  return {
    id,
    kind: 'detective',
    clues: [clue(expr.text, kase.known), ...Object.entries(kase.facts).map(([name, value]) => clue(name, value))],
    ask: kase.ask,
    answer,
    why: detectiveWhy(expr, kase.known, kase.facts, kase.ask, answer),
    hint: hint ?? METHOD_HINT,
  };
}

const DETECTIVE_PLAN = {
  easy: [['or2', 0], ['or2', 3], ['or2', 2], ['or2', 1]],
  medium: [['or2', 'any'], ['or2', 'any'], ['and2', 'any'], ['or2', 2]],
  hard: [['or3', 'any'], ['andOr', 'any'], ['orAnd', 'any'], ['andOr', 'any']],
};

function makeDetective(difficulty, round) {
  const used = new Set();
  const items = DETECTIVE_PLAN[difficulty].map(([key, which], index) => {
    const options = CASES[key].map((_, position) => position).filter((position) => !used.has(`${key}-${position}`));
    const position = which === 'any' ? pick(options) : which;
    used.add(`${key}-${position}`);
    const hint = difficulty === 'easy' ? `Lembre: p ∨ q só é F quando as duas partes são F. ${METHOD_HINT}` : undefined;
    return detective(key, CASES[key][position], `r${round}-d${index}`, hint);
  });
  return { kind: 'detective', items: shuffle(items) };
}

// ---------- Questões por dificuldade ----------
function makeBuilds(difficulty, round) {
  const id = (n) => `r${round}-b${n}`;
  if (difficulty === 'easy') {
    return round === 1
      ? [build('easy', 'or2', false, null, id(0)), build('easy', 'or2', true, null, id(1))]
      : [build('easy', 'or2', true, { p: false }, id(0)), build('easy', 'or2', true, { p: true, q: true }, id(1))];
  }
  if (difficulty === 'medium') {
    return round === 1
      ? [build('medium', 'or2', false, null, id(0)), build('medium', 'or2', true, { q: false }, id(1))]
      : [build('medium', 'or3', false, null, id(0)), build('medium', 'or3', true, { p: false, r: false }, id(1))];
  }
  return round === 1
    ? [build('hard', 'andOr', true, { r: false }, id(0)), build('hard', 'orAnd', false, { p: true }, id(1))]
    : [build('hard', 'andOr', false, { r: false }, id(0), [4, 3]), build('hard', 'orAnd', true, { q: false }, id(1))];
}

/** Questão 1: Monte. Questão 2: Detetive. Questão 3: Monte, mais difícil. */
export function generateOrRounds(difficulty) {
  const id = FACT_KINDS[difficulty] ? difficulty : 'easy';
  return [
    { id: 'round-1', kind: 'build', items: makeBuilds(id, 1) },
    { id: 'round-2', ...makeDetective(id, 2) },
    { id: 'round-3', kind: 'build', items: makeBuilds(id, 3) },
  ];
}

/** Aquecimento guiado (igual em todas as dificuldades). Sem símbolos nas falas do Pipo. */
export function orWarmup() {
  const cards = [
    { id: 'w-c0', text: '6 é par.', value: true, why: '6 é par' },
    { id: 'w-c1', text: '6 > 10.', value: false, why: '6 < 10' },
    { id: 'w-c2', text: '3 + 3 = 7.', value: false, why: '3 + 3 = 6' },
    { id: 'w-c3', text: '6 é múltiplo de 3.', value: true, why: '6 = 3 · 2' },
  ];
  return {
    id: 'warmup',
    kind: 'mixed',
    items: [
      {
        id: 'w0',
        kind: 'build',
        expr: 'or2',
        target: true,
        require: {},
        cards,
        hint: BUILD_HINT.or2,
        talk: 'Este símbolo, parecido com um V, se lê “ou”. A frase “p ou q” é verdadeira quando pelo menos uma parte é verdadeira. Escolha duas cartas para montar uma frase verdadeira.',
        done: 'Isso! Basta uma parte verdadeira para “p ou q” ser verdadeira. E, na lógica, as duas também podem ser verdadeiras.',
      },
      {
        id: 'w1',
        kind: 'build',
        expr: 'or2',
        target: false,
        require: {},
        cards,
        hint: BUILD_HINT.or2,
        talk: 'Agora o contrário: monte uma frase “p ou q” falsa. Qual é o único jeito?',
        done: 'Isso! O “ou” só é falso quando as duas partes são falsas.',
      },
      {
        ...detective('or2', CASES.or2[0], 'w2'),
        talk: 'Agora você é o detetive. Sabemos que “p ou q” é verdadeira e que p é falsa. O que dá para concluir sobre q?',
        done: 'Isso! Se p é falsa e “p ou q” é verdadeira, q tem que ser verdadeira. Às vezes as pistas não bastam: aí a resposta é “não dá para saber”.',
      },
    ],
  };
}
