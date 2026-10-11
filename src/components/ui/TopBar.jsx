import { House, ArrowLeft, Star } from 'lucide-react';
import AudioControls from './AudioControls.jsx';
import { sfx } from '../../audio/sfx.js';
import './TopBar.css';

/** Barra superior das telas: voltar/início, título, estrelas e áudio. */
export default function TopBar({ onHome, onBack, backLabel = 'Voltar', title, stars, children, transparent = false }) {
  return (
    <header className={`topbar ${transparent ? 'topbar--transparent' : ''}`}>
      <div className="topbar__side">
        {onBack && (
          <button type="button" className="topbar__icon-btn" onClick={() => { sfx.play('tap'); onBack(); }} aria-label={backLabel} title={backLabel}>
            <ArrowLeft size={24} strokeWidth={2.8} />
          </button>
        )}
        {onHome && (
          <button type="button" className="topbar__icon-btn" onClick={() => { sfx.play('tap'); onHome(); }} aria-label="Menu principal" title="Menu principal">
            <House size={24} strokeWidth={2.6} />
          </button>
        )}
      </div>

      {title && <h1 className="topbar__title">{title}</h1>}

      <div className="topbar__side topbar__side--right">
        {children}
        {typeof stars === 'number' && (
          <div className="topbar__stars" aria-label={`${stars} estrelas`}>
            <Star size={22} fill="currentColor" strokeWidth={2} />
            <span>{stars}</span>
          </div>
        )}
        <AudioControls />
      </div>
    </header>
  );
}
