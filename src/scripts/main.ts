/* Client behaviour. No framework, no dependencies. */

/* --- 1. Reveal on scroll --------------------------------------------------- */

const reveal = () => {
  const targets = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (!targets.length) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || !('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-in'));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      }
    },
    // Fire a little before the element reaches the fold.
    { rootMargin: '0px 0px -12% 0px', threshold: 0.05 },
  );

  targets.forEach((el) => {
    // Anything already on screen at load is shown straight away — the shrunk
    // root below would otherwise never let the first fold's bottom row in.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add('is-in');
      return;
    }
    io.observe(el);
  });
};

/* --- 2. Header band -------------------------------------------------------- */

/* The bar is transparent over the cover and takes on a translucent band with a
   hairline once the page has moved. One class, driven by scroll position. */

const headerBand = () => {
  const nav = document.querySelector<HTMLElement>('[data-nav]');
  if (!nav) return;

  let queued = false;

  const update = () => {
    queued = false;
    nav.classList.toggle('is-scrolled', window.scrollY > 8);
  };

  const onScroll = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(update);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update();
};

/* --- 3. Eased scrolling ---------------------------------------------------- */

/* Wheel input moves a target, and the real scroll position chases it each
   frame. Native scroll position is what actually changes — no transformed
   wrapper — so anchors, find-in-page, the reveal observer and the header
   probe all keep working untouched. */

const LERP = 0.09;

const smoothScroll = () => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Touch devices already have momentum scrolling; hijacking it makes it worse.
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  if (reduced || coarse) return;

  const root = document.documentElement;
  // CSS smooth scrolling would fight the lerp over every anchor jump.
  root.style.scrollBehavior = 'auto';

  let target = window.scrollY;
  let current = target;
  let running = false;

  const clamp = (value: number) =>
    Math.max(0, Math.min(value, root.scrollHeight - window.innerHeight));

  const frame = () => {
    const delta = target - current;

    if (Math.abs(delta) < 0.4) {
      current = target;
      window.scrollTo(0, current);
      running = false;
      return;
    }

    current += delta * LERP;
    window.scrollTo(0, current);
    requestAnimationFrame(frame);
  };

  const run = () => {
    if (running) return;
    running = true;
    requestAnimationFrame(frame);
  };

  const to = (y: number) => {
    target = clamp(y);
    run();
  };

  /* Anything that moved the page without going through the lerp — a scrollbar
     drag, arrow keys, find-in-page — becomes the new truth. A position that
     already matches is just the tail of our own animation. */
  window.addEventListener(
    'scroll',
    () => {
      if (running || Math.abs(window.scrollY - current) < 2) return;
      current = window.scrollY;
      target = current;
    },
    { passive: true },
  );

  // A scrollable element under the cursor scrolls itself, not the page.
  const scrollsItself = (node: EventTarget | null) => {
    let el = node instanceof Element ? node : null;
    while (el && el !== document.body) {
      const overflow = getComputedStyle(el).overflowY;
      if (
        (overflow === 'auto' || overflow === 'scroll') &&
        el.scrollHeight > el.clientHeight
      ) {
        return true;
      }
      el = el.parentElement;
    }
    return false;
  };

  window.addEventListener(
    'wheel',
    (event) => {
      // Ctrl+wheel is browser zoom.
      if (event.ctrlKey) return;
      if (scrollsItself(event.target)) return;
      // Firefox reports lines rather than pixels on some platforms.
      const scale = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1;

      event.preventDefault();
      to(target + event.deltaY * scale);
    },
    { passive: false },
  );

  // In-page links, so the eased motion covers them too.
  document.addEventListener('click', (event) => {
    if (event.defaultPrevented) return;
    const link = (event.target as Element | null)?.closest?.('a[href^="#"]');
    if (!(link instanceof HTMLAnchorElement)) return;

    const id = link.hash.slice(1);
    const destination = id ? document.getElementById(id) : null;
    if (!destination) return;

    const offset = parseFloat(getComputedStyle(destination).scrollMarginTop) || 0;
    event.preventDefault();
    to(destination.getBoundingClientRect().top + window.scrollY - offset);
    // Keep the URL and the focus behaviour of a real anchor jump.
    history.pushState(null, '', link.hash);
  });
};


/* --- 4. Rotating headline -------------------------------------------------- */

/* Swaps the tail of the headline on a fixed beat: the phrase on screen leaves
   through the top as the next rises from below. Every phrase is already in the
   markup, so this only moves classes around — with no script the first one
   stays put and the headline still reads.

   It stops when it cannot be seen: reduced motion, a background tab, or the
   hero scrolled away. A headline animating to nobody is just battery. */

const HOLD = 2600;

const rotatingHeadline = () => {
  const roll = document.querySelector<HTMLElement>('[data-roll]');
  if (!roll) return;

  const phrases = Array.from(roll.querySelectorAll<HTMLElement>('.roll__p'));
  if (phrases.length < 2) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let current = phrases.findIndex((p) => p.classList.contains('is-on'));
  if (current < 0) current = 0;

  let timer: number | undefined;
  let onScreen = true;

  const step = () => {
    const next = (current + 1) % phrases.length;
    const leaving = phrases[current];

    leaving.classList.remove('is-on');
    leaving.classList.add('is-out');
    phrases[next].classList.add('is-on');

    // Clear the outgoing phrase's exit state once it is out of sight, so it
    // comes back from below rather than dropping in from above.
    window.setTimeout(() => leaving.classList.remove('is-out'), 560);

    current = next;
  };

  const start = () => {
    if (timer !== undefined || !onScreen || document.hidden) return;
    timer = window.setInterval(step, HOLD);
  };

  const stop = () => {
    if (timer === undefined) return;
    window.clearInterval(timer);
    timer = undefined;
  };

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
    io.observe(roll);
  }

  // Let the load animation land before the first swap.
  window.setTimeout(start, 1400);
};

reveal();
headerBand();
smoothScroll();
rotatingHeadline();
