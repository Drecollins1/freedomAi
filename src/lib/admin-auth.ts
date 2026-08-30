import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Single-owner authentication for /admin: one shared password, one signed
 * httpOnly cookie. There is no user table because there is exactly one user.
 *
 * Required environment variables:
 *   ADMIN_PASSWORD        the password typed into the login form
 *   ADMIN_SESSION_SECRET  a long random string used to sign the cookie
 *
 * With ADMIN_PASSWORD unset the admin page refuses every login rather than
 * letting anyone in — an unconfigured deployment must not be an open one.
 */

const COOKIE_NAME = "fa_admin_session";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

const password = process.env.ADMIN_PASSWORD;
const secret = process.env.ADMIN_SESSION_SECRET;

/** False when ADMIN_PASSWORD is missing — login is impossible until it is set. */
export const adminConfigured = Boolean(password);

function signingKey(): string {
  // Falling back to the password keeps a one-variable setup working; a
  // dedicated secret is better, because rotating it doesn't change the login.
  return secret || password || "";
}

function sign(payload: string): string {
  return createHmac("sha256", signingKey()).update(payload).digest("hex");
}

/** Constant-time compare that tolerates differing lengths. */
function equal(a: string, b: string): boolean {
  const left = createHmac("sha256", signingKey()).update(a).digest();
  const right = createHmac("sha256", signingKey()).update(b).digest();
  return timingSafeEqual(left, right);
}

export function checkPassword(candidate: string): boolean {
  if (!password) return false;
  return equal(candidate, password);
}

function createToken(): string {
  const expiresAt = String(Date.now() + MAX_AGE_SECONDS * 1000);
  return `${expiresAt}.${sign(expiresAt)}`;
}

function verifyToken(token: string | undefined): boolean {
  if (!token || !signingKey()) return false;

  const [expiresAt, signature] = token.split(".");
  if (!expiresAt || !signature) return false;
  if (!equal(signature, sign(expiresAt))) return false;

  return Number(expiresAt) > Date.now();
}

export async function startSession(): Promise<void> {
  const store = await cookies();
  store.set(COOKIE_NAME, createToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });
}

export async function endSession(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export async function isSignedIn(): Promise<boolean> {
  const store = await cookies();
  return verifyToken(store.get(COOKIE_NAME)?.value);
}
