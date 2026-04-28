// =====================================================
// Liveness / keep-alive endpoint.
//   GET /health  → 200 { ok: true, ts, uptime_s }
// Public, unauthenticated, intentionally cheap so it can
// be pinged by uptime monitors or by a Render free-tier
// keep-warm cron without touching DB or external APIs.
// =====================================================

import { json } from '@sveltejs/kit';

const STARTED_AT = Date.now();

export async function GET() {
  return json(
    {
      ok: true,
      ts: new Date().toISOString(),
      uptime_s: Math.round((Date.now() - STARTED_AT) / 1000)
    },
    { headers: { 'Cache-Control': 'no-store' } }
  );
}

export async function HEAD() {
  return new Response(null, { status: 200, headers: { 'Cache-Control': 'no-store' } });
}
