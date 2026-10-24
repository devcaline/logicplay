import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Power, Check, X, ArrowLeft } from 'lucide-react';
import TopBar from '../../components/ui/TopBar.jsx';
import MascotDialogue from '../../components/mascot/MascotDialogue.jsx';
import GameButton from '../../components/ui/GameButton.jsx';
import SpeakButton from '../../components/ui/SpeakButton.jsx';
import StarBurst from '../../components/ui/StarBurst.jsx';
import TruthLamp from '../../components/ui/TruthLamp.jsx';
import ItemArt from '../../components/art/ItemArt.jsx';
import PropertyIcon from '../../components/art/PropertyIcon.jsx';
import { Gear } from '../../components/scenery/sceneParts.jsx';
import { getLevelScene } from '../../components/scenery/scenes.js';
import GameFeedback from './GameFeedback.jsx';
import { validateTruthAnswers } from '../../logic/validation.js';
import { useGame, useNarration } from '../../state/GameContext.jsx';
import { sfx } from '../../audio/sfx.js';
import './TruthLightsGame.css';

const ZOOM_OUT_MS = 260; // duração do "afastar" ao fechar o desafio de uma lâmpada
const CHOICE_PAUSE_MS = 450; // tempo para ver a lâmpada acender/apagar antes de voltar à máquina

/** Desafio de uma lâmpada, aberto com zoom a partir dela (estilo jogo de puzzle). */
function LampPuzzle({ statement, value, origin, labels, closing, onChoose, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (event) => event.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const lamp = value === true ? 'on' : value === false ? 'off' : 'unset';
  return createPortal(
    <div className={`lamp-zoom ${closing ? 'is-closing' : ''}`} role="dialog" aria-modal="true" aria-label={statement.line.text} onClick={onClose}>
      <div className="lamp-zoom__card" style={{ '--dx': `${origin.dx}px`, '--dy': `${origin.dy}px` }} onClick={(event) => event.stopPropagation()}>
        <button ref={closeRef} type="button" className="lamp-zoom__back" onClick={onClose} aria-label="Voltar para a máquina">
          <ArrowLeft size={24} strokeWidth={2.8} />
        </button>

        <TruthLamp state={lamp} size={86} />

        <div className="lamp-zoom__picture" aria-hidden="true">
          <span className="lamp-zoom__subject">
            <ItemArt id={statement.subject} size={96} />
          </span>
          <span className="lamp-zoom__property">
            <PropertyIcon kind={statement.property.kind} color={statement.property.color} size={56} />
          </span>
        </div>

        <p className="lamp-zoom__text">{statement.line.text}</p>
        <SpeakButton line={statement.line} />

        <div className="lamp-zoom__choices">
          <button type="button" className={`lamp-choice lamp-choice--no ${value === false ? 'is-active' : ''}`} onClick={() => onChoose(false)}>
            <span className="lamp-choice__icon" aria-hidden="true">
              <X size={30} strokeWidth={3.4} />
            </span>
            {labels.no}
          </button>
          <button type="button" className={`lamp-choice lamp-choice--yes ${value === true ? 'is-active' : ''}`} onClick={() => onChoose(true)}>
            <span className="lamp-choice__icon" aria-hidden="true">
              <Check size={30} strokeWidth={3.4} />
            </span>
            {labels.yes}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

/**
 * Luzes da verdade: uma máquina com quatro lâmpadas. Tocar numa lâmpada aproxima o desafio dela
 * (a frase ilustrada) e a criança escolhe verdadeiro (acende) ou falso (apaga). Depois liga a máquina.
 */
export default function TruthLightsGame({ challenge, level, onExit, onComplete }) {
  const { completeLevel } = useGame();
  const { autoSpeak } = useNarration();
  const { statements, feedback, mission, answers: labels } = challenge;
  const Scene = getLevelScene(challenge.scene);

  const [answers, setAnswers] = useState({});
  const [marked, setMarked] = useState({ wrong: [], missing: [] });
  const [status, setStatus] = useState('playing'); // playing | hint | success
  const [line, setLine] = useState(mission);
  const [lineCount, setLineCount] = useState(0);
  const [zoom, setZoom] = useState(null); // { id, dx, dy, closing }
  const [showFeedback, setShowFeedback] = useState(false);
  const timers = useRef([]);
  const done = status === 'success';

  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms));
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  useEffect(() => {
    autoSpeak(mission);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!done) return undefined;
    const timer = setTimeout(() => setShowFeedback(true), 1700);
    return () => clearTimeout(timer);
  }, [done]);

  const say = (nextLine) => {
    setLine(nextLine);
    setLineCount((count) => count + 1);
    autoSpeak(nextLine);
  };

  // Abre o desafio da lâmpada com zoom saindo dela.
  const openLamp = (statement, event) => {
    if (done) return;
    const rect = event.currentTarget.getBoundingClientRect();
    sfx.play('open');
    setZoom({
      id: statement.id,
      dx: rect.left + rect.width / 2 - window.innerWidth / 2,
      dy: rect.top + rect.height / 2 - window.innerHeight / 2,
      closing: false,
    });
    autoSpeak(statement.line);
  };

  const closeLamp = () => {
    setZoom((current) => (current ? { ...current, closing: true } : current));
    later(() => setZoom(null), ZOOM_OUT_MS);
  };

  const choose = (value) => {
    if (!zoom) return;
    const { id } = zoom;
    sfx.play(value ? 'pick' : 'tap');
    setAnswers((current) => ({ ...current, [id]: value }));
    setMarked((current) => ({ wrong: current.wrong.filter((item) => item !== id), missing: current.missing.filter((item) => item !== id) }));
    later(closeLamp, CHOICE_PAUSE_MS);
  };

  const handleMachine = () => {
    if (done) return;
    const result = validateTruthAnswers(statements, answers);
    if (result.correct) {
      setStatus('success');
      setMarked({ wrong: [], missing: [] });
      sfx.play('success');
      completeLevel(level.id, 3);
      say(feedback.success);
      return;
    }
    sfx.play('tryAgain');
    setStatus('hint');
    setMarked({ wrong: result.wrong, missing: result.unanswered });
    if (result.unanswered.length > 0) {
      say(feedback.unanswered);
      return;
    }
    say(statements.find((statement) => statement.id === result.wrong[0]).hint);
  };

  const lampState = (id) => (answers[id] === true ? 'on' : answers[id] === false ? 'off' : 'unset');
  const answeredCount = statements.filter((statement) => typeof answers[statement.id] === 'boolean').length;
  const zoomed = zoom && statements.find((statement) => statement.id === zoom.id);

  return (
    <div className="screen game-screen truth-screen">
      <Scene />
      <TopBar onBack={onExit} backLabel="Voltar ao mapa" title={level.name} />

      <div className="game-layout truth-layout">
        <MascotDialogue
          line={line}
          bubbleKey={`${line.id}-${lineCount}`}
          mood={status === 'hint' ? 'encourage' : 'curious'}
          mascotSize={84}
          layout="compact"
          tone={status === 'hint' ? 'hint' : 'default'}
          className={`game-dialogue ${done ? 'is-hidden' : ''}`}
        />

        <div className={`truth-machine ${done ? 'is-on' : ''}`}>
          {done && <StarBurst />}
          <div className="truth-machine__pipes" aria-hidden="true">
            <span />
            <span />
          </div>

          <div className="truth-machine__body">
            <div className="truth-machine__screen" aria-live="polite">
              {done ? 'Máquina ligada!' : `${answeredCount} de ${statements.length} luzes`}
            </div>

            <div className="truth-machine__slots">
              {statements.map((statement, index) => {
                const state = lampState(statement.id);
                return (
                  <button
                    key={statement.id}
                    type="button"
                    className={`machine-slot machine-slot--${state} ${marked.wrong.includes(statement.id) ? 'is-wrong' : ''} ${
                      marked.missing.includes(statement.id) ? 'is-missing' : ''
                    }`}
                    style={{ animationDelay: `${index * 0.2}s` }}
                    onClick={(event) => openLamp(statement, event)}
                    disabled={done}
                    aria-label={`Lâmpada ${index + 1}: ${statement.line.text} ${state === 'on' ? 'Escolhido: verdadeiro.' : state === 'off' ? 'Escolhido: falso.' : 'Toque para responder.'}`}
                  >
                    <TruthLamp state={state} size={56} flash={done && state === 'on'} />
                    <span className="machine-slot__plate" aria-hidden="true">
                      <ItemArt id={statement.subject} size={34} />
                    </span>
                  </button>
                );
              })}
            </div>

            <span className="truth-machine__gear truth-machine__gear--left" aria-hidden="true">
              <svg viewBox="-30 -30 60 60" width="100%" height="100%">
                <Gear x={0} y={0} r={26} color="#C9B8FF" />
              </svg>
            </span>
            <span className="truth-machine__gear truth-machine__gear--right" aria-hidden="true">
              <svg viewBox="-30 -30 60 60" width="100%" height="100%">
                <Gear x={0} y={0} r={26} color="#FFD43B" spin="ccw" />
              </svg>
            </span>
          </div>
          <div className="truth-machine__base" aria-hidden="true" />
        </div>

        <div className="game-actions">
          <GameButton variant="lilac" size="lg" icon={Power} onClick={handleMachine} disabled={done} sound={null}>
            Ligar a máquina
          </GameButton>
        </div>
      </div>

      {zoomed && (
        <LampPuzzle
          statement={zoomed}
          value={answers[zoomed.id]}
          origin={zoom}
          labels={labels}
          closing={zoom.closing}
          onChoose={choose}
          onClose={closeLamp}
        />
      )}

      {showFeedback && <GameFeedback line={feedback.success} onContinue={onComplete} />}
    </div>
  );
}
