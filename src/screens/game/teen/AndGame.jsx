import { useEffect, useMemo, useRef, useState } from 'react';
import { Check, X, Lightbulb, ArrowRight, BookOpen } from 'lucide-react';
import TopBar from '../../../components/ui/TopBar.jsx';
import Mascot from '../../../components/mascot/Mascot.jsx';
import MascotDialogue from '../../../components/mascot/MascotDialogue.jsx';
import GameButton from '../../../components/ui/GameButton.jsx';
import { getLevelScene } from '../../../components/scenery/scenes.js';
import { getDifficulty } from '../../../config/ageGroups.js';
import { generateAndRounds, andWarmup, AND_ROWS } from '../../../data/teen/andRounds.js';
import { starsFromErrors } from '../../../logic/scoring.js';
import { useGame, useSpeakingId } from '../../../state/GameContext.jsx';
import { sfx } from '../../../audio/sfx.js';
import './teen.css';

const AUTO_NEXT_MS = 1500;

const VF = (value) => (value ? 'V' : 'F');
const CHOICES = [
  { value: true, label: 'V', caption: 'verdadeira' },
  { value: false, label: 'F', caption: 'falsa' },
];
const OPS = { and: (row) => row.p && row.q, or: (row) => row.p || row.q };
const CONTENT = {
  'teen-and': { generate: generateAndRounds, warmup: andWarmup },
};

/**
 * A conjunção (13+): p ∧ q só é V quando p e q são V.
 * Questões de três tipos: avaliar V(p ∧ q) (uma frase por vez), encontrar os x que tornam
 * uma sentença com ∧ verdadeira, e completar a tabela-verdade do ∧.
 * Antes há um aquecimento guiado que não vale estrelas.
 */
export default function AndGame({ challenge, level, onExit, onComplete }) {
  const { profile, completeLevel } = useGame();
  const speakingId = useSpeakingId();
  const difficultyId = profile?.difficulty ?? 'easy';
  const difficulty = getDifficulty(difficultyId);
  const Scene = getLevelScene(challenge.scene);
  const { symbols } = challenge;

  const content = CONTENT[challenge.type] ?? CONTENT['teen-and'];
  const rounds = useMemo(() => content.generate(difficultyId), [content, difficultyId]);
  const warmup = useMemo(() => content.warmup(), [content]);
  const [inWarmup, setInWarmup] = useState(true);
  const [index, setIndex] = useState(0);
  const [itemIndex, setItemIndex] = useState(0);
  const [answer, setAnswer] = useState(null); // eval: true/false escolhido
  const [picked, setPicked] = useState([]); // findx: valores marcados
  const [cells, setCells] = useState({}); // table: { 'col-row': true/false }
  const [wrongMarks, setWrongMarks] = useState([]);
  const [checkMessage, setCheckMessage] = useState(null);
  const [solved, setSolved] = useState(false); // findx/table resolvidos
  const [errors, setErrors] = useState(0);
  const [hintOpen, setHintOpen] = useState(false);
  const [legendOpen, setLegendOpen] = useState(false);
  const feedbackRef = useRef(null);

  const round = inWarmup ? warmup : rounds[index];
  const isEval = round.kind === 'eval';
  const item = isEval ? round.items[itemIndex] : null;
  const answered = isEval ? answer !== null : solved;
  const correct = isEval && answered && answer === item.answer;
  const lastItem = !isEval || itemIndex === round.items.length - 1;
  const lastRound = index === rounds.length - 1;
  const hint = isEval ? item.hint : round.hint;

  useEffect(() => {
    if (answered || checkMessage) feedbackRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [answered, checkMessage]);

  // Acertou uma frase e ainda há outras na questão: mostra a confirmação e passa sozinho para a próxima.
  const autoNext = correct && !lastItem;
  useEffect(() => {
    if (!autoNext || speakingId) return undefined; // espera o Pipo terminar de falar
    const timer = setTimeout(() => {
      setAnswer(null);
      setHintOpen(false);
      setItemIndex((current) => current + 1);
    }, AUTO_NEXT_MS);
    return () => clearTimeout(timer);
  }, [speakingId, autoNext, itemIndex]);

  const addError = () => {
    if (!inWarmup) setErrors((count) => count + 1); // o aquecimento não conta
  };

  const choose = (value) => {
    if (answered) return;
    setAnswer(value);
    setHintOpen(false);
    if (value === item.answer) {
      sfx.play('correct');
      return;
    }
    sfx.play('tryAgain');
    addError();
  };

  const togglePick = (n) => {
    if (solved) return;
    sfx.play('pick');
    setPicked((list) => (list.includes(n) ? list.filter((x) => x !== n) : [...list, n]));
    setWrongMarks([]);
    setCheckMessage(null);
  };

  const toggleCell = (key) => {
    if (solved) return;
    sfx.play('pick');
    setCells((current) => ({ ...current, [key]: current[key] === undefined ? true : !current[key] }));
    setWrongMarks((list) => list.filter((mark) => mark !== key));
    setCheckMessage(null);
  };

  const checkFindX = () => {
    const wrong = picked.filter((n) => !round.solution.includes(n));
    const missing = round.solution.filter((n) => !picked.includes(n));
    setHintOpen(false);
    if (!wrong.length && !missing.length) {
      sfx.play('correct');
      setSolved(true);
      setCheckMessage(null);
      return;
    }
    sfx.play('tryAgain');
    addError();
    setWrongMarks(wrong);
    const parts = [];
    if (wrong.length) parts.push(`${wrong.length === 1 ? 'o valor marcado em vermelho não serve' : 'os valores marcados em vermelho não servem'}`);
    if (missing.length) parts.push(`${missing.length === 1 ? 'falta 1 valor' : `faltam ${missing.length} valores`}`);
    const message = parts.join(' e ');
    setCheckMessage(message.charAt(0).toUpperCase() + message.slice(1) + '.');
  };

  const checkTable = () => {
    const keys = round.columns.flatMap((column, col) => AND_ROWS.map((row, r) => ({ key: `${col}-${r}`, expected: OPS[column.op](row) })));
    const unset = keys.filter(({ key }) => cells[key] === undefined);
    setHintOpen(false);
    if (unset.length) {
      sfx.play('tryAgain');
      setCheckMessage('Ainda há casas com “?”. Toque nelas para escolher V ou F.');
      return;
    }
    const wrong = keys.filter(({ key, expected }) => cells[key] !== expected).map(({ key }) => key);
    if (!wrong.length) {
      sfx.play('correct');
      setSolved(true);
      setCheckMessage(null);
      return;
    }
    sfx.play('tryAgain');
    addError();
    setWrongMarks(wrong);
    setCheckMessage(`${wrong.length === 1 ? '1 casa está errada' : `${wrong.length} casas estão erradas`}. Elas estão destacadas em amarelo.`);
  };

  const goNext = () => {
    sfx.play('tap');
    setAnswer(null);
    setHintOpen(false);
    setPicked([]);
    setCells({});
    setWrongMarks([]);
    setCheckMessage(null);
    setSolved(false);
    if (!lastItem) {
      setItemIndex(itemIndex + 1);
      return;
    }
    setItemIndex(0);
    if (inWarmup) {
      setInWarmup(false);
      return;
    }
    if (lastRound) {
      const stars = starsFromErrors(errors);
      completeLevel(level.id, stars);
      onComplete(stars);
      return;
    }
    setIndex(index + 1);
  };

  const nextLabel = () => {
    if (!lastItem) return 'Próxima frase';
    if (inWarmup) return 'Começar as questões';
    return lastRound ? 'Concluir fase' : 'Próxima questão';
  };

  // Em "passo a passo" (Fácil), as linhas já respondidas mostram o valor.
  const showValue = (lineIndex) => {
    if (answered) return true;
    if (item.focus !== undefined) return lineIndex < item.focus;
    return Boolean(item.showValues);
  };


  return (
    <div className="screen game-screen teen-screen">
      <Scene />
      <TopBar onBack={onExit} backLabel="Voltar ao mapa" title={level.name} />

      <div className="teen-layout teen-centered">
        <div className="teen-meta">
          <span className={`teen-badge teen-badge--${difficultyId}`}>{difficulty?.label}</span>
          <span className="teen-progress">{inWarmup ? 'Aquecimento' : `Questão ${index + 1} de ${rounds.length}`}</span>
          {symbols && (
            <button type="button" className="teen-legend-btn" onClick={() => setLegendOpen((open) => !open)} aria-expanded={legendOpen}>
              <BookOpen size={16} strokeWidth={2.6} aria-hidden="true" /> Símbolos
            </button>
          )}
          {!inWarmup && (
            <span className="teen-errors" aria-label={`${errors} erros`}>
              Erros: {errors}
            </span>
          )}
        </div>

        {legendOpen && (
          <div className="teen-legend" role="note">
            <button type="button" className="teen-legend__close" onClick={() => setLegendOpen(false)} aria-label="Fechar símbolos">
              <X size={16} strokeWidth={3} />
            </button>
            <dl>
              {symbols.map(([symbol, meaning]) => (
                <div key={symbol}>
                  <dt>{symbol}</dt>
                  <dd>{meaning}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        {inWarmup && (
          <MascotDialogue autoPlay
            line={{ id: `${challenge.id}.${item.id}${answered ? (correct ? '.ok' : '.retry') : ''}`, text: answered ? `${correct ? 'Isso!' : 'Quase.'} ${item.why}` : item.talk }}
            bubbleKey={`${item.id}${answered ? '-done' : ''}`}
            mood={answered ? (correct ? 'cheer' : 'encourage') : 'curious'}
            mascotSize={60}
            layout="compact"
            className="decoder-talk"
          />
        )}

        {isEval && (
          <>
            <section className="statement and-statement" aria-live="polite">
              <p className="teen-card__label">
                {inWarmup ? 'Aquecimento · ' : ''}Frase {itemIndex + 1} de {round.items.length}
              </p>
              <ul className="and-lines">
                {item.lines.map((line, lineIndex) => (
                  <li key={line.name} className={item.focus === lineIndex ? 'is-focus' : ''}>
                    <span className="and-lines__name">{line.name}:</span>
                    <span className="and-lines__text">{line.text}</span>
                    {showValue(lineIndex) && <span className={`and-value ${line.value ? 'is-v' : 'is-f'}`}>{VF(line.value)}</span>}
                  </li>
                ))}
              </ul>
              <p className="and-ask">
                V({item.ask}) = <span className={`and-ask__slot ${answered ? (item.answer ? 'is-v' : 'is-f') : ''}`}>{answered ? VF(item.answer) : '?'}</span>
              </p>
              <div className="statement__dots" aria-hidden="true">
                {round.items.map((other, position) => (
                  <span key={other.id} className={`statement__dot ${position < itemIndex ? 'is-done' : ''} ${position === itemIndex ? 'is-current' : ''}`} />
                ))}
              </div>
            </section>

            <div className="relation-choices" role="group" aria-label={`Valor de ${item.ask}`}>
              {CHOICES.map((choice) => {
                const isPicked = answer === choice.value;
                const isRight = answered && choice.value === item.answer;
                return (
                  <button
                    key={choice.label}
                    type="button"
                    className={`relation-btn prop-choice prop-choice--${choice.label} ${isPicked && !isRight ? 'is-wrong' : ''} ${isRight ? 'is-right' : ''}`}
                    onClick={() => choose(choice.value)}
                    disabled={answered}
                  >
                    <span className="relation-btn__symbol">{choice.label}</span>
                    <span className="relation-btn__label">{choice.caption}</span>
                  </button>
                );
              })}
            </div>
          </>
        )}

        {round.kind === 'findx' && (
          <section className="statement and-statement" aria-live="polite">
            <p className="teen-card__label">Sentença aberta</p>
            <p className="and-ask">{round.sentence}</p>
            <p className="and-findx__note">
              x ∈ {'{'}1, 2, …, {round.universe.length}{'}'}. Toque nos valores de x que tornam a sentença V.
            </p>
            <div className="x-chips" role="group" aria-label="Valores de x">
              {round.universe.map((n) => {
                const on = picked.includes(n);
                return (
                  <button
                    key={n}
                    type="button"
                    className={`x-chip ${on ? 'is-on' : ''} ${wrongMarks.includes(n) ? 'is-wrong' : ''} ${solved && on ? 'is-right' : ''}`}
                    onClick={() => togglePick(n)}
                    disabled={solved}
                    aria-pressed={on}
                  >
                    {n}
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {round.kind === 'table' && (
          <section className="statement and-statement" aria-live="polite">
            <p className="teen-card__label">Tabela-verdade</p>
            <table className="and-table">
              <thead>
                <tr>
                  <th>p</th>
                  <th>q</th>
                  {round.columns.map((column) => (
                    <th key={column.label} className="is-key">{column.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {AND_ROWS.map((row, r) => (
                  <tr key={r}>
                    <td className={row.p ? 'is-v' : 'is-f'}>{VF(row.p)}</td>
                    <td className={row.q ? 'is-v' : 'is-f'}>{VF(row.q)}</td>
                    {round.columns.map((column, col) => {
                      const key = `${col}-${r}`;
                      const value = cells[key];
                      return (
                        <td key={column.label}>
                          <button
                            type="button"
                            className={`and-cell ${value === undefined ? 'is-unset' : value ? 'is-v' : 'is-f'} ${wrongMarks.includes(key) ? 'is-wrong' : ''}`}
                            onClick={() => toggleCell(key)}
                            disabled={solved}
                            aria-label={`Linha ${r + 1}, ${column.label}: ${value === undefined ? 'sem resposta' : VF(value)}. Toque para mudar.`}
                          >
                            {value === undefined ? '?' : VF(value)}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
            {!solved && <p className="and-findx__note">Toque nas casas para escolher V ou F.</p>}
          </section>
        )}

        {isEval && answered && !inWarmup && (
          <p ref={feedbackRef} className={`teen-feedback ${correct ? 'teen-feedback--ok' : 'teen-feedback--error'}`}>
            {correct ? <Check size={18} strokeWidth={3} aria-hidden="true" /> : <X size={18} strokeWidth={3} aria-hidden="true" />}
            <span>
              {!correct && `Você marcou ${VF(answer)}. O certo é ${VF(item.answer)}. `}
              {item.why}
            </span>
          </p>
        )}
        {isEval && answered && inWarmup && <span ref={feedbackRef} />}

        {!isEval && checkMessage && (
          <p ref={feedbackRef} className="teen-feedback teen-feedback--error">
            <X size={18} strokeWidth={3} aria-hidden="true" />
            <span>{checkMessage}</span>
          </p>
        )}
        {!isEval && solved && (
          <p ref={feedbackRef} className="teen-feedback teen-feedback--ok">
            <Check size={18} strokeWidth={3} aria-hidden="true" />
            <span>
              {round.doneText}
            </span>
          </p>
        )}

        {hintOpen && !answered && (
          <div className="teen-hint" role="note">
            <Mascot mood="encourage" size={48} />
            <p>{hint}</p>
          </div>
        )}

        {/* A barra fica sempre na tela (só some de vista) para o conteúdo não sair do meio. */}
        <div className={`teen-actions ${autoNext ? 'is-waiting' : ''}`} aria-hidden={autoNext}>
          {answered && !autoNext ? (
            <GameButton variant="green" iconRight={ArrowRight} onClick={goNext} sound={null}>
              {nextLabel()}
            </GameButton>
          ) : (
            <>
              {(!hintOpen || autoNext) && (
                <GameButton variant="light" size="sm" icon={Lightbulb} onClick={() => setHintOpen(true)}>
                  Dica
                </GameButton>
              )}
              {!isEval && (
                <GameButton variant="lilac" icon={Check} onClick={round.kind === 'findx' ? checkFindX : checkTable} sound={null}>
                  Conferir
                </GameButton>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
