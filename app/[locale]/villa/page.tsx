import Image from "next/image";
import Link from "next/link";
import { getDictionary } from "@/lib/i18n/getDictionary";

export async function generateMetadata() {
    return {
        title: "The Villa – Alborán",
        description:
            "A private Mediterranean villa in Gili Air, Indonesia, designed around light, proportion and quiet refinement.",
    };
}

export default async function VillaPage({
    params,
}: {
    params: { locale: "en" };
}) {
    const { locale } = params;
    await getDictionary(locale);

    const villaStructuredData = {
        "@context": "https://schema.org",
        "@type": "Accommodation",
        "@id": "https://www.alboranvilla.com/villa#residence",
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
                            A Private Mediterranean Villa
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

            {/* CONTEMPLATIVE DETAIL */}
            <section className="py-40 px-8">
                <div className="max-w-3xl mx-auto">
                    <div className="relative h-[500px] overflow-hidden">
                        <Image
                            src="/images/hero.webp"
                            alt="Private Mediterranean villa detail in Gili Air"
                            fill
                            className="object-cover scale-105 transition-transform duration-1000"
                            sizes="100vw"
                        />
                    </div>
                </div>
            </section>

            {/* SPATIAL PHILOSOPHY */}
            <section className="py-32 px-8">
                <div className="max-w-6xl mx-auto">

                    <h2 className="text-3xl md:text-4xl font-serif text-[#2f2f2f] mb-16 text-center">
                        Spatial Philosophy
                    </h2>

                    <div className="grid md:grid-cols-2 gap-20 mb-16">

                        <p className="text-lg text-[#4a4a4a] font-light leading-relaxed">
                            The villa is designed around transition — from light to shadow,
                            from interior to exterior, from stillness to openness.
                            Each space unfolds gradually, encouraging presence rather than movement.
                        </p>

                        <p className="text-lg text-[#4a4a4a] font-light leading-relaxed">
                            There are no abrupt separations. Stone textures, open thresholds
                            and proportioned volumes create a continuous architectural rhythm —
                            where privacy feels natural rather than imposed.
                        </p>

                    </div>

                    <div className="text-center">
                        <Link
                            href="/en/experience"
                            className="text-sm uppercase tracking-[0.3em] text-[#A8C4A0] hover:opacity-70 transition-opacity"
                        >
                            Discover the Experience
                        </Link>
                    </div>

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
                        href="/en/contact"
                        className="border border-[#2f2f2f]/60 text-[#2f2f2f] px-10 py-3 tracking-[0.25em] text-xs uppercase hover:bg-[#2f2f2f] hover:text-white transition-all duration-500"
                    >
                        Begin Your Stay
                    </Link>

                </div>
            </section>

        </main>
    );
}