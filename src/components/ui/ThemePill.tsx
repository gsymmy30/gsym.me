'use client';

import { useRef } from 'react';
import { useDraggable } from '@/hooks/useDraggable';
import { useTheme } from '@/contexts/Theme';
import { THEMES, THEME_IDS, type ThemeId } from '@/lib/themes';

const SWATCH_COLORS: Record<ThemeId, string> = {
  blue:  '#001538',
  green: '#2d4a3e',
  white: '#f0ede8',
  black: '#080808',
};

const STYLES = `
  .gs-theme-wrapper {
    position: fixed;
    cursor: grab;
    user-select: none;
    touch-action: none;
    z-index: 99;
  }

  .gs-theme-wrapper:active {
    cursor: grabbing;
  }

  .gs-theme-pill {
    background: var(--gs-card);
    backdrop-filter: blur(20px) saturate(160%);
    -webkit-backdrop-filter: blur(20px) saturate(160%);
    border: 1px solid rgba(var(--gs-text-rgb),0.12);
    border-top-color: rgba(var(--gs-text-rgb),0.24);
    border-radius: 20px;
    box-shadow:
      0 2px 4px rgba(0,0,0,0.15),
      0 8px 24px rgba(0,0,0,0.4),
      0 24px 48px rgba(0,0,0,0.25),
      inset 0 1px 0 rgba(var(--gs-text-rgb),0.05);
    padding: 16px 20px 18px;
    display: flex;
    flex-direction: column;
    gap: 11px;
    transition: box-shadow 0.2s ease;
  }

  .gs-theme-wrapper:active .gs-theme-pill {
    box-shadow:
      0 2px 4px rgba(0,0,0,0.1),
      0 16px 40px rgba(0,0,0,0.55),
      0 32px 64px rgba(0,0,0,0.3),
      inset 0 1px 0 rgba(var(--gs-text-rgb),0.05);
  }

  .gs-theme-label {
    font-family: var(--font-syne);
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(var(--gs-text-rgb),0.4);
  }

  .gs-theme-swatches {
    display: flex;
    gap: 9px;
    align-items: center;
  }

  .gs-theme-swatch {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    cursor: pointer;
    border: 1.5px solid rgba(var(--gs-text-rgb),0.15);
    transition: transform 0.18s ease, box-shadow 0.18s ease;
    flex-shrink: 0;
    padding: 0;
    appearance: none;
    -webkit-appearance: none;
  }

  .gs-theme-swatch:hover {
    transform: scale(1.14);
  }

  .gs-theme-swatch.active {
    box-shadow: 0 0 0 2px var(--gs-text);
    border-color: transparent;
  }

  @media (max-width: 639px) {
    .gs-theme-wrapper { display: none !important; }
  }
`;

export default function ThemePill() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();

  const { pos, ready, onPointerDown, onPointerMove, onPointerUp } = useDraggable(wrapperRef, {
    initFn: () => ({
      x: window.innerWidth  * 0.72,
      y: window.innerHeight * 0.78,
    }),
  });

  return (
    <>
      <style>{STYLES}</style>
      <div
        ref={wrapperRef}
        className="gs-theme-wrapper"
        style={{
          left: pos.x,
          top:  pos.y,
          opacity: ready ? 1 : 0,
          transition: ready ? 'opacity 0.4s ease' : 'none',
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        <div className="gs-theme-pill">
          <span className="gs-theme-label">Palette</span>
          <div className="gs-theme-swatches">
            {THEME_IDS.map((id) => (
              <button
                key={id}
                className={`gs-theme-swatch${theme.id === id ? ' active' : ''}`}
                style={{ background: SWATCH_COLORS[id] }}
                onClick={(e) => { e.stopPropagation(); setTheme(id); }}
                onPointerDown={(e) => e.stopPropagation()}
                title={THEMES[id].label}
                aria-label={`Switch to ${THEMES[id].label} theme`}
                aria-pressed={theme.id === id}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
