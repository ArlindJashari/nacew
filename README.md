# Nacew

Production site: frozen Netlify homepage at `/`, React about page at `/about/`.

| Path | Source |
|------|--------|
| `/` | `homepage-dist/` (matches [Netlify](https://fantastic-khapse-ef480d.netlify.app/)) |
| `/about/` | `src/about/` → `vite.about.config.js` → `../Nacew : WEb/about/` |

## Commands

```bash
npm run dev         # http://localhost:8000 — production mirror (homepage + /about)
npm run dev:src     # http://localhost:5180 — legacy src/ preview (NOT production /)
npm run dev:about   # Vite dev server for /about source
npm run build       # sync homepage-dist + build /about → ../Nacew : WEb/
npm run lint
```

From `Nacew : WEb`, `npm run dev` runs `dev:site`.

## Deploy

`npm run build` copies `homepage-dist/` into `Nacew : WEb/`, then builds `/about`. `sync-web.mjs` enforces the Netlify homepage bundle (`index-C58hJQyr.js`) — never deploy `dist/`.

### Homepage is frozen — do not rebuild it

The `/` homepage lives in **`homepage-dist/`** only. It is a preserved Netlify export, not output from `vite build`.

| Do | Don't |
|----|-------|
| Edit homepage UI on Netlify / re-export into `homepage-dist/` | Run `vite build` and copy `dist/assets/*` into `homepage-dist/` |
| Run `npm run build:web` to sync + build `/about` | Expect `src/` React changes to appear on `/` at port 8000 |
| Use `npm run dev` (5180) to preview `src/` homepage work | Overwrite `index-C58hJQyr.js` (~320KB) with unified bundle (~650KB) |
| Run `npm run dev:src` only when intentionally editing legacy src/ mirror | Run plain `vite build` (blocked by vite.config.js) |

`scripts/guard-homepage-dist.mjs` runs before every sync and **fails the build** if the frozen bundle was replaced. Restore with:

```bash
git restore homepage-dist/assets/
npm run build:web
```

Legacy `/about2` redirects to `/about/` via `_redirects` and `serve.json`.
