"use client";

import Calendar from "@/components/calendar/Calendar";
import { useCalendar } from "@/hooks/useCalendar";
import { useState, useEffect, useRef } from "react";

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

    // ---------------------------
    // CALENDAR HOOK
    // ---------------------------

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
    // LOCAL STATE
    // ---------------------------

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
        website: "",
    });

    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<"success" | "error" | null>(null);
    const [errors, setErrors] = useState<{ name?: string; email?: string; dates?: string; message?: string }>({});
    const [showCalendar, setShowCalendar] = useState(false);
    const datesRef = useRef<HTMLDivElement | null>(null);
    const calendarRef = useRef<HTMLDivElement | null>(null);

    const selectedDates =
        checkIn && checkOut
            ? `${checkIn.toLocaleDateString()} – ${checkOut.toLocaleDateString()}`
            : "";

    useEffect(() => {
        if (checkOut && datesRef.current) {
            datesRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }
    }, [checkOut]);

    useEffect(() => {
        if (showCalendar && calendarRef.current && window.innerWidth < 768) {
            calendarRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }
    }, [showCalendar]);

    // ---------------------------
    // FORM HANDLERS
    // ---------------------------

    const handleCalendarDayClick = (date: Date) => {
        const selectingCheckOut =
            checkIn &&
            !checkOut &&
            date > checkIn &&
            rangeIsFree(checkIn, date);

        handleDayClick(date);

        if (selectingCheckOut) {
            setShowCalendar(false);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
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

        if (!selectedDates) {
            newErrors.dates = messages.errors.required;
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
        setStatus(null);

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    dates: selectedDates,
                }),
            });

            if (res.ok) {
                setStatus("success");

                setFormData({
                    name: "",
                    email: "",
                    message: "",
                    website: "",
                });

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
    // RENDER
    // ---------------------------

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
            <div ref={datesRef}>
                <label className="block text-sm uppercase tracking-[0.3em] text-[#2f2f2f]/70 mb-4">
                    {messages.labels.dates}
                </label>

                <input
                    type="text"
                    readOnly
                    name="dates"
                    value={selectedDates}
                    onClick={() => setShowCalendar(prev => !prev)}
                    placeholder="Select dates"
                    className="w-full border-b py-3 bg-transparent cursor-pointer"
                />

                {errors.dates && (
                    <p className="text-gray-500 text-sm mt-2">
                        {errors.dates}
                    </p>
                )}
            </div>

            {showCalendar && (
                <div ref={calendarRef}>
                    <Calendar
                        currentMonth={currentMonth}
                        setCurrentMonth={setCurrentMonth}
                        checkIn={checkIn}
                        checkOut={checkOut}
                        occupiedNights={occupiedNights}
                        handleDayClick={handleCalendarDayClick}
                        rangeIsFree={rangeIsFree}
                    />
                </div>
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

            <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                autoComplete="off"
                tabIndex={-1}
                aria-hidden="true"
                className="hidden"
            />

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
