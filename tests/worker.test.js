import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import worker, { updateI66 } from '../src/worker.js';

const xml = readFileSync(new URL('./fixtures/i66-2026-11-07-saturday.xml', import.meta.url), 'utf8');
function fakeEnv() {
  const kv = new Map(), rows = [];
  return {
    rows,
    SR_I66_URL: 'https://example.invalid/feed?token=XXXX',
    TOLLS: { get: async (k, t) => (kv.has(k) ? (t === 'json' ? JSON.parse(kv.get(k)) : kv.get(k)) : null), put: async (k, v) => kv.set(k, v) },
    DB: { prepare: () => ({ bind: (...a) => a }), batch: async (list) => rows.push(...list) },
  };
}

test('update stores the newest prices and adds history once per interval', async () => {
  const env = fakeEnv();
  const ok = await updateI66(env, async () => new Response(xml));
  assert.deepEqual(ok, { ok: true, interval: '2026-11-07T20:06:00Z', trips: 20 });
  await updateI66(env, async () => new Response(xml)); // same interval again
  assert.equal(env.rows.length, 20);
  const res = await worker.fetch(new Request('https://x/api/i66'), env);
  const body = await res.json();
  assert.equal(body.trips.find((t) => t.from === '3100' && t.to === '3130').toName, 'Spout Run Parkway (Rosslyn)');
});

test('a failed feed leaves the last good prices alone', async () => {
  const env = fakeEnv();
  await updateI66(env, async () => new Response(xml));
  const bad = await updateI66(env, async () => new Response('denied', { status: 401 }));
  assert.equal(bad.ok, false);
  assert.ok(await env.TOLLS.get('i66:latest', 'json'));
});
