// Framer-DOM node replacers: components the parser swaps in for specific
// Framer nodes, plus their glow / svg / FAQ / hero helpers and data constants
// (extracted verbatim from FramerMotionHTMLParser.jsx — logic unchanged).
/* eslint-disable react-refresh/only-export-components */
import { useEffect, useRef, useState, useContext } from 'react';
import { domToReact } from 'html-react-parser';
import { motion } from 'framer-motion';
import { cleanProps, getNodeText } from './props';
import ParallaxElement from '../components/primitives/ParallaxLayer';
import { CrmMockup, InternalToolsMockup, AppsMockup, AutomationsMockup } from '../components/Mockups';
import { HeroTabContext } from '../components/HeroTabContext';
import FallingText from '../components/FallingText';

function renderNacewNavLogo(domNode) {
  const props = cleanProps(domNode.attribs);
  const style = props.style || {};

  return (
    <div
      {...props}
      aria-label="Nacew"
      style={{
        ...style,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0px',
        width: '72px',
        minWidth: '72px',
        height: '24px',
        color: 'rgb(255, 255, 255)',
        backgroundImage: 'none',
        backgroundSize: 'contain',
        flexShrink: 0,
      }}
    >
      <img
        src="/logo.svg"
        alt="Nacew logo"
        width="72"
        height="24"
        style={{ display: 'block', flex: '0 0 auto', width: 72, height: 24, objectFit: 'contain' }}
      />
    </div>
  );
}

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

function getFAQItemIndex(question) {
  return FAQ_CATEGORY_CONTENT.General.findIndex((item) => item.question === question);
}

const HERO_LAYER_ASSETS = {
  far: {
    src: '/hero/fora-layer-far.png?v=11',
    widths: [512, 1024, 2048, 2464],
  },
  mid: {
    src: '/hero/fora-layer-mid.png?v=11',
    widths: [512, 1024, 2048, 2464],
  },
  foreground: {
    src: '/hero/edited-photo (1).png',
    widths: [],
  },
  footer: {
    src: '/hero/edited-photo%20%281%29.png?v=12',
    widths: [512, 1024, 1600],
  },
};

function getHeroLayerAsset(attribs = {}) {
  const { alt, width, height } = attribs;

  if (alt === 'Transparent image of grass hills' && width === '2464' && height === '909') {
    return HERO_LAYER_ASSETS.far;
  }

  if (alt === 'Transparent image of grass hills' && width === '2464' && height === '848') {
    return HERO_LAYER_ASSETS.mid;
  }

  if (alt === 'Transparent image of grass hills' && width === '2464' && height === '488') {
    return HERO_LAYER_ASSETS.foreground;
  }

  if (alt === 'Transparent image of sand dunes' && width === '1600' && height === '349') {
    return HERO_LAYER_ASSETS.footer;
  }

  return null;
}

function applyHeroLayerAsset(props, asset) {
  props.src = asset.src;
  if (asset.widths && asset.widths.length > 0) {
    props.srcSet = asset.widths.map((width) => `${asset.src} ${width}w`).join(',');
  } else {
    delete props.srcSet;
  }
  delete props.srcset;
  return props;
}

function HeroBottomTreesLayer({ domNode }) {
  const props = cleanProps(domNode.attribs);
  const context = useContext(HeroTabContext);
  const activeTab = context ? context.activeTab : 0;

  if (props.style) {
    props.style = { ...props.style };
    delete props.style.opacity;
    delete props.style.transform;
    delete props.style.willChange;
  }

  const isLightBlue = false;
  const isGreen = activeTab === 2 || activeTab === 3;
  const isBlue = activeTab === 0;
  const isRed = activeTab === 1;

  return (
    <motion.div
      {...props}
      style={{
        ...props.style,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: -1,
        height: 'clamp(520px, 48vw, 900px)',
        zIndex: 8,
        opacity: 1,
        overflow: 'visible',
        pointerEvents: 'none',
        willChange: 'transform',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: '50%',
          bottom: 0,
          width: '100vw',
          minWidth: '100%',
          transform: 'translateX(-50%)',
          display: 'block',
        }}
      >
        <img
          decoding="async"
          loading="lazy"
          src="/hero/trees/x/light_blue.png"
          alt=""
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            transition: 'opacity 0.6s ease-in-out',
            opacity: isLightBlue ? 1 : 0,
          }}
        />
        <img
          decoding="async"
          loading="lazy"
          src="/hero/trees/x/green.png"
          alt=""
          style={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            width: '100%',
            height: 'auto',
            display: 'block',
            transition: 'opacity 0.6s ease-in-out',
            opacity: isGreen ? 1 : 0,
          }}
        />
        <img
          decoding="async"
          loading="lazy"
          src="/hero/trees/x/blue.png"
          alt=""
          style={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            width: '100%',
            height: 'auto',
            display: 'block',
            transition: 'opacity 0.6s ease-in-out',
            opacity: isBlue ? 1 : 0,
          }}
        />
        <img
          decoding="async"
          loading="lazy"
          src="/hero/trees/x/red.png"
          alt=""
          style={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            width: '100%',
            height: 'auto',
            display: 'block',
            transition: 'opacity 0.6s ease-in-out',
            opacity: isRed ? 1 : 0,
          }}
        />
      </div>
    </motion.div>
  );
}

function HeroForegroundTreesLayer({ domNode }) {
  const props = cleanProps(domNode.attribs);
  const context = useContext(HeroTabContext);
  const activeTab = context ? context.activeTab : 0;

  if (props.style) {
    props.style = { ...props.style };
    delete props.style.opacity;
    delete props.style.transform;
    delete props.style.willChange;
  }

  const isLightBlue = false;
  const isGreen = activeTab === 2 || activeTab === 3;
  const isBlue = activeTab === 0;
  const isRed = activeTab === 1;

  return (
    <ParallaxElement
      factor={0.08}
      {...props}
      style={{
        ...props.style,
        position: 'absolute',
        left: 0,
        right: 'auto',
        bottom: -1,
        width: '100vw',
        maxWidth: 'none',
        aspectRatio: 'auto',
        height: 'clamp(360px, 42vw, 820px)',
        zIndex: 6,
        opacity: 1,
        overflow: 'visible',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: '50vw',
          bottom: 0,
          width: 'max(100vw, 960px)',
          transform: 'translateX(-50%)',
        }}
      >
        <img
          decoding="async"
          loading="eager"
          src="/hero/trees/x/light_blue.png"
          alt=""
          style={{
            display: 'block',
            width: '100%',
            height: 'auto',
            objectFit: 'contain',
            objectPosition: 'center bottom',
            transition: 'opacity 0.6s ease-in-out',
            opacity: isLightBlue ? 1 : 0,
          }}
        />
        <img
          decoding="async"
          loading="eager"
          src="/hero/trees/x/green.png"
          alt=""
          style={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            display: 'block',
            width: '100%',
            height: 'auto',
            objectFit: 'contain',
            objectPosition: 'center bottom',
            transition: 'opacity 0.6s ease-in-out',
            opacity: isGreen ? 1 : 0,
          }}
        />
        <img
          decoding="async"
          loading="eager"
          src="/hero/trees/x/blue.png"
          alt=""
          style={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            display: 'block',
            width: '100%',
            height: 'auto',
            objectFit: 'contain',
            objectPosition: 'center bottom',
            transition: 'opacity 0.6s ease-in-out',
            opacity: isBlue ? 1 : 0,
          }}
        />
        <img
          decoding="async"
          loading="eager"
          src="/hero/trees/x/red.png"
          alt=""
          style={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            display: 'block',
            width: '100%',
            height: 'auto',
            objectFit: 'contain',
            objectPosition: 'center bottom',
            transition: 'opacity 0.6s ease-in-out',
            opacity: isRed ? 1 : 0,
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: -1,
            height: '46%',
            background:
              'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.35) 52%, rgba(0,0,0,1) 100%)',
            zIndex: 10,
          }}
        />
      </div>
    </ParallaxElement>
  );
}

function InteractiveFAQItem({ domNode, replaceNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [activeCategory, setActiveCategory] = useState('General');

  const props = cleanProps(domNode.attribs || {});
  const itemText = getNodeText(domNode);
  const originalQuestion = FAQ_CATEGORY_CONTENT.General.find((item) => itemText.includes(item.question))?.question || '';
  const itemIndex = getFAQItemIndex(originalQuestion);
  const activeContent = FAQ_CATEGORY_CONTENT[activeCategory]?.[itemIndex] || FAQ_CATEGORY_CONTENT.General[itemIndex] || {
    question: originalQuestion,
    answer: '',
  };
  const baseClassName = props.className || '';
  const isMobileClosedVariant = baseClassName.includes('framer-v-nog583');
  const openClassName = baseClassName
    .replace(' framer-v-xb6pfv', '')
    .replace(' framer-v-nog583', ' framer-v-nxcia0');
  const className = isOpen ? openClassName : baseClassName;

  useEffect(() => {
    const handler = (event) => {
      setActiveCategory(event.detail || 'General');
      setIsOpen(false);
    };

    window.addEventListener('nacew-faq-tab-select', handler);
    return () => window.removeEventListener('nacew-faq-tab-select', handler);
  }, []);

  const modifiedOptions = {
    replace: (childNode) => {
      if (!childNode.attribs) return;
      const childClassName = childNode.attribs.class || '';

      if (childNode.name === 'svg' && hasSvgUseReference(childNode, '1858150576')) {
        return <ChevronIconSvg domNode={childNode} />;
      }

      if (
        childClassName.includes('framer-13yk504-container') ||
        childClassName.includes('framer-vdazwh-container') ||
        childClassName.includes('framer-wu5crx-container') ||
        childClassName.includes('framer-1uegbsk-container')
      ) {
        return (
          <GlowRuntime
            domNode={childNode}
            options={modifiedOptions}
            proximity={getGlowProximity(childNode)}
            glowColor={getGlowColor(findDataGlowNode(childNode))}
          />
        );
      }

      if (childClassName.includes('framer-qvmngs')) {
        const childProps = cleanProps(childNode.attribs);
        if (childProps.style) {
          delete childProps.style.opacity;
          delete childProps.style.transform;
          delete childProps.style.willChange;
        }

        return (
          <motion.div
            layout
            transition={{ duration: 0.45, ease: [0.44, 0, 0.56, 1] }}
            animate={{
              padding: isOpen
                ? (isMobileClosedVariant ? '24px' : '36px')
                : (isMobileClosedVariant ? '24px 24px 8px' : '36px 36px 20px'),
            }}
            {...childProps}
            style={{ ...childProps.style, overflow: 'clip' }}
          >
            {domToReact(childNode.children, modifiedOptions)}
          </motion.div>
        );
      }

      if (childClassName.includes('framer-1a1zngi')) {
        const childProps = cleanProps(childNode.attribs);
        const paragraphNode = childNode.children?.find((node) => node.name === 'p');
        const paragraphProps = cleanProps(paragraphNode?.attribs || {});
        return (
          <div {...childProps} style={{ ...childProps.style, opacity: 1, transform: 'none' }}>
            <p {...paragraphProps}>
              {activeContent.question}
            </p>
          </div>
        );
      }

      // The answer wrapper
      if (childClassName.includes('framer-7w5b18')) {
        const childProps = cleanProps(childNode.attribs);
        if (childProps.style) {
          delete childProps.style.opacity;
          delete childProps.style.transform;
          delete childProps.style.willChange;
        }
        return (
          <motion.div
            initial={false}
            animate={{
              height: isOpen ? 'auto' : 4,
              opacity: 1,
              padding: isOpen ? '0px' : '4px 0px 0px',
            }}
            transition={{ duration: 0.45, ease: [0.44, 0, 0.56, 1] }}
            style={{ ...childProps.style, overflow: 'visible' }}
            {...childProps}
          >
            {domToReact(childNode.children, modifiedOptions)}
          </motion.div>
        );
      }

      if (childClassName.includes('framer-35jtnj')) {
        const childProps = cleanProps(childNode.attribs);
        const paragraphNode = childNode.children?.find((node) => node.name === 'p');
        const paragraphProps = cleanProps(paragraphNode?.attribs || {});
        if (childProps.style) {
          delete childProps.style.opacity;
          delete childProps.style.transform;
          delete childProps.style.willChange;
        }

        return (
          <motion.div
            initial={false}
            animate={{ opacity: isOpen ? 1 : 0 }}
            transition={{ duration: isOpen ? 0.32 : 0.18, ease: [0.44, 0, 0.56, 1] }}
            {...childProps}
            style={{ ...childProps.style, overflow: 'clip' }}
          >
            <p {...paragraphProps}>
              {activeContent.answer}
            </p>
          </motion.div>
        );
      }

      // The chevron icon wrapper
      if (childNode.attribs['data-framer-name'] === 'button 3.0') {
        const childProps = cleanProps(childNode.attribs);
        if (childProps.style) {
          delete childProps.style.transform;
          delete childProps.style.willChange;
        }

        return (
          <motion.div
            initial={false}
            animate={{
              rotate: isOpen ? 0 : 180,
              backgroundColor: isHovered
                ? 'rgba(38, 38, 38, 0.85)'
                : 'rgba(23, 23, 23, 0.85)',
            }}
            transition={{ duration: 0.35, ease: [0.44, 0, 0.56, 1] }}
            {...childProps}
          >
            {domToReact(childNode.children, {
              replace: (cNode) => replaceNode(cNode, true)
            })}
          </motion.div>
        );
      }

      // Delegate to the main replace function with isInsideFAQ = true
      return replaceNode(childNode, true);
    }
  };

  return (
    <motion.div
      {...props}
      className={className}
      data-framer-name={isOpen ? 'Open' : 'Closed'}
      layout
      onClick={() => setIsOpen(!isOpen)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      transition={{ duration: 0.45, ease: [0.44, 0, 0.56, 1] }}
      style={{ ...props.style, cursor: 'pointer' }}
    >
      {domToReact(domNode.children, modifiedOptions)}
    </motion.div>
  );
}

function FAQCategoryTab({ domNode, replaceNode }) {
  const [isHovered, setIsHovered] = useState(false);
  const label = getNodeText(domNode).trim();
  const props = cleanProps(domNode.attribs || {});
  const className = props.className || '';
  const initiallyActive = className.includes('framer-v-yso0fx');
  const [isSelected, setIsSelected] = useState(initiallyActive);
  const isActive = isSelected;

  useEffect(() => {
    const handler = (event) => {
      setIsSelected(event.detail === label);
    };

    window.addEventListener('nacew-faq-tab-select', handler);
    return () => window.removeEventListener('nacew-faq-tab-select', handler);
  }, [label]);

  const options = {
    replace: (childNode) => {
      if (!childNode.attribs) return;
      const childClassName = childNode.attribs.class || '';

      if (childClassName.includes('framer-1hp9gbb')) {
        const childProps = cleanProps(childNode.attribs);
        return (
          <motion.div
            {...childProps}
            animate={{
              '--extracted-r6o4lv': isActive
                ? 'var(--token-090acfc6-f7ee-4bf4-9b69-0b15cf2cb187, rgb(255, 243, 240))'
                : isHovered
                  ? 'rgba(255, 245, 243, 0.96)'
                  : 'var(--token-792af9ed-53d8-45b2-94fd-014e7edc8f44, rgba(255, 255, 255, 0.8))',
            }}
            transition={{ duration: 0.35, ease: [0.44, 0, 0.56, 1] }}
            style={{ ...childProps.style, opacity: 1 }}
          >
            {domToReact(childNode.children, options)}
          </motion.div>
        );
      }

      if (childClassName.includes('framer-arwdi5-container')) {
        return (
          <GlowRuntime
            domNode={childNode}
            options={options}
            proximity={130}
            glowColor={[255, 255, 255, 0.65]}
            styleOverride={{
              opacity: isActive ? 1 : 0,
              transition: 'opacity 0.35s cubic-bezier(.44,0,.56,1)',
            }}
          />
        );
      }

      return replaceNode(childNode, false);
    }
  };

  return (
    <motion.div
      {...props}
      data-framer-name={isActive ? 'Active no Timer' : 'Inactive no Timer'}
      className={isActive
        ? className.replace('framer-v-1q876jk', 'framer-v-yso0fx')
        : className.replace('framer-v-yso0fx', 'framer-v-1q876jk')}
      onClick={() => {
        window.dispatchEvent(new CustomEvent('nacew-faq-tab-select', { detail: label }));
      }}
      onMouseDown={(event) => event.preventDefault()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        backgroundColor: isActive
          ? 'rgba(23, 23, 23, 0.85)'
          : 'rgba(0, 0, 0, 0)',
      }}
      transition={{ duration: 0.35, ease: [0.44, 0, 0.56, 1] }}
      style={{ ...props.style, cursor: 'pointer', outline: 'none' }}
    >
      {domToReact(domNode.children, options)}
    </motion.div>
  );
}

function hasSvgUseReference(domNode, id) {
  if (!domNode.children) return false;

  return domNode.children.some((child) => {
    if (child.name === 'use') {
      return child.attribs?.href === `#${id}` || child.attribs?.xlinkHref === `#${id}`;
    }

    return hasSvgUseReference(child, id);
  });
}

function getGlowColor(domNode, fallback = [255, 255, 255, 0.25]) {
  const style = domNode?.attribs?.style || '';
  const match = style.match(/rgba\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*\)/);
  if (!match) return fallback;

  return [
    Number(match[1]),
    Number(match[2]),
    Number(match[3]),
    Number(match[4]),
  ];
}

function findDataGlowNode(domNode) {
  if (!domNode?.children) return null;

  for (const child of domNode.children) {
    if (child.attribs?.['data-glow'] === 'true') return child;
    const nested = findDataGlowNode(child);
    if (nested) return nested;
  }

  return null;
}

function getGlowProximity(domNode) {
  const style = findDataGlowNode(domNode)?.attribs?.style || '';
  const match = style.match(/radial-gradient\(([\d.]+)px/);
  if (match) return Number(match[1]) / 1.5;

  const className = domNode.attribs?.class || '';
  if (className.includes('framer-1fgb0ay-container')) return 490;
  if (className.includes('framer-arwdi5-container')) return 130;
  return 300;
}

function GlowRuntime({ domNode, options, proximity, glowColor, styleOverride }) {
  const props = cleanProps(domNode.attribs || {});
  const frameRef = useRef(null);

  useEffect(() => {
    const frameElement = frameRef.current;
    const glowElement = frameElement?.querySelector('[data-glow="true"]');
    if (!frameElement || !glowElement) return;

    const target = {
      x: 0,
      y: 0,
      opacity: 0,
      color: glowColor,
      proximity,
    };
    const current = {
      x: 0,
      y: 0,
      opacity: 0,
      color: [...glowColor],
      proximity,
    };
    const borderWidth = 1;
    const smoothing = 0.12;
    let frameId = null;
    let observer = null;

    const animate = () => {
      current.x += (target.x - current.x) * smoothing;
      current.y += (target.y - current.y) * smoothing;
      current.opacity += (target.opacity - current.opacity) * smoothing;
      current.proximity += (target.proximity - current.proximity) * smoothing;
      current.color = current.color.map((value, index) => (
        value + (target.color[index] - value) * smoothing
      ));

      const color = `rgba(${Math.round(current.color[0])},${Math.round(current.color[1])},${Math.round(current.color[2])},${current.color[3].toFixed(3)})`;
      glowElement.style.background = `radial-gradient(${current.proximity * 1.5}px circle at ${current.x}px ${current.y}px, ${color}, transparent)`;
      glowElement.style.opacity = String(current.opacity);
      frameId = window.requestAnimationFrame(animate);
    };

    const handleMouseMove = (event) => {
      const rect = frameElement.getBoundingClientRect();
      target.x = event.clientX - rect.left;
      target.y = event.clientY - rect.top;

      const isInside =
        target.x >= 0 &&
        target.x <= rect.width &&
        target.y >= 0 &&
        target.y <= rect.height;

      if (isInside) {
        const distanceToEdge = Math.min(
          target.x,
          target.y,
          rect.width - target.x,
          rect.height - target.y
        );
        target.opacity = Math.min(1, 1 - Math.max(0, (distanceToEdge - borderWidth) / target.proximity));
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
      if (entry.isIntersecting) {
        start();
      } else {
        stop();
      }
    }, { threshold: 0 });

    observer.observe(frameElement);

    return () => {
      observer?.disconnect();
      stop();
    };
  }, [glowColor, proximity]);

  const Tag = domNode.name;
  return (
    <Tag {...props} ref={frameRef} style={{ ...props.style, ...styleOverride }}>
      {domNode.children && domNode.children.length > 0 ? domToReact(domNode.children, options) : null}
    </Tag>
  );
}

function CheckIconSvg({ domNode }) {
  const props = cleanProps(domNode.attribs || {});
  const style = {
    ...(props.style || {}),
    '--4rxgx6': props.style?.['--4rxgx6'] || 'var(--token-090acfc6-f7ee-4bf4-9b69-0b15cf2cb187, rgb(255, 243, 240))',
  };

  return (
    <svg {...props} style={style} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M20 6 9 17l-5-5"
        fill="none"
        stroke="var(--4rxgx6)"
        strokeWidth="var(--1ww558a, 2)"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronIconSvg({ domNode }) {
  const props = cleanProps(domNode.attribs || {});
  const style = {
    ...(props.style || {}),
    '--4rxgx6': props.style?.['--4rxgx6'] || 'var(--token-c6de8ea4-3684-4c2f-917e-fc3d1879d6b0, rgba(255, 255, 255, 0.65))',
  };

  return (
    <svg {...props} style={style} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M6 15l6-6 6 6"
        fill="none"
        stroke="var(--4rxgx6)"
        strokeWidth="var(--1ww558a, 2)"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LeftArrowIconSvg({ domNode }) {
  const props = cleanProps(domNode.attribs || {});
  const style = {
    ...(props.style || {}),
    '--4rxgx6': props.style?.['--4rxgx6'] || 'var(--token-090acfc6-f7ee-4bf4-9b69-0b15cf2cb187, rgb(255, 243, 240))',
  };

  return (
    <svg {...props} style={style} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M15 19l-7-7 7-7"
        fill="none"
        stroke="var(--4rxgx6)"
        strokeWidth="var(--1ww558a, 2)"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RightArrowIconSvg({ domNode }) {
  const props = cleanProps(domNode.attribs || {});
  const style = {
    ...(props.style || {}),
    '--4rxgx6': props.style?.['--4rxgx6'] || 'var(--token-090acfc6-f7ee-4bf4-9b69-0b15cf2cb187, rgb(255, 243, 240))',
  };

  return (
    <svg {...props} style={style} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M9 5l7 7-7 7"
        fill="none"
        stroke="var(--4rxgx6)"
        strokeWidth="var(--1ww558a, 2)"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function NavigationShell({ domNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollBackdropOpacity, setScrollBackdropOpacity] = useState(0);
  const isDarkSection = scrollBackdropOpacity > 0.32;
  const props = cleanProps(domNode.attribs || {});

  useEffect(() => {
    let frame = null;

    const update = () => {
      frame = null;
      const nextOpacity = Math.max(0, Math.min(1, (window.scrollY - 162) / 645));
      setScrollBackdropOpacity(nextOpacity);
    };

    const onScroll = () => {
      if (frame === null) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, []);

  const options = {
    replace: (childNode) => {
      if (!childNode.attribs) return;

      const childClassName = childNode.attribs.class || '';
      const childProps = cleanProps(childNode.attribs || {});
      const Tag = childNode.name;

      if (childClassName.includes('framer-c26lio')) {
        return renderNacewNavLogo(childNode);
      }

      if (childClassName.includes('framer-6fjk0p-container')) {
        if (childProps.style) {
          delete childProps.style.opacity;
          delete childProps.style.transform;
          delete childProps.style.willChange;
        }

        return (
          <motion.div
            {...childProps}
            animate={{ opacity: scrollBackdropOpacity }}
            transition={{ duration: 0.18, ease: [0.44, 0, 0.56, 1] }}
            style={{ ...childProps.style, opacity: scrollBackdropOpacity }}
          >
            {childNode.children && childNode.children.length > 0 ? domToReact(childNode.children, options) : null}
          </motion.div>
        );
      }

      if (childNode.name === 'nav' && childClassName.includes('framer-KjT5A')) {
        if (childProps.style) {
          delete childProps.style.opacity;
          delete childProps.style.transform;
          delete childProps.style.willChange;
        }

        const isMobileNav = childNode.attribs['data-framer-name'] === 'mobile-top';
        let navClassName = childProps.className || '';
        if (isMobileNav) {
          navClassName = mobileOpen
            ? navClassName
              .replace('framer-v-c2dsud', 'framer-v-xqjeaw')
              .replace('framer-v-1h3d53s', 'framer-v-xqjeaw')
            : navClassName
              .replace('framer-v-xqjeaw', 'framer-v-c2dsud')
              .replace('framer-v-1h3d53s', 'framer-v-c2dsud');
        }

        return (
          <Tag
            {...childProps}
            className={navClassName}
            data-nacew-theme={isDarkSection ? 'dark' : 'light'}
            style={{ ...childProps.style, opacity: 1, transform: 'none' }}
          >
            {childNode.children && childNode.children.length > 0 ? domToReact(childNode.children, options) : null}
          </Tag>
        );
      }

      if (childClassName.includes('framer-1arlgxd-container')) {
        return (
          <div
            {...childProps}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              setMobileOpen((open) => !open);
            }}
            style={{ ...childProps.style, cursor: 'pointer' }}
          >
            {childNode.children && childNode.children.length > 0 ? domToReact(childNode.children, options) : null}
          </div>
        );
      }

      if (childClassName.includes('framer-oG402')) {
        const buttonClassName = mobileOpen
          ? (childProps.className || '').replace('framer-v-1qd1548', 'framer-v-2rnmh5')
          : (childProps.className || '').replace('framer-v-2rnmh5', 'framer-v-1qd1548');

        return (
          <div
            {...childProps}
            className={buttonClassName}
            data-framer-name={mobileOpen ? 'Variant 2' : 'Variant 1'}
            role="button"
            aria-expanded={mobileOpen}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              setMobileOpen((open) => !open);
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                setMobileOpen((open) => !open);
              }
            }}
            style={{ ...childProps.style, cursor: 'pointer', outline: 'none' }}
          >
            {childNode.children && childNode.children.length > 0 ? domToReact(childNode.children, options) : null}
          </div>
        );
      }

      if (childClassName.includes('framer-xwg8km') || childClassName.includes('framer-1e0yqhx')) {
        const isTopLine = childClassName.includes('framer-xwg8km');
        if (childProps.style) delete childProps.style.transform;

        return (
          <motion.div
            {...childProps}
            animate={{ rotate: mobileOpen ? (isTopLine ? 45 : -45) : 0 }}
            transition={{ duration: 0.34, ease: [0.44, 0, 0.56, 1] }}
            style={{ ...childProps.style, transformOrigin: '50% 50%' }}
          />
        );
      }

      if (childClassName.includes('framer-9t1ray')) {
        if (childProps.style) {
          delete childProps.style.opacity;
          delete childProps.style.transform;
          delete childProps.style.willChange;
        }

        return (
          <motion.div
            {...childProps}
            initial={false}
            animate={{ opacity: mobileOpen ? 1 : 0, height: mobileOpen ? 'auto' : 1 }}
            transition={{ duration: 0.36, ease: [0.44, 0, 0.56, 1] }}
            style={{
              ...childProps.style,
              overflow: 'clip',
              pointerEvents: mobileOpen ? 'auto' : 'none',
            }}
          >
            {childNode.children && childNode.children.length > 0 ? domToReact(childNode.children, options) : null}
          </motion.div>
        );
      }

      if (childNode.name === 'a' && childProps.href?.startsWith('./#')) {
        return (
          <a
            {...childProps}
            onClick={() => setMobileOpen(false)}
          >
            {childNode.children && childNode.children.length > 0 ? domToReact(childNode.children, options) : null}
          </a>
        );
      }

      return (
        <Tag {...childProps}>
          {childNode.children && childNode.children.length > 0 ? domToReact(childNode.children, options) : null}
        </Tag>
      );
    }
  };

  if (props.style) {
    delete props.style.opacity;
    delete props.style.transform;
    delete props.style.willChange;
  }

  return (
    <motion.div
      {...props}
      initial={{ opacity: 0, y: -36 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 90, damping: 20, mass: 0.8 }}
      data-nacew-theme={isDarkSection ? 'dark' : 'light'}
      style={{ ...props.style, opacity: 1, transform: 'none', willChange: 'transform' }}
    >
      {domNode.children && domNode.children.length > 0 ? domToReact(domNode.children, options) : null}
    </motion.div>
  );
}

function FeatureTabsRail({ domNode }) {
  const props = cleanProps(domNode.attribs || {});
  const railRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const railElement = railRef.current;
    const glowElement = glowRef.current;
    if (!railElement || !glowElement) return;

    const target = {
      x: 0,
      y: 0,
      opacity: 0,
      color: [255, 255, 255, 0.25],
      proximity: 490,
    };
    const current = {
      x: 0,
      y: 0,
      opacity: 0,
      color: [255, 255, 255, 0.25],
      proximity: 490,
    };
    const borderWidth = 1;
    const smoothing = 0.12;
    let frameId = null;
    let observer = null;

    const animate = () => {
      current.x += (target.x - current.x) * smoothing;
      current.y += (target.y - current.y) * smoothing;
      current.opacity += (target.opacity - current.opacity) * smoothing;
      current.proximity += (target.proximity - current.proximity) * smoothing;

      current.color = current.color.map((value, index) => (
        value + (target.color[index] - value) * smoothing
      ));

      const color = `rgba(${Math.round(current.color[0])},${Math.round(current.color[1])},${Math.round(current.color[2])},${current.color[3].toFixed(3)})`;
      glowElement.style.background = `radial-gradient(${current.proximity * 1.5}px circle at ${current.x}px ${current.y}px, ${color}, transparent)`;
      glowElement.style.opacity = String(current.opacity);

      frameId = window.requestAnimationFrame(animate);
    };

    const handleMouseMove = (event) => {
      const rect = railElement.getBoundingClientRect();
      target.x = event.clientX - rect.left;
      target.y = event.clientY - rect.top;

      const isInside =
        target.x >= 0 &&
        target.x <= rect.width &&
        target.y >= 0 &&
        target.y <= rect.height;

      if (isInside) {
        const distanceToEdge = Math.min(
          target.x,
          target.y,
          rect.width - target.x,
          rect.height - target.y
        );
        target.opacity = Math.min(1, 1 - Math.max(0, (distanceToEdge - borderWidth) / target.proximity));
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
      if (entry.isIntersecting) {
        start();
      } else {
        stop();
      }
    }, { threshold: 0 });

    observer.observe(railElement);

    return () => {
      observer?.disconnect();
      stop();
    };
  }, []);

  return (
    <div {...props} ref={railRef} style={{ ...props.style, opacity: 1, pointerEvents: 'none' }}>
      <div
        style={{
          height: '100%',
          width: '100%',
          position: 'relative',
          borderRadius: 72,
          overflow: 'hidden',
          background: 'var(--token-ef8ecd6d-5204-4f29-b3b7-2d4dc011513a, rgb(0, 0, 0))',
        }}
      >
        <div
          data-glow="true"
          ref={glowRef}
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0,
            pointerEvents: 'none',
            willChange: 'auto',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 1,
            borderRadius: 71,
            background: 'var(--token-259d8c78-fccd-4e6b-bbb0-32a9dcab750e, rgba(0, 0, 0, 0.85))',
            pointerEvents: 'none',
          }}
        />
      </div>
    </div>
  );
}

function InteractiveFeaturesSection({ domNode }) {
  const [activeTab, setActiveTab] = useState(0);
  const [progressKey, setProgressKey] = useState(0);
  const tabCycleMs = 5200;

  const descriptions = [
    "Replace rigid CRM subscriptions with a custom platform for leads, clients, pipelines, follow-ups, reporting, and team roles — built exactly for the way your business sells.",
    "We design and develop internal platforms for operations, project tracking, approvals, inventory, reporting, and team workflows — without forcing your company into generic software.",
    "From client portals to SaaS-style platforms, marketplaces, and connected iOS and Android mobile app experiences, Nacew builds premium, scalable digital products tailored to your audience.",
    "We automate workflows between your systems, forms, emails, payments, CRMs, dashboards, and third-party APIs so your team spends less time doing manual work."
  ];

  const props = cleanProps(domNode.attribs || {});

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveTab((current) => (current + 1) % 4);
      setProgressKey((current) => current + 1);
    }, tabCycleMs);

    return () => window.clearInterval(id);
  }, []);

  const selectTab = (tabIndex) => {
    setActiveTab(tabIndex);
    setProgressKey((current) => current + 1);
  };

  // Self-recursive options — ALL descendants are processed through this,
  // so tab-specific handlers fire no matter how deep the node is.
  const options = {
    replace: (childNode) => {
      if (!childNode.attribs) return;
      const className = childNode.attribs.class || '';

      if (childNode.name === 'svg' && hasSvgUseReference(childNode, '1839610128')) {
        return <CheckIconSvg domNode={childNode} />;
      }

      if (childNode.name === 'svg' && hasSvgUseReference(childNode, '3950368055')) {
        return <LeftArrowIconSvg domNode={childNode} />;
      }

      if (childNode.name === 'svg' && hasSvgUseReference(childNode, '2047441354')) {
        return <RightArrowIconSvg domNode={childNode} />;
      }

      // --- Fix lazy-loaded images (same as main parser) ---
      if (childNode.name === 'img') {
        const imgProps = cleanProps(childNode.attribs);
        if (imgProps.src && imgProps.src.includes('framerusercontent.com/images/')) {
          if (imgProps.style && (imgProps.style.opacity === "0" || imgProps.style.opacity === 0 || imgProps.style.opacity === "0.001")) {
            imgProps.style.opacity = "1";
          }
        }
        return <img {...imgProps} />;
      }

      // --- Full-width rounded tab rail background from the live Framer component ---
      if (className.includes('framer-1fgb0ay-container')) {
        return <FeatureTabsRail domNode={childNode} />;
      }

      // --- Mobile arrow buttons ---
      const isLeftArrow = className.includes('framer-1apng7n');
      const isRightArrow = className.includes('framer-b1lpai');
      if (isLeftArrow || isRightArrow) {
        const arrowProps = cleanProps(childNode.attribs);
        return (
          <div
            {...arrowProps}
            onClick={(e) => {
              e.stopPropagation();
              selectTab(isLeftArrow ? (activeTab - 1 + 4) % 4 : (activeTab + 1) % 4);
            }}
            style={{ ...arrowProps.style, cursor: 'pointer' }}
          >
            {domToReact(childNode.children, options)}
          </div>
        );
      }

      // --- Tab button wrappers (framer-121s4kf, etc.) ---
      const isTab0 = className.includes('framer-121s4kf');
      const isTab1 = className.includes('framer-1y3azrk');
      const isTab2 = className.includes('framer-1d4vjsq');
      const isTab3 = className.includes('framer-1oqw6fp');

      if (isTab0 || isTab1 || isTab2 || isTab3) {
        const tabIndex = isTab0 ? 0 : isTab1 ? 1 : isTab2 ? 2 : 3;
        const isActive = activeTab === tabIndex;
        const buttonProps = cleanProps(childNode.attribs);

        // Tab-specific recursive inner options
        const tabInnerOptions = {
          replace: (node) => {
            if (!node.attribs) return;
            const nodeCls = node.attribs.class || '';
            const nodeProps = cleanProps(node.attribs);

            if (node.name === 'svg' && hasSvgUseReference(node, '1839610128')) {
              return <CheckIconSvg domNode={node} />;
            }

            // Always strip SSR animation states (opacity:0, translateY:24px)
            if (nodeProps.style) {
              const op = nodeProps.style.opacity;
              if (op === 0 || op === '0' || op === '0.001' || op === 0.001) {
                delete nodeProps.style.opacity;
              }
              if (nodeProps.style.transform) {
                delete nodeProps.style.transform;
              }
              delete nodeProps.style.willChange;
            }

            // Fix images inside tabs
            if (node.name === 'img') {
              if (nodeProps.src && nodeProps.src.includes('framerusercontent.com/images/')) {
                if (nodeProps.style && (nodeProps.style.opacity === "0" || nodeProps.style.opacity === 0)) {
                  nodeProps.style.opacity = "1";
                }
              }
              return <img {...nodeProps} />;
            }

            // Border overlay (framer-arwdi5-container) — ONLY visible for active tab
            if (nodeCls.includes('framer-arwdi5-container')) {
              return (
                <div
                  {...nodeProps}
                  style={{
                    ...nodeProps.style,
                    opacity: isActive ? 1 : 0,
                    willChange: 'transform',
                    transition: 'opacity 0.35s cubic-bezier(.44,0,.56,1)',
                  }}
                >
                  {domToReact(node.children, tabInnerOptions)}
                </div>
              );
            }

            // Top subtle line (framer-1wvl2qz) — only visible for active tab
            if (nodeCls.includes('framer-1wvl2qz')) {
              const lineMask = 'linear-gradient(90deg, rgba(0,0,0,0) 0%, rgb(0, 0, 0) 50.49169398299905%, rgba(0,0,0,0) 100%)';
              return (
                <div
                  {...nodeProps}
                  style={{
                    ...nodeProps.style,
                    WebkitMask: lineMask,
                    mask: lineMask,
                    borderRadius: 2,
                    opacity: 1,
                  }}
                >
                  {isActive && (
                    <div
                      className="framer-1ld1ttv-container"
                      data-code-component-plugin-id="84d4c1"
                      data-framer-appear-id="1ld1ttv"
                      style={{
                        flex: '1 0 0',
                        width: '1px',
                        height: '100%',
                        position: 'relative',
                        willChange: 'transform',
                        opacity: 1,
                        transform: 'none',
                      }}
                    >
                      <div
                        role="progressbar"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        aria-valuenow="100"
                        style={{
                          height: '100%',
                          width: '100%',
                          position: 'relative',
                          minWidth: 5,
                          minHeight: 5,
                          overflow: 'hidden',
                          borderRadius: 999,
                          background: 'var(--token-47679c26-af3f-4cd0-91b2-530be918763e, rgba(41, 41, 41, 0))',
                        }}
                      >
                        <motion.div
                          key={`${tabIndex}-${progressKey}`}
                          initial={{ width: '0%' }}
                          animate={{ width: '100%' }}
                          transition={{ duration: tabCycleMs / 1000, ease: 'linear' }}
                          style={{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            bottom: 0,
                            background: 'var(--token-c6de8ea4-3684-4c2f-917e-fc3d1879d6b0, rgba(255, 255, 255, 0.65))',
                            borderRadius: 999,
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            // Text element (framer-1hp9gbb) — toggle color based on active state
            if (nodeCls.includes('framer-1hp9gbb')) {
              return (
                <div
                  {...nodeProps}
                  style={{
                    ...nodeProps.style,
                    '--extracted-r6o4lv': isActive
                      ? 'var(--token-090acfc6-f7ee-4bf4-9b69-0b15cf2cb187, rgb(255, 243, 240))'
                      : 'var(--token-792af9ed-53d8-45b2-94fd-014e7edc8f44, rgba(255, 255, 255, 0.8))',
                    transition: 'color 0.35s cubic-bezier(.44,0,.56,1)',
                  }}
                >
                  {domToReact(node.children, tabInnerOptions)}
                </div>
              );
            }

            // Button element (framer-X2hsG) — live active/inactive Framer variants.
            if (nodeCls.includes('framer-X2hsG')) {
              const activeClassName = nodeCls.includes('framer-v-1lugq31')
                ? nodeCls.replace('framer-v-1lugq31', 'framer-v-8x98wc')
                : nodeCls;
              const inactiveClassName = nodeCls.includes('framer-v-8x98wc')
                ? nodeCls.replace('framer-v-8x98wc', 'framer-v-1lugq31')
                : nodeCls;
              return (
                <div
                  {...nodeProps}
                  className={isActive ? activeClassName : inactiveClassName}
                  style={{
                    ...nodeProps.style,
                    backgroundColor: isActive
                      ? 'var(--token-feab5ab7-d914-42dd-ad2d-73b5c8596806, rgb(7, 32, 54))'
                      : 'var(--token-1ec80be1-93dc-4b5e-a38f-5b1f087c77a5, rgba(255, 255, 255, 0))',
                    width: '100%',
                    borderRadius: 609,
                    opacity: 1,
                    overflow: isActive ? 'clip' : 'visible',
                    willChange: 'auto',
                    transition: 'background-color 0.35s cubic-bezier(.44,0,.56,1)',
                  }}
                >
                  {domToReact(node.children, tabInnerOptions)}
                </div>
              );
            }

            // Default: render with cleaned styles, continue recursing
            const Tag = node.name;
            return (
              <Tag {...nodeProps}>
                {node.children && node.children.length > 0 ? domToReact(node.children, tabInnerOptions) : null}
              </Tag>
            );
          }
        };

        return (
          <div
            {...buttonProps}
            onClick={() => selectTab(tabIndex)}
            style={{ ...buttonProps.style, cursor: 'pointer' }}
          >
            {domToReact(childNode.children, tabInnerOptions)}
          </div>
        );
      }

      // --- Mockup backgrounds (framer-15ixqzl, framer-11fd6yx, etc.) ---
      const isBG1 = className.includes('framer-15ixqzl');
      const isBG2 = className.includes('framer-11fd6yx');
      const isBG3 = className.includes('framer-kda24n');
      const isBG4 = className.includes('framer-yfsspb');

      if (isBG1 || isBG2 || isBG3 || isBG4) {
        const bgIndex = isBG1 ? 0 : isBG2 ? 1 : isBG3 ? 2 : 3;
        const bgProps = cleanProps(childNode.attribs);
        if (bgProps.style) {
          delete bgProps.style.opacity;
          delete bgProps.style.transform;
          delete bgProps.style.willChange;
          bgProps.style.background = 'none';
          bgProps.style.backgroundColor = 'transparent';
          bgProps.style.border = 'none';
          bgProps.style.boxShadow = 'none';
          bgProps.style.borderRadius = '36px';
        }
        return (
          <motion.div
            initial={false}
            animate={{ opacity: activeTab === bgIndex ? 1 : 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            style={{ ...bgProps.style, pointerEvents: activeTab === bgIndex ? 'auto' : 'none' }}
            {...bgProps}
          >
            {bgIndex === 0 && <CrmMockup isActive={activeTab === bgIndex} />}
            {bgIndex === 1 && <InternalToolsMockup isActive={activeTab === bgIndex} />}
            {bgIndex === 2 && <AppsMockup isActive={activeTab === bgIndex} />}
            {bgIndex === 3 && <AutomationsMockup isActive={activeTab === bgIndex} />}
          </motion.div>
        );
      }

      // --- Description text (framer-1yef0t7) ---
      if (className.includes('framer-1yef0t7')) {
        const textProps = cleanProps(childNode.attribs);
        return (
          <div {...textProps}>
            <motion.p
              key={activeTab}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="framer-text framer-styles-preset-prenqk"
              data-styles-preset="POYKcChXw"
              dir="auto"
              style={{
                '--framer-text-alignment': 'center',
                '--framer-text-color': 'var(--token-792af9ed-53d8-45b2-94fd-014e7edc8f44, rgba(255, 255, 255, 0.8))'
              }}
            >
              {descriptions[activeTab]}
            </motion.p>
          </div>
        );
      }

      // --- FALLTHROUGH: Render with original tag/styles, recurse with `options` ---
      // This is the critical fix: we use `options` (self-recursive) instead of
      // `replaceNode`, so ALL descendants are processed by tab-aware handlers.
      const nodeProps = cleanProps(childNode.attribs);
      if (nodeProps.style) {
        delete nodeProps.style.willChange;
      }
      const Tag = childNode.name;
      return (
        <Tag {...nodeProps}>
          {childNode.children && childNode.children.length > 0 ? domToReact(childNode.children, options) : null}
        </Tag>
      );
    }
  };

  return (
    <div {...props}>
      {domToReact(domNode.children, options)}
    </div>
  );
}

function FallingTextServices() {
  return (
    <div style={{ width: '100%', maxWidth: '1200px', margin: '48px auto 0 auto', padding: '0 24px' }}>
      <FallingText
        text="Product-Building Development UI/UX UX-Strategy Dashboards CRMs Automations Web-Apps Mobile-Apps Graphics Motion-Design SaaS-Replacement Custom-Code Software-Engineering Branding Marketing"
        highlightWords={["Product-Building", "Development", "UI/UX", "Automations", "SaaS-Replacement", "Custom-Code"]}
        highlightClass="highlighted"
        trigger="scroll"
        backgroundColor="transparent"
        wireframes={false}
        gravity={0.5}
        fontSize="1.15rem"
        mouseConstraintStiffness={0.9}
      />
    </div>
  );
}

export { renderNacewNavLogo, FAQ_CATEGORY_CONTENT, getFAQItemIndex, HERO_LAYER_ASSETS, getHeroLayerAsset, applyHeroLayerAsset, HeroBottomTreesLayer, HeroForegroundTreesLayer, InteractiveFAQItem, FAQCategoryTab, hasSvgUseReference, getGlowColor, findDataGlowNode, getGlowProximity, GlowRuntime, CheckIconSvg, ChevronIconSvg, LeftArrowIconSvg, RightArrowIconSvg, NavigationShell, FeatureTabsRail, InteractiveFeaturesSection, FallingTextServices };
