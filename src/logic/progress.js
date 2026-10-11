import { LEVEL_SEQUENCE } from '../config/worlds.js';

/**
 * O progresso é separado por perfil, para não misturar idades e dificuldades:
 * "5-8", "9-12:easy", "13+:hard"...
 */
export function getProfileKey(profile) {
  if (!profile?.ageGroup) return null;
  return profile.difficulty ? `${profile.ageGroup}:${profile.difficulty}` : profile.ageGroup;
}

export function getProfileProgress(save, profile) {
  const key = getProfileKey(profile);
  return (key && save.progress[key]) || {};
}

export function isLevelCompleted(profileProgress, levelId) {
  return Boolean(profileProgress[levelId]);
}

export function countStars(profileProgress) {
  return Object.values(profileProgress).reduce((total, entry) => total + (entry?.stars ?? 0), 0);
}

export function getChallengeIdFor(level, profile) {
  return level.content?.[profile?.ageGroup] ?? null;
}

/**
 * Estado de uma fase para o perfil atual:
 * - completed:  concluída
 * - available:  liberada e jogável para esta faixa etária
 * - comingSoon: liberada pela sequência, mas sem conteúdo ainda para esta faixa
 * - locked:     bloqueada (fase anterior não concluída)
 */
export function getLevelStatus(levelId, profile, profileProgress) {
  const index = LEVEL_SEQUENCE.findIndex((level) => level.id === levelId);
  if (index === -1) return 'locked';
  const level = LEVEL_SEQUENCE[index];

  if (isLevelCompleted(profileProgress, levelId)) return 'completed';

  const previous = LEVEL_SEQUENCE[index - 1];
  const unlocked = !previous || isLevelCompleted(profileProgress, previous.id);
  if (!unlocked) return 'locked';

  return getChallengeIdFor(level, profile) ? 'available' : 'comingSoon';
}

/** Retorna uma nova cópia do save com a fase marcada como concluída. */
export function withLevelCompleted(save, profile, levelId, stars) {
  const key = getProfileKey(profile);
  if (!key) return save;
  const current = save.progress[key] ?? {};
  const previousStars = current[levelId]?.stars ?? 0;
  return {
    ...save,
    progress: {
      ...save.progress,
      [key]: {
        ...current,
        [levelId]: { stars: Math.max(stars, previousStars), completedAt: new Date().toISOString() },
      },
    },
  };
}
