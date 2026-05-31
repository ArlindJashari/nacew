// Framer-replacement primitives. These recreate the parser's runtime behavior
// as declarative React so sections can be converted off page.html/the parser
// without losing reveals, parallax, spotlight text, or icons. See
// docs/parser-behavior-map.md for the full behavior -> primitive mapping.

export { default as Reveal } from './Reveal.jsx';
export { default as ScrollRevealBlock } from './ScrollRevealBlock.jsx';
export { default as SpotlightText } from './SpotlightText.jsx';
export { default as ParallaxLayer } from './ParallaxLayer.jsx';
export { default as InlineIcon } from './InlineIcon.jsx';
export { default as SectionShell } from './SectionShell.jsx';
export { default as MotionWrapper } from './MotionWrapper.jsx';
export { ResponsiveVariant, DesktopVariant, MobileVariant } from './ResponsiveVariant.jsx';
