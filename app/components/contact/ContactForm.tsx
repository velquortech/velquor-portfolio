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
const subscribe = () => () => {};

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
 * Every signal above is a guess, and a guess about someone's money is worth one
 * small control to correct. The choice is remembered across pages, and it
 * changes only what is displayed — the band posted to Airtable is the dollar
 * band either way.
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

      <div className="grid gap-4 sm:grid-cols-3">
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
          {/* Detection is a guess, and this one is about someone's money. The
              toggle is the correction — plenty of machines in the Philippines
              report Asia/Singapore, and no signal short of asking gets that
              right. Switching changes the labels only; the posted value stays
              the dollar band. */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <label htmlFor={field("budget")} className={LABEL_BASE}>
              Budget
            </label>
            <div
              role="group"
              aria-label="Show budget in"
              className="flex items-center gap-1"
            >
              {(["USD", "PHP"] as const).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => chooseCurrency(c)}
                  aria-pressed={currency === c}
                  className={`px-2 py-0.5 rounded-pill border text-[11px] font-semibold tracking-[0.08em] cursor-pointer transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-300 ${
                    currency === c
                      ? "bg-s2 border-hairline-strong text-ink"
                      : "bg-transparent border-transparent text-white/40 hover:text-white/70"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
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
    </form>
  );
}
