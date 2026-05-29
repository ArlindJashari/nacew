// Reusable Framer-Motion scroll / transform / spring wrapper components
// (extracted verbatim from FramerMotionHTMLParser.jsx — logic unchanged).
import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, animate, useMotionValue } from 'framer-motion';

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

export { ParallaxElement, AnimatedNumber, ScrollSpotlightText, ScrollRevealBlock };
