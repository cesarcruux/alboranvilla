"use client";

import { useEffect, useState } from "react";

export default function WhatsAppButton() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const phoneNumber = "6281215614589";
    const message = encodeURIComponent(
        "Alboran Villa, en que podemos ayudarle?"
    );

    const url = `https://wa.me/${phoneNumber}?text=${message}`;

    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat via WhatsApp"
            className="
        fixed bottom-6 right-6 z-50
        bg-neutral-900 text-white
        px-6 py-3
        rounded-full
        shadow-xl
        backdrop-blur-sm
        border border-white/10
        hover:bg-neutral-800
        transition-all duration-300
        text-sm tracking-wide
      "
        >
            WhatsApp
        </a>
    );
}