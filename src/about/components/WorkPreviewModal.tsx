import "./WorkPreviewModal.css";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { GlowFrame } from "./index";

export type WorkPreviewScreen = {
  src: string;
  alt: string;
  wide?: boolean;
  caption?: string;
};

export type WorkPreviewSection = {
  id: string;
  tag: string;
  title: string;
  paragraphs: string[];
  bullets: string[];
  screenIndex: number;
};

export type WorkCaseStudy = {
  id: string;
  project: string;
  tag: string;
  headline: string;
  intro: string;
  screens: WorkPreviewScreen[];
  sections: WorkPreviewSection[];
};

/** Card metadata for ProcessHero floating previews */
export type WorkPreviewItem = {
  id: string;
  src: string;
  alt: string;
  wide?: boolean;
  project: string;
  tag: string;
  title: string;
  caseStudyId: string;
  sectionIndex: number;
};

type WorkPreviewModalProps = {
  caseStudy: WorkCaseStudy;
  sectionIndex: number;
  onClose: () => void;
  onSectionChange: (index: number) => void;
};

function IconClose() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path
        d="M4.5 4.5l9 9M13.5 4.5l-9 9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DeviceChrome({ wide }: { wide?: boolean }) {
  if (wide) return null;

  return (
    <div className="wpm-status" aria-hidden>
      <span>9:41</span>
      <div className="wpm-status-icons">
        <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
          <rect x="0" y="6" width="3" height="4" rx="0.5" fill="#000" />
          <rect x="4.5" y="4" width="3" height="6" rx="0.5" fill="#000" />
          <rect x="9" y="2" width="3" height="8" rx="0.5" fill="#000" />
          <rect x="13" y="0" width="3" height="10" rx="0.5" fill="#000" />
        </svg>
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
          <path
            d="M1 3.5C3.5 1 10.5 1 13 3.5M3 6c2-1.5 6-1.5 8 0M5.5 8.2c.9-.6 2.1-.6 3 0"
            stroke="#000"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
        <span className="wpm-status-bar" />
      </div>
    </div>
  );
}

export function WorkPreviewModal({
  caseStudy,
  sectionIndex,
  onClose,
  onSectionChange: _onSectionChange,
}: WorkPreviewModalProps) {
  const count = caseStudy.sections.length;
  const copyRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeSection, setActiveSection] = useState(sectionIndex);

  const activeScreen =
    caseStudy.screens[caseStudy.sections[activeSection]?.screenIndex ?? 0] ??
    caseStudy.screens[0];

  useEffect(() => {
    setActiveSection(sectionIndex);
    const node = sectionRefs.current[sectionIndex];
    const root = copyRef.current;
    if (!node || !root) return;

    // Run once when the modal opens — not on observer-driven section changes.
    requestAnimationFrame(() => {
      root.scrollTo({ top: node.offsetTop - 8, behavior: "auto" });
    });
  }, [caseStudy.id, sectionIndex]);

  const activeSectionRef = useRef(activeSection);
  activeSectionRef.current = activeSection;

  useEffect(() => {
    const root = copyRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const top = visible[0];
        if (!top) return;

        const idx = Number((top.target as HTMLElement).dataset.sectionIndex);
        if (Number.isNaN(idx) || idx === activeSectionRef.current) return;

        // Local only — do not bubble to parent or scrollTo fights user on iOS.
        setActiveSection(idx);
      },
      {
        root,
        threshold: [0.2, 0.45, 0.7],
        rootMargin: "-8% 0px -52% 0px",
      },
    );

    sectionRefs.current.forEach((node) => {
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, [caseStudy.id]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return createPortal(
    <motion.div
      className="wpm-root"
      role="dialog"
      aria-modal="true"
      aria-label={`${caseStudy.project} case study`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <motion.div
        className="wpm-shell"
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <GlowFrame
          className="wpm-spotlight"
          radius="24px"
          innerRadius="23px"
          background="#ffffff"
          innerBackground="#ffffff"
          proximity={300}
          glowColor={[18, 24, 32, 0.08]}
        >
          <div className="wpm-body">
            <header className="wpm-header">
              <p className="wpm-header-meta">
                <span className="wpm-kicker-dot" aria-hidden />
                {caseStudy.project}
                <span className="wpm-header-sep" aria-hidden>
                  /
                </span>
                {activeSection + 1} of {count}
              </p>
              <button type="button" className="wpm-icon-btn wpm-close" aria-label="Close" onClick={onClose}>
                <IconClose />
              </button>
            </header>

            <div className="wpm-stage">
              <div className="wpm-split">
                <div className="wpm-preview">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeScreen.src}
                      className="wpm-preview-frame"
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.98 }}
                      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className={`wpm-device${activeScreen.wide ? " is-wide" : ""}`}>
                        <DeviceChrome wide={activeScreen.wide} />
                        <img
                          className="wpm-screen"
                          src={activeScreen.src}
                          alt={activeScreen.alt}
                          draggable={false}
                        />
                      </div>
                      {activeScreen.caption ? (
                        <p className="wpm-screen-caption">{activeScreen.caption}</p>
                      ) : null}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="wpm-divider" aria-hidden />

                <div className="wpm-copy-scroll" ref={copyRef}>
                  <article className="wpm-copy">
                    <header className="wpm-copy-intro">
                      <p className="wpm-kicker">
                        <span className="wpm-kicker-dot" aria-hidden />
                        {caseStudy.tag}
                      </p>
                      <h2 className="wpm-title">{caseStudy.headline}</h2>
                      <p className="wpm-desc wpm-desc-intro">{caseStudy.intro}</p>
                    </header>

                    {caseStudy.sections.map((section, index) => (
                      <section
                        key={section.id}
                        ref={(node) => {
                          sectionRefs.current[index] = node;
                        }}
                        className={`wpm-section${index === activeSection ? " is-active" : ""}`}
                        data-section-index={index}
                        aria-current={index === activeSection ? "true" : undefined}
                      >
                        <p className="wpm-kicker">
                          <span className="wpm-kicker-dot" aria-hidden />
                          {section.tag}
                        </p>
                        <h3 className="wpm-section-title">{section.title}</h3>
                        {section.paragraphs.map((paragraph) => (
                          <p key={paragraph} className="wpm-desc">
                            {paragraph}
                          </p>
                        ))}
                        <ul className="wpm-highlights">
                          {section.bullets.map((point) => (
                            <li key={point}>{point}</li>
                          ))}
                        </ul>
                      </section>
                    ))}
                  </article>
                </div>
              </div>
            </div>
          </div>
        </GlowFrame>
      </motion.div>
    </motion.div>,
    document.body,
  );
}
