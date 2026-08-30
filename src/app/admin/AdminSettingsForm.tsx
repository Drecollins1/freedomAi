"use client";

import { useActionState } from "react";
import { settingsFields, type SiteSettings } from "@/lib/settings-fields";
import { logout, updateSettings, type ActionState } from "./actions";

export function AdminSettingsForm({
  settings,
  storeConfigured,
}: {
  settings: SiteSettings;
  storeConfigured: boolean;
}) {
  const [state, action, pending] = useActionState<ActionState, FormData>(updateSettings, {});

  return (
    <div className="mx-auto w-full max-w-[640px] px-5 py-14 md:py-20">
      <div className="flex items-start justify-between gap-6">
        <div>
          <h1 className="font-display text-[26px] font-semibold">Site settings</h1>
          <p className="text-fg-muted mt-2 text-[15px] leading-relaxed">
            These are the only values that change without a deploy. Saving updates the live page
            straight away.
          </p>
        </div>

        <form action={logout}>
          <button
            type="submit"
            className="text-fg-dim hover:text-fg focus-visible:outline-signal-text shrink-0 text-[13px] underline underline-offset-4 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            Sign out
          </button>
        </form>
      </div>

      {!storeConfigured && (
        <p className="border-line-strong text-fg-dim mt-7 rounded-xl border border-dashed px-4 py-3 text-[13px] leading-relaxed">
          No settings store is configured, so the page is serving its built-in defaults and saving
          will fail. Set <code>UPSTASH_REDIS_REST_URL</code> and{" "}
          <code>UPSTASH_REDIS_REST_TOKEN</code> in your environment variables.
        </p>
      )}

      <form action={action} className="mt-8 flex flex-col gap-6">
        {settingsFields.map((field) => (
          <label key={field.name} className="flex flex-col gap-2">
            <span className="text-fg-dim font-mono text-[11px] tracking-[0.14em] uppercase">
              {field.label}
            </span>

            {field.multiline ? (
              <textarea
                rows={3}
                name={field.name}
                defaultValue={settings[field.name]}
                placeholder={field.placeholder}
                disabled={pending}
                className="border-line-strong text-fg placeholder:text-fg-faint focus:border-signal focus-visible:outline-signal-text bg-wash resize-y rounded-xl border px-4 py-3 text-base leading-relaxed transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60"
              />
            ) : (
              <input
                type="text"
                name={field.name}
                defaultValue={settings[field.name]}
                placeholder={field.placeholder}
                disabled={pending}
                className="border-line-strong text-fg placeholder:text-fg-faint focus:border-signal focus-visible:outline-signal-text bg-wash h-[52px] rounded-xl border px-4 text-base transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60"
              />
            )}

            <span className="text-fg-faint text-[13px] leading-relaxed">{field.hint}</span>
          </label>
        ))}

        {state.error && (
          <p role="alert" className="text-alarm text-sm">
            {state.error}
          </p>
        )}

        {state.saved && !state.error && (
          <p role="status" className="text-signal-text text-sm">
            Saved. The live page is updated.
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="bg-signal text-on-signal font-display hover:bg-signal-soft focus-visible:outline-signal-text h-[54px] rounded-xl text-[15px] font-bold tracking-[0.02em] uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 disabled:opacity-70"
        >
          {pending ? "Saving…" : "Save changes"}
        </button>
      </form>
    </div>
  );
}
