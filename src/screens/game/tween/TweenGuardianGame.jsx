import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import TopBar from '../../../components/ui/TopBar.jsx';
import MascotDialogue from '../../../components/mascot/MascotDialogue.jsx';
import GameButton from '../../../components/ui/GameButton.jsx';
import GuardianScene from '../../../components/scenery/GuardianScene.jsx';
import GameFeedback from '../GameFeedback.jsx';
import { generateTweenBoss } from '../../../data/tween/bossBalls.js';
import { COLORS } from '../../../data/tween/colorSets.js';
import { starsFromErrors } from '../../../logic/scoring.js';
import { useGame, useNarration } from '../../../state/GameContext.jsx';
import { sfx } from '../../../audio/sfx.js';
import '../GuardianQuizGame.css';
import '../teen/teen.css';
import './tween.css';

const STIR_MS = 900;

const Ball = ({ item, small = false }) => (
  <span className={`num-ball num-ball--${item.color} ${small ? 'boss-ball--small' : 'boss-ball'}`}>{item.n}</span>
);

/**
 * O Guardião da Floresta para 9 a 12 anos: cinco desafios com bolinhas, um por pedra mágica.
 * Cada acerto acende uma pedra e devolve as cores da floresta; com as cinco acesas, ele acorda.
 */
export default function TweenGuardianGame({ challenge, level, onExit, onComplete }) {
  const { profile, completeLevel } = useGame();
  const { autoSpeak } = useNarration();
  const difficultyId = profile?.difficulty ?? 'easy';
  const { feedback } = challenge;

  const rounds = useMemo(() => generateTweenBoss(difficultyId), [difficultyId]);
  const [index, setIndex] = useState(0);
  const [wrong, setWrong] = useState([]); // opções erradas já tocadas (escolha)
  const [selected, setSelected] = useState([]); // bolinhas marcadas (desafio final)
  const [mistakes, setMistakes] = useState(0); // erros neste desafio
  const [solved, setSolved] = useState(false);
  const [line, setLine] = useState(null);
  const [lineCount, setLineCount] = useState(0);
  const [lit, setLit] = useState(0);
  const [stirring, setStirring] = useState(false);
  const [errors, setErrors] = useState(0);
  const [stars, setStars] = useState(null);
  const timer = useRef(null);
  const cardRef = useRef(null);

  const round = rounds[index];
  const lastRound = index === rounds.length - 1;
  const showVisualHint = mistakes >= challenge.visualHintAfter && !solved;
  const promptLine = useMemo(() => ({ id: `t9.f5.${round.id}`, text: round.prompt }), [round]);

  const say = (next) => {
    setLine(next);
    setLineCount((count) => count + 1);
    autoSpeak(next);
  };

  useEffect(() => {
    say(promptLine);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);
  useEffect(() => () => clearTimeout(timer.current), []);
  useEffect(() => {
    if (solved) cardRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [solved]);

  const succeed = () => {
    sfx.play('correct');
    setSolved(true);
    setLit((count) => count + 1);
    setStirring(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStirring(false), STIR_MS);
    // Acerto: só o som. A explicação aparece escrita no cartão (tem símbolos, que a voz não lê).
    setLine(promptLine);
  };

  const fail = () => {
    sfx.play('tryAgain');
    const count = mistakes + 1;
    setMistakes(count);
    setErrors((total) => total + 1);
    say(count >= challenge.visualHintAfter ? feedback.visualHint : { id: `t9.f5.${round.id}.hint`, text: round.hint });
  };

  const choose = (option) => {
    if (solved || wrong.includes(option.key)) return;
    if (round.answer.includes(option.key)) {
      succeed();
      return;
    }
    setWrong((list) => [...list, option.key]);
    fail();
  };

  const toggleBall = (id) => {
    if (solved) return;
    sfx.play('pick');
    setSelected((list) => (list.includes(id) ? list.filter((item) => item !== id) : [...list, id]));
  };

  const checkPick = () => {
    if (solved) return;
    const right = selected.length === round.answer.length && selected.every((id) => round.answer.includes(id));
    if (right) succeed();
    else fail();
  };

  const goNext = () => {
    sfx.play('tap');
    if (lastRound) {
      const earned = starsFromErrors(errors);
      completeLevel(level.id, earned);
      setStars(earned);
      autoSpeak(feedback.success);
      return;
    }
    setIndex(index + 1);
    setWrong([]);
    setSelected([]);
    setMistakes(0);
    setSolved(false);
  };

  const awake = lit === rounds.length;
  const current = line ?? promptLine;
  const isHint = current.id.includes('.hint') || current.id === feedback.visualHint.id;

  return (
    <div className="screen game-screen teen-screen guardian-screen teen-boss tween-boss" style={{ '--restore': lit / rounds.length }}>
      <GuardianScene lit={lit} total={rounds.length} stirring={stirring} />
      <TopBar onBack={onExit} backLabel="Voltar ao mapa" title={level.name} />

      <div className="teen-boss__main">
        <div className="teen-layout">
          <div className="rune-bar teen-boss__runes" aria-label={`Pedras mágicas: ${lit} de ${rounds.length} acesas`}>
            {rounds.map((item, position) => (
              <div key={item.id} className={`rune ${position < lit ? 'is-on' : ''} ${position === index && position >= lit ? 'is-current' : ''}`}>
                <span className="rune__stone" aria-hidden="true">{item.symbol}</span>
                <span className="rune__label">{item.concept}</span>
              </div>
            ))}
          </div>

          <MascotDialogue
            line={current}
            bubbleKey={`${current.id}-${lineCount}`}
            mood={solved ? 'cheer' : isHint ? 'encourage' : 'curious'}
            mascotSize={72}
            layout="compact"
            tone={solved ? 'success' : isHint ? 'hint' : 'default'}
            className="game-dialogue"
          />

          <section ref={cardRef} key={round.id} className="tween-boss-card" aria-label={round.concept}>
            <p className="tween-boss-card__label">
              <Sparkles size={15} strokeWidth={2.6} aria-hidden="true" /> Desafio {index + 1} de {rounds.length} · {round.concept}
            </p>
            {round.lines.map((text) => (
              <p key={text} className="tween-boss-card__math">{text}</p>
            ))}
            {round.balls && (
              <div className="tween-boss-card__balls" aria-label="Bolinhas">
                {round.balls.map((item) => (
                  <Ball key={item.id} item={item} />
                ))}
              </div>
            )}

            {round.kind === 'choice' ? (
              <div className="tween-boss-options">
                {round.options.map((option) => {
                  const isRight = round.answer.includes(option.key);
                  return (
                    <button
                      key={option.key}
                      type="button"
                      className={`tween-boss-option ${wrong.includes(option.key) ? 'is-wrong' : ''} ${solved && isRight ? 'is-right' : ''} ${showVisualHint && isRight ? 'is-hinted' : ''}`}
                      onClick={() => choose(option)}
                      disabled={solved || wrong.includes(option.key)}
                    >
                      {option.text ?? (
                        <>
                          <span className="tween-boss-option__label">{option.label}</span>
                          <span className="tween-boss-option__balls" aria-hidden="true">
                            {option.balls.map((item) => (
                              <Ball key={item.id} item={item} small />
                            ))}
                          </span>
                        </>
                      )}
                    </button>
                  );
                })}
              </div>
            ) : (
              <>
                <div className="tween-boss-pick" role="group" aria-label="Toque nas bolinhas">
                  {round.options.map((item) => {
                    const isAnswer = round.answer.includes(item.id);
                    return (
                      <button
                        key={item.id}
                        type="button"
                        className={`tween-boss-pick__ball ${selected.includes(item.id) ? 'is-selected' : ''} ${solved && isAnswer ? 'is-right' : ''} ${showVisualHint && isAnswer ? 'is-hinted' : ''}`}
                        aria-pressed={selected.includes(item.id)}
                        aria-label={`${item.n}, ${COLORS[item.color].name}`}
                        onClick={() => toggleBall(item.id)}
                        disabled={solved}
                      >
                        <Ball item={item} />
                        <span className="tween-boss-pick__check" aria-hidden="true">
                          <Check size={16} strokeWidth={3.5} />
                        </span>
                      </button>
                    );
                  })}
                </div>
                {!solved && (
                  <GameButton variant="lilac" size="lg" icon={Check} onClick={checkPick} disabled={!selected.length} sound={null} className="tween-boss-ready">
                    Pronto!
                  </GameButton>
                )}
              </>
            )}

            {solved && (
              <div className="tween-boss-card__done">
                <p className="tween-boss-card__explain">
                  <Check size={18} strokeWidth={3} aria-hidden="true" /> {round.explain}
                </p>
                {awake && <p className="tween-boss-card__awake">Todas as pedras estão acesas: o Guardião acordou!</p>}
                <GameButton variant="green" size="lg" iconRight={ArrowRight} onClick={goNext} sound={null}>
                  {lastRound ? 'Terminar' : 'Próximo desafio'}
                </GameButton>
              </div>
            )}
          </section>
        </div>
      </div>

      {stars !== null && <GameFeedback line={feedback.success} onContinue={() => onComplete(stars)} />}
    </div>
  );
}
