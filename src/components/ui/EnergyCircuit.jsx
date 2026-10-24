import { gateOutput } from '../../logic/validation.js';
import './EnergyCircuit.css';

/** Quanta energia chega na lâmpada: 'strong' acende, 'weak' só pisca, 'none' nada. */
export function circuitPower(gate, a, b) {
  const count = Number(a) + Number(b);
  if (count === 0) return 'none';
  return gateOutput(gate, a, b) ? 'strong' : 'weak';
}

function Lever({ x, y, on, number }) {
  return (
    <g transform={`translate(${x} ${y})`} className={`circuit-lever ${on ? 'is-on' : ''}`}>
      <rect x="-56" y="-62" width="112" height="124" rx="24" className="circuit-lever__box" />
      <rect x="-9" y="-44" width="18" height="88" rx="9" className="circuit-lever__track" />
      <g className="circuit-lever__arm" style={{ transform: `rotate(${on ? 0 : 180}deg)` }}>
        <rect x="-6" y="-38" width="12" height="38" rx="6" className="circuit-lever__stick" />
        <circle cx="0" cy="-38" r="17" className="circuit-lever__knob" />
        <circle cx="-5" cy="-43" r="5" fill="#fff" opacity="0.6" />
      </g>
      <circle r="11" className="circuit-lever__pivot" />
      <circle cx="-40" cy="-46" r="11" className="circuit-lever__badge" />
      <text x="-40" y="-41" textAnchor="middle" className="circuit-lever__number">{number}</text>
      <text y="84" textAnchor="middle" className="circuit-lever__state">{on ? 'Ligada' : 'Desligada'}</text>
    </g>
  );
}

function Bulb({ state }) {
  return (
    <g transform="translate(560 160)" className={`circuit-bulb circuit-bulb--${state}`}>
      <circle r="62" className="circuit-bulb__glow" />
      {state === 'on' &&
        [-70, -35, 0, 35, 70].map((angle) => (
          <path key={angle} d="M0 -64 V-80" transform={`rotate(${angle})`} className="circuit-bulb__ray" />
        ))}
      <path d="M0 -52 C-28 -52 -44 -32 -44 -10 C-44 8 -34 18 -26 26 C-21 31 -20 36 -20 42 L20 42 C20 36 21 31 26 26 C34 18 44 8 44 -10 C44 -32 28 -52 0 -52 Z" className="circuit-bulb__glass" />
      <path d="M-24 -18 C-22 -30 -12 -38 0 -40" className="circuit-bulb__shine" />
      {state === 'unset' && <text y="6" textAnchor="middle" className="circuit-bulb__question">?</text>}
      {state !== 'unset' && <path d="M-10 20 L-10 4 L0 12 L10 4 L10 20" className="circuit-bulb__filament" />}
      <rect x="-20" y="42" width="40" height="10" rx="4" fill="#A9A3CF" />
      <rect x="-17" y="52" width="34" height="9" rx="4" fill="#8C86B8" />
      <rect x="-11" y="61" width="22" height="7" rx="3" fill="#6E6896" />
    </g>
  );
}

/**
 * Circuito com duas alavancas (à esquerda), uma porta lógica (no meio) e uma lâmpada (à direita).
 * phase: 'idle' (esperando o palpite) | 'inputs' (energia sai das alavancas ligadas)
 *        | 'output' (energia chega na lâmpada) | 'done' (resultado visível)
 */
export default function EnergyCircuit({ gate, a, b, phase = 'idle' }) {
  const power = circuitPower(gate, a, b);
  const inputsFlow = phase !== 'idle';
  const outputFlow = phase === 'output' || phase === 'done';
  const charged = Number(a) + Number(b);
  const bulb = !outputFlow ? 'unset' : power === 'strong' ? 'on' : power === 'weak' ? 'weak' : 'off';
  const needed = gate === 'E' ? 2 : 1;

  return (
    <div className={`energy-circuit energy-circuit--${gate === 'E' ? 'and' : 'or'}`}>
      <svg viewBox="0 0 660 320" role="img" aria-label={`Alavanca 1 ${a ? 'ligada' : 'desligada'}, alavanca 2 ${b ? 'ligada' : 'desligada'}, porta ${gate}.`}>
        {/* fios: base cinza + energia verde por cima */}
        <path d="M140 80 H250 Q290 80 290 120 V140 H330" className="circuit-wire" />
        <path d="M140 240 H250 Q290 240 290 200 V180 H330" className="circuit-wire" />
        <path d="M430 160 H500" className="circuit-wire" />
        <path d="M140 80 H250 Q290 80 290 120 V140 H330" pathLength="100" className={`circuit-energy ${a && inputsFlow ? 'is-flowing' : ''}`} />
        <path d="M140 240 H250 Q290 240 290 200 V180 H330" pathLength="100" className={`circuit-energy ${b && inputsFlow ? 'is-flowing' : ''}`} />
        <path d="M430 160 H500" pathLength="100" className={`circuit-energy circuit-energy--out circuit-energy--${power} ${outputFlow && power !== 'none' ? 'is-flowing' : ''}`} />

        <Lever x={80} y={80} on={a} number="1" />
        <Lever x={80} y={240} on={b} number="2" />

        {/* porta lógica com os "encaixes" de energia */}
        <g className={`circuit-gate ${inputsFlow && charged > 0 ? 'is-charged' : ''}`}>
          <rect x="330" y="105" width="100" height="110" rx="22" className="circuit-gate__box" />
          <text x="380" y="168" textAnchor="middle" className="circuit-gate__label">{gate}</text>
          {[0, 1].map((slot) => (
            <circle
              key={slot}
              cx={gate === 'E' ? 362 + slot * 36 : 380}
              cy="196"
              r="8"
              className={`circuit-gate__slot ${inputsFlow && slot < Math.min(charged, needed) ? 'is-filled' : ''}`}
              style={gate !== 'E' && slot === 1 ? { display: 'none' } : undefined}
            />
          ))}
        </g>

        <Bulb state={bulb} />
      </svg>
    </div>
  );
}
