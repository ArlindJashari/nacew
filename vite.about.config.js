import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const root = path.dirname(fileURLToPath(import.meta.url));
const webAboutDir = path.resolve(root, '../Nacew : WEb/about');

export default defineConfig({
  plugins: [react()],
  base: '/about/',
  root,
  publicDir: path.resolve(root, 'about-public'),
  resolve: {
    alias: {
      '@nacew/sections': path.resolve(root, 'shared/about-sections/src/index.ts'),
    },
  },
  build: {
    outDir: webAboutDir,
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(root, 'about.html'),
    },
  },
});
