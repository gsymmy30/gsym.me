'use client';

import { useRef } from 'react';
import { useDraggable } from '@/hooks/useDraggable';

const STYLES = `
  .gs-personal-wrapper {
    position: fixed;
    cursor: grab;
    user-select: none;
    touch-action: none;
    z-index: 99;
  }

  .gs-personal-wrapper:active {
    cursor: grabbing;
  }

  .gs-personal-pill {
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

  .gs-personal-wrapper:active .gs-personal-pill {
    box-shadow:
      0 2px 4px rgba(0,0,0,0.1),
      0 16px 40px rgba(0,0,0,0.55),
      0 32px 64px rgba(0,0,0,0.3),
      inset 0 1px 0 rgba(218,215,205,0.05);
  }

  .gs-personal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .gs-personal-label {
    font-family: var(--font-jakarta);
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(218,215,205,0.5);
  }

  .gs-personal-num {
    font-family: var(--font-geist-mono);
    font-size: 10px;
    font-weight: 400;
    letter-spacing: 0.08em;
    color: rgba(218,215,205,0.22);
  }

  .gs-personal-divider {
    width: 100%;
    height: 1px;
    background: rgba(218,215,205,0.1);
    margin-bottom: 20px;
  }

  .gs-personal-body {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .gs-personal-para {
    font-family: var(--font-jakarta);
    font-size: 13.5px;
    font-weight: 400;
    line-height: 1.7;
    color: rgba(218,215,205,0.78);
    margin: 0;
  }

  .gs-personal-para-rule {
    width: 100%;
    height: 1px;
    background: rgba(218,215,205,0.07);
  }

  @media (max-width: 640px) {
    .gs-personal-pill {
      width: calc(100vw - 48px);
    }
  }
`;

const paras = [
  'In college I spelled out "Hire Me" with sticky notes on my dorm window. It went viral and got covered in the New York Post.',
  'At 14, I built wearable glasses to aid the visually impaired using a Raspberry Pi. The project earned me an award from Michael Phelps.',
  'Fitness is a big part of my life. Over the past few years I\'ve lost weight, built muscle, and tracked progress obsessively on Strava and Hevy. I\'ve trained in boxing and CrossFit, and spend a lot of time kayaking or on the rowing erg.',
  'I\'m a big sports fan and love watching live games. My favorite teams are the LA Clippers and the Philadelphia Eagles. By pure luck, I\'ve been interviewed a few times on ESPN and TNT during games.',
];

export default function PersonalPill() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { pos, ready, onPointerDown, onPointerMove, onPointerUp } = useDraggable(wrapperRef, {
    initFn: (el) => {
      const isMobile = window.innerWidth < 640;
      if (isMobile) {
        return {
          x: Math.max(12, (window.innerWidth - el.offsetWidth) / 2),
          y: 760,
        };
      }
      return {
        x: 80,
        y: (window.innerHeight - el.offsetHeight) / 2,
      };
    },
  });

  return (
    <>
      <style>{STYLES}</style>
      <div
        ref={wrapperRef}
        className="gs-personal-wrapper"
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
        <div className="gs-personal-pill">
          <div className="gs-personal-header">
            <span className="gs-personal-label">Personal</span>
            <span className="gs-personal-num">03</span>
          </div>
          <div className="gs-personal-divider" />
          <div className="gs-personal-body">
            {paras.map((p, i) => (
              <>
                <p key={i} className="gs-personal-para">{p}</p>
                {i < paras.length - 1 && <div key={`r${i}`} className="gs-personal-para-rule" />}
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
