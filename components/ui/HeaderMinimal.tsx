"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { locales } from "@/lib/i18n/config";

const localeFlags: Record<string, string> = {
    en: "🇬🇧",
    es: "🇪🇸",
    fr: "🇫🇷",
    de: "🇩🇪",
    nl: "🇳🇱",
    it: "🇮🇹",
    ru: "🇷🇺",
    id: "🇮🇩",
};

export default function HeaderMinimal() {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);
    const [langOpen, setLangOpen] = useState(false);

    const segments = pathname.split("/").filter(Boolean);

    const currentLocale =
        segments.length > 0 && locales.includes(segments[0] as any)
            ? segments[0]
            : "en";

    const restSegments =
        segments.length > 0 && locales.includes(segments[0] as any)
            ? segments.slice(1)
            : segments;

    const buildPath = (newLocale: string) => {
        const rest = restSegments.join("/");
        return rest ? `/${newLocale}/${rest}` : `/${newLocale}`;
    };

    return (
        <>
            <header className="fixed top-0 w-full z-50 bg-[#F8F4F0]/90 backdrop-blur-md border-b border-[#e4ddd4]">
                <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">
                    <Link
                        href={`/${currentLocale}`}
                        className="text-2xl font-serif tracking-wide text-[#2f2f2f]"
                    >
                        Alborán
                    </Link>

                    <nav className="hidden md:flex gap-12 text-sm uppercase tracking-[0.25em] text-[#2f2f2f]/80 items-center">
                        <Link
                            href={`/${currentLocale}/villa`}
                            className="hover:text-[#A8C4A0] transition-colors"
                        >
                            Villa
                        </Link>

                        <Link
                            href={`/${currentLocale}/experience`}
                            className="hover:text-[#A8C4A0] transition-colors"
                        >
                            Experience
                        </Link>

                        <Link
                            href={`/${currentLocale}/journal`}
                            className="hover:text-[#A8C4A0] transition-colors"
                        >
                            Journal
                        </Link>

                        <Link
                            href={`/${currentLocale}/contact`}
                            className="hover:text-[#A8C4A0] transition-colors"
                        >
                            Contact
                        </Link>

                        {/* Language Dropdown */}
                        <div className="relative ml-6 text-xs tracking-[0.2em] text-[#2f2f2f]/70">
                            <button
                                onClick={() => setLangOpen(!langOpen)}
                                className="hover:text-[#A8C4A0] transition-colors flex items-center gap-2"
                            >
                                <span>{localeFlags[currentLocale]}</span>
                                <span>{currentLocale.toUpperCase()}</span>
                                <span>▾</span>
                            </button>

                            <div
                                className={`
                  absolute right-0 mt-4 bg-[#F8F4F0] border border-[#e4ddd4]
                  py-4 px-6 space-y-3 text-xs
                  transition-all duration-300
                  ${langOpen ? "opacity-100 visible" : "opacity-0 invisible"}
                `}
                            >
                                {locales
                                    .filter((loc) => loc !== currentLocale)
                                    .map((loc) => (
                                        <Link
                                            key={loc}
                                            href={buildPath(loc)}
                                            className="flex items-center gap-3 hover:text-[#A8C4A0] transition-colors"
                                        >
                                            <span>{localeFlags[loc]}</span>
                                            <span>{loc.toUpperCase()}</span>
                                        </Link>
                                    ))}
                            </div>
                        </div>
                    </nav>

                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden text-[#2f2f2f]"
                        aria-label="Toggle menu"
                    >
                        <div className="w-6 h-[1.5px] bg-[#2f2f2f] mb-1"></div>
                        <div className="w-6 h-[1.5px] bg-[#2f2f2f] mb-1"></div>
                        <div className="w-6 h-[1.5px] bg-[#2f2f2f]"></div>
                    </button>
                </div>
            </header>
        </>
    );
}