# Nacew

Marketing landing page for Nacew, built with React + Vite.

## Architecture

The page originated as a Framer export. The exported markup lives in
dedicated React components that preserve the original Framer class names,
layout wrappers, and interaction behavior.

Major sections render through dedicated components in [`src/components`](src/components):
`Header`, `Hero`, `Intro`, `Services`, `WhatYouGet`, `Pricing`, `FAQ`, `CTA`,
and `Footer`.

## Scripts

```bash
npm run dev      # start the Vite dev server
npm run build    # production build to dist/
npm run preview  # preview the production build
npm run lint     # run ESLint
```
