import { useEffect, useMemo, useRef, useState } from 'react';
import { Check, X, Lightbulb, ArrowRight, BookOpen } from 'lucide-react';
import TopBar from '../../../components/ui/TopBar.jsx';
import Mascot from '../../../components/mascot/Mascot.jsx';
import MascotDialogue from '../../../components/mascot/MascotDialogue.jsx';
import GameButton from '../../../components/ui/GameButton.jsx';
import { getLevelScene } from '../../../components/scenery/scenes.js';
import { getDifficulty } from '../../../config/ageGroups.js';
import { generateMasterRounds, masterWarmup, tableRows, CLASSES } from '../../../data/teen/masterRounds.js';
import { starsFromErrors } from '../../../logic/scoring.js';
import { useGame } from '../../../state/GameContext.jsx';
import { sfx } from '../../../audio/sfx.js';
import './teen.css';

const VF = (value) => (value ? 'V' : 'F');
const LABELS = { which: 'Qual fórmula?', classify: 'Classifique', equiv: 'Equivalentes?' };

/**
 * A Tabela Mestra (13+): tabelas-verdade completas, com três dinâmicas novas:
 * Qual fórmula? (a coluna de resultados já está pronta), tautologia/contradição/contingência
 * e Equivalentes? (se não forem, apontar a linha que prova). O rascunho na tabela não vale ponto.
 */
export default function MasterGame({ challenge, level, onExit, onComplete }) {
  const { profile, completeLevel } = useGame();
  const difficultyId = profile?.difficulty ?? 'easy';
  const difficulty = getDifficulty(difficultyId);
  const Scene = getLevelScene(challenge.scene);
  const { symbols } = challenge;

  const rounds = useMemo(() => generateMasterRounds(difficultyId), [difficultyId]);
  const warmup = useMemo(() => masterWarmup(), []);
  const [inWarmup, setInWarmup] = useState(true);
  const [index, setIndex] = useState(0);
  const [itemIndex, setItemIndex] = useState(0);
  const [answer, setAnswer] = useState(null); // which: fórmula; classify: classe; equiv: true/false
  const [stage, setStage] = useState('ask'); // equiv: ask | row | done
  const [pickedRow, setPickedRow] = useState(null);
  const [scratch, setScratch] = useState({}); // { 'a-0': true }
  const [rowMessage, setRowMessage] = useState(null);
  const [errors, setErrors] = useState(0);
  const [hintOpen, setHintOpen] = useState(false);
  const [legendOpen, setLegendOpen] = useState(false);
  const feedbackRef = useRef(null);

  const round = inWarmup ? warmup : rounds[index];
  const item = round.items[itemIndex];
  const rows = tableRows(item.vars);
  const lastItem = itemIndex === round.items.length - 1;
  const lastRound = index === rounds.length - 1;

  let done;
  let correct;
  if (item.kind === 'equiv') {
    done = stage === 'done';
    correct = done && answer === item.equivalent;
  } else {
    done = answer !== null;
    correct = done && answer === item.answer;
  }

  useEffect(() => {
    if (done || rowMessage || stage === 'row') feedbackRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [done, rowMessage, stage]);

  const addError = () => {
    if (!inWarmup) setErrors((count) => count + 1); // o aquecimento não conta
  };

  const toggleScratch = (key) => {
    if (done) return;
    sfx.play('pick');
    setScratch((current) => ({ ...current, [key]: current[key] === undefined ? true : current[key] ? false : undefined }));
  };

  const pickAnswer = (value) => {
    if (done || stage === 'row') return;
    setAnswer(value);
    setHintOpen(false);
    if (item.kind === 'equiv') {
      if (value === item.equivalent) {
        sfx.play('correct');
        setStage(item.equivalent ? 'done' : 'row');
        return;
      }
      sfx.play('tryAgain');
      addError();
      // Disse "equivalentes" sem serem: agora precisa achar a linha que prova o contrário.
      setStage(item.equivalent ? 'done' : 'row');
      return;
    }
    if (value === item.answer) sfx.play('correct');
    else {
      sfx.play('tryAgain');
      addError();
    }
  };

  const pickRow = (rowIndex) => {
    if (stage !== 'row') return;
    if (item.differ.includes(rowIndex)) {
      sfx.play('correct');
      setPickedRow(rowIndex);
      setRowMessage(null);
      setStage('done');
      return;
    }
    sfx.play('tryAgain');
    addError();
    setPickedRow(null);
    setRowMessage(`Na linha ${rowIndex + 1}, as duas fórmulas dão ${VF(item.colA[rowIndex])}. Procure outra linha.`);
  };

  const goNext = () => {
    sfx.play('tap');
    setAnswer(null);
    setStage('ask');
    setPickedRow(null);
    setScratch({});
    setRowMessage(null);
    setHintOpen(false);
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
    if (!lastItem) return 'Próxima tabela';
    if (inWarmup) return 'Começar as questões';
    return lastRound ? 'Concluir fase' : 'Próxima questão';
  };

  // Colunas extras da tabela, conforme o tipo de questão.
  const columns = (() => {
    if (item.kind === 'which') return [{ key: 'm', label: '?', values: item.column, mystery: true }];
    if (item.kind === 'classify') return [{ key: 'a', label: item.formula, values: done ? item.column : null }];
    return [
      { key: 'a', label: item.a, values: done ? item.colA : null },
      { key: 'b', label: item.b, values: done ? item.colB : null },
    ];
  })();

  const feedbackText = () => {
    if (item.kind === 'which') return correct ? item.why : `Você escolheu ${answer}, mas a coluna é de ${item.answer}. ${item.why}`;
    if (item.kind === 'classify') return correct ? item.why : `Você marcou ${CLASSES[answer].label.toLowerCase()}. ${item.why}`;
    if (item.equivalent) return correct ? item.why : `Você disse que não, mas elas são equivalentes: as duas colunas são iguais em todas as ${item.colA.length} linhas.`;
    return `${correct ? '' : 'Elas não são equivalentes. '}A linha ${pickedRow + 1} prova: ${item.a} dá ${VF(item.colA[pickedRow])} e ${item.b} dá ${VF(item.colB[pickedRow])}. ${item.why}`;
  };

  return (
    <div className="screen game-screen teen-screen">
      <Scene />
      <TopBar onBack={onExit} backLabel="Voltar ao mapa" title={level.name} />

      <div className="teen-layout">
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
          <MascotDialogue
            line={{ id: `${challenge.id}.${item.id}${done ? (correct ? '.ok' : '.retry') : ''}`, text: done ? (correct ? item.done : `Quase. ${item.why}`) : item.talk }}
            bubbleKey={`${item.id}${done ? '-done' : ''}`}
            mood={done ? (correct ? 'cheer' : 'encourage') : 'curious'}
            mascotSize={60}
            layout="compact"
            className="decoder-talk"
          />
        )}

        <section className="statement and-statement" aria-live="polite">
          <p className="teen-card__label">
            {inWarmup ? 'Aquecimento · ' : ''}
            {LABELS[item.kind]} · tabela {itemIndex + 1} de {round.items.length}
          </p>
          {item.kind === 'which' && <p className="or-goal">Qual fórmula gera a coluna misteriosa “?”</p>}
          {item.kind === 'classify' && <p className="or-goal">Esta fórmula é sempre V, sempre F ou depende da linha?</p>}
          {item.kind === 'equiv' && (
            <p className="or-goal">
              {stage === 'row' ? 'Toque numa linha em que as duas fórmulas dão valores diferentes.' : 'As duas fórmulas têm a mesma coluna?'}
            </p>
          )}

          <div className="tmaster-wrap">
            <table className={`and-table tmaster-table ${stage === 'row' ? 'is-picking' : ''}`}>
              <thead>
                <tr>
                  {item.kind === 'equiv' && <th className="tmaster-table__num">#</th>}
                  {item.vars.map((name) => (
                    <th key={name}>{name}</th>
                  ))}
                  {columns.map((column) => (
                    <th key={column.key} className={`is-key ${column.mystery ? 'tmaster-table__mystery' : ''}`}>
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, r) => (
                  <tr key={r} className={`${pickedRow === r ? 'is-proof' : ''} ${done && item.kind === 'equiv' && item.differ.includes(r) ? 'is-differ' : ''}`}>
                    {item.kind === 'equiv' && (
                      <td className="tmaster-table__num">
                        <button type="button" className="master-row-btn" onClick={() => pickRow(r)} disabled={stage !== 'row'} aria-label={`Linha ${r + 1}`}>
                          {r + 1}
                        </button>
                      </td>
                    )}
                    {item.vars.map((name) => (
                      <td key={name} className={row[name] ? 'is-v' : 'is-f'}>
                        {VF(row[name])}
                      </td>
                    ))}
                    {columns.map((column) => {
                      if (column.values) {
                        return (
                          <td key={column.key} className={`tmaster-table__result ${column.values[r] ? 'is-v' : 'is-f'} ${column.mystery ? 'is-mystery' : ''}`}>
                            {VF(column.values[r])}
                          </td>
                        );
                      }
                      const key = `${column.key}-${r}`;
                      const value = scratch[key];
                      return (
                        <td key={column.key}>
                          <button
                            type="button"
                            className={`and-cell master-scratch ${value === undefined ? 'is-unset' : value ? 'is-v' : 'is-f'}`}
                            onClick={() => toggleScratch(key)}
                            aria-label={`Rascunho, linha ${r + 1}, ${column.label}: ${value === undefined ? 'vazio' : VF(value)}`}
                          >
                            {value === undefined ? '·' : VF(value)}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {item.kind !== 'which' && !done && <p className="and-findx__note">Rascunho: toque nas casas para anotar V ou F. Não vale ponto.</p>}
        </section>

        {item.kind === 'which' && (
          <div className="not-options master-options" role="group" aria-label="Fórmulas">
            {item.options.map((formula) => {
              const isPicked = answer === formula;
              const isRight = done && formula === item.answer;
              return (
                <button key={formula} type="button" className={`not-option ${isPicked && !isRight ? 'is-wrong' : ''} ${isRight ? 'is-right' : ''}`} onClick={() => pickAnswer(formula)} disabled={done}>
                  {formula}
                  {isRight && <Check size={20} strokeWidth={3} aria-hidden="true" />}
                  {isPicked && !isRight && <X size={20} strokeWidth={3} aria-hidden="true" />}
                </button>
              );
            })}
          </div>
        )}

        {item.kind === 'classify' && (
          <div className="prop-choices" role="group" aria-label="Classificação">
            {Object.entries(CLASSES).map(([key, info]) => {
              const isPicked = answer === key;
              const isRight = done && key === item.answer;
              return (
                <button key={key} type="button" className={`relation-btn prop-choice master-class ${isPicked && !isRight ? 'is-wrong' : ''} ${isRight ? 'is-right' : ''}`} onClick={() => pickAnswer(key)} disabled={done}>
                  <span className="master-class__name">{info.label}</span>
                  <span className="relation-btn__label">{info.caption}</span>
                </button>
              );
            })}
          </div>
        )}

        {item.kind === 'equiv' && stage === 'ask' && (
          <div className="relation-choices" role="group" aria-label="Equivalentes?">
            <button type="button" className="relation-btn prop-choice master-class" onClick={() => pickAnswer(true)}>
              <span className="master-class__name">São equivalentes</span>
              <span className="relation-btn__label">mesma coluna</span>
            </button>
            <button type="button" className="relation-btn prop-choice master-class" onClick={() => pickAnswer(false)}>
              <span className="master-class__name">Não são</span>
              <span className="relation-btn__label">alguma linha difere</span>
            </button>
          </div>
        )}

        {item.kind === 'equiv' && stage === 'row' && (
          <p ref={feedbackRef} className={`teen-feedback ${rowMessage ? 'teen-feedback--error' : answer === false ? 'teen-feedback--ok' : 'teen-feedback--error'}`}>
            {rowMessage ? <X size={18} strokeWidth={3} aria-hidden="true" /> : answer === false ? <Check size={18} strokeWidth={3} aria-hidden="true" /> : <X size={18} strokeWidth={3} aria-hidden="true" />}
            <span>
              {rowMessage ??
                (answer === false
                  ? 'Certo, não são equivalentes. Agora prove: toque no número de uma linha em que elas diferem.'
                  : 'Na verdade, elas não são equivalentes. Prove: toque no número de uma linha em que elas diferem.')}
            </span>
          </p>
        )}

        {done && !inWarmup && (
          <p ref={feedbackRef} className={`teen-feedback ${correct ? 'teen-feedback--ok' : 'teen-feedback--error'}`}>
            {correct ? <Check size={18} strokeWidth={3} aria-hidden="true" /> : <X size={18} strokeWidth={3} aria-hidden="true" />}
            <span>{feedbackText()}</span>
          </p>
        )}
        {done && inWarmup && <span ref={feedbackRef} />}

        {hintOpen && !done && (
          <div className="teen-hint" role="note">
            <Mascot mood="encourage" size={48} />
            <p>{item.hint}</p>
          </div>
        )}

        {(done || !hintOpen) && (
          <div className="teen-actions">
            {done ? (
              <GameButton variant="green" iconRight={ArrowRight} onClick={goNext} sound={null}>
                {nextLabel()}
              </GameButton>
            ) : (
              <GameButton variant="light" size="sm" icon={Lightbulb} onClick={() => setHintOpen(true)}>
                Dica
              </GameButton>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
