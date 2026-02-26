export const locales = [
    "en", // English (default)
    "fr", // French
    "de", // German
    "nl", // Dutch
    "it", // Italian
    "ru", // Russian
    "id", // Indonesian
    "es", // Spanish
] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";