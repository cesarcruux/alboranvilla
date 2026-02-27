"use client";

import Calendar from "@/components/calendar/Calendar";
import { useCalendar } from "@/hooks/useCalendar";
import { useState, useEffect } from "react";

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

function formatKey(date: Date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
}

export default function ContactForm({ messages }: ContactFormProps) {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        dates: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<"success" | "error" | null>(null);
    const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
    const [showCalendar, setShowCalendar] = useState(false);

    const {
        currentMonth,
        setCurrentMonth,
        checkIn,
        checkOut,
        occupiedNights,
        handleDayClick,
        rangeIsFree,
        setCheckIn,
        setCheckOut
    } = useCalendar();

    // ---------------------------
    // FORM HANDLERS
    // ---------------------------

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

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
            return;
        }

        setErrors({});
        setLoading(true);

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setStatus("success");
                setFormData({ name: "", email: "", dates: "", message: "" });
                setCheckIn(null);
                setCheckOut(null);
                setShowCalendar(false);
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }

        setLoading(false);
    };

    // ---------------------------
    // HOTEL LOGIC
    // ---------------------------



    // ---------------------------
    // CALENDAR RENDER
    // ---------------------------

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return (
        <form onSubmit={handleSubmit} noValidate className="space-y-10">

            {/* NAME */}
            <div>
                <label className="block text-sm uppercase tracking-[0.3em] text-[#2f2f2f]/70 mb-4">
                    {messages.labels.name}
                </label>

                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border-b py-3 bg-transparent"
                />

                {errors.name && (
                    <p className="text-gray-500 text-sm mt-2">
                        {errors.name}
                    </p>
                )}
            </div>

            {/* EMAIL */}
            <div>
                <label className="block text-sm uppercase tracking-[0.3em] text-[#2f2f2f]/70 mb-4">
                    {messages.labels.email}
                </label>

                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border-b py-3 bg-transparent"
                />

                {errors.email && (
                    <p className="text-gray-500 text-sm mt-2">
                        {errors.email}
                    </p>
                )}
            </div>

            {/* DATES */}
            <div>
                <label className="block text-sm uppercase tracking-[0.3em] text-[#2f2f2f]/70 mb-4">
                    {messages.labels.dates}
                </label>

                <input
                    type="text"
                    readOnly
                    name="dates"
                    value={formData.dates}
                    onClick={() => setShowCalendar(prev => !prev)}
                    placeholder="Select dates"
                    className="w-full border-b py-3 bg-transparent cursor-pointer"
                />
            </div>

            {showCalendar && (
                <Calendar
                    currentMonth={currentMonth}
                    setCurrentMonth={setCurrentMonth}
                    checkIn={checkIn}
                    checkOut={checkOut}
                    occupiedNights={occupiedNights}
                    handleDayClick={handleDayClick}
                    rangeIsFree={rangeIsFree}
                    setFormDates={(value: string) =>
                        setFormData(prev => ({
                            ...prev,
                            dates: value
                        }))
                    }
                    closeCalendar={() => setShowCalendar(false)}
                />
            )}
            {/* MESSAGE */}
            <div>
                <label className="block text-sm uppercase tracking-[0.3em] text-[#2f2f2f]/70 mb-4">
                    {messages.labels.message}
                </label>

                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full border-b py-3 bg-transparent"
                />

                {errors.message && (
                    <p className="text-gray-500 text-sm mt-2">
                        {errors.message}
                    </p>
                )}
            </div>

            {/* BUTTON */}
            <button
                type="submit"
                disabled={loading}
                className="
                    border border-[#2f2f2f]/60 
                    text-[#2f2f2f] 
                    px-10 py-3 
                    tracking-[0.25em] 
                    text-xs 
                    uppercase 
                    cursor-pointer
                    transition-all duration-500
                    hover:bg-[#2f2f2f] 
                    hover:text-white
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                "
            >
                {loading ? messages.status.sending : messages.button}
            </button>

            {status === "success" && (
                <p className="text-[#A8C4A0] text-xs mt-4 tracking-[0.15em]">
                    {messages.status.success}
                </p>
            )}

            {status === "error" && (
                <p className="text-gray-500 text-xs mt-4 tracking-[0.15em]">
                    {messages.status.error}
                </p>
            )}

        </form>
    );
}