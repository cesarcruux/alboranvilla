import type { MetadataRoute } from "next";

const baseUrl = "https://www.alboranvilla.com";

export default function sitemap(): MetadataRoute.Sitemap {
    const routes = [
        "",
        "/villa",
        "/experience",
        "/journal",
        "/contact",
    ];

    return routes.map((route) => ({
        url: `${baseUrl}/en${route}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: route === "" ? 1 : 0.8,
    }));
}