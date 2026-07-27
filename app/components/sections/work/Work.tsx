import Link from "next/link";
import { PROJECTS } from "../../../data/projects";
import { FeaturedCard, ProjectCard } from "./ProjectCards";

/** Number of projects surfaced on the landing page; the rest live on /work. */
const LANDING_COUNT = 4;

export function Work() {
  const shown = PROJECTS.slice(0, LANDING_COUNT);
  const featured = shown.filter((p) => p.featured);
  const rest = shown.filter((p) => !p.featured);
  const remaining = PROJECTS.length - shown.length;

  return (
    <section id="work" className="py-24">
      <div className="mx-auto px-6 max-w-[1200px]">
        {/* Header */}
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
          <div>
            <p className="text-[12px] font-medium tracking-[0.10em] text-muted uppercase mb-3">
              Selected work
            </p>
            <h2 className="text-display-xl font-display font-bold uppercase tracking-display-xl leading-display-section text-ink">
              Projects that
              <br />
              speak for us.
            </h2>
          </div>
          <a
            href="#contact"
            className="text-[14px] font-medium text-muted hover:text-ink transition-colors no-underline border-b border-hairline-hover pb-0.5"
          >
            Start your project →
          </a>
        </div>

        {/* Featured spotlight row */}
        {featured.length > 0 && (
          <div className="grid gap-3 mb-3 lg:grid-cols-2">
            {featured.map((p) => (
              <FeaturedCard key={p.slug} p={p} />
            ))}
          </div>
        )}

        {/* Grid */}
        {rest.length > 0 && (
          <div
            className="grid gap-3"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(min(480px, 100%), 1fr))",
            }}
          >
            {rest.map((p) => (
              <ProjectCard key={p.slug} p={p} />
            ))}
          </div>
        )}

        {/* All-projects entry point */}
        <div className="flex flex-col items-center gap-3 mt-14">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 bg-violet-500 text-white hover:bg-violet-700 transition-colors duration-200 px-[22px] py-[11px] rounded-pill text-[14px] font-semibold tracking-[-0.14px] no-underline hover:opacity-90 active:scale-[0.98] transition-all duration-200"
          >
            View all projects
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path d="M2 6H10M7 3L10 6L7 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          {remaining > 0 && (
            <p className="text-[13px] text-muted tracking-[-0.13px] m-0">
              {remaining} more {remaining === 1 ? "case study" : "case studies"} in the archive
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
