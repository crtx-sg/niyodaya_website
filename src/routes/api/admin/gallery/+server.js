// Admin endpoints for the gallery:
//   GET  /api/admin/gallery        — list of uploaded (dynamic) photos
//   POST /api/admin/gallery        — multipart upload of a new photo
//   DELETE /api/admin/gallery?id=<id>  — remove an uploaded photo
//
// File storage strategy:
//   • If Insforge is configured → upload to Insforge Storage (bucket 'gallery')
//   • Otherwise → save to static/gallery/uploads/<filename> (dev only;
//     serves at /gallery/uploads/<filename>)

import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { insert, list, update } from '$lib/server/insforge.js';
import fs from 'node:fs/promises';
import path from 'node:path';

const UPLOAD_DIR = path.resolve('static/gallery/uploads');
const MAX_BYTES = 8 * 1024 * 1024;   // 8 MB
const ALLOWED = new Set(['image/jpeg', 'image/png', 'image/webp']);

function hasInsforge() { return Boolean(env.INSFORGE_URL && env.INSFORGE_API_KEY); }

export async function GET() {
  const rows = (await list('gallery_photos')) || [];
  rows.sort((a, b) => (b.created_at || '').localeCompare(a.created_at || ''));
  return json({ rows });
}

export async function POST({ request }) {
  let data;
  try { data = await request.formData(); } catch { return json({ error: 'Expected multipart form data' }, { status: 400 }); }

  const file = data.get('file');
  const caption = String(data.get('caption') || '').trim();
  const photo_date = String(data.get('photo_date') || '').trim();
  const programme_tag = String(data.get('programme_tag') || '').trim();
  const event_tag = String(data.get('event_tag') || '').trim();
  const consent_ok = String(data.get('consent_ok') || 'false') === 'true';

  if (!(file instanceof File)) return json({ error: 'file is required' }, { status: 400 });
  if (!caption) return json({ error: 'caption is required' }, { status: 400 });
  if (!consent_ok) return json({ error: 'Please confirm consent before uploading.' }, { status: 400 });
  if (file.size > MAX_BYTES) return json({ error: `File is too large (max ${Math.round(MAX_BYTES/1024/1024)} MB).` }, { status: 400 });
  if (!ALLOWED.has(file.type)) return json({ error: 'Only JPEG, PNG or WebP files are allowed.' }, { status: 400 });

  const ext = file.type === 'image/png' ? 'png' : file.type === 'image/webp' ? 'webp' : 'jpg';
  const safeName = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}.${ext}`;

  let image_url;

  if (hasInsforge()) {
    // Upload to Insforge Storage
    try {
      const buf = Buffer.from(await file.arrayBuffer());
      const form = new FormData();
      form.append('file', new Blob([buf], { type: file.type }), safeName);
      const res = await fetch(`${env.INSFORGE_URL}/api/storage/buckets/gallery/objects`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${env.INSFORGE_API_KEY}` },
        body: form
      });
      if (!res.ok) return json({ error: `Insforge storage: ${res.status} ${await res.text()}` }, { status: 502 });
      const out = await res.json();
      image_url = out.public_url || out.url || `${env.INSFORGE_URL}/storage/gallery/${safeName}`;
    } catch (err) {
      return json({ error: err.message }, { status: 500 });
    }
  } else {
    // Dev fallback — write to static/gallery/uploads/
    try {
      await fs.mkdir(UPLOAD_DIR, { recursive: true });
      const buf = Buffer.from(await file.arrayBuffer());
      await fs.writeFile(path.join(UPLOAD_DIR, safeName), buf);
      image_url = `/gallery/uploads/${safeName}`;
    } catch (err) {
      return json({ error: err.message }, { status: 500 });
    }
  }

  const result = await insert('gallery_photos', {
    image_url,
    caption,
    photo_date: photo_date || null,
    programme_tag: programme_tag || null,
    event_tag: event_tag || null,
    consent_ok,
    approved: true
  });
  if (!result.ok) return json({ error: result.error }, { status: 500 });
  return json({ ok: true, id: result.id, image_url });
}

export async function DELETE({ url }) {
  const id = url.searchParams.get('id');
  if (!id) return json({ error: 'id is required' }, { status: 400 });
  // Soft-delete by flipping approved=false (keeps the row + file for audit).
  const res = await update('gallery_photos', id, { approved: false });
  if (!res.ok) return json({ error: res.error }, { status: 400 });
  return json({ ok: true });
}
