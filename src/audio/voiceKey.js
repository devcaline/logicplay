/**
 * Nome de arquivo de gravação calculado a partir do TEXTO da fala.
 * Serve para as falas que o jogo monta sorteando cores e regras (9 a 12 anos): o código delas
 * muda a cada partida, mas o texto se repete. O roteiro de gravação lista esses nomes.
 *
 *   voiceKey('Coloque dentro do círculo todas as bolinhas vermelhas.') → 'v-1a2b3c4d'
 */
export function voiceKey(text) {
  const normalized = text.trim().replace(/\s+/g, ' ');
  let hash = 0x811c9dc5; // FNV-1a, 32 bits
  for (let index = 0; index < normalized.length; index += 1) {
    hash ^= normalized.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return `v-${hash.toString(16).padStart(8, '0')}`;
}
