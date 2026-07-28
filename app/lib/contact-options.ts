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

/**
 * Canonical budget bands. These are the values written to Airtable, and they
 * stay in dollars for every lead regardless of where the lead is sitting —
 * otherwise the `Budget` column mixes two currencies and stops being sortable.
 * Currency is presentation; see BUDGET_LABELS.
 */
export const BUDGETS = [
  "< $10k",
  "$10k – $25k",
  "$25k – $50k",
  "$50k+",
  "Not sure",
] as const;

export type Budget = (typeof BUDGETS)[number];

export type Currency = "USD" | "PHP";

/**
 * USD → PHP. The one number to change when the rate moves; every peso band is
 * derived from it, so they cannot drift out of step with each other or get
 * rounded to something friendlier than the truth.
 *
 * Hand-maintained on purpose. A live FX call to render a select label would add
 * a network dependency, a failure mode, and a reason for this form to stop
 * working — for a figure that only has to be roughly right.
 *
 * Last reviewed: 2026-07-28. Worth a look whenever the peso moves a few points.
 */
export const USD_PHP_RATE = 58;

/** Band edges in USD. `null` is open-ended at that end. */
const BUDGET_BANDS: Record<Budget, { min: number | null; max: number | null }> =
  {
    "< $10k": { min: null, max: 10_000 },
    "$10k – $25k": { min: 10_000, max: 25_000 },
    "$25k – $50k": { min: 25_000, max: 50_000 },
    "$50k+": { min: 50_000, max: null },
    "Not sure": { min: null, max: null },
  };

/** ₱580k, ₱1.45M — no rounding beyond what the unit itself implies. */
function peso(usd: number): string {
  const php = usd * USD_PHP_RATE;
  if (php >= 1_000_000) {
    // Number() drops a trailing zero, so 2.90 reads as 2.9.
    return `₱${Number((php / 1_000_000).toFixed(2))}M`;
  }
  return `₱${Math.round(php / 1_000)}k`;
}

function pesoLabel({
  min,
  max,
}: {
  min: number | null;
  max: number | null;
}): string {
  if (min === null && max === null) return "Not sure";
  if (min === null) return `< ${peso(max as number)}`;
  if (max === null) return `${peso(min)}+`;
  return `${peso(min)} – ${peso(max)}`;
}

/**
 * What the visitor sees. The value posted is always the canonical band above,
 * so switching currency changes no data and needs no Airtable change.
 *
 * Derived, not typed out: a client who picks "< ₱580k" is recorded as
 * "< $10k", and updating USD_PHP_RATE updates every label at once.
 */
export const BUDGET_LABELS: Record<Currency, Record<Budget, string>> = {
  USD: Object.fromEntries(BUDGETS.map((b) => [b, b])) as Record<Budget, string>,
  PHP: Object.fromEntries(
    BUDGETS.map((b) => [b, pesoLabel(BUDGET_BANDS[b])]),
  ) as Record<Budget, string>,
};

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
