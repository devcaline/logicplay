import { ANIMALS } from '../animals/AnimalArt.jsx';
import { OBJECTS } from './ObjectArt.jsx';

const ART = { ...ANIMALS, ...OBJECTS };

/** Ilustração de qualquer elemento dos desafios, pelo `id` (animais, frutas, objetos...). */
export default function ItemArt({ id, size = 72 }) {
  const Art = ART[id];
  if (!Art) return null;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true" style={{ overflow: 'visible' }}>
      <Art />
    </svg>
  );
}
