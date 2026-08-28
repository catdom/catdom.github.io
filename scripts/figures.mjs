/* Draws the four capability figures.
 *
 * They are the hero's plate, re-cut four ways: the same sum-of-two-sines
 * contour, so the section reads as the same drawing rather than as clip art.
 * What changes per figure is the number of centres, how far the rings run and
 * which of the palette's blues they are inked in — one idea per capability:
 *
 *   PT-01  one centre, tight rings          — a direction everything aims at
 *   PT-02  two centres, rings overlapping   — friction resolved between them
 *   PT-03  one centre, evenly stepped rings — a system, measured out
 *   PT-04  one centre splitting into four   — a team growing out of it
 *
 * Run with: node scripts/figures.mjs
 */

import { writeFileSync, mkdirSync } from 'node:fs';

const W = 640;
const H = 260;

const INK = {
  mark: '#1f3fd8',
  deep: '#17309f',
  soft: '#7d8fe8',
  rule: '#dcdbd3',
};

/** One closed contour: a circle whose radius is a sum of two slow sines. */
const contour = (cx, cy, r, seed, squash = 0.82, segments = 96) => {
  const points = [];
  for (let i = 0; i <= segments; i += 1) {
    const a = (i / segments) * Math.PI * 2;
    const wobble =
      1 + 0.075 * Math.sin(a * 3 + seed) + 0.045 * Math.sin(a * 5 - seed * 0.7);
    const rr = r * wobble;
    points.push([
      (cx + Math.cos(a) * rr).toFixed(1),
      (cy + Math.sin(a) * rr * squash).toFixed(1),
    ]);
  }
  return `M${points.map((p) => p.join(' ')).join('L')}Z`;
};

const plate = (paths) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" fill="none" aria-hidden="true">
${paths.join('\n')}
</svg>`;

/* PT-01 — one centre, rings tightening inward. */
const one = () => {
  const out = [];
  for (let i = 0; i < 16; i += 1) {
    const t = i / 15;
    const r = 14 + t * t * 150;
    const index = i % 4 === 0;
    out.push(
      `<path d="${contour(W * 0.5, H * 0.5, r, 0.6 + t * 2.4)}" stroke="${index ? INK.mark : INK.soft}" stroke-width="${index ? 1.4 : 1}" opacity="${(0.9 - t * 0.45).toFixed(2)}"/>`,
    );
  }
  return plate(out);
};

/* PT-02 — two centres, their fields running into each other. */
const two = () => {
  const out = [];
  for (const [cx, seed, tint] of [
    [W * 0.33, 0.4, INK.mark],
    [W * 0.67, 2.1, INK.deep],
  ]) {
    for (let i = 0; i < 11; i += 1) {
      const t = i / 10;
      const r = 12 + t * 118;
      const index = i % 3 === 0;
      out.push(
        `<path d="${contour(cx, H * 0.5, r, seed + t * 2)}" stroke="${index ? tint : INK.soft}" stroke-width="${index ? 1.3 : 1}" opacity="${(0.8 - t * 0.42).toFixed(2)}"/>`,
      );
    }
  }
  return plate(out);
};

/* PT-03 — one centre, rings stepped at an even interval: a measured system. */
const stepped = () => {
  const out = [];
  for (let i = 0; i < 13; i += 1) {
    const r = 12 + i * 13;
    const index = i % 3 === 0;
    out.push(
      `<path d="${contour(W * 0.5, H * 0.5, r, 1.1 + i * 0.18, 0.7)}" stroke="${index ? INK.mark : INK.soft}" stroke-width="${index ? 1.4 : 1}" opacity="${(0.85 - i * 0.045).toFixed(2)}"/>`,
    );
  }
  // The measure itself: two ticks and a rule across the middle, as on a drawing.
  out.push(
    `<path d="M${W * 0.5 - 168} ${H * 0.5}H${W * 0.5 + 168}" stroke="${INK.mark}" stroke-width="1" opacity="0.5" stroke-dasharray="2 6"/>`,
  );
  return plate(out);
};

/* PT-04 — one field breaking into four, each with its own centre. */
const growth = () => {
  const out = [];
  for (let i = 0; i < 7; i += 1) {
    const t = i / 6;
    out.push(
      `<path d="${contour(W * 0.5, H * 0.5, 150 - t * 26, 0.9 + t * 1.6, 0.72)}" stroke="${INK.soft}" stroke-width="1" opacity="${(0.5 - t * 0.28).toFixed(2)}"/>`,
    );
  }
  const centres = [
    [W * 0.28, H * 0.42],
    [W * 0.45, H * 0.62],
    [W * 0.62, H * 0.38],
    [W * 0.78, H * 0.58],
  ];
  centres.forEach(([cx, cy], n) => {
    for (let i = 0; i < 5; i += 1) {
      const t = i / 4;
      const r = 9 + t * (26 + n * 7);
      out.push(
        `<path d="${contour(cx, cy, r, 0.3 + n + t * 1.7, 0.85)}" stroke="${i === 0 ? INK.mark : INK.deep}" stroke-width="${i === 0 ? 1.4 : 1}" opacity="${(0.85 - t * 0.4).toFixed(2)}"/>`,
      );
    }
  });
  return plate(out);
};

mkdirSync('public/figures', { recursive: true });
writeFileSync('public/figures/pt-01.svg', one());
writeFileSync('public/figures/pt-02.svg', two());
writeFileSync('public/figures/pt-03.svg', stepped());
writeFileSync('public/figures/pt-04.svg', growth());
console.log('wrote 4 figures');
