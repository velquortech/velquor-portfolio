"use server";

import { headers } from "next/headers";
import { createLead } from "../lib/airtable";
import { verifyTurnstile, type Verdict } from "../lib/turnstile";
import {
  BUDGETS,
  HONEYPOT,
  LIMITS,
  PROJECT_TYPES,
  SEGMENTS,
  STATUS_NEW,
  STATUS_UNVERIFIED,
  TIMELINES,
  TURNSTILE_FIELD,
  type ContactState,
} from "../lib/contact-options";

/**
 * Email is checked by shape only. Anything stricter rejects valid addresses;
 * the only real proof an address works is mail arriving at it.
 *
 * Worth stating plainly, because it has been asked: no amount of local
 * checking can tell whether `something@gmail.com` is a registered mailbox.
 * Google publishes no such API, and SMTP probing gmail.com accepts everything
 * at RCPT while getting the prober's IP blocked. Shape here, Turnstile below,
 * and a rate limit at the edge — that is the honest set of tools.
 */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Emergency lever. Off by default, because the form is specified to work with
 * JavaScript disabled and Turnstile needs JavaScript — so an absent token
 * normally means "file as unverified", not "reject".
 *
 * Set TURNSTILE_REQUIRE=1 while a flood is actually in progress and the
 * unverified lane starts being dropped instead of written. That trades the
 * no-JS visitor away to stop rows being created at all. Turn it back off.
 */
const REQUIRE_TURNSTILE = process.env.TURNSTILE_REQUIRE === "1";

/** The reply a bot gets: the success shape, so it learns nothing. */
const SILENT_SUCCESS: ContactState = {
  ok: true,
  message: "Thanks — we'll be in touch shortly.",
};

function str(formData: FormData, key: string, max: number) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

/** Free-text selects are whitelisted so a hand-crafted POST cannot seed the Airtable choice list. */
function pick(formData: FormData, key: string, allowed: readonly string[]) {
  const value = formData.get(key);
  return typeof value === "string" && allowed.includes(value)
    ? value
    : undefined;
}

/** Leftmost entry of a comma-separated header, or undefined. */
const firstHop = (value: string | null) =>
  value?.split(",")[0].trim() || undefined;

/**
 * Best-effort client IP, passed to siteverify to sharpen Cloudflare's own
 * scoring. The verdict never depends on it, so a host that hides the client IP
 * costs accuracy rather than breaking the check.
 *
 * Platform-set headers first, `x-forwarded-for` last: XFF is a list that
 * proxies append to, and its leftmost entry is the conventional slot for a
 * caller-supplied value, which makes it the least trustworthy of the three.
 * The ordering matters more if a per-IP rate limit is ever added on top —
 * keying a quota off a header the caller controls leaves the quota
 * ornamental.
 *
 * `headers()` is a request-time API and opts a route into dynamic rendering —
 * harmless here, unlike in a Server Component, because a Server Action is
 * already a per-request POST. The prerendered pages carrying `CTABand` are
 * untouched.
 */
async function clientIp(): Promise<string | undefined> {
  const h = await headers();
  return (
    // Written by Vercel's proxy; a caller cannot forge either of these.
    firstHop(h.get("x-vercel-forwarded-for")) ??
    firstHop(h.get("x-real-ip")) ??
    firstHop(h.get("x-forwarded-for"))
  );
}

export async function submitContact(
  _prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot. Return the success shape so the bot has no signal it was caught.
  if (str(formData, HONEYPOT, 200)) return SILENT_SUCCESS;

  const name = str(formData, "name", LIMITS.name);
  const email = str(formData, "email", LIMITS.email);
  const message = str(formData, "message", LIMITS.message);

  const errors: ContactState["errors"] = {};
  if (!name) errors.name = "Tell us your name.";
  if (!email) errors.email = "We need an email to reply to.";
  else if (!EMAIL.test(email)) errors.email = "That email doesn't look right.";
  if (!message) errors.message = "Tell us a little about the project.";

  // Field checks run before Turnstile on purpose. Verification spends the
  // token, so validating first means someone fixing a typo still has a live
  // one to resubmit with — and a bot posting junk never costs us a siteverify.
  if (Object.keys(errors).length) {
    return { ok: false, message: "Please fix the fields below.", errors };
  }

  const ip = await clientIp();
  const verdict: Verdict = await verifyTurnstile(
    str(formData, TURNSTILE_FIELD, LIMITS.turnstile),
    ip,
  );

  // The visitor sat on the page too long, or double-submitted. Their widget is
  // reset by the form, so sending again works — this is not a rejection.
  if (verdict === "stale") {
    return {
      ok: false,
      message: "That took a moment — please send it again.",
    };
  }

  const verified = verdict === "verified";

  if (!verified && REQUIRE_TURNSTILE) return SILENT_SUCCESS;

  try {
    await createLead({
      Name: name,
      Email: email,
      Company: str(formData, "company", LIMITS.company) || undefined,
      Segment: pick(formData, "segment", SEGMENTS),
      "Project Type": pick(formData, "projectType", PROJECT_TYPES),
      Budget: pick(formData, "budget", BUDGETS),
      Timeline: pick(formData, "timeline", TIMELINES),
      Message: message,
      "Source Page": str(formData, "sourcePage", LIMITS.sourcePage) || undefined,
      "Interested In":
        str(formData, "interestedIn", LIMITS.interestedIn) || undefined,
      // Anything that did not clear Turnstile is written, but quarantined.
      // A lead is never dropped for a missing token, a missing env var, or a
      // Cloudflare outage — it just does not claim to have been checked.
      Status: verified ? STATUS_NEW : STATUS_UNVERIFIED,
    });
  } catch (error) {
    // Airtable's error body can echo field and table names — log it, never ship it.
    console.error("[contact] Airtable write failed:", error);
    return {
      ok: false,
      message:
        "Something went wrong on our end. Email us at velquortechnologies@gmail.com and we'll pick it up.",
    };
  }

  return {
    ok: true,
    message: "Thanks — we'll reply within one business day.",
  };
}
