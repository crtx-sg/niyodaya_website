import { l as list } from './insforge-zvA6LdDZ.js';
import { g as generateReceipt } from './receipt-CRm20XfJ.js';
import { e as error } from './shared-server-CO0iTl3r.js';
import 'pdfkit';

async function GET({ url }) {
  const id = url.searchParams.get("id");
  if (!id) throw error(400, "id is required");
  const rows = await list("donations") || [];
  const d = rows.find((r) => r.id === id);
  if (!d) throw error(404, "Donation not found");
  const pdf = await generateReceipt({
    donor_name: d.donor_name,
    email: d.email,
    phone: d.phone,
    pan: d.pan,
    amount: d.amount,
    purpose: d.purpose,
    payment_id: d.razorpay_payment_id,
    order_id: d.razorpay_order_id,
    created_at: d.created_at
  });
  const safeName = String(d.donor_name || "donor").replace(/[^a-z0-9]+/gi, "_");
  return new Response(pdf, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="Niyodaya_80G_Receipt_${safeName}.pdf"`,
      "Cache-Control": "private, no-store"
    }
  });
}

export { GET };
//# sourceMappingURL=_server-B4vaJa5j.js.map
