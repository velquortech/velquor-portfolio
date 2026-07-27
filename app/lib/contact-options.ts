// Shared between the Server Action and the Client Component, so it lives
// outside both: a "use server" module may only export async functions, and the
// form needs these values to render its selects.
//
// Every list mirrors the single-select choices in the Airtable `Leads` table.
// Change one and change the other, or the write is silently coerced.

export const SEGMENTS = ["Founder", "Procurement", "Other"] as const;

export const PROJECT_TYPES = [
  "Custom Software",
  "Web Platform / SaaS",
  "Mobile App",
  "API / Backend",
  "Cloud & DevOps",
  "UI/UX Engineering",
  "Not sure",
] as const;

export const BUDGETS = [
  "< $10k",
  "$10k – $25k",
  "$25k – $50k",
  "$50k+",
  "Not sure",
] as const;

export const TIMELINES = [
  "ASAP",
  "1–3 months",
  "3–6 months",
  "Just exploring",
] as const;

/** An uncapped textarea is an abuse vector — every free-text field is bounded. */
export const LIMITS = {
  name: 120,
  email: 200,
  company: 120,
  message: 4000,
  sourcePage: 300,
  interestedIn: 200,
} as const;

/** The honeypot input's name. Bots fill it; humans never see it. */
export const HONEYPOT = "website";

export type ContactState = {
  ok: boolean;
  message: string;
  errors?: Partial<Record<"name" | "email" | "message", string>>;
};

export const INITIAL_CONTACT_STATE: ContactState = { ok: false, message: "" };
