/**
 * Client entry point. Everything is idempotent and safe to call on a
 * re-render, which matters because Astro's view transitions swap the DOM.
 *
 * Total client JS for the whole site, minified + gzipped, is a few KB.
 * The dotLottie wasm is NOT part of that — see lottie.ts for why.
 */
import { initTilt } from './tilt';
import { initKinetic, initHeadingEntrance } from './kinetic';
import { initTheme } from './theme';
import { initClipboard } from './clipboard';
import { initNav } from './nav';
import { initLottie } from './lottie';

let teardown: Array<() => void> = [];

function boot(): void {
  teardown.forEach((fn) => fn());
  teardown = [];

  initTheme();
  initNav();
  initClipboard();
  initHeadingEntrance();
  teardown.push(initTilt());
  teardown.push(initKinetic());

  // Lowest priority: never contend with first paint or the interaction work.
  const idle = window.requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 600));
  idle(() => initLottie());
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}

document.addEventListener('astro:after-swap', boot);

/* Offline support. Registered late and non-blocking; a failure here must
   never affect the page. Dev builds skip it so the SW cannot serve stale
   assets while you work. */
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      /* Unsupported or blocked. The site works fine without it. */
    });
  });
}
