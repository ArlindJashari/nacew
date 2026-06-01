import { motion } from 'framer-motion';

export default function ScrollRevealBlock({ children, delay = 0, ...props }) {
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
