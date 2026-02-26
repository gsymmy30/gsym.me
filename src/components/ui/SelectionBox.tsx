'use client';

import { useCallback, useRef, useState } from 'react';
import { usePillSelection } from '@/contexts/PillSelection';

export default function SelectionBox() {
  const { clearSelection, selectInBox } = usePillSelection();
  const [box, setBox] = useState<{ x: number; y: number; w: number; h: number } | null>(null);
  const startRef = useRef<{ x: number; y: number } | null>(null);
  const activeRef = useRef(false);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    activeRef.current = true;
    startRef.current = { x: e.clientX, y: e.clientY };
    setBox({ x: e.clientX, y: e.clientY, w: 0, h: 0 });
    clearSelection();
  }, [clearSelection]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!activeRef.current || !startRef.current) return;
    const { x: sx, y: sy } = startRef.current;
    setBox({
      x: Math.min(sx, e.clientX),
      y: Math.min(sy, e.clientY),
      w: Math.abs(e.clientX - sx),
      h: Math.abs(e.clientY - sy),
    });
  }, []);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    if (!activeRef.current) return;
    activeRef.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
    if (box && box.w > 8 && box.h > 8) selectInBox(box);
    setBox(null);
    startRef.current = null;
  }, [box, selectInBox]);

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 5 }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      {box && box.w > 4 && box.h > 4 && (
        <div style={{
          position: 'absolute',
          left: box.x,
          top: box.y,
          width: box.w,
          height: box.h,
          border: '1.5px dashed rgba(218,215,205,0.45)',
          borderRadius: 6,
          background: 'rgba(218,215,205,0.04)',
          pointerEvents: 'none',
        }} />
      )}
    </div>
  );
}
