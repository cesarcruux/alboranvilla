import { Locale } from "./config";

export async function getDictionary(locale: Locale) {
    switch (locale) {
        case "es":
            return (await import("./dictionaries/es.json")).default;
        case "fr":
            return (await import("./dictionaries/fr.json")).default;
        case "de":
            return (await import("./dictionaries/de.json")).default;
        case "en":
        default:
            return (await import("./dictionaries/en.json")).default;
    }
}