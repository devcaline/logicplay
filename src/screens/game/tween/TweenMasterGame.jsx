import { useEffect, useRef, useState } from 'react';
import { Lightbulb, LightbulbOff, RotateCcw, Check } from 'lucide-react';
import TopBar from '../../../components/ui/TopBar.jsx';
import MascotDialogue from '../../../components/mascot/MascotDialogue.jsx';
import GameButton from '../../../components/ui/GameButton.jsx';
import StarBurst from '../../../components/ui/StarBurst.jsx';
import EnergyCircuit from '../../../components/ui/EnergyCircuit.jsx';
import { getLevelScene } from '../../../components/scenery/scenes.js';
import GameFeedback from '../GameFeedback.jsx';
import { gateOutput } from '../../../logic/validation.js';
import { starsFromErrors } from '../../../logic/scoring.js';
import { useGame, useNarration } from '../../../state/GameContext.jsx';
import { sfx } from '../../../audio/sfx.js';
import '../TruthLightsGame.css';
import '../MasterTableGame.css';
import './tween.css';

const INPUTS_MS = 250;
const OUTPUT_MS = 1150;
const VERDICT_MS = 2200;
const NEXT_MS = 1300;

const ROWS = [
  { a: true, b: true },
  { a: true, b: false },
  { a: false, b: true },
  { a: false, b: false },
];
const VF = (value) => (value ? 'V' : 'F');
const vfText = (on) => (on ? 'V' : 'F');

/**
 * A Tabela Mestra para 9 a 12 anos: o circuito de energia do 5–8 com as alavancas p e q (V/F).
 * Parte 1: porta ∧ nas quatro combinações. Parte 2: porta ∨. Parte 3: a Tabela Mestra aparece
 * com p ∧ q e p ∨ q, e o jogador completa sozinho a coluna ¬p.
 */
export default function TweenMasterGame({ challenge, level, onExit, onComplete }) {
  const { completeLevel } = useGame();
  const { autoSpeak } = useNarration();
  const { columns, feedback } = challenge;
  const Scene = getLevelScene(challenge.scene);

  const [columnIndex, setColumnIndex] = useState(0);
  const [rowIndex, setRowIndex] = useState(0);
  const [phase, setPhase] = useState('asking'); // asking | revealing | right | wrong | table
  const [circuit, setCircuit] = useState('idle');
  const [line, setLine] = useState(columns[0].start);
  const [lineCount, setLineCount] = useState(0);
  const [errors, setErrors] = useState(0);
  const [notCells, setNotCells] = useState([null, null, null, null]); // coluna ¬p, preenchida pelo jogador
  const [wrongCells, setWrongCells] = useState([]);
  const [tableSolved, setTableSolved] = useState(false);
  const [stars, setStars] = useState(null);
  const timers = useRef([]);
  const tableRef = useRef(null);

  const column = columns[columnIndex];
  const row = ROWS[rowIndex];
  const showTable = phase === 'table';

  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms));
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const say = (next) => {
    setLine(next);
    setLineCount((count) => count + 1);
    autoSpeak(next);
  };

  useEffect(() => {
    autoSpeak(columns[0].start);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goNext = () => {
    setCircuit('idle');
    setPhase('asking');
    if (rowIndex === ROWS.length - 1) {
      if (columnIndex === columns.length - 1) {
        setPhase('table');
        sfx.play('success');
        say(challenge.tableStart);
        later(() => tableRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' }), 200);
        return;
      }
      setColumnIndex(columnIndex + 1);
      setRowIndex(0);
      say(columns[columnIndex + 1].start);
      return;
    }
    setRowIndex(rowIndex + 1);
  };

  const predict = (guess) => {
    if (phase !== 'asking') return;
    sfx.play(guess ? 'pick' : 'tap');
    setPhase('revealing');
    const lights = gateOutput(column.gate, row.a, row.b);
    later(() => {
      setCircuit('inputs');
      if (row.a || row.b) sfx.play('whoosh');
    }, INPUTS_MS);
    later(() => setCircuit('output'), OUTPUT_MS);
    later(() => {
      setCircuit('done');
      if (guess === lights) {
        sfx.play('correct');
        setPhase('right');
        later(goNext, NEXT_MS);
      } else {
        sfx.play('tryAgain');
        setErrors((count) => count + 1);
        setPhase('wrong');
        say(column.hints[Number(row.a) + Number(row.b)]);
      }
    }, VERDICT_MS);
  };

  const retry = () => {
    sfx.play('tap');
    setCircuit('idle');
    setPhase('asking');
    setLine(column.start);
  };

  // Parte 3: tocar numa casa de ¬p alterna entre ?, V e F.
  const toggleNot = (index) => {
    if (tableSolved) return;
    sfx.play('pick');
    setNotCells((cells) => cells.map((value, position) => (position === index ? (value === null ? true : !value) : value)));
    setWrongCells((list) => list.filter((item) => item !== index));
  };

  const checkTable = () => {
    const wrong = ROWS.map((r, index) => (notCells[index] === !r.a ? -1 : index)).filter((index) => index >= 0);
    if (!wrong.length) {
      sfx.play('success');
      setTableSolved(true);
      say(feedback.tableDone);
      return;
    }
    sfx.play('tryAgain');
    setErrors((count) => count + 1);
    setWrongCells(wrong);
    say(notCells.some((value) => value === null) ? challenge.notUnset : challenge.notHint);
  };

  const finish = () => {
    sfx.play('tap');
    const earned = starsFromErrors(errors);
    completeLevel(level.id, earned);
    setStars(earned);
    autoSpeak(feedback.success);
  };

  const stepIndex = columnIndex * ROWS.length + rowIndex;
  const totalSteps = columns.length * ROWS.length;

  return (
    <div className="screen game-screen master-screen tween-screen">
      <Scene />
      <TopBar onBack={onExit} backLabel="Voltar ao mapa" title={level.name} />

      <div className="game-layout master-layout">
        <MascotDialogue
          line={line}
          bubbleKey={`${line.id}-${lineCount}`}
          mood={phase === 'wrong' ? 'encourage' : tableSolved ? 'cheer' : 'curious'}
          mascotSize={84}
          layout="compact"
          tone={phase === 'wrong' ? 'hint' : tableSolved ? 'success' : 'default'}
          className="game-dialogue"
        />

        {!showTable && (
          <>
            <div className="master-steps" aria-label={`Teste ${stepIndex + 1} de ${totalSteps}`}>
              {columns.map((col, colIndex) => (
                <span key={col.id} className={`master-steps__group ${colIndex === columnIndex ? 'is-active' : ''}`}>
                  <strong className="tween-master-symbol">{col.symbol}</strong>
                  {ROWS.map((_, index) => {
                    const position = colIndex * ROWS.length + index;
                    return <i key={index} className={position < stepIndex ? 'is-done' : position === stepIndex ? 'is-current' : ''} />;
                  })}
                </span>
              ))}
            </div>

            <div key={`${column.id}-${rowIndex}`} className={`master-circuit tween-master-circuit ${phase === 'right' ? 'is-right' : ''} ${phase === 'wrong' ? 'is-wrong' : ''}`}>
              <EnergyCircuit gate={column.gate} a={row.a} b={row.b} phase={circuit} names={['p', 'q']} gateLabel={column.symbol} stateText={vfText} />
            </div>

            {phase !== 'wrong' && (
              <p className="master-question">
                p é {VF(row.a)} e q é {VF(row.b)}. A luz de p {column.symbol} q acende?
              </p>
            )}

            {phase === 'wrong' ? (
              <button type="button" className="master-retry" onClick={retry}>
                <RotateCcw size={20} strokeWidth={2.8} aria-hidden="true" /> Tentar de novo
              </button>
            ) : (
              <div className="mirror-choices master-choices">
                <button type="button" className="lamp-choice lamp-choice--no" onClick={() => predict(false)} disabled={phase !== 'asking'}>
                  <span className="lamp-choice__icon" aria-hidden="true">
                    <LightbulbOff size={28} strokeWidth={2.6} />
                  </span>
                  Não acende (F)
                </button>
                <button type="button" className="lamp-choice lamp-choice--yes" onClick={() => predict(true)} disabled={phase !== 'asking'}>
                  <span className="lamp-choice__icon" aria-hidden="true">
                    <Lightbulb size={28} strokeWidth={2.6} />
                  </span>
                  Acende (V)
                </button>
              </div>
            )}
          </>
        )}

        {showTable && (
          <section ref={tableRef} className={`tween-reveal gate-table tween-master-table ${tableSolved ? 'is-solved' : ''}`} aria-label="Tabela Mestra">
            {tableSolved && <StarBurst />}
            <p className="tween-reveal__label">Tabela Mestra</p>
            <table>
              <thead>
                <tr>
                  <th>p</th>
                  <th>q</th>
                  <th>p ∧ q</th>
                  <th>p ∨ q</th>
                  <th className="is-key">¬p</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r, index) => (
                  <tr key={index}>
                    <td className={r.a ? 'is-v' : 'is-f'}>{VF(r.a)}</td>
                    <td className={r.b ? 'is-v' : 'is-f'}>{VF(r.b)}</td>
                    <td className={r.a && r.b ? 'is-v' : 'is-f'}>{VF(r.a && r.b)}</td>
                    <td className={r.a || r.b ? 'is-v' : 'is-f'}>{VF(r.a || r.b)}</td>
                    <td className="tween-master-table__not">
                      <button
                        type="button"
                        className={`tween-master-cell ${notCells[index] === null ? 'is-unset' : notCells[index] ? 'is-v' : 'is-f'} ${wrongCells.includes(index) ? 'is-wrong' : ''}`}
                        onClick={() => toggleNot(index)}
                        disabled={tableSolved}
                        aria-label={`Linha ${index + 1}, não p: ${notCells[index] === null ? 'sem resposta' : VF(notCells[index])}. Toque para mudar.`}
                      >
                        {notCells[index] === null ? '?' : VF(notCells[index])}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="tween-reveal__note">{tableSolved ? challenge.tableNote : 'Toque nas casas de ¬p para escolher V ou F.'}</p>
            {tableSolved ? (
              <GameButton variant="green" size="lg" icon={Check} onClick={finish} sound={null}>
                Terminar
              </GameButton>
            ) : (
              <GameButton variant="lilac" size="lg" icon={Check} onClick={checkTable} sound={null}>
                Conferir a tabela
              </GameButton>
            )}
          </section>
        )}
      </div>

      {stars !== null && <GameFeedback line={feedback.success} onContinue={() => onComplete(stars)} />}
    </div>
  );
}
