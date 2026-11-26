import { Component, Suspense, lazy } from 'react';
import { RotateCcw, Map as MapIcon } from 'lucide-react';
import Mascot from '../../components/mascot/Mascot.jsx';
import GameButton from '../../components/ui/GameButton.jsx';
// Base comum a todas as telas de jogo (camadas, rodapé, feedback). Fica aqui porque as fases
// carregam sob demanda: sem isso, abrir uma fase sem ter aberto a primeira deixava o cenário por cima.
import './SetSortingGame.css';
import './GameScreen.css';

/**
 * Tipos de desafio → tela que joga esse tipo. Novos tipos entram aqui.
 *
 * Cada tela vira um arquivo separado no build: o navegador só baixa o jogo da fase
 * que a pessoa abriu, e já começa a baixar enquanto ela lê a introdução (preloadGame).
 */
const GAME_IMPORTS = {
  'set-sorting': () => import('./SetSortingGame.jsx'),
  membership: () => import('./MembershipGame.jsx'),
  'venn-sorting': () => import('./VennSortingGame.jsx'),
  'union-catch': () => import('./UnionCatchGame.jsx'),
  'guardian-quiz': () => import('./GuardianQuizGame.jsx'),
  'truth-lights': () => import('./TruthLightsGame.jsx'),
  'gate-machines': () => import('./GateMachinesGame.jsx'),
  'lever-machine': () => import('./LeverMachineGame.jsx'),
  'not-mirror': () => import('./NotMirrorGame.jsx'),
  'master-table': () => import('./MasterTableGame.jsx'),
  'set-builder': () => import('./teen/SetBuilderGame.jsx'),
  'set-membership': () => import('./teen/SetMembershipGame.jsx'),
  'set-intersection': () => import('./teen/IntersectionGame.jsx'),
  'set-union': () => import('./teen/UnionGame.jsx'),
  'teen-guardian': () => import('./teen/TeenGuardianGame.jsx'),
  'teen-propositions': () => import('./teen/PropositionGame.jsx'),
  'teen-and': () => import('./teen/AndGame.jsx'),
  'teen-or': () => import('./teen/OrGame.jsx'),
  'teen-not': () => import('./teen/NotGame.jsx'),
  'teen-master': () => import('./teen/MasterGame.jsx'),
  'color-sorting': () => import('./tween/ColorSortingGame.jsx'),
  'tween-membership': () => import('./tween/TweenMembershipGame.jsx'),
  'tween-venn': () => import('./tween/TweenVennGame.jsx'),
  'tween-union': () => import('./tween/TweenUnionGame.jsx'),
  'tween-guardian': () => import('./tween/TweenGuardianGame.jsx'),
  'tween-truth': () => import('./tween/TweenTruthGame.jsx'),
  'tween-gate': () => import('./tween/TweenGateGame.jsx'),
  'tween-lever': () => import('./tween/TweenLeverGame.jsx'),
  'tween-not': () => import('./tween/TweenNotGame.jsx'),
  'tween-master': () => import('./tween/TweenMasterGame.jsx'),
};

const RELOAD_FLAG = 'logicplay:recarregou-para-atualizar';

function readReloadFlag() {
  try {
    return sessionStorage.getItem(RELOAD_FLAG) === '1';
  } catch {
    return false;
  }
}

function writeReloadFlag(value) {
  try {
    if (value) sessionStorage.setItem(RELOAD_FLAG, '1');
    else sessionStorage.removeItem(RELOAD_FLAG);
  } catch {
    // Sem sessionStorage (aba anônima restrita): só não guarda a marca.
  }
}

/**
 * Se o arquivo da fase não chegou, o motivo mais comum é uma atualização do site
 * com esta aba ainda aberta (os arquivos antigos deixam de existir). Recarrega uma
 * vez para pegar a versão nova; se falhar de novo, a tela de erro aparece.
 */
function recoverFromLoadError(error) {
  const online = typeof navigator === 'undefined' || navigator.onLine !== false;
  if (online && !readReloadFlag()) {
    writeReloadFlag(true);
    window.location.reload();
    return new Promise(() => {});
  }
  throw error;
}

function createLazyGame(importGame) {
  let pending = null;
  // Um download por vez; se falhar, a próxima tentativa baixa de novo.
  const preload = () => {
    pending ??= importGame().catch((error) => {
      pending = null;
      throw error;
    });
    return pending;
  };
  const LazyGame = lazy(() =>
    preload().then((module) => {
      writeReloadFlag(false);
      return module;
    }, recoverFromLoadError),
  );
  return { LazyGame, preload };
}

const GAMES = Object.fromEntries(Object.entries(GAME_IMPORTS).map(([type, importGame]) => [type, createLazyGame(importGame)]));

/** Começa a baixar o jogo de um tipo de desafio sem esperar (ex.: na tela de introdução). */
export function preloadGame(type) {
  GAMES[type]?.preload().catch(() => {
    // Silencioso: se falhar agora, a tela do jogo tenta de novo ao abrir.
  });
}

function GameLoading() {
  return (
    <div className="screen game-loading" role="status" aria-live="polite">
      <div className="game-loading__content">
        <span className="game-loading__dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span className="game-loading__label">Preparando a fase...</span>
      </div>
    </div>
  );
}

class GameErrorBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <div className="screen game-loading game-loading--error" role="alert">
        <div className="game-loading__content">
          <Mascot mood="encourage" size={140} />
          <h2 className="game-loading__title">Ops! A fase não abriu.</h2>
          <p className="game-loading__text">Confira a internet e tente de novo.</p>
          <div className="game-loading__actions">
            <GameButton icon={RotateCcw} variant="lilac" onClick={() => window.location.reload()}>
              Tentar de novo
            </GameButton>
            <GameButton icon={MapIcon} variant="light" onClick={this.props.onExit}>
              Voltar ao mapa
            </GameButton>
          </div>
        </div>
      </div>
    );
  }
}

/** Abre a tela de jogo do desafio, baixando o código dela se ainda não estiver no navegador. */
export default function GameScreen({ challenge, ...props }) {
  const Game = GAMES[challenge.type].LazyGame;
  return (
    <GameErrorBoundary onExit={props.onExit}>
      <Suspense fallback={<GameLoading />}>
        <Game challenge={challenge} {...props} />
      </Suspense>
    </GameErrorBoundary>
  );
}
