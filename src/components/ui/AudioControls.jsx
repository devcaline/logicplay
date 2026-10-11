import { Volume2, VolumeX } from 'lucide-react';
import { useGame } from '../../state/GameContext.jsx';
import { sfx } from '../../audio/sfx.js';
import './AudioControls.css';

/** Liga/desliga a voz do mascote (preferência salva). */
export default function AudioControls() {
  const { audioEnabled, setAudioEnabled } = useGame();
  return (
    <button
      type="button"
      className={`audio-toggle ${audioEnabled ? '' : 'is-muted'}`}
      onClick={() => {
        if (!audioEnabled) {
          sfx.setEnabled(true);
          sfx.play('tap');
        }
        setAudioEnabled(!audioEnabled);
      }}
      aria-pressed={!audioEnabled}
      aria-label={audioEnabled ? 'Silenciar sons e voz' : 'Ligar sons e voz'}
      title={audioEnabled ? 'Som ligado' : 'Som desligado'}
    >
      {audioEnabled ? <Volume2 size={24} strokeWidth={2.6} /> : <VolumeX size={24} strokeWidth={2.6} />}
      <span className="audio-toggle__label">{audioEnabled ? 'Som' : 'Mudo'}</span>
    </button>
  );
}
