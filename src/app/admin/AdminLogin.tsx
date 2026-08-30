"use client";

import { useActionState } from "react";
import { login, type ActionState } from "./actions";

export function AdminLogin({ configured }: { configured: boolean }) {
  const [state, action, pending] = useActionState<ActionState, FormData>(login, {});

  return (
    <div className="mx-auto w-full max-w-[380px] px-5 py-20">
      <h1 className="font-display text-[26px] font-semibold">Freedom AI admin</h1>
      <p className="text-fg-muted mt-2 text-[15px] leading-relaxed">
        Sign in to update the session date, the Telegram links and the footer details.
      </p>

      {!configured && (
        <p className="border-line-strong text-fg-dim mt-6 rounded-xl border border-dashed px-4 py-3 text-[13px] leading-relaxed">
          No <code>ADMIN_PASSWORD</code> is set on the server, so nobody can sign in yet. Add it to
          your environment variables and redeploy.
        </p>
      )}

      <form action={action} className="mt-7 flex flex-col gap-3.5">
        <label className="flex flex-col gap-2">
          <span className="text-fg-dim font-mono text-[11px] tracking-[0.14em] uppercase">
            Password
          </span>
          <input
            required
            autoFocus
            name="password"
            type="password"
            autoComplete="current-password"
            disabled={pending}
            className="border-line-strong text-fg placeholder:text-fg-faint focus:border-signal focus-visible:outline-signal-text bg-wash h-[52px] rounded-xl border px-4 text-base transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60"
          />
        </label>

        {state.error && (
          <p role="alert" className="text-alarm text-sm">
            {state.error}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="bg-signal text-on-signal font-display hover:bg-signal-soft focus-visible:outline-signal-text mt-2 h-[54px] rounded-xl text-[15px] font-bold tracking-[0.02em] uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 disabled:opacity-70"
        >
          {pending ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
