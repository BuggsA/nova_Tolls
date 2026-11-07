// I-66 Express Lanes inside the Beltway: VDOT's "Tolling and Trip Pricing I-66" feed on SmarterRoads.
// XML, a new 6-minute interval each time. Each <opt> row is the toll for one trip: enter at StartZone,
// leave after EndZone. The feed repeats the previous interval too, so we keep only the newest one.
// Tolls are 0.0000 whenever tolling is off (weekends, holidays, outside the hours below).

// Zones in driving order, with names people use. Official names are kept for matching the feed.
export const I66_ZONES = {
  EB: [
    { id: '3100', feed: 'Capital Beltway Beginning', name: 'Beltway (I-495)' },
    { id: '3110', feed: 'Lee Highway', name: 'Lee Highway (US 29)' },
    { id: '3120', feed: 'Fairfax Drive', name: 'Fairfax Drive (Ballston)' },
    { id: '3130', feed: 'Spout Run Parkway', name: 'Spout Run Parkway (Rosslyn)' },
  ],
  WB: [
    { id: '3200', feed: 'Glebe Road', name: 'Glebe Road (Ballston)' },
    { id: '3210', feed: 'Sycamore Street', name: 'Sycamore Street (East Falls Church)' },
    { id: '3220', feed: 'Leesburg Pike', name: 'Leesburg Pike (Rt 7)' },
    { id: '3230', feed: 'Capital Beltway End', name: 'Beltway (I-495)' },
  ],
};

// When VDOT charges tolls (weekdays, not federal holidays), in Eastern time.
export const I66_HOURS = { EB: { from: '05:30', to: '09:30' }, WB: { from: '15:00', to: '19:00' } };

const DIR = { 1100: 'EB', 1200: 'WB' };

function attrs(tag) {
  const out = {};
  for (const m of tag.matchAll(/(\w+)="([^"]*)"/g)) out[m[1]] = m[2];
  return out;
}

/**
 * Parse the feed. Returns { interval: {start, end, calculated}, trips: [{dir, from, to, toll}] } for the newest
 * interval only, or null if the feed has no rows we understand.
 */
export function parseI66(xml) {
  const rows = [...String(xml).matchAll(/<opt\b[^>]*\/?>/g)].map((m) => attrs(m[0]))
    .filter((r) => DIR[r.CorridorID] && r.IntervalDateTime && r.ZoneTollRate != null);
  if (!rows.length) return null;
  const newest = rows.reduce((a, r) => (r.IntervalDateTime > a ? r.IntervalDateTime : a), '');
  const now = rows.filter((r) => r.IntervalDateTime === newest);
  const trips = now.map((r) => ({
    dir: DIR[r.CorridorID],
    from: r.StartZoneID,
    to: r.EndZoneID,
    toll: Math.round(parseFloat(r.ZoneTollRate) * 100) / 100,
  })).filter((t) => Number.isFinite(t.toll));
  trips.sort((a, b) => a.dir.localeCompare(b.dir) || a.from.localeCompare(b.from) || a.to.localeCompare(b.to));
  return {
    interval: { start: newest, end: now[0].IntervalEndDateTime, calculated: now[0].CalculatedDateTime },
    trips,
  };
}

/** Eastern-time parts for a Date: { weekday: 0-6 (Sun=0), minutes: since midnight }. */
export function eastern(date) {
  const p = Object.fromEntries(new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).formatToParts(date).map((x) => [x.type, x.value]));
  const wd = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(p.weekday);
  return { weekday: wd, minutes: +p.hour * 60 + +p.minute };
}

const mins = (hhmm) => +hhmm.slice(0, 2) * 60 + +hhmm.slice(3);

/** Is this direction normally tolled at this moment? (Holidays aren't known here; the feed's $0 covers them.) */
export function tollHours(dir, date) {
  const { weekday, minutes } = eastern(date);
  const h = I66_HOURS[dir];
  return weekday >= 1 && weekday <= 5 && minutes >= mins(h.from) && minutes < mins(h.to);
}

/**
 * What to show for one trip: 'tolled' with a price, 'free' (tolls are off), or 'stale' when the feed is too old to trust.
 */
export function tripStatus(parsed, dir, from, to, now = new Date()) {
  if (!parsed) return { state: 'stale' };
  const ageMin = (now - new Date(parsed.interval.calculated)) / 60000;
  if (ageMin > 20) return { state: 'stale', ageMin: Math.round(ageMin) };
  const t = parsed.trips.find((x) => x.dir === dir && x.from === from && x.to === to);
  if (!t) return { state: 'unknown' };
  if (t.toll > 0) return { state: 'tolled', toll: t.toll };
  return { state: 'free', expected: tollHours(dir, now) }; // expected=true: $0 during toll hours (a holiday, or a feed hiccup)
}
