import { useEffect, useMemo, useRef, useState } from 'react';
import { Check, X, Lightbulb, ArrowRight, BookOpen, Search } from 'lucide-react';
import TopBar from '../../../components/ui/TopBar.jsx';
import Mascot from '../../../components/mascot/Mascot.jsx';
import MascotDialogue from '../../../components/mascot/MascotDialogue.jsx';
import GameButton from '../../../components/ui/GameButton.jsx';
import { getLevelScene } from '../../../components/scenery/scenes.js';
import { getDifficulty } from '../../../config/ageGroups.js';
import { generateOrRounds, orWarmup, EXPRESSIONS } from '../../../data/teen/orRounds.js';
import { starsFromErrors } from '../../../logic/scoring.js';
import { useGame } from '../../../state/GameContext.jsx';
import { sfx } from '../../../audio/sfx.js';
import './teen.css';

const AUTO_NEXT_MS = 1500;

const VF = (value) => (value ? 'V' : 'F');
const DETECTIVE_CHOICES = [
  { key: 'V', label: 'V', caption: 'verdadeira' },
  { key: 'F', label: 'F', caption: 'falsa' },
  { key: '?', label: '?', caption: 'não dá para saber' },
];
const DETECTIVE_VERDICT = { V: 'é V', F: 'é F', '?': 'não dá para saber' };

/** "com p falsa", "com p e q verdadeiras"... */
function requireText(require) {
  const groups = [true, false]
    .map((value) => {
      const names = Object.keys(require).filter((name) => require[name] === value);
      if (!names.length) return null;
      const word = value ? 'verdadeira' : 'falsa';
      return `${names.join(' e ')} ${names.length > 1 ? `${word}s` : word}`;
    })
    .filter(Boolean);
  return groups.length ? `com ${groups.join(' e ')}` : '';
}

/**
 * A disjunção (13+), com duas dinâmicas diferentes da fase 2:
 * Monte (escolher cartas-frase para p, q e r e montar uma expressão com o valor pedido)
 * e Detetive (deduzir o valor de uma parte pelas pistas, inclusive "não dá para saber").
 */
export default function OrGame({ challenge, level, onExit, onComplete }) {
  const { profile, completeLevel } = useGame();
  const difficultyId = profile?.difficulty ?? 'easy';
  const difficulty = getDifficulty(difficultyId);
  const Scene = getLevelScene(challenge.scene);
  const { symbols } = challenge;

  const rounds = useMemo(() => generateOrRounds(difficultyId), [difficultyId]);
  const warmup = useMemo(() => orWarmup(), []);
  const [inWarmup, setInWarmup] = useState(true);
  const [index, setIndex] = useState(0);
  const [itemIndex, setItemIndex] = useState(0);
  const [slots, setSlots] = useState({}); // build: { p: cardId }
  const [revealed, setRevealed] = useState([]); // build: cartas cujo valor já apareceu
  const [checkMessage, setCheckMessage] = useState(null);
  const [solved, setSolved] = useState(false);
  const [answer, setAnswer] = useState(null); // detective
  const [errors, setErrors] = useState(0);
  const [hintOpen, setHintOpen] = useState(false);
  const [legendOpen, setLegendOpen] = useState(false);
  const feedbackRef = useRef(null);

  const round = inWarmup ? warmup : rounds[index];
  const item = round.items[itemIndex];
  const isBuild = item.kind === 'build';
  const expr = isBuild ? EXPRESSIONS[item.expr] : null;
  const done = isBuild ? solved : answer !== null;
  const correct = isBuild ? solved : answer === item.answer;
  const lastItem = itemIndex === round.items.length - 1;
  const lastRound = index === rounds.length - 1;
  const cardById = (id) => item.cards?.find((card) => card.id === id);
  const filled = isBuild && expr.names.every((name) => slots[name]);

  useEffect(() => {
    if (done || checkMessage) feedbackRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [done, checkMessage]);

  // Acertou e ainda há desafios ou casos na questão: mostra a confirmação e passa sozinho para o próximo.
  const autoNext = correct && !lastItem;
  useEffect(() => {
    if (!autoNext) return undefined;
    const timer = setTimeout(() => {
      setSlots({});
      setRevealed([]);
      setCheckMessage(null);
      setSolved(false);
      setAnswer(null);
      setHintOpen(false);
      setItemIndex((current) => current + 1);
    }, AUTO_NEXT_MS);
    return () => clearTimeout(timer);
  }, [autoNext, itemIndex]);

  const addError = () => {
    if (!inWarmup) setErrors((count) => count + 1); // o aquecimento não conta
  };

  // ---------- Monte ----------
  const placeCard = (cardId) => {
    if (solved) return;
    const empty = expr.names.find((name) => !slots[name]);
    if (!empty) {
      sfx.play('tryAgain');
      setCheckMessage('Os espaços estão cheios. Toque num espaço para devolver a carta.');
      return;
    }
    sfx.play('pick');
    // Calcula o espaço livre dentro do updater: dois toques rápidos não caem no mesmo espaço.
    setSlots((current) => {
      const free = expr.names.find((name) => !current[name]);
      if (!free || Object.values(current).includes(cardId)) return current;
      return { ...current, [free]: cardId };
    });
    setCheckMessage(null);
  };

  const clearSlot = (name) => {
    if (solved || !slots[name]) return;
    sfx.play('tap');
    setSlots((current) => ({ ...current, [name]: null }));
    setCheckMessage(null);
  };

  const checkBuild = () => {
    if (!filled) return;
    setHintOpen(false);
    const values = Object.fromEntries(expr.names.map((name) => [name, cardById(slots[name]).value]));
    setRevealed((list) => [...new Set([...list, ...expr.names.map((name) => slots[name])])]);
    const broken = Object.keys(item.require).find((name) => values[name] !== item.require[name]);
    const result = expr.value(values);
    if (!broken && result === item.target) {
      sfx.play('correct');
      setSolved(true);
      setCheckMessage(null);
      return;
    }
    sfx.play('tryAgain');
    addError();
    if (broken) {
      setCheckMessage(`A carta em ${broken} precisa ser ${VF(item.require[broken])}, mas “${cardById(slots[broken]).text}” é ${VF(values[broken])}.`);
      return;
    }
    setCheckMessage(`Com essas cartas, V(${expr.text}) = ${VF(result)}. O pedido era ${VF(item.target)}. Os valores das cartas agora aparecem: troque alguma.`);
  };

  // ---------- Detetive ----------
  const chooseDetective = (key) => {
    if (answer !== null) return;
    setAnswer(key);
    setHintOpen(false);
    if (key === item.answer) {
      sfx.play('correct');
      return;
    }
    sfx.play('tryAgain');
    addError();
  };

  const goNext = () => {
    sfx.play('tap');
    setSlots({});
    setRevealed([]);
    setCheckMessage(null);
    setSolved(false);
    setAnswer(null);
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
    if (!lastItem) return isBuild ? 'Próximo desafio' : 'Próximo caso';
    if (inWarmup) return 'Começar as questões';
    return lastRound ? 'Concluir fase' : 'Próxima questão';
  };

  const buildDoneText = () => {
    const values = expr.names.map((name) => `V(${name}) = ${VF(cardById(slots[name]).value)}`).join(', ');
    return `${values}, então V(${expr.text}) = ${VF(item.target)}.`;
  };

  const usedCards = Object.values(slots).filter(Boolean);
  const nextEmpty = isBuild ? expr.names.find((name) => !slots[name]) : null;

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
          <MascotDialogue
            line={{ id: `${challenge.id}.${item.id}${done ? (correct ? '.ok' : '.retry') : ''}`, text: done ? (correct ? item.done : `Quase. ${item.why ?? item.done}`) : item.talk }}
            bubbleKey={`${item.id}${done ? '-done' : ''}`}
            mood={done ? (correct ? 'cheer' : 'encourage') : 'curious'}
            mascotSize={60}
            layout="compact"
            className="decoder-talk"
          />
        )}

        {isBuild && (
          <>
            <section className="statement and-statement" aria-live="polite">
              <p className="teen-card__label">
                {inWarmup ? 'Aquecimento · ' : ''}Monte · desafio {itemIndex + 1} de {round.items.length}
              </p>
              <p className="or-goal">
                Monte <span className="or-goal__expr">{expr.text}</span>{' '}
                <strong className={item.target ? 'is-v' : 'is-f'}>{item.target ? 'verdadeira' : 'falsa'}</strong>
                {Object.keys(item.require).length > 0 && <> {requireText(item.require)}</>}.
              </p>
              <ul className="and-lines or-slots">
                {expr.names.map((name) => {
                  const card = cardById(slots[name]);
                  const need = item.require[name];
                  return (
                    <li key={name} className={!card && name === nextEmpty && !solved ? 'is-focus' : ''}>
                      <span className="and-lines__name">{name}:</span>
                      <button type="button" className={`or-slot ${card ? 'is-filled' : ''}`} onClick={() => clearSlot(name)} disabled={solved || !card} aria-label={card ? `${name}: ${card.text} Toque para devolver.` : `${name}: vazio`}>
                        {card ? card.text : 'toque numa carta'}
                      </button>
                      {need !== undefined && <span className="or-need">precisa ser {VF(need)}</span>}
                      {card && (solved || revealed.includes(card.id)) && <span className={`and-value ${card.value ? 'is-v' : 'is-f'}`}>{VF(card.value)}</span>}
                    </li>
                  );
                })}
              </ul>
              <div className="statement__dots" aria-hidden="true">
                {round.items.map((other, position) => (
                  <span key={other.id} className={`statement__dot ${position < itemIndex ? 'is-done' : ''} ${position === itemIndex ? 'is-current' : ''}`} />
                ))}
              </div>
            </section>

            {!solved && (
              <div className="or-cards" role="group" aria-label="Cartas">
                {item.cards.map((card) => {
                  const used = usedCards.includes(card.id);
                  const known = revealed.includes(card.id);
                  return (
                    <button key={card.id} type="button" className={`or-card ${used ? 'is-used' : ''}`} onClick={() => placeCard(card.id)} disabled={used}>
                      <span>{card.text}</span>
                      {known && <span className={`and-value ${card.value ? 'is-v' : 'is-f'}`}>{VF(card.value)}</span>}
                    </button>
                  );
                })}
              </div>
            )}
          </>
        )}

        {!isBuild && (
          <>
            <section className="statement and-statement" aria-live="polite">
              <p className="teen-card__label">
                <Search size={13} strokeWidth={3} aria-hidden="true" /> {inWarmup ? 'Aquecimento · ' : ''}Detetive · caso {itemIndex + 1} de {round.items.length}
              </p>
              <p className="or-clues__title">Pistas</p>
              <ul className="and-lines or-clues">
                {item.clues.map((clue) => (
                  <li key={clue.text}>
                    <span className="and-lines__text">{clue.text}</span>
                  </li>
                ))}
              </ul>
              <p className="and-ask">
                V({item.ask}) = <span className={`and-ask__slot ${done ? (item.answer === 'V' ? 'is-v' : item.answer === 'F' ? 'is-f' : 'is-unknown') : ''}`}>{done ? item.answer : '?'}</span>
              </p>
              <div className="statement__dots" aria-hidden="true">
                {round.items.map((other, position) => (
                  <span key={other.id} className={`statement__dot ${position < itemIndex ? 'is-done' : ''} ${position === itemIndex ? 'is-current' : ''}`} />
                ))}
              </div>
            </section>

            <div className="prop-choices" role="group" aria-label={`O que se conclui sobre ${item.ask}`}>
              {DETECTIVE_CHOICES.map((choice) => {
                const isPicked = answer === choice.key;
                const isRight = done && choice.key === item.answer;
                return (
                  <button
                    key={choice.key}
                    type="button"
                    className={`relation-btn prop-choice prop-choice--${choice.key === '?' ? 'N' : choice.key} ${isPicked && !isRight ? 'is-wrong' : ''} ${isRight ? 'is-right' : ''}`}
                    onClick={() => chooseDetective(choice.key)}
                    disabled={done}
                  >
                    <span className="relation-btn__symbol">{choice.label}</span>
                    <span className="relation-btn__label">{choice.caption}</span>
                  </button>
                );
              })}
            </div>
          </>
        )}

        {checkMessage && !solved && (
          <p ref={feedbackRef} className="teen-feedback teen-feedback--error">
            <X size={18} strokeWidth={3} aria-hidden="true" />
            <span>{checkMessage}</span>
          </p>
        )}
        {done && !inWarmup && (
          <p ref={feedbackRef} className={`teen-feedback ${correct ? 'teen-feedback--ok' : 'teen-feedback--error'}`}>
            {correct ? <Check size={18} strokeWidth={3} aria-hidden="true" /> : <X size={18} strokeWidth={3} aria-hidden="true" />}
            <span>
              {isBuild
                ? buildDoneText()
                : `${correct ? '' : `Você marcou “${DETECTIVE_CHOICES.find((choice) => choice.key === answer).caption}”. O certo: ${item.ask} ${DETECTIVE_VERDICT[item.answer]}. `}${item.why}`}
            </span>
          </p>
        )}
        {done && inWarmup && <span ref={feedbackRef} />}

        {hintOpen && !done && (
          <div className="teen-hint" role="note">
            <Mascot mood="encourage" size={48} />
            <p>{item.hint}</p>
          </div>
        )}

        {/* A barra fica sempre na tela (só some de vista) para o conteúdo não sair do meio. */}
        <div className={`teen-actions ${autoNext ? 'is-waiting' : ''}`} aria-hidden={autoNext}>
          {done && !autoNext ? (
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
              {isBuild && !autoNext && (
                <GameButton variant="lilac" icon={Check} onClick={checkBuild} sound={null} disabled={!filled}>
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
