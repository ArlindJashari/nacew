import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const root = path.dirname(fileURLToPath(import.meta.url));

function blockHomepageBuild() {
  return {
    name: 'block-homepage-vite-build',
    config(_config, env) {
      if (env.command === 'build') {
        throw new Error(
          [
            'Blocked: plain "vite build" replaces the frozen Netlify homepage.',
            'Use: npm run build:web  (sync homepage-dist + build /about only)',
            'src/ + index.html are dev-only — not production /.',
          ].join('\n'),
        );
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), blockHomepageBuild()],
  resolve: {
    alias: {
      '@nacew/sections': path.resolve(root, 'shared/about-sections/src/index.ts'),
    },
  },
  server: {
    port: 5180,
    strictPort: true,
  },
  preview: {
    port: 5180,
    strictPort: true,
  },
});
