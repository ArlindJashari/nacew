import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const nacewRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const homepageDist = path.join(nacewRoot, 'homepage-dist');
const isVercel = process.env.VERCEL === '1';
const webRoot = isVercel
  ? homepageDist
  : path.resolve(nacewRoot, '../Nacew : WEb');

const HOMEPAGE_JS = 'index-C58hJQyr.js';
const HOMEPAGE_CSS = 'index-DGigVuJC.css';

if (!isVercel && !fs.existsSync(webRoot)) {
  console.error(`Deploy folder not found: ${webRoot}`);
  process.exit(1);
}

if (!fs.existsSync(homepageDist)) {
  console.error(`homepage-dist missing (${homepageDist})`);
  process.exit(1);
}

execSync('node scripts/fix-homepage-asset-casing.mjs', { cwd: nacewRoot, stdio: 'inherit' });
execSync('node scripts/guard-homepage-dist.mjs', { cwd: nacewRoot, stdio: 'inherit' });

function resolveAssetCaseInsensitive(assetsDir, filename) {
  const onDisk = fs
    .readdirSync(assetsDir)
    .find((name) => name.toLowerCase() === filename.toLowerCase());
  return onDisk ? path.join(assetsDir, onDisk) : null;
}

function assertNetlifyHomepage(targetRoot) {
  const indexPath = path.join(targetRoot, 'index.html');
  const html = fs.readFileSync(indexPath, 'utf8');
  const assetsDir = path.join(targetRoot, 'assets');

  if (!html.toLowerCase().includes(HOMEPAGE_JS.toLowerCase())) {
    throw new Error(
      `Homepage guard: index.html must reference ${HOMEPAGE_JS}. ` +
        'Never deploy vite dist/ — it replaces the Netlify homepage.',
    );
  }

  if (!html.toLowerCase().includes(HOMEPAGE_CSS.toLowerCase())) {
    throw new Error(`Homepage guard: index.html must reference ${HOMEPAGE_CSS}.`);
  }

  const jsPath = resolveAssetCaseInsensitive(assetsDir, HOMEPAGE_JS);
  const cssPath = resolveAssetCaseInsensitive(assetsDir, HOMEPAGE_CSS);
  if (!jsPath || !cssPath) {
    throw new Error('Homepage guard: Netlify homepage assets missing from deploy folder.');
  }

  for (const forbidden of ['index-DRWs', 'index-Bvmv', 'index-D9Uhn']) {
    if (html.includes(forbidden)) {
      throw new Error(`Homepage guard: forbidden unified-build artifact "${forbidden}" in index.html.`);
    }
  }
}

const packageJson = path.join(webRoot, 'package.json');
const packageJsonBackup = fs.existsSync(packageJson)
  ? fs.readFileSync(packageJson, 'utf8')
  : null;

const aboutDir = path.join(webRoot, 'about');
if (fs.existsSync(aboutDir)) {
  fs.rmSync(aboutDir, { recursive: true, force: true });
}

execSync('node scripts/patch-homepage-nav.mjs', { cwd: nacewRoot, stdio: 'inherit' });
execSync('node scripts/patch-homepage-footer.mjs', { cwd: nacewRoot, stdio: 'inherit' });
execSync('node scripts/patch-homepage-hero-grain.mjs', { cwd: nacewRoot, stdio: 'inherit' });
execSync('node scripts/patch-homepage-hero-about-content.mjs', { cwd: nacewRoot, stdio: 'inherit' });
execSync('node scripts/patch-homepage-progressive-blur.mjs', { cwd: nacewRoot, stdio: 'inherit' });
execSync('node scripts/patch-homepage-contact.mjs', { cwd: nacewRoot, stdio: 'inherit' });
execSync('node scripts/patch-homepage-bento-stage.mjs', { cwd: nacewRoot, stdio: 'inherit' });
execSync('node scripts/patch-homepage-testi-stage.mjs', { cwd: nacewRoot, stdio: 'inherit' });
execSync('node scripts/guard-homepage-dist.mjs', { cwd: nacewRoot, stdio: 'inherit' });

// NEVER rsync dist/ here — only the frozen Netlify homepage bundle.
if (webRoot !== homepageDist) {
  execSync(`rsync -a --delete "${homepageDist}/" "${webRoot}/"`, { stdio: 'inherit' });
}
assertNetlifyHomepage(webRoot);

execSync('npm run build:about', { cwd: nacewRoot, stdio: 'inherit' });

const builtAboutHtml = path.join(aboutDir, 'about.html');
const aboutIndex = path.join(aboutDir, 'index.html');
if (fs.existsSync(builtAboutHtml)) {
  fs.renameSync(builtAboutHtml, aboutIndex);
}

if (!fs.existsSync(path.join(aboutDir, 'logo.svg'))) {
  fs.copyFileSync(path.join(webRoot, 'logo.svg'), path.join(aboutDir, 'logo.svg'));
}

fs.writeFileSync(
  path.join(webRoot, '_redirects'),
  [
    '/about2      /about/   301',
    '/about2/*    /about/   301',
    '/about       /about/index.html   200',
    '/about/      /about/index.html   200',
    '/about/*     /about/index.html   200',
    '/*           /index.html         200',
    '',
  ].join('\n'),
);

fs.writeFileSync(
  path.join(webRoot, 'serve.json'),
  `${JSON.stringify(
    {
      headers: [
        {
          source: '/assets/**',
          headers: [{ key: 'Cache-Control', value: 'no-store, no-cache, must-revalidate' }],
        },
        {
          source: '/index.html',
          headers: [{ key: 'Cache-Control', value: 'no-store' }],
        },
        {
          source: '/',
          headers: [{ key: 'Cache-Control', value: 'no-store' }],
        },
      ],
      redirects: [
        { source: '/about2', destination: '/about/', type: 301 },
        { source: '/about2/**', destination: '/about/', type: 301 },
      ],
    },
    null,
    2,
  )}\n`,
);

fs.writeFileSync(
  path.join(webRoot, 'netlify.toml'),
  [
    '# Static site: homepage from homepage-dist, /about built separately',
    '[build]',
    '  command = "npm run build:web"',
    '  publish = "."',
    '',
  ].join('\n'),
);

if (packageJsonBackup) {
  fs.writeFileSync(packageJson, packageJsonBackup);
}

const buildStamp = {
  builtAt: new Date().toISOString(),
  commit: execSync('git rev-parse --short HEAD', { cwd: nacewRoot, encoding: 'utf8' }).trim(),
  homepage: `homepage-dist (${HOMEPAGE_JS})`,
  about: 'about/index.html',
};
fs.writeFileSync(path.join(webRoot, '.build-stamp.json'), `${JSON.stringify(buildStamp, null, 2)}\n`);

console.log(
  isVercel
    ? `Vercel deploy ready in homepage-dist/ (+ /about)`
    : `synced Netlify homepage + /about → ${webRoot}`,
);
