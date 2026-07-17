# Nurdaulet Beisenbek — Portfolio

Awwwards-grade personal portfolio. Next.js 14 (App Router) + GSAP, deployed on Vercel.
Dark / high-contrast canvas, acid-lime ML accent, expressive type, scroll choreography,
custom magnetic cursor, animated hero motif, and a contact form that posts to **Telegram**
through a serverless API route.

> 8 production projects in under a year — from vanilla JS to Next.js + OpenAI API.

---

## Tech

- **Next.js 14** (App Router, JavaScript)
- **GSAP** + ScrollTrigger — scroll choreography, hero timeline, reveals
- **Custom cursor** + **smooth scroll** (rAF lerp) — no heavy UI libs
- **Telegram Bot API** for the contact form (serverless `/api/contact`)
- Deploy: **Vercel**

## Local dev

```bash
npm install
npm run dev      # http://localhost:3000
```

Build / start:

```bash
npm run build
npm start
```

## File structure

```
app/
  layout.js              fonts, metadata, OG/Twitter tags
  page.js                composes all sections + FX layer
  globals.css            full design system
  api/contact/route.js   Telegram serverless endpoint
components/
  SmoothScroll.jsx       rAF-lerp smooth scroll (desktop only)
  Cursor.jsx             magnetic cursor with hover labels
  Loader.jsx             0→100 boot loader
  ScrollProgress.jsx     top scroll-progress bar
  Nav.jsx                sticky nav + mobile overlay
  Marquee.jsx            seamless CSS marquee
  HeroMotif.jsx          canvas wireframe globe (hero bg)
  Reveal.jsx             GSAP scroll reveal wrapper
  sections/
    Hero / About / Skills / Projects / Process / Contact / Footer.jsx
data/
  projects.js            ← all 8 case studies (single source of truth)
  skills.js              ← stack, each tagged with where it was used
  site.js                ← name, contacts, stats
lib/
  gsap.js                registers GSAP + ScrollTrigger (client only)
```

To edit a project, change `data/projects.js`. To edit contacts, change `data/site.js`.

---

## Contact form → Telegram (one-time setup)

The form at `#contact` POSTs to `/api/contact`, which calls the Telegram Bot API
`sendMessage`. It needs two environment variables.

### 1. Create a bot with @BotFather

1. Open Telegram, search **@BotFather**, send `/newbot`.
2. Pick a name (e.g. `Nurdaulet Portfolio`) and a username ending in `bot`
   (e.g. `nurdaulet_portfolio_bot`).
3. BotFather replies with an **HTTP API token** that looks like:
   `8123456789:AAH...longstring...`
   → This is your **`TELEGRAM_BOT_TOKEN`**.

### 2. Get your chat_id

The bot must message *you* before it can send to you. So trigger it first:

1. Open your new bot (search its username in Telegram) and press **Start**
   (or send any message like `/start`).
2. Open this URL in a browser (replace `<BOT_TOKEN>`):
   ```
   https://api.telegram.org/bot<BOT_TOKEN>/getUpdates
   ```
3. In the JSON response, find `"chat":{"id": 123456789, ...}`.
   That number (the `id`, usually a positive integer for a private chat) is your
   **`TELEGRAM_CHAT_ID`**.

> If you want messages sent to a group instead, add the bot to the group,
> make it an admin with "Post Messages", and use the group's `id`
> (negative number, e.g. `-1001234567890`).

### 3. Test the bot directly (optional)

```
https://api.telegram.org/bot<BOT_TOKEN>/sendMessage?chat_id=<CHAT_ID>&text=hello
```
You should receive "hello" in Telegram.

### 4. Set the env vars

**Vercel (production):**
1. Vercel dashboard → your project → **Settings → Environment Variables**.
2. Add:
   - `TELEGRAM_BOT_TOKEN` = your token
   - `TELEGRAM_CHAT_ID` = your chat id
3. **Redeploy** (env vars are read at build/runtime — trigger a redeploy).
4. Submit the contact form on the live site → message lands in Telegram.

**Local development:**
Create `.env.local` in the project root (it's gitignored):
```
TELEGRAM_BOT_TOKEN=your_token
TELEGRAM_CHAT_ID=your_chat_id
```
Restart `npm run dev`.

Until these are set, the form returns a friendly 503 ("messaging not configured")
and the direct contact links below still work.

### Notes

- The endpoint validates input server-side (required fields, length caps), HTML-escapes
  everything before sending, and never exposes the token.
- `disable_web_page_preview: true` keeps the Telegram message compact.

---

## Deploy to Vercel

1. Push this repo to GitHub.
2. Vercel → **Add New… → Project** → import the repo.
3. Framework: **Next.js** (auto-detected). No build settings needed.
4. Add the two `TELEGRAM_*` env vars (above).
5. Deploy. Every push to `main` auto-deploys.

## Accessibility & performance

- `prefers-reduced-motion` disables smooth scroll, the hero canvas, and animations.
- Custom cursor + smooth scroll are disabled on touch / coarse pointers.
- Hero canvas pauses via IntersectionObserver when off-screen.

---

© 2026 Nurdaulet Beisenbek. Built with Next.js · GSAP · Vercel.
