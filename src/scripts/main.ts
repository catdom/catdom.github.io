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
    // Past the very top, the bar takes on its translucent band.
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

/* --- 6. Contact form ------------------------------------------------------ */

/* Posts to Formspree with fetch so the visitor stays on the page. Without
   JavaScript the form still submits normally — the action and method are on
   the element itself — so this only ever improves on a working baseline.
   Nothing is requested from Formspree until someone actually submits. */

const contactForm = () => {
  const form = document.querySelector<HTMLFormElement>('[data-cform]');
  if (!form) return;

  const status = form.querySelector<HTMLElement>('[data-status]');
  const button = form.querySelector<HTMLButtonElement>('[data-send]');
  const copy = form.dataset;
  if (!status || !button) return;

  const fields = [...form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
    'input[required], textarea[required]',
  )];

  const setError = (field: HTMLInputElement | HTMLTextAreaElement, message: string) => {
    const wrap = field.closest<HTMLElement>('.field');
    const note = form.querySelector<HTMLElement>(`[data-err-for="${field.id}"]`);
    if (!wrap || !note) return;

    if (message) {
      wrap.setAttribute('data-invalid', '');
      note.textContent = message;
      note.hidden = false;
      field.setAttribute('aria-invalid', 'true');
      field.setAttribute('aria-describedby', note.id || `err-${field.id}`);
      if (!note.id) note.id = `err-${field.id}`;
      return;
    }

    wrap.removeAttribute('data-invalid');
    note.hidden = true;
    note.textContent = '';
    field.removeAttribute('aria-invalid');
    field.removeAttribute('aria-describedby');
  };

  const check = (field: HTMLInputElement | HTMLTextAreaElement) => {
    const value = field.value.trim();
    if (!value) return copy.msgRequired ?? '';
    if (field.type === 'email' && !field.checkValidity()) return copy.msgBadEmail ?? '';
    return '';
  };

  fields.forEach((field) => {
    // Only nag after they have had a go at the field, then keep it live.
    field.addEventListener('blur', () => setError(field, check(field)));
    field.addEventListener('input', () => {
      if (field.closest('.field')?.hasAttribute('data-invalid')) setError(field, check(field));
    });
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const problems = fields.map((field) => {
      const message = check(field);
      setError(field, message);
      return message ? field : null;
    }).filter(Boolean) as (HTMLInputElement | HTMLTextAreaElement)[];

    if (problems.length) {
      problems[0].focus();
      return;
    }

    button.disabled = true;
    button.textContent = copy.msgSending ?? '';
    status.textContent = '';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) throw new Error(String(response.status));

      // Replace the form with its confirmation, and move focus there so it is
      // announced rather than silently swapped in.
      form.setAttribute('data-sent', '');
      status.textContent = copy.msgSent ?? '';
      status.setAttribute('tabindex', '-1');
      form.after(status);
      status.focus();
    } catch {
      button.disabled = false;
      button.textContent = copy.msgSend ?? '';
      status.innerHTML = '';
      status.append(copy.msgError ?? '');
      const link = document.createElement('a');
      link.href = `mailto:${copy.email ?? ''}`;
      link.textContent = copy.email ?? '';
      status.append(' ', link);
    }
  });
};

/* --- 7. Rotating headline ------------------------------------------------- */

/* Swaps the tail of the headline on a fixed beat: 2s on screen, then the
   outgoing phrase leaves through the top as the next arrives from below.
   Every phrase is already in the markup, so without this the first one just
   sits there and the headline still reads correctly. */

const HOLD = 2000;
const ROLL = 260;

const rotatingHeadline = () => {
  const rotator = document.querySelector<HTMLElement>('[data-rotator]');
  if (!rotator) return;

  const phrases = [...rotator.querySelectorAll<HTMLElement>('[data-phrase]')];
  if (phrases.length < 2) return;

  rotator.setAttribute('data-ready', '');
  rotator.style.setProperty('--roll', `${ROLL}ms`);

  // A screen reader should hear the headline once, not every two seconds.
  rotator.setAttribute('aria-live', 'off');
  phrases.forEach((phrase, i) => {
    if (i === 0) phrase.setAttribute('data-in', '');
    else phrase.setAttribute('aria-hidden', 'true');
  });

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let at = 0;
  let timer: ReturnType<typeof setTimeout> | undefined;

  const step = () => {
    const current = phrases[at];
    at = (at + 1) % phrases.length;
    const next = phrases[at];

    current.removeAttribute('data-in');
    current.setAttribute('data-out', '');
    current.setAttribute('aria-hidden', 'true');

    next.removeAttribute('data-out');
    next.setAttribute('data-in', '');
    next.removeAttribute('aria-hidden');

    // Park the outgoing phrase back below the line, ready for its next turn,
    // once it is out of sight.
    setTimeout(() => current.removeAttribute('data-out'), ROLL);

    timer = setTimeout(step, HOLD);
  };

  const start = () => {
    if (timer || reduced.matches) return;
    timer = setTimeout(step, HOLD);
  };

  const stop = () => {
    clearTimeout(timer);
    timer = undefined;
  };

  // Nothing to animate in a background tab, and nothing to animate once the
  // headline has scrolled away.
  document.addEventListener('visibilitychange', () => {
    document.hidden ? stop() : start();
  });

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(
      ([entry]) => (entry.isIntersecting && !document.hidden ? start() : stop()),
      { threshold: 0 },
    ).observe(rotator);
  } else {
    start();
  }

  reduced.addEventListener('change', () => (reduced.matches ? stop() : start()));
};

reveal();
accordion();
headerTone();
mobileMenu();
smoothScroll();
contactForm();
rotatingHeadline();
