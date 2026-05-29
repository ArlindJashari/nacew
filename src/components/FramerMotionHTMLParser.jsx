import { useEffect, useRef, useState, useContext } from 'react';
import parse, { domToReact, attributesToProps } from 'html-react-parser';
import { AnimatePresence, motion, useScroll, useTransform, useSpring, animate, useMotionValue } from 'framer-motion';
import { CrmMockup, InternalToolsMockup, AppsMockup, AutomationsMockup } from './Mockups';
import SpatialMockup from './SpatialMockup';
import { HeroTabContext, HeroStateProvider } from './HeroTabContext';
import FallingText from './FallingText';

const getTreesImage = (activeTab) => {
  switch (activeTab) {
    case 0:
      return '/hero/trees/x/blue.png';
    case 1:
      return '/hero/trees/x/red.png';
    case 2:
      return '/hero/trees/x/green.png';
    case 3:
      return '/hero/trees/x/green.png';
    default:
      return '/hero/trees/x/blue.png';
  }
};
// Clean attributes and fix CSS custom properties that get camelCased by html-react-parser
function cleanProps(attribs) {
  const props = attributesToProps(attribs || {});

  if (props.fetchpriority) {
    props.fetchPriority = props.fetchpriority;
    delete props.fetchpriority;
  }

  if (props.style) {
    const fixedStyle = {};
    Object.keys(props.style).forEach(key => {
      let cleanKey = key;
      if (key.startsWith('-') && !key.startsWith('--')) {
        if (key === '-9q2k08') {
          cleanKey = '--9q2k08';
        } else {
          const kebab = key.substring(1).replace(/([A-Z])/g, '-$1').toLowerCase();
          cleanKey = '--' + kebab;
        }
      }
      fixedStyle[cleanKey] = props.style[key];
    });
    props.style = fixedStyle;
  }
  return props;
}

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

function getNodeText(domNode) {
  if (!domNode) return '';
  if (domNode.type === 'text') return domNode.data || '';
  if (!domNode.children) return '';
  return domNode.children.map(getNodeText).join('');
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

const HERO_TEXT_REPLACEMENTS = {
  '12-Week Strength': 'Validate',
  'Lift Heavy': 'First 100 Customers',
  'Nutrition Basics': 'Pricing',
  'Home Gym': 'Cold Outreach',
  'S': 'Z',
  'Strong By Ava': 'Zero to Revenue',
  '847 members': '2,345 members',
  'Ava Torres is a certified strength coach with 80k+ followers on Instagram. → 12-week progressive training programs with video lessons → Weekly live Q&As and form-check threads → A supportive community of women training for strength':
    'James Park has helped 300+ founders go from idea to first $10k in revenue. → Startup playbooks and async lessons → Weekly office hours and accountability threads → A practical community for early-stage founders',
};

function replaceHeroText(text) {
  return HERO_TEXT_REPLACEMENTS[text] || text;
}

function HeroShaderBackground({ domNode }) {
  const props = cleanProps(domNode.attribs || {});

  return (
    <div
      {...props}
      style={{
        ...props.style,
        opacity: 1,
        background:
          'linear-gradient(96deg, rgba(5, 5, 8, 0.96) 0%, rgba(19, 18, 26, 0.86) 18%, rgba(215, 222, 252, 0.92) 38%, rgba(241, 250, 250, 0.96) 61%, rgba(116, 160, 242, 0.98) 100%)',
      }}
    >
      <div
        style={{
          display: 'block',
          flex: '0 0 auto',
          width: '100%',
          height: '100%',
          borderRadius: 'inherit',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(700px 420px at 53% 30%, rgba(255,255,255,0.86), rgba(255,255,255,0.12) 46%, rgba(255,255,255,0) 66%), linear-gradient(108deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.7) 16%, rgba(0,0,0,0) 34%), linear-gradient(82deg, rgba(0,0,0,0) 0%, rgba(255,255,255,0.92) 72%, rgba(123,167,242,0.9) 100%)',
          }}
        />
      </div>
    </div>
  );
}

// Matches Nacew's hero parallax ratios: elements move down by scrollY * factor.
function ParallaxElement({ children, factor, ...props }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, (value) => value * factor);

  const sanitizedProps = { ...props };
  if (sanitizedProps.style) {
    sanitizedProps.style = { ...sanitizedProps.style };
    delete sanitizedProps.style.opacity;
    delete sanitizedProps.style.transform;
    delete sanitizedProps.style.willChange;
  }

  return (
    <motion.div
      {...sanitizedProps}
      style={{ ...sanitizedProps.style, opacity: 1, y, willChange: 'transform' }}
    >
      {children}
    </motion.div>
  );
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


function AnimatedNumber({ value, format = (v) => v }) {
  const nodeRef = useRef(null);
  const motionValue = useMotionValue(value);

  useEffect(() => {
    const controls = animate(motionValue, value, {
      type: "spring",
      stiffness: 200,
      damping: 25,
      mass: 0.8,
      onUpdate: (latest) => {
        if (nodeRef.current) {
          nodeRef.current.textContent = format(latest);
        }
      }
    });
    return controls.stop;
  }, [value, motionValue, format]);

  return <span ref={nodeRef}>{format(motionValue.get())}</span>;
}

function CostComparisonMockup() {
  const PRESETS = [12, 24, 36, 60];
  const [months, setMonths] = useState(24);

  const subscriptionMonthly = 499;
  const customUpfront = 15000;
  const customMonthly = 75;

  const subscriptionTotal = months * subscriptionMonthly;
  const customTotal = customUpfront + months * customMonthly;
  const breakEven = Math.ceil(customUpfront / Math.max(1, subscriptionMonthly - customMonthly));

  const isSubCheaper = subscriptionTotal <= customTotal;
  const delta = Math.abs(subscriptionTotal - customTotal);

  // Progress along the "you own it" timeline relative to the break-even month.
  const ownership = Math.max(0, Math.min(100, Math.round((months / breakEven) * 100)));

  const formatMoney = (value) => `$${Math.round(value).toLocaleString('en-US')}`;
  const yearLabel = (m) => (m % 12 === 0 ? `${m / 12} yr` : `${m} mo`);

  return (
    <div className="cost-mockup">
      <style>
        {`
          .cost-mockup {
            width: 100%;
            height: 100%;
            border-radius: 36px !important;
            overflow: hidden;
            position: relative;
            display: flex;
            align-items: flex-start;
            justify-content: center;
            background: var(--token-feab5ab7-d914-42dd-ad2d-73b5c8596806, rgba(18,18,20,.85));
            color: rgba(255, 243, 240, .94);
            font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Inter", "Inter Placeholder", sans-serif;
            padding: 26px 28px 40px;
          }

          .cost-mockup:before {
            content: "";
            position: absolute;
            inset: 6px;
            border-radius: 30px 30px 0 0;
            background:
              linear-gradient(108deg, rgba(5,6,9,.98) 0%, rgba(22,24,29,.98) 13%, rgba(58,66,71,.78) 24%, rgba(255,255,255,0) 38%),
              radial-gradient(92% 108% at 50% 6%, rgba(255,255,255,.98) 0%, rgba(242,251,250,.94) 38%, rgba(221,236,244,.48) 58%, rgba(255,255,255,0) 74%),
              radial-gradient(72% 118% at 94% 30%, rgba(99,144,232,.94) 0%, rgba(156,105,231,.82) 42%, rgba(156,105,231,0) 74%),
              radial-gradient(86% 92% at 58% 100%, rgba(91,211,194,.7) 0%, rgba(91,211,194,0) 64%),
              linear-gradient(100deg, rgba(223,255,249,.98) 0%, rgba(248,252,251,.98) 45%, rgba(225,229,251,.96) 70%, rgba(121,154,229,.96) 100%);
            background-size: 145% 145%, 175% 175%, 160% 160%, 150% 150%, 185% 185%;
            animation: costShader 20s cubic-bezier(.44,0,.56,1) infinite;
            opacity: 0.8;
            transform: translateZ(0);
          }
          .cost-mockup:after {
            content: "";
            position: absolute;
            inset: 0;
            background: linear-gradient(180deg, rgba(8,8,10,.55) 0%, rgba(8,8,10,.18) 34%, rgba(5,6,8,.86) 100%);
            pointer-events: none;
          }
          @keyframes costShader {
            0% { background-position: 0% 50%, 50% 38%, 88% 42%, 54% 100%, 0% 50%; filter: hue-rotate(0deg); }
            50% { background-position: 10% 48%, 46% 32%, 96% 36%, 48% 96%, 38% 50%; filter: hue-rotate(30deg); }
            100% { background-position: 0% 50%, 50% 38%, 88% 42%, 54% 100%, 0% 50%; filter: hue-rotate(0deg); }
          }

          /* ----- iOS screen ----- */
          .ios-screen {
            position: relative;
            z-index: 10;
            width: 100%;
            max-width: 760px;
            display: flex;
            flex-direction: column;
            gap: 13px;
          }

          .ios-topbar {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .ios-pill {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 7px 13px 7px 11px;
            border-radius: 100px;
            background: rgba(255,255,255,0.08);
            border: 1px solid rgba(255,255,255,0.12);
            box-shadow: inset 0 1px 0 rgba(255,255,255,0.14);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            font-size: 12.5px;
            font-weight: 600;
            letter-spacing: -0.01em;
            color: rgba(255,255,255,0.92);
          }
          .ios-dot {
            width: 7px; height: 7px; border-radius: 50%;
            background: #5BD3C2;
            box-shadow: 0 0 10px #5BD3C2;
            animation: iosPulse 2.4s ease-in-out infinite;
          }
          @keyframes iosPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(.7)} }
          .ios-topbar-meta {
            font-size: 12px;
            font-weight: 500;
            color: rgba(255,255,255,0.55);
            letter-spacing: -0.01em;
          }

          .ios-headline { display: flex; flex-direction: column; gap: 5px; }
          .ios-headline h2 {
            margin: 0;
            font-size: clamp(26px, 3vw, 36px);
            font-weight: 600;
            letter-spacing: -0.03em;
            line-height: 1.04;
            color: #fff;
          }
          .ios-headline p {
            margin: 0;
            max-width: 540px;
            font-size: 14px;
            line-height: 1.45;
            font-weight: 450;
            color: rgba(255,255,255,0.62);
            letter-spacing: -0.01em;
          }

          /* control card: presets + slider */
          .ios-control {
            background: rgba(20,20,24,0.5);
            border: 1px solid rgba(255,255,255,0.09);
            border-radius: 22px;
            padding: 16px 18px 18px;
            box-shadow: inset 0 1px 0 rgba(255,255,255,0.08), 0 18px 40px rgba(0,0,0,0.35);
            backdrop-filter: blur(28px);
            -webkit-backdrop-filter: blur(28px);
            display: flex;
            flex-direction: column;
            gap: 14px;
          }
          .ios-control-head {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
          }
          .ios-control-head span {
            font-size: 13px; font-weight: 500;
            color: rgba(255,255,255,0.6); letter-spacing: -0.01em;
          }
          .ios-control-head strong {
            font-size: 16px; font-weight: 650; color: #fff; letter-spacing: -0.02em;
          }
          .ios-seg {
            position: relative;
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 2px;
            padding: 4px;
            border-radius: 13px;
            background: rgba(0,0,0,0.32);
            border: 1px solid rgba(255,255,255,0.06);
          }
          .ios-seg-btn {
            position: relative;
            appearance: none;
            border: none;
            background: transparent;
            cursor: pointer;
            padding: 8px 0;
            border-radius: 9px;
            font-size: 13px;
            font-weight: 600;
            letter-spacing: -0.01em;
            color: rgba(255,255,255,0.55);
            transition: color 0.2s ease;
          }
          .ios-seg-btn.on { color: #0c0c0e; }
          .ios-seg-btn span { position: relative; z-index: 2; }
          .ios-seg-hl {
            position: absolute;
            inset: 0;
            z-index: 1;
            border-radius: 9px;
            background: #fff;
            box-shadow: 0 2px 8px rgba(0,0,0,0.35);
          }
          .ios-range {
            width: 100%;
            -webkit-appearance: none;
            appearance: none;
            height: 6px;
            border-radius: 8px;
            outline: none;
            cursor: pointer;
          }
          .ios-range::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 22px; height: 22px;
            border-radius: 50%;
            background: #fff;
            border: 1px solid rgba(0,0,0,0.1);
            box-shadow: 0 0 0 1px rgba(255,255,255,0.4), 0 4px 12px rgba(0,0,0,0.4);
            cursor: grab;
            transition: transform 0.18s cubic-bezier(0.16,1,0.3,1);
          }
          .ios-range::-webkit-slider-thumb:active { transform: scale(1.18); cursor: grabbing; }

          /* tiles */
          .ios-tiles {
            display: grid;
            grid-template-columns: 1fr auto 1fr;
            align-items: stretch;
            gap: 12px;
          }
          .ios-tile {
            position: relative;
            border-radius: 20px;
            padding: 16px 18px;
            background: linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02));
            border: 1px solid rgba(255,255,255,0.08);
            box-shadow: inset 0 1px 0 rgba(255,255,255,0.06);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
            display: flex;
            flex-direction: column;
            gap: 6px;
            overflow: hidden;
            transition: border-color 0.4s ease, box-shadow 0.4s ease, background 0.4s ease;
          }
          .ios-tile.win {
            border-color: rgba(255,180,150,0.45);
            box-shadow: inset 0 1px 0 rgba(255,255,255,0.1), 0 0 0 1px rgba(255,180,150,0.18), 0 16px 40px rgba(255,140,90,0.12);
            background: linear-gradient(180deg, rgba(255,180,150,0.12), rgba(255,255,255,0.02));
          }
          .ios-tile.win.blue {
            border-color: rgba(150,200,255,0.5);
            box-shadow: inset 0 1px 0 rgba(255,255,255,0.1), 0 0 0 1px rgba(150,200,255,0.2), 0 16px 40px rgba(90,150,255,0.14);
            background: linear-gradient(180deg, rgba(150,200,255,0.14), rgba(255,255,255,0.02));
          }
          .ios-tile-top {
            display: flex; align-items: center; justify-content: space-between; gap: 8px;
            min-height: 22px;
          }
          .ios-tile-label {
            font-size: 13px; font-weight: 550;
            color: rgba(255,255,255,0.7); letter-spacing: -0.01em;
          }
          .ios-badge {
            font-size: 9.5px; font-weight: 750;
            text-transform: uppercase; letter-spacing: 0.08em;
            padding: 4px 9px; border-radius: 100px;
            white-space: nowrap;
          }
          .ios-badge.warm { background: #fff; color: #1a1a1a; box-shadow: 0 3px 12px rgba(255,255,255,0.35); }
          .ios-badge.cool { background: #2D88FF; color: #fff; box-shadow: 0 3px 12px rgba(45,136,255,0.45); }
          .ios-tile-num {
            font-size: clamp(30px, 3.4vw, 42px);
            font-weight: 680;
            letter-spacing: -0.03em;
            line-height: 1;
            color: #fff;
          }
          .ios-tile-sub {
            font-size: 12px; font-weight: 450;
            color: rgba(255,255,255,0.5); letter-spacing: -0.005em;
          }

          .ios-mid {
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            gap: 8px; min-width: 92px;
          }
          .ios-vs {
            font-size: 11px; font-weight: 700; letter-spacing: 0.12em;
            color: rgba(255,255,255,0.4);
          }
          .ios-save {
            display: flex; flex-direction: column; align-items: center; gap: 1px;
            padding: 9px 12px; border-radius: 14px;
            background: rgba(255,255,255,0.07);
            border: 1px solid rgba(255,255,255,0.12);
            box-shadow: inset 0 1px 0 rgba(255,255,255,0.12);
            backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
            text-align: center;
          }
          .ios-save .lbl { font-size: 10px; font-weight: 600; letter-spacing: 0.02em; color: rgba(255,255,255,0.55); white-space: nowrap; }
          .ios-save .amt { font-size: 16px; font-weight: 720; letter-spacing: -0.02em; color: #fff; }

          /* break-even meter + chips */
          .ios-meter {
            display: flex; flex-direction: column; gap: 12px;
            padding: 16px 18px;
            border-radius: 20px;
            background: rgba(20,20,24,0.42);
            border: 1px solid rgba(255,255,255,0.08);
            box-shadow: inset 0 1px 0 rgba(255,255,255,0.06);
            backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
          }
          .ios-meter-head {
            display: flex; justify-content: space-between; align-items: baseline;
            font-size: 13px; color: rgba(255,255,255,0.6); font-weight: 500; letter-spacing: -0.01em;
          }
          .ios-meter-head strong { color: #fff; font-weight: 650; font-size: 14px; }
          .ios-track {
            position: relative; height: 8px; border-radius: 8px;
            background: rgba(255,255,255,0.08); overflow: hidden;
          }
          .ios-fill {
            position: absolute; inset: 0 auto 0 0; height: 100%;
            border-radius: 8px;
            background: linear-gradient(90deg, #FFB496, #96C8FF);
          }
          .ios-chips { display: flex; flex-wrap: wrap; gap: 8px; }
          .ios-chip {
            display: inline-flex; align-items: center; gap: 6px;
            padding: 7px 12px; border-radius: 100px;
            background: rgba(255,255,255,0.05);
            border: 1px solid rgba(255,255,255,0.09);
            font-size: 12px; font-weight: 500; letter-spacing: -0.01em;
            color: rgba(255,255,255,0.78);
          }
          .ios-chip svg { width: 13px; height: 13px; flex-shrink: 0; }

          @media (max-width: 820px) {
            .cost-mockup { padding: 22px 16px 36px; }
            .ios-tiles { grid-template-columns: 1fr; }
            .ios-mid { flex-direction: row; min-width: 0; }
          }
        `}
      </style>

      <div className="ios-screen">

        <div className="ios-topbar">
          <div className="ios-pill"><span className="ios-dot" />Nacew · Cost Studio</div>
          <div className="ios-topbar-meta">Live estimate</div>
        </div>

        <div className="ios-headline">
          <h2>Own it, don&rsquo;t rent it.</h2>
          <p>Years of stacked SaaS fees vs. one platform you build once and keep &mdash; drag the timeline.</p>
        </div>

        <div className="ios-tiles">
          <motion.div
            className={`ios-tile ${isSubCheaper ? 'win' : ''}`}
            animate={{ scale: isSubCheaper ? 1.02 : 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 22 }}
          >
            <div className="ios-tile-top">
              <span className="ios-tile-label">SaaS subscription</span>
              <AnimatePresence>
                {isSubCheaper && (
                  <motion.div
                    className="ios-badge warm"
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                  >
                    Cheaper now
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="ios-tile-num">
              <AnimatedNumber value={subscriptionTotal} format={formatMoney} />
            </div>
            <div className="ios-tile-sub">{formatMoney(subscriptionMonthly)}/mo &middot; renews forever</div>
          </motion.div>

          <div className="ios-mid">
            <div className="ios-vs">VS</div>
            <motion.div className="ios-save" layout>
              <span className="lbl">{isSubCheaper ? 'SaaS leads by' : 'You save'}</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={isSubCheaper ? 'sub' : 'custom'}
                  className="amt"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 240, damping: 22 }}
                  style={{ color: isSubCheaper ? '#FFB496' : '#96C8FF' }}
                >
                  <AnimatedNumber value={delta} format={formatMoney} />
                </motion.span>
              </AnimatePresence>
            </motion.div>
          </div>

          <motion.div
            className={`ios-tile ${!isSubCheaper ? 'win blue' : ''}`}
            animate={{ scale: !isSubCheaper ? 1.02 : 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 22 }}
          >
            <div className="ios-tile-top">
              <span className="ios-tile-label">Custom build</span>
              <AnimatePresence>
                {!isSubCheaper && (
                  <motion.div
                    className="ios-badge cool"
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                  >
                    You own it
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="ios-tile-num">
              <AnimatedNumber value={customTotal} format={formatMoney} />
            </div>
            <div className="ios-tile-sub">{formatMoney(customUpfront)} once &middot; {formatMoney(customMonthly)}/mo upkeep</div>
          </motion.div>
        </div>

        <motion.div className="ios-control" layout>
          <div className="ios-control-head">
            <span>Time horizon</span>
            <strong><AnimatedNumber value={months} /> months</strong>
          </div>
          <div className="ios-seg">
            {PRESETS.map((p) => (
              <button
                key={p}
                type="button"
                className={`ios-seg-btn ${months === p ? 'on' : ''}`}
                onClick={() => setMonths(p)}
              >
                {months === p && (
                  <motion.span
                    layoutId="iosSegActive"
                    className="ios-seg-hl"
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                  />
                )}
                <span>{yearLabel(p)}</span>
              </button>
            ))}
          </div>
          <input
            type="range"
            min="1"
            max="60"
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
            className="ios-range"
            style={{
              background: `linear-gradient(90deg, #FFB496 0%, #96C8FF ${(months / 60) * 100}%, rgba(255,255,255,0.1) ${(months / 60) * 100}%)`,
            }}
          />
        </motion.div>

        <div className="ios-meter">
          <div className="ios-meter-head">
            <span>Break-even on a custom build</span>
            <strong>month {breakEven}</strong>
          </div>
          <div className="ios-track">
            <motion.div
              className="ios-fill"
              animate={{ width: `${ownership}%` }}
              transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            />
          </div>
          <div className="ios-chips">
            <div className="ios-chip">
              <svg viewBox="0 0 24 24" fill="none" stroke="#5BD3C2" strokeWidth="2.4"><polyline points="20 6 9 17 4 12" /></svg>
              You own the source code
            </div>
            <div className="ios-chip">
              <svg viewBox="0 0 24 24" fill="none" stroke="#5BD3C2" strokeWidth="2.4"><polyline points="20 6 9 17 4 12" /></svg>
              No per-seat pricing
            </div>
            <div className="ios-chip">
              <svg viewBox="0 0 24 24" fill="none" stroke="#5BD3C2" strokeWidth="2.4"><polyline points="20 6 9 17 4 12" /></svg>
              Built around your workflow
            </div>
          </div>
        </div>

      </div>
    </div>
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

function ScrollSpotlightText({ children, ...props }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 82%', 'end 18%'],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.25, 0.99, 0.25]);

  const style = { ...(props.style || {}) };
  delete style.opacity;
  delete style.transform;
  delete style.willChange;

  return (
    <motion.div
      {...props}
      ref={ref}
      style={{ ...style, opacity, transform: 'none', willChange: 'transform' }}
    >
      {children}
    </motion.div>
  );
}

function ScrollRevealBlock({ children, delay = 0, ...props }) {
  const style = { ...(props.style || {}) };
  delete style.opacity;
  delete style.transform;
  delete style.willChange;

  return (
    <motion.div
      {...props}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18, margin: '0px 0px -80px 0px' }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ ...style, willChange: 'transform' }}
    >
      {children}
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

function NavigationShell({ domNode, replaceNode }) {
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


export function parseHTMLWithAnimations(htmlString) {
  const replaceNode = (domNode, isInsideFAQ = false) => {
    // 0. Global Text Replacement (Fora -> Nacew)
    if (domNode.type === 'text') {
      let txt = domNode.data || '';
      if (txt.includes('Fora')) {
        txt = txt.replace(/Fora/g, 'Nacew');
        domNode.data = txt;
      }
      // Do NOT return here, just mutate domNode.data.
      // html-react-parser handles text nodes internally if we return undefined.
      return undefined;
    }

    if (!domNode.attribs) return;

    // Intercept Intro section to append falling physics tags
    if (domNode.attribs.id === 'about') {
      const props = cleanProps(domNode.attribs);
      props.style = props.style || {};
      props.style.position = 'relative';
      const options = {
        replace: (childNode) => replaceNode(childNode, isInsideFAQ)
      };

      return (
        <section {...props}>
          {domNode.children && domNode.children.length > 0 ? domToReact(domNode.children, options) : null}
          <FallingTextServices />
        </section>
      );
    }

    // 1. Fix Lazy Loaded Images
    if (domNode.name === 'img') {
      const props = cleanProps(domNode.attribs);
      if (props.src && props.src.includes('framerusercontent.com/images/')) {
        if (props.style && (props.style.opacity === "0" || props.style.opacity === 0 || props.style.opacity === "0.001")) {
          props.style.opacity = "1";
        }
      }
    }
    const className = domNode.attribs.class || '';
    const hasAppearId = domNode.attribs['data-framer-appear-id'];

    if (className.includes('framer-c26lio')) {
      return renderNacewNavLogo(domNode);
    }

    if (domNode.name === 'svg' && hasSvgUseReference(domNode, '1839610128')) {
      return <CheckIconSvg domNode={domNode} />;
    }

    if (domNode.name === 'svg' && hasSvgUseReference(domNode, '1858150576')) {
      return <ChevronIconSvg domNode={domNode} />;
    }

    if (domNode.name === 'svg' && hasSvgUseReference(domNode, '3950368055')) {
      return <LeftArrowIconSvg domNode={domNode} />;
    }

    if (domNode.name === 'svg' && hasSvgUseReference(domNode, '2047441354')) {
      return <RightArrowIconSvg domNode={domNode} />;
    }

    if (className.includes('framer-1xw88z8-container')) {
      return <NavigationShell domNode={domNode} replaceNode={replaceNode} />;
    }

    if (
      className.includes('framer-13yk504-container') ||
      className.includes('framer-vdazwh-container') ||
      className.includes('framer-wu5crx-container') ||
      className.includes('framer-1uegbsk-container') ||
      className.includes('framer-13qvw2d-container')
    ) {
      const options = {
        replace: (childNode) => replaceNode(childNode, isInsideFAQ)
      };

      return (
        <GlowRuntime
          domNode={domNode}
          options={options}
          proximity={getGlowProximity(domNode)}
          glowColor={getGlowColor(findDataGlowNode(domNode))}
        />
      );
    }

    if (
      className.includes('framer-1amyo5f') ||
      className.includes('framer-1es08lj') ||
      className.includes('framer-sch1r2')
    ) {
      const props = cleanProps(domNode.attribs);
      return (
        <ScrollSpotlightText {...props}>
          {domToReact(domNode.children, {
            replace: (cNode) => replaceNode(cNode, isInsideFAQ)
          })}
        </ScrollSpotlightText>
      );
    }

    if (className.includes('framer-1ju5bf9') || className.includes('framer-l6jfy1')) {
      const props = cleanProps(domNode.attribs);
      return (
        <ScrollRevealBlock delay={className.includes('framer-l6jfy1') ? 0.08 : 0} {...props}>
          {domToReact(domNode.children, {
            replace: (cNode) => replaceNode(cNode, isInsideFAQ)
          })}
        </ScrollRevealBlock>
      );
    }

    // Interactive Tabs Mockup outer container frame
    if (className.includes('framer-wk89vv')) {
      const props = cleanProps(domNode.attribs);
      props.style = props.style || {};
      props.style.borderRadius = '36px';
      props.style.borderTopLeftRadius = '36px';
      props.style.borderTopRightRadius = '36px';
      return (
        <div {...props}>
          {domToReact(domNode.children, {
            replace: (cNode) => replaceNode(cNode, isInsideFAQ)
          })}
        </div>
      );
    }

    // Hero browser mockup: live Nacew moves it down at scrollY * 0.20 so it sinks behind the grass.
    if (className.includes('framer-rE0XJ')) {
      const props = cleanProps(domNode.attribs);
      props.className = (props.className || '')
        .replace('framer-v-dqdt72', 'framer-v-1htl2y6')
        .replace('framer-v-ke4hck', 'framer-v-1htl2y6');
      props['data-framer-name'] = 'Variant 3';

      props.style = props.style || {};
      props.style.borderRadius = '36px';
      props.style.borderTopLeftRadius = '36px';
      props.style.borderTopRightRadius = '36px';

      return (
        <ParallaxElement factor={0.2} {...props}>
          <SpatialMockup />
        </ParallaxElement>
      );
    }

    // Background far layer (framer-u991jm): live ratio is scrollY * 0.31.
    if (className.includes('framer-u991jm') || domNode.attribs['data-framer-name'] === 'background far') {
      const props = cleanProps(domNode.attribs);
      const options = {
        replace: (childNode) => replaceNode(childNode, isInsideFAQ)
      };

      return (
        <ParallaxElement factor={0.31} {...props}>
          {domToReact(domNode.children, options)}
        </ParallaxElement>
      );
    }

    // Mid landscape layer (framer-f7ktf5): live ratio is scrollY * 0.17.
    if (className.includes('framer-f7ktf5') || domNode.attribs['data-framer-name'] === 'background') {
      const props = cleanProps(domNode.attribs);
      const options = {
        replace: (childNode) => replaceNode(childNode, isInsideFAQ)
      };

      return (
        <ParallaxElement factor={0.17} {...props}>
          {domToReact(domNode.children, options)}
        </ParallaxElement>
      );
    }

    // Hero foreground layer (framer-13cc0rb): front brush layer over the mockup.
    if (className.includes('framer-13cc0rb') || domNode.attribs['data-framer-name'] === 'foreground') {
      return <HeroForegroundTreesLayer domNode={domNode} />;
    }

    // Bottom tree layer sits above the hero background and fades into the dark page.
    if (className.includes('framer-1p8lytk')) {
      return <HeroBottomTreesLayer domNode={domNode} />;
    }

    // 3. Make Features Tab Section Interactive
    if (className.includes('framer-f8ai71-container')) {
      return <InteractiveFeaturesSection domNode={domNode} replaceNode={replaceNode} />;
    }

    if (
      className.includes('framer-X2hsG') &&
      (className.includes('framer-v-yso0fx') || className.includes('framer-v-1q876jk'))
    ) {
      return <FAQCategoryTab domNode={domNode} replaceNode={replaceNode} />;
    }

    // 4. Identify if this node has an appearance / animation state
    const styleStr = domNode.attribs.style || '';
    const hasOpacityHidden = styleStr.includes('opacity:0') ||
      styleStr.includes('opacity:0.001') ||
      styleStr.includes('opacity: 0') ||
      styleStr.includes('opacity: 0.001');

    const isContainer = className.includes('-container');

    // We should animate it on scroll if:
    // - It has an explicit appear ID
    // - OR it is a framer container that is initially hidden (has opacity: 0/0.001)
    // - OR it has a translate/scale transform and is initially hidden
    const hasTransform = styleStr.includes('translate') || styleStr.includes('scale') || styleStr.includes('rotate');
    const shouldAnimate = !isInsideFAQ && (
      hasAppearId !== undefined ||
      (hasOpacityHidden && (isContainer || hasTransform))
    );

    if (shouldAnimate) {
      const props = cleanProps(domNode.attribs);

      // Extract transform offsets from inline style string to match live site exactly
      let yOffset = 0;
      let xOffset = 0;
      let scaleOffset = 1;
      let rotateOffset = 0;

      if (styleStr) {
        const matchY = styleStr.match(/translateY\(([-+]?\d*\.?\d+)(px|%|em|rem)?\)/);
        if (matchY) yOffset = parseFloat(matchY[1]);

        const matchX = styleStr.match(/translateX\(([-+]?\d*\.?\d+)(px|%|em|rem)?\)/);
        if (matchX) xOffset = parseFloat(matchX[1]);

        const matchScale = styleStr.match(/scale\(([-+]?\d*\.?\d+)\)/);
        if (matchScale) scaleOffset = parseFloat(matchScale[1]);

        const matchRotate = styleStr.match(/rotate\(([-+]?\d*\.?\d+)deg\)/);
        if (matchRotate) rotateOffset = parseFloat(matchRotate[1]);
      }

      // Default offsets if none found but appear ID exists
      if (yOffset === 0 && xOffset === 0 && scaleOffset === 1 && rotateOffset === 0 && hasAppearId) {
        yOffset = 30; // standard slide up
      }

      // Extract stagger delay from appear ID if it has an index (e.g. "1wreg0p-1" -> index 1)
      let delay = 0;
      if (hasAppearId) {
        const matchIndex = hasAppearId.match(/-(\d+)$/);
        if (matchIndex) {
          const index = parseInt(matchIndex[1], 10);
          delay = index * 0.08; // 80ms stagger delay per item
        }
      }

      // Clean static style properties so Framer Motion controls them
      if (props.style) {
        delete props.style.opacity;
        delete props.style.transform;
        delete props.style.willChange;
      }

      const initial = { opacity: 0 };
      if (yOffset !== 0) initial.y = yOffset;
      if (xOffset !== 0) initial.x = xOffset;
      if (scaleOffset !== 1) initial.scale = scaleOffset;
      if (rotateOffset !== 0) initial.rotate = rotateOffset;

      const whileInView = { opacity: 1 };
      if (yOffset !== 0) whileInView.y = 0;
      if (xOffset !== 0) whileInView.x = 0;
      if (scaleOffset !== 1) whileInView.scale = 1;
      if (rotateOffset !== 0) whileInView.rotate = 0;

      const options = {
        replace: (childNode) => replaceNode(childNode, isInsideFAQ)
      };

      // Framer's signature fluid bounce spring transition
      const transition = {
        type: "spring",
        stiffness: 90,
        damping: 20,
        mass: 0.8,
        delay: delay
      };

      return (
        <motion.div
          initial={initial}
          whileInView={whileInView}
          viewport={{ once: true, margin: "-120px" }}
          transition={transition}
          {...props}
        >
          {domToReact(domNode.children, options)}
        </motion.div>
      );
    }

    // 5. For any other element with opacity: 0 / 0.001 (e.g. static hidden FAQ texts),
    // we must strip the opacity style so it can be controlled by parent or rendered visible.
    if (hasOpacityHidden) {
      const props = cleanProps(domNode.attribs);
      if (props.style) {
        delete props.style.opacity;
        delete props.style.transform;
        delete props.style.willChange;
      }

      const Tag = domNode.name;
      const options = {
        replace: (childNode) => replaceNode(childNode, isInsideFAQ)
      };
      return (
        <Tag {...props}>
          {domNode.children && domNode.children.length > 0 ? domToReact(domNode.children, options) : null}
        </Tag>
      );
    }

    // 6. Make FAQ Accordions Interactive
    if (domNode.attribs.class && domNode.attribs.class.includes('framer-qvmngs')) {
      return <InteractiveFAQItem domNode={domNode} replaceNode={replaceNode} />;
    }

    // 7. Hero landscape image sources: preserve Framer's dimensions/object-fit,
    // only swap the asset to Nacew's matched cut.
    const heroLayerAsset = domNode.name === 'img' ? getHeroLayerAsset(domNode.attribs) : null;
    if (heroLayerAsset) {
      const props = applyHeroLayerAsset(cleanProps(domNode.attribs), heroLayerAsset);
      return <img {...props} />;
    }

    // 8. General fall-through style cleaning to fix all broken React camelCased CSS variables
    if (domNode.attribs.style) {
      const props = cleanProps(domNode.attribs);
      const Tag = domNode.name;
      const options = {
        replace: (childNode) => replaceNode(childNode, isInsideFAQ)
      };
      return (
        <Tag {...props}>
          {domNode.children && domNode.children.length > 0 ? domToReact(domNode.children, options) : null}
        </Tag>
      );
    }
  };

  const options = {
    replace: (domNode) => replaceNode(domNode, false)
  };

  return (
    <HeroStateProvider>
      {parse(htmlString, options)}
    </HeroStateProvider>
  );
}
