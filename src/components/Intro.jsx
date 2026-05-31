import FallingText from './FallingText';
import { Reveal, SectionShell, SpotlightText } from './primitives';

const introText = [
  {
    className: 'framer-1amyo5f',
    text: 'Your workflows should not be dictated by generic subscription software built for everyone. Most growing companies accumulate disconnected apps that each address only part of the problem and never fit their daily operations.',
  },
  {
    className: 'framer-1es08lj',
    text: 'Nacew helps you replace those disconnected apps with one custom platform, shaped around the way your team plans, tracks, approves, reports, and runs its work every day.',
  },
  {
    className: 'framer-sch1r2',
    text: 'Instead of adapting your company to software built for everyone, we build software around the way you already work — your brand, your data, your processes, your roadmap, and no unnecessary monthly licenses.',
  },
];

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
  '--variable-reference-Dh_X3w3jZ-m54zGBZ4w': 'var(--token-c6de8ea4-3684-4c2f-917e-fc3d1879d6b0, rgb(213, 224, 232))',
  transform: 'none',
};

const chipTextStyle = {
  '--framer-text-alignment': 'center',
  '--framer-text-color': 'var(--extracted-r6o4lv, var(--variable-reference-Dh_X3w3jZ-m54zGBZ4w))',
};

const spotlightStyle = {
  '--framer-link-text-color': 'rgb(0, 153, 255)',
  '--framer-link-text-decoration': 'underline',
};

function IntroChip() {
  return (
    <Reveal className="framer-gihqlc-container" y={24}>
      <a className="framer-johFn framer-knjRQ framer-1uiucns framer-v-1uiucns framer-1dkgg6h" data-border="true" data-framer-name="Chip" style={chipStyle}>
        <div className="framer-10cfw4u" style={chipDotStyle} />
        <div className="framer-1n35c0f" style={{ mask: 'none', WebkitMask: 'none' }}>
          <div className="framer-r48zlf" data-framer-component-type="RichTextContainer" style={chipTextWrapStyle}>
            <p className="framer-text framer-styles-preset-1fhxhj6" data-styles-preset="O0790qsZT" dir="auto" style={chipTextStyle}>
              Approach
            </p>
          </div>
        </div>
      </a>
    </Reveal>
  );
}

function IntroSpotlightText({ item }) {
  return (
    <SpotlightText className={item.className} data-framer-component-type="RichTextContainer" style={spotlightStyle}>
      <h4 className="framer-text framer-styles-preset-14zqc8e" data-styles-preset="gk3iglzUb" dir="auto">
        {item.text}
      </h4>
    </SpotlightText>
  );
}

function FallingTextServices() {
  return (
    <div style={{ width: '100%', maxWidth: '1200px', margin: '48px auto 0 auto', padding: '0 24px' }}>
      <FallingText
        text="Product-Building Development UI/UX UX-Strategy Dashboards CRMs Automations Web-Apps Mobile-Apps Graphics Motion-Design SaaS-Replacement Custom-Code Software-Engineering Branding Marketing"
        highlightWords={['Product-Building', 'Development', 'UI/UX', 'Automations', 'SaaS-Replacement', 'Custom-Code']}
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

export default function Intro() {
  return (
    <SectionShell className="framer-15fllh3" data-border="true" data-framer-name="Intro" id="about" style={{ position: 'relative' }}>
      <div className="framer-12554gz" data-framer-name="content">
        <div className="framer-m3bcqs" id="scroll-1">
          <div className="framer-1gm29ln">
            <div className="ssr-variant">
              <IntroChip />
            </div>
            <div className="framer-1u2ch62">
              <div className="framer-s35umq">
                <div className="framer-1pcb04q" id="intro-1" />
                <div className="framer-nbchg8" id="intro-2" />
                <div className="framer-11wo8rc" id="intro-3" />
                <div className="framer-8smx0p" id="intro4" />
              </div>
              <div className="ssr-variant">
                <div className="framer-wxx824-container">
                  <div className="framer-5Nig4 framer-tz6Zq framer-yn2rmj framer-v-faj971" data-framer-name="Idle">
                    {introText.map((item) => (
                      <IntroSpotlightText key={item.className} item={item} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FallingTextServices />
    </SectionShell>
  );
}
