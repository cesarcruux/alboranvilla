import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "The Experience – Alborán",
        description:
            "A slower rhythm of living in Gili Air. Mornings of light, afternoons of stillness and evenings of quiet return.",
    };
}

export default function ExperiencePage({
    params,
}: {
    params: { locale: "en" };
}) {
    return (
        <main>

            {/* HERO */}
            <section className="py-40 px-8">
                <div className="max-w-5xl mx-auto">

                    <span className="text-xs uppercase tracking-[0.5em] text-[#A8C4A0] block mb-8">
                        The Experience
                    </span>

                    <h1 className="text-4xl md:text-6xl font-serif text-[#2f2f2f] leading-tight mb-10">
                        The Rhythm of a Private Retreat.
                    </h1>
                    <p className="text-lg text-[#4a4a4a] font-light leading-relaxed max-w-2xl">
                        Days unfold gently in Gili Air. Mornings begin with soft light,
                        afternoons dissolve into stillness, and evenings return to quiet reflection.
                        The experience is not programmed — it is discovered.
                    </p>

                </div>
            </section>

            {/* MORNING */}
            <section className="py-32 px-8">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-24 items-center">

                    <div>
                        <h2 className="text-3xl font-serif text-[#2f2f2f] mb-8">
                            Morning Light
                        </h2>

                        <p className="text-lg text-[#4a4a4a] font-light leading-relaxed">
                            The day begins softly. Sunlight moves across stone surfaces,
                            coffee is taken slowly, and the island remains almost silent.
                            There is no urgency — only presence.
                        </p>
                    </div>

                    <div className="relative h-[500px] overflow-hidden">
                        <Image
                            src="/images/villa-detail-01.jpg"
                            alt="Morning light at Alborán Villa in Gili Air"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>

                </div>
            </section>

            {/* AFTERNOON */}
            <section className="py-32 px-8 bg-[#efeae3]">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-24 items-center">

                    <div className="relative h-[500px] overflow-hidden md:order-1">
                        <Image
                            src="/images/villa-detail-01.jpg"
                            alt="Afternoon stillness at Alborán Villa"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>

                    <div className="md:order-2">
                        <h2 className="text-3xl font-serif text-[#2f2f2f] mb-8">
                            Afternoon Stillness
                        </h2>

                        <p className="text-lg text-[#4a4a4a] font-light leading-relaxed">
                            As the sun rises higher, time slows. The pool reflects the sky,
                            air moves gently through open thresholds, and silence becomes tangible.
                            Nothing demands attention.
                        </p>
                    </div>

                </div>
            </section>

            {/* EVENING */}
            <section className="py-32 px-8">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-24 items-center">

                    <div>
                        <h2 className="text-3xl font-serif text-[#2f2f2f] mb-8">
                            Evening Return
                        </h2>

                        <p className="text-lg text-[#4a4a4a] font-light leading-relaxed">
                            As daylight fades, the villa becomes intimate. Soft shadows settle,
                            stone retains the warmth of the sun, and the island quiets once more.
                            The day closes gently, without spectacle.
                        </p>
                    </div>

                    <div className="relative h-[500px] overflow-hidden">
                        <Image
                            src="/images/villa-detail-01.jpg"
                            alt="Evening at Alborán Villa in Gili Air"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>

                </div>
            </section>
            <section className="py-24 px-8">
                <div className="max-w-3xl mx-auto text-center">

                    <h2 className="text-2xl md:text-3xl font-serif text-[#2f2f2f] mb-8">
                        A Retreat Shaped by the Island
                    </h2>

                    <p className="text-lg text-[#4a4a4a] font-light leading-relaxed">
                        Gili Air’s absence of motorised traffic, its walkable scale and its
                        proximity to the sea create the conditions for genuine retreat.
                        Here, architecture does not isolate — it amplifies the natural rhythm
                        of the island itself.
                    </p>

                </div>
            </section>
            {/* RETURN TO VILLA (ARCHITECTURAL LINK) */}
            <section className="py-32 px-8 bg-[#F8F4F0]">
                <div className="max-w-3xl mx-auto text-center">

                    <h2 className="text-3xl md:text-4xl font-serif text-[#2f2f2f] mb-8">
                        Rooted in Architecture.
                    </h2>

                    <p className="text-lg text-[#4a4a4a] font-light leading-relaxed mb-12">
                        Every experience begins with space. Discover the Mediterranean
                        architecture that shapes each moment.
                    </p>

                    <Link
                        href="/en/villa"
                        className="text-sm uppercase tracking-[0.3em] text-[#A8C4A0] hover:opacity-70 transition-opacity"
                    >
                        Explore the Villa
                    </Link>

                </div>
            </section>

            {/* FINAL INVITATION */}
            <section className="py-32 px-8">
                <div className="max-w-3xl mx-auto text-center">

                    <h2 className="text-3xl md:text-4xl font-serif text-[#2f2f2f] mb-8">
                        Begin Your Stay.
                    </h2>

                    <p className="text-lg text-[#4a4a4a] font-light leading-relaxed mb-12">
                        A private Mediterranean villa in Gili Air designed for stillness,
                        proportion and quiet refinement.
                    </p>

                    <Link
                        href="/en/contact"
                        className="border border-[#2f2f2f]/60 text-[#2f2f2f] px-10 py-3 tracking-[0.25em] text-xs uppercase hover:bg-[#2f2f2f] hover:text-white transition-all duration-500"
                    >
                        Contact
                    </Link>

                </div>
            </section>

        </main>
    );
}