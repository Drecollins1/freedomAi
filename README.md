# Freedom AI

The landing page for the free 3-day live AI-assisted trading experience, built with Next.js.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill it in
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Where things live

- **Page copy** — `src/lib/content.ts`. Every headline, paragraph and list on the
  page is in there, so wording changes never touch a component.
- **Owner-editable settings** — `src/lib/settings-fields.ts` (the shape) and
  `src/lib/settings.ts` (the store). These are the values that change often:
  the session date and time, the Telegram invite link, the testimonial channel
  link, the channel member count, and the company line in the footer.
- **Sections** — `src/components/sections/`, one file per band of the page.

## The admin page

`/admin` lets the owner change the settings above without a deploy. It is not
linked from anywhere on the site and is marked `noindex`.

Sign in with `ADMIN_PASSWORD`; the session is a signed httpOnly cookie that
lasts a week. Saving writes to Upstash Redis and invalidates the cached copy of
the landing page, so the change is live on the next request.

Without `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` the site falls
back to the defaults in `src/lib/content.ts` and the admin page says so instead
of pretending to save.

## Where registrations go

The form posts to `/api/register`, which validates the submission and hands it
to `src/lib/notify.ts`. That posts each signup as a Telegram message into a chat
the owner controls, and — if `REGISTRATION_WEBHOOK_URL` is set — forwards the
same data as JSON to a second destination such as a CRM or a sheet.

With nothing configured the endpoint accepts the submission and logs a warning
that it went nowhere, so the form is testable before launch. **Configure at
least one destination before going live, or registrations are lost.**

## Environment variables

See [`.env.example`](.env.example) for the full list and how to obtain each
value. Set the same variables in your hosting provider's dashboard for
production.

## Before going live

Search `src/lib/content.ts` for `[` — anything still in brackets is a
placeholder. The session date, session time, testimonial link and member count
are set at `/admin` rather than in that file.

Also confirm `/public/images/avatar.jpeg` is a real photograph of the named
founder. The section around it claims there is a real person behind Freedom AI;
a stock or generated portrait would undercut that claim.
