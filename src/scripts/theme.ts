/**
 * THEME TOGGLE
 *
 * The blocking snippet in Layout.astro has already applied the correct theme
 * before first paint, so there is never a flash. This module only wires up
 * the control and keeps the choice in localStorage.
 *
 * Three states, deliberately: light / dark / system. Most implementations
 * skip "system", which quietly overrides the OS setting forever after one
 * accidental click.
 */

type Theme = 'light' | 'dark' | 'system';
const KEY = 'theme';
const ORDER: Theme[] = ['system', 'light', 'dark'];

function read(): Theme {
  try {
    const v = localStorage.getItem(KEY);
    return v === 'light' || v === 'dark' ? v : 'system';
  } catch {
    return 'system';
  }
}

function apply(theme: Theme): void {
  const root = document.documentElement;
  if (theme === 'system') root.removeAttribute('data-theme');
  else root.setAttribute('data-theme', theme);

  try {
    if (theme === 'system') localStorage.removeItem(KEY);
    else localStorage.setItem(KEY, theme);
  } catch {
    /* Private mode, or storage disabled. The theme still applies for now. */
  }
}

function resolved(theme: Theme): 'light' | 'dark' {
  if (theme !== 'system') return theme;
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function initTheme(): void {
  const btn = document.querySelector<HTMLButtonElement>('[data-theme-toggle]');
  if (!btn) return;

  const sync = (theme: Theme) => {
    btn.dataset.themeState = theme;
    btn.setAttribute(
      'aria-label',
      `Colour theme: ${theme}. Activate to switch to ${
        ORDER[(ORDER.indexOf(theme) + 1) % ORDER.length]
      }.`,
    );
    btn.querySelectorAll<HTMLElement>('[data-theme-icon]').forEach((icon) => {
      icon.toggleAttribute('hidden', icon.dataset.themeIcon !== resolved(theme));
    });
  };

  sync(read());

  btn.addEventListener('click', () => {
    const next = ORDER[(ORDER.indexOf(read()) + 1) % ORDER.length]!;
    apply(next);
    sync(next);
  });

  // Track OS changes while in "system" mode so the icon stays truthful.
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (read() === 'system') sync('system');
  });
}
