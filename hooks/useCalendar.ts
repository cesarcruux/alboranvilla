import { useState, useEffect } from "react";

function formatKey(date: Date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
}

export function useCalendar() {

    const [currentMonth, setCurrentMonth] = useState(new Date());

    const [checkIn, setCheckIn] = useState<Date | null>(null);
    const [checkOut, setCheckOut] = useState<Date | null>(null);

    const [occupiedNights, setOccupiedNights] = useState<Set<string>>(new Set());

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

    function handleDayClick(
        date: Date,
        today: Date,
        setFormDates: (value: string) => void
    ) {

        const key = formatKey(date);

        if (checkIn && checkOut) {
            if (!occupiedNights.has(key)) {
                setCheckIn(date);
                setCheckOut(null);
            }
            return;
        }

        if (!checkIn) {
            if (occupiedNights.has(key)) return;
            setCheckIn(date);
            return;
        }

        if (checkIn && !checkOut) {

            if (date <= checkIn) {
                if (!occupiedNights.has(key)) {
                    setCheckIn(date);
                }
                return;
            }

            if (!rangeIsFree(checkIn, date)) return;

            setCheckOut(date);

            setFormDates(
                `${checkIn.toLocaleDateString()} – ${date.toLocaleDateString()}`
            );
        }
    }

    return {
        currentMonth,
        setCurrentMonth,
        checkIn,
        checkOut,
        occupiedNights: Array.from(occupiedNights),
        handleDayClick,
        rangeIsFree,
        setCheckIn,
        setCheckOut
    };
}