/**
 * The shape of the owner-editable settings, and how the admin form renders
 * them. This lives apart from `@/lib/settings` so the admin form — a client
 * component — can import it without pulling the server-only store with it.
 *
 * Adding a setting means adding it to `SiteSettings`, to `settingsFields`
 * below, and to `defaultSettings` in `@/lib/settings`. Nothing else.
 */

export type SiteSettings = {
  sessionDate: string;
  sessionTime: string;
  telegramInviteUrl: string;
  testimonialsUrl: string;
  telegramMembers: string;
  companyLine: string;
};

export type SettingsField = {
  name: keyof SiteSettings;
  label: string;
  hint: string;
  placeholder: string;
  multiline: boolean;
};

export const settingsFields = [
  {
    name: "sessionDate",
    label: "Next session date",
    hint: "Shown in the nav and above the registration form.",
    placeholder: "Monday 8 September",
    multiline: false,
  },
  {
    name: "sessionTime",
    label: "Next session time",
    hint: "Include the timezone so nobody has to guess.",
    placeholder: "7:00 PM WAT",
    multiline: false,
  },
  {
    name: "telegramInviteUrl",
    label: "Telegram invite link",
    hint: "The big hero button points here. Update it whenever the invite changes.",
    placeholder: "https://t.me/+…",
    multiline: false,
  },
  {
    name: "testimonialsUrl",
    label: "Testimonial channel link",
    hint: 'Where "See more community feedback" goes.',
    placeholder: "https://t.me/…",
    multiline: false,
  },
  {
    name: "telegramMembers",
    label: "Channel member count",
    hint: "Shown on the example channel card. Use the real number.",
    placeholder: "1,240 members",
    multiline: false,
  },
  {
    name: "companyLine",
    label: "Company name, registration and jurisdiction",
    hint: "Added to the end of the risk disclaimer in the footer. Leave blank to omit it.",
    placeholder: "Freedom AI Ltd, RC 1234567, registered in Nigeria.",
    multiline: true,
  },
] as const satisfies readonly SettingsField[];

/** The two settings that must be real URLs when they are filled in. */
export const urlSettings = ["telegramInviteUrl", "testimonialsUrl"] as const;
