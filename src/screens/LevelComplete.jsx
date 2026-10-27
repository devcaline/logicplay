import { useEffect } from 'react';
import { Map, RotateCcw, Lightbulb, ArrowRight, Hourglass } from 'lucide-react';
import Mascot from '../components/mascot/Mascot.jsx';
import SpeakButton from '../components/ui/SpeakButton.jsx';
import GameButton from '../components/ui/GameButton.jsx';
import StarIcon from '../components/ui/StarIcon.jsx';
import StarBurst from '../components/ui/StarBurst.jsx';
import AudioControls from '../components/ui/AudioControls.jsx';
import { useNarration, useSpeakingId } from '../state/GameContext.jsx';
import { sfx } from '../audio/sfx.js';
import './LevelComplete.css';

export default function LevelComplete({ challenge, stars = 3, onMap, onReplay, nextLevel, onNext }) {
  const speakingId = useSpeakingId();
  const { autoSpeak } = useNarration();
  const { complete } = challenge;
  const line = { id: complete.id, text: `${complete.title} ${complete.text}` };

  // Um brilho para cada estrela que aparece (mesmo tempo da animação).
  useEffect(() => {
    const timers = Array.from({ length: stars }, (_, index) =>
      setTimeout(() => sfx.play('star'), 450 + index * 250),
    );
    return () => timers.forEach(clearTimeout);
  }, [stars]);

  useEffect(() => {
    if (challenge.quiet) return;
    autoSpeak(line);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="screen complete-screen">
      <div className="complete-screen__rays" aria-hidden="true" />
      <div className="complete-screen__audio">
        <AudioControls />
      </div>

      <main className="complete-screen__content">
        <div className="complete-screen__hero">
          <StarBurst />
          <Mascot mood="cheer" size={180} talking={speakingId === line.id} />
        </div>

        <div className="complete-screen__stars" aria-label={`Você ganhou ${stars} estrelas`}>
          {[0, 1, 2].map((index) => (
            <span key={index} className="complete-screen__star" style={{ animationDelay: `${0.3 + index * 0.25}s` }}>
              <StarIcon size={index === 1 ? 84 : 64} filled={index < stars} />
            </span>
          ))}
        </div>

        <h1 className="complete-screen__title">{complete.title}</h1>

        <section className="complete-screen__learning">
          <span className="complete-screen__learning-icon" aria-hidden="true">
            <Lightbulb size={26} strokeWidth={2.6} />
          </span>
          <p>{complete.text}</p>
          <SpeakButton line={line} />
        </section>

        <div className="complete-screen__actions">
          {onNext ? (
            <GameButton variant="primary" size="lg" iconRight={ArrowRight} onClick={onNext} className="complete-screen__next">
              <span className="complete-screen__next-text">
                Próxima fase
                <small>{nextLevel.name}</small>
              </span>
            </GameButton>
          ) : (
            nextLevel && (
              <p className="complete-screen__soon">
                <Hourglass size={18} strokeWidth={2.6} aria-hidden="true" />
                Próxima fase, {nextLevel.name}, chega em breve!
              </p>
            )
          )}
          <div className="complete-screen__secondary">
            <GameButton variant={onNext ? 'lilac' : 'green'} icon={Map} onClick={onMap}>
              Voltar ao mapa
            </GameButton>
            <GameButton variant="light" icon={RotateCcw} onClick={onReplay}>
              Jogar novamente
            </GameButton>
          </div>
        </div>
      </main>
    </div>
  );
}
