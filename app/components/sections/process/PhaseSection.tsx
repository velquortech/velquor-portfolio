import Image from "next/image";
import { Check } from "lucide-react";
import type { Phase } from "../../../data/process";

type Props = {
  phase: Phase;
  /** Even indices put the plate right; odd flip it. Five long sections in a
   *  single rhythm read as one wall of text. */
  index: number;
};

export function PhaseSection({ phase, index }: Props) {
  const plateFirst = index % 2 === 1;

  return (
    <section
      id={phase.slug}
      className="scroll-mt-24 py-14 border-b border-hairline last:border-0"
    >
      <div className="grid gap-8 lg:gap-14 lg:grid-cols-2 lg:items-center">
        <div className={plateFirst ? "lg:order-2" : undefined}>
          <div className="flex items-baseline gap-4 mb-5">
            <span className="text-[13px] font-semibold tracking-[0.08em] text-gradient-palette">
              {phase.num}
            </span>
            <h2 className="text-display-lg font-display font-bold uppercase tracking-display-lg leading-display-card text-ink">
              {phase.title}
            </h2>
          </div>

          <p className="text-[15px] leading-[1.65] tracking-[-0.15px] text-ink mb-4">
            {phase.summary}
          </p>

          <p className="text-[15px] leading-[1.7] tracking-[-0.15px] text-muted mb-7">
            {phase.body}
          </p>

          <p className="text-[11px] font-semibold tracking-[0.10em] uppercase text-muted mb-4">
            What you get
          </p>
          <ul className="list-none p-0 m-0 flex flex-col gap-3">
            {phase.deliverables.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-s2 border border-hairline text-violet-300 shrink-0 mt-[2px]"
                >
                  <Check size={12} />
                </span>
                <span className="text-[14px] leading-[1.6] tracking-[-0.14px] text-ink">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Decorative: the plate bakes the numeral and phase name into the
            raster, and both are already set as real text beside it. An alt
            here would be read out twice. */}
        <div className={plateFirst ? "lg:order-1" : undefined}>
          <Image
            src={phase.plate}
            alt=""
            width={1200}
            height={800}
            loading={index === 0 ? "eager" : "lazy"}
            sizes="(max-width: 1024px) 100vw, 560px"
            className="w-full h-auto rounded-card border border-hairline"
          />
        </div>
      </div>
    </section>
  );
}
