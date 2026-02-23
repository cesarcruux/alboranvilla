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
    // -----------------------------
    // STATE
    // -----------------------------

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        dates: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<"success" | "error" | null>(null);

    const [errors, setErrors] = useState<{
        name?: string;
        email?: string;
        message?: string;
    }>({});

    const [showCalendar, setShowCalendar] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [checkIn, setCheckIn] = useState<Date | null>(null);
    const [checkOut, setCheckOut] = useState<Date | null>(null);
    // -----------------------------
    // HANDLERS
    // -----------------------------

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleDateClick = () => {
        setShowCalendar((prev) => !prev);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);
        setStatus(null);

        const newErrors: typeof errors = {};

        // Validation
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

                setShowCalendar(false);
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }

        setLoading(false);
    };
    // -------- Calendar Utilities --------

    const startOfMonth = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        1
    );

    const endOfMonth = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + 1,
        0
    );

    const daysInMonth = endOfMonth.getDate();
    const startDay = startOfMonth.getDay(); // 0 = Sunday

    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // -------- Date Formatting --------

    const formatDateRange = (start: Date, end: Date) => {
        const dayStart = start.getDate();
        const dayEnd = end.getDate();

        const monthStart = start.toLocaleString("en-GB", { month: "long" });
        const monthEnd = end.toLocaleString("en-GB", { month: "long" });

        const year = end.getFullYear();

        // Mismo mes
        if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
            return `${dayStart} – ${dayEnd} ${monthEnd} ${year}`;
        }

        // Mes distinto
        return `${dayStart} ${monthStart} – ${dayEnd} ${monthEnd} ${year}`;
    };


    // -------- Day Selection --------

    const handleDayClick = (day: number) => {
        const selectedDate = new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth(),
            day
        );

        if (!checkIn || (checkIn && checkOut)) {
            setCheckIn(selectedDate);
            setCheckOut(null);
            return;
        }

        if (checkIn && !checkOut) {
            if (selectedDate < checkIn) {
                setCheckIn(selectedDate);
                return;
            }

            if (selectedDate.getTime() === checkIn.getTime()) {
                return;
            }

            setCheckOut(selectedDate);

            const formatted = formatDateRange(checkIn, selectedDate);

            setFormData((prev) => ({
                ...prev,
                dates: formatted,
            }));

            setShowCalendar(false);
        }
    };

    // -----------------------------
    // RENDER
    // -----------------------------

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
                    className="w-full border-b border-[#d6cfc7] bg-transparent py-3 focus:outline-none focus:border-[#2f2f2f]"
                />

                {errors.name && (
                    <p className="text-[#8A8A8A] text-xs mt-2 tracking-[0.12em]">
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
                    className="w-full border-b border-[#d6cfc7] bg-transparent py-3 focus:outline-none focus:border-[#2f2f2f]"
                />

                {errors.email && (
                    <p className="text-[#8A8A8A] text-xs mt-2 tracking-[0.12em]">
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
                    onClick={handleDateClick}
                    placeholder="Select dates"
                    className="w-full border-b border-[#d6cfc7] bg-transparent py-3 focus:outline-none focus:border-[#2f2f2f] cursor-pointer"
                />

                {showCalendar && (
                    <div className="mt-8 border border-[#eae6df] p-8">

                        {/* Month Navigation */}
                        <div className="flex justify-between items-center mb-6">
                            <button
                                type="button"
                                onClick={() =>
                                    setCurrentMonth(
                                        new Date(
                                            currentMonth.getFullYear(),
                                            currentMonth.getMonth() - 1,
                                            1
                                        )
                                    )
                                }
                                className="text-xs tracking-[0.2em] text-[#8A8A8A] hover:text-[#2f2f2f]"
                            >
                                PREV
                            </button>

                            <div className="text-sm tracking-[0.2em] text-[#2f2f2f]">
                                {currentMonth.toLocaleString("default", { month: "long" })}{" "}
                                {currentMonth.getFullYear()}
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    setCurrentMonth(
                                        new Date(
                                            currentMonth.getFullYear(),
                                            currentMonth.getMonth() + 1,
                                            1
                                        )
                                    )
                                }
                                className="text-xs tracking-[0.2em] text-[#8A8A8A] hover:text-[#2f2f2f]"
                            >
                                NEXT
                            </button>
                        </div>

                        {/* Week Days */}
                        <div className="grid grid-cols-7 text-xs tracking-[0.2em] text-[#8A8A8A] mb-4">
                            {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
                                <div key={index} className="text-center">
                                    {day}
                                </div>
                            ))}
                        </div>

                        {/* Days Grid */}
                        <div className="grid grid-cols-7 gap-y-3 text-center text-sm">

                            {/* Empty spaces before month starts */}
                            {Array.from({ length: startDay }).map((_, index) => (
                                <div key={`empty-${index}`} />
                            ))}

                            {/* Days */}
                            {daysArray.map((day) => {
                                const dateObj = new Date(
                                    currentMonth.getFullYear(),
                                    currentMonth.getMonth(),
                                    day
                                );

                                const isPast =
                                    dateObj < today &&
                                    dateObj.toDateString() !== today.toDateString();

                                const isCheckIn =
                                    checkIn &&
                                    dateObj.toDateString() === checkIn.toDateString();

                                const isCheckOut =
                                    checkOut &&
                                    dateObj.toDateString() === checkOut.toDateString();

                                const isInRange =
                                    checkIn &&
                                    checkOut &&
                                    dateObj > checkIn &&
                                    dateObj < checkOut;

                                return (
                                    <div
                                        key={day}
                                        onClick={() => {
                                            if (!isPast) handleDayClick(day);
                                        }}
                                        className={`cursor-pointer transition flex items-center justify-center w-8 h-8 mx-auto
  ${isCheckIn || isCheckOut
                                                ? "bg-[#A8C4A0] text-white rounded-full"
                                                : isInRange
                                                    ? "bg-[#A8C4A0]/25 text-[#2f2f2f] rounded-full"
                                                    : isPast
                                                        ? "text-[#D6D1CA] cursor-not-allowed"
                                                        : "text-[#8A8A8A] hover:text-[#2f2f2f]"
                                            }
`}
                                    >
                                        {day}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            {/* MESSAGE */}
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
                    <p className="text-[#8A8A8A] text-xs mt-2 tracking-[0.12em]">
                        {errors.message}
                    </p>
                )}
            </div>

            {/* BUTTON + STATUS */}
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