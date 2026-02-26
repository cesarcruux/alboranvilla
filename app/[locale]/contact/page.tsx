import { getDictionary } from "@/lib/i18n/getDictionary";
import ContactForm from "./ContactForm";
import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n/config";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {

    await params;

    return {
        title: "Contact – Alborán",
        description:
            "Begin with a conversation. Arrange your private stay at Alborán Villa in Gili Air.",
    };
}

export default async function ContactPage({
    params,
}: {
    params: Promise<{ locale: Locale }>;
}) {
    const { locale } = await params;
    const dictionary = await getDictionary(locale);

    return (
        <main>

            {/* HERO */}
            <section className="py-40 px-8">
                <div className="max-w-4xl mx-auto text-center">

                    <span className="text-xs uppercase tracking-[0.5em] text-[#A8C4A0] block mb-8">
                        {dictionary.contact.hero.eyebrow}
                    </span>

                    <h1 className="text-4xl md:text-6xl font-serif text-[#2f2f2f] leading-tight mb-10">
                        {dictionary.contact.hero.title}
                    </h1>

                    <p className="text-lg text-[#4a4a4a] font-light leading-relaxed">
                        {dictionary.contact.hero.subtitle}
                    </p>

                </div>
            </section>

            {/* FORM SECTION */}
            <section className="pb-32 px-8">
                <div className="max-w-3xl mx-auto">
                    <ContactForm messages={dictionary.contact.form} />
                </div>
            </section>

        </main>
    );
}