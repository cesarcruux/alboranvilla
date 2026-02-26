import Link from "next/link";

type Props = {
    locale: string;
};

export default function FooterElegant({ locale }: Props) {
    return (
        <footer className="bg-[#efeae3] pt-32 pb-20 px-8 mt-32">
            <div className="max-w-6xl mx-auto">

                {/* Top Section */}
                <div className="grid md:grid-cols-3 gap-16 mb-24">

                    {/* Brand */}
                    <div>
                        <h3 className="font-serif text-2xl text-[#2f2f2f] mb-6">
                            Alborán
                        </h3>
                        <p className="text-[#4a4a4a] font-light leading-relaxed text-sm max-w-xs">
                            A private architectural retreat in Gili Air,
                            shaped by Mediterranean proportion and tropical stillness.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div className="text-sm uppercase tracking-[0.2em] text-[#2f2f2f]/80 space-y-4">

                        <Link
                            href={`/${locale}/villa`}
                            className="block hover:text-[#A8C4A0] transition-colors"
                        >
                            Villa
                        </Link>

                        <Link
                            href={`/${locale}/experience`}
                            className="block hover:text-[#A8C4A0] transition-colors"
                        >
                            Experience
                        </Link>

                        <Link
                            href={`/${locale}/journal`}
                            className="block hover:text-[#A8C4A0] transition-colors"
                        >
                            Journal
                        </Link>

                        <Link
                            href={`/${locale}/contact`}
                            className="block hover:text-[#A8C4A0] transition-colors"
                        >
                            Contact
                        </Link>

                    </div>

                    {/* Quiet Note */}
                    <div>
                        <p className="text-[#4a4a4a] font-light text-sm leading-relaxed">
                            Designed for presence.
                            <br />
                            Reserved for those who value privacy.
                        </p>
                    </div>

                </div>

                {/* Bottom Line */}
                <div className="border-t border-[#d6cfc7] pt-8 text-xs text-[#4a4a4a]/70 flex justify-between items-center">
                    <span>© {new Date().getFullYear()} Alborán Villa</span>

                    <div className="flex items-center gap-6">
                        <span>Gili Air, Indonesia</span>

                        <a
                            href="https://www.instagram.com/alboranvilla"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Alborán Villa Instagram"
                            className="group transition-opacity duration-300 hover:opacity-70"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.4"
                                className="w-10 h-10 text-[#4a4a4a] group-hover:text-[#2f2f2f] transition-colors duration-300"
                            >
                                <rect x="3" y="3" width="18" height="18" rx="5" />
                                <circle cx="12" cy="12" r="4" />
                                <circle cx="17" cy="7" r="1" />
                            </svg>
                        </a>
                    </div>
                </div>

            </div>
        </footer>
    );
}