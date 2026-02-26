import { Locale } from "@/lib/i18n/config";
import { JournalPost } from "./types";

/**
 * Carga dinámica de posts según idioma.
 * Cada idioma tendrá su propia carpeta dentro de:
 * lib/journal/content/{locale}
 */

export async function getPosts(locale: Locale): Promise<JournalPost[]> {
    try {
        const posts = await import(`./content/${locale}`);
        return posts.default as JournalPost[];
    } catch (error) {
        console.error(`No journal content found for locale: ${locale}`);
        return [];
    }
}