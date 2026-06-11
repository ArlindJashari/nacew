import { useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import './AboutUs.css';

const CONTACT_URL = 'mailto:yes@nacew.com';
const TALENT_URL = 'https://www.nacew.com/people-and-careers';
const CASE_STUDY_URL = 'https://www.nacew.com/media/57';
const EASE = [0.16, 1, 0.3, 1];

const navGroups = [
  {
    title: 'Product',
    links: [
      ['Platforms', '/#why-nacew'],
      ['Internal tools', '/#what-you-get'],
    ],
  },
  {
    title: 'Resources',
    links: [
      ['Media', 'https://www.nacew.com/media-and-activities'],
      ['Talent Hub', TALENT_URL],
    ],
  },
  {
    title: 'About',
    links: [
      ['Company', '/about'],
      ['Contact', CONTACT_URL],
    ],
  },
];

const proofCards = [
  {
    text: 'Working for Nacew means we work for ourselves. We have the freedom to be creative, take ownership of our work, and push the boundaries of what is possible.',
    name: 'People & Careers',
    role: 'Nacew',
  },
  {
    text: 'Nacew helped redesign a product serving more than 17 million active users, collaborating closely on a groundbreaking all-in-one public superapp.',
    name: '17m+ active users',
    role: 'Media case study',
  },
  {
    text: 'We believe in creating the best work, and being the best to work with.',
    name: 'Meet our team',
    role: 'Nacew',
  },
];

const teamMembers = [
  {
    name: 'Suejla Mulaku',
    role: 'Graphics Specialist',
    image: 'https://admin.nacew.com/back/img/team-members/15-126%202.webp',
    bio: 'Shapes visual systems, campaign assets, and product details that make digital experiences clearer and more memorable.',
  },
  {
    name: 'Shpend Shabani',
    role: 'Full Stack Developer',
    image: 'https://admin.nacew.com/back/img/team-members/11-114.webp',
    bio: 'Builds production-ready platforms across front end, back end, integrations, and the workflows behind custom tools.',
  },
  {
    name: 'Isa Kadriu',
    role: 'Motion Specialist',
    image: 'https://admin.nacew.com/back/img/team-members/30-127%201.webp',
    bio: 'Adds motion, interaction rhythm, and expressive details so products feel polished without losing function.',
  },
  {
    name: 'Nërënxa Deda',
    role: 'Design Specialist',
    image: 'https://admin.nacew.com/back/img/team-members/24-128%201.webp',
    bio: 'Designs product flows, interfaces, and components with focus on usability, accessibility, and consistency.',
  },
  {
    name: 'Ibrahim Fejzullahu',
    role: 'Graphics Specialist',
    image: 'https://admin.nacew.com/back/img/team-members/16-129%201.webp',
    bio: 'Crafts brand-level visuals, layouts, and graphic systems that support stronger digital product storytelling.',
  },
  {
    name: 'Donjeta Troni',
    role: 'Graphics & Motion Specialist',
    image: 'https://admin.nacew.com/back/img/team-members/19-125%202.webp',
    bio: 'Connects graphics and motion to help product and brand moments feel precise, energetic, and cohesive.',
  },
  {
    name: 'Fatlum Zeka',
    role: 'Design Specialist',
    image: 'https://admin.nacew.com/back/img/team-members/35-112.webp',
    bio: 'Turns research, feedback, and product needs into practical UI systems and focused user journeys.',
  },
  {
    name: 'Ilir Sahiti',
    role: 'Design Specialist',
    image: 'https://admin.nacew.com/back/img/team-members/28-124%201.webp',
    bio: 'Works across product screens, design standards, and collaboration loops that keep delivery aligned.',
  },
  {
    name: 'Endrit Isufi',
    role: 'Design Specialist',
    image: 'https://admin.nacew.com/back/img/team-members/21-117%201.webp',
    bio: 'Builds interface concepts, prototypes, and final product details shaped around real user needs.',
  },
];

function AboutButton({ href, children, variant = 'ghost' }) {
  const external = href.startsWith('http');

  return (
    <a
      className={`dist-button dist-button--${variant}`}
      href={href}
      rel={external ? 'noopener noreferrer' : undefined}
      target={external ? '_blank' : undefined}
    >
      <span>{children}</span>
    </a>
  );
}

function LogoMark() {
  return (
    <a className="dist-logo" href="/" aria-label="Nacew home">
      <span>[</span>
      <img src="/logo.svg" alt="Nacew" />
      <span>]</span>
    </a>
  );
}

function GridGlyph({ active }) {
  const reducedMotion = useReducedMotion();

  return (
    <div className="dist-glyph" aria-hidden="true">
      <motion.span
        className="dist-glyph__cube"
        animate={reducedMotion ? undefined : { rotate: 45 + active * 90, scale: [1, 0.92, 1] }}
        transition={{ duration: 0.7, ease: EASE }}
      />
      <span className="dist-glyph__label">[WE CAN]</span>
    </div>
  );
}

function Reveal({ children, className = '', delay = 0, y = 44, once = true }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={`dist-reveal ${className}`}
      initial={reducedMotion ? false : { opacity: 0, y }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.24 }}
      transition={{ duration: 0.85, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function ScrollWord({ children, progress, index, total }) {
  const start = Math.min(0.84, index / total);
  const opacity = useTransform(progress, [start, Math.min(1, start + 0.18)], [0.18, 1]);
  const y = useTransform(progress, [start, Math.min(1, start + 0.18)], [12, 0]);

  return (
    <motion.span className="dist-scroll-word" style={{ opacity, y }}>
      {children}{' '}
    </motion.span>
  );
}

function ScrollWords({ text }) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();
  const words = text.split(' ');
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.88', 'end 0.4'],
  });

  if (reducedMotion) {
    return <h2 ref={ref}>{text}</h2>;
  }

  return (
    <h2 ref={ref}>
      {words.map((word, index) => (
        <ScrollWord key={`${word}-${index}`} progress={scrollYProgress} index={index} total={words.length}>
          {word}
        </ScrollWord>
      ))}
    </h2>
  );
}

function TeamCard({ member, index }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.article
      className="dist-team-card"
      initial={reducedMotion ? false : { opacity: 0, y: 54 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.72, delay: (index % 3) * 0.08, ease: EASE }}
    >
      <div className="dist-team-card__identity">
        <img src={member.image} alt={member.name} loading="lazy" />
        <div className="dist-team-card__top">
          <div>
            <h3>{member.name}</h3>
            <span>{member.role}</span>
            <span className="dist-in" aria-hidden="true">in</span>
          </div>
        </div>
      </div>
      <p>{member.bio}</p>
    </motion.article>
  );
}

export default function AboutUs() {
  const [activeProof, setActiveProof] = useState(0);
  const missionRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress: missionProgress } = useScroll({
    target: missionRef,
    offset: ['start end', 'end start'],
  });
  const shapeTopY = useTransform(missionProgress, [0, 1], [-36, 70]);
  const shapeSideY = useTransform(missionProgress, [0, 1], [70, -46]);
  const shapeBottomY = useTransform(missionProgress, [0, 1], [48, -24]);

  const changeProof = (direction) => {
    setActiveProof((current) => (current + direction + proofCards.length) % proofCards.length);
  };

  return (
    <main className="dist-about">
      <section className="dist-shell dist-hero" aria-labelledby="about-title">
        <motion.h1
          id="about-title"
          initial={reducedMotion ? false : { opacity: 0, y: 56, clipPath: 'inset(0 0 100% 0)' }}
          animate={reducedMotion ? undefined : { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
          transition={{ duration: 1.15, delay: 0.12, ease: EASE }}
        >
          We make things work, look and feel better.
        </motion.h1>
      </section>

      <section ref={missionRef} className="dist-shell dist-mission" aria-label="Nacew mission">
        <motion.div className="dist-shape dist-shape--magenta" style={{ y: reducedMotion ? 0 : shapeTopY }} aria-hidden="true" />
        <motion.div className="dist-shape dist-shape--red" style={{ y: reducedMotion ? 0 : shapeSideY }} aria-hidden="true" />
        <motion.div className="dist-shape dist-shape--yellow" style={{ y: reducedMotion ? 0 : shapeBottomY }} aria-hidden="true" />
        <ScrollWords text="At the core of our mission lies a belief in the transformative power of design. We create digital experiences that look great and make a positive impact on people's lives." />
      </section>

      <section className="dist-shell dist-proof" aria-labelledby="proof-title">
        <Reveal className="dist-section-head">
          <h2 id="proof-title">Testimonials</h2>
          <div className="dist-arrow-row">
            <button type="button" aria-label="Previous testimonial" onClick={() => changeProof(-1)}>
              <ArrowLeft size={18} />
            </button>
            <button type="button" aria-label="Next testimonial" onClick={() => changeProof(1)}>
              <ArrowRight size={18} />
            </button>
          </div>
        </Reveal>

        <Reveal className="dist-proof__viewport" delay={0.08}>
          <div className="dist-proof__grid">
            <GridGlyph active={activeProof} />
            <div className="dist-proof-card">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  className="dist-proof-card__inner"
                  key={proofCards[activeProof].name}
                  initial={reducedMotion ? false : { opacity: 0, x: 48 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reducedMotion ? undefined : { opacity: 0, x: -38 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <span className="dist-quote-mark" aria-hidden="true">&ldquo;</span>
                  <p>{proofCards[activeProof].text}</p>
                  <div>
                    <strong>{proofCards[activeProof].name}</strong>
                    <span>{proofCards[activeProof].role}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="dist-shell dist-opportunity" aria-labelledby="opportunity-title">
        <Reveal>
          <h2 id="opportunity-title">This is why Nacew exists</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div>
            <p>
              Nacew helps teams replace disconnected apps and generic templates with digital products shaped around their
              brand, users, data, processes, and roadmap.
            </p>
            <p>
              Our team brings UI/UX, design systems, research, motion, front-end development, and custom platform delivery
              together so your product can evolve with confidence after launch.
            </p>
            <p>
              We have worked on high-scale digital experiences, including a redesign for a product serving more than 17
              million active users.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="dist-shell dist-team" aria-labelledby="team-title">
        <Reveal>
          <h2 id="team-title">Team: Built to design, develop, support, and evolve your product</h2>
        </Reveal>

        <div className="dist-team__grid">
          {teamMembers.map((member, index) => (
            <TeamCard member={member} index={index} key={member.name} />
          ))}
        </div>
      </section>

      <section className="dist-shell dist-passion" aria-labelledby="passion-title">
        <Reveal>
          <h2 id="passion-title">We have a passionate team</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div>
            <p>
              We are building a community of like-minded individuals who are passionate about creating digital experiences
              that make a positive impact on people's lives.
            </p>
            <p>
              Working for ourselves means we have the freedom to explore our creativity, take ownership of our work, and
              drive our own success while supporting each other.
            </p>
            <AboutButton href={TALENT_URL} variant="primary">Join and Thrive</AboutButton>
          </div>
        </Reveal>
      </section>

      <motion.footer
        className="dist-shell dist-footer"
        initial={reducedMotion ? false : { opacity: 0, y: 60 }}
        whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.9, ease: EASE }}
      >
        <div className="dist-footer__brand">
          <LogoMark />
          <p>
            Discover the power of "WE CAN" by unraveling the name Nacew. It is our hidden message and driving force.
          </p>
        </div>

        <div className="dist-footer__cols">
          {navGroups.map((group) => (
            <div className="dist-footer__col" key={group.title}>
              <h3>{group.title}</h3>
              {group.links.map(([label, href]) => {
                const external = href.startsWith('http');
                return (
                  <a key={label} href={href} rel={external ? 'noopener noreferrer' : undefined} target={external ? '_blank' : undefined}>
                    {label}
                  </a>
                );
              })}
            </div>
          ))}
          <div className="dist-footer__col">
            <h3>Inquiries</h3>
            <a href="tel:+38344562184">+383 44 562 184</a>
            <a href={CONTACT_URL}>yes@nacew.com</a>
            <span>Idriz Seferi 17, 60000 Gjilan, Republic of Kosova</span>
          </div>
        </div>

        <div className="dist-footer__bottom">
          <span>Copyright ©2026 Nacew</span>
          <a href="/privacy">Privacy Policy</a>
          <a href={CASE_STUDY_URL} target="_blank" rel="noopener noreferrer">Case Study</a>
        </div>
      </motion.footer>
    </main>
  );
}
