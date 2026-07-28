import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "../components/layout/Nav";
import { Footer } from "../components/layout/Footer";
import { CTABand } from "../components/sections/cta/CTABand";
import { PhaseSection } from "../components/sections/process/PhaseSection";
import { ProofStrip } from "../components/sections/process/ProofStrip";
import { StepField } from "../components/brand/StepField";
import { PHASES, PRINCIPLES } from "../data/process";

const DESCRIPTION =
  "How Velquor builds: five steps from discovery to post-launch support, with working software every two weeks and nothing hidden from the people paying for it.";

export const metadata: Metadata = {
  title: "Process",
  description: DESCRIPTION,
  alternates: { canonical: "/process" },
  openGraph: {
    type: "website",
    url: "/process",
    title: "Process — Velquor",
    description: DESCRIPTION,
    images: [
      {
        url: "/images/og-process.png",
        width: 1200,
        height: 630,
        alt: "Velquor — how we work",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Process — Velquor",
    description: DESCRIPTION,
    images: ["/images/og-process.png"],
  },
};

export default function ProcessPage() {
  return (
    <>
      <Nav />
      <main className="pt-28 pb-20">
        <div className="relative mx-auto px-6 max-w-[1200px]">
          {/* Breadcrumb */}
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
            <span className="text-ink">Process</span>
          </nav>

          {/* Same anchoring as /contact and /book. */}
          <StepField
            flip
            className="hidden lg:block absolute right-0 top-[70px] h-[300px] w-[400px] pointer-events-none opacity-25"
          />

          <header className="relative max-w-[760px] mb-14">
            <p className="text-[12px] font-medium tracking-[0.10em] text-muted uppercase mb-4">
              How we work
            </p>
            <h1 className="text-display-xl font-display font-bold uppercase tracking-display-xl leading-display-section text-ink mb-6">
              Five steps.
              <br />
              No surprises.
            </h1>
            <p className="text-[clamp(16px,2vw,20px)] leading-[1.5] tracking-[-0.2px] text-muted">
              The same sequence on every engagement, whether it is a two-week
              fix or a platform rebuild. You will know what happens next, what
              you get at the end of it, and what it costs to change your mind.
            </p>
          </header>

          {/* Overview strip. Readers who want the shape without the detail get
              it here; the anchors drop them straight into the phase they care
              about. */}
          <nav
            aria-label="Process phases"
            className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5 mb-6"
          >
            {PHASES.map((phase) => (
              <a
                key={phase.slug}
                href={`#${phase.slug}`}
                className="group bg-s1 border border-hairline hover:border-hairline-hover transition-colors duration-200 rounded-card px-5 py-5 no-underline"
              >
                <span className="block text-[12px] font-semibold tracking-[0.08em] text-gradient-palette mb-2">
                  {phase.num}
                </span>
                {/* Inter, not the display face: five across leaves ~215px per
                    card, and the display face is not set below 20px. */}
                <span className="block text-[15px] font-semibold uppercase tracking-[0.08em] leading-[1.3] text-ink mb-2">
                  {phase.title}
                </span>
                <span className="block text-[13px] leading-[1.55] tracking-[-0.13px] text-muted">
                  {phase.summary}
                </span>
              </a>
            ))}
          </nav>

          {/* The five phases, in full. */}
          <div>
            {PHASES.map((phase, index) => (
              <PhaseSection key={phase.slug} phase={phase} index={index} />
            ))}
          </div>

          {/* Principles — the "how", once, rather than repeated inside every
              phase. */}
          <section className="pt-16">
            <div className="max-w-[760px] mb-10">
              <p className="text-[12px] font-medium tracking-[0.10em] text-muted uppercase mb-4">
                What holds across all five
              </p>
              <h2 className="text-display-lg font-display font-bold uppercase tracking-display-lg leading-display-card text-ink">
                The parts we don&apos;t negotiate
              </h2>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {PRINCIPLES.map(({ title, desc }) => (
                <div
                  key={title}
                  className="relative bg-s1 border border-hairline rounded-card px-6 py-6 overflow-hidden"
                >
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-corner-violet pointer-events-none"
                  />
                  <div className="relative">
                    <h3 className="text-[20px] font-display font-bold uppercase tracking-display-md leading-[1.25] text-ink mb-3">
                      {title}
                    </h3>
                    <p className="text-[14px] leading-[1.6] tracking-[-0.14px] text-muted">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Evidence last: the phases make the claim, this shows the output. */}
          <ProofStrip />
        </div>

        <div className="mt-16">
          <CTABand sourcePage="/process" />
        </div>
      </main>
      <Footer />
    </>
  );
}
