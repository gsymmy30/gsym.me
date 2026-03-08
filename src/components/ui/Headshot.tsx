'use client';

import { useRef } from 'react';
import MacControls, { useMacScale } from './MacControls';
import { useSelectableDraggable } from '@/hooks/useSelectableDraggable';
import { usePillSelection } from '@/contexts/PillSelection';

const STYLES = `
  .gs-headshot-wrapper {
    position: fixed;
    cursor: grab;
    user-select: none;
    touch-action: none;
    z-index: 99;
  }

  .gs-headshot-wrapper:active {
    cursor: grabbing;
  }

  .gs-headshot-pill {
    border-radius: 20px;
    overflow: hidden;
    padding: 0 10px 10px;
    display: flex;
    flex-direction: column;
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
    transition: box-shadow 0.2s ease, transform 0.2s ease;
  }

  .gs-headshot-wrapper:active .gs-headshot-pill {
    box-shadow:
      0 2px 4px rgba(0,0,0,0.1),
      0 16px 40px rgba(0,0,0,0.55),
      0 32px 64px rgba(0,0,0,0.3),
      inset 0 1px 0 rgba(var(--gs-text-rgb),0.05);
  }

  .gs-headshot-pill img {
    display: block;
    width: 240px;
    height: 240px;
    object-fit: cover;
    object-position: center top;
    border-radius: 12px;
  }

  @media (max-width: 639px) {
    .gs-headshot-wrapper { display: none !important; }
  }
`;

export default function Headshot() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { scale, shrink, grow, reset, atMin, atMax } = useMacScale();
  const { selected } = usePillSelection();
  const isSelected = selected.has('headshot');

  const { pos, ready, onPointerDown, onPointerMove, onPointerUp } = useSelectableDraggable(wrapperRef, 'headshot', {
    initFn: (el) => {
      const isMobile = window.innerWidth < 640;
      if (isMobile) {
        return {
          x: Math.max(12, (window.innerWidth - el.offsetWidth) / 2),
          y: 210,
        };
      }
      return {
        x: window.innerWidth * 0.575,
        y: window.innerHeight * 0.165,
      };
    },
  });

  return (
    <>
      <style>{STYLES}</style>
      <div
        ref={wrapperRef}
        className="gs-headshot-wrapper"
        style={{
          left: pos.x,
          top: pos.y,
          opacity: ready ? 1 : 0,
          transition: ready ? 'opacity 0.4s ease' : 'none',
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        <div className="gs-headshot-pill" style={{ transform: `scale(${scale})`, transformOrigin: 'top left', ...(isSelected ? { outline: '1.5px solid rgba(var(--gs-text-rgb),0.4)', outlineOffset: '3px' } : {}) }}>
          <MacControls onShrink={shrink} onGrow={grow} onReset={reset} atMin={atMin} atMax={atMax} />
          <img
            src="/headshot.jpg"
            alt="Gursimran Singh — Technical Program Manager at Google DeepMind"
            width={240}
            height={240}
            draggable={false}
            fetchPriority="high"
            loading="eager"
          />
        </div>
      </div>
    </>
  );
}
