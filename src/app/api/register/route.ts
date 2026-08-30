import { NextResponse } from "next/server";
import { notifyRegistration, type Registration } from "@/lib/notify";

/**
 * Registration endpoint for the free 3-day live experience.
 *
 * Validates the submission, then hands it to `@/lib/notify`, which posts it
 * into the owner's Telegram chat (and to REGISTRATION_WEBHOOK_URL if one is
 * set). See that file for the environment variables it needs.
 */

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

  const delivered = await notifyRegistration(result.data);

  if (!delivered) {
    return NextResponse.json(
      { error: "We couldn't save your seat just now. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
