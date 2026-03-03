export type ReflectionSource = 'Google' | 'Booking' | 'Airbnb'

export type GuestReflection = {
    quote: string
    source: ReflectionSource
    date: string
}
export const guestReflections: GuestReflection[] = [
    {
        quote: 'A bright, quiet retreat — like a small private paradise.',
        source: 'Booking',
        date: 'JAN 2026',
    },
    {
        quote: 'We felt absolute privacy — nothing disturbed us.',
        source: 'Airbnb',
        date: 'JAN 2026',
    },
    {
        quote: 'Designed with taste and curated in every detail.',
        source: 'Booking',
        date: 'JAN 2026',
    },
    {
        quote: 'So quiet you can hear the waves.',
        source: 'Booking',
        date: 'JAN 2026',
    },
]