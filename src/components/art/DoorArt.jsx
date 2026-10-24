/** Porta aberta ou fechada (viewBox 100 x 120). */
export default function DoorArt({ open = false, size = 64 }) {
  return (
    <svg width={size} height={size * 1.2} viewBox="0 0 100 120" aria-hidden="true" style={{ overflow: 'visible' }}>
      {/* batente */}
      <rect x="14" y="6" width="72" height="108" rx="8" fill="#8B5E45" />
      {/* vão da porta (fica visível quando aberta) */}
      <rect x="22" y="14" width="56" height="100" rx="4" fill={open ? '#FFE9A8' : '#6E4A36'} />
      {open && <path d="M22 114 L78 114 L66 90 L34 90 Z" fill="#FFD95A" opacity="0.5" />}
      {open ? (
        <g>
          <path d="M22 14 L46 22 L46 106 L22 114 Z" fill="#B97A50" stroke="#8B5E45" strokeWidth="3" strokeLinejoin="round" />
          <circle cx="40" cy="64" r="3.5" fill="#FFD43B" />
        </g>
      ) : (
        <g>
          <rect x="22" y="14" width="56" height="100" rx="4" fill="#C98A5C" />
          <rect x="30" y="24" width="40" height="34" rx="4" fill="#B97A50" />
          <rect x="30" y="66" width="40" height="38" rx="4" fill="#B97A50" />
          <circle cx="68" cy="64" r="4.5" fill="#FFD43B" />
        </g>
      )}
    </svg>
  );
}
