import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(request: Request) {

    try {
        const { name, email, dates, message } = await request.json();

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: 587,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        await transporter.sendMail({
            from: `"Alborán Website" <${process.env.SMTP_USER}>`,
            to: "info@alboranvilla.com",
            subject: "New Inquiry – Alborán Villa",
            replyTo: email,
            text: `
Name: ${name}
Email: ${email}
Dates: ${dates}

Message:
${message}
      `,
        });

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}