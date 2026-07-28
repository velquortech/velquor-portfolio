import Image from "next/image";
import Link from "next/link";
import { PROJECTS } from "../../../data/projects";

/** Three is enough to prove the point; /work is one click away for the rest. */
const COUNT = 3;

/**
 * Evidence, at the end of the argument.
 *
 * The rest of `/process` is abstract by design — five generated plates on one
 * violet ramp. This is the only place on the page where something real appears,
 * and it is deliberately last: the phases make the claim, this shows what came
 * out of it.
 *
 * These screenshots carry the *client's* brand, not ours — one of them is lime
 * on navy. That is fine framed inside a card, the way the homepage grid already
 * does it: a framed shot reads as "their product". Loose on the page it would
 * puncture the single-hue reading, which is why the images stay boxed, capped
 * in height, and behind a fade into the card surface.
 */
export function ProofStrip() {
  const shown = PROJECTS.slice(0, COUNT);

  return (
    <section className="pt-20">
      <div className="flex items-end justify-between flex-wrap gap-6 mb-8">
        <div>
          <p className="text-[12px] font-medium tracking-[0.10em] text-muted uppercase mb-4">
            Proof
          </p>
          <h2 className="text-display-lg font-display font-bold uppercase tracking-display-lg leading-display-card text-ink">
            What came out of it
          </h2>
        </div>
        <Link
          href="/work"
          className="text-[14px] font-medium text-muted hover:text-ink transition-colors no-underline border-b border-hairline-hover pb-0.5"
        >
          View all work →
        </Link>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p) => (
          <Link
            key={p.slug}
            href={`/work/${p.slug}`}
            className="group block bg-s1 border border-hairline hover:border-hairline-hover transition-colors duration-200 rounded-card overflow-hidden no-underline"
          >
            <div className="relative aspect-[16/10] bg-s2 overflow-hidden">
              <Image
                src={p.imageUrl}
                alt={p.imageAlt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
              />
              {/* Dissolves the screenshot into the card instead of ending it on
                  a hard edge against a foreign palette. */}
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-20 bg-fade-card-s1 pointer-events-none"
              />
            </div>

            <div className="px-5 py-5">
              <p className="text-[11px] font-semibold tracking-[0.10em] uppercase text-muted mb-2">
                {p.category}
              </p>
              {/* 20px is the floor for the display face. The card is wide
                  enough to carry it. */}
              <h3 className="text-[20px] font-display font-bold uppercase tracking-display-md leading-[1.2] text-ink mb-2">
                {p.name}
              </h3>
              <p className="text-[13px] leading-[1.55] tracking-[-0.13px] text-violet-300 m-0">
                {p.result}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
