import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, LogOut, NotebookPen, Users } from 'lucide-react';
import TopBar from '../../../components/ui/TopBar.jsx';
import MascotDialogue from '../../../components/mascot/MascotDialogue.jsx';
import SpeakButton from '../../../components/ui/SpeakButton.jsx';
import StarBurst from '../../../components/ui/StarBurst.jsx';
import GameButton from '../../../components/ui/GameButton.jsx';
import { getLevelScene } from '../../../components/scenery/scenes.js';
import GameFeedback from '../GameFeedback.jsx';
import { generateTweenMembership } from '../../../data/tween/membershipBalls.js';
import { starsFromErrors } from '../../../logic/scoring.js';
import { useGame, useNarration } from '../../../state/GameContext.jsx';
import { sfx } from '../../../audio/sfx.js';
import '../MembershipGame.css';
import './tween.css';

const FLY_MS = 600; // voo da bolinha até o grupo; logo depois chega a próxima
const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);

/**
 * "Quem pertence aqui?" para 9 a 12 anos: a dinâmica da fase 2 do 5–8 (um elemento por vez,
 * pertence ou não pertence) com bolinhas numeradas. Os botões já trazem ∈ e ∉, e cada resposta
 * certa vira uma frase escrita no caderno ("7 ∉ P"). São três grupos, do mais simples ao desafio.
 */
export default function TweenMembershipGame({ challenge, level, onExit, onComplete }) {
  const { profile, completeLevel } = useGame();
  const { autoSpeak } = useNarration();
  const difficultyId = profile?.difficulty ?? 'easy';
  const Scene = getLevelScene(challenge.scene);
  const { feedback } = challenge;

  const groups = useMemo(() => generateTweenMembership(difficultyId), [difficultyId]);
  const [groupIndex, setGroupIndex] = useState(0);
  const [index, setIndex] = useState(0);
  const [placedIn, setPlacedIn] = useState([]);
  const [placedOut, setPlacedOut] = useState([]);
  const [notes, setNotes] = useState([]); // frases do caderno, como "7 ∉ P"
  const [phase, setPhase] = useState('intro'); // intro | asking | hint | correct | groupDone
  const [mistakesOnBall, setMistakesOnBall] = useState(0);
  const [hintCount, setHintCount] = useState(0);
  const [errors, setErrors] = useState(0);
  const [stars, setStars] = useState(null);
  const notesRef = useRef(null);

  const group = groups[groupIndex];
  const ball = group.balls[index];
  const lastGroup = groupIndex === groups.length - 1;
  const showVisualHint = mistakesOnBall >= challenge.visualHintAfter;

  const introLine = useMemo(() => ({ id: `t9.f2.${group.id}.intro`, text: group.intro }), [group]);
  const questionLine = useMemo(() => ball && { id: `t9.f2.q.${ball.id}`, text: ball.question }, [ball]);

  // Ao começar um grupo, o Pipo apresenta a regra; a primeira pergunta vem logo em seguida.
  useEffect(() => {
    autoSpeak(introLine);
    setPhase('intro');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupIndex]);

  useEffect(() => {
    if (phase === 'asking' && index > 0) autoSpeak(questionLine);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  useEffect(() => {
    if (phase === 'groupDone') notesRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [phase]);

  // Depois do acerto, a bolinha voa para o lugar dela e a próxima aparece.
  useEffect(() => {
    if (phase !== 'correct') return undefined;
    const timer = setTimeout(() => {
      if (ball.belongs) setPlacedIn((list) => [...list, ball]);
      else setPlacedOut((list) => [...list, ball]);
      if (index === group.balls.length - 1) {
        sfx.play('success');
        setPhase('groupDone');
      } else {
        setIndex(index + 1);
        setMistakesOnBall(0);
        setPhase('asking');
      }
    }, FLY_MS);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  const handleAnswer = (answerBelongs) => {
    if (phase === 'correct' || phase === 'groupDone') return;
    if (answerBelongs === ball.belongs) {
      // Acerto: só o som positivo, sem fala.
      sfx.play('correct');
      sfx.play('whoosh');
      setNotes((list) => [...list, { id: ball.id, text: `${ball.n} ${ball.belongs ? '∈' : '∉'} ${group.letter}`, why: capitalize(ball.why), belongs: ball.belongs }]);
      setPhase('correct');
      return;
    }
    sfx.play('tryAgain');
    const mistakes = mistakesOnBall + 1;
    setMistakesOnBall(mistakes);
    setErrors((count) => count + 1);
    setHintCount((count) => count + 1);
    setPhase('hint');
    autoSpeak(mistakes === challenge.visualHintAfter ? feedback.visualHint : { id: `t9.f2.hint.${ball.id}`, text: ball.hint });
  };

  const goNextGroup = () => {
    sfx.play('tap');
    if (lastGroup) {
      const earned = starsFromErrors(errors);
      completeLevel(level.id, earned);
      setStars(earned);
      autoSpeak(feedback.success);
      return;
    }
    setGroupIndex(groupIndex + 1);
    setIndex(0);
    setPlacedIn([]);
    setPlacedOut([]);
    setNotes([]);
    setMistakesOnBall(0);
  };

  let line = questionLine;
  let mood = 'curious';
  let tone = 'default';
  if (phase === 'intro') line = introLine;
  if (phase === 'hint') {
    line = mistakesOnBall === challenge.visualHintAfter ? feedback.visualHint : { id: `t9.f2.hint.${ball.id}`, text: ball.hint };
    mood = 'encourage';
    tone = 'hint';
  }
  if (phase === 'groupDone') {
    line = { id: `t9.f2.${group.id}.done`, text: lastGroup ? 'Você respondeu todas! Veja no caderno como tudo ficou escrito.' : 'Grupo completo! Veja no caderno como os matemáticos escrevem cada resposta.' };
    mood = 'cheer';
    tone = 'success';
  }

  const answering = phase === 'intro' || phase === 'asking' || phase === 'hint';
  const groupDone = phase === 'groupDone';
  const goingClass = phase === 'correct' ? (ball.belongs ? 'is-going-in' : 'is-going-out') : '';

  const mini = (item) => (
    <span key={item.id} className="member-mini tween-mini" title={`${item.n}`}>
      <span className={`num-ball num-ball--${item.color}`}>{item.n}</span>
    </span>
  );

  const choose = (answerBelongs) => {
    if (phase === 'intro') setPhase('asking');
    handleAnswer(answerBelongs);
  };

  return (
    <div className="screen game-screen member-screen tween-screen">
      <Scene />
      <TopBar onBack={onExit} backLabel="Voltar ao mapa" title={level.name} />

      <div className="game-layout member-layout">
        <div className="tween-steps" aria-label={`Grupo ${groupIndex + 1} de ${groups.length}`}>
          {groups.map((item, position) => {
            const finished = position < groupIndex || (position === groupIndex && groupDone);
            return (
              <span key={item.id} className={`tween-step ${finished ? 'is-done' : ''} ${position === groupIndex ? 'is-current' : ''}`}>
                {position + 1}
              </span>
            );
          })}
        </div>

        <MascotDialogue line={line} bubbleKey={`${line.id}-${hintCount}`} mood={mood} mascotSize={84} layout="compact" tone={tone} className="game-dialogue" />

        <p className="tween-group-rule" aria-label="O grupo">
          <span className="tween-group-rule__math">{group.display}</span>
          <span className="tween-group-rule__words">{group.words}</span>
        </p>

        <div className="member-board">
          <section className={`member-set tween-set ${phase === 'correct' && ball.belongs ? 'is-receiving' : ''} ${groupDone ? 'is-solved' : ''}`} aria-label={`Grupo ${group.letter}: ${placedIn.length} bolinhas`}>
            <span className="member-set__label">
              <Users size={18} strokeWidth={2.6} aria-hidden="true" /> {group.label}
            </span>
            <div className="member-set__items">
              {placedIn.map(mini)}
              {placedIn.length === 0 && <span className="member-empty">Vazio</span>}
            </div>
            {groupDone && <StarBurst />}
          </section>

          <section className="member-stage">
            <div className="member-progress" aria-label={`Bolinha ${Math.min(index + 1, group.balls.length)} de ${group.balls.length}`}>
              {group.balls.map((item, position) => (
                <span key={item.id} className={position < index || groupDone ? 'is-done' : position === index ? 'is-current' : ''} />
              ))}
            </div>

            {!groupDone && (
              <div key={ball.id} className={`member-card tween-card ${goingClass} ${phase === 'hint' ? 'is-thinking' : ''}`}>
                <span className={`num-ball num-ball--${ball.color} tween-card__ball`}>{ball.n}</span>
                <span className="member-card__name">Pertence a {group.letter}?</span>
                <SpeakButton line={questionLine} compact className="member-card__speak" />
              </div>
            )}

            {!groupDone && (
              <div className="member-choices">
                <button
                  type="button"
                  className={`member-choice member-choice--yes ${showVisualHint && ball.belongs ? 'is-hinted' : ''}`}
                  onClick={() => choose(true)}
                  disabled={!answering}
                >
                  <span className="member-choice__icon tween-symbol" aria-hidden="true">∈</span>
                  pertence
                </button>
                <button
                  type="button"
                  className={`member-choice member-choice--no ${showVisualHint && !ball.belongs ? 'is-hinted' : ''}`}
                  onClick={() => choose(false)}
                  disabled={!answering}
                >
                  <span className="member-choice__icon tween-symbol" aria-hidden="true">∉</span>
                  não pertence
                </button>
              </div>
            )}
          </section>

          <section className={`member-out ${phase === 'correct' && !ball.belongs ? 'is-receiving' : ''}`} aria-label={`${group.outLabel}: ${placedOut.length} bolinhas`}>
            <span className="member-out__label">
              <LogOut size={18} strokeWidth={2.6} aria-hidden="true" /> {group.outLabel}
            </span>
            <div className="member-set__items">
              {placedOut.map(mini)}
              {placedOut.length === 0 && <span className="member-empty">Vazio</span>}
            </div>
          </section>
        </div>

        {notes.length > 0 && (
          <section ref={notesRef} className={`tween-notes ${groupDone ? 'is-complete' : ''}`} aria-label="Caderno">
            <p className="tween-reveal__label">
              <NotebookPen size={16} strokeWidth={2.6} aria-hidden="true" /> Como os matemáticos escrevem
            </p>
            <ul>
              {notes.map((note) => (
                <li key={note.id} className={note.belongs ? 'is-in' : 'is-out'}>
                  <span className="tween-notes__math">{note.text}</span>
                  <span className="tween-notes__why">{note.why}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {groupDone && (
          <div className="game-actions">
            <GameButton variant="green" size="lg" iconRight={ArrowRight} onClick={goNextGroup} sound={null}>
              {lastGroup ? 'Terminar' : 'Próximo grupo'}
            </GameButton>
          </div>
        )}
      </div>

      {stars !== null && <GameFeedback line={feedback.success} onContinue={() => onComplete(stars)} />}
    </div>
  );
}
