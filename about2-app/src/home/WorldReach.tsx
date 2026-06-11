import "./WorldReach.css";
import { useEffect, useRef } from "react";

/* Brand logo colors - weighted toward purple/violet */
const PALETTE: [number, number, number][] = [
  [112, 100, 198], // violet
  [138, 96, 210],  // brighter violet
  [112, 100, 198], // violet
  [160, 92, 170],  // violet → magenta
  [194, 80, 85],   // red
  [112, 100, 198], // violet
  [44, 126, 136],  // teal
  [122, 104, 200], // violet
];

function samplePalette(t: number): [number, number, number] {
  const n = PALETTE.length - 1;
  const x = Math.min(0.9999, Math.max(0, t)) * n;
  const i = Math.floor(x);
  const f = x - i;
  const a = PALETTE[i];
  const b = PALETTE[i + 1];
  return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f];
}

function fibonacciSphere(count: number) {
  const pts: [number, number, number][] = [];
  const phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = phi * i;
    pts.push([Math.cos(theta) * r, y, Math.sin(theta) * r]);
  }
  return pts;
}

export function WorldReach() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const COUNT = 1200;
    const points = fibonacciSphere(COUNT);
    const colors: [number, number, number][] = [];
    const hollow: boolean[] = [];
    const twinkle = new Set<number>();

    for (let i = 0; i < COUNT; i++) {
      const p = points[i];
      const lon = Math.atan2(p[2], p[0]) / (2 * Math.PI) + 0.5;
      const lat = (p[1] + 1) / 2;
      let t = lon * 0.6 + lat * 0.4;
      // ease toward the violet-heavy start of the palette
      t = Math.pow(t, 1.5);
      let [r, g, b] = samplePalette(t);
      // faded: blend each color toward a soft white
      r = r * 0.78 + 255 * 0.22;
      g = g * 0.78 + 255 * 0.22;
      b = b * 0.78 + 255 * 0.22;
      colors.push([r, g, b]);
      hollow.push(i % 7 === 0);
    }
    for (let i = 0; i < 26; i++) twinkle.add((i * 47 + 5) % COUNT);

    let w = 0;
    let h = 0;
    let cx = 0;
    let cy = 0;
    let radius = 0;
    let raf = 0;

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
      radius = Math.min(w, h) * 0.44;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now();

    const draw = (now: number) => {
      const t = (now - start) / 1000;
      const spin = reduced ? 0.6 : t * 0.2;
      const tilt = -0.42;
      const cosY = Math.cos(spin);
      const sinY = Math.sin(spin);
      const cosX = Math.cos(tilt);
      const sinX = Math.sin(tilt);

      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < COUNT; i++) {
        const p = points[i];
        const rx = p[0] * cosY - p[2] * sinY;
        const rz = p[0] * sinY + p[2] * cosY;
        const ry = p[1] * cosX - rz * sinX;
        const rz2 = p[1] * sinX + rz * cosX;
        const px = cx + rx * radius;
        const py = cy + ry * radius;
        const depth = (rz2 + 1) / 2;
        const front = Math.max(0, -rx * 0.5 - ry * 0.55 + 0.5);
        let alpha = (0.12 + depth * 0.55) * (0.4 + front * 0.7) * 0.92;
        let size = 0.7 + depth * 1.4;
        const [r, g, b] = colors[i];

        if (twinkle.has(i)) {
          const pulse = reduced ? 0.6 : 0.5 + 0.5 * Math.sin(t * 2 + i);
          alpha = Math.min(1, alpha + 0.4 * pulse * depth);
          size += 1.1 * depth;
          ctx.shadowBlur = 8 * depth;
          ctx.shadowColor = `rgba(${r | 0},${g | 0},${b | 0},0.9)`;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        if (hollow[i] && !twinkle.has(i)) {
          ctx.strokeStyle = `rgba(${r | 0},${g | 0},${b | 0},${alpha.toFixed(3)})`;
          ctx.lineWidth = 0.9;
          ctx.stroke();
        } else {
          ctx.fillStyle = `rgba(${r | 0},${g | 0},${b | 0},${alpha.toFixed(3)})`;
          ctx.fill();
        }
      }
      ctx.shadowBlur = 0;
      if (!reduced) raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <section className="reach" id="reach">
      <div className="reach-inner">
        <div className="reach-globe">
          <canvas ref={canvasRef} className="reach-canvas" aria-hidden />
        </div>
        <p className="reach-stat">27M+</p>
        <p className="reach-caption">
          We've worked for apps that have 27 million users.
        </p>
      </div>
    </section>
  );
}
