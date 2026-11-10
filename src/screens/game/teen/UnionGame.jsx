import { useEffect, useMemo, useRef, useState } from 'react';
import { Check, X, Lightbulb, ArrowRight, BookOpen, RotateCcw } from 'lucide-react';
import TopBar from '../../../components/ui/TopBar.jsx';
import Mascot from '../../../components/mascot/Mascot.jsx';
import MascotDialogue from '../../../components/mascot/MascotDialogue.jsx';
import GameButton from '../../../components/ui/GameButton.jsx';
import { getLevelScene } from '../../../components/scenery/scenes.js';
import { getDifficulty } from '../../../config/ageGroups.js';
import { generateUnionRounds, unionWarmup, formatList } from '../../../data/teen/unionRounds.js';
import { starsFromErrors, HELP_BY_DIFFICULTY } from '../../../logic/scoring.js';
import { useGame } from '../../../state/GameContext.jsx';
import { sfx } from '../../../audio/sfx.js';
import { VENN_PATHS } from './venn.js';
import './teen.css';

const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;

/** Diagrama de Venn com as quantidades de cada região (resposta dos problemas). */
function CountVenn({ counts, names }) {
  const regions = [
    ['a', counts.a - counts.both, 100],
    ['both', counts.both, 200],
    ['b', counts.b - counts.both, 300],
  ];
  return (
    <svg className="count-venn" viewBox="0 30 400 240" role="img" aria-label={`Só ${names[0]}: ${counts.a - counts.both}. Os dois: ${counts.both}. Só ${names[1]}: ${counts.b - counts.both}.`}>
      {regions.map(([id]) => (
        <path key={id} className={`count-venn__region count-venn__region--${id}`} d={VENN_PATHS[id]} />
      ))}
      <circle className="venn-outline" cx="150" cy="150" r="100" />
      <circle className="venn-outline" cx="250" cy="150" r="100" />
      <text className="venn-name" x="62" y="72">{names[0]}</text>
      <text className="venn-name" x="338" y="72">{names[1]}</text>
      {regions.map(([id, value, x]) => (
        <text key={id} className="count-venn__value" x={x} y="160">
          {value}
        </text>
      ))}
    </svg>
  );
}

/** Pergunta de múltipla escolha com números (n(A ∪ B) ou a resposta de um problema). */
function NumberChoices({ options, picked, solvedValue, onPick, prefix }) {
  return (
    <div className="union-options" role="group" aria-label="Escolha a resposta">
      {options.map((value) => {
        const isWrong = picked.includes(value);
        const isRight = solvedValue === value;
        return (
          <button
            key={value}
            type="button"
            className={`union-option ${isWrong ? 'is-wrong' : ''} ${isRight ? 'is-right' : ''}`}
            onClick={() => onPick(value)}
            disabled={solvedValue !== null || isWrong}
          >
            {prefix}
            {value}
          </button>
        );
      })}
    </div>
  );
}

/**
 * União (13+): primeiro o jogador junta as fichas de A e de B na caixa A ∪ B (um elemento repetido
 * entra uma vez só) e diz n(A ∪ B). No médio e no difícil também há problemas com quantidades,
 * resolvidos com n(A ∪ B) = n(A) + n(B) − n(A ∩ B).
 * Antes das questões há um aquecimento guiado que não vale estrelas.
 */
export default function UnionGame({ challenge, level, onExit, onComplete }) {
  const { profile, completeLevel } = useGame();
  const difficultyId = profile?.difficulty ?? 'easy';
  const difficulty = getDifficulty(difficultyId);
  const Scene = getLevelScene(challenge.scene);
  const { tutorial, symbols } = challenge;

  const rounds = useMemo(() => generateUnionRounds(difficultyId, challenge.rounds), [difficultyId, challenge.rounds]);
  const warmup = useMemo(() => unionWarmup(), []);
  const [inWarmup, setInWarmup] = useState(Boolean(tutorial));
  const [index, setIndex] = useState(0);
  const round = inWarmup ? warmup : rounds[index];
  const [stage, setStage] = useState(round.kind === 'build' ? 'build' : 'problem'); // build | count | problem | done
  const [taken, setTaken] = useState([]); // fichas tocadas, como 'A-3' e 'B-3'
  const [dupNote, setDupNote] = useState(null);
  const [missing, setMissing] = useState(null); // null | number[]
  const [picked, setPicked] = useState([]);
  const [errors, setErrors] = useState(0);
  const [hintOpen, setHintOpen] = useState(false);
  const [legendOpen, setLegendOpen] = useState(false);
  const feedbackRef = useRef(null);

  const help = inWarmup ? HELP_BY_DIFFICULTY.easy : HELP_BY_DIFFICULTY[difficultyId];
  const lastRound = index === rounds.length - 1;
  const showWords = inWarmup || difficultyId !== 'hard';
  const isBuild = round.kind === 'build';
  const done = stage === 'done';
  const box = [...new Set(taken.map((key) => Number(key.split('-')[1])))];

  useEffect(() => {
    if (missing || stage === 'count' || done) feedbackRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [missing, stage, done]);

  const startRound = (next) => {
    setStage(next.kind === 'build' ? 'build' : 'problem');
    setTaken([]);
    setDupNote(null);
    setMissing(null);
    setPicked([]);
    setHintOpen(false);
  };

  const addChip = (row, n) => {
    const key = `${row}-${n}`;
    if (stage !== 'build' || taken.includes(key)) return;
    setTaken((list) => [...list, key]);
    if (box.includes(n)) {
      // Já veio do outro conjunto: não entra de novo. É o momento de aprender que a união não repete.
      sfx.play('pick');
      setDupNote(n);
      return;
    }
    sfx.play('tap');
    setMissing((list) => (list ? list.filter((x) => x !== n) : list));
  };

  // Tirar um número da caixa devolve as fichas dele nas duas linhas.
  const removeChip = (n) => {
    if (stage !== 'build') return;
    sfx.play('tap');
    setTaken((list) => list.filter((key) => Number(key.split('-')[1]) !== n));
    if (dupNote === n) setDupNote(null);
  };

  const restart = () => {
    sfx.play('tap');
    setTaken([]);
    setDupNote(null);
    setMissing(null);
  };

  const verify = () => {
    const left = round.union.filter((n) => !box.includes(n));
    if (!left.length) {
      sfx.play('correct');
      setMissing(null);
      setDupNote(null);
      setHintOpen(false);
      setStage('count');
      return;
    }
    sfx.play('tryAgain');
    setMissing(left);
    if (!inWarmup) setErrors((count) => count + 1); // o aquecimento não conta
  };

  const answerNumber = (value) => {
    const answer = isBuild ? round.count.answer : round.answer;
    if (value === answer) {
      sfx.play('correct');
      setHintOpen(false);
      setStage('done');
      return;
    }
    sfx.play('tryAgain');
    setPicked((list) => [...list, value]);
    if (!inWarmup) setErrors((count) => count + 1);
  };

  const goNext = () => {
    sfx.play('tap');
    if (inWarmup) {
      setInWarmup(false);
      startRound(rounds[0]);
      return;
    }
    if (lastRound) {
      const stars = starsFromErrors(errors);
      completeLevel(level.id, stars);
      onComplete(stars);
      return;
    }
    setIndex(index + 1);
    startRound(rounds[index + 1]);
  };

  // Fala do Pipo no aquecimento, conforme o momento.
  const warmLine = () => {
    if (done) return tutorial.done;
    if (stage === 'count') return tutorial.count;
    if (dupNote !== null) return tutorial.dup;
    return tutorial.start;
  };

  const chipRow = (set, name) => (
    <div className={`union-row union-row--${name.toLowerCase()}`}>
      <span className="union-row__name">{name}</span>
      <div className="union-row__chips">
        {set.list.map((n) => {
          const used = taken.includes(`${name}-${n}`);
          const highlight = missing && missing.includes(n) && help.marks === 'all';
          return (
            <button
              key={n}
              type="button"
              className={`union-chip ${used ? 'is-used' : ''} ${highlight ? 'is-missing' : ''}`}
              onClick={() => addChip(name, n)}
              disabled={stage !== 'build' || used}
              aria-label={used ? `${n}: já foi para A ∪ B` : `Colocar ${n} em A ∪ B`}
            >
              {n}
            </button>
          );
        })}
      </div>
    </div>
  );

  const nextLabel = inWarmup ? 'Começar as questões' : lastRound ? 'Concluir fase' : 'Próxima questão';
  const formula = isBuild
    ? `n(A) + n(B) − n(A ∩ B) = ${round.a.list.length} + ${round.b.list.length} − ${round.intersection.length} = ${round.union.length}`
    : null;

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
            line={warmLine()}
            bubbleKey={warmLine().id}
            mood={done ? 'cheer' : dupNote !== null ? 'happy' : 'curious'}
            mascotSize={60}
            layout="compact"
            className="decoder-talk"
          />
        )}

        {isBuild ? (
          <>
            <section className="teen-card" aria-label="Os conjuntos">
              <p className="teen-card__label">{inWarmup ? 'Aquecimento · junte A e B' : 'Junte A e B'}</p>
              <div className="inter-sets">
                {[round.a, round.b].map((set) => (
                  <div key={set.notation} className="inter-set">
                    <p className="teen-card__notation">{set.notation}</p>
                    {showWords && set.words && <p className="teen-card__reading">{set.words}</p>}
                  </div>
                ))}
              </div>
            </section>

            <section className="union-board" aria-label="Fichas de A e de B">
              {chipRow(round.a, 'A')}
              {chipRow(round.b, 'B')}
              <p className="union-board__tip">
                {stage === 'build' ? 'Toque nas fichas para colocar os números em A ∪ B. Toque em um número da caixa para tirá-lo.' : 'A ∪ B está completo.'}
              </p>
            </section>

            <div className={`teen-answer union-box ${stage !== 'build' ? 'is-complete' : ''}`} aria-live="polite">
              <span className="teen-answer__set">A ∪ B = {'{'}</span>
              <span className="union-box__chips">
                {[...box].sort((x, y) => x - y).map((n) => (
                  <button key={n} type="button" className={`union-box__chip ${dupNote === n ? 'is-bump' : ''}`} onClick={() => removeChip(n)} disabled={stage !== 'build'} aria-label={`Tirar ${n} de A ∪ B`}>
                    {n}
                  </button>
                ))}
              </span>
              <span className="teen-answer__set">{'}'}</span>
            </div>

            {dupNote !== null && stage === 'build' && !inWarmup && (
              <p className="teen-feedback teen-feedback--info">
                O {dupNote} já está em A ∪ B. Na união, cada elemento aparece uma vez só.
              </p>
            )}

            {missing && (
              <p ref={feedbackRef} className="teen-feedback teen-feedback--error">
                <X size={18} strokeWidth={3} aria-hidden="true" />
                {help.marks === 'all'
                  ? 'Ainda faltam números: as fichas contornadas ainda não estão em A ∪ B.'
                  : `Ainda faltam ${plural(missing.length, 'elemento', 'elementos')} em A ∪ B.`}
              </p>
            )}

            {stage !== 'build' && (
              <section ref={feedbackRef} className="teen-card inter-question" aria-label="Quantos elementos">
                <p className="teen-card__label">Conte</p>
                <p className="teen-card__words">Quantos elementos tem A ∪ B?</p>
                <NumberChoices options={round.count.options} picked={picked} solvedValue={done ? round.count.answer : null} onPick={answerNumber} prefix="n(A ∪ B) = " />
                {done && (
                  <p className="teen-feedback teen-feedback--ok union-formula">
                    <Check size={18} strokeWidth={3} aria-hidden="true" />
                    <span>
                      {formula}.{' '}
                      {round.intersection.length === 1
                        ? `O ${round.intersection[0]} está em A e em B, mas conta uma vez só.`
                        : `Os números ${formatList(round.intersection).slice(1, -1)} estão em A e em B, mas contam uma vez só.`}
                    </span>
                  </p>
                )}
              </section>
            )}
          </>
        ) : (
          <section className="teen-card union-problem" aria-label="Problema">
            <p className="teen-card__label">Problema</p>
            <p className="teen-card__words union-problem__text">{round.text}</p>
            <p className="teen-card__reading">{round.sets}</p>
            {(difficultyId !== 'hard' || done) && <p className="teen-card__notation union-problem__notation">{round.notation}</p>}
            <NumberChoices options={round.options} picked={picked} solvedValue={done ? round.answer : null} onPick={answerNumber} prefix="" />
            {done && (
              <div ref={feedbackRef} className="union-solution">
                <CountVenn counts={round.counts} names={round.names} />
                <p className="teen-feedback teen-feedback--ok">
                  <Check size={18} strokeWidth={3} aria-hidden="true" />
                  <span>{round.explain}</span>
                </p>
              </div>
            )}
          </section>
        )}

        {hintOpen && !done && (
          <div className="teen-hint" role="note">
            <Mascot mood="encourage" size={48} />
            <p>
              {stage === 'count'
                ? 'Conte os números que estão na caixa A ∪ B. Repare: somar n(A) + n(B) conta duas vezes quem está nas duas listas.'
                : round.hint}
            </p>
          </div>
        )}

        <div className="teen-actions">
          {done ? (
            <GameButton variant="green" iconRight={ArrowRight} onClick={goNext} sound={null}>
              {nextLabel}
            </GameButton>
          ) : (
            <>
              {stage === 'build' && (
                <GameButton variant="light" size="sm" icon={RotateCcw} onClick={restart} disabled={!box.length}>
                  Recomeçar
                </GameButton>
              )}
              {!hintOpen && (
                <GameButton variant="light" size="sm" icon={Lightbulb} onClick={() => setHintOpen(true)}>
                  Dica
                </GameButton>
              )}
              {stage === 'build' && (
                <GameButton variant="lilac" icon={Check} onClick={verify} sound={null} disabled={!box.length}>
                  Verificar
                </GameButton>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
