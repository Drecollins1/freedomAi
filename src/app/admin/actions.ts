"use server";

import { revalidatePath, updateTag } from "next/cache";
import {
  adminConfigured,
  checkPassword,
  endSession,
  isSignedIn,
  startSession,
} from "@/lib/admin-auth";
import { SETTINGS_TAG, saveSettings } from "@/lib/settings";
import { settingsFields, urlSettings, type SiteSettings } from "@/lib/settings-fields";

export type ActionState = { error?: string; saved?: boolean };

export async function login(_state: ActionState, formData: FormData): Promise<ActionState> {
  if (!adminConfigured) {
    return { error: "No admin password is configured on the server." };
  }

  const password = formData.get("password");

  if (typeof password !== "string" || !checkPassword(password)) {
    return { error: "That password is not correct." };
  }

  await startSession();
  return {};
}

export async function logout(): Promise<void> {
  await endSession();
}

export async function updateSettings(
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  // Server Actions are reachable by direct POST, so the session is checked
  // here rather than only where the form is rendered.
  if (!(await isSignedIn())) {
    return { error: "Your session expired. Please sign in again." };
  }

  const next = {} as SiteSettings;

  for (const field of settingsFields) {
    const value = formData.get(field.name);
    next[field.name] = typeof value === "string" ? value.trim() : "";
  }

  for (const key of urlSettings) {
    const value = next[key];
    if (value && !/^https?:\/\/\S+$/.test(value)) {
      const label = settingsFields.find((field) => field.name === key)?.label ?? key;
      return { error: `${label} must be a full URL starting with https://` };
    }
  }

  try {
    await saveSettings(next);
  } catch (cause) {
    return { error: cause instanceof Error ? cause.message : "Couldn't save. Please try again." };
  }

  // The landing page reads these through a cached function tagged with
  // SETTINGS_TAG, so both the data and the rendered page have to be dropped.
  // `updateTag` rather than `revalidateTag` so the owner sees their own edit
  // on the next request instead of one more round of stale content.
  updateTag(SETTINGS_TAG);
  revalidatePath("/");

  return { saved: true };
}
