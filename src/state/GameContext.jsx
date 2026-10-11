import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { loadSave, writeSave } from '../logic/storage.js';
import { countStars, getProfileProgress, withLevelCompleted } from '../logic/progress.js';
import { narrator } from '../audio/narrator.js';
import { sfx } from '../audio/sfx.js';

const GameContext = createContext(null);

// Navegadores bloqueiam áudio antes de um gesto do usuário: só narramos sozinhos depois disso.
let userHasInteracted = false;
if (typeof window !== 'undefined') {
  const markInteracted = () => {
    userHasInteracted = true;
  };
  window.addEventListener('pointerdown', markInteracted, { once: true, capture: true });
  window.addEventListener('keydown', markInteracted, { once: true, capture: true });
}

export function GameProvider({ children }) {
  const [save, setSave] = useState(loadSave);

  useEffect(() => {
    writeSave(save);
  }, [save]);

  useEffect(() => {
    sfx.setEnabled(save.audioEnabled);
  }, [save.audioEnabled]);

  const setProfile = useCallback((profile) => {
    setSave((current) => ({ ...current, profile }));
  }, []);

  const setAudioEnabled = useCallback((audioEnabled) => {
    if (!audioEnabled) narrator.stop();
    setSave((current) => ({ ...current, audioEnabled }));
  }, []);

  const completeLevel = useCallback((levelId, stars) => {
    setSave((current) => withLevelCompleted(current, current.profile, levelId, stars));
  }, []);

  const value = useMemo(() => {
    const profileProgress = getProfileProgress(save, save.profile);
    return {
      profile: save.profile,
      audioEnabled: save.audioEnabled,
      profileProgress,
      totalStars: countStars(profileProgress),
      setProfile,
      setAudioEnabled,
      completeLevel,
    };
  }, [save, setProfile, setAudioEnabled, completeLevel]);

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame precisa estar dentro de <GameProvider>');
  return context;
}

/** Id da fala que está tocando agora (ou null). */
export function useSpeakingId() {
  const [speakingId, setSpeakingId] = useState(narrator.getSpeakingId);
  useEffect(() => narrator.subscribe(setSpeakingId), []);
  return speakingId;
}

/**
 * Controle de narração para as telas.
 * - `speak(line)`: pedido explícito (botão de áudio). Se a voz estava desligada, liga de novo.
 * - `autoSpeak(line)`: narração automática; só toca com voz ligada e após interação do usuário.
 */
export function useNarration() {
  const { audioEnabled, setAudioEnabled } = useGame();
  const speakingId = useSpeakingId();

  const speak = useCallback(
    (line) => {
      if (!audioEnabled) setAudioEnabled(true);
      narrator.speak(line);
    },
    [audioEnabled, setAudioEnabled],
  );

  const autoSpeak = useCallback(
    (line) => {
      if (audioEnabled && userHasInteracted) narrator.speak(line);
    },
    [audioEnabled],
  );

  const stop = useCallback(() => narrator.stop(), []);

  return { speak, autoSpeak, stop, speakingId, audioEnabled };
}
