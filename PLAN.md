# Worth the Toll? · DMV (working name)

Covers the whole DMV: DC, Maryland and Virginia toll roads in one place.

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

## Design direction: road sign (chosen)

Picked from six options (`mockup/directions.html`). Answers are drawn as real highway signs, and the colors mean
what they mean on the road:
- **Green guide sign** = take it ("TAKE IT ↗", "TAKE SOME ↗", "FREE NOW").
- **Yellow warning sign** = close call (within about 12% of your limit; your call).
- **White regulatory sign** = stay in the regular lanes.
- Tolls sit on **black price panels with yellow numbers**, like the real price signs. Route shields mark each road.
- Everything else: flat white panels with black rules. One typeface (Overpass, a cousin of the highway sign font).
  No shadows, no pills, no emoji.
- The scoreboard is a **blue sign** (the color of road service signs).

## Some, all or none: your rule for tolls

Many trips cross more than one toll road (I-66 outside **and** inside the Beltway; 95 **and** 395). One control decides
all of them, set once:

| Rule | What happens |
|---|---|
| **No tolls** | Never pay. The site still shows what each toll would have cost and adds what you kept to the scoreboard. |
| **Worth it to me** (default) | Each toll is checked **on its own** against your limit: "pay up to 60¢ a minute" (or "$36 an hour"; tap to switch units). Usually ends up as "take some". |
| **All tolls** | Always take the express lanes; the scoreboard tracks the time it buys. |

- The answer sign sums it up: **"TAKE SOME: take I-66 inside, skip I-66 outside. $6.22 saves 12 min."**
- Each toll on the trip has its own row: price panel, minutes saved, cost per minute, and **Take it / Skip it** buttons.
  Tapping one overrides the rule for today only; it's marked "Your pick" with Undo.
- For tolls further along the trip, the price shown is **what it's likely to be when you get there** ("AT 7:59 $6.22"),
  from the price history. It refreshes as you get closer.

## Drive mode: the next step, live

Tap **Start driving** and the screen turns into one big sign showing only the **next decision**:
- **"IN 7 MI · BELTWAY / TAKE EXPRESS ↗ / $6.22 saves 12 min"**, then **"STAY IN EXPRESS"** while you're on it, then the exit.
- A **Then** line shows the step after that, and a simple strip shows the route with which lanes you'll be in.
- **It changes by itself** when prices or traffic change: a yellow **"Changed: I-66 inside is now $9.25 for 14 min.
  No longer worth it."** line, and the sign flips. Nothing to tap while driving.
- **Voice** (optional) reads each step and each change aloud.
- At the end: **"You made it. Log it?"** One tap, and the scoreboard updates.

How it works on a website:
- Your position comes from the phone's location **while the page is open** (phone in a mount). The screen is kept awake.
  Spoken steps use the phone's built-in voice.
- Prices and travel times refresh every 2 to 5 minutes from the scheduled job; drive mode checks for new numbers every
  minute and only speaks up when a decision actually changes.
- "Usually at this time" and the price-when-you-get-there both come from the recorded history, so they get better
  every week as traffic patterns shift (school breaks, holidays, new construction).
- A website can't run in the background or show up on CarPlay / Android Auto. If drive mode is popular, a small app
  later can add that, plus a notification as you approach each entrance.
- Safety: big type, high contrast, no taps needed, and a note that the overhead sign's price is the one you pay.

## Your scoreboard: what your choices saved you

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

Saved automatically, with no sign-in. See "Your stats, saved without signing in" below.

### Setting up a trip (under 30 seconds, no map needed)
1. Pick the road: **I-66 inside**, **I-66 outside**, **495**, **95**, **395**.
2. Pick the direction (only the ones open now are highlighted; 95/395 reverse).
3. Tap your entrance, tap your exit, from a short list of names people actually use ("Vienna / Nutley St",
   "Rosslyn"). Not a map.
4. Name it (optional). **Save.** No account needed (see below).

A shareable link for each trip (`/66-east/vienna-to-rosslyn`) means it also works from a bookmark or a home-screen icon.

---

## Your stats, saved without signing in

Nobody is ever asked to sign in to use the site. Stats are still kept safe, and an account happens quietly in the background.

**How it feels to the visitor**
1. **Day one:** they save a trip and tap "I took it." That's all. Behind the scenes the site gives their browser a
   random private ID and keeps their trips and stats **on the server** under that ID (plus a copy in the
   browser so it opens instantly, even offline). No name, no email, no password.
2. **Once it's worth protecting:** after about 10 logged trips or the first $25 kept, one quiet line appears at the
   bottom of the scoreboard (never a pop-up):
   > *Your stats: $31 kept, 2 h bought. **Keep them safe on any phone** →*
3. Tapping it offers one-tap options, no password:
   - **Face ID / fingerprint** (a passkey: the phone does the work, nothing to remember), or
   - **Email me a link** (for older phones or a computer).
   If they say "Not now," it hides for a month.
4. **New phone or a laptop:** "Already saving? Get your stats" in the menu, then Face ID or the email link, and everything's there.
   Trips logged on either device are merged.

**Rules**
- No usernames, profiles, names or passwords. An email, if given, is only for sign-in links (and alerts if they ask).
- Signing in never unlocks extra features. It only keeps stats safe across devices. Everything works signed out.
- **Delete everything** button in the menu: wipes the server copy and the browser copy at once.
- Stats are private. Nothing about a person's trips is ever shown to anyone else (the share card shows only what they choose to share).

**Why the server copy matters:** browsers clear site data (Safari can, after a week without a visit; people clear
history; phones get replaced). Keeping only a browser copy, like the schools site does, would lose a year of stats.
The anonymous ID is kept in a secure cookie set by the site, which browsers keep much longer than script storage.

**How it's built:** Cloudflare D1 tables for `users` (anonymous ID, optional passkey / email), `trips` (saved trips)
and `logs` (each took-it / skipped-it tap with the numbers at that moment). Passkeys with a standard WebAuthn library
that runs on Workers; email links through Cloudflare's email sending or a small provider (a few cents a month at this scale).

---

## Kept free by Walks for Lucy

Like the schools site, this one is kept running by **Anissa of [Walks for Lucy](https://walksforlucy.com)**. It should feel
like a sponsor credit on a podcast, not an ad: friendly, small and the same every time, so people learn to recognize it.

**Where it shows**
- **Footer, every page:** Lucy's small round photo + *"Worth the Toll? is kept free by Anissa of Walks for Lucy:
  dog walking and pet sitting in Reston, Vienna, Fairfax and Loudoun."*
- **A sponsor strip on the scoreboard** (the screen people look at most):
  > 🐾 *Scoreboard brought to you by **Walks for Lucy**. Long commute? Anissa does the midday walk.*

  One line, Lucy's photo, a light card style that matches the site. No animation, no close button needed since
  it never gets in the way.
- **Year in review card:** a small "Kept free by Walks for Lucy" at the bottom of the share image, so every shared card
  carries the credit.
- **An occasional useful line, only for trips that start in Anissa's towns** (same rule as the schools site: helpful,
  never a sales pitch). Examples:
  - Heavy traffic and a long trip: *"Running late tonight? Walks for Lucy does evening walks in Vienna."*
  - Before a holiday weekend: *"Driving out for Thanksgiving? Pet sitters book up early."*
  - Milestone: *"10 hours bought back! Lucy would spend them on walks."*
- **About page:** the same Anissa-and-Lucy story and photo as the schools site.

**Never:** pop-ups, banners that cover anything, autoplay, "sponsored" interruptions before the answer. The verdict always
comes first; the sponsor is below it.

**Tracking:** every link carries `utm_source=worththetoll` (and which spot it came from), so Anissa can see in her analytics
how many visits the toll site sends, just like the schools site's links. Reuse `src/anissa.js` from the schools site
(towns, service area, link helper); the trip's entrance stands in for the school's location.

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
| **ICC (MD 200)** | MDTA | Set by time of day | "Worth it" compares against the best free route on local roads (needs a routing source). |
| **I-95 Express Toll Lanes** (Baltimore) | MDTA | Set by time of day | Regular lanes alongside, so it works like the Virginia express lanes. |
| Bay Bridge, Fort McHenry / Harbor tunnels, Key Bridge replacement | MDTA | Fixed | Price table only. |
| **I-495 / I-270 (Maryland)** | MDOT | Planned | Add if and when toll lanes open. |
| Dulles Toll Road | MWAA | Fixed | Phase 2: simple price table, no "worth it" (no free lanes next to it). |
| Dulles Greenway | Private | Fixed peak / off-peak | Phase 2, same. |

**Start with I-66 inside and outside.** That's the most commuters and the most toll headlines.
Then 495 and 95/395, then Maryland (ICC and the I-95 Express Toll Lanes, whose prices are published schedules, so the toll side is easy).
DC itself has no toll roads, but DC drivers use all of these; the site and its pages speak to the whole DMV.

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
- Saved trips, logs and stats: **D1** under an anonymous ID (passkey / email link optional), with a copy in the browser so it opens instantly.
- Same design system as the schools site (colors, type, panel style), so they feel like siblings.
- Cloudflare Web Analytics (no cookies), Search Console, sitemap.

---

## Phases

**0. Check the data (one afternoon).** Register for SmarterRoads; confirm the I-66 toll feed; test one travel-time source on I-66 express vs regular.

**1. I-66 launch.** Inside + outside the Beltway. Trip setup, saved trips, the toll rule (no tolls / worth it / all, with per-toll picks), drive mode, cost per minute, your line,
HOV toggle, "free right now" for I-66 inside off-peak, trip pages, share cards, **the scoreboard** (took it / skipped it,
totals by week, month, year and all time, averages, smart calls), saved on the server with no sign-in, the quiet
"keep them safe" passkey / email option, and the Walks for Lucy footer and sponsor strip. Start recording history on day one.

**2. More roads + history.** 495, 95/395, Maryland (ICC, I-95 Express Toll Lanes). "Usually at this time," best time to leave, monthly cost, record-toll page.

**3. Alerts + rewards.** Price alerts on saved trips (port the push code from the schools site). Milestones,
streaks, and the first Year in review in December.

**4. Extras.** Dulles Toll Road / Greenway price tables, toll comparison pages ("Is the I-66 toll worth it?"), weekly email digest.

---

## Decisions for the owner

1. **Name and domain.** Ideas: *Worth the Toll?*, *Toll or Not*, *Is It Worth It? (66)*. The schools site's
   question-style name works well; something like `worththetoll.com` fits the pattern (check if it's free).
2. **Walks for Lucy wording:** Anissa approves the footer line, the sponsor strip and the occasional lines (same as the schools site).
3. **Default "your line":** 50¢ a minute ($30/hr). Too high or low for the audience?
4. **Who registers for SmarterRoads** (and a TomTom/HERE developer key): needs a person with an email.
