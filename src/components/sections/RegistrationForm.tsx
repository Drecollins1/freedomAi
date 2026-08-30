"use client";

import { useState, type FormEvent } from "react";
import { Check } from "@/components/ui/Icon";
import { cta, finalCta } from "@/lib/content";

type Status = "idle" | "submitting" | "done" | "error";

const fields = [
  {
    name: "firstName",
    label: "First name",
    type: "text",
    placeholder: "Your first name",
    autoComplete: "given-name",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "you@email.com",
    autoComplete: "email",
  },
  {
    name: "whatsapp",
    label: "WhatsApp number",
    type: "tel",
    placeholder: "+[country code] ...",
    autoComplete: "tel",
  },
] as const;

export function RegistrationForm({ sessionDate }: { sessionDate: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError(null);

    const data = Object.fromEntries(new FormData(event.currentTarget));

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.error ?? "Something went wrong. Please try again.");
      }

      setStatus("done");
    } catch (cause) {
      setStatus("error");
      setError(cause instanceof Error ? cause.message : "Something went wrong.");
    }
  }

  if (status === "done") {
    return (
      <div className="border-line-strong bg-panel rounded-[18px] border p-6 text-center md:rounded-[22px] md:p-9">
        <span className="border-signal/40 bg-signal/10 mx-auto flex h-12 w-12 items-center justify-center rounded-full border">
          <Check className="text-signal-text h-6 w-6" />
        </span>
        <h3 className="font-display mt-5 text-[22px] font-semibold md:text-[26px]">
          You&rsquo;re in.
        </h3>
        <p className="text-fg-muted mt-3 text-[15px] leading-relaxed">
          Your seat for {sessionDate} is saved. Check your email and WhatsApp for the session
          link — it usually arrives within a few minutes.
        </p>
      </div>
    );
  }

  return (
    <div className="border-line-strong bg-panel rounded-[18px] border p-5 md:rounded-[22px] md:p-9">
      <p className="text-fg-dim font-mono text-[11px] font-medium tracking-[0.14em] uppercase">
        {finalCta.formEyebrow}
      </p>
      <h3 className="font-display mt-2.5 text-[22px] font-semibold md:text-[26px]">
        Next session starts {sessionDate}
      </h3>

      <form onSubmit={handleSubmit} noValidate={false} className="mt-5 flex flex-col gap-3.5 md:mt-6.5">
        {fields.map((field) => (
          <label key={field.name} className="flex flex-col gap-2">
            <span className="text-fg-dim font-mono text-[11px] tracking-[0.14em] uppercase">
              {field.label}
            </span>
            <input
              required
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              autoComplete={field.autoComplete}
              disabled={status === "submitting"}
              className="border-line-strong text-fg placeholder:text-fg-faint focus:border-signal focus-visible:outline-signal-text h-[52px] rounded-xl border bg-wash px-4 text-base transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60"
            />
          </label>
        ))}

        {error && (
          <p role="alert" className="text-alarm text-sm">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="bg-signal text-on-signal font-display hover:bg-signal-soft focus-visible:outline-signal-text mt-2 h-[58px] rounded-xl text-[15px] font-bold tracking-[0.02em] uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 disabled:opacity-70 md:text-base"
        >
          {status === "submitting" ? "Saving your seat…" : cta.primary}
        </button>

        <p className="text-fg-dim text-center text-[13px] leading-relaxed">{finalCta.formNote}</p>
      </form>
    </div>
  );
}
