import Link from "next/link";

type Highlight = {
    title: string;
    description: string;
};

type VillaHighlightsProps = {
    highlights: Highlight[];
};

export default function VillaHighlights({
    highlights,
}: VillaHighlightsProps) {
    return (
        <section className="py-28 px-6 bg-white">
            <div className="max-w-6xl mx-auto">

                <div className="grid md:grid-cols-4 gap-16 text-center">

                    {highlights.map((item, index) => (
                        <Link key={index} href="/en/villa" className="block">
                            <div className="cursor-pointer transition-opacity hover:opacity-80">

                                <h3 className="text-xs uppercase tracking-[0.4em] mb-6 text-[#A8C4A0]">
                                    {item.title}
                                </h3>

                                <p className="text-[#4a4a4a] font-light leading-relaxed text-sm">
                                    {item.description}
                                </p>

                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </section>
    );
}