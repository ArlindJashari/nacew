# Nacew

Production site: frozen Netlify homepage at `/`, React about page at `/about/`.

| Path | Source |
|------|--------|
| `/` | `homepage-dist/` (matches [Netlify](https://fantastic-khapse-ef480d.netlify.app/)) |
| `/about/` | `src/about/` → `vite.about.config.js` → `../Nacew : WEb/about/` |

## Commands

```bash
npm run dev:site    # http://localhost:8000 — production mirror (homepage + /about)
npm run dev         # http://localhost:5180 — homepage React source (editing)
npm run dev:about   # Vite dev server for /about source
npm run build       # sync homepage-dist + build /about → ../Nacew : WEb/
npm run lint
```

From `Nacew : WEb`, `npm run dev` runs `dev:site`.

## Deploy

`npm run build` copies `homepage-dist/` into `Nacew : WEb/`, then builds `/about`. `sync-web.mjs` enforces the Netlify homepage bundle (`index-C58hJQyr.js`) — never deploy `dist/`.

Legacy `/about2` redirects to `/about/` via `_redirects` and `serve.json`.
