/** Peças de cenário reutilizáveis (SVG). Coordenadas no sistema do SVG pai. */

export function Tree({ x, y, s = 1, color = '#4CC38A', dark = '#2E9E6A', trunk = '#9A6B4F' }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="-4" y="-6" width="8" height="26" rx="3" fill={trunk} />
      <circle cx="0" cy="-22" r="22" fill={dark} />
      <circle cx="-12" cy="-14" r="15" fill={color} />
      <circle cx="12" cy="-16" r="16" fill={color} />
      <circle cx="0" cy="-30" r="16" fill={color} />
      <circle cx="-6" cy="-34" r="6" fill="#fff" opacity="0.25" />
    </g>
  );
}

export function PineTree({ x, y, s = 1, color = '#3FAE7A' }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="-3" y="-4" width="6" height="14" rx="2" fill="#8B5E45" />
      <path d="M0 -50 L22 -4 H-22 Z" fill={color} />
      <path d="M0 -50 L14 -22 H-14 Z" fill="#fff" opacity="0.18" />
    </g>
  );
}

export function Mushroom({ x, y, s = 1, cap = '#FF6B8A' }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="-4" y="-10" width="8" height="12" rx="3" fill="#FFF3DE" />
      <path d="M-12 -9 Q0 -26 12 -9 Z" fill={cap} />
      <circle cx="-4" cy="-15" r="2" fill="#fff" />
      <circle cx="4" cy="-12" r="1.6" fill="#fff" />
    </g>
  );
}

export function Flower({ x, y, s = 1, color = '#FF8DBF' }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M0 0 V10" stroke="#3E9E68" strokeWidth="2" />
      {[0, 72, 144, 216, 288].map((angle) => (
        <ellipse key={angle} cx="0" cy="-4" rx="3" ry="4.5" fill={color} transform={`rotate(${angle})`} />
      ))}
      <circle r="2.6" fill="#FFD43B" />
    </g>
  );
}

export function Sparkle({ x, y, s = 1, color = '#fff', delay = 0 }) {
  return (
    <path
      className="scene-sparkle"
      style={{ animationDelay: `${delay}s`, transformOrigin: `${x}px ${y}px`, transformBox: 'view-box' }}
      d={`M${x} ${y - 8 * s} L${x + 2 * s} ${y - 2 * s} L${x + 8 * s} ${y} L${x + 2 * s} ${y + 2 * s} L${x} ${y + 8 * s} L${x - 2 * s} ${y + 2 * s} L${x - 8 * s} ${y} L${x - 2 * s} ${y - 2 * s} Z`}
      fill={color}
    />
  );
}

export function Cloud({ x, y, s = 1, opacity = 0.85 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={opacity}>
      <ellipse cx="0" cy="0" rx="50" ry="18" fill="#fff" />
      <circle cx="-18" cy="-10" r="18" fill="#fff" />
      <circle cx="12" cy="-16" r="22" fill="#fff" />
    </g>
  );
}

export function Crystal({ x, y, s = 1, color = '#7DE8FF', glow = '#C9F6FF' }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx="0" cy="-14" rx="18" ry="22" fill={glow} opacity="0.35" className="scene-glow" />
      <path d="M0 -34 L10 -14 L0 4 L-10 -14 Z" fill={color} />
      <path d="M0 -34 L10 -14 L0 -12 Z" fill="#fff" opacity="0.45" />
      <path d="M-10 -8 L-18 -18 L-16 0 Z" fill={color} opacity="0.85" />
      <path d="M10 -6 L18 -16 L16 2 Z" fill={color} opacity="0.85" />
    </g>
  );
}

/** Gera o contorno de uma engrenagem. */
export function gearPath(r, teeth = 8, depth = 0.22) {
  const points = [];
  const steps = teeth * 4;
  for (let i = 0; i < steps; i += 1) {
    const angle = (i / steps) * Math.PI * 2;
    const outer = i % 4 === 1 || i % 4 === 2;
    const radius = outer ? r : r * (1 - depth);
    points.push(`${(Math.cos(angle) * radius).toFixed(2)} ${(Math.sin(angle) * radius).toFixed(2)}`);
  }
  return `M${points.join(' L')} Z`;
}

export function Gear({ x, y, r = 10, color = '#8C7BE0', spin = 'cw', teeth = 8 }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className={`scene-gear scene-gear--${spin}`}>
        <path d={gearPath(r, teeth)} fill={color} />
        <circle r={r * 0.38} fill="#2E2565" />
        <circle r={r * 0.18} fill={color} />
      </g>
    </g>
  );
}
