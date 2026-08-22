import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/* Typed content collections. The schema is the contract: if a project file
 * is missing a required field, `astro build` fails loudly rather than
 * rendering a half-empty card. */

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    /** One line. Appears on the bento card. */
    summary: z.string(),
    year: z.number().int().min(1990).max(2100),
    role: z.string(),
    /** Client, employer, or "Personal". */
    org: z.string(),
    tags: z.array(z.string()).min(1).max(6),
    /** Headline outcome, e.g. "48% faster first paint". Optional. */
    outcome: z.string().optional(),
    links: z
      .object({
        live: z.string().url().optional(),
        repo: z.string().url().optional(),
        writeup: z.string().url().optional(),
      })
      .default({}),
    /** Bento placement. col/row are grid spans on the 12-col desktop grid. */
    layout: z
      .object({
        col: z.union([z.literal(3), z.literal(4), z.literal(6), z.literal(8), z.literal(12)]),
        row: z.union([z.literal(1), z.literal(2), z.literal(3)]),
        /** Renders the cell in the accent colour. Use once, at most. */
        accent: z.boolean().default(false),
      })
      .default({ col: 6, row: 2, accent: false }),
    /** Lower numbers appear first. */
    order: z.number().default(99),
    /** Featured projects get a bento cell; the rest go in the archive table. */
    featured: z.boolean().default(true),
    /** Set false to keep a draft out of the production build. */
    published: z.boolean().default(true),
    cover: z
      .object({
        src: z.string(),
        alt: z.string(),
      })
      .optional(),
  }),
});

export const collections = { projects };
