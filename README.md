# Nacew

Single-site React + Vite app for [nacew.com](https://nacew.com).

| Route | Page |
|-------|------|
| `/` | Homepage (Framer-export React components) |
| `/about` | About experience (`src/about/`) |
| `/3dlogo`, `/road` | Internal demos |

Homepage sections live in [`src/components`](src/components). About sections live in [`src/about/`](src/about/) with shared blocks in [`shared/about-sections/`](shared/about-sections/).

## Local dev

```bash
npm run dev:site   # http://localhost:8000 — same homepage as Netlify (homepage-dist)
npm run dev        # http://localhost:5180 — React source (edit about / app code)
npm run build:web  # sync homepage-dist + /about build → ../Nacew : WEb/
npm run build:about # build /about only
npm run lint       # ESLint
```

From `Nacew : WEb`, `npm run dev` runs `dev:site` (Netlify-matching static site).

**Homepage source of truth:** `homepage-dist/` — frozen bundle matching [Netlify](https://fantastic-khapse-ef480d.netlify.app/) (`index-C58hJQyr.js`). Do **not** overwrite with `vite build` output. `npm run build:web` copies `homepage-dist/` then builds `/about`.

**About:** `src/about/` → built to `WEb/about/` via `vite.about.config.js` (`about-public/` assets only).

**`/about2`:** legacy bookmark path only — `_redirects` + `serve.json` send it to `/about/`. No `about2` app or folder.

**Never deploy `dist/`:** unified `npm run build:app` is for source preview only. `npm run build` runs `build:web` (homepage guard enforces `index-C58hJQyr.js`).
