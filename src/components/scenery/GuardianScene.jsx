import { useEffect, useState } from 'react';
import { PineTree, Tree, Sparkle } from './sceneParts.jsx';
import './GuardianScene.css';

/**
 * Cenário da fase final: o Guardião da Floresta é uma árvore gigante que ocupa o fundo.
 * Ele acorda aos poucos (`lit` de `total`). As cores voltam pelo filtro da tela (--restore).
 * O desenho é ancorado embaixo (o tronco segue até o fim da tela) e o rosto fica no alto do tronco.
 */
// Tablet e computador: a árvore ocupa uma faixa à esquerda (35% da tela), de cima a baixo.
// Celular: enquadramento com mais chão embaixo, para o rosto subir e ficar acima do desafio.
export const SIDE_QUERY = '(min-width: 768px)';

// Quanto a árvore desce em relação ao desenho original (unidades do SVG).
const TREE_DROP = 80;

function useSideLayout() {
  const [side, setSide] = useState(() => window.matchMedia(SIDE_QUERY).matches);
  useEffect(() => {
    const media = window.matchMedia(SIDE_QUERY);
    const onChange = () => setSide(media.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);
  return side;
}

// Na faixa lateral os galhos ficam mais curtos, para caberem na largura.
const armTransform = (side, x) => (side ? `translate(${x} 360) scale(0.65) translate(${-x} -360)` : undefined);

export default function GuardianScene({ lit = 0, total = 5, stirring = false }) {
  const side = useSideLayout();
  const groundBottom = side ? 800 : 1100;
  // Faixa lateral: enquadra só a árvore, da copa até o fim do tronco.
  const viewBox = side ? '150 -230 900 1030' : `0 -150 1200 ${groundBottom + 150}`;
  const awake = lit >= total;
  const sleepy = !awake && lit >= Math.ceil(total / 2);

  return (
    <svg
      className={`scene guardian-scene ${side ? 'guardian-scene--side' : ''} ${awake ? 'is-awake' : ''} ${stirring ? 'is-stirring' : ''}`}
      viewBox={viewBox}
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="gs-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#CFEAFF" />
          <stop offset="70%" stopColor="#EAF7EE" />
        </linearGradient>
        <linearGradient id="gs-trunk" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#86593F" />
          <stop offset="45%" stopColor="#A57454" />
          <stop offset="100%" stopColor="#7C5440" />
        </linearGradient>
      </defs>

      <rect x="0" y="-300" width="1200" height={groundBottom + 300} fill="url(#gs-sky)" />

      {/* floresta ao fundo */}
      <path d="M0 640 Q300 580 600 620 T1200 600 V800 H0 Z" fill="#BFE8C9" />
      <PineTree x={80} y={720} s={3} color="#5CBF8A" />
      <Tree x={210} y={740} s={2.6} />
      <Tree x={1000} y={735} s={2.8} color="#FFA6CF" dark="#F387B9" />
      <PineTree x={1120} y={720} s={3} color="#5CBF8A" />

      {/* chão (atrás do tronco) */}
      <path d={`M0 770 Q300 745 600 765 T1200 760 V${groundBottom} H0 Z`} fill="#8FD3A1" />

      <g transform={`translate(0 ${TREE_DROP})`}>
      <g className="guardian-scene__tree">
        {/* braços de galho */}
        <g transform={armTransform(side, 470)}>
        <g className="guardian-scene__arm guardian-scene__arm--left">
          <path d="M470 360 Q360 330 270 250" stroke="#8B5E45" strokeWidth="34" fill="none" strokeLinecap="round" />
          <circle cx="255" cy="232" r="52" fill="#4CC38A" />
          <circle cx="225" cy="262" r="34" fill="#5FCB91" />
          <circle cx="240" cy="215" r="10" fill="#FF8DBF" />
        </g>
        </g>
        <g transform={armTransform(side, 730)}>
        <g className="guardian-scene__arm guardian-scene__arm--right">
          <path d="M730 360 Q840 330 930 250" stroke="#8B5E45" strokeWidth="34" fill="none" strokeLinecap="round" />
          <circle cx="945" cy="232" r="52" fill="#4CC38A" />
          <circle cx="975" cy="262" r="34" fill="#5FCB91" />
          <circle cx="960" cy="215" r="10" fill="#FFD43B" />
        </g>
        </g>

        {/* tronco: desce até passar do fim da tela */}
        <path d="M470 150 Q455 430 428 720 L412 1500 L788 1500 L772 720 Q745 430 730 150 Z" fill="url(#gs-trunk)" />
        <path d="M505 420 Q495 600 482 900 M700 420 Q712 600 720 900 M600 480 Q596 640 604 880 M540 380 Q536 330 548 300 M662 380 Q668 330 654 300" stroke="#6E4A36" strokeWidth="7" fill="none" strokeLinecap="round" opacity="0.6" />
        <ellipse cx="610" cy="560" rx="22" ry="30" fill="#6E4A36" opacity="0.5" />

        {/* copa */}
        <g className="guardian-scene__crown">
          <circle cx="600" cy="20" r="250" fill="#3E9E68" />
          <circle cx="350" cy="110" r="165" fill="#4CC38A" />
          <circle cx="850" cy="110" r="165" fill="#4CC38A" />
          <circle cx="450" cy="-40" r="170" fill="#5FCB91" />
          <circle cx="750" cy="-40" r="170" fill="#5FCB91" />
          <circle cx="600" cy="-110" r="170" fill="#6AD39B" />
          <circle cx="430" cy="-80" r="40" fill="#fff" opacity="0.15" />
          {[[380, 60, '#FF8DBF'], [520, 120, '#FFD43B'], [700, 70, '#B794F6'], [830, 160, '#FF8DBF'], [600, -40, '#FFD43B'], [300, 180, '#B794F6'], [900, 30, '#FFD43B']].map(([x, y, color]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="11" fill={color} />
          ))}
        </g>

        {/* rosto */}
        <ellipse cx="495" cy="310" rx="30" ry="17" fill="#FF8FB8" opacity="0.4" />
        <ellipse cx="705" cy="310" rx="30" ry="17" fill="#FF8FB8" opacity="0.4" />
        {awake ? (
          <g className="guardian-scene__face is-awake">
            <ellipse cx="540" cy="255" rx="34" ry="40" fill="#fff" />
            <ellipse cx="660" cy="255" rx="34" ry="40" fill="#fff" />
            <circle cx="546" cy="262" r="23" fill="#2B2350" />
            <circle cx="666" cy="262" r="23" fill="#2B2350" />
            <circle cx="556" cy="250" r="8" fill="#fff" />
            <circle cx="676" cy="250" r="8" fill="#fff" />
            <path d="M552 320 Q600 372 648 320" stroke="#4A2F22" strokeWidth="12" fill="none" strokeLinecap="round" />
          </g>
        ) : sleepy ? (
          <g className="guardian-scene__face">
            <path d="M505 258 Q540 236 575 258" stroke="#2B2350" strokeWidth="12" fill="none" strokeLinecap="round" />
            <path d="M625 258 Q660 236 695 258" stroke="#2B2350" strokeWidth="12" fill="none" strokeLinecap="round" />
            <circle cx="540" cy="266" r="10" fill="#2B2350" />
            <circle cx="660" cy="266" r="10" fill="#2B2350" />
            <path d="M574 330 Q600 342 626 330" stroke="#4A2F22" strokeWidth="11" fill="none" strokeLinecap="round" />
          </g>
        ) : (
          <g className="guardian-scene__face">
            <path d="M505 252 Q540 282 575 252" stroke="#2B2350" strokeWidth="12" fill="none" strokeLinecap="round" />
            <path d="M625 252 Q660 282 695 252" stroke="#2B2350" strokeWidth="12" fill="none" strokeLinecap="round" />
            <ellipse className="guardian-scene__snore" cx="600" cy="332" rx="16" ry="13" fill="#4A2F22" />
          </g>
        )}
      </g>

      </g>

      {!awake && (
        <g className="guardian-scene__zzz" transform={`translate(0 ${TREE_DROP})`}>
          <text x="770" y="230">z</text>
          <text x="805" y="185" fontSize="58">z</text>
          <text x="850" y="130" fontSize="74">Z</text>
        </g>
      )}
      {awake && (
        <g transform={`translate(0 ${TREE_DROP})`}>
          <Sparkle x={300} y={-20} s={2.4} color="#FFD43B" delay={0} />
          <Sparkle x={900} y={-40} s={2.2} color="#FF8DBF" delay={0.4} />
          <Sparkle x={160} y={300} s={2} color="#5CE1FF" delay={0.8} />
          <Sparkle x={1050} y={320} s={2.4} color="#FFD43B" delay={1.2} />
          <Sparkle x={600} y={-130} s={2} color="#fff" delay={0.6} />
        </g>
      )}

    </svg>
  );
}
