import { useState } from 'react';
import { ArrowRight, Play, Check, X } from 'lucide-react';
import TopBar from '../components/ui/TopBar.jsx';
import MascotDialogue from '../components/mascot/MascotDialogue.jsx';
import GameButton from '../components/ui/GameButton.jsx';
import { getLevelScene } from '../components/scenery/scenes.js';
import ItemArt from '../components/art/ItemArt.jsx';
import VennDiagram from '../components/ui/VennDiagram.jsx';
import Portal from '../components/ui/Portal.jsx';
import Guardian from '../components/mascot/Guardian.jsx';
import './LevelIntro.css';

/** Ilustração de apoio para cada fala da introdução (não depender só de leitura ou áudio). */
function IntroIllustration({ kind, items, set, sets, example }) {
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
  if (kind === 'guardian') {
    return (
      <div className="intro-illus intro-illus--guardian" aria-hidden="true">
        <Guardian lit={example?.lit ?? 0} total={5} size={170} />
      </div>
    );
  }
  if (kind === 'union-example') {
    const badge = (yes) => (
      <span className={`intro-illus__badge intro-illus__badge--${yes ? 'yes' : 'no'}`}>
        {yes ? <Check size={18} strokeWidth={3.5} /> : <X size={18} strokeWidth={3.5} />}
      </span>
    );
    const bubble = (id, yes) => (
      <span className="intro-illus__item intro-illus__bubble">
        <ItemArt id={id} size={48} />
        {badge(yes)}
      </span>
    );
    return (
      <div className="intro-illus intro-illus--union" aria-hidden="true">
        <div className="intro-illus__union-in">
          {[
            ['a', sets.a.label],
            ['both', 'Os dois'],
            ['b', sets.b.label],
          ]
            .filter(([zone]) => example[zone])
            .map(([zone, label]) => (
              <span key={zone} className="intro-illus__union-row">
                <span className={`intro-illus__group intro-illus__group--${zone}`} style={sets[zone]?.color ? { background: sets[zone].color.label } : undefined}>
                  {label}
                </span>
                {bubble(example[zone], true)}
              </span>
            ))}
        </div>
        <Portal total={3} lit={3} open />
        {bubble(example.out, false)}
      </div>
    );
  }
  if (kind === 'venn-example') {
    const art = (id) => (
      <span key={id} className="intro-illus__item intro-illus__venn-item">
        <ItemArt id={id} size={44} />
      </span>
    );
    return (
      <div className="intro-illus intro-illus--venn" aria-hidden="true">
        <VennDiagram small sets={sets} regions={{ a: art(example.a), both: art(example.both), b: art(example.b) }} />
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

        <IntroIllustration key={step} kind={line.illustration} items={challenge.items} set={challenge.set} sets={challenge.sets} example={line.example} />

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
