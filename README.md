## Alboran Villa Website

Next.js website with localized routes, contact form via SMTP, and availability synced from Booking iCal.

## Required Environment Variables

Copy `.env.example` to `.env.local` and fill values:

```bash
cp .env.example .env.local
```

- `SMTP_HOST`
- `SMTP_PORT` (default: `587`)
- `SMTP_USER`
- `SMTP_PASS`
- `BOOKING_ICAL_URL`

Without `BOOKING_ICAL_URL`, calendar availability will return empty nights.

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production (Vercel)

1. Add all required env vars in Vercel Project Settings.
2. Deploy to Preview first.
3. Smoke-test before Production promote:
- Contact form sends internal email.
- Auto-reply email is received.
- Calendar blocks dates from Booking iCal.
- Main pages load correctly (`/en`, `/en/villa`, `/en/experience`, `/en/journal`, `/en/contact`).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

Vercel docs: https://nextjs.org/docs/app/building-your-application/deploying
