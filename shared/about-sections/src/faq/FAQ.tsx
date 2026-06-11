import "./FAQ.css";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { openContactModal } from "../../../contact-modal.js";
import { GlowFrame } from "../components/GlowFrame";
import { FAQ_CATEGORIES, FAQ_ITEMS, type FaqCategory } from "./faqData";

export function FAQ() {
  const [category, setCategory] = useState<FaqCategory>(FAQ_CATEGORIES[0]);
  const [open, setOpen] = useState<string | null>(
    FAQ_ITEMS[FAQ_CATEGORIES[0]][0].question,
  );

  const items = FAQ_ITEMS[category];

  const selectCategory = (next: FaqCategory) => {
    setCategory(next);
    setOpen(FAQ_ITEMS[next][0].question);
  };

  return (
    <section className="faq-section" id="faq" data-framer-name="FAQ">
      <div className="faq-content">
        <div className="faq-header">
          <div className="faq-header-main">
            <span className="faq-chip">FAQ</span>
            <h2 className="faq-title">Answers to the questions that come up most.</h2>
          </div>
          <p className="faq-lead">
            Learn how Nacew works, what is included in our services, and what to
            expect during design and development.
          </p>
        </div>

        <div className="faq-grid">
          <div className="faq-aside">
            <div className="faq-tabs-shell">
              <GlowFrame
                className="faq-tabs-frame"
                radius="20px"
                innerRadius="19px"
                background="rgba(255,255,255,0.06)"
                innerBackground="rgba(12,4,18,0.6)"
              >
                <div className="faq-tabs">
                  {FAQ_CATEGORIES.map((cat) => {
                    const active = cat === category;
                    return (
                      <button
                        key={cat}
                        type="button"
                        className={`faq-tab${active ? " is-active" : ""}`}
                        aria-pressed={active}
                        onClick={() => selectCategory(cat)}
                      >
                        {active && (
                          <>
                            <span className="faq-tab-accent" aria-hidden />
                            <GlowFrame
                              className="faq-tab-glow"
                              radius="999px"
                              innerRadius="999px"
                              background="rgba(255,255,255,0.14)"
                              innerBackground="rgba(28,0,56,0.55)"
                              glowColor={[255, 243, 240, 0.35]}
                            >
                              <span aria-hidden />
                            </GlowFrame>
                          </>
                        )}
                        <span className="faq-tab-label">{cat}</span>
                      </button>
                    );
                  })}
                </div>
              </GlowFrame>
            </div>

            <div className="faq-aside-card">
              <GlowFrame
                className="faq-aside-glow"
                radius="20px"
                innerRadius="19px"
                background="rgba(255,255,255,0.06)"
                innerBackground="rgba(12,4,18,0.6)"
              >
                <div className="faq-aside-inner">
                  <h3 className="faq-aside-title">Got Questions?</h3>
                  <p className="faq-aside-text">
                    Can&apos;t find what you&apos;re looking for? Reach out,
                    we&apos;re fast.
                  </p>
                  <button type="button" className="faq-aside-link" onClick={() => openContactModal()}>
                    Email us &rarr;
                  </button>
                </div>
              </GlowFrame>
            </div>
          </div>

          <div className="faq-list">
            {items.map((item) => {
              const isOpen = open === item.question;
              return (
                <div className="faq-item-wrap" key={item.question}>
                  <GlowFrame
                    className="faq-item-glow"
                    radius="18px"
                    innerRadius="17px"
                    background="rgba(255,255,255,0.06)"
                    innerBackground="rgba(12,4,18,0.6)"
                  >
                    <div className="faq-item-inner">
                      <button
                        type="button"
                        className="faq-item-head"
                        aria-expanded={isOpen}
                        onClick={() => setOpen(isOpen ? null : item.question)}
                      >
                        <span className="faq-item-q">{item.question}</span>
                        <span className="faq-item-toggle" aria-hidden>
                          <motion.svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            animate={{ rotate: isOpen ? 45 : 0 }}
                            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                          >
                            <path
                              d="M7 1.5v11M1.5 7h11"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                          </motion.svg>
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            className="faq-item-body"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                          >
                            <p className="faq-item-a">{item.answer}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </GlowFrame>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
