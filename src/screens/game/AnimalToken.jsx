import { Droplet } from 'lucide-react';
import ItemArt from '../../components/art/ItemArt.jsx';

/** Visual de um animal (usado no tabuleiro e no "fantasma" do arraste). */
export function AnimalTokenFace({ item, showHint }) {
  return (
    <>
      <span className="token__art">
        <ItemArt id={item.id} size={64} />
      </span>
      <span className="token__name">{item.name}</span>
      {showHint && (
        <span className="token__hint" aria-hidden="true">
          <Droplet size={16} strokeWidth={3} fill="currentColor" />
        </span>
      )}
    </>
  );
}

/** Animal interativo: arrastar (mouse/toque) ou tocar para selecionar. */
export default function AnimalToken({ item, location, selected, dragging, showHint, disabled, handlers, compact = false, locationLabel, children }) {
  return (
    <button
      type="button"
      className={`token ${compact ? 'token--compact' : ''} ${selected ? 'is-selected' : ''} ${dragging ? 'is-dragging' : ''} ${showHint ? 'has-hint' : ''}`}
      aria-pressed={selected}
      aria-label={`${item.name}, ${locationLabel ?? (location === 'in' ? 'dentro do círculo' : 'fora do círculo')}${selected ? ', selecionado' : ''}`}
      disabled={disabled}
      onPointerDown={(event) => handlers.onPointerDown(event, item.id)}
      onPointerMove={handlers.onPointerMove}
      onPointerUp={handlers.onPointerUp}
      onPointerCancel={handlers.onPointerCancel}
      onClick={(event) => handlers.onClick(event, item.id)}
    >
      <AnimalTokenFace item={item} showHint={showHint} />
      {children}
    </button>
  );
}
