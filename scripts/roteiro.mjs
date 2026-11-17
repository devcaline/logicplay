/**
 * Gera o roteiro de gravação com todas as falas do Pipo, nas três faixas etárias:
 *   ROTEIRO_DE_GRAVACAO.md   (para ler no GitHub)
 *   ROTEIRO_DE_GRAVACAO.html (versão para imprimir)
 *   ROTEIRO_DE_GRAVACAO.pdf  (se o Google Chrome estiver instalado)
 * Uso: npm run roteiro
 *
 * Cada fala tem um nome de arquivo. Falas fixas usam o código da fala (ex.: f1k.intro.1);
 * falas que o jogo monta sorteando cores e regras (9 a 12 anos) usam um código calculado
 * pelo texto (ex.: v-1a2b3c4d), e o narrador também procura a gravação por esse código.
 */
import { existsSync, readdirSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { CHALLENGES } from '../src/data/challenges.js';
import { NARRATION } from '../src/data/narration.js';
import { LEVEL_SEQUENCE, WORLDS } from '../src/config/worlds.js';
import { voiceKey } from '../src/audio/voiceKey.js';
import { generateColorSetPhase } from '../src/data/tween/colorSets.js';
import { generateTweenMembership } from '../src/data/tween/membershipBalls.js';
import { generateTweenVenn } from '../src/data/tween/vennBalls.js';
import { generateTweenUnion } from '../src/data/tween/unionBalls.js';
import { generateTweenBoss } from '../src/data/tween/bossBalls.js';
import { generateGateMachines } from '../src/data/tween/gateBalls.js';
import { generateTweenNot } from '../src/data/tween/notBalls.js';
import { propositionWarmup } from '../src/data/teen/propositionRounds.js';
import { andWarmup } from '../src/data/teen/andRounds.js';
import { orWarmup } from '../src/data/teen/orRounds.js';
import { notWarmup } from '../src/data/teen/notRounds.js';
import { masterWarmup } from '../src/data/teen/masterRounds.js';
import { membershipWarmup } from '../src/data/teen/membershipRounds.js';

const ROOT = new URL('../', import.meta.url);
const VOICE_DIR = new URL('src/assets/voz/', ROOT);
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
  sober: 'tranquilo, como um colega explicando',
};

const AGE_TITLES = { '5-8': '5 a 8 anos', '9-12': '9 a 12 anos', '13+': '13 anos ou mais' };

/** Sugestão de leitura para falas com símbolos (a voz do Pipo nunca lê o símbolo em si). */
function speakable(text) {
  if (!/[∈∉⊂⊄∩∪∧∨¬≤≥≠ℕℤ{}|²<>=·−]/.test(text)) return null;
  return text
    .replace(/\s?\([∈∉⊂⊄∩∪∧∨¬]\)/g, '') // "pertence (∈)" → "pertence"
    .replace(/[∈∉⊂⊄∩∪∧∨¬] \(([^)]+)\)/g, '“$1”') // "usamos ∈ (pertence)" → "usamos “pertence”"
    .replace(/(\b[oO]) ([∈∉⊂⊄∩∪∧∨¬])(?=,| se lê| quer| parece)/g, '$1 símbolo') // "O ∩ se lê" → "O símbolo se lê"
    .replace(/n\(([^)]+)\)/g, 'n de $1')
    .replace(/ℕ\*/g, 'naturais sem o zero')
    .replace(/ℕ/g, 'naturais')
    .replace(/ℤ/g, 'inteiros')
    .replace(/∉/g, 'não pertence a')
    .replace(/∈/g, 'pertence a')
    .replace(/⊄/g, 'não está contido em')
    .replace(/⊂/g, 'está contido em')
    .replace(/∩/g, 'interseção')
    .replace(/∪/g, 'união')
    .replace(/∧/g, 'e')
    .replace(/∨/g, 'ou')
    .replace(/¬\s?/g, 'não ')
    .replace(/≤/g, 'menor ou igual a')
    .replace(/≥/g, 'maior ou igual a')
    .replace(/≠/g, 'diferente de')
    .replace(/ > /g, ' maior que ')
    .replace(/ < /g, ' menor que ')
    .replace(/ = /g, ' igual a ')
    .replace(/²/g, ' ao quadrado')
    .replace(/·/g, 'vezes')
    .replace(/ \+ /g, ' mais ')
    .replace(/−/g, 'menos')
    .replace(/ \| /g, ' tal que ')
    .replace(/\{\s*\}/g, 'conjunto vazio')
    .replace(/\{/g, 'o conjunto ')
    .replace(/\}/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// ---------- Coleta ----------
const sections = [];
const seen = new Set();
let section = null;

function startSection(title, subtitle) {
  section = { title, subtitle, lines: [] };
  sections.push(section);
}

/** Adiciona uma fala. `file` é o nome do arquivo sem extensão (código da fala ou do texto). */
function add(file, text, where, tone) {
  if (!text || seen.has(file)) return;
  seen.add(file);
  section.lines.push({ file, text, where, tone });
}
const addLine = (line, where, tone) => line && add(line.id, line.text, where, tone);
const addText = (text, where, tone) => text && add(voiceKey(text), text, where, tone);

// Rótulos legíveis para os caminhos das falas fixas (9–12 e 13+).
const PLACE = {
  intro: 'Introdução',
  mission: 'Missão',
  missions: 'Missão',
  tutorial: 'Aquecimento',
  feedback: 'Retorno',
  success: 'acertou tudo',
  visualHint: 'dica com destaque',
  idle: 'dica — parado sem tocar',
  unanswered: 'dica — sem resposta',
  pickMore: 'dica — nada escolhido',
  table: 'Tabela no fim',
  tableNote: 'Nota da tabela',
  tableStart: 'Tabela Mestra — começo',
  tableDone: 'tabela completa',
  parts: 'Parte',
  columns: 'Máquina',
  act: 'Rodada prática',
  levers: 'Alavancas',
  notHint: 'Dica — coluna ¬p errada',
  notUnset: 'Dica — coluna ¬p incompleta',
  reveal: 'Quadro final',
  empty: 'dica — Verificar sem nada colocado',
  wrongInside: 'dica — tem bolinha errada dentro (1ª parte)',
  missing: 'dica — falta bolinha (1ª parte)',
  generic: 'dica — bolinha no lugar errado (1ª parte)',
  missingBoth: 'dica — bolinha dos dois grupos fora do meio (1ª parte)',
  wrongBoth: 'dica — bolinha no meio que não é dos dois (1ª parte)',
  unset: 'dica — sem resposta',
  balls: 'bolinhas',
  symbols: 'símbolos',
  start: 'começo',
  questions: 'teste',
  hints: 'dica ao errar',
  instruction: 'instrução',
  prompt: 'pergunta',
  question: 'pergunta',
  hint: 'dica',
  done: 'concluído',
  build: 'montar',
  count: 'contar',
  dup: 'número repetido',
  single: 'um espelho',
  double: 'dois espelhos',
};
function describe(path) {
  return path
    .filter((key) => typeof key === 'string')
    .map((key) => PLACE[key] ?? key)
    .join(' · ')
    .replace(/^Retorno · /, 'Retorno: ');
}
function toneFor(path, line) {
  if (line.mood) return line.mood;
  const joined = `${path.join('.')} ${line.id ?? ''}`;
  if (/hint|Hint|idle|unset|Unset|unanswered|pickMore/.test(joined)) return 'encourage';
  if (/success|done|Done|reveal|table/.test(joined)) return 'cheer';
  return 'curious';
}

/** Percorre um desafio e adiciona todas as falas fixas { id, text }. */
function walkFixed(challenge, tone) {
  const visit = (value, path) => {
    if (Array.isArray(value)) {
      value.forEach((item, index) => visit(item, [...path, `${index + 1}`]));
      return;
    }
    if (!value || typeof value !== 'object') return;
    if (path[0] === 'complete') return; // a tela final é tratada à parte
    if (typeof value.id === 'string' && typeof value.text === 'string') {
      addLine(value, describe(path) || 'Fala', tone ?? toneFor(path, value));
    }
    for (const [key, child] of Object.entries(value)) visit(child, [...path, key]);
  };
  visit(challenge, []);
}

function addComplete(challenge, tone = 'cheer') {
  addLine(challenge.feedback?.success, 'Acertou tudo', tone);
  addLine({ id: challenge.complete.id, text: `${challenge.complete.title} ${challenge.complete.text}` }, 'Tela final da fase', tone);
}

// ---------- 5 a 8 anos (cada tipo de jogo tem suas falas) ----------
function kidsLines(challenge) {
  challenge.intro.forEach((intro, index) => addLine(intro, `Introdução ${index + 1}`, intro.mood));
  if (!['guardian-quiz', 'not-mirror', 'master-table'].includes(challenge.type)) addLine(challenge.mission, 'Missão', 'curious');

  if (challenge.type === 'guardian-quiz') {
    challenge.rounds.forEach((round, index) => {
      addLine(round.prompt, `Desafio ${index + 1} (${round.concept}) — pergunta`, 'curious');
      addLine(round.hint, `Desafio ${index + 1} — dica ao errar`, 'encourage');
    });
    addLine(challenge.feedback.visualHint, 'Dica — resposta brilhando (após 2 erros)', 'encourage');
    addLine(challenge.feedback.pickMore, 'Apertou Pronto sem escolher nada', 'encourage');
  }
  if (challenge.type === 'set-sorting' || challenge.type === 'venn-sorting') {
    challenge.items.forEach((item) => addLine({ id: `item.${item.id}`, text: `${item.name}!` }, 'Ao tocar no elemento', 'name'));
    const places =
      challenge.type === 'set-sorting'
        ? { empty: 'Dica — Verificar sem nada no círculo', wrongInside: 'Dica — tem elemento errado dentro', missing: 'Dica — falta elemento dentro', generic: 'Dica — genérica', visualHint: 'Dica com destaque (após 2 tentativas)' }
        : { empty: 'Dica — Verificar sem nada nos grupos', missingBoth: 'Dica — algo dos dois grupos fora do meio', wrongBoth: 'Dica — algo no meio que não é dos dois', generic: 'Dica — elemento no grupo errado', visualHint: 'Dica com marquinhas (após 2 tentativas)' };
    for (const [key, where] of Object.entries(places)) addLine(challenge.feedback[key], where, 'encourage');
  }
  if (challenge.type === 'union-catch') {
    challenge.items.forEach((item) => item.nope && addLine(item.nope, `Tocou numa bolha que não passa — ${item.name}`, 'encourage'));
    addLine(challenge.feedback.visualHint, 'Dica — bolhas douradas (após 2 toques errados)', 'encourage');
    addLine(challenge.feedback.idle, 'Dica — criança parada sem tocar', 'encourage');
  }
  if (challenge.type === 'master-table') {
    challenge.columns.forEach((column) => {
      addLine(column.start, `Máquina do ${column.gate} — começo`, 'curious');
      column.questions.forEach((question, index) => addLine(question, `Máquina do ${column.gate} — teste ${index + 1}`, 'curious'));
      [2, 1, 0].forEach((count) => addLine(column.hints[count], `Máquina do ${column.gate} — errou (${count} alavanca(s) ligada(s))`, 'encourage'));
    });
    addLine(challenge.feedback.tableDone, 'Tabela Mestra completa', 'cheer');
  }
  if (challenge.type === 'not-mirror') {
    challenge.stages.forEach((stage, index) => {
      addLine(stage.instruction, `Parte ${index + 1} (${stage.title}) — instrução`, 'curious');
      stage.rows.forEach((row) => addLine(row.hint, `Parte ${index + 1} — reflexo errado`, 'encourage'));
    });
    addLine(challenge.feedback.unset, 'Dica — reflexo ainda sem resposta', 'encourage');
  }
  if (challenge.type === 'lever-machine') {
    challenge.rounds.forEach((round, index) => {
      addLine(round.question, `Rodada ${index + 1} — pergunta`, 'curious');
      addLine(round.hint, `Rodada ${index + 1} — explicação ao errar`, 'encourage');
      addLine(round.stuckHint, `Rodada ${index + 1} — tocou na alavanca emperrada`, 'encourage');
    });
  }
  if (challenge.type === 'gate-machines') {
    challenge.machines.forEach((machine, index) => {
      addLine(machine.question, `Máquina ${index + 1} — pergunta`, 'curious');
      addLine(machine.hint, `Máquina ${index + 1} — explicação ao errar`, 'encourage');
    });
  }
  if (challenge.type === 'truth-lights') {
    challenge.statements.forEach((statement) => {
      addLine(statement.line, 'Frase do cartão (botão de ouvir)', 'calm');
      addLine(statement.hint, 'Dica — errou esta frase', 'encourage');
    });
    addLine(challenge.feedback.unanswered, 'Dica — ligou a máquina com frase sem resposta', 'encourage');
  }
  if (challenge.type === 'membership') {
    challenge.items.forEach((item) => {
      addLine(item.question, `Pergunta — ${item.name}`, 'curious');
      addLine(item.hint, `Dica — errou ${item.name}`, 'encourage');
    });
    addLine(challenge.feedback.visualHint, 'Dica — 2º erro no mesmo elemento', 'encourage');
  }
  addComplete(challenge);
}

// ---------- 9 a 12 anos: falas fixas + variações sorteadas ----------
const RUNS = 1500;
const DIFFICULTIES = ['easy', 'medium', 'hard'];
/** Junta todos os textos diferentes que um gerador produz, em ordem alfabética. */
function variants(generate, pickTexts) {
  const texts = new Set();
  for (const difficulty of DIFFICULTIES) for (let run = 0; run < RUNS; run += 1) pickTexts(generate(difficulty)).forEach((text) => text && texts.add(text));
  return [...texts].sort((a, b) => a.localeCompare(b, 'pt-BR'));
}

const TWEEN_VARIANTS = {
  'color-sorting': () => [
    ['Missão sorteada', 'curious', variants(generateColorSetPhase, (phase) => phase.missions.map((mission) => mission.text))],
    ['Dica da missão (2ª parte, depois do “Quase!”)', 'encourage', variants(generateColorSetPhase, (phase) => phase.missions.map((mission) => mission.hint))],
  ],
  'tween-membership': () => [['Apresentação do grupo sorteado', 'curious', variants(generateTweenMembership, (groups) => groups.map((group) => group.intro))]],
  'tween-venn': () => [
    ['Missão sorteada', 'curious', variants(generateTweenVenn, (missions) => missions.map((mission) => mission.text))],
    ['Dica da missão (2ª parte, depois do “Quase!”)', 'encourage', variants(generateTweenVenn, (missions) => missions.map((mission) => mission.hint))],
    ['Quadro final da missão', 'cheer', variants(generateTweenVenn, (missions) => missions.map((mission) => mission.reveal.text))],
  ],
  'tween-union': () => [
    ['Missão sorteada', 'curious', variants(generateTweenUnion, (missions) => missions.map((mission) => mission.text))],
    ['Quadro final da missão', 'cheer', variants(generateTweenUnion, (missions) => missions.map((mission) => mission.reveal.text))],
  ],
  'tween-guardian': () => [
    ['Pergunta do desafio sorteado', 'curious', variants(generateTweenBoss, (rounds) => rounds.map((round) => round.prompt))],
    ['Dica ao errar o desafio', 'encourage', variants(generateTweenBoss, (rounds) => rounds.map((round) => round.hint))],
  ],
  'tween-gate': () => [['Explicação ao errar o palpite', 'encourage', variants((d) => generateGateMachines(d, 'E'), (machines) => machines.map((machine) => machine.hint.text))]],
  'tween-lever': () => [['Explicação ao errar o palpite', 'encourage', variants((d) => generateGateMachines(d, 'OU'), (machines) => machines.map((machine) => machine.hint.text))]],
  'tween-not': () => [
    ['Dica — reflexo errado', 'encourage', variants(generateTweenNot, ({ single, double }) => [...single, ...double].map((row) => row.hint))],
    ['Dica — dois espelhos errado', 'encourage', variants(generateTweenNot, ({ single, double }) => [...single, ...double].map((row) => row.doubleHint))],
  ],
};

/** Textos simples (sem código) que o jogo fala direto do desafio. */
function addPlainStrings(challenge) {
  const visit = (value, path) => {
    if (typeof value === 'string') {
      if (value.length > 20) addText(value, describe(path), toneFor(path, {}));
      return;
    }
    if (value && typeof value === 'object' && !('id' in value)) for (const [key, child] of Object.entries(value)) visit(child, [...path, key]);
  };
  for (const key of ['missions', 'reveal', 'actHint']) if (typeof challenge[key] !== 'undefined') visit(challenge[key], [key]);
}

function tweenLines(challenge) {
  walkFixed(challenge);
  addPlainStrings(challenge);
  for (const [where, tone, texts] of TWEEN_VARIANTS[challenge.type]?.() ?? []) texts.forEach((text) => addText(text, where, tone));
  addComplete(challenge);
}

// ---------- 13 anos ou mais: falas fixas + aquecimento ----------
const TEEN_WARMUPS = {
  'teen-propositions': () => propositionWarmup().items.map((item) => ({ item, ok: `Isso! ${item.why}`, retry: `Quase. ${item.why}` })),
  'teen-and': () => andWarmup().items.map((item) => ({ item, ok: `Isso! ${item.why}`, retry: `Quase. ${item.why}` })),
  'teen-or': () => orWarmup().items.map((item) => ({ item, ok: item.done, retry: item.kind === 'detective' ? `Quase. ${item.why}` : null })),
  'teen-not': () => notWarmup().items.map((item) => ({ item, ok: item.done, retry: `Quase. ${item.why}` })),
  'teen-master': () => masterWarmup().items.map((item) => ({ item, ok: item.done, retry: `Quase. ${item.why}` })),
};

function teenLines(challenge) {
  walkFixed(challenge, 'sober');
  if (challenge.type === 'set-membership') {
    membershipWarmup('hard').items.forEach((item, index) => {
      add(`${challenge.id}.${item.id}`, item.talk, `Aquecimento ${index + 1} — explicação`, 'sober');
      add(`${challenge.id}.${item.id}.done`, item.reason, `Aquecimento ${index + 1} — depois de responder`, 'sober');
    });
  }
  (TEEN_WARMUPS[challenge.type]?.() ?? []).forEach(({ item, ok, retry }, index) => {
    add(`${challenge.id}.${item.id}`, item.talk, `Aquecimento ${index + 1} — explicação`, 'sober');
    add(`${challenge.id}.${item.id}.ok`, ok, `Aquecimento ${index + 1} — acertou`, 'cheer');
    if (retry) add(`${challenge.id}.${item.id}.retry`, retry, `Aquecimento ${index + 1} — errou`, 'encourage');
  });
  addComplete(challenge, 'sober');
}

// ---------- Montagem ----------
startSection('Telas gerais', 'Falas fora das fases: escolha da idade, mapa e ajuda.');
const GENERAL = {
  homeWelcome: 'Tela inicial',
  ageQuestion: 'Escolha da idade',
  difficultyQuestion: 'Escolha da dificuldade (9 anos ou mais)',
  mapKids: 'Mapa — há fase para jogar',
  mapKidsDone: 'Mapa — todas as fases concluídas',
  mapTeen: 'Mapa (9 anos ou mais)',
  mapTeenDone: 'Mapa — todas as fases concluídas (9 anos ou mais)',
  mapInDevelopment: 'Mapa — fases ainda em preparação',
  howToPlay: 'Botão “Como jogar?”',
};
for (const [key, line] of Object.entries(NARRATION)) addLine(line, GENERAL[key] ?? key, key === 'howToPlay' ? 'calm' : 'happy');

for (const age of ['5-8', '9-12', '13+']) {
  for (const world of WORLDS) {
    for (const level of LEVEL_SEQUENCE.filter((candidate) => candidate.worldId === world.id)) {
      const challenge = CHALLENGES[level.content?.[age]];
      if (!challenge) continue;
      startSection(`${AGE_TITLES[age]} · ${world.name} · Fase ${level.number}: ${level.name}`);
      if (age === '5-8') kidsLines(challenge);
      else if (age === '9-12') tweenLines(challenge);
      else teenLines(challenge);
    }
  }
}

const all = sections.flatMap((item) => item.lines);
const done = all.filter((line) => recorded.has(line.file)).length;
const generated = new Date().toLocaleDateString('pt-BR');

// ---------- Markdown ----------
let md = `# Roteiro de gravação — voz do Pipo

Gerado automaticamente pelo comando \`npm run roteiro\` em ${generated} (rode de novo depois de gravar para atualizar o progresso).

**Progresso: ${done} de ${all.length} falas gravadas.**

## Como gravar e colocar no jogo

1. Grave cada fala em um arquivo separado.
2. Dê ao arquivo **exatamente** o nome da coluna "Arquivo" (pode ser \`.mp3\`, \`.m4a\`, \`.wav\`, \`.ogg\` ou \`.webm\`).
3. Coloque os arquivos na pasta \`src/assets/voz/\`.
4. Pronto: o jogo usa sua gravação automaticamente. Falas sem gravação continuam com a voz do navegador.

Falas com símbolos trazem uma sugestão de leitura em palavras: a voz do Pipo nunca lê o símbolo.
Frases que o jogo monta na hora com números sorteados (por exemplo "O 7 é ímpar e o 4 é par") são
milhares de combinações e continuam com a voz do navegador.

`;
for (const item of sections) {
  md += `## ${item.title}\n\n${item.subtitle ? `${item.subtitle}\n\n` : ''}| ✓ | Arquivo | Onde aparece | Tom | Fala |\n|---|---|---|---|---|\n`;
  for (const line of item.lines) {
    const reading = speakable(line.text);
    const text = `${line.text}${reading ? `<br>*Leia: ${reading}*` : ''}`.replace(/\|/g, '\\|');
    md += `| ${recorded.has(line.file) ? '✅' : '⬜'} | \`${line.file}.mp3\` | ${line.where} | ${TONE[line.tone] ?? line.tone} | ${text} |\n`;
  }
  md += '\n';
}
writeFileSync(new URL('ROTEIRO_DE_GRAVACAO.md', ROOT), md);

// ---------- HTML para imprimir / PDF ----------
const escape = (text) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const ageCount = (title) => sections.filter((item) => item.title.startsWith(title)).reduce((sum, item) => sum + item.lines.length, 0);
let html = `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><title>Roteiro de gravação — voz do Pipo</title>
<style>
  @page { size: A4; margin: 14mm 12mm 16mm; }
  * { box-sizing: border-box; }
  body { font: 10.5pt/1.4 -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif; color: #2E2668; margin: 0; }
  h1 { font-size: 24pt; margin: 0 0 4mm; color: #5B3FC4; }
  h2 { font-size: 13pt; margin: 8mm 0 2mm; padding: 2mm 3mm; border-radius: 2mm; background: #EFEBFF; color: #4A33A8; break-after: avoid; }
  h2.age { background: #5B3FC4; color: #fff; font-size: 15pt; break-before: page; }
  .cover p, .cover li { font-size: 11pt; }
  .stats { display: flex; gap: 4mm; margin: 5mm 0; }
  .stat { flex: 1; padding: 3mm; border-radius: 2mm; background: #F6F4FF; text-align: center; }
  .stat b { display: block; font-size: 18pt; color: #5B3FC4; }
  .sub { margin: 0 0 2mm; color: #6E66A8; }
  table { width: 100%; border-collapse: collapse; }
  tr { break-inside: avoid; }
  td { padding: 1.8mm 1.5mm; border-bottom: 0.3mm solid #E2DFF3; vertical-align: top; }
  td.box { width: 6mm; font-size: 12pt; color: #8A84B8; }
  td.file { width: 46mm; font: 8.5pt/1.3 Menlo, Consolas, monospace; color: #4A33A8; word-break: break-all; }
  td.meta { width: 38mm; font-size: 8.5pt; color: #6E66A8; }
  td.meta i { display: block; color: #B5651D; font-style: normal; }
  td.text { font-size: 11pt; }
  td.text .read { display: block; margin-top: 1mm; font-size: 9.5pt; color: #B5651D; }
  .done td.box { color: #3FA86B; }
</style></head><body>
<section class="cover">
  <h1>Roteiro de gravação — voz do Pipo</h1>
  <p>LogicPlay · todas as falas do jogo · gerado em ${generated}</p>
  <div class="stats">
    <div class="stat"><b>${all.length}</b>falas no total</div>
    <div class="stat"><b>${ageCount('5 a 8')}</b>5 a 8 anos</div>
    <div class="stat"><b>${ageCount('9 a 12')}</b>9 a 12 anos</div>
    <div class="stat"><b>${ageCount('13 anos')}</b>13 anos ou mais</div>
  </div>
  <p><b>Progresso:</b> ${done} de ${all.length} falas já gravadas.</p>
  <h2>Como gravar e colocar no jogo</h2>
  <ol>
    <li>Grave cada fala em um arquivo separado.</li>
    <li>Dê ao arquivo <b>exatamente</b> o nome da coluna “Arquivo” (pode ser .mp3, .m4a, .wav, .ogg ou .webm).</li>
    <li>Coloque os arquivos na pasta <code>src/assets/voz/</code> do projeto.</li>
    <li>Pronto: o jogo usa a gravação automaticamente. Falas ainda sem gravação continuam com a voz do navegador, então dá para gravar aos poucos.</li>
  </ol>
  <h2>Dicas</h2>
  <ul>
    <li>Ambiente silencioso, microfone ou celular a um palmo da boca, mesmo volume em todas as falas.</li>
    <li>Corte o silêncio do começo e do fim de cada arquivo.</li>
    <li>O tom sugerido aparece embaixo do nome do arquivo. Para 13 anos ou mais, a voz é mais tranquila, como um colega explicando.</li>
    <li><b>Símbolos:</b> a voz do Pipo nunca lê o símbolo. Quando a fala tem símbolos (∈, ∧, ≤…), aparece embaixo, em laranja, uma sugestão de leitura em palavras.</li>
    <li>Nomes que começam com <code>v-</code> são falas que o jogo sorteia (por exemplo, a missão com a cor da vez). Cada variação é um arquivo.</li>
    <li>Frases montadas na hora com números sorteados (como “O 7 é ímpar e o 4 é par”) são milhares de combinações e continuam com a voz do navegador.</li>
    <li>Não precisa ler palavra por palavra: se uma frase soar melhor de outro jeito, grave assim e avise para ajustar o texto na tela.</li>
  </ul>
</section>
`;
let currentAge = null;
for (const item of sections) {
  const age = Object.values(AGE_TITLES).find((title) => item.title.startsWith(title)) ?? null;
  if (age && age !== currentAge) {
    currentAge = age;
    html += `<h2 class="age">${escape(age)}</h2>\n`;
  }
  html += `<h2>${escape(age ? item.title.slice(age.length + 3) : item.title)}</h2>\n${item.subtitle ? `<p class="sub">${escape(item.subtitle)}</p>` : ''}<table>\n`;
  for (const line of item.lines) {
    const reading = speakable(line.text);
    const isDone = recorded.has(line.file);
    html += `<tr class="${isDone ? 'done' : ''}"><td class="box">${isDone ? '☑' : '☐'}</td><td class="file">${escape(line.file)}.mp3</td><td class="meta">${escape(line.where)}<i>${escape(TONE[line.tone] ?? line.tone)}</i></td><td class="text">${escape(line.text)}${reading ? `<span class="read">Leia: ${escape(reading)}</span>` : ''}</td></tr>\n`;
  }
  html += '</table>\n';
}
html += '</body></html>\n';
const htmlFile = new URL('ROTEIRO_DE_GRAVACAO.html', ROOT);
writeFileSync(htmlFile, html);

// ---------- PDF (com o Chrome instalado no computador) ----------
const CHROMES = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
];
const chrome = CHROMES.find((path) => existsSync(path));
let pdfNote = 'PDF não gerado (Google Chrome não encontrado): abra o ROTEIRO_DE_GRAVACAO.html e imprima em PDF.';
if (chrome) {
  const pdfPath = fileURLToPath(new URL('ROTEIRO_DE_GRAVACAO.pdf', ROOT));
  execFileSync(chrome, ['--headless=new', '--disable-gpu', '--no-pdf-header-footer', `--print-to-pdf=${pdfPath}`, htmlFile.href], { stdio: 'ignore' });
  pdfNote = 'PDF → ROTEIRO_DE_GRAVACAO.pdf';
}

console.log(`Roteiro gerado: ${all.length} falas (${done} gravadas) → ROTEIRO_DE_GRAVACAO.md e .html. ${pdfNote}`);
