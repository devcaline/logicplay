/**
 * Mundos e fases do mapa de aventura.
 *
 * `content` diz qual desafio (em data/challenges.js) é jogado por cada faixa etária.
 * Uma fase sem conteúdo para a faixa do jogador aparece como "Em breve" / "Em desenvolvimento".
 * `pos` é a posição do ponto no mapa, em % da largura (x) e da altura (y) do cenário.
 */
export const WORLDS = [
  {
    id: 'forest',
    number: 1,
    name: 'Floresta dos Conjuntos',
    tagline: 'Árvores mágicas, rios e caminhos encantados.',
    theme: 'forest',
    levels: [
      {
        id: 'forest-1',
        number: 1,
        name: 'Conhecendo os Grupos',
        description: 'Descubra o que é um conjunto ajudando animais perdidos.',
        pos: { x: 24, y: 12 },
        content: { '5-8': 'forest-1-kids' },
      },
      {
        id: 'forest-2',
        number: 2,
        name: 'Quem Pertence Aqui?',
        description: 'Descubra quais elementos fazem parte de cada grupo.',
        pos: { x: 70, y: 30 },
        content: { '5-8': 'forest-2-kids' },
      },
      {
        id: 'forest-3',
        number: 3,
        name: 'A Ponte do E',
        description: 'Encontre o que dois grupos têm em comum.',
        pos: { x: 30, y: 50 },
        content: { '5-8': 'forest-3-kids' },
      },
      {
        id: 'forest-4',
        number: 4,
        name: 'O Portal do OU',
        description: 'Junte grupos para abrir o portal mágico.',
        pos: { x: 72, y: 68 },
        content: { '5-8': 'forest-4-kids' },
      },
      {
        id: 'forest-5',
        number: 5,
        name: 'O Guardião da Floresta',
        description: 'O grande desafio final da floresta.',
        pos: { x: 44, y: 83 },
        content: { '5-8': 'forest-5-kids' },
        boss: true,
      },
    ],
  },
  {
    id: 'lab',
    number: 2,
    name: 'Laboratório da Verdade',
    tagline: 'Máquinas luminosas, engrenagens e cristais.',
    theme: 'lab',
    levels: [
      {
        id: 'lab-1',
        number: 1,
        name: 'Luzes da Verdade',
        description: 'Acenda as luzes do verdadeiro e do falso.',
        pos: { x: 26, y: 12 },
        content: { '5-8': 'lab-1-kids' },
      },
      {
        id: 'lab-2',
        number: 2,
        name: 'A Máquina do E',
        description: 'Uma máquina que só liga quando tudo é verdade.',
        pos: { x: 72, y: 30 },
        content: { '5-8': 'lab-2-kids' },
      },
      {
        id: 'lab-3',
        number: 3,
        name: 'A Máquina do OU',
        description: 'Basta uma verdade para esta máquina funcionar.',
        pos: { x: 30, y: 50 },
        content: { '5-8': 'lab-3-kids' },
      },
      {
        id: 'lab-4',
        number: 4,
        name: 'O Espelho do NÃO',
        description: 'Um espelho que inverte tudo o que vê.',
        pos: { x: 70, y: 68 },
        content: { '5-8': 'lab-4-kids' },
      },
      {
        id: 'lab-5',
        number: 5,
        name: 'A Tabela Mestra',
        description: 'Monte a grande tabela-verdade do laboratório.',
        pos: { x: 46, y: 83 },
        content: { '5-8': 'lab-5-kids' },
        boss: true,
      },
    ],
  },
];

/** Lista plana com a ordem de progressão de todas as fases. */
export const LEVEL_SEQUENCE = WORLDS.flatMap((world) =>
  world.levels.map((level) => ({ ...level, worldId: world.id })),
);

export function findLevel(levelId) {
  return LEVEL_SEQUENCE.find((level) => level.id === levelId) ?? null;
}

export function findWorld(worldId) {
  return WORLDS.find((world) => world.id === worldId) ?? null;
}
