import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { InlineIcon, ScrollRevealBlock } from './primitives';
import { AppsMockup, AutomationsMockup, CrmMockup, InternalToolsMockup } from './Mockups';

const tabCycleMs = 5200;

const serviceTabs = [
  {
    label: 'Custom CRM',
    wrapperClassName: 'framer-121s4kf',
    containerClassName: 'framer-1yr22n0-container',
    description:
      'Replace rigid CRM subscriptions with a custom platform for leads, clients, pipelines, follow-ups, reporting, and team roles — built exactly for the way your business sells.',
    Mockup: CrmMockup,
  },
  {
    label: 'Internal Tools',
    wrapperClassName: 'framer-1y3azrk',
    containerClassName: 'framer-1d5vmaz-container',
    description:
      'We design and develop internal platforms for operations, project tracking, approvals, inventory, reporting, and team workflows — without forcing your company into generic software.',
    Mockup: InternalToolsMockup,
  },
  {
    label: 'Web & Mobile Apps',
    wrapperClassName: 'framer-1d4vjsq',
    containerClassName: 'framer-1d9v07k-container',
    description:
      'From client portals to SaaS-style platforms, marketplaces, and connected iOS and Android mobile app experiences, Nacew builds premium, scalable digital products tailored to your audience.',
    Mockup: AppsMockup,
  },
  {
    label: 'Automations',
    wrapperClassName: 'framer-1oqw6fp',
    containerClassName: 'framer-bxecf9-container',
    description:
      'We automate workflows between your systems, forms, emails, payments, CRMs, dashboards, and third-party APIs so your team spends less time doing manual work.',
    Mockup: AutomationsMockup,
  },
];

const backgroundClassNames = ['framer-15ixqzl', 'framer-11fd6yx', 'framer-kda24n', 'framer-yfsspb'];

const sectionChipStyle = {
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

const tabTextStyle = {
  '--framer-text-color': 'var(--extracted-r6o4lv, var(--token-792af9ed-53d8-45b2-94fd-014e7edc8f44, rgba(255, 255, 255, 0.8)))',
};

const lineMask = 'linear-gradient(90deg, rgba(0,0,0,0) 0%, rgb(0, 0, 0) 50.49169398299905%, rgba(0,0,0,0) 100%)';

const iconButtonStyle = {
  '--border-bottom-width': '1px',
  '--border-color': 'var(--token-aecd04de-bd30-4743-90e2-2b56d3d58e1b, rgba(255, 255, 255, 0.1))',
  '--border-left-width': '1px',
  '--border-right-width': '1px',
  '--border-style': 'solid',
  '--border-top-width': '1px',
  backdropFilter: 'none',
  backgroundColor: 'var(--token-aecd04de-bd30-4743-90e2-2b56d3d58e1b, rgba(255, 255, 255, 0.1))',
  WebkitBackdropFilter: 'none',
  height: '100%',
  width: '100%',
  borderBottomLeftRadius: 768,
  borderBottomRightRadius: 768,
  borderTopLeftRadius: 768,
  borderTopRightRadius: 768,
};

function Chip({ children }) {
  return (
    <ScrollRevealBlock className="framer-ma0ej6-container">
      <a
        className="framer-johFn framer-knjRQ framer-1uiucns framer-v-1uiucns framer-1dkgg6h"
        data-border="true"
        data-framer-name="Chip"
        style={sectionChipStyle}
      >
        <div className="framer-10cfw4u" style={chipDotStyle} />
        <div className="framer-1n35c0f" style={{ mask: 'none', WebkitMask: 'none' }}>
          <div className="framer-r48zlf" data-framer-component-type="RichTextContainer" style={chipTextWrapStyle}>
            <p className="framer-text framer-styles-preset-1fhxhj6" data-styles-preset="O0790qsZT" dir="auto" style={chipTextStyle}>
              {children}
            </p>
          </div>
        </div>
      </a>
    </ScrollRevealBlock>
  );
}

function StaticFrame({ radius = 72 }) {
  const innerRadius = radius - 1;

  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        position: 'relative',
        borderRadius: `${radius}px ${radius}px ${radius}px ${radius}px`,
        overflow: 'hidden',
        background: 'var(--token-ef8ecd6d-5204-4f29-b3b7-2d4dc011513a, rgb(0, 0, 0))',
      }}
    >
      <div data-glow="true" style={{ position: 'absolute', inset: 0, opacity: 0, pointerEvents: 'none' }} />
      <div
        style={{
          position: 'absolute',
          inset: 1,
          borderRadius: `${innerRadius}px ${innerRadius}px ${innerRadius}px ${innerRadius}px`,
          background: 'var(--token-259d8c78-fccd-4e6b-bbb0-32a9dcab750e, rgba(0, 0, 0, 0.85))',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}

function ProgressLine({ active, tabIndex, progressKey }) {
  return (
    <div className="framer-1wvl2qz" style={{ WebkitMask: lineMask, mask: lineMask, borderRadius: 2, opacity: 1 }}>
      {active ? (
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
      ) : null}
    </div>
  );
}

function FeatureTab({ tab, index, active, progressKey, onSelect }) {
  return (
    <div className={tab.wrapperClassName}>
      <ScrollRevealBlock className={tab.containerClassName}>
        <div
          className={`framer-X2hsG framer-gF1Dm framer-8x98wc ${active ? 'framer-v-8x98wc' : 'framer-v-1lugq31'}`}
          data-framer-name={active ? 'Active' : 'Inactive'}
          data-highlight="true"
          tabIndex={0}
          onClick={() => onSelect(index)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              onSelect(index);
            }
          }}
          style={{
            backgroundColor: active
              ? 'var(--token-feab5ab7-d914-42dd-ad2d-73b5c8596806, rgb(7, 32, 54))'
              : 'var(--token-1ec80be1-93dc-4b5e-a38f-5b1f087c77a5, rgba(255, 255, 255, 0))',
            width: '100%',
            borderRadius: 609,
            opacity: 1,
            overflow: active ? 'clip' : 'visible',
            willChange: 'auto',
            transition: 'background-color 0.35s cubic-bezier(.44,0,.56,1)',
            cursor: 'pointer',
          }}
        >
          <div
            className="framer-arwdi5-container"
            style={{
              opacity: active ? 1 : 0,
              willChange: 'transform',
              transition: 'opacity 0.35s cubic-bezier(.44,0,.56,1)',
            }}
          >
            <StaticFrame radius={72} />
          </div>
          <ProgressLine active={active} tabIndex={index} progressKey={progressKey} />
          <div
            className="framer-1hp9gbb"
            data-framer-component-type="RichTextContainer"
            style={{
              '--extracted-r6o4lv': active
                ? 'var(--token-090acfc6-f7ee-4bf4-9b69-0b15cf2cb187, rgb(255, 243, 240))'
                : 'var(--token-792af9ed-53d8-45b2-94fd-014e7edc8f44, rgba(255, 255, 255, 0.8))',
              '--framer-link-text-color': 'rgb(0, 153, 255)',
              '--framer-link-text-decoration': 'underline',
              transform: 'none',
              transition: 'color 0.35s cubic-bezier(.44,0,.56,1)',
            }}
          >
            <p className="framer-text framer-styles-preset-prenqk" data-styles-preset="POYKcChXw" dir="auto" style={tabTextStyle}>
              {tab.label}
            </p>
          </div>
        </div>
      </ScrollRevealBlock>
    </div>
  );
}

function Gallery({ activeTab }) {
  return (
    <div className="framer-huqvop-container" data-framer-name="Gallery">
      <div className="framer-Koyr7 framer-1go82wr framer-v-udemba" data-framer-name="Active 1" data-highlight="true">
        {serviceTabs.map(({ Mockup }, index) => (
          <motion.div
            key={backgroundClassNames[index]}
            className={backgroundClassNames[index]}
            data-framer-name={`BG ${index + 1}`}
            initial={false}
            animate={{ opacity: activeTab === index ? 1 : 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            style={{
              pointerEvents: activeTab === index ? 'auto' : 'none',
              background: 'none',
              backgroundColor: 'transparent',
              border: 'none',
              boxShadow: 'none',
              borderRadius: '36px',
            }}
          >
            <Mockup isActive={activeTab === index} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ArrowButton({ direction, onClick }) {
  const isLeft = direction === 'left';

  return (
    <div className={isLeft ? 'framer-1apng7n' : 'framer-b1lpai'} data-framer-name="button 3.0" data-highlight="true" onClick={onClick} style={{ cursor: 'pointer' }}>
      <div className={isLeft ? 'framer-5mfhfn-container' : 'framer-n1yqeo-container'}>
        <a
          className="framer-SDNRu framer-knjRQ framer-efr9v5 framer-v-h8s8pe framer-ces3t"
          data-border="true"
          data-framer-name="L Icon"
          data-highlight="true"
          tabIndex={0}
          style={iconButtonStyle}
        >
          <InlineIcon className={`${isLeft ? 'framer-0Vdhp' : 'framer-m6IyR'} framer-12ejusb`} name={isLeft ? 'arrowLeft' : 'arrowRight'} role="presentation" />
        </a>
      </div>
    </div>
  );
}

function InteractiveFeatures({ mobile = false }) {
  const [activeTab, setActiveTab] = useState(0);
  const [progressKey, setProgressKey] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveTab((current) => (current + 1) % serviceTabs.length);
      setProgressKey((current) => current + 1);
    }, tabCycleMs);

    return () => window.clearInterval(id);
  }, []);

  const selectTab = (tabIndex) => {
    setActiveTab(tabIndex);
    setProgressKey((current) => current + 1);
  };

  const shiftTab = (delta) => {
    selectTab((activeTab + delta + serviceTabs.length) % serviceTabs.length);
  };

  return (
    <div
      className={`framer-o6elA framer-gF1Dm framer-1eml1x3 ${mobile ? 'framer-v-k3989t' : 'framer-v-1eml1x3'}`}
      data-framer-name={mobile ? 'Mobile' : 'Variant 1'}
    >
      <div className="framer-1aga6xl">
        {!mobile ? (
          <div className="framer-bxj4ii">
            <div className="framer-1fgb0ay-container">
              <StaticFrame radius={72} />
            </div>
            {serviceTabs.map((tab, index) => (
              <FeatureTab key={tab.label} tab={tab} index={index} active={activeTab === index} progressKey={progressKey} onSelect={selectTab} />
            ))}
          </div>
        ) : null}
        <div className="framer-s53wdq" data-framer-name="Image">
          {!mobile ? (
            <div className="framer-1z06g9z-container">
              <StaticFrame radius={32} />
            </div>
          ) : null}
          <Gallery activeTab={activeTab} />
        </div>
      </div>
      <div className="framer-g7nwep">
        <div className="framer-1w1a2qk">
          {!mobile ? (
            <div className="framer-1ulb7kg-container">
              <StaticFrame radius={72} />
            </div>
          ) : null}
          <div className="framer-1i58yo8" style={mobile ? { willChange: 'transform', transform: 'translateY(-56px)' } : undefined}>
            <div className="framer-1yef0t7" data-framer-component-type="RichTextContainer">
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
                  '--framer-text-color': 'var(--token-792af9ed-53d8-45b2-94fd-014e7edc8f44, rgba(255, 255, 255, 0.8))',
                }}
              >
                {serviceTabs[activeTab].description}
              </motion.p>
            </div>
          </div>
          <div className="framer-13ksk3f">
            <ArrowButton direction="left" onClick={() => shiftTab(-1)} />
            <ArrowButton direction="right" onClick={() => shiftTab(1)} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <section className="framer-95w5xq" data-border="true" data-framer-name="Features" id="services">
      <div className="framer-1x30egh" data-framer-name="content">
        <div className="framer-1hlmmg8">
          <div className="framer-ji2ver">
            <div className="ssr-variant">
              <Chip>Platforms</Chip>
            </div>
            <ScrollRevealBlock className="framer-g4djhd" data-framer-component-type="RichTextContainer">
              <h2 className="framer-text framer-styles-preset-fahce0" data-styles-preset="nZtZfLTSW" dir="auto">
                Custom platforms for the work your team repeats every day.
              </h2>
            </ScrollRevealBlock>
          </div>
          <div className="framer-nbmdq6">
            <div className="framer-p2a3mm">
              <ScrollRevealBlock className="framer-n8lr8h" data-framer-component-type="RichTextContainer">
                <p className="framer-text framer-styles-preset-prenqk" data-styles-preset="POYKcChXw" dir="auto">
                  From approvals and operations to reporting, inventory, project tracking, and internal workflows, Nacew designs software around the exact way your company runs.
                </p>
              </ScrollRevealBlock>
            </div>
          </div>
        </div>
        <div className="ssr-variant hidden-3job37 hidden-nzvz5l">
          <div className="framer-f8ai71-container">
            <InteractiveFeatures />
          </div>
        </div>
        <div className="ssr-variant hidden-kj696b hidden-nzvz5l">
          <div className="framer-f8ai71-container">
            <InteractiveFeatures />
          </div>
        </div>
        <div className="ssr-variant hidden-3job37 hidden-kj696b">
          <div className="framer-f8ai71-container">
            <InteractiveFeatures mobile />
          </div>
        </div>
      </div>
    </section>
  );
}
