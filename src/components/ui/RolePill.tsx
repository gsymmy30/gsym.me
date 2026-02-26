'use client';

import { useRef } from 'react';
import { useSelectableDraggable } from '@/hooks/useSelectableDraggable';
import { usePillSelection } from '@/contexts/PillSelection';

const STYLES = `
  @keyframes gs-role-shimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }

  @keyframes gs-role-pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: 0.6; transform: scale(0.85); }
  }

  .gs-role-wrapper {
    position: fixed;
    cursor: grab;
    user-select: none;
    touch-action: none;
    z-index: 99;
  }

  .gs-role-wrapper:active {
    cursor: grabbing;
  }

  .gs-role-pill {
    background: rgba(12, 30, 22, 0.82);
    backdrop-filter: blur(20px) saturate(160%);
    -webkit-backdrop-filter: blur(20px) saturate(160%);
    border: 1px solid rgba(218,215,205,0.12);
    border-top-color: rgba(218,215,205,0.24);
    border-radius: 14px;
    box-shadow:
      0 2px 4px rgba(0,0,0,0.15),
      0 8px 24px rgba(0,0,0,0.4),
      0 24px 48px rgba(0,0,0,0.25),
      inset 0 1px 0 rgba(218,215,205,0.05);
    padding: 18px 32px;
    transition: box-shadow 0.2s ease, transform 0.2s ease;
    display: flex;
    align-items: center;
    gap: 14px;
    white-space: nowrap;
  }

  .gs-role-wrapper:active .gs-role-pill {
    box-shadow:
      0 2px 4px rgba(0,0,0,0.1),
      0 16px 40px rgba(0,0,0,0.55),
      0 32px 64px rgba(0,0,0,0.3),
      inset 0 1px 0 rgba(218,215,205,0.05);
  }

  .gs-role-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #4ade80;
    flex-shrink: 0;
    animation: gs-role-pulse 2.4s ease-in-out infinite;
    box-shadow: 0 0 6px rgba(74, 222, 128, 0.6);
  }

  .gs-role-divider {
    width: 1px;
    height: 18px;
    background: rgba(218,215,205,0.14);
    flex-shrink: 0;
  }

  .gs-role-text {
    font-family: var(--font-jakarta);
    font-size: 15px;
    font-weight: 400;
    letter-spacing: 0.01em;
    color: rgba(218,215,205,0.65);
  }

  .gs-role-link {
    font-family: 'Google Sans', sans-serif;
    font-size: 18px;
    font-weight: 500;
    letter-spacing: 0.01em;
    text-decoration: none;
    background: linear-gradient(
      90deg,
      rgba(218,215,205,0.55) 0%,
      rgba(218,215,205,1) 40%,
      rgba(218,215,205,1) 60%,
      rgba(218,215,205,0.55) 100%
    );
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: gs-role-shimmer 4s linear infinite;
    transition: opacity 0.2s ease;
  }

  .gs-role-link:hover {
    opacity: 0.8;
  }

  @media (max-width: 640px) {
    .gs-role-pill {
      padding: 14px 20px;
      gap: 10px;
    }
    .gs-role-text,
    .gs-role-link {
      font-size: 14px;
    }
  }
`;

export default function RolePill() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { selected } = usePillSelection();
  const isSelected = selected.has('role');

  const { pos, ready, onPointerDown, onPointerMove, onPointerUp } = useSelectableDraggable(wrapperRef, 'role', {
    initFn: (el) => {
      const isMobile = window.innerWidth < 640;
      if (isMobile) {
        return {
          x: Math.max(12, (window.innerWidth - el.offsetWidth) / 2),
          y: 420,
        };
      }
      return {
        x: window.innerWidth * 0.188,
        y: window.innerHeight * 0.45,
      };
    },
  });

  return (
    <>
      <style>{STYLES}</style>
      <div
        ref={wrapperRef}
        className="gs-role-wrapper"
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
        <div className="gs-role-pill" style={isSelected ? { outline: '1.5px solid rgba(218,215,205,0.4)', outlineOffset: '3px' } : undefined}>
          <span className="gs-role-dot" />
          <span className="gs-role-text">Technical Program Manager</span>
          <span className="gs-role-divider" />
          <a
            href="https://deepmind.google"
            target="_blank"
            rel="noopener noreferrer"
            className="gs-role-link"
            onPointerDown={(e) => e.stopPropagation()}
          >
            Google DeepMind
          </a>
        </div>
      </div>
    </>
  );
}
