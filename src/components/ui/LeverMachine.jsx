import { Lock } from 'lucide-react';
import { gearPath } from '../scenery/sceneParts.jsx';
import './LeverMachine.css';

/** Desenho da alavanca num trilho vertical: em cima = ligada, embaixo = desligada. */
export function LeverArt({ on, color = '#3B95E8', className = 'lever__art' }) {
  return (
    <svg className={className} viewBox="0 0 80 110" aria-hidden="true">
      {/* placa com trilho vertical: em cima = ligada, embaixo = desligada */}
      <rect x="16" y="6" width="48" height="98" rx="16" fill="#6E6896" />
      <rect x="35" y="16" width="10" height="78" rx="5" fill="#3F3A63" />
      <circle cx="40" cy="14" r="3" fill={on ? '#5FD99B' : '#8C86B8'} />
      <circle cx="40" cy="96" r="3" fill={on ? '#8C86B8' : '#C9C4E0'} />
      <g className="lever__arm" style={{ transform: `rotate(${on ? 0 : 180}deg)` }}>
        <rect x="36" y="22" width="8" height="34" rx="4" fill="#C9C4E0" />
        <circle cx="40" cy="22" r="13" fill={color} />
        <circle cx="36" cy="18" r="4" fill="#fff" opacity="0.6" />
      </g>
      <circle cx="40" cy="55" r="9" fill="#A9A3CF" />
      <circle cx="40" cy="55" r="3.5" fill="#6E6896" />
    </svg>
  );
}

/** Uma alavanca: para cima = ligada, para baixo = desligada. */
function Lever({ on, color, label, stuck, interactive, onToggle, small }) {
  const content = (
    <>
      <LeverArt on={on} color={color} />
      {!small && (
        <span className={`lever__state ${on ? 'is-on' : ''}`}>
          {stuck && <Lock size={14} strokeWidth={3} aria-hidden="true" />} {on ? 'Ligada' : 'Desligada'}
        </span>
      )}
    </>
  );
  const className = `lever ${on ? 'is-on' : ''} ${stuck ? 'is-stuck' : ''}`;
  if (!interactive) {
    return (
      <span className={className} role="img" aria-label={`Alavanca ${label}: ${on ? 'ligada' : 'desligada'}`}>
        {content}
      </span>
    );
  }
  return (
    <button type="button" className={`${className} is-interactive`} onClick={onToggle} aria-pressed={on} aria-label={`Alavanca ${label}: ${on ? 'ligada' : 'desligada'}${stuck ? ', emperrada' : ''}. Toque para mudar.`}>
      {content}
    </button>
  );
}

function GearShape({ x, y, r, color, teeth, spin }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className={`lever-machine__gear lever-machine__gear--${spin}`}>
        <path d={gearPath(r, teeth)} fill={color} />
        <circle r={r * 0.36} fill="#2E2668" />
        <circle r={r * 0.16} fill={color} />
      </g>
    </g>
  );
}

/**
 * Máquina de alavancas: duas alavancas ligadas por uma porta ("OU", "E"...) a engrenagens.
 * state: 'idle' (esperando), 'working' (engrenagens giram e saem bolhas), 'stopped' (treme e solta fumaça)
 */
export default function LeverMachine({ levers, values, gate = 'OU', state = 'idle', interactive = false, stuck = null, onToggle, small = false, className = '' }) {
  return (
    <div className={`lever-machine lever-machine--${state} ${small ? 'lever-machine--small' : ''} ${className}`}>
      <svg className="lever-machine__body" viewBox="0 0 300 190" aria-hidden="true">
        {/* chaminé e o que sai dela */}
        <rect x="56" y="6" width="30" height="40" rx="6" fill="#A99BE0" />
        <rect x="50" y="2" width="42" height="12" rx="5" fill="#8C7BD8" />
        {state === 'working' &&
          [['#7DE8FF', 0], ['#FF8DBF', 0.4], ['#FFD43B', 0.8], ['#B794F6', 1.2]].map(([color, delay]) => (
            <circle key={color} className="lever-machine__bubble" style={{ animationDelay: `${delay}s` }} cx="71" cy="-4" r="9" fill={color} opacity="0.85" />
          ))}
        {state === 'stopped' &&
          [0, 0.35, 0.7].map((delay) => (
            <circle key={delay} className="lever-machine__smoke" style={{ animationDelay: `${delay}s` }} cx="71" cy="-2" r="11" fill="#B8B4C8" />
          ))}

        {/* corpo */}
        <rect x="12" y="40" width="276" height="146" rx="26" fill="url(#lm-body)" stroke="#fff" strokeWidth="5" />
        <defs>
          <linearGradient id="lm-body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F4F1FF" />
            <stop offset="100%" stopColor="#D2C8F4" />
          </linearGradient>
        </defs>

        {/* janela com engrenagens */}
        <rect x="40" y="58" width="220" height="108" rx="20" fill="#2E2668" />
        <rect x="40" y="58" width="220" height="108" rx="20" fill="none" stroke="#8C7BD8" strokeWidth="5" />
        <GearShape x={100} y={118} r={30} color="#B794F6" teeth={8} spin="ccw" />
        <GearShape x={160} y={106} r={40} color="#FFD43B" teeth={10} spin="cw" />
        <GearShape x={218} y={124} r={26} color="#FF8DBF" teeth={7} spin="ccw" />
        <circle cx="62" cy="76" r="6" fill="#fff" opacity="0.18" />
      </svg>

      <div className="lever-machine__panel">
        <Lever
          on={values.a}
          color={levers.a.color}
          label={levers.a.label}
          stuck={stuck === 'a'}
          interactive={interactive}
          onToggle={() => onToggle?.('a')}
          small={small}
        />
        <span className="lever-machine__gate">{gate}</span>
        <Lever
          on={values.b}
          color={levers.b.color}
          label={levers.b.label}
          stuck={stuck === 'b'}
          interactive={interactive}
          onToggle={() => onToggle?.('b')}
          small={small}
        />
      </div>
    </div>
  );
}
