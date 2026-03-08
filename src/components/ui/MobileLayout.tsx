'use client';

import { useRef, useEffect } from 'react';
import { useTheme } from '@/contexts/Theme';
import { renderGlobe, loadCoastlines, type Coastlines } from '@/lib/globe';

const GLOBE_SIZE = 160;

const CARD = `
  background: var(--gs-card);
  backdrop-filter: blur(20px) saturate(160%);
  -webkit-backdrop-filter: blur(20px) saturate(160%);
  border: 1px solid rgba(var(--gs-text-rgb),0.12);
  border-top-color: rgba(var(--gs-text-rgb),0.24);
  box-shadow:
    0 2px 4px rgba(0,0,0,0.15),
    0 8px 24px rgba(0,0,0,0.4),
    0 24px 48px rgba(0,0,0,0.25),
    inset 0 1px 0 rgba(var(--gs-text-rgb),0.05);
`;

const STYLES = `
  .gsm-layout {
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    z-index: 50;
    -webkit-overflow-scrolling: touch;
  }
  @media (min-width: 640px) {
    .gsm-layout { display: none !important; }
  }

  .gsm-scroll {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 82px 14px 56px;
    box-sizing: border-box;
    min-height: 100%;
  }

  /* ── Name ── */
  .gsm-name {
    ${CARD}
    border-radius: 18px;
    padding: 22px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .gsm-name-text {
    font-family: var(--font-barlow);
    font-weight: 900;
    font-size: clamp(38px, 10.5vw, 64px);
    line-height: 0.9;
    letter-spacing: -0.01em;
    text-transform: uppercase;
    color: var(--gs-text);
    text-align: center;
  }

  /* ── Headshot ── */
  .gsm-headshot {
    ${CARD}
    border-radius: 18px;
    padding: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .gsm-headshot img {
    width: 148px;
    height: 148px;
    object-fit: cover;
    object-position: center top;
    border-radius: 10px;
    display: block;
  }

  /* ── Role ── */
  .gsm-role {
    ${CARD}
    border-radius: 14px;
    padding: 16px 20px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .gsm-role-top {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .gsm-role-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #4ade80;
    flex-shrink: 0;
    animation: gs-role-pulse 2.4s ease-in-out infinite;
    box-shadow: 0 0 6px rgba(74,222,128,0.6);
  }
  .gsm-role-title {
    font-family: var(--font-jakarta);
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0.01em;
    color: rgba(var(--gs-text-rgb),0.65);
  }
  .gsm-role-company {
    font-family: 'Google Sans', sans-serif;
    font-size: 17px;
    font-weight: 500;
    letter-spacing: 0.01em;
    text-decoration: none;
    background: linear-gradient(
      90deg,
      rgba(var(--gs-text-rgb),0.55) 0%,
      rgba(var(--gs-text-rgb),1) 40%,
      rgba(var(--gs-text-rgb),1) 60%,
      rgba(var(--gs-text-rgb),0.55) 100%
    );
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: gs-role-shimmer 4s linear infinite;
    padding-left: 17px;
  }

  /* ── About ── */
  .gsm-about {
    ${CARD}
    border-radius: 20px;
    padding: 22px 20px 20px;
    display: flex;
    flex-direction: column;
  }
  .gsm-about-label {
    font-family: var(--font-jakarta);
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(var(--gs-text-rgb),0.5);
    margin-bottom: 14px;
  }
  .gsm-about-divider {
    width: 100%;
    height: 1px;
    background: rgba(var(--gs-text-rgb),0.1);
    margin-bottom: 16px;
  }
  .gsm-about-para {
    font-family: var(--font-jakarta);
    font-size: 13.5px;
    font-weight: 400;
    line-height: 1.75;
    color: rgba(var(--gs-text-rgb),0.78);
    margin: 0;
  }
  .gsm-about-rule {
    width: 100%;
    height: 1px;
    background: rgba(var(--gs-text-rgb),0.07);
    margin: 12px 0;
  }
  .gsm-about-link {
    color: rgba(var(--gs-text-rgb),0.95);
    text-decoration: underline;
    text-decoration-color: rgba(var(--gs-text-rgb),0.25);
    text-underline-offset: 3px;
  }

  /* ── Globe ── */
  .gsm-globe-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 8px 0 4px;
  }
  .gsm-globe-label {
    font-family: var(--font-jakarta);
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(var(--gs-text-rgb),0.3);
  }
  .gsm-globe-canvas {
    border-radius: 50%;
    display: block;
  }
`;

export default function MobileLayout() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const coastRef  = useRef<Coastlines | null>(null);
  const rotXRef   = useRef(0.38);
  const rotYRef   = useRef(0);
  const rafRef    = useRef(0);
  const { theme } = useTheme();
  const themeRef  = useRef(theme);
  useEffect(() => { themeRef.current = theme; }, [theme]);

  // Animation loop — auto-spin only (no touch drag to avoid scroll conflicts)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width  = GLOBE_SIZE * dpr;
    canvas.height = GLOBE_SIZE * dpr;
    canvas.style.width  = `${GLOBE_SIZE}px`;
    canvas.style.height = `${GLOBE_SIZE}px`;

    let lastT = performance.now();
    function tick(now: number) {
      const dt = Math.min((now - lastT) / 1000, 0.05);
      lastT = now;
      rotYRef.current += 0.0028 * dt * 60;
      const t = themeRef.current;
      if (canvas) renderGlobe(canvas, rotXRef.current, rotYRef.current, coastRef.current, GLOBE_SIZE, t.globeAccentRgb, t.globeBase1, t.globeBase2, t.globeBase3);
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Load coastlines
  useEffect(() => {
    let cancelled = false;
    loadCoastlines().then((lines) => {
      if (!cancelled) coastRef.current = lines;
    });
    return () => { cancelled = true; };
  }, []);

  return (
    <>
      <style>{STYLES}</style>
      <div className="gsm-layout">
        <div className="gsm-scroll">

          {/* 1 — Name */}
          <div className="gsm-name">
            <div className="gsm-name-text">Gursimran Singh</div>
          </div>

          {/* 2 — Headshot */}
          <div className="gsm-headshot">
            <img
              src="/headshot.jpg"
              alt="Gursimran Singh — Technical Program Manager at Google DeepMind"
              width={148}
              height={148}
              draggable={false}
              fetchPriority="high"
              loading="eager"
            />
          </div>

          {/* 3 — Role */}
          <div className="gsm-role">
            <div className="gsm-role-top">
              <span className="gsm-role-dot" />
              <span className="gsm-role-title">Technical Program Manager</span>
            </div>
            <a
              href="https://deepmind.google"
              target="_blank"
              rel="noopener noreferrer"
              className="gsm-role-company"
            >
              Google DeepMind
            </a>
          </div>

          {/* 4 — About */}
          <div className="gsm-about">
            <span className="gsm-about-label">About</span>
            <div className="gsm-about-divider" />
            <p className="gsm-about-para">
              Previously Product Manager at Microsoft Azure, working on Azure Observability and AIOps.
            </p>
            <div className="gsm-about-rule" />
            <p className="gsm-about-para">
              CS + Design at Georgia Tech. Founded a{' '}
              <a href="https://www.youtube.com/watch?v=0-CumFHE8eo" target="_blank" rel="noopener noreferrer" className="gsm-about-link">
                scooter-safety startup
              </a>
              , and built a lot at{' '}
              <a href="https://devpost.com/gsymmy" target="_blank" rel="noopener noreferrer" className="gsm-about-link">
                HackGT
              </a>
              .
            </p>
            <div className="gsm-about-rule" />
            <p className="gsm-about-para">
              Raised in Delhi, grew up on science fairs and competitive quizzing.
            </p>
          </div>

          {/* 5 — Globe */}
          <div className="gsm-globe-wrap">
            <canvas ref={canvasRef} className="gsm-globe-canvas" />
            <span className="gsm-globe-label">San Francisco, CA</span>
          </div>

        </div>
      </div>
    </>
  );
}
