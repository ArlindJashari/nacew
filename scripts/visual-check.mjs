// Re-capture the current app and diff it against the baselines produced by
// visual-baseline.mjs. Writes a per-section pixel-diff and a summary; exits
// non-zero if any section drifts beyond THRESHOLD or overflow appears.
//
// Local usage:
//   npm i -D playwright pixelmatch pngjs && npx playwright install chromium
//   npm run dev
//   node scripts/visual-baseline.mjs   # once, to establish baselines
//   ...make changes...
//   node scripts/visual-check.mjs      # compares against baselines
//
// THRESHOLD is the max fraction of differing pixels tolerated per section.

import { mkdir, readFile, writeFile, readdir } from 'node:fs/promises';
import { PREVIEW_URL, VIEWPORTS, SECTIONS, BASELINE_DIR, SETTLE_MS } from './visual-sections.mjs';

const THRESHOLD = Number(process.env.VISUAL_THRESHOLD || 0.01); // 1% of pixels
const CURRENT_DIR = `${BASELINE_DIR}/.current`;
const DIFF_DIR = `${BASELINE_DIR}/.diff`;

let chromium, pixelmatch, PNG;
try {
  ({ chromium } = await import('playwright'));
  pixelmatch = (await import('pixelmatch')).default;
  ({ PNG } = await import('pngjs'));
} catch {
  console.error('Missing deps. Run: npm i -D playwright pixelmatch pngjs && npx playwright install chromium');
  process.exit(1);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

await mkdir(CURRENT_DIR, { recursive: true });
await mkdir(DIFF_DIR, { recursive: true });

const browser = await chromium.launch();
const results = [];
try {
  for (const vp of VIEWPORTS) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    await page.goto(PREVIEW_URL, { waitUntil: 'networkidle' });
    await page.evaluate(async () => {
      const step = window.innerHeight;
      for (let y = 0; y < document.body.scrollHeight; y += step) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); }
      window.scrollTo(0, 0);
    });
    await sleep(SETTLE_MS);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
    if (overflow) results.push({ vp: vp.name, section: '(page)', status: 'OVERFLOW' });

    for (const sec of SECTIONS) {
      const handle = await page.$(sec.selector);
      if (!handle) { results.push({ vp: vp.name, section: sec.name, status: 'MISSING' }); continue; }
      await handle.scrollIntoViewIfNeeded();
      await sleep(SETTLE_MS);
      const curPath = `${CURRENT_DIR}/${sec.name}__${vp.name}.png`;
      try { await handle.screenshot({ path: curPath }); } catch { continue; }

      const basePath = `${BASELINE_DIR}/${sec.name}__${vp.name}.png`;
      let base;
      try { base = PNG.sync.read(await readFile(basePath)); } catch { results.push({ vp: vp.name, section: sec.name, status: 'NO-BASELINE' }); continue; }
      const cur = PNG.sync.read(await readFile(curPath));
      if (base.width !== cur.width || base.height !== cur.height) {
        results.push({ vp: vp.name, section: sec.name, status: 'SIZE-CHANGED', detail: `${base.width}x${base.height} -> ${cur.width}x${cur.height}` });
        continue;
      }
      const diff = new PNG({ width: base.width, height: base.height });
      const changed = pixelmatch(base.data, cur.data, diff.data, base.width, base.height, { threshold: 0.1 });
      const frac = changed / (base.width * base.height);
      if (frac > THRESHOLD) await writeFile(`${DIFF_DIR}/${sec.name}__${vp.name}.png`, PNG.sync.write(diff));
      results.push({ vp: vp.name, section: sec.name, status: frac > THRESHOLD ? 'DRIFT' : 'ok', detail: `${(frac * 100).toFixed(2)}%` });
    }
    await page.close();
  }
} finally {
  await browser.close();
}

const bad = results.filter((r) => !['ok'].includes(r.status));
for (const r of results) console.log(`${r.status.padEnd(12)} ${r.vp.padEnd(5)} ${r.section} ${r.detail || ''}`);
console.log(bad.length ? `\n${bad.length} issue(s). Diffs in ${DIFF_DIR}` : '\nAll sections within threshold.');
process.exit(bad.length ? 1 : 0);
