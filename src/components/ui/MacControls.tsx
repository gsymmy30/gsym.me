'use client';

import { useState } from 'react';

export const SCALES = [0.6, 0.75, 1.0, 1.25, 1.5];
export const DEFAULT_IDX = 2;

export function useMacScale() {
  const [idx, setIdx] = useState(DEFAULT_IDX);
  return {
    scale: SCALES[idx],
    shrink: () => setIdx(i => Math.max(0, i - 1)),
    grow:   () => setIdx(i => Math.min(SCALES.length - 1, i + 1)),
    reset:  () => setIdx(DEFAULT_IDX),
    atMin: idx === 0,
    atMax: idx === SCALES.length - 1,
  };
}

const DOT: React.CSSProperties = {
  width: 11,
  height: 11,
  borderRadius: '50%',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 7,
  fontWeight: 700,
  color: 'transparent',
  transition: 'color 0.15s, filter 0.15s',
  flexShrink: 0,
  lineHeight: 1,
};

interface Props {
  onShrink: () => void;
  onGrow:   () => void;
  onReset:  () => void;
  atMin: boolean;
  atMax: boolean;
}

export default function MacControls({ onShrink, onGrow, onReset, atMin, atMax }: Props) {
  const [hovered, setHovered] = useState<null | 'red' | 'yellow' | 'green'>(null);

  const stop = (fn: () => void) => (e: React.PointerEvent | React.MouseEvent) => {
    e.stopPropagation();
    fn();
  };

  return (
    <div
      style={{
        display: 'flex',
        gap: 6,
        alignItems: 'center',
        padding: '10px 14px 8px',
        width: '100%',
      }}
      onPointerDown={e => e.stopPropagation()}
      onMouseEnter={() => setHovered('red')}
      onMouseLeave={() => setHovered(null)}
    >
      {/* Red — shrink */}
      <button
        onClick={stop(onShrink)}
        style={{
          ...DOT,
          background: atMin ? 'rgba(255,95,87,0.35)' : '#ff5f57',
          color: hovered ? 'rgba(0,0,0,0.6)' : 'transparent',
        }}
        title="Shrink"
      >−</button>

      {/* Yellow — reset */}
      <button
        onClick={stop(onReset)}
        style={{
          ...DOT,
          background: '#ffbd2e',
          color: hovered ? 'rgba(0,0,0,0.6)' : 'transparent',
        }}
        title="Reset"
      >◎</button>

      {/* Green — grow */}
      <button
        onClick={stop(onGrow)}
        style={{
          ...DOT,
          background: atMax ? 'rgba(40,200,64,0.35)' : '#28c840',
          color: hovered ? 'rgba(0,0,0,0.6)' : 'transparent',
        }}
        title="Grow"
      >+</button>
    </div>
  );
}
