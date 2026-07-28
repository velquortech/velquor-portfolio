/**
 * One place builds the booking URL.
 *
 * The brand colour params, the GDPR banner flag, and the attribution params all
 * have to travel together. Assembled inline at each call site they drift, and a
 * dropped `primary_color` is how Calendly's default `#8247f5` — a second violet
 * that is not on our ramp — reaches a page nobody is looking at.
 *
 * Nothing here is secret. The scheduling URL is a public page, which is why it
 * is the one Calendly value allowed to carry `NEXT_PUBLIC_`. The webhook
 * signing key and the API token, when they land, stay server-only under the
 * same rule as `AIRTABLE_TOKEN`.
 */

/**
 * Falls back to the live event type so a missing env var degrades to a working
 * booking page rather than a blank iframe.
 */
const BOOKING_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ??
  "https://calendly.com/velquortechnologies/30min";

/**
 * Hex without the `#` — Calendly's params reject the hash.
 * These mirror `--violet-500`, `--s1`, and `--ink` in `globals.css`; if the
 * ramp moves, move them too.
 */
const BRAND = {
  primary_color: "6600ff",
  background_color: "0e0024",
  text_color: "ffffff",
} as const;

type BookingUrlOptions = {
  /** Path the visitor booked from. Rides along as `utm_content`, which is what
   *  the webhook will map to Airtable's `Source Page`. */
  sourcePage?: string;
  /** Case-study name on project pages. Maps to `Interested In`. */
  interestedIn?: string;
  /** Prefill, when the visitor has already told us who they are. */
  name?: string;
  email?: string;
  /**
   * The page states the duration and the format in brand type, so the widget
   * repeating it is noise. Pass `false` if the embed ever stands alone.
   */
  hideEventTypeDetails?: boolean;
};

/**
 * Build the embed / fallback URL. Same builder for both: the hosted Calendly
 * page honours the colour params too, so the no-JS route is not a downgrade in
 * brand terms — only in convenience.
 */
export function buildBookingUrl({
  sourcePage,
  interestedIn,
  name,
  email,
  hideEventTypeDetails = true,
}: BookingUrlOptions = {}): string {
  const url = new URL(BOOKING_URL);
  const params = url.searchParams;

  for (const [key, value] of Object.entries(BRAND)) params.set(key, value);

  // Ours is a dark, single-hue surface; Calendly's banner is neither, and the
  // site carries its own privacy note.
  params.set("hide_gdpr_banner", "1");
  if (hideEventTypeDetails) params.set("hide_event_type_details", "1");

  // Attribution. Calendly echoes these back in the webhook's `tracking` object,
  // which is what keeps a booked lead and a form lead comparable in Airtable.
  params.set("utm_source", "velquortech.com");
  params.set("utm_medium", "website");
  if (sourcePage) params.set("utm_content", sourcePage);
  if (interestedIn) params.set("utm_campaign", interestedIn);

  if (name) params.set("name", name);
  if (email) params.set("email", email);

  return url.toString();
}

/** Bare scheduling URL — for anywhere a plain link reads better than an embed. */
export const BOOKING_PAGE_URL = BOOKING_URL;
