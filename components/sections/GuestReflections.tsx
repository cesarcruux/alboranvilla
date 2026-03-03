import { guestReflections } from '@/data/guestReflections'

export default function GuestReflections() {
    return (
        <section className="w-full py-24">
            <div className="mx-auto max-w-5xl px-6">

                {/* Eyebrow */}

                <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400">
                    Reflections
                </p>

                {/* Heading */}

                <h2 className="mt-6 text-xl font-light text-neutral-800 md:text-2xl">
                    Experienced and remembered by our guests.
                </h2>

                {/* Reflections Grid */}
                <div className="mt-16 grid grid-cols-1 gap-16 md:grid-cols-2">
                    {guestReflections.map((reflection, index) => (
                        <div key={index} className="space-y-6">

                            <p className="text-lg font-light leading-relaxed text-neutral-800">
                                “{reflection.quote}”
                            </p>

                            <div className="h-px w-12 bg-neutral-300" />

                            <p className="text-xs uppercase tracking-widest text-neutral-500">
                                {reflection.source} · {reflection.date}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}