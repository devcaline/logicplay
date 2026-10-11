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
