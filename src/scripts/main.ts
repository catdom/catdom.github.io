/* Client behaviour. Three small features, no framework, no dependencies. */

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

reveal();
accordion();
headerTone();
mobileMenu();
