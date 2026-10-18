import { useCallback, useState } from 'react';
import { GameProvider, useGame } from './state/GameContext.jsx';
import HomeScreen from './screens/HomeScreen.jsx';
import AgeSelection from './screens/AgeSelection.jsx';
import DifficultySelection from './screens/DifficultySelection.jsx';
import AdventureMap from './screens/map/AdventureMap.jsx';
import LevelIntro from './screens/LevelIntro.jsx';
import SetSortingGame from './screens/game/SetSortingGame.jsx';
import MembershipGame from './screens/game/MembershipGame.jsx';
import VennSortingGame from './screens/game/VennSortingGame.jsx';
import LevelComplete from './screens/LevelComplete.jsx';
import { getAgeGroup, isProfileComplete } from './config/ageGroups.js';
import { findLevel, LEVEL_SEQUENCE } from './config/worlds.js';
import { getChallenge } from './data/challenges.js';
import { getChallengeIdFor, getLevelStatus } from './logic/progress.js';
import { narrator } from './audio/narrator.js';

/** Tipos de desafio → componente que joga esse tipo. Novos tipos entram aqui. */
const GAME_COMPONENTS = {
  'set-sorting': SetSortingGame,
  membership: MembershipGame,
  'venn-sorting': VennSortingGame,
};

function Router() {
  const { profile, profileProgress, setProfile } = useGame();
  const [route, setRoute] = useState({ name: 'home' });
  const [pendingAge, setPendingAge] = useState(null);

  const go = useCallback((name, params = {}) => {
    narrator.stop();
    setRoute({ name, ...params });
    window.scrollTo({ top: 0 });
  }, []);

  const goHome = () => go('home');
  const goMap = () => go('map');

  const handleSelectAge = (ageGroupId) => {
    const group = getAgeGroup(ageGroupId);
    if (group.requiresDifficulty) {
      // O perfil só é salvo depois de escolher a dificuldade.
      setPendingAge(ageGroupId);
      go('difficulty');
    } else {
      setProfile({ ageGroup: ageGroupId, difficulty: null });
      go('map');
    }
  };

  const handleSelectDifficulty = (difficultyId) => {
    setProfile({ ageGroup: pendingAge, difficulty: difficultyId });
    go('map');
  };

  // ---------- Proteções de navegação ----------
  let screen = route.name;
  let level = null;
  let challenge = null;

  if (screen === 'difficulty' && !getAgeGroup(pendingAge)?.requiresDifficulty) screen = 'age';
  if (['map', 'intro', 'game', 'complete'].includes(screen) && !isProfileComplete(profile)) screen = 'age';

  if (['intro', 'game', 'complete'].includes(screen)) {
    level = findLevel(route.levelId);
    challenge = level ? getChallenge(getChallengeIdFor(level, profile)) : null;
    const status = level ? getLevelStatus(level.id, profile, profileProgress) : 'locked';
    // Só joga quem tem conteúdo para a própria faixa etária e com a fase liberada.
    if (!challenge || (status !== 'available' && status !== 'completed')) screen = 'map';
  }

  switch (screen) {
    case 'age':
      return <AgeSelection onSelect={handleSelectAge} onHome={goHome} />;
    case 'difficulty':
      return (
        <DifficultySelection ageGroupId={pendingAge} onSelect={handleSelectDifficulty} onBack={() => go('age')} onHome={goHome} />
      );
    case 'map':
      return <AdventureMap onHome={goHome} onChangeAge={() => go('age')} onPlayLevel={(levelId) => go('intro', { levelId })} />;
    case 'intro':
      return <LevelIntro challenge={challenge} level={level} onBack={goMap} onStart={() => go('game', { levelId: level.id, run: Date.now() })} />;
    case 'game': {
      const Game = GAME_COMPONENTS[challenge.type];
      return (
        <Game
          key={route.run}
          challenge={challenge}
          level={level}
          onExit={goMap}
          onComplete={() => go('complete', { levelId: level.id })}
        />
      );
    }
    case 'complete': {
      const nextLevel = LEVEL_SEQUENCE[LEVEL_SEQUENCE.findIndex((candidate) => candidate.id === level.id) + 1];
      const nextStatus = nextLevel ? getLevelStatus(nextLevel.id, profile, profileProgress) : 'locked';
      const nextPlayable = nextStatus === 'available' || nextStatus === 'completed';
      return (
        <LevelComplete
          challenge={challenge}
          stars={profileProgress[level.id]?.stars ?? 3}
          onMap={goMap}
          onReplay={() => go('game', { levelId: level.id, run: Date.now() })}
          nextLevel={nextLevel}
          onNext={nextPlayable ? () => go('intro', { levelId: nextLevel.id }) : null}
        />
      );
    }
    default:
      return <HomeScreen onStart={() => go('age')} onContinue={goMap} />;
  }
}

export default function App() {
  return (
    <GameProvider>
      <Router />
    </GameProvider>
  );
}
