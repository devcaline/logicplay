import { useLayoutEffect, useRef } from 'react';
import './FitScreen.css';

/** O conteúdo principal de cada tela (o que pode ser reduzido para caber). */
const TARGET = ':scope > .screen > :is(main, .screen__content, .game-layout, .teen-layout), :scope > .screen > .teen-boss__main > .teen-layout';
const MIN_SCALE = 0.5;
/** Elementos presos à tela (position: fixed) dentro do conteúdo, como as pedras dos Guardiões no computador. */
const FIXED_INSIDE = '.rune-bar, .teen-boss__runes, .guardian-side-burst';
const ZOOM_SUPPORTED = typeof CSS !== 'undefined' && CSS.supports?.('zoom', '0.5');

/**
 * Faz a tela caber na altura do aparelho, sem barra de rolagem (só o mapa rola).
 *
 * O conteúdo continua com o layout normal; quando ele fica mais alto do que o espaço
 * disponível (por exemplo, ao aparecer uma dica ou uma tabela), é reduzido por igual
 * com `transform: scale`, a partir do topo. Um ResizeObserver refaz a conta sempre que
 * o conteúdo ou a janela mudam de tamanho.
 */
export default function FitScreen({ children }) {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    let target = null;
    let frame = 0;

    const fit = () => {
      frame = 0;
      const next = root.querySelector(TARGET);
      if (next !== target) {
        resizeObserver.disconnect();
        target = next;
        if (target) resizeObserver.observe(target);
      }
      if (!target) return;
      const screen = target.closest('.screen');
      // Um transform faria os elementos "fixed" de dentro se moverem junto; nesses casos, usa zoom.
      const useZoom = ZOOM_SUPPORTED && [...target.querySelectorAll(FIXED_INSIDE)].some((el) => getComputedStyle(el).position === 'fixed');
      // Altura natural (sempre medida sem zoom e sem o crescimento do flex, que esticaria o conteúdo).
      target.style.zoom = '';
      const wasScaled = target.classList.contains('is-fit-scaled');
      if (!wasScaled) target.classList.add('is-fit-measuring');
      const natural = Math.max(target.scrollHeight, target.offsetHeight);
      target.classList.remove('is-fit-measuring');
      const top = target.getBoundingClientRect().top - screen.getBoundingClientRect().top;
      const available = window.innerHeight - top;
      const scale = natural > available + 1 ? Math.max(MIN_SCALE, available / natural) : 1;
      target.classList.toggle('is-fit-scaled', scale < 1);
      target.classList.toggle('is-fit-zoomed', scale < 1 && useZoom);
      if (scale < 1) {
        target.style.setProperty('--fit-scale', scale.toFixed(4));
        target.style.setProperty('--fit-pull', useZoom ? '0px' : `${(-natural * (1 - scale)).toFixed(1)}px`);
        if (useZoom) target.style.zoom = scale.toFixed(4);
      } else {
        target.style.removeProperty('--fit-scale');
        target.style.removeProperty('--fit-pull');
      }
      screen.classList.add('is-fit');
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(fit);
    };
    const resizeObserver = new ResizeObserver(schedule);
    // Telas que trocam de conteúdo (ex.: carregando → jogo) recriam o alvo.
    const mutationObserver = new MutationObserver(schedule);
    mutationObserver.observe(root, { childList: true, subtree: true });
    window.addEventListener('resize', schedule);
    fit();

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener('resize', schedule);
    };
  }, []);

  return (
    <div ref={rootRef} className="fit-screen">
      {children}
    </div>
  );
}
