const TESTIMONIALS = [
  {
    quote: `Working with you to build our Decision Support System
for local rice production was seamless. Before the
system, our stakeholders faced major challenges
gathering data and managing resources. This system
solved those hurdles by providing organized data and
real-time recommendations that significantly improve our
rice production planning and outcomes.`,
    author: "Daryl Jane Armada",
    role: "Smart Agriculture: Reliable Rice Production Decision-Making",
    initials: "DJ",
    avatarClass: "bg-[#7c3aed]",
    topLine: "from-transparent via-[#7c3aed]/60 to-transparent",
    glowShadow: "rgba(124,58,237,0.15)",
  },
  {
    quote: `Your patience and support helped us build a fully
functional Smart Pushcart system that met our exact
expectations. The system allows customers to track item
prices and estimate totals in real time, completely
transforming the shopping experience. Thank you for
your incredible effort throughout this development
process!`,
    author: "Abegail Marie",
    role: "Smart Pushcart System: Real-Time Price Tracking",
    initials: "AM",
    avatarClass: "bg-[#0284c7]",
    topLine: "from-transparent via-[#0284c7]/60 to-transparent",
    glowShadow: "rgba(2,132,199,0.15)",
  },
  {
    quote: `I am highly satisfied with the system's functionality. It is
easy to use, reliable, and performs efficiently whenever I
need it. The features help me accomplish tasks more
quickly, while the system's responsiveness and
consistency minimize delays. It is a highly effective,
dependable, and valuable asset.`,
    author: "Jay Czhelle Soberano",
    role: "Reliable Software Architecture: Efficient User Experience",
    initials: "JC",
    avatarClass: "bg-[#ea580c]",
    topLine: "from-transparent via-[#ea580c]/60 to-transparent",
    glowShadow: "rgba(234,88,12,0.15)",
  },
];

const TRACK = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

export function Testimonials() {
  return (
    <section className="py-24 overflow-hidden">
      {/* Header */}
      <div className="mx-auto px-6 max-w-[1200px] mb-14">
        <div className="flex items-end justify-between flex-wrap gap-6">
          <div>
            <p className="text-[12px] font-medium tracking-[0.10em] text-muted uppercase mb-3">
              What clients say
            </p>
            <h2 className="text-display-xl font-bold tracking-display-xl leading-display-section text-ink">
              Trusted by teams
              <br />
              that ship.
            </h2>
          </div>
          <span className="text-[13px] text-muted tracking-[-0.13px]">
            {TESTIMONIALS.length} {""} clients &middot; 0 missed deadlines
          </span>
        </div>
      </div>

      {/* Marquee */}
      <div className="relative marquee-wrapper">
        <div
          aria-hidden
          className="absolute left-0 top-0 bottom-0 w-24 pointer-events-none z-10"
          style={{
            background: "linear-gradient(to right, var(--canvas), transparent)",
          }}
        />
        <div
          aria-hidden
          className="absolute right-0 top-0 bottom-0 w-24 pointer-events-none z-10"
          style={{
            background: "linear-gradient(to left, var(--canvas), transparent)",
          }}
        />

        <div className="flex gap-4 marquee-track px-4">
          {TRACK.map(
            (
              {
                quote,
                author,
                role,
                initials,
                avatarClass,
                topLine,
                glowShadow,
              },
              i,
            ) => (
              <div
                key={i}
                className="group w-[380px] shrink-0 relative bg-s1 border border-hairline rounded-card overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:border-hairline-hover cursor-default hover:[box-shadow:0_20px_60px_rgba(0,0,0,0.45),0_0_0_1px_var(--card-glow)]"
                style={
                  {
                    "--card-glow": glowShadow.replace("0.15", "0.3"),
                  } as React.CSSProperties
                }
              >
                <div
                  aria-hidden
                  className={`absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r ${topLine} pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-300`}
                />
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-card"
                  style={{
                    background: `radial-gradient(ellipse 80% 40% at 50% 0%, ${glowShadow}, transparent)`,
                  }}
                />

                <div className="relative px-7 pt-8 pb-6">
                  <div className="text-[56px] leading-[0.8] font-serif text-gradient-palette mb-4 select-none">
                    &ldquo;
                  </div>
                  <p className="text-[15px] leading-[1.7] tracking-[-0.15px] text-ink/80 group-hover:text-ink/95 transition-colors duration-300">
                    {quote}
                  </p>
                </div>

                <div className="h-px mx-7 bg-hairline group-hover:bg-hairline-md transition-colors duration-300" />

                <div className="relative px-7 py-5 flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-bold text-white shrink-0 transition-transform duration-300 group-hover:scale-110 ${avatarClass}`}
                  >
                    {initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[14px] font-semibold tracking-[-0.14px] text-ink leading-tight">
                      {author}
                    </div>
                    <div className="text-[12px] tracking-[-0.12px] text-muted mt-0.5 truncate">
                      {role}
                    </div>
                  </div>
                  <span className="text-[10px] tracking-[0.06em] text-muted/60 shrink-0 group-hover:text-yellow-400/70 transition-colors duration-300">
                    ★★★★★
                  </span>
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
