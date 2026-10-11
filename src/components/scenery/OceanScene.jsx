import './Scenery.css';

const BUBBLES = [
  [90, 0, 10], [180, 2.5, 6], [300, 1.2, 8], [420, 4, 5], [560, 0.6, 9], [700, 3.2, 6],
  [820, 1.8, 11], [940, 4.6, 7], [1050, 0.3, 8], [1130, 2.2, 5], [250, 5.2, 6], [650, 5.8, 7],
];

function Seaweed({ x, h = 160, color = '#3FBF9B', delay = 0 }) {
  return (
    <path
      className="ocean-seaweed"
      style={{ animationDelay: `${delay}s`, transformOrigin: `${x}px 800px` }}
      d={`M${x} 800 C${x - 22} ${800 - h * 0.3} ${x + 22} ${800 - h * 0.6} ${x - 6} ${800 - h}
          C${x + 30} ${800 - h * 0.6} ${x - 4} ${800 - h * 0.3} ${x + 16} 800 Z`}
      fill={color}
    />
  );
}

function Coral({ x, y, s = 1, color = '#FF8DBF' }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill="none" stroke={color} strokeWidth="12" strokeLinecap="round">
      <path d="M0 0 V-60 M0 -30 Q-30 -40 -30 -70 M0 -45 Q26 -50 28 -84 M-30 -70 V-90" />
    </g>
  );
}

function SmallFish({ x, y, s = 1, color = '#FFD43B', delay = 0, flip = false }) {
  return (
    <g className="ocean-swim" style={{ animationDelay: `${delay}s` }}>
      <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
        <path d="M14 0 L28 -10 L28 10 Z" fill={color} />
        <ellipse cx="0" cy="0" rx="18" ry="11" fill={color} />
        <circle cx="-8" cy="-2" r="2.6" fill="#2B2350" />
      </g>
    </g>
  );
}

/** Cenário subaquático: água azul clara, raios de luz, bolhas, algas e corais. */
export default function OceanScene() {
  return (
    <svg className="scene" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="ocean-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D4F3FF" />
          <stop offset="45%" stopColor="#8FD8FA" />
          <stop offset="100%" stopColor="#4FB3EE" />
        </linearGradient>
        <linearGradient id="ocean-ray" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width="1200" height="800" fill="url(#ocean-water)" />

      {/* superfície ondulada */}
      <path className="ocean-surface" d="M-40 26 Q60 6 160 26 T360 26 T560 26 T760 26 T960 26 T1160 26 T1360 26 V-10 H-40 Z" fill="#fff" opacity="0.7" />

      {/* raios de luz */}
      <g className="ocean-rays">
        <path d="M180 0 L260 0 L420 800 L300 800 Z" fill="url(#ocean-ray)" />
        <path d="M520 0 L580 0 L660 800 L560 800 Z" fill="url(#ocean-ray)" />
        <path d="M860 0 L950 0 L1050 800 L900 800 Z" fill="url(#ocean-ray)" />
      </g>

      {/* peixinhos ao fundo */}
      <SmallFish x={140} y={220} s={1.2} />
      <SmallFish x={190} y={250} s={0.8} color="#FFB36B" delay={-2} />
      <SmallFish x={1040} y={180} s={1.1} color="#FF8DBF" flip delay={-4} />
      <SmallFish x={980} y={420} s={0.9} color="#B794F6" flip delay={-1} />

      {/* fundo de areia */}
      <path d="M0 690 Q200 650 420 685 T840 680 T1200 670 V800 H0 Z" fill="#FFE7B3" />
      <path d="M0 730 Q260 700 520 730 T1200 720 V800 H0 Z" fill="#FFD98A" />
      <ellipse cx="380" cy="740" rx="22" ry="8" fill="#F5B9C9" />
      <path d="M820 742 l10 -18 l10 18 l-10 -6 z" fill="#FF9F43" />
      <circle cx="840" cy="760" r="6" fill="#fff" opacity="0.7" />

      {/* algas e corais */}
      <Seaweed x={50} h={300} />
      <Seaweed x={95} h={210} color="#2FA987" delay={-1.5} />
      <Seaweed x={1130} h={320} />
      <Seaweed x={1170} h={220} color="#2FA987" delay={-2.2} />
      <Seaweed x={600} h={120} color="#5BD1AE" delay={-0.8} />
      <Coral x={190} y={740} s={1.1} />
      <Coral x={1010} y={735} s={1.2} color="#FFB36B" />
      <Coral x={1060} y={760} s={0.7} color="#B794F6" />

      {/* bolhas subindo */}
      {BUBBLES.map(([x, delay, r]) => (
        <circle
          key={`${x}-${delay}`}
          className="ocean-bubble"
          style={{ animationDelay: `${-delay}s` }}
          cx={x}
          cy="820"
          r={r}
          fill="#fff"
          fillOpacity="0.35"
          stroke="#fff"
          strokeOpacity="0.8"
          strokeWidth="2"
        />
      ))}
    </svg>
  );
}
