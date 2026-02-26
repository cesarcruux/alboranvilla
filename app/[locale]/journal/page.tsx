import type { Metadata } from "next";
import Link from "next/link";
import { locales } from "@/lib/i18n/config";
import type { Locale } from "@/lib/i18n/config";
import { getPosts } from "@/lib/journal/getPosts";

type Params = Promise<{
    locale: string;
}>;

const baseUrl = "https://www.alboranvilla.com";

function isValidLocale(locale: string): locale is Locale {
    return locales.includes(locale as any);
}

export async function generateMetadata({
    params,
}: {
    params: Params;
}): Promise<Metadata> {
    const { locale } = await params;

    if (!isValidLocale(locale)) {
        return {};
    }

    const canonicalUrl = `${baseUrl}/${locale}/journal`;

    const languageAlternates: Record<string, string> = {};

    for (const loc of locales) {
        languageAlternates[loc] = `${baseUrl}/${loc}/journal`;
    }

    languageAlternates["x-default"] = `${baseUrl}/en/journal`;

    const title = "Journal – Alborán Villa";
    const description =
        "Notes on Mediterranean architecture, island rhythm and quiet design in Gili Air.";

    return {
        title,
        description,
        alternates: {
            canonical: canonicalUrl,
            languages: languageAlternates,
        },
        openGraph: {
            title,
            description,
            url: canonicalUrl,
            siteName: "Alborán Villa",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
        },
    };
}

export default async function JournalListingPage({
    params,
}: {
    params: Params;
}) {
    const { locale } = await params;

    if (!isValidLocale(locale)) {
        return null;
    }

    const posts = await getPosts(locale);

    const sortedPosts = posts.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    const blogStructuredData = {
        "@context": "https://schema.org",
        "@type": "Blog",
        "@id": `${baseUrl}/${locale}/journal#blog`,
        name: "Alborán Journal",
        description:
            "Notes on Mediterranean architecture, island rhythm and quiet design in Gili Air.",
        url: `${baseUrl}/${locale}/journal`,
    };

    return (
        <main className="pt-24 bg-[#F8F4F0]">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(blogStructuredData),
                }}
            />

            <section className="py-40 px-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-serif text-[#2f2f2f] mb-20">
                        Journal
                    </h1>

                    <div className="space-y-16">
                        {sortedPosts.map((post) => (
                            <article key={post.slug}>
                                <Link
                                    href={`/${locale}/journal/${post.slug}`}
                                    className="group block"
                                >
                                    <h2 className="text-2xl md:text-3xl font-serif text-[#2f2f2f] group-hover:opacity-70 transition-opacity">
                                        {post.title}
                                    </h2>
                                </Link>

                                <p className="mt-4 text-[#4a4a4a] font-light leading-relaxed">
                                    {post.description}
                                </p>

                                <div className="mt-4 text-sm text-gray-500">
                                    {post.date}
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}