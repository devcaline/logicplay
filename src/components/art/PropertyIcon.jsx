/** Ícones de propriedades usados nas frases (viewBox 100 x 100). */

function Water() {
  return (
    <>
      <path d="M50 12 C38 32 26 46 26 60 C26 75 37 86 50 86 C63 86 74 75 74 60 C74 46 62 32 50 12 Z" fill="#4DA8F0" />
      <path d="M40 58 C40 66 44 72 50 74" stroke="#D6EEFF" strokeWidth="5" fill="none" strokeLinecap="round" />
    </>
  );
}

function Fly() {
  return (
    <>
      <path d="M50 52 C34 30 14 32 10 44 C24 44 34 50 44 60 Z" fill="#B6A9FF" />
      <path d="M50 52 C66 30 86 32 90 44 C76 44 66 50 56 60 Z" fill="#B6A9FF" />
      <path d="M50 52 C38 40 24 44 22 52 C32 52 40 56 46 62 Z" fill="#8B7CF6" />
      <path d="M50 52 C62 40 76 44 78 52 C68 52 60 56 54 62 Z" fill="#8B7CF6" />
      <ellipse cx="50" cy="60" rx="6" ry="10" fill="#5443C4" />
      <path d="M20 78 C30 70 40 76 50 72 C60 76 70 70 80 78" stroke="#CFE8FF" strokeWidth="6" fill="none" strokeLinecap="round" />
    </>
  );
}

function ColorDot({ color }) {
  return (
    <>
      <circle cx="50" cy="50" r="34" fill={color} />
      <circle cx="50" cy="50" r="34" fill="none" stroke="#fff" strokeWidth="6" />
      <circle cx="38" cy="38" r="8" fill="#fff" opacity="0.45" />
    </>
  );
}

const ICONS = { water: Water, fly: Fly };

/** kind: 'water' | 'fly' | 'color' (com `color`) */
export default function PropertyIcon({ kind, color, size = 48 }) {
  const Icon = ICONS[kind];
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true" style={{ overflow: 'visible' }}>
      {kind === 'color' ? <ColorDot color={color} /> : Icon ? <Icon /> : null}
    </svg>
  );
}
