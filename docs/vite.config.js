import svelte from '@sveltejs/vite-plugin-svelte'
import autoprefixer from 'autoprefixer'
import vite from 'vite'
import fs from 'fs';

const { defineConfig } = vite;

export default defineConfig(({ command, mode }) => {
  const isProduction = mode === 'production'

  return {
    base: '',
    css: {
      postcss: {
        plugins: [
          autoprefixer({
            overrideBrowserslist: ['last 1 version', 'ie >= 11'],
          }),
        ],
      },
    },
    plugins: [
      svelte()
    ],
    build: {
      minify: isProduction,
      outDir: 'build',
    }
  }
})
