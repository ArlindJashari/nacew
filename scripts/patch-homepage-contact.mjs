import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const nacewRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const assetsDir = path.join(nacewRoot, 'homepage-dist', 'assets');

const MARKER = '/* NACEW_CONTACT_MODAL */';
const BOOTSTRAP =
  `${MARKER}(function(){if(window.__NACEW_CONTACT_BOOT__)return;window.__NACEW_CONTACT_BOOT__=1;` +
  `function l(){import("/assets/nacew-contact-modal.js").then(function(m){m.openContactModalView()})}` +
  `document.addEventListener("click",function(e){var t=e.target.closest("a[href*='mailto:contact@nacew.com'],[data-nacew-contact]");` +
  `if(!t)return;e.preventDefault();l()},true);` +
  `window.addEventListener("nacew:open-contact",l);})();`;

function findHomepageBundle() {
  const indexHtml = fs.readFileSync(path.join(nacewRoot, 'homepage-dist', 'index.html'), 'utf8');
  const match = indexHtml.match(/assets\/(index-[A-Za-z0-9_-]+\.js)/);
  if (!match) throw new Error('Contact patch: homepage bundle not found in index.html');
  const onDisk = fs.readdirSync(assetsDir).find((name) => name.toLowerCase() === match[1].toLowerCase());
  if (!onDisk) throw new Error(`Contact patch: missing ${match[1]}`);
  return path.join(assetsDir, onDisk);
}

function copyContactAssets() {
  const jsSrc = path.join(nacewRoot, 'scripts', 'contact-modal', 'nacew-contact-modal.js');
  const cssSrc = path.join(nacewRoot, 'shared', 'contact-modal.css');
  fs.copyFileSync(jsSrc, path.join(assetsDir, 'nacew-contact-modal.js'));
  fs.copyFileSync(cssSrc, path.join(assetsDir, 'nacew-contact-modal.css'));
}

const bundlePath = findHomepageBundle();
let source = fs.readFileSync(bundlePath, 'utf8');

copyContactAssets();

if (source.includes(MARKER)) {
  console.log('homepage contact: bootstrap already present');
  process.exit(0);
}

source += BOOTSTRAP;
fs.writeFileSync(bundlePath, source);
console.log(`homepage contact: bootstrap appended to ${path.basename(bundlePath)}`);
