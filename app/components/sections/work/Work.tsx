import Image from "next/image";
import Link from "next/link";
import { PROJECTS, type Project } from "../../../data/projects";

function ProjectTags({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <span
          key={tag}
          className="bg-s2 border border-hairline rounded-[6px] px-[10px] py-1 text-[12px] font-medium text-muted tracking-[-0.12px]"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function ResultBadge({ result }: { result: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 badge-success rounded-pill px-3 py-1 text-[12px] font-medium tracking-[-0.12px]">
      <span className="text-[8px]">▲</span>
      {result}
    </span>
  );
}

function ViewLink() {
  return (
    <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-muted group-hover:text-ink transition-colors">
      View case study
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
        <path d="M2 6H10M7 3L10 6L7 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function FeaturedCard({ p }: { p: Project }) {
  return (
    <Link
      href={`/work/${p.slug}`}
      className="group relative block bg-s1 border-violet-glow hover:-translate-y-1 transition-all duration-300 rounded-spotlight overflow-hidden no-underline"
    >
      {/* Image header */}
      <div className="relative h-[260px] overflow-hidden">
        <Image
          src={p.imageUrl}
          alt={p.imageAlt}
          fill
          sizes="(min-width: 1024px) 590px, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div aria-hidden className={`absolute inset-0 opacity-80 ${p.headerClass}`} />
        <div
          aria-hidden
          className="absolute bottom-0 inset-x-0 h-28 bg-fade-card-s1 pointer-events-none"
        />

        {/* Featured marker */}
        <span className="absolute top-5 left-7 z-10 inline-flex items-center gap-1.5 badge-violet rounded-pill px-3 py-1 text-[11px] font-medium tracking-[0.06em] uppercase">
          <span className="text-[9px]">★</span>
          Featured
        </span>

        <div className="absolute bottom-5 left-7 z-10">
          <span className="text-[11px] font-medium tracking-[0.10em] uppercase text-white/50">
            {p.category}
          </span>
          <div className="text-display-lg font-bold tracking-display-lg leading-display-card text-ink mt-1">
            {p.name}
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="px-7 py-7">
        <p className="text-[16px] leading-[1.55] tracking-[-0.16px] text-muted mb-5">
          {p.desc}
        </p>
        <div className="mb-5">
          <ResultBadge result={p.result} />
        </div>
        <div className="flex items-center justify-between gap-4">
          <ProjectTags tags={p.tags} />
          <ViewLink />
        </div>
      </div>
    </Link>
  );
}

function ProjectCard({ p }: { p: Project }) {
  return (
    <Link
      href={`/work/${p.slug}`}
      className="group block bg-s1 border border-hairline hover:border-hairline-hover hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.55)] transition-all duration-300 rounded-card overflow-hidden no-underline"
    >
      {/* Image header */}
      <div className="relative h-[220px] overflow-hidden shrink-0">
        <Image
          src={p.imageUrl}
          alt={p.imageAlt}
          fill
          sizes="(min-width: 1024px) 590px, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div aria-hidden className={`absolute inset-0 opacity-80 ${p.headerClass}`} />
        <div
          aria-hidden
          className="absolute bottom-0 inset-x-0 h-28 bg-fade-card-s1 pointer-events-none"
        />
        <div className="absolute bottom-5 left-7 z-10">
          <span className="text-[11px] font-medium tracking-[0.10em] uppercase text-white/50">
            {p.category}
          </span>
          <div className="text-display-md font-bold tracking-[-2px] leading-[1.0] text-ink mt-1">
            {p.name}
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="px-7 py-6">
        <p className="text-[15px] leading-[1.55] tracking-[-0.15px] text-muted mb-5">
          {p.desc}
        </p>
        <div className="mb-5">
          <ResultBadge result={p.result} />
        </div>
        <div className="flex items-center justify-between gap-4">
          <ProjectTags tags={p.tags} />
          <ViewLink />
        </div>
      </div>
    </Link>
  );
}

export function Work() {
  const featured = PROJECTS.filter((p) => p.featured);
  const rest = PROJECTS.filter((p) => !p.featured);

  return (
    <section id="work" className="py-24">
      <div className="mx-auto px-6 max-w-[1200px]">
        {/* Header */}
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
          <div>
            <p className="text-[12px] font-medium tracking-[0.10em] text-muted uppercase mb-3">
              Selected work
            </p>
            <h2 className="text-display-xl font-bold tracking-display-xl leading-display-section text-ink">
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
              gridTemplateColumns: "repeat(auto-fill, minmax(480px, 1fr))",
            }}
          >
            {rest.map((p) => (
              <ProjectCard key={p.slug} p={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
