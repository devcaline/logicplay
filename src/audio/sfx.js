/**
 * Efeitos sonoros de interação, sintetizados com a Web Audio API (sem arquivos).
 * Sons suaves e curtos, em volume baixo para não cobrir a voz do Pipo.
 *
 * Para usar um áudio gravado no lugar de um som, mapeie o nome em SFX_FILES:
 *   correct: '/audio/sfx/correct.mp3',
 */
export const SFX_FILES = {};

const MASTER_VOLUME = 0.5;

// Notas (Hz)
const C5 = 523.25;
const D5 = 587.33;
const E5 = 659.25;
const G5 = 783.99;
const A5 = 880;
const C6 = 1046.5;
const E6 = 1318.5;
const G6 = 1568;

/** Cada som é uma lista de tons: { freq, to?, type?, start?, dur?, vol? } */
const SOUNDS = {
  // toque em botão: "pop" macio
  tap: [{ freq: 620, to: 900, type: 'sine', dur: 0.09, vol: 0.22 }],
  // pegar/escolher um elemento
  pick: [{ freq: 520, to: 820, type: 'triangle', dur: 0.12, vol: 0.25 }],
  // soltar um elemento no lugar
  drop: [
    { freq: 900, to: 420, type: 'sine', dur: 0.16, vol: 0.3 },
    { freq: 1300, type: 'sine', start: 0.05, dur: 0.08, vol: 0.08 },
  ],
  // resposta certa: arpejo alegre
  correct: [
    { freq: C5, type: 'triangle', dur: 0.14, vol: 0.25 },
    { freq: E5, type: 'triangle', start: 0.08, dur: 0.14, vol: 0.25 },
    { freq: G5, type: 'triangle', start: 0.16, dur: 0.22, vol: 0.25 },
  ],
  // tentar de novo: duas notas suaves e curiosas (nada de "erro")
  tryAgain: [
    { freq: 392, type: 'sine', dur: 0.16, vol: 0.22 },
    { freq: 440, type: 'sine', start: 0.14, dur: 0.22, vol: 0.2 },
  ],
  // elemento voando até o grupo
  whoosh: [{ freq: 300, to: 1100, type: 'sine', dur: 0.28, vol: 0.12 }],
  // missão cumprida: fanfarra curtinha com brilho
  success: [
    { freq: C5, type: 'triangle', dur: 0.14, vol: 0.25 },
    { freq: E5, type: 'triangle', start: 0.1, dur: 0.14, vol: 0.25 },
    { freq: G5, type: 'triangle', start: 0.2, dur: 0.14, vol: 0.25 },
    { freq: C6, type: 'triangle', start: 0.3, dur: 0.4, vol: 0.28 },
    { freq: E6, type: 'sine', start: 0.42, dur: 0.12, vol: 0.08 },
    { freq: G6, type: 'sine', start: 0.5, dur: 0.18, vol: 0.08 },
  ],
  // estrela aparecendo
  star: [
    { freq: E6, type: 'sine', dur: 0.1, vol: 0.14 },
    { freq: G6, type: 'sine', start: 0.06, dur: 0.18, vol: 0.12 },
  ],
  // abrir uma tela/janela
  open: [
    { freq: D5, type: 'sine', dur: 0.1, vol: 0.16 },
    { freq: A5, type: 'sine', start: 0.07, dur: 0.14, vol: 0.14 },
  ],
};

let context = null;
let master = null;
let enabled = true;

function getContext() {
  if (typeof window === 'undefined') return null;
  if (!context) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;
    context = new AudioContextClass();
    master = context.createGain();
    master.gain.value = MASTER_VOLUME;
    master.connect(context.destination);
  }
  if (context.state === 'suspended') context.resume().catch(() => {});
  return context;
}

function playTone(ctx, { freq, to, type = 'sine', start = 0, dur = 0.12, vol = 0.2 }) {
  const t = ctx.currentTime + start;
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(freq, t);
  if (to) oscillator.frequency.exponentialRampToValueAtTime(to, t + dur);
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.exponentialRampToValueAtTime(vol, t + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  oscillator.connect(gain).connect(master);
  oscillator.start(t);
  oscillator.stop(t + dur + 0.03);
}

export const sfx = {
  setEnabled(value) {
    enabled = Boolean(value);
  },

  play(name) {
    if (!enabled || !name) return;
    const file = SFX_FILES[name];
    if (file) {
      const audio = new Audio(file);
      audio.volume = MASTER_VOLUME;
      audio.play().catch(() => {});
      return;
    }
    const tones = SOUNDS[name];
    const ctx = tones && getContext();
    if (!ctx) return;
    tones.forEach((tone) => playTone(ctx, tone));
  },
};
