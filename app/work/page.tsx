import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "../components/layout/Nav";
import { Footer } from "../components/layout/Footer";
import { CTABand } from "../components/sections/cta/CTABand";
import { FeaturedCard, ProjectCard } from "../components/sections/work/ProjectCards";
import { PROJECTS } from "../data/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Every project Velquor has shipped — platforms, mobile apps, and systems built for clubs, government, and consumer products.",
  alternates: { canonical: "/work" },
  openGraph: {
    type: "website",
    url: "/work",
    title: "Work — Velquor",
    description:
      "Every project Velquor has shipped — platforms, mobile apps, and systems built for clubs, government, and consumer products.",
  },
};

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-display-md font-bold tracking-[-1px] leading-[1.0] text-ink">
        {value}
      </span>
      <span className="text-[12px] font-medium tracking-[0.10em] uppercase text-muted">
        {label}
      </span>
    </div>
  );
}

export default function WorkPage() {
  const featured = PROJECTS.filter((p) => p.featured);
  const rest = PROJECTS.filter((p) => !p.featured);

  const industries = new Set(PROJECTS.map((p) => p.industry.split(/[·/]/)[0].trim()));

  return (
    <>
      <Nav />
      <main className="pt-28">
        <div className="mx-auto px-6 max-w-[1200px]">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[13px] text-muted tracking-[-0.13px] mb-8">
            <Link href="/" className="hover:text-ink transition-colors no-underline">
              Home
            </Link>
            <span aria-hidden className="text-muted/50">/</span>
            <span className="text-ink">Work</span>
          </nav>

          {/* Header */}
          <header className="max-w-[820px] mb-14">
            <p className="text-[12px] font-medium tracking-[0.10em] text-muted uppercase mb-4">
              The full archive
            </p>
            <h1 className="text-display-xl font-bold tracking-display-xl leading-display-section text-ink mb-6">
              Everything
              <br />
              we&apos;ve built.
            </h1>
            <p className="text-[clamp(16px,2vw,20px)] leading-[1.5] tracking-[-0.2px] text-muted">
              Platforms, mobile apps, and internal systems — shipped end to end. Each
              one is a real product with real users, not a concept piece.
            </p>
          </header>

          {/* Stats strip */}
          <div className="bg-s1 border border-hairline rounded-card px-8 py-8 grid gap-8 grid-cols-2 md:grid-cols-3 mb-16">
            <Stat value={String(PROJECTS.length)} label="Projects shipped" />
            <Stat value={String(industries.size)} label="Industries served" />
            <Stat value="End to end" label="Design & engineering" />
          </div>

          {/* Featured spotlight row */}
          {featured.length > 0 && (
            <section className="mb-3">
              <h2 className="sr-only">Featured projects</h2>
              <div className="grid gap-3 lg:grid-cols-2">
                {featured.map((p) => (
                  <FeaturedCard key={p.slug} p={p} />
                ))}
              </div>
            </section>
          )}

          {/* Everything else */}
          {rest.length > 0 && (
            <section className="mb-20">
              <h2 className="sr-only">All projects</h2>
              <div
                className="grid gap-3"
                style={{
                  gridTemplateColumns:
                    "repeat(auto-fill, minmax(min(480px, 100%), 1fr))",
                }}
              >
                {rest.map((p) => (
                  <ProjectCard key={p.slug} p={p} />
                ))}
              </div>
            </section>
          )}
        </div>

        <CTABand />
      </main>
      <Footer />
    </>
  );
}
