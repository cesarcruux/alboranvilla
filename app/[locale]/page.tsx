import HeroCinematic from "../../components/sections/HeroCinematic";
import { getDictionary } from "@/lib/i18n/getDictionary";
import Storytelling from "../../components/sections/Storytelling";
import VillaHighlights from "../../components/sections/VillaHighlights";
import LocationAtmosphere from "../../components/sections/LocationAtmosphere";
import FinalInvitation from "../../components/sections/FinalInvitation";

export default async function Home({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const dictionary = await getDictionary(locale as any);

    return (
        <main>
            <HeroCinematic
                headline={dictionary.home.hero.headline}
                subheadline={dictionary.home.hero.subheadline}
                cta={dictionary.home.hero.cta}
            />

            <Storytelling
                eyebrow={dictionary.home.story.eyebrow}
                title={dictionary.home.story.title}
                paragraph1={dictionary.home.story.paragraph1}
                paragraph2={dictionary.home.story.paragraph2}
            />

            <VillaHighlights
                highlights={dictionary.home.highlights}
            />

            <LocationAtmosphere />

            <section className="max-w-3xl mx-auto px-8 py-24 text-center">
                <h2 className="text-2xl md:text-3xl font-serif text-[#2f2f2f] mb-6">
                    A Private Architectural Retreat in Gili Air
                </h2>

                <p className="text-base text-[#4a4a4a] font-light leading-relaxed">
                    Alborán Villa is a private Mediterranean-inspired villa project
                    located in Gili Air, Indonesia. Designed around architectural
                    proportion, natural materials and tropical stillness,
                    the residence offers a secluded and refined retreat experience.
                </p>
            </section>

            <FinalInvitation
                title={dictionary.home.finalInvitation.title}
                subtitle={dictionary.home.finalInvitation.subtitle}
                cta={dictionary.home.finalInvitation.cta}
            />
        </main>
    );
}