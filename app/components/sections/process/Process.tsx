const STEPS = [
  {
    num: "01",
    title: "Discover",
    desc: "We learn your domain, your users, and your real constraints — before writing a single line of code.",
  },
  {
    num: "02",
    title: "Architect",
    desc: "We design systems that solve today's problems without creating tomorrow's technical debt.",
  },
  {
    num: "03",
    title: "Engineer",
    desc: "Two-week sprints with working software every cycle. Full transparency, no black-box development.",
  },
  {
    num: "04",
    title: "QA & Review",
    desc: "Automated test coverage, peer code reviews, and performance audits before every release.",
  },
  {
    num: "05",
    title: "Scale & Support",
    desc: "We stand by our work post-launch — monitoring, optimizing, and growing with your product.",
  },
];

export function Process() {
  return (
    <section id="process" className="relative py-24">

      <div aria-hidden className="absolute top-0 inset-x-0 h-px bg-horizon-gradient pointer-events-none" />

      <div className="mx-auto px-6 max-w-[1200px]">

        <div className="flex items-end justify-between flex-wrap gap-6 mb-16">
          <div>
            <p className="text-[12px] font-medium tracking-[0.10em] text-muted uppercase mb-3">
              How we work
            </p>
            <h2 className="text-display-xl font-bold tracking-display-xl leading-display-section text-ink">
              No surprises.
              <br />
              No excuses.
            </h2>
          </div>
          <span className="text-[13px] text-muted tracking-[-0.13px]">
            5 steps &middot; repeatable &middot; proven
          </span>
        </div>

        <div>
          {STEPS.map((step) => (
            <div
              key={step.num}
              className="group relative flex flex-col gap-3 md:flex-row md:items-start md:gap-8 py-8 border-b border-hairline last:border-0 pl-4"
            >
              <div
                aria-hidden
                className="absolute left-0 top-4 bottom-4 w-[2px] rounded-full bg-gradient-to-b from-violet via-magenta to-orange opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              />

              <div className="flex items-baseline gap-4 md:contents">
                <span className="shrink-0 w-10 text-[12px] font-semibold tracking-[0.08em] text-gradient-palette md:pt-[3px]">
                  {step.num}
                </span>

                <h3 className="shrink-0 md:w-44 text-[20px] font-bold tracking-[-0.8px] leading-[1.2] text-ink transition-colors duration-200">
                  {step.title}
                </h3>
              </div>

              <p className="flex-1 text-[15px] leading-[1.6] tracking-[-0.15px] text-muted">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div aria-hidden className="absolute bottom-0 inset-x-0 h-px bg-horizon-gradient pointer-events-none" />
    </section>
  );
}
