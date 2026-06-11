import { Fragment, useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Command,
  SlidersHorizontal,
  PanelRight,
  Smile,
  LayoutGrid,
  Flag,
  Boxes,
  CheckSquare,
  Hash,
  FileText,
  GitMerge,
  Globe,
} from 'lucide-react';
import './Bento.css';
import '../../scripts/bento/bento-stage-enter.css';

const ease = [0.16, 1, 0.3, 1];

function Block({ heading, sub, children, delay = 0 }) {
  return (
    <motion.div
      className="bento-block"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease }}
    >
      <div className="bento-text">
        <h3>{heading}</h3>
        <p>{sub}</p>
      </div>
      {children}
    </motion.div>
  );
}

/* ---------- 1. Task list ---------- */
const rows = [
  { t: 'List SaaS tools to replace', tag: 'Audit', meta: 'Spend', avatar: '#a1a1aa', done: true },
  { t: 'Design client portal', tag: 'Design', metaPill: 'Portal', avatar: '#7064C6' },
  { t: 'Sync CRM + billing data', tag: 'Build', meta: 'Data', checkAnim: true },
  { t: 'Build custom approval app', tag: 'Build', meta: 'Owned', selected: true },
  { t: 'Move spreadsheets into Nacew', tag: 'Ops', field: true },
  { t: 'Ship executive dashboard', tag: 'Product', meta: 'Live' },
];

function TaskMockup() {
  return (
    <div className="bento-panel bento-tasks">
      {rows.map((r, i) => (
        <motion.div
          key={i}
          className={`bento-trow${r.selected ? ' is-selected' : ''}`}
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.055, ease }}
        >
          <span className={`bento-cb${r.done ? ' is-done' : ''}${r.checkAnim ? ' bento-cb-anim' : ''}`} />
          <span className="bento-ttitle">{r.t}</span>
          <span className="bento-ttag">{r.tag}</span>
          {r.metaPill ? (
            <span className="bento-tmeta-pill">{r.metaPill}</span>
          ) : r.field ? (
            <span className="bento-tfield">
              <span className="bento-tfill">Nacew</span>
              <span className="bento-tcaret" />
            </span>
          ) : (
            <span className="bento-tmeta">{r.meta}</span>
          )}
          <span className="bento-tav" style={{ background: r.avatar || '#d4d4d8' }}>
            {r.avatar ? '' : <Globe size={11} />}
          </span>
          {r.selected && <span className="bento-row-signal">building</span>}
        </motion.div>
      ))}
      <div className="bento-trow bento-tnew">
        <span className="bento-cb bento-cb-plus">+</span>
        <span className="bento-ttitle">New task</span>
      </div>

      <span className="bento-name bento-name-casey">Casey</span>
      <span className="bento-name bento-name-taylor">Taylor</span>

      {/* Data chip the Alexis cursor picks up and drops into the field row. */}
      <span className="bento-drag-chip">Data</span>

      {/* CSS-driven cursor: grab → drag → drop → check a box → idle (8s loop). */}
      <span className="bento-cursor bento-cur-alexis">
        <span className="bento-click-ring" />
        <svg width="15" height="15" viewBox="0 0 24 24" fill="#2C7E88"><path d="M5 3l14 7-6 2-2 6-6-15z" /></svg>
        <span style={{ background: '#2C7E88' }}>Alexis</span>
      </span>
    </div>
  );
}

/* ---------- 2. Building blocks (jigsaw) ---------- */
const tiles = [
  { Icon: LayoutGrid, color: '#7064C6', label: 'CRM' },
  { Icon: Flag, color: '#C25055', label: 'Portal' },
  { Icon: Boxes, color: '#7064C6', label: 'Inventory' },
  { Icon: CheckSquare, color: '#537D2B', label: 'Approvals' },
  { Icon: Hash, color: '#C25055', label: 'Reports' },
  { Icon: FileText, color: '#C25055', label: 'Docs' },
];

function BlocksMockup() {
  return (
    <div className="bento-panel bento-puzzle">
      {tiles.map(({ Icon, color, label }, i) => (
        <motion.div
          key={i}
          className="bento-piece"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300, damping: 18 }}
        >
          <span className="bento-knob bento-knob-t" />
          <span className="bento-knob bento-knob-r" />
          <Icon size={26} strokeWidth={1.9} style={{ color }} />
          <span className="bento-piece-label">{label}</span>
        </motion.div>
      ))}
    </div>
  );
}

/* ---------- 3. Customization dials ---------- */
function DialMockup() {
  return (
    <div className="bento-panel bento-dials">
      {/* left: settings ring */}
      <motion.div
        className="bento-dial bento-dial-l"
        whileHover="hover"
      >
        <motion.span className="bento-dial-icon d-n" variants={{ hover: { y: -3 } }}><SlidersHorizontal size={16} /></motion.span>
        <motion.span className="bento-dial-icon d-w" variants={{ hover: { x: -3 } }}><Command size={16} /></motion.span>
        <motion.span className="bento-dial-icon d-e" variants={{ hover: { x: 3 } }}><PanelRight size={16} /></motion.span>
        <motion.span className="bento-dial-icon d-s" variants={{ hover: { y: 3 } }}><Smile size={16} /></motion.span>
        <span className="bento-dial-label">SUBS</span>
        <span className="bento-dial-knob" />
      </motion.div>

      {/* connector */}
      <div className="bento-auto">
        <span className="bento-auto-slider" />
        <span>AUTO</span>
      </div>
      <motion.span
        className="bento-transfer-pill transfer-crm"
        animate={{ x: [-96, 0, 96], opacity: [0, 1, 0], scale: [0.94, 1, 0.94] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        CRM
      </motion.span>
      <motion.span
        className="bento-transfer-pill transfer-reports"
        animate={{ x: [-92, 0, 92], opacity: [0, 1, 0], scale: [0.94, 1, 0.94] }}
        transition={{ duration: 3.8, delay: 1.15, repeat: Infinity, ease: 'easeInOut' }}
      >
        Reports
      </motion.span>
      <motion.span
        className="bento-transfer-pill transfer-portal"
        animate={{ x: [-88, 0, 88], opacity: [0, 1, 0], scale: [0.94, 1, 0.94] }}
        transition={{ duration: 3.8, delay: 2.3, repeat: Infinity, ease: 'easeInOut' }}
      >
        Portal
      </motion.span>

      {/* right: focused choice */}
      <div className="bento-dial bento-dial-r">
        <span className="bento-dial-pin" />
        <motion.span
          className="bento-dial-hero"
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <FileText size={20} color="#fff" strokeWidth={2} />
        </motion.span>
        <span className="bento-owned-label">OWNED</span>
      </div>

      {/* cursor dragging a tool from SUBS into OWNED */}
      <span className="bento-dial-cursor">
        <span className="bento-click-ring" />
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#3f3f46"><path d="M5 3l14 7-6 2-2 6-6-15z" /></svg>
        <span className="bento-dial-grab">Reports</span>
      </span>
    </div>
  );
}

/* ---------- 4. Chat thread (self-running live timeline) ---------- */
const CHAT_SCRIPT = [
  { id: 'a1', kind: 'msg', who: 'A', color: '#2C7E88', name: 'Alexis', text: 'can you replace these tools with one product?', hold: 900 },
  { id: 't1', kind: 'msg', who: 'T', color: '#7064C6', name: 'Taylor', text: 'yes, CRM, approvals, reports, portal', react: ['👍 1', '🔥 2'], typing: true, hold: 1000 },
  { id: 'assign', kind: 'assign', text: 'Taylor assigned themself', hold: 700 },
  { id: 'log', kind: 'log', hold: 1100 },
  { id: 't2', kind: 'msg', who: 'T', color: '#7064C6', name: 'Taylor', text: "here's your owned product preview:", preview: true, typing: true, hold: 1400 },
  { id: 'note', kind: 'note', text: 'Open questions updated by Nacew: what to cancel first', hold: 800 },
  { id: 'merge', kind: 'merge', hold: 1200 },
];

function ChatItem({ item }) {
  if (item.kind === 'assign') return <div className="bento-cassign bento-cin">{item.text}</div>;
  if (item.kind === 'note') return <p className="bento-cnote bento-cin">{item.text}</p>;
  if (item.kind === 'log') {
    return (
      <div className="bento-clog bento-cin">
        <div className="bento-clog-bar">
          <span className="bento-clog-tag">⊕ Log</span>
          <span>☺</span>
          <span>···</span>
          <span className="bento-clog-time">3:05 PM</span>
        </div>
        <p>
          Nacew marked <b className="p-green">CRM</b>, <b className="p-amber">Zapier</b>,
          and <b className="p-blue">Airtable</b> for replacement
        </p>
      </div>
    );
  }
  if (item.kind === 'merge') {
    return (
      <div className="bento-cmerge bento-cin">
        <span className="bento-cgit"><GitMerge size={13} /></span>
        <div>
          <span className="bento-cpill p-purple">Merged</span>
          <p>Pull request #42 · Custom app ready for launch</p>
          <span className="bento-cdone">Subscriptions updated <b>Cancel</b></span>
        </div>
      </div>
    );
  }
  // msg
  return (
    <div className="bento-cmsg bento-cin">
      <span className="bento-cav" style={{ background: item.color }}>{item.who}</span>
      <div>
        <span className="bento-cname">{item.name}</span>
        <p className="bento-cbubble">{item.text}</p>
        {item.react ? (
          <div className="bento-creact">
            {item.react.map((r) => (
              <span className="bento-react-pop" key={r}>{r}</span>
            ))}
          </div>
        ) : null}
        {item.preview ? (
          <div className="bento-cpreview">
            <div className="bento-cpreview-head">
              <span className="bento-cpreview-dot" />
              <div>
                <strong>Client Portal OS</strong>
                <em>Owned app</em>
              </div>
            </div>
            <div className="bento-cpreview-grid">
              {Array.from({ length: 24 }).map((_, i) => (
                <span key={i} className="bento-cell-pop" style={{ animationDelay: `${i * 0.03}s` }} />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function ChatMockup() {
  const [step, setStep] = useState(0);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setStep(CHAT_SCRIPT.length);
      return undefined;
    }
    let cancelled = false;
    const timers = [];
    const wait = (ms, fn) => timers.push(setTimeout(fn, ms));

    const run = () => {
      setStep(0);
      setTyping(false);
      let i = 0;
      const next = () => {
        if (cancelled) return;
        if (i >= CHAT_SCRIPT.length) {
          wait(2800, run); // pause, then replay the conversation
          return;
        }
        const item = CHAT_SCRIPT[i];
        const reveal = () => {
          setStep(i + 1);
          const hold = item.hold || 800;
          i += 1;
          wait(hold, next);
        };
        if (item.typing) {
          setTyping(true);
          wait(1150, () => {
            if (cancelled) return;
            setTyping(false);
            reveal();
          });
        } else {
          reveal();
        }
      };
      wait(600, next);
    };
    run();

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, []);

  const shown = CHAT_SCRIPT.slice(0, step);

  return (
    <div className="bento-panel bento-chat">
      {shown.map((item) => (
        <ChatItem key={item.id} item={item} />
      ))}
      {typing ? (
        <div className="bento-typing bento-typing-live">
          <span />
          <span />
          <span />
        </div>
      ) : null}
    </div>
  );
}

/* ---------- 5. Automation card ---------- */
function AutoMockup() {
  return (
    <div className="bento-panel bento-autocard">
      <div className="bento-sub-stack" aria-hidden="true">
        <motion.span
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease }}
        >
          CRM $99/mo
        </motion.span>
        <motion.span
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.08, ease }}
        >
          Reports $49/mo
        </motion.span>
        <motion.span
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.16, ease }}
        >
          Forms $29/mo
        </motion.span>
      </div>
      <motion.div
        className="bento-replace-line"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.18, ease }}
      />
      <motion.div
        className="bento-autoline"
        initial={{ opacity: 0, x: 10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: 0.28, ease }}
      >
        <span className="bento-autopill">Nacew</span>
        <span className="bento-autotext">replaced them with one owned product</span>
      </motion.div>
    </div>
  );
}

/* ---------- Section ---------- */
export default function Bento() {
  const sectionRef = useRef(null);
  const { scrollYProgress: enterProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start 0.1'],
  });

  const stageScale = useTransform(enterProgress, [0, 0.55, 1], [0.84, 0.96, 1]);
  const stageRadius = useTransform(enterProgress, [0, 0.72, 1], [52, 16, 0]);
  const stageRadiusPx = useTransform(stageRadius, (v) => `${v}px`);
  const stageShadow = useTransform(
    enterProgress,
    [0, 0.45, 1],
    [
      '0 40px 100px rgba(0, 0, 0, 0.55)',
      '0 24px 64px rgba(0, 0, 0, 0.2)',
      '0 0 0 rgba(0, 0, 0, 0)',
    ],
  );
  const backdropOpacity = useTransform(enterProgress, [0, 0.04, 0.96, 1], [0, 1, 1, 0]);

  return (
    <Fragment>
      <motion.div className="bento-enter-backdrop" style={{ opacity: backdropOpacity }} aria-hidden />
      <motion.section
        ref={sectionRef}
        className="bento-section"
        id="why-nacew"
        style={{
          scale: stageScale,
          borderRadius: stageRadiusPx,
          boxShadow: stageShadow,
          transformOrigin: '50% 42%',
        }}
      >
      <div className="bento-masonry">
        <div className="bento-col bento-col-left">
          <Block
            heading="Hire us to build your tools."
            sub="We turn the messy set of subscriptions your team pays for into one custom product built around your work."
          >
            <TaskMockup />
          </Block>

          <Block
            heading={<>Stop renting<br />your workflow.</>}
            sub="Own the platform instead of paying every month for tools that almost fit. We shape the logic around you."
            delay={0.05}
          >
            <DialMockup />
          </Block>

          <Block
            heading="Cancel tools. Keep the power."
            sub="We bake follow-ups, reports, approvals, and handoffs into the product so you do not need extra automations."
            delay={0.1}
          >
            <a className="bento-btn" href="https://auth.nacew.com/signup">Start a custom build</a>
            <AutoMockup />
          </Block>
        </div>

        <div className="bento-col bento-col-right">
          <Block
            heading={<>Custom modules,<br />not more subscriptions.</>}
            sub="Pick the products you need: CRM, portal, dashboard, approval system, inventory, reports. We build them to fit."
            delay={0.08}
          >
            <BlocksMockup />
          </Block>

          <Block
            heading="Built with you. Owned by you."
            sub="Strategy, design, engineering, and launch stay connected so the product is clear, useful, and ready to replace tools."
            delay={0.12}
          >
            <ChatMockup />
          </Block>
        </div>
      </div>
      <div
        className="bento-end-art"
        aria-hidden="true"
        onPointerMove={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          event.currentTarget.style.setProperty('--bento-art-x', `${((event.clientX - rect.left) / rect.width) * 100}%`);
          event.currentTarget.style.setProperty('--bento-art-y', `${((event.clientY - rect.top) / rect.height) * 100}%`);
        }}
        onPointerLeave={(event) => {
          event.currentTarget.style.setProperty('--bento-art-x', '50%');
          event.currentTarget.style.setProperty('--bento-art-y', '50%');
        }}
      >
        <img className="bento-end-art-base-light" src="/bento-section-end.svg" alt="" />
        <img className="bento-end-art-base-dark" src="/bento-section-end.svg" alt="" />
        <img className="bento-end-art-center" src="/bento-section-end.svg" alt="" />
        <img className="bento-end-art-cursor-soft" src="/bento-section-end.svg" alt="" />
        <img className="bento-end-art-cursor" src="/bento-section-end.svg" alt="" />
      </div>
    </motion.section>
    </Fragment>
  );
}
