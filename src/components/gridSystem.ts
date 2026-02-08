// ─────────────────────────────────────────────────────────────
// gridSystem.ts — Deconstructed architectural grid with physics
// Pure TypeScript, no React. Canvas2D rendering.
// ─────────────────────────────────────────────────────────────

/* ── Types ─────────────────────────────────────────────────── */

export interface GridPoint {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
}

interface LineSegment {
  row: number;
  col: number;
  axis: "h" | "v"; // horizontal or vertical
  broken: boolean;
  overshoot: number; // 0 = normal, >0 = extends past endpoint (px)
  offset: number; // perpendicular offset (px)
}

interface Annotation {
  type: "circle" | "crosshair" | "arc" | "diagonal";
  x: number;
  y: number;
  // circle/arc
  radius?: number;
  arcStart?: number;
  arcEnd?: number;
  // diagonal
  x2?: number;
  y2?: number;
  // lifecycle
  birth: number; // timestamp when spawned
  fadeIn: number; // duration ms
  hold: number;
  fadeOut: number;
  useAccent: boolean; // indigo accent instead of white
}

export interface MouseState {
  rawX: number;
  rawY: number;
  smoothX: number;
  smoothY: number;
  active: boolean;
  influence: number; // 0-1
}

export interface GridConfig {
  width: number;
  height: number;
  spacing: number;
  cols: number;
  rows: number;
  dpr: number;
  isMobile: boolean;
  lensRadius: number;
  lensStrength: number;
  maxAnnotations: number;
}

export interface GridState {
  points: GridPoint[][];
  lines: LineSegment[];
  annotations: Annotation[];
  seed: number;
}

/* ── Config ────────────────────────────────────────────────── */

export function createConfig(width: number, height: number): GridConfig {
  const isMobile = width < 768;
  const spacing = isMobile ? 80 : 60;
  const cols = Math.ceil(width / spacing) + 2;
  const rows = Math.ceil(height / spacing) + 2;

  return {
    width,
    height,
    spacing,
    cols,
    rows,
    dpr: Math.min(window.devicePixelRatio || 1, 2),
    isMobile,
    lensRadius: isMobile ? 0 : 200,
    lensStrength: 25,
    maxAnnotations: isMobile ? 2 : 4,
  };
}

/* ── Seeded random (simple LCG) ────────────────────────────── */

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

/* ── Initialization ────────────────────────────────────────── */

export function createGrid(config: GridConfig): GridState {
  const seed = (Math.random() * 0xffffffff) >>> 0;
  const rng = seededRandom(seed);

  // Grid points — one extra ring outside viewport for edge continuity
  const points: GridPoint[][] = [];
  for (let r = 0; r <= config.rows; r++) {
    const row: GridPoint[] = [];
    for (let c = 0; c <= config.cols; c++) {
      const x = (c - 1) * config.spacing;
      const y = (r - 1) * config.spacing;
      row.push({ baseX: x, baseY: y, x, y });
    }
    points.push(row);
  }

  // Line segments with imperfections
  const lines: LineSegment[] = [];

  // Horizontal lines
  for (let r = 0; r <= config.rows; r++) {
    for (let c = 0; c < config.cols; c++) {
      const broken = rng() < 0.15;
      const overshoot = rng() < 0.05 ? 5 + rng() * 10 : 0;
      const offset = rng() < 0.05 ? (rng() - 0.5) * 8 : 0;
      lines.push({ row: r, col: c, axis: "h", broken, overshoot, offset });
    }
  }

  // Vertical lines
  for (let r = 0; r < config.rows; r++) {
    for (let c = 0; c <= config.cols; c++) {
      const broken = rng() < 0.15;
      const overshoot = rng() < 0.05 ? 5 + rng() * 10 : 0;
      const offset = rng() < 0.05 ? (rng() - 0.5) * 8 : 0;
      lines.push({ row: r, col: c, axis: "v", broken, overshoot, offset });
    }
  }

  return { points, lines, annotations: [], seed };
}

/* ── Mouse ─────────────────────────────────────────────────── */

export function createMouse(): MouseState {
  return { rawX: 0, rawY: 0, smoothX: 0, smoothY: 0, active: false, influence: 0 };
}

export function updateMousePosition(m: MouseState, x: number, y: number) {
  m.rawX = x;
  m.rawY = y;
  m.active = true;
}

export function mouseLeave(m: MouseState) {
  m.active = false;
}

function tickMouse(m: MouseState) {
  // Smooth position
  m.smoothX += (m.rawX - m.smoothX) * 0.08;
  m.smoothY += (m.rawY - m.smoothY) * 0.08;

  // Fade influence
  const target = m.active ? 1 : 0;
  const rate = m.active ? 0.04 : 0.025;
  m.influence += (target - m.influence) * rate;
  if (m.influence < 0.001) m.influence = 0;
}

/* ── Annotations lifecycle ─────────────────────────────────── */

function spawnAnnotation(config: GridConfig, rng: () => number): Annotation {
  const types: Annotation["type"][] = ["circle", "crosshair", "arc", "diagonal"];
  const type = types[Math.floor(rng() * types.length)];

  const x = rng() * config.width;
  const y = rng() * config.height;
  const now = performance.now();
  const useAccent = rng() < 0.25;

  const base: Annotation = {
    type,
    x,
    y,
    birth: now,
    fadeIn: 2000,
    hold: 6000 + rng() * 4000,
    fadeOut: 2000,
    useAccent,
  };

  switch (type) {
    case "circle":
      base.radius = 30 + rng() * 50;
      break;
    case "arc":
      base.radius = 25 + rng() * 60;
      base.arcStart = rng() * Math.PI * 2;
      base.arcEnd = base.arcStart + (Math.PI / 3) + rng() * Math.PI;
      break;
    case "diagonal": {
      const angle = rng() * Math.PI * 2;
      const len = 40 + rng() * 80;
      base.x2 = x + Math.cos(angle) * len;
      base.y2 = y + Math.sin(angle) * len;
      break;
    }
  }

  return base;
}

function getAnnotationAlpha(a: Annotation, now: number): number {
  const age = now - a.birth;
  if (age < 0) return 0;
  if (age < a.fadeIn) return age / a.fadeIn;
  if (age < a.fadeIn + a.hold) return 1;
  const fadeAge = age - a.fadeIn - a.hold;
  if (fadeAge < a.fadeOut) return 1 - fadeAge / a.fadeOut;
  return 0; // expired
}

function tickAnnotations(state: GridState, config: GridConfig) {
  const now = performance.now();

  // Remove expired
  state.annotations = state.annotations.filter((a) => {
    const age = now - a.birth;
    return age < a.fadeIn + a.hold + a.fadeOut;
  });

  // Spawn new if needed
  const rng = () => Math.random();
  while (state.annotations.length < config.maxAnnotations) {
    state.annotations.push(spawnAnnotation(config, rng));
  }
}

/* ── Physics step ──────────────────────────────────────────── */

export function step(
  state: GridState,
  mouse: MouseState,
  config: GridConfig,
  time: number,
) {
  tickMouse(mouse);
  tickAnnotations(state, config);

  // Update grid point positions
  for (let r = 0; r <= config.rows; r++) {
    for (let c = 0; c <= config.cols; c++) {
      const p = state.points[r][c];

      // Noise displacement (breathing)
      const nx =
        Math.sin(p.baseX * 0.01 + time * 0.0003) *
        Math.sin(p.baseY * 0.008 + time * 0.0002) *
        8;
      const ny =
        Math.cos(p.baseY * 0.01 + time * 0.0004) *
        Math.cos(p.baseX * 0.009 + time * 0.0003) *
        8;

      p.x = p.baseX + nx;
      p.y = p.baseY + ny;

      // Gravitational lensing from mouse
      if (mouse.influence > 0.001 && config.lensRadius > 0) {
        const dx = p.x - mouse.smoothX;
        const dy = p.y - mouse.smoothY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < config.lensRadius && dist > 1) {
          const falloff = (1 - dist / config.lensRadius);
          const strength = config.lensStrength * falloff * falloff * mouse.influence;
          p.x += (dx / dist) * strength;
          p.y += (dy / dist) * strength;
        }
      }
    }
  }
}

/* ── Rendering ─────────────────────────────────────────────── */

export function render(
  ctx: CanvasRenderingContext2D,
  state: GridState,
  mouse: MouseState,
  config: GridConfig,
  time: number,
) {
  ctx.clearRect(0, 0, config.width, config.height);
  ctx.lineCap = "round";

  const { points, lines } = state;

  // Draw grid lines
  for (const seg of lines) {
    let p1: GridPoint;
    let p2: GridPoint;

    if (seg.axis === "h") {
      p1 = points[seg.row]?.[seg.col];
      p2 = points[seg.row]?.[seg.col + 1];
    } else {
      p1 = points[seg.row]?.[seg.col];
      p2 = points[seg.row + 1]?.[seg.col];
    }

    if (!p1 || !p2) continue;

    // Determine opacity — structural emphasis every 4th line
    const isStructural =
      (seg.axis === "h" && seg.row % 4 === 0) ||
      (seg.axis === "v" && seg.col % 4 === 0);

    let alpha = isStructural ? 0.09 : 0.04;

    // Brighten near mouse
    if (mouse.influence > 0.001 && config.lensRadius > 0) {
      const mx = (p1.x + p2.x) / 2;
      const my = (p1.y + p2.y) / 2;
      const dx = mx - mouse.smoothX;
      const dy = my - mouse.smoothY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < config.lensRadius) {
        const boost = (1 - dist / config.lensRadius) * 0.08 * mouse.influence;
        alpha += boost;
      }
    }

    // Breathing pulse
    const breathe =
      Math.sin(time * 0.0008 + (seg.row + seg.col) * 0.3) * 0.015;
    alpha += breathe;
    alpha = Math.max(0, Math.min(alpha, 0.2));

    // Apply perpendicular offset
    let x1 = p1.x;
    let y1 = p1.y;
    let x2 = p2.x;
    let y2 = p2.y;

    if (seg.offset !== 0) {
      if (seg.axis === "h") {
        y1 += seg.offset;
        y2 += seg.offset;
      } else {
        x1 += seg.offset;
        x2 += seg.offset;
      }
    }

    // Overshoot
    if (seg.overshoot > 0) {
      const dx = x2 - x1;
      const dy = y2 - y1;
      const len = Math.sqrt(dx * dx + dy * dy);
      if (len > 0) {
        const nx = dx / len;
        const ny = dy / len;
        x1 -= nx * seg.overshoot;
        y1 -= ny * seg.overshoot;
        x2 += nx * seg.overshoot;
        y2 += ny * seg.overshoot;
      }
    }

    ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
    ctx.lineWidth = 0.5;

    if (seg.broken) {
      // Draw with a gap in the middle third
      const t1 = 0.33;
      const t2 = 0.66;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x1 + (x2 - x1) * t1, y1 + (y2 - y1) * t1);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(x1 + (x2 - x1) * t2, y1 + (y2 - y1) * t2);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
  }

  // Draw annotations
  const now = performance.now();
  for (const a of state.annotations) {
    const lifeAlpha = getAnnotationAlpha(a, now);
    if (lifeAlpha <= 0) continue;

    const baseAlpha = a.useAccent ? 0.1 : 0.06;
    const alpha = baseAlpha * lifeAlpha;
    const color = a.useAccent
      ? `rgba(99,102,241,${alpha})`
      : `rgba(255,255,255,${alpha})`;

    ctx.strokeStyle = color;
    ctx.lineWidth = 0.5;

    switch (a.type) {
      case "circle":
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.radius!, 0, Math.PI * 2);
        ctx.stroke();
        break;

      case "crosshair": {
        const s = 10;
        ctx.beginPath();
        ctx.moveTo(a.x - s, a.y);
        ctx.lineTo(a.x + s, a.y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(a.x, a.y - s);
        ctx.lineTo(a.x, a.y + s);
        ctx.stroke();
        break;
      }

      case "arc":
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.radius!, a.arcStart!, a.arcEnd!);
        ctx.stroke();
        break;

      case "diagonal":
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(a.x2!, a.y2!);
        ctx.stroke();
        break;
    }
  }

  // Mouse glow
  if (mouse.influence > 0.01 && config.lensRadius > 0) {
    const g = ctx.createRadialGradient(
      mouse.smoothX,
      mouse.smoothY,
      0,
      mouse.smoothX,
      mouse.smoothY,
      config.lensRadius,
    );
    g.addColorStop(0, `rgba(99,102,241,${0.04 * mouse.influence})`);
    g.addColorStop(0.6, `rgba(99,102,241,${0.015 * mouse.influence})`);
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.fillRect(
      mouse.smoothX - config.lensRadius,
      mouse.smoothY - config.lensRadius,
      config.lensRadius * 2,
      config.lensRadius * 2,
    );
  }
}
