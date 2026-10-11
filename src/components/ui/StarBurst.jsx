import StarIcon from './StarIcon.jsx';
import './StarBurst.css';

const BURST = Array.from({ length: 14 }, (_, index) => {
  const angle = (index / 14) * Math.PI * 2 + (index % 2 ? 0.2 : 0);
  const distance = 110 + (index % 3) * 45;
  return {
    dx: Math.cos(angle) * distance,
    dy: Math.sin(angle) * distance,
    size: 18 + (index % 4) * 8,
    delay: (index % 5) * 0.06,
  };
});

/** Explosão de estrelas para comemorações. */
export default function StarBurst({ className = '' }) {
  return (
    <div className={`star-burst ${className}`} aria-hidden="true">
      {BURST.map((star, index) => (
        <span
          key={index}
          className="star-burst__star"
          style={{ '--dx': `${star.dx}px`, '--dy': `${star.dy}px`, animationDelay: `${star.delay}s` }}
        >
          <StarIcon size={star.size} />
        </span>
      ))}
    </div>
  );
}
