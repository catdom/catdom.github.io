/** Every piece of user-facing copy is stored as a pair. */
export type L10n<T = string> = { en: T; es: T };

export type Lang = keyof L10n;

export const LANGS = ['en', 'es'] as const satisfies readonly Lang[];

/** `/` is English; Spanish lives under `/es`. */
export const langPrefix = (lang: Lang) => (lang === 'en' ? '' : `/${lang}`);

export const t = <T,>(value: L10n<T>, lang: Lang): T => value[lang];
