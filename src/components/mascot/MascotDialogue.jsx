import { useEffect } from 'react';
import Mascot from './Mascot.jsx';
import SpeakButton from '../ui/SpeakButton.jsx';
import { useNarration } from '../../state/GameContext.jsx';
import './MascotDialogue.css';

/**
 * Mascote + balão de fala com botão de áudio.
 * `autoPlay` narra a fala quando ela aparece (só depois de uma interação do usuário).
 */
export default function MascotDialogue({
  line,
  mood = 'happy',
  mascotSize = 120,
  autoPlay = false,
  layout = 'row',
  tone = 'default',
  title,
  bubbleKey,
  children,
  className = '',
}) {
  const { autoSpeak, speakingId } = useNarration();
  const lineId = line?.id;

  useEffect(() => {
    if (autoPlay && line) autoSpeak(line);
    // Narra novamente apenas quando a fala muda.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lineId, autoPlay]);

  return (
    <div className={`dialogue dialogue--${layout} dialogue--${tone} ${className}`}>
      <Mascot mood={mood} size={mascotSize} talking={Boolean(line) && speakingId === line?.id} />
      {line && (
        <div key={bubbleKey ?? lineId} className="dialogue__bubble" aria-live="polite">
          {title && <p className="dialogue__title">{title}</p>}
          <p className="dialogue__text">{line.text}</p>
          <div className="dialogue__actions">
            <SpeakButton line={line} compact={layout === 'compact'} />
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
