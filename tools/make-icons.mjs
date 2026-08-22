/**
 * Renders the PWA icon set from one SVG mark using the local Chromium.
 * Run with: node tools/make-icons.mjs
 */
import { execFileSync } from 'node:child_process';
import { writeFileSync, mkdirSync, existsSync, renameSync, rmSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { tmpdir } from 'node:os';

const ROOT = resolve(import.meta.dirname, '..');
const FONTS = join(ROOT, 'public/fonts');

const chrome = [
  '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell',
  process.env.CHROME_PATH,
].filter(Boolean).find((p) => existsSync(p));

if (!chrome) { console.error('No Chromium found.'); process.exit(1); }

const src = (await import('node:fs')).readFileSync(join(ROOT, 'src/lib/profile.ts'), 'utf8');
const MARK = src.match(/\n  shortName: '([^']*)'/)?.[1] ?? 'YN';

const page = (size, pad) => `<!doctype html><meta charset="utf-8"><style>
@font-face{font-family:'B';src:url('file://${FONTS}/bricolage-grotesque-var-latin.woff2') format('woff2-variations');font-weight:200 800;font-stretch:75% 100%}
*{margin:0}
html,body{width:${size}px;height:${size}px}
body{display:grid;place-items:center;background:#0b0a09}
.m{width:${size - pad * 2}px;height:${size - pad * 2}px;border-radius:${size * 0.22}px;
  background:#e8552a;color:#fff;display:grid;place-items:center;
  font-family:'B',sans-serif;font-size:${size * 0.42}px;
  font-variation-settings:'wght' 600,'wdth' 85;letter-spacing:-.04em}
</style><div class="m">${MARK}</div>`;

const work = join(tmpdir(), `icons-${Date.now()}`);
mkdirSync(work, { recursive: true });
mkdirSync(join(ROOT, 'public/icons'), { recursive: true });

// [filename, pixel size, padding] — maskable variants get a safe-zone inset.
const jobs = [
  ['icon-192.png', 192, 0],
  ['icon-512.png', 512, 0],
  ['icon-maskable-512.png', 512, 64],
  ['apple-touch-icon.png', 180, 0],
];

for (const [name, size, pad] of jobs) {
  const html = join(work, `${name}.html`);
  writeFileSync(html, page(size, pad));
  execFileSync(chrome, [
    '--headless', '--no-sandbox', '--disable-gpu', '--hide-scrollbars',
    '--force-device-scale-factor=1', `--window-size=${size},${size}`,
    `--screenshot=${join(work, name)}`, '--virtual-time-budget=2000',
    `file://${html}`,
  ], { stdio: 'pipe' });
  const dest = name === 'apple-touch-icon.png'
    ? join(ROOT, 'public', name)
    : join(ROOT, 'public/icons', name);
  renameSync(join(work, name), dest);
  console.log('wrote', dest.replace(ROOT + '/', ''));
}
rmSync(work, { recursive: true, force: true });
