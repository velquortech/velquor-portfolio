// Generates the app icon set: the chevron mark on a violet-500 squircle,
// per the app-icon board in the identity hand-off.
//
// Outputs:
//   app/icon.png          512  — Next App Router icon convention
//   app/apple-icon.png    180  — iOS home screen
//   app/favicon.ico       16/32/48 multi-size
//   public/images/favicon.ico   (kept in sync; referenced by older links)
//
// Run: node scripts/generate-icons.js
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const root = path.join(__dirname, "..");
const markPath = path.join(root, "public/images/velq-logo-white.png");

const VIOLET_500 = "#6600ff";

/** Renders the mark centred on a violet squircle at `size`. */
async function icon(size) {
  // 22% corner radius reads as a squircle at every size iOS and browsers use.
  const r = Math.round(size * 0.22);
  const plate = Buffer.from(
    `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${size}" height="${size}" rx="${r}" ry="${r}" fill="${VIOLET_500}"/>
    </svg>`,
  );

  // The mark is wider than tall; fit it to ~58% of the plate width so the
  // optical margin matches the hand-off's icon board.
  const markW = Math.round(size * 0.58);
  const mark = await sharp(markPath)
    .resize({ width: markW, fit: "inside" })
    .toBuffer();
  const { width, height } = await sharp(mark).metadata();

  return sharp(plate)
    .composite([
      {
        input: mark,
        left: Math.round((size - width) / 2),
        top: Math.round((size - height) / 2),
      },
    ])
    .png()
    .toBuffer();
}

/**
 * Packs PNGs into an .ico. The ICO container accepts embedded PNG data
 * directly, so no BMP encoding is needed.
 */
function buildIco(pngs) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(pngs.length, 4);

  let offset = 6 + pngs.length * 16;
  const entries = [];
  for (const { size, data } of pngs) {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0);
    e.writeUInt8(size >= 256 ? 0 : size, 1);
    e.writeUInt8(0, 2); // palette count
    e.writeUInt8(0, 3); // reserved
    e.writeUInt16LE(1, 4); // colour planes
    e.writeUInt16LE(32, 6); // bits per pixel
    e.writeUInt32LE(data.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += data.length;
    entries.push(e);
  }

  return Buffer.concat([header, ...entries, ...pngs.map((p) => p.data)]);
}

(async () => {
  const write = (rel, buf) => {
    const p = path.join(root, rel);
    fs.writeFileSync(p, buf);
    console.log(`Wrote ${rel} (${(buf.length / 1024).toFixed(1)} KB)`);
  };

  write("app/icon.png", await icon(512));
  write("app/apple-icon.png", await icon(180));

  const ico = buildIco(
    await Promise.all(
      [16, 32, 48].map(async (size) => ({ size, data: await icon(size) })),
    ),
  );
  write("app/favicon.ico", ico);
  write("public/images/favicon.ico", ico);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
