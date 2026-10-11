import { useId } from 'react';
import './Mascot.css';

/**
 * Pipo, o patinho ciborgue — ilustração vetorial provisória.
 * Para trocar pela arte oficial, basta substituir o conteúdo deste componente
 * mantendo as props (mood, talking, size).
 *
 * mood: 'happy' | 'curious' | 'cheer' | 'encourage'
 */
export default function Mascot({ mood = 'happy', talking = false, size = 160, className = '', title = 'Pipo, o patinho ciborgue' }) {
  const uid = useId().replace(/:/g, '');
  const id = (name) => `${name}-${uid}`;
  const isCheer = mood === 'cheer';
  const isCurious = mood === 'curious';

  return (
    <div
      className={`mascot mascot--${mood} ${talking ? 'mascot--talking' : ''} ${className}`}
      style={{ width: size, height: size * 1.1 }}
      role="img"
      aria-label={title}
    >
      <svg viewBox="0 0 200 220" width="100%" height="100%" aria-hidden="true">
        <defs>
          <radialGradient id={id('body')} cx="40%" cy="35%" r="70%">
            <stop offset="0%" stopColor="#FFF0A0" />
            <stop offset="55%" stopColor="#FFD84D" />
            <stop offset="100%" stopColor="#F5B82E" />
          </radialGradient>
          <radialGradient id={id('visor')} cx="50%" cy="45%" r="60%">
            <stop offset="0%" stopColor="#E9FBFF" />
            <stop offset="35%" stopColor="#7DE8FF" />
            <stop offset="100%" stopColor="#3FA9F5" />
          </radialGradient>
          <radialGradient id={id('glow')} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#C9B8FF" stopOpacity="1" />
            <stop offset="100%" stopColor="#C9B8FF" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={id('metal')} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E8E6F5" />
            <stop offset="100%" stopColor="#A9A3CF" />
          </linearGradient>
        </defs>

        {/* sombra */}
        <ellipse className="mascot__shadow" cx="100" cy="210" rx="52" ry="8" fill="#2B2350" opacity="0.15" />

        <g className="mascot__bob">
          {/* pés */}
          <path d="M70 196 q-4 10 10 10 h14 q6 0 2 -8 z" fill="#FF9F43" />
          <path d="M110 196 q-4 10 10 10 h14 q6 0 2 -8 z" fill="#FF9F43" />

          {/* asa esquerda (pena) */}
          <g className="mascot__wing mascot__wing--left">
            <path d="M52 136 C30 140 26 168 44 178 C50 166 58 156 62 146 Z" fill="#F5B82E" />
            <path d="M46 160 C40 166 40 172 44 178" stroke="#E0A11E" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </g>

          {/* asa direita (robótica) */}
          <g className="mascot__wing mascot__wing--right">
            <path d="M148 136 C170 140 174 168 156 178 C150 166 142 156 138 146 Z" fill={`url(#${id('metal')})`} />
            <path d="M150 148 L160 160 M146 158 L156 170" stroke="#8B7CF6" strokeWidth="3" strokeLinecap="round" />
            <circle cx="149" cy="143" r="2.5" fill="#6C5CE7" />
          </g>

          {/* corpo */}
          <ellipse cx="100" cy="158" rx="54" ry="48" fill={`url(#${id('body')})`} />
          <ellipse cx="100" cy="168" rx="34" ry="28" fill="#FFF3BF" opacity="0.9" />

          {/* núcleo luminoso no peito */}
          <g className="mascot__core">
            <circle cx="100" cy="160" r="16" fill={`url(#${id('glow')})`} />
            <rect x="88" y="150" width="24" height="20" rx="8" fill={`url(#${id('metal')})`} />
            <path d="M100 166 C92 160 93 154 97 154 C99 154 100 156 100 157 C100 156 101 154 103 154 C107 154 108 160 100 166 Z" fill="#B794F6" className="mascot__heart" />
          </g>

          {/* cabeça */}
          <g className={`mascot__head ${isCurious ? 'mascot__head--tilt' : ''}`}>
            {/* antena */}
            <path d="M122 40 L132 16" stroke="#8C86B8" strokeWidth="4" strokeLinecap="round" />
            <circle className="mascot__antenna" cx="133" cy="13" r="7" fill="#B794F6" />
            <circle cx="131" cy="11" r="2.5" fill="#fff" opacity="0.8" />

            {/* topete */}
            <path d="M92 34 C88 20 98 14 102 22 C104 12 116 16 110 30" fill="#FFD84D" stroke="#F5B82E" strokeWidth="2" strokeLinejoin="round" />

            <circle cx="100" cy="80" r="50" fill={`url(#${id('body')})`} />

            {/* placa metálica lateral */}
            <path d="M146 64 C154 74 154 92 146 104 L140 100 C145 90 145 78 140 68 Z" fill={`url(#${id('metal')})`} />
            <circle cx="146" cy="76" r="2" fill="#6C5CE7" />
            <circle cx="146" cy="92" r="2" fill="#6C5CE7" />

            {/* bochechas */}
            <ellipse cx="68" cy="98" rx="9" ry="6" fill="#FF8FB8" opacity="0.55" />
            <ellipse cx="134" cy="98" rx="9" ry="6" fill="#FF8FB8" opacity="0.55" />

            {/* olho normal */}
            {isCheer ? (
              <path d="M66 82 Q78 68 90 82" stroke="#2B2350" strokeWidth="5" fill="none" strokeLinecap="round" />
            ) : (
              <g className="mascot__eye">
                <ellipse cx="78" cy="80" rx={isCurious ? 14 : 13} ry={isCurious ? 17 : 15} fill="#fff" />
                <circle cx="80" cy="82" r={isCurious ? 10 : 9} fill="#2B2350" />
                <circle cx="84" cy="77" r="3.5" fill="#fff" />
                <circle cx="76" cy="86" r="1.6" fill="#fff" />
              </g>
            )}
            {isCurious && <path d="M64 58 Q76 50 90 58" stroke="#E0A11E" strokeWidth="4" fill="none" strokeLinecap="round" />}

            {/* visor tecnológico */}
            <circle cx="122" cy="78" r="19" fill="#3B2F7A" />
            <circle cx="122" cy="78" r="15" fill={`url(#${id('visor')})`} className="mascot__visor" />
            {isCheer ? (
              <path d="M112 82 Q122 70 132 82" stroke="#fff" strokeWidth="4" fill="none" strokeLinecap="round" />
            ) : (
              <>
                <circle cx="122" cy="78" r="6" fill="none" stroke="#fff" strokeWidth="2" opacity="0.9" />
                <circle cx="122" cy="78" r="2.5" fill="#fff" />
              </>
            )}
            <path d="M110 70 A14 14 0 0 1 118 64" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.7" />

            {/* bico */}
            <g className="mascot__beak">
              <path d="M86 96 Q100 88 114 96 Q108 104 100 104 Q92 104 86 96 Z" fill="#FF9F43" />
              <path className="mascot__mouth" d="M90 101 Q100 114 110 101 Q100 106 90 101 Z" fill={isCheer || talking ? '#E8603C' : '#FF9F43'} />
              <path d="M94 95 Q100 93 106 95" stroke="#FFC48A" strokeWidth="2" fill="none" strokeLinecap="round" />
            </g>
          </g>
        </g>

        {isCheer && (
          <g className="mascot__sparkles">
            <path d="M28 40 l4 10 l10 4 l-10 4 l-4 10 l-4 -10 l-10 -4 l10 -4 z" fill="#FFD43B" />
            <path d="M170 34 l3 7 l7 3 l-7 3 l-3 7 l-3 -7 l-7 -3 l7 -3 z" fill="#FF7EB6" />
            <path d="M178 112 l3 6 l6 3 l-6 3 l-3 6 l-3 -6 l-6 -3 l6 -3 z" fill="#5CE1FF" />
          </g>
        )}
      </svg>
    </div>
  );
}
