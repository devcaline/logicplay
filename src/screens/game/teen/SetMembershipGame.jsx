import { useEffect, useMemo, useRef, useState } from 'react';
import { Check, X, Lightbulb, ArrowRight, BookOpen } from 'lucide-react';
import TopBar from '../../../components/ui/TopBar.jsx';
import Mascot from '../../../components/mascot/Mascot.jsx';
import MascotDialogue from '../../../components/mascot/MascotDialogue.jsx';
import GameButton from '../../../components/ui/GameButton.jsx';
import StarBurst from '../../../components/ui/StarBurst.jsx';
import ProgressTrail from '../../../components/ui/ProgressTrail.jsx';
import { getLevelScene } from '../../../components/scenery/scenes.js';
import { getDifficulty } from '../../../config/ageGroups.js';
import { generateMembershipRounds, membershipWarmup, RELATION_SYMBOLS } from '../../../data/teen/membershipRounds.js';
import { starsFromErrors } from '../../../logic/scoring.js';
import { useGame, useNarration } from '../../../state/GameContext.jsx';
import { sfx } from '../../../audio/sfx.js';
import './teen.css';
import './tween.css';

/**
 * Pertinência (13+): cada conjunto vem com afirmações do tipo "7 _ A" para completar com ∈ ou ∉
 * (no difícil, também "{2, 3} _ A" com ⊂ ou ⊄). Depois de cada resposta aparece o porquê.
 * Antes das questões há um aquecimento guiado que não vale estrelas.
 */
export default function SetMembershipGame({ challenge, level, onExit, onComplete }) {
  const { profile, completeLevel } = useGame();
  const { autoSpeak } = useNarration();
  const difficultyId = profile?.difficulty ?? 'easy';
  const difficulty = getDifficulty(difficultyId);
  const Scene = getLevelScene(challenge.scene);
  const { tutorial, symbols } = challenge;
  const narrate = !challenge.quiet; // fases narradas (9–12) têm o Pipo falando

  // O desafio pode trazer os próprios geradores (faixa 9–12); sem eles, usamos os de 13+.
  const rounds = useMemo(
    () => (challenge.roundsGenerator ?? generateMembershipRounds)(difficultyId, challenge.rounds),
    [challenge, difficultyId],
  );
  const warmup = useMemo(
    () => (challenge.warmupGenerator ?? membershipWarmup)(difficultyId),
    [challenge, difficultyId],
  );
  const [inWarmup, setInWarmup] = useState(Boolean(tutorial));
  const [index, setIndex] = useState(0);
  const [itemIndex, setItemIndex] = useState(0);
  const [answer, setAnswer] = useState(null); // null | true (∈/⊂) | false (∉/⊄)
  const [errors, setErrors] = useState(0);
  const [hintOpen, setHintOpen] = useState(false);
  const [legendOpen, setLegendOpen] = useState(false);
  const [roundPraise, setRoundPraise] = useState(null); // elogio ao fechar um conjunto (fases 9–12)
  const feedbackRef = useRef(null);

  const round = inWarmup ? warmup : rounds[index];
  const item = round.items[itemIndex];
  const symbolsFor = RELATION_SYMBOLS[item.kind];
  const answered = answer !== null;
  const correct = answered && answer === item.belongs;
  const lastItem = itemIndex === round.items.length - 1;
  const lastRound = index === rounds.length - 1;
  const roundDone = answered && correct && lastItem; // fechou o conjunto com tudo certo
  const showList = inWarmup || difficultyId === 'easy';
  const showWords = inWarmup || difficultyId !== 'hard';

  useEffect(() => {
    if (answered) feedbackRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [answered]);

  // Nas fases com voz, a missão é narrada quando as questões de verdade começam
  // (durante o aquecimento, o Pipo conduz com as falas próprias de cada item).
  const missionSpokenRef = useRef(false);
  useEffect(() => {
    if (inWarmup || !narrate || !challenge.mission || missionSpokenRef.current) return;
    missionSpokenRef.current = true;
    autoSpeak(challenge.mission);
  }, [inWarmup, narrate, challenge, autoSpeak]);

  // Nas fases com voz, o porquê da resposta também é dito em voz alta (fora do aquecimento).
  // Fechando o conjunto com tudo certo, o Pipo comemora com um elogio em vez do porquê.
  useEffect(() => {
    if (!answered || !narrate || !item) return;
    if (roundPraise) {
      autoSpeak(roundPraise);
      return;
    }
    autoSpeak({ id: `${item.id}-reason`, text: item.reason });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answered]);

  // Nas fases com voz, a dica pedida também é dita em voz alta.
  useEffect(() => {
    if (hintOpen && narrate && item) autoSpeak({ id: `hint.${item.id}`, text: item.hint });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hintOpen]);

  const choose = (belongs) => {
    if (answered) return;
    setAnswer(belongs);
    if (belongs === item.belongs) {
      sfx.play('correct');
      // Nas fases lúdicas (9–12), fechar o conjunto com tudo certo merece elogio do Pipo.
      const lines = narrate && lastItem && !inWarmup ? challenge.feedback.praise : null;
      if (lines?.length) setRoundPraise(lines[Math.floor(Math.random() * lines.length)]);
      return;
    }
    sfx.play('tryAgain');
    if (!inWarmup) setErrors((count) => count + 1); // o aquecimento não conta
  };

  const goNext = () => {
    sfx.play('tap');
    setAnswer(null);
    setHintOpen(false);
    setRoundPraise(null);
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

  const shownSymbol = answered ? (item.belongs ? symbolsFor.yes : symbolsFor.no) : '?';
  // Na lista, o número perguntado brilha depois da resposta, se estiver dentro da caixa.
  const highlighted = answered && item.kind === 'element' ? item.left : null;

  const nextLabel = () => {
    if (!lastItem) return 'Próxima afirmação';
    if (inWarmup) return 'Começar as questões';
    return lastRound ? 'Concluir fase' : 'Próximo conjunto';
  };

  return (
    <div className={`screen game-screen teen-screen ${narrate ? 'tween-screen' : ''}`}>
      <Scene />
      <TopBar onBack={onExit} backLabel="Voltar ao mapa" title={level.name} />

      <div className="teen-layout">
        <div className="teen-meta">
          <span className={`teen-badge teen-badge--${difficultyId}`}>{difficulty?.label}</span>
          {!inWarmup && narrate ? (
            <ProgressTrail total={rounds.length} done={index + (roundDone ? 1 : 0)} current={index} />
          ) : (
            <span className="teen-progress">{inWarmup ? 'Aquecimento' : `Conjunto ${index + 1} de ${rounds.length}`}</span>
          )}
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

        {!inWarmup && narrate && (
          <MascotDialogue
            line={roundPraise ?? challenge.mission}
            bubbleKey={roundPraise ? roundPraise.id : 'mission'}
            mood={roundPraise ? 'cheer' : 'curious'}
            mascotSize={84}
            layout="compact"
            tone={roundPraise ? 'success' : 'default'}
            className="tween-guide"
          />
        )}

        {inWarmup && (
          <MascotDialogue
            line={answered ? { id: `${item.id}-done`, text: item.reason } : { id: item.id, text: item.talk }}
            bubbleKey={answered ? `${item.id}-done` : item.id}
            mood={answered ? (correct ? 'cheer' : 'encourage') : 'curious'}
            mascotSize={narrate ? 84 : 60}
            layout="compact"
            autoPlay={narrate}
            className="decoder-talk"
          />
        )}

        <section className="teen-card set-box" aria-label={`Conjunto ${round.name}`}>
          <p className="teen-card__label">{inWarmup ? 'Aquecimento · o conjunto' : 'O conjunto'}</p>
          <p className="teen-card__notation">{round.notation}</p>
          {showWords && !showList && <p className="teen-card__reading">{round.words}</p>}
          {showList && (
            <div className="set-box__inside" aria-label={`Elementos de ${round.name}`}>
              <span className="set-box__brace" aria-hidden="true">{'{'}</span>
              {round.list.map((n) => (
                <span key={n} className={`set-chip ${highlighted === String(n) ? 'is-found' : ''}`}>
                  {n}
                </span>
              ))}
              <span className="set-box__brace" aria-hidden="true">{'}'}</span>
            </div>
          )}
        </section>

        <section className="statement" aria-live="polite">
          {roundDone && narrate && <StarBurst />}
          <p className="teen-card__label">
            Complete a afirmação {inWarmup ? '' : `· ${itemIndex + 1} de ${round.items.length}`}
          </p>
          <p className="statement__line">
            <span className="statement__left">{item.left}</span>
            <span className={`statement__slot ${answered ? (correct ? 'is-right' : 'is-fixed') : ''}`}>{shownSymbol}</span>
            <span className="statement__right">{round.name}</span>
          </p>
          <div className="statement__dots" aria-hidden="true">
            {round.items.map((other, position) => (
              <span key={other.id} className={`statement__dot ${position < itemIndex ? 'is-done' : ''} ${position === itemIndex ? 'is-current' : ''}`} />
            ))}
          </div>
        </section>

        {!answered && (
          <div className="relation-choices" role="group" aria-label="Escolha o símbolo">
            {[true, false].map((belongs) => (
              <button key={String(belongs)} type="button" className="relation-btn" onClick={() => choose(belongs)}>
                <span className="relation-btn__symbol">{belongs ? symbolsFor.yes : symbolsFor.no}</span>
                <span className="relation-btn__label">{belongs ? symbolsFor.yesLabel : symbolsFor.noLabel}</span>
              </button>
            ))}
          </div>
        )}

        {answered && (
          <p ref={feedbackRef} className={`teen-feedback ${correct ? 'teen-feedback--ok' : 'teen-feedback--error'}`}>
            {correct ? <Check size={18} strokeWidth={3} aria-hidden="true" /> : <X size={18} strokeWidth={3} aria-hidden="true" />}
            <span>
              <strong>
                {correct ? '' : 'O certo é '}
                {item.left} {item.belongs ? symbolsFor.yes : symbolsFor.no} {round.name}.
              </strong>{' '}
              {!correct && `Você marcou ${answer ? symbolsFor.yes : symbolsFor.no}. `}
              {inWarmup ? (correct ? 'Isso mesmo!' : 'Releia a explicação do Pipo.') : item.reason}
            </span>
          </p>
        )}

        {hintOpen && !answered && (
          <div className="teen-hint" role="note">
            <Mascot mood="encourage" size={48} />
            <p>
              {item.hint} {round.setHint}
            </p>
          </div>
        )}

        {(answered || !hintOpen) && (
          <div className="teen-actions">
            {answered ? (
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
