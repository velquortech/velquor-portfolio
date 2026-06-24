"use client";

import Image from "next/image";
import { useTheme } from "../ThemeProvider";

const COLS = [
  {
    title: "Services",
    links: [
      { label: "Custom Software", href: "#services" },
      { label: "Web Platforms", href: "#services" },
      { label: "Mobile Apps", href: "#services" },
      { label: "API Architecture", href: "#services" },
      { label: "Cloud & DevOps", href: "#services" },
      { label: "UI/UX Engineering", href: "#services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Work", href: "#work" },
      { label: "Process", href: "#process" },
      { label: "Careers", href: "#" },
      { label: "Blog", href: "#" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "hello@velquor.com", href: "mailto:hello@velquor.com" },
      { label: "Start a project", href: "#contact" },
      { label: "Request a quote", href: "#contact" },
      { label: "Schedule a call", href: "#contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Policy", href: "#" },
    ],
  },
];

export function Footer() {
  const { theme } = useTheme();

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
            <div className="flex items-center gap-2.5 mb-1">
              <Image
                src={
                  theme === "light"
                    ? "/images/velq-logo-blac.png"
                    : "/images/velq-logo-white.png"
                }
                alt="Velquor"
                width={36}
                height={23}
                className="h-6 w-auto"
              />
              <span className="font-bold text-[15px] tracking-[-0.5px] text-ink">
                VELQUOR TECHNOLOGIES CORP.
              </span>
            </div>
            {/* <p className="text-[11px] font-medium tracking-[0.08em] uppercase text-muted mb-4"> */}
            {/*   Est. 2019 · Remote-first */}
            {/* </p> */}
            <p className="text-[13px] leading-[1.65] text-muted tracking-[-0.13px] max-w-[210px]">
              Software development studio building production-grade systems for
              ambitious teams worldwide.
            </p>
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
            © {new Date().getFullYear()} Velquor. All rights reserved.
          </span>
          <div className="flex items-center gap-6">
            <span className="text-[13px] text-muted tracking-[-0.13px]">
              Built with Next.js · Deployed on Vercel
            </span>
          </div>
        </div>
      </div>

      <style>{`
        .footer-grid { grid-template-columns: 1.5fr repeat(4, 1fr); }
        @media (max-width: 900px) { .footer-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px) { .footer-grid { grid-template-columns: 1fr; } }
      `}</style>
    </footer>
  );
}
