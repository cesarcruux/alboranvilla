import { Locale } from "./config";

import en from "./dictionaries/en";
import es from "./dictionaries/es.json";
import fr from "./dictionaries/fr.json";
import de from "./dictionaries/de.json";
import nl from "./dictionaries/nl.json";
import it from "./dictionaries/it.json";
import ru from "./dictionaries/ru.json";
import id from "./dictionaries/id.json";

export type Dictionary = typeof en;

// 🔐 Forzamos que todos los diccionarios cumplan exactamente la estructura de "en"
const dictionaries: Record<Locale, Dictionary> = {
    en,
    es,
    fr,
    de,
    nl,
    it,
    ru,
    id,
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
    return dictionaries[locale];
}