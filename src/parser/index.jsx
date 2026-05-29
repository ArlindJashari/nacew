// Runtime HTML -> React parser. Walks the Framer-exported markup string and
// replaces specific nodes with the interactive components in ./nodeReplacers,
// ./animations and the spatial mockup (extracted verbatim — logic unchanged).
import parse, { domToReact } from 'html-react-parser';
import { motion } from 'framer-motion';
import { cleanProps } from './props';
import { ParallaxElement, ScrollSpotlightText, ScrollRevealBlock } from './animations';
import {
  renderNacewNavLogo,
  getHeroLayerAsset,
  applyHeroLayerAsset,
  HeroBottomTreesLayer,
  HeroForegroundTreesLayer,
  InteractiveFAQItem,
  FAQCategoryTab,
  hasSvgUseReference,
  getGlowColor,
  findDataGlowNode,
  getGlowProximity,
  GlowRuntime,
  CheckIconSvg,
  ChevronIconSvg,
  LeftArrowIconSvg,
  RightArrowIconSvg,
  NavigationShell,
  InteractiveFeaturesSection,
  FallingTextServices,
} from './nodeReplacers';
import SpatialMockup from '../components/SpatialMockup';
import { HeroStateProvider } from '../components/HeroTabContext';

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
