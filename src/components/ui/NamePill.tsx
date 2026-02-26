'use client';

import { useRef } from 'react';
import { useSelectableDraggable } from '@/hooks/useSelectableDraggable';
import { usePillSelection } from '@/contexts/PillSelection';

const STYLES = `
  .gs-name-wrapper {
    position: fixed;
    cursor: grab;
    user-select: none;
    touch-action: none;
    z-index: 99;
  }

  .gs-name-wrapper:active {
    cursor: grabbing;
  }

  .gs-name-pill {
    background: rgba(12, 30, 22, 0.82);
    backdrop-filter: blur(20px) saturate(160%);
    -webkit-backdrop-filter: blur(20px) saturate(160%);
    border: 1px solid rgba(218,215,205,0.12);
    border-top-color: rgba(218,215,205,0.24);
    border-radius: 18px;
    box-shadow:
      0 2px 4px rgba(0,0,0,0.15),
      0 8px 24px rgba(0,0,0,0.4),
      0 24px 48px rgba(0,0,0,0.25),
      inset 0 1px 0 rgba(218,215,205,0.05);
    padding: 28px 36px;
    transition: box-shadow 0.2s ease, transform 0.2s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .gs-name-wrapper:active .gs-name-pill {
    box-shadow:
      0 2px 4px rgba(0,0,0,0.1),
      0 16px 40px rgba(0,0,0,0.55),
      0 32px 64px rgba(0,0,0,0.3),
      inset 0 1px 0 rgba(218,215,205,0.05);
  }

  .gs-name-eyebrow {
    font-family: var(--font-syne);
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(218,215,205,0.4);
    margin-bottom: 6px;
  }

  .gs-name-text {
    font-family: var(--font-barlow);
    font-weight: 900;
    font-size: 72px;
    line-height: 0.9;
    letter-spacing: -0.01em;
    text-transform: uppercase;
    color: #dad7cd;
    white-space: nowrap;
  }

  @media (max-width: 640px) {
    .gs-name-text {
      font-size: clamp(32px, 9vw, 72px);
    }
    .gs-name-pill {
      padding: 20px;
    }
  }
`;

export default function NamePill() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { selected } = usePillSelection();
  const isSelected = selected.has('name');

  const { pos, ready, onPointerDown, onPointerMove, onPointerUp } = useSelectableDraggable(wrapperRef, 'name', {
    initFn: (el) => {
      const isMobile = window.innerWidth < 640;
      if (isMobile) {
        return {
          x: Math.max(12, (window.innerWidth - el.offsetWidth) / 2),
          y: 88,
        };
      }
      return {
        x: window.innerWidth * 0.188,
        y: window.innerHeight * 0.276,
      };
    },
  });

  return (
    <>
      <style>{STYLES}</style>
      <div
        ref={wrapperRef}
        className="gs-name-wrapper"
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
        <div className="gs-name-pill" style={isSelected ? { outline: '1.5px solid rgba(218,215,205,0.4)', outlineOffset: '3px' } : undefined}>
          <div className="gs-name-text">Gursimran Singh</div>
        </div>
      </div>
    </>
  );
}
