import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Check, Sparkles } from 'lucide-react';
import TopBar from '../../components/ui/TopBar.jsx';
import MascotDialogue from '../../components/mascot/MascotDialogue.jsx';
import GameButton from '../../components/ui/GameButton.jsx';
import StarBurst from '../../components/ui/StarBurst.jsx';
import VennDiagram from '../../components/ui/VennDiagram.jsx';
import ItemArt from '../../components/art/ItemArt.jsx';
import GuardianScene from '../../components/scenery/GuardianScene.jsx';
import GameFeedback from './GameFeedback.jsx';
import { validateChoice } from '../../logic/validation.js';
import { useGame, useNarration } from '../../state/GameContext.jsx';
import { sfx } from '../../audio/sfx.js';
import './GuardianQuizGame.css';

const NEXT_ROUND_MS = 2200; // tempo para ver a pedra acender antes do próximo desafio

const normalizeOptions = (round) =>
  round.options.map((option) => (typeof option === 'string' ? { key: option, items: [option] } : option));

function joinNames(names) {
  if (names.length < 2) return names[0] ?? '';
  return `${names.slice(0, -1).join(', ')} e ${names[names.length - 1]}`;
}

/** Como o grupo do desafio aparece: uma etiqueta ou o diagrama de dois grupos. */
function RoundDisplay({ display }) {
  if (display.type === 'venn') {
    return (
      <div className="quiz-display quiz-display--venn">
        <VennDiagram
          small
          highlight={display.highlight}
          sets={{
            a: { label: display.a, color: display.colors?.a },
            b: { label: display.b, color: display.colors?.b },
            both: { label: `${display.a} E ${display.b.toLowerCase()}`, color: display.colors?.both },
          }}
        />
        <span className={`quiz-display__word quiz-display__word--${display.highlight}`}>{display.highlight === 'both' ? 'E' : 'OU'}</span>
      </div>
    );
  }
  return (
    <div className={`quiz-display quiz-display--group quiz-display--${display.theme}`}>
      <span className="quiz-display__ring">{display.label}</span>
    </div>
  );
}

/**
 * Desafio final: cinco perguntas rápidas que revisam o mundo inteiro.
 * Cada acerto acende uma pedra mágica e o Guardião vai acordando.
 */
export default function GuardianQuizGame({ challenge, level, onExit, onComplete }) {
  const { completeLevel } = useGame();
  const { autoSpeak } = useNarration();
  const { rounds, feedback, elements } = challenge;

  const [roundIndex, setRoundIndex] = useState(0);
  const [lit, setLit] = useState(0);
  const [selected, setSelected] = useState([]);
  const [wrongKey, setWrongKey] = useState(null);
  const [mistakes, setMistakes] = useState(0);
  const [phase, setPhase] = useState('asking'); // asking | hint | correct | success
  const [line, setLine] = useState(rounds[0].prompt);
  const [lineCount, setLineCount] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [stirring, setStirring] = useState(false);
  const timers = useRef([]);
  const spaceRef = useRef(null);
  const cardRef = useRef(null);
  const barRef = useRef(null);
  const [faceSpace, setFaceSpace] = useState(null);

  const round = rounds[roundIndex];
  const options = normalizeOptions(round);
  const showVisualHint = mistakes >= challenge.visualHintAfter;
  const locked = phase === 'correct' || phase === 'success';

  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms));
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  // O cartão do desafio fica logo abaixo do rosto do Guardião, sem passar das pedras mágicas.
  const fitCard = useCallback(() => {
    const face = document.querySelector('.guardian-scene__face');
    const space = spaceRef.current;
    const bar = barRef.current;
    if (!face || !space || !bar) return;
    const spaceTop = space.getBoundingClientRect().top;
    const wanted = face.getBoundingClientRect().bottom + 12 - spaceTop;
    // offsetHeight ignora a animação de entrada (que encolhe o cartão por um instante).
    const cardHeight = cardRef.current?.offsetHeight ?? 0;
    const room = window.innerHeight - spaceTop - cardHeight - bar.offsetHeight - 28 - 36;
    setFaceSpace(Math.max(48, Math.min(wanted, room)));
  }, []);

  useLayoutEffect(() => {
    fitCard();
    const timer = setTimeout(fitCard, 120);
    window.addEventListener('resize', fitCard);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', fitCard);
    };
  }, [fitCard, roundIndex, lineCount]);

  const say = (nextLine) => {
    setLine(nextLine);
    setLineCount((count) => count + 1);
    autoSpeak(nextLine);
  };

  useEffect(() => {
    autoSpeak(rounds[0].prompt);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const optionName = (option) => joinNames(option.items.map((id) => elements[id]));

  const succeed = () => {
    setPhase('correct');
    setSelected(round.kind === 'pick-many' ? round.answer : [round.answer[0]]);
    sfx.play('correct');
    later(() => sfx.play('star'), 250);
    setLit((count) => count + 1);
    setStirring(true);
    later(() => setStirring(false), 700);
    say(round.ok);

    const isLast = roundIndex === rounds.length - 1;
    later(() => {
      if (isLast) {
        setPhase('success');
        sfx.play('success');
        completeLevel(level.id, 3);
        say(feedback.success);
        later(() => setShowFeedback(true), 1800);
        return;
      }
      const next = rounds[roundIndex + 1];
      setRoundIndex(roundIndex + 1);
      setSelected([]);
      setMistakes(0);
      setPhase('asking');
      say(next.prompt);
    }, NEXT_ROUND_MS);
  };

  const fail = (key) => {
    sfx.play('tryAgain');
    setWrongKey(key);
    later(() => setWrongKey(null), 700);
    const count = mistakes + 1;
    setMistakes(count);
    setPhase('hint');
    say(count === challenge.visualHintAfter ? feedback.visualHint : round.hint);
  };

  const handleOption = (key) => {
    if (locked) return;
    if (round.kind === 'pick-many') {
      sfx.play('pick');
      setSelected((current) => (current.includes(key) ? current.filter((item) => item !== key) : [...current, key]));
      return;
    }
    if (validateChoice(round.answer, [key]).correct) succeed();
    else fail(key);
  };

  const handleReady = () => {
    if (locked) return;
    if (selected.length === 0) {
      sfx.play('tryAgain');
      say(feedback.pickMore);
      return;
    }
    if (validateChoice(round.answer, selected).correct) succeed();
    else fail(null);
  };

  const tone = phase === 'hint' ? 'hint' : phase === 'correct' || phase === 'success' ? 'success' : 'default';
  const mood = phase === 'hint' ? 'encourage' : phase === 'correct' || phase === 'success' ? 'cheer' : 'curious';
  const done = phase === 'success';

  return (
    <div className="screen game-screen guardian-screen" style={{ '--restore': lit / rounds.length }}>
      <GuardianScene lit={lit} total={rounds.length} stirring={stirring} />
      <TopBar onBack={onExit} backLabel="Voltar ao mapa" title={level.name} />

      <div className="game-layout guardian-layout">
        <MascotDialogue line={line} bubbleKey={`${line.id}-${lineCount}`} mood={mood} mascotSize={84} layout="compact" tone={tone} className="game-dialogue" />

        {/* espaço livre para o rosto do Guardião aparecer */}
        <div ref={spaceRef} className="guardian-face-space" style={faceSpace != null ? { flexBasis: faceSpace } : undefined} aria-hidden="true">
          {done && <StarBurst />}
        </div>

        {!done && (
          <section ref={cardRef} key={round.id} className={`quiz-card ${phase === 'correct' ? 'is-correct' : ''}`}>
            <p className="quiz-card__eyebrow">
              <Sparkles size={16} strokeWidth={2.6} aria-hidden="true" /> Desafio {roundIndex + 1} de {rounds.length} · {round.concept}
            </p>
            <RoundDisplay display={round.display} />

            <div className={`quiz-options quiz-options--${options.length}`} role={round.kind === 'pick-many' ? 'group' : undefined}>
              {options.map((option) => {
                const isSelected = selected.includes(option.key);
                const isAnswer = round.answer.includes(option.key);
                return (
                  <button
                    key={option.key}
                    type="button"
                    className={`quiz-option ${option.items.length > 1 ? 'quiz-option--group' : ''} ${isSelected ? 'is-selected' : ''} ${
                      wrongKey === option.key ? 'is-wrong' : ''
                    } ${showVisualHint && isAnswer && !locked ? 'is-hinted' : ''} ${phase === 'correct' && isAnswer ? 'is-right' : ''}`}
                    onClick={() => handleOption(option.key)}
                    disabled={locked}
                    aria-pressed={round.kind === 'pick-many' ? isSelected : undefined}
                    aria-label={optionName(option)}
                  >
                    <span className="quiz-option__art">
                      {option.items.map((id) => (
                        <ItemArt key={id} id={id} size={option.items.length > 1 ? 40 : 70} />
                      ))}
                    </span>
                    {option.items.length === 1 && <span className="quiz-option__name">{elements[option.items[0]]}</span>}
                    {round.kind === 'pick-many' && (
                      <span className="quiz-option__check" aria-hidden="true">
                        <Check size={18} strokeWidth={3.5} />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {round.kind === 'pick-many' && (
              <GameButton variant="green" size="lg" icon={Check} onClick={handleReady} disabled={locked} sound={null} className="quiz-ready">
                Pronto!
              </GameButton>
            )}
          </section>
        )}

        {/* pedras mágicas nas raízes do Guardião */}
        <div ref={barRef} className="rune-bar" aria-label={`Pedras mágicas: ${lit} de ${rounds.length} acesas`}>
          {rounds.map((item, index) => (
            <div key={item.id} className={`rune ${index < lit ? 'is-on' : ''} ${index === roundIndex && !done && index >= lit ? 'is-current' : ''}`}>
              <span className="rune__stone" aria-hidden="true">{item.symbol}</span>
              <span className="rune__label">{item.concept}</span>
            </div>
          ))}
        </div>
      </div>

      {showFeedback && <GameFeedback line={feedback.success} onContinue={onComplete} />}
    </div>
  );
}
