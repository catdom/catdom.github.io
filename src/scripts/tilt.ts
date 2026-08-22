/**
 * 3D TILT MICRO-INTERACTION
 *
 * Pointer position drives four CSS custom properties on each card:
 *   --rx / --ry   rotation, hard-capped at --tilt-max (6deg)
 *   --mx / --my   specular highlight origin, as a percentage
 *
 * Design notes:
 *  · All writes are batched into a single rAF, so N cards cost one frame's
 *    worth of style recalculation regardless of pointer event frequency.
 *  · Rects are cached on pointerenter and invalidated on scroll/resize —
 *    calling getBoundingClientRect() per pointermove would force layout.
 *  · Coarse pointers and prefers-reduced-motion opt out entirely; the CSS
 *    also neutralises the transform, so this is belt and braces.
 */

const MAX_DEG = 6;
const LIFT_PX = -3;
const SCALE = 1.012;

type Card = {
  root: HTMLElement;
  card: HTMLElement;
  rect: DOMRect | null;
};

export function initTilt(): () => void {
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  const calm = matchMedia('(prefers-reduced-motion: reduce)');
  if (!fine.matches || calm.matches) return () => {};

  const roots = Array.from(
    document.querySelectorAll<HTMLElement>('.tilt-root'),
  );
  if (roots.length === 0) return () => {};

  const cards: Card[] = roots.flatMap((root) => {
    const card = root.querySelector<HTMLElement>('.card');
    return card ? [{ root, card, rect: null }] : [];
  });

  let frame = 0;
  const pending = new Map<Card, { x: number; y: number }>();

  const flush = () => {
    frame = 0;
    for (const [entry, pos] of pending) {
      const { root, card, rect } = entry;
      if (!rect) continue;
      const px = (pos.x - rect.left) / rect.width;   // 0..1
      const py = (pos.y - rect.top) / rect.height;   // 0..1
      // Invert Y so pushing the cursor up tips the top edge away.
      const ry = (px - 0.5) * 2 * MAX_DEG;
      const rx = (0.5 - py) * 2 * MAX_DEG;
      root.style.setProperty('--ry', `${ry.toFixed(2)}deg`);
      root.style.setProperty('--rx', `${rx.toFixed(2)}deg`);
      root.style.setProperty('--ty', `${LIFT_PX}px`);
      root.style.setProperty('--tscale', String(SCALE));
      card.style.setProperty('--mx', `${(px * 100).toFixed(1)}%`);
      card.style.setProperty('--my', `${(py * 100).toFixed(1)}%`);
    }
    pending.clear();
  };

  const schedule = (entry: Card, x: number, y: number) => {
    pending.set(entry, { x, y });
    if (!frame) frame = requestAnimationFrame(flush);
  };

  const reset = (entry: Card) => {
    pending.delete(entry);
    const { root, card } = entry;
    root.removeAttribute('data-engaged');
    root.style.setProperty('--rx', '0deg');
    root.style.setProperty('--ry', '0deg');
    root.style.setProperty('--ty', '0px');
    root.style.setProperty('--tscale', '1');
    card.removeAttribute('data-active');
  };

  const cleanups: Array<() => void> = [];

  for (const entry of cards) {
    const { root, card } = entry;

    const onEnter = (e: PointerEvent) => {
      entry.rect = root.getBoundingClientRect();
      root.setAttribute('data-engaged', '');
      card.setAttribute('data-active', '');
      schedule(entry, e.clientX, e.clientY);
    };
    const onMove = (e: PointerEvent) => {
      if (!entry.rect) entry.rect = root.getBoundingClientRect();
      schedule(entry, e.clientX, e.clientY);
    };
    const onLeave = () => {
      entry.rect = null;
      reset(entry);
    };

    root.addEventListener('pointerenter', onEnter);
    root.addEventListener('pointermove', onMove, { passive: true });
    root.addEventListener('pointerleave', onLeave);
    // A card can hold a focusable link; keyboard users get the lift, no tilt.
    root.addEventListener('focusin', () => card.setAttribute('data-active', ''));
    root.addEventListener('focusout', () => reset(entry));

    cleanups.push(() => {
      root.removeEventListener('pointerenter', onEnter);
      root.removeEventListener('pointermove', onMove);
      root.removeEventListener('pointerleave', onLeave);
    });
  }

  // A cached rect is only valid while the page is still.
  const invalidate = () => {
    for (const entry of cards) entry.rect = null;
  };
  addEventListener('scroll', invalidate, { passive: true });
  addEventListener('resize', invalidate, { passive: true });

  return () => {
    cleanups.forEach((fn) => fn());
    removeEventListener('scroll', invalidate);
    removeEventListener('resize', invalidate);
    if (frame) cancelAnimationFrame(frame);
  };
}
