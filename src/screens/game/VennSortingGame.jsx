import { useEffect, useRef, useState } from 'react';
import { Check, LogOut, Hand, Apple } from 'lucide-react';
import TopBar from '../../components/ui/TopBar.jsx';
import MascotDialogue from '../../components/mascot/MascotDialogue.jsx';
import GameButton from '../../components/ui/GameButton.jsx';
import StarBurst from '../../components/ui/StarBurst.jsx';
import VennDiagram, { vennZoneAt } from '../../components/ui/VennDiagram.jsx';
import { getLevelScene } from '../../components/scenery/scenes.js';
import AnimalToken from './AnimalToken.jsx';
import GameFeedback from './GameFeedback.jsx';
import { useTokenDrag, DragGhost } from './useTokenDrag.jsx';
import { validateVennPlacement, pickVennHintKey } from '../../logic/validation.js';
import { useGame, useNarration } from '../../state/GameContext.jsx';
import { sfx } from '../../audio/sfx.js';
import './SetSortingGame.css';
import './VennSortingGame.css';

/** Marquinhas da dica visual: bolinha vermelha = grupo A, maçãzinha = grupo B. */
function TraitBadges({ item }) {
  return (
    <span className="trait-badges" aria-hidden="true">
      {item.groups.includes('a') && <span className="trait trait--a" />}
      {item.groups.includes('b') && (
        <span className="trait trait--b">
          <Apple size={12} strokeWidth={3} />
        </span>
      )}
    </span>
  );
}

/**
 * Desafio de interseção: dois grupos que se cruzam.
 * Cada elemento vai para um grupo, para o meio (os dois) ou fica fora.
 */
export default function VennSortingGame({ challenge, level, onExit, onComplete }) {
  const { completeLevel } = useGame();
  const { autoSpeak } = useNarration();
  const { items, feedback, mission, sets } = challenge;
  const Scene = getLevelScene(challenge.scene);

  const [placement, setPlacement] = useState(() => Object.fromEntries(items.map((item) => [item.id, 'out'])));
  const [selectedId, setSelectedId] = useState(null);
  const [status, setStatus] = useState('playing'); // playing | hint | success
  const [hintKey, setHintKey] = useState(null);
  const [hintCount, setHintCount] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showVisualHint, setShowVisualHint] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const vennRef = useRef(null);
  const locked = status === 'success';

  useEffect(() => {
    autoSpeak(mission);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (status !== 'success') return undefined;
    const timer = setTimeout(() => setShowFeedback(true), 1100);
    return () => clearTimeout(timer);
  }, [status]);

  const moveItem = (id, zone) => {
    setPlacement((current) => (current[id] === zone ? current : { ...current, [id]: zone }));
  };

  const zoneName = (zone) =>
    zone === 'both' ? `no meio (${sets.both.label})` : zone === 'out' ? sets.outLabel.toLowerCase() : `no grupo ${sets[zone].label}`;

  const { drag, handlers } = useTokenDrag({
    disabled: locked,
    // Fora dos círculos (em qualquer lugar da tela) = fora dos grupos. Nada se perde.
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
      const item = items.find((candidate) => candidate.id === id);
      autoSpeak({ id: `item.${id}`, text: item.name });
    },
  });

  // Alternativa ao arrastar: com um elemento escolhido, tocar no lugar.
  const placeSelected = (zone) => {
    if (!selectedId || locked) return;
    moveItem(selectedId, zone);
    sfx.play('drop');
    setSelectedId(null);
  };

  const handleVerify = () => {
    setSelectedId(null);
    const result = validateVennPlacement(items, placement);
    if (result.correct) {
      setStatus('success');
      sfx.play('success');
      completeLevel(level.id, 3);
      autoSpeak(feedback.success);
      return;
    }
    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);
    let key = pickVennHintKey(result);
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

  const renderToken = (item, compact) => (
    <AnimalToken
      key={item.id}
      item={item}
      location={placement[item.id]}
      locationLabel={zoneName(placement[item.id])}
      selected={selectedId === item.id}
      dragging={drag?.id === item.id}
      disabled={locked}
      handlers={handlers}
      compact={compact}
    >
      {showVisualHint && <TraitBadges item={item} />}
    </AnimalToken>
  );

  const itemsIn = (zone) => items.filter((item) => placement[item.id] === zone);
  const draggingItem = drag && items.find((item) => item.id === drag.id);

  return (
    <div className="screen game-screen venn-screen">
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
          className="game-dialogue"
        />

        <p className={`game-tip ${selectedId ? 'is-active' : ''}`} aria-live="polite">
          <Hand size={18} strokeWidth={2.6} aria-hidden="true" />
          {selectedId ? 'Agora toque no lugar certo: um grupo, o meio ou a área de fora.' : 'Arraste cada coisa ou toque nela para escolher.'}
        </p>

        <div className="game-board venn-board">
          <div className="venn-wrap">
            <VennDiagram
              ref={vennRef}
              sets={sets}
              over={drag && drag.over !== 'out' ? drag.over : null}
              targetable={Boolean(selectedId)}
              solved={locked}
              onZoneClick={selectedId ? placeSelected : undefined}
              regions={{
                a: itemsIn('a').map((item) => renderToken(item, true)),
                both: itemsIn('both').map((item) => renderToken(item, true)),
                b: itemsIn('b').map((item) => renderToken(item, true)),
              }}
            />
            {locked && <StarBurst />}
          </div>

          <div
            className={`tray ${selectedId && placement[selectedId] !== 'out' ? 'is-target' : ''}`}
            role="button"
            tabIndex={selectedId ? 0 : -1}
            aria-label={`${sets.outLabel}. ${itemsIn('out').length} elementos aqui.${selectedId ? ' Toque para deixar o elemento escolhido fora dos grupos.' : ''}`}
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
            <div className="tray__items">{itemsIn('out').map((item) => renderToken(item, false))}</div>
          </div>
        </div>

        <div className="game-actions">
          <GameButton variant="green" size="lg" icon={Check} onClick={handleVerify} disabled={locked} sound={null}>
            Verificar
          </GameButton>
        </div>
      </div>

      <DragGhost drag={drag} item={draggingItem} compact={placement[drag?.id] !== 'out'} highlight={drag && drag.over !== 'out'}>
        {showVisualHint && draggingItem && <TraitBadges item={draggingItem} />}
      </DragGhost>

      {showFeedback && <GameFeedback line={feedback.success} onContinue={onComplete} />}
    </div>
  );
}
