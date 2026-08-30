import type { Metadata } from "next";
import { adminConfigured, isSignedIn } from "@/lib/admin-auth";
import { getSettingsFresh, settingsStoreConfigured } from "@/lib/settings";
import { AdminLogin } from "./AdminLogin";
import { AdminSettingsForm } from "./AdminSettingsForm";

/** Keep the admin page out of search results and out of any cache. */
export const metadata: Metadata = {
  title: "Freedom AI — Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isSignedIn())) {
    return <AdminLogin configured={adminConfigured} />;
  }

  // Read past the cache, so the form always shows what is actually stored.
  const settings = await getSettingsFresh();

  return <AdminSettingsForm settings={settings} storeConfigured={settingsStoreConfigured} />;
}
