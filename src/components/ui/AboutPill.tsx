'use client';

import { useRef } from 'react';
import { useSelectableDraggable } from '@/hooks/useSelectableDraggable';
import { usePillSelection } from '@/contexts/PillSelection';

const STYLES = `
  .gs-about-wrapper {
    position: fixed;
    cursor: grab;
    user-select: none;
    touch-action: none;
    z-index: 99;
  }

  .gs-about-wrapper:active {
    cursor: grabbing;
  }

  .gs-about-pill {
    background: rgba(12, 30, 22, 0.82);
    backdrop-filter: blur(20px) saturate(160%);
    -webkit-backdrop-filter: blur(20px) saturate(160%);
    border: 1px solid rgba(218,215,205,0.12);
    border-top-color: rgba(218,215,205,0.24);
    border-radius: 20px;
    box-shadow:
      0 2px 4px rgba(0,0,0,0.15),
      0 8px 24px rgba(0,0,0,0.4),
      0 24px 48px rgba(0,0,0,0.25),
      inset 0 1px 0 rgba(218,215,205,0.05);
    padding: 28px 32px 24px;
    transition: box-shadow 0.2s ease;
    display: flex;
    flex-direction: column;
    width: 340px;
  }

  .gs-about-wrapper:active .gs-about-pill {
    box-shadow:
      0 2px 4px rgba(0,0,0,0.1),
      0 16px 40px rgba(0,0,0,0.55),
      0 32px 64px rgba(0,0,0,0.3),
      inset 0 1px 0 rgba(218,215,205,0.05);
  }

  .gs-about-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .gs-about-label {
    font-family: var(--font-jakarta);
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(218,215,205,0.5);
  }

  .gs-about-num {
    font-family: var(--font-geist-mono);
    font-size: 10px;
    font-weight: 400;
    letter-spacing: 0.08em;
    color: rgba(218,215,205,0.22);
  }

  .gs-about-divider {
    width: 100%;
    height: 1px;
    background: rgba(218,215,205,0.1);
    margin-bottom: 20px;
  }

  .gs-about-body {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .gs-about-para {
    font-family: var(--font-jakarta);
    font-size: 13.5px;
    font-weight: 400;
    line-height: 1.7;
    color: rgba(218,215,205,0.78);
    margin: 0;
  }

  .gs-about-para-rule {
    width: 100%;
    height: 1px;
    background: rgba(218,215,205,0.07);
  }

  .gs-about-link {
    color: rgba(218,215,205,0.95);
    text-decoration: underline;
    text-decoration-color: rgba(218,215,205,0.25);
    text-underline-offset: 3px;
    transition: text-decoration-color 0.2s ease;
  }

  .gs-about-link:hover {
    text-decoration-color: rgba(218,215,205,0.7);
  }

  @media (max-width: 640px) {
    .gs-about-pill {
      width: calc(100vw - 48px);
    }
  }
`;


export default function AboutPill() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { selected } = usePillSelection();
  const isSelected = selected.has('about');

  const { pos, ready, onPointerDown, onPointerMove, onPointerUp } = useSelectableDraggable(wrapperRef, 'about', {
    initFn: (el) => {
      const isMobile = window.innerWidth < 640;
      if (isMobile) {
        return {
          x: Math.max(12, (window.innerWidth - el.offsetWidth) / 2),
          y: 560,
        };
      }
      return {
        x: window.innerWidth * 0.44,
        y: window.innerHeight * 0.54,
      };
    },
  });

  return (
    <>
      <style>{STYLES}</style>
      <div
        ref={wrapperRef}
        className="gs-about-wrapper"
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
        <div className="gs-about-pill" style={isSelected ? { outline: '1.5px solid rgba(218,215,205,0.4)', outlineOffset: '3px' } : undefined}>
          <div className="gs-about-header">
            <span className="gs-about-label">About</span>
          </div>
          <div className="gs-about-divider" />
          <div className="gs-about-body">
            <p className="gs-about-para">
              Previously Product Manager at Microsoft Azure, working on Azure Observability and AIOps.
            </p>
            <div className="gs-about-para-rule" />
            <p className="gs-about-para">
              CS + Design at Georgia Tech. Founded a{' '}
              <a href="https://www.youtube.com/watch?v=0-CumFHE8eo" target="_blank" rel="noopener noreferrer" className="gs-about-link" onPointerDown={e => e.stopPropagation()}>scooter-safety startup</a>
              , and built a lot at{' '}
              <a href="https://devpost.com/gsymmy" target="_blank" rel="noopener noreferrer" className="gs-about-link" onPointerDown={e => e.stopPropagation()}>HackGT</a>
              .
            </p>
            <div className="gs-about-para-rule" />
            <p className="gs-about-para">
              Raised in Delhi, grew up on science fairs and competitive quizzing.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
