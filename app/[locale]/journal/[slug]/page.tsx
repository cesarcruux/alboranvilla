import type { Metadata } from "next";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {

    const { slug } = await params;

    const metadataMap: Record<string, { title: string; description: string }> = {
        "slow-mornings": {
            title: "The Art of Slow Mornings – Alborán Journal",
            description:
                "Why architecture shapes rhythm and presence in the quiet mornings of Gili Air.",
        },
        "stone-and-light": {
            title: "Stone and Light – Alborán Journal",
            description:
                "Mediterranean proportion translated into tropical stillness at Alborán Villa.",
        },
    };

    const meta = metadataMap[slug];

    if (!meta) {
        return {
            title: "Journal – Alborán",
            description: "Notes on architecture and island life.",
        };
    }

    return {
        title: meta.title,
        description: meta.description,
    };
}

const posts: Record<string, { title: string; content: string; description: string; date: string }> = {
    "slow-mornings": {
        title: "The Art of Slow Mornings",
        description:
            "Why architecture shapes rhythm and presence in the quiet mornings of Gili Air.",
        date: "2026-03-01",
        content: `
      At Alborán, mornings are not rushed.
      Light moves slowly across stone walls.
      Coffee is taken without distraction.
      The island remains quiet.

      Architecture influences rhythm.
      Space influences breath.
      Stillness becomes part of the design.
    `,
    },
    "stone-and-light": {
        title: "Stone and Light",
        description:
            "Mediterranean proportion translated into tropical stillness at Alborán Villa.",
        date: "2026-02-01",
        content: `
      Mediterranean architecture relies on proportion and material.
      In Gili Air, those proportions meet tropical light.

      Stone absorbs heat.
      Open thresholds invite breeze.
      Interior and exterior dissolve into one continuous atmosphere.
    `,
    },
};

export default async function JournalPostPage({
    params,
}: {
    params: Promise<{ locale: "en"; slug: string }>;
}) {
    const { slug } = await params;

    const post = posts[slug];

    if (!post) {
        return (
            <main>
                <div className="max-w-4xl mx-auto py-40 text-center">
                    <h1 className="text-4xl font-serif">Article Not Found</h1>
                </div>
            </main>
        );
    }

    const articleStructuredData = {
        "@context": "https://schema.org",
        "@type": "Article",
        "@id": `https://www.alboranvilla.com/journal/${slug}#article`,
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
            logo: {
                "@type": "ImageObject",
                url: "https://www.alboranvilla.com/images/hero.webp",
            },
        },
        isPartOf: {
            "@type": "Blog",
            "@id": "https://www.alboranvilla.com/journal#blog",
        },
        about: {
            "@type": "LodgingBusiness",
            "@id": "https://www.alboranvilla.com/#business",
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
                        {post.content.split("\n").map((paragraph, index) =>
                            paragraph.trim() ? (
                                <p key={index}>{paragraph}</p>
                            ) : null
                        )}
                    </div>

                </div>
            </section>

        </main>
    );
}