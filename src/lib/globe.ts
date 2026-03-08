export type LonLat = [number, number];
export type Coastlines = LonLat[][];

export const COAST_URL = '/data/ne_110m_coastline.json';

export async function loadCoastlines(): Promise<Coastlines> {
  try {
    const res = await fetch(COAST_URL);
    if (!res.ok) return [];
    const geo = await res.json();
    if (!geo) return [];
    const lines: Coastlines = [];
    for (const feature of geo.features ?? []) {
      const geom = feature.geometry;
      if (!geom) continue;
      if (geom.type === 'LineString') {
        lines.push(geom.coordinates as LonLat[]);
      } else if (geom.type === 'MultiLineString') {
        for (const line of geom.coordinates) lines.push(line as LonLat[]);
      }
    }
    return lines;
  } catch {
    return [];
  }
}

export function renderGlobe(
  canvas: HTMLCanvasElement,
  rotX: number,
  rotY: number,
  coast: Coastlines | null,
  cssSize = 200,
  accentRgb = '85,144,232',
  base1 = '#0a1a3a',
  base2 = '#050e28',
  base3 = '#010614',
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const W = canvas.width;
  const H = canvas.height;
  const dpr = W / cssSize;
  const cx = W / 2;
  const cy = H / 2;
  const r = (cssSize / 2 - 6) * dpr;

  ctx.clearRect(0, 0, W, H);

  // Atmosphere halo
  const atmo = ctx.createRadialGradient(cx, cy, r * 0.9, cx, cy, r * 1.22);
  atmo.addColorStop(0, `rgba(${accentRgb},0)`);
  atmo.addColorStop(0.6, `rgba(${accentRgb},0.07)`);
  atmo.addColorStop(1, `rgba(${accentRgb},0.32)`);
  ctx.beginPath();
  ctx.arc(cx, cy, r * 1.22, 0, Math.PI * 2);
  ctx.fillStyle = atmo;
  ctx.fill();

  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.clip();

  // Sphere base
  const base = ctx.createRadialGradient(cx - r * 0.28, cy - r * 0.28, r * 0.04, cx + r * 0.12, cy + r * 0.12, r * 1.1);
  base.addColorStop(0, base1);
  base.addColorStop(0.45, base2);
  base.addColorStop(1, base3);
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, W, H);

  const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
  const cosY = Math.cos(rotY), sinY = Math.sin(rotY);

  function wrapLon(a: number, b: number) {
    let d = a - b;
    while (d > 180) d -= 360;
    while (d < -180) d += 360;
    return d;
  }
  function bump(lat: number, lon: number, clat: number, clon: number, rx: number, ry: number, amp: number) {
    const dx = wrapLon(lon, clon) / rx;
    const dy = (lat - clat) / ry;
    return amp * Math.exp(-(dx * dx + dy * dy));
  }
  function landMask(lat: number, lon: number) {
    let v = 0;
    v += bump(lat, lon, 50, -110, 32, 18, 1.1);
    v += bump(lat, lon, 40, -95, 28, 16, 0.9);
    v += bump(lat, lon, 25, -100, 20, 12, 0.6);
    v += bump(lat, lon, 15, -85, 12, 10, 0.5);
    v += bump(lat, lon, -15, -60, 16, 22, 0.9);
    v += bump(lat, lon, -35, -65, 12, 14, 0.7);
    v += bump(lat, lon, 72, -40, 10, 6, 0.6);
    v += bump(lat, lon, 54, 12, 18, 10, 0.7);
    v += bump(lat, lon, 45, 25, 14, 10, 0.6);
    v += bump(lat, lon, 5, 20, 20, 26, 1.0);
    v += bump(lat, lon, -20, 25, 18, 18, 0.8);
    v += bump(lat, lon, 25, 45, 14, 10, 0.7);
    v += bump(lat, lon, 15, 75, 12, 12, 0.7);
    v += bump(lat, lon, 55, 90, 28, 16, 0.9);
    v += bump(lat, lon, 45, 120, 26, 14, 0.9);
    v += bump(lat, lon, 30, 110, 20, 12, 0.8);
    v += bump(lat, lon, 10, 105, 16, 10, 0.6);
    v += bump(lat, lon, 35, 138, 6, 6, 0.5);
    v += bump(lat, lon, 0, 120, 10, 8, 0.5);
    v += bump(lat, lon, -25, 135, 16, 12, 0.9);
    v += bump(lat, lon, -78, 0, 80, 6, 0.7);
    return v;
  }
  const MAP_W = 36;
  const MAP_H = 18;
  const MAP = [
    '............................####',
    '...........####...........######',
    '..........######..........######',
    '....###########...........######',
    '..##############..........######',
    '..###############.........#####.',
    '..###############..####...####..',
    '..##############..######..####..',
    '....###########...######..####..',
    '.....#########....######..####..',
    '......######......####....####..',
    '......#####........##.....####..',
    '......#####...............####..',
    '......#####...............####..',
    '......#####...............####..',
    '......#####...............####..',
    '....................######.####.',
    '....................######.####.',
  ];
  function bitmapMask(lat: number, lon: number) {
    const x = Math.floor(((lon + 180) / 360) * MAP_W);
    const y = Math.floor(((90 - lat) / 180) * MAP_H);
    const row = MAP[Math.max(0, Math.min(MAP_H - 1, y))];
    const col = Math.max(0, Math.min(MAP_W - 1, x));
    return row[col] === '#' ? 1 : 0;
  }

  function project(lat: number, lon: number): [number, number, number] {
    const lr = (lat * Math.PI) / 180;
    const nr = (lon * Math.PI) / 180;
    const x0 = Math.cos(lr) * Math.sin(nr);
    const y0 = Math.sin(lr);
    const z0 = Math.cos(lr) * Math.cos(nr);
    const xR = cosY * x0 + sinY * z0;
    const zR = -sinY * x0 + cosY * z0;
    const yF = cosX * y0 - sinX * zR;
    const zF = sinX * y0 + cosX * zR;
    return [cx + xR * r, cy - yF * r, zF];
  }

  // Latitude lines
  for (let lat = -80; lat <= 80; lat += 20) {
    const isEquator = lat === 0;
    ctx.beginPath();
    let down = false;
    for (let lon = -180; lon <= 181; lon += 1.5) {
      const [px, py, pz] = project(lat, lon);
      if (pz >= 0) { down ? ctx.lineTo(px, py) : ctx.moveTo(px, py); down = true; }
      else { down = false; }
    }
    ctx.strokeStyle = isEquator ? `rgba(${accentRgb},0.55)` : `rgba(${accentRgb},0.18)`;
    ctx.lineWidth = (isEquator ? 1.4 : 0.75) * dpr;
    ctx.stroke();
  }

  // Longitude lines
  for (let lon = 0; lon < 360; lon += 20) {
    ctx.beginPath();
    let down = false;
    for (let lat = -90; lat <= 90; lat += 1.5) {
      const [px, py, pz] = project(lat, lon);
      if (pz >= 0) { down ? ctx.lineTo(px, py) : ctx.moveTo(px, py); down = true; }
      else { down = false; }
    }
    ctx.strokeStyle = `rgba(${accentRgb},0.15)`;
    ctx.lineWidth = 0.75 * dpr;
    ctx.stroke();
  }

  // Prime meridian
  ctx.beginPath();
  let pmDown = false;
  for (let lat = -90; lat <= 90; lat += 1) {
    const [px, py, pz] = project(lat, 0);
    if (pz >= 0) { pmDown ? ctx.lineTo(px, py) : ctx.moveTo(px, py); pmDown = true; }
    else { pmDown = false; }
  }
  ctx.strokeStyle = `rgba(${accentRgb},0.38)`;
  ctx.lineWidth = 1.1 * dpr;
  ctx.stroke();

  const hasCoast = !!(coast && coast.length);
  if (!hasCoast) {
    ctx.fillStyle = `rgba(${accentRgb},0.9)`;
    for (let lat = -70; lat <= 70; lat += 2) {
      for (let lon = -180; lon <= 180; lon += 2) {
        const lm = landMask(lat, lon);
        const bm = bitmapMask(lat, lon);
        if (lm < 0.62 && bm === 0) continue;
        const [px, py, pz] = project(lat, lon);
        if (pz < 0) continue;
        const boost = bm ? 0.25 : 0;
        const size = (0.7 + Math.max(0, lm - 0.62) * 1.6 + boost) * dpr;
        ctx.fillRect(px - size * 0.5, py - size * 0.5, size, size);
      }
    }
  }

  if (hasCoast) {
    ctx.save();
    ctx.strokeStyle = `rgba(${accentRgb},0.7)`;
    ctx.lineWidth = 0.9 * dpr;
    for (const line of coast!) {
      let down = false;
      ctx.beginPath();
      for (const [lon, lat] of line) {
        const [px, py, pz] = project(lat, lon);
        if (pz >= 0) { down ? ctx.lineTo(px, py) : ctx.moveTo(px, py); down = true; }
        else { down = false; }
      }
      ctx.stroke();
    }
    ctx.restore();
  }

  // Metallic sweep
  ctx.save();
  ctx.globalCompositeOperation = 'source-atop';
  const sweep = ctx.createLinearGradient(cx - r * 0.9, cy - r * 0.3, cx + r * 0.9, cy + r * 0.3);
  sweep.addColorStop(0, 'rgba(218,215,205,0)');
  sweep.addColorStop(0.45, 'rgba(218,215,205,0.18)');
  sweep.addColorStop(0.6, 'rgba(218,215,205,0)');
  ctx.fillStyle = sweep;
  ctx.fillRect(0, 0, W, H);
  ctx.restore();

  // Specular highlight
  const hl = ctx.createRadialGradient(cx - r * 0.4, cy - r * 0.45, 0, cx - r * 0.18, cy - r * 0.18, r * 0.7);
  hl.addColorStop(0, 'rgba(218,215,205,0.20)');
  hl.addColorStop(0.45, 'rgba(218,215,205,0.05)');
  hl.addColorStop(1, 'rgba(218,215,205,0)');
  ctx.fillStyle = hl;
  ctx.fillRect(0, 0, W, H);

  // Edge vignette
  const edge = ctx.createRadialGradient(cx, cy, r * 0.52, cx, cy, r);
  edge.addColorStop(0, 'rgba(0,0,0,0)');
  edge.addColorStop(1, 'rgba(0,0,0,0.62)');
  ctx.fillStyle = edge;
  ctx.fillRect(0, 0, W, H);

  ctx.restore();

  // Outer stroke ring
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.strokeStyle = `rgba(${accentRgb},0.12)`;
  ctx.lineWidth = 1 * dpr;
  ctx.stroke();
}
