import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const nacewRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const assetsDir = path.join(nacewRoot, 'homepage-dist', 'assets');

function findHomepageBundle() {
  const indexHtml = fs.readFileSync(path.join(nacewRoot, 'homepage-dist', 'index.html'), 'utf8');
  const match = indexHtml.match(/assets\/(index-[A-Za-z0-9_-]+\.js)/);
  if (!match) {
    throw new Error('Homepage bundle not referenced in homepage-dist/index.html');
  }
  const files = fs.readdirSync(assetsDir);
  const onDisk = files.find((name) => name.toLowerCase() === match[1].toLowerCase());
  if (!onDisk) {
    throw new Error(`Homepage bundle missing: ${match[1]}`);
  }
  return path.join(assetsDir, onDisk);
}

const bundlePath = findHomepageBundle();
let source = fs.readFileSync(bundlePath, 'utf8');

const footerStart =
  'Un=[{label:`Platforms`,href:`./#why-nacew`},{label:`Use Cases`,href:`./#what-you-get`}';
const footerPatched =
  'Un=[{label:`Platforms`,href:`./#why-nacew`},{label:`About`,href:`/about/`},{label:`Use Cases`,href:`./#what-you-get`}';

if (source.includes(footerPatched)) {
  console.log('homepage footer: About link already present');
  process.exit(0);
}

if (!source.includes(footerStart)) {
  throw new Error('Homepage footer patch anchor not found — bundle layout may have changed');
}

source = source.replace(footerStart, footerPatched);
fs.writeFileSync(bundlePath, source);
console.log(`homepage footer: added About → /about/ in ${path.basename(bundlePath)}`);
