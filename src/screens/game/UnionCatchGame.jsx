import { useCallback, useEffect, useRef, useState } from 'react';
import TopBar from '../../components/ui/TopBar.jsx';
import MascotDialogue from '../../components/mascot/MascotDialogue.jsx';
import Portal from '../../components/ui/Portal.jsx';
import VennDiagram from '../../components/ui/VennDiagram.jsx';
import StarBurst from '../../components/ui/StarBurst.jsx';
import ItemArt from '../../components/art/ItemArt.jsx';
import { getLevelScene } from '../../components/scenery/scenes.js';
import GameFeedback from './GameFeedback.jsx';
import { isInUnion, expectedVennZone } from '../../logic/validation.js';
import { useGame, useNarration } from '../../state/GameContext.jsx';
import { sfx } from '../../audio/sfx.js';
import './UnionCatchGame.css';

const RISE_SECONDS = 7; // tempo para uma bolha atravessar a tela
const IDLE_HINT_MS = 12000; // dica se a criança ficar um tempo sem tocar
const STATIC_SWAP_MS = 6000; // sem animação (movimento reduzido): troca as bolhas paradas

function getLaneCount() {
  return window.matchMedia('(max-width: 600px)').matches ? 3 : 4;
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Desafio de união (A OU B): bolhas com elementos sobem pela tela e a criança
 * estoura as que pertencem a pelo menos um dos grupos. Cada acerto acende o portal.
 */
export default function UnionCatchGame({ challenge, level, onExit, onComplete }) {
  const { completeLevel } = useGame();
  const { autoSpeak } = useNarration();
  const { items, feedback, mission, sets } = challenge;
  const Scene = getLevelScene(challenge.scene);
  const unionItems = items.filter(isInUnion);

  const [lanes, setLanesState] = useState([]);
  const [collected, setCollected] = useState([]);
  const [line, setLine] = useState(mission);
  const [lineCount, setLineCount] = useState(0);
  const [mood, setMood] = useState('curious');
  const [tone, setTone] = useState('default');
  const [wrongStreak, setWrongStreak] = useState(0); // erros seguidos desde o último acerto
  const [showVisualHint, setShowVisualHint] = useState(false);
  const [status, setStatus] = useState('playing'); // playing | success
  const [showFeedback, setShowFeedback] = useState(false);
  const [portalPulse, setPortalPulse] = useState(0);

  const lanesRef = useRef([]);
  const queueRef = useRef(items.map((item) => item.id));
  const collectedRef = useRef([]);
  const keyRef = useRef(0);
  const statusRef = useRef('playing');
  const idleTimerRef = useRef(null);
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

  // Próximo elemento da fila que ainda não está na tela nem foi coletado (a fila gira).
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

  // Começo: missão narrada e bolhas entrando uma de cada vez.
  useEffect(() => {
    autoSpeak(mission);
    const count = getLaneCount();
    const initial = [];
    for (let index = 0; index < count; index += 1) {
      const id = takeNext(initial);
      initial.push(id ? { key: ++keyRef.current, id, state: 'rising', delay: index * (RISE_SECONDS / count) } : null);
    }
    setLanes(initial);
    resetIdleTimer();
    return () => clearTimeout(idleTimerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Movimento reduzido: as bolhas ficam paradas e vão sendo trocadas de tempos em tempos.
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
    if (status !== 'success') return undefined;
    const timer = setTimeout(() => setShowFeedback(true), 1600);
    return () => clearTimeout(timer);
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
    const item = items.find((candidate) => candidate.id === lane.id);

    if (isInUnion(item)) {
      // Acertou: o brilho dourado some e a contagem de erros recomeça.
      setWrongStreak(0);
      setShowVisualHint(false);
      sfx.play('correct');
      sfx.play('whoosh');
      updateLane(laneIndex, lane.key, { state: 'pop' });
      const nextCollected = [...collectedRef.current, item.id];
      collectedRef.current = nextCollected;
      setCollected(nextCollected);
      setPortalPulse((count) => count + 1);

      if (nextCollected.length === unionItems.length) {
        statusRef.current = 'success';
        setStatus('success');
        clearTimeout(idleTimerRef.current);
        sfx.play('success');
        completeLevel(level.id, 3);
        say(feedback.success, 'cheer', 'success');
        return;
      }
      // Acerto: só o som positivo. Se havia uma dica no balão, ele volta à missão em silêncio.
      setLine(mission);
      setMood('curious');
      setTone('default');
      setTimeout(() => respawn(laneIndex), 450);
      return;
    }

    // Não pertence: a bolha balança e continua subindo.
    sfx.play('tryAgain');
    updateLane(laneIndex, lane.key, { state: 'nope' });
    setTimeout(() => updateLane(laneIndex, lane.key, { state: 'rising' }), 700);
    const mistakes = wrongStreak + 1;
    setWrongStreak(mistakes);
    if (mistakes === challenge.visualHintAfter) {
      setShowVisualHint(true);
      say(feedback.visualHint, 'encourage', 'hint');
    } else {
      say(item.nope, 'encourage', 'hint');
    }
  };

  // Vagas no diagrama: cada elemento coletado aparece na sua parte (só vermelho, os dois, só fruta).
  const slots = (zone) =>
    unionItems
      .filter((item) => expectedVennZone(item) === zone)
      .map((item) =>
        collected.includes(item.id) ? (
          <span key={item.id} className="union-slot is-filled" title={item.name}>
            <ItemArt id={item.id} size={40} />
            <span className="sr-only">{item.name}</span>
          </span>
        ) : (
          <span key={item.id} className="union-slot" aria-label="vaga vazia" />
        ),
      );

  const done = status === 'success';

  return (
    <div className="screen game-screen union-screen">
      <Scene />
      <TopBar onBack={onExit} backLabel="Voltar ao mapa" title={level.name} />

      <div className="game-layout union-layout">
        <MascotDialogue
          line={line}
          bubbleKey={`${line.id}-${lineCount}`}
          mood={mood}
          mascotSize={84}
          layout="compact"
          tone={tone}
          className={`game-dialogue ${status === 'success' ? 'is-hidden' : ''}`}
        />

        <div className="union-board">
          <section className="union-panel" aria-label={`Portal: ${collected.length} de ${unionItems.length} elementos passaram`}>
            <div className="union-portal-wrap">
              <Portal key={portalPulse} total={unionItems.length} lit={collected.length} open={done} pulse={portalPulse > 0} />
              {done && <StarBurst />}
            </div>
            <div className="union-venn">
              <VennDiagram small sets={sets} regions={{ a: slots('a'), both: slots('both'), b: slots('b') }} />
              <p className="union-venn__caption">
                {sets.a.label} <strong>OU</strong> {sets.b.label.toLowerCase()}: tudo que está nos círculos
              </p>
            </div>
          </section>

          <section className={`bubble-field ${reducedMotion ? 'is-static' : ''} ${done ? 'is-done' : ''}`} aria-label="Bolhas mágicas">
            {lanes.map((lane, index) => {
              if (!lane) return null;
              const item = items.find((candidate) => candidate.id === lane.id);
              const hinted = showVisualHint && isInUnion(item);
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
                  disabled={done || lane.state === 'pop'}
                  aria-label={`Bolha com ${item.name}`}
                >
                  <span className="bubble__inner">
                    <ItemArt id={item.id} size={56} />
                    <span className="bubble__name">{item.name}</span>
                  </span>
                </button>
              );
            })}
          </section>
        </div>
      </div>

      {showFeedback && <GameFeedback line={feedback.success} onContinue={onComplete} />}
    </div>
  );
}
