import HeaderMinimal from "@/components/ui/HeaderMinimal";
import FooterElegant from "@/components/ui/FooterElegant";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import type { Metadata } from "next";
import { defaultLocale } from "@/lib/i18n/config";

type Params = Promise<{
    locale: string;
}>;

export async function generateMetadata(): Promise<Metadata> {
    return {
        metadataBase: new URL("https://www.alboranvilla.com"),
        title: "Alborán Villa – Private Mediterranean Villas in Gili Air",
        description:
            "Alborán Villa is a private Mediterranean-inspired villa project in Gili Air, Indonesia, offering secluded architectural residences with private pools.",
        openGraph: {
            title:
                "Alborán Villa – Private Mediterranean Villas in Gili Air",
            description:
                "A private Mediterranean-inspired villa project in Gili Air, Indonesia, designed for architectural silence and tropical stillness.",
            url: "https://www.alboranvilla.com",
            siteName: "Alborán Villa",
            images: [
                {
                    url: "/images/hero.webp",
                    width: 1200,
                    height: 630,
                },
            ],
            type: "website",
            locale: "en_US",
        },
    };
}

export async function generateStaticParams() {
    return [{ locale: defaultLocale }];
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Params;
}) {
    const { locale } = await params;

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "LodgingBusiness",
        "@id": "https://www.alboranvilla.com/#business",
        name: "Alborán Villa",
        description:
            "Alborán Villa is a private architectural retreat in Gili Air, Indonesia, offering Mediterranean-inspired residences designed for silence, proportion and tropical stillness.",
        url: `https://www.alboranvilla.com/${locale}`,
        image: "https://www.alboranvilla.com/images/hero.webp",
        telephone: "+6281215614589",
        email: "info@alboranvilla.com",
        priceRange: "$$$",
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(structuredData),
                }}
            />
            <HeaderMinimal />
            <main className="pt-32">{children}</main>
            <FooterElegant locale={locale} />
            <WhatsAppButton />
        </>
    );
}