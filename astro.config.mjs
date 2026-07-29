// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://designpay.asia',
  integrations: [
    sitemap({
      // /docs/patterns is the component catalogue — a contributor reference,
      // not a reader surface (see src/data/route-purposes.json). Keep it out
      // of the sitemap; it also carries its own noindex (see patterns.astro).
      filter: (page) => !page.includes('/docs/patterns'),
    }),
  ],
});
