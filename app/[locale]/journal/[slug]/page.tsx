import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales } from "@/lib/i18n/config";
import type { Locale } from "@/lib/i18n/config";
import { getPosts } from "@/lib/journal/getPosts";

type Params = Promise<{
    locale: string;
    slug: string;
}>;

const baseUrl = "https://www.alboranvilla.com";

function isValidLocale(locale: string): locale is Locale {
    return locales.includes(locale as any);
}

async function findPost(locale: Locale, slug: string) {
    const posts = await getPosts(locale);
    return posts.find((post) => post.slug === slug);
}

export async function generateStaticParams() {
    const params: { locale: string; slug: string }[] = [];

    for (const locale of locales) {
        const posts = await getPosts(locale as Locale);

        for (const post of posts) {
            params.push({
                locale,
                slug: post.slug,
            });
        }
    }

    return params;
}

export async function generateMetadata({
    params,
}: {
    params: Params;
}): Promise<Metadata> {
    const { locale, slug } = await params;

    if (!isValidLocale(locale)) {
        return {};
    }

    const post = await findPost(locale, slug);

    if (!post) {
        return {
            title: "Journal – Alborán",
            description: "Notes on architecture and island life.",
        };
    }

    const canonicalUrl = `${baseUrl}/${locale}/journal/${post.slug}`;

    const languageAlternates: Record<string, string> = {};

    for (const loc of locales) {
        const posts = await getPosts(loc as Locale);
        const exists = posts.find((p) => p.slug === slug);

        if (exists) {
            languageAlternates[loc] = `${baseUrl}/${loc}/journal/${slug}`;
        }
    }

    languageAlternates["x-default"] = `${baseUrl}/en/journal/${slug}`;

    return {
        title: `${post.title} – Alborán Journal`,
        description: post.description,
        alternates: {
            canonical: canonicalUrl,
            languages: languageAlternates,
        },
        openGraph: {
            title: post.title,
            description: post.description,
            url: canonicalUrl,
            siteName: "Alborán Villa",
            type: "article",
            publishedTime: post.date,
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.description,
        },
    };
}

export default async function JournalPostPage({
    params,
}: {
    params: Params;
}) {
    const { locale, slug } = await params;

    if (!isValidLocale(locale)) {
        return notFound();
    }

    const post = await findPost(locale, slug);

    if (!post) {
        return notFound();
    }

    const articleStructuredData = {
        "@context": "https://schema.org",
        "@type": "Article",
        "@id": `${baseUrl}/${locale}/journal/${post.slug}#article`,
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        author: {
            "@type": "Organization",
            name: "Alborán Villa",
        },
        publisher: {
            "@type": "Organization",
            name: "Alborán Villa",
        },
    };

    return (
        <main className="pt-24 bg-[#F8F4F0]">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(articleStructuredData),
                }}
            />

            <section className="py-40 px-8">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-serif text-[#2f2f2f] mb-16">
                        {post.title}
                    </h1>

                    <div className="space-y-8 text-lg text-[#4a4a4a] font-light leading-relaxed">
                        {post.content
                            .split("\n")
                            .map((paragraph, index) =>
                                paragraph.trim() ? <p key={index}>{paragraph}</p> : null
                            )}
                    </div>
                </div>
            </section>
        </main>
    );
}