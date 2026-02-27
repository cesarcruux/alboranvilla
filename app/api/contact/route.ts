import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

/**
 * Generates a readable timestamp for internal reference.
 */
function getTimestamp() {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(new Date());
}

/**
 * Basic email validation
 */
function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Sanitize & trim input
 */
function sanitize(input: string) {
  return input.trim();
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    let { name, email, dates, message } = body;

    // -----------------------------
    // Type validation
    // -----------------------------
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof dates !== "string" ||
      typeof message !== "string"
    ) {
      return NextResponse.json(
        { error: "Invalid field types" },
        { status: 400 }
      );
    }

    // -----------------------------
    // Trim & sanitize
    // -----------------------------
    name = sanitize(name);
    email = sanitize(email);
    dates = sanitize(dates);
    message = sanitize(message);

    // -----------------------------
    // Required fields check
    // -----------------------------
    if (!name || !email || !dates || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // -----------------------------
    // Email format validation
    // -----------------------------
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // -----------------------------
    // Length limits (anti abuse)
    // -----------------------------
    if (
      name.length > 100 ||
      email.length > 150 ||
      dates.length > 150 ||
      message.length > 5000
    ) {
      return NextResponse.json(
        { error: "Input too long" },
        { status: 400 }
      );
    }

    // -----------------------------
    // SMTP Transport (IONOS)
    // -----------------------------
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // -----------------------------
    // Send notification to owner
    // -----------------------------
    await transporter.sendMail({
      from: `"Alborán Villa" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      replyTo: email,
      subject: `Alborán Villa — New Enquiry from ${name}`,

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
    });

    // -----------------------------
    // Auto-reply to guest
    // -----------------------------
    await transporter.sendMail({
      from: `"Alborán Villa" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Alborán Villa — We have received your enquiry",

      text: `
Dear ${name},

Thank you for contacting Alborán Villa.

We have received your enquiry for:

${dates}

Our team will review your request and get back to you shortly.

Warm regards,
Alborán Villa
            `,
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Contact form error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}