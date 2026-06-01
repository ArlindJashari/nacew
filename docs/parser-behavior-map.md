# Legacy parser behavior map

Historical map of the runtime behaviors that were replaced while converting the
Framer export to declarative React. Keep this as reference for the replacement
primitives and component decisions.

| # | Parser behavior (where) | What it does | Replacement primitive | Status |
|---|---|---|---|---|
| 1 | Global `Fora`→`Nacew` text swap (index.jsx ~40) | Rewrites stray brand text in exported HTML | N/A — converted markup is authored as "Nacew" | removed |
| 2 | Doc-wrapper unwrap + dead `modulepreload` drop (index.jsx ~53) | Strips `<html>/<head>/<body>`, Framer CDN preloads | N/A after direct React render | removed |
| 3 | Generic appear animation (index.jsx ~279–360) | `opacity:0` + transform → `motion` spring `whileInView` (stiffness 90/damping 20/mass 0.8, stagger via appear-id index, margin -120px) | **`Reveal`** | ✅ built |
| 4 | Opacity-hidden strip (index.jsx ~364) | Removes leftover `opacity:0` on static hidden nodes | `Reveal` / author visible | ✅ built |
| 5 | `ScrollRevealBlock` wrappers `framer-1ju5bf9` / `l6jfy1` (index.jsx ~163) | Fade + 24px rise whileInView | **`ScrollRevealBlock`** | ✅ built (re-export) |
| 6 | `ScrollSpotlightText` `framer-1amyo5f`/`1es08lj`/`sch1r2` (index.jsx ~148) | Opacity tracks scroll progress 0.25→0.99→0.25 | **`SpotlightText`** | ✅ built (re-export) |
| 7 | Hero parallax layers `framer-u991jm`(0.31) `f7ktf5`(0.17) `rE0XJ`(0.20) (index.jsx ~191–236) | Translate layer by scrollY * factor | **`ParallaxLayer`** | ✅ built (re-export) |
| 8 | SpatialMockup mount on `framer-rE0XJ` (index.jsx ~191) | Swaps hero browser mockup for `<SpatialMockup/>` | reuse `SpatialMockup` component directly | component exists |
| 9 | Hero foreground/bottom tree layers `13cc0rb`/`1p8lytk` (index.jsx ~239) | `HeroForegroundTreesLayer` / `HeroBottomTreesLayer` | reuse those components directly | components exist |
| 10 | SVG `<use>` icon swaps (index.jsx ~111–125) | Check / chevron / left-arrow / right-arrow inline SVG | **`InlineIcon`** | ✅ built |
| 11 | Nav logo `framer-c26lio` (index.jsx ~107) | Colored wordmark | declarative `Header` logo markup | converted |
| 12 | Glow runtime `framer-13yk504/...` (index.jsx ~127) | Pointer-proximity glow on cards | local component logic where needed | converted |
| 13 | Interactive features/tabs `framer-f8ai71-container` (index.jsx ~249) | Services tab switching + mockups | declarative `Services` state + mockups | converted |
| 14 | FAQ accordion `framer-qvmngs` + tabs `framer-X2hsG` (index.jsx ~257,384) | Expand/collapse, category tabs | declarative `FAQ` state | converted |
| 15 | Tabs mockup frame `framer-wk89vv` (index.jsx ~175) | Rounded-corner mockup container | plain styled wrapper | author on convert |
| 16 | Lazy-image opacity fix + hero asset swaps (index.jsx ~97,390) | force opacity 1, swap framer CDN img → local hero asset | author correct `src` directly | trivial on convert |
| 17 | Responsive SSR variants `hidden-k7b1cf` / `hidden-65kzqc hidden-1t24cya` | desktop/mobile duplicate, CSS hides one | **`ResponsiveVariant` / DesktopVariant / MobileVariant** | ✅ built |
| 18 | `FallingTextServices` (Intro, via nodeReplacers) | matter.js falling words layer | reuse `FallingText` / `FallingTextServices` | component exists |
| 19 | Generic style cleanup fall-through (index.jsx ~397) | camelCase CSS-var fix | author clean JSX styles | converted |
| 20 | Lenis smooth scroll (App.jsx) | global smooth scroll | already in `App.jsx`, parser-independent | no action |

## Primitives delivered (`src/components/primitives/`)

`Reveal`, `ScrollRevealBlock`, `SpotlightText`, `ParallaxLayer`, `InlineIcon`,
`SectionShell`, `MotionWrapper`, `ResponsiveVariant` (+`DesktopVariant`/`MobileVariant`).

The animation primitives live directly in `src/components/primitives/`.

## Behaviors that must stay component-driven (not yet primitives)

Glow runtime (12), Services interactive tabs/mockups (13), FAQ accordion (14),
SpatialMockup + hero tree layers (8,9), FallingText (18). These now live inside
declarative section components and do not require a DOM walk.

## Completed conversion order

1. **Intro/About** — 4 `opacity:0`, 3 spotlight, 0 icons, 0 reveal-blocks, +FallingText. Smallest.
2. **WhatYouGet** — 25 `opacity:0`, 3 icons.
3. **Services** — 42 `opacity:0`, 6 icons, interactive tabs/mockups (keep components).
4. **Header** — logic already React; ~20KB markup; topmost/most visible.
5. **Hero** — 51 `opacity:0`, 8 appear-id, 24 icons, parallax + SpatialMockup.
6. **Pricing** — 99 `opacity:0`, 3 reveal-blocks, 44 icons. Largest/last.
7. **FAQ** — tabs + accordion.
8. **CTA** — final call-to-action and supporting mockup.
