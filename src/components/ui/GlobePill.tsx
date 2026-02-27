'use client';

import { useRef, useEffect, useCallback } from 'react';
import { useSelectableDraggable } from '@/hooks/useSelectableDraggable';
import { usePillSelection } from '@/contexts/PillSelection';

const CSS_SIZE = 200;

function renderGlobe(canvas: HTMLCanvasElement, rotX: number, rotY: number) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const W = canvas.width;
  const H = canvas.height;
  const dpr = W / CSS_SIZE;
  const cx = W / 2;
  const cy = H / 2;
  const r = (CSS_SIZE / 2 - 6) * dpr;

  ctx.clearRect(0, 0, W, H);

  // Atmosphere halo
  const atmo = ctx.createRadialGradient(cx, cy, r * 0.9, cx, cy, r * 1.22);
  atmo.addColorStop(0, 'rgba(107,171,160,0)');
  atmo.addColorStop(0.6, 'rgba(107,171,160,0.07)');
  atmo.addColorStop(1, 'rgba(107,171,160,0.32)');
  ctx.beginPath();
  ctx.arc(cx, cy, r * 1.22, 0, Math.PI * 2);
  ctx.fillStyle = atmo;
  ctx.fill();

  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.clip();

  // Dark sphere base
  const base = ctx.createRadialGradient(cx - r * 0.28, cy - r * 0.28, r * 0.04, cx + r * 0.12, cy + r * 0.12, r * 1.1);
  base.addColorStop(0, '#1c4438');
  base.addColorStop(0.45, '#0e2820');
  base.addColorStop(1, '#040f0c');
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, W, H);

  // Rotation matrices
  const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
  const cosY = Math.cos(rotY), sinY = Math.sin(rotY);

  function project(lat: number, lon: number): [number, number, number] {
    const lr = (lat * Math.PI) / 180;
    const nr = (lon * Math.PI) / 180;
    const x0 = Math.cos(lr) * Math.sin(nr);
    const y0 = Math.sin(lr);
    const z0 = Math.cos(lr) * Math.cos(nr);
    // rotate Y
    const xR = cosY * x0 + sinY * z0;
    const zR = -sinY * x0 + cosY * z0;
    // rotate X
    const yF = cosX * y0 - sinX * zR;
    const zF = sinX * y0 + cosX * zR;
    return [cx + xR * r, cy - yF * r, zF];
  }

  // Latitude lines
  for (let lat = -80; lat <= 80; lat += 20) {
    const isEquator = lat === 0;
    ctx.beginPath();
    let down = false;
    for (let lon = -180; lon <= 181; lon += 1.5) {
      const [px, py, pz] = project(lat, lon);
      if (pz >= 0) {
        down ? ctx.lineTo(px, py) : ctx.moveTo(px, py);
        down = true;
      } else { down = false; }
    }
    ctx.strokeStyle = isEquator
      ? 'rgba(107,171,160,0.55)'
      : 'rgba(107,171,160,0.18)';
    ctx.lineWidth = (isEquator ? 1.4 : 0.75) * dpr;
    ctx.stroke();
  }

  // Longitude lines
  for (let lon = 0; lon < 360; lon += 20) {
    ctx.beginPath();
    let down = false;
    for (let lat = -90; lat <= 90; lat += 1.5) {
      const [px, py, pz] = project(lat, lon);
      if (pz >= 0) {
        down ? ctx.lineTo(px, py) : ctx.moveTo(px, py);
        down = true;
      } else { down = false; }
    }
    ctx.strokeStyle = 'rgba(107,171,160,0.15)';
    ctx.lineWidth = 0.75 * dpr;
    ctx.stroke();
  }

  // Prime meridian (brighter)
  ctx.beginPath();
  let down = false;
  for (let lat = -90; lat <= 90; lat += 1) {
    const [px, py, pz] = project(lat, 0);
    if (pz >= 0) {
      down ? ctx.lineTo(px, py) : ctx.moveTo(px, py);
      down = true;
    } else { down = false; }
  }
  ctx.strokeStyle = 'rgba(107,171,160,0.38)';
  ctx.lineWidth = 1.1 * dpr;
  ctx.stroke();

  // Glossy specular highlight
  const hl = ctx.createRadialGradient(cx - r * 0.4, cy - r * 0.45, 0, cx - r * 0.18, cy - r * 0.18, r * 0.7);
  hl.addColorStop(0, 'rgba(218,215,205,0.20)');
  hl.addColorStop(0.45, 'rgba(218,215,205,0.05)');
  hl.addColorStop(1, 'rgba(218,215,205,0)');
  ctx.fillStyle = hl;
  ctx.fillRect(0, 0, W, H);

  // Edge vignette
  const edge = ctx.createRadialGradient(cx, cy, r * 0.52, cx, cy, r);
  edge.addColorStop(0, 'rgba(0,0,0,0)');
  edge.addColorStop(1, 'rgba(0,0,0,0.62)');
  ctx.fillStyle = edge;
  ctx.fillRect(0, 0, W, H);

  ctx.restore();

  // Subtle outer stroke ring
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(107,171,160,0.12)';
  ctx.lineWidth = 1 * dpr;
  ctx.stroke();
}

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
`;

export default function GlobePill() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const { selected } = usePillSelection();
  const isSelected = selected.has('globe');

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
      if (canvas) renderGlobe(canvas, rotXRef.current, rotYRef.current);
      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
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
