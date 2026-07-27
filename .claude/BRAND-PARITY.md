# Velquor Brand Parity & Action Items

**Source of truth:** Velquor Brand Identity — Ronil Amos Fasciol (designer hand-off), Behance gallery `252912733`, published 2026-07-18.
**Audited against:** `velquor-portfolio` @ `main` (f7c2b8f), 2026-07-27.
**Local reference images:** `.claude/brand-reference/` (palette-scale, typography, brand-board, web-mockup, logo-primary).

Color values below were sampled pixel-exact from the hand-off boards, not eyeballed. Where the board is silent (surface ladder, hairlines, motion), that is called out as **INFERRED** and needs designer sign-off.

---

## 1. Brand truth (extracted)

### 1.1 Identity

| Field | Value |
| --- | --- |
| Legal name | Velquor Technologies Corporation |
| Display name | Velquor |
| Primary tagline | **"Systems crafted to grow. Partnerships built to stay."** |
| Secondary lines | "Custom software, built to last." · "We craft software that moves." |
| Web | velquortech.com |
| Social handles | @VelquorTech · @velquortechco |
| Address (from card) | Taft Street Barangay Zone IV (Pob.), Santa Barbara, Iloilo, Region VI (Western Visayas), 5002 |
| Phone (from card) | +63 912 345 6789 — **placeholder digits, do NOT ship** |

### 1.2 Palette — sampled exact

The board defines a **single-hue 5-step violet ramp**, named by weight. There is no second chromatic family.

| Token | Hex | Board label | Role |
| --- | --- | --- | --- |
| `violet-900` | `#140033` | 900 | Deepest tint. Section grounds, card bodies over canvas |
| `violet-700` | `#3D0099` | 700 | Gradient midpoint, pressed/hover fill |
| `violet-500` | `#6600FF` | **PRIMARY** | The brand. CTA fill, logo mark on light, accent bars |
| `violet-300` | `#A366FF` | 300 | On-dark accent text, links, glow tint, gradient highlight |
| `violet-100` | `#EFE5FF` | 100 | Light-surface ground, low-emphasis type on violet |

Neutrals sampled from the applications:

| Token | Hex | Role |
| --- | --- | --- |
| `canvas` | `#06000F` | Page ground — near-black with a **violet cast**, not neutral black |
| `surface-1` | `#0E0024` | Card / lifted surface **(INFERRED from mockup card fills)** |
| `ink` | `#FFFFFF` | Headline + body on dark |
| `ink-on-light` | `#06000F` | Type on `violet-100` surfaces |

**Rules read off the boards**

- Violet is a **fill**, never a large text color on dark. Every mockup uses white type over violet, or violet-300 for small accents.
- Gradients are always violet→white or violet→black inside the ramp. No hue rotation. No magenta / orange / coral / indigo anywhere in the hand-off.
- Light applications (business card front, book cover, stationery) exist and are on-brand — the brand is **not** dark-only.

### 1.3 Typography

| Role | Typeface | Board note |
| --- | --- | --- |
| Display / headline | **Space Grotesk Bold** | Set UPPERCASE, wide tracking, tight leading. Google Fonts, free |
| Logotype / wordmark | **GC North Sans Medium** | Commercial. Lives inside the logo artwork only |
| Body copy | **Inter** | Board states verbatim: "We use the font *Inter* for body copy" |

Display treatment observed: uppercase, 2–3 line stacks, letter-spacing **positive-to-neutral** (roughly `0` to `+0.01em`), leading ~1.05. Occasionally set on a slight optical baseline rotation for posters.

### 1.4 Logo

- Mark: rounded chevron "V" with a notched inner cut. White on dark, `violet-500` on light, `#06000F` on violet.
- Lockups: mark + "Velquor" · mark + "Velquor Technologies Corporation" · mark alone (app icon, favicon, cap embroidery).
- Clear space: **1× cap-height** all sides. Gap between mark and wordmark **0.5×**. Descriptor sits **0.25×** below the wordmark baseline.
- App icon: mark centered on `violet-900` or `violet-500`, squircle.

### 1.5 Signature graphic devices

1. **Stepped-bar / pixel-shear field** — horizontal bars stair-stepped into a chevron or diamond aperture, each bar a violet→white vertical gradient. The strongest recurring device (billboard, transit, notebook, brand board).
2. **Violet dome glow** — one soft radial bloom from the top or upper-right of a black field. Single source, single hue.
3. **Quarter-circle / arc cut** — large radius arc cutting a solid violet panel against black. Used on posters and social tiles.
4. **Dot-grid texture** — faint dotted field over dark grounds (already present in the current site).
5. **Grain** — light film grain over gradient surfaces on print applications.

---

## 2. Parity matrix — hand-off vs. what ships today

Legend: 🟥 conflict · 🟨 partial · 🟩 aligned

| # | Dimension | Hand-off | Current implementation | Verdict |
| --- | --- | --- | --- | --- |
| P1 | Chromatic system | One violet ramp, 5 steps | 6 hues: violet `#7c3aed`, magenta `#db2777`, orange `#ea580c`, coral `#e11d48`, indigo `#6366f1`, blue accent `#0099ff` | 🟥 |
| P2 | Primary violet | `#6600FF` | `#7c3aed` (Tailwind violet-600) — different hue and chroma | 🟥 |
| P3 | Canvas | `#06000F` violet-cast black | `#0b0b0b` neutral warm black | 🟥 |
| P4 | Surface ladder | `#0E0024` / `#140033` | `#161616` / `#1e1e1e` neutral greys | 🟥 |
| P5 | Accent / link color | `violet-300 #A366FF` | `#0099ff` sky blue (inherited from the Framer study) | 🟥 |
| P6 | Primary CTA | **Violet pill, white label** (mockup: "Request a Demo") | White pill, black label | 🟥 |
| P7 | Display typeface | Space Grotesk Bold, uppercase | Inter bold, sentence case | 🟥 |
| P8 | Display tracking | ~`0` to `+0.01em` | `-0.05em` (extreme negative, Framer-derived) | 🟥 |
| P9 | Body typeface | Inter | Inter ✔ | 🟩 |
| P10 | Logo asset | Mark + GC North Sans wordmark | `velq-logo-white.png` in nav ✔ | 🟩 |
| P11 | Logo clear space | 1× cap-height | Not enforced; nav crops tight at `h-7` | 🟨 |
| P12 | Tagline presence | "Systems crafted to grow. Partnerships built to stay." | Absent site-wide | 🟥 |
| P13 | Hero copy | "We craft software that moves" | Same ✔ | 🟩 |
| P14 | Gradient atmosphere | Single violet dome, one source | 4-orb mesh, 4 different hues | 🟥 |
| P15 | Signature device | Stepped-bar / pixel-shear field | Absent — circuit-trace SVG instead (off-brand) | 🟥 |
| P16 | Dot-grid texture | Present | Present ✔ | 🟩 |
| P17 | Project card headers | n/a in hand-off | 9 bespoke hue gradients (green, teal, blue, rose…) | 🟥 |
| P18 | Tech badges | n/a in hand-off | 6 hue-coded badge variants | 🟥 |
| P19 | Light surfaces | Brand ships light applications | `color-scheme: dark` only, no light tokens | 🟨 |
| P20 | Radii | Pills, ~20px cards, squircle icon | Pill 100px / card 20px / spotlight 30px ✔ | 🟩 |
| P21 | `themeColor` meta | should be `#06000F` | `#0b0b0b` | 🟥 |
| P22 | Corporate name in footer | "Velquor Technologies Corporation" | Not verified in footer | 🟨 |

**Headline:** the site was built from a *Framer* visual study (see `CLAUDE.md`), not from Velquor's identity. Structure, spacing and component vocabulary are good and should survive. The **color system and display typography are the wrong brand** and must be replaced.

---

## 3. Action items

Ordered by blast radius. Each item names the exact file.

### P0 — Token layer (do first; everything else inherits)

- **A1 · Rewrite the palette in `app/globals.css` `:root` + `@theme inline`.**
  Introduce `--violet-100/300/500/700/900`, repoint `--canvas`, `--s1`, `--s2`. Delete `--color-magenta`, `--color-orange`, `--color-coral`, `--color-indigo`, `--color-accent`.
  Migration map:

  | Old | New | Note |
  | --- | --- | --- |
  | `--canvas #0b0b0b` | `#06000F` | also update `--fade-color`, `--nav-blur-bg` (`rgba(6,0,15,0.92)`) |
  | `--s1 #161616` | `#0E0024` | INFERRED — confirm with designer |
  | `--s2 #1e1e1e` | `#140033` | = `violet-900` |
  | `--color-violet #7c3aed` | `#6600FF` | brand primary |
  | `--color-accent #0099ff` | `#A366FF` | links/focus become `violet-300` |
  | `--color-magenta/orange/coral/indigo` | *(removed)* | see A3 |
  | `--color-success #22c55e` | keep | semantic only, not brand palette |

- **A2 · Retint every derived surface utility in `globals.css`.**
  `bg-hero-mesh`, `bg-services-mesh`, `bg-orb-*`, `bg-spotlight-*`, `bg-corner-*`, `bg-preview-*`, `.glow-*`, `.badge-*`, `.border-*-glow`, `.bg-horizon-gradient`, `.border-t-gradient-palette`, `.text-gradient-*` — all rebuilt from the violet ramp only.
  - `text-gradient-hero`: `#FFFFFF → #EFE5FF → #A366FF → #FFFFFF`
  - `text-gradient-palette`: `#A366FF → #6600FF → #EFE5FF`
  - `bg-horizon-gradient`: transparent → `rgba(102,0,255,.45)` → transparent (single stop, was 3 hues)

- **A3 · Collapse the multi-hue variants to one violet variant.**
  `bg-corner-{magenta,coral,indigo,orange}` → `bg-corner-violet`; `glow-{magenta,coral,indigo,orange}` → `glow-violet`; `badge-{magenta,coral,indigo,orange}` → `badge-violet`. Keep `badge-success` (semantic).
  Call sites: `app/components/sections/services/Services.tsx` (4 corners, 4 glows, 4 badges), `app/components/sections/work/ProjectCards.tsx`, `app/work/[slug]/page.tsx`.
  *Differentiate service cards by icon and copy, not by hue* — that is the brand rule the hand-off implies by shipping exactly one hue.

- **A4 · Load Space Grotesk in `app/layout.tsx`.** ✅ done
  `next/font/google` → `Space_Grotesk`, `variable: "--font-space-grotesk"`, no `weight` (it is a variable font, wght 300–700 — Next's bundled docs prefer the axis over pinned weights). Theme token `--font-display` resolves it in `@theme inline`.
  *Deviation from plan:* the next/font variable cannot be named `--font-display` — the theme token of that name would resolve to itself. Mirrors the existing `--font-inter` → `--font-sans` split.

- **A5 · Update `viewport.themeColor` to `#06000F`** in `app/layout.tsx`.

### P1 — Typographic voice

- **A6 · New display utility set in `globals.css`.**
  Replace the negative-tracking scale with the brand's uppercase geometry:
  - `.font-display { font-family: var(--font-display); font-weight: 700; text-transform: uppercase; }`
  - `.tracking-display-*`: `-0.05em` → `0` for xxl/xl, `+0.005em` for md/lg.
  - `.leading-display*`: `0.88/0.92` → `1.02–1.06` (Space Grotesk caps need more room than Inter tight-set).
  - Keep the `clamp()` size ramp as-is — sizing is fine, only the face and tracking are wrong.
- **A7 · Apply `.font-display` to every H1/H2/H3 + stat numerals.**
  Files: `Hero.tsx` (h1 + stat values), `Services.tsx`, `Work.tsx`, `Process.tsx`, `Testimonials.tsx`, `TechStack.tsx`, `CTABand.tsx`, `app/work/page.tsx`, `app/work/[slug]/page.tsx`.
  Hero H1 becomes `WE CRAFT SOFTWARE THAT MOVES` (uppercase, 3 lines) per the hand-off web mockup.
- **A8 · Keep body copy Inter, unchanged.** Do not apply Space Grotesk below 20px.

### P1 — Component parity

- **A9 · Invert the primary CTA to brand violet.**
  `bg-ink text-canvas` → `bg-[--violet-500] text-white`, hover `--violet-700`. Secondary stays ghost/hairline.
  Files: `Hero.tsx` (2 CTAs), `Nav.tsx` (desktop CTA + mobile CTA), `CTABand.tsx`, `Work.tsx`, `app/work/page.tsx`.
  Contrast: white on `#6600FF` = **6.98:1** ✔ AA. Black on `#6600FF` = 3.01:1 ✘ — never use dark labels on the violet pill.
- **A10 · Nav CTA label** — mockup reads **"Request a Demo"**, site says "Get in touch". Designer's nav also lists Services · Work · Process · Contact, which already matches. Confirm the label with stakeholders before changing (copy decision, not a design bug).
- **A11 · Hero atmosphere: 4 orbs → 1 dome.**
  `Hero.tsx` lines ~17–32: delete the magenta/orange/coral orbs, keep one violet bloom repositioned to top-center per the mockup. Rebuild `bg-hero-mesh` as a single top radial.
- **A12 · Enforce logo clear space in `Nav.tsx` and `Footer.tsx`** — add horizontal padding equal to the mark's cap-height (`h-7` mark → `px-7` reserve, i.e. no adjacent element inside 28px).
- **A13 · Project card header gradients → violet ramp.**
  `app/data/projects.ts` + `globals.css` `.bg-project-*`: nine per-project hues violate the one-hue rule. Replace with 2–3 violet-ramp depths (`900→canvas`, `700→900`, `500→900`) cycled by index, so cards still read as distinct without importing foreign hues.
- **A14 · Drop the blue focus ring.** `globals.css` `a:focus-visible/button:focus-visible` and `::selection` → `rgba(163,102,255,.5)` / `rgba(102,0,255,.30)`.

### P2 — Brand devices & content

- **A15 · Build the stepped-bar device as a component** (`app/components/brand/StepField.tsx`): CSS-grid of stair-stepped bars, each `linear-gradient(180deg, #6600FF, #EFE5FF)`, forming a chevron aperture. Use in `CTABand` and as the `work/[slug]` hero texture. This is the identity's most recognizable asset and is currently missing entirely.
- **A16 · Retire or re-skin the circuit-trace background** (`app/layout.tsx`, 70 lines of SVG). It is a tech-cliché motif with no basis in the hand-off. Either delete it or restyle strokes to `rgba(163,102,255,.07)` so it reads as brand texture rather than a competing device. Recommend: delete, replace with A15.
- **A17 · Surface the tagline.** Add "Systems crafted to grow. Partnerships built to stay." to `Footer.tsx` (under the lockup) and as the `CTABand` kicker. It is the primary tagline and currently appears nowhere.
- **A18 · Footer legal line** → "© <year> Velquor Technologies Corporation." Add the Iloilo address. **Do not** ship the `+63 912 345 6789` from the card — placeholder digits; get the real number.
- **A19 · Regenerate OG/social art** (`scripts/generate-og.js`, `public/images/og-image.png`, `public/images/linkedin-banners/*`) on the new canvas + violet + Space Grotesk. Current banners bake in the old palette.
- **A20 · Favicon / app icon** — mark on `violet-500` squircle per the hand-off app-icon board; today `app/favicon.ico` + `public/images/favicon.ico` are unversioned against the identity.
- **A21 · Rewrite `CLAUDE.md`.** It currently documents *Framer's* brand as the project's design system — it will actively fight every change above. Replace with the Velquor spec (this file's §1 is the source).

### P2 — Open, needs designer

- **A22 · Light-mode surfaces.** The hand-off ships light applications (`violet-100` ground, black type). Decide whether the site adopts a light section band or stays dark-only. Blocked on designer.
- **A23 · Surface ladder confirmation.** `#0E0024` is inferred from mockup card fills, not published. Ask for the official neutral/surface steps.
- **A24 · Motion.** The logo animation exists (Jitter) but no motion spec. Ask for duration/easing tokens before adding brand motion.

---

## 4. Accessibility ledger (verified, not assumed)

| Pair | Ratio | Verdict |
| --- | --- | --- |
| `#FFFFFF` on `#6600FF` | 6.98:1 | ✔ AA normal, AAA large |
| `#06000F` on `#6600FF` | 3.01:1 | ✘ body text — large/decorative only |
| `#A366FF` on `#06000F` | 5.51:1 | ✔ AA — this is the on-dark link/accent color |
| `#6600FF` on `#06000F` | 2.81:1 | ✘ never as text on canvas — fill only |
| `#FFFFFF` on `#06000F` | ~20:1 | ✔ |

Rule to encode: **`violet-500` fills, `violet-300` speaks.**

---

## 5. Execution order

1. A1 → A2 → A3 (tokens; site goes violet in one pass)
2. A4 → A6 → A7 → A8 (typographic voice)
3. A5, A9, A11, A12, A13, A14 (component parity)
4. A15 → A16 → A17 → A18 (brand devices + copy)
5. A19, A20 (exported art — after the system is frozen)
6. A21 (docs) — last, so it describes what actually shipped

`yarn lint && yarn build` after steps 1, 2 and 3.

---

## 6. Acceptance checklist

- [ ] `grep -rn "#0099ff\|db2777\|ea580c\|e11d48\|6366f1\|7c3aed" app/` returns nothing
- [ ] No hex outside the violet ramp + neutrals + `--color-success` in `globals.css`
- [ ] Every H1/H2/H3 renders in Space Grotesk Bold, uppercase
- [ ] Every primary CTA is a `#6600FF` pill with a white label
- [ ] Canvas is `#06000F`; `themeColor` matches
- [ ] Tagline present in footer + CTA band
- [ ] Stepped-bar device appears at least once above the fold on `/` or `/work`
- [ ] Logo clear space ≥ 1× cap-height in nav and footer
- [ ] OG image + LinkedIn banners regenerated on the new system
- [ ] `CLAUDE.md` describes Velquor, not Framer
