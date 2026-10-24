import TruthLamp from './TruthLamp.jsx';
import { LeverArt } from './LeverMachine.jsx';
import DoorArt from '../art/DoorArt.jsx';
import ItemArt from '../art/ItemArt.jsx';
import PropertyIcon from '../art/PropertyIcon.jsx';

/**
 * Desenho de uma coisa do Espelho do NÃO no estado pedido.
 * value: true/false (acesa, ligada, aberta, verdade) ou undefined (ainda sem resposta)
 */
export default function MirrorItem({ row, value, reflected = false, size = 'md' }) {
  const big = size === 'lg';
  if (row.kind === 'lamp') return <TruthLamp state={value === undefined ? 'unset' : value ? 'on' : 'off'} size={big ? 70 : 52} />;
  if (row.kind === 'lever') return <LeverArt on={Boolean(value)} color="#3B95E8" className="mirror-lever" />;
  if (row.kind === 'door') return <DoorArt open={Boolean(value)} size={big ? 66 : 50} />;
  // frase: desenho + texto + lâmpada da verdade
  return (
    <span className="mirror-phrase">
      <span className="mirror-phrase__picture">
        <ItemArt id={row.subject} size={big ? 46 : 38} />
        <PropertyIcon kind={row.property.kind} color={row.property.color} size={big ? 26 : 22} />
        {reflected && <span className="mirror-phrase__not">NÃO</span>}
      </span>
      <span className="mirror-phrase__text">{reflected ? row.notText : row.text}</span>
      <TruthLamp state={value === undefined ? 'unset' : value ? 'on' : 'off'} size={big ? 40 : 34} />
    </span>
  );
}
