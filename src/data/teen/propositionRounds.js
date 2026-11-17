/**
 * Laboratório, fase 1, para 13 anos ou mais: proposições.
 * Cada frase é classificada como V (proposição verdadeira), F (proposição falsa)
 * ou N (não é proposição: pergunta, ordem, exclamação, sentença aberta ou paradoxo).
 *
 * Uma frase: { id, text, answer: 'V' | 'F' | 'N', why, hint }
 * Uma questão: { id, items }
 */

const range = (from, to) => Array.from({ length: to - from + 1 }, (_, index) => from + index);
const pick = (list) => list[Math.floor(Math.random() * list.length)];
const shuffle = (list) => [...list].sort(() => Math.random() - 0.5);
const coin = () => Math.random() < 0.5;
const isPrime = (n) => n > 1 && range(2, Math.floor(Math.sqrt(n))).every((d) => n % d !== 0);

const PROP_HINT = 'É uma afirmação sobre números, com um único valor. Confira a conta ou a regra para saber se é V ou F.';
const prop = (text, value, why, hint = PROP_HINT) => ({ text, answer: value ? 'V' : 'F', why, hint });
const notProp = (text, why, hint) => ({ text, answer: 'N', why, hint });

// ---------- Proposições ----------
const PROPS = {
  parity: () => {
    const n = pick(range(2, 40));
    const saysEven = coin();
    return prop(`${n} é ${saysEven ? 'par' : 'ímpar'}.`, (n % 2 === 0) === saysEven, `${n} é ${n % 2 === 0 ? 'par' : 'ímpar'}.`);
  },
  compare: () => {
    const a = pick(range(3, 60));
    const b = pick(range(3, 60).filter((x) => x !== a));
    return prop(`${a} é maior que ${b}.`, a > b, `${a} ${a > b ? '>' : '<'} ${b}.`);
  },
  multiple: () => {
    const k = pick([3, 4, 5, 6]);
    const n = coin() ? k * pick(range(2, 9)) : k * pick(range(2, 9)) + pick([1, 2]);
    return prop(`${n} é múltiplo de ${k}.`, n % k === 0, n % k === 0 ? `${n} = ${k} · ${n / k}.` : `${n} ÷ ${k} deixa resto ${n % k}.`);
  },
  sum: () => {
    const a = pick(range(4, 30));
    const b = pick(range(4, 30));
    const right = coin();
    const c = right ? a + b : a + b + pick([-2, -1, 1, 2]);
    return prop(`${a} + ${b} = ${c}.`, right, `${a} + ${b} = ${a + b}.`);
  },
  prime: () => {
    const n = pick([2, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33]);
    return prop(`${n} é primo.`, isPrime(n), isPrime(n) ? `${n} só é divisível por 1 e por ele mesmo.` : `${n} tem outros divisores além de 1 e ${n}.`);
  },
  member: () => {
    const set = shuffle(range(1, 12)).slice(0, 4).sort((x, y) => x - y);
    const inside = coin();
    const n = inside ? pick(set) : pick(range(1, 12).filter((x) => !set.includes(x)));
    const useNot = coin();
    const text = `${n} ${useNot ? '∉' : '∈'} {${set.join(', ')}}.`;
    const value = useNot ? !inside : inside;
    return prop(text, value, `${n} ${inside ? 'está' : 'não está'} entre os elementos do conjunto.`, 'É uma afirmação com valor definido: procure o número dentro das chaves e lembre que ∉ quer dizer “não pertence”.');
  },
  square: () => {
    const a = pick(range(3, 12));
    const right = coin();
    const c = right ? a * a : a * a + pick([-1, 1, a]);
    return prop(`${a}² = ${c}.`, right, `${a}² = ${a} · ${a} = ${a * a}.`);
  },
  quantifier: () =>
    pick([
      prop('Todo número par é divisível por 2.', true, 'Ser par é exatamente ser divisível por 2.', 'Frases com “todo” são proposições. Para ser V, a regra precisa valer para todos, sem exceção.'),
      prop('Todo número primo é ímpar.', false, 'O 2 é primo e é par: basta uma exceção para “todo” ser falso.', 'Frases com “todo” são proposições. Para ser V, não pode existir nenhuma exceção.'),
      prop('Existe um número natural que é par e primo.', true, 'O 2 é par e primo.', 'Frases com “existe” são proposições. Para ser V, basta encontrar um exemplo.'),
      prop('Todo múltiplo de 4 é múltiplo de 2.', true, 'Se n = 4k, então n = 2 · (2k).', 'Frases com “todo” são proposições. Pense: um múltiplo de 4 sempre pode ser dividido por 2?'),
      prop('Todo múltiplo de 2 é múltiplo de 4.', false, 'O 6 é múltiplo de 2, mas não de 4.', 'Frases com “todo” são proposições. Procure um exemplo que quebre a regra.'),
      prop('Existe um número natural maior que todos os outros.', false, 'Para qualquer natural n, o n + 1 é maior.', 'Frases com “existe” são proposições. Pense: dado um número, sempre dá para achar um maior?'),
    ]),
};

// ---------- Não proposições ----------
const NOT_PROPS = {
  question: () =>
    pick([
      notProp(`Quanto é ${pick(range(3, 9))} + ${pick(range(3, 9))}?`, 'É uma pergunta: não afirma nada, então não é V nem F.', 'Repare no ponto de interrogação. Uma pergunta afirma alguma coisa?'),
      notProp(`O ${pick(range(10, 40))} é par?`, 'É uma pergunta. A frase “o número é par” seria uma proposição; a pergunta não é.', 'Repare no ponto de interrogação. Perguntar não é afirmar.'),
      notProp('Qual é o maior número primo menor que 20?', 'É uma pergunta: não tem valor V ou F.', 'Repare no ponto de interrogação. Uma pergunta afirma alguma coisa?'),
    ]),
  order: () =>
    pick([
      notProp(`Some ${pick(range(2, 9))} a esse número.`, 'É uma ordem: não faz sentido dizer que uma ordem é verdadeira ou falsa.', 'É uma afirmação ou um pedido para fazer algo?'),
      notProp('Resolva a equação.', 'É uma ordem: não tem valor V ou F.', 'É uma afirmação ou um pedido para fazer algo?'),
      notProp('Escreva os divisores de 12.', 'É uma ordem: não afirma nada.', 'É uma afirmação ou um pedido para fazer algo?'),
    ]),
  exclaim: () =>
    pick([
      notProp('Que conta difícil!', 'É uma exclamação: expressa um sentimento, não afirma algo que possa ser V ou F.', 'Essa frase afirma um fato ou expressa uma emoção?'),
      notProp('Parabéns pela resposta!', 'É uma exclamação: não tem valor V ou F.', 'Essa frase afirma um fato ou expressa uma emoção?'),
    ]),
  open: () =>
    pick([
      (() => {
        const a = pick(range(2, 9));
        const b = a + pick(range(2, 9));
        return notProp(`x + ${a} = ${b}`, `É uma sentença aberta: o valor depende de x. Com x = ${b - a} é V, com outro x é F.`, 'O que é o x aqui? Sem saber o valor de x, dá para dizer se é V ou F?');
      })(),
      notProp('x é par.', 'É uma sentença aberta: depende do valor de x.', 'Sem saber quem é x, dá para dizer se é V ou F?'),
      (() => {
        const n = pick(range(3, 20));
        return notProp(`y > ${n}`, 'É uma sentença aberta: depende do valor de y.', 'Sem saber quem é y, dá para dizer se é V ou F?');
      })(),
      notProp('2x + 1 > 7', 'É uma sentença aberta: alguns valores de x deixam V, outros deixam F.', 'O valor dessa frase muda conforme o x?'),
    ]),
  paradox: () => notProp('Esta frase é falsa.', 'Se ela fosse V, seria F; se fosse F, seria V. Não dá para atribuir um valor: é um paradoxo, e não uma proposição.', 'Tente supor que ela é V. E se for F? Algum dos dois funciona?'),
};

const LEVELS = {
  easy: { props: ['parity', 'compare', 'multiple', 'sum'], nots: ['question', 'order', 'exclaim'], perRound: [3, 1] },
  medium: { props: ['parity', 'multiple', 'sum', 'prime', 'member'], nots: ['question', 'order', 'open', 'open'], perRound: [2, 2] },
  hard: { props: ['prime', 'member', 'square', 'quantifier', 'quantifier'], nots: ['open', 'open', 'paradox', 'question'], perRound: [3, 1] },
};

/** Sorteia `count` questões com 4 frases cada, sem repetir texto. */
export function generatePropositionRounds(difficulty, count = 3) {
  const level = LEVELS[difficulty] ?? LEVELS.easy;
  const used = new Set();
  const draw = (makers) => {
    for (let attempt = 0; attempt < 50; attempt += 1) {
      const item = makers[pick(Object.keys(makers).filter((key) => makers === PROPS ? level.props.includes(key) : level.nots.includes(key)))]();
      if (!used.has(item.text)) {
        used.add(item.text);
        return item;
      }
    }
    return makers === PROPS ? PROPS.sum() : NOT_PROPS.question();
  };
  return range(1, count).map((round) => {
    const [nProps, nNots] = level.perRound;
    const items = shuffle([...range(1, nProps).map(() => draw(PROPS)), ...range(1, nNots).map(() => draw(NOT_PROPS))]);
    return { id: `round-${round}`, items: items.map((item, index) => ({ ...item, id: `r${round}-${index}` })) };
  });
}

/** Aquecimento guiado (igual em todas as dificuldades). */
export function propositionWarmup() {
  return {
    id: 'warmup',
    items: [
      { ...prop('7 é um número primo.', true, '7 só é divisível por 1 e por 7.'), id: 'w0', talk: 'Uma proposição é uma frase que afirma algo e que é verdadeira ou falsa, nunca as duas coisas. Esta frase afirma algo sobre o 7. Ela é V ou F?' },
      { ...NOT_PROPS.order(), text: 'Feche o caderno.', why: 'É uma ordem: não faz sentido dizer que uma ordem é verdadeira ou falsa.', id: 'w1', talk: 'E esta? Ela não afirma nada: é um pedido. Frases assim não são proposições.' },
      { ...notProp('x + 1 = 5', 'É uma sentença aberta: com x = 4 é V, com qualquer outro x é F.', 'Sem saber quem é x, dá para dizer se é V ou F?'), id: 'w2', talk: 'Cuidado com esta: ela tem um x. Sem saber quem é o x, não dá para dizer se é V ou F. Isso se chama sentença aberta.' },
    ],
  };
}
