/**
 * Netlify export landed with lowercase filenames on disk, but index.html and
 * bundle imports use Vite's mixed-case hashes. macOS hides the bug; Linux 404s.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const nacewRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const assetsDir = path.join(nacewRoot, 'homepage-dist', 'assets');

/** lowercase key → canonical on-disk name referenced by index.html + bundle */
const CANONICAL_NAMES = {
  'index-c58hjqyr.js': 'index-C58hJQyr.js',
  'index-dgigvujc.css': 'index-DGigVuJC.css',
  'rolldown-runtime-cyuzqnbw.js': 'rolldown-runtime-Cyuzqnbw.js',
  'motion-bjb03ltd.js': 'motion-BJb03Ltd.js',
  'three-b32rv4gc.js': 'three-B32Rv4GC.js',
  'shaderwatergradient-d5wnqzec.js': 'ShaderWaterGradient-D5WnQZeC.js',
  'fallingtext-danamakc.js': 'FallingText-DANAmaKC.js',
  'physics-d_14ilgw.js': 'physics-D_14IlgW.js',
  'fallingtext-cmrla9zm.css': 'FallingText-CmrLa9zm.css',
};

function renameToCanonical(lowerKey, canonical) {
  const files = fs.readdirSync(assetsDir);
  const onDisk = files.find((name) => name.toLowerCase() === lowerKey);
  if (!onDisk || onDisk === canonical) {
    return false;
  }

  const from = path.join(assetsDir, onDisk);
  const temp = path.join(assetsDir, `.__casing_${canonical}`);
  const to = path.join(assetsDir, canonical);

  fs.renameSync(from, temp);
  fs.renameSync(temp, to);
  console.log(`homepage casing: ${onDisk} → ${canonical}`);
  return true;
}

let changed = 0;
for (const [lowerKey, canonical] of Object.entries(CANONICAL_NAMES)) {
  if (renameToCanonical(lowerKey, canonical)) {
    changed += 1;
  }
}

if (changed === 0) {
  console.log('homepage casing: ok (canonical asset names)');
}
