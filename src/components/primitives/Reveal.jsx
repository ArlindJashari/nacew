// Reveal — declarative replacement for Framer's generic appear animation. An
// element that ships with opacity:0 + a transform offset is hidden initially,
// then springs into place the first time it scrolls into view. This is the
// primitive that lets a converted section drop its `opacity:0` markup without
// the content staying invisible.
//
// Defaults mirror the original appear behavior: spring (stiffness 90, damping 20,
// mass 0.8), viewport once with a -120px margin, and a standard 30px upward
// slide when no explicit offset is given.
import { motion } from 'framer-motion';

export default function Reveal({
  as = 'div',
  y = 30,
  x = 0,
  scale = 1,
  rotate = 0,
  delay = 0,
  once = true,
  margin = '-120px',
  style,
  children,
  ...props
}) {
  const Motion = motion[as] || motion.div;

  const initial = { opacity: 0 };
  if (y) initial.y = y;
  if (x) initial.x = x;
  if (scale !== 1) initial.scale = scale;
  if (rotate) initial.rotate = rotate;

  const inView = { opacity: 1 };
  if (y) inView.y = 0;
  if (x) inView.x = 0;
  if (scale !== 1) inView.scale = 1;
  if (rotate) inView.rotate = 0;

  return (
    <Motion
      initial={initial}
      whileInView={inView}
      viewport={{ once, margin }}
      transition={{ type: 'spring', stiffness: 90, damping: 20, mass: 0.8, delay }}
      style={style}
      {...props}
    >
      {children}
    </Motion>
  );
}
