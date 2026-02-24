import HeaderMinimal from "@/components/ui/HeaderMinimal";
import FooterElegant from "@/components/ui/FooterElegant";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    return {
        metadataBase: new URL("https://www.alboranvilla.com"),
        title: "Alborán Villa – Private Mediterranean Villas in Gili Air",
        description:
            "Alborán Villa is a private Mediterranean-inspired villa project in Gili Air, Indonesia, offering secluded architectural residences with private pools.",
        openGraph: {
            title: "Alborán Villa – Private Mediterranean Villas in Gili Air",
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

export default function LocaleLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "LodgingBusiness",
        "@id": "https://www.alboranvilla.com/#business",
        name: "Alborán Villa",
        description:
            "Alborán Villa is a private architectural retreat in Gili Air, Indonesia, offering Mediterranean-inspired residences designed for silence, proportion and tropical stillness.",
        url: "https://www.alboranvilla.com",
        image: "https://www.alboranvilla.com/images/hero.webp",
        telephone: "+6281215614589",
        email: "info@alboranvilla.com",
        priceRange: "$$$",

        address: {
            "@type": "PostalAddress",
            streetAddress:
                "Gili Indah, Pemenang, North Lombok Regency",
            addressLocality: "Gili Air",
            addressRegion: "West Nusa Tenggara",
            postalCode: "83352",
            addressCountry: "ID",
        },

        geo: {
            "@type": "GeoCoordinates",
            latitude: -8.35242725536122,
            longitude: 116.0825369305399,
        },

        containedInPlace: {
            "@type": "AdministrativeArea",
            name: "West Nusa Tenggara",
            containedInPlace: {
                "@type": "Country",
                name: "Indonesia",
            },
        },

        hasAccommodation: [
            {
                "@type": "Accommodation",
                name: "Alborán Villa – Residence I",
                occupancy: {
                    "@type": "QuantitativeValue",
                    maxValue: 4,
                },
                amenityFeature: [
                    {
                        "@type": "LocationFeatureSpecification",
                        name: "Private Pool",
                        value: true,
                    },
                    {
                        "@type": "LocationFeatureSpecification",
                        name: "Mediterranean Architecture",
                        value: true,
                    },
                ],
            },
        ],

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
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(structuredData),
                }}
            />
            <HeaderMinimal />
            <main className="pt-32">{children}</main>
            <FooterElegant />
            <WhatsAppButton />
        </>
    );
}