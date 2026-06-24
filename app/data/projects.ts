export type GalleryItem = {
  caption: string;
  /** Gradient background class used to fill the mockup frame (fallback when no image). */
  tint?: string;
  /** Real image source; when present, rendered inside the frame instead of the tint. */
  src?: string;
  alt?: string;
};

export type Project = {
  slug: string;
  name: string;
  category: string;
  /** Short card description used on the homepage grid. */
  desc: string;
  /** Headline metric shown as a badge on the card. */
  result: string;
  tags: string[];
  headerClass: string;
  imageUrl: string;
  imageAlt: string;
  /** Highlight this project in the larger spotlight row above the grid. */
  featured?: boolean;

  /* ── Case-study fields (project detail page) ── */
  /** One-line summary shown under the title on the detail page. */
  subtitle: string;
  client: string;
  industry: string;
  timeline: string;
  services: string[];
  challenge: string;
  solution: string;
  /** Key outcome bullets. */
  results: string[];
  gallery: GalleryItem[];
};

export const PROJECTS: Project[] = [
  {
    slug: "tanimbes",
    name: "Tanim, Bes!",
    category: "AI Plant-Care Assistant",
    desc: "A cross-platform mobile app that gives anyone an AI-powered plant-care assistant — chat with a friendly Taglish bot to diagnose, care for, and grow any plant.",
    result: "An AI plant tito in your pocket",
    tags: ["React Native", "Expo", "Botpress", "Supabase", "TypeScript"],
    headerClass: "bg-project-tanimbes",
    imageUrl: "/images/projects-images/tanimbes/tanimbes-1.jpg",
    imageAlt: "Tanim, Bes! AI plant-care chat assistant app screen",
    featured: true,
    subtitle:
      "A cross-platform app that puts an AI-powered, Taglish-speaking plant-care assistant in everyone's pocket — chat to diagnose, care for, and grow any plant.",
    client: "Self-initiated consumer product",
    industry: "AgriTech / Consumer Gardening & Lifestyle · AI Conversational Assistant",
    timeline: "~3 months (January 2026 – March 2026)",
    services: [
      "Care tips for any plant — Taglish, multi-language assistant",
      "Quick plant topics — one-tap prompts on Home",
      "Read-aloud replies — expo-speech text-to-speech",
      "Plant-care FAQ tab",
      "24/7 always-on chat support",
    ],
    challenge:
      "Plant-care advice online is fragmented, overly technical, and intimidating for beginners. New plant owners typically juggle scattered blog posts, forum threads, and generic search results — none of which give quick, personalized, conversational answers in a tone that feels approachable. The goal was to lower the barrier to successful home gardening with a single, friendly, always-available assistant that anyone could talk to like a knowledgeable friend, not read like a manual.",
    solution:
      "Tanim, Bes! puts an AI-powered plant-care assistant in everyone's pocket. Instead of browsing, users simply chat — in casual Taglish — to diagnose problems, get care routines, and grow any plant with confidence. The conversational assistant is a Botpress-backed chatbot integrated directly via REST (not a webview), with text-to-speech, markdown-formatted replies, and a warm Gen Z persona. A curated Home grid of plants and care actions preloads tailored prompts into the chat for one-tap guidance, while Supabase email/password auth keeps sessions persistent alongside a guest mode for instant, no-signup access. The whole experience wears a polished 'Emerald & Gold' theme with smooth animations — built once and delivered across Android, iOS, and Web from a single Expo codebase.",
    results: [
      "Friendly Taglish AI assistant available 24/7",
      "Botpress chatbot integrated via REST with text-to-speech replies",
      "One-tap plant topics and care actions on Home",
      "Single Expo codebase shipping to Android, iOS, and Web",
    ],
    gallery: [
      {
        caption: "Taglish plant-care chat",
        src: "/images/projects-images/tanimbes/tanimbes-1.jpg",
        alt: "Tanim, Bes! conversational plant-care chat in Taglish",
      },
      {
        caption: "Quick plant topics on Home",
        src: "/images/projects-images/tanimbes/tanimbes-2.jpg",
        alt: "Tanim, Bes! Home screen with quick plant topics and care actions",
      },
    ],
  },
  {
    slug: "ridelink",
    name: "RideLink",
    category: "Peer-to-Peer Mobility Marketplace",
    desc: "A two-sided mobile marketplace where anyone can rent or list cars, motorcycles, and heavy equipment — with verified identities, owner approvals, and live GPS tracking of active rentals.",
    result: "3 years, 470+ commits, one codebase",
    tags: ["React Native", "Expo", "TypeScript", "Supabase", "NativeWind"],
    headerClass: "bg-project-ridelink",
    imageUrl: "/images/projects-images/ridelink/ridelink-1.jpg",
    imageAlt: "RideLink peer-to-peer vehicle rental app screens",
    featured: true,
    subtitle:
      "A two-sided vehicle-rental marketplace where every user is both renter and owner — built on a fully serverless stack with live GPS tracking.",
    client: "Self-initiated product",
    industry: "Mobility & Peer-to-Peer Transportation Rental",
    timeline:
      "~3 years of iterative development (Jul 2023 – Jun 2026, 470+ commits), including a 2026 platform re-architecture and UI overhaul",
    services: [
      "Mobile App Development (iOS & Android)",
      "Peer-to-Peer Marketplace Flows",
      "Live GPS Rental Tracking",
      "Serverless Backend & Security",
      "Design System & UI Consolidation",
    ],
    challenge:
      "Most vehicle-rental apps are one-directional — a fleet owner lists, a customer books. RideLink needed a true two-sided marketplace where any user is simultaneously a renter and an owner, across cars, motorcycles, and heavy equipment. That raised three hard problems at once: trust and safety, since peer-to-peer key handovers demand verified identities, owner approvals, admin moderation, and an authorization model that prevents data leaks; live accountability, since renters need confidence about a vehicle's location through continuous but battery-conscious GPS tracking; and a serverless backend with no custom API tier, which made the database itself the security boundary. Years of feature work had also left styling debt, mixed JS/TS, and ad-hoc components in need of a coherent design system.",
    solution:
      "We built a production-grade React Native app on Expo with a fully serverless Supabase backend — Postgres, Auth, and Storage with no custom server layer. Authorization is enforced at the database level so public anon keys never expose other users' data, with envelope encryption securing storage and keys held in device secure enclaves. A single user fluidly switches between renting and listing through multi-step registration, admin approval pipelines, and a full rental lifecycle (pending → approved → ongoing → completed). Battery-aware GPS tracking activates only during a rental — writing both live position and time-series trails to Postgres — then shuts off when idle. The whole app sits on a unified NativeWind design system of color, shadow, and typography tokens, reusable UI primitives, normalized data adapters, cached image rendering, and an incremental TypeScript migration.",
    results: [
      "Secure, single-codebase iOS/Android marketplace on a fully serverless stack",
      "Dual-role flows let every user rent and list across cars, motorcycles, and heavy equipment",
      "Database-level authorization with envelope encryption and secure-enclave keys",
      "Battery-aware live GPS tracking active only during ongoing rentals",
    ],
    gallery: [
      {
        caption: "Browse & book vehicles",
        src: "/images/projects-images/ridelink/ridelink-1.jpg",
        alt: "RideLink vehicle browsing and booking screen",
      },
      {
        caption: "Rental lifecycle management",
        src: "/images/projects-images/ridelink/ridelink-2.jpg",
        alt: "RideLink rental application and approval management screen",
      },
      {
        caption: "Live GPS rental tracking",
        src: "/images/projects-images/ridelink/ridelink-3.jpg",
        alt: "RideLink live GPS tracking of an ongoing rental",
      },
    ],
  },
  {
    slug: "hrmis",
    name: "HRMIS",
    category: "Government HR System",
    desc: "A centralized Human Resource Management Information System for government offices — consolidating employee records, payroll, leave, and reporting into one source of truth.",
    result: "Centralized HR across every office",
    tags: ["TypeScript", "React", "Node.js", "PostgreSQL", "REST API"],
    headerClass: "bg-project-hrmis",
    imageUrl: "/images/projects-images/hrmis/hrmis-gif.gif",
    imageAlt: "HRMIS dashboard walkthrough showing centralized HR records",
    featured: true,
    subtitle:
      "A centralized HR Management Information System built to unify employee data across government offices.",
    client: "Public Sector HR Division",
    industry: "Government & Public Sector",
    timeline: "7 months",
    services: [
      "Web Application Development",
      "HR System Architecture",
      "UI/UX Design",
      "Data Centralization",
      "Role-Based Access Control",
    ],
    challenge:
      "Across government offices, HR data lived in disconnected spreadsheets, paper files, and standalone systems that never spoke to one another. Employee records, payroll, leave balances, and service history were duplicated and inconsistent between departments — making information slow to retrieve, hard to audit, and nearly impossible to report on across the workforce as a whole.",
    solution:
      "We built HRMIS, a centralized Human Resource Management Information System that consolidates every office's HR data into a single, authoritative platform. Employee 201 files, payroll, leave, attendance, and reporting all live in one place, with role-based access so each office and HR officer sees exactly what they're permitted to. Standardized workflows replace manual paperwork, while consolidated dashboards give administrators a real-time view of the entire workforce.",
    results: [
      "Centralized HR data across all government offices",
      "Single source of truth for employee records",
      "Role-based access control for every office and officer",
      "Faster reporting with audit-ready records",
    ],
    gallery: [
      {
        caption: "Centralized HR dashboard",
        src: "/images/projects-images/hrmis/hrmis-1.png",
        alt: "HRMIS centralized dashboard view",
      },
      {
        caption: "Employee records management",
        src: "/images/projects-images/hrmis/hrmis-2.png",
        alt: "HRMIS employee records management screen",
      },
      {
        caption: "Reporting & administration",
        src: "/images/projects-images/hrmis/hrmis-3.png",
        alt: "HRMIS reporting and administration screen",
      },
    ],
  },
  {
    slug: "nfa-trading",
    name: "NFA Trading",
    category: "AgriTech & Government",
    desc: "A rice trading platform for the National Food Authority that lets Filipino farmers bid their harvest for fairer prices while tracking NFA rice inventory nationwide.",
    result: "Fairer bids for Filipino farmers",
    tags: ["Next.js", "React", "Node.js", "PostgreSQL", "REST API"],
    headerClass: "bg-project-nfa",
    imageUrl: "/images/projects-images/nfa-trading/nfa-1-dashboard.png",
    imageAlt: "NFA Trading dashboard showing rice trading activity",
    featured: true,
    subtitle:
      "A rice trading platform giving Filipino farmers fairer bids and the NFA full visibility over rice nationwide.",
    client: "National Food Authority (NFA)",
    industry: "Government & Agriculture",
    timeline: "9 months",
    services: [
      "Platform Development",
      "Marketplace & Bidding System",
      "Inventory Tracking",
      "API Architecture",
      "UI/UX Design",
    ],
    challenge:
      "Filipino rice farmers had little leverage over the price of their harvest — selling through layers of middlemen meant the people who grew the crops captured the least of its value. At the same time, the National Food Authority lacked a clear, real-time view of rice moving across the country, making it hard to track supply, manage inventory, and ensure farmers were treated fairly.",
    solution:
      "We built NFA Trading, a platform that puts farmers' harvests in front of traders through an open bidding marketplace, so growers can secure higher, fairer returns for their hard work. A central dashboard and inventory system let the NFA monitor and track rice across the Philippines in real time, while role-based access keeps farmers, traders, and agency staff working from the same trusted source of data.",
    results: [
      "Fairer, higher bids for farmers' harvests",
      "Nationwide tracking of NFA rice in real time",
      "Open marketplace connecting farmers and traders directly",
      "Centralized inventory and supply visibility for the NFA",
    ],
    gallery: [
      {
        caption: "Rice trading marketplace",
        src: "/images/projects-images/nfa-trading/nfa-2-marketplace.png",
        alt: "NFA Trading marketplace listing rice for bidding",
      },
      {
        caption: "Inventory tracking",
        src: "/images/projects-images/nfa-trading/nfa-6-inventory.png",
        alt: "NFA Trading nationwide rice inventory tracking screen",
      },
      {
        caption: "Trader marketplace view",
        src: "/images/projects-images/nfa-trading/trader-2-marketplace.png",
        alt: "NFA Trading trader-side marketplace and bidding view",
      },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
