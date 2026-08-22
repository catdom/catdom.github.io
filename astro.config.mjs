// @ts-check
import { defineConfig } from 'astro/config';

// NOTE: update `site` to your real domain before deploying — it drives
// canonical URLs, OG tags and the sitemap.
export default defineConfig({
  site: 'https://example.com',
  trailingSlash: 'ignore',
  // 'directory' emits /work/slug/index.html, which every static host serves
  // correctly with no rewrite rules. 'file' would need host-specific config.
  build: { inlineStylesheets: 'auto', format: 'directory' },
  prefetch: { prefetchAll: true, defaultStrategy: 'viewport' },
  compressHTML: true,
  vite: {
    build: {
      cssMinify: 'lightningcss',
      // Keep the JS surface tiny and inspectable — this is a privacy-first site.
      rollupOptions: { output: { manualChunks: undefined } },
    },
  },
});
