import TruthLamp from './TruthLamp.jsx';
import ItemArt from '../art/ItemArt.jsx';
import PropertyIcon from '../art/PropertyIcon.jsx';
import './GateMachine.css';

/**
 * Máquina lógica com duas entradas (frases) ligadas por fios a uma porta ("E", "OU"...)
 * e uma lâmpada de saída.
 *
 * inputs: [{ subject, property, lamp: 'on' | 'off' | 'unset', text? }]
 * output: 'on' | 'off' | 'unset'
 * flowing: a energia corre pelos fios das entradas acesas
 * size: 'mini' (no laboratório) | 'large' (no zoom)
 */
export default function GateMachine({ inputs, output = 'unset', gate = 'E', flowing = false, size = 'large', className = '' }) {
  const wireOn = (index) => flowing && inputs[index].lamp === 'on';
  return (
    <div className={`gate-machine gate-machine--${size} ${className}`}>
      <div className="gate-machine__inputs">
        {inputs.map((input, index) => (
          <div key={index} className={`gate-input gate-input--${input.lamp}`}>
            <TruthLamp state={input.lamp} size={size === 'mini' ? 22 : 40} />
            <span className="gate-input__picture" aria-hidden="true">
              <ItemArt id={input.subject} size={size === 'mini' ? 30 : 58} />
              <PropertyIcon kind={input.property.kind} color={input.property.color} size={size === 'mini' ? 18 : 32} />
            </span>
            {input.text && size !== 'mini' && <span className="gate-input__text">{input.text}</span>}
          </div>
        ))}
      </div>

      <svg className="gate-machine__wires" viewBox="0 0 200 44" preserveAspectRatio="none" aria-hidden="true">
        <path d="M50 0 V14 Q50 26 70 26 H100 V44" className={`gate-wire ${wireOn(0) ? 'is-on' : ''}`} />
        <path d="M150 0 V14 Q150 26 130 26 H100 V44" className={`gate-wire ${wireOn(1) ? 'is-on' : ''}`} />
      </svg>

      <div className={`gate-machine__gate ${flowing ? 'is-working' : ''}`} aria-label={`porta ${gate}`}>
        {gate}
      </div>

      <svg className="gate-machine__wire-out" viewBox="0 0 20 30" preserveAspectRatio="none" aria-hidden="true">
        <path d="M10 0 V30" className={`gate-wire ${flowing && output === 'on' ? 'is-on' : ''}`} />
      </svg>

      <div className="gate-machine__output">
        <TruthLamp state={output} size={size === 'mini' ? 40 : 76} flash={output === 'on' && flowing} />
      </div>
    </div>
  );
}
