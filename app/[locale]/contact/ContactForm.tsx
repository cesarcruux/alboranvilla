"use client";

import { useState } from "react";

type ContactFormProps = {
    messages: {
        labels: {
            name: string;
            email: string;
            dates: string;
            message: string;
        };
        button: string;
        status: {
            success: string;
            error: string;
            sending: string;
        };
        errors: {
            required: string;
            invalidEmail: string;
        };
    };
};

export default function ContactForm({ messages }: ContactFormProps) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        dates: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<string | null>(null);

    const [errors, setErrors] = useState<{
        name?: string;
        email?: string;
        message?: string;
    }>({});

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

        const newErrors: typeof errors = {};

        if (!formData.name.trim()) {
            newErrors.name = messages.errors.required;
        }

        if (!formData.email.trim()) {
            newErrors.email = messages.errors.required;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = messages.errors.invalidEmail;
        }

        if (!formData.message.trim()) {
            newErrors.message = messages.errors.required;
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setLoading(false);
            return;
        }

        setErrors({});

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
        <form onSubmit={handleSubmit} noValidate className="space-y-10">

            <div>
                <label className="block text-sm uppercase tracking-[0.3em] text-[#2f2f2f]/70 mb-4">
                    {messages.labels.name}
                </label>
                <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border-b border-[#d6cfc7] bg-transparent py-3 focus:outline-none focus:border-[#2f2f2f]"
                />
                {errors.name && (
                    <p className="text-red-600 text-sm mt-2">{errors.name}</p>
                )}
            </div>

            <div>
                <label className="block text-sm uppercase tracking-[0.3em] text-[#2f2f2f]/70 mb-4">
                    {messages.labels.email}
                </label>
                <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border-b border-[#d6cfc7] bg-transparent py-3 focus:outline-none focus:border-[#2f2f2f]"
                />

                {errors.email && (
                    <p className="text-red-600 text-sm mt-2">{errors.email}</p>
                )}

            </div>

            <div>
                <label className="block text-sm uppercase tracking-[0.3em] text-[#2f2f2f]/70 mb-4">
                    {messages.labels.dates}
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
                    {messages.labels.message}
                </label>
                <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full border-b border-[#d6cfc7] bg-transparent py-3 focus:outline-none focus:border-[#2f2f2f]"
                />
                {errors.message && (
                    <p className="text-red-600 text-sm mt-2">{errors.message}</p>
                )}
            </div>

            <div className="pt-6">
                <button
                    type="submit"
                    disabled={loading}
                    className="border border-[#2f2f2f]/60 text-[#2f2f2f] px-10 py-3 tracking-[0.25em] text-xs uppercase hover:bg-[#2f2f2f] hover:text-white transition-all duration-500"
                >
                    {loading ? messages.status.sending : messages.button}
                </button>

                {status === "success" && (
                    <p className="text-[#A8C4A0] text-xs mt-4 tracking-[0.15em]">
                        {messages.status.success}
                    </p>
                )}

                {status === "error" && (
                    <p className="text-[#8A8A8A] text-xs mt-4 tracking-[0.15em]">
                        {messages.status.error}
                    </p>
                )}
            </div>

        </form>
    );
}