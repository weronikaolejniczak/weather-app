import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@/': '/src/',
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/tests/setup.ts',
  },
});
