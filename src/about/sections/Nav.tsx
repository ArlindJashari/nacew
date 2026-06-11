import { useEffect, useState, type KeyboardEvent, type MouseEvent } from "react";
import { motion } from "motion/react";
import "./Nav.css";
import { homeUrl } from "../urls";

const SECTION_LINKS = [
  { href: "#research", label: "Research" },
  { href: "#what-you-get", label: "Services" },
  { href: "#reach", label: "Reach" },
  { href: "#process", label: "Process" },
  { href: "#letter", label: "Letter" },
  { href: "#testimonials", label: "Testimonials" },
] as const;

const CONTACT_URL = "mailto:contact@nacew.com";

const backdropGradient =
  "linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.999) 2%, rgba(0, 0, 0, 0.996) 4%, rgba(0, 0, 0, 0.992) 6%, rgba(0, 0, 0, 0.986) 8%, rgba(0, 0, 0, 0.979) 10%, rgba(0, 0, 0, 0.97) 12%, rgba(0, 0, 0, 0.959) 14%, rgba(0, 0, 0, 0.946) 16%, rgba(0, 0, 0, 0.932) 18%, rgba(0, 0, 0, 0.916) 20%, rgba(0, 0, 0, 0.899) 22%, rgba(0, 0, 0, 0.88) 24%, rgba(0, 0, 0, 0.859) 26%, rgba(0, 0, 0, 0.836) 28%, rgba(0, 0, 0, 0.812) 30%, rgba(0, 0, 0, 0.786) 32%, rgba(0, 0, 0, 0.759) 34%, rgba(0, 0, 0, 0.73) 36%, rgba(0, 0, 0, 0.699) 38%, rgba(0, 0, 0, 0.666) 40%, rgba(0, 0, 0, 0.632) 42%, rgba(0, 0, 0, 0.596) 44%, rgba(0, 0, 0, 0.559) 46%, rgba(0, 0, 0, 0.52) 48%, rgba(0, 0, 0, 0.479) 51%, rgba(0, 0, 0, 0.44) 53%, rgba(0, 0, 0, 0.403) 55%, rgba(0, 0, 0, 0.367) 57%, rgba(0, 0, 0, 0.333) 59%, rgba(0, 0, 0, 0.3) 61%, rgba(0, 0, 0, 0.269) 63%, rgba(0, 0, 0, 0.24) 65%, rgba(0, 0, 0, 0.213) 67%, rgba(0, 0, 0, 0.187) 69%, rgba(0, 0, 0, 0.163) 71%, rgba(0, 0, 0, 0.14) 73%, rgba(0, 0, 0, 0.119) 75%, rgba(0, 0, 0, 0.1) 77%, rgba(0, 0, 0, 0.083) 79%, rgba(0, 0, 0, 0.067) 81%, rgba(0, 0, 0, 0.053) 83%, rgba(0, 0, 0, 0.04) 85%, rgba(0, 0, 0, 0.029) 87%, rgba(0, 0, 0, 0.02) 89%, rgba(0, 0, 0, 0.013) 91%, rgba(0, 0, 0, 0.007) 93%, rgba(0, 0, 0, 0.003) 95%, rgba(0, 0, 0, 0.0008) 97%, rgba(0, 0, 0, 0) 100%)";

function NavCta({ href, children }: { href: string; children: string }) {
  return (
    <a className="nacew-nav-cta" href={href} rel="noopener">
      {children}
    </a>
  );
}

function DesktopNav({
  isDarkSection,
  scrollBackdropOpacity,
}: {
  isDarkSection: boolean;
  scrollBackdropOpacity: number;
}) {
  return (
    <nav
      className="nacew-nav nacew-nav--desktop"
      data-nacew-theme={isDarkSection ? "dark" : "light"}
      aria-label="Primary"
    >
      <motion.div
        className="nacew-nav-backdrop"
        animate={{ opacity: scrollBackdropOpacity }}
        transition={{ duration: 0.18, ease: [0.44, 0, 0.56, 1] }}
        aria-hidden
      >
        <div style={{ background: backdropGradient }} />
      </motion.div>
      <div className="nacew-nav-inner">
        <div className="nacew-nav-row">
          <div className="nacew-nav-logo-wrap">
            <a className="nacew-nav-logo" href={homeUrl()} aria-label="Nacew home">
              <img
                src={`${import.meta.env.BASE_URL}logo.svg`}
                alt="Nacew"
                width={72}
                height={24}
              />
            </a>
          </div>
          <div className="nacew-nav-links">
            <a href={homeUrl()}>Home</a>
            {SECTION_LINKS.map((link) => (
              <a key={link.href} href={link.href}>{link.label}</a>
            ))}
          </div>
          <div className="nacew-nav-cta-wrap">
            <NavCta href={CONTACT_URL}>Contact Us</NavCta>
          </div>
        </div>
      </div>
    </nav>
  );
}

function MobileNav({
  isDarkSection,
  mobileOpen,
  setMobileOpen,
  scrollBackdropOpacity,
}: {
  isDarkSection: boolean;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  scrollBackdropOpacity: number;
}) {
  const barColor = mobileOpen || isDarkSection ? "#ffffff" : "#18181b";

  const toggleMobile = (event: MouseEvent | KeyboardEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setMobileOpen(!mobileOpen);
  };

  const closeMobile = () => setMobileOpen(false);

  return (
    <nav
      className={`nacew-nav nacew-nav--mobile${mobileOpen ? " nacew-nav--mobile-open" : ""}`}
      data-nacew-theme={isDarkSection ? "dark" : "light"}
      aria-label="Primary"
    >
      {!mobileOpen && (
        <motion.div
          className="nacew-nav-backdrop"
          animate={{ opacity: scrollBackdropOpacity }}
          transition={{ duration: 0.18, ease: [0.44, 0, 0.56, 1] }}
          aria-hidden
        >
          <div style={{ background: backdropGradient }} />
        </motion.div>
      )}
      <div className="nacew-nav-inner">
        <div className="nacew-nav-row">
          <div className="nacew-nav-logo-wrap">
            <a className="nacew-nav-logo" href={homeUrl()} aria-label="Nacew home">
              <img
                src={`${import.meta.env.BASE_URL}logo.svg`}
                alt="Nacew"
                width={72}
                height={24}
              />
            </a>
          </div>
          <div className="nacew-nav-menu-toggle-wrap">
            <button
              type="button"
              className="nacew-nav-menu-toggle"
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={toggleMobile}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") toggleMobile(event);
              }}
            >
              <motion.span
                className="nacew-nav-menu-bar"
                animate={{ rotate: mobileOpen ? 45 : 0 }}
                transition={{ duration: 0.34, ease: [0.44, 0, 0.56, 1] }}
                style={{ backgroundColor: barColor }}
              />
              <motion.span
                className="nacew-nav-menu-bar"
                animate={{ rotate: mobileOpen ? -45 : 0 }}
                transition={{ duration: 0.34, ease: [0.44, 0, 0.56, 1] }}
                style={{ backgroundColor: barColor }}
              />
            </button>
          </div>
        </div>
        <motion.div
          className="nacew-nav-mobile-panel"
          initial={false}
          animate={{
            opacity: mobileOpen ? 1 : 0,
            height: mobileOpen ? "auto" : 1,
          }}
          transition={{ duration: 0.36, ease: [0.44, 0, 0.56, 1] }}
          style={{ pointerEvents: mobileOpen ? "auto" : "none" }}
        >
          <a href={homeUrl()} onClick={closeMobile}>Home</a>
          {SECTION_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={closeMobile}>{link.label}</a>
          ))}
          <div className="nacew-nav-mobile-cta-wrap">
            <NavCta href={CONTACT_URL}>Contact Us</NavCta>
          </div>
        </motion.div>
      </div>
    </nav>
  );
}

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollBackdropOpacity, setScrollBackdropOpacity] = useState(0);
  const [isDarkSection, setIsDarkSection] = useState(true);

  useEffect(() => {
    let frame: number | null = null;

    const updateScrollBackdrop = () => {
      frame = null;
      const nextOpacity = Math.max(0, Math.min(1, (window.scrollY - 162) / 645));
      setScrollBackdropOpacity(nextOpacity);
    };

    const onScroll = () => {
      if (frame === null) frame = window.requestAnimationFrame(updateScrollBackdrop);
    };

    updateScrollBackdrop();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const hero = document.getElementById("home");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsDarkSection(entry.intersectionRatio > 0.2),
      { threshold: [0, 0.2, 0.4, 0.6] },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      className="nacew-nav-shell"
      initial={{ opacity: 0, y: -36 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 90, damping: 20, mass: 0.8 }}
    >
      <DesktopNav
        isDarkSection={isDarkSection}
        scrollBackdropOpacity={scrollBackdropOpacity}
      />
      <MobileNav
        isDarkSection={isDarkSection}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        scrollBackdropOpacity={scrollBackdropOpacity}
      />
    </motion.div>
  );
}
