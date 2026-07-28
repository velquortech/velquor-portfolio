/**
 * Where the visitor is, as far as the site needs to know.
 *
 * `proxy.ts` reads Vercel's edge geo header and writes the two-letter country
 * into a cookie. The client reads that cookie. The relay exists so the pages
 * stay statically prerendered: reading a header or a cookie inside a Server
 * Component would opt every route carrying `CTABand` into dynamic rendering.
 */

/** Written by proxy.ts, read in the browser. Not a secret, not HttpOnly. */
export const COUNTRY_COOKIE = "vq_country";

/** ISO 3166-1 alpha-2 for the Philippines. */
export const PH = "PH";

/** Browser-only. Returns null on the server, or when the cookie is absent. */
export function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(`(?:^|; )${name}=([^;]*)`);
  return match ? decodeURIComponent(match[1]) : null;
}
