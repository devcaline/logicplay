import { Mushroom, PineTree, Sparkle, Tree } from './sceneParts.jsx';
import './Scenery.css';

const FIREFLIES = [
  [140, 420, 0], [260, 300, 1.2], [380, 520, 2.1], [520, 360, 0.6], [690, 470, 1.8],
  [820, 320, 2.6], [950, 500, 0.9], [1080, 380, 1.5], [620, 600, 2.9], [210, 560, 3.4],
];

/** Floresta mágica ao entardecer, com vagalumes: cenário do Portal do OU. */
export default function MagicForestScene() {
  return (
    <svg className="scene" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="magic-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#B7A4FF" />
          <stop offset="55%" stopColor="#F2C3EC" />
          <stop offset="100%" stopColor="#FFE1C9" />
        </linearGradient>
        <radialGradient id="magic-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="firefly" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF6B0" />
          <stop offset="40%" stopColor="#FFE066" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#FFE066" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1200" height="800" fill="url(#magic-sky)" />
      <circle cx="600" cy="300" r="320" fill="url(#magic-glow)" opacity="0.6" />
      {[[120, 90], [330, 60], [520, 130], [760, 70], [980, 110], [1110, 50], [60, 200], [880, 210]].map(([x, y], i) => (
        <Sparkle key={i} x={x} y={y} s={0.7} delay={i * 0.35} />
      ))}

      <path d="M0 480 Q240 400 520 460 T1200 440 V800 H0 Z" fill="#C6B6F2" />
      <path d="M0 560 Q300 490 600 540 T1200 520 V800 H0 Z" fill="#9FD9B9" />

      <PineTree x={70} y={540} s={2.4} color="#6FC7A0" />
      <Tree x={190} y={560} s={2} color="#B79CFF" dark="#9B7EF0" />
      <Tree x={60} y={660} s={2.4} color="#7ED6A8" />
      <PineTree x={1130} y={540} s={2.5} color="#6FC7A0" />
      <Tree x={1030} y={575} s={2} color="#FFA6CF" dark="#F387B9" />
      <Tree x={1150} y={670} s={2.4} color="#7ED6A8" />

      <path d="M0 680 Q300 640 600 670 T1200 660 V800 H0 Z" fill="#86CFA2" />
      <Mushroom x={260} y={720} s={2.2} cap="#B794F6" />
      <Mushroom x={310} y={730} s={1.4} />
      <Mushroom x={920} y={725} s={2} cap="#FF8DBF" />

      {FIREFLIES.map(([x, y, delay]) => (
        <circle key={`${x}-${y}`} className="magic-firefly" style={{ animationDelay: `${-delay}s` }} cx={x} cy={y} r="14" fill="url(#firefly)" />
      ))}
    </svg>
  );
}
