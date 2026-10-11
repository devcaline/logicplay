import { ChevronRight, Sparkles } from 'lucide-react';
import TopBar from '../components/ui/TopBar.jsx';
import MascotDialogue from '../components/mascot/MascotDialogue.jsx';
import { KidsIllustration, TweensIllustration, TeensIllustration } from '../components/ui/AgeIllustrations.jsx';
import { AGE_GROUPS } from '../config/ageGroups.js';
import { NARRATION } from '../data/narration.js';
import { useGame } from '../state/GameContext.jsx';
import { sfx } from '../audio/sfx.js';
import './Selection.css';

const ILLUSTRATIONS = { '5-8': KidsIllustration, '9-12': TweensIllustration, '13+': TeensIllustration };

export default function AgeSelection({ onSelect, onHome }) {
  const { profile } = useGame();

  return (
    <div className="screen selection-screen">
      <TopBar onHome={onHome} title="Quem vai jogar?" />
      <div className="screen__content">
        <MascotDialogue line={NARRATION.ageQuestion} mood="curious" mascotSize={92} layout="compact" autoPlay className="selection-guide" />

        <div className="choice-grid">
          {AGE_GROUPS.map((group, index) => {
            const Illustration = ILLUSTRATIONS[group.id];
            const isCurrent = profile?.ageGroup === group.id;
            return (
              <button
                key={group.id}
                type="button"
                className={`choice-card choice-card--${group.color} ${isCurrent ? 'is-current' : ''}`}
                style={{ animationDelay: `${index * 0.08}s` }}
                onClick={() => {
                  sfx.play('pick');
                  onSelect(group.id);
                }}
              >
                {isCurrent && <span className="choice-card__current">Perfil atual</span>}
                <span className="choice-card__art">
                  <Illustration />
                </span>
                <span className="choice-card__body">
                  <span className="choice-card__age">{group.label}</span>
                  <span className="choice-card__title">{group.title}</span>
                  <span className="choice-card__list">
                    {group.highlights.map((highlight) => (
                      <span key={highlight} className="choice-card__item">
                        <Sparkles size={16} strokeWidth={2.6} aria-hidden="true" /> {highlight}
                      </span>
                    ))}
                  </span>
                </span>
                <span className="choice-card__go" aria-hidden="true">
                  <ChevronRight size={28} strokeWidth={3} />
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
