// Public download — donor-appeal letter as a print-ready PDF.
//   GET /donor-appeal.pdf  → application/pdf
//
// The PDF mirrors DONOR_APPEAL.md and is regenerated on each request
// (cheap — pure pdfkit, no DB / external calls). If you tweak the
// letter copy, edit src/lib/server/donor_appeal_pdf.js (and keep
// DONOR_APPEAL.md in sync for human readers).

import { generateDonorAppealPdf } from '$lib/server/donor_appeal_pdf.js';

export async function GET({ url }) {
  const pdf = await generateDonorAppealPdf();
  const inline = url.searchParams.get('inline') === '1';
  return new Response(pdf, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Length': String(pdf.length),
      'Content-Disposition': `${inline ? 'inline' : 'attachment'}; filename="Niyodaya_Donor_Appeal.pdf"`,
      'Cache-Control': 'public, max-age=3600'
    }
  });
}
