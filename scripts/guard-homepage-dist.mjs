/**
 * Ensures homepage-dist still contains the frozen Netlify homepage bundle.
 * The unified Vite build (npm run build / vite build → dist/) must NEVER replace it.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const nacewRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const assetsDir = path.join(nacewRoot, 'homepage-dist', 'assets');

const MAX_FROZEN_BUNDLE_BYTES = 450_000;
const MIN_FROZEN_BUNDLE_BYTES = 250_000;

function findHomepageBundle() {
  const indexHtml = fs.readFileSync(path.join(nacewRoot, 'homepage-dist', 'index.html'), 'utf8');
  const match = indexHtml.match(/assets\/(index-[A-Za-z0-9_-]+\.js)/);
  if (!match) {
    throw new Error('Homepage guard: index.html has no homepage JS reference.');
  }

  const onDisk = fs
    .readdirSync(assetsDir)
    .find((name) => name.toLowerCase() === match[1].toLowerCase());

  if (!onDisk) {
    throw new Error(`Homepage guard: missing bundle ${match[1]}`);
  }

  return path.join(assetsDir, onDisk);
}

const bundlePath = findHomepageBundle();
const source = fs.readFileSync(bundlePath, 'utf8');
const { size } = fs.statSync(bundlePath);
const name = path.basename(bundlePath);

if (size > MAX_FROZEN_BUNDLE_BYTES || size < MIN_FROZEN_BUNDLE_BYTES) {
  throw new Error(
    [
      `Homepage guard: ${name} is ${size} bytes — not the frozen Netlify bundle.`,
      'A unified Vite build (~650KB) was likely copied into homepage-dist/.',
      'Fix: git restore homepage-dist/assets/',
      'Rule: never run "cp dist/assets/* homepage-dist/assets/".',
    ].join('\n'),
  );
}

const chunkMarkers = ['ShaderWaterGradient', 'FallingText', 'framer-3JG10'];
const markerHits = chunkMarkers.filter((marker) => source.includes(marker)).length;

if (markerHits < 2) {
  throw new Error(
    [
      `Homepage guard: ${name} is missing frozen homepage markers.`,
      `Expected at least 2 of: ${chunkMarkers.join(', ')}`,
      'Fix: git restore homepage-dist/assets/',
    ].join('\n'),
  );
}

if (source.includes('ContactModalProvider')) {
  throw new Error(
    `Homepage guard: ${name} contains React ContactModal in main bundle. Restore the frozen bundle.`,
  );
}

console.log(`homepage guard: ok (${name}, ${size} bytes, frozen Netlify bundle)`);
