import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "../components/layout/Nav";
import { Footer } from "../components/layout/Footer";
import { CTABand } from "../components/sections/cta/CTABand";
import { CapabilityMatrix } from "../components/sections/solutions/CapabilityMatrix";
import { StepField } from "../components/brand/StepField";
import { SOLUTIONS, INDUSTRIES, TRUST } from "../data/solutions";

/**
 * Direction: a spec sheet, not a brochure.
 *
 * The audience is someone deciding whether this studio can do the work and be
 * trusted with access to their systems — a founder, or the engineer procurement
 * sends to check. What that reader wants is the thing engineers actually read:
 * an index, a datasheet, and a table they can check. So the page is built from
 * those, not from a card grid.
 *
 * No numbered markers anywhere: six solutions are a set, not a sequence, and
 * numbering them would assert an order that does not exist. `/process` earns
 * its 01–05 because those steps genuinely happen in order.
 */

const DESCRIPTION =
  "What Velquor builds, and how we work with your systems: six solutions from custom software to UI/UX engineering, a matrix of which shipped where, and what you own when we are done.";

export const metadata: Metadata = {
  title: "Solutions",
  description: DESCRIPTION,
  alternates: { canonical: "/solutions" },
  openGraph: {
    type: "website",
    url: "/solutions",
    title: "Solutions — Velquor",
    description: DESCRIPTION,
    images: [
      {
        url: "/images/og-solutions.png",
        width: 1200,
        height: 630,
        alt: "Velquor — what we build",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Solutions — Velquor",
    description: DESCRIPTION,
    images: ["/images/og-solutions.png"],
  },
};

export default function SolutionsPage() {
  return (
    <>
      <Nav />
      <main className="relative pt-28 pb-20 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 bg-services-mesh pointer-events-none"
        />

        <div className="relative mx-auto px-6 max-w-[1200px]">
          <nav className="flex items-center gap-2 text-[13px] text-muted tracking-[-0.13px] mb-8">
            <Link
              href="/"
              className="hover:text-ink transition-colors no-underline"
            >
              Home
            </Link>
            <span aria-hidden className="text-muted/50">
              /
            </span>
            <span className="text-ink">Solutions</span>
          </nav>

          <StepField
            flip
            className="hidden lg:block absolute right-0 top-[60px] h-[260px] w-[360px] pointer-events-none opacity-20"
          />

          {/* Masthead. The lede is short because the index below it is the real
              opening statement — the six names are the most characteristic
              thing this page has to say. */}
          <header className="relative max-w-[720px] mb-12">
            <p className="text-[12px] font-medium tracking-[0.10em] text-muted uppercase mb-4">
              Solutions
            </p>
            <h1 className="text-display-xl font-display font-bold uppercase tracking-display-xl leading-display-section text-ink mb-6">
              Six things
              <br />
              we staff.
            </h1>
            <p className="text-[clamp(16px,2vw,20px)] leading-[1.5] tracking-[-0.2px] text-muted">
              Not twenty we could subcontract. Every one below has shipped, and
              the table further down says exactly where.
            </p>
          </header>

          {/* The index. Doubles as the page's table of contents and as the
              hero's content — a datasheet opens with its contents, not with a
              paragraph about itself. */}
          <nav aria-label="Solutions index" className="mb-24 border-t border-hairline">
            {SOLUTIONS.map((s) => (
              <a
                key={s.slug}
                href={`#${s.slug}`}
                className="group flex items-baseline justify-between gap-6 flex-wrap py-5 border-b border-hairline no-underline transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-300"
              >
                <span className="text-[clamp(22px,3.2vw,34px)] font-display font-bold uppercase tracking-display-lg leading-[1.1] text-ink group-hover:text-violet-300 transition-colors duration-200">
                  {s.name}
                </span>
                <span className="text-[12px] tracking-[0.06em] uppercase text-muted">
                  {s.stack.join(" · ")}
                </span>
              </a>
            ))}
          </nav>

          {/* The six, as datasheet rows: label column left, spec column right.
              Rows, not cards — a card grid says "six equivalent products", a
              ruled datasheet says "one document, six entries". */}
          <div>
            {SOLUTIONS.map((s) => (
              <section
                key={s.slug}
                id={s.slug}
                className="scroll-mt-24 grid gap-6 lg:gap-16 lg:grid-cols-[260px_minmax(0,1fr)] py-14 border-b border-hairline"
              >
                <div>
                  <h2 className="text-display-lg font-display font-bold uppercase tracking-display-lg leading-display-card text-ink mb-4">
                    {s.name}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {s.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-pill px-3 py-1 text-[11px] font-medium tracking-[0.04em] badge-violet"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="max-w-[640px]">
                  <p className="text-[clamp(16px,1.8vw,19px)] leading-[1.5] tracking-[-0.19px] text-ink mb-5">
                    {s.summary}
                  </p>
                  <p className="text-[15px] leading-[1.7] tracking-[-0.15px] text-muted mb-8">
                    {s.body}
                  </p>

                  <dl className="m-0">
                    <dt className="text-[11px] font-semibold tracking-[0.10em] uppercase text-muted mb-4">
                      What that includes
                    </dt>
                    {s.includes.map((item) => (
                      <dd
                        key={item}
                        className="m-0 flex items-start gap-4 py-3 border-t border-hairline"
                      >
                        <span
                          aria-hidden
                          className="mt-[9px] w-4 h-px bg-violet-300 shrink-0"
                        />
                        <span className="text-[14px] leading-[1.6] tracking-[-0.14px] text-ink">
                          {item}
                        </span>
                      </dd>
                    ))}
                  </dl>
                </div>
              </section>
            ))}
          </div>

          {/* Signature: the receipts, as a table you can check. */}
          <section className="pt-20">
            <div className="max-w-[720px] mb-10">
              <p className="text-[12px] font-medium tracking-[0.10em] text-muted uppercase mb-4">
                Receipts
              </p>
              <h2 className="text-display-lg font-display font-bold uppercase tracking-display-lg leading-display-card text-ink mb-4">
                Which one shipped where
              </h2>
              <p className="text-[15px] leading-[1.65] tracking-[-0.15px] text-muted">
                Five case studies across{" "}
                {INDUSTRIES.map((industry, i) => (
                  <span key={industry.name}>
                    <span className="text-ink">{industry.name}</span>
                    {i < INDUSTRIES.length - 2
                      ? ", "
                      : i === INDUSTRIES.length - 2
                        ? ", and "
                        : ""}
                  </span>
                ))}
                . If a market is not on this list, we have not built in it — and
                we will say so rather than learn on your budget.
              </p>
            </div>

            <CapabilityMatrix />
          </section>

          {/* Terms. Deliberately the quietest block on the page: no icons, no
              cards, no wash. Procurement reads terms, and terms that arrive
              dressed up read as marketing. */}
          <section className="pt-24">
            <div className="max-w-[720px] mb-10">
              <p className="text-[12px] font-medium tracking-[0.10em] text-muted uppercase mb-4">
                Terms of engagement
              </p>
              <h2 className="text-display-lg font-display font-bold uppercase tracking-display-lg leading-display-card text-ink mb-4">
                What you own, and who has access
              </h2>
              <p className="text-[15px] leading-[1.65] tracking-[-0.15px] text-muted">
                The questions procurement asks, answered before you have to ask
                them.
              </p>
            </div>

            <dl className="m-0 border-t border-hairline">
              {TRUST.map(({ title, desc }) => (
                <div
                  key={title}
                  className="grid gap-2 lg:gap-16 lg:grid-cols-[260px_minmax(0,1fr)] py-6 border-b border-hairline"
                >
                  <dt className="text-[15px] font-display font-bold uppercase tracking-display-md leading-[1.25] text-ink">
                    {title}
                  </dt>
                  <dd className="m-0 max-w-[640px] text-[15px] leading-[1.65] tracking-[-0.15px] text-muted">
                    {desc}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        </div>

        <div className="relative mt-20">
          <CTABand sourcePage="/solutions" />
        </div>
      </main>
      <Footer />
    </>
  );
}
