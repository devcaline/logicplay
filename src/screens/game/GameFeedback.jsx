import { CheckCircle2 } from 'lucide-react';
import Mascot from '../../components/mascot/Mascot.jsx';
import SpeakButton from '../../components/ui/SpeakButton.jsx';
import GameButton from '../../components/ui/GameButton.jsx';
import StarBurst from '../../components/ui/StarBurst.jsx';
import { useSpeakingId } from '../../state/GameContext.jsx';

/** Painel de comemoração quando a criança acerta. */
export default function GameFeedback({ line, onContinue }) {
  const speakingId = useSpeakingId();
  return (
    <div className="game-feedback" role="dialog" aria-modal="true" aria-labelledby="game-feedback-title">
      <div className="game-feedback__card">
        <StarBurst />
        <Mascot mood="cheer" size={130} talking={speakingId === line.id} className="game-feedback__mascot" />
        <h2 id="game-feedback-title" className="game-feedback__title">{line.title}</h2>
        <p className="game-feedback__text">{line.text}</p>
        <div className="game-feedback__actions">
          <SpeakButton line={line} />
          <GameButton variant="green" size="lg" icon={CheckCircle2} onClick={onContinue} autoFocus>
            Concluir fase
          </GameButton>
        </div>
      </div>
    </div>
  );
}
