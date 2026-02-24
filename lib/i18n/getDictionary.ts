import { locales } from "./config";

export type Locale = (typeof locales)[number];

export type Dictionary = typeof import("./dictionaries/en.json");

export async function getDictionary(locale: Locale): Promise<Dictionary> {
    switch (locale) {
        case "es":
            return (await import("./dictionaries/es.json")).default as Dictionary;
        case "fr":
            return (await import("./dictionaries/fr.json")).default as Dictionary;
        case "de":
            return (await import("./dictionaries/de.json")).default as Dictionary;
        case "en":
        default:
            return (await import("./dictionaries/en.json")).default as Dictionary;
    }
}