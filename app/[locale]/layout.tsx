import HeaderMinimal from "@/components/ui/HeaderMinimal";
import FooterElegant from "@/components/ui/FooterElegant";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import type { Metadata } from "next";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: "en" | "es" | "fr" | "de" }>;
}): Promise<Metadata> {
    const { locale } = await params;

    const titles: Record<string, string> = {
        en: "Alborán Villa – Private Mediterranean Residence in Gili Air",
        es: "Alborán Villa – Residencia Mediterránea Privada en Gili Air",
        fr: "Alborán Villa – Résidence Méditerranéenne Privée à Gili Air",
        de: "Alborán Villa – Private Mediterrane Residenz auf Gili Air",
    };

    const descriptions: Record<string, string> = {
        en: "A private architectural retreat in Gili Air, shaped by Mediterranean proportion and tropical stillness.",
        es: "Un retiro arquitectónico privado en Gili Air, inspirado en la proporción mediterránea y la quietud tropical.",
        fr: "Une retraite architecturale privée à Gili Air, façonnée par la proportion méditerranéenne et la quiétude tropicale.",
        de: "Ein privater architektonischer Rückzugsort auf Gili Air, geprägt von mediterraner Proportion und tropischer Ruhe.",
    };

    return {
        title: titles[locale],
        description: descriptions[locale],
        metadataBase: new URL("https://alboranvilla.com"),
        openGraph: {
            title: titles[locale],
            description: descriptions[locale],
            url: `https://alboranvilla.com/${locale}`,
            siteName: "Alborán Villa",
            images: [
                {
                    url: "/images/hero.jpg",
                    width: 1200,
                    height: 630,
                },
            ],
            locale,
            type: "website",
        },
    };
}

export default function LocaleLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <HeaderMinimal />
            <main className="pt-32">{children}</main>
            <FooterElegant />
            <WhatsAppButton />
        </>
    );
}