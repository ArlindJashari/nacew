import { useEffect } from 'react';
import { Home } from '../about/home/Home';
import '../about/styles/tokens.css';
import '../about/styles/global.css';

const ABOUT_FONTS_ID = 'about-experience-fonts';
const ABOUT_OVERRIDES_ID = 'about-experience-overrides';

function isMainSiteStylesheet(link) {
  const href = link.getAttribute('href') ?? '';
  return href.includes('/assets/index-') && !href.includes('AboutExperience');
}

function setMainSiteStylesDisabled(disabled) {
  document.querySelectorAll('link[rel="stylesheet"]').forEach((link) => {
    if (isMainSiteStylesheet(link)) {
      link.disabled = disabled;
    }
  });
}

export default function AboutExperience() {
  useEffect(() => {
    setMainSiteStylesDisabled(true);

    if (!document.getElementById(ABOUT_FONTS_ID)) {
      const fonts = document.createElement('link');
      fonts.id = ABOUT_FONTS_ID;
      fonts.rel = 'stylesheet';
      fonts.href =
        'https://fonts.googleapis.com/css2?family=Fragment+Mono&family=Inter:wght@400;500;600&display=swap';
      document.head.appendChild(fonts);
    }

    if (!document.getElementById(ABOUT_OVERRIDES_ID)) {
      const overrides = document.createElement('style');
      overrides.id = ABOUT_OVERRIDES_ID;
      overrides.textContent = `
        html, body {
          background: #000 !important;
          color: #fff !important;
          font-size: 16px !important;
          font-family: "Inter", system-ui, sans-serif !important;
        }
        #root {
          min-height: 100%;
        }
      `;
      document.head.appendChild(overrides);
    }

    return () => {
      setMainSiteStylesDisabled(false);
      document.getElementById(ABOUT_FONTS_ID)?.remove();
      document.getElementById(ABOUT_OVERRIDES_ID)?.remove();
    };
  }, []);

  return (
    <div className="about-experience-root">
      <Home />
    </div>
  );
}
