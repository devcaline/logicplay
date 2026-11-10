import { useEffect, useMemo, useRef, useState } from 'react';
import { Check, LogOut, Hand, ArrowRight } from 'lucide-react';
import TopBar from '../../../components/ui/TopBar.jsx';
import MascotDialogue from '../../../components/mascot/MascotDialogue.jsx';
import GameButton from '../../../components/ui/GameButton.jsx';
import StarBurst from '../../../components/ui/StarBurst.jsx';
import VennDiagram, { vennZoneAt } from '../../../components/ui/VennDiagram.jsx';
import { getLevelScene } from '../../../components/scenery/scenes.js';
import { useTokenDrag, DragGhost } from '../useTokenDrag.jsx';
import GameFeedback from '../GameFeedback.jsx';
import { generateTweenVenn } from '../../../data/tween/vennBalls.js';
import { COLORS } from '../../../data/tween/colorSets.js';
import { starsFromErrors } from '../../../logic/scoring.js';
import { useGame, useNarration } from '../../../state/GameContext.jsx';
import { sfx } from '../../../audio/sfx.js';
import '../SetSortingGame.css';
import '../VennSortingGame.css';
import './tween.css';

const regionOf = (ball) => (ball.groups.length === 2 ? 'both' : ball.groups[0] ?? 'out');
const allOut = (balls) => Object.fromEntries(balls.map((ball) => [ball.id, 'out']));

/** Dica visual: as letras dos grupos a que a bolinha pertence. */
function GroupBadges({ ball, sets }) {
  if (!ball.groups.length) return null;
  return (
    <span className="ball-badges" aria-hidden="true">
      {ball.groups.map((group) => (
        <span key={group} className="ball-badge" style={{ background: sets[group].color?.label }}>
          {sets[group].letter}
        </span>
      ))}
    </span>
  );
}

function BallFace({ ball, sets, showHint }) {
  return (
    <>
      <span className={`num-ball num-ball--${ball.color}`}>{ball.n}</span>
      {showHint && <GroupBadges ball={ball} sets={sets} />}
    </>
  );
}

/**
 * A Ponte do E para 9 a 12 anos: o diagrama de Venn de arrastar do 5–8, com bolinhas numeradas.
 * Duas missões (cor × regra e regra × regra); depois de cada uma aparece a interseção com ∩.
 */
export default function TweenVennGame({ challenge, level, onExit, onComplete }) {
  const { profile, completeLevel } = useGame();
  const { autoSpeak } = useNarration();
  const difficultyId = profile?.difficulty ?? 'easy';
  const Scene = getLevelScene(challenge.scene);
  const { feedback } = challenge;

  const missions = useMemo(() => generateTweenVenn(difficultyId), [difficultyId]);
  const [missionIndex, setMissionIndex] = useState(0);
  const mission = missions[missionIndex];
  const { balls, sets } = mission;
  const lastMission = missionIndex === missions.length - 1;

  const [placement, setPlacement] = useState(() => allOut(balls));
  const [selectedId, setSelectedId] = useState(null);
  const [status, setStatus] = useState('playing'); // playing | hint | reveal
  const [hintLine, setHintLine] = useState(null);
  const [hintCount, setHintCount] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [errors, setErrors] = useState(0);
  const [showVisualHint, setShowVisualHint] = useState(false);
  const [stars, setStars] = useState(null);
  const vennRef = useRef(null);
  const revealRef = useRef(null);
  const locked = status === 'reveal';

  const missionLine = useMemo(() => ({ id: `t9.f3.${mission.id}`, text: mission.text }), [mission]);
  const revealLine = useMemo(() => ({ id: `t9.f3.${mission.id}.reveal`, text: mission.reveal.text }), [mission]);

  useEffect(() => {
    autoSpeak(missionLine);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [missionIndex]);

  useEffect(() => {
    if (status === 'reveal') revealRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [status]);

  const moveItem = (id, zone) => {
    setPlacement((current) => (current[id] === zone ? current : { ...current, [id]: zone }));
  };

  const { drag, handlers } = useTokenDrag({
    disabled: locked,
    zoneAt: (x, y) => vennZoneAt(vennRef.current, x, y),
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
      const ball = balls.find((item) => item.id === id);
      autoSpeak({ id: `t9.ball.${ball.n}.${ball.color}`, text: `${ball.n}, ${COLORS[ball.color].name}` });
    },
  });

  const placeSelected = (zone) => {
    if (!selectedId || locked) return;
    moveItem(selectedId, zone);
    sfx.play('drop');
    setSelectedId(null);
  };

  const handleVerify = () => {
    setSelectedId(null);
    const wrong = balls.filter((ball) => placement[ball.id] !== regionOf(ball));
    if (!wrong.length) {
      sfx.play('success');
      setStatus('reveal');
      setShowVisualHint(false);
      autoSpeak(revealLine);
      return;
    }
    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);
    setErrors((count) => count + 1);
    const empty = balls.every((ball) => placement[ball.id] === 'out');
    let base = feedback.generic;
    if (empty) base = feedback.empty;
    else if (wrong.some((ball) => regionOf(ball) === 'both')) base = feedback.missingBoth;
    else if (wrong.some((ball) => placement[ball.id] === 'both')) base = feedback.wrongBoth;
    const visual = !empty && nextAttempts >= challenge.visualHintAfter;
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
    const next = missions[missionIndex + 1];
    setMissionIndex(missionIndex + 1);
    setPlacement(allOut(next.balls));
    setStatus('playing');
    setAttempts(0);
    setHintLine(null);
  };

  const dialogueLine = status === 'hint' ? hintLine : status === 'reveal' ? revealLine : missionLine;
  const dialogueMood = status === 'hint' ? 'encourage' : status === 'reveal' ? 'cheer' : 'curious';
  const ballsIn = (zone) => balls.filter((ball) => placement[ball.id] === zone);
  const draggingBall = drag && balls.find((ball) => ball.id === drag.id);
  const zoneName = (zone) => (zone === 'both' ? `no meio (${sets.both.label})` : zone === 'out' ? 'fora dos grupos' : `no grupo ${sets[zone].label}`);

  const renderBall = (ball, compact) => (
    <button
      key={ball.id}
      type="button"
      className={`token token--ball ${compact ? 'token--compact' : ''} ${selectedId === ball.id ? 'is-selected' : ''} ${drag?.id === ball.id ? 'is-dragging' : ''}`}
      aria-pressed={selectedId === ball.id}
      aria-label={`${ball.n}, ${COLORS[ball.color].name}, ${zoneName(placement[ball.id])}`}
      disabled={locked}
      onPointerDown={(event) => handlers.onPointerDown(event, ball.id)}
      onPointerMove={handlers.onPointerMove}
      onPointerUp={handlers.onPointerUp}
      onPointerCancel={handlers.onPointerCancel}
      onClick={(event) => handlers.onClick(event, ball.id)}
    >
      <BallFace ball={ball} sets={sets} showHint={showVisualHint} />
    </button>
  );

  return (
    <div className="screen game-screen venn-screen tween-screen">
      <Scene />
      <TopBar onBack={onExit} backLabel="Voltar ao mapa" title={level.name} />

      <div className="game-layout">
        <div className="tween-steps" aria-label={`Missão ${missionIndex + 1} de ${missions.length}`}>
          {missions.map((item, index) => {
            const finished = index < missionIndex || (index === missionIndex && locked);
            return (
              <span key={item.id} className={`tween-step ${finished ? 'is-done' : ''} ${index === missionIndex ? 'is-current' : ''}`}>
                {finished ? <Check size={14} strokeWidth={3.5} /> : index + 1}
              </span>
            );
          })}
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
            {selectedId ? 'Agora toque no lugar certo: um grupo, o meio ou a área de fora.' : 'Arraste cada bolinha ou toque nela para escolher.'}
          </p>
        )}

        <div className="game-board venn-board">
          <div className="venn-wrap">
            <VennDiagram
              ref={vennRef}
              sets={sets}
              over={drag && drag.over !== 'out' ? drag.over : null}
              targetable={Boolean(selectedId)}
              solved={locked}
              onZoneClick={selectedId ? placeSelected : undefined}
              className="tween-venn"
              regions={{
                a: ballsIn('a').map((ball) => renderBall(ball, true)),
                both: ballsIn('both').map((ball) => renderBall(ball, true)),
                b: ballsIn('b').map((ball) => renderBall(ball, true)),
              }}
            />
            {locked && <StarBurst />}
          </div>

          {locked ? (
            <section ref={revealRef} className="tween-reveal" aria-label="Como os matemáticos escrevem">
              <p className="tween-reveal__label">Como os matemáticos escrevem</p>
              {mission.reveal.math.map((line, index) => (
                <p key={line} className={`tween-reveal__math ${index === mission.reveal.math.length - 1 ? 'is-key' : ''}`}>
                  {line}
                </p>
              ))}
              <p className="tween-reveal__note">∩ = interseção: o que está nos dois grupos</p>
            </section>
          ) : (
            <div
              className={`tray ${selectedId && placement[selectedId] !== 'out' ? 'is-target' : ''}`}
              role="button"
              tabIndex={selectedId ? 0 : -1}
              aria-label={`Fora dos grupos. ${ballsIn('out').length} bolinhas aqui.`}
              onClick={() => placeSelected('out')}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  placeSelected('out');
                }
              }}
            >
              <span className="tray__label">
                <LogOut size={18} strokeWidth={2.6} aria-hidden="true" /> {sets.outLabel}
              </span>
              <div className="tray__items">{ballsIn('out').map((ball) => renderBall(ball, false))}</div>
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

      <DragGhost
        drag={drag}
        item={draggingBall}
        compact={placement[drag?.id] !== 'out'}
        highlight={drag && drag.over !== 'out'}
        renderFace={(ball) => <BallFace ball={ball} sets={sets} showHint={showVisualHint} />}
      />

      {stars !== null && <GameFeedback line={feedback.success} onContinue={() => onComplete(stars)} />}
    </div>
  );
}
