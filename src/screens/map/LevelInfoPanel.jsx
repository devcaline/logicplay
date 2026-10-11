import { Play, RotateCcw, Lock, Hourglass, X, Sparkles } from 'lucide-react';
import GameButton from '../../components/ui/GameButton.jsx';
import StarIcon from '../../components/ui/StarIcon.jsx';
import { getAgeGroup } from '../../config/ageGroups.js';
import { sfx } from '../../audio/sfx.js';

/** Detalhes da fase selecionada no mapa. */
export default function LevelInfoPanel({ level, world, status, stars, profile, onPlay, onClose, className = '' }) {
  if (!level) return null;
  const ageGroup = getAgeGroup(profile?.ageGroup);
  const isKids = profile?.ageGroup === '5-8';

  let note = null;
  if (status === 'locked') {
    note = {
      icon: Lock,
      text: level.number === 1 ? `Complete o mundo anterior para entrar em ${world.name}.` : 'Complete a fase anterior para abrir este caminho.',
    };
  } else if (status === 'comingSoon') {
    note = {
      icon: Hourglass,
      text: isKids
        ? 'Esta fase está chegando em breve! Estamos preparando uma nova aventura.'
        : `As fases para ${ageGroup?.label ?? 'a sua idade'} estão em desenvolvimento. Volte em breve!`,
    };
  }

  return (
    <div className={`level-panel level-panel--${status} ${className}`}>
      {onClose && (
        <button type="button" className="level-panel__close" onClick={() => { sfx.play('tap'); onClose(); }} aria-label="Fechar detalhes da fase">
          <X size={22} strokeWidth={3} />
        </button>
      )}
      <p className="level-panel__eyebrow">
        {world.name} · Fase {level.number}
      </p>
      <h3 className="level-panel__name">{level.name}</h3>
      <p className="level-panel__description">{level.description}</p>

      {status === 'completed' && (
        <div className="level-panel__stars" aria-label={`${stars} de 3 estrelas`}>
          {[0, 1, 2].map((index) => (
            <StarIcon key={index} size={30} filled={index < stars} />
          ))}
        </div>
      )}

      {note && (
        <p className="level-panel__note">
          <note.icon size={20} strokeWidth={2.6} aria-hidden="true" />
          <span>{note.text}</span>
        </p>
      )}

      {status === 'available' && (
        <GameButton variant="green" size="lg" icon={Play} onClick={() => onPlay(level.id)} className="level-panel__cta">
          Jogar
        </GameButton>
      )}
      {status === 'completed' && (
        <GameButton variant="lilac" icon={RotateCcw} onClick={() => onPlay(level.id)} className="level-panel__cta">
          Jogar de novo
        </GameButton>
      )}
      {status === 'comingSoon' && (
        <GameButton variant="light" icon={Sparkles} disabled className="level-panel__cta">
          Em breve
        </GameButton>
      )}
    </div>
  );
}
