import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import TopBar from '../../../components/ui/TopBar.jsx';
import MascotDialogue from '../../../components/mascot/MascotDialogue.jsx';
import Portal from '../../../components/ui/Portal.jsx';
import VennDiagram from '../../../components/ui/VennDiagram.jsx';
import StarBurst from '../../../components/ui/StarBurst.jsx';
import GameButton from '../../../components/ui/GameButton.jsx';
import { getLevelScene } from '../../../components/scenery/scenes.js';
import GameFeedback from '../GameFeedback.jsx';
import { generateTweenUnion } from '../../../data/tween/unionBalls.js';
import { COLORS } from '../../../data/tween/colorSets.js';
import { starsFromErrors } from '../../../logic/scoring.js';
import { useGame, useNarration } from '../../../state/GameContext.jsx';
import { sfx } from '../../../audio/sfx.js';
import '../UnionCatchGame.css';
import './tween.css';

const RISE_SECONDS = 7; // tempo para uma bolha atravessar a tela
const IDLE_HINT_MS = 12000; // dica se o jogador ficar um tempo sem tocar
const STATIC_SWAP_MS = 6000; // movimento reduzido: as bolhas paradas vão sendo trocadas

const laneCount = () => (window.matchMedia('(max-width: 600px)').matches ? 3 : 4);
const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const regionOf = (ball) => (ball.groups.length === 2 ? 'both' : ball.groups[0] ?? 'out');

/**
 * O Portal do OU para 9 a 12 anos: as bolhas da fase 4 do 5–8, agora com bolinhas numeradas.
 * O jogador estoura as bolhas de quem está em A OU em B; cada acerto acende o portal.
 * Duas missões; ao terminar cada uma, aparece a união escrita com ∪ (e a interseção, para comparar).
 */
export default function TweenUnionGame({ challenge, level, onExit, onComplete }) {
  const { profile, completeLevel } = useGame();
  const { autoSpeak } = useNarration();
  const difficultyId = profile?.difficulty ?? 'easy';
  const Scene = getLevelScene(challenge.scene);
  const { feedback } = challenge;

  const missions = useMemo(() => generateTweenUnion(difficultyId), [difficultyId]);
  const [missionIndex, setMissionIndex] = useState(0);
  const mission = missions[missionIndex];
  const { balls, sets } = mission;
  const unionBalls = balls.filter((ball) => ball.groups.length > 0);
  const lastMission = missionIndex === missions.length - 1;
  const missionLine = useMemo(() => ({ id: `t9.f4.${mission.id}`, text: mission.text }), [mission]);

  const [lanes, setLanesState] = useState([]);
  const [collected, setCollected] = useState([]);
  const [line, setLine] = useState(missionLine);
  const [lineCount, setLineCount] = useState(0);
  const [mood, setMood] = useState('curious');
  const [tone, setTone] = useState('default');
  const [wrongStreak, setWrongStreak] = useState(0); // erros seguidos desde o último acerto
  const [showVisualHint, setShowVisualHint] = useState(false);
  const [status, setStatus] = useState('playing'); // playing | reveal
  const [errors, setErrors] = useState(0);
  const [stars, setStars] = useState(null);
  const [portalPulse, setPortalPulse] = useState(0);

  const lanesRef = useRef([]);
  const queueRef = useRef([]);
  const collectedRef = useRef([]);
  const keyRef = useRef(0);
  const statusRef = useRef('playing');
  const idleTimerRef = useRef(null);
  const revealRef = useRef(null);
  const reducedMotion = useRef(prefersReducedMotion()).current;

  const setLanes = (next) => {
    lanesRef.current = next;
    setLanesState(next);
  };

  const say = useCallback(
    (nextLine, nextMood = 'curious', nextTone = 'default') => {
      setLine(nextLine);
      setMood(nextMood);
      setTone(nextTone);
      setLineCount((count) => count + 1);
      autoSpeak(nextLine);
    },
    [autoSpeak],
  );

  // Próxima bolinha da fila que ainda não está na tela nem passou pelo portal (a fila gira).
  const takeNext = (currentLanes) => {
    const onScreen = new Set(currentLanes.filter(Boolean).map((lane) => lane.id));
    const queue = queueRef.current;
    const index = queue.findIndex((id) => !onScreen.has(id) && !collectedRef.current.includes(id));
    if (index === -1) return null;
    const [id] = queue.splice(index, 1);
    queue.push(id);
    return id;
  };

  const respawn = (laneIndex, delay = 0) => {
    if (statusRef.current !== 'playing') return;
    const next = [...lanesRef.current];
    next[laneIndex] = null;
    const id = takeNext(next);
    next[laneIndex] = id ? { key: ++keyRef.current, id, state: 'rising', delay } : null;
    setLanes(next);
  };

  const resetIdleTimer = () => {
    clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      if (statusRef.current === 'playing') say(feedback.idle, 'encourage', 'hint');
    }, IDLE_HINT_MS);
  };

  // Começo de cada missão: fala do Pipo e bolhas entrando uma de cada vez.
  useEffect(() => {
    queueRef.current = balls.map((ball) => ball.id);
    collectedRef.current = [];
    statusRef.current = 'playing';
    setCollected([]);
    setStatus('playing');
    setWrongStreak(0);
    setShowVisualHint(false);
    say(missionLine);
    const count = laneCount();
    const initial = [];
    for (let index = 0; index < count; index += 1) {
      const id = takeNext(initial);
      initial.push(id ? { key: ++keyRef.current, id, state: 'rising', delay: index * (RISE_SECONDS / count) } : null);
    }
    setLanes(initial);
    resetIdleTimer();
    return () => clearTimeout(idleTimerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [missionIndex]);

  useEffect(() => {
    if (!reducedMotion) return undefined;
    const timer = setInterval(() => {
      lanesRef.current.forEach((lane, index) => {
        if (lane?.state === 'rising') respawn(index);
      });
    }, STATIC_SWAP_MS);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (status === 'reveal') revealRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [status]);

  const updateLane = (laneIndex, key, changes) => {
    const lane = lanesRef.current[laneIndex];
    if (!lane || lane.key !== key) return;
    const next = [...lanesRef.current];
    next[laneIndex] = { ...lane, ...changes };
    setLanes(next);
  };

  const handleBubbleTap = (laneIndex) => {
    const lane = lanesRef.current[laneIndex];
    if (!lane || lane.state !== 'rising' || statusRef.current !== 'playing') return;
    resetIdleTimer();
    const ball = balls.find((item) => item.id === lane.id);

    if (ball.groups.length) {
      // Acerto: só o som. O brilho dourado some e a contagem de erros recomeça.
      setWrongStreak(0);
      setShowVisualHint(false);
      sfx.play('correct');
      sfx.play('whoosh');
      updateLane(laneIndex, lane.key, { state: 'pop' });
      const nextCollected = [...collectedRef.current, ball.id];
      collectedRef.current = nextCollected;
      setCollected(nextCollected);
      setPortalPulse((count) => count + 1);

      if (nextCollected.length === unionBalls.length) {
        statusRef.current = 'reveal';
        setStatus('reveal');
        clearTimeout(idleTimerRef.current);
        sfx.play('success');
        say({ id: `t9.f4.${mission.id}.reveal`, text: mission.reveal.text }, 'cheer', 'success');
        return;
      }
      setLine(missionLine);
      setMood('curious');
      setTone('default');
      setTimeout(() => respawn(laneIndex), 450);
      return;
    }

    sfx.play('tryAgain');
    updateLane(laneIndex, lane.key, { state: 'nope' });
    setTimeout(() => updateLane(laneIndex, lane.key, { state: 'rising' }), 700);
    setErrors((count) => count + 1);
    const mistakes = wrongStreak + 1;
    setWrongStreak(mistakes);
    if (mistakes === challenge.visualHintAfter) {
      setShowVisualHint(true);
      say(feedback.visualHint, 'encourage', 'hint');
    } else {
      say({ id: `t9.f4.nope.${ball.id}`, text: ball.nope }, 'encourage', 'hint');
    }
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
  };

  // Vagas no diagrama: cada bolinha que passa aparece na sua parte.
  const slots = (zone) =>
    unionBalls
      .filter((ball) => regionOf(ball) === zone)
      .map((ball) =>
        collected.includes(ball.id) ? (
          <span key={ball.id} className="union-slot is-filled tween-slot">
            <span className={`num-ball num-ball--${ball.color}`}>{ball.n}</span>
          </span>
        ) : (
          <span key={ball.id} className="union-slot" aria-label="vaga vazia" />
        ),
      );

  const done = status === 'reveal';

  return (
    <div className="screen game-screen union-screen tween-screen">
      <Scene />
      <TopBar onBack={onExit} backLabel="Voltar ao mapa" title={level.name} />

      <div className="game-layout union-layout">
        <div className="tween-steps" aria-label={`Missão ${missionIndex + 1} de ${missions.length}`}>
          {missions.map((item, index) => {
            const finished = index < missionIndex || (index === missionIndex && done);
            return (
              <span key={item.id} className={`tween-step ${finished ? 'is-done' : ''} ${index === missionIndex ? 'is-current' : ''}`}>
                {finished ? <Check size={14} strokeWidth={3.5} /> : index + 1}
              </span>
            );
          })}
        </div>

        <MascotDialogue line={line} bubbleKey={`${line.id}-${lineCount}`} mood={mood} mascotSize={84} layout="compact" tone={tone} className="game-dialogue" />

        <div className="union-board">
          <section className="union-panel" aria-label={`Portal: ${collected.length} de ${unionBalls.length} bolinhas passaram`}>
            <div className="union-portal-wrap">
              <Portal key={`${missionIndex}-${portalPulse}`} total={unionBalls.length} lit={collected.length} open={done} pulse={portalPulse > 0} />
              {done && <StarBurst />}
            </div>
            <div className="union-venn">
              <VennDiagram small sets={sets} regions={{ a: slots('a'), both: slots('both'), b: slots('b') }} />
              <p className="union-venn__caption">
                {mission.caption}: tudo que está nos círculos
              </p>
            </div>
          </section>

          {done ? (
            <section ref={revealRef} className="tween-reveal" aria-label="Como os matemáticos escrevem">
              <p className="tween-reveal__label">Como os matemáticos escrevem</p>
              {mission.reveal.math.map((text, index) => (
                <p key={text} className={`tween-reveal__math ${index === 2 ? 'is-key' : ''} ${index === 3 ? 'is-compare' : ''}`}>
                  {text}
                </p>
              ))}
              <p className="tween-reveal__note">∪ = união: está em pelo menos um dos grupos · ∩ = interseção: está nos dois</p>
              <GameButton variant="green" size="lg" iconRight={ArrowRight} onClick={goNext} sound={null}>
                {lastMission ? 'Terminar' : 'Próxima missão'}
              </GameButton>
            </section>
          ) : (
            <section className={`bubble-field ${reducedMotion ? 'is-static' : ''}`} aria-label="Bolhas mágicas">
              {lanes.map((lane, index) => {
                if (!lane) return null;
                const ball = balls.find((item) => item.id === lane.id);
                const hinted = showVisualHint && ball.groups.length > 0;
                return (
                  <button
                    key={lane.key}
                    type="button"
                    className={`bubble is-${lane.state} ${hinted ? 'is-hinted' : ''}`}
                    style={{
                      left: `${((index + 0.5) / lanes.length) * 100}%`,
                      animationDuration: `${RISE_SECONDS + (index % 2)}s`,
                      animationDelay: `${lane.delay ?? 0}s`,
                    }}
                    onAnimationEnd={(event) => {
                      if (event.animationName === 'bubble-rise') respawn(index);
                    }}
                    onClick={() => handleBubbleTap(index)}
                    disabled={lane.state === 'pop'}
                    aria-label={`Bolha com o ${ball.n}, ${COLORS[ball.color].name}`}
                  >
                    <span className="bubble__inner">
                      <span className={`num-ball num-ball--${ball.color} bubble-ball`}>{ball.n}</span>
                    </span>
                  </button>
                );
              })}
            </section>
          )}
        </div>
      </div>

      {stars !== null && <GameFeedback line={feedback.success} onContinue={() => onComplete(stars)} />}
    </div>
  );
}
