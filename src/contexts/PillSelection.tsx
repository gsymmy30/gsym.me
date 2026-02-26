'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

interface PillEntry {
  getRect: () => DOMRect;
  move: (dx: number, dy: number) => void;
}

interface PillSelectionCtx {
  selected: Set<string>;
  isSelectedNow: (id: string) => boolean;
  setSelected: (ids: Set<string>) => void;
  clearSelection: () => void;
  registerPill: (id: string, getRect: () => DOMRect, move: (dx: number, dy: number) => void) => void;
  unregisterPill: (id: string) => void;
  moveSelected: (excludeId: string, dx: number, dy: number) => void;
  selectInBox: (box: { x: number; y: number; w: number; h: number }) => void;
}

const Ctx = createContext<PillSelectionCtx | null>(null);

export function PillSelectionProvider({ children }: { children: React.ReactNode }) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const selectedRef = useRef<Set<string>>(new Set());
  const registry = useRef(new Map<string, PillEntry>());

  useEffect(() => {
    selectedRef.current = selected;
  }, [selected]);

  const isSelectedNow = useCallback((id: string) => selectedRef.current.has(id), []);
  const clearSelection = useCallback(() => setSelected(new Set()), []);

  const registerPill = useCallback((
    id: string,
    getRect: () => DOMRect,
    move: (dx: number, dy: number) => void,
  ) => {
    registry.current.set(id, { getRect, move });
  }, []);

  const unregisterPill = useCallback((id: string) => {
    registry.current.delete(id);
  }, []);

  const moveSelected = useCallback((excludeId: string, dx: number, dy: number) => {
    selectedRef.current.forEach(id => {
      if (id !== excludeId) registry.current.get(id)?.move(dx, dy);
    });
  }, []);

  const selectInBox = useCallback((box: { x: number; y: number; w: number; h: number }) => {
    const next = new Set<string>();
    registry.current.forEach((entry, id) => {
      const r = entry.getRect();
      if (r.left < box.x + box.w && r.right > box.x && r.top < box.y + box.h && r.bottom > box.y) {
        next.add(id);
      }
    });
    if (next.size > 0) setSelected(next);
  }, []);

  return (
    <Ctx.Provider value={{ selected, isSelectedNow, setSelected, clearSelection, registerPill, unregisterPill, moveSelected, selectInBox }}>
      {children}
    </Ctx.Provider>
  );
}

export function usePillSelection() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('usePillSelection must be used within PillSelectionProvider');
  return ctx;
}
