/**
 * Desafios da Floresta dos Conjuntos (mundo 1).
 * Um arquivo por desafio, nomeado com o id do desafio; este arquivo apenas reúne.
 */
import forest1Kids from './forest-1-kids.js';
import forest2Kids from './forest-2-kids.js';
import forest3Kids from './forest-3-kids.js';
import forest4Kids from './forest-4-kids.js';
import forest5Kids from './forest-5-kids.js';
import forest1Teen from './forest-1-teen.js';
import forest2Teen from './forest-2-teen.js';

const LIST = [forest1Kids, forest2Kids, forest3Kids, forest4Kids, forest5Kids, forest1Teen, forest2Teen];

export const CHALLENGES = Object.fromEntries(LIST.map((challenge) => [challenge.id, challenge]));
