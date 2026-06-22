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
  {
    slug: "pulse",
    name: "Pulse",
    category: "Analytics SaaS",
    desc: "Business intelligence platform processing over 1M events per minute. Multi-tenant, white-labeled, and self-serve.",
    result: "1M+ events per minute",
    tags: ["React", "Go", "Redis", "Kafka", "Kubernetes"],
    headerClass: "bg-project-pulse",
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1280&q=80&auto=format&fit=crop",
    imageAlt: "Data analytics dashboard with charts",
    subtitle:
      "Multi-tenant business intelligence platform built for massive event throughput.",
    client: "Pulse Analytics",
    industry: "Analytics SaaS",
    timeline: "8 months",
    services: [
      "SaaS Development",
      "Data Pipeline Engineering",
      "UI/UX Design",
      "Multi-Tenant Architecture",
      "Cloud Infrastructure",
    ],
    challenge:
      "Pulse wanted to sell business intelligence as a white-labeled, self-serve product, but their prototype buckled past a few thousand events per second and required hands-on setup for every new customer. Scaling the old architecture meant scaling the support team with it.",
    solution:
      "We engineered a Kafka-backed ingestion pipeline and Go services on Kubernetes that comfortably process over a million events per minute, with strict tenant isolation so each customer's data and branding stay separate. A guided onboarding flow lets new tenants stand themselves up in minutes without ever talking to support.",
    results: [
      "1M+ events processed per minute",
      "White-labeled across 80+ customers",
      "Self-serve onboarding in under 5 minutes",
      "60% lower infrastructure cost per event",
    ],
    gallery: [
      { caption: "Real-time analytics dashboard", tint: "bg-project-pulse" },
      { caption: "Custom report builder", tint: "bg-spotlight-orange" },
      { caption: "Tenant administration", tint: "bg-project-pulse" },
    ],
  },
  {
    slug: "helix",
    name: "Helix",
    category: "Healthcare Platform",
    desc: "HIPAA-compliant patient management system for 50+ clinics. Offline-first mobile app with end-to-end encryption.",
    result: "50+ clinics, HIPAA certified",
    tags: ["React Native", "Express", "MongoDB", "AWS", "TypeScript"],
    headerClass: "bg-project-helix",
    imageUrl:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1280&q=80&auto=format&fit=crop",
    imageAlt: "Medical professional using tablet in clinic",
    subtitle:
      "HIPAA-compliant patient management system with an offline-first mobile experience.",
    client: "Helix Health",
    industry: "Healthcare",
    timeline: "10 months",
    services: [
      "Mobile App Development",
      "Web Application Development",
      "Security & Compliance",
      "Offline-First Architecture",
      "UI/UX Design",
    ],
    challenge:
      "Helix serves clinics in areas where connectivity is unreliable, yet clinicians still needed instant access to sensitive patient records. Existing tools either failed offline or stored data in ways that couldn't pass a HIPAA audit, forcing staff back to paper.",
    solution:
      "We built an offline-first mobile app with end-to-end encryption that keeps working with no signal and syncs safely the moment a connection returns, backed by an Express and MongoDB platform on AWS. Every record is encrypted at rest and in transit, and granular access controls give each role exactly the data it needs and nothing more.",
    results: [
      "50+ clinics onboarded",
      "HIPAA certified end-to-end",
      "Full functionality offline with zero data loss",
      "45% faster patient intake",
    ],
    gallery: [
      { caption: "Clinician dashboard", tint: "bg-project-helix" },
      { caption: "Encrypted patient records", tint: "bg-spotlight-violet" },
      { caption: "Offline-first mobile app", tint: "bg-project-helix" },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
