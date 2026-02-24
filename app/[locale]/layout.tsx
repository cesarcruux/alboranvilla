import HeaderMinimal from "@/components/ui/HeaderMinimal";
import FooterElegant from "@/components/ui/FooterElegant";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    return {
        metadataBase: new URL("https://www.alboranvilla.com"),
        title: "Alborán Villa – Private Mediterranean Residence in Gili Air",
        description:
            "A private architectural retreat in Gili Air, shaped by Mediterranean proportion and tropical stillness.",
        openGraph: {
            title: "Alborán Villa – Private Mediterranean Residence in Gili Air",
            description:
                "A private architectural retreat in Gili Air, shaped by Mediterranean proportion and tropical stillness.",
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

export default function LocaleLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "VacationRental",
        name: "Alborán Villa",
        image: "https://www.alboranvilla.com/images/hero.webp",
        url: "https://www.alboranvilla.com",
        telephone: "+6281215614589",
        email: "info@alboranvilla.com",
        priceRange: "$$$",
        address: {
            "@type": "PostalAddress",
            addressLocality: "Gili Indah",
            addressRegion: "West Nusa Tenggara",
            postalCode: "83352",
            addressCountry: "ID",
            streetAddress:
                "Gili Indah, Pemenang, North Lombok Regency, West Nusa Tenggara, Indonesia",
        },
        geo: {
            "@type": "GeoCoordinates",
            latitude: -8.35242725536122,
            longitude: 116.0825369305399,
        },
        aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "5",
            reviewCount: "5",
        },
        sameAs: [
            "https://www.google.com/maps/place/Albor%C3%A1n+Villa/",
        ],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
            <HeaderMinimal />
            <main className="pt-32">{children}</main>
            <FooterElegant />
            <WhatsAppButton />
        </>
    );
}