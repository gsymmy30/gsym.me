import { useCallback, useEffect, useRef, useState } from 'react';
import { usePillSelection } from '@/contexts/PillSelection';

interface Options {
  initFn?: (el: HTMLElement) => { x: number; y: number };
}

export function useSelectableDraggable(
  ref: React.RefObject<HTMLElement | null>,
  id: string,
  options: Options = {},
) {
  const ctx = usePillSelection();
  const posRef    = useRef({ x: 0, y: 0 });
  const dragStart = useRef({ px: 0, py: 0, ex: 0, ey: 0 });
  const dragging  = useRef(false);
  const moveRef   = useRef<(dx: number, dy: number) => void>(() => {});

  const [pos,   setPos]   = useState({ x: 0, y: 0 });
  const [ready, setReady] = useState(false);

  const move = useCallback((dx: number, dy: number) => {
    const el = ref.current;
    if (!el) return;
    const nx = Math.max(0, Math.min(window.innerWidth  - el.offsetWidth,  posRef.current.x + dx));
    const ny = Math.max(0, Math.min(window.innerHeight - el.offsetHeight, posRef.current.y + dy));
    posRef.current = { x: nx, y: ny };
    setPos({ x: nx, y: ny });
  }, [ref]);

  useEffect(() => { moveRef.current = move; }, [move]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const init = options.initFn ? options.initFn(el) : { x: 0, y: 0 };
    posRef.current = init;
    setPos(init);
    setReady(true);
    ctx.registerPill(
      id,
      () => ref.current?.getBoundingClientRect() ?? new DOMRect(),
      (dx, dy) => moveRef.current(dx, dy),
    );
    return () => ctx.unregisterPill(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('a') || target.closest('button')) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragging.current = true;
    dragStart.current = { px: posRef.current.x, py: posRef.current.y, ex: e.clientX, ey: e.clientY };
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return;
    const el = ref.current;
    if (!el) return;
    const nx = Math.max(0, Math.min(window.innerWidth  - el.offsetWidth,  dragStart.current.px + e.clientX - dragStart.current.ex));
    const ny = Math.max(0, Math.min(window.innerHeight - el.offsetHeight, dragStart.current.py + e.clientY - dragStart.current.ey));

    if (ctx.isSelectedNow(id)) {
      const dx = nx - posRef.current.x;
      const dy = ny - posRef.current.y;
      if (dx !== 0 || dy !== 0) ctx.moveSelected(id, dx, dy);
    }

    posRef.current = { x: nx, y: ny };
    setPos({ x: nx, y: ny });
  }, [ref, id, ctx]);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    dragging.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
  }, []);

  return { pos, ready, onPointerDown, onPointerMove, onPointerUp };
}
