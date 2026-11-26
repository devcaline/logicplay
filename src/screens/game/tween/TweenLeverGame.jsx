import { useEffect, useMemo, useRef, useState } from 'react';
import { Cog, CircleSlash, RotateCcw, ArrowRight } from 'lucide-react';
import TopBar from '../../../components/ui/TopBar.jsx';
import MascotDialogue from '../../../components/mascot/MascotDialogue.jsx';
import SpeakButton from '../../../components/ui/SpeakButton.jsx';
import StarBurst from '../../../components/ui/StarBurst.jsx';
import GameButton from '../../../components/ui/GameButton.jsx';
import LeverMachine from '../../../components/ui/LeverMachine.jsx';
import { getLevelScene } from '../../../components/scenery/scenes.js';
import GameFeedback from '../GameFeedback.jsx';
import { generateGateMachines, generateStuckRound } from '../../../data/tween/gateBalls.js';
import { gateOutput } from '../../../logic/validation.js';
import { starsFromErrors } from '../../../logic/scoring.js';
import { useGame, useNarration } from '../../../state/GameContext.jsx';
import { sfx } from '../../../audio/sfx.js';
import '../LeverMachineGame.css';
import './tween.css';

const REVEAL_MS = 450;
const VERDICT_MS = 1500;
const NEXT_ROUND_MS = 1300;
const VF = (value) => (value ? 'V' : 'F');

/** As duas frases da rodada, ao lado da alavanca de cada uma. */
function Statement({ input, shown }) {
  return (
    <div className={`lever-statement ${shown ? (input.value ? 'is-v' : 'is-f') : ''}`}>
      <span className={`num-ball num-ball--${input.ball.color} lever-statement__ball`}>{input.ball.n}</span>
      <span className="lever-statement__text">{input.text}</span>
      {shown && <span className="lever-statement__value">{VF(input.value)}</span>}
    </div>
  );
}

/**
 * A Máquina do OU para 9 a 12 anos: a máquina de alavancas do 5–8, com as alavancas p e q ligadas
 * a frases sobre bolinhas. Quatro rodadas de palpite (as quatro combinações de V e F) e uma rodada
 * prática: p emperrou no F e o jogador escolhe para q uma frase que faça a máquina funcionar.
 * No fim, as rodadas de palpite viram a tabela do OU.
 */
export default function TweenLeverGame({ challenge, level, onExit, onComplete }) {
  const { profile, completeLevel } = useGame();
  const { autoSpeak } = useNarration();
  const difficultyId = profile?.difficulty ?? 'easy';
  const { feedback, levers, gate, symbol } = challenge;
  const Scene = getLevelScene(challenge.scene);

  const predictions = useMemo(() => generateGateMachines(difficultyId, gate), [difficultyId, gate]);
  const stuckRound = useMemo(() => generateStuckRound(difficultyId), [difficultyId]);
  const totalRounds = predictions.length + 1;

  const [index, setIndex] = useState(0);
  const [machineState, setMachineState] = useState('idle'); // idle | working | stopped
  const [phase, setPhase] = useState('asking'); // asking | revealing | right | wrong | table
  const [chosen, setChosen] = useState(null); // opção escolhida na rodada prática
  const [line, setLine] = useState(predictions[0].question);
  const [lineCount, setLineCount] = useState(0);
  const [errors, setErrors] = useState(0);
  const [stars, setStars] = useState(null);
  const timers = useRef([]);
  const tableRef = useRef(null);

  const isAct = index === predictions.length;
  const round = isAct ? null : predictions[index];
  const actLine = useMemo(() => ({ id: 't9.l3.act', text: challenge.act }), [challenge.act]);

  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms));
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  useEffect(() => {
    autoSpeak(predictions[0].question);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const say = (next) => {
    setLine(next);
    setLineCount((count) => count + 1);
    autoSpeak(next);
  };

  const goNext = () => {
    if (isAct) {
      setPhase('table');
      sfx.play('success');
      say(challenge.table);
      later(() => tableRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' }), 200);
      return;
    }
    const next = index + 1;
    setIndex(next);
    setMachineState('idle');
    setPhase('asking');
    say(next === predictions.length ? actLine : predictions[next].question);
  };

  // Rodada de palpite: a máquina funciona?
  const predict = (guess) => {
    if (phase !== 'asking') return;
    sfx.play(guess ? 'pick' : 'tap');
    setPhase('revealing');
    const works = gateOutput(gate, round.a.value, round.b.value);
    later(() => {
      setMachineState(works ? 'working' : 'stopped');
      sfx.play(works ? 'whoosh' : 'tap');
    }, REVEAL_MS);
    later(() => {
      if (guess === works) {
        sfx.play('correct');
        setPhase('right');
        later(goNext, NEXT_ROUND_MS);
      } else {
        sfx.play('tryAgain');
        setErrors((count) => count + 1);
        setPhase('wrong');
        say(round.hint);
      }
    }, VERDICT_MS);
  };

  const retry = () => {
    sfx.play('tap');
    setMachineState('idle');
    setChosen(null);
    setPhase('asking');
    say(isAct ? actLine : round.question);
  };

  // Rodada prática: escolher a frase de q.
  const chooseOption = (option) => {
    if (phase !== 'asking') return;
    sfx.play('pick');
    setChosen(option);
    setPhase('revealing');
    later(() => {
      setMachineState(option.value ? 'working' : 'stopped');
      sfx.play(option.value ? 'whoosh' : 'tap');
    }, REVEAL_MS);
    later(() => {
      if (option.value) {
        sfx.play('correct');
        setPhase('right');
        later(goNext, NEXT_ROUND_MS);
      } else {
        sfx.play('tryAgain');
        setErrors((count) => count + 1);
        setPhase('wrong');
        say({ id: 't9.l3.act.hint', text: challenge.actHint });
      }
    }, VERDICT_MS);
  };

  const finish = () => {
    sfx.play('tap');
    const earned = starsFromErrors(errors);
    completeLevel(level.id, earned);
    setStars(earned);
    autoSpeak(feedback.success);
  };

  const showTable = phase === 'table';
  const revealed = phase === 'revealing' || phase === 'right' || phase === 'wrong';
  const leverValues = isAct
    ? { a: false, b: chosen && (revealed || showTable) ? chosen.value : null }
    : { a: revealed ? round.a.value : null, b: revealed ? round.b.value : null };
  const rows = [...predictions].sort((x, y) => Number(y.a.value) * 2 + Number(y.b.value) - (Number(x.a.value) * 2 + Number(x.b.value)));

  return (
    <div className="screen game-screen levers-screen tween-screen">
      <Scene />
      <TopBar onBack={onExit} backLabel="Voltar ao mapa" title={level.name} />

      <div className="game-layout levers-layout">
        <MascotDialogue
          line={line}
          bubbleKey={`${line.id}-${lineCount}`}
          mood={phase === 'wrong' ? 'encourage' : showTable ? 'cheer' : 'curious'}
          mascotSize={84}
          layout="compact"
          tone={phase === 'wrong' ? 'hint' : showTable ? 'success' : 'default'}
          className="game-dialogue"
        />

        <div className="levers-progress" aria-label={`Rodada ${Math.min(index + 1, totalRounds)} de ${totalRounds}`}>
          {Array.from({ length: totalRounds }, (_, position) => (
            <span key={position} className={position < index || showTable ? 'is-done' : position === index ? 'is-current' : ''} />
          ))}
        </div>

        <div className={`levers-board ${showTable ? 'is-compact' : ''}`}>
          <div className="levers-stage">
            {showTable && <StarBurst />}
            <LeverMachine
              key={isAct ? 'act' : round.id}
              levers={levers}
              values={leverValues}
              gate={symbol}
              state={showTable ? 'working' : machineState}
              stuck={isAct ? 'a' : null}
              small={showTable}
            />
          </div>

          {!showTable && (
          <div className="levers-controls">
            {!showTable && (
              <div className="lever-statements">
                {isAct ? (
                  <>
                    <Statement input={stuckRound.stuck} shown />
                    {chosen ? <Statement input={chosen} shown={revealed} /> : <div className="lever-statement lever-statement--empty">q: escolha uma frase</div>}
                  </>
                ) : (
                  <>
                    <Statement input={round.a} shown={revealed} />
                    <Statement input={round.b} shown={revealed} />
                  </>
                )}
              </div>
            )}

            {!showTable && (
              <div className="levers-question">
                <SpeakButton line={isAct ? actLine : round.question} compact />
                <span>{isAct ? 'Escolha uma frase para q' : `p ${symbol} q: a máquina funciona?`}</span>
              </div>
            )}

            {!isAct && phase === 'asking' && (
              <div className="levers-choices">
                <button type="button" className="lever-choice lever-choice--no" onClick={() => predict(false)}>
                  <span className="lever-choice__icon" aria-hidden="true">
                    <CircleSlash size={28} strokeWidth={2.6} />
                  </span>
                  Não funciona (F)
                </button>
                <button type="button" className="lever-choice lever-choice--yes" onClick={() => predict(true)}>
                  <span className="lever-choice__icon" aria-hidden="true">
                    <Cog size={28} strokeWidth={2.6} />
                  </span>
                  Funciona (V)
                </button>
              </div>
            )}

            {isAct && phase === 'asking' && (
              <div className="lever-options">
                {stuckRound.options.map((option) => (
                  <button key={option.id} type="button" className="lever-option" onClick={() => chooseOption(option)}>
                    <span className={`num-ball num-ball--${option.ball.color} lever-statement__ball`}>{option.ball.n}</span>
                    {option.text}
                  </button>
                ))}
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
          )}
        </div>

        {showTable && (
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
                {rows.map((item) => {
                  const result = gateOutput(gate, item.a.value, item.b.value);
                  return (
                    <tr key={item.id}>
                      <td className={item.a.value ? 'is-v' : 'is-f'}>{VF(item.a.value)}</td>
                      <td className={item.b.value ? 'is-v' : 'is-f'}>{VF(item.b.value)}</td>
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

      {stars !== null && <GameFeedback line={feedback.success} onContinue={() => onComplete(stars)} />}
    </div>
  );
}
