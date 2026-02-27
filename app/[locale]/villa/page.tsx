import Image from "next/image";
import Link from "next/link";
import { getDictionary } from "@/lib/i18n/getDictionary";
import type { Locale } from "@/lib/i18n/config";
import { locales } from "@/lib/i18n/config";

export async function generateMetadata({
    params,
}: {
    params: { locale: string };
}) {

    const { locale } = params;

    const baseUrl = "https://www.alboranvilla.com";
    const canonicalUrl = `${baseUrl}/${locale}/villa`;

    const languageAlternates: Record<string, string> = {};

    for (const loc of locales) {
        languageAlternates[loc] = `${baseUrl}/${loc}/villa`;
    }

    languageAlternates["x-default"] = `${baseUrl}/en/villa`;

    return {
        title: "The Villa – Alborán",
        description:
            "A private Mediterranean villa in Gili Air, Indonesia, designed around light, proportion and quiet refinement.",
        alternates: {
            canonical: canonicalUrl,
            languages: languageAlternates,
        },
    };
}

export default async function VillaPage({
    params,
}: {
    params: Promise<{ locale: Locale }>;
}) {
    const { locale } = await params;

    await getDictionary(locale);

    const villaStructuredData = {
        "@context": "https://schema.org",
        "@type": "Accommodation",
        "@id": `https://www.alboranvilla.com/${locale}/villa#residence`,
        name: "Alborán Villa – Residence I",
        description:
            "A private Mediterranean villa in Gili Air, Indonesia, designed around light, proportion and quiet refinement.",
        occupancy: {
            "@type": "QuantitativeValue",
            minValue: 2,
            maxValue: 3,
        },
        numberOfRooms: 1,
        amenityFeature: [
            {
                "@type": "LocationFeatureSpecification",
                name: "Private Pool",
                value: true,
            },
            {
                "@type": "LocationFeatureSpecification",
                name: "Extra Bed Available",
                value: true,
            },
            {
                "@type": "LocationFeatureSpecification",
                name: "Baby Crib Available",
                value: true,
            },
        ],
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
                    __html: JSON.stringify(villaStructuredData),
                }}
            />

            {/* HERO */}
            <section className="pt-40 pb-20 px-8">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">

                    <div>
                        <span className="text-xs uppercase tracking-[0.5em] text-[#A8C4A0] block mb-8">
                            The Architecture
                        </span>

                        <h1 className="text-4xl md:text-6xl font-serif text-[#2f2f2f] leading-tight mb-10">
                            A Private Architectural Retreat
                            <br /> in Gili Air, Indonesia.
                        </h1>

                        <p className="text-lg text-[#4a4a4a] font-light leading-relaxed max-w-md">
                            Mediterranean proportion meets tropical stillness —
                            creating a space where interior and exterior dissolve
                            into one continuous architectural rhythm.
                        </p>
                    </div>

                    <div className="relative h-[600px] overflow-hidden">
                        <Image
                            src="/images/villa-detail-01.jpg"
                            alt="Alborán Villa Mediterranean Architecture in Gili Air"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                </div>
            </section>

            {/* INFO STRIP */}
            <section className="py-16 px-8 border-t border-[#e4ddd4] border-b border-[#e4ddd4]">
                <div className="max-w-5xl mx-auto text-center">
                    <div className="text-sm uppercase tracking-[0.35em] text-[#2f2f2f]/70 space-x-6">
                        <span>1 Bedroom</span>
                        <span>·</span>
                        <span>2–3 Guests</span>
                        <span>·</span>
                        <span>Private Pool</span>
                        <span>·</span>
                        <span>Gili Air, Indonesia</span>
                    </div>
                </div>
            </section>

            {/* SPATIAL PHILOSOPHY */}
            <section className="py-32 px-8">
                <div className="max-w-6xl mx-auto text-center">

                    <h2 className="text-3xl md:text-4xl font-serif text-[#2f2f2f] mb-16">
                        Spatial Philosophy
                    </h2>

                    <p className="text-lg text-[#4a4a4a] font-light leading-relaxed max-w-3xl mx-auto mb-12">
                        The villa is designed around transition — from light to shadow,
                        from interior to exterior, from stillness to openness.
                        Each space unfolds gradually, encouraging presence rather than movement.
                    </p>

                    <Link
                        href={`/${locale}/experience`}
                        className="text-sm uppercase tracking-[0.3em] text-[#A8C4A0] hover:opacity-70 transition-opacity"
                    >
                        Discover the Experience
                    </Link>
                </div>
            </section>

            {/* FINAL INVITATION */}
            <section className="py-32 px-8 bg-[#F8F4F0]">
                <div className="max-w-3xl mx-auto text-center">

                    <h2 className="text-3xl md:text-4xl font-serif text-[#2f2f2f] mb-8">
                        Experience the Villa in Person.
                    </h2>

                    <p className="text-lg text-[#4a4a4a] font-light leading-relaxed mb-12">
                        A private Mediterranean villa in Gili Air designed for
                        stillness, proportion and quiet refinement.
                    </p>

                    <Link
                        href={`/${locale}/contact`}
                        className="border border-[#2f2f2f]/60 text-[#2f2f2f] px-10 py-3 tracking-[0.25em] text-xs uppercase hover:bg-[#2f2f2f] hover:text-white transition-all duration-500"
                    >
                        Begin Your Stay
                    </Link>
                </div>
            </section>

        </main>
    );
}