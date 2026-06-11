import "./ProcessHero.css";
import { FounderLetter } from "./FounderLetter";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import type { MotionValue } from "motion/react";
import type { ReactNode, RefObject } from "react";
import { img } from "../assets";
import { WorkPreviewModal, type WorkCaseStudy, type WorkPreviewItem } from "../components/WorkPreviewModal";

const clamp01 = (n: number) => Math.max(0, Math.min(1, n));

const UI_EXAMPLES = {
  kiweLanding: img("a0DKYY1wjicWlfZZvoyrl5VPrQ"),
  mobileExpense: img("HxHl9lbP80Jonr53p6yTCoWxmSY"),
  researchThread: img("WWm2oYPiAfsMt4qEBFXCSh4RBc"),
  designSystem: img("2Sqh0cGyFXsYBMzg2bAeWyAx8Vw"),
  kiweMobile: img("P2SPgOOW9DmlSIY1azpypWGhh0"),
};

const LEAD_HI =
  "Research, strategy, and the plan that makes everything else possible.";
const LEAD_REST =
  "Before we open Figma, we study your market, audit the experience, and define your users, so every decision answers what the product should do, and for whom.";

const FULL_TEXT = `${LEAD_HI} ${LEAD_REST}`;
const WORDS = FULL_TEXT.split(" ");
const HI_COUNT = LEAD_HI.split(" ").length;

const KIWE_CASE_STUDY: WorkCaseStudy = {
  id: "kiwe",
  project: "Kiwe",
  tag: "Fintech product design",
  headline: "Positioning a fintech product before design starts",
  intro:
    "Kiwe needed a digital identity product that felt fast, trustworthy, and ownable, not another generic finance app. We ran strategy and research first, then designed the landing, mobile flows, and system that the team could ship from.",
  screens: [
    {
      src: UI_EXAMPLES.kiweLanding,
      alt: "Kiwe marketing landing page",
      wide: true,
      caption: "Marketing landing: value prop and trust signals",
    },
    {
      src: UI_EXAMPLES.researchThread,
      alt: "Kiwe user research synthesis",
      wide: true,
      caption: "Research synthesis: onboarding friction mapped to screens",
    },
    {
      src: UI_EXAMPLES.mobileExpense,
      alt: "Kiwe mobile expense capture flow",
      caption: "Mobile: quick expense capture for daily use",
    },
    {
      src: UI_EXAMPLES.kiweMobile,
      alt: "Kiwe identity verification onboarding",
      caption: "Onboarding: verification with clear security cues",
    },
    {
      src: UI_EXAMPLES.designSystem,
      alt: "Kiwe design system components",
      wide: true,
      caption: "Design system: shared tokens across web and mobile",
    },
  ],
  sections: [
    {
      id: "strategy",
      tag: "Product strategy",
      title: "Define the job before opening Figma",
      screenIndex: 0,
      paragraphs: [
        "Kiwe was entering a crowded identity and payments space. Before any UI work, we audited competitors, mapped onboarding patterns, and clarified the single job Kiwe had to win: help users verify identity without feeling like they were filling out a bank form.",
        "That strategy pass shaped the landing narrative, the mobile hierarchy, and what the team chose not to build in v1.",
      ],
      bullets: [
        "Competitor audit across onboarding and trust signals",
        "Messaging hierarchy built around the core user job",
        "Landing structure tested before visual design",
      ],
    },
    {
      id: "research",
      tag: "User research",
      title: "Turn interviews into screen-level decisions",
      screenIndex: 1,
      paragraphs: [
        "We ran structured interviews with early adopters and internal stakeholders, then threaded findings back to exact steps in the flow. The biggest drop-off was not security concern. It was unclear value on the first screen.",
        "Research outputs lived beside the work, so design and product could trace every layout choice to evidence.",
      ],
      bullets: [
        "Structured feedback threads with roles and context",
        "Friction mapped to a specific onboarding step",
        "Recommendations tied to measurable outcomes",
      ],
    },
    {
      id: "mobile-expense",
      tag: "Mobile UX",
      title: "Design for the moment people log spending",
      screenIndex: 2,
      paragraphs: [
        "Expense capture had to work one-handed, in under ten seconds, often right after a purchase. We removed fields that looked complete in specs but failed in real usage.",
        "The final flow prioritizes speed first, detail second, matching how Kiwe's users actually behave.",
      ],
      bullets: [
        "JTBD interviews with early adopters",
        "Reduced steps from capture to confirmation",
        "UI tuned for one-handed mobile use",
      ],
    },
    {
      id: "onboarding",
      tag: "Onboarding",
      title: "Verification that earns trust on first open",
      screenIndex: 3,
      paragraphs: [
        "Identity verification is sensitive. Kiwe's onboarding explains why data is needed before asking for it, uses progressive disclosure, and keeps security language human.",
        "We tested copy and layout with users who had never heard of the brand. Completion improved when the first screen answered what Kiwe does for them.",
      ],
      bullets: [
        "Value prop visible before account creation",
        "Progressive disclosure for verification steps",
        "Visual language that signals trust and speed",
      ],
    },
    {
      id: "system",
      tag: "Design systems",
      title: "One system for product, marketing, and mobile",
      screenIndex: 4,
      paragraphs: [
        "Scattered styles were slowing handoff. We built a shared library with color, type, spacing, and components so marketing pages and product screens feel like the same company.",
        "Developers got documented tokens and React-ready patterns instead of one-off exports.",
      ],
      bullets: [
        "Reusable components for web and mobile",
        "Tokenized color, type, and spacing",
        "Documentation the dev team could ship from",
      ],
    },
  ],
};

const WORK_ITEMS: WorkPreviewItem[] = [
  {
    id: "s1",
    src: UI_EXAMPLES.kiweLanding,
    alt: "Kiwe fintech case study",
    wide: true,
    project: "Kiwe",
    tag: "Product strategy",
    title: "Positioning a fintech product before design starts",
    caseStudyId: "kiwe",
    sectionIndex: 0,
  },
  {
    id: "s2",
    src: UI_EXAMPLES.mobileExpense,
    alt: "Mobile expense tracking UI",
    project: "Kiwe",
    tag: "Mobile UX",
    title: "Expense flows shaped by real usage patterns",
    caseStudyId: "kiwe",
    sectionIndex: 2,
  },
  {
    id: "s3",
    src: UI_EXAMPLES.researchThread,
    alt: "User research feedback",
    wide: true,
    project: "Kiwe",
    tag: "User research",
    title: "Research findings turned into design decisions",
    caseStudyId: "kiwe",
    sectionIndex: 1,
  },
  {
    id: "s4",
    src: UI_EXAMPLES.designSystem,
    alt: "Design system components",
    wide: true,
    project: "Kiwe",
    tag: "Design systems",
    title: "One system for product, marketing, and mobile",
    caseStudyId: "kiwe",
    sectionIndex: 4,
  },
  {
    id: "s5",
    src: UI_EXAMPLES.kiweMobile,
    alt: "Kiwe identity verification UI",
    project: "Kiwe",
    tag: "Onboarding",
    title: "Identity verification users trust on first open",
    caseStudyId: "kiwe",
    sectionIndex: 3,
  },
];

const CASE_STUDIES: Record<string, WorkCaseStudy> = {
  kiwe: KIWE_CASE_STUDY,
};

type Scene = {
  id: string;
  workIndex: number;
  enter: number;
  exit: number;
  className: string;
};

function CaseImage({ src, alt }: { src: string; alt: string }) {
  return <img src={src} alt={alt} draggable={false} loading="lazy" />;
}

const SCENES: Scene[] = [
  { id: "s1", workIndex: 0, enter: 0.04, exit: 0.38, className: "ph-card ph-card-a" },
  { id: "s2", workIndex: 1, enter: 0.2, exit: 0.54, className: "ph-card ph-card-b" },
  { id: "s3", workIndex: 2, enter: 0.36, exit: 0.7, className: "ph-card ph-card-c" },
  { id: "s4", workIndex: 3, enter: 0.48, exit: 0.82, className: "ph-card ph-card-d" },
  { id: "s5", workIndex: 4, enter: 0.58, exit: 0.76, className: "ph-card ph-card-hero" },
];

const PILLS: { text: string; enter: number; exit: number; className: string }[] = [
  { text: "Competitor analysis", enter: 0.08, exit: 0.4, className: "ph-pill ph-pill-1" },
  { text: "User research", enter: 0.28, exit: 0.6, className: "ph-pill ph-pill-2" },
  { text: "JTBD framework", enter: 0.44, exit: 0.78, className: "ph-pill ph-pill-3" },
  { text: "Strategy brief", enter: 0.6, exit: 0.95, className: "ph-pill ph-pill-4" },
];

function ScrollWord({
  progress,
  index,
  total,
  children,
}: {
  progress: MotionValue<number>;
  index: number;
  total: number;
  children: ReactNode;
}) {
  const isLead = index < HI_COUNT;
  const restCount = Math.max(1, total - HI_COUNT);
  const restIndex = Math.max(0, index - HI_COUNT);
  const revealStart = (restIndex / restCount) * 0.66 + 0.08;
  const revealEnd = Math.min(0.86, revealStart + 2.4 / restCount);

  const opacity = useTransform(
    progress,
    isLead ? [0, 1] : [0, revealStart, revealEnd, 1],
    isLead ? [1, 1] : [0, 0, 1, 1],
  );

  const y = useTransform(
    progress,
    isLead ? [0, 1] : [0, revealStart, revealEnd, 1],
    isLead ? [0, 0] : [12, 12, 0, 0],
  );

  return (
    <motion.span className="ph-word" style={{ opacity, y }}>
      {children}
    </motion.span>
  );
}

function ScrollScene({
  progress,
  enter,
  exit,
  className,
  work,
  onOpen,
}: {
  progress: MotionValue<number>;
  enter: number;
  exit: number;
  className: string;
  work: WorkPreviewItem;
  onOpen: () => void;
}) {
  const opacity = useTransform(
    progress,
    [clamp01(enter - 0.06), enter, exit, clamp01(exit + 0.08)],
    [0, 1, 1, 0],
  );
  const y = useTransform(progress, [enter, exit], [48, -56]);
  const scale = useTransform(progress, [clamp01(enter - 0.04), enter, exit], [0.94, 1, 0.98]);

  return (
    <motion.button
      type="button"
      className={className}
      style={{ opacity, y, scale }}
      aria-label={`View ${work.alt}`}
      onClick={onOpen}
    >
      <CaseImage src={work.src} alt={work.alt} />
    </motion.button>
  );
}

function ScrollPill({
  progress,
  enter,
  exit,
  className,
  children,
}: {
  progress: MotionValue<number>;
  enter: number;
  exit: number;
  className: string;
  children: ReactNode;
}) {
  const opacity = useTransform(
    progress,
    [clamp01(enter - 0.05), enter, exit, clamp01(exit + 0.07)],
    [0, 1, 1, 0],
  );
  const y = useTransform(progress, [enter, exit], [24, -20]);

  return (
    <motion.span className={className} style={{ opacity, y }} aria-hidden>
      {children}
    </motion.span>
  );
}

function ProcessPhase({
  blockRef,
  onOpenWork,
  enterProgress,
}: {
  blockRef: RefObject<HTMLDivElement | null>;
  onOpenWork: (index: number) => void;
  enterProgress: MotionValue<number>;
}) {
  const { scrollYProgress } = useScroll({
    target: blockRef,
    offset: ["start start", "end end"],
  });

  const textY = useTransform(scrollYProgress, [0, 0.4, 0.95], [14, 0, 0]);
  const stageScale = useTransform(enterProgress, [0, 0.55, 1], [0.84, 0.96, 1]);
  const stageRadius = useTransform(enterProgress, [0, 0.72, 1], [52, 16, 0]);
  const stageRadiusPx = useTransform(stageRadius, (v) => `${v}px`);
  const stageShadow = useTransform(
    enterProgress,
    [0, 0.45, 1],
    [
      "0 40px 100px rgba(0, 0, 0, 0.55)",
      "0 24px 64px rgba(0, 0, 0, 0.2)",
      "0 0 0 rgba(0, 0, 0, 0)",
    ],
  );

  return (
    <div className="ph-block" ref={blockRef} data-nav-theme="dark">
      <motion.div
        className="ph-stage"
        data-nav-theme="light"
        style={{
          scale: stageScale,
          borderRadius: stageRadiusPx,
          boxShadow: stageShadow,
        }}
      >
        <div className="ph-stage-fade ph-stage-fade-top" aria-hidden />
        <div className="ph-stage-fade ph-stage-fade-bottom" aria-hidden />

        {SCENES.map((scene) => {
          const work = WORK_ITEMS[scene.workIndex];
          return (
            <ScrollScene
              key={scene.id}
              progress={scrollYProgress}
              enter={scene.enter}
              exit={scene.exit}
              className={scene.className}
              work={work}
              onOpen={() => onOpenWork(scene.workIndex)}
            />
          );
        })}

        {PILLS.map((pill) => (
          <ScrollPill
            key={pill.text}
            progress={scrollYProgress}
            enter={pill.enter}
            exit={pill.exit}
            className={pill.className}
          >
            {pill.text}
          </ScrollPill>
        ))}

        <motion.div className="ph-center" style={{ y: textY }}>
          <p className="ph-lead">
            {WORDS.map((w, i) => (
              <ScrollWord key={i} progress={scrollYProgress} index={i} total={WORDS.length}>
                {w}
              </ScrollWord>
            ))}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export function ProcessHero() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [modalSection, setModalSection] = useState(0);
  const blockRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: enterProgress } = useScroll({
    target: blockRef,
    offset: ["start end", "start 0.1"],
  });

  const openWork = (index: number) => {
    setOpenIndex(index);
    setModalSection(WORK_ITEMS[index]?.sectionIndex ?? 0);
  };

  const activeCaseStudy =
    openIndex !== null ? CASE_STUDIES[WORK_ITEMS[openIndex]?.caseStudyId ?? "kiwe"] : null;

  return (
    <section className="ph" id="process">
      <ProcessPhase blockRef={blockRef} onOpenWork={openWork} enterProgress={enterProgress} />
      <div className="ph-tail" data-nav-theme="light">
        <FounderLetter />
      </div>
      <AnimatePresence>
        {openIndex !== null && activeCaseStudy && (
          <WorkPreviewModal
            key="work-preview"
            caseStudy={activeCaseStudy}
            sectionIndex={modalSection}
            onClose={() => setOpenIndex(null)}
            onSectionChange={setModalSection}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
