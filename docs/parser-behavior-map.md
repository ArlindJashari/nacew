# Parser behavior map

Every behavior `src/parser/index.jsx` + `src/parser/nodeReplacers.jsx` apply at
runtime, and the declarative React primitive that must replace each one before a
section can stop depending on `page.html` / the parser.

| # | Parser behavior (where) | What it does | Replacement primitive | Status |
|---|---|---|---|---|
| 1 | Global `Fora`→`Nacew` text swap (index.jsx ~40) | Rewrites stray brand text in page.html | N/A — converted markup is authored as "Nacew" | trivial on convert |
| 2 | Doc-wrapper unwrap + dead `modulepreload` drop (index.jsx ~53) | Strips `<html>/<head>/<body>`, Framer CDN preloads | N/A once page.html gone | removed with page.html |
| 3 | Generic appear animation (index.jsx ~279–360) | `opacity:0` + transform → `motion` spring `whileInView` (stiffness 90/damping 20/mass 0.8, stagger via appear-id index, margin -120px) | **`Reveal`** | ✅ built |
| 4 | Opacity-hidden strip (index.jsx ~364) | Removes leftover `opacity:0` on static hidden nodes | `Reveal` / author visible | ✅ built |
| 5 | `ScrollRevealBlock` wrappers `framer-1ju5bf9` / `l6jfy1` (index.jsx ~163) | Fade + 24px rise whileInView | **`ScrollRevealBlock`** | ✅ built (re-export) |
| 6 | `ScrollSpotlightText` `framer-1amyo5f`/`1es08lj`/`sch1r2` (index.jsx ~148) | Opacity tracks scroll progress 0.25→0.99→0.25 | **`SpotlightText`** | ✅ built (re-export) |
| 7 | Hero parallax layers `framer-u991jm`(0.31) `f7ktf5`(0.17) `rE0XJ`(0.20) (index.jsx ~191–236) | Translate layer by scrollY * factor | **`ParallaxLayer`** | ✅ built (re-export) |
| 8 | SpatialMockup mount on `framer-rE0XJ` (index.jsx ~191) | Swaps hero browser mockup for `<SpatialMockup/>` | reuse `SpatialMockup` component directly | component exists |
| 9 | Hero foreground/bottom tree layers `13cc0rb`/`1p8lytk` (index.jsx ~239) | `HeroForegroundTreesLayer` / `HeroBottomTreesLayer` | reuse those components directly | components exist |
| 10 | SVG `<use>` icon swaps (index.jsx ~111–125) | Check / chevron / left-arrow / right-arrow inline SVG | **`InlineIcon`** | ✅ built |
| 11 | Nav logo `framer-c26lio` (index.jsx ~107) | `renderNacewNavLogo` colored wordmark | reuse `renderNacewNavLogo` (or wrap) | function exists |
| 12 | Glow runtime `framer-13yk504/...` (index.jsx ~127) | Pointer-proximity glow on cards | `GlowRuntime` (keep; wrap later) | component exists |
| 13 | Interactive features/tabs `framer-f8ai71-container` (index.jsx ~249) | Services tab switching + mockups | `InteractiveFeaturesSection` + `Mockups` (keep) | component exists |
| 14 | FAQ accordion `framer-qvmngs` + tabs `framer-X2hsG` (index.jsx ~257,384) | Expand/collapse, category tabs | `InteractiveFAQItem` / `FAQCategoryTab` (keep) | component exists |
| 15 | Tabs mockup frame `framer-wk89vv` (index.jsx ~175) | Rounded-corner mockup container | plain styled wrapper | author on convert |
| 16 | Lazy-image opacity fix + hero asset swaps (index.jsx ~97,390) | force opacity 1, swap framer CDN img → local hero asset | author correct `src` directly | trivial on convert |
| 17 | Responsive SSR variants `hidden-k7b1cf` / `hidden-65kzqc hidden-1t24cya` | desktop/mobile duplicate, CSS hides one | **`ResponsiveVariant` / DesktopVariant / MobileVariant** | ✅ built |
| 18 | `FallingTextServices` (Intro, via nodeReplacers) | matter.js falling words layer | reuse `FallingText` / `FallingTextServices` | component exists |
| 19 | Generic style cleanup fall-through (index.jsx ~397) | camelCase CSS-var fix via `cleanProps` | author clean JSX styles | trivial on convert |
| 20 | Lenis smooth scroll (App.jsx) | global smooth scroll | already in `App.jsx`, parser-independent | no action |

## Primitives delivered (`src/components/primitives/`)

`Reveal`, `ScrollRevealBlock`, `SpotlightText`, `ParallaxLayer`, `InlineIcon`,
`SectionShell`, `MotionWrapper`, `ResponsiveVariant` (+`DesktopVariant`/`MobileVariant`).

The re-export primitives (`ScrollRevealBlock`, `SpotlightText`, `ParallaxLayer`)
currently forward to `src/parser/animations.jsx`. That file is parser-adjacent
but self-contained; when the parser is removed it moves into this folder
unchanged.

## Behaviors that must stay component-driven (not yet primitives)

Glow runtime (12), Services interactive tabs/mockups (13), FAQ accordion (14),
SpatialMockup + hero tree layers (8,9), FallingText (18). These already exist as
standalone components and can be mounted directly by a converted section — they
do not require the parser's DOM walk, only the section markup around them.

## Suggested conversion order (lowest risk first)

1. **Intro/About** — 4 `opacity:0`, 3 spotlight, 0 icons, 0 reveal-blocks, +FallingText. Smallest.
2. **WhatYouGet** — 25 `opacity:0`, 3 icons.
3. **Services** — 42 `opacity:0`, 6 icons, interactive tabs/mockups (keep components).
4. **Header** — logic already React; ~20KB markup; topmost/most visible.
5. **Hero** — 51 `opacity:0`, 8 appear-id, 24 icons, parallax + SpatialMockup.
6. **Pricing** — 99 `opacity:0`, 3 reveal-blocks, 44 icons. Largest/last.

Only after all six render declaratively: reduce parser routing (M9), then remove
the `page.html` import (M10).
