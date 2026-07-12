import { NextResponse } from "next/server";

// Delivers contact-form submissions via Resend (https://resend.com).
// Requires two env vars (set in .env.local and Vercel):
//   RESEND_API_KEY    — from the Resend dashboard
//   CONTACT_TO_EMAIL  — where submissions land. Until the robfrew.com domain
//                       is verified in Resend, this must be the email the
//                       Resend account was created with.
// CONTACT_FROM_EMAIL is optional; the default works without domain
// verification. After verifying the domain, set it to e.g.
// "Rob Frew Website <website@robfrew.com>".

const MAX_LENGTHS: Record<string, number> = {
  name: 100,
  email: 200,
  company: 150,
  role: 150,
  message: 5000,
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, company, role, message } = data;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    for (const [field, max] of Object.entries(MAX_LENGTHS)) {
      const value = data[field];
      if (value !== undefined && (typeof value !== "string" || value.length > max)) {
        return NextResponse.json(
          { error: `Invalid ${field}.` },
          { status: 400 }
        );
      }
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL;
    if (!apiKey || !to) {
      // Fail honestly rather than pretending the message was delivered —
      // the form's error banner points people at the direct email address.
      console.error("Contact form not configured: missing RESEND_API_KEY or CONTACT_TO_EMAIL");
      return NextResponse.json(
        { error: "The contact form is temporarily unavailable." },
        { status: 503 }
      );
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL ?? "Rob Frew Website <onboarding@resend.dev>",
        to: [to],
        reply_to: email,
        subject: `New contact from ${name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Company:</strong> ${escapeHtml(company || "N/A")}</p>
          <p><strong>Role:</strong> ${escapeHtml(role || "N/A")}</p>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
        `,
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("Resend send failed:", response.status, detail);
      return NextResponse.json(
        { error: "Failed to send message" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
