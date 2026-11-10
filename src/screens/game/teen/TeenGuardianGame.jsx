import { useEffect, useMemo, useRef, useState } from 'react';
import { Check, X, Lightbulb, ArrowRight, BookOpen } from 'lucide-react';
import TopBar from '../../../components/ui/TopBar.jsx';
import Mascot from '../../../components/mascot/Mascot.jsx';
import MascotDialogue from '../../../components/mascot/MascotDialogue.jsx';
import GameButton from '../../../components/ui/GameButton.jsx';
import GuardianScene from '../../../components/scenery/GuardianScene.jsx';
import { getDifficulty } from '../../../config/ageGroups.js';
import { generateBossRounds, bossWarmup } from '../../../data/teen/bossRounds.js';
import { starsFromErrors } from '../../../logic/scoring.js';
import { useGame } from '../../../state/GameContext.jsx';
import { sfx } from '../../../audio/sfx.js';
import '../GuardianQuizGame.css';
import './teen.css';

const STIR_MS = 900;

/**
 * Desafio final da Floresta (13+): cinco desafios de revisão, um por pedra mágica do Guardião.
 * Cada acerto acende uma pedra e devolve um pouco das cores; com as cinco acesas, o Guardião acorda.
 * Antes há um aquecimento sobre os símbolos, que não vale estrelas.
 */
export default function TeenGuardianGame({ challenge, level, onExit, onComplete }) {
  const { profile, completeLevel } = useGame();
  const difficultyId = profile?.difficulty ?? 'easy';
  const difficulty = getDifficulty(difficultyId);
  const { tutorial, symbols } = challenge;

  const rounds = useMemo(() => generateBossRounds(difficultyId), [difficultyId]);
  const warmup = useMemo(() => bossWarmup(), []);
  const [inWarmup, setInWarmup] = useState(Boolean(tutorial));
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState([]);
  const [solved, setSolved] = useState(false);
  const [lit, setLit] = useState(0);
  const [stirring, setStirring] = useState(false);
  const [errors, setErrors] = useState(0);
  const [hintOpen, setHintOpen] = useState(false);
  const [legendOpen, setLegendOpen] = useState(false);
  const feedbackRef = useRef(null);
  const timer = useRef(null);

  const round = inWarmup ? warmup : rounds[index];
  const lastRound = index === rounds.length - 1;
  const awake = lit === rounds.length;

  useEffect(() => () => clearTimeout(timer.current), []);
  useEffect(() => {
    if (solved) feedbackRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [solved]);

  const choose = (option) => {
    if (solved || picked.includes(option.text)) return;
    if (option.correct) {
      sfx.play('correct');
      setSolved(true);
      setHintOpen(false);
      if (!inWarmup) {
        setLit((count) => count + 1);
        setStirring(true);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setStirring(false), STIR_MS);
      }
      return;
    }
    sfx.play('tryAgain');
    setPicked((list) => [...list, option.text]);
    if (!inWarmup) setErrors((count) => count + 1); // o aquecimento não conta
  };

  const goNext = () => {
    sfx.play('tap');
    setPicked([]);
    setSolved(false);
    setHintOpen(false);
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

  const nextLabel = inWarmup ? 'Começar os desafios' : lastRound ? 'Concluir fase' : 'Próximo desafio';

  return (
    <div className="screen game-screen teen-screen guardian-screen teen-boss" style={{ '--restore': lit / rounds.length }}>
      <GuardianScene lit={lit} total={rounds.length} stirring={stirring} />
      <TopBar onBack={onExit} backLabel="Voltar ao mapa" title={level.name} />

      <div className="teen-boss__main">
        <div className="teen-layout">
          <div className="teen-meta">
            <span className={`teen-badge teen-badge--${difficultyId}`}>{difficulty?.label}</span>
            <span className="teen-progress">{inWarmup ? 'Aquecimento' : `Desafio ${index + 1} de ${rounds.length}`}</span>
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

          {/* pedras mágicas: no celular ficam no topo; no tablet e no computador, na base da árvore */}
          <div className="rune-bar teen-boss__runes" aria-label={`Pedras mágicas: ${lit} de ${rounds.length} acesas`}>
            {rounds.map((item, position) => (
              <div key={item.id} className={`rune ${position < lit ? 'is-on' : ''} ${!inWarmup && position === index && position >= lit ? 'is-current' : ''}`}>
                <span className="rune__stone" aria-hidden="true">{item.symbol}</span>
                <span className="rune__label">{item.concept}</span>
              </div>
            ))}
          </div>

          {inWarmup && (
            <MascotDialogue
              line={solved ? tutorial.done : tutorial.start}
              bubbleKey={solved ? 'done' : 'start'}
              mood={solved ? 'cheer' : 'curious'}
              mascotSize={60}
              layout="compact"
              className="decoder-talk"
            />
          )}

          <section key={round.id} className="teen-card teen-boss__card" aria-label={round.concept}>
            <p className="teen-card__label">
              {inWarmup ? 'Aquecimento · os símbolos' : `Pedra ${round.symbol} · ${round.concept}`}
            </p>
            {round.lines.length > 0 && (
              <div className="teen-boss__lines">
                {round.lines.map((line) => (
                  <p key={line} className={/[=∈∩∪|]/.test(line) ? 'teen-card__notation' : 'teen-card__reading'}>
                    {line}
                  </p>
                ))}
              </div>
            )}
            <p className="teen-card__words teen-boss__prompt">{round.prompt}</p>
            <div className="inter-options" role="group" aria-label="Escolha a resposta">
              {round.options.map((option) => {
                const isWrong = picked.includes(option.text);
                const isRight = solved && option.correct;
                return (
                  <button
                    key={option.text}
                    type="button"
                    className={`inter-option ${isWrong ? 'is-wrong' : ''} ${isRight ? 'is-right' : ''}`}
                    onClick={() => choose(option)}
                    disabled={solved || isWrong}
                  >
                    {option.text}
                  </button>
                );
              })}
            </div>
          </section>

          {solved && (
            <p ref={feedbackRef} className="teen-feedback teen-feedback--ok">
              <Check size={18} strokeWidth={3} aria-hidden="true" />
              <span>
                {round.explain}
                {awake && <strong> Todas as pedras estão acesas: o Guardião acordou!</strong>}
              </span>
            </p>
          )}

          {hintOpen && !solved && (
            <div className="teen-hint" role="note">
              <Mascot mood="encourage" size={48} />
              <p>{round.hint}</p>
            </div>
          )}

          {(solved || !hintOpen) && (
            <div className="teen-actions">
              {solved ? (
                <GameButton variant="green" iconRight={ArrowRight} onClick={goNext} sound={null}>
                  {nextLabel}
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
    </div>
  );
}
