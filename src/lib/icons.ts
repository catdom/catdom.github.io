/**
 * Inline icon set. Kept as a plain module rather than inside the component
 * so the type can be imported by anything that takes an icon name.
 * All 24x24, 1.6 stroke, no fills — they inherit currentColor.
 */
export type IconName =
  | 'arrow-ne'
  | 'arrow-right'
  | 'check'
  | 'copy'
  | 'sun'
  | 'moon'
  | 'github'
  | 'link'
  | 'dot';

export const iconPaths: Record<IconName, string> = {
  'arrow-ne': '<path d="M7 17 17 7M9 7h8v8"/>',
  'arrow-right': '<path d="M4 12h16M14 6l6 6-6 6"/>',
  check: '<path d="m4 12 5 5L20 6"/>',
  copy:
    '<rect x="9" y="9" width="11" height="11" rx="2"/>' +
    '<path d="M5 15V5a2 2 0 0 1 2-2h10"/>',
  sun:
    '<circle cx="12" cy="12" r="4"/>' +
    '<path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2' +
    'M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  moon: '<path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z"/>',
  github:
    '<path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 ' +
    '5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 ' +
    '0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 ' +
    '4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/>',
  link:
    '<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/>' +
    '<path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',
  dot: '<circle cx="12" cy="12" r="4"/>',
};
