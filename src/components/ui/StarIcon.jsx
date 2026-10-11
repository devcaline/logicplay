/** Estrela desenhada em SVG (cheia ou vazia). */
export default function StarIcon({ size = 32, filled = true, className = '' }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <path
        d="M24 3.5l6.2 12.6 13.9 2-10 9.8 2.4 13.8L24 35.2l-12.5 6.5 2.4-13.8-10-9.8 13.9-2z"
        fill={filled ? '#FFD43B' : '#E4DEF5'}
        stroke={filled ? '#F2A516' : '#CFC6EC'}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {filled && <path d="M17 17.5l4-1" stroke="#FFF6C9" strokeWidth="3" strokeLinecap="round" />}
    </svg>
  );
}
