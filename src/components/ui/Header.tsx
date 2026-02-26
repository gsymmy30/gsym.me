'use client';

import { useRef } from 'react';
import { useDraggable } from '@/hooks/useDraggable';

const STYLES = `
  .gs-pill-wrapper {
    position: fixed;
    cursor: grab;
    user-select: none;
    touch-action: none;
    z-index: 100;
  }

  .gs-pill-wrapper:active {
    cursor: grabbing;
  }

  .gs-pill-wrapper:active .gs-pill {
    box-shadow:
      0 2px 4px rgba(0,0,0,0.1),
      0 16px 40px rgba(0,0,0,0.5),
      0 32px 64px rgba(0,0,0,0.3),
      inset 0 1px 0 rgba(218,215,205,0.05);
    transform: scale(1.015);
  }

  .gs-pill {
    transition: box-shadow 0.2s ease, transform 0.2s ease;
  }

  .gs-pill {
    display: flex;
    align-items: center;
    height: 50px;
    width: 100%;
    max-width: 660px;
    padding: 0 6px;
    gap: 2px;
    background: rgba(12, 30, 22, 0.82);
    backdrop-filter: blur(20px) saturate(160%);
    -webkit-backdrop-filter: blur(20px) saturate(160%);
    border: 1px solid rgba(218,215,205,0.12);
    border-top-color: rgba(218,215,205,0.24);
    border-radius: 14px;
    box-shadow:
      0 2px 4px rgba(0,0,0,0.15),
      0 8px 24px rgba(0,0,0,0.35),
      0 24px 48px rgba(0,0,0,0.2),
      inset 0 1px 0 rgba(218,215,205,0.05);
    color: #dad7cd;
    font-family: var(--font-syne);
  }

  .gs-logo-cell {
    display: flex;
    align-items: center;
    padding: 0 14px 0 12px;
    flex-shrink: 0;
  }

  .gs-rule {
    width: 1px;
    height: 22px;
    background: rgba(218,215,205,0.14);
    flex-shrink: 0;
    margin: 0 6px;
  }

  .gs-location {
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    opacity: 0.38;
    white-space: nowrap;
    padding: 0 6px;
    user-select: none;
  }

  .gs-spacer { flex: 1; }

  .gs-social {
    display: flex;
    align-items: center;
    gap: 2px;
  }

  .gs-icon-btn {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    border-radius: 10px;
    color: #dad7cd;
    text-decoration: none;
    transition: background 0.22s ease;
  }

  .gs-icon-btn svg {
    opacity: 0.4;
    transition: opacity 0.22s ease, transform 0.28s cubic-bezier(0.34,1.56,0.64,1);
  }

  .gs-icon-btn::after {
    content: '';
    position: absolute;
    bottom: 5px;
    left: 50%;
    transform: translateX(-50%) scaleX(0);
    width: 14px;
    height: 1.5px;
    background: #dad7cd;
    border-radius: 2px;
    opacity: 0.7;
    transition: transform 0.25s cubic-bezier(0.4,0,0.2,1);
  }

  .gs-icon-btn:hover {
    background: rgba(218,215,205,0.07);
  }

  .gs-icon-btn:hover svg {
    opacity: 1;
    transform: translateY(-2px);
  }

  .gs-icon-btn:hover::after {
    transform: translateX(-50%) scaleX(1);
  }

  @media (max-width: 640px) {
    .gs-pill-wrapper {
      width: calc(100vw - 24px);
    }
    .gs-location {
      display: none;
    }
    .gs-loc-rule {
      display: none;
    }
  }
`;

export default function Header() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { pos, ready, onPointerDown, onPointerMove, onPointerUp } = useDraggable(wrapperRef, {
    initFn: (el) => ({
      x: (window.innerWidth - el.offsetWidth) / 2,
      y: 22,
    }),
  });

  return (
    <>
      <style>{STYLES}</style>
      <div
        ref={wrapperRef}
        className="gs-pill-wrapper"
        style={{
          left: pos.x,
          top: pos.y,
          opacity: ready ? 1 : 0,
          transition: ready ? 'opacity 0.3s ease' : 'none',
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
      <div className="gs-pill">
        {/* Logo */}
        <div className="gs-logo-cell">
          <img
            src="/gsymmy.png"
            alt="GS"
            style={{ height: 38, width: 'auto', display: 'block', filter: 'brightness(0) invert(1)', opacity: 0.88 }}
          />
        </div>

        <div className="gs-rule gs-loc-rule" />

        {/* Location */}
        <span className="gs-location">San Francisco, CA</span>

        <div className="gs-spacer" />

        {/* Social icons */}
        <div className="gs-social">
          <a href="https://www.linkedin.com/in/pingthesingh/" target="_blank" rel="noopener noreferrer" className="gs-icon-btn" title="LinkedIn">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
              <rect x="2" y="9" width="4" height="12"/>
              <circle cx="4" cy="4" r="2"/>
            </svg>
          </a>

          <a href="https://github.com/gsymmy30" target="_blank" rel="noopener noreferrer" className="gs-icon-btn" title="GitHub">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
            </svg>
          </a>

          <a href="https://x.com/gsymmy" target="_blank" rel="noopener noreferrer" className="gs-icon-btn" title="X">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.736-8.836L2.25 2.25h6.865l4.265 5.638 5.864-5.638zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>

          <a href="mailto:gsymmy@gmail.com" className="gs-icon-btn" title="Email">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </a>
        </div>

      </div>
    </div>
    </>
  );
}
