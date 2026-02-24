type Locale = "en" | "es" | "fr" | "de";

export async function getDictionary(locale: Locale) {
    try {
        return (await import(`./dictionaries/${locale}.json`)).default;
    } catch (error) {
        // Fallback seguro a inglés si algo falla
        return (await import("./dictionaries/en.json")).default;
    }
}