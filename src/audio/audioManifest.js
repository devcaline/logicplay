/**
 * Falas gravadas do Pipo.
 *
 * Coloque os arquivos em src/assets/voz/ com o nome igual ao código da fala
 * (veja ROTEIRO_DE_GRAVACAO.md na raiz do projeto), por exemplo:
 *
 *   src/assets/voz/f1k.intro.1.mp3
 *
 * Eles são encontrados automaticamente. Falas sem gravação usam a voz do navegador.
 * Formatos aceitos: mp3, m4a, wav, ogg, webm.
 */
const files = import.meta.glob('../assets/voz/*.{mp3,m4a,wav,ogg,webm}', {
  eager: true,
  query: '?url',
  import: 'default',
});

export const AUDIO_MANIFEST = Object.fromEntries(
  Object.entries(files).map(([path, url]) => [path.split('/').pop().replace(/\.[^.]+$/, ''), url]),
);
