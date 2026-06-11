// Liveblocks-style animated graphics — monochrome, dotted, edge-faded.
// Technique mirrors liveblocks.io: canvas-drawn rotating dot-sphere for the
// globe, DOM dots + shapes-glyph node for storage. Motion in WhatYouGet.css.
import { useEffect, useRef, useState } from 'react';

/* ── 1. Recurring monthly billing loop ─────────────────────────────── */
export function LoopGraphic() {
  return (
    <div className="wg-art wg-loop" aria-hidden="true">
      {/* Even round-dot orbit track (SVG, not CSS dotted border). */}
      <svg viewBox="0 0 240 240" className="wg-loop-svg">
        <circle className="wg-loop-track" cx="120" cy="120" r="92" />
      </svg>
      <span className="wg-loop-orbit">
        <span className="wg-loop-dot" />
      </span>
      <span className="wg-loop-node">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
          <path d="M21 3v5h-5" />
          <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
          <path d="M3 21v-5h5" />
        </svg>
      </span>
      <span className="wg-xlabel wg-xlabel--loop">
        <span className="wg-xlabel-a">MONTHLY</span>
        <span className="wg-xlabel-b">FOREVER</span>
      </span>
    </div>
  );
}

/* ── 2. Subscription tool sprawl (disconnected app nodes) ──────────── */
const SPRAWL = [
  { c: 'wg-t-1', icon: 'grid' },
  { c: 'wg-t-2', icon: 'msg' },
  { c: 'wg-t-3', icon: 'cal' },
  { c: 'wg-t-4', icon: 'hash' },
  { c: 'wg-t-5', icon: 'doc' },
  { c: 'wg-t-6', icon: 'card' },
  { c: 'wg-t-7', icon: 'folder' },
];
const SPRAWL_ICONS = {
  grid: <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" />,
  msg: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
  cal: <><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M3 10h18M8 2v4M16 2v4" /></>,
  hash: <path d="M4 9h16M4 15h16M10 3 8 21M16 3l-2 18" />,
  doc: <><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5" /></>,
  card: <><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></>,
  folder: <path d="M4 20a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5l2 3h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2z" />,
};
export function SprawlGraphic() {
  return (
    <div className="wg-art wg-sprawl" aria-hidden="true">
      {/* thin dotted connectors — the disconnected, growing web */}
      <svg className="wg-sprawl-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
        <line className="wg-sline" x1="20" y1="24" x2="34" y2="58" />
        <line className="wg-sline wg-sline-2" x1="52" y1="18" x2="66" y2="54" />
        <line className="wg-sline wg-sline-3" x1="66" y1="54" x2="74" y2="80" />
        <line className="wg-sline wg-sline-4" x1="34" y1="58" x2="28" y2="86" />
      </svg>
      {SPRAWL.map((t, i) => (
        <span className={`wg-tile ${t.c}`} key={t.c} style={{ '--d': `${i * 0.4}s` }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            {SPRAWL_ICONS[t.icon]}
          </svg>
        </span>
      ))}
    </div>
  );
}

/* ── 3. Build your own: feed → platform node → server ──────────────── */
export function SyncFlowGraphic() {
  return (
    <div className="wg-art wg-sync" aria-hidden="true">
      <svg viewBox="0 0 320 180" className="wg-sync-svg">
        <line className="wg-flow" x1="8" y1="74" x2="128" y2="74" />
        <line className="wg-flow wg-flow-2" x1="8" y1="106" x2="128" y2="106" />
        <line className="wg-flow wg-flow-3" x1="192" y1="90" x2="278" y2="90" />
      </svg>

      <span className="wg-node">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 4.5 14.6 9H9.4L12 4.5Z" />
          <circle cx="8.4" cy="15.4" r="2.7" />
          <circle cx="15.6" cy="15.4" r="2.7" />
        </svg>
        <span className="wg-node-ring" />
      </span>

      <span className="wg-server">
        <svg viewBox="0 0 40 56" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="34" height="15" rx="3" />
          <rect x="3" y="21" width="34" height="15" rx="3" />
          <rect x="3" y="39" width="34" height="14" rx="3" />
          <circle cx="11" cy="10.5" r="1.4" fill="currentColor" stroke="none" />
          <circle cx="11" cy="28.5" r="1.4" fill="currentColor" stroke="none" />
          <circle cx="11" cy="46" r="1.4" fill="currentColor" stroke="none" />
        </svg>
      </span>

      <span className="wg-xlabel wg-xlabel--node">
        <span className="wg-xlabel-a">PLATFORM</span>
        <span className="wg-xlabel-b">OWNED</span>
      </span>
    </div>
  );
}

/* ── 4. Owned software runs anywhere: canvas dot-globe + Ping ──────── */
function buildSpherePoints(n) {
  const pts = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const rad = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = i * golden;
    pts.push([Math.cos(theta) * rad, y, Math.sin(theta) * rad]);
  }
  return pts;
}

export function GlobeGraphic() {
  const canvasRef = useRef(null);
  const [pinging, setPinging] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    const N = 820;
    const pts = buildSpherePoints(N);
    const bright = new Set();
    for (let k = 0; k < 16; k++) bright.add((k * 51 + 7) % N);

    let w = 0;
    let h = 0;
    let cx = 0;
    let cy = 0;
    let R = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = Math.max(1, rect.width);
      h = Math.max(1, rect.height);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = w / 2;
      cy = h / 2;
      R = Math.min(w, h) * 0.42;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const start = performance.now();
    let raf = 0;

    const draw = (now) => {
      const t = (now - start) / 1000;
      const ay = reduce ? 0.6 : t * 0.26;
      const ax = -0.42; // fixed tilt
      const cosY = Math.cos(ay);
      const sinY = Math.sin(ay);
      const cosX = Math.cos(ax);
      const sinX = Math.sin(ax);
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < N; i++) {
        const p = pts[i];
        const x1 = p[0] * cosY - p[2] * sinY;
        const z1 = p[0] * sinY + p[2] * cosY;
        const y1 = p[1] * cosX - z1 * sinX;
        const z2 = p[1] * sinX + z1 * cosX;

        const px = cx + x1 * R;
        const py = cy + y1 * R;
        const depth = (z2 + 1) / 2; // 0 back .. 1 front
        const light = Math.max(0, -x1 * 0.5 - y1 * 0.55 + 0.5);
        let a = (0.1 + depth * 0.5) * (0.45 + light * 0.65);
        let r = 0.6 + depth * 1.1;

        if (bright.has(i)) {
          const pulse = reduce ? 0.6 : 0.5 + 0.5 * Math.sin(t * 2 + i);
          a = Math.min(1, a + 0.45 * pulse * depth);
          r += 0.9 * depth;
          ctx.shadowBlur = 6 * depth;
          ctx.shadowColor = 'rgba(255,255,255,0.85)';
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.fillStyle = `rgba(255,255,255,${a.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(px, py, r, 0, 6.2832);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <div className="wg-art wg-globe" aria-hidden="true">
      <canvas ref={canvasRef} className="wg-globe-canvas" />
      {pinging ? <span className="wg-ping-ring" key={String(pinging)} /> : null}
      <button
        type="button"
        className="wg-ping-btn"
        aria-hidden="true"
        tabIndex={-1}
        onMouseEnter={() => {
          setPinging(false);
          requestAnimationFrame(() => setPinging(true));
        }}
        onAnimationEnd={() => setPinging(false)}
      >
        Ping
      </button>
    </div>
  );
}

export const GRAPHICS = {
  loop: LoopGraphic,
  sprawl: SprawlGraphic,
  sync: SyncFlowGraphic,
  globe: GlobeGraphic,
};
