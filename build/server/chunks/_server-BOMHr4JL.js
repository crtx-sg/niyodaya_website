import { j as json } from './shared-server-CO0iTl3r.js';
import { s as seedSampleData, l as list } from './insforge-zvA6LdDZ.js';
import { t as toCSV } from './csv-CDoNwCwp.js';

const COLUMNS = [
  { key: "created_at", label: "Applied on" },
  { key: "student_name", label: "Student" },
  { key: "age", label: "Age" },
  { key: "father_name", label: "Father / Guardian" },
  { key: "phone", label: "Phone" },
  { key: "email", label: "Email" },
  { key: "school_name", label: "School" },
  { key: "reason", label: "Reason" },
  { key: "status", label: "Status" }
];
async function GET({ url }) {
  seedSampleData();
  const year = url.searchParams.get("year");
  const format = url.searchParams.get("format") || "json";
  let rows = await list("vridhi_applications") || [];
  if (year && year !== "all") rows = rows.filter((r) => (r.created_at || "").startsWith(year));
  rows.sort((a, b) => (b.created_at || "").localeCompare(a.created_at || ""));
  if (format === "csv") {
    const csv = toCSV(rows, COLUMNS);
    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="niyodaya-applications-${year || "all"}.csv"`
      }
    });
  }
  const years = [...new Set(
    (await list("vridhi_applications") || []).map((r) => (r.created_at || "").slice(0, 4)).filter(Boolean)
  )].sort().reverse();
  return json({ rows, years, columns: COLUMNS });
}

export { GET };
//# sourceMappingURL=_server-BOMHr4JL.js.map
