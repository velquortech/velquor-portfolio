import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, Clock, CalendarCheck } from "lucide-react";
import { Nav } from "../components/layout/Nav";
import { Footer } from "../components/layout/Footer";
import { ContactForm } from "../components/contact/ContactForm";
import { StepField } from "../components/brand/StepField";

const DESCRIPTION =
  "Tell Velquor what you're building. Every enquiry gets a reply within one business day — no sales pitch, no commitment required.";

export const metadata: Metadata = {
  title: "Contact",
  description: DESCRIPTION,
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    url: "/contact",
    title: "Contact — Velquor",
    description: DESCRIPTION,
    // Its own share card, rendered by scripts/generate-og.js alongside the
    // site-wide one. Ads and email signatures point here, so the preview
    // should say "start a project", not repeat the homepage tagline.
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
    title: "Contact — Velquor",
    description: DESCRIPTION,
    images: ["/images/og-contact.png"],
  },
};

function DetailCard({
  Icon,
  label,
  children,
}: {
  Icon: typeof Mail;
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

export default function ContactPage() {
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
            <span className="text-ink">Contact</span>
          </nav>

          {/* Same anchoring as the project detail hero — hidden below lg, where
              it would run beneath the copy. */}
          <StepField
            flip
            className="hidden lg:block absolute right-0 top-[70px] h-[300px] w-[400px] pointer-events-none opacity-25"
          />

          {/* Header */}
          <header className="relative max-w-[760px] mb-14">
            <p className="text-[12px] font-medium tracking-[0.10em] text-muted uppercase mb-4">
              Start a project
            </p>
            <h1 className="text-display-xl font-display font-bold uppercase tracking-display-xl leading-display-section text-ink mb-6">
              Tell us what
              <br />
              you&apos;re building.
            </h1>
            <p className="text-[clamp(16px,2vw,20px)] leading-[1.5] tracking-[-0.2px] text-muted">
              One form, one reply, one clear path forward. We read every
              enquiry ourselves — there is no sales team in between.
            </p>
          </header>

          {/* Form left, details right. The form is the page's job; the details
              answer the questions people ask before filling it in. */}
          <div className="grid gap-6 lg:gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
            <ContactForm sourcePage="/contact" />

            <aside className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <DetailCard Icon={Clock} label="Response time">
                Within <span className="text-violet-300">one business day</span>
                , Monday to Friday. Urgent? Say so in the message and we&apos;ll
                move it up.
              </DetailCard>

              {/* The reciprocal of the "Rather write it down" card on /book.
                  A link, not a second embed — the form is this page's job, and
                  two scheduling surfaces on one page split both. */}
              <DetailCard Icon={CalendarCheck} label="Rather talk it through">
                Skip the wait and{" "}
                <Link
                  href="/book"
                  className="text-violet-300 hover:text-violet-100 transition-colors no-underline"
                >
                  book a one-hour call
                </Link>
                . Google Meet, no commitment.
              </DetailCard>

              <DetailCard Icon={Mail} label="Prefer email">
                <a
                  href="mailto:velquortechnologies@gmail.com"
                  className="break-all text-violet-300 hover:text-violet-100 transition-colors no-underline"
                >
                  velquortechnologies@gmail.com
                </a>
              </DetailCard>

              <DetailCard Icon={MapPin} label="Office">
                <address className="not-italic">
                  Taft Street, Barangay Zone IV (Pob.)
                  <br />
                  Santa Barbara, Iloilo
                  <br />
                  Region VI (Western Visayas), 5002
                </address>
              </DetailCard>

              <DetailCard Icon={Clock} label="What happens next">
                <ol className="list-none p-0 m-0 flex flex-col gap-2 text-muted">
                  <li>
                    <span className="text-violet-300">01</span> — We read it and
                    reply with questions or a call slot.
                  </li>
                  <li>
                    <span className="text-violet-300">02</span> — A scope and
                    estimate, written down.
                  </li>
                  <li>
                    <span className="text-violet-300">03</span> — Build starts.
                    No commitment before that.
                  </li>
                </ol>
              </DetailCard>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
