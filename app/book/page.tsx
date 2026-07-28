import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Video, ListChecks, PenLine } from "lucide-react";
import { Nav } from "../components/layout/Nav";
import { Footer } from "../components/layout/Footer";
import { BookingEmbed } from "../components/booking/BookingEmbed";
import { StepField } from "../components/brand/StepField";

const DESCRIPTION =
  "Book a one-hour intro call with Velquor. No sales pitch, no commitment — bring a rough idea, a spec, or a system that needs a second pair of eyes.";

export const metadata: Metadata = {
  title: "Book a call",
  description: DESCRIPTION,
  alternates: { canonical: "/book" },
  openGraph: {
    type: "website",
    url: "/book",
    title: "Book a call — Velquor",
    description: DESCRIPTION,
    // Borrowing the contact card until scripts/generate-og.js grows a `/book`
    // VARIANTS entry. Same lockup, same atmosphere — only the type differs.
    images: [
      {
        url: "/images/og-contact.png",
        width: 1200,
        height: 630,
        alt: "Velquor — start a project",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Book a call — Velquor",
    description: DESCRIPTION,
    images: ["/images/og-contact.png"],
  },
};

function DetailCard({
  Icon,
  label,
  children,
}: {
  Icon: typeof Clock;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-s1 border border-hairline rounded-card px-6 py-6">
      <div className="flex items-center gap-2.5 mb-3">
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-s2 border border-hairline text-violet-300 shrink-0">
          <Icon size={15} />
        </span>
        <span className="text-[11px] font-semibold tracking-[0.10em] uppercase text-muted">
          {label}
        </span>
      </div>
      <div className="text-[14px] leading-[1.6] tracking-[-0.14px] text-ink">
        {children}
      </div>
    </div>
  );
}

export default function BookPage() {
  return (
    <>
      <Nav />
      <main className="pt-28 pb-20">
        <div className="relative mx-auto px-6 max-w-[1200px]">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[13px] text-muted tracking-[-0.13px] mb-8">
            <Link
              href="/"
              className="hover:text-ink transition-colors no-underline"
            >
              Home
            </Link>
            <span aria-hidden className="text-muted/50">
              /
            </span>
            <span className="text-ink">Book a call</span>
          </nav>

          {/* Same anchoring as /contact and the project detail hero — hidden
              below lg, where it would run beneath the copy. */}
          <StepField
            flip
            className="hidden lg:block absolute right-0 top-[70px] h-[300px] w-[400px] pointer-events-none opacity-25"
          />

          {/* Header */}
          <header className="relative max-w-[760px] mb-14">
            <p className="text-[12px] font-medium tracking-[0.10em] text-muted uppercase mb-4">
              Intro call — one hour
            </p>
            <h1 className="text-display-xl font-display font-bold uppercase tracking-display-xl leading-display-section text-ink mb-6">
              Pick a time
              <br />
              that works.
            </h1>
            <p className="text-[clamp(16px,2vw,20px)] leading-[1.5] tracking-[-0.2px] text-muted">
              A full hour with the people who would build it — not a sales
              team. Bring a rough idea, a written spec, or an existing system
              that needs a second pair of eyes.
            </p>
          </header>

          {/* Calendar left, context right. Same split as /contact: the booking
              is the page's job, the cards answer what people ask before they
              commit to a slot. */}
          <div className="grid gap-6 lg:gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
            <BookingEmbed sourcePage="/book" />

            <aside className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <DetailCard Icon={Clock} label="How long">
                <span className="text-violet-300">One hour</span>, and we keep
                to it. Times are shown in your own timezone.
              </DetailCard>

              <DetailCard Icon={Video} label="Where">
                Google Meet. The link arrives in your confirmation email — no
                app to install, nothing to set up beforehand.
              </DetailCard>

              <DetailCard Icon={ListChecks} label="What we cover">
                <ol className="list-none p-0 m-0 flex flex-col gap-2 text-muted">
                  <li>
                    <span className="text-violet-300">01</span> — What you&apos;re
                    building, and what &quot;done&quot; looks like.
                  </li>
                  <li>
                    <span className="text-violet-300">02</span> — How we&apos;d
                    approach it, and where the risk sits.
                  </li>
                  <li>
                    <span className="text-violet-300">03</span> — Rough shape of
                    scope, timeline, and cost.
                  </li>
                </ol>
              </DetailCard>

              <DetailCard Icon={PenLine} label="Rather write it down">
                Send the details instead and we&apos;ll reply within one
                business day —{" "}
                <Link
                  href="/contact"
                  className="text-violet-300 hover:text-violet-100 transition-colors no-underline"
                >
                  use the contact form
                </Link>
                .
              </DetailCard>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
