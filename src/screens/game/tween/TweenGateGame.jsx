import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowLeft, ArrowRight, Lightbulb, LightbulbOff, RotateCcw, Check } from 'lucide-react';
import TopBar from '../../../components/ui/TopBar.jsx';
import MascotDialogue from '../../../components/mascot/MascotDialogue.jsx';
import SpeakButton from '../../../components/ui/SpeakButton.jsx';
import StarBurst from '../../../components/ui/StarBurst.jsx';
import GameButton from '../../../components/ui/GameButton.jsx';
import GateMachine from '../../../components/ui/GateMachine.jsx';
import { getLevelScene } from '../../../components/scenery/scenes.js';
import GameFeedback from '../GameFeedback.jsx';
import { generateGateMachines } from '../../../data/tween/gateBalls.js';
import { gateOutput } from '../../../logic/validation.js';
import { starsFromErrors } from '../../../logic/scoring.js';
import { useGame, useNarration } from '../../../state/GameContext.jsx';
import { sfx } from '../../../audio/sfx.js';
import '../TruthLightsGame.css';
import '../GateMachinesGame.css';
import './tween.css';

const ZOOM_OUT_MS = 260;
const REVEAL_INPUTS_MS = 350;
const REVEAL_FLOW_MS = 950;
const REVEAL_OUTPUT_MS = 1550;
const VERDICT_MS = 1900;
const CLOSE_AFTER_RIGHT_MS = 1300;

const lamp = (value) => (value ? 'on' : 'off');
const VF = (value) => (value ? 'V' : 'F');

/** Zoom numa máquina: palpite (acende ou não?) e depois a máquina mostra o que acontece. */
function MachinePuzzle({ machine, gate, symbol, origin, closing, solved, onAnswer, onClose }) {
  const { autoSpeak } = useNarration();
  const [step, setStep] = useState(solved ? 'done' : 'asking'); // asking | inputs | flow | output | right | wrong | done
  const [guess, setGuess] = useState(null);
  const timers = useRef([]);
  const result = gateOutput(gate, machine.a.value, machine.b.value);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  useEffect(() => {
    const onKey = (event) => event.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms));

  const predict = (value) => {
    if (step !== 'asking') return;
    setGuess(value);
    sfx.play(value ? 'pick' : 'tap');
    later(() => setStep('inputs'), REVEAL_INPUTS_MS);
    later(() => setStep('flow'), REVEAL_FLOW_MS);
    later(() => setStep('output'), REVEAL_OUTPUT_MS);
    later(() => {
      const right = value === result;
      setStep(right ? 'right' : 'wrong');
      onAnswer(right);
      if (right) later(onClose, CLOSE_AFTER_RIGHT_MS);
      else autoSpeak(machine.hint);
    }, VERDICT_MS);
  };

  const retry = () => {
    sfx.play('tap');
    setGuess(null);
    setStep('asking');
    autoSpeak(machine.question);
  };

  const shown = step !== 'asking';
  const flowing = ['flow', 'output', 'right', 'wrong', 'done'].includes(step);
  const outputShown = ['output', 'right', 'wrong', 'done'].includes(step);

  return createPortal(
    <div className={`lamp-zoom ${closing ? 'is-closing' : ''}`} role="dialog" aria-modal="true" aria-label={machine.question.text} onClick={onClose}>
      <div className="lamp-zoom__card machine-zoom" style={{ '--dx': `${origin.dx}px`, '--dy': `${origin.dy}px` }} onClick={(event) => event.stopPropagation()}>
        <button type="button" className="lamp-zoom__back" onClick={onClose} aria-label="Voltar para o laboratório">
          <ArrowLeft size={24} strokeWidth={2.8} />
        </button>
        <p className="machine-zoom__title">
          Máquina do {gate} · p {symbol} q
        </p>

        <GateMachine
          gate={gate}
          gateLabel={symbol}
          className="tween-gate"
          inputs={[
            { ...machine.a, lamp: shown ? lamp(machine.a.value) : 'unset' },
            { ...machine.b, lamp: shown ? lamp(machine.b.value) : 'unset' },
          ]}
          output={outputShown ? lamp(result) : 'unset'}
          flowing={flowing}
        />

        <div className="machine-zoom__question">
          <SpeakButton line={machine.question} compact />
          <span>{step === 'wrong' ? machine.hint.text : `A Máquina do ${gate} acende?`}</span>
        </div>

        {step === 'asking' && (
          <div className="lamp-zoom__choices">
            <button type="button" className="lamp-choice lamp-choice--no" onClick={() => predict(false)}>
              <span className="lamp-choice__icon" aria-hidden="true">
                <LightbulbOff size={28} strokeWidth={2.6} />
              </span>
              Não acende (F)
            </button>
            <button type="button" className="lamp-choice lamp-choice--yes" onClick={() => predict(true)}>
              <span className="lamp-choice__icon" aria-hidden="true">
                <Lightbulb size={28} strokeWidth={2.6} />
              </span>
              Acende (V)
            </button>
          </div>
        )}

        {shown && step !== 'wrong' && step !== 'right' && step !== 'done' && (
          <p className="machine-zoom__guess">
            Seu palpite: <strong>{guess ? 'acende' : 'não acende'}</strong>
          </p>
        )}

        {(step === 'right' || step === 'done') && (
          <p className="machine-zoom__verdict is-right">
            <Check size={22} strokeWidth={3.2} aria-hidden="true" /> p é {VF(machine.a.value)}, q é {VF(machine.b.value)}: p {symbol} q é {VF(result)}!
          </p>
        )}

        {step === 'wrong' && (
          <button type="button" className="machine-zoom__retry" onClick={retry}>
            <RotateCcw size={20} strokeWidth={2.8} aria-hidden="true" /> Tentar de novo
          </button>
        )}
      </div>
    </div>,
    document.body,
  );
}

/**
 * Máquinas lógicas para 9 a 12 anos (E ou OU): as máquinas do 5–8 com frases sobre bolinhas (p e q).
 * As quatro máquinas cobrem as quatro combinações de V e F; no fim, viram a tabela-verdade da porta.
 */
export default function TweenGateGame({ challenge, level, onExit, onComplete }) {
  const { profile, completeLevel } = useGame();
  const { autoSpeak } = useNarration();
  const difficultyId = profile?.difficulty ?? 'easy';
  const { feedback, mission, gate, symbol } = challenge;
  const Scene = getLevelScene(challenge.scene);

  const machines = useMemo(() => generateGateMachines(difficultyId, gate), [difficultyId, gate]);
  const [solved, setSolved] = useState([]);
  const [zoom, setZoom] = useState(null);
  const [line, setLine] = useState(mission);
  const [lineCount, setLineCount] = useState(0);
  const [tone, setTone] = useState('default');
  const [errors, setErrors] = useState(0);
  const [allDone, setAllDone] = useState(false);
  const [stars, setStars] = useState(null);
  const timers = useRef([]);
  const tableRef = useRef(null);

  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms));
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  useEffect(() => {
    autoSpeak(mission);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openMachine = (machine, event) => {
    if (allDone) return;
    const rect = event.currentTarget.getBoundingClientRect();
    sfx.play('open');
    setZoom({ id: machine.id, dx: rect.left + rect.width / 2 - window.innerWidth / 2, dy: rect.top + rect.height / 2 - window.innerHeight / 2, closing: false });
    if (!solved.includes(machine.id)) autoSpeak(machine.question);
  };

  const closeMachine = () => {
    setZoom((current) => (current ? { ...current, closing: true } : current));
    later(() => setZoom(null), ZOOM_OUT_MS);
  };

  const handleAnswer = (machineId, right) => {
    if (!right) {
      sfx.play('tryAgain');
      setErrors((count) => count + 1);
      const machine = machines.find((item) => item.id === machineId);
      setLine(machine.hint);
      setTone('hint');
      setLineCount((count) => count + 1);
      return;
    }
    sfx.play('correct');
    setLine(mission);
    setTone('default');
    setSolved((current) => (current.includes(machineId) ? current : [...current, machineId]));
  };

  // Todas as máquinas testadas: as quatro viram a tabela-verdade.
  useEffect(() => {
    if (solved.length !== machines.length || allDone) return undefined;
    const timer = setTimeout(() => {
      setAllDone(true);
      sfx.play('success');
      setLine(challenge.table);
      setTone('success');
      setLineCount((count) => count + 1);
      autoSpeak(challenge.table);
      later(() => tableRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' }), 200);
    }, CLOSE_AFTER_RIGHT_MS + ZOOM_OUT_MS + 100);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [solved.length]);

  const finish = () => {
    sfx.play('tap');
    const earned = starsFromErrors(errors);
    completeLevel(level.id, earned);
    setStars(earned);
    autoSpeak(feedback.success);
  };

  // Linhas da tabela na ordem clássica: VV, VF, FV, FF.
  const rows = [...machines].sort((x, y) => Number(y.a.value) * 2 + Number(y.b.value) - (Number(x.a.value) * 2 + Number(x.b.value)));
  const zoomed = zoom && machines.find((machine) => machine.id === zoom.id);

  return (
    <div className="screen game-screen gates-screen tween-screen">
      <Scene />
      <TopBar onBack={onExit} backLabel="Voltar ao mapa" title={level.name} />

      <div className="game-layout gates-layout">
        <MascotDialogue
          line={line}
          bubbleKey={`${line.id}-${lineCount}`}
          mood={tone === 'hint' ? 'encourage' : tone === 'success' ? 'cheer' : 'curious'}
          mascotSize={84}
          layout="compact"
          tone={tone}
          className="game-dialogue"
        />

        <div className={`gates-grid ${allDone ? 'is-solved' : ''}`}>
          {allDone && <StarBurst />}
          {machines.map((machine, index) => {
            const isSolved = solved.includes(machine.id);
            const result = gateOutput(gate, machine.a.value, machine.b.value);
            return (
              <button
                key={machine.id}
                type="button"
                className={`gate-card ${isSolved ? 'is-solved' : 'is-open'}`}
                style={{ animationDelay: `${index * 0.25}s` }}
                onClick={(event) => openMachine(machine, event)}
                disabled={allDone}
                aria-label={`Máquina ${index + 1}: ${machine.question.text}${isSolved ? ' Resolvida.' : ''}`}
              >
                <span className="gate-card__number">{index + 1}</span>
                {isSolved && (
                  <span className="gate-card__check" aria-hidden="true">
                    <Check size={18} strokeWidth={3.4} />
                  </span>
                )}
                <GateMachine
                  size="mini"
                  gate={gate}
                  gateLabel={symbol}
                  className="tween-gate"
                  inputs={[
                    { ...machine.a, lamp: isSolved ? lamp(machine.a.value) : 'unset' },
                    { ...machine.b, lamp: isSolved ? lamp(machine.b.value) : 'unset' },
                  ]}
                  output={isSolved ? lamp(result) : 'unset'}
                  flowing={isSolved}
                />
              </button>
            );
          })}
        </div>

        {!allDone && (
          <p className="gates-progress" aria-live="polite">
            {solved.length} de {machines.length} máquinas testadas
          </p>
        )}

        {allDone && (
          <section ref={tableRef} className="tween-reveal gate-table" aria-label={`Tabela do ${gate}`}>
            <p className="tween-reveal__label">A tabela do {gate}</p>
            <table>
              <thead>
                <tr>
                  <th>p</th>
                  <th>q</th>
                  <th className="is-key">p {symbol} q</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((machine) => {
                  const result = gateOutput(gate, machine.a.value, machine.b.value);
                  return (
                    <tr key={machine.id}>
                      <td className={machine.a.value ? 'is-v' : 'is-f'}>{VF(machine.a.value)}</td>
                      <td className={machine.b.value ? 'is-v' : 'is-f'}>{VF(machine.b.value)}</td>
                      <td className={`is-key ${result ? 'is-v' : 'is-f'}`}>{VF(result)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <p className="tween-reveal__note">{challenge.tableNote}</p>
            <GameButton variant="green" size="lg" iconRight={ArrowRight} onClick={finish} sound={null}>
              Terminar
            </GameButton>
          </section>
        )}
      </div>

      {zoomed && (
        <MachinePuzzle
          key={zoomed.id}
          machine={zoomed}
          gate={gate}
          symbol={symbol}
          origin={zoom}
          closing={zoom.closing}
          solved={solved.includes(zoomed.id)}
          onAnswer={(right) => handleAnswer(zoomed.id, right)}
          onClose={closeMachine}
        />
      )}

      {stars !== null && <GameFeedback line={feedback.success} onContinue={() => onComplete(stars)} />}
    </div>
  );
}
