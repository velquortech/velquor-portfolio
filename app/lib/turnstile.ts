// Server-only Cloudflare Turnstile verification.
//
// Same shape as the Airtable client next to it: one endpoint, a thin fetch, no
// SDK. The `server-only` import keeps TURNSTILE_SECRET_KEY out of any client
// bundle — the site key is public by design, the secret is not.
import "server-only";

const VERIFY = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/**
 * Why this is a five-way verdict rather than a boolean.
 *
 * A missing token and a rejected token are different events, and neither is
 * the same as Cloudflare being unreachable. Collapsing them to false/true
 * would mean either dropping real leads during an outage or silently losing
 * the whole defence when an env var goes missing. The caller decides what each
 * one costs; see `submitContact`.
 */
export type Verdict =
  /** Token present and valid. */
  | "verified"
  /** No token at all — JavaScript off, or a bot that POSTed the action directly. */
  | "missing"
  /** Expired or already spent. A human who left the page open, usually. */
  | "stale"
  /** Token present and rejected. */
  | "invalid"
  /** No secret key set. Local dev, or a deploy missing the env var. */
  | "unconfigured"
  /** Cloudflare did not answer. Never treated as proof of anything. */
  | "unavailable";

/** Warn once per process, not once per submission. */
let warned = false;

/**
 * Checks a Turnstile token.
 *
 * `remoteIp` is optional and only sharpens Cloudflare's own scoring — the
 * verdict does not depend on it, so a proxy that hides the client IP degrades
 * accuracy rather than breaking the check.
 */
export async function verifyTurnstile(
  token: string,
  remoteIp?: string,
): Promise<Verdict> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    if (!warned) {
      warned = true;
      console.warn(
        "[turnstile] TURNSTILE_SECRET_KEY is not set — every lead will be filed as unverified.",
      );
    }
    return "unconfigured";
  }

  if (!token) return "missing";

  const body = new URLSearchParams({ secret, response: token });
  if (remoteIp) body.set("remoteip", remoteIp);

  let res: Response;
  try {
    res = await fetch(VERIFY, {
      method: "POST",
      // siteverify takes form encoding; no need to reach for JSON.
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      cache: "no-store",
      // A lead must not hang on someone else's uptime.
      signal: AbortSignal.timeout(5_000),
    });
  } catch (error) {
    console.error("[turnstile] siteverify unreachable:", error);
    return "unavailable";
  }

  if (!res.ok) {
    console.error(`[turnstile] siteverify returned ${res.status}`);
    return "unavailable";
  }

  const json = (await res.json()) as {
    success: boolean;
    "error-codes"?: string[];
  };

  if (json.success) return "verified";

  const codes = json["error-codes"] ?? [];

  // Cloudflare reports a spent or expired token the same way. Both mean "ask
  // for a fresh one", not "this is a bot" — a token dies five minutes after
  // it is issued, and a slow form-filler will hit it honestly.
  if (codes.includes("timeout-or-duplicate")) return "stale";

  console.warn(`[turnstile] rejected: ${codes.join(", ") || "no error code"}`);
  return "invalid";
}
