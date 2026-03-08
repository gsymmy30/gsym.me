'use client';

import { useRef, useEffect, useCallback } from 'react';
import { useSelectableDraggable } from '@/hooks/useSelectableDraggable';
import { usePillSelection } from '@/contexts/PillSelection';
import { useTheme } from '@/contexts/Theme';
import { renderGlobe, loadCoastlines, type Coastlines } from '@/lib/globe';

const CSS_SIZE = 200;


const STYLES = `
  .gs-globe-wrapper {
    position: fixed;
    cursor: grab;
    user-select: none;
    touch-action: none;
    z-index: 99;
    border-radius: 50%;
  }

  .gs-globe-canvas {
    border-radius: 50%;
    display: block;
    cursor: crosshair;
  }

  .gs-globe-canvas:active {
    cursor: grabbing;
  }

  @media (max-width: 639px) {
    .gs-globe-wrapper { display: none !important; }
  }
`;

export default function GlobePill() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const coastRef   = useRef<Coastlines | null>(null);
  const { selected } = usePillSelection();
  const isSelected = selected.has('globe');

  const { theme } = useTheme();
  const themeRef = useRef(theme);
  useEffect(() => { themeRef.current = theme; }, [theme]);

  const rotXRef = useRef(0.38);
  const rotYRef = useRef(0);
  const velXRef = useRef(0);
  const velYRef = useRef(0);
  const autoRef = useRef(true);
  const isDragging = useRef(false);
  const lastPt  = useRef({ x: 0, y: 0 });
  const rafRef  = useRef(0);

  const {
    pos, ready,
    onPointerDown: hookDown,
    onPointerMove: hookMove,
    onPointerUp:   hookUp,
  } = useSelectableDraggable(wrapperRef, 'globe', {
    initFn: (el) => {
      const isMobile = window.innerWidth < 640;
      if (isMobile) {
        return {
          x: Math.max(12, (window.innerWidth - el.offsetWidth) / 2),
          y: 200,
        };
      }
      return {
        x: window.innerWidth  * 0.235,
        y: window.innerHeight * 0.635,
      };
    },
  });

  // Setup canvas + animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width  = CSS_SIZE * dpr;
    canvas.height = CSS_SIZE * dpr;
    canvas.style.width  = `${CSS_SIZE}px`;
    canvas.style.height = `${CSS_SIZE}px`;

    let lastT = performance.now();

    function tick(now: number) {
      const dt = Math.min((now - lastT) / 1000, 0.05);
      lastT = now;

      if (!isDragging.current) {
        if (Math.abs(velXRef.current) > 0.0001 || Math.abs(velYRef.current) > 0.0001) {
          rotYRef.current += velXRef.current;
          rotXRef.current += velYRef.current;
          velXRef.current *= 0.91;
          velYRef.current *= 0.91;
        } else if (autoRef.current) {
          rotYRef.current += 0.0028 * dt * 60;
        }
      }

      rotXRef.current = Math.max(-1.3, Math.min(1.3, rotXRef.current));
      const t = themeRef.current;
      if (canvas) renderGlobe(canvas, rotXRef.current, rotYRef.current, coastRef.current, CSS_SIZE, t.globeAccentRgb, t.globeBase1, t.globeBase2, t.globeBase3);
      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Load real coastline outlines (GeoJSON) if available
  useEffect(() => {
    let cancelled = false;
    loadCoastlines().then((lines) => {
      if (!cancelled) coastRef.current = lines;
    });
    return () => { cancelled = true; };
  }, []);

  // Wrap the hook handlers to also spin the globe on drag
  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    hookDown(e);
    isDragging.current = true;
    autoRef.current    = false;
    velXRef.current    = 0;
    velYRef.current    = 0;
    lastPt.current     = { x: e.clientX, y: e.clientY };
  }, [hookDown]);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    hookMove(e);
    if (!isDragging.current) return;
    const dx = e.clientX - lastPt.current.x;
    const dy = e.clientY - lastPt.current.y;
    velXRef.current = dx * 0.009;
    velYRef.current = dy * 0.009;
    rotYRef.current += dx * 0.009;
    rotXRef.current += dy * 0.009;
    lastPt.current = { x: e.clientX, y: e.clientY };
  }, [hookMove]);

  const onPointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    hookUp(e);
    isDragging.current = false;
    setTimeout(() => { autoRef.current = true; }, 3000);
  }, [hookUp]);

  return (
    <>
      <style>{STYLES}</style>
      <div
        ref={wrapperRef}
        className="gs-globe-wrapper"
        style={{
          left: pos.x,
          top:  pos.y,
          opacity: ready ? 1 : 0,
          transition: ready ? 'opacity 0.4s ease' : 'none',
          outline: isSelected ? '1.5px solid rgba(218,215,205,0.4)' : undefined,
          outlineOffset: isSelected ? '3px' : undefined,
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        <canvas ref={canvasRef} className="gs-globe-canvas" />
      </div>
    </>
  );
}
