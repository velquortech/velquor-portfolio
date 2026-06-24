// Generates a 1200x630 Open Graph share image for Velquor.
// Brand: near-black canvas (#0b0b0b) + a single violet spotlight glow + white "V" mark.
// Run: node scripts/generate-og.js
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const W = 1200;
const H = 630;
const root = path.join(__dirname, "..");
const logoPath = path.join(root, "public/images/velq-logo-white.png");
const outPath = path.join(root, "public/images/og-image.png");

const FONT = "Liberation Sans, Arial, Helvetica, sans-serif";

// Logo lockup geometry — mark on the left, wordmark + tagline to its right.
const MARK_H = 150;
const MARK_RATIO = 1846 / 1189; // intrinsic w/h of the source logo
const MARK_W = Math.round(MARK_H * MARK_RATIO);
const MARK_LEFT = 110;
const MARK_TOP = Math.round((H - MARK_H) / 2) - 24;
const TEXT_X = MARK_LEFT + MARK_W + 44;

const svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow" cx="80%" cy="22%" r="62%">
      <stop offset="0%"  stop-color="#7c3aed" stop-opacity="0.55"/>
      <stop offset="38%" stop-color="#4c1d95" stop-opacity="0.24"/>
      <stop offset="72%" stop-color="#1a0638" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#0b0b0b" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="#0b0b0b"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>

  <!-- thin hairline frame -->
  <rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" fill="none" stroke="#ffffff" stroke-opacity="0.06"/>

  <!-- wordmark -->
  <text x="${TEXT_X}" y="318" font-family="${FONT}" font-size="104" font-weight="700"
        letter-spacing="-4" fill="#ffffff">Velquor</text>

  <!-- accent dot + tagline -->
  <circle cx="${TEXT_X + 9}" cy="372" r="6" fill="#7c3aed"/>
  <text x="${TEXT_X + 30}" y="382" font-family="${FONT}" font-size="32" font-weight="400"
        letter-spacing="0.4" fill="#b9b9b9">Software Development Studio</text>

  <!-- footer url -->
  <text x="${MARK_LEFT}" y="568" font-family="${FONT}" font-size="26" font-weight="500"
        letter-spacing="0.3" fill="#8a8a8a">velquor.com</text>
</svg>`;

(async () => {
  const logo = await sharp(logoPath)
    .resize({ height: MARK_H })
    .toBuffer();

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
