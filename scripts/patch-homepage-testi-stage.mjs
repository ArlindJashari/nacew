import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'acorn';

const nacewRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distRoot = path.join(nacewRoot, 'homepage-dist');
const assetsDir = path.join(distRoot, 'assets');

const CSS_SRC = path.join(nacewRoot, 'scripts', 'testimonials', 'testi-stage-enter.css');
const CSS_DEST = path.join(assetsDir, 'testi-stage-enter.css');

const CACHE_BUST = '20260611p';

const MOTION_FLAT_MARKER = 'testi-enter-backdrop';

const MOTION_FLAT_OPEN =
  'function jn(){let e=(0,h.useRef)(null),t=(0,h.useRef)(null),{scrollYProgress:r}=i({target:e,offset:[`start end`,`start -35%`]}),{scrollYProgress:o}=i({target:t,offset:[`start start`,`end end`]}),s=a(r,[0,.55,1],[.84,.96,1]),c=a(r,[0,.72,1],[52,16,0]),l=a(c,e=>`${e}px`),u=a(r,[0,.45,1],[`0 40px 100px rgba(0, 0, 0, 0.55)`,`0 24px 64px rgba(0, 0, 0, 0.2)`,`0 0 0 rgba(0, 0, 0, 0)`]),d=a(r,[0,.04,.96,1],[0,1,1,0]);return(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(n.div,{className:`testi-enter-backdrop`,style:{opacity:d},"aria-hidden":`true`}),(0,S.jsxs)(n.section,{className:`testi-section`,"data-framer-name":`Testimonials`,id:`testimonials`,ref:e,style:{scale:s,borderRadius:l,boxShadow:u,transformOrigin:`50% 42%`},children:[(0,S.jsxs)(`div`,{className:`testi-head`,children:[';

const MOTION_NESTED_OPEN =
  'function jn(){let e=(0,h.useRef)(null),t=(0,h.useRef)(null),{scrollYProgress:r}=i({target:e,offset:[`start end`,`start -35%`]}),{scrollYProgress:o}=i({target:t,offset:[`start start`,`end end`]}),s=a(r,[0,.55,1],[.84,.96,1]),c=a(r,[0,.72,1],[52,16,0]),l=a(c,e=>`${e}px`),u=a(r,[0,.45,1],[`0 40px 100px rgba(0, 0, 0, 0.55)`,`0 24px 64px rgba(0, 0, 0, 0.2)`,`0 0 0 rgba(0, 0, 0, 0)`]),d=a(r,[0,.72,1],[`#ffffff`,`#ffffff`,`#000000`]);return(0,S.jsxs)(n.section,{className:`testi-wrap`,"data-framer-name":`Testimonials`,id:`testimonials`,ref:e,style:{backgroundColor:d},children:[(0,S.jsxs)(n.div,{className:`testi-block`,ref:t,style:{backgroundColor:d},children:[(0,S.jsxs)(`div`,{className:`testi-stage`,children:[(0,S.jsx)(n.div,{className:`testi-stage-shell`,"aria-hidden":`true`,style:{scale:s,borderRadius:l,boxShadow:u}}),(0,S.jsxs)(`div`,{className:`testi-head`,"data-nav-theme":`light`,children:[';

const PLAIN_JN_OPEN =
  'function jn(){let e=(0,h.useRef)(null),{scrollYProgress:t}=i({target:e,offset:[`start start`,`end end`]});return(0,S.jsxs)(Ae,{className:`testi-section`,"data-framer-name":`Testimonials`,id:`testimonials`,children:[(0,S.jsxs)(`div`,{className:`testi-head`,children:[';

const NESTED_STACK =
  'className:`testi-stack`,"data-nav-theme":`dark`,children:kn.map((e,n)=>(0,S.jsx)(An,{data:e,index:n,total:kn.length,progress:o}';

const FLAT_STACK =
  'className:`testi-stack`,ref:t,children:kn.map((e,n)=>(0,S.jsx)(An,{data:e,index:n,total:kn.length,progress:o}';

const PLAIN_STACK =
  'className:`testi-stack`,ref:e,children:kn.map((e,n)=>(0,S.jsx)(An,{data:e,index:n,total:kn.length,progress:t}';

const PLAIN_JN_CLOSE =
  'kn.map((e,n)=>(0,S.jsx)(An,{data:e,index:n,total:kn.length,progress:t},e.name))})]})}var k={';

const NESTED_JN_CLOSE =
  'kn.map((e,n)=>(0,S.jsx)(An,{data:e,index:n,total:kn.length,progress:o},e.name))})]})]})]})}var k={';

const FLAT_JN_CLOSE =
  'kn.map((e,n)=>(0,S.jsx)(An,{data:e,index:n,total:kn.length,progress:o},e.name))})]})]})}var k={';

function findHomepageBundle() {
  const indexHtml = fs.readFileSync(path.join(distRoot, 'index.html'), 'utf8');
  const match = indexHtml.match(/assets\/(index-[A-Za-z0-9_-]+\.js)/);
  if (!match) throw new Error('Testi patch: homepage bundle not found');
  const onDisk = fs.readdirSync(assetsDir).find((name) => name.toLowerCase() === match[1].toLowerCase());
  if (!onDisk) throw new Error(`Testi patch: missing ${match[1]}`);
  return path.join(assetsDir, onDisk);
}

function patchBundle(source) {
  if (source.includes(MOTION_FLAT_MARKER)) {
    console.log('homepage testi: flat enter already patched');
    return source;
  }

  if (source.includes(MOTION_NESTED_OPEN)) {
    console.log('homepage testi: nested → flat enter (bento pattern)');
    if (!source.includes(NESTED_JN_CLOSE)) throw new Error('Testi patch: nested close not found');
    return source
      .replace(MOTION_NESTED_OPEN, MOTION_FLAT_OPEN)
      .replace(NESTED_JN_CLOSE, FLAT_JN_CLOSE)
      .replace(NESTED_STACK, FLAT_STACK);
  }

  if (source.includes(PLAIN_JN_OPEN)) {
    console.log('homepage testi: plain → flat enter');
    if (!source.includes(PLAIN_JN_CLOSE)) throw new Error('Testi patch: plain close not found');
    return source
      .replace(PLAIN_JN_OPEN, MOTION_FLAT_OPEN)
      .replace(PLAIN_JN_CLOSE, FLAT_JN_CLOSE)
      .replace(PLAIN_STACK, FLAT_STACK);
  }

  throw new Error('Testi patch: jn() anchor not found');
}

function assertBundleSyntax(source, bundlePath) {
  try {
    parse(source, { ecmaVersion: 'latest', sourceType: 'module' });
  } catch (error) {
    throw new Error(`Testi patch: ${path.basename(bundlePath)} invalid — ${error.message}`);
  }
}

function patchIndexHtml() {
  const indexPath = path.join(distRoot, 'index.html');
  let html = fs.readFileSync(indexPath, 'utf8');
  const CSS_LINK = `<link rel="stylesheet" crossorigin href="/assets/testi-stage-enter.css?v=${CACHE_BUST}">`;

  if (!html.includes('testi-stage-enter.css')) {
    html = html.replace(
      /<link rel="stylesheet" crossorigin href="\/assets\/bento-stage-enter\.css(?:\?v=[^"]*)?">/,
      `$&\n    ${CSS_LINK}`,
    );
  } else {
    html = html.replace(/\/assets\/testi-stage-enter\.css(?:\?v=[^"]*)?/g, `/assets/testi-stage-enter.css?v=${CACHE_BUST}`);
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
console.log(`homepage testi stage: css (v=${CACHE_BUST})`);
