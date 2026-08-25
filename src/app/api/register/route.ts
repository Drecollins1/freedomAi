import { NextResponse } from "next/server";

/**
 * Registration endpoint for the free 3-day live experience.
 *
 * Right now this validates the submission and forwards it to whatever webhook
 * is configured in REGISTRATION_WEBHOOK_URL (a CRM, an email platform, a
 * Google Sheet relay, a WhatsApp list — whatever the business actually uses).
 * With no webhook configured it accepts the registration and logs it, so the
 * form is testable end to end before that decision is made.
 *
 * NOTE: nothing is persisted yet. Wire up the real destination before launch,
 * or registrations are lost.
 */

type Registration = {
  firstName: string;
  email: string;
  whatsapp: string;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(body: unknown): { data: Registration } | { error: string } {
  if (typeof body !== "object" || body === null) {
    return { error: "Invalid submission." };
  }

  const { firstName, email, whatsapp } = body as Record<string, unknown>;

  if (typeof firstName !== "string" || firstName.trim().length < 2) {
    return { error: "Please enter your first name." };
  }
  if (typeof email !== "string" || !EMAIL.test(email.trim())) {
    return { error: "Please enter a valid email address." };
  }
  if (typeof whatsapp !== "string" || whatsapp.replace(/\D/g, "").length < 7) {
    return { error: "Please enter a valid WhatsApp number." };
  }

  return {
    data: {
      firstName: firstName.trim(),
      email: email.trim().toLowerCase(),
      whatsapp: whatsapp.trim(),
    },
  };
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }

  const result = validate(body);

  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  const webhook = process.env.REGISTRATION_WEBHOOK_URL;

  if (webhook) {
    try {
      const forwarded = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...result.data, source: "landing-page" }),
      });

      if (!forwarded.ok) {
        console.error("Registration webhook rejected the submission", forwarded.status);
        return NextResponse.json(
          { error: "We couldn't save your seat just now. Please try again." },
          { status: 502 },
        );
      }
    } catch (cause) {
      console.error("Registration webhook unreachable", cause);
      return NextResponse.json(
        { error: "We couldn't save your seat just now. Please try again." },
        { status: 502 },
      );
    }
  } else {
    console.warn("REGISTRATION_WEBHOOK_URL is not set — registration not persisted:", result.data);
  }

  return NextResponse.json({ ok: true });
}
