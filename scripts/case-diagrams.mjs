/* Draws the case-study diagrams.
 *
 * The case pages carry screenshots of the products. What they were missing is
 * the part of the work that never shows up in a screenshot: the token that two
 * brands share, the satisfaction score wired to an OKR, the skill matrix behind
 * a team of eight, the grid a brand book insists on. These are those.
 *
 * Drawn in the site's own language so they sit beside the screenshots without
 * arguing with them: paper ground, hairline rules, one accent, mono labels, and
 * the reference board's magenta for anything that measures rather than states.
 *
 * Run with: node scripts/case-diagrams.mjs
 */

import { writeFileSync, mkdirSync } from 'node:fs';

const C = {
  paper: '#f6f6f3',
  panel: '#fffffd',
  rule: '#dcdbd3',
  rule2: '#e9e8e1',
  ink: '#100f0d',
  ink2: '#55534c',
  ink3: '#6f6d66',
  mark: '#1f3fd8',
  markSoft: '#c9d1f5',
  spec: '#cb008e',
};

const MONO = "'Geist Mono', ui-monospace, SFMono-Regular, Menlo, monospace";
const SANS = "'DM Sans', ui-sans-serif, system-ui, -apple-system, sans-serif";

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const svg = (w, h, body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img">
<rect width="${w}" height="${h}" fill="${C.panel}"/>
${body}
</svg>`;

const rect = (x, y, w, h, o = {}) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.r ?? 0}" fill="${o.fill ?? 'none'}" stroke="${o.stroke ?? C.rule}" stroke-width="${o.sw ?? 1}"${o.dash ? ` stroke-dasharray="${o.dash}"` : ''}/>`;

const line = (x1, y1, x2, y2, o = {}) =>
  `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="${o.stroke ?? C.rule}" stroke-width="${o.sw ?? 1}"${o.dash ? ` stroke-dasharray="${o.dash}"` : ''}/>`;

/** Mono, uppercase, tracked out: the metadata voice, same as the page. */
const meta = (x, y, text, o = {}) =>
  `<text x="${x}" y="${y}" font-family="${MONO}" font-size="${o.size ?? 11}" letter-spacing="0.08em" fill="${o.fill ?? C.ink3}"${o.anchor ? ` text-anchor="${o.anchor}"` : ''}>${esc(o.raw ? text : String(text).toUpperCase())}</text>`;

const label = (x, y, text, o = {}) =>
  `<text x="${x}" y="${y}" font-family="${SANS}" font-size="${o.size ?? 15}" font-weight="${o.weight ?? 500}" fill="${o.fill ?? C.ink}"${o.anchor ? ` text-anchor="${o.anchor}"` : ''}>${esc(text)}</text>`;

/** An arrow, drawn as the page draws them: a hairline and two short strokes. */
const arrow = (x1, y, x2, o = {}) => {
  const s = o.stroke ?? C.mark;
  const d = x2 > x1 ? -1 : 1;
  return [
    line(x1, y, x2, y, { stroke: s }),
    line(x2, y, x2 + d * 6, y - 4, { stroke: s }),
    line(x2, y, x2 + d * 6, y + 4, { stroke: s }),
  ].join('\n');
};

/** A dimension callout in the board's magenta: it measures, it does not state. */
const dim = (x1, y, x2, text) =>
  [
    line(x1, y, x2, y, { stroke: C.spec }),
    line(x1, y - 4, x1, y + 4, { stroke: C.spec }),
    line(x2, y - 4, x2, y + 4, { stroke: C.spec }),
    meta((x1 + x2) / 2, y - 8, text, { fill: C.spec, anchor: 'middle' }),
  ].join('\n');

/* ---------------------------------------------------------------------------
   1. Fotocasa — one token, two brands.
--------------------------------------------------------------------------- */
const tokens = () => {
  const W = 1200;
  const H = 640;
  const out = [];

  out.push(meta(48, 46, 'SUI · token resolution'));
  out.push(label(48, 82, 'One definition, two brands, no forking', { size: 22, weight: 500 }));

  const rows = [
    ['color/brand/primary', '#1f3fd8', '#0a7d5a'],
    ['color/surface/raised', '#ffffff', '#ffffff'],
    ['radius/control', '8', '999'],
    ['space/inset/md', '16', '16'],
    ['type/body/size', '16', '16'],
  ];

  const x0 = 48;
  const xB1 = 620;
  const xB2 = 900;
  const y0 = 150;
  const step = 62;

  out.push(meta(x0, y0 - 22, 'token'));
  out.push(meta(xB1, y0 - 22, 'Fotocasa', { raw: true, fill: C.ink2 }));
  out.push(meta(xB2, y0 - 22, 'Habitaclia', { raw: true, fill: C.ink2 }));
  out.push(line(x0, y0 - 12, W - 48, y0 - 12, { stroke: C.rule }));

  rows.forEach(([name, a, b], i) => {
    const y = y0 + i * step;
    out.push(meta(x0, y + 20, name, { raw: true, fill: C.ink, size: 12 }));
    out.push(line(x0, y + 38, W - 48, y + 38, { stroke: C.rule2 }));
    out.push(arrow(x0 + 330, y + 16, xB1 - 24));

    [
      [xB1, a],
      [xB2, b],
    ].forEach(([x, value]) => {
      if (String(value).startsWith('#')) {
        out.push(rect(x, y + 4, 22, 22, { fill: value, stroke: C.rule, r: 3 }));
        out.push(meta(x + 32, y + 20, value, { raw: true, fill: C.ink2, size: 12 }));
      } else {
        out.push(meta(x, y + 20, value, { raw: true, fill: C.ink2, size: 12 }));
      }
    });
  });

  /* The same component, resolved twice. */
  const yc = y0 + rows.length * step + 34;
  out.push(meta(x0, yc, 'the component both brands ship'));

  const button = (x, y, fill, radius) =>
    [
      rect(x, y, 168, 44, { fill, stroke: fill, r: radius }),
      `<text x="${x + 84}" y="${y + 28}" font-family="${SANS}" font-size="14" font-weight="500" fill="#ffffff" text-anchor="middle">Contactar</text>`,
    ].join('\n');

  out.push(button(xB1, yc + 14, '#1f3fd8', 8));
  out.push(button(xB2, yc + 14, '#0a7d5a', 22));
  out.push(dim(xB1, yc + 76, xB1 + 168, 'w 168 · h 44'));
  out.push(dim(xB2, yc + 76, xB2 + 168, 'w 168 · h 44'));
  out.push(meta(x0, yc + 34, 'the system owns the size,', { fill: C.spec }));
  out.push(meta(x0, yc + 52, 'the brand owns colour and radius', { fill: C.spec }));

  return svg(W, H, out.join('\n'));
};

/* ---------------------------------------------------------------------------
   2. coches.net — CSAT mapped to flows, folded into OKRs.
--------------------------------------------------------------------------- */
const csat = () => {
  const W = 1200;
  const H = 620;
  const out = [];

  out.push(meta(48, 46, 'experience quality, wired to the plan'));
  out.push(label(48, 82, 'CSAT on the key flows → company OKRs', { size: 22, weight: 500 }));

  const flows = [
    ['Search', 0.78],
    ['Listing detail', 0.84],
    ['Contact seller', 0.63],
    ['Publish a car', 0.71],
  ];

  const x0 = 48;
  const barX = 210;
  const barW = 300;
  const y0 = 156;
  const step = 68;

  out.push(meta(x0, y0 - 20, 'flow'));
  out.push(meta(barX, y0 - 20, 'CSAT'));
  out.push(line(x0, y0 - 10, 560, y0 - 10, { stroke: C.rule }));

  flows.forEach(([name, v], i) => {
    const y = y0 + i * step;
    out.push(label(x0, y + 18, name, { size: 15, weight: 500 }));
    out.push(rect(barX, y + 6, barW, 14, { fill: C.paper, stroke: C.rule2 }));
    out.push(rect(barX, y + 6, Math.round(barW * v), 14, { fill: v < 0.7 ? C.markSoft : C.mark, stroke: 'none' }));
    out.push(meta(barX + barW + 12, y + 18, `${Math.round(v * 100)}`, { fill: C.ink2, size: 12 }));
    out.push(line(x0, y + 38, 560, y + 38, { stroke: C.rule2 }));
  });

  /* The flow that scores worst is the one the objective picks up. */
  out.push(rect(barX - 8, y0 + 2 * step - 2, barW + 60, 30, { stroke: C.spec, dash: '3 3' }));
  out.push(meta(barX, y0 + 2 * step + 48, 'lowest score → this quarter\u2019s objective', { fill: C.spec }));

  out.push(arrow(600, 300, 668));

  /* The OKR card. */
  const ox = 700;
  out.push(rect(ox, 150, W - ox - 48, 300, { fill: C.paper, stroke: C.rule }));
  out.push(meta(ox + 24, 182, 'objective · Q3'));
  out.push(label(ox + 24, 214, 'Buyers reach a seller without friction', { size: 17 }));

  const krs = [
    ['KR1  Contact CSAT 63 → 75', 0.55],
    ['KR2  Contact drop-off −20%', 0.7],
    ['KR3  Reply rate +15%', 0.4],
  ];
  krs.forEach(([text, v], i) => {
    const y = 258 + i * 56;
    out.push(meta(ox + 24, y + 14, text, { raw: true, fill: C.ink2, size: 12 }));
    out.push(rect(ox + 24, y + 24, 360, 8, { fill: C.panel, stroke: C.rule2 }));
    out.push(rect(ox + 24, y + 24, Math.round(360 * v), 8, { fill: C.mark, stroke: 'none' }));
  });

  out.push(meta(48, H - 40, 'research → measurement → objective → the same number, next quarter'));
  return svg(W, H, out.join('\n'));
};

/* ---------------------------------------------------------------------------
   3. coches.net — the skill matrix behind two designers becoming eight.
--------------------------------------------------------------------------- */
const team = () => {
  const W = 1200;
  const H = 560;
  const out = [];

  out.push(meta(48, 46, 'team shape'));
  out.push(label(48, 82, 'Two designers to eight, on purpose', { size: 22, weight: 500 }));

  const skills = ['Research', 'IA', 'UI', 'Prototyping', 'Systems', 'Content'];
  const people = [
    [3, 1, 2, 1, 1, 0],
    [1, 2, 3, 2, 1, 1],
    [0, 1, 3, 1, 2, 0],
    [2, 3, 1, 1, 1, 1],
    [1, 1, 2, 3, 1, 0],
    [0, 1, 1, 1, 3, 1],
    [3, 1, 1, 0, 1, 2],
    [1, 2, 2, 1, 2, 3],
  ];

  const x0 = 230;
  const y0 = 150;
  const cw = 120;
  const ch = 40;

  skills.forEach((s, i) => out.push(meta(x0 + i * cw + cw / 2, y0 - 16, s, { anchor: 'middle' })));

  people.forEach((row, r) => {
    const y = y0 + r * ch;
    out.push(meta(48, y + 24, `0${r + 1}`, { raw: true, fill: r < 2 ? C.ink : C.ink3, size: 12 }));
    if (r < 2) out.push(meta(84, y + 24, 'from the start', { fill: C.spec, size: 10 }));
    row.forEach((depth, c) => {
      const x = x0 + c * cw;
      out.push(rect(x, y + 6, cw - 8, ch - 12, { stroke: C.rule2 }));
      if (depth > 0) {
        const fill = depth === 3 ? C.mark : depth === 2 ? '#7d8fe8' : C.markSoft;
        out.push(rect(x, y + 6, Math.round((cw - 8) * (depth / 3)), ch - 12, { fill, stroke: 'none' }));
      }
    });
  });

  const yl = y0 + people.length * ch + 40;
  out.push(meta(48, yl, 'depth'));
  [['aware', C.markSoft], ['practises', '#7d8fe8'], ['leads', C.mark]].forEach(([t, fill], i) => {
    out.push(rect(120 + i * 150, yl - 11, 14, 14, { fill, stroke: 'none' }));
    out.push(meta(140 + i * 150, yl, t, { fill: C.ink2 }));
  });

  out.push(dim(x0, y0 - 40, x0 + cw * skills.length - 8, 'six disciplines'));
  return svg(W, H, out.join('\n'));
};

/* ---------------------------------------------------------------------------
   4. Kleinanzeigen — the same pattern across the flows that carry the traffic.
--------------------------------------------------------------------------- */
const consistency = () => {
  const W = 1200;
  const H = 600;
  const out = [];

  out.push(meta(48, 46, 'before / after · one pattern'));
  out.push(label(48, 82, 'Four flows, four versions of the same row', { size: 22, weight: 500 }));

  const flows = ['Search results', 'Saved items', 'Category browse', 'Seller profile'];
  const x0 = 48;
  const cw = 276;
  const gap = 12;

  /* Before: the same listing row, drawn four slightly different ways. */
  flows.forEach((name, i) => {
    const x = x0 + i * (cw + gap);
    out.push(meta(x, 138, name, { raw: true, fill: C.ink2, size: 11 }));
    out.push(rect(x, 150, cw, 130, { fill: C.paper, stroke: C.rule }));
    // each variant differs: thumb size, radius, gap, price position
    const thumb = [56, 64, 48, 60][i];
    const r = [0, 6, 2, 12][i];
    const pad = [12, 16, 10, 14][i];
    out.push(rect(x + pad, 150 + pad, thumb, thumb, { fill: C.rule2, stroke: 'none', r }));
    out.push(rect(x + pad + thumb + 12, 150 + pad + 4, 120, 8, { fill: C.rule, stroke: 'none' }));
    out.push(rect(x + pad + thumb + 12, 150 + pad + 22, 80, 8, { fill: C.rule2, stroke: 'none' }));
    out.push(meta(x + pad + (i % 2 ? thumb + 12 : 0), 150 + pad + thumb + (i % 2 ? 34 : 46), '1.240 €', { raw: true, fill: C.ink, size: 12 }));
    out.push(meta(x + cw - 8, 272, `v${i + 1}`, { fill: C.spec, anchor: 'end' }));
  });

  out.push(dim(x0, 300, x0 + 4 * (cw + gap) - gap, 'four teams, four rows'));

  /* After: one row, used four times. */
  out.push(meta(x0, 372, 'after'));
  flows.forEach((name, i) => {
    const x = x0 + i * (cw + gap);
    out.push(rect(x, 386, cw, 130, { fill: C.paper, stroke: C.mark }));
    out.push(rect(x + 14, 400, 56, 56, { fill: C.markSoft, stroke: 'none', r: 4 }));
    out.push(rect(x + 82, 404, 120, 8, { fill: C.rule, stroke: 'none' }));
    out.push(rect(x + 82, 422, 80, 8, { fill: C.rule2, stroke: 'none' }));
    out.push(meta(x + 14, 486, '1.240 €', { raw: true, fill: C.ink, size: 12 }));
    out.push(meta(x + cw - 8, 508, 'row/listing', { raw: true, fill: C.mark, anchor: 'end', size: 11 }));
  });

  out.push(meta(48, H - 30, 'one component, four surfaces, one thing to fix when it is wrong'));
  return svg(W, H, out.join('\n'));
};

/* ---------------------------------------------------------------------------
   5. BMW — the grid a brand book insists on.
--------------------------------------------------------------------------- */
const grid = () => {
  const W = 1200;
  const H = 620;
  const out = [];

  out.push(meta(48, 46, 'brand standards, as a layout'));
  out.push(label(48, 82, 'Twelve columns nobody was allowed to move', { size: 22, weight: 500 }));

  const px = 120;
  const py = 132;
  const pw = W - px * 2;
  const ph = 372;
  const cols = 12;
  const gutter = 16;
  const colw = (pw - gutter * (cols - 1)) / cols;

  out.push(rect(px, py, pw, ph, { fill: C.paper, stroke: C.rule }));
  for (let i = 0; i < cols; i += 1) {
    const x = px + i * (colw + gutter);
    out.push(rect(x, py, colw, ph, { fill: '#eceaf6', stroke: 'none' }));
  }

  /* The page that sits on it. */
  out.push(rect(px, py + 28, pw, 56, { fill: 'rgba(255,255,253,0.88)', stroke: C.rule }));
  out.push(meta(px + 16, py + 62, 'masthead · fixed height'));
  out.push(rect(px, py + 104, colw * 8 + gutter * 7, 164, { fill: 'rgba(255,255,253,0.88)', stroke: C.rule }));
  out.push(meta(px + 16, py + 138, 'hero · 8 columns'));
  out.push(rect(px + colw * 8 + gutter * 8, py + 104, colw * 4 + gutter * 3, 164, { fill: 'rgba(255,255,253,0.88)', stroke: C.rule }));
  out.push(meta(px + colw * 8 + gutter * 8 + 16, py + 138, 'aside · 4'));
  for (let i = 0; i < 3; i += 1) {
    const x = px + i * (colw * 4 + gutter * 4);
    out.push(rect(x, py + 288, colw * 4 + gutter * 3, 64, { fill: 'rgba(255,255,253,0.88)', stroke: C.rule }));
    out.push(meta(x + 16, py + 326, `module ${i + 1}`));
  }

  out.push(dim(px, py + ph + 40, px + colw, `col ${Math.round(colw)}`));
  out.push(dim(px + colw + gutter, py + ph + 40, px + colw * 2 + gutter, `col ${Math.round(colw)}`));
  out.push(dim(px, py + ph + 86, px + pw, `content ${pw}`));
  out.push(meta(W - 48, 46, 'the same grid, every page, every market', { anchor: 'end' }));

  return svg(W, H, out.join('\n'));
};

mkdirSync('public/cases', { recursive: true });
writeFileSync('public/cases/fotocasa-tokens.svg', tokens());
writeFileSync('public/cases/coches-net-csat.svg', csat());
writeFileSync('public/cases/coches-net-team.svg', team());
writeFileSync('public/cases/kleinanzeigen-pattern.svg', consistency());
writeFileSync('public/cases/bmw-grid.svg', grid());
console.log('wrote 5 diagrams');
