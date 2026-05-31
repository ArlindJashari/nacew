# Visual regression tooling

Section-level screenshot baselines + diffs, used as a safety net before
converting parser/`page.html`-driven sections to declarative React.

Playwright and the diff libs are **not** project dependencies — install them
on demand (they are only needed when running these scripts):

```bash
npm i -D playwright pixelmatch pngjs
npx playwright install chromium
```

## Establish baselines (run once, on a known-good commit)

```bash
npm run dev                 # terminal 1 — serves on http://localhost:5180
npm run visual:baseline     # terminal 2 — writes scratch/visual-baselines/
```

Captures one PNG per (section × viewport) plus `metadata.json` (bounding boxes
+ per-viewport horizontal-overflow flag). Output dir is gitignored.

## Check after changes

```bash
npm run dev
npm run visual:check        # diffs current render vs baselines; exits non-zero on drift
```

Drift over `VISUAL_THRESHOLD` (default 1% of pixels) writes a diff PNG under
`scratch/visual-baselines/.diff/`. `SIZE-CHANGED` / `MISSING` / `OVERFLOW`
statuses are always failures.

## Config (`scripts/visual-sections.mjs`)

- `PREVIEW_URL` (default `http://localhost:5180`)
- `VIEWPORTS` — 1440 / 1024 / 768 / 390 / 360
- `SECTIONS` — header, hero, intro, services, what-you-get, pricing, footer
- env overrides: `PREVIEW_URL`, `VISUAL_DIR`, `VISUAL_SETTLE_MS`, `VISUAL_THRESHOLD`

> Note: scroll-driven reveals are triggered (scrolled top→bottom) and allowed to
> settle before each capture, so first-paint `opacity:0` states do not produce
> false diffs.
