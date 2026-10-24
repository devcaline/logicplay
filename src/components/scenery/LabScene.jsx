import { Crystal, Gear, Sparkle } from './sceneParts.jsx';
import './Scenery.css';

function Flask({ x, y, s = 1, liquid = '#7DE8FF' }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-8 -60 V-34 L-30 6 C-34 14 -28 20 -20 20 H20 C28 20 34 14 30 6 L8 -34 V-60 Z" fill="#fff" opacity="0.85" stroke="#C9C0EE" strokeWidth="3" />
      <path d="M-22 -6 H22 L30 6 C34 14 28 20 20 20 H-20 C-28 20 -34 14 -30 6 Z" fill={liquid} />
      <rect x="-12" y="-66" width="24" height="8" rx="3" fill="#A9A3CF" />
      <circle className="lab-bubble" cx="-6" cy="0" r="4" fill="#fff" opacity="0.8" />
      <circle className="lab-bubble" style={{ animationDelay: '-1s' }} cx="8" cy="6" r="3" fill="#fff" opacity="0.8" />
    </g>
  );
}

/** Laboratório claro e alegre: cenário do Mundo 2 (Laboratório da Verdade). */
export default function LabScene() {
  return (
    <svg className="scene" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="lab-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E7E1FF" />
          <stop offset="100%" stopColor="#F4EEFF" />
        </linearGradient>
        <pattern id="lab-tiles" width="60" height="60" patternUnits="userSpaceOnUse">
          <rect width="60" height="60" fill="none" stroke="#D9D1F5" strokeWidth="2" />
        </pattern>
        <linearGradient id="lab-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#CFC6F2" />
          <stop offset="100%" stopColor="#B9AEEB" />
        </linearGradient>
      </defs>

      <rect width="1200" height="800" fill="url(#lab-wall)" />
      <rect width="1200" height="640" fill="url(#lab-tiles)" opacity="0.7" />

      {/* tubos no teto */}
      <path d="M0 70 H360 Q390 70 390 100 V160" stroke="#B6A9FF" strokeWidth="22" fill="none" />
      <path d="M0 70 H360 Q390 70 390 100 V160" className="scene-water" stroke="#7DE8FF" strokeWidth="6" fill="none" strokeDasharray="12 20" />
      <path d="M1200 110 H860 Q830 110 830 140 V190" stroke="#B6A9FF" strokeWidth="22" fill="none" />
      <path d="M1200 110 H860 Q830 110 830 140 V190" className="scene-water" stroke="#FF8DBF" strokeWidth="6" fill="none" strokeDasharray="12 20" />

      <Gear x={1080} y={300} r={52} color="#C9B8FF" />
      <Gear x={1140} y={370} r={30} color="#FFD43B" spin="ccw" />
      <Gear x={110} y={330} r={40} color="#C9B8FF" spin="ccw" />

      {/* prateleiras com frascos */}
      <rect x="40" y="520" width="300" height="16" rx="6" fill="#A9A3CF" />
      <Flask x={100} y={500} s={1} liquid="#7DE8FF" />
      <Flask x={190} y={500} s={0.8} liquid="#FF8DBF" />
      <Flask x={270} y={500} s={1.1} liquid="#B794F6" />
      <rect x="860" y="540" width="300" height="16" rx="6" fill="#A9A3CF" />
      <Flask x={920} y={520} s={0.9} liquid="#FFD43B" />
      <Flask x={1010} y={520} s={1.1} liquid="#5FD99B" />
      <Crystal x={1100} y={530} s={1.4} color="#B794F6" glow="#E6DAFF" />

      {/* chão */}
      <path d="M0 640 H1200 V800 H0 Z" fill="url(#lab-floor)" />
      <path d="M0 640 H1200" stroke="#A99BE0" strokeWidth="6" />

      <Sparkle x={500} y={120} s={1} color="#fff" delay={0.2} />
      <Sparkle x={720} y={260} s={1.2} color="#FFF6C9" delay={1.1} />
      <Sparkle x={260} y={220} s={0.9} color="#fff" delay={1.8} />
    </svg>
  );
}
