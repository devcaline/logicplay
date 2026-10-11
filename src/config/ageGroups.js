/**
 * Faixas etárias do LogicPlay.
 * A idade altera a linguagem e a abordagem pedagógica;
 * a dificuldade (quando existe) altera a complexidade dos exercícios.
 */
export const AGE_GROUPS = [
  {
    id: '5-8',
    label: '5 a 8 anos',
    title: 'Pequenos exploradores',
    color: 'green',
    highlights: ['Animais, cores e formas', 'Muito apoio visual e sonoro', 'Aprender brincando'],
    requiresDifficulty: false,
  },
  {
    id: '9-12',
    label: '9 a 12 anos',
    title: 'Aventureiros',
    color: 'blue',
    highlights: ['Números e diagramas', 'Primeiros símbolos matemáticos', 'Escolha a dificuldade'],
    requiresDifficulty: true,
  },
  {
    id: '13+',
    label: '13 anos ou mais',
    title: 'Mestres da lógica',
    color: 'lilac',
    highlights: ['Linguagem matemática formal', 'Operações e notações', 'Escolha a dificuldade'],
    requiresDifficulty: true,
  },
];

export const DIFFICULTIES = [
  { id: 'easy', label: 'Fácil', description: 'Desafios com passos curtos e muitas dicas.', color: 'green' },
  { id: 'medium', label: 'Médio', description: 'Um pouco mais de raciocínio em cada missão.', color: 'yellow' },
  { id: 'hard', label: 'Difícil', description: 'Desafios completos para quem ama pensar.', color: 'pink' },
];

export function getAgeGroup(id) {
  return AGE_GROUPS.find((group) => group.id === id) ?? null;
}

export function getDifficulty(id) {
  return DIFFICULTIES.find((difficulty) => difficulty.id === id) ?? null;
}

/** Um perfil é válido quando tem idade e, se a idade exigir, dificuldade. */
export function isProfileComplete(profile) {
  const group = getAgeGroup(profile?.ageGroup);
  if (!group) return false;
  return group.requiresDifficulty ? Boolean(getDifficulty(profile.difficulty)) : true;
}
