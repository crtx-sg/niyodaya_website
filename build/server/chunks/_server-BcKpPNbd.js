import { j as json } from './shared-server-CpOoumKm.js';
import { l as list, i as insert } from './insforge-7dizFqev.js';
import { g as galleryImages } from './gallery-D5Yjdw_z.js';

async function GET() {
  const dynamic = await list("gallery_photos", { approved: "true" });
  return json([...galleryImages, ...dynamic]);
}
async function POST({ request }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid JSON" }, { status: 400 });
  }
  const { image_url, caption, photo_date, programme_tag, event_tag } = body || {};
  if (!image_url || !caption) return json({ error: "image_url and caption are required" }, { status: 400 });
  const result = await insert("gallery_photos", {
    image_url,
    caption,
    photo_date,
    programme_tag,
    event_tag,
    consent_ok: true,
    approved: true
  });
  return result.ok ? json({ ok: true, id: result.id }) : json({ error: result.error }, { status: 500 });
}

export { GET, POST };
//# sourceMappingURL=_server-BcKpPNbd.js.map
