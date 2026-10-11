import { useState } from 'react';
import { ArrowRight, Play, Check, X } from 'lucide-react';
import TopBar from '../components/ui/TopBar.jsx';
import MascotDialogue from '../components/mascot/MascotDialogue.jsx';
import GameButton from '../components/ui/GameButton.jsx';
import { getLevelScene } from '../components/scenery/scenes.js';
import ItemArt from '../components/art/ItemArt.jsx';
import './LevelIntro.css';

/** Ilustração de apoio para cada fala da introdução (não depender só de leitura ou áudio). */
function IntroIllustration({ kind, items, set, example }) {
  if (kind === 'all-items') {
    return (
      <div className="intro-illus intro-illus--scatter" aria-hidden="true">
        {items.map((item, index) => (
          <span key={item.id} className="intro-illus__item" style={{ animationDelay: `${index * -0.6}s` }}>
            <ItemArt id={item.id} size={64} />
          </span>
        ))}
      </div>
    );
  }
  if (kind === 'set-example') {
    return (
      <div className="intro-illus intro-illus--set" aria-hidden="true">
        <div className={`intro-illus__circle intro-illus__circle--${set.theme}`}>
          <span className="intro-illus__label">{set.label}</span>
          {items
            .filter((item) => item.belongs)
            .map((item, index) => (
              <span key={item.id} className="intro-illus__item" style={{ animationDelay: `${index * 0.25}s` }}>
                <ItemArt id={item.id} size={58} />
              </span>
            ))}
        </div>
      </div>
    );
  }
  if (kind === 'belongs-example') {
    const inside = items.find((item) => (example ? item.id === example.inside : item.belongs));
    const outside = items.find((item) => (example ? item.id === example.outside : !item.belongs));
    return (
      <div className="intro-illus intro-illus--belongs" aria-hidden="true">
        <div className={`intro-illus__circle intro-illus__circle--${set.theme}`}>
          <span className="intro-illus__label">{set.label}</span>
          <span className="intro-illus__item">
            <ItemArt id={inside.id} size={64} />
            <span className="intro-illus__badge intro-illus__badge--yes"><Check size={18} strokeWidth={3.5} /></span>
          </span>
        </div>
        <span className="intro-illus__item intro-illus__outside">
          <ItemArt id={outside.id} size={58} />
          <span className="intro-illus__badge intro-illus__badge--no"><X size={18} strokeWidth={3.5} /></span>
        </span>
      </div>
    );
  }
  return null;
}

export default function LevelIntro({ challenge, level, onStart, onBack }) {
  const [step, setStep] = useState(0);
  const line = challenge.intro[step];
  const isLast = step === challenge.intro.length - 1;
  const Scene = getLevelScene(challenge.scene);

  return (
    <div className="screen intro-screen">
      <Scene />
      <TopBar onBack={onBack} backLabel="Voltar ao mapa" title={level.name} />

      <main className="intro-screen__content">
        <p className="intro-screen__eyebrow">Fase {level.number}</p>

        <IntroIllustration key={step} kind={line.illustration} items={challenge.items} set={challenge.set} example={line.example} />

        <MascotDialogue line={line} mood={line.mood} mascotSize={130} autoPlay className="intro-screen__dialogue" />

        <div className="intro-screen__footer">
          <div className="intro-screen__dots" aria-label={`Parte ${step + 1} de ${challenge.intro.length}`}>
            {challenge.intro.map((introLine, index) => (
              <span key={introLine.id} className={index === step ? 'is-active' : ''} />
            ))}
          </div>
          {isLast ? (
            <GameButton variant="primary" size="lg" icon={Play} onClick={onStart}>
              Vamos lá!
            </GameButton>
          ) : (
            <GameButton variant="lilac" size="lg" iconRight={ArrowRight} onClick={() => setStep(step + 1)}>
              Próximo
            </GameButton>
          )}
        </div>
      </main>
    </div>
  );
}
