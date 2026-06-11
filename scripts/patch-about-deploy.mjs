import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const isVercel = process.env.VERCEL === '1';
const webRoot = isVercel
  ? path.join(root, 'homepage-dist')
  : path.resolve(root, '../Nacew : WEb');

const aboutIndex = path.join(webRoot, 'about', 'index.html');
if (!fs.existsSync(aboutIndex)) {
  console.error('about deploy patch: about/index.html missing');
  process.exit(1);
}

const RESPONSIVE = '/assets/responsive-fixes.css?v=20260611e';
const NAV_FIX = '/assets/nav-fix.js?v=20260611d';

let html = fs.readFileSync(aboutIndex, 'utf8');

if (!html.includes('responsive-fixes.css')) {
  html = html.replace(
    '</head>',
    `    <link rel="stylesheet" crossorigin href="${RESPONSIVE}">\n  </head>`,
  );
}

if (!html.includes('nav-fix.js')) {
  html = html.replace(
    '</body>',
    `    <script defer src="${NAV_FIX}"></script>\n  </body>`,
  );
}

fs.writeFileSync(aboutIndex, html);
console.log('about deploy: responsive-fixes + nav-fix linked');
