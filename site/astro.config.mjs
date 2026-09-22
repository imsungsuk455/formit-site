import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  outDir: 'dist',
  site: 'https://PLACEHOLDER_DOMAIN',
  build: {
    format: 'directory',
  },
  compressHTML: true,
});
