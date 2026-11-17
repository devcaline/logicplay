/**
 * Laboratório, fase 5, para 13 anos ou mais: a Tabela Mestra (tabelas-verdade completas).
 * Três dinâmicas, diferentes das fases anteriores:
 *  - which (Qual fórmula?): a tabela mostra a coluna de resultados; o jogador escolhe a fórmula que a gera.
 *  - classify: tautologia (sempre V), contradição (sempre F) ou contingência (depende).
 *  - equiv (Equivalentes?): as duas fórmulas têm a mesma coluna? Se não, apontar a linha que prova.
 * No Difícil, as tabelas têm 3 variáveis (8 linhas).
 *
 * As fórmulas são escritas como texto (¬, ∧, ∨, parênteses, p, q, r) e avaliadas por um parser.
 */
import { pick, shuffle } from './andRounds.js';

// ---------- Parser: ¬ antes de ∧, ∧ antes de ∨ ----------
function parse(text) {
  const tokens = text.replace(/\s+/g, '').split('');
  let position = 0;
  const peek = () => tokens[position];
  const take = () => tokens[position++];
  const parseOr = () => {
    let node = parseAnd();
    while (peek() === '∨') {
      take();
      const left = node;
      const right = parseAnd();
      node = (v) => left(v) || right(v);
    }
    return node;
  };
  const parseAnd = () => {
    let node = parseNot();
    while (peek() === '∧') {
      take();
      const left = node;
      const right = parseNot();
      node = (v) => left(v) && right(v);
    }
    return node;
  };
  const parseNot = () => {
    if (peek() === '¬') {
      take();
      const inner = parseNot();
      return (v) => !inner(v);
    }
    if (peek() === '(') {
      take();
      const inner = parseOr();
      take(); // ')'
      return inner;
    }
    const name = take();
    return (v) => v[name];
  };
  const fn = parseOr();
  if (position !== tokens.length) throw new Error(`Fórmula inválida: ${text}`);
  return fn;
}

export function tableRows(vars) {
  const count = 2 ** vars.length;
  return Array.from({ length: count }, (_, index) =>
    Object.fromEntries(vars.map((name, position) => [name, !((index >> (vars.length - 1 - position)) & 1)])),
  );
}

export const columnOf = (formula, vars) => tableRows(vars).map(parse(formula));
const pattern = (formula, vars) => columnOf(formula, vars).map((value) => (value ? 'V' : 'F')).join('');
const distance = (a, b) => [...a].filter((char, index) => char !== b[index]).length;

// ---------- Qual fórmula? ----------
const WHICH_POOL = {
  easy: ['p ∧ q', 'p ∨ q', '¬p', '¬q', 'p ∧ ¬q', '¬p ∧ q', '¬p ∨ q', 'p ∨ ¬q', '¬p ∧ ¬q'],
  medium: ['¬(p ∧ q)', '¬(p ∨ q)', '¬p ∨ q', 'p ∨ ¬q', '¬p ∧ ¬q', '(p ∨ q) ∧ ¬(p ∧ q)', 'p ∧ q', 'p ∨ q', '(p ∧ q) ∨ (¬p ∧ ¬q)'],
  hard: ['(p ∧ q) ∨ r', 'p ∧ (q ∨ r)', 'p ∨ (q ∧ r)', '(p ∨ q) ∧ ¬r', '¬p ∧ (q ∨ r)', 'p ∧ q ∧ r', 'p ∨ q ∨ r', '(p ∨ r) ∧ q', '¬(p ∨ q) ∨ r', '(p ∧ ¬q) ∨ (q ∧ r)'],
};

function makeWhich(difficulty, vars, id, used) {
  const pool = WHICH_POOL[difficulty];
  const target = pick(pool.filter((formula) => !used.has(formula)));
  used.add(target);
  const targetPattern = pattern(target, vars);
  const seen = new Set([targetPattern]);
  // Distratores parecidos: os mais próximos da coluna certa, sem colunas repetidas.
  const distractors = shuffle(pool.filter((formula) => formula !== target))
    .sort((a, b) => distance(pattern(a, vars), targetPattern) - distance(pattern(b, vars), targetPattern))
    .filter((formula) => {
      const key = pattern(formula, vars);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, 3);
  const trues = columnOf(target, vars).filter(Boolean).length;
  return {
    id,
    kind: 'which',
    vars,
    column: columnOf(target, vars),
    answer: target,
    options: shuffle([target, ...distractors]),
    why: `A coluna de ${target} tem V em ${trues === 1 ? '1 linha' : `${trues} linhas`}, exatamente onde a coluna misteriosa tem V.`,
    hint:
      difficulty === 'hard'
        ? 'Compare as opções linha por linha. Procure uma linha em que só uma delas combina com a coluna misteriosa.'
        : 'Olhe as linhas com V na coluna misteriosa. O que p e q têm em comum nessas linhas?',
  };
}

// ---------- Tautologia, contradição ou contingência ----------
const CLASSIFY_POOL = {
  easy: ['p ∨ ¬p', 'p ∧ ¬p', 'p ∨ q', 'p ∧ ¬q', '¬(p ∧ ¬p)', 'q ∧ ¬q', '¬p ∨ q', 'q ∨ ¬q'],
  medium: ['(p ∧ q) ∨ ¬p ∨ ¬q', '(p ∨ q) ∧ ¬p ∧ ¬q', '¬p ∨ q', '¬(p ∨ q)', '(p ∧ q) ∧ ¬q', '¬(p ∧ q) ∨ p', '(p ∨ q) ∨ ¬q', '(p ∧ ¬q) ∨ (¬p ∧ q)'],
  hard: ['p ∨ ¬(p ∧ r)', '(p ∨ q ∨ r) ∨ (¬p ∧ ¬q ∧ ¬r)', '(p ∨ q) ∧ ¬p ∧ ¬q ∧ r', '(p ∧ r) ∧ ¬(p ∨ q)', '(p ∧ q) ∨ r', '¬p ∧ (q ∨ r)', '(p ∧ q) ∨ ¬p ∨ ¬q', 'p ∧ (q ∨ ¬q) ∧ ¬r'],
};
export const CLASSES = {
  taut: { label: 'Tautologia', caption: 'sempre V' },
  contra: { label: 'Contradição', caption: 'sempre F' },
  conting: { label: 'Contingência', caption: 'depende da linha' },
};
const classOf = (column) => (column.every(Boolean) ? 'taut' : column.every((value) => !value) ? 'contra' : 'conting');

function makeClassify(difficulty, vars, formula, id) {
  const column = columnOf(formula, vars);
  const answer = classOf(column);
  const why = {
    taut: `${formula} dá V em todas as ${column.length} linhas: é uma tautologia.`,
    contra: `${formula} dá F em todas as ${column.length} linhas: é uma contradição.`,
    conting: `${formula} dá V em algumas linhas e F em outras: é uma contingência.`,
  }[answer];
  return {
    id,
    kind: 'classify',
    vars,
    formula,
    column,
    answer,
    why,
    hint: 'Calcule a fórmula em cada linha (use o rascunho, se quiser). Se todas derem V, todas derem F, ou se houver dos dois, você já sabe a resposta.',
  };
}

function classifyRound(difficulty, vars, round) {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    const formulas = shuffle(CLASSIFY_POOL[difficulty]).slice(0, 3);
    const items = formulas.map((formula, index) => makeClassify(difficulty, vars, formula, `r${round}-k${index}`));
    if (new Set(items.map((item) => item.answer)).size >= 2) return items;
  }
  return CLASSIFY_POOL[difficulty].slice(0, 3).map((formula, index) => makeClassify(difficulty, vars, formula, `r${round}-k${index}`));
}

// ---------- Equivalentes? ----------
const EQUIV_POOL = {
  easy: [['¬(¬p)', 'p'], ['p ∧ q', 'q ∧ p'], ['p ∨ q', 'q ∨ p'], ['p ∨ q', 'p ∧ q'], ['p ∧ ¬q', '¬q ∧ p'], ['¬p ∨ q', 'p ∨ ¬q'], ['¬p', 'p ∧ ¬q']],
  medium: [['¬(p ∧ q)', '¬p ∨ ¬q'], ['¬(p ∧ q)', '¬p ∧ ¬q'], ['¬(p ∨ q)', '¬p ∧ ¬q'], ['¬(p ∨ q)', '¬p ∨ ¬q'], ['p ∨ (p ∧ q)', 'p'], ['p ∧ (p ∨ q)', 'q']],
  hard: [
    ['p ∧ (q ∨ r)', '(p ∧ q) ∨ (p ∧ r)'],
    ['p ∨ (q ∧ r)', '(p ∨ q) ∧ (p ∨ r)'],
    ['p ∨ (q ∧ r)', '(p ∨ q) ∧ r'],
    ['p ∧ (q ∨ r)', '(p ∧ q) ∨ r'],
    ['¬(p ∧ q ∧ r)', '¬p ∨ ¬q ∨ ¬r'],
    ['¬(p ∨ q) ∧ r', '¬p ∧ ¬q ∧ r'],
    ['¬(p ∧ q) ∨ r', '¬p ∧ ¬q ∨ r'],
  ],
};

function makeEquiv(vars, [a, b], id) {
  const colA = columnOf(a, vars);
  const colB = columnOf(b, vars);
  const differ = colA.map((value, index) => (value !== colB[index] ? index : -1)).filter((index) => index >= 0);
  return {
    id,
    kind: 'equiv',
    vars,
    a,
    b,
    colA,
    colB,
    equivalent: differ.length === 0,
    differ,
    why: differ.length
      ? `Não são equivalentes: as colunas diferem em ${differ.length === 1 ? '1 linha' : `${differ.length} linhas`}. Uma linha diferente já basta como prova.`
      : `São equivalentes: as duas colunas são iguais em todas as ${colA.length} linhas.`,
    hint: 'Calcule as duas fórmulas em cada linha (o rascunho ajuda). Se alguma linha der valores diferentes, elas não são equivalentes.',
  };
}

function equivRound(difficulty, vars, round) {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    const pairs = shuffle(EQUIV_POOL[difficulty]).slice(0, 3);
    const items = pairs.map((pair, index) => makeEquiv(vars, shuffle(pair), `r${round}-e${index}`));
    if (items.some((item) => item.equivalent) && items.some((item) => !item.equivalent)) return items;
  }
  return EQUIV_POOL[difficulty].slice(0, 3).map((pair, index) => makeEquiv(vars, pair, `r${round}-e${index}`));
}

/** Questão 1: Qual fórmula? Questão 2: classificar. Questão 3: equivalentes? */
export function generateMasterRounds(difficulty) {
  const id = WHICH_POOL[difficulty] ? difficulty : 'easy';
  const vars = id === 'hard' ? ['p', 'q', 'r'] : ['p', 'q'];
  const used = new Set();
  return [
    { id: 'round-1', kind: 'which', items: [0, 1, 2].map((n) => makeWhich(id, vars, `r1-w${n}`, used)) },
    { id: 'round-2', kind: 'classify', items: classifyRound(id, vars, 2) },
    { id: 'round-3', kind: 'equiv', items: equivRound(id, vars, 3) },
  ];
}

/** Aquecimento guiado com uma só variável. Sem símbolos nas falas do Pipo. */
export function masterWarmup() {
  const vars = ['p'];
  return {
    id: 'warmup',
    kind: 'mixed',
    items: [
      {
        ...makeWhich('easy', vars, 'w0', new Set()),
        column: columnOf('¬p', vars),
        answer: '¬p',
        options: ['p', '¬p', 'p ∨ ¬p'],
        why: 'A coluna é o contrário de p: é a negação de p.',
        hint: 'Quando p é V, o resultado é F. Quando p é F, o resultado é V. Qual fórmula faz isso?',
        talk: 'Bem-vindo à Tabela Mestra! Cada linha é uma combinação de valores. A coluna misteriosa mostra o resultado de uma fórmula. Ela dá F quando p é verdadeira e V quando p é falsa. Qual fórmula é essa?',
        done: 'Isso! A negação de p troca cada valor da coluna de p.',
      },
      {
        ...makeClassify('easy', vars, 'p ∨ ¬p', 'w1'),
        talk: 'Algumas fórmulas são verdadeiras em todas as linhas: são as tautologias. As sempre falsas são contradições. As que mudam conforme a linha são contingências. Toque no rascunho para anotar, se quiser. E esta fórmula, “p ou não p”?',
        done: 'Isso! “p ou não p” é sempre verdadeira: ou p vale, ou a negação dela vale. É uma tautologia.',
      },
      {
        ...makeEquiv(vars, ['¬(¬p)', 'p'], 'w2'),
        talk: 'Duas fórmulas são equivalentes quando têm a mesma coluna, linha por linha. Negar p duas vezes dá o mesmo que p?',
        done: 'Isso! Negar duas vezes volta ao começo: as duas colunas são iguais.',
      },
    ],
  };
}
