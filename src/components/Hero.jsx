import { useContext } from 'react';
import { ParallaxLayer, Reveal, SectionShell } from './primitives';
import SpatialMockup from './SpatialMockup';
import { HeroTabContext } from './HeroTabContext';

const SIGNUP_URL = 'https://auth.nacew.com/signup';

const imageWrapperStyle = {
  position: 'absolute',
  borderRadius: 'inherit',
  cornerShape: 'inherit',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};

const imageStyle = {
  display: 'block',
  width: '100%',
  height: '100%',
  borderRadius: 'inherit',
  cornerShape: 'inherit',
  objectPosition: 'center',
  objectFit: 'cover',
};

const heroChipStyle = {
  '--1x5nw16': '4px 12px 4px 12px',
  '--border-bottom-width': '1px',
  '--border-color': 'var(--token-aecd04de-bd30-4743-90e2-2b56d3d58e1b, rgb(20, 35, 50))',
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

const heroChipTextWrapStyle = {
  '--extracted-r6o4lv': 'var(--variable-reference-Dh_X3w3jZ-m54zGBZ4w)',
  '--variable-reference-Dh_X3w3jZ-m54zGBZ4w': 'var(--token-792af9ed-53d8-45b2-94fd-014e7edc8f44, rgba(255, 255, 255, 0.8))',
  transform: 'none',
};

const heroChipTextStyle = {
  '--framer-text-alignment': 'center',
  '--framer-text-color': 'var(--extracted-r6o4lv, var(--variable-reference-Dh_X3w3jZ-m54zGBZ4w))',
};

const primaryButtonStyle = {
  '--border-bottom-width': '1px',
  '--border-color': 'var(--token-090acfc6-f7ee-4bf4-9b69-0b15cf2cb187, rgb(255, 243, 240))',
  '--border-left-width': '1px',
  '--border-right-width': '1px',
  '--border-style': 'solid',
  '--border-top-width': '1px',
  backdropFilter: 'none',
  backgroundColor: 'var(--token-792af9ed-53d8-45b2-94fd-014e7edc8f44, rgba(255, 255, 255, 0.8))',
  WebkitBackdropFilter: 'none',
  borderBottomLeftRadius: 768,
  borderBottomRightRadius: 768,
  borderTopLeftRadius: 768,
  borderTopRightRadius: 768,
};

const primaryButtonTextWrapStyle = {
  '--extracted-r6o4lv': 'var(--token-ef8ecd6d-5204-4f29-b3b7-2d4dc011513a, rgb(1, 16, 29))',
  '--framer-link-text-color': 'rgb(0, 153, 255)',
  '--framer-link-text-decoration': 'underline',
  transform: 'none',
};

const primaryButtonTextStyle = {
  '--framer-text-color': 'var(--extracted-r6o4lv, var(--token-ef8ecd6d-5204-4f29-b3b7-2d4dc011513a, rgb(1, 16, 29)))',
};

const mockupFrameStyle = {
  '--border-bottom-width': '1px',
  '--border-color': 'var(--token-aecd04de-bd30-4743-90e2-2b56d3d58e1b, rgba(255, 255, 255, 0.1))',
  '--border-left-width': '1px',
  '--border-right-width': '1px',
  '--border-style': 'solid',
  '--border-top-width': '1px',
  backdropFilter: 'blur(24px)',
  backgroundColor: 'var(--token-feab5ab7-d914-42dd-ad2d-73b5c8596806, rgba(33, 33, 33, 0.85))',
  WebkitBackdropFilter: 'blur(24px)',
  height: '100%',
  maxWidth: '100%',
  width: '100%',
  borderRadius: '36px',
  borderTopLeftRadius: '36px',
  borderTopRightRadius: '36px',
};

const foregroundLayerStyle = {
  position: 'absolute',
  left: 0,
  right: 'auto',
  bottom: -1,
  width: '100vw',
  maxWidth: 'none',
  aspectRatio: 'auto',
  height: 'clamp(360px, 42vw, 820px)',
  zIndex: 6,
  overflow: 'visible',
  pointerEvents: 'none',
};

const treeImageStyle = {
  display: 'block',
  width: '100%',
  height: 'auto',
  objectFit: 'contain',
  objectPosition: 'center bottom',
  transition: 'opacity 0.6s ease-in-out',
};

const treeOverlayStyle = {
  position: 'absolute',
  left: 0,
  bottom: 0,
  display: 'block',
  width: '100%',
  height: 'auto',
  objectFit: 'contain',
  objectPosition: 'center bottom',
  transition: 'opacity 0.6s ease-in-out',
};

const layers = {
  far: {
    className: 'framer-u991jm',
    name: 'background far',
    factor: 0.31,
    src: '/hero/fora-layer-far.png?v=11',
    width: 2464,
    height: 909,
    sizes:
      '(min-width: 1280px) min(100vw, 1920px), (min-width: 810px) and (max-width: 1279.98px) min(100vw, 1920px), (max-width: 809.98px) calc(min(100vw, 1920px) + 480px)',
  },
  mid: {
    className: 'framer-f7ktf5',
    name: 'background',
    factor: 0.17,
    src: '/hero/fora-layer-mid.png?v=11',
    width: 2464,
    height: 848,
    sizes:
      '(min-width: 1280px) min(100vw, 1920px), (min-width: 810px) and (max-width: 1279.98px) min(100vw, 1920px), (max-width: 809.98px) calc(min(100vw, 1920px) + 304px)',
  },
};

function HeroChip() {
  return (
    <Reveal className="framer-1wreg0p-container" y={24}>
      <a className="framer-johFn framer-knjRQ framer-1uiucns framer-v-1rfskzm framer-1dkgg6h" data-border="true" data-framer-name="No-link" style={heroChipStyle}>
        <div className="framer-1n35c0f" style={{ mask: 'none', WebkitMask: 'none' }}>
          <div className="framer-r48zlf" data-framer-component-type="RichTextContainer" style={heroChipTextWrapStyle}>
            <p className="framer-text framer-styles-preset-1fhxhj6" data-styles-preset="O0790qsZT" dir="auto" style={heroChipTextStyle}>
              Custom internal platforms for teams
            </p>
          </div>
        </div>
      </a>
    </Reveal>
  );
}

function HeroPrimaryButton() {
  return (
    <Reveal className="framer-1b8x4ar-container" y={24}>
      <a
        className="framer-SDNRu framer-knjRQ framer-efr9v5 framer-v-efr9v5 framer-ces3t"
        data-border="true"
        data-framer-name="L Primary"
        data-highlight="true"
        href={SIGNUP_URL}
        rel="noopener"
        tabIndex={0}
        style={primaryButtonStyle}
      >
        <div className="framer-ynqlit" data-framer-component-type="RichTextContainer" style={primaryButtonTextWrapStyle}>
          <p className="framer-text framer-styles-preset-1fhxhj6" data-styles-preset="O0790qsZT" dir="auto" style={primaryButtonTextStyle}>
            Build your custom platform
          </p>
        </div>
      </a>
    </Reveal>
  );
}

function LandscapeLayer({ layer }) {
  const srcSet = [512, 1024, 2048, 2464].map((width) => `${layer.src} ${width}w`).join(',');

  return (
    <ParallaxLayer className={layer.className} data-framer-name={layer.name} factor={layer.factor}>
      <div style={imageWrapperStyle} data-framer-background-image-wrapper="true">
        <img
          decoding="async"
          width={layer.width}
          height={layer.height}
          sizes={layer.sizes}
          srcSet={srcSet}
          src={layer.src}
          alt="Transparent image of grass hills"
          style={imageStyle}
        />
      </div>
    </ParallaxLayer>
  );
}

function HeroMockup({ mobile = false }) {
  const className = mobile
    ? 'framer-rE0XJ framer-knjRQ framer-cqiiB framer-gF1Dm framer-dqdt72 framer-v-1p49zuq'
    : 'framer-rE0XJ framer-knjRQ framer-cqiiB framer-gF1Dm framer-dqdt72 framer-v-dqdt72';

  return (
    <ParallaxLayer
      className={className}
      data-border="true"
      data-framer-name="Variant 3"
      data-highlight={!mobile || undefined}
      factor={0.2}
      style={mockupFrameStyle}
    >
      <SpatialMockup />
    </ParallaxLayer>
  );
}

function ForegroundTreesLayer() {
  const context = useContext(HeroTabContext);
  const activeTab = context ? context.activeTab : 0;
  const isLightBlue = false;
  const isGreen = activeTab === 2 || activeTab === 3;
  const isBlue = activeTab === 0;
  const isRed = activeTab === 1;

  return (
    <ParallaxLayer className="framer-13cc0rb" data-framer-name="foreground" factor={0.08} style={foregroundLayerStyle}>
      <div
        style={{
          position: 'absolute',
          left: '50vw',
          bottom: 0,
          width: 'max(100vw, 960px)',
          transform: 'translateX(-50%)',
        }}
      >
        <img decoding="async" loading="eager" src="/hero/trees/x/light_blue.png" alt="" style={{ ...treeImageStyle, opacity: isLightBlue ? 1 : 0 }} />
        <img decoding="async" loading="eager" src="/hero/trees/x/green.png" alt="" style={{ ...treeOverlayStyle, opacity: isGreen ? 1 : 0 }} />
        <img decoding="async" loading="eager" src="/hero/trees/x/blue.png" alt="" style={{ ...treeOverlayStyle, opacity: isBlue ? 1 : 0 }} />
        <img decoding="async" loading="eager" src="/hero/trees/x/red.png" alt="" style={{ ...treeOverlayStyle, opacity: isRed ? 1 : 0 }} />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: -1,
            height: '46%',
            background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.35) 52%, rgba(0,0,0,1) 100%)',
            zIndex: 10,
          }}
        />
      </div>
    </ParallaxLayer>
  );
}

export default function Hero() {
  return (
    <SectionShell className="framer-x2ps8j" data-border="true" data-framer-name="Hero" id="hero">
      <Reveal className="framer-1ed9fxm" data-framer-name="bg gradient" />
      <div className="ssr-variant">
        <LandscapeLayer layer={layers.far} />
      </div>
      <div className="ssr-variant">
        <LandscapeLayer layer={layers.mid} />
      </div>
      <div className="framer-1i5w2fk" data-framer-name="content">
        <div className="framer-3rmkn8" id="scroll">
          <div className="framer-1e2emgk">
            <div className="framer-mc6oli">
              <div className="framer-1gbackj">
                <div className="framer-1oszaj3">
                  <div className="ssr-variant">
                    <HeroChip />
                  </div>
                </div>
              </div>
              <div className="framer-yb4kbr">
                <Reveal className="framer-1ke5g3l" data-framer-component-type="RichTextContainer" y={24}>
                  <h1 className="framer-text framer-styles-preset-7hjh4k" data-styles-preset="D_X5Z7yDL" dir="auto">
                    Stop renting tools. Build your platform.
                  </h1>
                </Reveal>
                <Reveal className="framer-jzdou5" data-framer-component-type="RichTextContainer" y={24}>
                  <p className="framer-text framer-styles-preset-1fhxhj6" data-styles-preset="O0790qsZT" dir="auto">
                    We design and build custom internal platforms for operations, approvals, reporting, inventory, and team workflows — built around your business, not someone else's subscription template.
                  </p>
                </Reveal>
              </div>
            </div>
            <div className="framer-1tfsgnk">
              <div className="ssr-variant">
                <HeroPrimaryButton />
              </div>
            </div>
          </div>
        </div>
        <div className="ssr-variant hidden-nzvz5l">
          <div className="framer-s69j62-container">
            <HeroMockup />
          </div>
        </div>
        <div className="ssr-variant hidden-3job37 hidden-kj696b">
          <div className="framer-s69j62-container">
            <HeroMockup mobile />
          </div>
        </div>
      </div>
      <div className="ssr-variant">
        <ForegroundTreesLayer />
      </div>
    </SectionShell>
  );
}
