"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const LINKS = [
  // The logo goes home too, but that is a convention people have to know. On a
  // deep page — a case study, /book — a named link is the obvious way back.
  { label: "Home",     href: "/"          },
  // Replaces the old "/#services" anchor. A real route, and the nav is already
  // at five items plus a CTA — this swaps rather than adds.
  { label: "Solutions", href: "/solutions" },
  // The real page, not the homepage section. As "/#work" it resolved against
  // whatever page you were on, so from /contact or /solutions it went nowhere.
  { label: "Work",     href: "/work"      },
  { label: "Process",  href: "/process"   },
  // The real page, not the in-page band — the band is a section, /contact is
  // an address you can put in an ad or a signature.
  { label: "Contact",  href: "/contact"   },
  // Text link, not the CTA slot. The pill stays on /contact: that path writes
  // to Airtable and works with JS off, while booking depends on a third-party
  // widget and on the Calendly account's timezone being right.
  { label: "Book a call", href: "/book"   },
];

function HamburgerIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M3 5H17M3 10H17M3 15H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function Nav() {
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 h-14 border-b border-hairline transition-all duration-300 ${
        scrolled ? "backdrop-blur-md" : "bg-canvas"
      }`}
      style={scrolled ? { backgroundColor: "var(--nav-blur-bg)" } : undefined}
    >
      <div className="mx-auto flex items-center h-full px-6 max-w-[1200px]">

        {/* Logo */}
        <Link href="/" className="flex items-center no-underline mr-6 lg:mr-10 shrink-0" aria-label="Velquor home">
          <Image
            src="/images/velq-logo-white.png"
            alt="Velquor"
            width={44}
            height={28}
            priority
            className="h-7 w-auto"
          />
        </Link>

        {/* Desktop links */}
        {/* Six links plus the CTA is a lot for the md breakpoint — the gap
            tightens there and opens back up at lg. */}
        <nav className="hidden md:flex flex-1 gap-5 lg:gap-8">
          {LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-[14px] font-medium tracking-[-0.14px] text-muted hover:text-ink transition-colors duration-200 no-underline"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Right group */}
        <div className="flex items-center gap-3 ml-auto">
          {/* Desktop CTA */}
          <Link
            href="/contact"
            className="hidden md:inline-flex items-center gap-1.5 bg-violet-500 text-white hover:bg-violet-700 transition-colors duration-200 px-[18px] py-2 rounded-pill text-[14px] font-semibold tracking-[-0.14px] no-underline"
          >
            Get in touch
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path d="M2 6H10M7 3L10 6L7 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-ink bg-transparent border-0 cursor-pointer p-1 flex items-center justify-center"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <CloseIcon /> : <HamburgerIcon />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden absolute top-14 inset-x-0 px-6 pb-6 pt-3 bg-s1 border-b border-hairline-md">
          {LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between text-[15px] font-medium text-ink py-[13px] border-b border-hairline no-underline"
            >
              {label}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-muted" aria-hidden>
                <path d="M2.5 7H11.5M8 3.5L11.5 7L8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="inline-block mt-5 bg-violet-500 text-white hover:bg-violet-700 transition-colors duration-200 px-[22px] py-[10px] rounded-pill text-[14px] font-semibold no-underline"
          >
            Get in touch →
          </Link>
        </div>
      )}
    </header>
  );
}
