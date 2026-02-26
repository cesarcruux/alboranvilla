export const runtime = "nodejs";

import { NextResponse } from "next/server";

const BOOKING_ICAL_URL =
    "https://ical.booking.com/v1/export?t=a7fbc13f-6068-461f-82b9-77d0bbaf8a17";

// -----------------------------
// Utils
// -----------------------------

function formatDateKey(year: number, month: number, day: number) {
    return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(
        2,
        "0"
    )}`;
}

function addDays(dateStr: string, days: number) {
    const [y, m, d] = dateStr.split("-").map(Number);
    const date = new Date(y, m - 1, d);
    date.setDate(date.getDate() + days);
    return formatDateKey(
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate()
    );
}

async function fetchICS(url: string): Promise<string> {
    const response = await fetch(url, { cache: "no-store" });

    if (!response.ok) {
        throw new Error("Failed to fetch ICS");
    }

    return await response.text();
}

function parseICS(icsText: string) {
    const occupiedNights = new Set<string>();
    const checkinDates = new Set<string>();
    const checkoutDates = new Set<string>();

    const blocks = icsText.split("BEGIN:VEVENT");

    for (const block of blocks) {
        if (!block.includes("DTSTART")) continue;

        const startMatch = block.match(/DTSTART.*:(\d{8})/);
        const endMatch = block.match(/DTEND.*:(\d{8})/);

        if (!startMatch || !endMatch) continue;

        const startRaw = startMatch[1];
        const endRaw = endMatch[1];

        const startKey = `${startRaw.slice(0, 4)}-${startRaw.slice(
            4,
            6
        )}-${startRaw.slice(6, 8)}`;

        const endKey = `${endRaw.slice(0, 4)}-${endRaw.slice(
            4,
            6
        )}-${endRaw.slice(6, 8)}`;

        // Register check-in & checkout
        checkinDates.add(startKey);
        checkoutDates.add(endKey);

        // Register occupied nights (start inclusive, end exclusive)
        let current = startKey;

        while (current < endKey) {
            occupiedNights.add(current);
            current = addDays(current, 1);
        }
    }

    return {
        occupiedNights: Array.from(occupiedNights),
        checkinDates: Array.from(checkinDates),
        checkoutDates: Array.from(checkoutDates),
    };
}

// -----------------------------
// API
// -----------------------------

export async function GET() {
    try {
        const icsText = await fetchICS(BOOKING_ICAL_URL);

        const data = parseICS(icsText);

        return NextResponse.json(data);
    } catch {
        return NextResponse.json(
            { error: "Failed to fetch availability" },
            { status: 500 }
        );
    }
}