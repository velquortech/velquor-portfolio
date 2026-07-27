// Generates the 1200x630 Open Graph share image for Velquor.
//
// Brand: canvas #06000f, a single violet dome glow, the chevron mark, and the
// stepped-bar field. Type is Space Grotesk Bold (the identity's display face),
// loaded from scripts/fonts via a scratch fontconfig so the raster pipeline
// does not depend on the font being installed system-wide.
//
// Run: node scripts/generate-og.js
const fs = require("fs");
const os = require("os");
const path = require("path");

const root = path.join(__dirname, "..");
const fontDir = path.join(__dirname, "fonts");

// Must be set before sharp pulls in librsvg, or the font will not resolve.
const fontConf = path.join(os.tmpdir(), "velquor-fonts.conf");
fs.writeFileSync(
  fontConf,
  `<?xml version="1.0"?>
<!DOCTYPE fontconfig SYSTEM "fonts.dtd">
<fontconfig>
  <dir>${fontDir}</dir>
  <cachedir>${path.join(os.tmpdir(), "velquor-fc-cache")}</cachedir>
</fontconfig>`,
);
process.env.FONTCONFIG_FILE = fontConf;

const sharp = require("sharp");

const W = 1200;
const H = 630;
const logoPath = path.join(root, "public/images/velq-logo-white.png");
const outPath = path.join(root, "public/images/og-image.png");

const DISPLAY = "Space Grotesk";
const CANVAS = "#06000f";
const VIOLET_500 = "#6600ff";
const VIOLET_300 = "#a366ff";
const VIOLET_100 = "#efe5ff";

const TAGLINE = "SYSTEMS CRAFTED TO GROW. PARTNERSHIPS BUILT TO STAY.";
const DOMAIN = "velquortech.com";

// Lockup geometry — mark left, wordmark to its right.
const MARK_H = 132;
const MARK_RATIO = 1846 / 1189; // intrinsic w/h of the source mark
const MARK_W = Math.round(MARK_H * MARK_RATIO);
const MARK_LEFT = 96;
const MARK_TOP = 236;
const TEXT_X = MARK_LEFT + MARK_W + 40;

/** Stepped-bar field, mirrored off the right edge — same device as StepField.tsx. */
function stepBars({ rows = 15, depth = 0.62, width = 520, height = H }) {
  const barH = height / rows;
  const gap = barH * 0.22;
  return Array.from({ length: rows }, (_, i) => {
    const d = Math.abs(i - (rows - 1) / 2) / ((rows - 1) / 2);
    const w = width * (1 - depth * d);
    const opacity = (0.9 - d * 0.55).toFixed(3);
    // x is measured from the right edge inward.
    return `<rect x="${W - w}" y="${(i * barH).toFixed(2)}" width="${w.toFixed(2)}" height="${(barH - gap).toFixed(2)}" fill="url(#bar)" opacity="${opacity}"/>`;
  }).join("\n    ");
}

const svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="dome" cx="50%" cy="0%" r="78%">
      <stop offset="0%"   stop-color="${VIOLET_500}" stop-opacity="0.38"/>
      <stop offset="45%"  stop-color="#3d0099"       stop-opacity="0.16"/>
      <stop offset="100%" stop-color="${CANVAS}"     stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="bar" x1="100%" y1="0%" x2="0%" y2="0%">
      <stop offset="0%"   stop-color="${VIOLET_100}"/>
      <stop offset="45%"  stop-color="${VIOLET_300}"/>
      <stop offset="100%" stop-color="${VIOLET_500}"/>
    </linearGradient>
    <linearGradient id="barfade" x1="100%" y1="0%" x2="0%" y2="0%">
      <stop offset="0%"   stop-color="white" stop-opacity="1"/>
      <stop offset="70%"  stop-color="white" stop-opacity="0.7"/>
      <stop offset="100%" stop-color="white" stop-opacity="0"/>
    </linearGradient>
    <mask id="barmask">
      <rect width="${W}" height="${H}" fill="url(#barfade)"/>
    </mask>
    <pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
      <circle cx="1" cy="1" r="1" fill="#ffffff" fill-opacity="0.07"/>
    </pattern>
    <!-- Holds the left two-thirds as clean canvas so the lockup and tagline
         never sit on top of the bar field. -->
    <linearGradient id="scrim" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%"   stop-color="${CANVAS}" stop-opacity="1"/>
      <stop offset="62%"  stop-color="${CANVAS}" stop-opacity="0.96"/>
      <stop offset="100%" stop-color="${CANVAS}" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="${CANVAS}"/>
  <rect width="${W}" height="${H}" fill="url(#dots)"/>
  <rect width="${W}" height="${H}" fill="url(#dome)"/>

  <g mask="url(#barmask)" opacity="0.5">
    ${stepBars({ width: 470 })}
  </g>

  <rect x="0" y="0" width="940" height="${H}" fill="url(#scrim)"/>

  <rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" fill="none" stroke="#ffffff" stroke-opacity="0.06"/>

  <!-- Wordmark. Approximated in the display face: the real wordmark is set in
       GC North Sans and only exists inside the logo artwork. Swap this for the
       designer's full lockup SVG when it lands. -->
  <text x="${TEXT_X}" y="342" font-family="${DISPLAY}" font-size="96" font-weight="700"
        letter-spacing="0" fill="#ffffff">VELQUOR</text>

  <!-- Primary tagline -->
  <text x="${MARK_LEFT}" y="446" font-family="${DISPLAY}" font-size="23" font-weight="500"
        letter-spacing="1.2" fill="${VIOLET_300}">${TAGLINE}</text>

  <text x="${MARK_LEFT}" y="556" font-family="${DISPLAY}" font-size="24" font-weight="500"
        letter-spacing="0.6" fill="#8f8f8f">${DOMAIN}</text>
</svg>`;

(async () => {
  const logo = await sharp(logoPath).resize({ height: MARK_H }).toBuffer();

  await sharp(Buffer.from(svg))
    .composite([{ input: logo, left: MARK_LEFT, top: MARK_TOP }])
    .png()
    .toFile(outPath);

  const { size } = fs.statSync(outPath);
  console.log(`Wrote ${outPath} (${(size / 1024).toFixed(1)} KB, ${W}x${H})`);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
