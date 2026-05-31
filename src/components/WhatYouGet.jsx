import { InlineIcon, ScrollRevealBlock } from './primitives';

const imageStyle = {
  display: 'block',
  width: '100%',
  height: '100%',
  borderRadius: 'inherit',
  cornerShape: 'inherit',
  objectPosition: 'center',
  objectFit: 'cover',
};

const imageWrapperStyle = {
  position: 'absolute',
  borderRadius: 'inherit',
  cornerShape: 'inherit',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};

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

const cardChipStyle = {
  '--1x5nw16': '0px',
  '--border-bottom-width': '0px',
  '--border-color': 'var(--token-aecd04de-bd30-4743-90e2-2b56d3d58e1b, rgb(20, 35, 50))',
  '--border-left-width': '0px',
  '--border-right-width': '0px',
  '--border-style': 'solid',
  '--border-top-width': '0px',
  backgroundColor: 'var(--token-47679c26-af3f-4cd0-91b2-530be918763e, rgba(255, 255, 255, 0))',
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

const cardChipTextWrapStyle = {
  ...chipTextWrapStyle,
  '--variable-reference-Dh_X3w3jZ-m54zGBZ4w': 'var(--token-c6de8ea4-3684-4c2f-917e-fc3d1879d6b0, rgb(213, 224, 232))',
};

const chipTextStyle = {
  '--framer-text-alignment': 'center',
  '--framer-text-color': 'var(--extracted-r6o4lv, var(--variable-reference-Dh_X3w3jZ-m54zGBZ4w))',
};

const glowOuterStyle = {
  height: '100%',
  width: '100%',
  position: 'relative',
  borderRadius: '24px 24px 24px 24px',
  overflow: 'hidden',
  background: 'var(--token-ef8ecd6d-5204-4f29-b3b7-2d4dc011513a, rgb(0, 0, 0))',
};

const glowInnerStyle = {
  position: 'absolute',
  inset: 1,
  borderRadius: '23px 23px 23px 23px',
  background: 'var(--token-259d8c78-fccd-4e6b-bbb0-32a9dcab750e, rgba(0, 0, 0, 0.85))',
  pointerEvents: 'none',
};

const cardBackgroundStyle = {
  height: '100%',
  width: '100%',
  position: 'relative',
  borderRadius: '16px 16px 16px 16px',
  overflow: 'hidden',
  background: 'var(--token-aecd04de-bd30-4743-90e2-2b56d3d58e1b, rgba(255, 255, 255, 0.1))',
};

const cardBackgroundInnerStyle = {
  position: 'absolute',
  inset: 1,
  borderRadius: '15px 15px 15px 15px',
  background: 'var(--token-9a0a5818-786e-4389-a1ff-e52b77b8236e, rgba(15, 15, 15, 0.85))',
  pointerEvents: 'none',
};

const cards = [
  {
    id: '1',
    outerClassName: 'framer-d07aw3',
    wrapperClassName: 'framer-4v5d7m',
    backgroundClassName: 'framer-vmy8m0-container',
    copyClassName: 'framer-y97w5y',
    copyOuterClassName: 'framer-1f36miz',
    copyInnerClassName: 'framer-brva0z',
    mediaClassName: 'framer-1r491ug',
    imageClassName: 'framer-1aovpg7',
    chipClassName: 'framer-5aqkc3-container',
    titleClassName: 'framer-kub8y9',
    bodyClassName: 'framer-tts7ao',
    noteClassName: 'framer-7qzzij',
    noteTextClassName: 'framer-nah7gn',
    iconClassName: 'framer-cm8Xu framer-18rly7b',
    chip: 'Your own platform',
    title: 'Software shaped around how you operate.',
    body: 'Your team should not bend to a tool built for thousands of other companies. We map how you actually operate and build one platform around your real processes, approvals, and daily workflows.',
    note: 'Made for your company, not the market average.',
    image: {
      src: 'https://framerusercontent.com/images/n1xVmUcl9Kn3XOvJd3FJe2qdg.webp?lossless=1&width=1064&height=1224',
      srcSet:
        'https://framerusercontent.com/images/n1xVmUcl9Kn3XOvJd3FJe2qdg.webp?scale-down-to=1024&lossless=1&width=1064&height=1224 890w,https://framerusercontent.com/images/n1xVmUcl9Kn3XOvJd3FJe2qdg.webp?lossless=1&width=1064&height=1224 1064w',
      alt: 'Feature section showing connected knowledge sources (Docs, CRM, Help Center) with a chat UI answering a query about a client renewal.',
      sizes:
        '(min-width: 1280px) max((max(min(min(100vw, 1600px) - 80px, 1080px), 1px) - 16px) / 2, 1px), (min-width: 810px) and (max-width: 1279.98px) max((max(min(min(100vw, 1600px) - 80px, 720px), 1px) - 16px) / 2, 1px), (max-width: 809.98px) max(max(min(min(100vw, 1600px) - 48px, 1080px), 1px) - 24px, 1px)',
    },
  },
  {
    id: '2',
    outerClassName: 'framer-1wb6mxc',
    wrapperClassName: 'framer-1i8fjqv',
    backgroundClassName: 'framer-bzlswo-container',
    copyClassName: 'framer-108h96l',
    mediaClassName: 'framer-rk65ng',
    copyOuterClassName: 'framer-1bto63g',
    copyInnerClassName: 'framer-7cybj7',
    textWrapClassName: 'framer-17mjhvl',
    imageClassName: 'framer-1m0pk4b',
    chipClassName: 'framer-15427xr-container',
    titleClassName: 'framer-1dbb936',
    bodyClassName: 'framer-11ikhzz',
    noteClassName: 'framer-w9w87w',
    noteTextClassName: 'framer-10gdj2t',
    iconClassName: 'framer-cm8Xu framer-1w8bbox',
    chip: 'Long-term savings',
    title: 'Replace the drag of endless subscriptions.',
    body: 'Instead of paying every month for many disconnected tools, you invest once in a single custom platform that replaces the systems you rely on most, so owned software becomes a strategic asset.',
    note: 'Less recurring spend. More ownership.',
    image: {
      src: 'https://framerusercontent.com/images/ZvDVx7hlgVHOG7O5kXF7y5tn8.webp?width=1064&height=1224',
      srcSet:
        'https://framerusercontent.com/images/ZvDVx7hlgVHOG7O5kXF7y5tn8.webp?scale-down-to=1024&width=1064&height=1224 890w,https://framerusercontent.com/images/ZvDVx7hlgVHOG7O5kXF7y5tn8.webp?width=1064&height=1224 1064w',
      alt: 'Feature section with a ticket creation modal (assignee, priority, summary fields) illustrating prompt-to-action workflows.',
      sizes:
        '(min-width: 1280px) max((max(min(min(100vw, 1600px) - 80px, 1080px), 1px) - 16px) / 2, 1px), (min-width: 810px) and (max-width: 1279.98px) max((max(min(min(100vw, 1600px) - 80px, 720px), 1px) - 16px) / 2, 1px), (max-width: 809.98px) max(max(min(min(100vw, 1600px) - 48px, 1080px), 1px) - 16px, 1px)',
    },
  },
  {
    id: '3',
    outerClassName: 'framer-1nlqg8s',
    wrapperClassName: 'framer-tde7sf',
    backgroundClassName: 'framer-1gichqc-container',
    copyClassName: 'framer-1in2wzs',
    copyOuterClassName: 'framer-1cxnmmm',
    copyInnerClassName: 'framer-vdouej',
    textWrapClassName: 'framer-h81eow',
    mediaClassName: 'framer-1cmuf0h',
    imageClassName: 'framer-yxhp5q',
    chipClassName: 'framer-12w4yqv-container',
    titleClassName: 'framer-c2igiu',
    bodyClassName: 'framer-19gjaep',
    noteClassName: 'framer-1qtsckt',
    noteTextClassName: 'framer-wzsvb4',
    iconClassName: 'framer-cm8Xu framer-1au7kpr',
    chip: 'Design and development',
    title: 'From first idea to launch.',
    body: 'Nacew handles research, product planning, UX and UI design, frontend and backend development, integrations, testing, and deployment so your idea ships as a real, usable product.',
    note: 'One partner for the entire product journey.',
    image: {
      src: 'https://framerusercontent.com/images/OkFHRTU6rnFb5o15ue6pN5eCMw.webp?width=1064&height=1224',
      srcSet:
        'https://framerusercontent.com/images/OkFHRTU6rnFb5o15ue6pN5eCMw.webp?scale-down-to=1024&width=1064&height=1224 890w,https://framerusercontent.com/images/OkFHRTU6rnFb5o15ue6pN5eCMw.webp?width=1064&height=1224 1064w',
      alt: 'Feature section displaying a trends dashboard with billing and follow-up percentages and weekly insight bullets.',
      sizes:
        '(min-width: 1280px) max((max(min(min(100vw, 1600px) - 80px, 1080px), 1px) - 16px) / 2, 1px), (min-width: 810px) and (max-width: 1279.98px) max((max(min(min(100vw, 1600px) - 80px, 720px), 1px) - 16px) / 2, 1px), (max-width: 809.98px) max(max(min(min(100vw, 1600px) - 48px, 1080px), 1px) - 16px, 1px)',
    },
    floatingImage: {
      src: 'https://framerusercontent.com/images/db23ayI3rOkeqix4LeWzkvNJWfk.webp?width=480&height=604',
      srcSet: 'https://framerusercontent.com/images/db23ayI3rOkeqix4LeWzkvNJWfk.webp?width=480&height=604 480w',
      sizes: '(min-width: 1280px) 240px, (min-width: 810px) and (max-width: 1279.98px) 240px, (max-width: 809.98px) 240px',
    },
  },
];

function Chip({ children, containerClassName, variant = 'section' }) {
  const isCard = variant === 'card';

  return (
    <ScrollRevealBlock className={containerClassName}>
      <a
        className="framer-johFn framer-knjRQ framer-1uiucns framer-v-1uiucns framer-1dkgg6h"
        data-border="true"
        data-framer-name="Chip"
        style={isCard ? cardChipStyle : sectionChipStyle}
      >
        <div className="framer-10cfw4u" style={chipDotStyle} />
        <div className="framer-1n35c0f" style={{ mask: 'none', WebkitMask: 'none' }}>
          <div
            className="framer-r48zlf"
            data-framer-component-type="RichTextContainer"
            style={isCard ? cardChipTextWrapStyle : chipTextWrapStyle}
          >
            <p className="framer-text framer-styles-preset-1fhxhj6" data-styles-preset="O0790qsZT" dir="auto" style={chipTextStyle}>
              {children}
            </p>
          </div>
        </div>
      </a>
    </ScrollRevealBlock>
  );
}

function StaticGlow({ outer = false }) {
  return (
    <div style={outer ? glowOuterStyle : cardBackgroundStyle}>
      <div data-glow="true" style={{ position: 'absolute', inset: 0, opacity: 0, pointerEvents: 'none' }} />
      <div style={outer ? glowInnerStyle : cardBackgroundInnerStyle} />
    </div>
  );
}

function CardImage({ card, mobile = false }) {
  return (
    <ScrollRevealBlock
      className={card.imageClassName}
      data-framer-name="IMG"
      style={mobile ? { height: 'auto', aspectRatio: '0.869281045751634' } : undefined}
    >
      <div style={imageWrapperStyle} data-framer-background-image-wrapper="true">
        <img
          decoding="async"
          loading="lazy"
          width="1064"
          height="1224"
          sizes={card.image.sizes}
          srcSet={card.image.srcSet}
          src={card.image.src}
          alt={card.image.alt}
          style={imageStyle}
        />
      </div>
      {card.floatingImage ? (
        <div className="framer-1i8m4vs" data-border="true" style={{ willChange: 'transform', opacity: 1, transform: 'translateY(120px)' }}>
          <div style={imageWrapperStyle} data-framer-background-image-wrapper="true">
            <img
              decoding="async"
              loading="lazy"
              width="480"
              height="604"
              sizes={card.floatingImage.sizes}
              srcSet={card.floatingImage.srcSet}
              src={card.floatingImage.src}
              alt=""
              style={imageStyle}
            />
          </div>
        </div>
      ) : null}
    </ScrollRevealBlock>
  );
}

function CardCopy({ card }) {
  const content = (
    <>
      <div className="ssr-variant">
        <Chip containerClassName={card.chipClassName} variant="card">
          {card.chip}
        </Chip>
      </div>
      <div className={card.copyInnerClassName}>
        <ScrollRevealBlock className={card.titleClassName} data-framer-component-type="RichTextContainer">
          <h4 className="framer-text framer-styles-preset-14zqc8e" data-styles-preset="gk3iglzUb" dir="auto">
            {card.title}
          </h4>
        </ScrollRevealBlock>
        <ScrollRevealBlock className={card.bodyClassName} data-framer-component-type="RichTextContainer">
          <p className="framer-text framer-styles-preset-1fhxhj6" data-styles-preset="O0790qsZT" dir="auto">
            {card.body}
          </p>
        </ScrollRevealBlock>
      </div>
      <ScrollRevealBlock className={card.noteClassName}>
        <InlineIcon className={card.iconClassName} name="check" role="presentation" viewBox="0 0 24 24" />
        <div className={card.noteTextClassName} data-framer-component-type="RichTextContainer" style={{ transform: 'none' }}>
          <p className="framer-text framer-styles-preset-1fhxhj6" data-styles-preset="O0790qsZT" dir="auto">
            {card.note}
          </p>
        </div>
      </ScrollRevealBlock>
    </>
  );

  if (card.textWrapClassName) {
    return <div className={card.textWrapClassName}>{content}</div>;
  }

  return content;
}

function FeatureCard({ card }) {
  const imageVariants = (
    <div className={card.mediaClassName} data-border="true">
      <div className="ssr-variant hidden-nzvz5l">
        <CardImage card={card} />
      </div>
      <div className="ssr-variant hidden-3job37 hidden-kj696b">
        <CardImage card={card} mobile />
      </div>
    </div>
  );

  const text = (
    <div className={card.copyOuterClassName}>
      <CardCopy card={card} />
    </div>
  );

  return (
    <div className={card.outerClassName} data-framer-name="1" id={card.id} style={card.id === '1' ? undefined : { willChange: 'transform', opacity: 1, transform: 'none' }}>
      {card.id === '1' ? (
        <div className="framer-wmlu8b-container">
          <StaticGlow outer />
        </div>
      ) : null}
      <div className={card.wrapperClassName} data-framer-name="Wrapper" style={card.id === '1' ? { willChange: 'transform', opacity: 1, transform: 'none' } : undefined}>
        <div className={card.backgroundClassName}>
          <StaticGlow />
        </div>
        <div className={card.copyClassName} data-framer-name="Copy">
          {card.id === '2' ? (
            <>
              {imageVariants}
              {text}
            </>
          ) : (
            <>
              {text}
              {imageVariants}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function WhatYouGet() {
  return (
    <section className="framer-fdt3dq" data-border="true" data-framer-name="About" id="what-you-get">
      <div className="framer-1t7h2fa" data-framer-name="container">
        <div className="framer-1ch6fzi" id="0">
          <div className="framer-oaivwc">
            <div className="ssr-variant">
              <Chip containerClassName="framer-jcjfyt-container">What you get</Chip>
            </div>
            <ScrollRevealBlock className="framer-u8h805" data-framer-component-type="RichTextContainer">
              <h2 className="framer-text framer-styles-preset-fahce0" data-styles-preset="nZtZfLTSW" dir="auto">
                Set up once. <br className="framer-text" />
                <span
                  style={{
                    '--framer-text-color': 'var(--token-c6de8ea4-3684-4c2f-917e-fc3d1879d6b0, rgba(255, 255, 255, 0.65))',
                  }}
                  className="framer-text"
                >
                  Built around how you work.
                </span>
              </h2>
            </ScrollRevealBlock>
          </div>
          <div className="framer-scwr1z">
            <ScrollRevealBlock className="framer-1y8vpai" data-framer-component-type="RichTextContainer">
              <p className="framer-text framer-styles-preset-prenqk" data-styles-preset="POYKcChXw" dir="auto">
                Move away from endless subscription costs and toward one custom platform that becomes a fully owned asset for your company.
              </p>
            </ScrollRevealBlock>
          </div>
        </div>
        <div className="framer-uc3xgg" data-framer-name="Cards">
          <div className="framer-1jhm9fe hidden-nzvz5l" data-framer-name="Triggers">
            <div className="framer-mn7kj6" data-framer-name="1" id="trig-1" />
            <div className="framer-10bbo8m" data-framer-name="2" id="trig-2" />
            <div className="framer-8cfxw4" data-framer-name="3" id="trig-3" />
          </div>
          {cards.map((card) => (
            <FeatureCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
