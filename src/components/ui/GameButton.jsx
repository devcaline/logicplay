import { sfx } from '../../audio/sfx.js';
import './GameButton.css';

/** Botão grande e arredondado, com ícone e efeito de "apertar". */
export default function GameButton({
  children,
  icon: Icon,
  iconRight: IconRight,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  sound = 'tap',
  onClick,
  ...props
}) {
  const handleClick = (event) => {
    sfx.play(sound);
    onClick?.(event);
  };
  return (
    <button type={type} className={`game-btn game-btn--${variant} game-btn--${size} ${className}`} onClick={handleClick} {...props}>
      {Icon && <Icon className="game-btn__icon" size={size === 'lg' ? 28 : 22} strokeWidth={2.6} aria-hidden="true" />}
      {children && <span className="game-btn__label">{children}</span>}
      {IconRight && <IconRight className="game-btn__icon" size={size === 'lg' ? 28 : 22} strokeWidth={2.6} aria-hidden="true" />}
    </button>
  );
}
