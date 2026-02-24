import HeaderMinimal from "@/components/ui/HeaderMinimal";
import FooterElegant from "@/components/ui/FooterElegant";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    return {
        metadataBase: new URL("https://alboranvilla.com"),
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
                    url: "/images/hero.jpg",
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
    return (
        <>
            <HeaderMinimal />
            <main className="pt-32">{children}</main>
            <FooterElegant />
            <WhatsAppButton />
        </>
    );
}