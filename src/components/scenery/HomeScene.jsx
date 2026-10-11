import { Cloud, Crystal, Flower, Mushroom, PineTree, Sparkle, Tree, Gear } from './sceneParts.jsx';
import './Scenery.css';

/** Cenário do Mundo da Lógica na tela inicial. */
export default function HomeScene() {
  return (
    <svg className="scene" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="home-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#A996FF" />
          <stop offset="45%" stopColor="#E9B8F2" />
          <stop offset="80%" stopColor="#FFDCC4" />
        </linearGradient>
        <radialGradient id="home-sun" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF7DA" />
          <stop offset="60%" stopColor="#FFE9A8" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#FFE9A8" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="home-path" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFE9B8" />
          <stop offset="100%" stopColor="#FFD58A" />
        </linearGradient>
      </defs>

      <rect width="1200" height="800" fill="url(#home-sky)" />
      <circle cx="880" cy="190" r="190" fill="url(#home-sun)" />

      <g className="scene-drift">
        <Cloud x={220} y={120} s={1.3} />
        <Cloud x={700} y={90} s={0.9} opacity={0.7} />
        <Cloud x={1050} y={150} s={1.1} />
      </g>

      {[
        [120, 60, 0.8], [400, 40, 1], [620, 160, 0.7], [980, 60, 0.9], [1120, 260, 0.7], [70, 300, 0.7],
      ].map(([x, y, s], i) => (
        <Sparkle key={i} x={x} y={y} s={s} delay={i * 0.4} />
      ))}

      {/* montanhas distantes */}
      <path d="M0 470 L140 330 L260 430 L400 290 L560 440 L700 320 L860 450 L1010 300 L1200 440 V800 H0 Z" fill="#B6A6F0" />
      <path d="M0 470 L140 330 L170 360 L120 380 Z M400 290 L440 330 L390 345 Z M1010 300 L1050 340 L1000 350 Z" fill="#fff" opacity="0.5" />

      {/* ilhas flutuantes com cristais */}
      <g className="scene-float">
        <path d="M150 250 Q210 230 270 250 Q250 300 210 310 Q170 300 150 250 Z" fill="#8F7BD8" />
        <ellipse cx="210" cy="250" rx="62" ry="14" fill="#7ED6A0" />
        <Crystal x={210} y={244} s={1.4} />
      </g>
      <g className="scene-float" style={{ animationDelay: '-3s' }}>
        <path d="M960 330 Q1010 312 1060 330 Q1040 370 1010 376 Q980 370 960 330 Z" fill="#8F7BD8" />
        <ellipse cx="1010" cy="330" rx="52" ry="12" fill="#7ED6A0" />
        <Gear x={1010} y={300} r={22} color="#FFD43B" />
      </g>

      {/* colinas */}
      <path d="M0 540 Q200 440 420 520 T820 500 T1200 520 V800 H0 Z" fill="#8FDCAA" />
      <path d="M0 610 Q260 520 520 600 T1000 580 T1200 600 V800 H0 Z" fill="#6CCB8F" />

      {/* árvores ao fundo */}
      <PineTree x={90} y={540} s={1.2} color="#4FB884" />
      <PineTree x={140} y={530} s={0.9} color="#3FAE7A" />
      <Tree x={330} y={540} s={1.1} color="#FF9FCB" dark="#F27DB3" />
      <Tree x={880} y={540} s={1.2} />
      <PineTree x={1060} y={560} s={1.3} color="#4FB884" />
      <Tree x={1140} y={570} s={0.9} color="#B79CFF" dark="#9B7EF0" />

      {/* rio */}
      <path d="M1200 640 Q1000 620 900 680 T640 800 H860 Q960 720 1200 700 Z" fill="#7CCBF5" />
      <path className="scene-water" d="M1180 660 Q1020 650 930 700 T740 790" stroke="#D6F1FF" strokeWidth="5" fill="none" strokeDasharray="14 26" strokeLinecap="round" />

      {/* caminho mágico */}
      <path d="M470 800 Q520 700 600 660 Q680 620 640 580 Q610 556 660 540 L700 540 Q660 560 690 590 Q730 640 650 690 Q590 730 640 800 Z" fill="url(#home-path)" />

      {/* primeiro plano */}
      <path d="M0 700 Q160 650 340 700 T640 720 V800 H0 Z" fill="#55BC80" />
      <Mushroom x={150} y={720} s={2} />
      <Mushroom x={200} y={730} s={1.3} cap="#B794F6" />
      <Flower x={330} y={700} s={2} />
      <Flower x={420} y={720} s={1.6} color="#FFD43B" />
      <Flower x={780} y={740} s={1.8} color="#B794F6" />
      <Crystal x={1090} y={780} s={1.6} color="#B794F6" glow="#E6DAFF" />
      <Sparkle x={1090} y={700} s={1.2} color="#FFF6C9" delay={1} />
    </svg>
  );
}
