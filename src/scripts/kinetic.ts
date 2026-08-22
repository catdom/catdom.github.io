/**
 * KINETIC TYPOGRAPHY
 *
 * Two independent signals feed variable-font axes. Neither one touches
 * layout — only `font-variation-settings`, which is a paint-only property.
 *
 *  1. SCROLL VELOCITY  -> `--k-vel` on <html>, 0..1
 *     Sampled once per frame, normalised against a reference speed, then
 *     exponentially decayed so the type settles instead of snapping.
 *
 *  2. CURSOR PROXIMITY -> `--k-prox` per word, 0..1
 *     Distance from the pointer to each word's centre, falling off over a
 *     fixed radius. Word rects are measured in batches and only for words
 *     currently intersecting the viewport.
 *
 * The CSS in kinetic.css decides what those two numbers *mean* — this module
 * only measures. Retuning the effect is a stylesheet change, not a code one.
 */

const REF_VELOCITY = 42;   // px/frame that maps to --k-vel: 1
const DECAY = 0.86;        // per-frame decay of the velocity signal
const PROX_RADIUS = 240;   // px falloff for cursor proximity

type Word = { el: HTMLElement; cx: number; cy: number; live: boolean };

export function initKinetic(): () => void {
  const calm = matchMedia('(prefers-reduced-motion: reduce)');
  if (calm.matches) return () => {};

  const root = document.documentElement;
  const words: Word[] = Array.from(
    document.querySelectorAll<HTMLElement>('.kinetic__word'),
  ).map((el) => ({ el, cx: 0, cy: 0, live: false }));

  /* ---- 1. scroll velocity ------------------------------------------- */
  let lastY = scrollY;
  let velocity = 0;
  let raf = 0;
  let idleFrames = 0;

  const tick = () => {
    const y = scrollY;
    const delta = Math.abs(y - lastY);
    lastY = y;

    const sample = Math.min(delta / REF_VELOCITY, 1);
    velocity = sample > velocity ? sample : velocity * DECAY;

    if (velocity < 0.002) {
      velocity = 0;
      idleFrames++;
    } else {
      idleFrames = 0;
    }
    root.style.setProperty('--k-vel', velocity.toFixed(3));

    // Park the loop once everything has settled; a scroll or pointer move
    // wakes it again. Avoids burning a rAF forever on an idle page.
    if (idleFrames > 30 && !pointerActive) {
      raf = 0;
      return;
    }
    raf = requestAnimationFrame(tick);
  };

  const wake = () => {
    idleFrames = 0;
    if (!raf) raf = requestAnimationFrame(tick);
  };

  /* ---- 2. cursor proximity ------------------------------------------- */
  let pointerActive = false;
  let px = -9999;
  let py = -9999;
  let proxFrame = 0;
  let measured = false;

  const measure = () => {
    for (const w of words) {
      if (!w.live) continue;
      const r = w.el.getBoundingClientRect();
      w.cx = r.left + r.width / 2;
      w.cy = r.top + r.height / 2;
    }
    measured = true;
  };

  const applyProximity = () => {
    proxFrame = 0;
    if (!measured) measure();
    for (const w of words) {
      if (!w.live) continue;
      const dx = px - w.cx;
      const dy = py - w.cy;
      const dist = Math.hypot(dx, dy);
      const t = dist >= PROX_RADIUS ? 0 : 1 - dist / PROX_RADIUS;
      // Ease the falloff so the effect concentrates near the cursor.
      const eased = t * t;
      w.el.style.setProperty('--k-prox', eased.toFixed(3));
    }
  };

  const onPointerMove = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    pointerActive = true;
    px = e.clientX;
    py = e.clientY;
    if (!proxFrame) proxFrame = requestAnimationFrame(applyProximity);
    wake();
  };

  const onPointerLeave = () => {
    pointerActive = false;
    px = py = -9999;
    if (!proxFrame) proxFrame = requestAnimationFrame(applyProximity);
  };

  const invalidate = () => {
    measured = false;
    wake();
  };

  /* Only words on screen are measured or updated. */
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const w = words.find((x) => x.el === entry.target);
        if (!w) continue;
        w.live = entry.isIntersecting;
        if (!entry.isIntersecting) w.el.style.setProperty('--k-prox', '0');
      }
      measured = false;
    },
    { rootMargin: '20% 0px' },
  );
  words.forEach((w) => io.observe(w.el));

  addEventListener('pointermove', onPointerMove, { passive: true });
  document.addEventListener('pointerleave', onPointerLeave);
  addEventListener('scroll', invalidate, { passive: true });
  addEventListener('resize', invalidate, { passive: true });

  wake();

  return () => {
    io.disconnect();
    removeEventListener('pointermove', onPointerMove);
    document.removeEventListener('pointerleave', onPointerLeave);
    removeEventListener('scroll', invalidate);
    removeEventListener('resize', invalidate);
    if (raf) cancelAnimationFrame(raf);
    if (proxFrame) cancelAnimationFrame(proxFrame);
  };
}

/**
 * Entrance animation for kinetic headings: words rise into place, staggered.
 * Runs once per heading, on first intersection.
 */
export function initHeadingEntrance(): void {
  const headings = document.querySelectorAll<HTMLElement>(
    '.kinetic[data-enter="pending"]',
  );
  if (headings.length === 0) return;

  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    headings.forEach((h) => h.setAttribute('data-enter', 'done'));
    return;
  }

  const io = new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const h = entry.target as HTMLElement;
        h.querySelectorAll<HTMLElement>('.kinetic__word > span').forEach(
          (span, i) => span.style.setProperty('--enter-delay', `${i * 45}ms`),
        );
        // Next frame, so the delays are committed before the state flips.
        requestAnimationFrame(() => h.setAttribute('data-enter', 'done'));
        obs.unobserve(h);
      }
    },
    { threshold: 0.15 },
  );
  headings.forEach((h) => io.observe(h));
}
