import { getDictionary } from "@/lib/i18n/getDictionary";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: "en" | "es" | "fr" | "de" }>;
}) {
    await params;

    return {
        title: "The Villa – Alborán",
        description:
            "A private Mediterranean residence in Gili Air designed around light, proportion and quiet refinement.",
    };
}
export default async function VillaPage({
    params,
}: {
    params: Promise<{ locale: "en" | "es" | "fr" | "de" }>;
}) {
    const { locale } = await params;
    const dictionary = await getDictionary(locale);

    return (
        <main>

            {/* HERO */}
            <section className="pt-40 pb-20 px-8">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">

                    {/* Texto */}
                    <div>
                        <span className="text-xs uppercase tracking-[0.5em] text-[#A8C4A0] block mb-8">
                            The Architecture
                        </span>

                        <h1 className="text-4xl md:text-6xl font-serif text-[#2f2f2f] leading-tight mb-10">
                            A Private Residence
                            <br /> Shaped by Light.
                        </h1>

                        <p className="text-lg text-[#4a4a4a] font-light leading-relaxed max-w-md">
                            Mediterranean proportion meets tropical stillness — creating a space
                            where interior and exterior dissolve into one continuous rhythm.
                        </p>
                    </div>

                    {/* Imagen lateral */}
                    <div className="relative h-[600px] overflow-hidden">
                        <img
                            src="/images/villa-detail-01.jpg"
                            alt="Alborán Villa Architecture"
                            className="object-cover w-full h-full"
                        />
                    </div>

                </div>
            </section>

            {/* CONTEMPLATIVE DETAIL */}
            <section className="py-40 px-8">
                <div className="max-w-3xl mx-auto">
                    <div className="relative h-[500px] overflow-hidden">
                        <img
                            src="/images/hero.jpg"
                            alt="Alborán Villa Detail"
                            className="object-cover w-full h-full scale-105 transition-transform duration-1000"
                        />
                    </div>
                </div>
            </section>

            {/* SPATIAL PHILOSOPHY */}
            <section className="py-32 px-8">
                <div className="max-w-6xl mx-auto">

                    <h2 className="text-3xl md:text-4xl font-serif text-[#2f2f2f] mb-16">
                        Spatial Philosophy
                    </h2>

                    <div className="grid md:grid-cols-2 gap-20">

                        <p className="text-lg text-[#4a4a4a] font-light leading-relaxed">
                            The villa is designed around transition — from light to shadow, from interior to exterior,
                            from stillness to openness. Each space unfolds gradually, encouraging presence rather than movement.
                        </p>

                        <p className="text-lg text-[#4a4a4a] font-light leading-relaxed">
                            There are no abrupt separations. Stone textures, open thresholds and proportioned volumes
                            create a continuous architectural rhythm — where privacy feels natural rather than imposed.
                        </p>

                    </div>

                </div>
            </section>
        </main>
    );
}