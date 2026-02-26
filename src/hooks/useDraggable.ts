import { useCallback, useEffect, useRef, useState } from 'react';

interface Options {
  initX?: 'center' | number;
  initY?: 'center' | number;
  offsetX?: number;
  offsetY?: number;
  initFn?: (el: HTMLElement) => { x: number; y: number };
}

export function useDraggable(ref: React.RefObject<HTMLElement | null>, options: Options = {}) {
  const posRef    = useRef({ x: 0, y: 0 });
  const dragStart = useRef({ px: 0, py: 0, ex: 0, ey: 0 });
  const dragging  = useRef(false);

  const [pos,   setPos]   = useState({ x: 0, y: 0 });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let init: { x: number; y: number };
    if (options.initFn) {
      init = options.initFn(el);
    } else {
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      const x = options.initX === 'center'
        ? (window.innerWidth  - w) / 2
        : (options.initX ?? 0);
      const y = options.initY === 'center'
        ? (window.innerHeight - h) / 2
        : (options.initY ?? 0);
      init = { x: x + (options.offsetX ?? 0), y: y + (options.offsetY ?? 0) };
    }
    posRef.current = init;
    setPos(init);
    setReady(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('a') || target.closest('button')) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragging.current = true;
    dragStart.current = {
      px: posRef.current.x,
      py: posRef.current.y,
      ex: e.clientX,
      ey: e.clientY,
    };
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return;
    const el = ref.current;
    if (!el) return;
    const nx = Math.max(0, Math.min(
      window.innerWidth  - el.offsetWidth,
      dragStart.current.px + e.clientX - dragStart.current.ex,
    ));
    const ny = Math.max(0, Math.min(
      window.innerHeight - el.offsetHeight,
      dragStart.current.py + e.clientY - dragStart.current.ey,
    ));
    posRef.current = { x: nx, y: ny };
    setPos({ x: nx, y: ny });
  }, [ref]);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    dragging.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
  }, []);

  return { pos, ready, onPointerDown, onPointerMove, onPointerUp };
}
