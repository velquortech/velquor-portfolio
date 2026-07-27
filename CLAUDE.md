## Overview

This site is the marketing surface for **Velquor Technologies Corporation**, a software development studio. Its design system is the Velquor brand identity handed off by the studio's graphic designer (Ronil Amos Fasciol, 2026-07-18) — not a generic dark-SaaS look.

The brand is built on **one violet ramp and nothing else**. There is no second accent hue, no semantic colour family, no per-section palette. Surfaces are a violet-cast near-black (`#06000f`, not neutral grey), display type is **Space Grotesk Bold set uppercase**, and body copy is **Inter**. Hierarchy is carried by size, surface lift, and position in the violet ramp — never by introducing a new colour.

The identity's signature graphic device is the **stepped-bar field**: horizontal bars stair-stepped into a chevron aperture, each carrying a violet-to-near-white gradient. It ships as `app/components/brand/StepField.tsx` and should be the first thing reached for when a surface needs visual interest.

**Key characteristics**

- One violet ramp (`violet-100/300/500/700/900`) is the entire chromatic system.
- **`violet-500` fills, `violet-300` speaks.** The primary violet is a fill colour and fails contrast as body text on canvas; the 300 is the on-dark text/link/accent tint.
- Display type is uppercase Space Grotesk Bold at neutral-to-open tracking. Body stays Inter.
- Primary CTAs are violet pills with white labels — except on violet grounds, where the brand inverts to white pills.
- Atmosphere is a **single violet dome**, one bloom, one hue. Never a multi-source mesh.
- Cards separate by icon, copy, and ramp depth — never by hue.

Full brand audit, provenance, and the remaining action items live in **`.claude/BRAND-PARITY.md`**, with sampled reference art in `.claude/brand-reference/`.

## Colours

Values sampled pixel-exact from the hand-off boards. Defined in `app/globals.css` as CSS variables and exposed through `@theme inline`.

### The ramp

| Token | Hex | Board label | Role |
| --- | --- | --- | --- |
| `violet-900` | `#140033` | 900 | Deepest tint. Section grounds, card bodies, `--s2` |
| `violet-700` | `#3d0099` | 700 | Gradient midpoint, CTA hover fill |
| `violet-500` | `#6600ff` | **PRIMARY** | The brand. CTA fill, glow, accent bars |
| `violet-300` | `#a366ff` | 300 | On-dark text, links, badge labels, focus ring |
| `violet-100` | `#efe5ff` | 100 | Light surfaces, gradient highlight |

### Surfaces & text

| Token | Value | Role |
| --- | --- | --- |
| `canvas` | `#06000f` | Page ground — near-black with a **violet cast**, not neutral |
| `s1` | `#0e0024` | Cards, lifted surfaces. **Inferred**, pending designer sign-off |
| `s2` | `var(--violet-900)` | Featured cards, chips |
| `ink` | `#ffffff` | Headlines and body on dark |
| `muted` | `#999999` | Secondary type |
| `accent` | `var(--violet-300)` | Links and focus — an alias, not a separate colour |
| `success` | `#22c55e` | Semantic only (shipped badges, checkmarks). Not part of the brand palette |

`hairline-*` variables carry white alphas from 0.06 to 0.18 for borders and dividers.

### Contrast ledger (verified)

| Pair | Ratio | Verdict |
| --- | --- | --- |
| `#ffffff` on `violet-500` | 6.98:1 | ✔ AA — this is why CTA labels are white |
| `#06000f` on `violet-500` | 3.01:1 | ✘ never dark labels on a violet fill |
| `violet-300` on `canvas` | 5.51:1 | ✔ AA — the on-dark accent |
| `violet-500` on `canvas` | 2.81:1 | ✘ never as text |

## Typography

| Role | Face | Loaded as |
| --- | --- | --- |
| Display | **Space Grotesk Bold**, uppercase | `next/font/google` → `--font-space-grotesk` → theme token `--font-display` |
| Body | **Inter** | `--font-inter` → `--font-sans` |
| Wordmark | **GC North Sans Medium** | Commercial. Lives **only inside the logo artwork** — never set it in CSS |

Headings use `font-display font-bold uppercase` plus the size/tracking/leading utilities below.

| Utility | Size | Tracking | Use |
| --- | --- | --- | --- |
| `text-display-xxl` | `clamp(38px, 6.5vw, 80px)` | `0` | Hero H1, CTA band H2 |
| `text-display-xl` | `clamp(28px, 4vw, 58px)` | `0` | Section openers |
| `text-display-lg` | `clamp(21px, 2.6vw, 32px)` | `0.005em` | Card headlines |
| `text-display-md` | `clamp(20px, 2.3vw, 28px)` | `0.01em` | Sub-headers, stat numerals |

`leading-display*` runs 1.02–1.08. Caps need more room than tight-set lowercase.

**Rules**

- Display tracking is **neutral to slightly open**. Negative tracking is not this brand — if you find `-0.0Xem` on a heading, it is a leftover.
- **Never apply the display face below 20px.** Small uppercase labels use Inter with `tracking-[0.08em]`.
- Body keeps Inter's OpenType character variants (`cv01`, `cv05`, `cv09`, `cv11`, `ss03`, `ss07`), set on `body` in `globals.css`.
- Sizes are deliberately smaller than a mixed-case ramp would be: uppercase Space Grotesk sets ~25% wider per character.

## Components & utilities

All custom utilities live in `app/globals.css` under `@layer utilities`.

**Buttons** — primary CTA is `bg-violet-500 text-white hover:bg-violet-700` with `rounded-pill`. Secondary is a ghost pill (`border-hairline-strong`). On violet grounds the primary **inverts to a white pill** (`bg-ink text-canvas`); `CTABand` is the live example and carries a comment explaining why.

**Surfaces** — `bg-spotlight-violet`, `bg-spotlight-violet-soft`, `bg-spotlight-cta`. Variants differ by luminance and gradient origin, not hue.

**Cards** — `bg-project-{bright,mid,deep}` for project headers, cycled by position. `bg-corner-violet` for the service-card corner wash. `badge-violet` for tech pills; `badge-success` is the only non-violet badge and is semantic.

**Atmosphere** — `bg-hero-mesh` (the violet dome), `bg-services-mesh`, `bg-orb-violet`, `bg-orb-cta`, `bg-horizon-gradient`, `border-t-gradient-palette`.

**Brand device** — `<StepField />` (`app/components/brand/StepField.tsx`). Props: `rows`, `depth`, `flip`, `className`. Pure SVG, `aria-hidden`. Used in `CTABand` and the project detail hero.

**Radii** — `rounded-card` 20px, `rounded-spotlight` 30px, `rounded-pill` 100px.

## Content & identity

- Legal name: **Velquor Technologies Corporation**. Use it in legal lines; "Velquor" elsewhere.
- Primary tagline: **"Systems crafted to grow. Partnerships built to stay."** — in the footer and as the CTA band kicker.
- Domain: `velquortech.com`.
- Address: Taft Street, Barangay Zone IV (Pob.), Santa Barbara, Iloilo, Region VI (Western Visayas), 5002.
- The phone number on the hand-off business card (`+63 912 345 6789`) is **placeholder digits — do not ship it**.

## Generated assets

Two scripts render brand art. Both vendor Space Grotesk from `scripts/fonts/` via a scratch fontconfig, so they do not depend on the font being installed system-wide.

- `node scripts/generate-og.js` → `public/images/og-image.png` and `public/images/og-contact.png` (1200×630 each). One `VARIANTS` entry per share card — same lockup and atmosphere, only the type changes.
- `node scripts/generate-icons.js` → `app/icon.png`, `app/apple-icon.png`, `app/favicon.ico`, `public/images/favicon.ico`

Icons come from the `app/` file conventions — do **not** also declare `metadata.icons` in `layout.tsx`, or the tags duplicate.

## Do's and don'ts

**Do**

- Reach for the ramp first. If a surface needs to stand out, move it a step (`s1` → `s2`) or change its ramp depth.
- Use `violet-300` for anything that is text, and `violet-500` for anything that is a fill.
- Set headings with `font-display font-bold uppercase` and the matching tracking utility.
- Put `<StepField />` where a surface needs a brand-native texture.
- Keep the dot-grid on `body` — it is the canvas texture.

**Don't**

- Don't introduce a second hue. No magenta, orange, coral, indigo, teal, or blue. The site shipped with six hues and they were all removed on purpose; re-adding one undoes the identity.
- Don't use `violet-500` as text on canvas (2.81:1) or dark text on a violet fill (3.01:1).
- Don't apply negative letter-spacing to display type.
- Don't set the wordmark as CSS text — it is GC North Sans and lives in the logo artwork.
- Don't hue-code sibling items (service cards, tech badges, project headers). Differentiate by icon, copy, or ramp depth.
- Don't add a hue-named utility (`glow-magenta`, `bg-corner-orange`, …). Those names existed and were deleted.
- Don't ship the placeholder phone number.

## Known gaps

- **`--s1` (`#0e0024`) is inferred** from mockup card fills, not published. Needs designer sign-off.
- **Light mode is undecided.** The hand-off ships light applications (business card, book, stationery) on `violet-100`, but the site is dark-only (`color-scheme: dark`). No light tokens exist.
- **No motion spec.** The logo animation exists in the hand-off (Jitter) but no duration/easing tokens were provided.
- **The OG wordmark is approximated** in Space Grotesk. The real wordmark is GC North Sans and only exists inside the logo artwork; swap in the designer's lockup SVG when it lands.
- **LinkedIn banners in `public/images/linkedin-banners/` still carry the pre-hand-off palette.** They were produced by browser screenshots and need regenerating.
- **Footer social URLs** (`/velquor`) may not match the real handles, which the hand-off gives as `@VelquorTech` and `@velquortechco`.

## Framework note

<!-- BEGIN:nextjs-agent-rules -->
This version of Next.js (16.x) has breaking changes — APIs, conventions, and file structure may differ from training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

Verify changes with `yarn build && yarn lint`.
