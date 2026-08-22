import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { profile } from '../lib/profile';

/* A hand-rolled sitemap rather than an integration: it is twelve lines, it
   has no dependencies, and it stays correct because it reads the same
   collection the pages do. */
export const GET: APIRoute = async ({ site }) => {
  const origin = (site ?? new URL(profile.seo.origin)).origin;
  const projects = await getCollection('projects', ({ data }) => data.published);

  const urls = [
    { loc: `${origin}/`, priority: '1.0' },
    ...projects.map((p) => ({ loc: `${origin}/work/${p.id}`, priority: '0.8' })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) =>
      `  <url><loc>${u.loc}</loc><changefreq>monthly</changefreq><priority>${u.priority}</priority></url>`,
  )
  .join('\n')}
</urlset>`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
