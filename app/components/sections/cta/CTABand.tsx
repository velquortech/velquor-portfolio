import { StepField } from "../../brand/StepField";

export function CTABand() {
  return (
    <section id="contact" className="px-6 py-6">
      <div className="relative mx-auto max-w-[1200px] bg-spotlight-cta rounded-spotlight overflow-hidden px-6 sm:px-10 lg:px-[60px] py-16 sm:py-20 flex flex-col items-start gap-8">
        {/* Orb glow */}
        <div
          aria-hidden
          className="absolute -top-15 -right-15 w-[400px] h-[400px] bg-orb-cta pointer-events-none"
        />

        {/* Dot-grid texture */}
        <svg
          aria-hidden
          className="absolute inset-0 w-full h-full pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="cta-dots"
              x="0"
              y="0"
              width="22"
              height="22"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1" cy="1" r="0.85" fill="white" fillOpacity="0.10" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cta-dots)" />
        </svg>

        {/* Signature stepped-bar field — replaces the circuit-trace motif,
            which had no basis in the identity. */}
        <StepField
          flip
          className="absolute right-0 inset-y-0 h-full w-[620px] pointer-events-none opacity-45"
        />

        {/* Floating code window — desktop only */}
        <div className="absolute right-12 top-1/2 -translate-y-1/2 w-[496px] hidden lg:block z-20">
          <div className="bg-black/55 backdrop-blur-md border border-white/[0.09] rounded-[14px] overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.55)]">
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/[0.07] bg-white/[0.02]">
              <span className="w-2.5 h-2.5 rounded-full bg-white/[0.18]" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/[0.18]" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/[0.18]" />
              <span className="ml-auto font-mono text-[10px] text-white/25 tracking-wide">
                velquor.config.ts
              </span>
            </div>

            <div className="px-5 py-4 font-mono text-[11.5px] leading-[1.9]">
              <div>
                <span className="text-violet-300/75">const</span>
                <span className="text-white/45"> project </span>
                <span className="text-white/30">=</span>
                <span className="text-white/45"> await </span>
                <span className="text-white/70">velquor</span>
                <span className="text-white/30">.</span>
                <span className="text-violet-100/60">init</span>
                <span className="text-white/30">{"({"}</span>
              </div>
              <div className="pl-4">
                <span className="text-violet-300/65">name</span>
                <span className="text-white/30">: </span>
                <span className="text-success/60">&quot;my-saas&quot;</span>
                <span className="text-white/30">,</span>
              </div>
              <div className="pl-4">
                <span className="text-violet-300/65">stack</span>
                <span className="text-white/30">: [</span>
                <span className="text-success/60">&quot;Next.js&quot;</span>
                <span className="text-white/30">, </span>
                <span className="text-success/60">&quot;Elixir&quot;</span>
                <span className="text-white/30">],</span>
              </div>
              <div className="pl-4">
                <span className="text-violet-300/65">deploy</span>
                <span className="text-white/30">: </span>
                <span className="text-success/60">&quot;production&quot;</span>
              </div>
              <div>
                <span className="text-white/30">{"});"}</span>
              </div>
              <div className="mt-2 text-white/25">
                <span>{"// "}</span>
                <span className="text-success/55">
                  {"✓ Shipped in 2 weeks"}
                </span>
              </div>
            </div>
          </div>

          <div className="absolute -top-3.5 -right-5 bg-violet-500/[0.14] border border-violet-500/[0.25] rounded-full px-3 py-1 text-[11px] font-medium text-violet-300 backdrop-blur-sm">
            TypeScript
          </div>
          <div className="absolute -bottom-3.5 -left-5 bg-violet-300/[0.12] border border-violet-300/[0.25] rounded-full px-3 py-1 text-[11px] font-medium text-violet-100 backdrop-blur-sm">
            Production&nbsp;Ready
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Primary tagline as the band kicker */}
          <p className="text-[12px] font-semibold tracking-[0.10em] text-white/70 uppercase mb-5">
            Systems crafted to grow. Partnerships built to stay.
          </p>

          <h2 className="text-display-xxl font-display font-bold uppercase tracking-display-xxl leading-display-tight text-ink mb-5 max-w-[620px]">
            Have a project
            <br />
            in mind?
          </h2>

          <p className="text-[clamp(15px,1.8vw,18px)] leading-[1.55] tracking-[-0.18px] text-white/65 max-w-[460px] mb-9">
            Tell us what you&apos;re building. We&apos;ll reply within one
            business day with a clear path forward — no sales pitch, no
            commitment required.
          </p>

          <div className="flex flex-wrap gap-3">
            {/* Stays a white pill on purpose. This band's ground is already
                violet (bg-spotlight-cta), and the identity inverts to white on
                violet grounds — see the card, tote and notebook applications.
                A violet-500 pill here would sit on violet-500 and disappear. */}
            <a
              href="mailto:velquortechnologies@gmail.com"
              className="bg-ink text-canvas hover:bg-violet-100 transition-colors duration-200 px-[26px] py-[13px] rounded-pill text-[14px] font-semibold tracking-[-0.14px] no-underline"
            >
              Start a conversation →
            </a>
            <a
              href="mailto:velquortechnologies@gmail.com"
              className="max-w-full break-all text-center bg-white/10 text-ink border border-white/15 px-[26px] py-[13px] rounded-pill text-[14px] font-medium tracking-[-0.14px] no-underline"
            >
              velquortechnologies@gmail.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
