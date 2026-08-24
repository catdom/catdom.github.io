import type { APIRoute } from 'astro';
import { site } from '../data/site';

/* Generated rather than static, so it can never disagree with
   `site.indexable`. */
export const GET: APIRoute = () => {
  const body = site.indexable
    ? `User-agent: *\nAllow: /\n\nSitemap: ${site.origin}/sitemap.xml\n`
    : `User-agent: *\nDisallow: /\n`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
