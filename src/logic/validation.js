/**
 * Validação do desafio de classificação em conjunto.
 * @param {Array<{id: string, belongs: boolean}>} items  elementos do desafio
 * @param {Record<string, 'in' | 'out'>} placement       onde cada elemento está
 */
export function validateSetPlacement(items, placement) {
  const wrongInside = [];
  const missing = [];

  for (const item of items) {
    const isInside = placement[item.id] === 'in';
    if (isInside && !item.belongs) wrongInside.push(item.id);
    if (!isInside && item.belongs) missing.push(item.id);
  }

  const insideCount = items.filter((item) => placement[item.id] === 'in').length;

  return {
    correct: wrongInside.length === 0 && missing.length === 0,
    empty: insideCount === 0,
    wrongInside,
    missing,
  };
}

/** Escolhe qual dica do mascote mostrar a partir do resultado da validação. */
export function pickHintKey(result) {
  if (result.correct) return 'success';
  if (result.empty) return 'empty';
  if (result.wrongInside.length > 0) return 'wrongInside';
  if (result.missing.length > 0) return 'missing';
  return 'generic';
}

/**
 * Validação do desafio de pertinência: a resposta ("pertence" = true) está certa?
 * @param {{belongs: boolean}} item
 * @param {boolean} answerBelongs
 */
export function validateMembershipAnswer(item, answerBelongs) {
  return item.belongs === answerBelongs;
}

/** Lugar certo de um elemento no diagrama de dois grupos: 'both', 'a', 'b' ou 'out'. */
export function expectedVennZone(item) {
  const inA = item.groups.includes('a');
  const inB = item.groups.includes('b');
  if (inA && inB) return 'both';
  if (inA) return 'a';
  if (inB) return 'b';
  return 'out';
}

/**
 * Validação do desafio de interseção (dois grupos que se cruzam).
 * @param {Array<{id: string, groups: string[]}>} items
 * @param {Record<string, 'a' | 'b' | 'both' | 'out'>} placement
 */
export function validateVennPlacement(items, placement) {
  const wrong = items
    .map((item) => ({ id: item.id, expected: expectedVennZone(item), actual: placement[item.id] ?? 'out' }))
    .filter((entry) => entry.expected !== entry.actual);
  return {
    correct: wrong.length === 0,
    empty: items.every((item) => (placement[item.id] ?? 'out') === 'out'),
    wrong,
  };
}

/** Dica do mascote para o desafio de interseção. */
export function pickVennHintKey(result) {
  if (result.correct) return 'success';
  if (result.empty) return 'empty';
  if (result.wrong.some((entry) => entry.expected === 'both')) return 'missingBoth';
  if (result.wrong.some((entry) => entry.actual === 'both')) return 'wrongBoth';
  return 'generic';
}

/** União (A OU B): o elemento entra se estiver em pelo menos um dos grupos. */
export function isInUnion(item) {
  return item.groups.length > 0;
}

/**
 * Validação de uma escolha (uma ou várias opções).
 * @param {string[]} answer   chaves certas
 * @param {string[]} chosen   chaves escolhidas
 */
export function validateChoice(answer, chosen) {
  const missing = answer.filter((key) => !chosen.includes(key));
  const extra = chosen.filter((key) => !answer.includes(key));
  return { correct: missing.length === 0 && extra.length === 0, missing, extra };
}

/**
 * Validação das luzes da verdade: cada frase precisa da resposta certa.
 * @param {Array<{id: string, value: boolean}>} statements
 * @param {Record<string, boolean | undefined>} answers  true = verdadeiro, false = falso
 */
export function validateTruthAnswers(statements, answers) {
  const unanswered = statements.filter((statement) => typeof answers[statement.id] !== 'boolean').map((statement) => statement.id);
  const wrong = statements
    .filter((statement) => typeof answers[statement.id] === 'boolean' && answers[statement.id] !== statement.value)
    .map((statement) => statement.id);
  return { correct: unanswered.length === 0 && wrong.length === 0, unanswered, wrong };
}

/** Saída de uma porta lógica com duas entradas. */
export function gateOutput(gate, a, b) {
  if (gate === 'E') return a && b;
  if (gate === 'OU') return a || b;
  throw new Error(`Porta desconhecida: ${gate}`);
}

/**
 * Espelho do NÃO: cada reflexo precisa ser o contrário do original.
 * @param {Array<{id: string, value: boolean}>} rows
 * @param {Record<string, boolean | undefined>} reflections
 */
export function validateMirror(rows, reflections) {
  const unset = rows.filter((row) => typeof reflections[row.id] !== 'boolean').map((row) => row.id);
  const wrong = rows.filter((row) => typeof reflections[row.id] === 'boolean' && reflections[row.id] !== !row.value).map((row) => row.id);
  return { correct: unset.length === 0 && wrong.length === 0, unset, wrong };
}

/**
 * Conjunto montado pelo jogador comparado com o esperado.
 * @param {number[]} expected
 * @param {number[]} chosen
 */
export function compareSets(expected, chosen) {
  const extra = chosen.filter((x) => !expected.includes(x));
  const missing = expected.filter((x) => !chosen.includes(x));
  return { correct: extra.length === 0 && missing.length === 0, extra, missing };
}
