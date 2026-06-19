import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "../../components/layout/Nav";
import { Footer } from "../../components/layout/Footer";
import { CTABand } from "../../components/sections/cta/CTABand";
import { PROJECTS, getProject } from "../../data/projects";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found — Velquor" };
  return {
    title: `${project.name} — Velquor`,
    description: project.subtitle,
  };
}

function OverviewField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[11px] font-semibold tracking-[0.10em] uppercase text-muted">
        {label}
      </span>
      <span className="text-[15px] text-ink tracking-[-0.15px] leading-[1.5]">
        {value}
      </span>
    </div>
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const more = PROJECTS.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <>
      <Nav />
      <main className="pt-28">
        <article className="mx-auto px-6 max-w-[1200px]">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[13px] text-muted tracking-[-0.13px] mb-8">
            <Link href="/#work" className="hover:text-ink transition-colors no-underline">
              Portfolio
            </Link>
            <span aria-hidden className="text-muted/50">/</span>
            <span className="text-ink">{project.name}</span>
          </nav>

          {/* Title */}
          <header className="max-w-[760px] mb-12">
            <p className="text-[12px] font-medium tracking-[0.10em] text-muted uppercase mb-4">
              {project.category}
            </p>
            <h1 className="text-display-xl font-bold tracking-display-xl leading-display-section text-ink mb-5">
              {project.name}
            </h1>
            <p className="text-[clamp(16px,2vw,20px)] leading-[1.5] tracking-[-0.2px] text-muted">
              {project.subtitle}
            </p>
          </header>

          {/* Hero image */}
          <div className="relative h-[clamp(260px,42vw,520px)] rounded-spotlight overflow-hidden border border-hairline mb-16">
            <Image
              src={project.imageUrl}
              alt={project.imageAlt}
              fill
              priority
              sizes="(min-width: 1200px) 1200px, 100vw"
              className="object-cover"
            />
            <div aria-hidden className={`absolute inset-0 opacity-60 ${project.headerClass}`} />
          </div>

          {/* Project overview */}
          <section className="mb-16">
            <h2 className="text-display-md font-bold tracking-[-1px] text-ink mb-7">
              Project Overview
            </h2>
            <div className="bg-s1 border border-hairline rounded-card px-8 py-8 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <OverviewField label="Client" value={project.client} />
              <OverviewField label="Industry" value={project.industry} />
              <OverviewField label="Timeline" value={project.timeline} />
              <OverviewField label="Services" value={project.services.join(", ")} />
            </div>
          </section>

          {/* Challenge + Solution */}
          <section className="grid gap-12 lg:grid-cols-2 mb-16">
            <div>
              <h2 className="text-display-md font-bold tracking-[-1px] text-ink mb-5">
                The Challenge
              </h2>
              <p className="text-[16px] leading-[1.65] tracking-[-0.16px] text-muted">
                {project.challenge}
              </p>
            </div>
            <div>
              <h2 className="text-display-md font-bold tracking-[-1px] text-ink mb-5">
                Our Solution
              </h2>
              <p className="text-[16px] leading-[1.65] tracking-[-0.16px] text-muted">
                {project.solution}
              </p>
            </div>
          </section>

          {/* Gallery */}
          <section className="mb-16">
            <h2 className="text-display-md font-bold tracking-[-1px] text-ink mb-7">
              Project Gallery
            </h2>
            <div className="grid gap-3 md:grid-cols-3">
              {project.gallery.map((item) => (
                <figure
                  key={item.caption}
                  className="bg-s1 border border-hairline rounded-card overflow-hidden"
                >
                  {/* Browser-chrome mockup frame */}
                  <div className="flex items-center gap-1.5 px-4 py-3 border-b border-hairline">
                    <span className="w-2.5 h-2.5 rounded-full bg-hairline-md" />
                    <span className="w-2.5 h-2.5 rounded-full bg-hairline-md" />
                    <span className="w-2.5 h-2.5 rounded-full bg-hairline-md" />
                  </div>
                  <div className={`relative h-[200px] ${item.tint}`}>
                    <div aria-hidden className="absolute inset-0 bg-spotlight-texture" />
                  </div>
                  <figcaption className="px-5 py-4 text-[13px] font-medium text-muted tracking-[-0.13px]">
                    {item.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>

          {/* Results */}
          <section className="mb-20">
            <h2 className="text-display-md font-bold tracking-[-1px] text-ink mb-7">
              Results
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2 list-none p-0 m-0">
              {project.results.map((r) => (
                <li
                  key={r}
                  className="flex items-start gap-3 bg-s1 border border-hairline rounded-card px-6 py-5"
                >
                  <span className="mt-0.5 inline-flex items-center justify-center w-5 h-5 rounded-full badge-success text-[10px] shrink-0">
                    ▲
                  </span>
                  <span className="text-[15px] text-ink tracking-[-0.15px] leading-[1.5]">
                    {r}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* More projects */}
          <section className="mb-4">
            <div className="flex items-end justify-between flex-wrap gap-4 mb-7">
              <h2 className="text-display-md font-bold tracking-[-1px] text-ink">
                More projects
              </h2>
              <Link
                href="/#work"
                className="text-[14px] font-medium text-muted hover:text-ink transition-colors no-underline border-b border-hairline-hover pb-0.5"
              >
                View all →
              </Link>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {more.map((p) => (
                <Link
                  key={p.slug}
                  href={`/work/${p.slug}`}
                  className="group block bg-s1 border border-hairline hover:border-hairline-hover hover:-translate-y-1 transition-all duration-300 rounded-card overflow-hidden no-underline"
                >
                  <div className="relative h-[160px] overflow-hidden">
                    <Image
                      src={p.imageUrl}
                      alt={p.imageAlt}
                      fill
                      sizes="(min-width: 768px) 390px, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div aria-hidden className={`absolute inset-0 opacity-80 ${p.headerClass}`} />
                    <div
                      aria-hidden
                      className="absolute bottom-0 inset-x-0 h-20 bg-fade-card-s1 pointer-events-none"
                    />
                    <div className="absolute bottom-4 left-5 z-10">
                      <span className="text-[10px] font-medium tracking-[0.10em] uppercase text-white/50">
                        {p.category}
                      </span>
                      <div className="text-[22px] font-bold tracking-[-1px] leading-[1.0] text-ink mt-0.5">
                        {p.name}
                      </div>
                    </div>
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-[13px] leading-[1.5] tracking-[-0.13px] text-muted line-clamp-2">
                      {p.desc}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </article>

        <CTABand />
      </main>
      <Footer />
    </>
  );
}
