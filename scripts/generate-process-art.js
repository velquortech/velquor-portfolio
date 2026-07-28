// Generates the phase plates for the /process page.
//
// This is the brand-native answer to the stock-photography strip most agency
// process pages use. Sibling plates are differentiated by GEOMETRY and by depth
// on the violet ramp — never by hue. Each one is a variation on the identity's
// stepped-bar field, so five plates in a row read as one system rather than
// five unrelated pictures.
//
// Same raster pipeline as generate-og.js: sharp + librsvg, with Space Grotesk
// vendored from scripts/fonts via a scratch fontconfig so it does not depend on
// the font being installed system-wide.
//
// Run:  node scripts/generate-process-art.js [--out <dir>]
// Default output is the untracked reference directory. When the /process page
// ships, point --out at public/images/process.
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
const H = 800;

const DISPLAY = "Space Grotesk";
const CANVAS = "#06000f";
const VIOLET_900 = "#140033";
const VIOLET_700 = "#3d0099";
const VIOLET_500 = "#6600ff";
const VIOLET_300 = "#a366ff";
const VIOLET_100 = "#efe5ff";

const outFlag = process.argv.indexOf("--out");
const OUT_DIR =
  outFlag > -1 && process.argv[outFlag + 1]
    ? path.resolve(process.argv[outFlag + 1])
    : path.join(root, ".claude/process-reference/generated");

/**
 * Bars stepped into a chevron aperture — the StepField geometry, shared by
 * every plate so the set reads as one family.
 *
 * @param bias  0 = aperture centred, negative pulls it up, positive pulls down
 * @param from  x the bars grow from, as a share of width
 */
function chevronBars({
  rows = 15,
  depth = 0.62,
  bias = 0,
  width = W,
  height = H,
  flip = false,
  from = 0,
}) {
  const barH = height / rows;
  const gap = barH * 0.24;
  const axis = (rows - 1) / 2 + bias;

  return Array.from({ length: rows }, (_, i) => {
    const d = Math.min(1, Math.abs(i - axis) / ((rows - 1) / 2));
    const w = width * (1 - depth * d);
    const opacity = (0.92 - d * 0.62).toFixed(3);
    const x = flip ? W - w : from * W;
    return `<rect x="${x.toFixed(2)}" y="${(i * barH).toFixed(2)}" width="${w.toFixed(2)}" height="${(barH - gap).toFixed(2)}" rx="1" fill="url(#bar)" opacity="${opacity}"/>`;
  }).join("\n      ");
}

/** Concentric scan arcs — one origin, one hue, nothing added. */
function scanRings({ cx, cy, count = 7, step = 78 }) {
  return Array.from({ length: count }, (_, i) => {
    const r = step * (i + 1);
    const opacity = (0.5 - i * 0.055).toFixed(3);
    const dash = i % 2 === 0 ? "" : ` stroke-dasharray="3 12"`;
    return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${VIOLET_300}" stroke-opacity="${opacity}" stroke-width="1.5"${dash}/>`;
  }).join("\n      ");
}

/** Orthogonal lattice with the chevron notched out of it. */
function lattice({ cell = 56, stroke = 0.09 }) {
  const lines = [];
  for (let x = 0; x <= W; x += cell) {
    lines.push(
      `<line x1="${x}" y1="0" x2="${x}" y2="${H}" stroke="${VIOLET_300}" stroke-opacity="${stroke}" stroke-width="1"/>`,
    );
  }
  for (let y = 0; y <= H; y += cell) {
    lines.push(
      `<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="${VIOLET_300}" stroke-opacity="${stroke}" stroke-width="1"/>`,
    );
  }
  return lines.join("\n      ");
}

/** Nested chevrons — the mark's aperture, repeated outward. */
function chevrons({ cx, cy, count = 6, step = 74, span = 300 }) {
  return Array.from({ length: count }, (_, i) => {
    const o = step * (i + 1);
    const opacity = (0.55 - i * 0.075).toFixed(3);
    return `<path d="M ${cx - o} ${cy - span} L ${cx - o + span} ${cy} L ${cx - o} ${cy + span}" fill="none" stroke="${VIOLET_300}" stroke-opacity="${opacity}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
  }).join("\n      ");
}

/**
 * One entry per phase. `device` is the geometry that makes this plate its own,
 * `domeX`/`domeY` move the single violet bloom, and `ramp` walks the plate down
 * the ramp so the strip reads bright -> deep as the work gets more concrete.
 */
const PHASES = [
  {
    num: "01",
    name: "DISCOVER",
    file: "phase-01-discover.png",
    ramp: [VIOLET_100, VIOLET_300, VIOLET_500],
    domeX: "22%",
    domeY: "18%",
    // Sparse probes resolving into rings: looking, not yet building.
    device: () => `
      ${scanRings({ cx: 300, cy: 300 })}
      <g opacity="0.85">
        ${chevronBars({ rows: 9, depth: 0.86, from: 0.62, width: W * 0.38 })}
      </g>`,
  },
  {
    num: "02",
    name: "ARCHITECT",
    file: "phase-02-architect.png",
    ramp: [VIOLET_100, VIOLET_300, VIOLET_500],
    domeX: "50%",
    domeY: "6%",
    // Drawn structure: the lattice, with the aperture cut through it.
    device: () => `
      ${lattice({})}
      ${chevrons({ cx: 760, cy: 400 })}
      <g opacity="0.55">
        ${chevronBars({ rows: 11, depth: 0.78, width: W * 0.3 })}
      </g>`,
  },
  {
    num: "03",
    name: "ENGINEER",
    file: "phase-03-engineer.png",
    ramp: [VIOLET_300, VIOLET_500, VIOLET_700],
    domeX: "78%",
    domeY: "22%",
    // The device at full density — the phase where the thing gets built.
    device: () => `
      <g opacity="0.95">
        ${chevronBars({ rows: 23, depth: 0.58 })}
      </g>`,
  },
  {
    num: "04",
    name: "QA & REVIEW",
    file: "phase-04-qa-review.png",
    ramp: [VIOLET_300, VIOLET_500, VIOLET_700],
    domeX: "50%",
    domeY: "50%",
    // Paired passes: every bar checked against its mirror. Both fields are
    // held back hard — two full-density fields overlap into noise, and the
    // numeral has to stay readable through them.
    device: () => `
      <g opacity="0.62">
        ${chevronBars({ rows: 13, depth: 0.8, bias: -1.5, width: W * 0.78 })}
      </g>
      <g opacity="0.26">
        ${chevronBars({ rows: 13, depth: 0.8, bias: 1.5, flip: true, width: W * 0.78 })}
      </g>`,
  },
  {
    num: "05",
    name: "SCALE & SUPPORT",
    file: "phase-05-scale-support.png",
    ramp: [VIOLET_500, VIOLET_700, VIOLET_900],
    domeX: "50%",
    domeY: "96%",
    // The aperture opening outward — the same geometry, still growing.
    device: () => `
      ${chevrons({ cx: 420, cy: 400, count: 8, step: 96, span: 380 })}
      <g opacity="0.9">
        ${chevronBars({ rows: 13, depth: 0.72, flip: true, width: W * 0.55 })}
      </g>`,
  },
];

/** Phase names carry ampersands, and a bare `&` is a fatal XML parse error. */
const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const buildSvg = (phase) => `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- One dome, one hue. Never a multi-source mesh. -->
    <radialGradient id="dome" cx="${phase.domeX}" cy="${phase.domeY}" r="70%">
      <stop offset="0%"   stop-color="${VIOLET_500}" stop-opacity="0.42"/>
      <stop offset="45%"  stop-color="${VIOLET_700}" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="${CANVAS}"     stop-opacity="0"/>
    </radialGradient>

    <!-- Depth on the ramp is what separates one plate from the next. -->
    <linearGradient id="bar" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%"   stop-color="${phase.ramp[0]}"/>
      <stop offset="45%"  stop-color="${phase.ramp[1]}"/>
      <stop offset="100%" stop-color="${phase.ramp[2]}"/>
    </linearGradient>

    <linearGradient id="barfade" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%"   stop-color="white" stop-opacity="1"/>
      <stop offset="68%"  stop-color="white" stop-opacity="0.72"/>
      <stop offset="100%" stop-color="white" stop-opacity="0"/>
    </linearGradient>
    <mask id="barmask">
      <rect width="${W}" height="${H}" fill="url(#barfade)"/>
    </mask>

    <pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
      <circle cx="1" cy="1" r="1" fill="#ffffff" fill-opacity="0.07"/>
    </pattern>

    <!-- Keeps the numeral and label legible over whatever the device is doing. -->
    <linearGradient id="scrim" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%"   stop-color="${CANVAS}" stop-opacity="0.92"/>
      <stop offset="42%"  stop-color="${CANVAS}" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="${CANVAS}" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="${CANVAS}"/>
  <rect width="${W}" height="${H}" fill="url(#dots)"/>
  <rect width="${W}" height="${H}" fill="url(#dome)"/>

  <g mask="url(#barmask)">
    ${phase.device()}
  </g>

  <rect x="0" y="${H * 0.45}" width="${W}" height="${H * 0.55}" fill="url(#scrim)"/>

  <!-- Numeral and label. Display face, uppercase, neutral tracking. -->
  <text x="72" y="${H - 96}" font-family="${DISPLAY}" font-size="150" font-weight="700"
        letter-spacing="0" fill="${VIOLET_300}" fill-opacity="0.30">${phase.num}</text>
  <text x="72" y="${H - 52}" font-family="${DISPLAY}" font-size="30" font-weight="700"
        letter-spacing="1.6" fill="#ffffff">${esc(phase.name)}</text>

  <rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" fill="none" stroke="#ffffff" stroke-opacity="0.08"/>
</svg>`;

(async () => {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  for (const phase of PHASES) {
    const outPath = path.join(OUT_DIR, phase.file);
    await sharp(Buffer.from(buildSvg(phase))).png().toFile(outPath);
    const { size } = fs.statSync(outPath);
    console.log(
      `Wrote ${outPath} (${(size / 1024).toFixed(1)} KB, ${W}x${H})`,
    );
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
