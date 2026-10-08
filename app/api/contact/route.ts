import { NextResponse } from "next/server";
import { clientIp, isRateLimited } from "@/lib/rate-limit";
import { turnstileConfigured, verifyTurnstile } from "@/lib/turnstile";

// Delivers contact-form submissions via Resend (https://resend.com).
// Requires these env vars (set in .env.local and Vercel):
//   RESEND_API_KEY        — from the Resend dashboard
//   CONTACT_TO_EMAIL      — where submissions land
//   TURNSTILE_SECRET_KEY  — Cloudflare Turnstile secret (see lib/turnstile.ts)
// The default from address uses updates.robfrew.com, the domain verified for
// sending in the Resend dashboard; override with CONTACT_FROM_EMAIL if that
// ever changes. The sender domain must stay verified in Resend or sends 403.
//
// Bot defences, in order: Turnstile (hard 400 so a real person can retry),
// then honeypot, submit-timing and no-spaces checks. Those three return the
// same { success: true } body as a real send without emailing anything, so a
// bot never learns which rule it tripped. Each drop logs its reason only —
// never the visitor's email or message.

const MAX_LENGTHS: Record<string, number> = {
  name: 100,
  email: 254,
  company: 150,
  role: 150,
  message: 5000,
};

/** Minimum time between the form rendering and a believable human submit. */
const MIN_SUBMIT_MS = 3_000;

type BlockReason = "honeypot" | "too_fast" | "turnstile_failed" | "no_spaces";

function logBlocked(reason: BlockReason) {
  console.warn(`contact form blocked: ${reason}`);
}

/** Identical to the real success response so silent drops are indistinguishable. */
function fakeSuccess() {
  return NextResponse.json({ success: true });
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  try {
    const ip = clientIp(request);
    if (isRateLimited(`contact:${ip}`, 5, 60_000)) {
      return NextResponse.json(
        { error: "Too many messages — please wait a minute and try again." },
        { status: 429 }
      );
    }

    const data = await request.json();
    const { name, email, company, role, message } = data;

    // 1. Turnstile — verified before anything else is looked at.
    if (!turnstileConfigured()) {
      console.error("Contact form not configured: missing TURNSTILE_SECRET_KEY");
      return NextResponse.json(
        { error: "The contact form is temporarily unavailable." },
        { status: 503 }
      );
    }
    if (!(await verifyTurnstile(data.turnstileToken, ip))) {
      logBlocked("turnstile_failed");
      return NextResponse.json(
        { error: "Please try again." },
        { status: 400 }
      );
    }

    // 2. Honeypot — real visitors never see or fill this field.
    if (typeof data.website === "string" && data.website.trim() !== "") {
      logBlocked("honeypot");
      return fakeSuccess();
    }

    // 3. Timing — humans take longer than a few seconds to fill five fields.
    const renderedAt = Number(data.renderedAt);
    if (!Number.isFinite(renderedAt) || Date.now() - renderedAt < MIN_SUBMIT_MS) {
      logBlocked("too_fast");
      return fakeSuccess();
    }

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

    // 4. Content — a message with no whitespace at all is keyboard mashing,
    // not a sentence. Deliberately no rules about how names look.
    const trimmedMessage = String(message).trim();
    if (trimmedMessage.length > 12 && !/\s/.test(trimmedMessage)) {
      logBlocked("no_spaces");
      return fakeSuccess();
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
        from: process.env.CONTACT_FROM_EMAIL ?? "Rob Frew Website <website@updates.robfrew.com>",
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
