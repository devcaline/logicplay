import './TruthLamp.css';

/**
 * Lâmpada da verdade: acesa (verdadeiro), apagada (falso) ou com "?" (ainda sem resposta).
 * state: 'on' | 'off' | 'unset'
 */
export default function TruthLamp({ state = 'unset', size = 64, flash = false, className = '' }) {
  const label = state === 'on' ? 'luz acesa: verdadeiro' : state === 'off' ? 'luz apagada: falso' : 'luz ainda sem resposta';
  return (
    <span className={`truth-lamp truth-lamp--${state} ${flash ? 'is-flashing' : ''} ${className}`} role="img" aria-label={label} style={{ width: size, height: size * 1.25 }}>
      <svg viewBox="0 0 80 100" width="100%" height="100%" aria-hidden="true">
        {state === 'on' && (
          <g className="truth-lamp__rays">
            {[-60, -30, 0, 30, 60].map((angle) => (
              <path key={angle} d="M40 4 V-6" transform={`rotate(${angle} 40 40)`} stroke="#FFC21A" strokeWidth="5" strokeLinecap="round" />
            ))}
          </g>
        )}
        <circle className="truth-lamp__glow" cx="40" cy="40" r="38" />
        <path className="truth-lamp__glass" d="M40 8 C22 8 10 22 10 38 C10 50 17 57 23 63 C27 67 28 71 28 76 L52 76 C52 71 53 67 57 63 C63 57 70 50 70 38 C70 22 58 8 40 8 Z" />
        <path className="truth-lamp__shine" d="M24 30 C26 22 32 17 39 16" />
        {state === 'on' && <path d="M32 58 L32 46 L40 52 L48 46 L48 58" stroke="#E08A00" strokeWidth="3" fill="none" strokeLinejoin="round" strokeLinecap="round" />}
        {state === 'unset' && <text x="40" y="52" textAnchor="middle" className="truth-lamp__question">?</text>}
        <rect x="27" y="76" width="26" height="8" rx="3" fill="#A9A3CF" />
        <rect x="29" y="84" width="22" height="7" rx="3" fill="#8C86B8" />
        <rect x="33" y="91" width="14" height="5" rx="2.5" fill="#6E6896" />
      </svg>
    </span>
  );
}
