import { InlineIcon, ScrollRevealBlock } from './primitives';

const SIGNUP_URL = 'https://auth.nacew.com/signup';

const features = [
  { label: 'UX/UI design', className: 'framer-1xkhxj3-container' },
  { label: 'Web app development', className: 'framer-12cngn1-container' },
  { label: 'Mobile app development', className: 'framer-1a2v11o-container' },
  { label: 'Backend development', className: 'framer-1jabnx9-container' },
  { label: 'CRM and dashboards', className: 'framer-1k05fhn-container' },
  { label: 'API & workflow automations', className: 'framer-13fxn33-container' },
  { label: 'Maintenance and support', className: 'framer-gsr9uq-container' },
];

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

const ctaStyle = {
  '--border-bottom-width': '1px',
  '--border-color': 'var(--token-aecd04de-bd30-4743-90e2-2b56d3d58e1b, rgba(255, 255, 255, 0.1))',
  '--border-left-width': '1px',
  '--border-right-width': '1px',
  '--border-style': 'solid',
  '--border-top-width': '1px',
  backdropFilter: 'blur(5px)',
  backgroundColor: 'var(--token-aecd04de-bd30-4743-90e2-2b56d3d58e1b, rgba(255, 255, 255, 0.1))',
  WebkitBackdropFilter: 'blur(5px)',
  borderBottomLeftRadius: 768,
  borderBottomRightRadius: 768,
  borderTopLeftRadius: 768,
  borderTopRightRadius: 768,
};

const ctaTextWrapStyle = {
  '--extracted-r6o4lv': 'var(--token-090acfc6-f7ee-4bf4-9b69-0b15cf2cb187, rgb(255, 243, 240))',
  '--framer-link-text-color': 'rgb(0, 153, 255)',
  '--framer-link-text-decoration': 'underline',
  transform: 'none',
};

const ctaTextStyle = {
  '--framer-text-color': 'var(--extracted-r6o4lv, var(--token-090acfc6-f7ee-4bf4-9b69-0b15cf2cb187, rgb(255, 243, 240)))',
};

const checkStyle = {
  '--19tqfgx': '20px 0px 20px 0px',
  '--border-bottom-width': '1px',
  '--border-color': 'var(--token-aecd04de-bd30-4743-90e2-2b56d3d58e1b, rgba(255, 255, 255, 0.1))',
  '--border-left-width': '0px',
  '--border-right-width': '0px',
  '--border-style': 'solid',
  '--border-top-width': '0px',
  width: '100%',
};

const checkLightStyle = {
  backgroundColor: 'var(--token-e3ce13ec-ba16-45a8-a084-ab9af1d723e8, rgba(255, 255, 255, 0.25))',
  borderBottomLeftRadius: 880,
  borderBottomRightRadius: 880,
  borderTopLeftRadius: 880,
  borderTopRightRadius: 880,
};

const checkIconStyle = {
  '--1ww558a': 2,
  '--4rxgx6': 'var(--token-090acfc6-f7ee-4bf4-9b69-0b15cf2cb187, rgb(255, 243, 240))',
};

function Chip() {
  return (
    <ScrollRevealBlock className="framer-ot8me6-container">
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
              Pricing
            </p>
          </div>
        </div>
      </a>
    </ScrollRevealBlock>
  );
}

function StaticFrame({ variant }) {
  const isOuter = variant === 'outer';
  const radius = isOuter ? 24 : 16;
  const innerRadius = radius - 1;
  const background = isOuter
    ? 'var(--token-ef8ecd6d-5204-4f29-b3b7-2d4dc011513a, rgb(0, 0, 0))'
    : 'var(--token-aecd04de-bd30-4743-90e2-2b56d3d58e1b, rgba(255, 255, 255, 0.1))';
  const innerBackground = isOuter
    ? 'var(--token-259d8c78-fccd-4e6b-bbb0-32a9dcab750e, rgba(0, 0, 0, 0.85))'
    : 'var(--token-9a0a5818-786e-4389-a1ff-e52b77b8236e, rgba(15, 15, 15, 0.85))';

  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        position: 'relative',
        borderRadius: `${radius}px ${radius}px ${radius}px ${radius}px`,
        overflow: 'hidden',
        background,
      }}
    >
      <div data-glow="true" style={{ position: 'absolute', inset: 0, opacity: 0, pointerEvents: 'none' }} />
      <div
        style={{
          position: 'absolute',
          inset: 1,
          borderRadius: `${innerRadius}px ${innerRadius}px ${innerRadius}px ${innerRadius}px`,
          background: innerBackground,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}

function PricingCta() {
  return (
    <ScrollRevealBlock className="framer-tyx0kv-container">
      <a
        className="framer-SDNRu framer-knjRQ framer-efr9v5 framer-v-ycy7bl framer-ces3t"
        data-border="true"
        data-framer-name="M Secondary"
        data-highlight="true"
        href={SIGNUP_URL}
        rel="noopener"
        tabIndex={0}
        style={ctaStyle}
      >
        <div className="framer-ynqlit" data-framer-component-type="RichTextContainer" style={ctaTextWrapStyle}>
          <p className="framer-text framer-styles-preset-1fhxhj6" data-styles-preset="O0790qsZT" dir="auto" style={ctaTextStyle}>
            Start your platform
          </p>
        </div>
      </a>
    </ScrollRevealBlock>
  );
}

function CheckFeature({ feature }) {
  return (
    <div className={feature.className}>
      <div className="framer-rCilx framer-knjRQ framer-fiup9b framer-v-1dm466k" data-framer-name="Check" data-border="true" style={checkStyle}>
        <div className="framer-ju1rr1-container">
          <div className="framer-pg0ED framer-s8uxi framer-v-1766y2z" data-framer-name="Check Light" style={checkLightStyle}>
            <InlineIcon className="framer-MO1L3 framer-pnom0e" name="check" role="presentation" viewBox="0 0 24 24" style={checkIconStyle} />
          </div>
        </div>
        <div className="framer-1gbof3v">
          <div className="framer-1hcjtho" data-framer-name="Check Feature">
            <div
              className="framer-1b515n"
              data-framer-name="Feature"
              data-framer-component-type="RichTextContainer"
              style={{ '--framer-paragraph-spacing': '18px', transform: 'none' }}
            >
              <p className="framer-text framer-styles-preset-1fhxhj6" data-styles-preset="O0790qsZT" dir="auto">
                {feature.label}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Checklist({ mobile = false }) {
  return (
    <ScrollRevealBlock className="framer-l6jfy1" delay={0.08}>
      {features.map((feature) => (
        mobile ? (
          <CheckFeature key={feature.label} feature={feature} />
        ) : (
          <div className="ssr-variant hidden-3job37" key={`${feature.label}-desktop`}>
            <CheckFeature feature={feature} />
          </div>
        )
      ))}
      {!mobile
        ? features.map((feature) => (
          <div className="ssr-variant hidden-kj696b" key={`${feature.label}-tablet`}>
            <CheckFeature feature={feature} />
          </div>
        ))
        : null}
    </ScrollRevealBlock>
  );
}

function PricingCard({ mobile = false }) {
  return (
    <div className="framer-1rxne4r" data-border={mobile ? 'true' : undefined}>
      <div className="framer-aiu7th-container hidden-nzvz5l">
        <StaticFrame variant="outer" />
      </div>
      <div className="framer-qmu6ee-container hidden-nzvz5l">
        <StaticFrame variant="inner" />
      </div>
      <div className="framer-hxosyk">
        <div className="framer-19xoaf7">
          <div className="framer-1cnh3t5">
            <div className="framer-xbdm29" data-border="true">
              <ScrollRevealBlock className="framer-1jz7ir7" data-framer-component-type="RichTextContainer">
                <p className="framer-text framer-styles-preset-10qv886" data-styles-preset="z5tYb3Um6" dir="auto">
                  Project-based
                </p>
              </ScrollRevealBlock>
            </div>
            <div className="framer-1qlbkdm">
              <ScrollRevealBlock className="framer-1vcad9w">
                <div className="framer-166tbxb">
                  <div className="framer-1twuswq" data-framer-component-type="RichTextContainer" style={{ transform: 'none' }}>
                    <h4 className="framer-text framer-styles-preset-14zqc8e" data-styles-preset="gk3iglzUb" dir="auto">
                      Built for your workflow
                    </h4>
                  </div>
                  <div className="framer-1bqz8w1" data-framer-component-type="RichTextContainer" style={{ transform: 'none' }}>
                    <p className="framer-text framer-styles-preset-prenqk" data-styles-preset="POYKcChXw" dir="auto">
                      No generic package. No unnecessary features.
                    </p>
                  </div>
                </div>
              </ScrollRevealBlock>
              <ScrollRevealBlock className="framer-1gqqq8r" data-framer-component-type="RichTextContainer">
                <p className="framer-text framer-styles-preset-1fhxhj6" data-styles-preset="O0790qsZT" dir="auto">
                  Every company runs on different workflows, tools, users, and technical requirements. After we learn what you want to replace, what needs to be built, and how it should scale, Nacew gives you a clear, fixed project estimate.
                </p>
              </ScrollRevealBlock>
              <ScrollRevealBlock className="framer-1ux4koz" data-framer-component-type="RichTextContainer">
                <p className="framer-text framer-styles-preset-1fhxhj6" data-styles-preset="O0790qsZT" dir="auto">
                  After launch we can also support your platform with ongoing maintenance, improvements, hosting guidance, security updates, and new feature work.
                </p>
              </ScrollRevealBlock>
            </div>
          </div>
          {mobile ? <PricingCta /> : <div className="ssr-variant"><PricingCta /></div>}
        </div>
        <Checklist mobile={mobile} />
      </div>
    </div>
  );
}

export default function Pricing() {
  return (
    <section className="framer-idr5wb" data-border="true" data-framer-name="Pricing" id="pricing">
      <div className="framer-142wp5r" data-framer-name="content">
        <div className="framer-z5oue5" id="4-3">
          <div className="framer-1wcn51m">
            <div className="ssr-variant">
              <Chip />
            </div>
            <ScrollRevealBlock className="framer-1ju5bf9" data-framer-component-type="RichTextContainer">
              <h2 className="framer-text framer-styles-preset-fahce0" data-styles-preset="nZtZfLTSW" dir="auto">
                Build once. Own the system.
              </h2>
            </ScrollRevealBlock>
          </div>
        </div>
        <div className="ssr-variant hidden-nzvz5l">
          <PricingCard />
        </div>
        <div className="ssr-variant hidden-3job37 hidden-kj696b">
          <PricingCard mobile />
        </div>
      </div>
    </section>
  );
}
