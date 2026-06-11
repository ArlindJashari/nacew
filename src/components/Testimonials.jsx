import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SectionShell } from './primitives';
import './Testimonials.css';

const TESTIMONIALS = [
  {
    quote:
      'We killed four separate SaaS subscriptions and replaced them with one platform we actually own. The team stopped fighting tools and started shipping.',
    name: 'Marcus Reyne',
    role: 'COO, Halden Logistics',
    accent: '#cfe4ff',
    ink: '#0b2740',
    rotate: -4,
  },
  {
    quote:
      'Nacew mapped our whole approval flow in a week and built exactly what we described, with no per-seat fees, no feature paywalls. It just fits how we work.',
    name: 'Priya Anand',
    role: 'Head of Ops, Northbeam',
    accent: '#ffd76b',
    ink: '#3a2a00',
    rotate: 3,
  },
  {
    quote:
      'The dashboard reports our real KPIs, not some generic template. Onboarding new staff went from days to hours because the product speaks our language.',
    name: 'Tom Whitfield',
    role: 'Founder, Crateworks',
    accent: '#f6efe2',
    ink: '#33291a',
    rotate: -2,
  },
  {
    quote:
      'We own the code, the data, and the roadmap. Every month that used to be a license bill is now reinvested into features our customers actually ask for.',
    name: 'Sofia Marin',
    role: 'CEO, Lumera Studio',
    accent: '#ffc2dd',
    ink: '#451026',
    rotate: 4,
  },
];

function TestimonialCard({ data, index, total, progress }) {
  // Each card scales down slightly as the next one rises over it, building a
  // layered stack. Later cards target a smaller final scale.
  const targetScale = 1 - (total - 1 - index) * 0.05;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);

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
        <span className="testi-quote-mark" aria-hidden="true">
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

export default function Testimonials() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <SectionShell className="testi-section" data-framer-name="Testimonials" id="testimonials">
      <div className="testi-head">
        <p className="testi-eyebrow">Owned, not rented</p>
        <h2 className="testi-title">
          Teams that stopped
          <br />
          paying rent on software
        </h2>
      </div>

      <div className="testi-stack" ref={containerRef}>
        {TESTIMONIALS.map((data, index) => (
          <TestimonialCard
            key={data.name}
            data={data}
            index={index}
            total={TESTIMONIALS.length}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </SectionShell>
  );
}
