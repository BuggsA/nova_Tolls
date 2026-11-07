# Data check (November 7, 2026)

**Question:** can we get, for each toll road, (1) the toll right now and (2) how many minutes the express lanes save
right now, legally and reliably, without paying much?

**Short answer:** yes for most of it, and almost all of it runs through one free sign-up: **VDOT's SmarterRoads
portal**. That needs a person to register. Maryland's ICC needs nothing, because its tolls are a published schedule.
The two gaps are **I-66 outside the Beltway** (no public feed found) and **travel times**, which need either
SmarterRoads' traffic data or a traffic company's API.

---

## Update: SmarterRoads account is set up (Nov 7)

The owner registered. The datasets that matter for us, from the catalog:

| Dataset | Format | Updates | What it gives us |
|---|---|---|---|
| **Tolling and Trip Pricing I-66** | XML | every 6 min | I-66 **inside** the Beltway only. Shows $0 when tolling is off (eastbound tolls 5:30–9:30 AM, westbound 3–7 PM, weekdays). |
| **Tolling and Trip Pricing I-95 I-495** | CSV | every 10 min | Transurban's 95, 395 and 495 Express Lanes (check that 395 zones are in it). |
| **Travel Times, Travel Time Segments** | XML / TMDD | every minute | VDOT's own travel times by road segment. **Key question:** does it have separate segments for the express lanes? If yes, minutes saved is free. |
| **Traffic Sensor Stations** | XML / TMDD | every minute | Speeds from road sensors. Backup for travel times if the express lanes have their own sensors. |
| **DMS Status (Active)** | XML | every minute | What the electronic road signs say right now. Worth checking for I-66 outside: if its toll price signs report through VDOT, this could fill the gap. |
| Tolling and Trip Pricing I-64 | XML | 10 min | Hampton Roads. Not DMV; ignore. |

Not in the catalog: **I-66 outside the Beltway** tolls and INRIX travel times.

**Our job's timing:** fetch every 5 minutes. That catches every I-66 update (6 min) and every 95/495 update (10 min)
without wasting requests.

## I-66 outside the Beltway: how we'll try to cover it

The I-66 feed is inside the Beltway only. For the outside stretch (Beltway to Gainesville), in order:
1. **The road signs feed.** SmarterRoads' "DMS Status (Active)" lists what every VDOT electronic sign says, every minute.
   If the outside-the-Beltway toll price signs report through VDOT, their messages include the prices. Test: once the
   Worker is live, add that feed and log any sign message on I-66 that contains a "$" during Monday's rush hour.
2. **Ask the operator.** I-66 Express Mobility Partners runs those lanes. Email them asking for a price feed or
   permission to show their prices (draft below). Their website blocks automated visitors, so we don't read it.
3. **Until then:** trips show the outside stretch honestly: "Price on the sign, not available here yet", with the
   travel times (VDOT's travel time feed still covers the road) and the "usually" range once people log trips.

Draft email (send from the site's address):
> Hello, I run Worth the Toll?, a free site that helps DMV drivers decide whether the express lanes are worth it for
> their trip, using VDOT's public SmarterRoads toll feeds for I-66 inside the Beltway and the 95/495 Express Lanes.
> We'd like to include the I-66 Express Lanes outside the Beltway. Do you publish current toll prices as a data feed,
> or could you give us permission to show them? We'd link to your site and always tell drivers the posted sign price
> is the one they pay. Thank you!

## Toll prices, road by road

| Road | Source | Status | Notes |
|---|---|---|---|
| **I-66 inside the Beltway** | SmarterRoads "Toll Rates" dataset (VDOT) | ✅ Exists, needs sign-up | Current price for every entry/exit pair, both directions. An existing open-source Alexa skill uses it with a SmarterRoads access token. Published as XML. History back to June 2018 (useful for "usually at this time"). |
| **495 Express** | Same SmarterRoads "Toll Rates" dataset | ✅ Exists, needs sign-up | RITIS's data catalog lists SmarterRoads toll rates for the "I-95/495 Express Lanes (Transurban)". |
| **95 / 395 Express** | Same dataset (probably) | 🟡 Confirm at sign-up | Listed as "I-95/495"; check that 395 zones are included. |
| **I-66 outside the Beltway** | No public feed found | 🔴 Gap | Run by I-66 Express Mobility Partners (a private operator). Their site blocks automated visitors. Next: check the SmarterRoads catalog after sign-up, then email the operator to ask for a feed. |
| **ICC (MD 200)** | MDTA's published rates | ✅ Ready now | Fixed per-mile rates by time of day: peak $0.22/mi (weekdays 6–9 AM, 4–7 PM), off-peak $0.17/mi, overnight $0.07/mi. Full length (I-370 to US 1): $3.86 peak, $2.98 off-peak, $1.23 overnight. Minimum toll $0.40. Typed in once; check yearly. |
| I-95 Express Toll Lanes (Baltimore), bridges, tunnels | MDTA's published rates | ✅ Ready now | Same: published schedules. |
| Dulles Toll Road, Dulles Greenway | Published rate tables | ✅ Ready now | Fixed prices. |

**Not allowed:** reading prices off expresslanes.com or the Express Lanes app. Transurban's terms forbid scraping,
bots and commercial reuse without written permission. SmarterRoads is the proper route for their prices.

---

## Minutes saved (travel times)

This is still the harder half. Options, best first:

1. **SmarterRoads traffic data (free, needs the same sign-up).** RITIS lists two related feeds:
   **INRIX real-time travel times** (statewide Virginia) and **Transurban's own lane detectors** on the 495/95 Express Lanes.
   If SmarterRoads gives registered users either one, we get express and regular lane speeds for free.
   Check both in the catalog after sign-up. INRIX data often comes with restrictions on public display, so read the terms.
2. **TomTom (free tier, then pay as you go).** Free allowance is now **20,000 requests a month** each for traffic
   speeds and for routes with traffic. Plan: one route request through the express lanes and one through the regular
   lanes for each toll stretch (about 20 requests per check across all roads). Every 15 minutes during rush hours is
   about 10,000 a month, which fits the free tier. More often than that costs a little. Needs a TomTom developer account;
   then test whether its map treats the express lanes as separate roads.
3. **Google Routes API.** Good traffic data, but it can't be told to use the express lanes, and it costs more. Last resort.

**Our own history** fills in "usually at this time" and the price when you get there, whichever source we use.

---

## How the prices stay current (nobody types them in)

The dynamic prices update themselves. SmarterRoads is a live feed, not a list we copy:
1. **Once:** a person signs up and gets an access token. It's stored as a secret in Cloudflare, never in the code.
2. **Every 2 to 5 minutes, automatically:** a scheduled job in the Worker (the same kind that checks school closings
   every 2 minutes on Is There School?) fetches the latest tolls and travel times, saves them, and adds them to the history.
3. **Every visitor** gets those saved numbers instantly. Drive mode checks for new numbers every minute while it's open.
4. **If a feed stops answering,** the site shows the last price with its age ("as of 7:38") and a "check the sign" note,
   and a daily check emails us. It never shows a stale price as if it were live.

What does need a person, about once a year: the **fixed** rate tables (ICC, Dulles Toll Road, Greenway, Maryland
bridges) when the authorities announce new rates, and the list of entrances if a road adds one.

---

## What this changes in the plan

- **Launch roads:** I-66 inside, 495 Express, 95/395 Express (all from SmarterRoads), plus Maryland's ICC (published
  rates). I-66 outside joins when we have a source. If it never gets one, its trips show "check the sign" for that
  stretch rather than a guess.
- **One sign-up unlocks most of the site,** so it's the first step.

---

## What I need from you

1. **Register at SmarterRoads** (free): https://smarterroads.vdot.virginia.gov. Use the site's email
   (hello@… once there's a domain) and describe it as "a free public site showing DMV drivers whether express
   lane tolls are worth it." Then:
   - request the **Toll Rates** dataset,
   - look for **INRIX travel times** and the **Transurban (Express Lanes) detector** data and request those too,
   - send me the dataset names you see (a screenshot of the list is perfect), and whether I-66 outside the Beltway is there.
   Don't paste the access token into chat. When it's time, I'll open a secure form for it.
2. **Make a free TomTom developer account** (developer.tomtom.com) so I can test express vs regular lane travel times.
   Same rule: I'll ask for the key through the secure form.
3. **Optional, later:** email I-66 Express Mobility Partners to ask whether they publish a toll price feed for
   I-66 outside the Beltway.

## Sources
- SmarterRoads toll data used by the I-66 Alexa skill: https://www.mcgurrin.com/?p=229 and https://github.com/ViennaMike/I-66-Tolls
- RITIS data catalog (Toll Rates, Transurban detectors, INRIX travel times): https://rm3p.ritis.org/data/sets/
- Research papers describing the SmarterRoads toll data (XML; by time, entry and exit):
  https://www.sciencedirect.com/science/article/pii/S2666691X21000403
- MDTA ICC toll rates: https://mdta.maryland.gov/ICC/Toll_Rates.html
- Express Lanes website terms of use: https://www.expresslanes.com/website-and-mobile-app-terms-of-use
- TomTom pricing: https://docs.tomtom.com/pricing
