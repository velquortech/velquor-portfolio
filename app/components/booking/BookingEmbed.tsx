"use client";

import Script from "next/script";
import { useCallback, useRef, useState } from "react";
import { buildBookingUrl } from "../../lib/calendly";

const WIDGET_SRC = "https://assets.calendly.com/assets/external/widget.js";

type InitInlineWidgetOptions = {
  url: string;
  parentElement: HTMLElement;
  prefill?: { name?: string; email?: string };
};

declare global {
  interface Window {
    Calendly?: { initInlineWidget: (options: InitInlineWidgetOptions) => void };
  }
}

type Props = {
  /** Path the visitor booked from — tags the booking's attribution. */
  sourcePage: string;
  /** Case-study name when the embed sits under a project page. */
  interestedIn?: string;
  /** Carried over when we already know who is booking. */
  prefillName?: string;
  prefillEmail?: string;
  className?: string;
};

/**
 * The Calendly inline widget, wrapped in brand chrome.
 *
 * Three things this has to get right:
 *
 * 1. It must survive client-side navigation. `next/script` loads the widget
 *    once per session, so the usual auto-init-on-load never fires a second
 *    time. `onReady` runs on every mount, so the widget is instantiated
 *    explicitly rather than left to the script's own DOM scan.
 * 2. It must work with JavaScript off. The `<noscript>` route is the hosted
 *    Calendly page, which is a complete booking flow, not a consolation link.
 *    This mirrors the rule already binding on `ContactForm`.
 * 3. It must fail visibly. A blocked third-party script is common — ad
 *    blockers and strict corporate proxies both eat this one. A silent empty
 *    box would read as "the studio is not taking calls".
 *
 * The widget's own type cannot be themed — Calendly ships its own faces inside
 * the iframe. Everything around it carries the identity instead.
 */
export function BookingEmbed({
  sourcePage,
  interestedIn,
  prefillName,
  prefillEmail,
  className = "",
}: Props) {
  const host = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "failed">(
    "loading",
  );

  const url = buildBookingUrl({ sourcePage, interestedIn });

  const mount = useCallback(() => {
    const parentElement = host.current;
    if (!parentElement) return;

    // The script resolved but the global is missing — a proxy served something
    // that was not the widget. Treat it as a failure, not as "still loading".
    if (!window.Calendly) {
      setStatus("failed");
      return;
    }

    // `onReady` fires on first load and again on every remount. Without this,
    // a second iframe stacks under the first on client-side navigation.
    parentElement.innerHTML = "";
    window.Calendly.initInlineWidget({
      url,
      parentElement,
      prefill:
        prefillName || prefillEmail
          ? { name: prefillName, email: prefillEmail }
          : undefined,
    });
    setStatus("ready");
  }, [url, prefillName, prefillEmail]);

  return (
    <div className={className}>
      <div className="relative bg-s1 border border-hairline-strong rounded-card overflow-hidden">
        {status === "failed" ? (
          <div className="px-6 py-14 sm:py-20 text-center">
            <p className="text-[11px] font-semibold tracking-[0.10em] uppercase text-violet-300 mb-3">
              Calendar didn&apos;t load
            </p>
            <p className="text-[15px] leading-[1.6] tracking-[-0.15px] text-muted max-w-[380px] mx-auto mb-7">
              An extension or network policy is probably blocking it. The
              booking page itself works fine — it just has to open in a new tab.
            </p>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-violet-500 hover:bg-violet-700 transition-colors duration-200 text-white px-[26px] py-[13px] rounded-pill text-[14px] font-semibold tracking-[-0.14px] no-underline"
            >
              Open the booking page →
            </a>
          </div>
        ) : (
          <>
            {/* Calendly sizes the iframe to fill this box, so the height lives
                here. Mobile needs more room, not less — the month grid and the
                time list stack there instead of sitting side by side. */}
            <div
              ref={host}
              aria-busy={status === "loading"}
              className="w-full min-w-[320px] h-[1040px] sm:h-[820px] lg:h-[700px]"
            />

            {status === "loading" && (
              <div
                aria-hidden
                className="absolute inset-0 grid place-items-center bg-s1 pointer-events-none"
              >
                <p className="text-[13px] tracking-[0.10em] uppercase text-muted">
                  Loading available times…
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* No JavaScript, no widget — but the hosted page is a full booking flow
          and honours the same brand colour params. */}
      <noscript>
        <p className="mt-4 text-[14px] leading-[1.6] tracking-[-0.14px] text-muted">
          The calendar needs JavaScript.{" "}
          <a
            href={url}
            className="text-violet-300 hover:text-violet-100 transition-colors"
          >
            Open the booking page instead
          </a>
          .
        </p>
      </noscript>

      <Script
        src={WIDGET_SRC}
        strategy="lazyOnload"
        onReady={mount}
        onError={() => setStatus("failed")}
      />
    </div>
  );
}
