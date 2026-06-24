import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const SITE_URL = "https://velquor.com";
const SITE_NAME = "Velquor";
const SITE_DESCRIPTION =
  "Velquor builds production-grade web platforms, mobile apps, and backend systems for ambitious companies. Engineered to scale from day one.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Velquor — Software Development Studio",
    template: "%s — Velquor",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "Velquor",
    "software development studio",
    "web development",
    "mobile app development",
    "React",
    "React Native",
    "Next.js",
    "backend systems",
    "product engineering",
    "Philippines software studio",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/images/velq-logo-white.png",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Velquor — Software Development Studio",
    description: SITE_DESCRIPTION,
    locale: "en_US",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Velquor — Software Development Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Velquor — Software Development Studio",
    description: SITE_DESCRIPTION,
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('velquor-theme');if(!t)t=window.matchMedia('(prefers-color-scheme:light)').matches?'light':'dark';if(t==='light')document.documentElement.classList.add('light');}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full bg-canvas text-ink antialiased">

        {/* ── Fixed circuit-trace background ── */}
        <div id="circuit-bg" aria-hidden className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 1440 900"
            preserveAspectRatio="xMidYMid slice"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* ── Left rail ── */}
            <path d="M72 0 V900" stroke="white" strokeWidth="1" strokeOpacity="0.07" />
            <path d="M72 130 H200 V80  H300" stroke="white" strokeWidth="1" strokeOpacity="0.07" />
            <path d="M72 290 H180 V370 H320" stroke="white" strokeWidth="1" strokeOpacity="0.06" />
            <path d="M72 490 H160"           stroke="white" strokeWidth="1" strokeOpacity="0.06" />
            <path d="M72 680 H220 V740 H360" stroke="white" strokeWidth="1" strokeOpacity="0.05" />
            <circle cx="72"  cy="130" r="3" fill="white" fillOpacity="0.14" />
            <circle cx="200" cy="130" r="3" fill="white" fillOpacity="0.12" />
            <circle cx="300" cy="80"  r="3" fill="white" fillOpacity="0.10" />
            <circle cx="72"  cy="290" r="3" fill="white" fillOpacity="0.12" />
            <circle cx="180" cy="370" r="3" fill="white" fillOpacity="0.10" />
            <circle cx="320" cy="370" r="3" fill="white" fillOpacity="0.10" />
            <circle cx="72"  cy="490" r="3" fill="white" fillOpacity="0.12" />
            <circle cx="160" cy="490" r="3" fill="white" fillOpacity="0.10" />
            <circle cx="72"  cy="680" r="3" fill="white" fillOpacity="0.12" />
            <circle cx="220" cy="740" r="3" fill="white" fillOpacity="0.10" />
            <circle cx="360" cy="740" r="3" fill="white" fillOpacity="0.08" />
            <rect x="68"  y="126" width="8" height="8" rx="1" fill="white" fillOpacity="0.16" />
            <rect x="196" y="126" width="8" height="8" rx="1" fill="white" fillOpacity="0.13" />
            <rect x="68"  y="486" width="8" height="8" rx="1" fill="white" fillOpacity="0.14" />

            {/* ── Right rail ── */}
            <path d="M1368 0 V900" stroke="white" strokeWidth="1" strokeOpacity="0.07" />
            <path d="M1368 180 H1240 V110 H1100" stroke="white" strokeWidth="1" strokeOpacity="0.07" />
            <path d="M1368 360 H1200 V440 H1060" stroke="white" strokeWidth="1" strokeOpacity="0.06" />
            <path d="M1368 560 H1280"             stroke="white" strokeWidth="1" strokeOpacity="0.06" />
            <path d="M1368 760 H1200 V700 H1060" stroke="white" strokeWidth="1" strokeOpacity="0.05" />
            <circle cx="1368" cy="180"  r="3" fill="white" fillOpacity="0.14" />
            <circle cx="1240" cy="180"  r="3" fill="white" fillOpacity="0.12" />
            <circle cx="1100" cy="110"  r="3" fill="white" fillOpacity="0.10" />
            <circle cx="1368" cy="360"  r="3" fill="white" fillOpacity="0.12" />
            <circle cx="1200" cy="440"  r="3" fill="white" fillOpacity="0.10" />
            <circle cx="1060" cy="440"  r="3" fill="white" fillOpacity="0.10" />
            <circle cx="1368" cy="560"  r="3" fill="white" fillOpacity="0.12" />
            <circle cx="1280" cy="560"  r="3" fill="white" fillOpacity="0.10" />
            <circle cx="1368" cy="760"  r="3" fill="white" fillOpacity="0.12" />
            <circle cx="1200" cy="700"  r="3" fill="white" fillOpacity="0.10" />
            <circle cx="1060" cy="700"  r="3" fill="white" fillOpacity="0.08" />
            <rect x="1364" y="176"  width="8" height="8" rx="1" fill="white" fillOpacity="0.16" />
            <rect x="1236" y="176"  width="8" height="8" rx="1" fill="white" fillOpacity="0.13" />
            <rect x="1364" y="556"  width="8" height="8" rx="1" fill="white" fillOpacity="0.14" />

            {/* ── Scattered interior traces ── */}
            <path d="M580 40 H720 V100 H860"  stroke="white" strokeWidth="0.8" strokeOpacity="0.05" />
            <circle cx="720" cy="40"  r="2.5" fill="white" fillOpacity="0.10" />
            <circle cx="720" cy="100" r="2.5" fill="white" fillOpacity="0.09" />
            <circle cx="860" cy="100" r="2.5" fill="white" fillOpacity="0.08" />
            <path d="M340 420 H460 V500 H560" stroke="white" strokeWidth="0.8" strokeOpacity="0.05" />
            <circle cx="460" cy="420" r="2.5" fill="white" fillOpacity="0.09" />
            <circle cx="460" cy="500" r="2.5" fill="white" fillOpacity="0.08" />
            <path d="M1100 480 H980 V540 H860" stroke="white" strokeWidth="0.8" strokeOpacity="0.05" />
            <circle cx="980" cy="480" r="2.5" fill="white" fillOpacity="0.09" />
            <circle cx="980" cy="540" r="2.5" fill="white" fillOpacity="0.08" />
            <path d="M560 820 H700 V760 H840" stroke="white" strokeWidth="0.8" strokeOpacity="0.05" />
            <circle cx="700" cy="820" r="2.5" fill="white" fillOpacity="0.09" />
            <circle cx="700" cy="760" r="2.5" fill="white" fillOpacity="0.08" />
            <path d="M72 580 H260 V640 H400"  stroke="white" strokeWidth="0.7" strokeOpacity="0.04" strokeDasharray="5 5" />
            <path d="M1368 420 H1180 V360 H1040" stroke="white" strokeWidth="0.7" strokeOpacity="0.04" strokeDasharray="5 5" />
          </svg>
        </div>

        {/* Page content — above background */}
        <div className="relative" style={{ zIndex: 2 }}>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </div>

      </body>
    </html>
  );
}
