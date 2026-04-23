import { l as list } from './insforge-zvA6LdDZ.js';
import { g as generateReceipt } from './receipt-CRm20XfJ.js';
import { e as error } from './shared-server-CO0iTl3r.js';
import 'pdfkit';

async function GET({ url }) {
  const paymentId = url.searchParams.get("payment_id");
  const pan = String(url.searchParams.get("pan") || "").toUpperCase();
  if (!paymentId || !pan) throw error(400, "payment_id and pan are required");
  const rows = await list("donations") || [];
  const d = rows.find((r) => r.razorpay_payment_id === paymentId && String(r.pan || "").toUpperCase() === pan);
  if (!d) throw error(404, "No matching donation found");
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
  return new Response(pdf, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="Niyodaya_80G_Receipt.pdf"`,
      "Cache-Control": "private, no-store"
    }
  });
}

export { GET };
//# sourceMappingURL=_server-BEJu-LsO.js.map
