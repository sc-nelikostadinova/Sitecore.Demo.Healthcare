import { defineConfig } from 'vitest/config';
import storybookTest from '@storybook/addon-vitest/vitest-plugin';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve __dirname in ESM
const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],

    // Spread Storybook annotations here
    ...storybookTest(),
  },

  // Optional Vite config
  resolve: {
    alias: {
      '@': path.resolve(dirname, 'src'),
    },
  },
});
