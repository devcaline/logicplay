/**
 * Floresta dos Conjuntos · fase 2 · 9–12 anos — "Quem Pertence Aqui?".
 * Completar afirmações com ∈ ou ∉; o aquecimento e as questões ficam em data/tween/membershipRounds.js.
 */
import { generateTweenMembershipRounds, tweenMembershipWarmup } from '../tween/membershipRounds.js';

export default {
  id: 'forest-2-tween',
  type: 'set-membership',
  levelId: 'forest-2',
  ageGroup: '9-12',
  scene: 'magic',
  rounds: 3,

  intro: [
    {
      id: 'f2a.intro.1',
      mood: 'happy',
      illustration: 'membership-notation',
      text: 'Para dizer que um número faz parte de um conjunto usamos um símbolo especial, o "pertence". Quando o número não faz parte, usamos o mesmo símbolo cortado com uma barrinha: é o "não pertence".',
    },
    {
      id: 'f2a.intro.2',
      mood: 'curious',
      illustration: 'membership-notation',
      text: 'O conjunto pode vir numa caixinha com os números devidos, ou descrito por uma regra, como "os múltiplos de três". Missão do explorador: olhar cada número e decidir se ele pertence ou não pertence!',
    },
  ],

  mission: {
    id: 'f2a.mission',
    text: 'Missão do explorador: olhe cada número e responda — ele pertence ao conjunto ou não pertence?',
    short: 'Pertence ou não pertence?',
  },

  // Aquecimento guiado: os itens e as falas vêm de data/tween/membershipRounds.js.
  tutorial: true,

  symbols: [
    ['∈', 'pertence a'],
    ['∉', 'não pertence a'],
    ['{ }', 'as chaves guardam os elementos'],
    ['<', 'menor que'],
    ['>', 'maior que'],
  ],

  roundsGenerator: generateTweenMembershipRounds,
  warmupGenerator: tweenMembershipWarmup,

  feedback: {
    success: {
      id: 'f2a.success',
      title: 'Muito bem! Fase concluída!',
      text: 'Você decidiu, número por número, quem pertence a cada conjunto. Os cristais da floresta estão brilhando por causa de você!',
    },
    // Elogios do Pipo ao fechar um conjunto com tudo certo: um é sorteado a cada rodada.
    praise: [
      { id: 'f2a.praise.1', text: 'Isso! Cada conjunto completo ilumina um cristal da floresta!' },
      { id: 'f2a.praise.2', text: 'Muito bem! Pertence ou não pertence, você sabe de cor!' },
      { id: 'f2a.praise.3', text: 'Você é demais! O Pipo está orgulhoso de você!' },
    ],
  },

  complete: {
    id: 'f2a.complete',
    title: 'Segunda missão concluída!',
    text: 'Para cada número há apenas duas respostas possíveis: ele pertence ao conjunto ou não pertence. Afinal de contas, um conjunto é uma caixa: ou o número está dentro dela, ou está fora.',
  },
};
