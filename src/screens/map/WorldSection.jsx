import { Lock, Trees, FlaskConical } from 'lucide-react';
import LevelNode from './LevelNode.jsx';
import { ForestMapScene, LabMapScene } from '../../components/scenery/MapScenes.jsx';

const SCENES = { forest: ForestMapScene, lab: LabMapScene };
const ICONS = { forest: Trees, lab: FlaskConical };

/** Converte pontos em uma curva suave (Catmull-Rom → Bézier), um segmento por par de fases. */
function buildSegments(points) {
  const segments = [];
  for (let i = 0; i < points.length - 1; i += 1) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1 = { x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 };
    const c2 = { x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 };
    segments.push(`M${p1.x} ${p1.y} C${c1.x} ${c1.y} ${c2.x} ${c2.y} ${p2.x} ${p2.y}`);
  }
  return segments;
}

export default function WorldSection({ world, statuses, profileProgress, selectedLevelId, onSelectLevel }) {
  const Scene = SCENES[world.theme];
  const Icon = ICONS[world.theme];
  const points = world.levels.map((level) => ({ x: level.pos.x, y: level.pos.y * 1.3 }));
  const segments = buildSegments(points);
  const worldLocked = world.levels.every((level) => statuses[level.id] === 'locked');

  return (
    <section className={`world world--${world.theme}`} aria-labelledby={`world-${world.id}`}>
      <header className="world__banner">
        <span className="world__icon" aria-hidden="true">
          <Icon size={26} strokeWidth={2.4} />
        </span>
        <div className="world__titles">
          <p className="world__number">Mundo {world.number}</p>
          <h2 id={`world-${world.id}`} className="world__name">{world.name}</h2>
          <p className="world__tagline">{world.tagline}</p>
        </div>
        {worldLocked && (
          <span className="world__lock">
            <Lock size={16} strokeWidth={3} /> Bloqueado
          </span>
        )}
      </header>

      <div className="world__map">
        <Scene />
        <svg className="world__path" viewBox="0 0 100 130" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          {segments.map((d, index) => {
            const walked = statuses[world.levels[index].id] === 'completed';
            return (
              <g key={d}>
                <path d={d} className="world__path-base" />
                <path d={d} className={`world__path-dots ${walked ? 'is-walked' : ''}`} />
              </g>
            );
          })}
        </svg>
        {world.levels.map((level) => (
          <LevelNode
            key={level.id}
            level={level}
            status={statuses[level.id]}
            stars={profileProgress[level.id]?.stars ?? 0}
            selected={selectedLevelId === level.id}
            onSelect={onSelectLevel}
          />
        ))}
      </div>
    </section>
  );
}
