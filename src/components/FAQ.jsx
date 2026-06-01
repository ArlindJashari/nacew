import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { InlineIcon, Reveal, SectionShell } from './primitives';

const FAQ_CATEGORY_CONTENT = {
  General: [
    {
      question: 'What does Nacew do?',
      answer: 'Nacew designs and builds custom software for companies that want to replace expensive subscription tools with owned digital products. We work across UX/UI design, web development, mobile apps, dashboards, CRM systems, automations, and internal platforms.',
    },
    {
      question: 'Can you replace the tools we already pay for?',
      answer: 'Yes. We start by analyzing the tools your company currently uses, what features you actually need, and where your workflow feels limited. Then we design and build a custom alternative focused on your real business process.',
    },
    {
      question: 'Is this cheaper than paying for subscriptions?',
      answer: 'In many cases, yes over the long term. A subscription is a recurring cost that continues every month or year. A custom product requires an initial investment, but it becomes an asset your company owns and can expand over time.',
    },
    {
      question: 'Do we pay monthly or yearly fees?',
      answer: 'No. Unlike subscription software, Nacew builds software you fully own. You pay for the design and development of your custom platform, and after that, the code and application belong to you without ongoing license fees.',
    },
    {
      question: 'How do we get started?',
      answer: 'You can request a project estimate or book a free consultation. We will discuss the subscription systems you currently use, map your workflows, and outline a tailored roadmap to build your custom replacement.',
    },
  ],
  Services: [
    {
      question: 'Do you also provide UX/UI design?',
      answer: 'Yes. UX/UI design is a core part of our process. We plan the user experience, structure the interface, create high-quality visuals, and make sure the product feels simple, premium, and easy to use.',
    },
    {
      question: 'How long does a project take?',
      answer: 'Timelines depend on complexity. A focused internal tool or dashboard can take a few weeks, while a full web or mobile platform may take several months. After a discovery call, we provide a realistic timeline and project scope.',
    },
    {
      question: 'What technologies do you use?',
      answer: 'We build modern, secure, and scalable applications using industry-standard tools like React, Node.js, modern SQL databases, and secure cloud environments. We ensure the stack matches your long-term growth needs.',
    },
    {
      question: 'Can you build mobile apps for iOS and Android?',
      answer: 'Yes. We create native or cross-platform mobile experiences connected directly to your custom backend, database, and business workflows, tailored for your users and team.',
    },
    {
      question: 'Can you integrate with other third-party tools?',
      answer: 'Absolutely. We build custom API integrations to connect your new platform with external payment systems, shipping APIs, communication tools, and legacy systems you need to retain.',
    },
  ],
  'Ownership & Support': [
    {
      question: 'Do we own the final product?',
      answer: 'Yes. The goal is to give your company ownership and control over the product, brand experience, workflows, and roadmap. Specific ownership terms can be defined clearly before the project starts.',
    },
    {
      question: 'Can you maintain the software after launch?',
      answer: 'Yes. Nacew can provide ongoing support, improvements, bug fixes, security updates, hosting guidance, and new feature development after launch.',
    },
    {
      question: 'Where is our software hosted?',
      answer: 'We deploy your custom software directly to cloud infrastructure owned and controlled by your company (such as AWS, Google Cloud, or Vercel). We set up the hosting environment so your team is fully independent.',
    },
    {
      question: 'How is our data protected and secured?',
      answer: 'Since you fully own the database and server environments, you have complete control over your data. We implement standard security protocols, role-based access, and data encryption to keep your information secure.',
    },
    {
      question: 'What happens if we want to add features in the future?',
      answer: 'Because the software is completely modular and built with clean, modern code, you can easily expand it. You can work with Nacew to build new features, or hand the codebase over to internal developers at any time.',
    },
  ],
};

const categories = Object.keys(FAQ_CATEGORY_CONTENT);

const chipStyle = {
  '--1x5nw16': '4px 16px 4px 16px',
  '--border-bottom-width': '1px',
  '--border-color': 'var(--token-aecd04de-bd30-4743-90e2-2b56d3d58e1b, rgba(255, 255, 255, 0.1))',
  '--border-left-width': '1px',
  '--border-right-width': '1px',
  '--border-style': 'solid',
  '--border-top-width': '1px',
  backgroundColor: 'var(--token-aecd04de-bd30-4743-90e2-2b56d3d58e1b, rgba(255, 255, 255, 0.1))',
  borderBottomLeftRadius: 393,
  borderBottomRightRadius: 393,
  borderTopLeftRadius: 393,
  borderTopRightRadius: 393,
};

const chipDotStyle = {
  backgroundColor: 'var(--token-090acfc6-f7ee-4bf4-9b69-0b15cf2cb187, rgb(255, 243, 240))',
  willChange: 'transform',
  borderBottomLeftRadius: 215,
  borderBottomRightRadius: 215,
  borderTopLeftRadius: 215,
  borderTopRightRadius: 215,
  opacity: 1,
  transform: 'none',
};

const chipTextWrapStyle = {
  '--extracted-r6o4lv': 'var(--variable-reference-Dh_X3w3jZ-m54zGBZ4w)',
  '--variable-reference-Dh_X3w3jZ-m54zGBZ4w': 'var(--token-792af9ed-53d8-45b2-94fd-014e7edc8f44, rgba(255, 255, 255, 0.8))',
  transform: 'none',
};

const chipTextStyle = {
  '--framer-text-alignment': 'center',
  '--framer-text-color': 'var(--extracted-r6o4lv, var(--variable-reference-Dh_X3w3jZ-m54zGBZ4w))',
};

const activeTabStyle = {
  backgroundColor: 'var(--token-feab5ab7-d914-42dd-ad2d-73b5c8596806, rgb(7, 32, 54))',
  width: '100%',
  borderBottomLeftRadius: 609,
  borderBottomRightRadius: 609,
  borderTopLeftRadius: 609,
  borderTopRightRadius: 609,
};

const inactiveTabStyle = {
  backgroundColor: 'rgba(0, 0, 0, 0)',
  width: '100%',
  borderBottomLeftRadius: 609,
  borderBottomRightRadius: 609,
  borderTopLeftRadius: 609,
  borderTopRightRadius: 609,
};

const tabMaskStyle = {
  mask: 'linear-gradient(90deg, rgba(0,0,0,0) 0%, rgb(0, 0, 0) 50.49169398299905%, rgba(0, 0, 0, 0) 100%) add',
  WebkitMask: 'linear-gradient(90deg, rgba(0,0,0,0) 0%, rgb(0, 0, 0) 50.49169398299905%, rgba(0, 0, 0, 0) 100%) add',
  borderBottomLeftRadius: 2,
  borderBottomRightRadius: 2,
  borderTopLeftRadius: 2,
  borderTopRightRadius: 2,
};

const titleTextWrapStyle = {
  '--extracted-r6o4lv': 'var(--token-090acfc6-f7ee-4bf4-9b69-0b15cf2cb187, rgb(255, 243, 240))',
  transform: 'none',
};

const titleTextStyle = {
  '--framer-text-color': 'var(--extracted-r6o4lv, var(--token-090acfc6-f7ee-4bf4-9b69-0b15cf2cb187, rgb(255, 243, 240)))',
};

const buttonStyle = {
  '--border-bottom-width': '1px',
  '--border-color': 'var(--token-aecd04de-bd30-4743-90e2-2b56d3d58e1b, rgba(255, 255, 255, 0.1))',
  '--border-left-width': '1px',
  '--border-right-width': '1px',
  '--border-style': 'solid',
  '--border-top-width': '1px',
  backgroundColor: 'var(--token-feab5ab7-d914-42dd-ad2d-73b5c8596806, rgba(23, 23, 23, 0.85))',
  borderBottomLeftRadius: 768,
  borderBottomRightRadius: 768,
  borderTopLeftRadius: 768,
  borderTopRightRadius: 768,
};

const contactCardStyle = {
  '--8fbdi7': '36px',
  borderBottomLeftRadius: 24,
  borderBottomRightRadius: 24,
  borderTopLeftRadius: 24,
  borderTopRightRadius: 24,
};

const contactWrapStyle = {
  borderBottomLeftRadius: 24,
  borderBottomRightRadius: 24,
  borderTopLeftRadius: 24,
  borderTopRightRadius: 24,
};

function GlowFrame({
  className,
  style,
  radius,
  innerRadius,
  background,
  innerBackground,
  proximity = 300,
  glowColor = [255, 255, 255, 0.25],
}) {
  const ref = useRef(null);

  useEffect(() => {
    const frameElement = ref.current;
    const glowElement = frameElement?.querySelector('[data-glow="true"]');
    if (!frameElement || !glowElement) return undefined;

    const target = { x: 0, y: 0, opacity: 0, color: glowColor, proximity };
    const current = { x: 0, y: 0, opacity: 0, color: [...glowColor], proximity };
    const smoothing = 0.12;
    let frameId = null;
    let observer = null;

    const animate = () => {
      current.x += (target.x - current.x) * smoothing;
      current.y += (target.y - current.y) * smoothing;
      current.opacity += (target.opacity - current.opacity) * smoothing;
      current.proximity += (target.proximity - current.proximity) * smoothing;
      current.color = current.color.map((value, index) => value + (target.color[index] - value) * smoothing);

      const color = `rgba(${Math.round(current.color[0])},${Math.round(current.color[1])},${Math.round(current.color[2])},${current.color[3].toFixed(3)})`;
      glowElement.style.background = `radial-gradient(${current.proximity * 1.5}px circle at ${current.x}px ${current.y}px, ${color}, transparent)`;
      glowElement.style.opacity = String(current.opacity);
      frameId = window.requestAnimationFrame(animate);
    };

    const handleMouseMove = (event) => {
      const rect = frameElement.getBoundingClientRect();
      target.x = event.clientX - rect.left;
      target.y = event.clientY - rect.top;

      const inside = target.x >= 0 && target.x <= rect.width && target.y >= 0 && target.y <= rect.height;
      if (inside) {
        const edgeDistance = Math.min(target.x, target.y, rect.width - target.x, rect.height - target.y);
        target.opacity = Math.min(1, 1 - Math.max(0, edgeDistance - 1) / target.proximity);
        return;
      }

      const clampedX = Math.max(0, Math.min(target.x, rect.width));
      const clampedY = Math.max(0, Math.min(target.y, rect.height));
      const distance = Math.sqrt((target.x - clampedX) ** 2 + (target.y - clampedY) ** 2);
      target.opacity = Math.max(0, 1 - distance / target.proximity);
    };

    const start = () => {
      if (frameId !== null) return;
      glowElement.style.willChange = 'opacity, background';
      document.addEventListener('mousemove', handleMouseMove);
      frameId = window.requestAnimationFrame(animate);
    };

    const stop = () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
        frameId = null;
      }
      document.removeEventListener('mousemove', handleMouseMove);
      glowElement.style.willChange = 'auto';
    };

    observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) start();
      else stop();
    }, { threshold: 0 });

    observer.observe(frameElement);

    return () => {
      observer?.disconnect();
      stop();
    };
  }, [glowColor, proximity]);

  return (
    <div className={className} style={style}>
      <div
        ref={ref}
        style={{
          height: '100%',
          width: '100%',
          position: 'relative',
          borderRadius: radius,
          overflow: 'hidden',
          background,
        }}
      >
        <div data-glow="true" style={{ position: 'absolute', inset: 0, opacity: 0, pointerEvents: 'none' }} />
        <div
          style={{
            position: 'absolute',
            inset: 1,
            borderRadius: innerRadius,
            background: innerBackground,
            pointerEvents: 'none',
          }}
        />
      </div>
    </div>
  );
}

function Chip() {
  return (
    <Reveal className="framer-1i9wtqj-container" y={24}>
      <a className="framer-johFn framer-knjRQ framer-1uiucns framer-v-1uiucns framer-1dkgg6h" data-border="true" data-framer-name="Chip" style={chipStyle}>
        <div className="framer-10cfw4u" style={chipDotStyle} />
        <div className="framer-1n35c0f" style={{ mask: 'none', WebkitMask: 'none' }}>
          <div className="framer-r48zlf" data-framer-component-type="RichTextContainer" style={chipTextWrapStyle}>
            <p className="framer-text framer-styles-preset-1fhxhj6" data-styles-preset="O0790qsZT" dir="auto" style={chipTextStyle}>
              FAQ
            </p>
          </div>
        </div>
      </a>
    </Reveal>
  );
}

function FAQTab({ label, activeCategory, onSelect }) {
  const [hovered, setHovered] = useState(false);
  const active = activeCategory === label;

  return (
    <div className="framer-jewbuz-container">
      <motion.div
        className={`framer-X2hsG framer-gF1Dm framer-8x98wc ${active ? 'framer-v-yso0fx' : 'framer-v-1q876jk'}`}
        data-framer-name={active ? 'Active no Timer' : 'Inactive no Timer'}
        data-highlight="true"
        tabIndex={0}
        onClick={() => onSelect(label)}
        onMouseDown={(event) => event.preventDefault()}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        animate={{ backgroundColor: active ? 'rgba(23, 23, 23, 0.85)' : 'rgba(0, 0, 0, 0)' }}
        transition={{ duration: 0.35, ease: [0.44, 0, 0.56, 1] }}
        style={{ ...(active ? activeTabStyle : inactiveTabStyle), cursor: 'pointer', outline: 'none' }}
      >
        <GlowFrame
          className="framer-arwdi5-container"
          style={{ opacity: active ? 1 : 0, transition: 'opacity 0.35s cubic-bezier(.44,0,.56,1)' }}
          radius="66px"
          innerRadius="65px"
          background="var(--token-aecd04de-bd30-4743-90e2-2b56d3d58e1b, rgba(255, 255, 255, 0.05))"
          innerBackground="var(--token-feab5ab7-d914-42dd-ad2d-73b5c8596806, rgba(33, 33, 33, 0.85))"
          proximity={130}
          glowColor={[255, 255, 255, 0.65]}
        />
        <div className="framer-1wvl2qz" style={tabMaskStyle} />
        <motion.div
          className="framer-1hp9gbb"
          data-framer-component-type="RichTextContainer"
          animate={{
            '--extracted-r6o4lv': active
              ? 'var(--token-090acfc6-f7ee-4bf4-9b69-0b15cf2cb187, rgb(255, 243, 240))'
              : hovered
                ? 'rgba(255, 245, 243, 0.96)'
                : 'var(--token-792af9ed-53d8-45b2-94fd-014e7edc8f44, rgba(255, 255, 255, 0.8))',
          }}
          transition={{ duration: 0.35, ease: [0.44, 0, 0.56, 1] }}
          style={{
            '--extracted-r6o4lv': active
              ? 'var(--token-090acfc6-f7ee-4bf4-9b69-0b15cf2cb187, rgb(255, 243, 240))'
              : 'var(--token-792af9ed-53d8-45b2-94fd-014e7edc8f44, rgba(255, 255, 255, 0.8))',
            '--framer-link-text-color': 'rgb(0, 153, 255)',
            '--framer-link-text-decoration': 'underline',
            transform: 'none',
          }}
        >
          <p className="framer-text framer-styles-preset-prenqk" data-styles-preset="POYKcChXw" dir="auto" style={titleTextStyle}>
            {label}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

function FAQItem({ item, mobile = false }) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const closedClass = mobile ? 'framer-v-nog583' : 'framer-v-xb6pfv';
  const openClass = mobile ? 'framer-v-nxcia0' : '';

  return (
    <div className="framer-i74ldg-container">
      <motion.div
        className={`framer-wjWBF framer-gF1Dm framer-knjRQ framer-rr1zph ${open ? openClass : closedClass}`.trim()}
        data-framer-name={open ? 'Open' : mobile ? 'Mobile Closed' : 'Closed'}
        data-highlight="true"
        tabIndex={0}
        layout
        onClick={() => setOpen((value) => !value)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        transition={{ duration: 0.45, ease: [0.44, 0, 0.56, 1] }}
        style={{ width: '100%', cursor: 'pointer' }}
      >
        <GlowFrame
          className="framer-13yk504-container"
          radius="16px"
          innerRadius="15px"
          background="var(--token-aecd04de-bd30-4743-90e2-2b56d3d58e1b, rgba(255, 255, 255, 0.1))"
          innerBackground="var(--token-9a0a5818-786e-4389-a1ff-e52b77b8236e, rgba(23, 23, 23, 0.85))"
        />
        <motion.div
          className="framer-qvmngs"
          layout
          animate={{ padding: open ? (mobile ? '24px' : '36px') : (mobile ? '24px 24px 8px' : '36px 36px 20px') }}
          transition={{ duration: 0.45, ease: [0.44, 0, 0.56, 1] }}
          style={{ overflow: 'clip' }}
        >
          <div className="framer-1i84m8a">
            <div className="framer-1a1zngi" data-framer-name="Title" data-framer-component-type="RichTextContainer" style={titleTextWrapStyle}>
              <p className="framer-text framer-styles-preset-prenqk" data-styles-preset="POYKcChXw" dir="auto" style={titleTextStyle}>
                {item.question}
              </p>
            </div>
            <motion.div
              className="framer-1u8wmmr"
              data-border="true"
              data-framer-name="button 3.0"
              animate={{
                rotate: open ? 0 : 180,
                backgroundColor: hovered ? 'rgba(38, 38, 38, 0.85)' : 'rgba(23, 23, 23, 0.85)',
              }}
              transition={{ duration: 0.35, ease: [0.44, 0, 0.56, 1] }}
              style={buttonStyle}
            >
              <InlineIcon
                name="chevron"
                className="framer-DHhFf framer-1iatd71"
                role="presentation"
                style={{ '--1ww558a': 2, '--4rxgx6': 'var(--token-c6de8ea4-3684-4c2f-917e-fc3d1879d6b0, rgba(255, 255, 255, 0.65))' }}
              />
            </motion.div>
          </div>
          <motion.div
            className="framer-7w5b18"
            initial={false}
            animate={{ height: open ? 'auto' : 4, opacity: 1, padding: open ? '0px' : '4px 0px 0px' }}
            transition={{ duration: 0.45, ease: [0.44, 0, 0.56, 1] }}
            style={{ overflow: 'visible' }}
          >
            <motion.div
              className="framer-35jtnj"
              data-framer-name="Title"
              data-framer-component-type="RichTextContainer"
              initial={false}
              animate={{ opacity: open ? 1 : 0 }}
              transition={{ duration: open ? 0.32 : 0.18, ease: [0.44, 0, 0.56, 1] }}
              style={{ transform: 'none', overflow: 'clip' }}
            >
              <p className="framer-text framer-styles-preset-1fhxhj6" data-styles-preset="O0790qsZT" dir="auto" style={{ '--framer-text-alignment': 'left' }}>
                {item.answer}
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

function ContactCard() {
  return (
    <div className="framer-gqetwg" style={contactCardStyle}>
      <GlowFrame
        className="framer-wu5crx-container"
        radius="24px"
        innerRadius="23px"
        background="var(--token-ef8ecd6d-5204-4f29-b3b7-2d4dc011513a, rgb(0, 0, 0))"
        innerBackground="var(--token-ef8ecd6d-5204-4f29-b3b7-2d4dc011513a, rgb(0, 0, 0))"
      />
      <GlowFrame
        className="framer-vdazwh-container"
        radius="16px"
        innerRadius="15px"
        background="var(--token-aecd04de-bd30-4743-90e2-2b56d3d58e1b, rgba(255, 255, 255, 0.1))"
        innerBackground="var(--token-9a0a5818-786e-4389-a1ff-e52b77b8236e, rgba(23, 23, 23, 0.85))"
      />
      <div className="framer-dro761" style={contactWrapStyle}>
        <Reveal className="framer-c0tgl7" data-framer-component-type="RichTextContainer" y={24} style={{
          '--extracted-1w1cjl5': 'var(--token-090acfc6-f7ee-4bf4-9b69-0b15cf2cb187, rgb(255, 243, 240))',
          '--framer-link-text-color': 'rgb(0, 153, 255)',
          '--framer-link-text-decoration': 'underline',
        }}>
          <h6 className="framer-text framer-styles-preset-b70r5p" data-styles-preset="Q_3jdt9X6" dir="auto" style={{
            '--framer-text-alignment': 'left',
            '--framer-text-color': 'var(--extracted-1w1cjl5, var(--token-090acfc6-f7ee-4bf4-9b69-0b15cf2cb187, rgb(255, 243, 240)))',
          }}>
            <strong className="framer-text">Got Questions?</strong>
          </h6>
        </Reveal>
        <Reveal className="framer-drasqr" data-framer-component-type="RichTextContainer" y={24} style={{
          '--framer-link-text-color': 'rgb(0, 153, 255)',
          '--framer-link-text-decoration': 'underline',
        }}>
          <p className="framer-text framer-styles-preset-1fhxhj6" data-styles-preset="O0790qsZT" dir="auto" style={{ '--framer-text-alignment': 'left' }}>
            Can't find what you're looking for? Reach out — we're fast.
          </p>
        </Reveal>
      </div>
      <Reveal className="framer-1spxr07" data-framer-component-type="RichTextContainer" y={24}>
        <p className="framer-text framer-styles-preset-1fhxhj6" data-styles-preset="O0790qsZT" dir="auto">
          <a className="framer-text framer-styles-preset-v2iiak" data-styles-preset="Bh7brll6H" href="mailto:contact@nacew.com" rel="noopener">
            Email us →
          </a>
        </p>
      </Reveal>
    </div>
  );
}

function FAQPanel({ variantClassName, panelClassName, mobile = false, activeCategory, onSelect }) {
  const items = FAQ_CATEGORY_CONTENT[activeCategory];

  return (
    <div className={variantClassName}>
      <div className="framer-7f98g-container">
        <div className={panelClassName} data-framer-name={mobile ? 'Mobile' : 'Desktop'}>
          <div className="framer-l3qcw1">
            <div className="framer-12xmfwf">
              <div className="framer-12gfigy">
                <GlowFrame
                  className="framer-13qvw2d-container"
                  radius="24px"
                  innerRadius="23px"
                  background="var(--token-ef8ecd6d-5204-4f29-b3b7-2d4dc011513a, rgb(0, 0, 0))"
                  innerBackground="var(--token-ef8ecd6d-5204-4f29-b3b7-2d4dc011513a, rgb(0, 0, 0))"
                />
                <div className="framer-17oc5ke">
                  {categories.map((category) => (
                    <FAQTab key={category} label={category} activeCategory={activeCategory} onSelect={onSelect} />
                  ))}
                </div>
              </div>
            </div>
            <ContactCard />
          </div>
          <div className="framer-2jfjwj">
            {items.map((item) => (
              <FAQItem key={`${activeCategory}-${item.question}`} item={item} mobile={mobile} />
            ))}
            <GlowFrame
              className="framer-1uegbsk-container"
              radius="24px"
              innerRadius="23px"
              background="var(--token-ef8ecd6d-5204-4f29-b3b7-2d4dc011513a, rgb(0, 0, 0))"
              innerBackground="var(--token-ef8ecd6d-5204-4f29-b3b7-2d4dc011513a, rgb(0, 0, 0))"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState('General');

  return (
    <SectionShell as="section" className="framer-1hob6cd" data-framer-name="FAQ">
      <div className="framer-5qsqx6" data-framer-name="content">
        <div className="framer-1tcq7j">
          <div className="framer-1v5m0w5">
            <div className="ssr-variant">
              <Chip />
            </div>
            <Reveal className="framer-1c4l10g" data-framer-component-type="RichTextContainer" y={24}>
              <h2 className="framer-text framer-styles-preset-fahce0" data-styles-preset="nZtZfLTSW" dir="auto" style={{ '--framer-text-alignment': 'left' }}>
                Answers to the questions that come up most.
              </h2>
            </Reveal>
          </div>
          <div className="framer-10kqkh7">
            <Reveal className="framer-v2q88p" data-framer-component-type="RichTextContainer" y={24}>
              <p className="framer-text framer-styles-preset-prenqk" data-styles-preset="POYKcChXw" dir="auto">
                Learn how Nacew works, what is included in our services, and what to expect during design and development.
              </p>
            </Reveal>
          </div>
        </div>
        <FAQPanel
          variantClassName="ssr-variant hidden-3job37 hidden-nzvz5l"
          panelClassName="framer-gzMaU framer-oaAu6 framer-knjRQ framer-KVnNX framer-qctedc framer-v-qctedc"
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
        />
        <FAQPanel
          variantClassName="ssr-variant hidden-kj696b hidden-nzvz5l"
          panelClassName="framer-gzMaU framer-oaAu6 framer-knjRQ framer-KVnNX framer-qctedc framer-v-qctedc"
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
        />
        <FAQPanel
          variantClassName="ssr-variant hidden-3job37 hidden-kj696b"
          panelClassName="framer-gzMaU framer-oaAu6 framer-knjRQ framer-KVnNX framer-qctedc framer-v-1lqhq2m"
          mobile
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
        />
      </div>
    </SectionShell>
  );
}
