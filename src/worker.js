// Worth the Toll? Cloudflare Worker.
// Every 5 minutes (cron) it fetches the live toll feeds, keeps the newest prices in KV for visitors,
// and adds every new interval to the D1 history (for "usually at this time" and price forecasts).
import { parseI66, tripStatus, I66_ZONES } from './feeds/i66.js';

const json = (data, status = 200) => new Response(JSON.stringify(data, null, 2), {
  status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'public, max-age=60' },
});

/** Fetch and store I-66 inside the Beltway. SR_I66_URL is a secret: the full feed link, token included. */
export async function updateI66(env, fetcher = fetch) {
  if (!env.SR_I66_URL) return { ok: false, why: 'SR_I66_URL secret is not set' };
  const res = await fetcher(env.SR_I66_URL, { headers: { accept: 'application/xml' }, cf: { cacheTtl: 0 } });
  if (!res.ok) return { ok: false, why: `feed answered ${res.status}` };
  const parsed = parseI66(await res.text());
  if (!parsed) return { ok: false, why: 'feed had no I-66 rows' };
  const prev = await env.TOLLS.get('i66:latest', 'json');
  await env.TOLLS.put('i66:latest', JSON.stringify({ ...parsed, fetchedAt: new Date().toISOString() }));
  // History: one row per trip per interval, only when the interval is new
  if (env.DB && prev?.interval?.start !== parsed.interval.start) {
    const stmt = env.DB.prepare('INSERT OR IGNORE INTO tolls (road, dir, from_zone, to_zone, interval_start, toll) VALUES (?, ?, ?, ?, ?, ?)');
    await env.DB.batch(parsed.trips.map((t) => stmt.bind('i66i', t.dir, t.from, t.to, parsed.interval.start, t.toll)));
  }
  return { ok: true, interval: parsed.interval.start, trips: parsed.trips.length };
}

export default {
  async scheduled(event, env, ctx) {
    const r = await updateI66(env);
    if (!r.ok) console.warn('I-66 update failed:', r.why);
  },

  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/api/i66') {
      const latest = await env.TOLLS.get('i66:latest', 'json');
      if (!latest) return json({ error: 'No prices yet. The first update runs within 5 minutes.' }, 503);
      const now = new Date();
      const trips = latest.trips.map((t) => {
        const zones = I66_ZONES[t.dir];
        return { ...t, fromName: zones.find((z) => z.id === t.from)?.name, toName: zones.find((z) => z.id === t.to)?.name,
          status: tripStatus(latest, t.dir, t.from, t.to, now) };
      });
      return json({ interval: latest.interval, fetchedAt: latest.fetchedAt, trips });
    }
    if (url.pathname === '/api/status') {
      const latest = await env.TOLLS.get('i66:latest', 'json');
      return json({ i66: latest ? { interval: latest.interval.start, fetchedAt: latest.fetchedAt } : null });
    }
    return new Response('Worth the Toll? is being built. Live data: /api/i66', { headers: { 'content-type': 'text/plain; charset=utf-8' } });
  },
};
