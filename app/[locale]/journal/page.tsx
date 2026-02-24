import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Journal – Alborán",
        description:
            "Notes on architecture, stillness and island life at Alborán Villa in Gili Air.",
    };
}

export default function JournalPage() {

    const posts = [
        {
            slug: "no-motorised-traffic",
            title: "Why the Absence of Motorised Traffic Changes the Experience of Place",
            excerpt:
                "How the absence of engines in Gili Air transforms rhythm, perception and the architecture of retreat.",
            date: "April 2026",
        },
        {
            slug: "slow-mornings",
            title: "The Art of Slow Mornings",
            excerpt:
                "Why architecture matters when time slows down and presence becomes the only agenda.",
            date: "March 2026",
        },
        {
            slug: "stone-and-light",
            title: "Stone and Light",
            excerpt:
                "Mediterranean proportions translated into tropical stillness.",
            date: "February 2026",
        },
    ];

    const blogStructuredData = {
        "@context": "https://schema.org",
        "@type": "Blog",
        "@id": "https://www.alboranvilla.com/journal#blog",
        name: "Alborán Journal",
        description:
            "Editorial notes on architecture, stillness and island life at Alborán Villa in Gili Air.",
        isPartOf: {
            "@type": "LodgingBusiness",
            "@id": "https://www.alboranvilla.com/#business",
            name: "Alborán Villa",
        },
    };

    return (
        <main>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(blogStructuredData),
                }}
            />

            <section className="py-40 px-8 text-center">
                <div className="max-w-4xl mx-auto">

                    <span className="text-xs uppercase tracking-[0.5em] text-[#A8C4A0] block mb-8">
                        Journal
                    </span>

                    <h1 className="text-4xl md:text-6xl font-serif text-[#2f2f2f] leading-tight">
                        Notes on Architecture, Stillness & Island Life.
                    </h1>

                </div>
            </section>

            <section className="pb-40 px-8">
                <div className="max-w-5xl mx-auto space-y-24">

                    {posts.map((post) => (
                        <article key={post.slug} className="border-t border-[#e4ddd4] pt-12">

                            <span className="text-xs uppercase tracking-[0.3em] text-[#2f2f2f]/60 block mb-6">
                                {post.date}
                            </span>

                            <h2 className="text-2xl md:text-3xl font-serif text-[#2f2f2f] mb-6">
                                {post.title}
                            </h2>

                            <p className="text-lg text-[#4a4a4a] font-light leading-relaxed max-w-2xl mb-6">
                                {post.excerpt}
                            </p>

                            <a
                                href={`/en/journal/${post.slug}`}
                                className="text-sm uppercase tracking-[0.3em] text-[#2f2f2f] hover:text-[#A8C4A0] transition-colors"
                            >
                                Read Article →
                            </a>

                        </article>
                    ))}

                </div>
            </section>

        </main>
    );
}