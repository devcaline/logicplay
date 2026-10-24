/**
 * Gera ROTEIRO_DE_GRAVACAO.md com todas as falas do Pipo.
 * Uso: npm run roteiro
 */
import { readdirSync, writeFileSync } from 'node:fs';
import { CHALLENGES } from '../src/data/challenges.js';
import { NARRATION } from '../src/data/narration.js';
import { LEVEL_SEQUENCE } from '../src/config/worlds.js';

const VOICE_DIR = new URL('../src/assets/voz/', import.meta.url);
const recorded = new Set(
  readdirSync(VOICE_DIR)
    .filter((file) => /\.(mp3|m4a|wav|ogg|webm)$/i.test(file))
    .map((file) => file.replace(/\.[^.]+$/, '')),
);

const TONE = {
  happy: 'alegre, acolhedor',
  curious: 'curioso, explicando com calma',
  cheer: 'comemorando, bem animado',
  encourage: 'carinhoso, incentivando',
  calm: 'calmo, convidativo',
  name: 'só o nome, claro e simpático',
};

const sections = [];
const add = (title, lines) => sections.push({ title, lines });

add('Telas gerais', [
  { line: NARRATION.ageQuestion, where: 'Escolha da idade', tone: 'curious' },
  { line: NARRATION.difficultyQuestion, where: 'Escolha da dificuldade', tone: 'encourage' },
  { line: NARRATION.mapKids, where: 'Mapa — quando há fase para jogar', tone: 'happy' },
  { line: NARRATION.mapKidsDone, where: 'Mapa — quando as próximas fases ainda não existem', tone: 'cheer' },
  { line: NARRATION.mapInDevelopment, where: 'Mapa — idades 9–12 e 13+', tone: 'encourage' },
  { line: NARRATION.howToPlay, where: '"Como jogar?"', tone: 'calm' },
]);

for (const challenge of Object.values(CHALLENGES)) {
  const level = LEVEL_SEQUENCE.find((candidate) => candidate.id === challenge.levelId);
  const lines = [];

  challenge.intro.forEach((intro, index) => lines.push({ line: intro, where: `Introdução ${index + 1}`, tone: intro.mood }));
  // A missão é narrada na entrada (no Espelho do NÃO e no Guardião, cada parte tem a própria instrução).
  if (!['guardian-quiz', 'not-mirror', 'master-table'].includes(challenge.type)) lines.push({ line: challenge.mission, where: 'Missão', tone: 'curious' });

  if (challenge.type === 'guardian-quiz') {
    challenge.rounds.forEach((round, index) => {
      lines.push({ line: round.prompt, where: `Desafio ${index + 1} (${round.concept}) — pergunta`, tone: 'curious' });
      lines.push({ line: round.hint, where: `Desafio ${index + 1} — dica ao errar`, tone: 'encourage' });
    });
    lines.push({ line: challenge.feedback.visualHint, where: 'Dica — resposta brilhando (após 2 erros)', tone: 'encourage' });
    lines.push({ line: challenge.feedback.pickMore, where: 'Apertou Pronto sem escolher nada', tone: 'encourage' });
  }

  if (challenge.type === 'set-sorting') {
    challenge.items.forEach((item) =>
      lines.push({ line: { id: `item.${item.id}`, text: `${item.name}!` }, where: `Ao tocar no animal`, tone: 'name' }),
    );
    const hintPlaces = {
      empty: 'Dica — apertou Verificar sem nada no círculo',
      wrongInside: 'Dica — tem animal errado dentro',
      missing: 'Dica — falta animal dentro',
      generic: 'Dica — genérica',
      visualHint: 'Dica com gotinhas (após 2 tentativas)',
    };
    for (const [key, where] of Object.entries(hintPlaces)) {
      if (challenge.feedback[key]) lines.push({ line: challenge.feedback[key], where, tone: 'encourage' });
    }
  }

  if (challenge.type === 'venn-sorting') {
    challenge.items.forEach((item) =>
      lines.push({ line: { id: `item.${item.id}`, text: `${item.name}!` }, where: 'Ao tocar no elemento', tone: 'name' }),
    );
    const hintPlaces = {
      empty: 'Dica — apertou Verificar sem colocar nada nos grupos',
      missingBoth: 'Dica — algo que é dos dois grupos não está no meio',
      wrongBoth: 'Dica — algo no meio que não é dos dois grupos',
      generic: 'Dica — elemento no grupo errado',
      visualHint: 'Dica com marquinhas (após 2 tentativas)',
    };
    for (const [key, where] of Object.entries(hintPlaces)) {
      lines.push({ line: challenge.feedback[key], where, tone: 'encourage' });
    }
  }

  if (challenge.type === 'union-catch') {
    challenge.items.forEach((item) => {
      if (item.nope) lines.push({ line: item.nope, where: `Tocou numa bolha que não passa — ${item.name}`, tone: 'encourage' });
    });
    lines.push({ line: challenge.feedback.visualHint, where: 'Dica — bolhas douradas (após 2 toques errados)', tone: 'encourage' });
    lines.push({ line: challenge.feedback.idle, where: 'Dica — criança parada sem tocar', tone: 'encourage' });
  }

  if (challenge.type === 'master-table') {
    challenge.columns.forEach((column) => {
      lines.push({ line: column.start, where: `Máquina do ${column.gate} — começo`, tone: 'curious' });
      column.questions.forEach((question, index) => lines.push({ line: question, where: `Máquina do ${column.gate} — teste ${index + 1}`, tone: 'curious' }));
      [2, 1, 0].forEach((count) => lines.push({ line: column.hints[count], where: `Máquina do ${column.gate} — errou (${count} alavanca(s) ligada(s))`, tone: 'encourage' }));
    });
    lines.push({ line: challenge.feedback.tableDone, where: 'Tabela Mestra completa', tone: 'cheer' });
  }

  if (challenge.type === 'not-mirror') {
    challenge.stages.forEach((stage, index) => {
      lines.push({ line: stage.instruction, where: `Parte ${index + 1} (${stage.title}) — instrução`, tone: 'curious' });
      stage.rows.forEach((row) => lines.push({ line: row.hint, where: `Parte ${index + 1} — reflexo errado`, tone: 'encourage' }));
    });
    lines.push({ line: challenge.feedback.unset, where: 'Dica — reflexo ainda sem resposta', tone: 'encourage' });
  }

  if (challenge.type === 'lever-machine') {
    challenge.rounds.forEach((round, index) => {
      lines.push({ line: round.question, where: `Rodada ${index + 1} — pergunta`, tone: 'curious' });
      if (round.hint) lines.push({ line: round.hint, where: `Rodada ${index + 1} — explicação ao errar`, tone: 'encourage' });
      if (round.stuckHint) lines.push({ line: round.stuckHint, where: `Rodada ${index + 1} — tocou na alavanca emperrada`, tone: 'encourage' });
    });
  }

  if (challenge.type === 'gate-machines') {
    challenge.machines.forEach((machine, index) => {
      lines.push({ line: machine.question, where: `Máquina ${index + 1} — pergunta (ao abrir)`, tone: 'curious' });
      lines.push({ line: machine.hint, where: `Máquina ${index + 1} — explicação ao errar o palpite`, tone: 'encourage' });
    });
  }

  if (challenge.type === 'truth-lights') {
    challenge.statements.forEach((statement) => {
      lines.push({ line: statement.line, where: 'Frase do cartão (botão de ouvir)', tone: 'calm' });
      lines.push({ line: statement.hint, where: 'Dica — errou esta frase', tone: 'encourage' });
    });
    lines.push({ line: challenge.feedback.unanswered, where: 'Dica — ligou a máquina com frase sem resposta', tone: 'encourage' });
  }

  if (challenge.type === 'membership') {
    challenge.items.forEach((item) => {
      lines.push({ line: item.question, where: `Pergunta — ${item.name}`, tone: 'curious' });
      lines.push({ line: item.hint, where: `Dica — errou ${item.name}`, tone: 'encourage' });
    });
    lines.push({ line: challenge.feedback.visualHint, where: 'Dica — 2º erro no mesmo elemento', tone: 'encourage' });
  }

  lines.push({ line: challenge.feedback.success, where: 'Acertou tudo', tone: 'cheer' });
  lines.push({
    line: { id: challenge.complete.id, text: `${challenge.complete.title} ${challenge.complete.text}` },
    where: 'Tela final da fase',
    tone: 'cheer',
  });

  add(`Fase: ${level?.name ?? challenge.levelId} (${challenge.ageGroup} anos)`, lines);
}

const all = sections.flatMap((section) => section.lines);
const done = all.filter(({ line }) => recorded.has(line.id)).length;

let md = `# Roteiro de gravação — voz do Pipo

Gerado automaticamente pelo comando \`npm run roteiro\` (rode de novo depois de gravar para atualizar o progresso).

**Progresso: ${done} de ${all.length} falas gravadas.**

## Como gravar e colocar no jogo

1. Grave cada fala em um arquivo separado.
2. Dê ao arquivo **exatamente** o nome da coluna "Arquivo" (pode ser \`.mp3\`, \`.m4a\`, \`.wav\`, \`.ogg\` ou \`.webm\`).
3. Coloque os arquivos na pasta \`src/assets/voz/\`.
4. Pronto: o jogo usa sua gravação automaticamente. Falas sem gravação continuam com a voz do navegador.

Dicas: ambiente silencioso, celular ou microfone a um palmo da boca, corte o silêncio do começo e do fim,
e mantenha o mesmo volume em todas as falas. Não precisa ler palavra por palavra: se uma frase soar
melhor de outro jeito, grave assim e me avise para eu ajustar o texto na tela.

`;

for (const section of sections) {
  md += `## ${section.title}\n\n| ✓ | Arquivo | Onde aparece | Tom | Fala |\n|---|---|---|---|---|\n`;
  for (const { line, where, tone } of section.lines) {
    const mark = recorded.has(line.id) ? '✅' : '⬜';
    md += `| ${mark} | \`${line.id}.mp3\` | ${where} | ${TONE[tone] ?? tone} | ${line.text.replace(/\|/g, '\\|')} |\n`;
  }
  md += '\n';
}

writeFileSync(new URL('../ROTEIRO_DE_GRAVACAO.md', import.meta.url), md);
console.log(`Roteiro gerado: ${all.length} falas (${done} gravadas) → ROTEIRO_DE_GRAVACAO.md`);
