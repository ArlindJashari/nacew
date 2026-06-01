import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function SpotlightText({ children, ...props }) {
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
