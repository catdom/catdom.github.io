/* The hero's background figure.

   Concentric contour rings, drawn as hairlines in the mark colour at very low
   alpha, so the thing reads as a topographic plate behind the claim rather than
   as decoration competing with it. Each ring's radius is a sum of two slow
   sines, which is what keeps the outline organic instead of circular.

   The pointer does two things, both eased rather than tracked: it drifts the
   whole figure — outer rings further than inner ones, so the stack gains a
   little depth — and it swells the side of each ring nearest the cursor. With
   no pointer the sines carry it alone, which is what a phone sees. */

const RINGS = 13;
const SEGMENTS = 110;
const LERP = 0.045;

export const heroField = () => {
  const canvas = document.querySelector<HTMLCanvasElement>('[data-field]');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let w = 0;
  let h = 0;

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    // Two device pixels is enough for a hairline; more is wasted fill rate.
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = rect.width;
    h = rect.height;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  /* Pointer position in -1..1, and the eased value that actually draws. */
  let targetX = 0;
  let targetY = 0;
  let easedX = 0;
  let easedY = 0;

  const onPointer = (event: PointerEvent) => {
    const rect = canvas.getBoundingClientRect();
    targetX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    targetY = ((event.clientY - rect.top) / rect.height) * 2 - 1;
  };

  const draw = (time: number) => {
    ctx.clearRect(0, 0, w, h);

    // Off to the right on a wide screen, where the type is not; centred and
    // lower on a narrow one, so it sits under the claim rather than behind it.
    const wide = w > 760;
    const cx = w * (wide ? 0.72 : 0.5);
    const cy = h * (wide ? 0.46 : 0.6);
    const unit = Math.min(w, h);

    // The mask that fades the figure's edges follows the same centre, so the
    // two never disagree about where the middle is.
    canvas.style.setProperty('--fx', `${((cx / w) * 100).toFixed(1)}%`);
    canvas.style.setProperty('--fy', `${((cy / h) * 100).toFixed(1)}%`);

    const t = time * 0.00006;
    const pointerAngle = Math.atan2(easedY, easedX);
    const pointerPull = Math.min(1, Math.hypot(easedX, easedY));

    ctx.lineWidth = 1;

    for (let ring = 0; ring < RINGS; ring += 1) {
      const depth = ring / (RINGS - 1);
      const base = unit * (0.1 + depth * (wide ? 0.34 : 0.27));

      // Outer rings drift further, which reads as depth rather than as a slide.
      const driftX = easedX * unit * 0.05 * (0.35 + depth);
      const driftY = easedY * unit * 0.035 * (0.35 + depth);

      ctx.beginPath();

      for (let step = 0; step <= SEGMENTS; step += 1) {
        const angle = (step / SEGMENTS) * Math.PI * 2;

        const wobble =
          1 +
          0.055 * Math.sin(angle * 3 + t + depth * 2.6) +
          0.035 * Math.sin(angle * 5 - t * 0.7 + depth * 4.1);

        // Swell the side facing the cursor; falls away smoothly behind.
        const swell = 1 + 0.09 * pointerPull * Math.cos(angle - pointerAngle) * (0.4 + depth);

        const r = base * wobble * swell;
        const x = cx + driftX + Math.cos(angle) * r;
        const y = cy + driftY + Math.sin(angle) * r * 0.82;

        if (step === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      // Fades outward, so the figure has a centre without having an edge.
      const top = wide ? 0.16 : 0.11;
      ctx.strokeStyle = `rgba(31, 63, 216, ${top - depth * (wide ? 0.1 : 0.07)})`;
      ctx.stroke();
    }
  };

  let frame: number | undefined;
  let onScreen = true;

  const tick = (time: number) => {
    easedX += (targetX - easedX) * LERP;
    easedY += (targetY - easedY) * LERP;
    draw(time);
    frame = requestAnimationFrame(tick);
  };

  const start = () => {
    if (frame !== undefined || !onScreen || document.hidden || reduced) return;
    frame = requestAnimationFrame(tick);
  };

  const stop = () => {
    if (frame === undefined) return;
    cancelAnimationFrame(frame);
    frame = undefined;
  };

  resize();

  if (reduced) {
    // One still frame: the figure is part of the composition, the motion is not.
    draw(0);
    return;
  }

  window.addEventListener('resize', () => {
    resize();
    if (frame === undefined) draw(performance.now());
  });

  // Fine pointers only: on a touch screen there is no cursor to follow, and the
  // sines already carry the movement.
  if (window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('pointermove', onPointer, { passive: true });
  }

  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          onScreen = entry.isIntersecting;
          onScreen ? start() : stop();
        }
      },
      { threshold: 0 },
    );
    io.observe(canvas);
  }

  start();
};
