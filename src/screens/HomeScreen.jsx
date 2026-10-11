import { useState } from 'react';
import { Compass, HelpCircle, Play, MapPinned, Hand, CheckCircle2 } from 'lucide-react';
import HomeScene from '../components/scenery/HomeScene.jsx';
import Mascot from '../components/mascot/Mascot.jsx';
import SpeakButton from '../components/ui/SpeakButton.jsx';
import GameButton from '../components/ui/GameButton.jsx';
import AudioControls from '../components/ui/AudioControls.jsx';
import Modal from '../components/ui/Modal.jsx';
import { NARRATION } from '../data/narration.js';
import { getAgeGroup, getDifficulty, isProfileComplete } from '../config/ageGroups.js';
import { useGame } from '../state/GameContext.jsx';
import './HomeScreen.css';

const HOW_TO_STEPS = [
  { icon: MapPinned, color: 'green', title: 'Escolha uma fase', text: 'Toque no ponto que brilha no mapa.' },
  { icon: Hand, color: 'blue', title: 'Arraste ou toque', text: 'Leve cada elemento para o lugar certo.' },
  { icon: CheckCircle2, color: 'pink', title: 'Verifique', text: 'O Pipo ajuda com dicas. Sem pressa!' },
];

export default function HomeScreen({ onStart, onContinue }) {
  const { profile, totalStars } = useGame();
  const [helpOpen, setHelpOpen] = useState(false);
  const canContinue = isProfileComplete(profile);
  const ageGroup = getAgeGroup(profile?.ageGroup);
  const difficulty = getDifficulty(profile?.difficulty);

  return (
    <div className="screen home-screen">
      <HomeScene />
      <div className="home-screen__audio">
        <AudioControls />
      </div>

      <main className="home-screen__content">
        <h1 className="logo" aria-label="LogicPlay">
          <span className="logo__logic">Logic</span>
          <span className="logo__play">Play</span>
          <span className="logo__spark" aria-hidden="true">✦</span>
        </h1>

        <div className="home-screen__hero">
          <Mascot mood="happy" size={210} />
        </div>

        <div className="home-screen__actions">
          {canContinue && (
            <GameButton variant="green" size="lg" icon={Play} onClick={onContinue} className="home-screen__continue">
              <span className="home-screen__continue-text">
                Continuar aventura
                <small>
                  {ageGroup?.label}
                  {difficulty ? ` · ${difficulty.label}` : ''} · {totalStars} ★
                </small>
              </span>
            </GameButton>
          )}
          <GameButton variant={canContinue ? 'lilac' : 'primary'} size="lg" icon={Compass} onClick={onStart}>
            Começar aventura
          </GameButton>
          <GameButton variant="light" icon={HelpCircle} onClick={() => setHelpOpen(true)}>
            Como jogar?
          </GameButton>
        </div>
      </main>

      <Modal open={helpOpen} onClose={() => setHelpOpen(false)} title="Como jogar?">
        <ol className="how-to">
          {HOW_TO_STEPS.map((step, index) => (
            <li key={step.title} className={`how-to__step how-to__step--${step.color}`}>
              <span className="how-to__icon" aria-hidden="true">
                <step.icon size={30} strokeWidth={2.4} />
              </span>
              <span>
                <strong>
                  {index + 1}. {step.title}
                </strong>
                {step.text}
              </span>
            </li>
          ))}
        </ol>
        <div className="how-to__footer">
          <SpeakButton line={NARRATION.howToPlay} label="Ouvir explicação" />
          <GameButton variant="primary" onClick={() => setHelpOpen(false)}>
            Entendi!
          </GameButton>
        </div>
      </Modal>
    </div>
  );
}
