import { j as json } from './shared-server-CpOoumKm.js';
import { s as seedSampleData, l as list } from './insforge-BJ62C2Sl.js';
import { t as toCSV } from './csv-CDoNwCwp.js';

const COLUMNS = [
  { key: "created_at", label: "Registered on" },
  { key: "name", label: "Name" },
  { key: "contact", label: "Contact" },
  { key: "city", label: "City" },
  { key: "needs_or_skills", label: "Skills" },
  { key: "hours_per_week", label: "Hours/week" },
  { key: "description", label: "Notes" },
  { key: "status", label: "Status" }
];
async function GET({ url }) {
  seedSampleData();
  const format = url.searchParams.get("format") || "json";
  const year = url.searchParams.get("year");
  let rows = (await list("vinaya_requests") || []).filter((r) => r.type === "volunteer");
  if (year && year !== "all") rows = rows.filter((r) => (r.created_at || "").startsWith(year));
  rows.sort((a, b) => (b.created_at || "").localeCompare(a.created_at || ""));
  if (format === "csv") {
    const csv = toCSV(rows, COLUMNS);
    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="niyodaya-volunteers-${year || "all"}.csv"`
      }
    });
  }
  const years = [...new Set(
    (await list("vinaya_requests") || []).filter((r) => r.type === "volunteer").map((r) => (r.created_at || "").slice(0, 4)).filter(Boolean)
  )].sort().reverse();
  return json({ rows, years, columns: COLUMNS });
}

export { GET };
//# sourceMappingURL=_server-SKdzRmST.js.map
