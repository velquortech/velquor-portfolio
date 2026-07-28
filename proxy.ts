import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { COUNTRY_COOKIE } from "./app/lib/geo";

/**
 * Copies Vercel's edge geo country into a readable cookie.
 *
 * This is the only thing on the site that needs to know where a visitor is:
 * the contact form shows peso budget bands in the Philippines and dollar bands
 * everywhere else. The value posted to Airtable is the dollar band either way.
 *
 * Why a cookie rather than reading the header in a Server Component: every page
 * here is statically prerendered and `CTABand` sits on nearly all of them.
 * Calling `headers()` would make the whole site render per-request to localise
 * five select labels. The proxy runs at the edge, adds one `Set-Cookie`, and
 * leaves the prerendered HTML alone.
 *
 * `x-vercel-ip-country` is absent in local dev and on any non-Vercel host, so
 * no cookie is set there and the client falls back to the browser timezone.
 */
export function proxy(request: NextRequest) {
  const response = NextResponse.next();
  const country = request.headers.get("x-vercel-ip-country");

  if (country && request.cookies.get(COUNTRY_COOKIE)?.value !== country) {
    response.cookies.set({
      name: COUNTRY_COOKIE,
      value: country,
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
    });
  }

  return response;
}

export const config = {
  /**
   * Documents only. Static assets are excluded so their CDN responses never
   * pick up a `Set-Cookie`, which would make them uncacheable.
   */
  matcher: [
    "/((?!_next/static|_next/image|images|favicon.ico|icon.png|apple-icon.png|robots.txt|sitemap.xml).*)",
  ],
};
