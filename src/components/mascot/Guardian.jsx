import './Guardian.css';

const RUNE_SYMBOLS = ['{ }', '∈', '∉', '∩', '∪'];

/**
 * O Guardião da Floresta: uma árvore gigante e gentil.
 * Acorda aos poucos conforme as pedras mágicas acendem (`lit` de `total`).
 */
export default function Guardian({ lit = 0, total = 5, size = 220, className = '' }) {
  const awake = lit >= total;
  const sleepy = !awake && lit >= Math.ceil(total / 2);
  const runes = Array.from({ length: total }, (_, index) => index);
  const runeX = (index) => 100 + (index - (total - 1) / 2) * 22;

  return (
    <div
      className={`guardian ${awake ? 'is-awake' : sleepy ? 'is-sleepy' : 'is-asleep'} ${className}`}
      style={{ width: size, height: size * 1.1, '--awake': lit / total }}
      role="img"
      aria-label={`Guardião da Floresta, ${awake ? 'acordado' : 'dormindo'}: ${lit} de ${total} pedras acesas`}
    >
      <svg viewBox="0 0 200 220" width="100%" height="100%" aria-hidden="true">
        <ellipse cx="100" cy="208" rx="78" ry="10" fill="#2B2350" opacity="0.14" />

        <g className="guardian__body">
          {/* raízes */}
          <path d="M52 204 Q60 186 70 182 L130 182 Q140 186 148 204 Q136 196 126 200 Q114 192 100 198 Q86 192 74 200 Q64 196 52 204 Z" fill="#7C5440" />

          {/* braços de galho */}
          <g className="guardian__arm guardian__arm--left">
            <path d="M58 132 Q34 124 24 100" stroke="#8B5E45" strokeWidth="10" fill="none" strokeLinecap="round" />
            <ellipse cx="22" cy="94" rx="13" ry="10" fill="#5FCB91" className="guardian__leaf" />
          </g>
          <g className="guardian__arm guardian__arm--right">
            <path d="M142 132 Q166 124 176 100" stroke="#8B5E45" strokeWidth="10" fill="none" strokeLinecap="round" />
            <ellipse cx="178" cy="94" rx="13" ry="10" fill="#5FCB91" className="guardian__leaf" />
          </g>

          {/* tronco */}
          <path d="M60 190 Q54 130 64 92 L136 92 Q146 130 140 190 Z" fill="#9A6B4F" />
          <path d="M74 186 Q70 150 76 112 M126 186 Q130 150 124 112 M100 188 Q98 166 102 150" stroke="#86593F" strokeWidth="3" fill="none" strokeLinecap="round" />

          {/* copa */}
          <g className="guardian__crown">
            <circle cx="100" cy="62" r="46" fill="#3E9E68" />
            <circle cx="62" cy="76" r="30" fill="#4CC38A" />
            <circle cx="138" cy="76" r="30" fill="#4CC38A" />
            <circle cx="100" cy="44" r="34" fill="#5FCB91" />
            <circle cx="76" cy="40" r="10" fill="#fff" opacity="0.18" />
            <circle cx="70" cy="68" r="4" fill="#FF8DBF" />
            <circle cx="132" cy="58" r="4" fill="#FFD43B" />
            <circle cx="112" cy="30" r="3.5" fill="#B794F6" />
          </g>

          {/* rosto */}
          <ellipse cx="74" cy="132" rx="9" ry="5" fill="#FF8FB8" opacity="0.4" />
          <ellipse cx="126" cy="132" rx="9" ry="5" fill="#FF8FB8" opacity="0.4" />
          {awake ? (
            <g>
              <ellipse cx="82" cy="118" rx="10" ry="12" fill="#fff" />
              <ellipse cx="118" cy="118" rx="10" ry="12" fill="#fff" />
              <circle cx="84" cy="120" r="7" fill="#2B2350" />
              <circle cx="120" cy="120" r="7" fill="#2B2350" />
              <circle cx="87" cy="116" r="2.6" fill="#fff" />
              <circle cx="123" cy="116" r="2.6" fill="#fff" />
              <path d="M86 140 Q100 154 114 140" stroke="#5A3A2A" strokeWidth="4" fill="none" strokeLinecap="round" />
            </g>
          ) : sleepy ? (
            <g>
              <path d="M72 120 Q82 114 92 120" stroke="#2B2350" strokeWidth="4" fill="none" strokeLinecap="round" />
              <path d="M108 120 Q118 114 128 120" stroke="#2B2350" strokeWidth="4" fill="none" strokeLinecap="round" />
              <circle cx="82" cy="122" r="3" fill="#2B2350" />
              <circle cx="118" cy="122" r="3" fill="#2B2350" />
              <path d="M92 142 Q100 146 108 142" stroke="#5A3A2A" strokeWidth="4" fill="none" strokeLinecap="round" />
            </g>
          ) : (
            <g>
              <path d="M72 118 Q82 126 92 118" stroke="#2B2350" strokeWidth="4" fill="none" strokeLinecap="round" />
              <path d="M108 118 Q118 126 128 118" stroke="#2B2350" strokeWidth="4" fill="none" strokeLinecap="round" />
              <ellipse cx="100" cy="143" rx="5" ry="4" fill="#5A3A2A" />
            </g>
          )}

          {/* cinto de cipó com as pedras mágicas */}
          <path d="M60 164 Q100 176 140 164" stroke="#3E9E68" strokeWidth="5" fill="none" />
          {runes.map((index) => {
            const on = index < lit;
            return (
              <g key={index} className={`guardian__rune ${on ? 'is-on' : ''}`} transform={`translate(${runeX(index)} ${168 + Math.abs(index - (total - 1) / 2) * -1.5})`}>
                <circle r="9.5" className="guardian__rune-glow" />
                <rect x="-8" y="-8" width="16" height="16" rx="5" className="guardian__rune-stone" />
                <text y="4" textAnchor="middle" className="guardian__rune-symbol">{RUNE_SYMBOLS[index] ?? '★'}</text>
              </g>
            );
          })}
        </g>

        {!awake && (
          <g className="guardian__zzz">
            <text x="150" y="110">z</text>
            <text x="160" y="94" fontSize="16">z</text>
            <text x="172" y="76" fontSize="20">Z</text>
          </g>
        )}
        {awake && (
          <g className="guardian__sparkles">
            <path d="M30 40 l4 9 l9 4 l-9 4 l-4 9 l-4 -9 l-9 -4 l9 -4 z" fill="#FFD43B" />
            <path d="M170 30 l3 7 l7 3 l-7 3 l-3 7 l-3 -7 l-7 -3 l7 -3 z" fill="#FF8DBF" />
            <path d="M176 150 l3 6 l6 3 l-6 3 l-3 6 l-3 -6 l-6 -3 l6 -3 z" fill="#5CE1FF" />
          </g>
        )}
      </svg>
    </div>
  );
}
