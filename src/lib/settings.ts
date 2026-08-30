import { unstable_cache } from "next/cache";
import { site, telegram } from "@/lib/content";
import { settingsFields, type SiteSettings } from "@/lib/settings-fields";

export type { SiteSettings } from "@/lib/settings-fields";

/**
 * The small set of values the site owner changes without a deploy: the session
 * date and time, the Telegram links, the channel member count and the company
 * line in the footer. Everything else is copy, and lives in `@/lib/content`.
 *
 * Storage is Upstash Redis over its REST API, which needs no npm package and
 * works on serverless where the filesystem is read-only. With no credentials
 * configured the site falls back to the defaults in `@/lib/content`, so it
 * still renders — the admin page says so plainly rather than failing silently.
 *
 * Required environment variables:
 *   UPSTASH_REDIS_REST_URL
 *   UPSTASH_REDIS_REST_TOKEN
 */

export const SETTINGS_TAG = "site-settings";

const REDIS_KEY = "freedom-ai:settings";

export const defaultSettings: SiteSettings = {
  sessionDate: site.sessionDate,
  sessionTime: site.sessionTime,
  telegramInviteUrl: site.telegramInviteUrl,
  testimonialsUrl: site.testimonialsUrl,
  telegramMembers: telegram.thread.members,
  companyLine: "",
};

const url = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;

/** False when no Redis credentials are set — the site then serves defaults. */
export const settingsStoreConfigured = Boolean(url && token);

/** Keeps a stored blob honest: unknown keys dropped, missing keys defaulted. */
function normalize(value: unknown): SiteSettings {
  if (typeof value !== "object" || value === null) return defaultSettings;

  const stored = value as Record<string, unknown>;
  const result = { ...defaultSettings };

  for (const field of settingsFields) {
    const raw = stored[field.name];
    if (typeof raw === "string") result[field.name] = raw.trim();
  }

  return result;
}

async function readSettings(): Promise<SiteSettings> {
  if (!url || !token) return defaultSettings;

  try {
    const response = await fetch(`${url}/get/${encodeURIComponent(REDIS_KEY)}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Settings store read failed", response.status);
      return defaultSettings;
    }

    const { result } = (await response.json()) as { result: unknown };
    if (typeof result !== "string") return defaultSettings;

    return normalize(JSON.parse(result));
  } catch (cause) {
    console.error("Settings store unreachable", cause);
    return defaultSettings;
  }
}

/**
 * Cached so the landing page still prerenders. `saveSettings` revalidates
 * SETTINGS_TAG, so an admin edit shows up immediately rather than after the
 * hour-long fallback window.
 */
export const getSettings = unstable_cache(readSettings, ["site-settings"], {
  tags: [SETTINGS_TAG],
  revalidate: 3600,
});

/** Reads past the cache — the admin form must show what is actually stored. */
export const getSettingsFresh = readSettings;

export async function saveSettings(next: SiteSettings): Promise<void> {
  if (!url || !token) {
    throw new Error(
      "No settings store is configured. Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN.",
    );
  }

  const response = await fetch(`${url}/set/${encodeURIComponent(REDIS_KEY)}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "text/plain",
    },
    body: JSON.stringify(normalize(next)),
    cache: "no-store",
  });

  if (!response.ok) {
    console.error("Settings store write failed", response.status);
    throw new Error("Couldn't save. Please try again.");
  }
}
