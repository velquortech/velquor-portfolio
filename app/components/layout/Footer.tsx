import Image from "next/image";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { SOLUTIONS } from "../../data/solutions";

const SOCIALS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/velquor",
    Icon: Facebook,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/velquor",
    Icon: Linkedin,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/velquor",
    Icon: Instagram,
  },
];

const COLS = [
  {
    title: "Solutions",
    // Built from the data rather than typed out again: these were six copies of
    // `#services`, which resolved against whatever page you happened to be on.
    links: SOLUTIONS.map((s) => ({
      label: s.name,
      href: `/solutions#${s.slug}`,
    })),
  },
  {
    title: "Company",
    // About, Careers, and Blog were `href="#"` — dead jumps to the top of
    // whatever page you were on. They come back when there is a page behind
    // them, not before.
    links: [
      { label: "Work", href: "/work" },
      // A real route, not an anchor. `#process` resolved against whatever page
      // you were on, so from /work or /contact it went nowhere.
      { label: "Process", href: "/process" },
    ],
  },
  {
    title: "Contact",
    links: [
      {
        label: "velquortechnologies@gmail.com",
        href: "mailto:velquortechnologies@gmail.com",
      },
      { label: "Start a project", href: "/contact" },
      { label: "Request a quote", href: "/contact" },
      // Goes to the booking page now that one exists.
      { label: "Schedule a call", href: "/book" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative pt-16 pb-10 px-6">
      {/* Top gradient rule */}
      <div
        aria-hidden
        className="absolute top-0 inset-x-0 h-px bg-horizon-gradient pointer-events-none"
      />

      <div className="mx-auto max-w-[1200px]">
        {/* Link grid */}
        <div className="footer-grid grid gap-8 mb-16">
          {/* Brand column */}
          <div>
            {/* gap = 0.5x the mark's cap-height (24px mark -> 12px) per the
                hand-off lockup spec */}
            <div className="flex items-center gap-3 mb-1">
              <Image
                src="/images/velq-logo-white.png"
                alt="Velquor"
                width={36}
                height={23}
                className="h-6 w-auto"
              />
              <span className="font-bold text-[15px] tracking-[-0.5px] text-ink">
                VELQUOR TECHNOLOGIES CORP.
              </span>
            </div>
            {/* Primary tagline. Set in Inter, not the display face — the
                hand-off sets it in Space Grotesk caps at poster sizes, and
                display type below 20px is off-spec. */}
            <p className="text-[12px] font-semibold tracking-[0.08em] uppercase leading-[1.5] text-violet-300 mt-3 mb-3 max-w-[210px]">
              Systems crafted to grow. Partnerships built to stay.
            </p>

            <p className="text-[13px] leading-[1.65] text-muted tracking-[-0.13px] max-w-[210px]">
              Software development studio building production-grade systems for
              ambitious teams worldwide.
            </p>

            <address className="not-italic text-[13px] leading-[1.65] text-muted tracking-[-0.13px] max-w-[210px] mt-4">
              Taft Street, Barangay Zone IV (Pob.)
              <br />
              Santa Barbara, Iloilo
              <br />
              Region VI (Western Visayas), 5002
            </address>

            {/* Social links */}
            <div className="flex items-center gap-2.5 mt-5">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-s1 border border-hairline text-muted hover:text-ink hover:border-hairline-hover transition-colors duration-200 no-underline"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {COLS.map(({ title, links }) => (
            <div key={title}>
              <div className="text-[11px] font-semibold tracking-[0.10em] uppercase text-ink mb-4">
                {title}
              </div>
              <ul className="flex flex-col gap-2.5 list-none p-0 m-0">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-[13px] text-muted hover:text-ink transition-colors duration-200 no-underline block tracking-[-0.13px]"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-hairline pt-6 flex flex-wrap items-center justify-between gap-3">
          <span className="text-[13px] text-muted tracking-[-0.13px]">
            © {new Date().getFullYear()} Velquor Technologies Corporation. All
            rights reserved.
          </span>
          <div className="flex items-center gap-6">
            <span className="text-[13px] text-muted tracking-[-0.13px]">
              Built with Next.js · Deployed on Vercel
            </span>
          </div>
        </div>
      </div>

      <style>{`
        .footer-grid { grid-template-columns: 1.5fr repeat(3, 1fr); }
        @media (max-width: 900px) { .footer-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px) { .footer-grid { grid-template-columns: 1fr; } }
      `}</style>
    </footer>
  );
}
