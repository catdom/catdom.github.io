/**
 * COPY-TO-CLIPBOARD
 * The whole contact strategy is "email, no form", so this one interaction
 * carries real weight. It must never leave the visitor unsure whether it
 * worked, and must degrade to a plain mailto: link when the API is absent.
 */
export function initClipboard(): void {
  const buttons = document.querySelectorAll<HTMLElement>('[data-copy]');

  buttons.forEach((btn) => {
    const value = btn.dataset.copy;
    if (!value) return;

    // Without the async clipboard API the element stays a normal mailto link.
    if (!navigator.clipboard) return;
    btn.removeAttribute('hidden');

    let timer: number | undefined;

    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      try {
        await navigator.clipboard.writeText(value);
      } catch {
        return; // Permission denied — leave the link behaviour intact.
      }
      btn.setAttribute('data-copied', '');
      const live = btn.querySelector('[data-copy-feedback]');
      if (live) live.textContent = 'Copied';

      btn.dispatchEvent(new CustomEvent('copy:done', { bubbles: true }));

      clearTimeout(timer);
      timer = window.setTimeout(() => {
        btn.removeAttribute('data-copied');
        if (live) live.textContent = 'Copy';
      }, 1800);
    });
  });
}
