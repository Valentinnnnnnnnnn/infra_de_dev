// vite.config.ts or vitest.config.ts
import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    setupFiles: ['./app/tests/setup.js'],
    include: ['app/tests/**/*.test.{js,ts,tsx,jsx}'],
    includeSource: ['./app/**/*.js'],
    environment: 'jsdom',
    globals: true,
    css: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});