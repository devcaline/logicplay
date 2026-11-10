import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Check, LogOut, Hand, Sparkles, ArrowRight } from 'lucide-react';
import TopBar from '../../../components/ui/TopBar.jsx';
import MascotDialogue from '../../../components/mascot/MascotDialogue.jsx';
import GameButton from '../../../components/ui/GameButton.jsx';
import StarBurst from '../../../components/ui/StarBurst.jsx';
import { getLevelScene } from '../../../components/scenery/scenes.js';
import { useTokenDrag, DragGhost } from '../useTokenDrag.jsx';
import GameFeedback from '../GameFeedback.jsx';
import { generateColorSetPhase, COLORS } from '../../../data/tween/colorSets.js';
import { starsFromErrors } from '../../../logic/scoring.js';
import { useGame, useNarration } from '../../../state/GameContext.jsx';
import { sfx } from '../../../audio/sfx.js';
import '../SetSortingGame.css';
import './tween.css';

const DROP_MARGIN = 32;

/** Visual de uma bolinha numerada (no tabuleiro e no "fantasma" do arraste). */
function BallFace({ item, showHint }) {
  return (
    <>
      <span className={`num-ball num-ball--${item.color}`}>{item.n}</span>
      {showHint && (
        <span className="token__hint" aria-hidden="true">
          <Sparkles size={14} strokeWidth={3} />
        </span>
      )}
    </>
  );
}

const allOut = (tokens) => Object.fromEntries(tokens.map((t) => [t.id, 'out']));

/**
 * Grupos com bolinhas coloridas (9 a 12 anos): a mecânica de arrastar do 5–8, mas com números.
 * Três missões: pela cor, por uma propriedade do número e pelas duas juntas. Depois de cada uma,
 * o Pipo mostra o grupo escrito com a notação de verdade ({ }, ∈ e ∉).
 */
export default function ColorSortingGame({ challenge, level, onExit, onComplete }) {
  const { profile, completeLevel } = useGame();
  const { autoSpeak } = useNarration();
  const difficultyId = profile?.difficulty ?? 'easy';
  const Scene = getLevelScene(challenge.scene);
  const { feedback } = challenge;

  const phase = useMemo(() => generateColorSetPhase(difficultyId), [difficultyId]);
  const { tokens, missions } = phase;
  const [missionIndex, setMissionIndex] = useState(0);
  const mission = missions[missionIndex];
  const lastMission = missionIndex === missions.length - 1;

  const [placement, setPlacement] = useState(() => allOut(tokens));
  const [selectedId, setSelectedId] = useState(null);
  const [status, setStatus] = useState('playing'); // playing | hint | reveal
  const [hintLine, setHintLine] = useState(null);
  const [hintCount, setHintCount] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [errors, setErrors] = useState(0);
  const [showVisualHint, setShowVisualHint] = useState(false);
  const [stars, setStars] = useState(null);

  const setZoneRef = useRef(null);
  const revealRef = useRef(null);
  const locked = status === 'reveal';

  const missionLine = useMemo(() => ({ id: `t9.f1.${mission.id}`, text: mission.text }), [mission]);
  const revealLine = useMemo(() => ({ id: `t9.f1.${mission.id}.reveal`, text: mission.reveal.text }), [mission]);

  // Narra a missão quando ela começa.
  useEffect(() => {
    autoSpeak(missionLine);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [missionIndex]);

  useEffect(() => {
    if (status === 'reveal') revealRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [status]);

  const isOverSet = useCallback((x, y) => {
    const rect = setZoneRef.current?.getBoundingClientRect();
    if (!rect) return false;
    return x >= rect.left - DROP_MARGIN && x <= rect.right + DROP_MARGIN && y >= rect.top - DROP_MARGIN && y <= rect.bottom + DROP_MARGIN;
  }, []);

  const moveItem = useCallback((id, location) => {
    setPlacement((current) => (current[id] === location ? current : { ...current, [id]: location }));
  }, []);

  const { drag, handlers } = useTokenDrag({
    disabled: locked,
    zoneAt: (x, y) => (isOverSet(x, y) ? 'in' : 'out'),
    onDragStart: () => {
      setSelectedId(null);
      sfx.play('pick');
    },
    onDrop: (id, zone) => {
      moveItem(id, zone);
      sfx.play('drop');
    },
    onTap: (id) => {
      if (selectedId === id) {
        sfx.play('tap');
        setSelectedId(null);
        return;
      }
      sfx.play('pick');
      setSelectedId(id);
      const token = tokens.find((t) => t.id === id);
      autoSpeak({ id: `t9.ball.${token.n}.${token.color}`, text: `${token.n}, ${COLORS[token.color].name}` });
    },
  });

  const handleZoneActivate = (location) => {
    if (!selectedId || locked) return;
    moveItem(selectedId, location);
    sfx.play('drop');
    setSelectedId(null);
  };
  const zoneKeyDown = (location) => (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleZoneActivate(location);
    }
  };

  const handleVerify = () => {
    setSelectedId(null);
    const inside = tokens.filter((t) => placement[t.id] === 'in');
    const wrongInside = inside.filter((t) => !mission.test(t));
    const missing = tokens.filter((t) => placement[t.id] !== 'in' && mission.test(t));
    if (!wrongInside.length && !missing.length) {
      sfx.play('success');
      setStatus('reveal');
      setShowVisualHint(false);
      autoSpeak(revealLine);
      return;
    }
    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);
    setErrors((count) => count + 1);
    let base = feedback.generic;
    if (!inside.length) base = feedback.empty;
    else if (wrongInside.length) base = feedback.wrongInside;
    else if (missing.length) base = feedback.missing;
    const visual = inside.length > 0 && nextAttempts >= challenge.visualHintAfter;
    if (visual) setShowVisualHint(true);
    const line = { id: `${base.id}.${mission.id}${visual ? '.visual' : ''}`, text: `${base.text} ${visual ? feedback.visualHint.text : mission.hint}` };
    sfx.play('tryAgain');
    setHintLine(line);
    setHintCount((count) => count + 1);
    setStatus('hint');
    autoSpeak(line);
  };

  const goNext = () => {
    sfx.play('tap');
    if (lastMission) {
      const earned = starsFromErrors(errors);
      completeLevel(level.id, earned);
      setStars(earned);
      autoSpeak(feedback.success);
      return;
    }
    setMissionIndex(missionIndex + 1);
    setPlacement(allOut(tokens));
    setStatus('playing');
    setAttempts(0);
    setHintLine(null);
  };

  const dialogueLine = status === 'hint' ? hintLine : status === 'reveal' ? revealLine : missionLine;
  const dialogueMood = status === 'hint' ? 'encourage' : status === 'reveal' ? 'cheer' : 'curious';
  const inside = tokens.filter((t) => placement[t.id] === 'in');
  const outside = tokens.filter((t) => placement[t.id] !== 'in');
  const draggingItem = drag && tokens.find((t) => t.id === drag.id);

  const renderBall = (item) => (
    <button
      key={item.id}
      type="button"
      className={`token token--ball ${selectedId === item.id ? 'is-selected' : ''} ${drag?.id === item.id ? 'is-dragging' : ''} ${showVisualHint && mission.test(item) ? 'has-hint' : ''}`}
      aria-pressed={selectedId === item.id}
      aria-label={`${item.n}, ${COLORS[item.color].name}, ${placement[item.id] === 'in' ? 'dentro do círculo' : 'fora do círculo'}`}
      disabled={locked}
      onPointerDown={(event) => handlers.onPointerDown(event, item.id)}
      onPointerMove={handlers.onPointerMove}
      onPointerUp={handlers.onPointerUp}
      onPointerCancel={handlers.onPointerCancel}
      onClick={(event) => handlers.onClick(event, item.id)}
    >
      <BallFace item={item} showHint={showVisualHint && mission.test(item)} />
    </button>
  );

  return (
    <div className="screen game-screen tween-screen">
      <Scene />
      <TopBar onBack={onExit} backLabel="Voltar ao mapa" title={level.name} />

      <div className="game-layout">
        <div className="tween-steps" aria-label={`Missão ${missionIndex + 1} de ${missions.length}`}>
          {missions.map((item, index) => (
            <span key={item.id} className={`tween-step ${index < missionIndex || (index === missionIndex && locked) ? 'is-done' : ''} ${index === missionIndex ? 'is-current' : ''}`}>
              {index < missionIndex || (index === missionIndex && locked) ? <Check size={14} strokeWidth={3.5} /> : index + 1}
            </span>
          ))}
        </div>

        <MascotDialogue
          line={dialogueLine}
          bubbleKey={`${dialogueLine.id}-${hintCount}`}
          mood={dialogueMood}
          mascotSize={84}
          layout="compact"
          tone={status === 'hint' ? 'hint' : status === 'reveal' ? 'success' : 'default'}
          className="game-dialogue"
        />

        {!locked && (
          <p className={`game-tip ${selectedId ? 'is-active' : ''}`} aria-live="polite">
            <Hand size={18} strokeWidth={2.6} aria-hidden="true" />
            {selectedId ? 'Agora toque no círculo ou na área de fora para levar a bolinha.' : 'Arraste as bolinhas ou toque em uma delas para escolher.'}
          </p>
        )}

        <div className="game-board">
          <div
            ref={setZoneRef}
            className={`set-zone tween-zone ${drag?.over === 'in' ? 'is-over' : ''} ${selectedId ? 'is-target' : ''} ${locked ? 'is-solved' : ''}`}
            role="button"
            tabIndex={selectedId ? 0 : -1}
            aria-label={`Círculo: ${mission.label}. ${inside.length} bolinhas dentro.`}
            onClick={() => handleZoneActivate('in')}
            onKeyDown={zoneKeyDown('in')}
          >
            <span className="set-zone__label">{mission.label}</span>
            <div className="set-zone__items">{inside.map(renderBall)}</div>
            {inside.length === 0 && <span className="set-zone__empty">Solte aqui</span>}
            {locked && <StarBurst />}
          </div>

          {locked ? (
            <section ref={revealRef} className="tween-reveal" aria-label="Como os matemáticos escrevem">
              <p className="tween-reveal__label">Como os matemáticos escrevem</p>
              {mission.reveal.math.map((line) => (
                <p key={line} className="tween-reveal__math">{line}</p>
              ))}
            </section>
          ) : (
            <div
              className={`tray ${selectedId && placement[selectedId] === 'in' ? 'is-target' : ''}`}
              role="button"
              tabIndex={selectedId ? 0 : -1}
              aria-label={`Fora do círculo. ${outside.length} bolinhas aqui.`}
              onClick={() => handleZoneActivate('out')}
              onKeyDown={zoneKeyDown('out')}
            >
              <span className="tray__label">
                <LogOut size={18} strokeWidth={2.6} aria-hidden="true" /> Fora do círculo
              </span>
              <div className="tray__items">{outside.map(renderBall)}</div>
            </div>
          )}
        </div>

        <div className="game-actions">
          {locked ? (
            <GameButton variant="green" size="lg" iconRight={ArrowRight} onClick={goNext} sound={null}>
              {lastMission ? 'Terminar' : 'Próxima missão'}
            </GameButton>
          ) : (
            <GameButton variant="green" size="lg" icon={Check} onClick={handleVerify} sound={null}>
              Verificar
            </GameButton>
          )}
        </div>
      </div>

      <DragGhost drag={drag} item={draggingItem} highlight={drag?.over === 'in'} renderFace={(item) => <BallFace item={item} />} />

      {stars !== null && <GameFeedback line={feedback.success} onContinue={() => onComplete(stars)} />}
    </div>
  );
}
