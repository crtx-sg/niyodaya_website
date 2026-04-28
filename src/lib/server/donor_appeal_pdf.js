// =====================================================
// Donor-appeal PDF generator — produces a print-ready
// version of DONOR_APPEAL.md for download / email
// circulation. Hand-laid out with pdfkit (no markdown
// renderer dependency); keep this file in lock-step
// with DONOR_APPEAL.md when copy is revised.
// =====================================================

import PDFDocument from 'pdfkit';

const BLUE    = '#1e3a8a';
const SAFFRON = '#b45309';
const INK     = '#1f2937';
const MUTED   = '#6b7280';
const PAPER   = '#fffbeb';

const MARGIN_X = 56;
const MARGIN_TOP = 92;     // leaves room for the header band drawn on every page
const MARGIN_BOTTOM = 64;

/**
 * Build the donor-appeal PDF.
 * @returns {Promise<Buffer>}
 */
export function generateDonorAppealPdf() {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: 'A4',
        margins: { top: MARGIN_TOP, bottom: MARGIN_BOTTOM, left: MARGIN_X, right: MARGIN_X },
        info: {
          Title:    'Niyodaya Foundation — Donor Appeal',
          Author:   'Niyodaya Foundation',
          Subject:  'Appeal to potential donors — Project Vidya, Gandhiji Memorial Vimanapura Vidya Mandir',
          Keywords: 'Niyodaya, donation, 80G, Project Vidya, Vimanapura'
        }
      });
      const chunks = [];
      doc.on('data', (c) => chunks.push(c));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);

      drawHeader(doc);
      doc.on('pageAdded', () => drawHeader(doc));

      // ---------- Title block ----------
      doc.fillColor(BLUE).font('Helvetica-Bold').fontSize(22).text('A request, with folded hands', { align: 'center' });
      doc.moveDown(0.3);
      doc.fillColor(MUTED).font('Helvetica-Oblique').fontSize(11).text('From the trustees of Niyodaya Foundation, Bengaluru', { align: 'center' });
      doc.moveDown(1.2);

      // ---------- Body ----------
      const W = doc.page.width - MARGIN_X * 2;
      const para = (text, opts = {}) => {
        doc.fillColor(INK).font('Helvetica').fontSize(11)
           .text(text, { width: W, align: 'justify', lineGap: 2, ...opts });
        doc.moveDown(0.6);
      };
      const heading2 = (text) => {
        doc.moveDown(0.4);
        doc.fillColor(BLUE).font('Helvetica-Bold').fontSize(14).text(text, { width: W });
        doc.moveDown(0.2);
        doc.strokeColor('#f59e0b').lineWidth(1.5).moveTo(MARGIN_X, doc.y).lineTo(MARGIN_X + 60, doc.y).stroke();
        doc.moveDown(0.6);
      };
      const bullet = (text) => {
        doc.fillColor(INK).font('Helvetica').fontSize(11);
        doc.text('•  ', MARGIN_X, doc.y, { continued: true, lineGap: 2 });
        doc.text(text, { width: W - 14, align: 'left', lineGap: 2 });
        doc.moveDown(0.3);
      };

      para('Dear friend,');
      para('We write to you with a small request, made in earnest.');

      para('Niyodaya Foundation ("Niyodaya" — a new dawn) is a Bengaluru-based Section 8 non-profit, formally incorporated on 15 May 2021 under the Companies Act, 2013. The work, however, began much earlier — since 2010, our founding team has volunteered at low-resourced government schools in and around Bengaluru, setting up science labs, libraries and computer rooms, running science exhibitions inspired by Arvind Gupta\'s Toys from Trash, and helping schools celebrate festivals and national events. Niyodaya is the formal continuation of that journey.');

      para('Our mission is simple: to bring holistic, values-led education within reach of every child — especially those from underprivileged, displaced, or specially-abled backgrounds. We try to combine academic rigour with values, life-skills, and dignity, so a child does not just pass an exam but grows into a thoughtful, capable adult.');

      para('We work along three threads:');
      bullet('Project Vidya — we adopt entire schools and sustain them with the combined support of donors, volunteers, and the school\'s own staff. We sign an MoU, assess gaps, fund the plan, and review outcomes twice a year.  (niyodaya.in/programmes/vidya)');
      bullet('Project Vinaya — we connect deserving schools with teaching materials, volunteer educators, and long-form mentorship — textbooks, lab kits, computer hardware, sports equipment, and qualified volunteers who give 2–6 hours a week.  (niyodaya.in/programmes/vinaya)');
      bullet('Project Vridhi — a second chance for children who drop out or don\'t clear Class 10 / 12 board exams. We counsel, re-engage, and provide NIOS and vocational pathways so the journey continues.  (niyodaya.in/programmes/vridhi)');

      // ---------- The ask ----------
      heading2('The ask: adopt Gandhiji Memorial Vimanapura Vidya Mandir, this academic year');

      para('Under Project Vidya, our flagship adoption for the upcoming academic year is the Gandhiji Memorial Vimanapura Vidya Mandir — a small primary school in Bengaluru where more than 50 children, boys and girls, drawn from nearby slums and construction-worker families, are enrolled up to Std. 7. For most of these children this school is the only link to formal learning; without it, many would simply not attend at all.');

      para('The school receives partial government support — textbooks and the salary of one officially appointed teacher. Everything else — the rest of the teachers, learning material beyond textbooks, mid-day-meal supplements, basic infrastructure upkeep — depends on donor support. To run the school well, we need to fund four volunteer teachers at an honorarium of Rs. 20,000 per month each, alongside the school\'s other day-to-day needs.');

      drawCostBlock(doc);

      doc.moveDown(0.4);
      para('Any contribution — large or small, one-time or recurring — moves us closer. As a guide, the donate page lists what specific amounts enable:');
      bullet('Rs. 7,500 — uniform, books and stationery for one child for a year');
      bullet('Rs. 2,40,000 — one volunteer-teacher salary for a year');
      bullet('Rs. 3,00,000 — adopts one classroom at the school for a full year');

      para('If you would like to fund a specific line item — a teacher, a classroom, a child — we are very glad to earmark your donation accordingly and report back on its use.');

      // ---------- How to give ----------
      heading2('How to give');

      bullet('Online (preferred): niyodaya.in/donate — opens a secure Razorpay checkout. You will receive an automatic donation receipt by email, with the 80G clause clearly mentioned.');
      bullet('Razorpay direct link: razorpay.me/@niyodayafoundation — for UPI / netbanking from your banking app.');
      bullet('Bank transfer (NEFT / IMPS / UPI):  Niyodaya Foundation  ·  Axis Bank  ·  A/C 921010023379607  ·  IFSC UTIB0004426. After the transfer, please email a screenshot together with your PAN and address to contact@niyodaya.in so we can issue the 80G receipt.');

      doc.moveDown(0.4);
      doc.fillColor(SAFFRON).font('Helvetica-Bold').fontSize(11).text('A few practical notes', { width: W });
      doc.moveDown(0.3);
      bullet('All donations must be made in Indian Rupees (INR) only. We are presently set up to receive only domestic contributions.');
      bullet('Donations to Niyodaya Foundation are exempt under Section 80G of the Income Tax Act, vide Regn. No. AAHCN6260DF20241, for the period AY 2025-26 to AY 2027-28. Niyodaya Foundation PAN: AAHCN6260D.');
      bullet('For your tax records you will receive a donation receipt, which carries the 80G reference and may be retained for filing.');

      // ---------- Closing ----------
      heading2('In closing');

      para('We do not take any donor\'s contribution for granted. Niyodaya operates on modest funds, and every rupee is stewarded carefully — we publish our annual financials on our Resources page, and our Memorandum of Association and 80G certificate are available there for download.');

      para('If you would like to visit the school, meet the children, or speak with us before contributing, please write to us at contact@niyodaya.in — we would welcome your visit. The website niyodaya.in carries more about our work, the team, and a small gallery of moments from the schools we support.');

      doc.moveDown(0.6);
      doc.fillColor(INK).font('Helvetica-Oblique').fontSize(11)
         .text('With folded hands, and on behalf of the children of Gandhiji Memorial Vimanapura Vidya Mandir,', { width: W });
      doc.moveDown(0.8);
      doc.fillColor(BLUE).font('Helvetica-Bold').fontSize(11).text('The trustees,', { width: W });
      doc.font('Helvetica-Bold').text('Niyodaya Foundation', { width: W });
      doc.fillColor(MUTED).font('Helvetica').fontSize(10).text('Bengaluru 560075   ·   contact@niyodaya.in   ·   niyodaya.in', { width: W });

      // ---------- Footer band on the LAST page only ----------
      drawFooterBand(doc);

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}

// ---------- helpers ----------

function drawHeader(doc) {
  doc.save();
  doc.rect(0, 0, doc.page.width, 72).fill(BLUE);
  doc.fillColor(PAPER).font('Helvetica-Bold').fontSize(18).text('NIYODAYA FOUNDATION', MARGIN_X, 22, { width: doc.page.width - MARGIN_X * 2, lineBreak: false });
  doc.fontSize(9).font('Helvetica-Oblique').fillColor('#fde68a').text("a new dawn for every child's learning", MARGIN_X, 46, { lineBreak: false });
  doc.fillColor('#fde68a').font('Helvetica').fontSize(8.5)
     .text('Section 8 Non-profit  ·  PAN AAHCN6260D  ·  80G Regn AAHCN6260DF20241  ·  niyodaya.in', MARGIN_X, 58, { width: doc.page.width - MARGIN_X * 2, lineBreak: false });
  doc.restore();
  // Reset the cursor below the header so flow-mode body text starts cleanly.
  doc.x = MARGIN_X;
  doc.y = MARGIN_TOP;
}

function drawFooterBand(doc) {
  const y = doc.page.height - 36;
  doc.save();
  doc.rect(0, y, doc.page.width, 36).fill(BLUE);
  doc.fillColor('#cbd5e1').font('Helvetica').fontSize(8)
     .text('Niyodaya Foundation  ·  contact@niyodaya.in  ·  niyodaya.in   |   Donations are exempt u/s 80G — Regn No. AAHCN6260DF20241 (AY 2025-26 to AY 2027-28)',
           MARGIN_X, y + 12, { width: doc.page.width - MARGIN_X * 2, align: 'center' });
  doc.restore();
}

function drawCostBlock(doc) {
  const W = doc.page.width - MARGIN_X * 2;

  doc.moveDown(0.4);
  const startY = doc.y;

  // Frame
  const lines = [
    { label: 'Volunteer teacher honorarium (per teacher)',                                   amount: 'Rs. 20,000 / month   ·   Rs. 2,40,000 / year' },
    { label: 'Four volunteer teachers (combined)',                                           amount: 'Rs. 80,000 / month   ·   Rs. 9,60,000 / year', bold: true },
    { label: 'School supplies, infrastructure, mid-day-meal supplements (estimate)',         amount: 'Rs. 15,000 / month   ·   Rs. 1,80,000 / year' },
    { label: 'Approximate annual ask',                                                       amount: 'Rs. 11,40,000 / year', bold: true }
  ];

  for (const ln of lines) {
    doc.fillColor(ln.bold ? BLUE : INK)
       .font(ln.bold ? 'Helvetica-Bold' : 'Helvetica')
       .fontSize(10.5)
       .text(ln.label, { width: W, lineGap: 1, continued: false });
    doc.fillColor(MUTED).font('Helvetica-Oblique').fontSize(10)
       .text(ln.amount, { width: W, lineGap: 1, indent: 14 });
    doc.moveDown(0.35);
  }

  // Subtle left rule to mark the cost block visually without breaking flow layout.
  doc.save();
  doc.strokeColor('#f59e0b').lineWidth(2)
     .moveTo(MARGIN_X - 6, startY).lineTo(MARGIN_X - 6, doc.y - 2).stroke();
  doc.restore();
}
