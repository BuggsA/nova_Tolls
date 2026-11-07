import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { parseI66, tripStatus, tollHours, I66_ZONES } from '../src/feeds/i66.js';

const saturday = readFileSync(new URL('./fixtures/i66-2026-11-07-saturday.xml', import.meta.url), 'utf8');

test('keeps only the newest 6-minute interval', () => {
  const p = parseI66(saturday);
  assert.equal(p.interval.start, '2026-11-07T20:06:00Z');
  assert.equal(p.interval.end, '2026-11-07T20:12:00Z');
  assert.equal(p.trips.length, 20); // 10 trips each way
});

test('every entry/exit pair in the feed uses a zone we know', () => {
  const ids = new Set([...I66_ZONES.EB, ...I66_ZONES.WB].map((z) => z.id));
  for (const t of parseI66(saturday).trips) { assert.ok(ids.has(t.from)); assert.ok(ids.has(t.to)); }
});

test('Saturday: every toll is $0 and shows as free', () => {
  const p = parseI66(saturday);
  assert.ok(p.trips.every((t) => t.toll === 0));
  const s = tripStatus(p, 'EB', '3100', '3130', new Date('2026-11-07T20:10:00Z'));
  assert.deepEqual(s, { state: 'free', expected: false });
});

test('a priced weekday trip', () => {
  const xml = saturday.replaceAll('2026-11-07', '2026-11-10').replace(
    /(CorridorID="1100"[^>]*EndZoneID="3130"[^>]*IntervalDateTime="2026-11-10T20:06:00Z"[^>]*StartZoneID="3100"[^>]*ZoneTollRate=")0\.0000/, '$16.5000');
  const p = parseI66(xml);
  assert.deepEqual(tripStatus(p, 'EB', '3100', '3130', new Date('2026-11-10T20:10:00Z')), { state: 'tolled', toll: 6.5 });
});

test('an old feed is never shown as live', () => {
  const s = tripStatus(parseI66(saturday), 'EB', '3100', '3130', new Date('2026-11-07T21:00:00Z'));
  assert.equal(s.state, 'stale');
});

test('toll hours in Eastern time, including across the DST change', () => {
  assert.equal(tollHours('EB', new Date('2026-11-10T12:00:00Z')), true);   // Tue 7:00 AM EST
  assert.equal(tollHours('EB', new Date('2026-11-10T15:00:00Z')), false);  // Tue 10:00 AM EST
  assert.equal(tollHours('WB', new Date('2026-07-14T21:30:00Z')), true);   // Tue 5:30 PM EDT
  assert.equal(tollHours('EB', new Date('2026-11-07T12:00:00Z')), false);  // Saturday
});

test('garbage in, null out', () => {
  assert.equal(parseI66('<html>Not authorized</html>'), null);
});
