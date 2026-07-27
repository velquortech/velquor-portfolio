"use server";

import { createLead } from "../lib/airtable";
import {
  BUDGETS,
  HONEYPOT,
  LIMITS,
  PROJECT_TYPES,
  SEGMENTS,
  TIMELINES,
  type ContactState,
} from "../lib/contact-options";

/**
 * Email is checked by shape only. Anything stricter rejects valid addresses;
 * the only real proof an address works is mail arriving at it.
 */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

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

export async function submitContact(
  _prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot. Return the success shape so the bot has no signal it was caught.
  if (str(formData, HONEYPOT, 200)) {
    return { ok: true, message: "Thanks — we'll be in touch shortly." };
  }

  const name = str(formData, "name", LIMITS.name);
  const email = str(formData, "email", LIMITS.email);
  const message = str(formData, "message", LIMITS.message);

  const errors: ContactState["errors"] = {};
  if (!name) errors.name = "Tell us your name.";
  if (!email) errors.email = "We need an email to reply to.";
  else if (!EMAIL.test(email)) errors.email = "That email doesn't look right.";
  if (!message) errors.message = "Tell us a little about the project.";

  if (Object.keys(errors).length) {
    return { ok: false, message: "Please fix the fields below.", errors };
  }

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
      Status: "New",
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
