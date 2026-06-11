import "./TheShift.css";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import type { CSSProperties, ReactNode } from "react";

const PANELS = [
  {
    id: "1",
    cells: [
      {
        graphic: "audit" as const,
        title: "Research & experience audits",
        desc: "We study your users, market, and competitors, surfacing the friction and the opportunities before a single screen is designed.",
      },
      {
        graphic: "design" as const,
        title: "UX & interface design",
        desc: "Discover, concept, design, deliver. We iterate with real users at every step until the experience works flawlessly.",
      },
    ],
  },
  {
    id: "2",
    cells: [
      {
        graphic: "system" as const,
        title: "Design systems",
        desc: "We turn scattered styles into one source of truth, reusable components and tokens that keep every product consistent.",
      },
      {
        graphic: "build" as const,
        title: "Front-end development",
        desc: "Designers and developers build as one team, responsive, accessible, and seamless on every device.",
      },
    ],
  },
];

const PANEL_GAP = 48;

function ShiftReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ---- 1. Research & experience audits: scan a UI, flag issues ---- */
function AuditGraphic() {
  return (
    <div className="wg-art wg-audit" aria-hidden>
      <svg viewBox="0 0 240 168" className="wg-audit-svg">
        <rect className="wg-audit-frame" x="22" y="14" width="196" height="140" rx="10" />
        <line className="wg-audit-bar" x1="22" y1="38" x2="218" y2="38" />
        <circle className="wg-dotk" cx="35" cy="26" r="2.3" />
        <circle className="wg-dotk" cx="44" cy="26" r="2.3" />
        <circle className="wg-dotk" cx="53" cy="26" r="2.3" />
        <rect className="wg-audit-row" x="38" y="54" width="118" height="8" rx="4" />
        <rect className="wg-audit-row" x="38" y="72" width="162" height="8" rx="4" />
        <rect className="wg-audit-row" x="38" y="90" width="92" height="8" rx="4" />
        <rect className="wg-audit-row" x="38" y="108" width="146" height="8" rx="4" />
        <rect className="wg-audit-row" x="38" y="126" width="72" height="8" rx="4" />
        <circle className="wg-flag" cx="168" cy="58" r="6" />
        <circle className="wg-flag wg-flag-2" cx="138" cy="94" r="6" />
        <circle className="wg-flag wg-flag-3" cx="192" cy="112" r="6" />
      </svg>
      <span className="wg-scanline" />
      <span className="wg-lens">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="10.5" cy="10.5" r="6.5" />
          <path d="M21 21l-5.4-5.4" />
        </svg>
      </span>
      <span className="wg-xlabel wg-xlabel--audit">
        <span className="wg-xlabel-a">AUDIT</span>
        <span className="wg-xlabel-b">INSIGHT</span>
      </span>
    </div>
  );
}

/* ---- 2. UX & interface design: artboard, selection, cursor ---- */
function DesignGraphic() {
  return (
    <div className="wg-art wg-design" aria-hidden>
      <svg viewBox="0 0 240 168" className="wg-design-svg">
        <rect className="wg-board" x="22" y="14" width="196" height="140" rx="10" />
        <rect className="wg-blk wg-blk-1" x="36" y="28" width="168" height="14" rx="4" />
        <rect className="wg-blk wg-blk-2" x="36" y="52" width="44" height="90" rx="6" />
        <rect className="wg-blk wg-blk-3" x="90" y="52" width="114" height="48" rx="6" />
        <rect className="wg-blk wg-blk-4" x="90" y="108" width="92" height="8" rx="4" />
        <rect className="wg-blk wg-blk-5" x="90" y="122" width="68" height="8" rx="4" />
        <rect className="wg-pill" x="90" y="134" width="48" height="14" rx="7" />
      </svg>
      <span className="wg-sel">
        <i className="wg-sel-h wg-sel-tl" />
        <i className="wg-sel-h wg-sel-tr" />
        <i className="wg-sel-h wg-sel-bl" />
        <i className="wg-sel-h wg-sel-br" />
      </span>
      <span className="wg-cursor2">
        <svg viewBox="0 0 20 20" fill="none">
          <path d="M3 2L16 9.5L9.8 11.2L7.2 17L3 2Z" fill="currentColor" stroke="#0b0b0b" strokeWidth="1" />
        </svg>
      </span>
      <span className="wg-xlabel wg-xlabel--design">
        <span className="wg-xlabel-a">WIRE</span>
        <span className="wg-xlabel-b">HI-FI</span>
      </span>
    </div>
  );
}

/* ---- 3. Design systems: component tokens flow into one hub ---- */
function SystemGraphic() {
  return (
    <div className="wg-art wg-system" aria-hidden>
      <svg className="wg-sys-lines" viewBox="0 0 240 168" preserveAspectRatio="none">
        <line className="wg-sflow" x1="120" y1="84" x2="50" y2="42" />
        <line className="wg-sflow wg-sflow-2" x1="120" y1="84" x2="190" y2="42" />
        <line className="wg-sflow wg-sflow-3" x1="120" y1="84" x2="50" y2="126" />
        <line className="wg-sflow wg-sflow-4" x1="120" y1="84" x2="190" y2="126" />
      </svg>
      <span className="wg-hub">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
        </svg>
        <span className="wg-hub-ring" />
      </span>
      <span className="wg-chip wg-chip-1">
        <span className="wg-sw wg-sw-a" />
        <span className="wg-sw wg-sw-b" />
        <span className="wg-sw wg-sw-c" />
      </span>
      <span className="wg-chip wg-chip-2">
        <span className="wg-chip-type">Aa</span>
      </span>
      <span className="wg-chip wg-chip-3">
        <span className="wg-chip-btn" />
      </span>
      <span className="wg-chip wg-chip-4">
        <span className="wg-chip-input" />
      </span>
      <span className="wg-xlabel wg-xlabel--system">
        <span className="wg-xlabel-a">TOKENS</span>
        <span className="wg-xlabel-b">SYSTEM</span>
      </span>
    </div>
  );
}

/* ---- 4. Front-end development: code compiles into live UI ---- */
function BuildGraphic() {
  return (
    <div className="wg-art wg-build" aria-hidden>
      <svg viewBox="0 0 260 168" className="wg-build-svg">
        <rect className="wg-win" x="16" y="16" width="228" height="136" rx="10" />
        <line className="wg-win-bar" x1="16" y1="38" x2="244" y2="38" />
        <circle className="wg-dotk" cx="29" cy="27" r="2.2" />
        <circle className="wg-dotk" cx="38" cy="27" r="2.2" />
        <circle className="wg-dotk" cx="47" cy="27" r="2.2" />
        <line className="wg-win-split" x1="130" y1="38" x2="130" y2="152" />
        <rect className="wg-code wg-c1" x="30" y="54" width="56" height="6" rx="3" />
        <rect className="wg-code wg-c2" x="40" y="68" width="70" height="6" rx="3" />
        <rect className="wg-code wg-c3" x="40" y="82" width="46" height="6" rx="3" />
        <rect className="wg-code wg-c4" x="50" y="96" width="58" height="6" rx="3" />
        <rect className="wg-code wg-c5" x="40" y="110" width="36" height="6" rx="3" />
        <rect className="wg-code wg-c6" x="30" y="124" width="52" height="6" rx="3" />
        <rect className="wg-render wg-r1" x="150" y="54" width="80" height="16" rx="4" />
        <rect className="wg-render wg-r2" x="150" y="78" width="80" height="34" rx="5" />
        <rect className="wg-render wg-r3" x="150" y="120" width="46" height="12" rx="6" />
      </svg>
      <span className="wg-compile">
        <svg viewBox="0 0 44 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <path className="wg-arrow" d="M3 7h32" />
          <path d="M30 3l6 4-6 4" />
        </svg>
      </span>
      <span className="wg-xlabel wg-xlabel--build">
        <span className="wg-xlabel-a">CODE</span>
        <span className="wg-xlabel-b">LIVE</span>
      </span>
    </div>
  );
}

const GRAPHICS = {
  audit: AuditGraphic,
  design: DesignGraphic,
  system: SystemGraphic,
  build: BuildGraphic,
};

function ShiftCell({ cell }: { cell: (typeof PANELS)[number]["cells"][number] }) {
  const Graphic = GRAPHICS[cell.graphic];
  return (
    <div className="wyg-cell">
      <div className="wyg-cell-copy">
        <h4 className="wyg-cell-title">{cell.title}</h4>
        <p className="wyg-cell-desc">{cell.desc}</p>
      </div>
      <div className="wyg-cell-art">
        <Graphic />
        <span className="wyg-fade" aria-hidden />
      </div>
    </div>
  );
}

function ShiftPanel({ panel }: { panel: (typeof PANELS)[number] }) {
  return (
    <div className="shift-panel" data-panel={panel.id}>
      <div className="wyg-panel">
        {panel.cells.map((cell) => (
          <ShiftCell key={cell.title} cell={cell} />
        ))}
      </div>
    </div>
  );
}

export function TheShift() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [stride, setStride] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, stride ? -stride : 0]);

  useEffect(() => {
    const measure = () => {
      const panel = trackRef.current?.querySelector<HTMLElement>(".shift-panel");
      if (!panel) return;
      setStride(panel.offsetWidth + PANEL_GAP);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <section
      className="shift"
      id="what-you-get"
      data-nav-theme="dark"
      ref={sectionRef}
      style={{ "--shift-runway": PANELS.length } as CSSProperties}
    >
      <div className="shift-pin">
        <div className="shift-head-wrap">
          <header className="shift-head">
            <div className="shift-head-left">
              <ShiftReveal>
                <span className="wyg-eyebrow">What we do</span>
              </ShiftReveal>
              <ShiftReveal>
                <h2 className="shift-title">
                  Every product, end to end.{" "}
                  <span className="shift-title-muted">Research, design, and build under one roof.</span>
                </h2>
              </ShiftReveal>
            </div>
            <ShiftReveal className="shift-head-right" delay={0.08}>
              <p className="shift-lead">
                We're a team of designers and developers who study your users, shape the experience,
                and ship it, so the product looks great, works flawlessly, and feels right.
              </p>
            </ShiftReveal>
          </header>
        </div>

        <div className="shift-stage">
          <motion.div
            ref={trackRef}
            className="shift-track"
            style={{ x, gap: PANEL_GAP }}
          >
            {PANELS.map((panel) => (
              <ShiftPanel key={panel.id} panel={panel} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
