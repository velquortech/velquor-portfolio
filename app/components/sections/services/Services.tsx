type Spotlight = {
  kind: "spotlight";
  bgClass: string;
  borderClass: string;
  chipLabel: string;
  headline: string;
  sub: string;
};

type Regular = {
  kind: "regular";
  cornerClass: string;
  glowClass: string;
  badgeClass: string;
  title: string;
  desc: string;
  techLabel: string;
};

const SERVICES: (Spotlight | Regular)[] = [
  {
    kind: "spotlight",
    bgClass: "bg-spotlight-violet",
    borderClass: "border-violet-glow",
    chipLabel: "Core Service",
    headline: "Custom software,\nbuilt to last.",
    sub: "End-to-end systems tailored to your domain — not your competitor's playbook.",
  },
  {
    kind: "regular",
    cornerClass: "bg-corner-magenta",
    glowClass: "glow-magenta",
    badgeClass: "badge-magenta",
    title: "Web Platforms & SaaS",
    desc: "Full-stack applications built for performance and growth — from MVP to enterprise scale.",
    techLabel: "React · Next.js · TypeScript",
  },
  {
    kind: "regular",
    cornerClass: "bg-corner-coral",
    glowClass: "glow-coral",
    badgeClass: "badge-coral",
    title: "Mobile Applications",
    desc: "Cross-platform iOS and Android apps with React Native, plus native builds when performance demands it.",
    techLabel: "React Native · Swift · Kotlin",
  },
  {
    kind: "spotlight",
    bgClass: "bg-spotlight-orange",
    borderClass: "border-orange-glow",
    chipLabel: "Backend & Data",
    headline: "API-first\narchitecture.",
    sub: "Scalable backends, microservices, and data pipelines designed for the long haul.",
  },
  {
    kind: "regular",
    cornerClass: "bg-corner-indigo",
    glowClass: "glow-indigo",
    badgeClass: "badge-indigo",
    title: "Cloud & DevOps",
    desc: "AWS and GCP infrastructure, Docker, Kubernetes, CI/CD pipelines, and zero-downtime deployments.",
    techLabel: "AWS · Docker · Kubernetes · Terraform",
  },
  {
    kind: "regular",
    cornerClass: "bg-corner-orange",
    glowClass: "glow-orange",
    badgeClass: "badge-orange",
    title: "UI/UX Engineering",
    desc: "Design systems, component libraries, and pixel-perfect interfaces that drive conversion.",
    techLabel: "Figma · Tailwind · Storybook",
  },
];

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M2.5 7H11.5M8 3.5L11.5 7L8 10.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Services() {
  return (
    <section id="services" className="relative py-24 overflow-hidden">
      {/* Section atmosphere */}
      <div
        aria-hidden
        className="absolute inset-0 bg-services-mesh pointer-events-none"
      />

      <div className="relative mx-auto px-6 max-w-[1200px]">
        {/* Section header */}
        <div className="mb-14">
          <p className="text-[12px] font-medium tracking-[0.10em] text-muted uppercase mb-3">
            What we do
          </p>
          <h2 className="text-display-xl font-bold tracking-display-xl leading-display-section text-ink max-w-[600px]">
            Every layer, <span className="text-gradient-palette">handled.</span>
          </h2>
        </div>

        {/* Cards grid */}
        <div
          className="grid gap-3"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
          }}
        >
          {SERVICES.map((s, i) =>
            s.kind === "spotlight" ? (
              <div
                key={i}
                className={`group relative overflow-hidden rounded-card min-h-[350px] flex flex-col ${s.bgClass} ${s.borderClass}`}
              >
                <div className="absolute bottom-0 inset-x-0 h-52 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />

                <div className="relative z-10 mt-auto p-8">
                  <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-pill px-3 py-1.5 text-[11px] font-medium tracking-[0.06em] text-white/70 uppercase mb-5">
                    {s.chipLabel}
                  </div>
                  <h3 className="text-display-lg font-bold tracking-display-lg leading-display-card text-ink whitespace-pre-line mb-3">
                    {s.headline}
                  </h3>
                  <p className="text-[15px] leading-[1.6] tracking-[-0.15px] text-white/65">
                    {s.sub}
                  </p>
                </div>
              </div>
            ) : (
              <div
                key={i}
                className="group relative overflow-hidden rounded-card flex flex-col bg-s1 border border-hairline hover:border-hairline-active hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)] transition-all duration-300"
              >
                <div
                  aria-hidden
                  className={`absolute top-0 right-0 w-48 h-48 pointer-events-none ${s.cornerClass}`}
                />

                <div className="relative flex flex-col flex-1 px-6 pb-6 pt-8">
                  <div
                    className={`w-2 h-2 rounded-full mb-6 shrink-0 ${s.glowClass}`}
                  />

                  <h3 className="text-[21px] font-bold tracking-[-1px] leading-[1.2] text-ink mb-3">
                    {s.title}
                  </h3>

                  <p className="text-[14px] leading-[1.65] tracking-[-0.14px] text-muted mb-6 flex-1">
                    {s.desc}
                  </p>

                  <span
                    className={`self-start rounded-pill px-3 py-1 text-[11px] font-medium tracking-[0.04em] mb-8 ${s.badgeClass}`}
                  >
                    {s.techLabel}
                  </span>

                  <div className="flex items-center gap-2 text-[13px] font-medium text-muted group-hover:text-ink transition-colors duration-200">
                    Learn more
                    <span className="group-hover:translate-x-1 transition-transform duration-200 inline-flex">
                      <Arrow />
                    </span>
                  </div>
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
