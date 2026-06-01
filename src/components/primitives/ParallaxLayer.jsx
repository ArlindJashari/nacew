import { motion, useScroll, useTransform } from 'framer-motion';

export default function ParallaxLayer({ children, factor, ...props }) {
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
