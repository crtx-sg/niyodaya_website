import { b as private_env } from './shared-server-CpOoumKm.js';

const mem = {
  vridhi_applications: [],
  vinaya_requests: [],
  contact_messages: [],
  donations: [],
  gallery_photos: []
};
function hasInsforge() {
  return Boolean(private_env.INSFORGE_URL && private_env.INSFORGE_API_KEY);
}
async function insert(table, row) {
  const payload = { ...row, created_at: (/* @__PURE__ */ new Date()).toISOString() };
  if (!hasInsforge()) {
    const id = `local_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    mem[table] = mem[table] || [];
    mem[table].push({ id, ...payload });
    console.log(`[insforge:fallback] inserted into ${table}`, { id });
    return { ok: true, id };
  }
  try {
    const res = await fetch(`${private_env.INSFORGE_URL}/api/tables/${table}/rows`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${private_env.INSFORGE_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      const t = await res.text();
      return { ok: false, error: `Insforge ${res.status}: ${t}` };
    }
    const data = await res.json();
    return { ok: true, id: data.id };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}
async function list(table, where = {}) {
  if (!hasInsforge()) return mem[table] || [];
  try {
    const q = new URLSearchParams(where).toString();
    const res = await fetch(`${private_env.INSFORGE_URL}/api/tables/${table}/rows?${q}`, {
      headers: { "Authorization": `Bearer ${private_env.INSFORGE_API_KEY}` }
    });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

export { insert as i, list as l };
//# sourceMappingURL=insforge-7dizFqev.js.map
