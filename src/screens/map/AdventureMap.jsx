import { useMemo, useState } from 'react';
import { UserRound } from 'lucide-react';
import TopBar from '../../components/ui/TopBar.jsx';
import MascotDialogue from '../../components/mascot/MascotDialogue.jsx';
import WorldSection from './WorldSection.jsx';
import LevelInfoPanel from './LevelInfoPanel.jsx';
import { WORLDS, LEVEL_SEQUENCE, findWorld } from '../../config/worlds.js';
import { getAgeGroup, getDifficulty } from '../../config/ageGroups.js';
import { getLevelStatus } from '../../logic/progress.js';
import { NARRATION } from '../../data/narration.js';
import { useGame } from '../../state/GameContext.jsx';
import { sfx } from '../../audio/sfx.js';
import './AdventureMap.css';

function pickInitialLevel(statuses) {
  const available = LEVEL_SEQUENCE.find((level) => statuses[level.id] === 'available');
  if (available) return available.id;
  const lastOpen = [...LEVEL_SEQUENCE].reverse().find((level) => statuses[level.id] !== 'locked');
  return lastOpen?.id ?? LEVEL_SEQUENCE[0].id;
}

export default function AdventureMap({ onHome, onChangeAge, onPlayLevel }) {
  const { profile, profileProgress, totalStars } = useGame();
  const ageGroup = getAgeGroup(profile?.ageGroup);
  const difficulty = getDifficulty(profile?.difficulty);
  const isKids = profile?.ageGroup === '5-8';

  const statuses = useMemo(
    () => Object.fromEntries(LEVEL_SEQUENCE.map((level) => [level.id, getLevelStatus(level.id, profile, profileProgress)])),
    [profile, profileProgress],
  );

  const [selectedLevelId, setSelectedLevelId] = useState(() => pickInitialLevel(statuses));
  const selectedLevel = LEVEL_SEQUENCE.find((level) => level.id === selectedLevelId) ?? null;
  const selectedWorld = selectedLevel ? findWorld(selectedLevel.worldId) : null;

  const hasPlayable = Object.values(statuses).includes('available');
  const guide = !isKids ? NARRATION.mapInDevelopment : hasPlayable ? NARRATION.mapKids : NARRATION.mapKidsDone;

  const panelProps = selectedLevel && {
    level: selectedLevel,
    world: selectedWorld,
    status: statuses[selectedLevel.id],
    stars: profileProgress[selectedLevel.id]?.stars ?? 0,
    profile,
    onPlay: onPlayLevel,
  };

  return (
    <div className="screen map-screen">
      <TopBar onHome={onHome} title="Mapa da Aventura" stars={totalStars}>
        <button type="button" className="profile-chip" onClick={() => { sfx.play('tap'); onChangeAge(); }} title="Trocar faixa etária">
          <UserRound size={20} strokeWidth={2.6} aria-hidden="true" />
          <span className="profile-chip__text">
            {ageGroup?.label}
            {difficulty && <small> · {difficulty.label}</small>}
          </span>
          <span className="sr-only">— trocar faixa etária</span>
        </button>
      </TopBar>

      <div className={`map-layout ${selectedLevel ? 'has-selection' : ''}`}>
        <aside className="map-aside">
          <MascotDialogue line={guide} mood={isKids ? 'happy' : 'encourage'} mascotSize={96} layout="compact" className="map-guide" />
          {panelProps && <LevelInfoPanel {...panelProps} className="level-panel--desktop" />}
        </aside>

        <main className="map-main">
          {!isKids && (
            <div className="map-notice" role="status">
              <strong>Fases em desenvolvimento</strong>
              <span>
                As missões para {ageGroup?.label} ({difficulty?.label}) estão sendo preparadas. Você já pode explorar o mapa!
              </span>
            </div>
          )}
          {WORLDS.map((world) => (
            <WorldSection
              key={world.id}
              world={world}
              statuses={statuses}
              profileProgress={profileProgress}
              selectedLevelId={selectedLevelId}
              onSelectLevel={setSelectedLevelId}
            />
          ))}
        </main>
      </div>

      {panelProps && (
        <div className="map-sheet">
          <LevelInfoPanel {...panelProps} onClose={() => setSelectedLevelId(null)} />
        </div>
      )}
    </div>
  );
}
