import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimalTokenFace } from './AnimalToken.jsx';

const DRAG_THRESHOLD = 8; // px antes de considerar que virou arraste

/**
 * Arrastar e soltar elementos com Pointer Events (mouse, toque e caneta),
 * com toque simples (ou teclado) como alternativa.
 *
 * - zoneAt(x, y): diz em que lugar o ponteiro está (ex.: 'in', 'out', 'both'...)
 * - onDrop(id, zone): o elemento foi solto nesse lugar
 * - onTap(id): toque/clique simples ou Enter/Espaço no elemento
 * - onDragStart(id): começou a arrastar
 */
export function useTokenDrag({ disabled, zoneAt, onDrop, onTap, onDragStart }) {
  const [drag, setDrag] = useState(null);
  const pointerRef = useRef(null);
  const suppressClickRef = useRef(false);

  const handlers = {
    onPointerDown(event, id) {
      suppressClickRef.current = false;
      if (disabled || (event.pointerType === 'mouse' && event.button !== 0)) return;
      const rect = event.currentTarget.getBoundingClientRect();
      pointerRef.current = {
        id,
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        offsetX: event.clientX - rect.left,
        offsetY: event.clientY - rect.top,
        width: rect.width,
        height: rect.height,
        dragging: false,
      };
      event.currentTarget.setPointerCapture?.(event.pointerId);
    },
    onPointerMove(event) {
      const pointer = pointerRef.current;
      if (!pointer || pointer.pointerId !== event.pointerId) return;
      if (!pointer.dragging) {
        const distance = Math.hypot(event.clientX - pointer.startX, event.clientY - pointer.startY);
        if (distance < DRAG_THRESHOLD) return;
        pointer.dragging = true;
        onDragStart?.(pointer.id);
      }
      setDrag({
        id: pointer.id,
        x: event.clientX - pointer.offsetX,
        y: event.clientY - pointer.offsetY,
        width: pointer.width,
        height: pointer.height,
        over: zoneAt(event.clientX, event.clientY),
      });
    },
    onPointerUp(event) {
      const pointer = pointerRef.current;
      if (!pointer || pointer.pointerId !== event.pointerId) return;
      pointerRef.current = null;
      if (pointer.dragging) {
        suppressClickRef.current = true;
        onDrop(pointer.id, zoneAt(event.clientX, event.clientY));
        setDrag(null);
      }
    },
    onPointerCancel() {
      // Nada se perde: o elemento continua onde estava.
      pointerRef.current = null;
      setDrag(null);
    },
    onClick(event, id) {
      event.stopPropagation();
      if (suppressClickRef.current) {
        suppressClickRef.current = false;
        return;
      }
      if (disabled) return;
      onTap(id);
    },
  };

  return { drag, handlers };
}

/** Cópia do elemento que acompanha o dedo/mouse durante o arraste. */
export function DragGhost({ drag, item, showHint, highlight, compact = false, children }) {
  if (!drag || !item) return null;
  return createPortal(
    <div
      className={`token token--ghost ${compact ? 'token--compact' : ''} ${highlight ? 'is-over' : ''}`}
      style={{ width: drag.width, height: drag.height, transform: `translate(${drag.x}px, ${drag.y}px)` }}
      aria-hidden="true"
    >
      <AnimalTokenFace item={item} showHint={showHint} />
      {children}
    </div>,
    document.body,
  );
}
