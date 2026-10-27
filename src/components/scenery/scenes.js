import ForestScene from './ForestScene.jsx';
import OceanScene from './OceanScene.jsx';
import MagicForestScene from './MagicForestScene.jsx';
import LabScene from './LabScene.jsx';
import StudyScene from './StudyScene.jsx';

/** Cenários de fundo disponíveis para as fases (campo `scene` do desafio). */
export const LEVEL_SCENES = {
  forest: ForestScene,
  ocean: OceanScene,
  magic: MagicForestScene,
  lab: LabScene,
  study: StudyScene,
};

export function getLevelScene(sceneId) {
  return LEVEL_SCENES[sceneId] ?? ForestScene;
}
