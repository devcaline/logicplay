import { Check } from 'lucide-react';
import './ProgressTrail.css';

/**
 * Trilha de progresso da missão: cada passo é uma pedrinha do caminho.
 * As prontas ficam verdes com o ✓ e a atual pulsa, chamando para o próximo desafio.
 */
export default function ProgressTrail({ total, done, current }) {
  return (
    <div className="trail" role="img" aria-label={`Passo ${Math.min(current + 1, total)} de ${total}`}>
      {Array.from({ length: total }, (_, index) => (
        <span
          key={index}
          className={`trail__step ${index < done ? 'is-done' : ''} ${index === current ? 'is-current' : ''}`}
        >
          {index < done ? <Check size={13} strokeWidth={3.5} aria-hidden="true" /> : null}
        </span>
      ))}
    </div>
  );
}
