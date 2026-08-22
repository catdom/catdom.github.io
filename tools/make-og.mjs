/**
 * Renders the Open Graph card to a real PNG using the local Chromium.
 * Run with:  node tools/make-og.mjs
 * Re-run whenever profile.name / role / headline change.
 *
 * Kept as a build tool rather than a runtime dependency — the output is
 * committed, so deploys never need a browser.
 */
import { execFileSync } from 'node:child_process';
import { writeFileSync, mkdirSync, existsSync, renameSync, rmSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { tmpdir } from 'node:os';

const ROOT = resolve(import.meta.dirname, '..');
const FONTS = join(ROOT, 'public/fonts');

const CANDIDATES = [
  '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell',
  process.env.CHROME_PATH,
].filter(Boolean);

const chrome = CANDIDATES.find((p) => existsSync(p));
if (!chrome) {
  console.error('No Chromium found. Set CHROME_PATH and re-run.');
  process.exit(1);
}

// Read the profile without needing a TS toolchain: pull the literals out.
const src = await import('node:fs').then((fs) =>
  fs.readFileSync(join(ROOT, 'src/lib/profile.ts'), 'utf8'),
);
const grab = (key) => src.match(new RegExp(`\\n  ${key}: '([^']*)'`))?.[1] ?? '';

const NAME = grab('name');
const ROLE = grab('role');
const LOCATION = grab('location');

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:'Bricolage';src:url('file://${FONTS}/bricolage-grotesque-var-latin.woff2') format('woff2-variations');font-weight:200 800;font-stretch:75% 100%}
@font-face{font-family:'JB';src:url('file://${FONTS}/jetbrains-mono-var-latin.woff2') format('woff2-variations');font-weight:100 800}
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;background:#0b0a09;color:#f4efe9;
  font-family:'Bricolage',sans-serif;padding:88px;display:flex;flex-direction:column;
  justify-content:space-between;position:relative;overflow:hidden}
body::before{content:'';position:absolute;inset:0;
  background:radial-gradient(900px 500px at 88% -12%, rgba(255,95,54,.20), transparent 62%)}
.grain{position:absolute;inset:0;opacity:.05;mix-blend-mode:overlay;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
.row{position:relative;display:flex;align-items:center;justify-content:space-between}
.eyebrow{font-family:'JB',monospace;font-size:19px;letter-spacing:.14em;
  text-transform:uppercase;color:#a8a099}
.dot{display:inline-block;width:9px;height:9px;border-radius:50%;background:#4ade80;
  margin-right:12px;vertical-align:middle}
h1{position:relative;font-size:96px;line-height:.95;letter-spacing:-.045em;
  font-variation-settings:'wght' 520,'wdth' 92;max-width:15ch}
.accent{color:#ff5f36}
.rule{position:relative;height:1px;background:#302c28;margin-bottom:34px}
</style></head><body>
<div class="grain"></div>
<div class="row"><span class="eyebrow">${NAME}</span><span class="eyebrow">${LOCATION}</span></div>
<h1>${ROLE}<span class="accent">.</span></h1>
<div><div class="rule"></div>
<div class="row"><span class="eyebrow"><span class="dot"></span>Open to work</span>
<span class="eyebrow">Portfolio</span></div></div>
</body></html>`;

const work = join(tmpdir(), `og-${Date.now()}`);
mkdirSync(work, { recursive: true });
const htmlPath = join(work, 'og.html');
writeFileSync(htmlPath, html);

execFileSync(
  chrome,
  [
    '--headless',
    '--no-sandbox',
    '--disable-gpu',
    '--hide-scrollbars',
    '--force-device-scale-factor=1',
    '--window-size=1200,630',
    `--screenshot=${join(work, 'og.png')}`,
    '--virtual-time-budget=3000',
    `file://${htmlPath}`,
  ],
  { stdio: 'pipe' },
);

mkdirSync(join(ROOT, 'public/og'), { recursive: true });
renameSync(join(work, 'og.png'), join(ROOT, 'public/og/default.png'));
rmSync(work, { recursive: true, force: true });
console.log('wrote public/og/default.png');
