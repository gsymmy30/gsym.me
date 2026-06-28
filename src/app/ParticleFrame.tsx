"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  hx: number;
  hy: number;
  size: number;
  alpha: number;
  delay: number;
};

/**
 * Hard sub-pixel particles that assemble into a border tracing the perimeter
 * of a target element, then scatter away from the cursor and spring back.
 * Inspired by the canvas particle effect on rauch.com — hand-rolled, no deps.
 */
export function ParticleFrame({
  photoId,
  bottomId
}: {
  photoId: string;
  bottomId: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const dpr = Math.max(1, Math.round(window.devicePixelRatio || 1));
    const cell = dpr; // snap grid → crisp, no anti-aliasing
    const GAP = 16; // vertical gap between the photo and the rectangle
    const SPACING = 2.5; // distance between neighbouring particles (css px)
    const FRICTION = 0.86;
    const SPRING = 0.045;
    const REPEL_RADIUS = 110; // css px
    const REPEL_FORCE = 26;

    let particles: Particle[] = [];
    let raf = 0;
    let start = 0;
    const mouse = { x: -9999, y: -9999, down: false };

    const color = "64,78,59"; // --color-forest rgb

    const layout = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.imageSmoothingEnabled = false;

      // The effect lives in the empty left column of the two-column desktop
      // layout. On mobile the layout is a single stack with no spare column,
      // so the rectangle would overlap the text — skip it there.
      const photo = document.getElementById(photoId);
      const card = document.getElementById(bottomId);
      if (!photo || !card || w < 768) {
        particles = [];
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }
      const pr = photo.getBoundingClientRect();
      const cr = card.getBoundingClientRect();
      // a filled rectangle directly below the photo: same width as the photo,
      // running down to the bottom of the text column
      const left = pr.left * dpr;
      const right = pr.right * dpr;
      const top = (pr.bottom + GAP) * dpr;
      const bottom = cr.bottom * dpr;
      const step = SPACING * dpr;
      if (bottom <= top) {
        particles = [];
        return;
      }

      const prev = particles;
      particles = [];
      let i = 0;
      for (let gy = top; gy <= bottom; gy += step) {
        for (let gx = left; gx <= right; gx += step) {
          const hx = gx;
          const hy = gy;
          const old = prev[i];
          particles.push({
            // start at home so the rectangle is fully formed on first paint
            x: old ? old.x : hx,
            y: old ? old.y : hy,
            vx: 0,
            vy: 0,
            hx,
            hy,
            size: cell, // one device pixel — fine, hard dots
            alpha: 0.55 + Math.random() * 0.35,
            delay: 0
          });
          i++;
        }
      }
    };

    const draw = (now: number) => {
      if (!start) start = now;
      const elapsed = now - start;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mx = mouse.x * dpr;
      const my = mouse.y * dpr;
      const repelR = REPEL_RADIUS * dpr;
      const repelR2 = repelR * repelR;

      for (const p of particles) {
        if (elapsed > p.delay) {
          // spring toward home
          p.vx += (p.hx - p.x) * SPRING;
          p.vy += (p.hy - p.y) * SPRING;

          // push away from cursor only while the button is held (drag)
          if (mouse.down && !reduceMotion) {
            const dx = p.x - mx;
            const dy = p.y - my;
            const d2 = dx * dx + dy * dy;
            if (d2 < repelR2 && d2 > 0.01) {
              const d = Math.sqrt(d2);
              const f = (1 - d / repelR) ** 2 * REPEL_FORCE * dpr;
              p.vx += (dx / d) * f;
              p.vy += (dy / d) * f;
            }
          }

          p.vx *= FRICTION;
          p.vy *= FRICTION;
          p.x += p.vx;
          p.y += p.vy;
        }

        // pixel-snap and draw a hard square
        const sx = Math.round(p.x / cell) * cell;
        const sy = Math.round(p.y / cell) * cell;
        ctx.fillStyle = `rgba(${color},${p.alpha})`;
        ctx.fillRect(sx, sy, p.size, p.size);
      }

      raf = requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onDown = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.down = true;
    };
    const onUp = () => {
      mouse.down = false;
    };

    layout();
    raf = requestAnimationFrame(draw);

    const ro = new ResizeObserver(layout);
    const photoEl = document.getElementById(photoId);
    const cardEl = document.getElementById(bottomId);
    if (photoEl) ro.observe(photoEl);
    if (cardEl) ro.observe(cardEl);
    window.addEventListener("resize", layout);
    window.addEventListener("scroll", layout, { passive: true });
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", layout);
      window.removeEventListener("scroll", layout);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [photoId, bottomId]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
      style={{ display: "block", imageRendering: "pixelated" }}
    />
  );
}
