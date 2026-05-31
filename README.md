# Nacew

Marketing landing page for Nacew, built with React + Vite.

## Architecture

The page originated as a Framer export. The exported markup lives in
[`src/content/page.html`](src/content/page.html) and is imported as a raw string
and walked at runtime by [`src/parser/index.jsx`](src/parser/index.jsx), which
swaps targeted nodes for interactive React / Framer-Motion components.

Major sections render through dedicated components in [`src/components`](src/components):
`Header`, `Hero`, `Intro`, `Services`, `WhatYouGet`, `Pricing`, `Footer`.

> `page.html` and the parser are still load-bearing. They are intentionally kept
> until the remaining sections are migrated to fully hand-written React.

## Scripts

```bash
npm run dev      # start the Vite dev server
npm run build    # production build to dist/
npm run preview  # preview the production build
npm run lint     # run ESLint
```
