import { useEffect, useRef, useState } from 'react';
import { Cog, CircleSlash, RotateCcw } from 'lucide-react';
import TopBar from '../../components/ui/TopBar.jsx';
import MascotDialogue from '../../components/mascot/MascotDialogue.jsx';
import SpeakButton from '../../components/ui/SpeakButton.jsx';
import StarBurst from '../../components/ui/StarBurst.jsx';
import LeverMachine from '../../components/ui/LeverMachine.jsx';
import { getLevelScene } from '../../components/scenery/scenes.js';
import GameFeedback from './GameFeedback.jsx';
import { gateOutput } from '../../logic/validation.js';
import { useGame, useNarration } from '../../state/GameContext.jsx';
import { sfx } from '../../audio/sfx.js';
import './LeverMachineGame.css';

const REVEAL_MS = 450; // depois do palpite, a máquina tenta funcionar
const VERDICT_MS = 1500; // tempo vendo a máquina girar (ou travar) antes do veredito
const NEXT_ROUND_MS = 1300; // depois de acertar, segue para a próxima rodada

/**
 * Máquina de alavancas: rodadas com combinações de alavancas. Na maioria, a criança diz se a
 * máquina funciona; na rodada prática, ela mesma liga uma alavanca (uma está emperrada).
 */
export default function LeverMachineGame({ challenge, level, onExit, onComplete }) {
  const { completeLevel } = useGame();
  const { autoSpeak } = useNarration();
  const { rounds, feedback, levers, gate, answers: labels } = challenge;
  const Scene = getLevelScene(challenge.scene);

  const [index, setIndex] = useState(0);
  const [values, setValues] = useState(rounds[0].values);
  const [machineState, setMachineState] = useState('idle'); // idle | working | stopped
  const [phase, setPhase] = useState('asking'); // asking | revealing | right | wrong | success
  const [line, setLine] = useState(rounds[0].question);
  const [lineCount, setLineCount] = useState(0);
  const [wiggle, setWiggle] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const timers = useRef([]);

  const round = rounds[index];
  const done = phase === 'success';

  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms));
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  useEffect(() => {
    autoSpeak(rounds[0].question);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!done) return undefined;
    const timer = setTimeout(() => setShowFeedback(true), 1600);
    return () => clearTimeout(timer);
  }, [done]);

  const say = (nextLine, speak = true) => {
    setLine(nextLine);
    setLineCount((count) => count + 1);
    if (speak) autoSpeak(nextLine);
  };

  const goNext = () => {
    if (index === rounds.length - 1) {
      setPhase('success');
      sfx.play('success');
      completeLevel(level.id, 3);
      say(feedback.success);
      return;
    }
    const next = rounds[index + 1];
    setIndex(index + 1);
    setValues(next.values);
    setMachineState('idle');
    setPhase('asking');
    say(next.question);
  };

  // Rodada de palpite: funciona ou não?
  const predict = (guess) => {
    if (phase !== 'asking') return;
    sfx.play(guess ? 'pick' : 'tap');
    setPhase('revealing');
    const works = gateOutput(gate, values.a, values.b);
    later(() => {
      setMachineState(works ? 'working' : 'stopped');
      sfx.play(works ? 'whoosh' : 'tap');
    }, REVEAL_MS);
    later(() => {
      if (guess === works) {
        // Acerto: só o som positivo.
        sfx.play('correct');
        setPhase('right');
        later(goNext, NEXT_ROUND_MS);
      } else {
        sfx.play('tryAgain');
        setPhase('wrong');
        say(round.hint);
      }
    }, VERDICT_MS);
  };

  const retry = () => {
    sfx.play('tap');
    setMachineState('idle');
    setPhase('asking');
    say(round.question);
  };

  // Rodada prática: a criança mexe nas alavancas.
  const toggleLever = (key) => {
    if (round.kind !== 'act' || phase !== 'asking') return;
    if (round.stuck === key) {
      sfx.play('tryAgain');
      setWiggle(true);
      later(() => setWiggle(false), 500);
      say(round.stuckHint);
      return;
    }
    sfx.play('pick');
    const nextValues = { ...values, [key]: !values[key] };
    setValues(nextValues);
    if (gateOutput(gate, nextValues.a, nextValues.b)) {
      setPhase('right');
      later(() => {
        setMachineState('working');
        sfx.play('whoosh');
        sfx.play('correct');
      }, 350);
      later(goNext, 350 + NEXT_ROUND_MS + 400);
    }
  };

  const tone = phase === 'wrong' ? 'hint' : 'default';
  const mood = phase === 'wrong' ? 'encourage' : 'curious';

  return (
    <div className="screen game-screen levers-screen">
      <Scene />
      <TopBar onBack={onExit} backLabel="Voltar ao mapa" title={level.name} />

      <div className="game-layout levers-layout">
        <MascotDialogue
          line={line}
          bubbleKey={`${line.id}-${lineCount}`}
          mood={mood}
          mascotSize={84}
          layout="compact"
          tone={tone}
          className={`game-dialogue ${done ? 'is-hidden' : ''}`}
        />

        <div className="levers-progress" aria-label={`Rodada ${Math.min(index + 1, rounds.length)} de ${rounds.length}`}>
          {rounds.map((item, position) => (
            <span key={item.id} className={position < index || done ? 'is-done' : position === index ? 'is-current' : ''} />
          ))}
        </div>

        <div className="levers-board">
        <div className={`levers-stage ${wiggle ? 'is-wiggling' : ''}`}>
          {done && <StarBurst />}
          <LeverMachine
            key={round.id}
            levers={levers}
            values={values}
            gate={gate}
            state={done ? 'working' : machineState}
            interactive={round.kind === 'act' && phase === 'asking'}
            stuck={round.kind === 'act' ? round.stuck : null}
            onToggle={toggleLever}
          />
        </div>

        <div className="levers-controls">
        {!done && (
          <div className="levers-question">
            <SpeakButton line={round.question} compact />
            <span>{round.kind === 'act' ? 'Ligue uma alavanca!' : `A Máquina do ${gate} funciona?`}</span>
          </div>
        )}

        {!done && round.kind === 'predict' && phase === 'asking' && (
          <div className="levers-choices">
            <button type="button" className="lever-choice lever-choice--no" onClick={() => predict(false)}>
              <span className="lever-choice__icon" aria-hidden="true">
                <CircleSlash size={28} strokeWidth={2.6} />
              </span>
              {labels.no}
            </button>
            <button type="button" className="lever-choice lever-choice--yes" onClick={() => predict(true)}>
              <span className="lever-choice__icon" aria-hidden="true">
                <Cog size={28} strokeWidth={2.6} />
              </span>
              {labels.yes}
            </button>
          </div>
        )}

        {phase === 'wrong' && (
          <div className="levers-choices">
            <button type="button" className="lever-retry" onClick={retry}>
              <RotateCcw size={20} strokeWidth={2.8} aria-hidden="true" /> Tentar de novo
            </button>
          </div>
        )}
        </div>
        </div>
      </div>

      {showFeedback && <GameFeedback line={feedback.success} onContinue={onComplete} />}
    </div>
  );
}
