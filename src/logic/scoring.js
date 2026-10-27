/** Estrelas por desempenho (13+): 3 sem erros, 2 com até 2 erros, 1 concluindo. */
export function starsFromErrors(errors) {
  if (errors === 0) return 3;
  if (errors <= 2) return 2;
  return 1;
}

/**
 * Ajuda disponível em cada dificuldade.
 * - hint: 'always' (botão de dica sempre visível; toda questão, em todo nível, tem dica)
 * - marks: 'all' (marca a mais e faltando) | 'extra' (só os a mais) | 'count' (só a contagem)
 */
export const HELP_BY_DIFFICULTY = {
  easy: { hint: 'always', marks: 'all' },
  medium: { hint: 'always', marks: 'extra' },
  hard: { hint: 'always', marks: 'count' }, // a dica do difícil explica a notação, sem mostrar elementos
};
