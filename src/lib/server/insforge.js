// =====================================================
// Insforge client — backend data access layer
// =====================================================
// This is a thin wrapper over fetch(). In v0.1 we read
// INSFORGE_URL / INSFORGE_API_KEY from environment and
// POST to the correct endpoint.
//
// If these env vars are not set, we fall back to a
// local in-memory store so you can run the site and
// exercise every form end-to-end without any backend.
// =====================================================

import { env } from '$env/dynamic/private';

// ----- Local fallback store -----
const mem = {
  vridhi_applications: [],
  vinaya_requests: [],
  contact_messages: [],
  donations: [],
  gallery_photos: []
};

function hasInsforge() {
  return Boolean(env.INSFORGE_URL && env.INSFORGE_API_KEY);
}

/**
 * Insert a row into an Insforge table (or the local fallback).
 * @param {string} table
 * @param {Record<string, any>} row
 * @returns {Promise<{ok: boolean, id?: string, error?: string}>}
 */
export async function insert(table, row) {
  const payload = { ...row, created_at: new Date().toISOString() };

  if (!hasInsforge()) {
    const id = `local_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    mem[table] = mem[table] || [];
    mem[table].push({ id, ...payload });
    console.log(`[insforge:fallback] inserted into ${table}`, { id });
    return { ok: true, id };
  }

  try {
    const res = await fetch(`${env.INSFORGE_URL}/api/tables/${table}/rows`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.INSFORGE_API_KEY}`,
        'Content-Type': 'application/json'
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

/**
 * List rows from a table.
 * @param {string} table
 * @param {Record<string, any>} [where]
 */
export async function list(table, where = {}) {
  if (!hasInsforge()) return mem[table] || [];
  try {
    const q = new URLSearchParams(where).toString();
    const res = await fetch(`${env.INSFORGE_URL}/api/tables/${table}/rows?${q}`, {
      headers: { 'Authorization': `Bearer ${env.INSFORGE_API_KEY}` }
    });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}
