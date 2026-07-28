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

/**
 * The visitor's own choice, which beats detection.
 *
 * Kept separate from COUNTRY_COOKIE on purpose: the proxy rewrites that one
 * whenever the edge reports a different country, so an override stored there
 * would be wiped on the next navigation.
 */
export const CURRENCY_COOKIE = "vq_currency";

/** ISO 3166-1 alpha-2 for the Philippines. */
export const PH = "PH";

/** Browser-only. Returns null on the server, or when the cookie is absent. */
export function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(`(?:^|; )${name}=([^;]*)`);
  return match ? decodeURIComponent(match[1]) : null;
}

/** Browser-only, thirty days, same scope as the country cookie. */
export function writeCookie(name: string, value: string): void {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${
    60 * 60 * 24 * 30
  }; samesite=lax`;
}
