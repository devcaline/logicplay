import AnimalArt from '../animals/AnimalArt.jsx';

/** Ilustrações dos cartões de faixa etária. */
export function KidsIllustration() {
  return (
    <div className="age-illus age-illus--kids" aria-hidden="true">
      <svg viewBox="0 0 200 120" width="100%" height="100%">
        <circle cx="40" cy="30" r="14" fill="#FFD43B" />
        <rect x="150" y="18" width="26" height="26" rx="6" fill="#FF7EB6" transform="rotate(12 163 31)" />
        <path d="M170 88 l14 24 h-28 z" fill="#B794F6" />
        <circle cx="26" cy="96" r="8" fill="#5CE1FF" />
      </svg>
      <span className="age-illus__animal age-illus__animal--a"><AnimalArt id="rabbit" size={64} /></span>
      <span className="age-illus__animal age-illus__animal--b"><AnimalArt id="fish" size={58} /></span>
      <span className="age-illus__animal age-illus__animal--c"><AnimalArt id="butterfly" size={52} /></span>
    </div>
  );
}

export function TweensIllustration() {
  return (
    <div className="age-illus" aria-hidden="true">
      <svg viewBox="0 0 200 120" width="100%" height="100%">
        <circle cx="80" cy="62" r="40" fill="#6BC0FF" opacity="0.75" />
        <circle cx="120" cy="62" r="40" fill="#FFD43B" opacity="0.75" />
        <text x="58" y="70" fontSize="22" fontWeight="700" fill="#1F5FA8" fontFamily="Fredoka Variable, sans-serif">2</text>
        <text x="94" y="70" fontSize="22" fontWeight="700" fill="#2B2350" fontFamily="Fredoka Variable, sans-serif">4</text>
        <text x="130" y="70" fontSize="22" fontWeight="700" fill="#8A5A00" fontFamily="Fredoka Variable, sans-serif">3</text>
        <text x="20" y="28" fontSize="18" fontWeight="700" fill="#fff" fontFamily="Fredoka Variable, sans-serif">A</text>
        <text x="168" y="28" fontSize="18" fontWeight="700" fill="#fff" fontFamily="Fredoka Variable, sans-serif">B</text>
      </svg>
    </div>
  );
}

export function TeensIllustration() {
  return (
    <div className="age-illus" aria-hidden="true">
      <svg viewBox="0 0 200 120" width="100%" height="100%" fontFamily="Fredoka Variable, sans-serif" fontWeight="700">
        <rect x="18" y="20" width="164" height="80" rx="18" fill="#fff" opacity="0.18" />
        <text x="100" y="56" fontSize="26" fill="#fff" textAnchor="middle">A ∩ B</text>
        <text x="100" y="88" fontSize="20" fill="#FFE07A" textAnchor="middle">p ∧ q → V</text>
        <text x="30" y="16" fontSize="16" fill="#fff" opacity="0.8">∈</text>
        <text x="168" y="16" fontSize="16" fill="#fff" opacity="0.8">∪</text>
        <text x="26" y="116" fontSize="14" fill="#fff" opacity="0.8">{'{ }'}</text>
        <text x="164" y="116" fontSize="16" fill="#fff" opacity="0.8">¬</text>
      </svg>
    </div>
  );
}
