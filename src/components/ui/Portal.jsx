import './Portal.css';

/** Ponto de um ângulo (graus, 0 = topo) num círculo de raio r centrado em (100, 100). */
function point(angle, r) {
  const rad = ((angle - 90) * Math.PI) / 180;
  return [100 + r * Math.cos(rad), 100 + r * Math.sin(rad)];
}

/**
 * Portal mágico com anel de energia: `total` partes, `lit` acesas.
 * `open` mostra o portal aberto (missão cumprida).
 */
export default function Portal({ total, lit, open = false, word = 'OU', pulse = false, className = '' }) {
  const step = 360 / total;
  const gap = total > 1 ? 7 : 0;
  const segments = Array.from({ length: total }, (_, index) => {
    const start = index * step + gap / 2;
    const end = (index + 1) * step - gap / 2;
    const [x1, y1] = point(start, 88);
    const [x2, y2] = point(end, 88);
    return { d: `M${x1} ${y1} A88 88 0 ${end - start > 180 ? 1 : 0} 1 ${x2} ${y2}`, on: index < lit };
  });

  return (
    <div className={`portal ${open ? 'is-open' : ''} ${pulse ? 'is-pulsing' : ''} ${className}`} role="img" aria-label={`Portal do ${word}: ${lit} de ${total} partes acesas${open ? ', aberto' : ''}`}>
      <div className="portal__swirl" />
      <svg className="portal__ring" viewBox="0 0 200 200" aria-hidden="true">
        <circle cx="100" cy="100" r="88" fill="none" stroke="#5443C4" strokeWidth="18" />
        {segments.map((segment) => (
          <path key={segment.d} d={segment.d} className={`portal__segment ${segment.on ? 'is-on' : ''}`} />
        ))}
        {[0, 90, 180, 270].map((angle) => {
          const [x, y] = point(angle, 88);
          return <circle key={angle} cx={x} cy={y} r="5" fill="#C9B8FF" />;
        })}
      </svg>
      <span className="portal__word" aria-hidden="true">{word}</span>
    </div>
  );
}
