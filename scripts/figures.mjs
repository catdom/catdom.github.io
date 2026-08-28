/* Draws the four capability figures.
 *
 * The silhouettes are the ones supplied for the section; what this script does
 * is put them in the site's line: nested outlines in the palette's blues,
 * one in every few drawn heavier, the way the hero's plate is drawn. Nobody
 * fills anything — the page has no solids anywhere else either.
 *
 *   PT-01  a burst, nested          — everything pointing at one place
 *   PT-02  four quadrants, nested   — the seams between four parts of a process
 *   PT-03  a matrix, tiled          — the same cell, repeated, fitting exactly
 *   PT-04  four petals, nested      — one centre opening out
 *
 * Run with: node scripts/figures.mjs
 */

import { writeFileSync, mkdirSync } from 'node:fs';

const W = 640;
/* The band the plates sit in is wide and short, and the card crops to fill it.
   Drawing on the band's own ratio means the crop takes almost nothing. */
const H = 150;
const BOX = 256; // the supplied shapes are all drawn on a 256 square

const INK = {
  mark: '#1f3fd8',
  deep: '#17309f',
  soft: '#7d8fe8',
};

/* The four supplied silhouettes, verbatim. */
const SHAPE = {
  quadrants:
    'M 100 136 C 111.046 136 120 144.954 120 156 L 120 256 L 100 256 C 44.772 256 0 211.228 0 156 L 0 136 Z M 256 256 L 136 256 L 136 156 C 136 144.954 144.954 136 156 136 L 256 136 Z M 120 100 C 120 111.046 111.046 120 100 120 L 0 120 L 0 100 C 0 44.772 44.772 0 100 0 L 120 0 Z M 156 0 C 211.228 0 256 44.772 256 100 L 256 120 L 156 120 C 144.954 120 136 111.046 136 100 L 136 0 Z',
  matrix:
    'M 0 226.017 C 17.21 226.545 31 240.661 31 258 L 0 258 Z M 85 226 C 102.673 226 117 240.327 117 258 L 53 258 C 53 240.327 67.327 226 85 226 Z M 171 226 C 188.673 226 203 240.327 203 258 L 139 258 C 139 240.327 153.327 226 171 226 Z M 257 258 L 225 258 C 225 240.327 239.327 226 257 226 Z M 85 140 C 102.673 140 117 154.327 117 172 C 117 189.673 102.673 204 85 204 C 67.327 204 53 189.673 53 172 C 53 154.327 67.327 140 85 140 Z M 171 140 C 188.673 140 203 154.327 203 172 C 203 189.673 188.673 204 171 204 C 153.327 204 139 189.673 139 172 C 139 154.327 153.327 140 171 140 Z M 257 204 C 239.327 204 225 189.673 225 172 C 225 154.327 239.327 140 257 140 Z M 0 140.017 C 17.21 140.545 31 154.661 31 172 C 31 189.339 17.21 203.454 0 203.982 Z M 85 54 C 102.673 54 117 68.327 117 86 C 117 103.673 102.673 118 85 118 C 67.327 118 53 103.673 53 86 C 53 68.327 67.327 54 85 54 Z M 171 54 C 188.673 54 203 68.327 203 86 C 203 103.673 188.673 118 171 118 C 153.327 118 139 103.673 139 86 C 139 68.327 153.327 54 171 54 Z M 257 118 C 239.327 118 225 103.673 225 86 C 225 68.327 239.327 54 257 54 Z M 0 54.017 C 17.21 54.545 31 68.662 31 86 C 31 103.339 17.21 117.454 0 117.982 Z M 117 0 C 117 17.673 102.673 32 85 32 C 67.327 32 53 17.673 53 0 Z M 202.982 0 C 202.454 17.21 188.339 31 171 31 C 153.661 31 139.546 17.21 139.018 0 Z M 257 31 C 239.661 31 225.546 17.21 225.018 0 L 257 0 Z M 30.982 0 C 30.464 16.878 16.878 30.464 0 30.982 L 0 0 Z',
  petals:
    'M 78 0 C 105.614 0 128 22.386 128 50 C 128 22.386 150.386 0 178 0 L 256 0 L 256 78 C 256 105.614 233.614 128 206 128 C 233.614 128 256 150.386 256 178 L 256 256 L 178 256 C 150.386 256 128 233.614 128 206 C 128 233.614 105.614 256 78 256 L 0 256 L 0 178 C 0 150.386 22.386 128 50 128 C 22.386 128 0 105.614 0 78 L 0 0 Z',
  burst:
    'M 152 70.059 L 201.539 20.519 L 235.48 54.461 L 185.941 104 L 256 104 L 256 152 L 185.941 152 L 235.48 201.539 L 201.539 235.48 L 152 185.941 L 152 256 L 104 256 L 104 185.941 L 54.46 235.48 L 20.52 201.539 L 70.059 152 L 0 152 L 0 104 L 70.059 104 L 20.519 54.46 L 54.461 20.52 L 104 70.059 L 104 0 L 152 0 Z',
};

/** One copy of a shape, centred on (cx, cy) and scaled so it spans `size`. */
const copy = (d, cx, cy, size, tint, weight, opacity, spin = 0) => {
  const k = size / BOX;
  const t = [
    `translate(${cx.toFixed(1)} ${cy.toFixed(1)})`,
    spin ? `rotate(${spin.toFixed(1)})` : '',
    `scale(${k.toFixed(4)})`,
    `translate(${-BOX / 2} ${-BOX / 2})`,
  ]
    .filter(Boolean)
    .join(' ');
  // The stroke is scaled with the shape, so compensate to keep it a hairline.
  return `<path d="${d}" transform="${t}" stroke="${tint}" stroke-width="${(weight / k).toFixed(2)}" opacity="${opacity.toFixed(2)}" stroke-linejoin="round"/>`;
};

const plate = (paths) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" fill="none" aria-hidden="true">\n${paths.join('\n')}\n</svg>`;

/** The house treatment: the same silhouette nested, largest to smallest. */
const nested = (d, { cx = W / 2, cy = H / 2, from = 300, to = 44, count = 9, spin = 0, tint = INK.mark } = {}) => {
  const out = [];
  for (let i = 0; i < count; i += 1) {
    const t = i / (count - 1);
    const size = from + (to - from) * t;
    const index = i % 3 === 0;
    out.push(
      copy(d, cx, cy, size, index ? tint : INK.soft, index ? 1.5 : 1, 0.85 - t * 0.4, spin * t),
    );
  }
  return out;
};

/* PT-01 — the burst, nested: every arm of every copy points at the same
   centre, which is what a direction looks like when a team shares one. */
const strategy = () => plate(nested(SHAPE.burst, { from: 132, to: 22, count: 8, spin: 20 }));

/* PT-02 — the four quadrants, nested. The figure is all seam: what the shape
   draws is the gap between four parts, which is exactly where the friction is. */
const operations = () => plate(nested(SHAPE.quadrants, { from: 136, to: 34, count: 6 }));

/* PT-03 — the matrix, tiled across the band. One cell, repeated, meeting its
   neighbours exactly: the whole argument for a system in one picture. */
const systems = () => {
  const out = [];
  const size = 118;
  for (let i = 0; i < 3; i += 1) {
    const cx = W * (0.22 + i * 0.28);
    out.push(copy(SHAPE.matrix, cx, H * 0.5, size, i === 1 ? INK.mark : INK.soft, i === 1 ? 1.2 : 1, i === 1 ? 0.85 : 0.5));
  }
  return plate(out);
};

/* PT-04 — the petals, nested and drifting right as they shrink: one centre
   that keeps opening into more of them. */
const leadership = () => {
  const out = [];
  const count = 7;
  for (let i = 0; i < count; i += 1) {
    const t = i / (count - 1);
    const size = 136 - t * 106;
    // Each copy turns a little, so the petals of one sit in the gaps of the next.
    const index = i % 3 === 0;
    out.push(
      copy(SHAPE.petals, W / 2, H * 0.5, size, index ? INK.mark : INK.soft, index ? 1.5 : 1, 0.85 - t * 0.35, t * 45),
    );
  }
  return plate(out);
};

mkdirSync('public/figures', { recursive: true });
writeFileSync('public/figures/pt-01.svg', strategy());
writeFileSync('public/figures/pt-02.svg', operations());
writeFileSync('public/figures/pt-03.svg', systems());
writeFileSync('public/figures/pt-04.svg', leadership());
console.log('wrote 4 figures');
