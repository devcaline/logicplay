import { Lock, Crown, Hourglass } from 'lucide-react';
import StarIcon from '../../components/ui/StarIcon.jsx';
import { sfx } from '../../audio/sfx.js';

const STATUS_LABEL = {
  completed: 'concluída',
  available: 'disponível para jogar',
  comingSoon: 'em breve',
  locked: 'bloqueada',
};

/** Ponto de uma fase no mapa. */
export default function LevelNode({ level, status, stars = 0, selected, onSelect }) {
  return (
    <button
      type="button"
      className={`level-node level-node--${status} ${selected ? 'is-selected' : ''} ${level.boss ? 'level-node--boss' : ''}`}
      style={{ left: `${level.pos.x}%`, top: `${level.pos.y}%` }}
      onClick={() => {
        sfx.play(status === 'locked' ? 'tap' : 'pick');
        onSelect(level.id);
      }}
      aria-pressed={selected}
      aria-label={`Fase ${level.number}: ${level.name} — ${STATUS_LABEL[status]}`}
    >
      {status === 'available' && <span className="level-node__pulse" aria-hidden="true" />}

      {status === 'completed' && (
        <span className="level-node__stars" aria-hidden="true">
          {[0, 1, 2].map((index) => (
            <StarIcon key={index} size={index === 1 ? 24 : 20} filled={index < stars} />
          ))}
        </span>
      )}

      <span className="level-node__disc" aria-hidden="true">
        {status === 'locked' ? (
          <Lock size={24} strokeWidth={2.8} />
        ) : level.boss ? (
          <Crown size={26} strokeWidth={2.6} />
        ) : (
          <span className="level-node__number">{level.number}</span>
        )}
      </span>

      {status === 'comingSoon' && (
        <span className="level-node__badge" aria-hidden="true">
          <Hourglass size={12} strokeWidth={3} /> Em breve
        </span>
      )}

      <span className="level-node__label" aria-hidden="true">{level.name}</span>
    </button>
  );
}
