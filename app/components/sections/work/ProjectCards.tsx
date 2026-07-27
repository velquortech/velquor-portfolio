import Image from "next/image";
import Link from "next/link";
import { type Project } from "../../../data/projects";

export function ProjectTags({ tags }: { tags: string[] }) {
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

export function ResultBadge({ result }: { result: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 badge-success rounded-pill px-3 py-1 text-[12px] font-medium tracking-[-0.12px]">
      <span className="text-[8px]">▲</span>
      {result}
    </span>
  );
}

export function ViewLink() {
  return (
    <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-muted group-hover:text-ink transition-colors">
      View case study
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
        <path d="M2 6H10M7 3L10 6L7 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export function FeaturedCard({ p }: { p: Project }) {
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
          <div className="text-display-lg font-display font-bold uppercase tracking-display-lg leading-display-card text-ink mt-1">
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

export function ProjectCard({ p }: { p: Project }) {
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
          <div className="text-display-md font-display font-bold uppercase tracking-display-md leading-[1.0] text-ink mt-1">
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
