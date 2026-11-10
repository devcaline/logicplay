import { useEffect, useMemo, useRef, useState } from 'react';
import { Check, X, Lightbulb, ArrowRight, BookOpen, RotateCcw } from 'lucide-react';
import TopBar from '../../../components/ui/TopBar.jsx';
import Mascot from '../../../components/mascot/Mascot.jsx';
import MascotDialogue from '../../../components/mascot/MascotDialogue.jsx';
import GameButton from '../../../components/ui/GameButton.jsx';
import { getLevelScene } from '../../../components/scenery/scenes.js';
import { getDifficulty } from '../../../config/ageGroups.js';
import { generateIntersectionRounds, intersectionWarmup, formatList, REGIONS } from '../../../data/teen/intersectionRounds.js';
import { starsFromErrors, HELP_BY_DIFFICULTY } from '../../../logic/scoring.js';
import { useGame } from '../../../state/GameContext.jsx';
import { sfx } from '../../../audio/sfx.js';
import { VENN_PATHS } from './venn.js';
import './teen.css';

const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;
const shuffle = (list) => [...list].sort(() => Math.random() - 0.5);

const PATHS = VENN_PATHS;
const SLOTS_A = [[80, 112], [118, 98], [80, 150], [118, 150], [80, 188], [118, 202], [152, 74], [152, 226]];
const SLOTS = {
  a: SLOTS_A,
  both: [[180, 110], [220, 110], [180, 150], [220, 150], [180, 190], [220, 190]],
  b: SLOTS_A.map(([x, y]) => [400 - x, y]),
  out: [26, 274].flatMap((y) => [40, 80, 120, 160, 200, 240, 280, 320, 360].map((x) => [x, y])),
};

function VennBoard({ round, placements, wrong, solved, current, onPlace, onPickUp }) {
  const byRegion = { a: [], both: [], b: [], out: [] };
  round.universe.forEach((n) => placements[n] && byRegion[placements[n]].push(n));
  const canPlace = current !== undefined && !solved;

  const region = (id, shape) => (
    <g
      key={id}
      className={`venn-region venn-region--${id} ${canPlace ? 'is-target' : ''}`}
      role="button"
      tabIndex={canPlace ? 0 : -1}
      aria-label={`Colocar ${current ?? ''} ${REGIONS[id]}`}
      onClick={() => canPlace && onPlace(id)}
      onKeyDown={(event) => (event.key === 'Enter' || event.key === ' ') && canPlace && onPlace(id)}
    >
      {shape}
    </g>
  );

  return (
    <svg className={`venn-board ${solved ? 'is-solved' : ''}`} viewBox="0 0 400 300" role="group" aria-label="Diagrama de Venn">
      {region('out', <rect x="3" y="3" width="394" height="294" rx="18" />)}
      {region('a', <path d={PATHS.a} />)}
      {region('b', <path d={PATHS.b} />)}
      {region('both', <path d={PATHS.both} />)}
      <circle className="venn-outline" cx="150" cy="150" r="100" />
      <circle className="venn-outline" cx="250" cy="150" r="100" />
      <text className="venn-name" x="62" y="72">A</text>
      <text className="venn-name" x="338" y="72">B</text>
      <text className="venn-name venn-name--u" x="16" y="62">U</text>
      {Object.entries(byRegion).flatMap(([id, numbers]) =>
        numbers.map((n, i) => {
          const [x, y] = SLOTS[id][i];
          return (
            <g
              key={n}
              className={`venn-chip ${wrong.includes(n) ? 'is-wrong' : ''}`}
              transform={`translate(${x} ${y})`}
              role="button"
              aria-label={`${n}, ${REGIONS[id]}. Toque para tirar.`}
              onClick={() => !solved && onPickUp(n)}
            >
              <circle r="15" />
              <text dy="5.5">{n}</text>
            </g>
          );
        }),
      )}
    </svg>
  );
}

/**
 * Interseção (13+): os números do universo vão, um de cada vez, para a região certa do diagrama
 * de Venn. Com o diagrama certo, aparece A ∩ B. No difícil, ainda há uma pergunta sobre a
 * propriedade que descreve A ∩ B. Antes das questões há um aquecimento guiado que não vale estrelas.
 */
export default function IntersectionGame({ challenge, level, onExit, onComplete }) {
  const { profile, completeLevel } = useGame();
  const difficultyId = profile?.difficulty ?? 'easy';
  const difficulty = getDifficulty(difficultyId);
  const Scene = getLevelScene(challenge.scene);
  const { tutorial, symbols } = challenge;

  const rounds = useMemo(() => generateIntersectionRounds(difficultyId, challenge.rounds), [difficultyId, challenge.rounds]);
  const warmup = useMemo(() => intersectionWarmup(), []);
  const [inWarmup, setInWarmup] = useState(Boolean(tutorial));
  const [index, setIndex] = useState(0);
  const round = inWarmup ? warmup : rounds[index];
  const [order, setOrder] = useState(() => shuffle(round.universe));
  const [placements, setPlacements] = useState({});
  const [result, setResult] = useState(null); // null | { correct, wrong: number[] }
  const [stage, setStage] = useState('place'); // place | question | done
  const [picked, setPicked] = useState([]); // opções erradas já tocadas na pergunta final
  const [errors, setErrors] = useState(0);
  const [hintOpen, setHintOpen] = useState(false);
  const [legendOpen, setLegendOpen] = useState(false);
  const feedbackRef = useRef(null);

  const help = inWarmup ? HELP_BY_DIFFICULTY.easy : HELP_BY_DIFFICULTY[difficultyId];
  const current = order.find((n) => !placements[n]);
  const allPlaced = current === undefined;
  const solved = Boolean(result?.correct);
  const wrong = result && !result.correct && help.marks !== 'count' ? result.wrong : [];
  const lastRound = index === rounds.length - 1;
  const showWords = inWarmup || difficultyId !== 'hard';

  useEffect(() => {
    if (result || stage !== 'place') feedbackRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [result, stage]);

  const startRound = (next) => {
    setOrder(shuffle(next.universe));
    setPlacements({});
    setResult(null);
    setStage('place');
    setPicked([]);
    setHintOpen(false);
  };

  const place = (regionId) => {
    sfx.play('pick');
    setPlacements((map) => ({ ...map, [current]: regionId }));
  };

  // Tirar um número do diagrama: ele volta a ser o próximo da fila.
  const pickUp = (n) => {
    sfx.play('tap');
    setPlacements(({ [n]: _removed, ...rest }) => rest);
    setOrder((list) => [n, ...list.filter((x) => x !== n)]);
    setResult((value) => (value && !value.correct ? { ...value, wrong: value.wrong.filter((x) => x !== n) } : value));
  };

  const restart = () => {
    sfx.play('tap');
    setPlacements({});
    setResult(null);
  };

  const verify = () => {
    const wrongNow = round.universe.filter((n) => placements[n] !== round.regions[n]);
    const next = { correct: wrongNow.length === 0, wrong: wrongNow };
    setResult(next);
    if (next.correct) {
      sfx.play('correct');
      setStage(round.question && !inWarmup ? 'question' : 'done');
      setHintOpen(false);
      return;
    }
    sfx.play('tryAgain');
    if (!inWarmup) setErrors((count) => count + 1); // o aquecimento não conta
  };

  const answer = (option) => {
    if (option.correct) {
      sfx.play('correct');
      setStage('done');
      setHintOpen(false);
      return;
    }
    sfx.play('tryAgain');
    setPicked((list) => [...list, option.text]);
    setErrors((count) => count + 1);
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

  const errorText = () => {
    if (help.marks === 'count') return `Ainda não: ${plural(result.wrong.length, 'número está no lugar errado', 'números estão no lugar errado')}. Toque em um número para tirá-lo.`;
    return 'Os números em vermelho estão no lugar errado. Toque neles para tirá-los e coloque de novo.';
  };

  const hintText = stage === 'question'
    ? 'O ∩ junta as duas regras com "e". Teste cada opção nos números que ficaram no meio, e também nos que ficaram de fora.'
    : round.hint;

  const setCard = (set) => (
    <div className="inter-set">
      <p className="teen-card__notation">{set.notation}</p>
      {showWords && set.words && <p className="teen-card__reading">{set.words}</p>}
    </div>
  );

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
            line={solved ? tutorial.done : tutorial.start}
            bubbleKey={solved ? 'done' : 'start'}
            mood={solved ? 'cheer' : 'curious'}
            mascotSize={60}
            layout="compact"
            className="decoder-talk"
          />
        )}

        <section className="teen-card" aria-label="Os conjuntos">
          <p className="teen-card__label">{inWarmup ? 'Aquecimento · os conjuntos' : 'Os conjuntos'}</p>
          <div className="inter-sets">
            {setCard(round.a)}
            {setCard(round.b)}
          </div>
          <p className="teen-card__universe">U = {formatList(round.universe)}</p>
        </section>

        <section className="inter-board">
          <div className="inter-next" aria-live="polite">
            {solved ? (
              <span className="inter-next__done">Diagrama completo</span>
            ) : allPlaced ? (
              <span className="inter-next__done">Todos os números foram colocados</span>
            ) : (
              <>
                <span className="inter-next__label">Onde fica o</span>
                <span className="inter-next__chip">{current}</span>
                <span className="inter-next__label">? Toque na região.</span>
              </>
            )}
          </div>
          <VennBoard round={round} placements={placements} wrong={wrong} solved={solved} current={current} onPlace={place} onPickUp={pickUp} />
        </section>

        <div className="teen-answer" aria-live="polite">
          <span className="teen-answer__set">
            A ∩ B = {formatList(round.universe.filter((n) => placements[n] === 'both'))}
          </span>
          <span className="teen-answer__count">n(A ∩ B) = {round.universe.filter((n) => placements[n] === 'both').length}</span>
        </div>

        {result && !result.correct && (
          <p ref={feedbackRef} className="teen-feedback teen-feedback--error">
            <X size={18} strokeWidth={3} aria-hidden="true" /> {errorText()}
          </p>
        )}
        {solved && (
          <p ref={stage === 'question' ? null : feedbackRef} className="teen-feedback teen-feedback--ok">
            <Check size={18} strokeWidth={3} aria-hidden="true" />
            <span>
              Correto: A ∩ B = {formatList(round.intersection)}, os números que estão em A <strong>e</strong> em B.
            </span>
          </p>
        )}

        {stage !== 'place' && round.question && !inWarmup && (
          <section ref={stage === 'question' ? feedbackRef : null} className="teen-card inter-question" aria-label="Pergunta final">
            <p className="teen-card__label">Pergunta final</p>
            <p className="teen-card__words">{round.question.prompt}</p>
            <div className="inter-options">
              {round.question.options.map((option) => {
                const isWrong = picked.includes(option.text);
                const isRight = stage === 'done' && option.correct;
                return (
                  <button
                    key={option.text}
                    type="button"
                    className={`inter-option ${isWrong ? 'is-wrong' : ''} ${isRight ? 'is-right' : ''}`}
                    onClick={() => answer(option)}
                    disabled={stage === 'done' || isWrong}
                  >
                    A ∩ B = {'{'}x ∈ U | {option.text}{'}'}
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {hintOpen && stage !== 'done' && (
          <div className="teen-hint" role="note">
            <Mascot mood="encourage" size={48} />
            <p>{hintText}</p>
          </div>
        )}

        <div className="teen-actions">
          {stage === 'done' ? (
            <GameButton variant="green" iconRight={ArrowRight} onClick={goNext} sound={null}>
              {inWarmup ? 'Começar as questões' : lastRound ? 'Concluir fase' : 'Próxima questão'}
            </GameButton>
          ) : (
            <>
              {stage === 'place' && (
                <GameButton variant="light" size="sm" icon={RotateCcw} onClick={restart} disabled={!Object.keys(placements).length}>
                  Recomeçar
                </GameButton>
              )}
              {!hintOpen && (
                <GameButton variant="light" size="sm" icon={Lightbulb} onClick={() => setHintOpen(true)}>
                  Dica
                </GameButton>
              )}
              {stage === 'place' && (
                <GameButton variant="lilac" icon={Check} onClick={verify} sound={null} disabled={!allPlaced}>
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
