// MotionWrapper — thin framer-motion passthrough that also strips the static
// opacity/transform/will-change that Framer bakes into exported markup (the
// parser does the same before handing control to Framer Motion). Use it when a
// converted element needs custom motion props but no scroll-reveal default.
import { motion } from 'framer-motion';

export default function MotionWrapper({ as = 'div', style, children, ...props }) {
  const Motion = motion[as] || motion.div;
  const cleaned = { ...(style || {}) };
  delete cleaned.opacity;
  delete cleaned.transform;
  delete cleaned.willChange;
  return (
    <Motion style={cleaned} {...props}>
      {children}
    </Motion>
  );
}
