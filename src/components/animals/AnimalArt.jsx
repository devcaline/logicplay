/**
 * Ilustrações vetoriais dos animais (viewBox 100 x 100).
 * Novos elementos de desafios podem ser adicionados aqui pelo `id`.
 */

function Eye({ x, y, r = 5 }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill="#2B2350" />
      <circle cx={x + r * 0.35} cy={y - r * 0.35} r={r * 0.4} fill="#fff" />
    </g>
  );
}

function Fish() {
  return (
    <>
      <path d="M70 52 L94 32 Q87 52 94 72 Z" fill="#FF7A2E" />
      <path d="M36 32 Q48 14 62 30 Z" fill="#FF7A2E" />
      <ellipse cx="44" cy="52" rx="32" ry="23" fill="#FF9A47" />
      <path d="M50 30 Q58 52 50 74" stroke="#FFC08A" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M62 34 Q68 52 62 70" stroke="#FFC08A" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M40 60 Q46 70 54 62 Z" fill="#FF7A2E" />
      <circle cx="28" cy="46" r="8" fill="#fff" />
      <Eye x={27} y={46} r={5} />
      <path d="M14 56 Q18 60 22 57" stroke="#B5461A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <ellipse cx="20" cy="54" rx="4" ry="2.5" fill="#FF8FB8" opacity="0.6" />
      <circle cx="12" cy="26" r="4" fill="none" stroke="#7CCBF5" strokeWidth="2" />
      <circle cx="20" cy="16" r="2.6" fill="none" stroke="#7CCBF5" strokeWidth="2" />
    </>
  );
}

function Dolphin() {
  return (
    <>
      <path d="M82 36 L96 22 Q92 36 99 46 Z" fill="#3B95E8" />
      <path d="M46 36 Q54 16 66 34 Z" fill="#3B95E8" />
      <path d="M8 62 C10 50 24 42 40 39 C58 35 76 40 88 32 C87 42 84 50 78 56 C70 66 56 74 38 74 C24 74 12 70 8 62 Z" fill="#5AB0F5" />
      <path d="M12 64 C24 72 46 74 62 66 C48 70 28 70 12 64 Z" fill="#D6EEFF" />
      <path d="M8 62 C12 66 18 68 24 66 C18 64 12 64 8 62 Z" fill="#D6EEFF" />
      <path d="M40 66 Q36 82 50 80 Q46 74 50 66 Z" fill="#3B95E8" />
      <Eye x={28} y={52} r={4.5} />
      <path d="M10 62 Q17 66 24 62" stroke="#1F5FA8" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <ellipse cx="32" cy="60" rx="4" ry="2.4" fill="#FF8FB8" opacity="0.5" />
      <path d="M86 18 Q88 10 92 12" stroke="#7CCBF5" strokeWidth="3" fill="none" strokeLinecap="round" />
    </>
  );
}

function Octopus() {
  const tentacles = [20, 32, 44, 56, 68, 80];
  return (
    <>
      {tentacles.map((x, index) => (
        <path
          key={x}
          d={`M${x} 56 q${index % 2 ? 6 : -6} 14 0 24 q${index % 2 ? -6 : 6} 8 ${index < 3 ? -6 : 6} 10`}
          stroke="#B565F0"
          strokeWidth="9"
          fill="none"
          strokeLinecap="round"
        />
      ))}
      <path d="M16 60 C14 22 86 22 84 60 C84 66 16 66 16 60 Z" fill="#C98BFF" />
      <ellipse cx="36" cy="30" rx="8" ry="5" fill="#fff" opacity="0.3" />
      <circle cx="64" cy="34" r="3" fill="#A35BE6" />
      <circle cx="72" cy="42" r="2" fill="#A35BE6" />
      <circle cx="38" cy="47" r="8" fill="#fff" />
      <circle cx="62" cy="47" r="8" fill="#fff" />
      <Eye x={39} y={48} r={5} />
      <Eye x={63} y={48} r={5} />
      <ellipse cx="28" cy="56" rx="4.5" ry="2.5" fill="#FF8FB8" opacity="0.7" />
      <ellipse cx="72" cy="56" rx="4.5" ry="2.5" fill="#FF8FB8" opacity="0.7" />
      <path d="M45 56 Q50 61 55 56" stroke="#6B2FA8" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </>
  );
}

function Rabbit() {
  return (
    <>
      <ellipse cx="50" cy="84" rx="24" ry="13" fill="#E9E1D8" />
      <g transform="rotate(-10 38 26)">
        <ellipse cx="38" cy="24" rx="9" ry="21" fill="#F5F0EA" stroke="#DDD2C6" strokeWidth="2" />
        <ellipse cx="38" cy="26" rx="4.5" ry="14" fill="#FFB3C9" />
      </g>
      <g transform="rotate(12 62 26)">
        <ellipse cx="62" cy="24" rx="9" ry="21" fill="#F5F0EA" stroke="#DDD2C6" strokeWidth="2" />
        <ellipse cx="62" cy="26" rx="4.5" ry="14" fill="#FFB3C9" />
      </g>
      <circle cx="50" cy="56" r="25" fill="#F7F3EE" stroke="#DDD2C6" strokeWidth="2" />
      <Eye x={41} y={52} r={4.5} />
      <Eye x={59} y={52} r={4.5} />
      <ellipse cx="34" cy="62" rx="5" ry="3" fill="#FF8FB8" opacity="0.6" />
      <ellipse cx="66" cy="62" rx="5" ry="3" fill="#FF8FB8" opacity="0.6" />
      <path d="M47 60 L53 60 L50 64 Z" fill="#FF7AA2" />
      <path d="M50 64 Q46 69 43 66 M50 64 Q54 69 57 66" stroke="#9C8A7C" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M28 60 L38 62 M28 66 L38 65 M72 60 L62 62 M72 66 L62 65" stroke="#C9BBAE" strokeWidth="1.6" strokeLinecap="round" />
    </>
  );
}

function Chicken() {
  return (
    <>
      <path d="M44 84 V94 M40 94 H48 M58 84 V94 M54 94 H62" stroke="#FF9F43" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M78 46 Q92 36 90 56 Q96 58 86 66 Z" fill="#F3EDE4" stroke="#E0D6C8" strokeWidth="2" />
      <ellipse cx="54" cy="64" rx="30" ry="24" fill="#FFFFFF" stroke="#E6DED3" strokeWidth="2" />
      <path d="M50 60 Q64 56 72 66 Q62 76 50 70 Z" fill="#F3EDE4" />
      <circle cx="36" cy="18" r="6" fill="#FF4D5E" />
      <circle cx="44" cy="15" r="6.5" fill="#FF4D5E" />
      <circle cx="52" cy="19" r="5.5" fill="#FF4D5E" />
      <circle cx="42" cy="38" r="18" fill="#FFFFFF" stroke="#E6DED3" strokeWidth="2" />
      <Eye x={38} y={35} r={4} />
      <ellipse cx="46" cy="42" rx="4" ry="2.4" fill="#FF8FB8" opacity="0.6" />
      <path d="M26 38 L14 42 L26 46 Z" fill="#FFB020" />
      <ellipse cx="27" cy="51" rx="3.5" ry="5" fill="#FF4D5E" />
    </>
  );
}

function Butterfly() {
  return (
    <>
      <g transform="rotate(-18 30 36)">
        <ellipse cx="30" cy="36" rx="22" ry="17" fill="#FF7EB6" />
        <circle cx="26" cy="34" r="6" fill="#FFD43B" />
        <circle cx="38" cy="28" r="3" fill="#fff" opacity="0.8" />
      </g>
      <g transform="rotate(18 70 36)">
        <ellipse cx="70" cy="36" rx="22" ry="17" fill="#FF7EB6" />
        <circle cx="74" cy="34" r="6" fill="#FFD43B" />
        <circle cx="62" cy="28" r="3" fill="#fff" opacity="0.8" />
      </g>
      <g transform="rotate(20 34 66)">
        <ellipse cx="34" cy="66" rx="15" ry="12" fill="#B794F6" />
        <circle cx="32" cy="66" r="4" fill="#fff" opacity="0.7" />
      </g>
      <g transform="rotate(-20 66 66)">
        <ellipse cx="66" cy="66" rx="15" ry="12" fill="#B794F6" />
        <circle cx="68" cy="66" r="4" fill="#fff" opacity="0.7" />
      </g>
      <ellipse cx="50" cy="56" rx="5.5" ry="24" fill="#4A3B78" />
      <circle cx="50" cy="28" r="8" fill="#4A3B78" />
      <path d="M47 22 Q40 8 34 10 M53 22 Q60 8 66 10" stroke="#4A3B78" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <circle cx="34" cy="10" r="3" fill="#FF7EB6" />
      <circle cx="66" cy="10" r="3" fill="#FF7EB6" />
      <circle cx="47" cy="27" r="1.8" fill="#fff" />
      <circle cx="53" cy="27" r="1.8" fill="#fff" />
      <path d="M47 31 Q50 34 53 31" stroke="#fff" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </>
  );
}

export const ANIMALS = { fish: Fish, dolphin: Dolphin, octopus: Octopus, rabbit: Rabbit, chicken: Chicken, butterfly: Butterfly };

export default function AnimalArt({ id, size = 72 }) {
  const Art = ANIMALS[id];
  if (!Art) return null;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true" style={{ overflow: 'visible' }}>
      <Art />
    </svg>
  );
}
