import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n/config";
import type { Locale } from "@/lib/i18n/config";
import { getPosts } from "@/lib/journal/getPosts";

const baseUrl = "https://www.alboranvilla.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const staticRoutes = [
        "",
        "/villa",
        "/experience",
        "/journal",
        "/contact",
    ];

    const sitemapEntries: MetadataRoute.Sitemap = [];

    // 🌍 Static pages for all locales
    for (const locale of locales) {
        for (const route of staticRoutes) {
            sitemapEntries.push({
                url: `${baseUrl}/${locale}${route}`,
                lastModified: new Date(),
                changeFrequency: "monthly",
                priority: route === "" ? 1 : 0.8,
            });
        }
    }

    // 📝 Journal articles per locale (nuevo sistema)
    for (const locale of locales) {
        const posts = await getPosts(locale as Locale);

        for (const post of posts) {
            sitemapEntries.push({
                url: `${baseUrl}/${locale}/journal/${post.slug}`,
                lastModified: new Date(post.date),
                changeFrequency: "monthly",
                priority: 0.7,
            });
        }
    }

    return sitemapEntries;
}