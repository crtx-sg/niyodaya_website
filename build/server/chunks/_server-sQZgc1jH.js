import { j as json } from './shared-server-CpOoumKm.js';
import { s as seedSampleData, l as list, u as update } from './insforge-BJ62C2Sl.js';
import { t as toCSV } from './csv-CDoNwCwp.js';

const COLUMNS = [
  { key: "created_at", label: "Date" },
  { key: "donor_name", label: "Donor name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "pan", label: "PAN" },
  { key: "amount", label: "Amount (INR)" },
  { key: "purpose", label: "Purpose" },
  { key: "razorpay_payment_id", label: "Payment ref" },
  { key: "cert_sent", label: "80G sent?" },
  { key: "status", label: "Status" }
];
async function GET({ url }) {
  seedSampleData();
  const year = url.searchParams.get("year");
  const format = url.searchParams.get("format") || "json";
  let rows = await list("donations") || [];
  if (year && year !== "all") rows = rows.filter((r) => (r.created_at || "").startsWith(year));
  rows.sort((a, b) => (b.created_at || "").localeCompare(a.created_at || ""));
  if (format === "csv") {
    const csv = toCSV(rows.map((r) => ({ ...r, cert_sent: r.cert_sent ? "Yes" : "No" })), COLUMNS);
    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="niyodaya-donors-${year || "all"}.csv"`
      }
    });
  }
  const totalAmount = rows.reduce((s, r) => s + (Number(r.amount) || 0), 0);
  const years = [...new Set(
    (await list("donations") || []).map((r) => (r.created_at || "").slice(0, 4)).filter(Boolean)
  )].sort().reverse();
  return json({ rows, totalAmount, years, columns: COLUMNS });
}
async function PATCH({ request }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (!body.id) return json({ error: "id is required" }, { status: 400 });
  const res = await update("donations", body.id, { cert_sent: Boolean(body.cert_sent) });
  if (!res.ok) return json({ error: res.error }, { status: 400 });
  return json({ ok: true, row: res.row });
}

export { GET, PATCH };
//# sourceMappingURL=_server-sQZgc1jH.js.map
