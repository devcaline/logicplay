import { Crystal, Flower, Gear, Mushroom, PineTree, Sparkle, Tree } from './sceneParts.jsx';
import './Scenery.css';

/**
 * Cenários dos mundos no mapa. Sistema de coordenadas: 100 x 130
 * (o mesmo usado pelas posições das fases em config/worlds.js, com y * 1.3).
 */

export function ForestMapScene() {
  return (
    <svg className="scene" viewBox="0 0 100 130" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="map-forest-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C8F0D2" />
          <stop offset="100%" stopColor="#93D9AB" />
        </linearGradient>
      </defs>
      <rect width="100" height="130" fill="url(#map-forest-bg)" />
      {/* clareiras */}
      <ellipse cx="24" cy="16" rx="16" ry="9" fill="#DDF7E3" opacity="0.8" />
      <ellipse cx="70" cy="39" rx="15" ry="8" fill="#DDF7E3" opacity="0.8" />
      <ellipse cx="30" cy="65" rx="15" ry="8" fill="#DDF7E3" opacity="0.8" />
      <ellipse cx="72" cy="88" rx="15" ry="8" fill="#DDF7E3" opacity="0.8" />
      <ellipse cx="44" cy="108" rx="18" ry="10" fill="#DDF7E3" opacity="0.8" />

      {/* rio com ponte */}
      <path d="M-5 47 C18 57 36 44 50 52 S80 62 105 50" stroke="#6EC3F2" strokeWidth="7" fill="none" strokeLinecap="round" />
      <path className="scene-water" d="M-5 47 C18 57 36 44 50 52 S80 62 105 50" stroke="#CFEFFF" strokeWidth="1.2" fill="none" strokeDasharray="3 7" strokeLinecap="round" />
      <g transform="translate(50 52) rotate(147)">
        <rect x="-7" y="-3.2" width="14" height="6.4" rx="1.2" fill="#B07B55" />
        {[-5, -2.5, 0, 2.5, 5].map((x) => (
          <rect key={x} x={x - 0.9} y="-3.2" width="1.8" height="6.4" fill="#D29A6C" />
        ))}
        <rect x="-7" y="-3.8" width="14" height="1" rx="0.5" fill="#8A5A3B" />
        <rect x="-7" y="2.8" width="14" height="1" rx="0.5" fill="#8A5A3B" />
      </g>

      {/* lagoa */}
      <ellipse cx="86" cy="118" rx="12" ry="6" fill="#6EC3F2" />
      <ellipse cx="84" cy="117" rx="5" ry="1.5" fill="#CFEFFF" opacity="0.8" />

      {/* árvores e detalhes */}
      <Tree x={7} y={34} s={0.2} />
      <PineTree x={92} y={14} s={0.22} color="#4FB884" />
      <Tree x={86} y={22} s={0.16} color="#FFA6CF" dark="#F387B9" />
      <PineTree x={52} y={10} s={0.16} color="#3FAE7A" />
      <Tree x={92} y={78} s={0.22} color="#5FCB91" />
      <Tree x={8} y={86} s={0.2} color="#B79CFF" dark="#9B7EF0" />
      <PineTree x={14} y={118} s={0.24} color="#4FB884" />
      <Tree x={60} y={66} s={0.14} />
      <PineTree x={8} y={60} s={0.16} color="#3FAE7A" />
      <Tree x={94} y={100} s={0.14} color="#FFA6CF" dark="#F387B9" />
      <Mushroom x={38} y={30} s={0.25} />
      <Mushroom x={84} y={64} s={0.22} cap="#B794F6" />
      <Mushroom x={22} y={98} s={0.25} />
      <Flower x={12} y={20} s={0.35} />
      <Flower x={58} y={30} s={0.3} color="#FFD43B" />
      <Flower x={46} y={78} s={0.3} color="#B794F6" />
      <Flower x={64} y={122} s={0.35} />
      <Sparkle x={40} y={42} s={0.25} delay={0.3} />
      <Sparkle x={88} y={44} s={0.3} delay={1.1} />
      <Sparkle x={18} y={76} s={0.25} delay={1.8} color="#FFF6C9" />
    </svg>
  );
}

export function LabMapScene() {
  return (
    <svg className="scene" viewBox="0 0 100 130" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="map-lab-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4B3A9A" />
          <stop offset="100%" stopColor="#2E2668" />
        </linearGradient>
        <pattern id="map-lab-grid" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M10 0 H0 V10" fill="none" stroke="#8C7BE0" strokeWidth="0.25" opacity="0.5" />
        </pattern>
      </defs>
      <rect width="100" height="130" fill="url(#map-lab-bg)" />
      <rect width="100" height="130" fill="url(#map-lab-grid)" />

      {/* tubos luminosos */}
      <path d="M0 30 H14 Q18 30 18 34 V48 Q18 52 22 52 H40" stroke="#6A57C9" strokeWidth="2.4" fill="none" />
      <path d="M0 30 H14 Q18 30 18 34 V48 Q18 52 22 52 H40" className="scene-water" stroke="#7DE8FF" strokeWidth="0.8" fill="none" strokeDasharray="2 5" />
      <path d="M100 98 H86 Q82 98 82 102 V122 H60" stroke="#6A57C9" strokeWidth="2.4" fill="none" />
      <path d="M100 98 H86 Q82 98 82 102 V122 H60" className="scene-water" stroke="#FF8DBF" strokeWidth="0.8" fill="none" strokeDasharray="2 5" />

      {/* plataformas das fases */}
      {[[26, 16], [72, 39], [30, 65], [70, 88], [46, 108]].map(([x, y]) => (
        <ellipse key={`${x}-${y}`} cx={x} cy={y + 3} rx="12" ry="4" fill="#7DE8FF" opacity="0.18" />
      ))}

      <Gear x={88} y={14} r={8} color="#8C7BE0" />
      <Gear x={95} y={24} r={5} color="#B79CFF" spin="ccw" />
      <Gear x={8} y={78} r={7} color="#8C7BE0" spin="ccw" />
      <Gear x={56} y={60} r={4} color="#FFD43B" />
      <Gear x={12} y={112} r={6} color="#B79CFF" />
      <Crystal x={50} y={22} s={0.3} />
      <Crystal x={90} y={60} s={0.32} color="#FF8DBF" glow="#FFD6EA" />
      <Crystal x={22} y={92} s={0.28} color="#B794F6" glow="#E6DAFF" />
      <Crystal x={86} y={124} s={0.3} />
      <Sparkle x={40} y={8} s={0.25} delay={0.4} color="#7DE8FF" />
      <Sparkle x={64} y={80} s={0.25} delay={1.4} color="#FFD6EA" />
      <Sparkle x={10} y={44} s={0.3} delay={0.9} color="#FFF6C9" />
      <Sparkle x={94} y={84} s={0.25} delay={2} color="#7DE8FF" />
    </svg>
  );
}
