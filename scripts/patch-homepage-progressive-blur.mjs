import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const nacewRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distRoot = path.join(nacewRoot, 'homepage-dist');
const assetsDir = path.join(distRoot, 'assets');

const CSS_SRC = path.join(nacewRoot, 'scripts', 'progressive-blur', 'progressive-blur.css');
const JS_SRC = path.join(nacewRoot, 'scripts', 'progressive-blur', 'progressive-blur.js');
const CSS_DEST = path.join(assetsDir, 'progressive-blur.css');
const JS_DEST = path.join(assetsDir, 'progressive-blur.js');

const CACHE_BUST = '20260611q';

function patchIndexHtml() {
  const indexPath = path.join(distRoot, 'index.html');
  let html = fs.readFileSync(indexPath, 'utf8');

  const CSS_LINK = `<link rel="stylesheet" crossorigin href="/assets/progressive-blur.css?v=${CACHE_BUST}">`;
  const JS_SCRIPT = `<script defer src="/assets/progressive-blur.js?v=${CACHE_BUST}"></script>`;

  if (!html.includes('progressive-blur.css')) {
    html = html.replace(
      /<link rel="stylesheet" crossorigin href="\/assets\/hero-about-content\.css(?:\?v=[^"]*)?">/,
      `$&\n    ${CSS_LINK}`,
    );
  } else {
    html = html.replace(/\/assets\/progressive-blur\.css(?:\?v=[^"]*)?/g, `/assets/progressive-blur.css?v=${CACHE_BUST}`);
  }

  html = html.replace(/\n?\s*<script defer src="\/assets\/progressive-blur\.js[^"]*"><\/script>/g, '');

  if (!html.includes('progressive-blur.js')) {
    html = html.replace(
      /<script defer src="\/assets\/hero-meta-effects\.js[^"]*"><\/script>/,
      `$&\n    ${JS_SCRIPT}`,
    );
  } else {
    html = html.replace(/\/assets\/progressive-blur\.js(?:\?v=[^"]*)?/g, `/assets/progressive-blur.js?v=${CACHE_BUST}`);
  }

  fs.writeFileSync(indexPath, html);
}

fs.copyFileSync(CSS_SRC, CSS_DEST);
fs.copyFileSync(JS_SRC, JS_DEST);
patchIndexHtml();
console.log(`homepage progressive blur: assets linked (v=${CACHE_BUST})`);
