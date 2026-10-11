import { useEffect, useState } from 'react';
import { Check, X, Apple, LogOut } from 'lucide-react';
import TopBar from '../../components/ui/TopBar.jsx';
import MascotDialogue from '../../components/mascot/MascotDialogue.jsx';
import SpeakButton from '../../components/ui/SpeakButton.jsx';
import StarBurst from '../../components/ui/StarBurst.jsx';
import ItemArt from '../../components/art/ItemArt.jsx';
import { getLevelScene } from '../../components/scenery/scenes.js';
import GameFeedback from './GameFeedback.jsx';
import { validateMembershipAnswer } from '../../logic/validation.js';
import { useGame, useNarration } from '../../state/GameContext.jsx';
import { sfx } from '../../audio/sfx.js';
import './MembershipGame.css';

const FLY_MS = 600; // duração do voo do elemento até o grupo; logo depois aparece o próximo

/**
 * Desafio de pertinência: um elemento por vez, a criança responde
 * "Pertence" ou "Não pertence" ao conjunto.
 */
export default function MembershipGame({ challenge, level, onExit, onComplete }) {
  const { completeLevel } = useGame();
  const { autoSpeak } = useNarration();
  const { items, feedback, set, answers } = challenge;
  const Scene = getLevelScene(challenge.scene);

  const [index, setIndex] = useState(0);
  const [placedIn, setPlacedIn] = useState([]);
  const [placedOut, setPlacedOut] = useState([]);
  const [phase, setPhase] = useState('asking'); // asking | hint | correct | success
  const [mistakesOnItem, setMistakesOnItem] = useState(0);
  const [hintCount, setHintCount] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);

  const item = items[index];
  const showVisualHint = mistakesOnItem >= challenge.visualHintAfter;

  // Pergunta narrada a cada novo elemento.
  useEffect(() => {
    if (item) autoSpeak(item.question);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  // Depois de um acerto: o elemento voa para o grupo e o próximo aparece em seguida.
  useEffect(() => {
    if (phase !== 'correct') return undefined;
    const timer = setTimeout(() => {
      if (item.belongs) setPlacedIn((list) => [...list, item.id]);
      else setPlacedOut((list) => [...list, item.id]);

      if (index === items.length - 1) {
        sfx.play('success');
        setPhase('success');
        completeLevel(level.id, 3);
        autoSpeak(feedback.success);
      } else {
        setIndex(index + 1);
        setMistakesOnItem(0);
        setPhase('asking');
      }
    }, FLY_MS);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  useEffect(() => {
    if (phase !== 'success') return undefined;
    const timer = setTimeout(() => setShowFeedback(true), 1100);
    return () => clearTimeout(timer);
  }, [phase]);

  const handleAnswer = (answerBelongs) => {
    if (phase === 'correct' || phase === 'success') return;
    if (validateMembershipAnswer(item, answerBelongs)) {
      // Sem esperar o elogio: a pergunta do próximo elemento já vai ser narrada.
      sfx.play('correct');
      sfx.play('whoosh');
      setPhase('correct');
      return;
    }
    sfx.play('tryAgain');
    const mistakes = mistakesOnItem + 1;
    setMistakesOnItem(mistakes);
    setHintCount((count) => count + 1);
    setPhase('hint');
    autoSpeak(mistakes === challenge.visualHintAfter ? feedback.visualHint : item.hint);
  };

  let line = challenge.mission;
  let mood = 'curious';
  let tone = 'default';
  if (phase === 'asking') line = item.question;
  if (phase === 'hint') {
    line = mistakesOnItem === challenge.visualHintAfter ? feedback.visualHint : item.hint;
    mood = 'encourage';
    tone = 'hint';
  }
  if (phase === 'correct') {
    line = item.correct;
    mood = 'cheer';
    tone = 'success';
  }
  if (phase === 'success') {
    line = feedback.success;
    mood = 'cheer';
    tone = 'success';
  }

  const answered = phase === 'correct' || phase === 'success';
  const done = phase === 'success';
  const goingClass = phase === 'correct' ? (item.belongs ? 'is-going-in' : 'is-going-out') : '';

  const renderMini = (id) => {
    const element = items.find((candidate) => candidate.id === id);
    return (
      <span key={id} className="member-mini" title={element.name}>
        <ItemArt id={id} size={46} />
        <span className="sr-only">{element.name}</span>
      </span>
    );
  };

  return (
    <div className="screen game-screen member-screen">
      <Scene />
      <TopBar onBack={onExit} backLabel="Voltar ao mapa" title={level.name} />

      <div className="game-layout member-layout">
        <MascotDialogue
          line={line}
          bubbleKey={`${line.id}-${hintCount}`}
          mood={mood}
          mascotSize={84}
          layout="compact"
          tone={tone}
          className="game-dialogue"
        />

        <div className="member-board">
          <section className={`member-set ${phase === 'correct' && item.belongs ? 'is-receiving' : ''} ${done ? 'is-solved' : ''}`} aria-label={`Grupo das ${set.label}: ${placedIn.length} elementos`}>
            <span className="member-set__label">
              <Apple size={20} strokeWidth={2.6} aria-hidden="true" /> {set.label}
            </span>
            <div className="member-set__items">
              {placedIn.map(renderMini)}
              {placedIn.length === 0 && <span className="member-empty">Vazio</span>}
            </div>
            {done && <StarBurst />}
          </section>

          <section className="member-stage">
            <div className="member-progress" aria-label={`Elemento ${Math.min(index + 1, items.length)} de ${items.length}`}>
              {items.map((element, position) => (
                <span
                  key={element.id}
                  className={position < index || done ? 'is-done' : position === index ? 'is-current' : ''}
                />
              ))}
            </div>

            {!done && (
              <div key={item.id} className={`member-card ${goingClass} ${phase === 'hint' ? 'is-thinking' : ''}`}>
                <ItemArt id={item.id} size={120} />
                <span className="member-card__name">{item.name}</span>
                <SpeakButton line={item.question} compact className="member-card__speak" />
              </div>
            )}

            {!done && (
              <div className="member-choices">
                <button
                  type="button"
                  className={`member-choice member-choice--yes ${showVisualHint && item.belongs ? 'is-hinted' : ''}`}
                  onClick={() => handleAnswer(true)}
                  disabled={answered}
                >
                  <span className="member-choice__icon" aria-hidden="true">
                    <Check size={34} strokeWidth={3.4} />
                  </span>
                  {answers.yes}
                </button>
                <button
                  type="button"
                  className={`member-choice member-choice--no ${showVisualHint && !item.belongs ? 'is-hinted' : ''}`}
                  onClick={() => handleAnswer(false)}
                  disabled={answered}
                >
                  <span className="member-choice__icon" aria-hidden="true">
                    <X size={34} strokeWidth={3.4} />
                  </span>
                  {answers.no}
                </button>
              </div>
            )}
          </section>

          <section className={`member-out ${phase === 'correct' && !item.belongs ? 'is-receiving' : ''}`} aria-label={`${set.outLabel}: ${placedOut.length} elementos`}>
            <span className="member-out__label">
              <LogOut size={18} strokeWidth={2.6} aria-hidden="true" /> {set.outLabel}
            </span>
            <div className="member-set__items">
              {placedOut.map(renderMini)}
              {placedOut.length === 0 && <span className="member-empty">Vazio</span>}
            </div>
          </section>
        </div>
      </div>

      {showFeedback && <GameFeedback line={feedback.success} onContinue={onComplete} />}
    </div>
  );
}
