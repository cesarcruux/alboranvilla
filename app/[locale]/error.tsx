"use client";

import Link from "next/link";

export default function Error({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) {

    console.error("App error:", error);

    return (
        <main className="min-h-screen bg-[#F8F4F0] flex items-center justify-center px-8">
            <div className="max-w-xl text-center">

                <h1 className="text-4xl md:text-5xl font-serif text-[#2f2f2f] mb-8">
                    Something went wrong
                </h1>

                <p className="text-[#4a4a4a] font-light mb-10 leading-relaxed">
                    We apologise for the inconvenience.
                    Please refresh the page or return to the homepage.
                </p>

                <div className="flex justify-center gap-6">

                    <button
                        onClick={() => reset()}
                        className="
                            border border-[#2f2f2f]/60 
                            text-[#2f2f2f] 
                            px-8 py-3 
                            tracking-[0.25em] 
                            text-xs 
                            uppercase 
                            transition-all duration-500
                            hover:bg-[#2f2f2f] 
                            hover:text-white
                        "
                    >
                        Try again
                    </button>

                    <Link
                        href="/"
                        className="
                            border border-transparent
                            text-[#2f2f2f] 
                            px-8 py-3 
                            tracking-[0.25em] 
                            text-xs 
                            uppercase 
                            underline
                        "
                    >
                        Home
                    </Link>

                </div>

            </div>
        </main>
    );
}