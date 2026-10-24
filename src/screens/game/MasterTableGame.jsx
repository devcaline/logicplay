import { useEffect, useRef, useState } from 'react';
import { Lightbulb, LightbulbOff, RotateCcw } from 'lucide-react';
import TopBar from '../../components/ui/TopBar.jsx';
import MascotDialogue from '../../components/mascot/MascotDialogue.jsx';
import StarBurst from '../../components/ui/StarBurst.jsx';
import EnergyCircuit from '../../components/ui/EnergyCircuit.jsx';
import MasterTable from '../../components/ui/MasterTable.jsx';
import { getLevelScene } from '../../components/scenery/scenes.js';
import GameFeedback from './GameFeedback.jsx';
import { gateOutput } from '../../logic/validation.js';
import { useGame, useNarration } from '../../state/GameContext.jsx';
import { sfx } from '../../audio/sfx.js';
import './TruthLightsGame.css';
import './MasterTableGame.css';

// Depois do palpite: energia sai das alavancas, chega na lâmpada e então o resultado.
const INPUTS_MS = 250;
const OUTPUT_MS = 1150;
const VERDICT_MS = 2200;
const NEXT_MS = 1300;
const TABLE_SHOW_MS = 3600; // tempo vendo a Tabela Mestra completa antes da comemoração

/**
 * Tabela Mestra: um circuito por vez. Duas alavancas mandam energia por fios até uma porta
 * (E ou OU) e uma lâmpada. A criança diz se a luz acende e o circuito mostra a energia correndo.
 * No fim, aparece a Tabela Mestra completa com todas as respostas.
 */
export default function MasterTableGame({ challenge, level, onExit, onComplete }) {
  const { completeLevel } = useGame();
  const { autoSpeak } = useNarration();
  const { rows, columns, levers, feedback, answers: labels } = challenge;
  const Scene = getLevelScene(challenge.scene);

  const [columnIndex, setColumnIndex] = useState(0);
  const [rowIndex, setRowIndex] = useState(0);
  const [phase, setPhase] = useState('asking'); // asking | revealing | right | wrong | table | success
  const [circuit, setCircuit] = useState('idle'); // idle | inputs | output | done
  const [line, setLine] = useState(columns[0].start);
  const [lineCount, setLineCount] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const timers = useRef([]);

  const column = columns[columnIndex];
  const row = rows[rowIndex];
  const showTable = phase === 'table' || phase === 'success';

  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms));
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const say = (nextLine) => {
    setLine(nextLine);
    setLineCount((count) => count + 1);
    autoSpeak(nextLine);
  };

  useEffect(() => {
    autoSpeak(columns[0].start);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (phase !== 'success') return undefined;
    const timer = setTimeout(() => setShowFeedback(true), 1700);
    return () => clearTimeout(timer);
  }, [phase]);

  const goNext = () => {
    const lastRow = rowIndex === rows.length - 1;
    const lastColumn = columnIndex === columns.length - 1;
    setCircuit('idle');
    setPhase('asking');
    if (lastRow && lastColumn) {
      setPhase('table');
      sfx.play('success');
      say(feedback.tableDone);
      later(() => {
        setPhase('success');
        completeLevel(level.id, 3);
        setLine(feedback.success);
      }, TABLE_SHOW_MS);
      return;
    }
    if (lastRow) {
      setColumnIndex(columnIndex + 1);
      setRowIndex(0);
      say(columns[columnIndex + 1].start);
      return;
    }
    setRowIndex(rowIndex + 1);
    say(column.questions[rowIndex + 1]);
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
        // Acerto: só o som positivo.
        sfx.play('correct');
        setPhase('right');
        later(goNext, NEXT_MS);
      } else {
        sfx.play('tryAgain');
        setPhase('wrong');
        say(column.hints[Number(row.a) + Number(row.b)]);
      }
    }, VERDICT_MS);
  };

  const retry = () => {
    sfx.play('tap');
    setCircuit('idle');
    setPhase('asking');
    say(column.questions[rowIndex]);
  };

  // Respostas da tabela: tudo que já foi descoberto (para a tabela final).
  const tableAnswers = Object.fromEntries(
    columns.map((col) => [col.id, Object.fromEntries(rows.map((r, index) => [index, gateOutput(col.gate, r.a, r.b)]))]),
  );

  const stepIndex = columnIndex * rows.length + rowIndex;
  const totalSteps = columns.length * rows.length;

  return (
    <div className="screen game-screen master-screen">
      <Scene />
      <TopBar onBack={onExit} backLabel="Voltar ao mapa" title={level.name} />

      <div className="game-layout master-layout">
        <MascotDialogue
          line={line}
          bubbleKey={`${line.id}-${lineCount}`}
          mood={phase === 'wrong' ? 'encourage' : showTable ? 'cheer' : 'curious'}
          mascotSize={84}
          layout="compact"
          tone={phase === 'wrong' ? 'hint' : phase === 'table' ? 'success' : 'default'}
          className={`game-dialogue ${phase === 'success' ? 'is-hidden' : ''}`}
        />

        {!showTable && (
          <>
            <div className="master-steps" aria-label={`Teste ${stepIndex + 1} de ${totalSteps}`}>
              {columns.map((col, colIndex) => (
                <span key={col.id} className={`master-steps__group ${colIndex === columnIndex ? 'is-active' : ''}`}>
                  <strong>{col.gate}</strong>
                  {rows.map((_, index) => {
                    const position = colIndex * rows.length + index;
                    return <i key={index} className={position < stepIndex ? 'is-done' : position === stepIndex ? 'is-current' : ''} />;
                  })}
                </span>
              ))}
            </div>

            <div key={`${column.id}-${rowIndex}`} className={`master-circuit ${phase === 'right' ? 'is-right' : ''} ${phase === 'wrong' ? 'is-wrong' : ''}`}>
              <EnergyCircuit gate={column.gate} a={row.a} b={row.b} phase={circuit} />
            </div>

            {/* A pergunta completa está na fala do Pipo; aqui só o lembrete curto. */}
            {phase !== 'wrong' && <p className="master-question">A luz acende?</p>}

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
                  {labels.off}
                </button>
                <button type="button" className="lamp-choice lamp-choice--yes" onClick={() => predict(true)} disabled={phase !== 'asking'}>
                  <span className="lamp-choice__icon" aria-hidden="true">
                    <Lightbulb size={28} strokeWidth={2.6} />
                  </span>
                  {labels.on}
                </button>
              </div>
            )}
          </>
        )}

        {showTable && (
          <div className="master-stage">
            <StarBurst />
            <MasterTable rows={rows} columns={columns} levers={levers} answers={tableAnswers} solved />
          </div>
        )}
      </div>

      {showFeedback && <GameFeedback line={feedback.success} onContinue={onComplete} />}
    </div>
  );
}
