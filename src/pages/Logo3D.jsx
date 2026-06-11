import { useEffect, useRef, useState } from 'react';
import './Logo3D.css';

const N_SKEL = 'M 432 398 L 432 612 M 432 548 C 432 452 568 448 568 548 L 568 614';
const A_SKEL = 'M 708 460 a 72 72 0 1 0 0.1 0 M 782 462 L 782 600 C 782 626 800 634 814 624';
const C_SKEL = 'M 958 458 A 84 84 0 1 0 958 588';
const E_SKEL = 'M 1040 512 L 1172 512 C 1176 432 1046 424 1038 512 C 1030 602 1118 632 1182 588';
const W_SKEL =
  'M 1262 446 C 1272 540 1282 598 1308 598 C 1330 598 1338 528 1350 478 ' +
  'C 1356 452 1364 452 1370 478 C 1382 528 1390 598 1412 598 C 1438 598 1448 540 1458 450';

function Balloon({ id, d, r, gradId, lo }) {
  const sw = r * 2;
  const stroke = {
    fill: 'none',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };
  return (
    <g filter="url(#softDrop)">
      <mask id={`balloon-mask-${id}`} maskUnits="userSpaceOnUse" x="0" y="0" width="1680" height="945">
        <path d={d} {...stroke} stroke="#fff" strokeWidth={sw} />
      </mask>
      <path d={d} {...stroke} stroke={`url(#${gradId})`} strokeWidth={sw} />
      <g mask={`url(#balloon-mask-${id})`}>
        <path
          d={d}
          {...stroke}
          stroke={lo}
          strokeWidth={sw * 0.92}
          transform="translate(8,17)"
          opacity="0.38"
          filter="url(#blur16)"
        />
        <path
          d={d}
          {...stroke}
          stroke="#ffffff"
          strokeWidth={r * 0.8}
          transform="translate(-9,-16)"
          opacity="0.8"
          filter="url(#blur14)"
        />
        <path
          d={d}
          {...stroke}
          stroke="#ffffff"
          strokeWidth={r * 0.3}
          transform="translate(-13,-22)"
          opacity="0.9"
          filter="url(#blur6)"
        />
      </g>
    </g>
  );
}

function samplePath(pathEl, count) {
  const total = pathEl.getTotalLength();
  const pts = [];
  for (let i = 0; i <= count; i++) {
    const t = (i / count) * total;
    const a = pathEl.getPointAtLength(t);
    const b = pathEl.getPointAtLength(Math.min(total, t + 1));
    const c = pathEl.getPointAtLength(Math.max(0, t - 1));
    pts.push({ x: a.x, y: a.y, ang: Math.atan2(b.y - c.y, b.x - c.x) });
  }
  return pts;
}

function WireframeE() {
  const ref = useRef(null);
  const [els, setEls] = useState(null);

  useEffect(() => {
    const R = 52;
    const pts = samplePath(ref.current, 66);
    const rings = pts
      .filter((_, i) => i % 2 === 0)
      .map((q, i) => (
        <ellipse
          key={`ring-${i}`}
          cx={q.x}
          cy={q.y}
          rx={R * 0.38}
          ry={R}
          transform={`rotate(${(q.ang * 180) / Math.PI} ${q.x} ${q.y})`}
        />
      ));
    const longs = [-1, -0.72, -0.42, 0, 0.42, 0.72, 1].map((f, j) => {
      const d = pts
        .map((q, i) => {
          const nx = q.x + Math.cos(q.ang + Math.PI / 2) * R * f;
          const ny = q.y + Math.sin(q.ang + Math.PI / 2) * R * f;
          return `${i === 0 ? 'M' : 'L'} ${nx.toFixed(1)} ${ny.toFixed(1)}`;
        })
        .join(' ');
      return <path key={`long-${j}`} d={d} />;
    });
    setEls([...longs, ...rings]);
  }, []);

  return (
    <g stroke="url(#gradWire)" strokeWidth="1.7" fill="none" opacity="0.95">
      <path ref={ref} d={E_SKEL} stroke="none" />
      {els}
    </g>
  );
}

function BezierW() {
  const ref = useRef(null);
  const [handles, setHandles] = useState(null);

  useEffect(() => {
    const R = 42;
    const HANDLE = 38;
    const pts = samplePath(ref.current, 10);
    const items = [];
    pts.forEach((q, i) => {
      const side = i % 2 === 0 ? 1 : -1;
      const ax = q.x + Math.cos(q.ang + Math.PI / 2) * R * side;
      const ay = q.y + Math.sin(q.ang + Math.PI / 2) * R * side;
      const h1x = ax + Math.cos(q.ang) * HANDLE;
      const h1y = ay + Math.sin(q.ang) * HANDLE;
      const h2x = ax - Math.cos(q.ang) * HANDLE;
      const h2y = ay - Math.sin(q.ang) * HANDLE;
      items.push(
        <g key={`h-${i}`}>
          <line x1={h1x} y1={h1y} x2={h2x} y2={h2y} strokeWidth="1.4" />
          <circle cx={h1x} cy={h1y} r="3.6" fill="#fff" strokeWidth="1.4" />
          <circle cx={h2x} cy={h2y} r="3.6" fill="#fff" strokeWidth="1.4" />
          <rect x={ax - 4.5} y={ay - 4.5} width="9" height="9" fill="#fff" strokeWidth="1.6" />
        </g>
      );
    });
    setHandles(items);
  }, []);

  return (
    <g>
      <path
        ref={ref}
        d={W_SKEL}
        fill="none"
        stroke="url(#gradW)"
        strokeWidth="84"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={W_SKEL}
        fill="none"
        stroke="#f3f3f3"
        strokeWidth="78"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g stroke="url(#gradW)">{handles}</g>
    </g>
  );
}

export default function Logo3D() {
  return (
    <div className="logo3d-page">
      <div className="logo3d-stage">
        <svg viewBox="0 0 1680 945" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Nacew 3D logo">
          <defs>
            <linearGradient id="gradN" gradientUnits="userSpaceOnUse" x1="490" y1="380" x2="430" y2="660">
              <stop offset="0" stopColor="#5B8DF5" />
              <stop offset="0.4" stopColor="#3F76E8" />
              <stop offset="0.72" stopColor="#2E9E62" />
              <stop offset="1" stopColor="#57B33B" />
            </linearGradient>
            <linearGradient id="gradA" gradientUnits="userSpaceOnUse" x1="630" y1="440" x2="810" y2="630">
              <stop offset="0" stopColor="#4D6FE8" />
              <stop offset="0.42" stopColor="#8A4BD8" />
              <stop offset="0.75" stopColor="#C93BB4" />
              <stop offset="1" stopColor="#E84A9C" />
            </linearGradient>
            <linearGradient id="gradC" gradientUnits="userSpaceOnUse" x1="905" y1="415" x2="905" y2="645">
              <stop offset="0" stopColor="#F2A93B" />
              <stop offset="0.45" stopColor="#F0875E" />
              <stop offset="1" stopColor="#EE5F8F" />
            </linearGradient>
            <linearGradient id="gradStar" gradientUnits="userSpaceOnUse" x1="185" y1="305" x2="355" y2="500">
              <stop offset="0" stopColor="#3FA0F0" />
              <stop offset="0.32" stopColor="#F29A3B" />
              <stop offset="0.56" stopColor="#EE4F9A" />
              <stop offset="0.8" stopColor="#8E4BE8" />
              <stop offset="1" stopColor="#3CA84C" />
            </linearGradient>
            <linearGradient id="gradW" gradientUnits="userSpaceOnUse" x1="1250" y1="440" x2="1465" y2="600">
              <stop offset="0" stopColor="#2F7DE8" />
              <stop offset="1" stopColor="#16A085" />
            </linearGradient>
            <linearGradient id="gradWire" gradientUnits="userSpaceOnUse" x1="1030" y1="430" x2="1190" y2="630">
              <stop offset="0" stopColor="#6A3BE0" />
              <stop offset="1" stopColor="#4A1FB8" />
            </linearGradient>
            <linearGradient id="gradSquig" gradientUnits="userSpaceOnUse" x1="660" y1="340" x2="700" y2="410">
              <stop offset="0" stopColor="#9A66F0" />
              <stop offset="1" stopColor="#6B3BD8" />
            </linearGradient>
            <filter id="blur6" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" />
            </filter>
            <filter id="blur14" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="14" />
            </filter>
            <filter id="blur16" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="16" />
            </filter>
            <filter id="blur60" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="60" />
            </filter>
            <filter id="softDrop" x="-40%" y="-40%" width="180%" height="180%">
              <feDropShadow dx="0" dy="16" stdDeviation="18" floodColor="#5a5a66" floodOpacity="0.22" />
            </filter>
          </defs>

          <ellipse cx="840" cy="510" rx="600" ry="240" fill="#ffffff" opacity="0.85" filter="url(#blur60)" />

          <g filter="url(#softDrop)">
            <path
              d="M 270 298 L 348 438 L 192 438 Z"
              fill="none"
              stroke="url(#gradStar)"
              strokeWidth="26"
              strokeLinejoin="round"
            />
            <path
              d="M 270 498 L 192 358 L 348 358 Z"
              fill="none"
              stroke="url(#gradStar)"
              strokeWidth="26"
              strokeLinejoin="round"
              transform="rotate(8 270 398)"
            />
          </g>

          <Balloon id="n" d={N_SKEL} r={45} gradId="gradN" lo="#1d5a8c" />
          <Balloon id="a" d={A_SKEL} r={45} gradId="gradA" lo="#5a1d8c" />
          <Balloon id="c" d={C_SKEL} r={45} gradId="gradC" lo="#b04a36" />
          <Balloon id="squig" d="M 668 342 C 696 352 664 376 690 388 C 702 394 696 408 684 404" r={9} gradId="gradSquig" lo="#4a1d8c" />

          <g filter="url(#softDrop)" stroke="#2FA84C" strokeWidth="19" strokeLinecap="round">
            <line x1="760" y1="396" x2="760" y2="468" />
            <line x1="729" y1="414" x2="791" y2="450" />
            <line x1="791" y1="414" x2="729" y2="450" />
          </g>

          <text x="855" y="372" fontSize="115" textAnchor="middle">
            {'\u{1F91F}'}
          </text>

          <WireframeE />
          <BezierW />
        </svg>
      </div>
    </div>
  );
}
