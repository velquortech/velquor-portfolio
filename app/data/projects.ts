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
    slug: "orbis",
    name: "Orbis",
    category: "Logistics & Fleet",
    desc: "Global fleet management platform tracking 2,000+ vehicles in real-time. Built for 99.9% uptime across 14 countries.",
    result: "2,000+ vehicles tracked live",
    tags: ["Next.js", "Python", "FastAPI", "PostgreSQL", "AWS"],
    headerClass: "bg-project-orbis",
    imageUrl:
      "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1280&q=80&auto=format&fit=crop",
    imageAlt: "Cargo ships and logistics port at dusk",
    featured: true,
    subtitle:
      "Global fleet management platform tracking thousands of vehicles in real time.",
    client: "Orbis Logistics",
    industry: "Logistics & Fleet",
    timeline: "9 months",
    services: [
      "Platform Development",
      "Real-Time Tracking",
      "API Architecture",
      "Cloud & DevOps",
      "Data Visualization",
    ],
    challenge:
      "Orbis was coordinating a growing fleet across 14 countries using a patchwork of regional tools that never agreed with one another. Dispatchers had no single source of truth, vehicle locations were minutes out of date, and downtime in one region routinely cascaded into others.",
    solution:
      "We delivered a unified command center that ingests live telemetry from every vehicle and renders it on a single map with route optimization and predictive maintenance alerts. A FastAPI backend on AWS handles the high-frequency location stream with automatic failover, so the platform holds 99.9% uptime even when a region goes dark.",
    results: [
      "2,000+ vehicles tracked live",
      "99.9% uptime across 14 countries",
      "35% reduction in fuel costs",
      "Unified operations across 3 continents",
    ],
    gallery: [
      { caption: "Fleet command center", tint: "bg-project-orbis" },
      { caption: "Route optimization map", tint: "bg-project-orbis" },
      { caption: "Vehicle telemetry panel", tint: "bg-spotlight-violet" },
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
