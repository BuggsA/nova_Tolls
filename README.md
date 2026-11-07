# Worth the Toll? · DMV

Save your drive once; see whether the express lanes are worth it right now. Plan: `PLAN.md`. Data sources: `DATA_CHECK.md`.
Mockups: `mockup/index.html` (road-sign design), `mockup/directions.html` (the six looks).

**Stack:** one Cloudflare Worker. A cron job every 5 minutes fetches the live toll feeds into KV (newest prices) and
D1 (history). No build step. Tests: `npm test`.

## Live data so far
- **I-66 inside the Beltway:** VDOT SmarterRoads "Tolling and Trip Pricing I-66" (XML, new prices every 6 minutes).
  Parsed in `src/feeds/i66.js`; served at `/api/i66`.

## Set it up on Cloudflare (about 15 minutes)
Use the same Cloudflare account as Is There School? and Walks for Lucy.

```bash
npm install
npx wrangler login
npx wrangler kv namespace create TOLLS
```
Paste the id it prints into `wrangler.toml` (`PASTE_KV_ID_HERE`).

```bash
npx wrangler d1 create worth-the-toll
```
Paste the `database_id` into `wrangler.toml` (`PASTE_D1_ID_HERE`), then:

```bash
npx wrangler d1 execute worth-the-toll --remote --file=schema.sql
npx wrangler secret put SR_I66_URL
```
When it asks, paste the full I-66 feed link from SmarterRoads (the one that showed you the XML, token included).
It's stored encrypted in Cloudflare and never appears in the code or chat.

```bash
npm run deploy
```
Within 5 minutes, `https://worth-the-toll.<your-account>.workers.dev/api/i66` shows the live prices.

## Check the road signs for I-66 outside the Beltway prices (one time)
Opening the sign feed in a browser crashes the tab: it's one huge file. Let the Worker read it instead:

```bash
npx wrangler secret put SR_DMS_URL
```
Paste the full "DMS Status (Active)" feed link from SmarterRoads (token included), then `npm run deploy` and open
`https://worth-the-toll.<your-account>.workers.dev/api/signs`. It lists only I-66 signs showing a price, if any.
