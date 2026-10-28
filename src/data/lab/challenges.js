/**
 * Desafios do Laboratório da Verdade (mundo 2).
 * Um arquivo por desafio, nomeado com o id do desafio; este arquivo apenas reúne.
 */
import lab1Kids from './lab-1-kids.js';
import lab2Kids from './lab-2-kids.js';
import lab3Kids from './lab-3-kids.js';
import lab4Kids from './lab-4-kids.js';
import lab5Kids from './lab-5-kids.js';

const LIST = [lab1Kids, lab2Kids, lab3Kids, lab4Kids, lab5Kids];

export const CHALLENGES = Object.fromEntries(LIST.map((challenge) => [challenge.id, challenge]));
