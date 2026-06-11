import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const nacewRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const webRoot = path.resolve(nacewRoot, '../Nacew : WEb');

if (!fs.existsSync(path.join(webRoot, 'assets', 'index-c58hjqyr.js'))
    && !fs.existsSync(path.join(webRoot, 'assets', 'index-C58hJQyr.js'))) {
  console.log('WEb folder missing Netlify homepage — running build:web first…');
  spawn('node', ['scripts/sync-web.mjs'], { cwd: nacewRoot, stdio: 'inherit' }).on('exit', start);
} else {
  start();
}

function start() {
  console.log('Serving site at http://localhost:8000 (same homepage as Netlify)');
  console.log('About page: http://localhost:8000/about');
  console.log('Edit React source: npm run dev:app in Nacew (port 5180)');
  const serveConfig = path.join(webRoot, 'serve.json');
  const child = spawn(
    process.platform === 'win32' ? 'npx.cmd' : 'npx',
    ['--yes', 'serve', '-l', '8000', '--no-port-switching', '-c', serveConfig],
    { cwd: webRoot, stdio: 'inherit' },
  );
  child.on('error', (error) => {
    console.error(error);
    process.exit(1);
  });
}
