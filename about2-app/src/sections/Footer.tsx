import "./Footer.css";
import { FOOTER_LINKS, FOOTER_SOCIAL } from "../data";

const SOCIAL_ICONS = {
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  ),
  x: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  ),
} as const;

export function Footer() {
  return (
    <footer className="branch-footer-container">
      <div className="branch-footer-glow-1" aria-hidden />
      <div className="branch-footer-glow-2" aria-hidden />
      <div className="branch-footer-glow-3" aria-hidden />
      <div className="branch-footer-glow-4" aria-hidden />
      <div className="branch-footer-glow-5" aria-hidden />
      <div className="branch-footer-glow-6" aria-hidden />
      <div className="branch-footer-glow-7" aria-hidden />
      <div className="branch-footer-glow-8" aria-hidden />

      <div className="branch-footer-logo-wrap">
        <a href="#home" aria-label="Nacew home">
          <img
            alt="Nacew Logo"
            loading="lazy"
            width={1152}
            height={276}
            decoding="async"
            className="branch-footer-logo"
            src={`${import.meta.env.BASE_URL}logo.svg`}
          />
        </a>
      </div>

      <div className="branch-footer-links">
        <nav className="branch-footer-colnav" aria-label="Footer">
          {FOOTER_LINKS.map((link) => (
            <a key={link.label} href={link.href} className="branch-footer-link">
              {link.label}
            </a>
          ))}
        </nav>
        <div className="branch-footer-social">
          {FOOTER_SOCIAL.map(({ label, href, icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="branch-footer-social-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {SOCIAL_ICONS[icon]}
            </a>
          ))}
        </div>
      </div>

      <div className="branch-footer-bottom">
        <div>© 2026 Nacew. All rights reserved</div>
        <nav className="branch-footer-nav">
          <a href="mailto:contact@nacew.com" aria-label="Contact Nacew" className="branch-footer-link">
            Contact
          </a>
        </nav>
      </div>
    </footer>
  );
}
