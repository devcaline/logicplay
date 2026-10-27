import './Scenery.css';

const SYMBOLS = [
  ['∈', 140, 150], ['∪', 1040, 120], ['∩', 980, 620], ['{ }', 120, 640], ['ℕ', 560, 90],
  ['∉', 300, 420], ['⊂', 880, 360], ['n(A)', 640, 720], ['∅', 1120, 460], ['x', 420, 240],
];

/** Cenário sóbrio para 13+: papel quadriculado claro com símbolos matemáticos bem discretos. */
export default function StudyScene() {
  return (
    <svg className="scene" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="study-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F5F6FB" />
          <stop offset="100%" stopColor="#ECEBF7" />
        </linearGradient>
        <pattern id="study-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0 H0 V40" fill="none" stroke="#DCDAEE" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="1200" height="800" fill="url(#study-bg)" />
      <rect width="1200" height="800" fill="url(#study-grid)" />
      {SYMBOLS.map(([symbol, x, y]) => (
        <text key={symbol} x={x} y={y} fontSize="64" fontWeight="700" fill="#8B7CF6" opacity="0.07" fontFamily="var(--font-display)">
          {symbol}
        </text>
      ))}
    </svg>
  );
}
