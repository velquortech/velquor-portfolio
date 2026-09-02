"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";
import {
  TURNSTILE_FIELD,
  type ContactState,
} from "../../lib/contact-options";

declare global {
  interface Window {
    turnstile?: { reset: (container?: HTMLElement | string) => void };
  }
}

const SCRIPT = "https://challenges.cloudflare.com/turnstile/v0/api.js";

type Props = {
  /** Public by design — Cloudflare pairs it with the server-side secret. */
  siteKey: string;
  /**
   * The Server Action's latest result. `useActionState` hands back a fresh
   * object per submission, so its identity — not its contents — is the signal
   * that an attempt was made and our token may have been spent.
   */
  resetOn: ContactState;
};

/**
 * Implicit rendering, deliberately.
 *
 * Cloudflare's script finds the `.cf-turnstile` node and injects a real hidden
 * input into the enclosing form. That is what keeps `ContactForm` a plain
 * `<form action={formAction}>`: no onSubmit handler to intercept, no token to
 * marshal by hand, and with JavaScript off there is simply no input — which
 * the Server Action reads as an unverified human and files accordingly, rather
 * than as a failure.
 *
 * `interaction-only` keeps the widget invisible unless Cloudflare actually
 * wants a challenge, so the common case costs the form no layout at all.
 */
export function Turnstile({ siteKey, resetOn }: Props) {
  const box = useRef<HTMLDivElement>(null);
  const settled = useRef(false);

  // A token is single-use and expires after five minutes, and any submission
  // that reached siteverify has spent ours. Without this reset the visitor's
  // second attempt fails as `timeout-or-duplicate` through no fault of theirs.
  //
  // Reaching into Cloudflare's widget is exactly the external-system sync an
  // effect is for — there is no React state to derive this from, and counting
  // attempts in state would just cascade a render per submission.
  useEffect(() => {
    // The initial state is not a result. Nothing has been spent yet.
    if (!settled.current) {
      settled.current = true;
      return;
    }
    window.turnstile?.reset(box.current ?? undefined);
  }, [resetOn]);

  return (
    <>
      <Script src={SCRIPT} strategy="afterInteractive" />
      <div
        ref={box}
        className="cf-turnstile"
        data-sitekey={siteKey}
        data-theme="dark"
        data-appearance="interaction-only"
        data-response-field-name={TURNSTILE_FIELD}
      />
    </>
  );
}
