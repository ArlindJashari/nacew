// Header - converted from the parser-routed navigation shell into a dedicated
// React component while preserving the existing Framer subtree behavior.
import { useEffect, useState } from 'react';
import { domToReact } from 'html-react-parser';
import { motion } from 'framer-motion';
import { cleanProps } from '../parser/props';
import { renderNacewNavLogo } from '../parser/nodeReplacers';

export default function Header({ domNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollBackdropOpacity, setScrollBackdropOpacity] = useState(0);
  const isDarkSection = scrollBackdropOpacity > 0.32;
  const props = cleanProps(domNode.attribs || {});

  useEffect(() => {
    let frame = null;

    const update = () => {
      frame = null;
      const nextOpacity = Math.max(0, Math.min(1, (window.scrollY - 162) / 645));
      setScrollBackdropOpacity(nextOpacity);
    };

    const onScroll = () => {
      if (frame === null) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, []);

  const options = {
    replace: (childNode) => {
      if (!childNode.attribs) return;

      const childClassName = childNode.attribs.class || '';
      const childProps = cleanProps(childNode.attribs || {});
      const Tag = childNode.name;

      if (childClassName.includes('framer-c26lio')) {
        return renderNacewNavLogo(childNode);
      }

      if (childClassName.includes('framer-6fjk0p-container')) {
        if (childProps.style) {
          delete childProps.style.opacity;
          delete childProps.style.transform;
          delete childProps.style.willChange;
        }

        return (
          <motion.div
            {...childProps}
            animate={{ opacity: scrollBackdropOpacity }}
            transition={{ duration: 0.18, ease: [0.44, 0, 0.56, 1] }}
            style={{ ...childProps.style, opacity: scrollBackdropOpacity }}
          >
            {childNode.children && childNode.children.length > 0 ? domToReact(childNode.children, options) : null}
          </motion.div>
        );
      }

      if (childNode.name === 'nav' && childClassName.includes('framer-KjT5A')) {
        if (childProps.style) {
          delete childProps.style.opacity;
          delete childProps.style.transform;
          delete childProps.style.willChange;
        }

        const isMobileNav = childNode.attribs['data-framer-name'] === 'mobile-top';
        let navClassName = childProps.className || '';
        if (isMobileNav) {
          navClassName = mobileOpen
            ? navClassName
              .replace('framer-v-c2dsud', 'framer-v-xqjeaw')
              .replace('framer-v-1h3d53s', 'framer-v-xqjeaw')
            : navClassName
              .replace('framer-v-xqjeaw', 'framer-v-c2dsud')
              .replace('framer-v-1h3d53s', 'framer-v-c2dsud');
        }

        return (
          <Tag
            {...childProps}
            className={navClassName}
            data-nacew-theme={isDarkSection ? 'dark' : 'light'}
            style={{ ...childProps.style, opacity: 1, transform: 'none' }}
          >
            {childNode.children && childNode.children.length > 0 ? domToReact(childNode.children, options) : null}
          </Tag>
        );
      }

      if (childClassName.includes('framer-1arlgxd-container')) {
        return (
          <div
            {...childProps}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              setMobileOpen((open) => !open);
            }}
            style={{ ...childProps.style, cursor: 'pointer' }}
          >
            {childNode.children && childNode.children.length > 0 ? domToReact(childNode.children, options) : null}
          </div>
        );
      }

      if (childClassName.includes('framer-oG402')) {
        const buttonClassName = mobileOpen
          ? (childProps.className || '').replace('framer-v-1qd1548', 'framer-v-2rnmh5')
          : (childProps.className || '').replace('framer-v-2rnmh5', 'framer-v-1qd1548');

        return (
          <div
            {...childProps}
            className={buttonClassName}
            data-framer-name={mobileOpen ? 'Variant 2' : 'Variant 1'}
            role="button"
            aria-expanded={mobileOpen}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              setMobileOpen((open) => !open);
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                setMobileOpen((open) => !open);
              }
            }}
            style={{ ...childProps.style, cursor: 'pointer', outline: 'none' }}
          >
            {childNode.children && childNode.children.length > 0 ? domToReact(childNode.children, options) : null}
          </div>
        );
      }

      if (childClassName.includes('framer-xwg8km') || childClassName.includes('framer-1e0yqhx')) {
        const isTopLine = childClassName.includes('framer-xwg8km');
        if (childProps.style) delete childProps.style.transform;

        return (
          <motion.div
            {...childProps}
            animate={{ rotate: mobileOpen ? (isTopLine ? 45 : -45) : 0 }}
            transition={{ duration: 0.34, ease: [0.44, 0, 0.56, 1] }}
            style={{ ...childProps.style, transformOrigin: '50% 50%' }}
          />
        );
      }

      if (childClassName.includes('framer-9t1ray')) {
        if (childProps.style) {
          delete childProps.style.opacity;
          delete childProps.style.transform;
          delete childProps.style.willChange;
        }

        return (
          <motion.div
            {...childProps}
            initial={false}
            animate={{ opacity: mobileOpen ? 1 : 0, height: mobileOpen ? 'auto' : 1 }}
            transition={{ duration: 0.36, ease: [0.44, 0, 0.56, 1] }}
            style={{
              ...childProps.style,
              overflow: 'clip',
              pointerEvents: mobileOpen ? 'auto' : 'none',
            }}
          >
            {childNode.children && childNode.children.length > 0 ? domToReact(childNode.children, options) : null}
          </motion.div>
        );
      }

      if (childNode.name === 'a' && childProps.href?.startsWith('./#')) {
        return (
          <a
            {...childProps}
            onClick={() => setMobileOpen(false)}
          >
            {childNode.children && childNode.children.length > 0 ? domToReact(childNode.children, options) : null}
          </a>
        );
      }

      return (
        <Tag {...childProps}>
          {childNode.children && childNode.children.length > 0 ? domToReact(childNode.children, options) : null}
        </Tag>
      );
    },
  };

  if (props.style) {
    delete props.style.opacity;
    delete props.style.transform;
    delete props.style.willChange;
  }

  return (
    <motion.div
      {...props}
      initial={{ opacity: 0, y: -36 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 90, damping: 20, mass: 0.8 }}
      data-nacew-theme={isDarkSection ? 'dark' : 'light'}
      style={{ ...props.style, opacity: 1, transform: 'none', willChange: 'transform' }}
    >
      {domNode.children && domNode.children.length > 0 ? domToReact(domNode.children, options) : null}
    </motion.div>
  );
}
