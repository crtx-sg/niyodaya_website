// GET  /api/gallery — public list of approved gallery photos (v0.2+)
// POST /api/gallery — admin upload  (TODO: protect with Insforge Auth)
import { json } from '@sveltejs/kit';
import { list, insert } from '$lib/server/insforge.js';
import { galleryImages } from '$lib/data/gallery.js';

export async function GET() {
  // Combine static curated set + anything added at runtime
  const dynamic = await list('gallery_photos', { approved: 'true' });
  return json([...galleryImages, ...dynamic]);
}

export async function POST({ request }) {
  // v0.1: accepts metadata only. Actual image upload to Insforge Storage
  // should be wired in v0.2 (multipart form handling).
  let body;
  try { body = await request.json(); } catch { return json({ error: 'Invalid JSON' }, { status: 400 }); }
  const { image_url, caption, photo_date, programme_tag, event_tag } = body || {};
  if (!image_url || !caption) return json({ error: 'image_url and caption are required' }, { status: 400 });

  const result = await insert('gallery_photos', {
    image_url, caption, photo_date, programme_tag, event_tag,
    consent_ok: true, approved: true
  });
  return result.ok ? json({ ok: true, id: result.id }) : json({ error: result.error }, { status: 500 });
}
