// Server-only Airtable client.
//
// One endpoint (create records) does not justify an SDK dependency — this is a
// thin fetch wrapper. The `server-only` import makes an accidental client
// import a build error rather than a leaked write token in the browser bundle.
import "server-only";

const API = "https://api.airtable.com/v0";

/** Field names must match the `Leads` table provisioned by scripts/setup-airtable.js. */
export type LeadFields = {
  Name: string;
  Email: string;
  Company?: string;
  Segment?: string;
  "Project Type"?: string;
  Budget?: string;
  Timeline?: string;
  Message: string;
  "Source Page"?: string;
  "Interested In"?: string;
  Status?: string;
};

function config() {
  const token = process.env.AIRTABLE_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const table = process.env.AIRTABLE_TABLE || "Leads";

  if (!token || !baseId) {
    throw new Error(
      "Airtable is not configured — set AIRTABLE_TOKEN and AIRTABLE_BASE_ID.",
    );
  }
  return { token, baseId, table };
}

/**
 * Creates one record in the Leads table.
 *
 * Throws on any non-2xx. Callers must catch and surface a generic message:
 * Airtable's error bodies echo field and table names.
 */
export async function createLead(fields: LeadFields): Promise<string> {
  const { token, baseId, table } = config();

  const res = await fetch(`${API}/${baseId}/${encodeURIComponent(table)}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    // typecast lets Airtable resolve select values by name instead of
    // rejecting the write when a choice string does not match exactly.
    body: JSON.stringify({ records: [{ fields }], typecast: true }),
    cache: "no-store",
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Airtable ${res.status}: ${detail.slice(0, 500)}`);
  }

  const json = (await res.json()) as { records: { id: string }[] };
  return json.records[0].id;
}
