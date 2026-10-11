import { Volume2 } from 'lucide-react';
import { useNarration } from '../../state/GameContext.jsx';
import { sfx } from '../../audio/sfx.js';
import './SpeakButton.css';

/** Botão para ouvir (ou ouvir de novo) uma fala. Toque de novo para parar. */
export default function SpeakButton({ line, label = 'Ouvir', compact = false, className = '' }) {
  const { speak, stop, speakingId } = useNarration();
  if (!line) return null;
  const isSpeaking = speakingId === line.id;

  return (
    <button
      type="button"
      className={`speak-btn ${compact ? 'speak-btn--compact' : ''} ${isSpeaking ? 'is-speaking' : ''} ${className}`}
      onClick={() => {
        sfx.play('tap');
        if (isSpeaking) stop();
        else speak(line);
      }}
      aria-label={isSpeaking ? 'Parar a voz' : `${label}: ${line.text}`}
    >
      <span className="speak-btn__icon">
        <Volume2 size={compact ? 20 : 22} strokeWidth={2.6} />
        {isSpeaking && (
          <span className="speak-btn__waves" aria-hidden="true">
            <i /><i /><i />
          </span>
        )}
      </span>
      {!compact && <span>{isSpeaking ? 'Falando…' : label}</span>}
    </button>
  );
}
