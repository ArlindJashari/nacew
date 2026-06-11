import "./ResearchInteract.css";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import type { MotionValue } from "motion/react";
import type { ReactNode } from "react";
import { RESEARCH_DELIVERABLES, RESEARCH_STAGE } from "../data";
import { GlowFrame, Reveal } from "../components";
import { CALL_CREW, img } from "../assets";

const FLOW_IMG = img("TTuYlOA6WQJs3KxmWxShNqK7ntg");
const FLOW_IMG_HOVER = img("WPzzSpNbW21pl6o8tuIegLq2t9k");

const QUESTION_LINES: ReactNode[][] = [
  [
    <>
      wh<span className="ri-q-a ri-q-purple">a</span>t
    </>,
    <>
      <span className="ri-q-a ri-q-red">i</span>s
    </>,
    <>
      y<span className="ri-q-a ri-q-green">o</span>ur
    </>,
    <>
      c<span className="ri-q-a ri-q-teal">o</span>mpany
    </>,
    <>
      f<span className="ri-q-a ri-q-purple">o</span>r,
    </>,
  ],
  [
    <>
      <span className="ri-q-a ri-q-teal">a</span>nd
    </>,
    <>
      wh<span className="ri-q-a ri-q-red">o</span>
    </>,
    <>
      <span className="ri-q-a ri-q-purple">a</span>re
    </>,
    <>
      y<span className="ri-q-a ri-q-green">o</span>u
    </>,
    <>
      f<span className="ri-q-a ri-q-teal">o</span>r?
    </>,
  ],
];

function ScrollRevealWord({
  progress,
  index,
  total,
  children,
  trailingSpace = true,
}: {
  progress: MotionValue<number>;
  index: number;
  total: number;
  children: ReactNode;
  trailingSpace?: boolean;
}) {
  const start = index / total;
  const end = Math.min(1, start + 1.5 / total);
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y = useTransform(progress, [start, end], [12, 0]);
  const blur = useTransform(progress, [start, end], [8, 0]);
  const filter = useTransform(blur, (v) => `blur(${v}px)`);

  return (
    <motion.span className="ri-q-word" style={{ opacity, y, filter }}>
      {children}
      {trailingSpace ? "\u00A0" : null}
    </motion.span>
  );
}

function ScrollQuestionPill({
  line,
  lineStart,
  totalWords,
  progress,
}: {
  line: ReactNode[];
  lineStart: number;
  totalWords: number;
  progress: MotionValue<number>;
}) {
  const pillOpacity = useTransform(
    progress,
    [lineStart / totalWords, Math.min(1, (lineStart + 0.6) / totalWords)],
    [0, 1],
  );
  const pillY = useTransform(
    progress,
    [lineStart / totalWords, Math.min(1, (lineStart + 0.8) / totalWords)],
    [18, 0],
  );

  return (
    <motion.p className="ri-question-pill" style={{ opacity: pillOpacity, y: pillY }}>
      {line.map((word, wi) => (
        <ScrollRevealWord
          key={lineStart + wi}
          progress={progress}
          index={lineStart + wi}
          total={totalWords}
          trailingSpace={wi < line.length - 1}
        >
          {word}
        </ScrollRevealWord>
      ))}
    </motion.p>
  );
}

const QUESTION_LINE_STARTS = QUESTION_LINES.map((_, i) =>
  QUESTION_LINES.slice(0, i).reduce((n, line) => n + line.length, 0),
);
const QUESTION_WORD_COUNT = QUESTION_LINES.reduce((n, line) => n + line.length, 0);

function ScrollQuestionPills() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.32"],
  });

  return (
    <div className="ri-question" ref={ref}>
      {QUESTION_LINES.map((line, i) => (
        <ScrollQuestionPill
          key={i}
          line={line}
          lineStart={QUESTION_LINE_STARTS[i]}
          totalWords={QUESTION_WORD_COUNT}
          progress={scrollYProgress}
        />
      ))}
    </div>
  );
}

const THREAD_AVATARS = {
  olta: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&crop=faces&w=80&h=80&q=90",
  liri: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&crop=faces&w=80&h=80&q=90",
} as const;

/* Live-collaboration cursor that loops through a set of waypoints on the stage. */
function Cursor({
  name,
  variant,
  path,
  duration,
  delay = 0,
  hidden = false,
}: {
  name: string;
  variant: "you" | "mate";
  path: { x: number; y: number }[];
  duration: number;
  delay?: number;
  hidden?: boolean;
}) {
  return (
    <motion.div
      className={`ri-cursor ri-cursor-${variant}${hidden ? " is-hidden" : ""}`}
      initial={{ x: path[0].x, y: path[0].y }}
      animate={
        hidden
          ? { x: path[0].x, y: path[0].y }
          : { x: path.map((p) => p.x), y: path.map((p) => p.y) }
      }
      transition={{
        duration,
        delay,
        repeat: hidden ? 0 : Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      }}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
        <path
          d="M3 2L16 9.5L9.8 11.2L7.2 17L3 2Z"
          fill="currentColor"
          stroke="#0b0b0b"
          strokeWidth="1"
        />
      </svg>
      <span className="ri-cursor-tag">{name}</span>
    </motion.div>
  );
}

export function ResearchInteract() {
  const [jtbdHover, setJtbdHover] = useState<"c1" | "c2" | "c3" | null>(null);
  const [threadHover, setThreadHover] = useState<"r1" | "r2" | null>(null);

  return (
    <section className="ri" id="research">
      {/* ---- Lead + boxed question (matches Midu layout) ---- */}
      <div className="ri-lead">
        <h2 className="ri-lead-text">
          <span className="hl">Research and strategy come first.</span> We study
          your market and positioning, then ask one question:
        </h2>
      </div>

      <ScrollQuestionPills />

      {/* ---- The collaborative product canvas ---- */}
      <div className="ri-stage-wrap">
        <div className="ri-stage">
          {/* Center: live product call on an iPad + Magic Keyboard */}
          <div className="ri-device">
            <div className="ri-ipad">
              <div className="ri-screen">
                <div className="ri-video">
                  <img src={CALL_CREW} alt="" className="ri-call-crew" />
                </div>
                <div className="ri-screen-top">
                  <span className="ri-screen-title">{RESEARCH_STAGE.callTitle}</span>
                  <span className="ri-rec">
                    <i /> Recording
                  </span>
                </div>
                <div className="ri-cam-row" aria-hidden>
                  <div className="ri-cam-slot ri-cam-slot-a">
                    <span className="ri-cam-name">Valon</span>
                  </div>
                  <div className="ri-cam-slot ri-cam-slot-b">
                    <span className="ri-cam-name">Armend</span>
                  </div>
                </div>
                <div className="ri-controls">
                  <span className="ri-ctrl" aria-hidden>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>
                  </span>
                  <span className="ri-ctrl" aria-hidden>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><rect x="2" y="6" width="13" height="12" rx="2"/><path d="M15 10l7-4v12l-7-4z"/></svg>
                  </span>
                  <span className="ri-ctrl" aria-hidden>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M11 5L6 9H2v6h4l5 4V5zM15.5 8.5a5 5 0 0 1 0 7M19 5a9 9 0 0 1 0 14"/></svg>
                  </span>
                  <span className="ri-ctrl ri-ctrl-end" aria-hidden>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><path d="M12 9c-2.8 0-5.5.6-7.9 1.7-.7.3-1.1 1-1.1 1.8v2.2c0 .6.5 1.1 1.1 1.1l3.3-.4c.5-.1.9-.5 1-1l.3-1.7c1-.3 2.1-.5 3.3-.5s2.3.2 3.3.5l.3 1.7c.1.5.5.9 1 1l3.3.4c.6 0 1.1-.5 1.1-1.1v-2.2c0-.8-.4-1.5-1.1-1.8C17.5 9.6 14.8 9 12 9z"/></svg>
                  </span>
                </div>
              </div>
            </div>
            <div className="ri-kb">
              <div className="ri-kb-keys" aria-hidden />
              <div className="ri-kb-pad" aria-hidden />
            </div>
            <div className="ri-device-shadow" aria-hidden />
          </div>

          {/* Left: chat + comment thread - Framer Variant 1 */}
          <div
            className={`ri-collab ri-float${threadHover ? " is-thread-hover" : ""}`}
            data-d="1"
          >
            <div className="ri-chat">
              <svg
                className="ri-chat-bubble"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden
              >
                <path
                  d="M4.7.5c.3 0 .5.1.7.3l9.7 8-.1.1c.2.1.3.3.4.6.1.2.1.4 0 .6-.1.2-.2.4-.4.5-.2.1-.4.2-.6.2h-3.5c-.6 0-1.1.1-1.6.4-.5.2-.9.6-1.2 1l-.1.2-2.1 2.8c-.1.2-.3.3-.5.4-.2.1-.5.1-.7 0-.2-.1-.4-.2-.6-.4-.1-.1-.2-.3-.2-.5l-.6-12.5v-.2c0-.2 0-.4.1-.6.1-.2.3-.4.5-.5.2-.1.5-.1.7 0Z"
                  fill="#fff"
                  stroke="#fff"
                  strokeWidth="0.5"
                />
              </svg>
              <div className="ri-collab-stack">
                <div className="ri-chat-box">
                  <p className="ri-chat-text">
                    {RESEARCH_STAGE.chatPrompt}
                    <span className="ri-chat-caret" aria-hidden />
                  </p>
                  <span className="ri-chat-divider" aria-hidden />
                  <span className="ri-chat-send" aria-hidden>
                    <svg width="6" height="6" viewBox="0 0 6 6" fill="none">
                      <path
                        d="M5.143 0c.284 0 .514.23.514.514v3.497c0 .284-.23.514-.514.514-.284 0-.515-.23-.515-.514V1.756L.878 5.506a.36.36 0 0 1-.508 0 .36.36 0 0 1 0-.508L3.901 1.029H1.646C1.362 1.029 1.131.798 1.131.514 1.131.23 1.362 0 1.646 0h3.497Z"
                        fill="#000"
                      />
                    </svg>
                  </span>
                </div>
                <div
                  className={`ri-thread-wrap${threadHover ? " is-active" : ""}`}
                  onMouseLeave={() => setThreadHover(null)}
                >
                  <div
                    className="ri-thread-card"
                    data-active={threadHover ?? "r1"}
                  >
                    {RESEARCH_STAGE.thread.map((comment, i) => (
                      <div
                        key={comment.id}
                        className={`ri-thread-row ${comment.id}${i > 0 ? " is-separated" : ""}`}
                        onMouseEnter={() => setThreadHover(comment.id)}
                      >
                        <img
                          src={
                            comment.id === "r1"
                              ? THREAD_AVATARS.olta
                              : THREAD_AVATARS.liri
                          }
                          alt={comment.name}
                          className="ri-thread-ava"
                        />
                        <div className="ri-thread-body">
                          <p className="ri-thread-meta">
                            <span>
                              {comment.name}{" "}
                              <em>({comment.role})</em>
                            </span>
                            <time>{comment.time}</time>
                          </p>
                          <p className="ri-thread-msg">{comment.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Left: wireframe sketch with red annotation + collaborator tag */}
          <div className="ri-card ri-wire ri-float" data-d="2">
            <div className="ri-wire-cols">
              <div className="ri-wire-col">
                <span className="ri-wire-dot" />
                <i /><i /><i className="short" />
              </div>
              <div className="ri-wire-col">
                <span className="ri-wire-dot" />
                <i /><i className="short" />
              </div>
            </div>
            <div className="ri-wire-anno">
              <span className="ri-wire-circle" />
              <i className="ri-wire-bar" />
              <i className="ri-wire-bar short" />
              <span className="ri-wire-flag">{RESEARCH_STAGE.wireTag}</span>
              <svg className="ri-wire-cursor" width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path
                  d="M3 2L16 9.5L9.8 11.2L7.2 17L3 2Z"
                  fill="currentColor"
                  stroke="#0b0b0b"
                  strokeWidth="1"
                />
              </svg>
            </div>
          </div>

          {/* Right: flow chart - Framer asset (pixel-perfect) */}
          <div className="ri-flow ri-float" data-d="1">
            <img
              className="ri-flow-img"
              src={FLOW_IMG}
              alt=""
              width={201}
              height={159}
              draggable={false}
            />
            <img
              className="ri-flow-img ri-flow-img-hover"
              src={FLOW_IMG_HOVER}
              alt=""
              width={201}
              height={159}
              draggable={false}
            />
          </div>

          {/* Right: insight stack - tilted, overlapping with Framer hover */}
          <div className="ri-jtbd ri-float" data-d="2">
            <div
              className={`ri-jtbd-stack${jtbdHover ? ` is-active is-active-${jtbdHover}` : ""}`}
              onMouseLeave={() => setJtbdHover(null)}
            >
              <div
                className={`ri-jtbd-card c1${jtbdHover === "c1" ? " is-hovered" : ""}`}
                onMouseEnter={() => setJtbdHover("c1")}
              >
                <span className="ri-jtbd-dot accent" />
                <p className="ri-jtbd-line">{RESEARCH_STAGE.jtbd[0].line}</p>
              </div>
              <div
                className={`ri-jtbd-card c2${jtbdHover === "c2" ? " is-hovered" : ""}`}
                onMouseEnter={() => setJtbdHover("c2")}
              >
                <span className="ri-jtbd-dot teal" />
                <div className="ri-jtbd-copy">
                  <p className="ri-jtbd-line">{RESEARCH_STAGE.jtbd[1].line}</p>
                  <p className="ri-jtbd-sub">{RESEARCH_STAGE.jtbd[1].sub}</p>
                </div>
              </div>
              <div
                className={`ri-jtbd-card c3${jtbdHover === "c3" ? " is-hovered" : ""}`}
                onMouseEnter={() => setJtbdHover("c3")}
              >
                <span className="ri-jtbd-dot green" />
                <p className="ri-jtbd-line">{RESEARCH_STAGE.jtbd[2].line}</p>
              </div>
            </div>
          </div>

          {/* Live collaborator cursors */}
          <Cursor
            name={RESEARCH_STAGE.cursors.you}
            variant="you"
            duration={16}
            path={[
              { x: 1060, y: 155 },
              { x: 1080, y: 480 },
              { x: 1040, y: 320 },
              { x: 1060, y: 155 },
            ]}
          />
          <Cursor
            name={RESEARCH_STAGE.cursors.mate}
            variant="mate"
            duration={18}
            delay={1.2}
            path={[
              { x: 155, y: 545 },
              { x: 180, y: 520 },
              { x: 1080, y: 500 },
              { x: 155, y: 545 },
            ]}
          />
        </div>
      </div>

      <div className="ri-deliv-wrap">
        <GlowFrame
          className="ri-deliv-spotlight"
          radius="24px"
          innerRadius="23px"
          background="rgba(255, 255, 255, 0.1)"
          innerBackground="rgba(23, 23, 23, 0.85)"
          proximity={300}
          glowColor={[255, 255, 255, 0.25]}
          fadeBottom
        >
          <div className="ri-deliv">
            <Reveal className="ri-deliv-head">
              <p className="ri-deliv-kicker">
                <span className="ri-deliv-bullet" aria-hidden />
                Research deliverables
              </p>
              <h3 className="ri-deliv-title">What we deliver</h3>
            </Reveal>
            <div className="ri-deliv-grid">
              {RESEARCH_DELIVERABLES.map((item, i) => (
                <Reveal className="ri-deliv-cell" key={item.text} delay={i * 50}>
                  <span className="ri-deliv-icon">
                    <img src={item.icon} alt="" width={20} height={20} />
                  </span>
                  <p className="ri-deliv-text">{item.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </GlowFrame>
      </div>
    </section>
  );
}
