/* Draws the four capability figures.
 *
 * Same line as the hero's plate — nested hairlines in the palette's blues,
 * one in every few drawn heavier as an index contour — but each capability
 * gets its own geometry, so the four read as four things and not as four
 * versions of the same blob:
 *
 *   PT-01  triangles converging on a point   — a direction
 *   PT-02  two square fields overlapping     — friction resolved between them
 *   PT-03  a hexagon tiling                  — a system, modular and repeatable
 *   PT-04  circles multiplying outward       — a team growing
 *
 * Run with: node scripts/figures.mjs
 */

import { writeFileSync, mkdirSync } from 'node:fs';

const W = 640;
const H = 260;
const SQUASH = 0.78; // the band is wide and short; everything is flattened to it

const INK = {
  mark: '#1f3fd8',
  deep: '#17309f',
  soft: '#7d8fe8',
};

/** A regular polygon, or a circle when sides is high enough not to show. */
const poly = (cx, cy, r, sides, rot = 0, squash = SQUASH) => {
  const pts = [];
  for (let i = 0; i < sides; i += 1) {
    const a = rot + (i / sides) * Math.PI * 2;
    pts.push(`${(cx + Math.cos(a) * r).toFixed(1)} ${(cy + Math.sin(a) * r * squash).toFixed(1)}`);
  }
  return `M${pts.join('L')}Z`;
};

const line = (d, tint, weight, opacity) =>
  `<path d="${d}" stroke="${tint}" stroke-width="${weight}" opacity="${opacity.toFixed(2)}" stroke-linejoin="round"/>`;

const plate = (paths) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" fill="none" aria-hidden="true">\n${paths.join('\n')}\n</svg>`;

/* PT-01 — nested triangles, each one smaller and further right: everything
   aiming at the same point rather than sitting around the same centre. */
const triangles = () => {
  const out = [];
  const rings = 15;
  for (let i = 0; i < rings; i += 1) {
    const t = i / (rings - 1);
    const r = 128 - t * 108;
    const cx = W * 0.42 + t * 96;
    const index = i % 4 === 0;
    out.push(
      line(
        poly(cx, H * 0.52, r, 3, -Math.PI / 2 + t * 0.06),
        index ? INK.mark : INK.soft,
        index ? 1.5 : 1,
        0.9 - t * 0.4,
      ),
    );
  }
  return plate(out);
};

/* PT-02 — two stacks of squares from two centres, overlapping in the middle:
   the two sides of a process meeting where the friction is. */
const squares = () => {
  const out = [];
  /* Same figure twice, not two different ones: what makes the picture is the
     overlap, so both fields are drawn on the same diagonal. */
  for (const [cx, tint] of [
    [W * 0.4, INK.mark],
    [W * 0.6, INK.deep],
  ]) {
    for (let i = 0; i < 9; i += 1) {
      const t = i / 8;
      const r = 26 + t * 118;
      const index = i % 3 === 0;
      out.push(
        line(poly(cx, H * 0.5, r, 4, Math.PI / 4), index ? tint : INK.soft, index ? 1.5 : 1, 0.85 - t * 0.5),
      );
    }
  }
  return plate(out);
};

/* PT-03 — a hexagon tiling: one cell, then its six neighbours, each drawn
   twice. A system is the same part, repeated, fitting its neighbours exactly. */
const hexes = () => {
  const out = [];
  const R = 46;
  const dx = R * 1.5;
  const dy = R * Math.sqrt(3) * SQUASH;
  const cells = [[0, 0]];
  for (let i = 0; i < 6; i += 1) {
    const a = (i / 6) * Math.PI * 2;
    cells.push([Math.round(Math.cos(a) * dx * 1.34), Math.round(Math.sin(a) * dy * 0.86)]);
  }
  // A second ring, further out and fainter, so the tiling reads as endless.
  for (let i = 0; i < 6; i += 1) {
    const a = (i / 6) * Math.PI * 2 + Math.PI / 6;
    cells.push([Math.round(Math.cos(a) * dx * 2.5), Math.round(Math.sin(a) * dy * 1.6)]);
  }
  cells.forEach(([ox, oy], n) => {
    const far = n > 6;
    for (let i = 0; i < 3; i += 1) {
      const r = R - i * 13;
      out.push(
        line(
          poly(W * 0.5 + ox, H * 0.5 + oy, r, 6, Math.PI / 6),
          i === 0 ? (far ? INK.soft : INK.mark) : INK.soft,
          i === 0 && !far ? 1.5 : 1,
          (far ? 0.4 : 0.85) - i * 0.16,
        ),
      );
    }
  });
  return plate(out);
};

/* PT-04 — circles multiplying: one stack on the left, then more of them, each
   further right and a little larger. Two designers, then eight. */
const circles = () => {
  const out = [];
  const cluster = (cx, cy, r, rings, tint) => {
    for (let i = 0; i < rings; i += 1) {
      const t = i / Math.max(1, rings - 1);
      const index = i === 0;
      out.push(line(poly(cx, cy, r * (0.3 + t * 0.7), 64, 0), index ? tint : INK.soft, index ? 1.5 : 1, 0.9 - t * 0.5));
    }
  };
  const centres = [
    [W * 0.14, H * 0.5, 30, 3],
    [W * 0.33, H * 0.38, 40, 4],
    [W * 0.5, H * 0.58, 52, 5],
    [W * 0.69, H * 0.4, 64, 6],
    [W * 0.88, H * 0.56, 76, 7],
  ];
  centres.forEach(([cx, cy, r, rings], n) => cluster(cx, cy, r, rings, n % 2 ? INK.deep : INK.mark));
  return plate(out);
};

mkdirSync('public/figures', { recursive: true });
writeFileSync('public/figures/pt-01.svg', triangles());
writeFileSync('public/figures/pt-02.svg', squares());
writeFileSync('public/figures/pt-03.svg', hexes());
writeFileSync('public/figures/pt-04.svg', circles());
console.log('wrote 4 figures');
