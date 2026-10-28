import { useEffect, useMemo, useRef, useState } from 'react';
import { Check, Eraser, Lightbulb, ArrowRight, BookOpen, X } from 'lucide-react';
import TopBar from '../../../components/ui/TopBar.jsx';
import Mascot from '../../../components/mascot/Mascot.jsx';
import MascotDialogue from '../../../components/mascot/MascotDialogue.jsx';
import GameButton from '../../../components/ui/GameButton.jsx';
import StarBurst from '../../../components/ui/StarBurst.jsx';
import ProgressTrail from '../../../components/ui/ProgressTrail.jsx';
import { getLevelScene } from '../../../components/scenery/scenes.js';
import { getDifficulty } from '../../../config/ageGroups.js';
import { generateSetRounds, tutorialRound, formatSet } from '../../../data/teen/setRounds.js';
import { compareSets } from '../../../logic/validation.js';
import { starsFromErrors, HELP_BY_DIFFICULTY } from '../../../logic/scoring.js';
import { useGame, useNarration, useSpeakingId } from '../../../state/GameContext.jsx';
import { sfx } from '../../../audio/sfx.js';
import './teen.css';
import './tween.css';

const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;

/** Aquecimento, parte 1: a notação dividida em peças que o Pipo explica. */
function NotationDecoder({ tutorial, narrate = false, onDone }) {
  const speakingId = useSpeakingId();
  const [seen, setSeen] = useState([]);
  const [current, setCurrent] = useState(null);
  const allSeen = seen.length === tutorial.parts.length;
  const part = tutorial.parts.find((item) => item.id === current);
  // A fala usa o `lineId` quando existe (id estável para narração); senão, o id da peça.
  const asLine = (entry) => (entry ? { id: entry.lineId ?? entry.id, text: entry.text } : null);
  const line = asLine(allSeen && !part ? tutorial.reading : part ?? tutorial.start);

  const open = (item) => {
    sfx.play('pick');
    setCurrent(item.id);
    setSeen((list) => (list.includes(item.id) ? list : [...list, item.id]));
  };

  // Lido tudo: a frase completa aparece depois de um instante.
  useEffect(() => {
    if (!allSeen || (narrate && speakingId === line?.id)) return undefined;
    const timer = setTimeout(() => setCurrent(null), 2600);
    return () => clearTimeout(timer);
  }, [allSeen, narrate, speakingId, line?.id]);

  const piece = (id) => {
    const item = tutorial.parts.find((p) => p.id === id);
    return (
      <button
        key={id}
        type="button"
        className={`decoder-piece decoder-piece--${id} ${seen.includes(id) ? 'is-seen' : ''} ${current === id ? 'is-current' : ''}`}
        onClick={() => open(item)}
        aria-label={`${item.label}: toque para ver o que significa`}
      >
        {id === 'braces' ? '{' : item.label}
      </button>
    );
  };

  return (
    <section className="decoder" aria-label="Decifrando a notação">
      <p className="teen-card__label">Aquecimento · decifre a notação</p>
      <div className="decoder-formula">
        {piece('name')}
        {piece('braces')}
        {piece('element')}
        {piece('such')}
        {piece('rule')}
        <button
          type="button"
          className={`decoder-piece decoder-piece--braces ${seen.includes('braces') ? 'is-seen' : ''} ${current === 'braces' ? 'is-current' : ''}`}
          onClick={() => open(tutorial.parts.find((p) => p.id === 'braces'))}
          aria-hidden="true"
          tabIndex={-1}
        >
          {'}'}
        </button>
      </div>
      <p className="decoder-count">
        {seen.length} de {tutorial.parts.length} partes descobertas
      </p>

      <MascotDialogue line={line} bubbleKey={line.id} mood={allSeen ? 'cheer' : 'curious'} mascotSize={narrate ? 88 : 72} layout="compact" autoPlay={narrate} className="decoder-talk" />

      {allSeen && (
        <div className="teen-actions teen-actions--inline">
          <GameButton variant="green" iconRight={ArrowRight} onClick={onDone} sound={null}>
            Montar este conjunto
          </GameButton>
        </div>
      )}
    </section>
  );
}

/**
 * Notação de conjuntos (13+): o conjunto é descrito (em palavras ou por propriedade)
 * e o jogador seleciona os elementos no universo.
 * Antes das questões há um aquecimento guiado (igual em todas as dificuldades) que não vale estrelas.
 */
export default function SetBuilderGame({ challenge, level, onExit, onComplete }) {
  const { profile, completeLevel } = useGame();
  const { autoSpeak } = useNarration();
  const difficultyId = profile?.difficulty ?? 'easy';
  const difficulty = getDifficulty(difficultyId);
  const Scene = getLevelScene(challenge.scene);
  const { tutorial, symbols } = challenge;
  const narrate = !challenge.quiet; // fases narradas (9–12) têm o Pipo falando

  // O desafio pode trazer os próprios geradores (faixa 9–12); sem eles, usamos os de 13+.
  const rounds = useMemo(
    () => (challenge.roundsGenerator ?? generateSetRounds)(difficultyId, challenge.rounds),
    [challenge, difficultyId],
  );
  const warmup = useMemo(() => (challenge.warmupGenerator ?? tutorialRound)(), [challenge]);
  const [stage, setStage] = useState(tutorial ? 'decode' : 'rounds'); // decode | build | rounds
  const [index, setIndex] = useState(0);
  const [chosen, setChosen] = useState([]);
  const [result, setResult] = useState(null); // null | { correct, extra, missing }
  const [errors, setErrors] = useState(0);
  const [roundErrors, setRoundErrors] = useState(0);
  const [hintOpen, setHintOpen] = useState(false);
  const [legendOpen, setLegendOpen] = useState(false);
  const [praise, setPraise] = useState(null); // elogio do Pipo ao acertar uma questão (fases 9–12)
  const feedbackRef = useRef(null);

  const inWarmup = stage === 'build';
  const round = inWarmup ? warmup : rounds[index];
  // No aquecimento a ajuda é sempre completa, em qualquer dificuldade.
  const help = inWarmup ? HELP_BY_DIFFICULTY.easy : HELP_BY_DIFFICULTY[difficultyId];
  const solved = result?.correct;
  const isLast = index === rounds.length - 1;
  const canHint = round?.hint && (help.hint === 'always' || (help.hint === 'after-error' && roundErrors > 0));
  const showWords = inWarmup || difficultyId === 'easy';

  // Depois de verificar, a mensagem fica visível acima da barra de botões.
  useEffect(() => {
    if (result) feedbackRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [result]);

  // Nas fases com voz, a missão é narrada quando as questões de verdade começam
  // (durante o aquecimento, o Pipo conduz com as falas próprias do tutorial).
  const missionSpokenRef = useRef(false);
  useEffect(() => {
    if (stage !== 'rounds' || !narrate || !challenge.mission || missionSpokenRef.current) return;
    missionSpokenRef.current = true;
    autoSpeak(challenge.mission);
  }, [stage, narrate, challenge, autoSpeak]);

  // Nas fases com voz, a dica pedida também é dita em voz alta.
  useEffect(() => {
    if (hintOpen && narrate && round?.hint) autoSpeak({ id: round.hintId ?? `hint.${round.id}`, text: round.hint });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hintOpen]);

  const resetRound = () => {
    setChosen([]);
    setResult(null);
    setRoundErrors(0);
    setHintOpen(false);
    setPraise(null);
  };

  const toggle = (n) => {
    if (solved) return;
    sfx.play('tap');
    setChosen((current) => (current.includes(n) ? current.filter((x) => x !== n) : [...current, n]));
    setResult((current) => (current && !current.correct ? null : current));
  };

  const verify = () => {
    if (solved) return;
    const next = compareSets(round.elements, chosen);
    setResult(next);
    if (next.correct) {
      sfx.play('correct');
      // Nas fases lúdicas (9–12), cada acerto é celebrado com um elogio do Pipo.
      const lines = narrate ? challenge.feedback.praise : null;
      if (lines?.length) {
        const line = lines[Math.floor(Math.random() * lines.length)];
        setPraise(line);
        autoSpeak(line);
      }
      return;
    }
    sfx.play('tryAgain');
    setRoundErrors((count) => count + 1);
    if (!inWarmup) setErrors((count) => count + 1); // o aquecimento não conta
  };

  const goNext = () => {
    sfx.play('tap');
    if (inWarmup) {
      setStage('rounds');
      resetRound();
      return;
    }
    if (isLast) {
      const stars = starsFromErrors(errors);
      completeLevel(level.id, stars);
      onComplete(stars);
      return;
    }
    setIndex(index + 1);
    resetRound();
  };

  // Marcação dos números depois de um erro, conforme a ajuda disponível.
  const markOf = (n) => {
    if (!result || result.correct) return '';
    if (help.marks !== 'count' && result.extra.includes(n)) return 'is-extra';
    if (help.marks === 'all' && result.missing.includes(n)) return 'is-missing';
    return '';
  };

  const errorText = () => {
    const { extra, missing } = result;
    if (help.marks === 'count') {
      const parts = [];
      if (extra.length) parts.push(plural(extra.length, 'elemento a mais', 'elementos a mais'));
      if (missing.length) parts.push(plural(missing.length, 'elemento faltando', 'elementos faltando'));
      return `Ainda não: ${parts.join(' e ')}.`;
    }
    if (help.marks === 'extra') {
      return extra.length
        ? `Os números em vermelho não pertencem a A.${missing.length ? ' Ainda faltam elementos.' : ''}`
        : 'Ainda faltam elementos em A.';
    }
    return 'Em vermelho: não pertencem a A. Contornados: faltam em A.';
  };

  return (
    <div className={`screen game-screen teen-screen ${narrate ? 'tween-screen' : ''}`}>
      <Scene />
      <TopBar onBack={onExit} backLabel="Voltar ao mapa" title={level.name} />

      <div className="teen-layout">
        <div className="teen-meta">
          <span className={`teen-badge teen-badge--${difficultyId}`}>{difficulty?.label}</span>
          {stage === 'rounds' && narrate ? (
            <ProgressTrail total={rounds.length} done={index + (solved ? 1 : 0)} current={index} />
          ) : (
            <span className="teen-progress">{stage === 'rounds' ? `Questão ${index + 1} de ${rounds.length}` : 'Aquecimento'}</span>
          )}
          {symbols && (
            <button type="button" className="teen-legend-btn" onClick={() => setLegendOpen((open) => !open)} aria-expanded={legendOpen}>
              <BookOpen size={16} strokeWidth={2.6} aria-hidden="true" /> Símbolos
            </button>
          )}
          {stage === 'rounds' && (
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

        {stage === 'decode' ? (
          <NotationDecoder tutorial={tutorial} narrate={narrate} onDone={() => { sfx.play('tap'); setStage('build'); }} />
        ) : (
          <>
            {!inWarmup && narrate && (
              <MascotDialogue
                line={praise ?? challenge.mission}
                bubbleKey={praise ? praise.id : 'mission'}
                mood={praise ? 'cheer' : 'curious'}
                mascotSize={84}
                layout="compact"
                tone={praise ? 'success' : 'default'}
                className="tween-guide"
              />
            )}

            {inWarmup && (
              <MascotDialogue
                line={solved ? tutorial.done : tutorial.build}
                bubbleKey={solved ? 'done' : 'build'}
                mood={solved ? 'cheer' : 'happy'}
                mascotSize={narrate ? 84 : 60}
                layout="compact"
                autoPlay={narrate}
                className="decoder-talk"
              />
            )}

            <section className="teen-card" aria-labelledby="teen-task">
              <p id="teen-task" className="teen-card__label">
                {inWarmup ? 'Aquecimento · monte o conjunto' : 'Monte o conjunto'}
              </p>
              {showWords && !inWarmup ? (
                <>
                  <p className="teen-card__words">{round.words}</p>
                  <p className="teen-card__notation teen-card__notation--small">{round.notation}</p>
                </>
              ) : (
                <>
                  <p className="teen-card__notation">{round.notation}</p>
                  {(inWarmup || difficultyId === 'medium') && <p className="teen-card__reading">{round.words}</p>}
                </>
              )}
              <p className="teen-card__universe">
                Universo: U = {'{'}
                {round.universe[0]}, …, {round.universe[round.universe.length - 1]}
                {'}'}
              </p>
            </section>

            <div className={`number-grid number-grid--${round.universe.length > 20 ? 'large' : 'small'}`} role="group" aria-label="Universo">
              {round.universe.map((n) => {
                const selected = chosen.includes(n);
                return (
                  <button
                    key={n}
                    type="button"
                    className={`number-cell ${selected ? 'is-selected' : ''} ${markOf(n)} ${solved && round.elements.includes(n) ? 'is-right' : ''}`}
                    aria-pressed={selected}
                    onClick={() => toggle(n)}
                    disabled={solved}
                  >
                    {n}
                  </button>
                );
              })}
            </div>

            <div className="teen-answer" aria-live="polite">
              {solved && narrate && <StarBurst />}
              <span className="teen-answer__set">A = {formatSet(chosen)}</span>
              <span className="teen-answer__count">n(A) = {chosen.length}</span>
            </div>

            {result && !result.correct && (
              <p ref={feedbackRef} className="teen-feedback teen-feedback--error">
                {errorText()}
              </p>
            )}
            {solved && (
              <p ref={feedbackRef} className="teen-feedback teen-feedback--ok">
                <Check size={18} strokeWidth={3} aria-hidden="true" /> Correto: A = {formatSet(round.elements)} e n(A) = {round.elements.length}.
              </p>
            )}

            {hintOpen && canHint && (
              <div className="teen-hint" role="note">
                <Mascot mood="encourage" size={48} />
                <p>{round.hint}</p>
              </div>
            )}

            <div className="teen-actions">
              {solved ? (
                <GameButton variant="green" iconRight={ArrowRight} onClick={goNext} sound={null}>
                  {inWarmup ? 'Começar as questões' : isLast ? 'Concluir fase' : 'Próxima questão'}
                </GameButton>
              ) : (
                <>
                  <GameButton variant="light" size="sm" icon={Eraser} onClick={() => { setChosen([]); setResult(null); }} disabled={!chosen.length}>
                    Limpar
                  </GameButton>
                  {canHint && !hintOpen && (
                    <GameButton variant="light" size="sm" icon={Lightbulb} onClick={() => setHintOpen(true)}>
                      Dica
                    </GameButton>
                  )}
                  <GameButton variant="lilac" icon={Check} onClick={verify} sound={null} disabled={!chosen.length}>
                    Verificar
                  </GameButton>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
