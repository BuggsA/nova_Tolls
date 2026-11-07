# Worth the Toll? · Northern Virginia (working name)

**One line:** save your drive once. Every morning, open it and see the toll right now, how many minutes the
express lanes save, what that works out to per minute, and a plain answer: **take it** or **skip it**.

Same spirit as [Is There School?](https://isthereschool.com): one glance, no accounts, nice to look at,
and a reason to come back every commute.

---

## Why this should exist

The official tools are split up by operator and built around the operator's needs, not the driver's:

- **I-66 Inside the Beltway** (VDOT), **I-66 Outside the Beltway** (a private operator) and the **495 / 95 / 395
  Express Lanes** (Transurban) each have their own site and app.
- You re-enter your entry and exit **every time**. Nothing is saved.
- They show the **price**, but not what you get for it: how much time the regular lanes would cost you right now.
- Nothing says "this is high for 7:40 on a Tuesday" or "it usually drops after 9:10."

The question a driver actually has is: **"Is it worth it right now, for my trip?"** Nobody answers that.

---

## The main screen (one saved trip)

```
 Morning commute · Vienna → Rosslyn (I-66 East)           7:42 AM
┌─────────────────────────────────────────────────────────────┐
│  TAKE IT                                                     │
│  $6.50 saves 14 min  ·  46¢ a minute                         │
└─────────────────────────────────────────────────────────────┘
   Express    22 min   $6.50
   Regular    36 min   free
   Your line: 50¢ a minute   (change)

   Today so far ▁▂▄▆█▆▄    Usually $8 at this time · tends to drop after 9:10
   The price on the last sign before you enter is what you pay.
```

- **The verdict carries the color**, like the school status panel: green *Take it*, amber *Close call*,
  slate *Skip it*. (Red stays reserved for "lanes closed / wrong direction right now.")
- **Cost per minute saved** is the headline number: toll ÷ minutes saved. Compared with **your line**: the most
  a minute is worth to you. Default 50¢; set it once as cents per minute *or* as an hourly figure
  ("my time is worth $30/hr" = 50¢/min).
- **Close call** = within about 20% of your line.
- If the express lanes save under 2 minutes, it says **"Skip it: barely faster"** no matter the price.
- **HOV:** one toggle. With 3+ people and an E-ZPass Flex set to HOV, it's free, so it says
  **"Free for you: take it."**

### Several saved trips
- Home shows them as compact cards (*Morning*, *Evening*, *Mom's house*), each with its verdict.
- The trip that fits the time of day goes on top: morning trips before noon, evening trips after.

### Your scoreboard: what your choices saved you

Under the verdict, two buttons: **I took it** · **I skipped it**. One tap logs the trip with the numbers shown
at that moment (toll, minutes saved). Undo for a few seconds; edit or delete later.

Each choice counts one of two ways:
- **Took the toll:** you *bought time*: **+14 min saved** for $6.50.
- **Skipped it:** you *kept money*: **$6.50 saved**, for 14 extra minutes.

```
 Your tolls · November                                   Month ▾
┌──────────────────────────┬──────────────────────────┐
│  $84.50 kept             │  3 h 10 min bought       │
│  skipped 13 times        │  took it 9 times, $61    │
└──────────────────────────┴──────────────────────────┘
   You paid 32¢ a minute on average (your line: 50¢)
   Smart calls: 19 of 22 (86%)  ·  Streak: 6 in a row
   ▁▃▅▂▆▄▇  by week
```

- **Ranges:** this week, this month, this year, all time. Each shows totals and averages: average toll paid,
  average minutes saved per trip, average **cost per minute bought**, money kept per month.
- **Smart calls:** how often your choice matched the verdict. Skipping a "Skip it" counts, and so does taking a
  "Take it." A streak counter for consecutive smart calls. Light and encouraging; never scolding. Taking an
  expensive toll when you're running late isn't wrong, so the user can mark a trip **"Had to"** and it doesn't
  count against them.
- **Milestones**, shown once with a small animation like the schools site's big moments: *First $100 kept*,
  *10 hours bought back*, *Skipped a $30+ toll*, *A month of smart calls*.
- **Year in review** (every December): "In 2027 you kept $612 and bought back 41 hours. Your priciest
  minute: $2.80 on March 3." A shareable card. This is the most likely thing to spread on social media.
- **Comparisons that make the numbers mean something:** "$84 kept ≈ a tank and a half of gas,"
  "3 hours bought ≈ two movies."

Honest numbers: each log uses the toll and travel times **when you checked**, and the screen says they're
estimates. If you check at 7:40 and log at 8:05, it uses the 7:40 numbers, because that's when you decided.

Stored in the browser like saved trips, no account. Later: an **export / move to a new phone** code (a short link that
copies your history), so people don't lose a year of stats when they switch phones.

### Setting up a trip (under 30 seconds, no map needed)
1. Pick the road: **I-66 inside**, **I-66 outside**, **495**, **95**, **395**.
2. Pick the direction (only the ones open now are highlighted; 95/395 reverse).
3. Tap your entrance, tap your exit, from a short list of names people actually use ("Vienna / Nutley St",
   "Rosslyn"). Not a map.
4. Name it (optional). **Save.** Kept in the browser like saved schools: no account.

A shareable link for each trip (`/66-east/vienna-to-rosslyn`) means it also works from a bookmark or a home-screen icon.

---

## What makes people come back (and find it)

| Feature | Why |
|---|---|
| **Saved trips, instant answer** | The daily habit. Open it at the door, decide in two seconds. |
| **Your scoreboard** (money kept, minutes bought, smart calls) | Turns a daily chore into a running score. Logging takes one tap, and the totals grow every week. |
| **Year in review** | Shareable December card: "I kept $612 and bought back 41 hours." Free advertising. |
| **"Usually at this time" + best time to leave** | We record the price every few minutes, so after a few weeks we can say *"leave 15 minutes later and it's typically $4 cheaper."* No official tool does this, and it gets better the longer we run. |
| **Price alerts** (phase 2) | "Tell me when my trip drops under $5" or "…when it's worth it." The schools site's push alerts (no accounts) carry over almost as-is. |
| **Monthly cost** | "Taking it every weekday this month ≈ $142 and saves ~4.5 hours." An eye-opener people share. |
| **Pages for every trip** | `/66-east/vienna-to-rosslyn` and pages like "I-66 toll right now" for search traffic: people already google these. |
| **Share card** | The link preview shows the live verdict ("I-66 East right now: $6.50, saves 14 min"). Good for neighborhood groups and Reddit. |
| **Record-toll moments** | When I-66 tolls spike ($40+), it's news. A "highest toll this year" page gets picked up. Like the first snow day for the schools site. |

---

## Roads covered

| Road | Who runs it | Price | Notes |
|---|---|---|---|
| **I-66 Inside the Beltway** (Beltway ↔ DC) | VDOT | Changes with traffic | Toll only rush hours, peak direction, weekdays. Free otherwise, and the site should say so. **Best data: VDOT publishes it.** |
| **I-66 Outside the Beltway** (Beltway ↔ Gainesville) | I-66 Express Mobility Partners | Changes with traffic | Toll all the time. |
| **495 Express** | Transurban | Changes with traffic | |
| **95 / 395 Express** | Transurban | Changes with traffic | Reversible: direction depends on time of day. Priced by zone. |
| Dulles Toll Road | MWAA | Fixed | Phase 2: simple price table, no "worth it" (no free lanes next to it). |
| Dulles Greenway | Private | Fixed peak / off-peak | Phase 2, same. |

**Start with I-66 inside and outside.** That's the most commuters and the most toll headlines.
Then 495 and 95/395.

---

## Where the numbers come from (the part to verify first)

Two numbers are needed per trip: **the toll now** and **the minutes saved now**.

### The toll
- **I-66 Inside:** VDOT's **SmarterRoads** data portal (smarterroads.org) publishes the current I-66 inside-the-Beltway
  toll rates. Free, but needs a sign-up. Other apps (e.g. an Alexa skill) already use it. **Needs a person to register.**
- **I-66 Outside, 495, 95/395:** no public data feed found yet. Their websites and apps show current prices, so
  there's some data source behind them. Check what they allow before relying on it (like pwcs.edu, they may block
  automated access). SmarterRoads may also carry some of these; check during sign-up.
- **Fallback for any road we can't read:** show the trip with a "Check the sign" note and the operator's link,
  rather than guess. (Same rule as the schools site: never guess.)

### Minutes saved
This is the hard part. Options, best first:
1. **Traffic speed data per road segment** from a traffic provider (TomTom or HERE). They show the express and
   regular lanes as separate roadways, so we can time both sides of each trip. Free tiers are a few thousand calls a
   day. Fetching each road every few minutes and sharing the result across all visitors stays well inside that.
2. **VDOT travel times** (511 / SmarterRoads), if they cover both the express and regular lanes.
3. **Google Routes API** with traffic: good numbers, but it doesn't let us say "use the express lanes," and it costs money.

**Before building anything:** spend an afternoon confirming (a) the I-66 toll feed and (b) one travel-time source that
sees both express and regular lanes. If (b) doesn't work, the site still launches as "the clean toll checker with
saved trips and history," and minutes saved comes later. But minutes saved is the reason to choose this site.

### Our own history
A scheduled job (every 5 minutes, like the schools site's 2-minute job) records each segment's price and travel times.
That powers "usually at this time," best time to leave, record tolls and the price charts. It costs almost nothing
and builds an advantage nobody else has.

---

## How it's built

Same as the schools site, so it's quick to build and cheap to run:
- One **Cloudflare Worker** renders every page; static CSS/JS in `public/`. No build step, no accounts.
- **Cron trigger** every 5 minutes fetches prices and travel times and caches them for every visitor.
- **D1** (Cloudflare's small database) for the price history; KV for the latest values and push subscriptions.
- Saved trips, your line, HOV setting: **in the browser** (localStorage).
- Same design system as the schools site (colors, type, panel style), so they feel like siblings.
- Cloudflare Web Analytics (no cookies), Search Console, sitemap.

---

## Phases

**0. Check the data (one afternoon).** Register for SmarterRoads; confirm the I-66 toll feed; test one travel-time source on I-66 express vs regular.

**1. I-66 launch.** Inside + outside the Beltway. Trip setup, saved trips, verdict, cost per minute, your line,
HOV toggle, "free right now" for I-66 inside off-peak, trip pages, share cards, **the scoreboard** (took it / skipped it,
totals by week, month, year and all time, averages, smart calls). Start recording history on day one.

**2. More roads + history.** 495, 95/395. "Usually at this time," best time to leave, monthly cost, record-toll page.

**3. Alerts + rewards.** Price alerts on saved trips (port the push code from the schools site). Milestones,
streaks, the "move to a new phone" code, and the first Year in review in December.

**4. Extras.** Dulles Toll Road / Greenway price tables, toll comparison pages ("Is the I-66 toll worth it?"), weekly email digest.

---

## Decisions for the owner

1. **Name and domain.** Ideas: *Worth the Toll?*, *Toll or Not*, *Is It Worth It? (66)*. The schools site's
   question-style name works well; something like `worththetoll.com` fits the pattern (check if it's free).
2. **Walks for Lucy:** same quiet footer mention as the schools site, or keep this one separate?
3. **Default "your line":** 50¢ a minute ($30/hr). Too high or low for the audience?
4. **Who registers for SmarterRoads** (and a TomTom/HERE developer key): needs a person with an email.
