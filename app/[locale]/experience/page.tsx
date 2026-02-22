import { getDictionary } from "@/lib/i18n/getDictionary";

import type { Metadata } from "next";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: "en" | "es" | "fr" | "de" }>;
}): Promise<Metadata> {

    await params;

    return {
        title: "The Experience – Alborán",
        description:
            "A slower rhythm of living in Gili Air. Mornings of light, afternoons of stillness and evenings of quiet return.",
    };
}
export default async function ExperiencePage({
    params,
}: {
    params: Promise<{ locale: "en" | "es" | "fr" | "de" }>;
}) {
    const { locale } = await params;
    const dictionary = await getDictionary(locale);

    return (
        <main>

            {/* HERO */}
            <section className="py-40 px-8">
                <div className="max-w-5xl mx-auto">

                    <span className="text-xs uppercase tracking-[0.5em] text-[#A8C4A0] block mb-8">
                        The Experience
                    </span>

                    <h1 className="text-4xl md:text-6xl font-serif text-[#2f2f2f] leading-tight mb-10">
                        Life at a Slower Rhythm.
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
                        <img
                            src="/images/villa-detail-01.jpg"
                            alt="Morning at Alborán"
                            className="object-cover w-full h-full"
                        />
                    </div>

                </div>
            </section>

            {/* AFTERNOON */}
            <section className="py-32 px-8 bg-[#efeae3]">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-24 items-center">

                    <div className="relative h-[500px] overflow-hidden md:order-1">
                        <img
                            src="/images/villa-detail-01.jpg"
                            alt="Afternoon at Alborán"
                            className="object-cover w-full h-full"
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
                        <img
                            src="/images/villa-detail-01.jpg"
                            alt="Evening at Alborán"
                            className="object-cover w-full h-full"
                        />
                    </div>

                </div>
            </section>

        </main>
    );
}