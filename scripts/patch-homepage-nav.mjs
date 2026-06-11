import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const nacewRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const assetsDir = path.join(nacewRoot, 'homepage-dist', 'assets');

const ABOUT_ENTRY =
  '{label:`About`,href:`/about/`,desktopClassName:`framer-n64igo`,mobileClassName:`framer-s3kwg5`}';

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

if (source.includes('href:`/about/`')) {
  console.log('homepage nav: About link already present');
  process.exit(0);
}

const navStart = 'ue=[{label:`Platforms`,href:`./#why-nacew`';
if (!source.includes(navStart)) {
  throw new Error('Homepage nav patch anchor not found — bundle layout may have changed');
}

source = source.replace(navStart, `ue=[${ABOUT_ENTRY},{label:\`Platforms\`,href:\`./#why-nacew\``);
fs.writeFileSync(bundlePath, source);
console.log(`homepage nav: added About → /about/ in ${path.basename(bundlePath)}`);
