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

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = body.name?.trim();
    const email = body.email?.trim();
    const dates = body.dates?.trim();
    const message = body.message?.trim();

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

    if (name.length > 120 || message.length > 5000) {
      return NextResponse.json(
        { error: "Input too long" },
        { status: 400 }
      );
    }

    // -----------------------------
    // SMTP Transport
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

    // =============================
    // 1️⃣ INTERNAL EMAIL (ALBORÁN)
    // =============================

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
      <img 
        src="https://www.alboranvilla.com/logo-email.png"
        alt="Alborán Villa"
        style="max-width: 140px; height: auto; display: block; margin: 0 auto;"
      />
    </div>

    <p style="margin-bottom: 25px; font-size: 14px; color: #555;">
      A new enquiry has been received.
    </p>

    <div style="margin-bottom: 25px;">
      <p style="margin: 0 0 10px 0;">
        <strong>Name</strong><br>
        ${name}
      </p>

      <p style="margin: 0;">
        <strong>Email</strong><br>
        ${email}
      </p>
    </div>

    <div style="margin-bottom: 25px;">
      <p style="margin: 0;">
        <strong>Stay</strong><br>
        ${dates}
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
        ${message}
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
      from: `"Alborán Villa" <${process.env.SMTP_USER}>`,
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
      <img 
        src="https://www.alboranvilla.com/logo-email.png"
        alt="Alborán Villa"
        style="max-width: 140px; height: auto; display: block; margin: 0 auto;"
      />
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