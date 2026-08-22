/**
 * dotLOTTIE MICRO-INTERACTIONS
 *
 * The honest tradeoff: the dotLottie renderer is a ~1.2MB wasm binary. That
 * is far too much to load for decorative icons on a page whose entire brief
 * is "no bloat". So the architecture here is progressive enhancement, in the
 * strict sense:
 *
 *   · Every icon renders server-side as an inline SVG. That is the real
 *     icon — it works with JS disabled, on a cold cache, and in a feed reader.
 *   · The wasm is dynamically imported ONLY when an icon scrolls into view
 *     AND the visitor is not on a metered/slow connection AND they have not
 *     asked for reduced motion. Most visits never fetch it at all.
 *   · The wasm is served from our own origin (public/lottie/), never a CDN.
 *     No visitor request ever leaves this domain.
 *
 * If the import fails for any reason, the SVG simply stays. There is no
 * failure state visible to the user.
 */

type Loaded = typeof import('@lottiefiles/dotlottie-web');

let modulePromise: Promise<Loaded> | null = null;

function shouldEnhance(): boolean {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return false;
  const conn = (navigator as Navigator & {
    connection?: { saveData?: boolean; effectiveType?: string };
  }).connection;
  if (conn?.saveData) return false;
  if (conn?.effectiveType && /2g/.test(conn.effectiveType)) return false;
  return true;
}

async function loadRuntime(): Promise<Loaded> {
  if (!modulePromise) {
    modulePromise = import('@lottiefiles/dotlottie-web').then((mod) => {
      // Self-hosted wasm. Without this the package reaches for a CDN.
      mod.DotLottie.setWasmUrl('/lottie/dotlottie-player.wasm');
      return mod;
    });
  }
  return modulePromise;
}

type Handle = { play(): void; stop(): void };

async function mount(host: HTMLElement): Promise<Handle | null> {
  const src = host.dataset.lottie;
  if (!src) return null;

  const { DotLottie } = await loadRuntime();

  const canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  canvas.style.inlineSize = '100%';
  canvas.style.blockSize = '100%';

  const autoplay = host.dataset.lottieTrigger === 'auto';
  const loop = host.dataset.lottieLoop === 'true';

  const player = new DotLottie({
    canvas,
    src,
    loop,
    autoplay,
    renderConfig: { autoResize: true, devicePixelRatio: Math.min(devicePixelRatio, 2) },
  });

  player.addEventListener('load', () => {
    // Swap only once the animation is genuinely ready — no flash of nothing.
    const svg = host.querySelector('svg');
    if (svg) svg.setAttribute('hidden', '');
    host.append(canvas);
    host.setAttribute('data-lottie-ready', '');
  });

  return {
    play() {
      player.stop();
      player.play();
    },
    stop() {
      player.stop();
    },
  };
}

export function initLottie(): void {
  const hosts = Array.from(document.querySelectorAll<HTMLElement>('[data-lottie]'));
  if (hosts.length === 0 || !shouldEnhance()) return;

  const io = new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const host = entry.target as HTMLElement;
        obs.unobserve(host);

        void mount(host).then((handle) => {
          if (!handle) return;
          const trigger = host.dataset.lottieTrigger ?? 'hover';
          if (trigger === 'hover') {
            // Hovering the enclosing card, not the 28px icon itself.
            const zone = host.closest<HTMLElement>('[data-lottie-zone]') ?? host;
            zone.addEventListener('pointerenter', handle.play);
            zone.addEventListener('focusin', handle.play);
          }
          // Programmatic trigger, for animations tied to an action rather
          // than to hover (the copy-email confirmation, for instance).
          host.addEventListener('lottie:play', handle.play);
          host.dispatchEvent(
            new CustomEvent('lottie:ready', { detail: handle, bubbles: true }),
          );
        });
      }
    },
    { rootMargin: '200px' },
  );

  hosts.forEach((h) => io.observe(h));
}
