// @ts-check
import { defineConfig } from 'astro/config';

// Deployed to GitHub Pages as a user site (catdom.github.io), so the site lives
// at the domain root and needs no `base`. `site` drives canonical URLs, OG tags
// and the sitemap — keep it in sync with `src/data/site.ts`.
export default defineConfig({
  site: 'https://catdom.github.io',
  trailingSlash: 'ignore',
  // 'directory' emits /work/slug/index.html, which GitHub Pages serves without
  // any rewrite rules.
  build: { inlineStylesheets: 'auto', format: 'directory' },
  prefetch: { prefetchAll: true, defaultStrategy: 'viewport' },
  compressHTML: true,
  vite: {
    build: {
      cssMinify: 'lightningcss',
      rollupOptions: { output: { manualChunks: undefined } },
    },
  },
});
