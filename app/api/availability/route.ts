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
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000); // 8s timeout

    try {
        const response = await fetch(url, {
            cache: "no-store",
            signal: controller.signal,
        });

        if (!response.ok) {
            throw new Error("ICS fetch failed");
        }

        return await response.text();
    } finally {
        clearTimeout(timeout);
    }
}

function parseICS(icsText: string) {
    const occupiedNights = new Set<string>();

    if (!icsText.includes("BEGIN:VEVENT")) {
        return { occupiedNights: [] };
    }

    const blocks = icsText.split("BEGIN:VEVENT");

    for (const block of blocks) {
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

        let current = startKey;

        while (current < endKey) {
            occupiedNights.add(current);
            current = addDays(current, 1);
        }
    }

    return {
        occupiedNights: Array.from(occupiedNights),
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
    } catch (error) {
        console.error("Availability fetch error:", error);

        // Fail gracefully → return empty availability
        return NextResponse.json({
            occupiedNights: [],
        });
    }
}