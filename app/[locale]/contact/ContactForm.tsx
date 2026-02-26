"use client";

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
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const [checkIn, setCheckIn] = useState<Date | null>(null);
    const [checkOut, setCheckOut] = useState<Date | null>(null);

    const [occupiedNights, setOccupiedNights] = useState<Set<string>>(new Set());

    // ---------------------------
    // FETCH AVAILABILITY
    // ---------------------------

    useEffect(() => {
        async function load() {
            try {
                const res = await fetch("/api/availability");
                const data = await res.json();
                setOccupiedNights(new Set(data.occupiedNights || []));
            } catch {
                console.error("Availability load failed");
            }
        }
        load();
    }, []);

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

    function rangeIsFree(start: Date, end: Date) {
        const temp = new Date(start);

        while (temp < end) {
            if (occupiedNights.has(formatKey(temp))) {
                return false;
            }
            temp.setDate(temp.getDate() + 1);
        }

        return true;
    }

    function handleDayClick(date: Date) {

        const key = formatKey(date);

        // Reiniciar si ya había rango
        if (checkIn && checkOut) {
            if (!occupiedNights.has(key)) {
                setCheckIn(date);
                setCheckOut(null);
            }
            return;
        }

        // Seleccionar check-in
        if (!checkIn) {
            if (occupiedNights.has(key)) return;
            setCheckIn(date);
            return;
        }

        // Seleccionar check-out
        if (checkIn && !checkOut) {

            if (date <= checkIn) {
                if (!occupiedNights.has(key)) {
                    setCheckIn(date);
                }
                return;
            }

            if (!rangeIsFree(checkIn, date)) return;

            setCheckOut(date);

            setFormData(prev => ({
                ...prev,
                dates: `${checkIn.toLocaleDateString()} – ${date.toLocaleDateString()}`
            }));

            setShowCalendar(false);
        }
    }

    // ---------------------------
    // CALENDAR RENDER
    // ---------------------------

    const nextMonth = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + 1,
        1
    );

    function renderMonth(monthDate: Date) {

        const startOfMonth = new Date(
            monthDate.getFullYear(),
            monthDate.getMonth(),
            1
        );

        const endOfMonth = new Date(
            monthDate.getFullYear(),
            monthDate.getMonth() + 1,
            0
        );

        const daysInMonth = endOfMonth.getDate();

        // Día real JS (0=domingo ... 6=sábado)
        const rawStartDay = startOfMonth.getDay();

        // Convertimos a lunes-first (0 = lunes, 6 = domingo)
        const startDay = rawStartDay === 0 ? 6 : rawStartDay - 1;

        const days = Array.from(
            { length: daysInMonth },
            (_, i) => i + 1
        );

        return (
            <div className="flex flex-col items-center">

                {/* DÍAS DE LA SEMANA */}
                <div className="grid grid-cols-7 text-center mb-3 text-xs tracking-wide text-[#2f2f2f]/60">
                    {["L", "M", "X", "J", "V", "S", "D"].map((day, index) => (
                        <div key={index} className="w-9">
                            {day}
                        </div>
                    ))}
                </div>

                {/* GRID DEL MES */}
                <div className="grid grid-cols-7 text-center">

                    {Array.from({ length: startDay }).map((_, i) => (
                        <div key={i} />
                    ))}

                    {days.map(day => {

                        const date = new Date(
                            monthDate.getFullYear(),
                            monthDate.getMonth(),
                            day
                        );

                        const key = formatKey(date);

                        const isPast = date < today;
                        const isOccupied = occupiedNights.has(key);

                        const previousDay = new Date(date);
                        previousDay.setDate(previousDay.getDate() - 1);
                        const previousKey = formatKey(previousDay);

                        const isBookingCheckin =
                            isOccupied && !occupiedNights.has(previousKey);

                        const isSelectedStart =
                            checkIn &&
                            date.toDateString() === checkIn.toDateString();

                        const isSelectedEnd =
                            checkOut &&
                            date.toDateString() === checkOut.toDateString();

                        const isInRange =
                            checkIn &&
                            checkOut &&
                            date > checkIn &&
                            date < checkOut;

                        const clickable =
                            !isPast && (
                                (!checkIn && !isOccupied) ||
                                (checkIn &&
                                    !checkOut &&
                                    date > checkIn &&
                                    rangeIsFree(checkIn, date)) ||
                                (checkIn &&
                                    checkOut &&
                                    !isOccupied)
                            );

                        return (
                            <div
                                key={day}
                                onClick={() =>
                                    clickable && handleDayClick(date)
                                }
                                className={`
                                relative w-9 h-9 flex items-center justify-center
                                ${clickable ? "cursor-pointer" : "cursor-default"}
                                ${isPast ? "text-[#EFE9E2]" : ""}
                                ${isOccupied && !isBookingCheckin ? "text-[#8F887F]" : ""}
                                ${(isSelectedStart || isSelectedEnd || isInRange)
                                        ? "bg-[#EFE9E2] text-[#2f2f2f] rounded-full"
                                        : ""
                                    }
                            `}
                            >

                                {isBookingCheckin && !isPast && (
                                    <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <span
                                            className="w-full h-full bg-[#EFE9E2] rounded-full"
                                            style={{
                                                clipPath: "inset(0 0 0 50%)",
                                                transform: "rotate(45deg)",
                                            }}
                                        />
                                    </span>
                                )}

                                <span className="relative z-10">
                                    {day}
                                </span>

                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
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
                <div className="border p-6">

                    <div className="flex justify-between mb-4">
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
                            className="cursor-pointer"
                        >
                            Prev
                        </button>

                        <div />

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
                            className="cursor-pointer"
                        >
                            Next
                        </button>                    </div>

                    <div className="flex justify-center gap-12">
                        <div className="flex flex-col items-center">
                            <div className="mb-4 text-sm tracking-wide uppercase">
                                {currentMonth.toLocaleString("default", { month: "long" })} {currentMonth.getFullYear()}
                            </div>
                            {renderMonth(currentMonth)}
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="mb-4 text-sm tracking-wide uppercase">
                                {nextMonth.toLocaleString("default", { month: "long" })} {nextMonth.getFullYear()}
                            </div>
                            {renderMonth(nextMonth)}
                        </div>
                    </div>
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