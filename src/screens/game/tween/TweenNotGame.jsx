import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowDown, ArrowRight, Lightbulb, LightbulbOff } from 'lucide-react';
import TopBar from '../../../components/ui/TopBar.jsx';
import MascotDialogue from '../../../components/mascot/MascotDialogue.jsx';
import GameButton from '../../../components/ui/GameButton.jsx';
import StarBurst from '../../../components/ui/StarBurst.jsx';
import TruthLamp from '../../../components/ui/TruthLamp.jsx';
import { getLevelScene } from '../../../components/scenery/scenes.js';
import GameFeedback from '../GameFeedback.jsx';
import { generateTweenNot } from '../../../data/tween/notBalls.js';
import { starsFromErrors } from '../../../logic/scoring.js';
import { useGame, useNarration } from '../../../state/GameContext.jsx';
import { sfx } from '../../../audio/sfx.js';
import '../TruthLightsGame.css';
import '../NotMirrorGame.css';
import './tween.css';

const NEXT_ROW_MS = 1200;
const VF = (value) => (value ? 'V' : 'F');
const lampOf = (value) => (value === undefined ? 'unset' : value ? 'on' : 'off');

/** Uma frase com a bolinha, o nome (p, ¬p...) e a lâmpada da verdade. */
function Phrase({ ball, name, text, value }) {
  return (
    <span className="tween-mirror-phrase">
      <span className={`num-ball num-ball--${ball.color} tween-mirror-phrase__ball`}>{ball.n}</span>
      <span className="tween-mirror-phrase__text">
        <strong>{name}:</strong> {text}
      </span>
      <TruthLamp state={lampOf(value)} size={38} />
      <span className={`tween-mirror-phrase__value ${value === undefined ? '' : value ? 'is-v' : 'is-f'}`}>{value === undefined ? '?' : VF(value)}</span>
    </span>
  );
}

/**
 * O Espelho do NÃO para 9 a 12 anos: o modo "uma frase por vez" do 5–8 com frases sobre bolinhas.
 * Primeiro p e o reflexo ¬p; depois dois espelhos, ¬(¬p). No fim, a tabela do NÃO.
 */
export default function TweenNotGame({ challenge, level, onExit, onComplete }) {
  const { profile, completeLevel } = useGame();
  const { autoSpeak } = useNarration();
  const difficultyId = profile?.difficulty ?? 'easy';
  const Scene = getLevelScene(challenge.scene);
  const { feedback } = challenge;

  const { single, double } = useMemo(() => generateTweenNot(difficultyId), [difficultyId]);
  const steps = useMemo(() => [...single.map((row) => ({ row, kind: 'single' })), ...double.map((row) => ({ row, kind: 'double' }))], [single, double]);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState(undefined);
  const [status, setStatus] = useState('playing'); // playing | hint | row-done | table
  const [wrong, setWrong] = useState(false);
  const [errors, setErrors] = useState(0);
  const [line, setLine] = useState(challenge.parts.single);
  const [lineCount, setLineCount] = useState(0);
  const [stars, setStars] = useState(null);
  const timers = useRef([]);
  const tableRef = useRef(null);

  const step = steps[index];
  const { row } = step;
  const isDouble = step.kind === 'double';
  const expected = isDouble ? row.value : !row.value;
  const showTable = status === 'table';

  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms));
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const say = (next) => {
    setLine(next);
    setLineCount((count) => count + 1);
    autoSpeak(next);
  };

  useEffect(() => {
    autoSpeak(challenge.parts.single);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const choose = (value) => {
    if (status === 'row-done' || showTable) return;
    setAnswer(value);
    if (value === expected) {
      sfx.play('correct');
      setWrong(false);
      setStatus('row-done');
      later(() => {
        if (index === steps.length - 1) {
          setStatus('table');
          sfx.play('success');
          say(challenge.table);
          later(() => tableRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' }), 200);
          return;
        }
        const next = steps[index + 1];
        setIndex(index + 1);
        setAnswer(undefined);
        setStatus('playing');
        if (next.kind === 'double' && step.kind === 'single') say(challenge.parts.double);
      }, NEXT_ROW_MS);
      return;
    }
    sfx.play('tryAgain');
    setErrors((count) => count + 1);
    setWrong(true);
    setStatus('hint');
    say({ id: `t9.l4.hint.${row.id}${isDouble ? '.double' : ''}`, text: isDouble ? row.doubleHint : row.hint });
  };

  const finish = () => {
    sfx.play('tap');
    const earned = starsFromErrors(errors);
    completeLevel(level.id, earned);
    setStars(earned);
    autoSpeak(feedback.success);
  };

  const solvedRow = status === 'row-done' || showTable;

  return (
    <div className="screen game-screen mirror-screen tween-screen">
      <Scene />
      <TopBar onBack={onExit} backLabel="Voltar ao mapa" title={level.name} />

      <div className="game-layout mirror-layout">
        <MascotDialogue
          line={line}
          bubbleKey={`${line.id}-${lineCount}`}
          mood={status === 'hint' ? 'encourage' : showTable ? 'cheer' : 'curious'}
          mascotSize={84}
          layout="compact"
          tone={status === 'hint' ? 'hint' : showTable ? 'success' : 'default'}
          className="game-dialogue"
        />

        <p className="mirror-stage">{isDouble ? 'Parte 2 · Dois espelhos' : 'Parte 1 · O espelho do NÃO'}</p>

        <div key={`${step.kind}-${row.id}`} className={`mirror-single ${solvedRow ? 'is-solved' : ''}`}>
          {showTable && <StarBurst />}
          <div className="mirror-steps" aria-label={`Frase ${index + 1} de ${steps.length}`}>
            {steps.map((item, position) => (
              <span key={`${item.kind}-${item.row.id}`} className={position < index || showTable ? 'is-done' : position === index ? 'is-current' : ''} />
            ))}
          </div>

          <div className="mirror-single__real">
            <span className="mirror-board__label mirror-board__label--real">De verdade</span>
            <Phrase ball={row.ball} name="p" text={row.text} value={row.value} />
          </div>

          <span className="mirror-single__arrow" aria-hidden="true">
            <ArrowDown size={26} strokeWidth={3} />
          </span>

          {isDouble && (
            <>
              <div className="mirror-single__glass tween-mirror-first">
                <span className="mirror-board__label mirror-board__label--mirror">
                  Primeiro espelho
                </span>
                <Phrase ball={row.ball} name="¬p" text={row.notText} value={!row.value} />
              </div>
              <span className="mirror-single__arrow" aria-hidden="true">
                <ArrowDown size={26} strokeWidth={3} />
              </span>
            </>
          )}

          <div className={`mirror-single__glass ${wrong ? 'is-wrong' : ''}`}>
            <span className="mirror-board__label mirror-board__label--mirror">
              {isDouble ? 'Segundo espelho' : (
                <>
                  No espelho do <strong>NÃO</strong>
                </>
              )}
            </span>
            <Phrase ball={row.ball} name={isDouble ? '¬(¬p)' : '¬p'} text={isDouble ? row.doubleText : row.notText} value={answer} />
          </div>

          {!showTable && (
            <div className="mirror-choices">
              <button type="button" className="lamp-choice lamp-choice--no" onClick={() => choose(false)} disabled={status === 'row-done'}>
                <span className="lamp-choice__icon" aria-hidden="true">
                  <LightbulbOff size={28} strokeWidth={2.6} />
                </span>
                Apaga (F)
              </button>
              <button type="button" className="lamp-choice lamp-choice--yes" onClick={() => choose(true)} disabled={status === 'row-done'}>
                <span className="lamp-choice__icon" aria-hidden="true">
                  <Lightbulb size={28} strokeWidth={2.6} />
                </span>
                Acende (V)
              </button>
            </div>
          )}
        </div>

        {showTable && (
          <section ref={tableRef} className="tween-reveal gate-table" aria-label="Tabela do NÃO">
            <p className="tween-reveal__label">A tabela do NÃO</p>
            <table>
              <thead>
                <tr>
                  <th>p</th>
                  <th className="is-key">¬p</th>
                  <th>¬(¬p)</th>
                </tr>
              </thead>
              <tbody>
                {[true, false].map((value) => (
                  <tr key={String(value)}>
                    <td className={value ? 'is-v' : 'is-f'}>{VF(value)}</td>
                    <td className={`is-key ${!value ? 'is-v' : 'is-f'}`}>{VF(!value)}</td>
                    <td className={value ? 'is-v' : 'is-f'}>{VF(value)}</td>
                  </tr>
                ))}
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
