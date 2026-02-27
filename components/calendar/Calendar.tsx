"use client";

type CalendarProps = {
    currentMonth: Date;
    setCurrentMonth: (date: Date) => void;
    checkIn: Date | null;
    checkOut: Date | null;
    occupiedNights: string[]; // ← ahora es array
    handleDayClick: (
        date: Date,
        today: Date,
        setFormDates: (value: string) => void
    ) => void;
    rangeIsFree: (start: Date, end: Date) => boolean;
    setFormDates: (value: string) => void;
    closeCalendar: () => void;
};

function formatKey(date: Date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
}

export default function Calendar({
    currentMonth,
    setCurrentMonth,
    checkIn,
    checkOut,
    occupiedNights,
    handleDayClick,
    rangeIsFree,
    setFormDates,
    closeCalendar
}: CalendarProps) {

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Convertimos array → Set dentro del componente cliente
    const occupiedSet = new Set(occupiedNights);

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

        const rawStartDay = startOfMonth.getDay();
        const startDay = rawStartDay === 0 ? 6 : rawStartDay - 1;

        const days = Array.from(
            { length: daysInMonth },
            (_, i) => i + 1
        );

        return (
            <div className="flex flex-col items-center">

                <div className="grid grid-cols-7 text-center mb-3 text-xs tracking-wide text-[#2f2f2f]/60">
                    {["L", "M", "X", "J", "V", "S", "D"].map((day, index) => (
                        <div key={index} className="w-9">
                            {day}
                        </div>
                    ))}
                </div>

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
                        const isOccupied = occupiedSet.has(key);

                        const previousDay = new Date(date);
                        previousDay.setDate(previousDay.getDate() - 1);
                        const previousKey = formatKey(previousDay);

                        const isBookingCheckin =
                            isOccupied && !occupiedSet.has(previousKey);

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
                                onClick={() => {
                                    if (!clickable) return;

                                    handleDayClick(
                                        date,
                                        today,
                                        (value: string) => {
                                            setFormDates(value);
                                            closeCalendar();
                                        }
                                    );
                                }}
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

    return (
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
                </button>
            </div>

            <div className="flex justify-center gap-12">
                {renderMonth(currentMonth)}
                {renderMonth(nextMonth)}
            </div>
        </div>
    );
}