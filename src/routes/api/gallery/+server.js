// GET /api/gallery — public list.
// Combines the curated static set (src/lib/data/gallery.js) with
// admin-uploaded photos that have been approved.
//
// Admin upload lives at /api/admin/gallery (auth-protected).

import { json } from '@sveltejs/kit';
import { list } from '$lib/server/insforge.js';
import { galleryImages } from '$lib/data/gallery.js';

export async function GET() {
  const dynamic = ((await list('gallery_photos')) || []).filter((r) => r.approved);
  // Convert dynamic rows into the same shape as the curated list (url instead of file).
  const mapped = dynamic.map((r) => ({
    file: null,
    url: r.image_url,
    date: r.photo_date || r.created_at,
    event: r.event_tag || '',
    programme: r.programme_tag || '',
    caption: r.caption,
    id: r.id
  }));
  return json([...galleryImages, ...mapped]);
}
