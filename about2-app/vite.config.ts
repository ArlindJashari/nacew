import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  base: "/about/",
  root,
  resolve: {
    alias: {
      "@nacew/sections": path.resolve(root, "shared/sections/src/index.ts"),
    },
  },
  server: {
    fs: {
      // Colon in "Nacew : WEb" breaks default path checks - relax for local dev
      strict: false,
      allow: [root, path.resolve(root, ".."), path.resolve(root, "../..")],
    },
  },
});
