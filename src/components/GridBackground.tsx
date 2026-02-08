"use client";

import { useEffect, useRef } from "react";
import {
  createConfig,
  createGrid,
  createMouse,
  updateMousePosition,
  mouseLeave,
  step,
  render,
  type GridConfig,
  type GridState,
  type MouseState,
} from "./gridSystem";

export default function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let config: GridConfig;
    let state: GridState;
    let mouse: MouseState = createMouse();
    let rafId: number;
    let lastTime = 0;
    let resizeTimer: ReturnType<typeof setTimeout>;

    function sizeCanvas() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      config = createConfig(w, h);
      state = createGrid(config);

      canvas!.width = w * config.dpr;
      canvas!.height = h * config.dpr;
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(config.dpr, 0, 0, config.dpr, 0, 0);
    }

    sizeCanvas();

    // Pointer events on window (canvas has pointer-events: none)
    const onPointerMove = (e: PointerEvent) => {
      updateMousePosition(mouse, e.clientX, e.clientY);
    };
    const onPointerLeave = () => mouseLeave(mouse);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);

    // Touch support
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updateMousePosition(mouse, e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updateMousePosition(mouse, e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const onTouchEnd = () => mouseLeave(mouse);

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    // Resize
    const ro = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(sizeCanvas, 100);
    });
    ro.observe(document.body);

    // Visibility — pause when hidden
    let paused = false;
    const onVisibility = () => {
      if (document.hidden) {
        paused = true;
        cancelAnimationFrame(rafId);
      } else {
        paused = false;
        lastTime = performance.now();
        rafId = requestAnimationFrame(loop);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    // Animation loop
    function loop(time: number) {
      if (paused) return;

      const delta = time - lastTime;
      lastTime = time;

      // Skip if returning from background
      if (delta > 200) {
        rafId = requestAnimationFrame(loop);
        return;
      }

      step(state, mouse, config, time);
      render(ctx!, state, mouse, config, time);

      rafId = requestAnimationFrame(loop);
    }

    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      document.removeEventListener("visibilitychange", onVisibility);
      ro.disconnect();
      clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
