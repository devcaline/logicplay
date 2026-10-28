/**
 * Todos os desafios do jogo, por id.
 *
 * O conteúdo fica separado da lógica: cada desafio é um arquivo próprio dentro da pasta
 * do seu mundo (forest/, lab/), e cada mundo reúne os seus em <mundo>/challenges.js.
 * Este arquivo junta tudo — é a única porta de entrada usada pelo jogo (App.jsx)
 * e pelo gerador do roteiro de gravação (scripts/roteiro.mjs).
 *
 * Cada fala tem um `id` estável: um áudio gravado pode substituí-la depois
 * em audio/audioManifest.js, sem mudar nada aqui.
 */
import { CHALLENGES as FOREST_CHALLENGES } from './forest/challenges.js';
import { CHALLENGES as LAB_CHALLENGES } from './lab/challenges.js';

export const CHALLENGES = {
  ...FOREST_CHALLENGES,
  ...LAB_CHALLENGES,
};

export function getChallenge(challengeId) {
  return CHALLENGES[challengeId] ?? null;
}
