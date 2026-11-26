import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Power, ArrowLeft, ArrowRight, Check } from 'lucide-react';
import TopBar from '../../../components/ui/TopBar.jsx';
import MascotDialogue from '../../../components/mascot/MascotDialogue.jsx';
import GameButton from '../../../components/ui/GameButton.jsx';
import SpeakButton from '../../../components/ui/SpeakButton.jsx';
import StarBurst from '../../../components/ui/StarBurst.jsx';
import TruthLamp from '../../../components/ui/TruthLamp.jsx';
import { Gear } from '../../../components/scenery/sceneParts.jsx';
import { getLevelScene } from '../../../components/scenery/scenes.js';
import GameFeedback from '../GameFeedback.jsx';
import { generateTweenTruth } from '../../../data/tween/truthBalls.js';
import { validateTruthAnswers } from '../../../logic/validation.js';
import { starsFromErrors } from '../../../logic/scoring.js';
import { useGame, useNarration } from '../../../state/GameContext.jsx';
import { sfx } from '../../../audio/sfx.js';
import '../TruthLightsGame.css';
import './tween.css';

const ZOOM_OUT_MS = 260;
const CHOICE_PAUSE_MS = 450;

const speechLine = (statement) => ({ id: `t9.l1.${statement.id}`, text: statement.speech });

/** Desafio de uma lâmpada, aberto com zoom a partir dela. */
function LampPuzzle({ statement, groups, value, origin, closing, onChoose, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (event) => event.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const lamp = value === true ? 'on' : value === false ? 'off' : 'unset';
  return createPortal(
    <div className={`lamp-zoom ${closing ? 'is-closing' : ''}`} role="dialog" aria-modal="true" aria-label={statement.speech} onClick={onClose}>
      <div className="lamp-zoom__card" style={{ '--dx': `${origin.dx}px`, '--dy': `${origin.dy}px` }} onClick={(event) => event.stopPropagation()}>
        <button ref={closeRef} type="button" className="lamp-zoom__back" onClick={onClose} aria-label="Voltar para a máquina">
          <ArrowLeft size={24} strokeWidth={2.8} />
        </button>

        <TruthLamp state={lamp} size={80} />

        {statement.ball ? (
          <span className={`num-ball num-ball--${statement.ball.color} truth-ball`} aria-hidden="true">
            {statement.ball.n}
          </span>
        ) : (
          <div className="truth-groups truth-groups--zoom" aria-hidden="true">
            {groups.map((group) => (
              <span key={group}>{group}</span>
            ))}
          </div>
        )}

        <p className="lamp-zoom__text truth-statement">
          <span className="truth-statement__name">{statement.name}:</span> {statement.text}
        </p>
        <SpeakButton line={speechLine(statement)} />

        <div className="lamp-zoom__choices">
          <button type="button" className={`lamp-choice lamp-choice--no ${value === false ? 'is-active' : ''}`} onClick={() => onChoose(false)}>
            <span className="lamp-choice__icon truth-letter" aria-hidden="true">F</span>
            falso
          </button>
          <button type="button" className={`lamp-choice lamp-choice--yes ${value === true ? 'is-active' : ''}`} onClick={() => onChoose(true)}>
            <span className="lamp-choice__icon truth-letter" aria-hidden="true">V</span>
            verdadeiro
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

/**
 * Luzes da Verdade para 9 a 12 anos: a máquina de lâmpadas do 5–8 com frases sobre bolinhas
 * numeradas. Cada frase tem um nome (p, q, r, s) e a resposta é V ou F. Duas máquinas:
 * frases sobre as bolinhas e frases com os símbolos da Floresta (∈, ∉, ∩).
 */
export default function TweenTruthGame({ challenge, level, onExit, onComplete }) {
  const { profile, completeLevel } = useGame();
  const { autoSpeak } = useNarration();
  const difficultyId = profile?.difficulty ?? 'easy';
  const Scene = getLevelScene(challenge.scene);
  const { feedback } = challenge;

  const machines = useMemo(() => generateTweenTruth(difficultyId), [difficultyId]);
  const [machineIndex, setMachineIndex] = useState(0);
  const machine = machines[machineIndex];
  const { statements } = machine;
  const lastMachine = machineIndex === machines.length - 1;

  const missionLine = useMemo(
    () => ({ id: `t9.l1.${machine.id}`, text: machineIndex === 0 ? challenge.missions.balls : challenge.missions.symbols }),
    [machine, machineIndex, challenge.missions],
  );

  const [answers, setAnswers] = useState({});
  const [marked, setMarked] = useState({ wrong: [], missing: [] });
  const [status, setStatus] = useState('playing'); // playing | hint | done
  const [line, setLine] = useState(missionLine);
  const [lineCount, setLineCount] = useState(0);
  const [zoom, setZoom] = useState(null);
  const [errors, setErrors] = useState(0);
  const [stars, setStars] = useState(null);
  const timers = useRef([]);
  const revealRef = useRef(null);
  const done = status === 'done';

  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms));
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const say = (next) => {
    setLine(next);
    setLineCount((count) => count + 1);
    autoSpeak(next);
  };

  useEffect(() => {
    say(missionLine);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [machineIndex]);

  useEffect(() => {
    if (done) revealRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [done]);

  const openLamp = (statement, event) => {
    if (done) return;
    const rect = event.currentTarget.getBoundingClientRect();
    sfx.play('open');
    setZoom({ id: statement.id, dx: rect.left + rect.width / 2 - window.innerWidth / 2, dy: rect.top + rect.height / 2 - window.innerHeight / 2, closing: false });
    autoSpeak(speechLine(statement));
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
      setStatus('done');
      setMarked({ wrong: [], missing: [] });
      sfx.play('success');
      say({ id: `t9.l1.${machine.id}.done`, text: challenge.reveal[machine.id] });
      return;
    }
    sfx.play('tryAgain');
    setStatus('hint');
    setMarked({ wrong: result.wrong, missing: result.unanswered });
    if (result.unanswered.length > 0) {
      say(feedback.unanswered);
      return;
    }
    setErrors((count) => count + 1);
    const first = statements.find((statement) => statement.id === result.wrong[0]);
    say({ id: `t9.l1.hint.${first.id}`, text: `A lâmpada ${first.name} não está certa. ${first.hint}` });
  };

  const goNext = () => {
    sfx.play('tap');
    if (lastMachine) {
      const earned = starsFromErrors(errors);
      completeLevel(level.id, earned);
      setStars(earned);
      autoSpeak(feedback.success);
      return;
    }
    setMachineIndex(machineIndex + 1);
    setAnswers({});
    setStatus('playing');
  };

  const lampState = (id) => (answers[id] === true ? 'on' : answers[id] === false ? 'off' : 'unset');
  const answeredCount = statements.filter((statement) => typeof answers[statement.id] === 'boolean').length;
  const zoomed = zoom && statements.find((statement) => statement.id === zoom.id);

  return (
    <div className="screen game-screen truth-screen tween-screen">
      <Scene />
      <TopBar onBack={onExit} backLabel="Voltar ao mapa" title={level.name} />

      <div className="game-layout truth-layout">
        <div className="tween-steps" aria-label={`Máquina ${machineIndex + 1} de ${machines.length}`}>
          {machines.map((item, index) => {
            const finished = index < machineIndex || (index === machineIndex && done);
            return (
              <span key={item.id} className={`tween-step ${finished ? 'is-done' : ''} ${index === machineIndex ? 'is-current' : ''}`}>
                {finished ? <Check size={14} strokeWidth={3.5} /> : index + 1}
              </span>
            );
          })}
        </div>

        <MascotDialogue
          line={line}
          bubbleKey={`${line.id}-${lineCount}`}
          mood={status === 'hint' ? 'encourage' : done ? 'cheer' : 'curious'}
          mascotSize={84}
          layout="compact"
          tone={status === 'hint' ? 'hint' : done ? 'success' : 'default'}
          className="game-dialogue"
        />

        {machine.groups.length > 0 && (
          <div className="truth-groups" aria-label="Os grupos">
            {machine.groups.map((group) => (
              <span key={group}>{group}</span>
            ))}
          </div>
        )}

        <div className={`truth-machine ${done ? 'is-on' : ''}`}>
          {done && <StarBurst />}
          <div className="truth-machine__pipes" aria-hidden="true">
            <span />
            <span />
          </div>

          <div className="truth-machine__body">
            <div className="truth-machine__screen" aria-live="polite">
              {done ? 'Máquina ligada!' : `${machine.title} · ${answeredCount} de ${statements.length}`}
            </div>

            <div className="truth-machine__slots truth-machine__slots--2x2">
              {statements.map((statement, index) => {
                const state = lampState(statement.id);
                return (
                  <button
                    key={statement.id}
                    type="button"
                    className={`machine-slot machine-slot--${state} ${marked.wrong.includes(statement.id) ? 'is-wrong' : ''} ${marked.missing.includes(statement.id) ? 'is-missing' : ''}`}
                    style={{ animationDelay: `${index * 0.2}s` }}
                    onClick={(event) => openLamp(statement, event)}
                    disabled={done}
                    aria-label={`Lâmpada ${statement.name}: ${statement.speech} ${state === 'on' ? 'Escolhido: verdadeiro.' : state === 'off' ? 'Escolhido: falso.' : 'Toque para responder.'}`}
                  >
                    <TruthLamp state={state} size={56} flash={done && state === 'on'} />
                    <span className="machine-slot__plate truth-plate" aria-hidden="true">
                      {statement.name}
                      {state !== 'unset' && <small>{state === 'on' ? 'V' : 'F'}</small>}
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

        {done && (
          <section ref={revealRef} className="tween-reveal truth-reveal" aria-label="Como os matemáticos escrevem">
            <p className="tween-reveal__label">Como os matemáticos escrevem</p>
            <ul>
              {statements.map((statement) => (
                <li key={statement.id} className={statement.value ? 'is-true' : 'is-false'}>
                  <span className="truth-reveal__name">{statement.name}:</span>
                  <span className="truth-reveal__text">{statement.text}</span>
                  <span className="truth-reveal__value">{statement.value ? 'V' : 'F'}</span>
                  <span className="truth-reveal__why">{statement.why}</span>
                </li>
              ))}
            </ul>
            <p className="tween-reveal__note">Uma frase que pode ser V (verdadeira) ou F (falsa) se chama proposição.</p>
          </section>
        )}

        <div className="game-actions">
          {done ? (
            <GameButton variant="green" size="lg" iconRight={ArrowRight} onClick={goNext} sound={null}>
              {lastMachine ? 'Terminar' : 'Próxima máquina'}
            </GameButton>
          ) : (
            <GameButton variant="lilac" size="lg" icon={Power} onClick={handleMachine} sound={null}>
              Ligar a máquina
            </GameButton>
          )}
        </div>
      </div>

      {zoomed && (
        <LampPuzzle
          statement={zoomed}
          groups={machine.groups}
          value={answers[zoomed.id]}
          origin={zoom}
          closing={zoom.closing}
          onChoose={choose}
          onClose={closeLamp}
        />
      )}

      {stars !== null && <GameFeedback line={feedback.success} onContinue={() => onComplete(stars)} />}
    </div>
  );
}
