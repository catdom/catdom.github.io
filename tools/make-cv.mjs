/**
 * Renders a PLACEHOLDER CV to public/cv.pdf using the local Chromium.
 * Run with: node tools/make-cv.mjs
 *
 * Replace this with your real CV before launch — or set `cvHref: null` in
 * src/lib/profile.ts to remove the download button entirely.
 */
import { execFileSync } from 'node:child_process';
import { writeFileSync, mkdirSync, existsSync, renameSync, rmSync, readFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { tmpdir } from 'node:os';

const ROOT = resolve(import.meta.dirname, '..');
const FONTS = join(ROOT, 'public/fonts');

const chrome = [
  '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  process.env.CHROME_PATH,
].filter(Boolean).find((p) => existsSync(p));
if (!chrome) { console.error('No Chromium found.'); process.exit(1); }

const src = readFileSync(join(ROOT, 'src/lib/profile.ts'), 'utf8');
const grab = (k) => src.match(new RegExp(`\\n  ${k}: '([^']*)'`))?.[1] ?? '';
const NAME = grab('name'), ROLE = grab('role'), LOC = grab('location'), MAIL = grab('email');

const rows = [...src.matchAll(/\{ role: '([^']*)', org: '([^']*)', period: '([^']*)' \}/g)]
  .map(([, role, org, period]) => `<tr><td>${period}</td><td><b>${role}</b><br><span>${org}</span></td></tr>`)
  .join('');

const caps = [...src.matchAll(/^    '([A-Z][^']*)',$/gm)].map((m) => m[1]).slice(0, 6);

const html = `<!doctype html><meta charset="utf-8"><style>
@font-face{font-family:'B';src:url('file://${FONTS}/bricolage-grotesque-var-latin.woff2') format('woff2-variations');font-weight:200 800;font-stretch:75% 100%}
@font-face{font-family:'I';src:url('file://${FONTS}/inter-var-latin.woff2') format('woff2-variations');font-weight:100 900}
@font-face{font-family:'M';src:url('file://${FONTS}/jetbrains-mono-var-latin.woff2') format('woff2-variations');font-weight:100 800}
@page{size:A4;margin:18mm 16mm}
*{margin:0;box-sizing:border-box}
body{font-family:'I',sans-serif;font-size:10pt;line-height:1.55;color:#16130f}
h1{font-family:'B',sans-serif;font-size:30pt;letter-spacing:-.04em;
  font-variation-settings:'wght' 560,'wdth' 92;line-height:1}
.meta{font-family:'M',monospace;font-size:7.5pt;letter-spacing:.11em;
  text-transform:uppercase;color:#6e6862}
.rule{height:1px;background:#e4dcd2;margin:14pt 0}
h2{font-family:'M',monospace;font-size:7.5pt;letter-spacing:.13em;
  text-transform:uppercase;color:#6e6862;margin-bottom:8pt;font-weight:500}
table{width:100%;border-collapse:collapse}
td{padding:6pt 0;vertical-align:top;border-bottom:1px solid #f0eae2}
td:first-child{width:26%;font-family:'M',monospace;font-size:8pt;color:#6e6862}
td span{color:#56504a}
.caps{display:flex;flex-wrap:wrap;gap:5pt}
.cap{border:1px solid #e4dcd2;border-radius:99px;padding:2pt 9pt;font-size:8.5pt;color:#56504a}
.note{margin-top:16pt;padding:9pt 11pt;border-radius:8pt;background:#fdf1ec;
  border:1px solid #f6d5c8;font-size:8.5pt;color:#8a3d22}
.foot{position:fixed;bottom:0;left:0;right:0;font-family:'M',monospace;
  font-size:7pt;letter-spacing:.1em;text-transform:uppercase;color:#8a827a}
</style>
<h1>${NAME}</h1>
<p class="meta" style="margin-top:6pt">${ROLE} &nbsp;·&nbsp; ${LOC} &nbsp;·&nbsp; ${MAIL}</p>
<div class="rule"></div>
<h2>Experience</h2><table>${rows}</table>
<div style="height:14pt"></div>
<h2>Capabilities</h2>
<div class="caps">${caps.map((c) => `<span class="cap">${c}</span>`).join('')}</div>
<div class="note"><b>Placeholder document.</b> Generated from src/lib/profile.ts.
Replace public/cv.pdf with your real CV, or set <code>cvHref: null</code> in
profile.ts to hide the download button.</div>
<div class="foot">${NAME} — Curriculum Vitae</div>`;

const work = join(tmpdir(), `cv-${Date.now()}`);
mkdirSync(work, { recursive: true });
const htmlPath = join(work, 'cv.html');
writeFileSync(htmlPath, html);

execFileSync(chrome, [
  '--headless', '--no-sandbox', '--disable-gpu',
  `--print-to-pdf=${join(work, 'cv.pdf')}`,
  '--print-to-pdf-no-header', '--no-pdf-header-footer',
  '--virtual-time-budget=4000',
  `file://${htmlPath}`,
], { stdio: 'pipe' });

renameSync(join(work, 'cv.pdf'), join(ROOT, 'public/cv.pdf'));
rmSync(work, { recursive: true, force: true });
console.log('wrote public/cv.pdf');
