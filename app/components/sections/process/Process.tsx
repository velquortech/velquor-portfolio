import Link from "next/link";
import { PHASES } from "../../../data/process";

/**
 * The landing-page cut of the process: the five step names and their
 * one-liners, and a link into `/process` for the detail.
 *
 * The steps live in `app/data/process.ts` so this section and `/process`
 * cannot disagree about what step 03 is called.
 */
export function Process() {
  return (
    <section id="process" className="relative py-24">

      <div aria-hidden className="absolute top-0 inset-x-0 h-px bg-horizon-gradient pointer-events-none" />

      <div className="mx-auto px-6 max-w-[1200px]">

        <div className="flex items-end justify-between flex-wrap gap-6 mb-16">
          <div>
            <p className="text-[12px] font-medium tracking-[0.10em] text-muted uppercase mb-3">
              How we work
            </p>
            <h2 className="text-display-xl font-display font-bold uppercase tracking-display-xl leading-display-section text-ink">
              No surprises.
              <br />
              No excuses.
            </h2>
          </div>
          <span className="text-[13px] text-muted tracking-[-0.13px]">
            5 steps &middot; repeatable &middot; proven
          </span>
        </div>

        <div>
          {PHASES.map((step) => (
            <div
              key={step.num}
              className="group relative flex flex-col gap-3 md:flex-row md:items-start md:gap-8 py-8 border-b border-hairline last:border-0 pl-4"
            >
              <div
                aria-hidden
                className="absolute left-0 top-4 bottom-4 w-[2px] rounded-full bg-gradient-to-b from-violet-500 via-violet-300 to-violet-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              />

              <div className="flex items-baseline gap-4 md:contents">
                <span className="shrink-0 w-10 text-[12px] font-semibold tracking-[0.08em] text-gradient-palette md:pt-[3px]">
                  {step.num}
                </span>

                <h3 className="shrink-0 md:w-44 text-[20px] font-display font-bold uppercase tracking-display-md leading-[1.2] text-ink transition-colors duration-200">
                  {step.title}
                </h3>
              </div>

              <p className="flex-1 text-[15px] leading-[1.6] tracking-[-0.15px] text-muted">
                {step.summary}
              </p>
            </div>
          ))}
        </div>

        {/* The detail lives on its own page — what each phase produces, and the
            principles that hold across all five. A visitor who never clicks
            still leaves knowing we work in five named steps. */}
        <div className="mt-10">
          <Link
            href="/process"
            className="inline-flex items-center gap-2 bg-s1 border border-hairline-strong hover:border-hairline-hover transition-colors duration-200 text-ink px-[22px] py-[11px] rounded-pill text-[14px] font-medium tracking-[-0.14px] no-underline"
          >
            See the full process
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>

      <div aria-hidden className="absolute bottom-0 inset-x-0 h-px bg-horizon-gradient pointer-events-none" />
    </section>
  );
}
