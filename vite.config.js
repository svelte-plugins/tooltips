import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { svelteTesting } from '@testing-library/svelte/vite'

export default defineConfig({
  plugins: [svelte({ emitCss: false }), svelteTesting()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.js'],
    testTimeout: 20000,
    include: ['./src/**/*.test.js'],
    alias: [

    ],
    resolveSnapshotPath: (testPath, snapExtension) => testPath.replace(/\.test\.([tj]s?)/, `${snapExtension}.$1`)
  }
});
