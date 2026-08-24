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

/* --- 2. Accordion ---------------------------------------------------------- */

const DURATION = 420;
const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';

const setPanel = (panel: HTMLElement, open: boolean) => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduced) {
    panel.hidden = !open;
    return;
  }

  panel.hidden = false;
  const target = open ? panel.scrollHeight : 0;
  const from = open ? 0 : panel.scrollHeight;

  const animation = panel.animate(
    [{ height: `${from}px` }, { height: `${target}px` }],
    { duration: DURATION, easing: EASE },
  );

  animation.onfinish = () => {
    panel.style.height = '';
    panel.hidden = !open;
  };
};

const accordion = () => {
  const list = document.querySelector<HTMLElement>('[data-acc]');
  if (!list) return;

  const triggers = list.querySelectorAll<HTMLButtonElement>('.acc__trigger');

  triggers.forEach((trigger) => {
    const panel = document.getElementById(trigger.getAttribute('aria-controls') ?? '');
    if (!panel) return;

    trigger.addEventListener('click', () => {
      const open = trigger.getAttribute('aria-expanded') === 'true';

      // One panel at a time, like the reference.
      if (!open) {
        triggers.forEach((other) => {
          if (other === trigger || other.getAttribute('aria-expanded') !== 'true') return;
          const otherPanel = document.getElementById(other.getAttribute('aria-controls') ?? '');
          other.setAttribute('aria-expanded', 'false');
          if (otherPanel) setPanel(otherPanel, false);
        });
      }

      trigger.setAttribute('aria-expanded', String(!open));
      setPanel(panel, !open);
    });
  });
};

/* --- 3. Header tone ------------------------------------------------------- */

const headerTone = () => {
  const nav = document.querySelector<HTMLElement>('[data-nav]');
  const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-tone]'));
  if (!nav || !sections.length) return;

  let queued = false;

  const update = () => {
    queued = false;
    // Sample just below the header's own centre line.
    const probe = nav.offsetHeight * 0.6;
    const current = sections.find((section) => {
      const rect = section.getBoundingClientRect();
      return rect.top <= probe && rect.bottom > probe;
    });
    nav.classList.toggle('is-on-dark', current?.dataset.tone === 'dark');
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

/* --- 4. Mobile menu ------------------------------------------------------- */

const mobileMenu = () => {
  const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const sheet = document.querySelector<HTMLElement>('[data-menu]');
  if (!toggle || !sheet) return;

  const nav = document.querySelector<HTMLElement>('[data-nav]');

  const setOpen = (open: boolean) => {
    toggle.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
    // The sheet is dark whatever section is behind it, so the bar follows.
    nav?.classList.toggle('menu-open', open);

    if (open) {
      sheet.hidden = false;
      // Let the browser paint the un-hidden sheet before fading it in.
      requestAnimationFrame(() => sheet.classList.add('is-open'));
      return;
    }

    sheet.classList.remove('is-open');
    const done = () => {
      sheet.hidden = true;
      sheet.removeEventListener('transitionend', done);
    };
    sheet.addEventListener('transitionend', done);
  };

  toggle.addEventListener('click', () => {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  // Following an in-page anchor should close the sheet behind you.
  sheet.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      toggle.focus();
    }
  });
};

/* --- 5. Eased scrolling ---------------------------------------------------- */

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
      // The sheet is open and the body is locked.
      if (document.body.style.overflow === 'hidden') return;

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

reveal();
accordion();
headerTone();
mobileMenu();
smoothScroll();
