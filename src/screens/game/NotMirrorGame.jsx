import { useEffect, useRef, useState } from 'react';
import { Sparkles, ArrowRight, ArrowDown, Lightbulb, LightbulbOff } from 'lucide-react';
import TopBar from '../../components/ui/TopBar.jsx';
import MascotDialogue from '../../components/mascot/MascotDialogue.jsx';
import GameButton from '../../components/ui/GameButton.jsx';
import StarBurst from '../../components/ui/StarBurst.jsx';
import MirrorItem from '../../components/ui/MirrorItem.jsx';
import { getLevelScene } from '../../components/scenery/scenes.js';
import GameFeedback from './GameFeedback.jsx';
import { validateMirror } from '../../logic/validation.js';
import { useGame, useNarration } from '../../state/GameContext.jsx';
import { sfx } from '../../audio/sfx.js';
import './TruthLightsGame.css';
import './NotMirrorGame.css';

const NEXT_STAGE_MS = 1500;
const NEXT_PHRASE_MS = 1200; // depois de acertar uma frase, passa para a próxima

const initialReflections = (stage) =>
  Object.fromEntries(stage.rows.map((row) => [row.id, 'start' in row ? row.start : undefined]));

const stateLabel = (row, value) => {
  if (value === undefined) return '?';
  if (row.kind === 'phrase') return value ? 'Verdade' : 'Falso';
  return value ? row.states.on : row.states.off;
};

/**
 * Espelho do NÃO: de um lado as coisas como são, do outro o reflexo, que deve ser o contrário.
 * A criança toca nos reflexos para virá-los e depois olha no espelho para conferir.
 */
export default function NotMirrorGame({ challenge, level, onExit, onComplete }) {
  const { completeLevel } = useGame();
  const { autoSpeak } = useNarration();
  const { stages, feedback, answers } = challenge;
  const Scene = getLevelScene(challenge.scene);

  const [stageIndex, setStageIndex] = useState(0);
  const [reflections, setReflections] = useState(() => initialReflections(stages[0]));
  const [wrong, setWrong] = useState([]);
  const [status, setStatus] = useState('playing'); // playing | hint | stage-done | success
  const [line, setLine] = useState(stages[0].instruction);
  const [lineCount, setLineCount] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [rowIndex, setRowIndex] = useState(0); // modo uma-por-vez
  const timers = useRef([]);

  const stage = stages[stageIndex];
  const oneByOne = stage.mode === 'one-by-one';
  const done = status === 'success';
  const locked = status === 'stage-done' || done;

  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms));
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  useEffect(() => {
    autoSpeak(stages[0].instruction);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!done) return undefined;
    const timer = setTimeout(() => setShowFeedback(true), 1600);
    return () => clearTimeout(timer);
  }, [done]);

  const say = (nextLine) => {
    setLine(nextLine);
    setLineCount((count) => count + 1);
    autoSpeak(nextLine);
  };

  // Tocar no reflexo vira o estado dele (sem resposta → sim → não → sim...).
  const flip = (row) => {
    if (locked) return;
    sfx.play('pick');
    setReflections((current) => ({ ...current, [row.id]: current[row.id] === undefined ? true : !current[row.id] }));
    setWrong((current) => current.filter((id) => id !== row.id));
  };

  const check = () => {
    if (locked) return;
    const result = validateMirror(stage.rows, reflections);
    if (result.correct) {
      sfx.play('correct');
      setWrong([]);
      if (stageIndex === stages.length - 1) {
        finish();
        return;
      }
      setStatus('stage-done');
      later(() => {
        const next = stages[stageIndex + 1];
        setStageIndex(stageIndex + 1);
        setReflections(initialReflections(next));
        setRowIndex(0);
        setStatus('playing');
        say(next.instruction);
      }, NEXT_STAGE_MS);
      return;
    }
    sfx.play('tryAgain');
    setStatus('hint');
    setWrong([...result.wrong, ...result.unset]);
    if (result.wrong.length > 0) say(stage.rows.find((row) => row.id === result.wrong[0]).hint);
    else say(feedback.unset);
  };

  const finish = () => {
    setStatus('success');
    sfx.play('success');
    completeLevel(level.id, 3);
    say(feedback.success);
  };

  // Modo uma-por-vez: a criança escolhe se a luz do espelho acende ou apaga.
  const answerRow = (value) => {
    if (locked || status === 'row-done') return;
    const row = stage.rows[rowIndex];
    setReflections((current) => ({ ...current, [row.id]: value }));
    if (value === !row.value) {
      sfx.play('correct');
      setWrong([]);
      setStatus('row-done');
      later(() => {
        if (rowIndex === stage.rows.length - 1) {
          finish();
          return;
        }
        setRowIndex(rowIndex + 1);
        setStatus('playing');
        setLine(stage.instruction);
        setLineCount((count) => count + 1);
      }, NEXT_PHRASE_MS);
      return;
    }
    sfx.play('tryAgain');
    setStatus('hint');
    setWrong([row.id]);
    say(row.hint);
  };

  const currentRow = stage.rows[rowIndex];

  return (
    <div className="screen game-screen mirror-screen">
      <Scene />
      <TopBar onBack={onExit} backLabel="Voltar ao mapa" title={level.name} />

      <div className="game-layout mirror-layout">
        <MascotDialogue
          line={line}
          bubbleKey={`${line.id}-${lineCount}`}
          mood={status === 'hint' ? 'encourage' : 'curious'}
          mascotSize={84}
          layout="compact"
          tone={status === 'hint' ? 'hint' : 'default'}
          className={`game-dialogue ${done ? 'is-hidden' : ''}`}
        />

        <p className="mirror-stage">
          Parte {stageIndex + 1} de {stages.length} · {stage.title}
        </p>

        {oneByOne ? (
          <div key={`${stage.id}-${currentRow.id}`} className={`mirror-single ${status === 'row-done' || locked ? 'is-solved' : ''}`}>
            {locked && <StarBurst />}
            <div className="mirror-steps" aria-label={`Frase ${rowIndex + 1} de ${stage.rows.length}`}>
              {stage.rows.map((row, index) => (
                <span key={row.id} className={index < rowIndex || locked ? 'is-done' : index === rowIndex ? 'is-current' : ''} />
              ))}
            </div>

            <div className="mirror-single__real">
              <span className="mirror-board__label mirror-board__label--real">De verdade</span>
              <MirrorItem row={currentRow} value={currentRow.value} size="lg" />
              <span className={`mirror-state ${currentRow.value ? 'is-yes' : ''}`}>{currentRow.value ? 'Luz acesa' : 'Luz apagada'}</span>
            </div>

            <span className="mirror-single__arrow" aria-hidden="true">
              <ArrowDown size={26} strokeWidth={3} />
            </span>

            <div className={`mirror-single__glass ${wrong.includes(currentRow.id) ? 'is-wrong' : ''}`}>
              <span className="mirror-board__label mirror-board__label--mirror">
                No espelho do <strong>NÃO</strong>
              </span>
              <span className="mirror-reflection__art">
                <MirrorItem row={currentRow} value={reflections[currentRow.id]} reflected size="lg" />
              </span>
            </div>

            {!locked && (
              <div className="mirror-choices">
                <button type="button" className="lamp-choice lamp-choice--no" onClick={() => answerRow(false)} disabled={status === 'row-done'}>
                  <span className="lamp-choice__icon" aria-hidden="true">
                    <LightbulbOff size={28} strokeWidth={2.6} />
                  </span>
                  {answers.off}
                </button>
                <button type="button" className="lamp-choice lamp-choice--yes" onClick={() => answerRow(true)} disabled={status === 'row-done'}>
                  <span className="lamp-choice__icon" aria-hidden="true">
                    <Lightbulb size={28} strokeWidth={2.6} />
                  </span>
                  {answers.on}
                </button>
              </div>
            )}
          </div>
        ) : (
        <div key={stage.id} className={`mirror-board mirror-board--${stage.id} ${locked ? 'is-solved' : ''}`}>
          {(locked) && <StarBurst />}
          <span className="mirror-board__label mirror-board__label--real">De verdade</span>
          <span className="mirror-board__label mirror-board__label--mirror">
            No espelho do <strong>NÃO</strong>
          </span>
          <div className="mirror-frame" style={{ gridRow: `1 / span ${stage.rows.length + 1}` }} aria-hidden="true">
            <span className="mirror-frame__shine" />
          </div>

          {stage.rows.map((row, index) => {
            const reflection = reflections[row.id];
            return (
              <div key={row.id} className="mirror-row">
                <div className="mirror-real" style={{ gridRow: index + 2 }} aria-label={`${row.kind === 'phrase' ? row.text : row.states.on}: ${stateLabel(row, row.value)}`}>
                  <MirrorItem row={row} value={row.value} />
                  <span className={`mirror-state ${row.value ? 'is-yes' : ''}`}>{stateLabel(row, row.value)}</span>
                </div>
                <span className="mirror-arrow" style={{ gridRow: index + 2 }} aria-hidden="true">
                  <ArrowRight size={22} strokeWidth={3} />
                </span>
                <button
                  type="button"
                  className={`mirror-reflection ${wrong.includes(row.id) ? 'is-wrong' : ''} ${reflection === undefined ? 'is-unset' : ''}`}
                  style={{ gridRow: index + 2 }}
                  onClick={() => flip(row)}
                  disabled={locked}
                  aria-label={`Reflexo${row.kind === 'phrase' ? `: ${row.notText}` : ''}: ${stateLabel(row, reflection)}. Toque para virar.`}
                >
                  <span className="mirror-reflection__art">
                    <MirrorItem row={row} value={reflection} reflected />
                  </span>
                  <span className={`mirror-state ${reflection ? 'is-yes' : ''}`}>{stateLabel(row, reflection)}</span>
                </button>
              </div>
            );
          })}
        </div>
        )}

        {!oneByOne && (
          <div className="game-actions">
            <GameButton variant="lilac" size="lg" icon={Sparkles} onClick={check} disabled={locked} sound={null}>
              Olhar no espelho
            </GameButton>
          </div>
        )}
      </div>

      {showFeedback && <GameFeedback line={feedback.success} onContinue={onComplete} />}
    </div>
  );
}
