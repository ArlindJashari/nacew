import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'acorn';
import {
  ARROW_ICON,
  EMPTY_ARROW_ICON,
  EMPTY_SUN_ICON,
  SUN_ICON,
} from './hero-about/hero-patch-icons.mjs';

const nacewRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distRoot = path.join(nacewRoot, 'homepage-dist');
const assetsDir = path.join(distRoot, 'assets');

const CSS_INTRO_SRC = path.join(nacewRoot, 'src', 'components', 'HeroAboutIntro.css');
const CSS_EFFECTS_SRC = path.join(nacewRoot, 'src', 'components', 'HeroMetaEffects.css');
const CSS_DEST = path.join(assetsDir, 'hero-about-content.css');
const META_EFFECTS_SRC = path.join(nacewRoot, 'scripts', 'hero-about', 'hero-meta-effects.js');
const META_EFFECTS_DEST = path.join(assetsDir, 'hero-meta-effects.js');

const CACHE_BUST = '20260611i';
const CSS_LINK = `<link rel="stylesheet" crossorigin href="/assets/hero-about-content.css?v=${CACHE_BUST}">`;
const META_EFFECTS_SCRIPT = `<script defer src="/assets/hero-meta-effects.js?v=${CACHE_BUST}"></script>`;

const FRAGMENT_BLOCK =
  /,\(0,S\.jsxs\)\(S\.Fragment,\{children:\[[\s\S]*?\]\}\),\(0,S\.jsxs\)\(`div`,\{className:`framer-1i5w2fk`/;

const FRAGMENT_BROKEN = 'nt,{layer:et.mid})})]}),(0,S.jsxs)(`div`,{className:`framer-1i5w2fk`';
const FRAGMENT_BROKEN_FIX = 'nt,{layer:et.mid})}),(0,S.jsxs)(`div`,{className:`framer-1i5w2fk`';

const HOME_STATEMENT = 'Stop renting tools. Build your platform.';
const HOME_SUBTEXT =
  'We design and build custom internal platforms for operations, approvals, reporting, inventory, and team workflows, built around your business, not someone else\'s subscription template.';

const META_INTRO = `(0,S.jsx)(\`div\`,{className:\`hero-about-intro\`,children:(0,S.jsxs)(\`div\`,{className:\`hero-about-intro-inner\`,children:[(0,S.jsxs)(\`span\`,{className:\`hero-about-meta\`,children:[\`Global product building studio\`,${SUN_ICON},(0,S.jsx)(\`span\`,{id:\`hero-about-time\`,children:\`--:-- Gjilan, Kosovo\`})]}),(0,S.jsxs)(\`div\`,{className:\`hero-about-right\`,children:[(0,S.jsx)(\`p\`,{className:\`hero-about-statement\`,children:\`${HOME_STATEMENT}\`}),(0,S.jsx)(\`p\`,{className:\`hero-about-subtext\`,children:\`${HOME_SUBTEXT}\`}),(0,S.jsxs)(\`div\`,{className:\`hero-scroll-prompt\`,children:[(0,S.jsxs)(\`div\`,{className:\`hero-scroll-shimmer\`,children:[(0,S.jsx)(\`p\`,{className:\`hero-scroll-shimmer__base\`,children:\`Scroll to explore\`}),(0,S.jsx)(\`p\`,{className:\`hero-scroll-shimmer__shine\`,"aria-hidden":\`true\`,children:\`Scroll to explore\`})]}),${ARROW_ICON}]})]})]})})`;

const LEGACY_CTA =
  '(0,S.jsx)(`div`,{className:`framer-1tfsgnk`,children:(0,S.jsx)(`div`,{className:`ssr-variant`,children:(0,S.jsx)(tt,{})})})';

const CONTENT_SLOT = `(0,S.jsxs)(\`div\`,{className:\`framer-1e2emgk\`,children:[${META_INTRO}]})`;

const WORDMARK = `(0,S.jsx)(\`h1\`,{className:\`hero-about-wordmark\`,children:\`nacew\`}),`;

const SLOT_START = '(0,S.jsxs)(`div`,{className:`framer-1e2emgk`,children:[';
const SLOT_END = '}),(0,S.jsx)(`div`,{className:`ssr-variant hidden-nzvz5l`';

function findHomepageBundle() {
  const indexHtml = fs.readFileSync(path.join(distRoot, 'index.html'), 'utf8');
  const match = indexHtml.match(/assets\/(index-[A-Za-z0-9_-]+\.js)/);
  if (!match) throw new Error('Hero about patch: homepage bundle not found');
  const onDisk = fs.readdirSync(assetsDir).find((name) => name.toLowerCase() === match[1].toLowerCase());
  if (!onDisk) throw new Error(`Hero about patch: missing ${match[1]}`);
  return path.join(assetsDir, onDisk);
}

function bustAssetUrls(html) {
  return html.replace(
    /(src|href)="(\/assets\/[^"?]+)(?:\?v=[^"]*)?"/g,
    (_, attr, assetPath) => `${attr}="${assetPath}?v=${CACHE_BUST}"`,
  );
}

function patchIndexHtml() {
  const indexPath = path.join(distRoot, 'index.html');
  let html = fs.readFileSync(indexPath, 'utf8');

  if (!html.includes('hero-about-content.css')) {
    html = html.replace(
      /<link rel="stylesheet" crossorigin href="\/assets\/hero-grain\.css(?:\?v=[^"]*)?">/,
      `<link rel="stylesheet" crossorigin href="/assets/hero-grain.css?v=${CACHE_BUST}">\n    ${CSS_LINK}`,
    );
  }

  html = html.replace('<script defer src="/assets/hero-about-clock.js"></script>\n', '');
  html = html.replace('<script defer src="/assets/hero-about-clock.js"></script>', '');

  if (!html.includes('hero-meta-effects.js')) {
    html = html.replace(
      '<div id="root"></div>',
      `<div id="root"></div>\n    ${META_EFFECTS_SCRIPT}`,
    );
  }

  html = bustAssetUrls(html);
  fs.writeFileSync(indexPath, html);
  console.log(`homepage hero about: index.html assets linked (v=${CACHE_BUST})`);
}

function removeFragmentOverlay(next) {
  if (next.includes(FRAGMENT_BROKEN)) {
    console.log('homepage hero about: fixed broken hero children bracket');
    return next.replace(FRAGMENT_BROKEN, FRAGMENT_BROKEN_FIX);
  }
  if (FRAGMENT_BLOCK.test(next)) {
    console.log('homepage hero about: removed overlapping fragment layer');
    return next.replace(FRAGMENT_BLOCK, ',(0,S.jsxs)(`div`,{className:`framer-1i5w2fk`');
  }
  return next;
}

function isHomepageHeroDone(next) {
  return (
    next.includes('hero-about-intro-inner')
    && next.includes('hero-about-subtext')
    && next.includes(`hero-about-statement\`,children:\`${HOME_STATEMENT}\``)
    && next.includes('viewBox:`0 0 14 14`')
    && next.includes('viewBox:`0 0 7.824 9.941`')
    && !next.includes('framer-mc6oli')
    && !next.includes('framer-1tfsgnk')
  );
}

function removeLegacyCta(next) {
  const commaCta = `,${LEGACY_CTA}`;
  if (!next.includes(commaCta)) return next;
  console.log('homepage hero about: removed hero CTA button');
  return next.replace(commaCta, '');
}

function upgradeInlineEffects(next) {
  let changed = false;
  if (next.includes(EMPTY_SUN_ICON)) {
    next = next.replaceAll(EMPTY_SUN_ICON, SUN_ICON);
    changed = true;
  }
  if (next.includes(EMPTY_ARROW_ICON)) {
    next = next.replaceAll(EMPTY_ARROW_ICON, ARROW_ICON);
    changed = true;
  }
  if (changed) {
    console.log('homepage hero about: inlined sun + scroll arrow SVG');
  }
  return next;
}

function removeLegacyHeadline(next) {
  const headStart = next.indexOf('(0,S.jsx)(`div`,{className:`framer-mc6oli`');
  if (headStart === -1) return next;

  const ctaMarker = '),(0,S.jsx)(`div`,{className:`framer-1tfsgnk`';
  const ctaStart = next.indexOf(ctaMarker, headStart);
  if (ctaStart === -1) return next;

  console.log('homepage hero about: removed duplicate centered headline');
  return next.slice(0, headStart - 1) + next.slice(ctaStart);
}

function upgradeHomepageIntro(next) {
  if (!next.includes('hero-about-intro-inner')) return next;

  const aboutStatement =
    'Product building for teams who want to ship a better version of their product.';
  if (next.includes(aboutStatement)) {
    next = next.replace(
      `\`Product building for teams who want to ship a better version of their product.\``,
      `\`${HOME_STATEMENT}\``,
    );
    console.log('homepage hero about: statement swapped to homepage headline');
  }

  if (!next.includes('hero-about-subtext')) {
    const statementJsx = `(0,S.jsx)(\`p\`,{className:\`hero-about-statement\`,children:\`${HOME_STATEMENT}\`})`;
    const subtextJsx = `(0,S.jsx)(\`p\`,{className:\`hero-about-subtext\`,children:\`${HOME_SUBTEXT}\`})`;
    if (next.includes(statementJsx)) {
      next = next.replace(statementJsx, `${statementJsx},${subtextJsx}`);
      console.log('homepage hero about: subtext added under statement');
    }
  }

  return next;
}

function replaceContentSlot(next) {
  next = removeLegacyCta(next);
  next = upgradeInlineEffects(next);

  if (isHomepageHeroDone(next)) {
    return next;
  }

  const start = next.indexOf(SLOT_START);
  if (start !== -1) {
    const end = next.indexOf(SLOT_END, start);
    if (end === -1) throw new Error('Hero about patch: hero content end anchor not found');

    console.log('homepage hero about: intro row with homepage headline');
    return next.slice(0, start) + CONTENT_SLOT + next.slice(end);
  }

  next = upgradeHomepageIntro(next);
  next = removeLegacyHeadline(next);
  next = removeLegacyCta(next);
  next = upgradeInlineEffects(next);

  if (isHomepageHeroDone(next)) {
    return next;
  }

  throw new Error('Hero about patch: framer-1e2emgk anchor not found');
}

function removeWordmark(next) {
  if (!next.includes('hero-about-wordmark')) return next;
  console.log('homepage hero about: removed decorative wordmark h1');
  return next.replace(WORDMARK, '');
}

function patchBundle(source) {
  let next = source;
  next = removeFragmentOverlay(next);
  next = replaceContentSlot(next);
  next = removeWordmark(next);
  return next;
}

const introCss = fs.readFileSync(CSS_INTRO_SRC, 'utf8').replace("@import './HeroMetaEffects.css';\n\n", '');
const effectsCss = fs.readFileSync(CSS_EFFECTS_SRC, 'utf8');
fs.writeFileSync(CSS_DEST, `${effectsCss}\n${introCss}`);
fs.copyFileSync(META_EFFECTS_SRC, META_EFFECTS_DEST);

function assertBundleSyntax(source, bundlePath) {
  try {
    parse(source, { ecmaVersion: 'latest', sourceType: 'module' });
  } catch (error) {
    throw new Error(
      `Hero about patch: ${path.basename(bundlePath)} has invalid JS — ${error.message}`,
    );
  }
}

const bundlePath = findHomepageBundle();
let source = fs.readFileSync(bundlePath, 'utf8');
source = patchBundle(source);
assertBundleSyntax(source, bundlePath);
fs.writeFileSync(bundlePath, source);

patchIndexHtml();
