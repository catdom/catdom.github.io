import type { APIRoute } from 'astro';
import { site } from '../data/site';
import { cases } from '../data/cases';
import { LANGS, langPrefix } from '../data/types';

const urls = LANGS.flatMap((lang) => [
  `${site.origin}${langPrefix(lang)}/`,
  ...cases.map((c) => `${site.origin}${langPrefix(lang)}/work/${c.slug}/`),
]);

export const GET: APIRoute = () => {
  // Nothing to submit while the site is closed to crawlers.
  if (!site.indexable) return new Response('Not found', { status: 404 });

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u}</loc></url>`).join('\n')}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
};
