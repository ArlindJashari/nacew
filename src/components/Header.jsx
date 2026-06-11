import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const NAV_LINKS = [
  { label: 'Home', href: '/', desktopClassName: 'framer-n64igo', mobileClassName: 'framer-s3kwg5' },
  { label: 'About Us', href: '/about', desktopClassName: 'framer-14r64j8', mobileClassName: 'framer-19vvauf' },
  { label: 'Platforms', href: '/#why-nacew', desktopClassName: 'framer-uq3nsd', mobileClassName: 'framer-1b71f1s' },
  { label: 'Use Cases', href: '/#what-you-get', desktopClassName: 'framer-2tenf9', mobileClassName: 'framer-1vzos0e' },
];

const CONTACT_URL = 'mailto:contact@nacew.com';

const desktopNavStyle = {
  '--1gxu5kl': '0px 40px 0px 40px',
  '--border-bottom-width': '0px',
  '--border-color': 'rgba(0, 0, 0, 0)',
  '--border-left-width': '0px',
  '--border-right-width': '0px',
  '--border-style': 'solid',
  '--border-top-width': '0px',
  backdropFilter: 'none',
  backgroundColor: 'rgba(0, 7, 13, 0)',
  WebkitBackdropFilter: 'none',
  width: '100%',
  opacity: 1,
  transform: 'none',
};

const mobileNavBaseStyle = {
  '--1gxu5kl': '0px 24px 0px 24px',
  '--border-bottom-width': '1px',
  '--border-color': 'var(--token-47679c26-af3f-4cd0-91b2-530be918763e, rgba(255, 255, 255, 0))',
  '--border-left-width': '0px',
  '--border-right-width': '0px',
  '--border-style': 'solid',
  '--border-top-width': '0px',
  backdropFilter: 'none',
  backgroundColor: 'var(--token-1ec80be1-93dc-4b5e-a38f-5b1f087c77a5, rgba(0, 0, 0, 0))',
  WebkitBackdropFilter: 'none',
  width: '100%',
  opacity: 1,
  transform: 'none',
};

const backdropGradient = `linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.9991670137442732) 2.0408163265306123%, rgba(0, 0, 0, 0.9966680549770929) 4.081632653061225%, rgba(0, 0, 0, 0.9925031236984589) 6.122448979591836%, rgba(0, 0, 0, 0.9866722199083715) 8.16326530612245%, rgba(0, 0, 0, 0.9791753436068305) 10.204081632653061%, rgba(0, 0, 0, 0.9700124947938359) 12.244897959183673%, rgba(0, 0, 0, 0.9591836734693877) 14.285714285714285%, rgba(0, 0, 0, 0.946688879633486) 16.3265306122449%, rgba(0, 0, 0, 0.9325281132861307) 18.367346938775512%, rgba(0, 0, 0, 0.9167013744273219) 20.408163265306122%, rgba(0, 0, 0, 0.8992086630570596) 22.448979591836736%, rgba(0, 0, 0, 0.8800499791753436) 24.489795918367346%, rgba(0, 0, 0, 0.8592253227821741) 26.53061224489796%, rgba(0, 0, 0, 0.8367346938775511) 28.57142857142857%, rgba(0, 0, 0, 0.8125780924614744) 30.612244897959183%, rgba(0, 0, 0, 0.7867555185339442) 32.6530612244898%, rgba(0, 0, 0, 0.7592669720949604) 34.69387755102041%, rgba(0, 0, 0, 0.7301124531445231) 36.734693877551024%, rgba(0, 0, 0, 0.6992919616826323) 38.775510204081634%, rgba(0, 0, 0, 0.6668054977092878) 40.816326530612244%, rgba(0, 0, 0, 0.6326530612244898) 42.857142857142854%, rgba(0, 0, 0, 0.5968346522282382) 44.89795918367347%, rgba(0, 0, 0, 0.5593502707205331) 46.93877551020408%, rgba(0, 0, 0, 0.5201999167013744) 48.97959183673469%, rgba(0, 0, 0, 0.47980008329862534) 51.02040816326531%, rgba(0, 0, 0, 0.4406497292794669) 53.06122448979592%, rgba(0, 0, 0, 0.40316534777176183) 55.10204081632652%, rgba(0, 0, 0, 0.36734693877551017) 57.14285714285714%, rgba(0, 0, 0, 0.3331945022907121) 59.183673469387756%, rgba(0, 0, 0, 0.3007080383173677) 61.224489795918366%, rgba(0, 0, 0, 0.2698875468554769) 63.26530612244898%, rgba(0, 0, 0, 0.24073302790503948) 65.3061224489796%, rgba(0, 0, 0, 0.2132444814660559) 67.3469387755102%, rgba(0, 0, 0, 0.1874219075385255) 69.38775510204081%, rgba(0, 0, 0, 0.16326530612244916) 71.42857142857143%, rgba(0, 0, 0, 0.14077467721782577) 73.46938775510205%, rgba(0, 0, 0, 0.11995002082465644) 75.51020408163265%, rgba(0, 0, 0, 0.10079133694294051) 77.55102040816327%, rgba(0, 0, 0, 0.08329862557267798) 79.59183673469387%, rgba(0, 0, 0, 0.06747188671386928) 81.63265306122449%, rgba(0, 0, 0, 0.053311120366513975) 83.6734693877551%, rgba(0, 0, 0, 0.04081632653061251) 85.71428571428571%, rgba(0, 0, 0, 0.029987505206164) 87.75510204081633%, rgba(0, 0, 0, 0.02082465639316977) 89.79591836734694%, rgba(0, 0, 0, 0.013327780091628272) 91.83673469387756%, rgba(0, 0, 0, 0.007496876301541278) 93.87755102040816%, rgba(0, 0, 0, 0.0033319450229072345) 95.91836734693877%, rgba(0, 0, 0, 0.0008329862557268086) 97.95918367346938%, rgba(0, 0, 0, 0) 100%)`;

const richTextStyle = {
  '--extracted-r6o4lv': 'rgb(255, 255, 255)',
  transform: 'none',
};

const richTextParagraphStyle = {
  '--framer-text-color': 'var(--extracted-r6o4lv, rgb(255, 255, 255))',
};

const buttonStyle = {
  '--border-bottom-width': '1px',
  '--border-color': 'var(--token-aecd04de-bd30-4743-90e2-2b56d3d58e1b, rgba(255, 255, 255, 0.1))',
  '--border-left-width': '1px',
  '--border-right-width': '1px',
  '--border-style': 'solid',
  '--border-top-width': '1px',
  backdropFilter: 'blur(5px)',
  backgroundColor: 'var(--token-aecd04de-bd30-4743-90e2-2b56d3d58e1b, rgba(255, 255, 255, 0.1))',
  WebkitBackdropFilter: 'blur(5px)',
  height: '100%',
  width: '100%',
  borderBottomLeftRadius: '768px',
  borderBottomRightRadius: '768px',
  borderTopLeftRadius: '768px',
  borderTopRightRadius: '768px',
};

const buttonTextWrapStyle = {
  '--extracted-r6o4lv': 'var(--token-090acfc6-f7ee-4bf4-9b69-0b15cf2cb187, rgb(255, 243, 240))',
  '--framer-link-text-color': 'rgb(0, 153, 255)',
  '--framer-link-text-decoration': 'underline',
  transform: 'none',
};

const buttonTextStyle = {
  '--framer-text-color':
    'var(--extracted-r6o4lv, var(--token-090acfc6-f7ee-4bf4-9b69-0b15cf2cb187, rgb(255, 243, 240)))',
};

const mobileCtaStyle = {
  '--border-bottom-width': '0px',
  '--border-color': 'var(--token-aecd04de-bd30-4743-90e2-2b56d3d58e1b, rgba(255, 255, 255, 0.1))',
  '--border-left-width': '0px',
  '--border-right-width': '0px',
  '--border-style': 'solid',
  '--border-top-width': '1px',
};

function LogoLink() {
  return (
    <Link className="framer-3ttqtb framer-cpft6o" to="/">
      <div
        data-framer-component-type="SVG"
        className="framer-c26lio"
        aria-hidden="true"
        aria-label="Nacew"
        style={{
          imageRendering: 'pixelated',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0px',
          width: '72px',
          minWidth: '72px',
          height: '24px',
          color: 'rgb(255, 255, 255)',
          backgroundImage: 'none',
          backgroundSize: 'contain',
          flexShrink: 0,
        }}
      >
        <img
          src="/logo.svg"
          alt="Nacew logo"
          width="72"
          height="24"
          style={{ display: 'block', flex: '0 0 auto', width: 72, height: 24, objectFit: 'contain' }}
        />
      </div>
    </Link>
  );
}

function NavTextLink({ item, variant, onClick }) {
  const className = variant === 'desktop' ? item.desktopClassName : item.mobileClassName;
  const paragraphClassName =
    variant === 'desktop' ? 'framer-text framer-styles-preset-1fhxhj6' : 'framer-text framer-styles-preset-prenqk';
  const containerProps =
    variant === 'desktop'
      ? { style: richTextStyle }
      : { 'data-highlight': true, tabIndex: 0, style: { transform: 'none' } };

  return (
    <div className={className} data-framer-component-type="RichTextContainer" {...containerProps}>
      <p
        className={paragraphClassName}
        data-styles-preset={variant === 'desktop' ? 'O0790qsZT' : 'POYKcChXw'}
        dir="auto"
        style={variant === 'desktop' ? richTextParagraphStyle : undefined}
      >
        <Link
          className="framer-text framer-styles-preset-v2iiak"
          data-styles-preset="Bh7brll6H"
          to={item.href}
          onClick={onClick}
        >
          {item.label}
        </Link>
      </p>
    </div>
  );
}

function HeaderButton({ href, children }) {
  return (
    <a
      className="framer-SDNRu framer-knjRQ framer-efr9v5 framer-v-ycy7bl framer-ces3t"
      data-border="true"
      data-framer-name="M Secondary"
      data-highlight="true"
      href={href}
      rel="noopener"
      tabIndex={0}
      style={buttonStyle}
    >
      <div className="framer-ynqlit" data-framer-component-type="RichTextContainer" style={buttonTextWrapStyle}>
        <p className="framer-text framer-styles-preset-1fhxhj6" data-styles-preset="O0790qsZT" dir="auto" style={buttonTextStyle}>
          {children}
        </p>
      </div>
    </a>
  );
}

function DesktopHeader({ isDarkSection, scrollBackdropOpacity }) {
  return (
    <div className="ssr-variant hidden-65kzqc hidden-k7b1cf">
      <nav
        className="framer-KjT5A framer-knjRQ framer-KVnNX framer-gF1Dm framer-wz7sin framer-v-m1g0je"
        data-framer-name="desktop-top"
        data-nacew-theme={isDarkSection ? 'dark' : 'light'}
        style={desktopNavStyle}
      >
        <motion.div
          className="framer-6fjk0p-container"
          animate={{ opacity: scrollBackdropOpacity }}
          transition={{ duration: 0.18, ease: [0.44, 0, 0.56, 1] }}
          style={{ opacity: scrollBackdropOpacity }}
        >
          <div style={{ width: '100%', height: '100%', borderRadius: 0, background: backdropGradient }} />
        </motion.div>
        <div className="framer-tk7xlw">
          <div className="framer-16k0bb6">
            <div className="framer-1bg5h3h">
              <LogoLink />
            </div>
            <div className="framer-13utme7" style={{ '--9q2k08': '48px' }}>
              {NAV_LINKS.map((item) => (
                <NavTextLink key={item.href} item={item} variant="desktop" />
              ))}
            </div>
            <div className="framer-1gy7y3o">
              <div className="framer-vsguht-container">
                <HeaderButton href={CONTACT_URL}>Contact Us</HeaderButton>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

function MobileHeader({ isDarkSection, mobileOpen, setMobileOpen, scrollBackdropOpacity }) {
  const barColor = mobileOpen || isDarkSection ? '#ffffff' : '#18181b';
  const mobileNavClassName = mobileOpen
    ? 'framer-KjT5A framer-knjRQ framer-KVnNX framer-gF1Dm framer-wz7sin framer-v-xqjeaw'
    : 'framer-KjT5A framer-knjRQ framer-KVnNX framer-gF1Dm framer-wz7sin framer-v-c2dsud';
  const buttonClassName = mobileOpen
    ? 'framer-oG402 framer-1qd1548 framer-v-2rnmh5'
    : 'framer-oG402 framer-1qd1548 framer-v-1qd1548';

  const toggleMobile = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setMobileOpen((open) => !open);
  };

  const closeMobile = () => setMobileOpen(false);

  return (
    <div className="ssr-variant hidden-1t24cya">
      <nav
        className={mobileNavClassName}
        data-framer-name="mobile-top"
        data-border="true"
        data-nacew-theme={isDarkSection ? 'dark' : 'light'}
        style={mobileNavBaseStyle}
      >
        {!mobileOpen && (
          <motion.div
            className="framer-6fjk0p-container"
            animate={{ opacity: scrollBackdropOpacity }}
            transition={{ duration: 0.18, ease: [0.44, 0, 0.56, 1] }}
            style={{ opacity: scrollBackdropOpacity, position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}
          >
            <div style={{ width: '100%', height: '100%', borderRadius: 0, background: backdropGradient }} />
          </motion.div>
        )}
        <div className="framer-tk7xlw">
          <div className="framer-16k0bb6">
            <div className="framer-1bg5h3h">
              <LogoLink />
            </div>
            <div className="framer-1gy7y3o">
              <div className="framer-1arlgxd-container" onClick={toggleMobile} style={{ cursor: 'pointer' }}>
                <div
                  className={buttonClassName}
                  data-framer-name={mobileOpen ? 'Variant 2' : 'Variant 1'}
                  data-highlight="true"
                  role="button"
                  aria-expanded={mobileOpen}
                  tabIndex={0}
                  onClick={toggleMobile}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      setMobileOpen((open) => !open);
                    }
                  }}
                  style={{ height: '100%', width: '100%', cursor: 'pointer', outline: 'none' }}
                >
                  <motion.div
                    className="framer-xwg8km"
                    animate={{ rotate: mobileOpen ? 45 : 0 }}
                    transition={{ duration: 0.34, ease: [0.44, 0, 0.56, 1] }}
                    style={{ backgroundColor: barColor, transformOrigin: '50% 50%' }}
                  />
                  <motion.div
                    className="framer-1e0yqhx"
                    animate={{ rotate: mobileOpen ? -45 : 0 }}
                    transition={{ duration: 0.34, ease: [0.44, 0, 0.56, 1] }}
                    style={{ backgroundColor: barColor, transformOrigin: '50% 50%' }}
                  />
                </div>
              </div>
            </div>
          </div>
          <motion.div
            className="framer-9t1ray"
            initial={false}
            animate={{ opacity: mobileOpen ? 1 : 0, height: mobileOpen ? 'auto' : 1 }}
            transition={{ duration: 0.36, ease: [0.44, 0, 0.56, 1] }}
            style={{
              overflow: 'clip',
              pointerEvents: mobileOpen ? 'auto' : 'none',
            }}
          >
            {NAV_LINKS.map((item) => (
              <NavTextLink key={item.href} item={item} variant="mobile" onClick={closeMobile} />
            ))}
            <div
              className="framer-z1s5bh"
              data-border="true"
              data-framer-name="CTA"
              style={mobileCtaStyle}
            >
              <div className="framer-5w4ti-container">
                <HeaderButton href={CONTACT_URL}>Contact Us</HeaderButton>
              </div>
            </div>
          </motion.div>
        </div>
      </nav>
    </div>
  );
}

export default function Header() {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollBackdropOpacity, setScrollBackdropOpacity] = useState(0);
  const isDarkSection = pathname === '/about' || scrollBackdropOpacity > 0.32;

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

  return (
    <motion.div
      className="framer-1xw88z8-container"
      initial={{ opacity: 0, y: -36 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 90, damping: 20, mass: 0.8 }}
      data-framer-appear-id="1xw88z8"
      data-nacew-theme={isDarkSection ? 'dark' : 'light'}
      style={{ opacity: 1, transform: 'none', willChange: 'transform' }}
    >
      <DesktopHeader isDarkSection={isDarkSection} scrollBackdropOpacity={scrollBackdropOpacity} />
      <MobileHeader
        isDarkSection={isDarkSection}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        scrollBackdropOpacity={scrollBackdropOpacity}
      />
    </motion.div>
  );
}
