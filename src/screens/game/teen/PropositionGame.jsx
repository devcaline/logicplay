import { useEffect, useMemo, useRef, useState } from 'react';
import { Check, X, Lightbulb, ArrowRight, BookOpen } from 'lucide-react';
import TopBar from '../../../components/ui/TopBar.jsx';
import Mascot from '../../../components/mascot/Mascot.jsx';
import MascotDialogue from '../../../components/mascot/MascotDialogue.jsx';
import GameButton from '../../../components/ui/GameButton.jsx';
import { getLevelScene } from '../../../components/scenery/scenes.js';
import { getDifficulty } from '../../../config/ageGroups.js';
import { generatePropositionRounds, propositionWarmup } from '../../../data/teen/propositionRounds.js';
import { starsFromErrors } from '../../../logic/scoring.js';
import { useGame } from '../../../state/GameContext.jsx';
import { sfx } from '../../../audio/sfx.js';
import './teen.css';

const AUTO_NEXT_MS = 1500;

const CHOICES = [
  { key: 'V', label: 'V', caption: 'proposição verdadeira' },
  { key: 'F', label: 'F', caption: 'proposição falsa' },
  { key: 'N', label: '—', caption: 'não é proposição' },
];
const VERDICT = { V: 'Proposição verdadeira: V', F: 'Proposição falsa: F', N: 'Não é proposição' };

/**
 * Proposições (13+): cada frase é V, F ou não é proposição (pergunta, ordem, exclamação,
 * sentença aberta, paradoxo). Uma frase por vez, com o porquê depois de cada resposta.
 * Antes das questões há um aquecimento guiado que não vale estrelas.
 */
export default function PropositionGame({ challenge, level, onExit, onComplete }) {
  const { profile, completeLevel } = useGame();
  const difficultyId = profile?.difficulty ?? 'easy';
  const difficulty = getDifficulty(difficultyId);
  const Scene = getLevelScene(challenge.scene);
  const { symbols } = challenge;

  const rounds = useMemo(() => generatePropositionRounds(difficultyId, challenge.rounds), [difficultyId, challenge.rounds]);
  const warmup = useMemo(() => propositionWarmup(), []);
  const [inWarmup, setInWarmup] = useState(true);
  const [index, setIndex] = useState(0);
  const [itemIndex, setItemIndex] = useState(0);
  const [answer, setAnswer] = useState(null);
  const [errors, setErrors] = useState(0);
  const [hintOpen, setHintOpen] = useState(false);
  const [legendOpen, setLegendOpen] = useState(false);
  const feedbackRef = useRef(null);

  const round = inWarmup ? warmup : rounds[index];
  const item = round.items[itemIndex];
  const answered = answer !== null;
  const correct = answered && answer === item.answer;
  const lastItem = itemIndex === round.items.length - 1;
  const lastRound = index === rounds.length - 1;

  useEffect(() => {
    if (answered) feedbackRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [answered]);

  // Acertou e ainda há frases na questão: mostra a confirmação e passa sozinho para a próxima.
  const autoNext = correct && !lastItem;
  useEffect(() => {
    if (!autoNext) return undefined;
    const timer = setTimeout(() => {
      setAnswer(null);
      setHintOpen(false);
      setItemIndex((current) => current + 1);
    }, AUTO_NEXT_MS);
    return () => clearTimeout(timer);
  }, [autoNext, itemIndex]);

  const choose = (key) => {
    if (answered) return;
    setAnswer(key);
    setHintOpen(false);
    if (key === item.answer) {
      sfx.play('correct');
      return;
    }
    sfx.play('tryAgain');
    if (!inWarmup) setErrors((count) => count + 1); // o aquecimento não conta
  };

  const goNext = () => {
    sfx.play('tap');
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
    if (!lastItem) return 'Próxima frase';
    if (inWarmup) return 'Começar as questões';
    return lastRound ? 'Concluir fase' : 'Próxima questão';
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
          <MascotDialogue
            line={{ id: `${challenge.id}.${item.id}${answered ? (correct ? '.ok' : '.retry') : ''}`, text: answered ? `${correct ? 'Isso!' : 'Quase.'} ${item.why}` : item.talk }}
            bubbleKey={`${item.id}${answered ? '-done' : ''}`}
            mood={answered ? (correct ? 'cheer' : 'encourage') : 'curious'}
            mascotSize={60}
            layout="compact"
            className="decoder-talk"
          />
        )}

        <section className="statement prop-statement" aria-live="polite">
          <p className="teen-card__label">
            {inWarmup ? 'Aquecimento · ' : ''}Frase {itemIndex + 1} de {round.items.length}
          </p>
          <p className="prop-statement__text">{item.text}</p>
          <div className="statement__dots" aria-hidden="true">
            {round.items.map((other, position) => (
              <span key={other.id} className={`statement__dot ${position < itemIndex ? 'is-done' : ''} ${position === itemIndex ? 'is-current' : ''}`} />
            ))}
          </div>
        </section>

        <div className="prop-choices" role="group" aria-label="Classifique a frase">
          {CHOICES.map((choice) => {
            const isPicked = answer === choice.key;
            const isRight = answered && choice.key === item.answer;
            return (
              <button
                key={choice.key}
                type="button"
                className={`relation-btn prop-choice prop-choice--${choice.key} ${isPicked && !isRight ? 'is-wrong' : ''} ${isRight ? 'is-right' : ''}`}
                onClick={() => choose(choice.key)}
                disabled={answered}
              >
                <span className="relation-btn__symbol">{choice.label}</span>
                <span className="relation-btn__label">{choice.caption}</span>
              </button>
            );
          })}
        </div>

        {answered && !inWarmup && (
          <p ref={feedbackRef} className={`teen-feedback ${correct ? 'teen-feedback--ok' : 'teen-feedback--error'}`}>
            {correct ? <Check size={18} strokeWidth={3} aria-hidden="true" /> : <X size={18} strokeWidth={3} aria-hidden="true" />}
            <span>
              {!correct && `Você marcou “${CHOICES.find((choice) => choice.key === answer).caption}”. O certo é: `}
              <strong>{VERDICT[item.answer]}.</strong> {item.why}
            </span>
          </p>
        )}
        {answered && inWarmup && <span ref={feedbackRef} />}

        {hintOpen && !answered && (
          <div className="teen-hint" role="note">
            <Mascot mood="encourage" size={48} />
            <p>{item.hint}</p>
          </div>
        )}

        {/* A barra fica sempre na tela (só some de vista) para o conteúdo não sair do meio. */}
        <div className={`teen-actions ${autoNext || (!answered && hintOpen) ? 'is-waiting' : ''}`} aria-hidden={autoNext || (!answered && hintOpen)}>
          {answered && !autoNext ? (
            <GameButton variant="green" iconRight={ArrowRight} onClick={goNext} sound={null}>
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
