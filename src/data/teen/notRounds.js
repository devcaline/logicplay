/**
 * Laboratório, fase 4, para 13 anos ou mais: a negação (¬, "não").
 * ¬p diz o contrário de p e sempre tem o valor oposto. O desafio é negar direito:
 * o contrário de ">" é "≤", o contrário de "todo" é "existe um que não"; no Difícil, De Morgan.
 *
 * Duas dinâmicas diferentes das fases 2 e 3:
 *  - match (Pares): ligar cada frase à sua negação. No Médio e no Difícil, `extra` é uma carta-armadilha
 *    na coluna das negações, que não combina com nenhuma frase. { kind: 'match', pairs, extra, hint }
 *  - choose (Negação certa): escolher, entre frases parecidas, a negação correta.
 *    { kind: 'choose', p, options: [{ text, correct }], why, hint, value? }
 */
import { range, pick, shuffle, isPrime } from './andRounds.js';

const randSet = () => shuffle(range(1, 12)).slice(0, 4).sort((x, y) => x - y);
const braces = (set) => `{${set.join(', ')}}`;

// ---------- Negações simples (para os Pares) ----------
const SIMPLE = {
  parity: () => {
    const n = pick(range(3, 40));
    return { p: `${n} é par.`, neg: `${n} é ímpar.`, value: n % 2 === 0 };
  },
  equal: () => {
    const a = pick(range(3, 20));
    const b = pick(range(3, 20));
    const c = a + b + pick([0, 0, 1]);
    return { p: `${a} + ${b} = ${c}.`, neg: `${a} + ${b} ≠ ${c}.`, value: a + b === c };
  },
  member: () => {
    const set = randSet();
    const n = pick(range(1, 12));
    return { p: `${n} ∈ ${braces(set)}.`, neg: `${n} ∉ ${braces(set)}.`, value: set.includes(n) };
  },
  greater: () => {
    const a = pick(range(2, 30));
    const b = pick(range(2, 30));
    return { p: `${a} > ${b}.`, neg: `${a} ≤ ${b}.`, trap: `${a} < ${b}.`, value: a > b };
  },
  less: () => {
    const k = pick(range(5, 20));
    return { p: `x < ${k}`, neg: `x ≥ ${k}`, trap: `x > ${k}` };
  },
  prime: () => {
    const n = pick(range(2, 30));
    return { p: `${n} é primo.`, neg: `${n} não é primo.`, value: isPrime(n) };
  },
  all: () =>
    pick([
      { p: 'Todo número primo é ímpar.', neg: 'Existe um número primo que não é ímpar.', trap: 'Nenhum número primo é ímpar.' },
      { p: 'Todo quadrado é par.', neg: 'Existe um quadrado que não é par.', trap: 'Nenhum quadrado é par.' },
      { p: 'Todo múltiplo de 6 é par.', neg: 'Existe um múltiplo de 6 que não é par.', trap: 'Nenhum múltiplo de 6 é par.' },
    ]),
  exists: () =>
    pick([
      { p: 'Existe um número par maior que 100.', neg: 'Nenhum número par é maior que 100.' },
      { p: 'Existe um primo entre 20 e 22.', neg: 'Nenhum número entre 20 e 22 é primo.' },
      { p: 'Existe um natural x com x + 3 = 1.', neg: 'Nenhum natural x tem x + 3 = 1.' },
    ]),
};

// ---------- Negação certa (com armadilhas) ----------
const valueNote = (value) =>
  value === undefined ? '' : ` Como p é ${value ? 'V' : 'F'}, ¬p é ${value ? 'F' : 'V'}: a negação sempre troca o valor.`;

const CHOOSE = {
  greater: () => {
    const a = pick(range(2, 30));
    const b = pick(range(2, 30).filter((x) => x !== a));
    return {
      p: `${a} > ${b}.`,
      options: [
        { text: `${a} ≤ ${b}.`, correct: true },
        { text: `${a} < ${b}.`, correct: false },
        { text: `${a} ≥ ${b}.`, correct: false },
      ],
      why: `O contrário de “maior que” é “menor ou igual”: ${a} < ${b} esquece o caso ${a} = ${b}.${valueNote(a > b)}`,
      hint: 'O contrário de “maior que” precisa cobrir todos os outros casos. Quais são eles?',
    };
  },
  less: () => {
    const k = pick(range(5, 20));
    return {
      p: `x < ${k}`,
      options: [
        { text: `x ≥ ${k}`, correct: true },
        { text: `x > ${k}`, correct: false },
        { text: `x ≤ ${k}`, correct: false },
      ],
      why: `Se x não é menor que ${k}, então x é igual ou maior: x ≥ ${k}. A opção x > ${k} esquece o x = ${k}.`,
      hint: `Pense em x = ${k}: ele é menor que ${k}? Então ele precisa estar na negação.`,
    };
  },
  geq: () => {
    const a = pick(range(2, 30));
    const b = pick(range(2, 30).filter((x) => x !== a));
    return {
      p: `${a} ≥ ${b}.`,
      options: [
        { text: `${a} < ${b}.`, correct: true },
        { text: `${a} ≤ ${b}.`, correct: false },
        { text: `${a} > ${b}.`, correct: false },
      ],
      why: `O contrário de “maior ou igual” é “menor”: ${a} ≤ ${b} incluiria o caso de igualdade, que pertence a p.${valueNote(a >= b)}`,
      hint: 'O caso de igualdade já está dentro de p. Ele pode estar também na negação?',
    };
  },
  equal: () => {
    const a = pick(range(3, 20));
    const b = pick(range(3, 20));
    const c = a + b + pick([0, 1]);
    return {
      p: `${a} + ${b} = ${c}.`,
      options: [
        { text: `${a} + ${b} ≠ ${c}.`, correct: true },
        { text: `${a} + ${b} = ${c + 1}.`, correct: false },
        { text: `${a} − ${b} = ${c}.`, correct: false },
      ],
      why: `A negação de “=” é “≠”. Trocar o número ou a conta cria outra frase, não o contrário desta.${valueNote(a + b === c)}`,
      hint: 'A negação diz exatamente “não é assim”. Mudar os números diz o contrário?',
    };
  },
  member: () => {
    const set = randSet();
    const n = pick(range(1, 12));
    return {
      p: `${n} ∈ ${braces(set)}.`,
      options: [
        { text: `${n} ∉ ${braces(set)}.`, correct: true },
        { text: `${n} ∈ ${braces(range(1, 12).filter((x) => !set.includes(x)).slice(0, 4))}.`, correct: false },
        { text: `${n + 1} ∈ ${braces(set)}.`, correct: false },
      ],
      why: `A negação de “pertence” é “não pertence”: ∉. As outras frases falam de outro conjunto ou de outro número.${valueNote(set.includes(n))}`,
      hint: 'A negação fala do mesmo número e do mesmo conjunto. O que muda é só o símbolo.',
    };
  },
  parity: () => {
    const n = pick(range(3, 40));
    return {
      p: `${n} é par.`,
      options: [
        { text: `${n} é ímpar.`, correct: true },
        { text: `${n + 1} é par.`, correct: false },
        { text: `${n} é múltiplo de 2.`, correct: false },
      ],
      why: `Todo natural é par ou ímpar, nunca os dois. Então “não é par” é o mesmo que “é ímpar”.${valueNote(n % 2 === 0)}`,
      hint: 'Um número que não é par só pode ser o quê?',
    };
  },
  double: () => {
    const n = pick(range(2, 30));
    return {
      p: `¬(${n} não é primo).`,
      options: [
        { text: `${n} é primo.`, correct: true },
        { text: `${n} não é primo.`, correct: false },
        { text: `${n} é par.`, correct: false },
      ],
      prompt: 'Qual frase diz o mesmo que esta?',
      why: `Negar duas vezes volta ao começo: ¬(¬p) = p. Negar “${n} não é primo” dá “${n} é primo”.`,
      hint: 'A frase de dentro já tem um “não”. O que acontece quando você nega uma negação?',
    };
  },
  all: () =>
    pick([
      ['Todo número primo é ímpar.', 'Existe um número primo que não é ímpar.', 'Nenhum número primo é ímpar.', 'Todo número primo é par.'],
      ['Todo múltiplo de 4 é par.', 'Existe um múltiplo de 4 que não é par.', 'Nenhum múltiplo de 4 é par.', 'Todo múltiplo de 4 é ímpar.'],
      ['Todo quadrado é maior que 1.', 'Existe um quadrado que não é maior que 1.', 'Nenhum quadrado é maior que 1.', 'Todo quadrado é menor que 1.'],
    ]).reduce((p, text, index) => (index === 0 ? { p: text, options: [] } : { ...p, options: [...p.options, { text, correct: index === 1 }] }), null),
  exists: () =>
    pick([
      ['Existe um número par maior que 100.', 'Nenhum número par é maior que 100.', 'Existe um número par menor que 100.', 'Existe um número ímpar maior que 100.'],
      ['Existe um primo par.', 'Nenhum primo é par.', 'Existe um primo ímpar.', 'Todo primo é par.'],
      ['Existe um múltiplo de 7 entre 50 e 55.', 'Nenhum múltiplo de 7 está entre 50 e 55.', 'Existe um múltiplo de 7 fora de 50 a 55.', 'Todo múltiplo de 7 está entre 50 e 55.'],
    ]).reduce((p, text, index) => (index === 0 ? { p: text, options: [] } : { ...p, options: [...p.options, { text, correct: index === 1 }] }), null),
  deMorganAnd: () => {
    const k = pick(range(4, 12));
    return {
      p: `¬(x é par ∧ x > ${k})`,
      prompt: 'Qual frase diz o mesmo que esta?',
      options: [
        { text: `x é ímpar ∨ x ≤ ${k}`, correct: true },
        { text: `x é ímpar ∧ x ≤ ${k}`, correct: false },
        { text: `x é ímpar ∨ x < ${k}`, correct: false },
      ],
      why: `De Morgan: ¬(p ∧ q) = ¬p ∨ ¬q. Para “par e maior que ${k}” falhar, basta uma parte falhar: x é ímpar OU x ≤ ${k}.`,
      hint: 'Para uma frase com “e” ser falsa, as duas partes precisam falhar ou basta uma? Lembre também do caso de igualdade.',
    };
  },
  deMorganOr: () => {
    const k = pick(range(4, 12));
    return {
      p: `¬(x é primo ∨ x < ${k})`,
      prompt: 'Qual frase diz o mesmo que esta?',
      options: [
        { text: `x não é primo ∧ x ≥ ${k}`, correct: true },
        { text: `x não é primo ∨ x ≥ ${k}`, correct: false },
        { text: `x não é primo ∧ x > ${k}`, correct: false },
      ],
      why: `De Morgan: ¬(p ∨ q) = ¬p ∧ ¬q. Para “primo ou menor que ${k}” ser falsa, as duas partes precisam ser falsas: x não é primo E x ≥ ${k}.`,
      hint: 'Para uma frase com “ou” ser falsa, basta uma parte falhar ou as duas precisam falhar?',
    };
  },
  deMorganAbstract: () =>
    pick([
      {
        p: '¬(p ∧ q)',
        prompt: 'Qual expressão é equivalente?',
        options: [
          { text: '¬p ∨ ¬q', correct: true },
          { text: '¬p ∧ ¬q', correct: false },
          { text: 'p ∨ q', correct: false },
        ],
        why: 'De Morgan: negar um “e” vira um “ou” das negações. ¬(p ∧ q) = ¬p ∨ ¬q.',
        hint: 'Teste p = V e q = F: quanto vale ¬(p ∧ q)? E cada opção?',
      },
      {
        p: '¬(p ∨ q)',
        prompt: 'Qual expressão é equivalente?',
        options: [
          { text: '¬p ∧ ¬q', correct: true },
          { text: '¬p ∨ ¬q', correct: false },
          { text: 'p ∧ q', correct: false },
        ],
        why: 'De Morgan: negar um “ou” vira um “e” das negações. ¬(p ∨ q) = ¬p ∧ ¬q.',
        hint: 'Teste p = V e q = F: quanto vale ¬(p ∨ q)? E cada opção?',
      },
    ]),
};

const QUANT_WHY = {
  all: 'Para derrubar um “todo”, basta um exemplo que não cumpre a regra. Por isso a negação é “existe um que não…”. O “nenhum” vai longe demais.',
  exists: 'Negar “existe” é dizer que não há nenhum. A outra frase com “existe” fala de outra coisa, e o “todo” vai longe demais.',
};
const QUANT_HINT = {
  all: 'O que basta mostrar para provar que um “todo” é falso: que nenhum cumpre a regra, ou que um não cumpre?',
  exists: 'Se não existe nenhum exemplo, como você diria isso?',
};

function chooseItem(kind, id) {
  const made = CHOOSE[kind]();
  const extra = kind === 'all' || kind === 'exists' ? { why: QUANT_WHY[kind], hint: QUANT_HINT[kind] } : {};
  return { id, kind: 'choose', prompt: 'Qual é a negação desta frase?', ...made, ...extra, options: shuffle(made.options) };
}

function matchRound(kinds, round, withTrap) {
  const used = new Set();
  const pairs = kinds.map((kind, index) => {
    let made;
    do made = SIMPLE[kind]();
    while (used.has(made.p));
    used.add(made.p);
    return { id: `r${round}-m${index}`, p: made.p, neg: made.neg, trap: made.trap };
  });
  const trapFrom = withTrap ? pick(pairs.filter((pair) => pair.trap)) : null;
  const extra = trapFrom ? { id: `r${round}-trap`, neg: trapFrom.trap, of: trapFrom.p } : null;
  return {
    id: `round-${round}`,
    kind: 'match',
    items: [{ id: `r${round}-match`, kind: 'match', pairs: pairs.map(({ trap, ...pair }) => pair), extra, hint: 'A negação diz exatamente o contrário, falando do mesmo número e do mesmo conjunto. Cuidado: o contrário de “>” é “≤”, e o de “todo” é “existe um que não”.' }],
  };
}

const PLANS = {
  easy: {
    match: ['parity', 'equal', 'member', 'greater'],
    choose2: ['equal', 'member', 'parity', 'greater'],
    choose3: ['greater', 'geq', 'less', 'double'],
  },
  medium: {
    match: ['greater', 'member', 'less', 'prime'],
    choose2: ['greater', 'geq', 'less', 'double'],
    choose3: ['all', 'exists', 'all', 'exists'],
  },
  hard: {
    match: ['greater', 'less', 'all', 'exists'],
    choose2: ['all', 'exists', 'geq', 'double'],
    choose3: ['deMorganAnd', 'deMorganOr', 'deMorganAbstract', 'deMorganAbstract'],
  },
};

/** Questão 1: Pares. Questões 2 e 3: Negação certa, cada vez mais difícil. */
export function generateNotRounds(difficulty) {
  const plan = PLANS[difficulty] ?? PLANS.easy;
  const chooseRound = (kinds, round) => {
    const used = new Set();
    const items = kinds.map((kind, index) => {
      let item;
      let attempts = 0;
      do item = chooseItem(kind, `r${round}-c${index}`);
      while (used.has(item.p) && (attempts += 1) < 30);
      used.add(item.p);
      return item;
    });
    return { id: `round-${round}`, kind: 'choose', items: shuffle(items) };
  };
  return [matchRound(plan.match, 1, difficulty !== 'easy'), chooseRound(plan.choose2, 2), chooseRound(plan.choose3, 3)];
}

/** Aquecimento guiado (igual em todas as dificuldades). Sem símbolos nas falas do Pipo. */
export function notWarmup() {
  return {
    id: 'warmup',
    kind: 'choose',
    items: [
      {
        id: 'w0',
        kind: 'choose',
        prompt: 'Qual é a negação desta frase?',
        p: '8 é par.',
        options: [
          { text: '8 é múltiplo de 2.', correct: false },
          { text: '8 é ímpar.', correct: true },
          { text: '9 é par.', correct: false },
        ],
        why: 'Um número que não é par é ímpar. A negação fala do mesmo 8 e diz o contrário.',
        hint: 'Um número que não é par só pode ser o quê?',
        talk: 'Negar uma frase é dizer o contrário dela. O símbolo da negação parece um gancho e se lê “não”. Qual destas frases diz o contrário de “8 é par”?',
        done: 'Isso! “8 é ímpar” diz exatamente o contrário de “8 é par”.',
      },
      {
        id: 'w1',
        kind: 'choose',
        prompt: 'Qual é a negação desta frase?',
        p: '5 > 3.',
        options: [
          { text: '5 < 3.', correct: false },
          { text: '5 ≤ 3.', correct: true },
          { text: '5 ≥ 3.', correct: false },
        ],
        why: 'O contrário de “maior que” é “menor ou igual”. Só “menor que” esquece o caso em que os números são iguais.',
        hint: 'O contrário de “maior que” precisa cobrir todos os outros casos. Quais são eles?',
        talk: 'Agora uma armadilha clássica. O contrário de “maior que” não é só “menor que”: os números também podem ser iguais. Qual opção cobre os dois casos?',
        done: 'Isso! O contrário de “maior que” é “menor ou igual”.',
      },
      {
        id: 'w2',
        kind: 'choose',
        prompt: 'Qual é a negação desta frase?',
        p: 'Todo número primo é ímpar.',
        options: [
          { text: 'Nenhum número primo é ímpar.', correct: false },
          { text: 'Existe um número primo que não é ímpar.', correct: true },
          { text: 'Todo número primo é par.', correct: false },
        ],
        why: 'Para derrubar um “todo”, basta um exemplo que não cumpre a regra: o 2 é primo e não é ímpar.',
        hint: 'Para mostrar que um “todo” está errado, basta um exemplo ou precisa de todos?',
        talk: 'Por último: como negar uma frase com “todo”? Pense no que basta para mostrar que ela está errada.',
        done: 'Isso! Para negar um “todo”, basta existir um que não cumpre a regra, como o 2.',
      },
    ],
  };
}
