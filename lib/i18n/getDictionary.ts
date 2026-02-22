type Locale = "en" | "es" | "fr" | "de";

export async function getDictionary(locale: Locale) {
    switch (locale) {
        case "en":
            return (await import("./dictionaries/en.json")).default;

        case "es":
            return (await import("./dictionaries/en.json")).default;

        case "fr":
            return (await import("./dictionaries/en.json")).default;

        case "de":
            return (await import("./dictionaries/en.json")).default;

        default:
            return (await import("./dictionaries/en.json")).default;
    }
}