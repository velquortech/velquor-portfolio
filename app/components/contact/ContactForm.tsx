"use client";

import { useActionState, useId } from "react";
import { submitContact } from "../../actions/contact";
import {
  BUDGETS,
  HONEYPOT,
  INITIAL_CONTACT_STATE,
  LIMITS,
  PROJECT_TYPES,
  SEGMENTS,
  TIMELINES,
} from "../../lib/contact-options";
import { StepField } from "../brand/StepField";

const LABEL =
  "block text-[11px] font-semibold tracking-[0.10em] uppercase text-white/55 mb-2";

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
            {BUDGETS.map((b) => (
              <option key={b} value={b}>
                {b}
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
