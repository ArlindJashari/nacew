import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'acorn';

const nacewRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distRoot = path.join(nacewRoot, 'homepage-dist');
const assetsDir = path.join(distRoot, 'assets');

const CSS_SRC = path.join(nacewRoot, 'scripts', 'bento', 'bento-stage-enter.css');
const CSS_DEST = path.join(assetsDir, 'bento-stage-enter.css');

const CACHE_BUST = '20260611p';

const MOTION_FLAT_MARKER = 'id:`why-nacew`,ref:t,style:{scale:o,borderRadius:c,boxShadow:l,transformOrigin:`50% 42%`}';

const MOTION_FLAT_OPEN =
  'function On(){let t=(0,h.useRef)(null),{scrollYProgress:r}=i({target:t,offset:[`start end`,`start 0.1`]}),o=a(r,[0,.55,1],[.84,.96,1]),s=a(r,[0,.72,1],[52,16,0]),c=a(s,e=>`${e}px`),l=a(r,[0,.45,1],[`0 40px 100px rgba(0, 0, 0, 0.55)`,`0 24px 64px rgba(0, 0, 0, 0.2)`,`0 0 0 rgba(0, 0, 0, 0)`]),u=a(r,[0,.04,.96,1],[0,1,1,0]);return(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(n.div,{className:`bento-enter-backdrop`,style:{opacity:u},"aria-hidden":`true`}),(0,S.jsxs)(n.section,{className:`bento-section`,id:`why-nacew`,ref:t,style:{scale:o,borderRadius:c,boxShadow:l,transformOrigin:`50% 42%`},children:[';

const MOTION_INSIDE_OPEN =
  'function On(){let t=(0,h.useRef)(null),{scrollYProgress:r}=i({target:t,offset:[`start end`,`start 0.1`]}),o=a(r,[0,.55,1],[.84,.96,1]),s=a(r,[0,.72,1],[52,16,0]),c=a(s,e=>`${e}px`),l=a(r,[0,.45,1],[`0 40px 100px rgba(0, 0, 0, 0.55)`,`0 24px 64px rgba(0, 0, 0, 0.2)`,`0 0 0 rgba(0, 0, 0, 0)`]),u=a(r,[0,.04,.96,1],[0,1,1,0]);return(0,S.jsxs)(`div`,{className:`bento-enter`,ref:t,children:[(0,S.jsx)(n.div,{className:`bento-enter-backdrop`,style:{opacity:u}}),(0,S.jsxs)(n.div,{className:`bento-enter-stage`,style:{scale:o,borderRadius:c,boxShadow:l},children:[(0,S.jsxs)(`section`,{className:`bento-section`,id:`why-nacew`,children:[';

const MOTION_SIBLING_OPEN =
  'function On(){let t=(0,h.useRef)(null),{scrollYProgress:r}=i({target:t,offset:[`start end`,`start 0.1`]}),o=a(r,[0,.55,1],[.84,.96,1]),s=a(r,[0,.72,1],[52,16,0]),c=a(s,e=>`${e}px`),l=a(r,[0,.45,1],[`0 40px 100px rgba(0, 0, 0, 0.55)`,`0 24px 64px rgba(0, 0, 0, 0.2)`,`0 0 0 rgba(0, 0, 0, 0)`]),u=a(r,[0,.04,.96,1],[0,1,1,0]);return(0,S.jsxs)(S.Fragment,{children:[(0,S.jsxs)(n.div,{className:`bento-enter`,ref:t,style:{opacity:u},children:[(0,S.jsx)(n.div,{className:`bento-enter-stage`,"aria-hidden":`true`,style:{scale:o,borderRadius:c,boxShadow:l}})]}),(0,S.jsxs)(`section`,{className:`bento-section`,id:`why-nacew`,children:[';

const STATIC_FRAGMENT_OPEN =
  'function On(){return(0,S.jsxs)(S.Fragment,{children:[(0,S.jsxs)(`div`,{className:`bento-enter`,"data-bento-enter":`1`,children:[(0,S.jsx)(`div`,{className:`bento-enter-stage`,"aria-hidden":`true`})]}),(0,S.jsxs)(`section`,{className:`bento-section`,id:`why-nacew`,children:[';

const FRAGMENT_CLOSE =
  '(0,S.jsx)(`img`,{className:`bento-end-art-cursor`,src:`/bento-section-end.svg`,alt:``})]})]})]})}var kn=';

const INSIDE_CLOSE =
  '(0,S.jsx)(`img`,{className:`bento-end-art-cursor`,src:`/bento-section-end.svg`,alt:``})]})]})]})]})}var kn=';

const PLAIN_CLOSE =
  '(0,S.jsx)(`img`,{className:`bento-end-art-cursor`,src:`/bento-section-end.svg`,alt:``})]})}var kn=';

const LEGACY_OPENS = [
  {
    open: 'function On(){return(0,S.jsxs)(`section`,{className:`bento-wrap`,id:`why-nacew`,children:[(0,S.jsxs)(`div`,{className:`bento-block`,"data-bento-block":`1`,children:[(0,S.jsx)(`div`,{className:`bento-stage`,"aria-hidden":`true`})]}),(0,S.jsxs)(`div`,{className:`bento-tail bento-section`,children:[',
    closeFrom: FRAGMENT_CLOSE,
    closeTo: FRAGMENT_CLOSE,
  },
  {
    open: 'function On(){return(0,S.jsxs)(`section`,{className:`bento-wrap`,id:`why-nacew`,children:[(0,S.jsx)(`div`,{className:`bento-enter`,"data-bento-enter":`1`,children:(0,S.jsx)(`div`,{className:`bento-stage-shell`,"aria-hidden":`true`})}),(0,S.jsxs)(`div`,{className:`bento-body bento-section`,children:[',
    closeFrom: FRAGMENT_CLOSE,
    closeTo: FRAGMENT_CLOSE,
  },
  {
    open: 'function On(){return(0,S.jsxs)(`section`,{className:`bento-section`,id:`why-nacew`,children:[',
    closeFrom: PLAIN_CLOSE,
    closeTo: FRAGMENT_CLOSE,
  },
];

function findHomepageBundle() {
  const indexHtml = fs.readFileSync(path.join(distRoot, 'index.html'), 'utf8');
  const match = indexHtml.match(/assets\/(index-[A-Za-z0-9_-]+\.js)/);
  if (!match) throw new Error('Bento patch: homepage bundle not found');
  const onDisk = fs.readdirSync(assetsDir).find((name) => name.toLowerCase() === match[1].toLowerCase());
  if (!onDisk) throw new Error(`Bento patch: missing ${match[1]}`);
  return path.join(assetsDir, onDisk);
}

function patchBundle(source) {
  if (source.includes(MOTION_FLAT_MARKER)) {
    console.log('homepage bento: flat section enter already patched');
    return source;
  }

  if (source.includes(MOTION_INSIDE_OPEN)) {
    console.log('homepage bento: nested stage → flat motion.section');
    if (!source.includes(INSIDE_CLOSE)) throw new Error('Bento patch: inside close anchor not found');
    return source.replace(MOTION_INSIDE_OPEN, MOTION_FLAT_OPEN).replace(INSIDE_CLOSE, FRAGMENT_CLOSE);
  }

  if (source.includes(MOTION_SIBLING_OPEN)) {
    console.log('homepage bento: empty shell → flat motion.section');
    if (!source.includes(FRAGMENT_CLOSE)) throw new Error('Bento patch: close anchor not found');
    return source.replace(MOTION_SIBLING_OPEN, MOTION_FLAT_OPEN);
  }

  if (source.includes(STATIC_FRAGMENT_OPEN)) {
    console.log('homepage bento: static enter → flat motion.section');
    return source.replace(STATIC_FRAGMENT_OPEN, MOTION_FLAT_OPEN);
  }

  for (const { open, closeFrom, closeTo } of LEGACY_OPENS) {
    if (!source.includes(open)) continue;
    if (!source.includes(closeFrom)) throw new Error('Bento patch: close anchor not found');
    console.log('homepage bento: legacy layout → flat motion.section');
    return source.replace(open, MOTION_FLAT_OPEN).replace(closeFrom, closeTo);
  }

  throw new Error('Bento patch: On() anchor not found');
}

function assertBundleSyntax(source, bundlePath) {
  try {
    parse(source, { ecmaVersion: 'latest', sourceType: 'module' });
  } catch (error) {
    throw new Error(`Bento patch: ${path.basename(bundlePath)} invalid — ${error.message}`);
  }
}

function patchIndexHtml() {
  const indexPath = path.join(distRoot, 'index.html');
  let html = fs.readFileSync(indexPath, 'utf8');
  const CSS_LINK = `<link rel="stylesheet" crossorigin href="/assets/bento-stage-enter.css?v=${CACHE_BUST}">`;

  html = html.replace(/\n?\s*<script defer src="\/assets\/bento-stage-enter\.js[^"]*"><\/script>/g, '');

  if (!html.includes('bento-stage-enter.css')) {
    html = html.replace(
      /<link rel="stylesheet" crossorigin href="\/assets\/hero-about-content\.css(?:\?v=[^"]*)?">/,
      `$&\n    ${CSS_LINK}`,
    );
  } else {
    html = html.replace(/\/assets\/bento-stage-enter\.css(?:\?v=[^"]*)?/g, `/assets/bento-stage-enter.css?v=${CACHE_BUST}`);
  }

  fs.writeFileSync(indexPath, html);
}

fs.copyFileSync(CSS_SRC, CSS_DEST);

const bundlePath = findHomepageBundle();
let source = fs.readFileSync(bundlePath, 'utf8');
source = patchBundle(source);
assertBundleSyntax(source, bundlePath);
fs.writeFileSync(bundlePath, source);
patchIndexHtml();
console.log(`homepage bento stage: css only (v=${CACHE_BUST})`);
