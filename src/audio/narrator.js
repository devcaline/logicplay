import { AUDIO_MANIFEST } from './audioManifest.js';

/**
 * Narrador do mascote.
 * Toca o áudio gravado da fala (se existir no manifesto) ou usa a Web Speech API em pt-BR.
 * Uma fala é um objeto { id, text }.
 */

// Vozes femininas/suaves conhecidas em pt-BR, em ordem de preferência.
const PREFERRED_VOICES = [
  'luciana', 'francisca', 'thalita', 'vitória', 'vitoria', 'fernanda', 'leticia', 'letícia',
  'maria', 'google português do brasil', 'google portugues do brasil', 'joana', 'catarina',
];

const VOICE_SETTINGS = { rate: 0.95, pitch: 1.45, volume: 1 };

const synth = typeof window !== 'undefined' && 'speechSynthesis' in window ? window.speechSynthesis : null;

let cachedVoice = null;
let currentAudio = null;
let currentId = null;
let playToken = 0;
const listeners = new Set();

function emit() {
  listeners.forEach((listener) => listener(currentId));
}

function setCurrent(id) {
  currentId = id;
  emit();
}

function scoreVoice(voice) {
  const name = voice.name.toLowerCase();
  const lang = voice.lang.toLowerCase().replace('_', '-');
  let score = 0;
  if (lang === 'pt-br') score += 100;
  else if (lang.startsWith('pt')) score += 40;
  else return -1;
  const preferredIndex = PREFERRED_VOICES.findIndex((preferred) => name.includes(preferred));
  if (preferredIndex !== -1) score += 50 - preferredIndex;
  if (name.includes('enhanced') || name.includes('premium') || name.includes('natural')) score += 15;
  if (voice.localService) score += 3;
  return score;
}

function pickVoice() {
  if (!synth) return null;
  if (cachedVoice) return cachedVoice;
  const voices = synth.getVoices();
  let best = null;
  let bestScore = -1;
  for (const voice of voices) {
    const score = scoreVoice(voice);
    if (score > bestScore) {
      best = voice;
      bestScore = score;
    }
  }
  cachedVoice = best;
  return best;
}

if (synth) {
  synth.addEventListener?.('voiceschanged', () => {
    cachedVoice = null;
    pickVoice();
  });
}

export const narrator = {
  isSupported() {
    return Boolean(synth) || typeof Audio !== 'undefined';
  },

  speak(line) {
    if (!line?.text) return;
    this.stop();
    const token = ++playToken;
    const finish = () => token === playToken && setCurrent(null);

    const recorded = AUDIO_MANIFEST[line.id];
    if (recorded) {
      const audio = new Audio(recorded);
      currentAudio = audio;
      audio.onended = finish;
      audio.onerror = finish;
      setCurrent(line.id);
      audio.play().catch(finish);
      return;
    }

    if (!synth) return;
    const utterance = new SpeechSynthesisUtterance(line.text);
    const voice = pickVoice();
    if (voice) utterance.voice = voice;
    utterance.lang = voice?.lang ?? 'pt-BR';
    utterance.rate = VOICE_SETTINGS.rate;
    utterance.pitch = VOICE_SETTINGS.pitch;
    utterance.volume = VOICE_SETTINGS.volume;
    utterance.onend = finish;
    utterance.onerror = finish;
    setCurrent(line.id);
    synth.speak(utterance);
  },

  stop() {
    playToken += 1;
    if (currentAudio) {
      currentAudio.pause();
      currentAudio = null;
    }
    if (synth && (synth.speaking || synth.pending)) synth.cancel();
    if (currentId !== null) setCurrent(null);
  },

  subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  getSpeakingId() {
    return currentId;
  },
};
