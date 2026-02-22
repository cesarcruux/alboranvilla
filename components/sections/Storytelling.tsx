type StorytellingProps = {
    eyebrow: string;
    title: string;
    paragraph1: string;
    paragraph2: string;
};

export default function Storytelling({
    eyebrow,
    title,
    paragraph1,
    paragraph2,
}: StorytellingProps) {
    return (
        <section className="py-32 px-6 bg-[#F8F4F0]">
            <div className="max-w-5xl mx-auto text-center">

                <span className="text-xs tracking-[0.5em] uppercase text-[#A8C4A0] block mb-8">
                    {eyebrow}
                </span>

                <h2 className="text-3xl md:text-4xl font-serif mb-10 text-[#2f2f2f] leading-[1.3]">
                    {title}
                </h2>

                <p className="text-lg text-[#4a4a4a] leading-relaxed mb-8 font-light">
                    {paragraph1}
                </p>

                <p className="text-lg text-[#4a4a4a] leading-relaxed font-light">
                    {paragraph2}
                </p>

            </div>
        </section>
    );
}