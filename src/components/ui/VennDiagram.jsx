import { forwardRef } from 'react';
import './VennDiagram.css';

/** Geometria do diagrama (viewBox 160 x 110): dois círculos que se cruzam. */
export const VENN = {
  width: 160,
  height: 110,
  a: { cx: 58, cy: 55, r: 48 },
  b: { cx: 102, cy: 55, r: 48 },
};

// Interseção (lente) entre os dois círculos.
const halfChord = Math.sqrt(VENN.a.r ** 2 - ((VENN.b.cx - VENN.a.cx) / 2) ** 2);
const midX = (VENN.a.cx + VENN.b.cx) / 2;
const LENS = `M${midX} ${VENN.a.cy - halfChord} A${VENN.a.r} ${VENN.a.r} 0 0 1 ${midX} ${VENN.a.cy + halfChord} A${VENN.b.r} ${VENN.b.r} 0 0 1 ${midX} ${VENN.a.cy - halfChord} Z`;

/** Em qual parte do diagrama está um ponto da tela: 'a', 'b', 'both' ou 'out'. */
export function vennZoneAt(element, x, y, tolerance = 1.06) {
  if (!element) return 'out';
  const rect = element.getBoundingClientRect();
  const vx = ((x - rect.left) / rect.width) * VENN.width;
  const vy = ((y - rect.top) / rect.height) * VENN.height;
  const inA = Math.hypot(vx - VENN.a.cx, vy - VENN.a.cy) <= VENN.a.r * tolerance;
  const inB = Math.hypot(vx - VENN.b.cx, vy - VENN.b.cy) <= VENN.b.r * tolerance;
  if (inA && inB) return 'both';
  if (inA) return 'a';
  if (inB) return 'b';
  return 'out';
}

/**
 * Diagrama com dois grupos. `regions` traz o conteúdo de cada parte ('a', 'both', 'b').
 * `onZoneClick(zone)` é chamado ao tocar numa parte (alternativa ao arrastar).
 */
const VennDiagram = forwardRef(function VennDiagram(
  { sets, regions = {}, over = null, targetable = false, solved = false, onZoneClick, className = '', small = false },
  ref,
) {
  const handleClick = (event) => {
    if (!onZoneClick) return;
    onZoneClick(vennZoneAt(event.currentTarget, event.clientX, event.clientY));
  };

  const zoneButton = (zone, label) =>
    onZoneClick
      ? {
          role: 'button',
          tabIndex: targetable ? 0 : -1,
          'aria-label': label,
          onClick: (event) => {
            event.stopPropagation();
            onZoneClick(zone);
          },
          onKeyDown: (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              onZoneClick(zone);
            }
          },
        }
      : {};

  return (
    <div
      ref={ref}
      className={`venn ${small ? 'venn--small' : ''} ${targetable ? 'is-target' : ''} ${solved ? 'is-solved' : ''} ${over ? `is-over-${over}` : ''} ${className}`}
      onClick={handleClick}
    >
      <svg className="venn__shapes" viewBox={`0 0 ${VENN.width} ${VENN.height}`} aria-hidden="true">
 <circle className="venn__base" cx={VENN.a.cx} cy={VENN.a.cy} r={VENN.a.r} />
        <circle className="venn__base" cx={VENN.b.cx} cy={VENN.b.cy} r={VENN.b.r} />
        <circle className="venn__circle venn__circle--a" cx={VENN.a.cx} cy={VENN.a.cy} r={VENN.a.r} />
        <circle className="venn__circle venn__circle--b" cx={VENN.b.cx} cy={VENN.b.cy} r={VENN.b.r} />
        <path className="venn__lens" d={LENS} />
        <circle className="venn__outline" cx={VENN.a.cx} cy={VENN.a.cy} r={VENN.a.r} />
        <circle className="venn__outline" cx={VENN.b.cx} cy={VENN.b.cy} r={VENN.b.r} />
      </svg>

      <span className="venn__label venn__label--a">{sets.a.label}</span>
      <span className="venn__label venn__label--b">{sets.b.label}</span>
      <span className="venn__label venn__label--both">{sets.both.label}</span>

      <div className="venn__region venn__region--a" {...zoneButton('a', `Grupo ${sets.a.label}`)}>
        {regions.a}
      </div>
      <div className="venn__region venn__region--both" {...zoneButton('both', `Meio: ${sets.both.label}`)}>
        {regions.both}
      </div>
      <div className="venn__region venn__region--b" {...zoneButton('b', `Grupo ${sets.b.label}`)}>
        {regions.b}
      </div>
    </div>
  );
});

export default VennDiagram;
