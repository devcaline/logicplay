import { useCallback, useEffect, useRef, useState } from 'react';
import { Check, Waves, LogOut, Hand } from 'lucide-react';
import TopBar from '../../components/ui/TopBar.jsx';
import MascotDialogue from '../../components/mascot/MascotDialogue.jsx';
import GameButton from '../../components/ui/GameButton.jsx';
import StarBurst from '../../components/ui/StarBurst.jsx';
import { getLevelScene } from '../../components/scenery/scenes.js';
import AnimalToken from './AnimalToken.jsx';
import { useTokenDrag, DragGhost } from './useTokenDrag.jsx';
import GameFeedback from './GameFeedback.jsx';
import { validateSetPlacement, pickHintKey } from '../../logic/validation.js';
import { useGame, useNarration } from '../../state/GameContext.jsx';
import { sfx } from '../../audio/sfx.js';
import './SetSortingGame.css';

const DROP_MARGIN = 32; // folga ao redor do círculo: não exige precisão

function initialPlacement(items) {
  return Object.fromEntries(items.map((item) => [item.id, 'out']));
}

export default function SetSortingGame({ challenge, level, onExit, onComplete }) {
  const { completeLevel } = useGame();
  const { autoSpeak } = useNarration();
  const { items, feedback, mission } = challenge;

  const [placement, setPlacement] = useState(() => initialPlacement(items));
  const [selectedId, setSelectedId] = useState(null);
  const [status, setStatus] = useState('playing'); // playing | hint | success
  const [hintKey, setHintKey] = useState(null);
  const [hintCount, setHintCount] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showVisualHint, setShowVisualHint] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const setZoneRef = useRef(null);
  const locked = status === 'success';
  const Scene = getLevelScene(challenge.scene);

  // Narra a missão ao entrar na fase (o jogador acabou de tocar em um botão).
  useEffect(() => {
    autoSpeak(mission);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (status !== 'success') return undefined;
    const timer = setTimeout(() => setShowFeedback(true), 1100);
    return () => clearTimeout(timer);
  }, [status]);

  const isOverSet = useCallback((x, y) => {
    const zone = setZoneRef.current;
    if (!zone) return false;
    const rect = zone.getBoundingClientRect();
    return (
      x >= rect.left - DROP_MARGIN && x <= rect.right + DROP_MARGIN && y >= rect.top - DROP_MARGIN && y <= rect.bottom + DROP_MARGIN
    );
  }, []);

  const moveItem = useCallback((id, location) => {
    setPlacement((current) => (current[id] === location ? current : { ...current, [id]: location }));
  }, []);

  // ---------- Arrastar e soltar (Pointer Events: mouse, toque e caneta) ----------
  const { drag, handlers } = useTokenDrag({
    disabled: locked,
    // Soltou sobre o círculo: entra. Em qualquer outro lugar: fica fora (nunca se perde).
    zoneAt: (x, y) => (isOverSet(x, y) ? 'in' : 'out'),
    onDragStart: () => {
      setSelectedId(null);
      sfx.play('pick');
    },
    onDrop: (id, zone) => {
      moveItem(id, zone);
      sfx.play('drop');
    },
    // Toque/clique simples ou teclado (Enter/Espaço): seleciona o animal.
    onTap: (id) => {
      if (selectedId === id) {
        sfx.play('tap');
        setSelectedId(null);
        return;
      }
      sfx.play('pick');
      setSelectedId(id);
      const item = items.find((candidate) => candidate.id === id);
      autoSpeak({ id: `item.${id}`, text: item.name });
    },
  });

  // Alternativa acessível: com um animal selecionado, tocar no destino.
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
    const result = validateSetPlacement(items, placement);
    if (result.correct) {
      setStatus('success');
      sfx.play('success');
      completeLevel(level.id, 3);
      autoSpeak(feedback.success);
      return;
    }
    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);
    let key = pickHintKey(result);
    if (!result.empty && nextAttempts >= challenge.visualHintAfter && !showVisualHint) {
      setShowVisualHint(true);
      key = 'visualHint';
    }
    sfx.play('tryAgain');
    setHintKey(key);
    setHintCount((count) => count + 1);
    setStatus('hint');
    autoSpeak(feedback[key]);
  };

  const dialogueLine = status === 'hint' ? feedback[hintKey] : status === 'success' ? feedback.success : mission;
  const dialogueMood = status === 'hint' ? 'encourage' : status === 'success' ? 'cheer' : 'curious';
  const inside = items.filter((item) => placement[item.id] === 'in');
  const outside = items.filter((item) => placement[item.id] !== 'in');
  const draggingItem = drag && items.find((item) => item.id === drag.id);

  const renderToken = (item) => (
    <AnimalToken
      key={item.id}
      item={item}
      location={placement[item.id]}
      selected={selectedId === item.id}
      dragging={drag?.id === item.id}
      showHint={showVisualHint && item.belongs}
      disabled={locked}
      handlers={handlers}
    />
  );

  return (
    <div className="screen game-screen">
      <Scene />
      <TopBar onBack={onExit} backLabel="Voltar ao mapa" title={level.name} />

      <div className="game-layout">
        <MascotDialogue
          line={dialogueLine}
          bubbleKey={`${dialogueLine.id}-${hintCount}`}
          mood={dialogueMood}
          mascotSize={84}
          layout="compact"
          tone={status === 'hint' ? 'hint' : status === 'success' ? 'success' : 'default'}
          className={`game-dialogue ${locked ? 'is-hidden' : ''}`}
        />

        <p className={`game-tip ${selectedId ? 'is-active' : ''}`} aria-live="polite">
          <Hand size={18} strokeWidth={2.6} aria-hidden="true" />
          {selectedId
            ? 'Agora toque no círculo ou na área de fora para levar o animal.'
            : 'Arraste os animais ou toque em um deles para escolher.'}
        </p>

        <div className="game-board">
          <div
            ref={setZoneRef}
            className={`set-zone ${drag?.over === 'in' ? 'is-over' : ''} ${selectedId ? 'is-target' : ''} ${locked ? 'is-solved' : ''}`}
            role="button"
            tabIndex={selectedId ? 0 : -1}
            aria-label={`Círculo do conjunto: ${challenge.set.label}. ${inside.length} animais dentro.${selectedId ? ' Toque para colocar o animal escolhido aqui.' : ''}`}
            onClick={() => handleZoneActivate('in')}
            onKeyDown={zoneKeyDown('in')}
          >
            <span className="set-zone__label">
              <Waves size={20} strokeWidth={2.8} aria-hidden="true" /> {challenge.set.label}
            </span>
            <div className="set-zone__items">{inside.map(renderToken)}</div>
            {inside.length === 0 && <span className="set-zone__empty">Solte aqui</span>}
            {locked && <StarBurst />}
          </div>

          <div
            className={`tray ${selectedId && placement[selectedId] === 'in' ? 'is-target' : ''}`}
            role="button"
            tabIndex={selectedId ? 0 : -1}
            aria-label={`Fora do conjunto. ${outside.length} animais aqui.${selectedId ? ' Toque para deixar o animal escolhido fora do círculo.' : ''}`}
            onClick={() => handleZoneActivate('out')}
            onKeyDown={zoneKeyDown('out')}
          >
            <span className="tray__label">
              <LogOut size={18} strokeWidth={2.6} aria-hidden="true" /> Fora do círculo
            </span>
            <div className="tray__items">{outside.map(renderToken)}</div>
          </div>
        </div>

        <div className="game-actions">
          <GameButton variant="green" size="lg" icon={Check} onClick={handleVerify} disabled={locked} sound={null}>
            Verificar
          </GameButton>
        </div>
      </div>

      <DragGhost drag={drag} item={draggingItem} showHint={showVisualHint && draggingItem?.belongs} highlight={drag?.over === 'in'} />

      {showFeedback && <GameFeedback line={feedback.success} onContinue={onComplete} />}
    </div>
  );
}
