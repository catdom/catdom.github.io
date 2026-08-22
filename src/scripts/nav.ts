/**
 * NAV — hairline on scroll, plus scroll-spy for the section links.
 * Both are IntersectionObserver-based; no scroll handler does layout work.
 */
export function initNav(): void {
  const nav = document.querySelector<HTMLElement>('.nav');
  if (!nav) return;

  // Sentinel at the very top: when it leaves, the nav has detached.
  const sentinel = document.createElement('div');
  sentinel.setAttribute('aria-hidden', 'true');
  sentinel.style.cssText = 'position:absolute;top:0;height:1px;width:1px;';
  document.body.prepend(sentinel);

  new IntersectionObserver(
    ([entry]) => nav.toggleAttribute('data-scrolled', !entry!.isIntersecting),
  ).observe(sentinel);

  /* ---- scroll-spy ---- */
  const links = Array.from(
    nav.querySelectorAll<HTMLAnchorElement>('.nav__link[href^="#"]'),
  );
  if (links.length === 0) return;

  const sections = links
    .map((link) => document.querySelector<HTMLElement>(link.hash))
    .filter((el): el is HTMLElement => el !== null);

  const visible = new Set<string>();

  const spy = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target.id);
        else visible.delete(entry.target.id);
      }
      // Highlight the topmost visible section, in document order.
      const active = sections.find((s) => visible.has(s.id))?.id;
      links.forEach((link) => {
        if (active && link.hash === `#${active}`) {
          link.setAttribute('aria-current', 'page');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    },
    { rootMargin: '-20% 0px -60% 0px' },
  );
  sections.forEach((s) => spy.observe(s));
}
