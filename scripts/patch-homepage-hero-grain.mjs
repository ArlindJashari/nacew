import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const nacewRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distRoot = path.join(nacewRoot, 'homepage-dist');
const assetsDir = path.join(distRoot, 'assets');

const GRAIN_CSS_SRC = path.join(nacewRoot, 'src', 'components', 'HeroGrainBackground.css');
const GRAIN_CSS_DEST = path.join(assetsDir, 'hero-grain.css');
const GRAIN_SYNC_SRC = path.join(nacewRoot, 'scripts', 'hero-grain', 'hero-grain-sync.js');
const GRAIN_SYNC_DEST = path.join(assetsDir, 'hero-grain-sync.js');
const CSS_LINK = '<link rel="stylesheet" crossorigin href="/assets/hero-grain.css">';
const SYNC_SCRIPT = '<script defer src="/assets/hero-grain-sync.js"></script>';
const SYNC_SCRIPT_RE = /\s*<script defer src="\/assets\/hero-grain-sync\.js"><\/script>\n?/g;

const BG_OLD = '(0,S.jsx)(Ce,{className:`framer-1ed9fxm`,"data-framer-name":`bg gradient`})';
const BG_LEGACY_PURPLE =
  '(0,S.jsxs)(`div`,{className:`framer-1ed9fxm`,"data-framer-name":`bg gradient`,children:(0,S.jsx)(`div`,{className:`hero-grain`,"aria-hidden":`true`,children:(0,S.jsxs)(`div`,{className:`hero-grain-blob-wrap`,children:[(0,S.jsx)(`div`,{className:`hero-grain-blob hero-grain-blob--purple`}),(0,S.jsx)(`div`,{className:`hero-grain-blob hero-grain-blob--red`}),(0,S.jsx)(`div`,{className:`hero-grain-blob hero-grain-blob--teal`}),(0,S.jsx)(`div`,{className:`hero-grain-blob hero-grain-blob--green`}),(0,S.jsx)(`div`,{className:`hero-grain-noise`})]})})})';
const BG_LEGACY_TABS_STATIC =
  '(0,S.jsxs)(`div`,{className:`framer-1ed9fxm`,"data-framer-name":`bg gradient`,children:(0,S.jsx)(`div`,{className:`hero-grain`,"aria-hidden":`true`,"data-active-tab":`0`,children:(0,S.jsxs)(`div`,{className:`hero-grain-blob-wrap`,children:[(0,S.jsx)(`div`,{className:`hero-grain-blob hero-grain-blob--tab-0`}),(0,S.jsx)(`div`,{className:`hero-grain-blob hero-grain-blob--tab-1`}),(0,S.jsx)(`div`,{className:`hero-grain-blob hero-grain-blob--tab-2`}),(0,S.jsx)(`div`,{className:`hero-grain-blob hero-grain-blob--tab-3`}),(0,S.jsx)(`div`,{className:`hero-grain-noise`})]})})})';
const BG_LEGACY_TABS_CONTEXT =
  '(0,S.jsxs)(`div`,{className:`framer-1ed9fxm`,"data-framer-name":`bg gradient`,children:(0,S.jsx)(`div`,{className:`hero-grain`,"aria-hidden":`true`,"data-active-tab":hgt,children:(0,S.jsxs)(`div`,{className:`hero-grain-blob-wrap`,children:[(0,S.jsx)(`div`,{className:`hero-grain-blob hero-grain-blob--tab-0`}),(0,S.jsx)(`div`,{className:`hero-grain-blob hero-grain-blob--tab-1`}),(0,S.jsx)(`div`,{className:`hero-grain-blob hero-grain-blob--tab-2`}),(0,S.jsx)(`div`,{className:`hero-grain-blob hero-grain-blob--tab-3`}),(0,S.jsx)(`div`,{className:`hero-grain-noise`})]})})})';
const BG_SIMPLE = '(0,S.jsx)(`div`,{className:`framer-1ed9fxm`,"data-framer-name":`bg gradient`,"data-hero-tab":hgt})';
const BG_NEW =
  '(0,S.jsxs)(`div`,{className:`framer-1ed9fxm`,"data-framer-name":`bg gradient`,"data-hero-tab":hgt,children:(0,S.jsx)(`div`,{className:`hero-grain`,"aria-hidden":`true`,children:(0,S.jsxs)(`div`,{className:`hero-grain-blob-wrap`,children:[(0,S.jsx)(`div`,{className:`hero-grain-blob`}),(0,S.jsx)(`div`,{className:`hero-grain-noise`})]})})})';
const BG_LEGACY_MULTI_TAB =
  '(0,S.jsxs)(`div`,{className:`framer-1ed9fxm`,"data-framer-name":`bg gradient`,"data-hero-tab":hgt,children:(0,S.jsx)(`div`,{className:`hero-grain`,"aria-hidden":`true`,children:(0,S.jsxs)(`div`,{className:`hero-grain-blob-wrap`,children:[(0,S.jsx)(`div`,{className:`hero-grain-blob hero-grain-blob--tab-0`}),(0,S.jsx)(`div`,{className:`hero-grain-blob hero-grain-blob--tab-1`}),(0,S.jsx)(`div`,{className:`hero-grain-blob hero-grain-blob--tab-2`}),(0,S.jsx)(`div`,{className:`hero-grain-blob hero-grain-blob--tab-3`}),(0,S.jsx)(`div`,{className:`hero-grain-noise`})]})})})';

const HERO_FN_OLD = 'function at(){return(0,S.jsxs)(Ae,{className:`framer-x2ps8j`';
const HERO_FN_NEW =
  'function at(){let hg=(0,h.useContext)(je),hgt=hg?hg.activeTab:0;return(0,S.jsxs)(Ae,{className:`framer-x2ps8j`';

function findHomepageBundle() {
  const indexHtml = fs.readFileSync(path.join(distRoot, 'index.html'), 'utf8');
  const match = indexHtml.match(/assets\/(index-[A-Za-z0-9_-]+\.js)/);
  if (!match) throw new Error('Hero grain patch: homepage bundle not found in index.html');
  const onDisk = fs.readdirSync(assetsDir).find((name) => name.toLowerCase() === match[1].toLowerCase());
  if (!onDisk) throw new Error(`Hero grain patch: missing ${match[1]}`);
  return path.join(assetsDir, onDisk);
}

function findHomepageCss() {
  const files = fs.readdirSync(assetsDir);
  const css = files.find((name) => /^index-.*\.css$/i.test(name));
  if (!css) throw new Error('Hero grain patch: homepage CSS bundle missing');
  return path.join(assetsDir, css);
}

function patchIndexHtml() {
  const indexPath = path.join(distRoot, 'index.html');
  let html = fs.readFileSync(indexPath, 'utf8');

  if (html.includes('hero-grain.css') && html.indexOf('hero-grain.css') < html.indexOf('index-DGigVuJC.css')) {
    html = html.replace(`${CSS_LINK}\n    `, '').replace(
      '<link rel="stylesheet" crossorigin href="/assets/index-DGigVuJC.css">',
      `<link rel="stylesheet" crossorigin href="/assets/index-DGigVuJC.css">\n    ${CSS_LINK}`,
    );
  } else if (!html.includes('hero-grain.css')) {
    html = html.replace(
      '<link rel="stylesheet" crossorigin href="/assets/index-DGigVuJC.css">',
      `<link rel="stylesheet" crossorigin href="/assets/index-DGigVuJC.css">\n    ${CSS_LINK}`,
    );
  }

  html = html.replace(SYNC_SCRIPT_RE, '');

  fs.writeFileSync(indexPath, html);
  console.log('homepage hero grain: index.html assets linked');
}

const HERO_BG_FORA_PEACH =
  'background:radial-gradient(200% 83% at 50% 0,#1b2228 0%,#353f44 42%,#d39794 100%)';
const HERO_BG_TOP_LINEAR =
  'background:linear-gradient(180deg,#1b2228 0%,#1b2228 42%,rgba(27,34,40,.55) 52%,rgba(0,9,18,.12) 62%,transparent 72%)';
const HERO_BG_TOP_RADIAL_OLD =
  'background:radial-gradient(200% 83% at 50% 0,#1b2228 0%,#353f44 42%,transparent 58%)';
const HERO_BG_TOP_RADIAL =
  'background:radial-gradient(200% 83% at 50% 0,#1b2228 0%,#353f44 32%,rgba(53,63,68,.55) 44%,rgba(53,63,68,.12) 54%,transparent 68%)';

function patchCss(cssPath) {
  let css = fs.readFileSync(cssPath, 'utf8');
  const radialWhite =
    'background:radial-gradient(200% 83% at 50% 0,#ffffff 0%,#dddfe0 42%,#e5ae94 100%)';
  const radialFlatDark = 'background:#000912';
  let changed = false;

  for (const old of [
    radialWhite,
    HERO_BG_FORA_PEACH,
    HERO_BG_TOP_LINEAR,
    HERO_BG_TOP_RADIAL_OLD,
    radialFlatDark,
  ]) {
    if (css.includes(old)) {
      css = css.replace(old, HERO_BG_TOP_RADIAL);
      changed = true;
      break;
    }
  }

  if (!changed && css.includes('.framer-pAcom .framer-1ed9fxm{')) {
    const next = css.replace(
      /(\.framer-pAcom \.framer-1ed9fxm\{[^}]*?)background:[^;]+/,
      `$1${HERO_BG_TOP_RADIAL}`,
    );
    if (next !== css) {
      css = next;
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(cssPath, css);
    console.log('homepage hero grain: fora lighter top radial, no bottom color');
  }
}

function patchHeaderTheme(source) {
  const old = 'a=r>.32';
  const next = 'a=!0';
  if (source.includes(old)) {
    console.log('homepage hero grain: header uses dark theme at hero top');
    return source.replace(old, next);
  }
  if (source.includes(next)) return source;
  console.log('homepage hero grain: header theme anchor not found — skip');
  return source;
}

function patchHeroMarkup(source) {
  let next = source;

  if (!next.includes(HERO_FN_NEW) && next.includes(HERO_FN_OLD)) {
    next = next.replace(HERO_FN_OLD, HERO_FN_NEW);
    console.log('homepage hero grain: hero reads activeTab from context');
  }

  if (next.includes(BG_NEW)) {
    return next;
  }

  for (const legacy of [
    BG_LEGACY_MULTI_TAB,
    BG_SIMPLE,
    BG_LEGACY_TABS_CONTEXT,
    BG_LEGACY_TABS_STATIC,
    BG_LEGACY_PURPLE,
    BG_OLD,
  ]) {
    if (next.includes(legacy)) {
      next = next.replace(legacy, BG_NEW);
      console.log('homepage hero grain: lightweight single-blob markup');
      return next;
    }
  }

  if (next.includes('hero-grain-blob`') && next.includes('data-hero-tab":hgt')) {
    return next;
  }

  if (next.includes('hero-grain-blob--tab-0')) {
    console.log('homepage hero grain: unexpected markup — manual check needed');
    return next;
  }

  throw new Error('Hero grain patch anchor not found — bundle layout may have changed');
}

const bundlePath = findHomepageBundle();
let source = fs.readFileSync(bundlePath, 'utf8');

fs.copyFileSync(GRAIN_CSS_SRC, GRAIN_CSS_DEST);
fs.copyFileSync(GRAIN_SYNC_SRC, GRAIN_SYNC_DEST);

source = patchHeroMarkup(source);
source = patchHeaderTheme(source);
fs.writeFileSync(bundlePath, source);

patchCss(findHomepageCss());
patchIndexHtml();
