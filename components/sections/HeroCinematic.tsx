
import Image from "next/image";

type HeroProps = {
    headline: string;
    subheadline: string;
    cta: string;
};

export default function HeroCinematic({
    headline,
    subheadline,
    cta,
}: HeroProps) {
    return (
        <section className="relative h-screen w-full overflow-hidden">
            <Image
                src="/images/hero.webp"
                alt="Alborán Villa"
                fill
                priority
                className="object-cover"
            />

            <div className="absolute inset-0 bg-black/40" />

            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
                <h1 className="text-4xl md:text-6xl font-serif text-white mb-6 leading-tight max-w-4xl">
                    {headline}
                </h1>

                <p className="text-white/80 tracking-widest uppercase text-sm mb-10">
                    {subheadline}
                </p>

                <button className="border border-white/60 text-white px-10 py-3 tracking-[0.2em] text-xs uppercase hover:bg-white hover:text-black transition-all duration-500">
                    {cta}
                </button>
            </div>
        </section>
    );
}