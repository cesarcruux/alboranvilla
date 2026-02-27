import Link from "next/link";

type FinalInvitationProps = {
    title: string;
    subtitle: string;
    cta: string;
    locale: string;
};

export default function FinalInvitation({
    title,
    subtitle,
    cta,
    locale,
}: FinalInvitationProps) {
    return (
        <section className="py-32 px-6 bg-[#f3efe9] text-center">
            <div className="max-w-3xl mx-auto">

                <h2 className="text-3xl md:text-4xl font-serif text-[#2f2f2f] leading-tight mb-8">
                    {title}
                </h2>

                <p className="text-[#4a4a4a] font-light text-lg leading-relaxed mb-12">
                    {subtitle}
                </p>

                <Link
                    href={`/${locale}/contact`}
                    className="inline-block border border-[#2f2f2f]/60 text-[#2f2f2f] px-10 py-3 tracking-[0.25em] text-xs uppercase hover:bg-[#2f2f2f] hover:text-white transition-all duration-500"
                >
                    {cta}
                </Link>

            </div>
        </section>
    );
}