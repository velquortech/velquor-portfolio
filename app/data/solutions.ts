import { PROJECT_TYPES } from "../lib/contact-options";

/**
 * What we take on.
 *
 * `projectType` is not decoration — it is the exact string from
 * `PROJECT_TYPES` in `app/lib/contact-options.ts`, which is also the Airtable
 * `Leads` → `Project Type` single-select. All three have to agree:
 *
 *   this file  ->  contact-options.ts  ->  the Airtable field
 *
 * `createLead` writes with `typecast: true`, so a mismatch does not error — it
 * silently coerces or drops the value. Adding a solution here without adding it
 * to the other two means a client reads about work they cannot then ask for.
 *
 * `projectType` is typed as a member of `PROJECT_TYPES`, so a drift between
 * this file and `contact-options.ts` fails the build rather than shipping.
 * The Airtable side has no such guard — that one is on you.
 */

export type Solution = {
  /** Anchor id — `/solutions#mobile-app` is linkable from an ad. */
  slug: string;
  name: string;
  /** Must exist verbatim in PROJECT_TYPES. */
  projectType: (typeof PROJECT_TYPES)[number];
  summary: string;
  body: string;
  /** Three concrete things, not a feature dump. */
  includes: string[];
  stack: string[];
  /** Case studies that used it. Proof beats illustration. */
  projects: string[];
};

export const SOLUTIONS: Solution[] = [
  {
    slug: "custom-software",
    name: "Custom Software",
    projectType: "Custom Software",
    summary:
      "End-to-end systems built for your domain, not adapted from someone else's.",
    body: "The work that does not fit an off-the-shelf product: internal systems, operational platforms, the process that currently runs on a spreadsheet and three people remembering things. We start from how the business actually works and build to that — slower to specify, considerably cheaper to own.",
    includes: [
      "Domain modelling and workflow mapping before any code is written",
      "Role-based access, audit trails, and reporting built in, not bolted on",
      "A codebase your own team can pick up and maintain",
    ],
    stack: ["TypeScript", "Node.js", "PostgreSQL"],
    projects: ["hrmis", "nfa-trading"],
  },
  {
    slug: "web-platform-saas",
    name: "Web Platform / SaaS",
    projectType: "Web Platform / SaaS",
    summary:
      "Full-stack applications built for performance and growth — from MVP to enterprise scale.",
    body: "Products with real users, billing, and uptime expectations. Server-rendered where it matters for speed and search, and measured against a performance budget agreed at design time rather than audited after launch.",
    includes: [
      "Server-rendered front end held to a measured performance budget",
      "Authentication, roles, and billing flows",
      "Zero-downtime deploys, with a rollback that has been tested",
    ],
    stack: ["React", "Next.js", "TypeScript"],
    projects: ["pickleball-district", "nfa-trading"],
  },
  {
    slug: "mobile-app",
    name: "Mobile App",
    projectType: "Mobile App",
    summary:
      "Cross-platform iOS and Android apps, with native builds when performance demands it.",
    body: "React Native by default — one codebase, two stores, and a release cadence a small team can actually sustain. Native modules where the platform requires them: background location, payments, hardware access.",
    includes: [
      "One codebase shipping to both the App Store and Play Store",
      "Offline behaviour and background sync where the use case needs it",
      "Store submission, review responses, and release management",
    ],
    stack: ["React Native", "Expo", "Swift", "Kotlin"],
    projects: ["ridelink", "tanimbes"],
  },
  {
    slug: "api-backend",
    name: "API / Backend",
    projectType: "API / Backend",
    summary:
      "Scalable backends, integrations, and data pipelines designed for the long haul.",
    body: "The part nobody sees and everybody feels when it is wrong. Documented interfaces, explicit failure modes, and integrations that degrade gracefully when the third party you depend on has an outage — because eventually it will.",
    includes: [
      "Documented APIs with versioning and a deprecation path",
      "Integrations with retry, backoff, and honest failure states",
      "A data model and a migration strategy, written down",
    ],
    stack: ["Node.js", "PostgreSQL", "REST", "Serverless"],
    projects: ["ridelink", "nfa-trading"],
  },
  {
    slug: "cloud-devops",
    name: "Cloud & DevOps",
    projectType: "Cloud & DevOps",
    summary:
      "Infrastructure, pipelines, and deployments that stop being a source of surprises.",
    body: "CI that runs on every push, environments that actually match each other, and infrastructure written down rather than clicked into existence. The goal is that deploying becomes boring and that anyone on the team can do it.",
    includes: [
      "CI/CD with tests gating every merge",
      "A staging environment that matches production",
      "Monitoring, alerting, and a runbook someone else can follow",
    ],
    stack: ["AWS", "GCP", "Docker", "Vercel"],
    projects: ["ridelink", "hrmis"],
  },
  {
    slug: "ui-ux-engineering",
    name: "UI/UX Engineering",
    projectType: "UI/UX Engineering",
    summary:
      "Design systems, component libraries, and interfaces that hold up as the product grows.",
    body: "Interface work treated as engineering rather than decoration: a component library with real states, contrast checked against WCAG AA, and a design system that keeps the tenth screen consistent with the first.",
    includes: [
      "A component library with loading, empty, and error states",
      "WCAG AA contrast verified and keyboard paths tested",
      "A design system your designers and engineers actually share",
    ],
    stack: ["Figma", "Tailwind CSS", "Storybook"],
    projects: ["ridelink", "hrmis"],
  },
];

/**
 * Verticals we have shipped in — each one backed by a case study.
 *
 * Deliberately not a list of markets we would like to enter. A claimed vertical
 * with no work behind it is found out in the first call.
 */
export const INDUSTRIES = [
  {
    name: "Sports & Recreation",
    desc: "Club operations, live queueing, member accounts, and court booking with payment.",
    projects: ["pickleball-district"],
  },
  {
    name: "AgriTech & Consumer",
    desc: "Trading platforms for producers, and consumer apps with a conversational assistant behind them.",
    projects: ["nfa-trading", "tanimbes"],
  },
  {
    name: "Mobility",
    desc: "Peer-to-peer rental marketplaces with live GPS tracking, payments, and trust flows.",
    projects: ["ridelink"],
  },
  {
    name: "Government & Public Sector",
    desc: "Centralised records, role-based access control, and reporting across multiple offices.",
    projects: ["hrmis", "nfa-trading"],
  },
];

/**
 * How we work with your systems.
 *
 * Every line here is conservative and defensible. Do not add compliance claims
 * — SOC 2, ISO 27001, HIPAA, PCI — without a certificate to produce. A claimed
 * certification that fails a procurement check ends the engagement.
 */
export const TRUST = [
  {
    title: "You own the code",
    desc: "The repository is yours — during the build, not just at handover. No escrow, no licensing arrangement to unwind later.",
  },
  {
    title: "Access from day one",
    desc: "Repository, project board, and environments, from the first sprint. Nothing about the build is visible only to us.",
  },
  {
    title: "Secrets never live in the repository",
    desc: "Credentials travel as environment variables and scoped tokens. Nothing that grants access is committed, ever.",
  },
  {
    title: "Least privilege by default",
    desc: "Every token is scoped to one system and the narrowest permission that works. A runtime credential never carries admin rights.",
  },
  {
    title: "Staging before production",
    desc: "Every change is exercised in an environment that matches production before a real user sees it.",
  },
  {
    title: "Dependencies on a schedule",
    desc: "Patched on a cadence rather than when something breaks, so a security advisory is routine work instead of an incident.",
  },
];
