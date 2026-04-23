import { j as json } from './shared-server-CO0iTl3r.js';
import { l as list } from './insforge-zvA6LdDZ.js';
import { g as galleryImages } from './gallery-D5Yjdw_z.js';

async function GET() {
  const dynamic = (await list("gallery_photos") || []).filter((r) => r.approved);
  const mapped = dynamic.map((r) => ({
    file: null,
    url: r.image_url,
    date: r.photo_date || r.created_at,
    event: r.event_tag || "",
    programme: r.programme_tag || "",
    caption: r.caption,
    id: r.id
  }));
  return json([...galleryImages, ...mapped]);
}

export { GET };
//# sourceMappingURL=_server-bQLK5R9Y.js.map
