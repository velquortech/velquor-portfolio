"use client";

import { useActionState, useId, useState, useSyncExternalStore } from "react";
import { submitContact } from "../../actions/contact";
import {
  BUDGETS,
  BUDGET_LABELS,
  HONEYPOT,
  INITIAL_CONTACT_STATE,
  LIMITS,
  PROJECT_TYPES,
  SEGMENTS,
  TIMELINES,
  type Currency,
} from "../../lib/contact-options";
import {
  COUNTRY_COOKIE,
  CURRENCY_COOKIE,
  PH,
  localeLooksPhilippine,
  readCookie,
  writeCookie,
} from "../../lib/geo";
import { StepField } from "../brand/StepField";
import { Turnstile } from "./Turnstile";

/**
 * Public half of the Turnstile key pair — safe in the client bundle, which is
 * the point of it being NEXT_PUBLIC_. The secret lives server-side only, in
 * app/lib/turnstile.ts.
 *
 * Absent in local dev unless you set it. No key means no widget, which the
 * Server Action reads as an unverified submission and files accordingly.
 */
// The NEXT_PUBLIC_ prefix is load-bearing, not decoration: Next only inlines
// prefixed vars into the browser bundle. Without it this reads undefined in
// the client, the guard below is always false, and the widget never mounts.
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

/**
 * Which currency to *show* the budget bands in. The posted value never changes.
 *
 * Location comes from `proxy.ts`, which copies Vercel's edge geo country into a
 * cookie. Reading it here rather than in a Server Component keeps every page
 * statically prerendered — see the note in `proxy.ts`.
 *
 * The browser timezone is the fallback, for local dev and any non-Vercel host
 * where the geo header does not exist. It is a worse signal than an IP lookup,
 * which is why it is second.
 *
 * Server renders dollars; the swap happens after hydration via the explicit
 * server snapshot below, so the markup React hydrates matches what was sent.
 * With JavaScript off the form still works and shows dollars.
 */
/** None of these signals change mid-session — nothing to subscribe to. */
const subscribe = () => () => { };

/**
 * In precedence order:
 *
 *   1. what the visitor picked, if they picked
 *   2. the edge's country lookup, which is the accurate one
 *   3. timezone, then locale — fallbacks for local dev and non-Vercel hosts
 *
 * Timezone alone is not enough: a lot of machines in the Philippines are set to
 * Asia/Singapore, same UTC+8. Widening the check to the offset is worse, not
 * better — that bucket also holds Singapore, Malaysia, Hong Kong, Taiwan, and
 * Perth. Locale is the tiebreaker, and the toggle is the answer when both are
 * wrong.
 */
const getClientCurrency = (): Currency => {
  // The visitor's own choice outranks every guess below it.
  const chosen = readCookie(CURRENCY_COOKIE);
  if (chosen === "PHP" || chosen === "USD") return chosen;

  const country = readCookie(COUNTRY_COOKIE);
  if (country) return country === PH ? "PHP" : "USD";

  try {
    if (Intl.DateTimeFormat().resolvedOptions().timeZone === "Asia/Manila") {
      return "PHP";
    }
  } catch {
    // Intl is unavailable on some old browsers; fall through to locale.
  }

  return localeLooksPhilippine() ? "PHP" : "USD";
};

const getServerCurrency = (): Currency => "USD";

/**
 * Detection sets the default; the visitor gets the last word.
 *
 * Every signal above is a guess, and this one is a guess about someone's money
 * — plenty of machines in the Philippines report Asia/Singapore. The choice is
 * remembered for thirty days and changes display only; the band posted to
 * Airtable is the dollar band either way.
 */
function useCurrency(): [Currency, (next: Currency) => void] {
  // useSyncExternalStore, not an effect: it takes an explicit server snapshot,
  // so the markup React hydrates against is the markup the server sent.
  const detected = useSyncExternalStore(
    subscribe,
    getClientCurrency,
    getServerCurrency,
  );
  const [chosen, setChosen] = useState<Currency | null>(null);

  const choose = (next: Currency) => {
    writeCookie(CURRENCY_COOKIE, next);
    setChosen(next);
  };

  return [chosen ?? detected, choose];
}

const LABEL_BASE =
  "block text-[11px] font-semibold tracking-[0.10em] uppercase text-white/55";

const LABEL = `${LABEL_BASE} mb-2`;

const FIELD =
  "w-full bg-s2 border border-hairline-strong rounded-[10px] px-4 py-3 " +
  "text-[14px] text-ink tracking-[-0.14px] placeholder:text-white/25 " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-300";

// The native select arrow renders black-on-black in a dark UI, so the
// appearance is reset and the chevron drawn as a background image.
const SELECT =
  `${FIELD} appearance-none pr-10 bg-no-repeat cursor-pointer ` +
  "bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2012%208%22%3E%3Cpath%20fill%3D%22%23a366ff%22%20d%3D%22M1%201l5%205%205-5%22%2F%3E%3C%2Fsvg%3E')] " +
  "bg-[position:right_1rem_center] bg-[size:11px_8px]";

const ERROR = "mt-1.5 text-[12px] text-violet-300 tracking-[-0.12px]";

type Props = {
  /** Path the enquiry came from — lands in Airtable's `Source Page`. */
  sourcePage: string;
  /** Case-study name when the form sits on a project page. */
  interestedIn?: string;
  defaultSegment?: (typeof SEGMENTS)[number];
};

export function ContactForm({
  sourcePage,
  interestedIn,
  defaultSegment,
}: Props) {
  const [state, formAction, pending] = useActionState(
    submitContact,
    INITIAL_CONTACT_STATE,
  );
  const id = useId();
  const field = (n: string) => `${id}-${n}`;
  const [currency, chooseCurrency] = useCurrency();

  if (state.ok) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="relative overflow-hidden bg-s1/85 backdrop-blur-md border border-hairline-strong rounded-card px-7 py-10 text-center"
      >
        <StepField
          flip
          rows={7}
          className="absolute right-0 inset-y-0 h-full w-[220px] pointer-events-none opacity-30"
        />
        <div className="relative">
          <p className="text-[11px] font-semibold tracking-[0.10em] uppercase text-violet-300 mb-3">
            Message received
          </p>
          <p className="text-[16px] leading-[1.6] tracking-[-0.16px] text-ink max-w-[320px] mx-auto">
            {state.message}
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="relative bg-s1/85 backdrop-blur-md border border-hairline-strong rounded-card px-6 py-6 sm:px-7 sm:py-7 flex flex-col gap-4"
    >
      {/* Context, not user input — hidden so the no-JS path carries it too. */}
      <input type="hidden" name="sourcePage" value={sourcePage} />
      {interestedIn ? (
        <input type="hidden" name="interestedIn" value={interestedIn} />
      ) : null}

      {/* Honeypot. Off-screen rather than display:none — some bots skip hidden
          inputs. Never announced, never tab-focusable. */}
      <div aria-hidden className="absolute left-[-9999px] w-px h-px overflow-hidden">
        <label htmlFor={field(HONEYPOT)}>Website</label>
        <input
          id={field(HONEYPOT)}
          type="text"
          name={HONEYPOT}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Form-level control, so it sits above the fields instead of beside the
          Budget label. In that label row it made the Budget cell taller than
          Project and Timeline and knocked its select out of line. Named
          "Budget in" because it is far enough from the field it governs that
          the connection has to be stated. */}
      <div className="flex items-center justify-end gap-2">
        <span
          id={field("currency-label")}
          className="text-[11px] font-semibold tracking-[0.10em] uppercase text-white/40"
        >
          Budget in
        </span>
        <div
          role="group"
          aria-labelledby={field("currency-label")}
          className="flex items-center gap-1"
        >
          {(["USD", "PHP"] as const).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => chooseCurrency(c)}
              aria-pressed={currency === c}
              className={`px-2.5 py-1 rounded-pill border text-[11px] font-semibold tracking-[0.08em] cursor-pointer transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-300 ${currency === c
                  ? "bg-s2 border-hairline-strong text-ink"
                  : "bg-transparent border-transparent text-white/40 hover:text-white/70"
                }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={field("name")} className={LABEL}>
            Name *
          </label>
          <input
            id={field("name")}
            name="name"
            type="text"
            required
            maxLength={LIMITS.name}
            autoComplete="name"
            placeholder="Juan dela Cruz"
            className={FIELD}
            aria-invalid={state.errors?.name ? true : undefined}
            aria-describedby={
              state.errors?.name ? field("name-error") : undefined
            }
          />
          {state.errors?.name && (
            <p id={field("name-error")} className={ERROR}>
              {state.errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={field("email")} className={LABEL}>
            Email *
          </label>
          <input
            id={field("email")}
            name="email"
            type="email"
            required
            maxLength={LIMITS.email}
            autoComplete="email"
            placeholder="you@company.com"
            className={FIELD}
            aria-invalid={state.errors?.email ? true : undefined}
            aria-describedby={
              state.errors?.email ? field("email-error") : undefined
            }
          />
          {state.errors?.email && (
            <p id={field("email-error")} className={ERROR}>
              {state.errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={field("company")} className={LABEL}>
            Company
          </label>
          <input
            id={field("company")}
            name="company"
            type="text"
            maxLength={LIMITS.company}
            autoComplete="organization"
            placeholder="Optional"
            className={FIELD}
          />
        </div>

        <div>
          <label htmlFor={field("segment")} className={LABEL}>
            I&apos;m a
          </label>
          <select
            id={field("segment")}
            name="segment"
            defaultValue={defaultSegment ?? ""}
            className={SELECT}
          >
            <option value="">Select</option>
            {SEGMENTS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* items-end, so the three selects sit on one line whatever happens to
          the labels above them. A label that wraps — or that ever gains a
          control beside it — grows its cell upward instead of pushing its
          select down out of step with the other two. Safe here because no
          field in this row renders an error message beneath it. */}
      <div className="grid gap-4 sm:grid-cols-3 items-end">
        <div>
          <label htmlFor={field("projectType")} className={LABEL}>
            Project
          </label>
          <select
            id={field("projectType")}
            name="projectType"
            defaultValue=""
            className={SELECT}
          >
            <option value="">Select</option>
            {PROJECT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          {/* Plain label. The currency toggle lives at the top of the form —
              in this label row it made the Budget cell taller than Project and
              Timeline and pushed its select out of line. */}
          <label htmlFor={field("budget")} className={LABEL}>
            Budget
          </label>
          <select
            id={field("budget")}
            name="budget"
            defaultValue=""
            className={SELECT}
          >
            <option value="">Select</option>
            {/* Value stays the canonical dollar band; only the label localises. */}
            {BUDGETS.map((b) => (
              <option key={b} value={b}>
                {BUDGET_LABELS[currency][b]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor={field("timeline")} className={LABEL}>
            Timeline
          </label>
          <select
            id={field("timeline")}
            name="timeline"
            defaultValue=""
            className={SELECT}
          >
            <option value="">Select</option>
            {TIMELINES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor={field("message")} className={LABEL}>
          What are you building? *
        </label>
        <textarea
          id={field("message")}
          name="message"
          required
          rows={4}
          maxLength={LIMITS.message}
          placeholder="A sentence or two is plenty."
          className={`${FIELD} resize-y min-h-[104px]`}
          aria-invalid={state.errors?.message ? true : undefined}
          aria-describedby={
            state.errors?.message ? field("message-error") : undefined
          }
        />
        {state.errors?.message && (
          <p id={field("message-error")} className={ERROR}>
            {state.errors.message}
          </p>
        )}
      </div>

      {/* Failure messages are both shown and announced from the same node, so a
          screen reader hears the result once. Success swaps the whole form for
          the role="status" panel above. */}
      <p
        aria-live="polite"
        className="text-[13px] leading-[1.5] text-violet-300 tracking-[-0.13px] empty:hidden"
      >
        {state.message}
      </p>

      {/* Bot check. Draws nothing unless Cloudflare actually wants a
          challenge, and its token arrives as a real hidden input — so this
          stays a plain form POST and the no-JS path is unaffected. */}
      {TURNSTILE_SITE_KEY ? (
        <Turnstile siteKey={TURNSTILE_SITE_KEY} resetOn={state} />
      ) : null}

      <div className="flex items-center gap-4 flex-wrap">
        {/* A violet pill, not the white inversion: this button sits on the
            form's s1 card, not on the band's violet ground. */}
        <button
          type="submit"
          disabled={pending}
          className="bg-violet-500 hover:bg-violet-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200 text-white px-[26px] py-[13px] rounded-pill text-[14px] font-semibold tracking-[-0.14px] border-0 cursor-pointer"
        >
          {pending ? "Sending…" : "Send enquiry →"}
        </button>
        <span className="text-[12px] text-white/45 tracking-[-0.12px]">
          We reply within one business day.
        </span>
      </div>

      {/* The honest version of a privacy notice: what is collected, where it
          goes, and how to undo it. Stands in for a policy page until there is a
          reason to write one — a client's procurement checklist, ads, or EU
          traffic. Keep it accurate if the contact path ever changes. */}
      <p className="text-[12px] leading-[1.55] text-white/40 tracking-[-0.12px] m-0">
        What you send goes to Airtable, where we read it and reply. We
        don&apos;t add you to a mailing list.{" "}
        <a
          href="mailto:velquortechnologies@gmail.com?subject=Delete%20my%20enquiry"
          className="text-white/60 hover:text-ink transition-colors duration-200"
        >
          Email us
        </a>{" "}
        to have it deleted.
      </p>
    </form>
  );
}
