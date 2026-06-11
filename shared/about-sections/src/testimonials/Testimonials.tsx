import "./Testimonials.css";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import type { MotionValue } from "motion/react";
import { TESTIMONIALS, type Testimonial } from "./testimonialsData";

function TestimonialCard({
  data,
  index,
  total,
  progress,
}: {
  data: Testimonial;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const minScale = 1 - (total - 1 - index) * 0.05;
  const scale = useTransform(progress, [index / total, 1], [1, minScale]);

  return (
    <div className="testi-card-wrap" style={{ top: `calc(12vh + ${index * 28}px)` }}>
      <motion.figure
        className="testi-card"
        style={{
          backgroundColor: data.accent,
          color: data.ink,
          rotate: `${data.rotate}deg`,
          scale,
        }}
      >
        <span className="testi-quote-mark" aria-hidden>
          &ldquo;
        </span>
        <blockquote className="testi-quote">{data.quote}</blockquote>
        <figcaption className="testi-meta">
          <span className="testi-name">{data.name}</span>
          <span className="testi-role">{data.role}</span>
        </figcaption>
      </motion.figure>
    </div>
  );
}

export function Testimonials() {
  const wrapRef = useRef<HTMLElement>(null);
  const blockRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: enterProgress } = useScroll({
    target: wrapRef,
    offset: ["start end", "start -35%"],
  });
  const { scrollYProgress } = useScroll({
    target: blockRef,
    offset: ["start start", "end end"],
  });

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
  const backdropBg = useTransform(
    enterProgress,
    [0, 0.72, 1],
    ["#ffffff", "#ffffff", "#000000"],
  );

  return (
    <motion.section
      className="testi-wrap"
      id="testimonials"
      ref={wrapRef}
      data-framer-name="Testimonials"
      style={{ backgroundColor: backdropBg }}
    >
      <motion.div className="testi-block" ref={blockRef} style={{ backgroundColor: backdropBg }}>
        <div className="testi-stage">
          <motion.div
            className="testi-stage-shell"
            aria-hidden
            style={{
              scale: stageScale,
              borderRadius: stageRadiusPx,
              boxShadow: stageShadow,
            }}
          />
          <div className="testi-head">
            <p className="testi-eyebrow">Owned, not rented</p>
            <h2 className="testi-title">
              Teams that stopped
              <br />
              paying rent on software
            </h2>
          </div>
          <div className="testi-stack">
            {TESTIMONIALS.map((item, index) => (
              <TestimonialCard
                key={item.name}
                data={item}
                index={index}
                total={TESTIMONIALS.length}
                progress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}
