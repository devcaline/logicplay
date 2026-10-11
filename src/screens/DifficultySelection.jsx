import { Sprout, Flame, Mountain, ChevronRight } from 'lucide-react';
import TopBar from '../components/ui/TopBar.jsx';
import MascotDialogue from '../components/mascot/MascotDialogue.jsx';
import { DIFFICULTIES, getAgeGroup } from '../config/ageGroups.js';
import { NARRATION } from '../data/narration.js';
import { sfx } from '../audio/sfx.js';
import './Selection.css';

const ICONS = { easy: Sprout, medium: Mountain, hard: Flame };

export default function DifficultySelection({ ageGroupId, onSelect, onBack, onHome }) {
  const ageGroup = getAgeGroup(ageGroupId);

  return (
    <div className="screen selection-screen">
      <TopBar onBack={onBack} backLabel="Voltar para a escolha de idade" onHome={onHome} title="Nível de desafio" />
      <div className="screen__content">
        <MascotDialogue
          line={NARRATION.difficultyQuestion}
          mood="encourage"
          mascotSize={92}
          layout="compact"
          autoPlay
          className="selection-guide"
        />
        <p className="selection-badge">{ageGroup?.label} · {ageGroup?.title}</p>

        <div className="choice-grid choice-grid--difficulty">
          {DIFFICULTIES.map((difficulty, index) => {
            const Icon = ICONS[difficulty.id];
            return (
              <button
                key={difficulty.id}
                type="button"
                className={`choice-card choice-card--row choice-card--${difficulty.color}`}
                style={{ animationDelay: `${index * 0.08}s` }}
                onClick={() => {
                  sfx.play('pick');
                  onSelect(difficulty.id);
                }}
              >
                <span className="choice-card__icon" aria-hidden="true">
                  <Icon size={36} strokeWidth={2.4} />
                </span>
                <span className="choice-card__body">
                  <span className="choice-card__title">{difficulty.label}</span>
                  <span className="choice-card__desc">{difficulty.description}</span>
                  <span className="choice-card__level" aria-hidden="true">
                    {[0, 1, 2].map((dot) => (
                      <i key={dot} className={dot <= index ? 'is-on' : ''} />
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
