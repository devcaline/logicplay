import { useEffect, useMemo, useRef, useState } from 'react';
import { Check, X, Lightbulb, ArrowRight, BookOpen } from 'lucide-react';
import TopBar from '../../../components/ui/TopBar.jsx';
import Mascot from '../../../components/mascot/Mascot.jsx';
import MascotDialogue from '../../../components/mascot/MascotDialogue.jsx';
import GameButton from '../../../components/ui/GameButton.jsx';
import { getLevelScene } from '../../../components/scenery/scenes.js';
import { getDifficulty } from '../../../config/ageGroups.js';
import { generateNotRounds, notWarmup } from '../../../data/teen/notRounds.js';
import { starsFromErrors } from '../../../logic/scoring.js';
import { useGame, useSpeakingId } from '../../../state/GameContext.jsx';
import { sfx } from '../../../audio/sfx.js';
import './teen.css';

const WRONG_FLASH_MS = 900;
const AUTO_NEXT_MS = 1500;
/** Quando sobra a carta armadilha, a explicação é maior: um pouco mais de tempo para ler. */
const AUTO_NEXT_TRAP_MS = 3000;

/**
 * A negação (13+), com duas dinâmicas diferentes das fases 2 e 3:
 * Pares (ligar cada frase à sua negação) e Negação certa (escolher, entre frases parecidas,
 * a negação correta: o contrário de ">" é "≤", o de "todo" é "existe um que não", De Morgan...).
 */
export default function NotGame({ challenge, level, onExit, onComplete }) {
  const { profile, completeLevel } = useGame();
  const speakingId = useSpeakingId();
  const difficultyId = profile?.difficulty ?? 'easy';
  const difficulty = getDifficulty(difficultyId);
  const Scene = getLevelScene(challenge.scene);
  const { symbols } = challenge;

  const rounds = useMemo(() => generateNotRounds(difficultyId), [difficultyId]);
  const warmup = useMemo(() => notWarmup(), []);
  const [inWarmup, setInWarmup] = useState(true);
  const [index, setIndex] = useState(0);
  const [itemIndex, setItemIndex] = useState(0);
  const [picked, setPicked] = useState(null); // choose: índice da opção
  const [selLeft, setSelLeft] = useState(null); // match
  const [selRight, setSelRight] = useState(null);
  const [matched, setMatched] = useState([]); // ids dos pares já ligados, na ordem
  const [wrongPair, setWrongPair] = useState(null);
  const [checkMessage, setCheckMessage] = useState(null);
  const [errors, setErrors] = useState(0);
  const [hintOpen, setHintOpen] = useState(false);
  const [legendOpen, setLegendOpen] = useState(false);
  const feedbackRef = useRef(null);
  const timer = useRef(null);

  const round = inWarmup ? warmup : rounds[index];
  const item = round.items[itemIndex];
  const isMatch = item.kind === 'match';
  const rightOrder = useMemo(() => (isMatch ? [...item.pairs, ...(item.extra ? [item.extra] : [])].sort(() => Math.random() - 0.5) : []), [item, isMatch]);
  const done = isMatch ? matched.length === item.pairs.length : picked !== null;
  const correct = isMatch ? done : picked !== null && item.options[picked].correct;
  const lastItem = itemIndex === round.items.length - 1;
  const lastRound = index === rounds.length - 1;

  useEffect(() => () => clearTimeout(timer.current), []);
  useEffect(() => {
    if (done || checkMessage) feedbackRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [done, checkMessage]);

  const addError = () => {
    if (!inWarmup) setErrors((count) => count + 1); // o aquecimento não conta
  };

  // ---------- Pares ----------
  const tryPair = (left, right) => {
    setSelLeft(null);
    setSelRight(null);
    setHintOpen(false);
    if (left === right) {
      sfx.play('correct');
      setMatched((list) => [...list, left]);
      setCheckMessage(null);
      return;
    }
    sfx.play('tryAgain');
    addError();
    const leftPair = item.pairs.find((pair) => pair.id === left);
    const rightPair = rightOrder.find((pair) => pair.id === right);
    setWrongPair({ left, right });
    setCheckMessage(
      item.extra && right === item.extra.id
        ? `Cuidado: “${rightPair.neg}” é uma armadilha. Ela parece a negação de “${item.extra.of}”, mas não é o contrário exato de nenhuma frase.`
        : `“${rightPair.neg}” não é a negação de “${leftPair.p}”.`,
    );
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setWrongPair(null), WRONG_FLASH_MS);
  };

  const tapLeft = (id) => {
    if (matched.includes(id)) return;
    sfx.play('pick');
    if (selRight) tryPair(id, selRight);
    else setSelLeft(selLeft === id ? null : id);
  };

  const tapRight = (id) => {
    if (matched.includes(id)) return;
    sfx.play('pick');
    if (selLeft) tryPair(selLeft, id);
    else setSelRight(selRight === id ? null : id);
  };

  // ---------- Negação certa ----------
  const choose = (position) => {
    if (picked !== null) return;
    setPicked(position);
    setHintOpen(false);
    if (item.options[position].correct) {
      sfx.play('correct');
      return;
    }
    sfx.play('tryAgain');
    addError();
  };

  const goNext = ({ silent = false } = {}) => {
    if (!silent) sfx.play('tap');
    setPicked(null);
    setSelLeft(null);
    setSelRight(null);
    setMatched([]);
    setWrongPair(null);
    setCheckMessage(null);
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

  // Acertou: mostra a confirmação e passa sozinho para a próxima frase ou questão.
  const autoNext = correct;
  useEffect(() => {
    if (!autoNext || speakingId) return undefined; // espera o Pipo terminar de falar
    const wait = isMatch && item.extra && !inWarmup ? AUTO_NEXT_TRAP_MS : AUTO_NEXT_MS;
    const next = setTimeout(() => goNext({ silent: true }), wait);
    return () => clearTimeout(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speakingId, autoNext, itemIndex, index, inWarmup]);

  const nextLabel = () => {
    if (!lastItem) return 'Próxima frase';
    if (inWarmup) return 'Começar as questões';
    return lastRound ? 'Concluir fase' : 'Próxima questão';
  };

  const pairNumber = (id) => matched.indexOf(id) + 1;
  const pairClass = (id, selected, side) => {
    if (matched.includes(id)) return `is-matched is-pair-${pairNumber(id)}`;
    if (wrongPair && wrongPair[side] === id) return 'is-wrong';
    return selected === id ? 'is-selected' : '';
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
            line={{ id: `${challenge.id}.${item.id}${done ? (correct ? '.ok' : '.retry') : ''}`, text: done ? (correct ? item.done : `Quase. ${item.why}`) : item.talk }}
            bubbleKey={`${item.id}${done ? '-done' : ''}`}
            mood={done ? (correct ? 'cheer' : 'encourage') : 'curious'}
            mascotSize={60}
            layout="compact"
            className="decoder-talk"
          />
        )}

        {isMatch && (
          <section className="statement and-statement" aria-live="polite">
            <p className="teen-card__label">Pares · ligue cada frase à sua negação</p>
            <p className="and-findx__note">Toque numa frase e depois na negação dela.{item.extra ? ' Uma das negações é uma armadilha e sobra no fim.' : ''}</p>
            <div className="not-match">
              <div className="not-match__col">
                <p className="not-match__head">p</p>
                {item.pairs.map((pair) => (
                  <button key={pair.id} type="button" className={`not-card ${pairClass(pair.id, selLeft, 'left')}`} onClick={() => tapLeft(pair.id)} disabled={matched.includes(pair.id)}>
                    {matched.includes(pair.id) && <span className="not-card__num">{pairNumber(pair.id)}</span>}
                    {pair.p}
                  </button>
                ))}
              </div>
              <div className="not-match__col">
                <p className="not-match__head">¬p</p>
                {rightOrder.map((pair) => (
                  <button key={pair.id} type="button" className={`not-card ${pairClass(pair.id, selRight, 'right')} ${done && pair.id === item.extra?.id ? 'is-trap' : ''}`} onClick={() => tapRight(pair.id)} disabled={done || matched.includes(pair.id)}>
                    {done && pair.id === item.extra?.id && <span className="not-card__trap">armadilha</span>}
                    {matched.includes(pair.id) && <span className="not-card__num">{pairNumber(pair.id)}</span>}
                    {pair.neg}
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {!isMatch && (
          <>
            <section className="statement and-statement" aria-live="polite">
              <p className="teen-card__label">
                {inWarmup ? 'Aquecimento · ' : ''}Negação certa · frase {itemIndex + 1} de {round.items.length}
              </p>
              <p className="or-goal">{item.prompt}</p>
              <p className="prop-statement__text">{item.p}</p>
              <div className="statement__dots" aria-hidden="true">
                {round.items.map((other, position) => (
                  <span key={other.id} className={`statement__dot ${position < itemIndex ? 'is-done' : ''} ${position === itemIndex ? 'is-current' : ''}`} />
                ))}
              </div>
            </section>

            <div className="not-options" role="group" aria-label={item.prompt}>
              {item.options.map((option, position) => {
                const isPicked = picked === position;
                const isRight = done && option.correct;
                return (
                  <button key={option.text} type="button" className={`not-option ${isPicked && !isRight ? 'is-wrong' : ''} ${isRight ? 'is-right' : ''}`} onClick={() => choose(position)} disabled={done}>
                    {option.text}
                    {isRight && <Check size={20} strokeWidth={3} aria-hidden="true" />}
                    {isPicked && !isRight && <X size={20} strokeWidth={3} aria-hidden="true" />}
                  </button>
                );
              })}
            </div>
          </>
        )}

        {isMatch && checkMessage && !done && (
          <p ref={feedbackRef} className="teen-feedback teen-feedback--error">
            <X size={18} strokeWidth={3} aria-hidden="true" />
            <span>{checkMessage}</span>
          </p>
        )}
        {done && !inWarmup && (
          <p ref={feedbackRef} className={`teen-feedback ${correct ? 'teen-feedback--ok' : 'teen-feedback--error'}`}>
            {correct ? <Check size={18} strokeWidth={3} aria-hidden="true" /> : <X size={18} strokeWidth={3} aria-hidden="true" />}
            <span>{isMatch ? `Todos os pares certos! Cada negação fala da mesma coisa que p e diz exatamente o contrário.${item.extra ? ` A carta que sobrou, “${item.extra.neg}”, era a armadilha: ela não é o contrário exato de “${item.extra.of}”.` : ''}` : item.why}</span>
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
        <div className={`teen-actions ${autoNext || (!done && hintOpen) ? 'is-waiting' : ''}`} aria-hidden={autoNext || (!done && hintOpen)}>
          {done && !autoNext ? (
            <GameButton variant="green" iconRight={ArrowRight} onClick={() => goNext()} sound={null}>
              {nextLabel()}
            </GameButton>
          ) : (
            <GameButton variant="light" size="sm" icon={Lightbulb} onClick={() => setHintOpen(true)}>
              Dica
            </GameButton>
          )}
        </div>
      </div>
    </div>
  );
}
