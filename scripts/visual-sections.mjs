// Shared config for the visual-regression scripts.
// Section selectors map to the major page regions; viewports cover the
// breakpoints we smoke-check by hand. Keep this list in sync with the
// rendered sections (all must resolve to exactly one element).

export const PREVIEW_URL = process.env.PREVIEW_URL || 'http://localhost:5180';

export const VIEWPORTS = [
  { name: '1440', width: 1440, height: 900 },
  { name: '1024', width: 1024, height: 800 },
  { name: '768', width: 768, height: 1024 },
  { name: '390', width: 390, height: 844 },
  { name: '360', width: 360, height: 800 },
];

export const SECTIONS = [
  { name: 'header', selector: '[data-nacew-theme], .framer-1xw88z8-container' },
  { name: 'hero', selector: 'section#hero' },
  { name: 'intro', selector: 'section#about' },
  { name: 'services', selector: 'section#services' },
  { name: 'what-you-get', selector: 'section#what-you-get' },
  { name: 'pricing', selector: 'section#pricing' },
  { name: 'footer', selector: 'footer[data-framer-name="Footer"]' },
];

export const BASELINE_DIR = process.env.VISUAL_DIR || 'scratch/visual-baselines';

// Settle scroll/reveal animations before capture.
export const SETTLE_MS = Number(process.env.VISUAL_SETTLE_MS || 900);
