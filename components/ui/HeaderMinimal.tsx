"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function HeaderMinimal() {
    const pathname = usePathname();
    const locale = pathname.split("/")[1] || "en";
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <header className="fixed top-0 w-full z-50 bg-[#F8F4F0]/90 backdrop-blur-md border-b border-[#e4ddd4]">
                <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">

                    {/* Logo */}
                    <Link
                        href={`/${locale}`}
                        className="text-2xl font-serif tracking-wide text-[#2f2f2f]"
                    >
                        Alborán
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex gap-12 text-sm uppercase tracking-[0.25em] text-[#2f2f2f]/80">
                        <Link href={`/${locale}/villa`} className="hover:text-[#A8C4A0] transition-colors">
                            Villa
                        </Link>
                        <Link href={`/${locale}/experience`} className="hover:text-[#A8C4A0] transition-colors">
                            Experience
                        </Link>
                        <Link href={`/${locale}/journal`} className="hover:text-[#A8C4A0] transition-colors">
                            Journal
                        </Link>
                        <Link href={`/${locale}/contact`} className="hover:text-[#A8C4A0] transition-colors">
                            Contact
                        </Link>
                    </nav>

                    {/* Mobile Button */}
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

            {/* Mobile Overlay */}

            <div
                className={`
    fixed inset-0 bg-[#F8F4F0] z-50
    flex flex-col items-center justify-center gap-10
    text-lg uppercase tracking-[0.25em]
    transition-opacity duration-500
    ${menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
  `}
            >

                <button
                    onClick={() => setMenuOpen(false)}
                    className="absolute top-8 right-8 text-[#2f2f2f] text-3xl font-light tracking-wide hover:opacity-60 transition-opacity duration-300"
                    aria-label="Close menu"
                >
                    ×
                </button>

                <Link href={`/${locale}/villa`} onClick={() => setMenuOpen(false)}>
                    Villa
                </Link>

                <Link href={`/${locale}/experience`} onClick={() => setMenuOpen(false)}>
                    Experience
                </Link>

                <Link href={`/${locale}/journal`} onClick={() => setMenuOpen(false)}>
                    Journal
                </Link>

                <Link href={`/${locale}/contact`} onClick={() => setMenuOpen(false)}>
                    Contact
                </Link>

            </div>

        </>
    );
}