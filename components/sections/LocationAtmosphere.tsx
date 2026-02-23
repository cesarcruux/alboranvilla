import Image from "next/image";

export default function LocationAtmosphere() {
    return (
        <section className="py-32 px-6 md:px-12">
            <div className="max-w-5xl mx-auto">

                {/* Imagen contenida estilo editorial */}
                <div className="relative w-full h-[500px] mb-20">
                    <Image
                        src="/location.jpg"
                        alt="Gili Air aerial view"
                        fill
                        className="object-cover"
                        priority={false}
                    />
                </div>

                {/* Texto minimal */}
                <div className="text-center max-w-3xl mx-auto">

                    <h2 className="text-sm uppercase tracking-[0.3em] text-[#8A8A8A] mb-10">
                        Setting
                    </h2>

                    <p className="text-2xl md:text-3xl leading-relaxed text-[#2f2f2f] mb-10">
                        An island without cars.<br />
                        Reached only by boat.<br />
                        Defined by silence.
                    </p>

                    <div className="text-sm tracking-[0.2em] uppercase text-[#8A8A8A] space-y-3">
                        <p>Gili Air, Indonesia</p>
                        <a
                            href="https://maps.app.goo.gl/2xPxYmyqhYq5sHPC6"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border-b border-[#8A8A8A]/40 hover:border-[#2f2f2f] transition-all"
                        >
                            Find us →
                        </a>
                    </div>

                </div>
            </div>
        </section>
    );
}