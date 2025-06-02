import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import eslint from 'vite-plugin-eslint';

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: 'build',
  },
  server: {
    port: 3000,
  },
  plugins: [react(), viteTsconfigPaths(), eslint()],
  worker: {
    plugins: () => [viteTsconfigPaths()],
  },
  // Configuration for GH pages
  base: './',
  test: {
    exclude: ['tests', 'node_modules'],
  },
});
