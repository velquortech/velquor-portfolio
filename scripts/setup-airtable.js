// Provisions the Velquor "Leads" table in Airtable.
//
// Idempotent: safe to re-run. Creates the base if needed, creates the table if
// missing, and adds only the fields that do not already exist.
//
// Usage:
//   AIRTABLE_SETUP_TOKEN=pat...  AIRTABLE_WORKSPACE_ID=wsp...  node scripts/setup-airtable.js
//   AIRTABLE_SETUP_TOKEN=pat...  AIRTABLE_BASE_ID=app...       node scripts/setup-airtable.js
//   node scripts/setup-airtable.js --dry-run
//
// The setup token needs schema.bases:write (plus schema.bases:read, and
// workspacesAndBases:write when creating a new base). It is SEPARATE from the
// runtime token the site uses — that one only needs data.records:write. Do not
// put this setup token in .env or Vercel.
const API = "https://api.airtable.com/v0";

const TABLE_NAME = process.env.AIRTABLE_TABLE || "Leads";
const BASE_NAME = process.env.AIRTABLE_BASE_NAME || "Velquor";
const token = process.env.AIRTABLE_SETUP_TOKEN;
const workspaceId = process.env.AIRTABLE_WORKSPACE_ID;
let baseId = process.env.AIRTABLE_BASE_ID;
const dryRun = process.argv.includes("--dry-run");

const select = (choices) => ({
  type: "singleSelect",
  options: { choices: choices.map((name) => ({ name })) },
});

/**
 * Field definitions. `Name` is first so Airtable uses it as the primary field
 * — the primary field cannot be a select or a computed type.
 */
const FIELDS = [
  { name: "Name", type: "singleLineText" },
  { name: "Email", type: "email" },
  { name: "Company", type: "singleLineText" },
  {
    name: "Segment",
    ...select(["Founder", "Procurement", "Other"]),
    description: "Audience split from the brand hand-off's hero pills",
  },
  {
    name: "Project Type",
    ...select([
      "Custom Software",
      "Web Platform / SaaS",
      "Mobile App",
      "API / Backend",
      "Cloud & DevOps",
      "UI/UX Engineering",
      "Not sure",
    ]),
  },
  {
    name: "Budget",
    ...select(["< $10k", "$10k – $25k", "$25k – $50k", "$50k+", "Not sure"]),
  },
  {
    name: "Timeline",
    ...select(["ASAP", "1–3 months", "3–6 months", "Just exploring"]),
  },
  { name: "Message", type: "multilineText" },
  { name: "Source Page", type: "singleLineText" },
  {
    name: "Interested In",
    type: "singleLineText",
    description: "Case-study name when submitted from a project page",
  },
  {
    name: "Status",
    ...select(["New", "Contacted", "Qualified", "Won", "Lost"]),
  },
];

// Airtable stamps every record with a creation time, so no "Submitted At"
// field is created. Surface it in a view via the "Created time" field type if
// the team wants it visible.

async function call(path, { method = "GET", body } = {}) {
  const res = await fetch(`${API}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  let json;
  try {
    json = text ? JSON.parse(text) : {};
  } catch {
    json = { raw: text };
  }

  if (!res.ok) {
    const detail = json?.error?.message || json?.error?.type || res.statusText;
    throw new Error(`${method} ${path} → ${res.status}: ${detail}`);
  }
  return json;
}

function preflight() {
  if (dryRun) return;
  if (!token) {
    console.error(
      "Missing AIRTABLE_SETUP_TOKEN.\n" +
        "Create a Personal Access Token at https://airtable.com/create/tokens with scopes:\n" +
        "  schema.bases:read, schema.bases:write" +
        (baseId ? "" : ", workspacesAndBases:write") +
        "\nThen re-run. See --dry-run to preview the schema without a token.",
    );
    process.exit(1);
  }
  if (!baseId && !workspaceId) {
    console.error(
      "Set AIRTABLE_BASE_ID (existing base) or AIRTABLE_WORKSPACE_ID (create a new base).\n" +
        "The workspace id is the wsp… segment in your Airtable URL.",
    );
    process.exit(1);
  }
}

(async () => {
  if (dryRun) {
    console.log(`Table: ${TABLE_NAME}\n`);
    for (const f of FIELDS) {
      const choices = f.options?.choices?.map((c) => c.name).join(" · ");
      console.log(
        `  ${f.name.padEnd(15)} ${f.type}${choices ? `  [${choices}]` : ""}`,
      );
    }
    console.log(`\n${FIELDS.length} fields. Dry run — nothing was created.`);
    return;
  }

  preflight();

  // 1. Base — create it if we were only given a workspace.
  if (!baseId) {
    const created = await call("/meta/bases", {
      method: "POST",
      body: {
        name: BASE_NAME,
        workspaceId,
        tables: [{ name: TABLE_NAME, fields: FIELDS }],
      },
    });
    baseId = created.id;
    console.log(`Created base "${BASE_NAME}" (${baseId})`);
    console.log(`Created table "${TABLE_NAME}" with ${FIELDS.length} fields`);
    report();
    return;
  }

  // 2. Existing base — create the table, or reconcile its fields.
  const { tables } = await call(`/meta/bases/${baseId}/tables`);
  const existing = tables.find((t) => t.name === TABLE_NAME);

  if (!existing) {
    const table = await call(`/meta/bases/${baseId}/tables`, {
      method: "POST",
      body: { name: TABLE_NAME, fields: FIELDS },
    });
    console.log(`Created table "${TABLE_NAME}" (${table.id})`);
    report();
    return;
  }

  console.log(`Table "${TABLE_NAME}" exists (${existing.id}) — reconciling`);
  const have = new Set(existing.fields.map((f) => f.name));
  const missing = FIELDS.filter((f) => !have.has(f.name));

  if (!missing.length) {
    console.log("All fields present. Nothing to do.");
    report();
    return;
  }

  for (const field of missing) {
    // Added one at a time so a single rejected field does not abort the rest.
    try {
      await call(`/meta/bases/${baseId}/tables/${existing.id}/fields`, {
        method: "POST",
        body: field,
      });
      console.log(`  + ${field.name}`);
    } catch (e) {
      console.error(`  ! ${field.name} — ${e.message}`);
    }
  }
  report();
})().catch((e) => {
  console.error(`\n${e.message}`);
  process.exit(1);
});

function report() {
  console.log(
    "\nNext: create a SECOND token for the site, scoped to this base with" +
      "\n  data.records:write   (write only — not schema access)" +
      "\n\nThen set:" +
      `\n  vercel env add AIRTABLE_TOKEN` +
      `\n  vercel env add AIRTABLE_BASE_ID     # ${baseId}` +
      `\n  vercel env add AIRTABLE_TABLE       # ${TABLE_NAME}` +
      "\n  vercel env pull --yes",
  );
}
