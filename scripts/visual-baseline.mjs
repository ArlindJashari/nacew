// Capture per-section baseline screenshots + layout metadata for every
// viewport. Output goes to BASELINE_DIR (gitignored by default).
//
// Local usage (Playwright is NOT a project dependency — install on demand):
//   npm i -D playwright && npx playwright install chromium
//   npm run dev                       # in another terminal (port 5180)
//   node scripts/visual-baseline.mjs  # writes scratch/visual-baselines/
//
// Each run writes <section>__<viewport>.png plus a metadata.json holding
// bounding boxes and a horizontal-overflow flag per (viewport, section).

import { mkdir, writeFile } from 'node:fs/promises';
import { PREVIEW_URL, VIEWPORTS, SECTIONS, BASELINE_DIR, SETTLE_MS } from './visual-sections.mjs';

let chromium;
try {
  ({ chromium } = await import('playwright'));
} catch {
  console.error('Playwright not installed. Run: npm i -D playwright && npx playwright install chromium');
  process.exit(1);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function capture({ compareDir } = {}) {
  await mkdir(BASELINE_DIR, { recursive: true });
  const browser = await chromium.launch();
  const meta = {};
  try {
    for (const vp of VIEWPORTS) {
      const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
      await page.goto(PREVIEW_URL, { waitUntil: 'networkidle' });
      // Trigger scroll-driven reveals top-to-bottom, then settle.
      await page.evaluate(async () => {
        const step = window.innerHeight;
        for (let y = 0; y < document.body.scrollHeight; y += step) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 120));
        }
        window.scrollTo(0, 0);
      });
      await sleep(SETTLE_MS);

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth + 1
      );
      meta[vp.name] = { overflow, sections: {} };

      for (const sec of SECTIONS) {
        const handle = await page.$(sec.selector);
        if (!handle) { meta[vp.name].sections[sec.name] = { found: false }; continue; }
        await handle.scrollIntoViewIfNeeded();
        await sleep(SETTLE_MS);
        const box = await handle.boundingBox();
        const out = `${compareDir || BASELINE_DIR}/${sec.name}__${vp.name}.png`;
        try { await handle.screenshot({ path: out }); } catch { /* off-screen */ }
        meta[vp.name].sections[sec.name] = { found: true, box };
      }
      await page.close();
    }
  } finally {
    await browser.close();
  }
  await writeFile(`${compareDir || BASELINE_DIR}/metadata.json`, JSON.stringify(meta, null, 2));
  return meta;
}

const meta = await capture();
const overflows = Object.entries(meta).filter(([, v]) => v.overflow).map(([k]) => k);
console.log(`Baselines written to ${BASELINE_DIR}`);
console.log(overflows.length ? `Horizontal overflow at: ${overflows.join(', ')}` : 'No horizontal overflow.');
