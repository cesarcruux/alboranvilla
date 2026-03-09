export const runtime = "nodejs";

import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;

type RateLimitBucket = {
  count: number;
  resetAt: number;
};

const rateLimitStore = new Map<string, RateLimitBucket>();

/**
 * Generates a readable timestamp for internal reference.
 */
function getTimestamp() {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(new Date());
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getClientIp(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }

  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }

  return "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const existing = rateLimitStore.get(ip);

  if (!existing || now > existing.resetAt) {
    rateLimitStore.set(ip, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }

  if (existing.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  existing.count += 1;
  rateLimitStore.set(ip, existing);
  return false;
}

export async function POST(request: NextRequest) {
  try {
    const clientIp = getClientIp(request);
    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();

    const name = body.name?.trim();
    const email = body.email?.trim();
    const dates = body.dates?.trim();
    const message = body.message?.trim();
    const website = body.website?.trim() ?? "";

    // Honeypot: bots often fill hidden fields.
    if (website) {
      return NextResponse.json({ success: true });
    }

    // -----------------------------
    // Validation
    // -----------------------------
    if (!name || !email || !dates || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    if (
      name.length > 120 ||
      email.length > 254 ||
      dates.length > 200 ||
      message.length > 5000
    ) {
      return NextResponse.json(
        { error: "Input too long" },
        { status: 400 }
      );
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpHost || !smtpUser || !smtpPass) {
      console.error("Missing SMTP configuration");
      return NextResponse.json(
        { error: "Service unavailable" },
        { status: 503 }
      );
    }

    const smtpPort = Number(process.env.SMTP_PORT ?? 587);
    if (!Number.isInteger(smtpPort) || smtpPort <= 0) {
      console.error("Invalid SMTP port configuration");
      return NextResponse.json(
        { error: "Service unavailable" },
        { status: 503 }
      );
    }

    // -----------------------------
    // SMTP Transport
    // -----------------------------
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: false,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeDates = escapeHtml(dates);
    const safeMessage = escapeHtml(message);
    const safeSubjectName = name.replace(/[\r\n]+/g, " ").trim();

    // =============================
    // 1️⃣ INTERNAL EMAIL (ALBORÁN)
    // =============================

    await transporter.sendMail({
      from: `"Alborán Villa" <${smtpUser}>`,
      to: smtpUser,
      replyTo: email,
      subject: `Alborán Villa — New Enquiry from ${safeSubjectName}`,

      text: `
ALBORÁN VILLA — NEW ENQUIRY

Name:
${name}

Email:
${email}

Stay:
${dates}

Message:
${message}

Sent on:
${getTimestamp()}
            `,

      html: `
<div style="
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background-color: #f8f6f2;
  padding: 40px 20px;
">
  <div style="
    max-width: 600px;
    margin: 0 auto;
    background: #ffffff;
    padding: 40px;
    border-radius: 6px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  ">

<div style="text-align: center; margin-bottom: 30px;">
  <div style="
    background-color: #ffffff;
    display: inline-block;
    padding: 10px 20px;
  ">
    <img 
      src="https://www.alboranvilla.com/logo-email.png"
      alt="Alborán Villa"
      style="max-width: 140px; height: auto; display: block;"
    />
  </div>
</div>

    <p style="margin-bottom: 25px; font-size: 14px; color: #555;">
      A new enquiry has been received.
    </p>

    <div style="margin-bottom: 25px;">
      <p style="margin: 0 0 10px 0;">
        <strong>Name</strong><br>
        ${safeName}
      </p>

      <p style="margin: 0;">
        <strong>Email</strong><br>
        ${safeEmail}
      </p>
    </div>

    <div style="margin-bottom: 25px;">
      <p style="margin: 0;">
        <strong>Stay</strong><br>
        ${safeDates}
      </p>
    </div>

    <div style="margin-bottom: 30px;">
      <p style="margin: 0 0 10px 0;">
        <strong>Message</strong>
      </p>
      <p style="
        margin: 0;
        line-height: 1.6;
        color: #444;
        white-space: pre-line;
      ">
        ${safeMessage}
      </p>
    </div>

    <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />

    <p style="font-size: 12px; color: #999; margin: 0;">
      Sent on ${getTimestamp()}
    </p>

  </div>
</div>
            `,
    });

    // =============================
    // 2️⃣ AUTO-REPLY TO GUEST
    // =============================

    await transporter.sendMail({
      from: `"Alborán Villa" <${smtpUser}>`,
      to: email,
      subject: "Alborán Villa — We have received your enquiry",

      text: `
Dear ${name},

Thank you for contacting Alborán Villa.

We have received your enquiry for:

${dates}

Our team will carefully review your request and respond shortly.

Warm regards,
Alborán Villa
            `,

      html: `
<div style="
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background-color: #f8f6f2;
  padding: 40px 20px;
">
  <div style="
    max-width: 600px;
    margin: 0 auto;
    background: #ffffff;
    padding: 40px;
    border-radius: 6px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  ">

<div style="text-align: center; margin-bottom: 30px;">
  <div style="
    background-color: #ffffff;
    display: inline-block;
    padding: 10px 20px;
  ">
    <img 
      src="https://www.alboranvilla.com/logo-email.png"
      alt="Alborán Villa"
      style="max-width: 140px; height: auto; display: block;"
    />
  </div>
</div>
    <p style="margin-bottom: 20px; color: #444;">
      Dear ${name},
    </p>

    <p style="margin-bottom: 20px; color: #444; line-height: 1.6;">
      Thank you for contacting Alborán Villa.
    </p>

    <p style="margin-bottom: 20px; color: #444;">
      We have received your enquiry for:
    </p>

    <p style="
      margin-bottom: 25px;
      font-weight: 500;
      color: #2f2f2f;
    ">
      ${dates}
    </p>

    <p style="margin-bottom: 30px; color: #444; line-height: 1.6;">
      Our team will carefully review your request and respond shortly.
    </p>

    <p style="color: #444;">
      Warm regards,<br>
      Alborán Villa
    </p>

  </div>
</div>
            `,
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Contact form error:", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
