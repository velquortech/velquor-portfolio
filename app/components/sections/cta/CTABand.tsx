import Link from "next/link";
import { StepField } from "../../brand/StepField";
import { ContactForm } from "../../contact/ContactForm";

type Props = {
  /** Path this band renders on — tags the lead's `Source Page` in Airtable. */
  sourcePage?: string;
  /** Case-study name when the band sits under a project page. */
  interestedIn?: string;
};

export function CTABand({ sourcePage = "/", interestedIn }: Props) {
  return (
    <section id="contact" className="px-6 py-6 scroll-mt-24">
      <div className="relative mx-auto max-w-[1200px] bg-spotlight-cta rounded-spotlight overflow-hidden px-6 sm:px-10 lg:px-[60px] py-16 sm:py-20">
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
            which had no basis in the identity. Dimmed behind the form so the
            inputs stay legible. */}
        <StepField
          flip
          className="absolute right-0 inset-y-0 h-full w-[620px] pointer-events-none opacity-20"
        />

        {/* Copy left, form right. The decorative code-window mock used to hold
            the right column; a working lead path earns the slot. */}
        <div className="relative z-10 grid gap-10 lg:gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,540px)] lg:items-center">
          <div>
            {/* Primary tagline as the band kicker */}
            <p className="text-[12px] font-semibold tracking-[0.10em] text-white/70 uppercase mb-5">
              Systems crafted to grow. Partnerships built to stay.
            </p>

            <h2 className="text-display-xl font-display font-bold uppercase tracking-display-xl leading-display-tight text-ink mb-5 max-w-[520px]">
              Have a project
              <br />
              in mind?
            </h2>

            <p className="text-[clamp(15px,1.8vw,18px)] leading-[1.55] tracking-[-0.18px] text-white/65 max-w-[460px] mb-7">
              Tell us what you&apos;re building. We&apos;ll reply within one
              business day with a clear path forward — no sales pitch, no
              commitment required.
            </p>

            {/* Two secondary routes, both deliberately ghost pills rather than
                the white inversion: the form's violet submit is the primary
                action in this band, and a white pill here would outrank it.
                White-on-violet per the inversion rule — this band's ground is
                already violet (bg-spotlight-cta). */}
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/book"
                className="inline-block bg-white/10 text-ink border border-white/15 hover:bg-white/15 transition-colors duration-200 px-[22px] py-[11px] rounded-pill text-[13px] font-medium tracking-[-0.13px] no-underline"
              >
                Book a one-hour call
              </Link>

              {/* The mailto survives, for people who prefer their own mail
                  client. It is no longer the only route. */}
              <a
                href="mailto:velquortechnologies@gmail.com"
                className="inline-block max-w-full break-all bg-white/10 text-ink border border-white/15 hover:bg-white/15 transition-colors duration-200 px-[22px] py-[11px] rounded-pill text-[13px] font-medium tracking-[-0.13px] no-underline"
              >
                Or email velquortechnologies@gmail.com
              </a>
            </div>
          </div>

          <ContactForm sourcePage={sourcePage} interestedIn={interestedIn} />
        </div>
      </div>
    </section>
  );
}
