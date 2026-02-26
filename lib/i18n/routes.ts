import type { Locale } from "./config";

export const routeTranslations: Record<
    string,
    Record<Locale, string>
> = {
    villa: {
        en: "villa",
        fr: "villa-privee",
        de: "private-villa",
        nl: "prive-villa",
        it: "villa-privata",
        ru: "chastnaya-villa",
        id: "vila-pribadi",
        es: "villa-privada",
    },
    experience: {
        en: "experience",
        fr: "experience",
        de: "erlebnis",
        nl: "ervaring",
        it: "esperienza",
        ru: "opyt",
        id: "pengalaman",
        es: "experiencia",
    },
    journal: {
        en: "journal",
        fr: "journal",
        de: "journal",
        nl: "journal",
        it: "journal",
        ru: "journal",
        id: "journal",
        es: "journal",
    },
    contact: {
        en: "contact",
        fr: "contact",
        de: "kontakt",
        nl: "contact",
        it: "contatto",
        ru: "kontakt",
        id: "kontak",
        es: "contacto",
    },
};