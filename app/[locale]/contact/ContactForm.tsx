"use client";

import { useState } from "react";

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        dates: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<string | null>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setStatus("success");
                setFormData({
                    name: "",
                    email: "",
                    dates: "",
                    message: "",
                });
            } else {
                setStatus("error");
            }
        } catch (error) {
            setStatus("error");
        }

        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-10">

            <div>
                <label className="block text-sm uppercase tracking-[0.3em] text-[#2f2f2f]/70 mb-4">
                    Name
                </label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border-b border-[#d6cfc7] bg-transparent py-3 focus:outline-none focus:border-[#2f2f2f]"
                />
            </div>

            <div>
                <label className="block text-sm uppercase tracking-[0.3em] text-[#2f2f2f]/70 mb-4">
                    Email
                </label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border-b border-[#d6cfc7] bg-transparent py-3 focus:outline-none focus:border-[#2f2f2f]"
                />
            </div>

            <div>
                <label className="block text-sm uppercase tracking-[0.3em] text-[#2f2f2f]/70 mb-4">
                    Arrival – Departure
                </label>
                <input
                    type="text"
                    name="dates"
                    value={formData.dates}
                    onChange={handleChange}
                    placeholder="Preferred dates"
                    className="w-full border-b border-[#d6cfc7] bg-transparent py-3 focus:outline-none focus:border-[#2f2f2f]"
                />
            </div>

            <div>
                <label className="block text-sm uppercase tracking-[0.3em] text-[#2f2f2f]/70 mb-4">
                    Message
                </label>
                <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full border-b border-[#d6cfc7] bg-transparent py-3 focus:outline-none focus:border-[#2f2f2f]"
                />
            </div>

            <div className="pt-6">
                <button
                    type="submit"
                    disabled={loading}
                    className="border border-[#2f2f2f]/60 text-[#2f2f2f] px-10 py-3 tracking-[0.25em] text-xs uppercase hover:bg-[#2f2f2f] hover:text-white transition-all duration-500"
                >
                    {loading ? "Sending..." : "Send Inquiry"}
                </button>

                {status === "success" && (
                    <p className="text-green-600 mt-4">
                        Your inquiry has been sent.
                    </p>
                )}

                {status === "error" && (
                    <p className="text-red-600 mt-4">
                        Something went wrong. Please try again.
                    </p>
                )}
            </div>

        </form>
    );
}