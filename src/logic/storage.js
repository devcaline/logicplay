/** Acesso seguro ao LocalStorage (modo privado ou bloqueado não quebra o jogo). */
const STORAGE_KEY = 'logicplay:v1';

export const DEFAULT_SAVE = {
  profile: null, // { ageGroup: '5-8' | '9-12' | '13+', difficulty: 'easy' | 'medium' | 'hard' | null }
  audioEnabled: true,
  progress: {}, // { [profileKey]: { [levelId]: { stars: number, completedAt: string } } }
};

export function loadSave() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_SAVE };
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_SAVE,
      ...parsed,
      progress: parsed && typeof parsed.progress === 'object' && parsed.progress ? parsed.progress : {},
    };
  } catch {
    return { ...DEFAULT_SAVE };
  }
}

export function writeSave(save) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(save));
  } catch {
    // Sem armazenamento disponível: o jogo segue funcionando só nesta sessão.
  }
}
