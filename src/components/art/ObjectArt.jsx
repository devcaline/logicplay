/** Ilustrações de frutas e objetos (viewBox 100 x 100). */

function Face({ x = 50, y = 58, eye = 4 }) {
  return (
    <g>
      <circle cx={x - 9} cy={y} r={eye} fill="#2B2350" />
      <circle cx={x + 9} cy={y} r={eye} fill="#2B2350" />
      <circle cx={x - 7.6} cy={y - 1.6} r={eye * 0.4} fill="#fff" />
      <circle cx={x + 10.4} cy={y - 1.6} r={eye * 0.4} fill="#fff" />
      <path d={`M${x - 5} ${y + 7} Q${x} ${y + 12} ${x + 5} ${y + 7}`} stroke="#2B2350" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <ellipse cx={x - 16} cy={y + 7} rx="4" ry="2.5" fill="#FF8FB8" opacity="0.7" />
      <ellipse cx={x + 16} cy={y + 7} rx="4" ry="2.5" fill="#FF8FB8" opacity="0.7" />
    </g>
  );
}

function Apple() {
  return (
    <>
      <path d="M50 28 C30 14 8 30 12 56 C16 82 34 94 50 86 C66 94 84 82 88 56 C92 30 70 14 50 28 Z" fill="#FF5A5F" />
      <path d="M50 28 C70 14 92 30 88 56 C86 70 78 80 70 86 C80 70 82 46 66 34 Z" fill="#E8434A" />
      <ellipse cx="30" cy="42" rx="7" ry="11" fill="#fff" opacity="0.35" transform="rotate(25 30 42)" />
      <path d="M50 30 Q48 18 54 10" stroke="#8B5E45" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M54 18 Q68 6 78 14 Q66 24 54 18 Z" fill="#4CC38A" />
      <Face y={60} />
    </>
  );
}

function Banana() {
  return (
    <>
      <path d="M16 26 C14 66 50 92 88 70 C88 64 85 61 80 62 C56 74 30 58 28 24 Z" fill="#FFD43B" stroke="#E5A800" strokeWidth="3" strokeLinejoin="round" />
      <path d="M26 30 C30 56 50 70 74 66" stroke="#FFE98A" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M14 26 L16 18 L28 20 L28 24 Z" fill="#8B5E45" />
      <circle cx="86" cy="68" r="3" fill="#8B5E45" />
      <circle cx="44" cy="62" r="3.4" fill="#2B2350" />
      <circle cx="58" cy="66" r="3.4" fill="#2B2350" />
      <path d="M46 72 Q52 76 57 73" stroke="#2B2350" strokeWidth="2.4" fill="none" strokeLinecap="round" />
    </>
  );
}

function Grapes() {
  const grapes = [
    [36, 34], [50, 32], [64, 34], [30, 48], [44, 48], [58, 48], [72, 48], [38, 62], [52, 62], [66, 62], [45, 76], [59, 76], [52, 89],
  ];
  return (
    <>
      <path d="M50 30 Q50 16 58 8" stroke="#8B5E45" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M52 20 Q36 6 26 16 Q38 26 52 20 Z" fill="#4CC38A" />
      {grapes.map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r="9" fill="#9B6BE0" />
          <circle cx={x - 3} cy={y - 3} r="2.6" fill="#fff" opacity="0.5" />
        </g>
      ))}
      <circle cx="45" cy="50" r="3" fill="#2B2350" />
      <circle cx="59" cy="50" r="3" fill="#2B2350" />
      <path d="M47 58 Q52 62 57 58" stroke="#2B2350" strokeWidth="2.4" fill="none" strokeLinecap="round" />
    </>
  );
}

function Ball() {
  return (
    <>
      <circle cx="50" cy="52" r="36" fill="#4DA8F0" />
      <path d="M16 46 Q50 30 84 46 L86 58 Q50 42 14 58 Z" fill="#fff" />
      <path d="M44 16 Q62 52 44 88 L56 88 Q74 52 56 16 Z" fill="#FFD43B" />
      <path d="M44 16 Q62 52 44 88" stroke="#FF5A5F" strokeWidth="4" fill="none" opacity="0.8" />
      <circle cx="50" cy="52" r="36" fill="none" stroke="#2F7FC8" strokeWidth="3" />
      <ellipse cx="34" cy="32" rx="8" ry="5" fill="#fff" opacity="0.5" transform="rotate(-30 34 32)" />
    </>
  );
}

function ToyCar() {
  return (
    <>
      <path d="M28 46 L38 28 H62 L74 46 Z" fill="#FF8DBF" />
      <path d="M36 44 L42 32 H49 V44 Z M53 44 V32 H60 L67 44 Z" fill="#CFEFFF" />
      <rect x="10" y="44" width="80" height="26" rx="12" fill="#FF5A5F" />
      <rect x="10" y="54" width="80" height="5" fill="#E8434A" />
      <circle cx="86" cy="52" r="4" fill="#FFE07A" />
      <circle cx="30" cy="72" r="11" fill="#2B2350" />
      <circle cx="70" cy="72" r="11" fill="#2B2350" />
      <circle cx="30" cy="72" r="4.5" fill="#C9C4E0" />
      <circle cx="70" cy="72" r="4.5" fill="#C9C4E0" />
    </>
  );
}

function Shoe() {
  return (
    <>
      <path d="M14 70 C14 52 22 38 34 34 L44 34 C46 46 56 52 70 54 C84 56 90 62 90 70 Z" fill="#8B7CF6" />
      <path d="M34 34 C40 30 44 30 44 34 C46 44 54 50 62 52 L54 58 C44 56 36 48 34 34 Z" fill="#B6A9FF" />
      <path d="M38 42 L48 40 M40 48 L52 46 M44 54 L56 52" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
      <rect x="10" y="68" width="82" height="12" rx="6" fill="#fff" stroke="#DCD6F2" strokeWidth="2" />
      <path d="M16 74 H86" stroke="#FFD43B" strokeWidth="3" strokeLinecap="round" />
    </>
  );
}

export const OBJECTS = { apple: Apple, banana: Banana, grapes: Grapes, ball: Ball, car: ToyCar, shoe: Shoe };
