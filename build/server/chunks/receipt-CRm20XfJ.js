import PDFDocument from 'pdfkit';

const BLUE = "#1e3a8a";
const SAFFRON = "#b45309";
const INK = "#1f2937";
const MUTED = "#6b7280";
function generateReceipt(d) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ size: "A4", margin: 50 });
      const chunks = [];
      doc.on("data", (c) => chunks.push(c));
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.on("error", reject);
      const receiptNo = `NF/80G/${(d.payment_id || d.order_id || Date.now().toString()).slice(-8).toUpperCase()}`;
      const date = d.created_at ? new Date(d.created_at) : /* @__PURE__ */ new Date();
      doc.rect(0, 0, doc.page.width, 80).fill(BLUE);
      doc.fillColor("#fffbeb").font("Helvetica-Bold").fontSize(22).text("NIYODAYA FOUNDATION", 50, 24, { width: doc.page.width - 100 });
      doc.fontSize(10).font("Helvetica-Oblique").fillColor("#fde68a").text("a new dawn for every child's learning", 50, 52);
      doc.fillColor(INK).font("Helvetica").fontSize(9);
      doc.text("Saideep Haven, Sri Rama Temple Road, New Thippasandra, Bangalore 560075, Karnataka, India", 50, 92, { align: "left" });
      doc.text("Email: contact@niyodaya.in   ·   Website: niyodaya.in", 50, 104);
      doc.fillColor(MUTED).fontSize(8);
      doc.text("Section 8 Non-profit (Companies Act, 2013)   ·   PAN: AAHCN6260D   ·   80G Ref: AAHCN6260DF20241   ·   Darpan ID: KA/2025/0606271", 50, 118, { width: doc.page.width - 100 });
      doc.moveTo(50, 138).lineTo(doc.page.width - 50, 138).strokeColor("#f59e0b").lineWidth(2).stroke();
      doc.fillColor(BLUE).font("Helvetica-Bold").fontSize(16).text("Receipt of Donation", 50, 156, { align: "center" });
      doc.fillColor(MUTED).font("Helvetica").fontSize(9).text("(Eligible for tax exemption under Section 80G of the Income Tax Act, 1961)", 50, 178, { align: "center" });
      const metaY = 210;
      doc.fillColor(INK).font("Helvetica").fontSize(10);
      doc.text(`Receipt No:  ${receiptNo}`, 50, metaY);
      doc.text(`Date:  ${date.toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}`, doc.page.width - 200, metaY);
      const bodyY = metaY + 30;
      doc.fillColor(INK).font("Helvetica").fontSize(11);
      const amountInWords = numberToWordsINR(Number(d.amount));
      const paragraph = `Received with thanks from ${d.donor_name} (PAN ${String(d.pan || "").toUpperCase()}) a sum of ₹ ${formatAmount(d.amount)} (Rupees ${amountInWords} only) by electronic payment towards the charitable objects of Niyodaya Foundation.`;
      doc.text(paragraph, 50, bodyY, { width: doc.page.width - 100, align: "justify", lineGap: 3 });
      const detailsY = bodyY + 100;
      const rows = [
        ["Donor name", d.donor_name],
        ["PAN", String(d.pan || "").toUpperCase()],
        ["Email", d.email || "—"],
        ["Phone", d.phone || "—"],
        ["Amount", `₹ ${formatAmount(d.amount)} (${amountInWords})`],
        ["Purpose", d.purpose || "General donation"],
        ["Payment mode", "Razorpay / Online"],
        ["Payment ref", d.payment_id || "—"],
        ["Order ref", d.order_id || "—"]
      ];
      let y = detailsY;
      rows.forEach(([k, v]) => {
        doc.font("Helvetica-Bold").fillColor(MUTED).fontSize(9).text(k, 50, y, { width: 130 });
        doc.font("Helvetica").fillColor(INK).fontSize(10).text(String(v || "—"), 185, y, { width: doc.page.width - 235 });
        y += 20;
      });
      const clauseY = y + 20;
      doc.fillColor(SAFFRON).font("Helvetica-Bold").fontSize(10).text("Tax exemption", 50, clauseY);
      doc.fillColor(INK).font("Helvetica").fontSize(9.5).text(
        "Donations to Niyodaya Foundation are eligible for deduction under Section 80G of the Income Tax Act, 1961. Please retain this receipt for your tax records. The organisational 80G certificate and the Memorandum of Association can be downloaded from niyodaya.in/resources.",
        50,
        clauseY + 16,
        { width: doc.page.width - 100, align: "justify", lineGap: 2 }
      );
      const sigY = doc.page.height - 150;
      doc.moveTo(doc.page.width - 230, sigY).lineTo(doc.page.width - 70, sigY).strokeColor("#94a3b8").lineWidth(0.5).stroke();
      doc.fillColor(INK).font("Helvetica-Bold").fontSize(10).text("For Niyodaya Foundation", doc.page.width - 230, sigY + 6);
      doc.font("Helvetica").fontSize(9).fillColor(MUTED).text("Authorised Signatory", doc.page.width - 230, sigY + 22);
      doc.rect(0, doc.page.height - 40, doc.page.width, 40).fill(BLUE);
      doc.fillColor("#cbd5e1").font("Helvetica").fontSize(8).text(
        `Niyodaya Foundation · contact@niyodaya.in · niyodaya.in   |   Generated on ${(/* @__PURE__ */ new Date()).toLocaleString("en-IN")}`,
        50,
        doc.page.height - 26,
        { width: doc.page.width - 100, align: "center" }
      );
      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}
function formatAmount(n) {
  return Number(n || 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
const ONES = [
  "",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen"
];
const TENS = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
function twoDigit(n) {
  if (n < 20) return ONES[n];
  const t = Math.floor(n / 10), r = n % 10;
  return TENS[t] + (r ? "-" + ONES[r] : "");
}
function threeDigit(n) {
  const h = Math.floor(n / 100), r = n % 100;
  const parts = [];
  if (h) parts.push(ONES[h] + " hundred");
  if (r) parts.push(twoDigit(r));
  return parts.join(" ");
}
function numberToWordsINR(num) {
  num = Math.floor(Number(num) || 0);
  if (num === 0) return "zero";
  const parts = [];
  const crore = Math.floor(num / 1e7);
  num %= 1e7;
  const lakh = Math.floor(num / 1e5);
  num %= 1e5;
  const thousand = Math.floor(num / 1e3);
  num %= 1e3;
  if (crore) parts.push(twoDigit(crore) + " crore");
  if (lakh) parts.push(twoDigit(lakh) + " lakh");
  if (thousand) parts.push(twoDigit(thousand) + " thousand");
  if (num) parts.push(threeDigit(num));
  const s = parts.join(" ").trim();
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export { generateReceipt as g };
//# sourceMappingURL=receipt-CRm20XfJ.js.map
