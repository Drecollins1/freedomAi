/**
 * Where a registration goes once it has been validated.
 *
 * The primary channel is a Telegram bot message into a chat the owner controls
 * — it is instant, free, needs no third-party account beyond Telegram, and the
 * business already lives there. An optional webhook is forwarded to as well,
 * so a CRM or a sheet can be added later without touching the route.
 *
 * Setting the Telegram side up:
 *   1. Message @BotFather, /newbot, and copy the token → TELEGRAM_BOT_TOKEN
 *   2. Create a group (or use your own chat) and add the bot to it
 *   3. Send one message there, then open
 *      https://api.telegram.org/bot<TOKEN>/getUpdates and copy the numeric
 *      "chat":{"id": …} → TELEGRAM_CHAT_ID  (group ids start with a minus sign)
 *
 * Environment variables:
 *   TELEGRAM_BOT_TOKEN         bot token from @BotFather
 *   TELEGRAM_CHAT_ID           chat the registrations are posted into
 *   REGISTRATION_WEBHOOK_URL   optional extra destination, sent the raw JSON
 */

export type Registration = {
  firstName: string;
  email: string;
  whatsapp: string;
};

const botToken = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;
const webhookUrl = process.env.REGISTRATION_WEBHOOK_URL;

/** True when at least one destination is configured to receive registrations. */
export const notifyConfigured = Boolean((botToken && chatId) || webhookUrl);

/** Telegram's HTML parse mode only needs these three escaped. */
function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function formatMessage(registration: Registration): string {
  const { firstName, email, whatsapp } = registration;
  // The WhatsApp number is linked so it can be replied to with one tap.
  const waLink = `https://wa.me/${whatsapp.replace(/\D/g, "")}`;

  return [
    "<b>New registration — Freedom AI</b>",
    "",
    `<b>Name:</b> ${escapeHtml(firstName)}`,
    `<b>Email:</b> ${escapeHtml(email)}`,
    `<b>WhatsApp:</b> <a href="${waLink}">${escapeHtml(whatsapp)}</a>`,
  ].join("\n");
}

async function sendTelegram(registration: Registration): Promise<boolean> {
  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: formatMessage(registration),
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Telegram rejected the registration", response.status, await response.text());
      return false;
    }

    return true;
  } catch (cause) {
    console.error("Telegram unreachable", cause);
    return false;
  }
}

async function sendWebhook(registration: Registration): Promise<boolean> {
  try {
    const response = await fetch(webhookUrl as string, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...registration, source: "landing-page" }),
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Registration webhook rejected the submission", response.status);
      return false;
    }

    return true;
  } catch (cause) {
    console.error("Registration webhook unreachable", cause);
    return false;
  }
}

/**
 * Delivers to every configured destination. Resolves true if at least one of
 * them accepted, so a broken secondary webhook can't lose a registration that
 * Telegram already received.
 */
export async function notifyRegistration(registration: Registration): Promise<boolean> {
  const attempts: Promise<boolean>[] = [];

  if (botToken && chatId) attempts.push(sendTelegram(registration));
  if (webhookUrl) attempts.push(sendWebhook(registration));

  if (attempts.length === 0) {
    console.warn(
      "No registration destination is configured — this signup was not delivered:",
      registration,
    );
    // Nothing to fail: accept it so the form is testable before launch. The
    // warning above is the record that it went nowhere.
    return true;
  }

  const results = await Promise.all(attempts);
  return results.some(Boolean);
}
