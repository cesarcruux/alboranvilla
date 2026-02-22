import { getDictionary } from "@/lib/i18n/getDictionary";

import type { Metadata } from "next";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: "en" | "es" | "fr" | "de" }>;
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
    params: Promise<{ locale: "en" | "es" | "fr" | "de" }>;
}) {
    const { locale } = await params;
    const dictionary = await getDictionary(locale);

    return (
        <main>

            {/* HERO */}
            <section className="py-40 px-8">
                <div className="max-w-4xl mx-auto text-center">

                    <span className="text-xs uppercase tracking-[0.5em] text-[#A8C4A0] block mb-8">
                        Contact
                    </span>

                    <h1 className="text-4xl md:text-6xl font-serif text-[#2f2f2f] leading-tight mb-10">
                        Begin with a Conversation.
                    </h1>

                    <p className="text-lg text-[#4a4a4a] font-light leading-relaxed">
                        Each stay at Alborán is arranged personally.
                        Share your dates and intentions, and we will respond thoughtfully.
                    </p>

                </div>
            </section>

            {/* FORM SECTION */}
            <section className="pb-32 px-8">
                <div className="max-w-3xl mx-auto">

                    <form className="space-y-10">

                        <div>
                            <label className="block text-sm uppercase tracking-[0.3em] text-[#2f2f2f]/70 mb-4">
                                Name
                            </label>
                            <input
                                type="text"
                                className="w-full border-b border-[#d6cfc7] bg-transparent py-3 focus:outline-none focus:border-[#2f2f2f]"
                            />
                        </div>

                        <div>
                            <label className="block text-sm uppercase tracking-[0.3em] text-[#2f2f2f]/70 mb-4">
                                Email
                            </label>
                            <input
                                type="email"
                                className="w-full border-b border-[#d6cfc7] bg-transparent py-3 focus:outline-none focus:border-[#2f2f2f]"
                            />
                        </div>

                        <div>
                            <label className="block text-sm uppercase tracking-[0.3em] text-[#2f2f2f]/70 mb-4">
                                Arrival – Departure
                            </label>
                            <input
                                type="text"
                                className="w-full border-b border-[#d6cfc7] bg-transparent py-3 focus:outline-none focus:border-[#2f2f2f]"
                                placeholder="Preferred dates"
                            />
                        </div>

                        <div>
                            <label className="block text-sm uppercase tracking-[0.3em] text-[#2f2f2f]/70 mb-4">
                                Message
                            </label>
                            <textarea
                                rows={4}
                                className="w-full border-b border-[#d6cfc7] bg-transparent py-3 focus:outline-none focus:border-[#2f2f2f]"
                            />
                        </div>

                        <div className="pt-6">
                            <button className="border border-[#2f2f2f]/60 text-[#2f2f2f] px-10 py-3 tracking-[0.25em] text-xs uppercase hover:bg-[#2f2f2f] hover:text-white transition-all duration-500">
                                Send Inquiry
                            </button>
                        </div>

                    </form>

                </div>
            </section>

        </main>
    );
}