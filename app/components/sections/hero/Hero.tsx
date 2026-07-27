import { TechIllustration } from "./TechIllustration";

const STATS = [
  { value: "20+", label: "Systems shipped" },
  { value: "2 yrs", label: "In production" },
  { value: "25+", label: "Clients" },
];

export function Hero() {
  return (
    <section className="relative flex items-center min-h-screen pt-14 overflow-hidden">
      {/* ── Gradient atmosphere ── */}
      <div
        aria-hidden
        className="absolute inset-0 bg-hero-mesh pointer-events-none z-0"
      />
      {/* One bloom only. The four-orb arrangement here rotated through four
          hues; the identity's atmosphere is a single violet dome, which
          bg-hero-mesh now carries. */}
      <div
        aria-hidden
        className="absolute -top-[12%] left-1/2 -translate-x-1/2 w-[420px] h-[420px] sm:w-[620px] sm:h-[620px] lg:w-[820px] lg:h-[820px] bg-orb-violet blur-[90px] pointer-events-none z-0"
      />
      <div
        aria-hidden
        className="absolute bottom-0 inset-x-0 h-px bg-horizon-gradient pointer-events-none z-[2]"
      />

      {/* ── Content grid ── */}
      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left — text */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/25 rounded-pill px-[14px] py-[6px] text-[12px] font-medium tracking-[0.06em] text-violet-300 uppercase mb-7 w-fit">
            <span className="w-[6px] h-[6px] rounded-full bg-success shrink-0" />
            Software Development Studio
          </div>

          {/* Headline */}
          <h1 className="text-display-xxl font-display font-bold uppercase tracking-display-hero leading-display-tight text-ink mb-6">
            We craft
            <br />
            <span className="text-gradient-hero">software</span>
            <br />
            that moves.
          </h1>

          {/* Subhead */}
          <p className="text-[clamp(15px,1.5vw,17px)] leading-[1.6] tracking-[-0.16px] text-muted max-w-[440px] mx-auto lg:mx-0 mb-9">
            Velquor builds production-grade platforms, APIs, and mobile apps —
            engineered to scale from day one and maintained for years.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mb-12 justify-center lg:justify-start">
            <a
              href="#contact"
              className="inline-flex items-center gap-[6px] bg-violet-500 text-white hover:bg-violet-700 transition-colors duration-200 px-6 py-3 rounded-pill text-[14px] font-semibold tracking-[-0.14px] no-underline"
            >
              Start a project
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M2.5 7H11.5M8 3.5L11.5 7L8 10.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a
              href="#work"
              className="bg-transparent text-ink border border-hairline-strong px-6 py-3 rounded-pill text-[14px] font-medium tracking-[-0.14px] no-underline"
            >
              View our work
            </a>
          </div>

          {/* Stats */}
          <div className="flex gap-8 pt-7 border-t-gradient-palette justify-center lg:justify-start w-full">
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <div className="text-display-md font-display font-bold uppercase tracking-display-md leading-[1.05] text-ink">
                  {value}
                </div>
                <div className="text-[12px] text-muted tracking-[-0.12px] mt-0.5">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — tech illustration */}
        <div className="h-[300px] sm:h-[420px] lg:h-[72vh]">
          <TechIllustration />
        </div>
      </div>
    </section>
  );
}
