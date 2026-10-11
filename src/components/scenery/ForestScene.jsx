import { Cloud, Flower, Mushroom, PineTree, Sparkle, Tree } from './sceneParts.jsx';
import './Scenery.css';

/** Cenário de floresta usado na introdução e no jogo (mais calmo, para não distrair). */
export default function ForestScene() {
  return (
    <svg className="scene" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="forest-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#CFEAFF" />
          <stop offset="60%" stopColor="#EAF6EE" />
        </linearGradient>
      </defs>
      <rect width="1200" height="800" fill="url(#forest-sky)" />
      <g className="scene-drift">
        <Cloud x={200} y={110} s={1.1} opacity={0.9} />
        <Cloud x={900} y={80} s={1.3} opacity={0.8} />
      </g>
      <path d="M0 420 Q300 340 600 400 T1200 380 V800 H0 Z" fill="#BFE8C9" />
      <path d="M0 500 Q260 440 560 490 T1200 470 V800 H0 Z" fill="#A4DDB3" />

      <PineTree x={60} y={470} s={2.2} color="#5CBF8A" />
      <Tree x={170} y={500} s={2} />
      <Tree x={60} y={600} s={2.4} color="#5FCB91" />
      <PineTree x={1140} y={470} s={2.3} color="#5CBF8A" />
      <Tree x={1050} y={520} s={2} color="#FFA6CF" dark="#F387B9" />
      <Tree x={1150} y={620} s={2.4} color="#5FCB91" />

      <path d="M0 640 Q300 600 600 640 T1200 630 V800 H0 Z" fill="#8FD3A1" />
      <path d="M460 800 Q520 700 600 680 Q680 700 740 800 Z" fill="#FFE7B3" opacity="0.8" />
      <Mushroom x={240} y={700} s={2.4} />
      <Mushroom x={290} y={712} s={1.5} cap="#B794F6" />
      <Flower x={920} y={700} s={2.2} />
      <Flower x={980} y={720} s={1.8} color="#FFD43B" />
      <Sparkle x={330} y={240} s={1} delay={0.2} />
      <Sparkle x={860} y={260} s={1.2} delay={1.2} />
    </svg>
  );
}
