import HeroCinematic from "../../components/sections/HeroCinematic";
import { getDictionary } from "@/lib/i18n/getDictionary";
import Storytelling from "../../components/sections/Storytelling";
import VillaHighlights from "../../components/sections/VillaHighlights";
import LocationAtmosphere from "../../components/sections/LocationAtmosphere";
import FinalInvitation from "../../components/sections/FinalInvitation";

export default async function Home({
    params,
}: {
    params: Promise<{ locale: "en" | "es" | "fr" | "de" }>;
}) {
    const { locale } = await params;
    const dictionary = await getDictionary(locale);

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
            <FinalInvitation
                title={dictionary.home.finalInvitation.title}
                subtitle={dictionary.home.finalInvitation.subtitle}
                cta={dictionary.home.finalInvitation.cta}
            />
        </main>
    );
}