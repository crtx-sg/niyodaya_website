# Niyodaya Foundation — Website v0.1

Official website for **Niyodaya Foundation**, a Section 8 non-profit in Karnataka supporting education for underprivileged, displaced, and specially-abled children.

- **Front-end:** SvelteKit + hand-written CSS (no Tailwind, no build ceremony)
- **Back-end:** Insforge (data, storage, auth) — via `src/lib/server/insforge.js`
- **Payments:** Razorpay — via `src/lib/server/razorpay.js`
- **Email:** Resend (swappable) — via `src/lib/server/email.js`
- **Deploys as:** a standard Node server, or to Vercel / Netlify / Render

When environment variables are not configured, every integration falls back to a local in-memory / console-log mock, so you can run the site end-to-end with zero setup.

---

## 1. Quick start (5 minutes)

### What you need
1. **Node.js 18 or newer** — install from https://nodejs.org (the LTS build is fine).
   - After installing, open a terminal and run `node --version` to confirm.
2. That's it.

### Run it
Open a terminal **inside this `niyodaya-website` folder** and run:

```bash
npm install
npm run dev
```

Wait 10-20 seconds, then open **http://localhost:5173/** in your browser.

That's the whole site — click around, submit the Vridhi / Vinaya / Contact / Donate forms. Submissions go to an in-memory store and email is printed to the terminal (because there are no real credentials yet). Nothing is lost — you're just in dev mode.

To stop the server, press `Ctrl + C` in the terminal.

> **On Windows** you can also double-click `start.bat`.
> **On macOS / Linux** you can double-click `start.sh` (or `bash start.sh`).
> Both scripts install dependencies the first time, then start the dev server.

---

## 2. One-click start (already included)

- `start.bat` — Windows double-click
- `start.sh` — macOS / Linux double-click (or `bash start.sh`)

Both do the same thing: check that `node_modules` exists, install it if not, then run `npm run dev`.

---

## 3. Folder map (what lives where)

```
niyodaya-website/
├── README.md                 ← you are here
├── DEPLOYMENT.md             ← production config, env vars, Razorpay keys
├── .env.example              ← copy to .env and fill in real values
├── start.sh / start.bat      ← one-click start
├── package.json              ← scripts and dependencies
├── svelte.config.js          ← SvelteKit config (uses Node adapter)
├── static/                   ← public files served as-is
│   ├── logo.svg              ← full logo lockup
│   ├── logo-mark.svg         ← emblem only (favicon, header)
│   ├── logo.png              ← preview rendering of the full logo
│   ├── gallery/              ← 17 curated gallery images
│   └── MemorandumofAssociation.pdf
└── src/
    ├── app.html              ← outer HTML shell
    ├── app.css               ← design system (colors, buttons, grid)
    ├── lib/
    │   ├── components/       ← Header.svelte, Footer.svelte
    │   ├── data/
    │   │   ├── site.js       ← EDIT: address, email, bank, nav, social
    │   │   └── gallery.js    ← EDIT: curated gallery list & captions
    │   ├── server/
    │   │   ├── insforge.js   ← Insforge client (with local fallback)
    │   │   ├── razorpay.js   ← Razorpay order creation + signature check
    │   │   └── email.js      ← Resend sender (with console fallback)
    │   └── utils/
    │       └── validation.js ← shared form validators
    └── routes/
        ├── +layout.svelte    ← header + footer wrapper
        ├── +page.svelte      ← Home
        ├── about/+page.svelte
        ├── programmes/
        │   ├── +page.svelte
        │   ├── vridhi/+page.svelte       ← contains Vridhi impact + form
        │   ├── vinaya/+page.svelte       ← contains Vinaya impact + forms
        │   └── vidya/+page.svelte        ← contains Gandhiji Memorial section
        ├── gallery/+page.svelte          ← filtered, click-to-enlarge
        ├── resources/+page.svelte        ← DIKSHA, DIYA, Darpan, etc.
        ├── donate/+page.svelte           ← Razorpay Checkout integration
        ├── contact/+page.svelte
        ├── admin/+page.svelte            ← placeholder for v0.2
        └── api/                          ← server-side form endpoints
            ├── apply/+server.js          ← POST → vridhi_applications
            ├── vinaya/+server.js         ← POST → vinaya_requests
            ├── contact/+server.js        ← POST → contact_messages
            ├── donate/+server.js         ← POST create order, PUT verify
            └── gallery/+server.js        ← GET list, POST upload (admin)
```

### Files you will edit most often
- `src/lib/data/site.js` — **contact details, bank info, registration info, nav menu**
- `src/lib/data/gallery.js` — **curated gallery set (captions, dates, tags)**
- `src/routes/programmes/vridhi/+page.svelte` — **Vridhi impact numbers** (as of 2025)
- `src/routes/programmes/vinaya/+page.svelte` — **Vinaya impact numbers** (as of 2025)
- `src/routes/programmes/vidya/+page.svelte` — **Gandhiji Memorial photos + list of adopted schools**
- `src/routes/resources/+page.svelte` — **links and downloadable documents**

All plain text — no build steps to worry about. Save the file and the dev server hot-reloads.

---

## 4. How it behaves without credentials

This is the default state right after `npm install`:

| Feature         | With credentials                                | Without credentials (dev default)                  |
|-----------------|-------------------------------------------------|----------------------------------------------------|
| Form submits    | Inserts into Insforge tables                    | Stored in an in-memory JS object; logs to terminal |
| Donations       | Razorpay Checkout opens, real order created     | Returns a `order_mock_…` id; UI shows success msg  |
| Email to admin  | Sent via Resend (contact@niyodaya.in)           | Printed to the terminal (`[email:fallback] …`)     |
| Gallery list    | Merges static list + Insforge rows              | Shows the 17 curated photos only                   |

This lets you demo the full end-to-end experience on your laptop with zero external setup. When you're ready to go live, fill in `.env` (see `DEPLOYMENT.md`) and every fallback is automatically replaced by the real thing.

---

## 5. How to edit common things

### Change the address or email
Open `src/lib/data/site.js` → `site` object → update `email`, `address`, `bank`, etc. Save.

### Add a new photo to the gallery (without a backend)
1. Put the cleaned `.jpg` in `static/gallery/`
2. Add a new row to `galleryImages` in `src/lib/data/gallery.js` with the filename, date, event, caption, programme tag.

### Change an impact number
Open the relevant programme page (e.g. `src/routes/programmes/vridhi/+page.svelte`) and edit the `<div class="num">…</div>` values inside the "Our impact so far" section.

### Add a new tab / page
Create a new folder under `src/routes/` (e.g. `src/routes/news/`) and add a `+page.svelte` file. SvelteKit will route to it automatically. Then add an entry to the `nav` array in `src/lib/data/site.js` so it appears in the menu.

---

## 6. Going live

See `DEPLOYMENT.md` for:
- Environment variables
- Creating Insforge tables
- Razorpay test → production cutover
- Email sender setup
- Deploying to Vercel / Render / any Node host

---

## 7. Troubleshooting

- **`npm install` fails with EACCES / permission errors.** You're probably running from a read-only folder. Copy `niyodaya-website` to somewhere you own (e.g. `Documents/niyodaya-website`) and re-run.
- **Port 5173 already in use.** Another app is using it. Stop that app, or run `npm run dev -- --port 5174`.
- **Images don't load.** Confirm the files are in `static/gallery/` and the filenames in `src/lib/data/gallery.js` match exactly (case-sensitive).
- **Forms show "Network error".** The dev server might have stopped. Check the terminal — restart with `npm run dev` if needed.

---

## 8. Version

**v0.1** — April 2026.

Next iterations (v0.2 roadmap):
- Insforge Auth for `/admin` (magic-link, admin email allow-list)
- Gallery upload UI (multipart file upload to Insforge Storage)
- 80G receipt PDF generation on successful donation
- Razorpay webhook endpoint for server-side reconciliation
- Team photos and bios
- Google Map embed on Contact page
