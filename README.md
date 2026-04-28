# Niyodaya Foundation — Website

Official website for **Niyodaya Foundation**, a Section 8 non-profit in Bangalore supporting education for underprivileged, displaced, and specially-abled children.

Live flows: three-project programme pages (Vridhi / Vinaya / Vidya), a curated gallery with admin uploads, a resources page with downloadable Memorandum and 80G certificate, a donation page that opens Razorpay Checkout (or the public `razorpay.me/@niyodayafoundation` link) and emails a per-donor donation receipt with the 80G exemption clause, a contact form, and a full admin dashboard with donor / volunteer / application / inbox reports.

**Tech:** SvelteKit + Node adapter · plain hand-written CSS · Insforge for data & storage · Razorpay for payments · nodemailer / Resend for email · pdfkit for donation receipts.

> This file is the full operator's manual. See also [`CONTENT_GUIDE.md`](./CONTENT_GUIDE.md) for day-to-day text edits and [`DEPLOYMENT.md`](./DEPLOYMENT.md) for the deeper deployment reference.

---

## Table of contents

1. [Quick start](#1-quick-start)
2. [Project layout](#2-project-layout)
3. [How it behaves without credentials](#3-how-it-behaves-without-credentials)
4. [Editing site content (no code)](#4-editing-site-content-no-code)
5. [SMTP / email configuration](#5-smtp--email-configuration)
6. [Razorpay payment gateway](#6-razorpay-payment-gateway)
7. [Insforge backend (database + storage)](#7-insforge-backend-database--storage)
8. [Admin dashboard](#8-admin-dashboard)
9. [Environment variables — full reference](#9-environment-variables--full-reference)
10. [Deploying to production](#10-deploying-to-production)
11. [Version history](#11-version-history)
12. [Troubleshooting](#12-troubleshooting)

---

## 1. Quick start

### Prerequisites
- **Node.js 18 or newer.** Download the LTS installer from [nodejs.org](https://nodejs.org).
  After installing, confirm it with `node --version` in a terminal.

### Run the site locally

From **inside the `niyodaya-website/` folder**:

```bash
npm install          # first time only — installs dependencies
npm run dev          # starts the dev server on http://localhost:5173
```

Wait ~15 seconds, then open **http://localhost:5173/** in your browser. Click around — every form, gallery, donation flow, admin report works end-to-end in memory without any external setup.

Stop the server with `Ctrl + C`.

### One-click start

- **Windows:** double-click `start.bat`
- **macOS / Linux:** double-click `start.sh` (or `bash start.sh` from a terminal)

Both scripts install dependencies on first run, then launch the dev server.

### Production run (background)

For your first public deployment, the site ships with a tiny set of background-run scripts so you don't have to keep a terminal open.

```bash
npm run start:bg            # build + start in background (port 3000)
npm run status              # is it running? which PID?
npm run logs                # tail -f niyodaya.log
npm run stop                # stop the background server
```

The background server writes its PID to `.niyodaya.pid` and its output to `niyodaya.log`. Use a different port with `PORT=8080 npm run start:bg`.

**Windows** users who prefer batch files: `scripts/start-prod.bat [port]` is the equivalent. Stop with `taskkill /F /IM node.exe` (careful — stops all node processes).

### Making a deployment package

```bash
npm run package
```

Produces `dist/niyodaya-website-<timestamp>.tar.gz` — a self-contained archive of just the files needed on a server (source, static assets, scripts, lock file, docs). `node_modules`, `build/`, `.env`, local uploads, and git history are **excluded**.

Typical first-deploy flow on a fresh Linux server:

```bash
scp dist/niyodaya-website-<stamp>.tar.gz  user@your-server:~
ssh user@your-server
tar xzf niyodaya-website-<stamp>.tar.gz
cd niyodaya-website
cp .env.example .env       # edit with your real SMTP / Razorpay / Insforge values
npm install
npm run start:bg
```

Your site is now live on port 3000. Put nginx (or Caddy) in front for HTTPS + custom domain — see §10.

---

## 2. Project layout

```
niyodaya-website/
├── README.md                 ← you are here (setup & config)
├── DEPLOYMENT.md             ← deeper deployment + webhook reference
├── CONTENT_GUIDE.md          ← "where do I change X?" for non-developers
├── .env.example              ← copy to .env, fill in secrets
├── package.json              ← scripts + dependencies
├── svelte.config.js          ← SvelteKit config (uses Node adapter)
├── start.sh / start.bat      ← one-click run scripts
│
├── scripts/                  ← production run + deployment helpers
│   ├── start-prod.sh         ← build + start in background (Linux/macOS)
│   ├── start-prod.bat        ← Windows equivalent
│   ├── stop-prod.sh          ← clean shutdown via PID file
│   ├── status.sh             ← is the server alive?
│   ├── logs.sh               ← tail niyodaya.log
│   └── package.sh            ← create a deployment tarball
│
├── static/                   ← files served as-is (public URLs)
│   ├── logo.svg / logo-mark.svg / logo.png
│   ├── gallery/              ← 17 curated photos + uploads/ (admin, gitignored)
│   ├── team/                 ← drop team photos here (see §4 for usage)
│   ├── MemorandumofAssociation.pdf
│   └── 80G_Certificate.pdf
│
└── src/
    ├── app.html              ← outer HTML shell
    ├── app.css               ← design system (colors, buttons, grid)
    ├── hooks.server.js       ← auth + CSRF (runs on every request)
    ├── lib/
    │   ├── components/       ← Header.svelte, Footer.svelte
    │   ├── data/             ← all editable page copy — nine files (see §4)
    │   │                         site · home · about · team · vridhi · vinaya
    │   │                         vidya · resources · donate · gallery
    │   ├── server/
    │   │   ├── auth.js       ← signed-cookie admin auth
    │   │   ├── insforge.js   ← DB client + seed + in-memory fallback
    │   │   ├── razorpay.js   ← order creation + signature verification
    │   │   ├── email.js      ← SMTP + Resend + console fallback
    │   │   └── receipt.js    ← donation receipt PDF generator (pdfkit)
    │   └── utils/
    │       ├── csv.js        ← CSV export helper
    │       ├── statuses.js   ← workflow states for admin reports
    │       └── validation.js ← shared form validators
    └── routes/
        ├── +layout.svelte
        ├── +page.svelte                      ← Home
        ├── about/
        ├── programmes/{vridhi,vinaya,vidya}/
        ├── gallery/
        ├── resources/
        ├── donate/
        ├── contact/
        ├── health/                           ← /health liveness endpoint (public)
        ├── admin/                            ← reports, disbursements, gallery, login
        └── api/                              ← server endpoints
            ├── apply, vinaya, contact, donate, gallery, receipt
            ├── razorpay-webhook
            └── admin/{donors,volunteers,applications,contact,disbursements,gallery,login,logout}
```

---

## 3. How it behaves without credentials

The site runs **fully end-to-end with zero setup**. Each integration falls back to a safe default when its env vars are missing:

| Feature         | With credentials                                | Without (dev default)                          |
|-----------------|-------------------------------------------------|------------------------------------------------|
| Form submits    | Inserts into Insforge tables                    | Stored in a local JS Map; printed to terminal  |
| Donations       | Razorpay Checkout opens, real order created     | Returns `order_mock_…`; UI shows success msg   |
| Email           | Sent via SMTP or Resend                          | Printed as `[email:fallback]` in the terminal  |
| Admin login     | Email allow-list + shared password required     | Pages open; one-time terminal warning printed  |
| Gallery uploads | Sent to Insforge Storage bucket `gallery`       | Saved to `static/gallery/uploads/` locally     |
| Receipt archive | PDF copy uploaded to bucket `receipts` (private)| Skipped — receipt only emailed, not stored     |
| Donation receipt| Generated + attached to email + admin download  | Same — they are always pdfkit-rendered locally |

This makes demos and prototyping frictionless — and as you add real credentials in `.env`, each feature silently switches from mock to live with no code change.

---

## 4. Editing site content (no code)

All editable copy lives in **`src/lib/data/`** — nine tiny JS files readable in Notepad / TextEdit / any editor. You never need to touch the route files for routine content updates.

| File            | What's inside                                                    |
|-----------------|------------------------------------------------------------------|
| `site.js`       | Registered office, email, bank, nav menu, social handles         |
| `home.js`       | Home page hero, stats, programme teasers, support tiles          |
| `about.js`      | **Our Story**, Mission / Vision / Values, Objectives             |
| `team.js`       | Team section on the About page — names, roles, photos, bios     |
| `vridhi.js`     | Project Vridhi copy + impact numbers (as of 2025)               |
| `vinaya.js`     | Project Vinaya copy + impact numbers (as of 2025)               |
| `vidya.js`      | Adopted schools list, Gandhiji Memorial spotlight                |
| `resources.js`  | External links + downloadable documents                          |
| `donate.js`     | Hero, "Where your money goes" table, bank note, Razorpay-link copy |
| `gallery.js`    | Curated gallery list (filename + date + caption + programme)     |

**Editing rules (in every file's comment header too):**

- Change the text between quotes `'…'` or backticks `` `…` ``.
- Do **not** rename the field keys (`heading`, `body`, `items`, etc.).
- Lists use trailing commas — keep them balanced.
- Fields that explicitly allow HTML (e.g. `story.paragraphs`) support `<strong>`, `<em>`, `<a href="…">`, `<br>`.

### Updating the Team section

The Team block on the About page lives in `src/lib/data/team.js` — you can edit it without touching any page code. Typical flow to add a person with a photo:

1. Drop their photo into `static/team/` (e.g. `ganesh.jpg`). Square, ~400×400 looks best. JPG, PNG, or WebP.
2. Open `src/lib/data/team.js` and fill in their entry:

   ```js
   {
     initials: 'SG',                              // shown as a circle if no photo
     name:     'Subramaniam Ganesh',
     role:     'Director & Promoter',
     photo:    '/team/ganesh.jpg',                // leave '' to keep using initials
     bio:      'Founding director — 15+ years of volunteer education work.',
     links:    [{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/…' }]
   }
   ```

3. Save. The About page picks it up on next reload.

To remove a person, delete their `{ … }` block. To add a person, copy-paste one block and edit the fields. HTML is allowed inside `bio` (`<strong>`, `<em>`, `<a href="…">`).

See [`CONTENT_GUIDE.md`](./CONTENT_GUIDE.md) for more worked examples (impact numbers, adopted schools, gallery photos, resource links).

---

## 5. SMTP / email configuration

Every form (Vridhi apply, Vinaya, Contact, Donate) sends an acknowledgement email **to the submitter** with `contact@niyodaya.in` on **Cc**. Donations additionally attach the **donation-receipt PDF** (a payment acknowledgement, not the 80G certificate; the receipt body carries the exemption clause: *"Donations are exempt u/s 80G of the IT Act vide Regn No. AAHCN6260DF20241 for the period AY 2025-26 to AY 2027-28."*). The `Reply-To` header is the admin inbox so replies land there.

### Transports (tried in this order)

1. **SMTP** — if `SMTP_HOST` is set. Works with Gmail, Zoho, Microsoft 365, GoDaddy, Hostinger, self-hosted Postfix, etc.
2. **Resend HTTP API** — if `RESEND_API_KEY` is set.
3. **Console fallback** — if neither is set, emails are printed to the terminal. Fine for dev.

### Option A — SMTP (recommended)

Add to `.env`:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=contact@niyodaya.in
SMTP_PASS=<app-password>
EMAIL_FROM="Niyodaya Foundation <contact@niyodaya.in>"
EMAIL_ADMIN=contact@niyodaya.in
```

Typical settings per provider:

| Provider                        | Host                        | Port | Secure |
|---------------------------------|-----------------------------|------|--------|
| Gmail / Google Workspace        | `smtp.gmail.com`            | 587  | false  |
| Zoho Mail                       | `smtp.zoho.in`              | 587  | false  |
| Microsoft 365 / Outlook         | `smtp-mail.outlook.com`     | 587  | false  |
| GoDaddy Professional Email      | `smtpout.secureserver.net`  | 587  | false  |
| Hostinger                       | `smtp.hostinger.com`        | 465  | true   |

**Gmail app password setup** (the most common case):
1. Turn on 2-Factor Authentication for `contact@niyodaya.in`.
2. Visit [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords).
3. App: *Mail* → Device: *Niyodaya Website* → **Generate**.
4. Paste the 16-character password into `SMTP_PASS`.
5. Restart the site.

### Option B — Resend HTTP API

Sign up at [resend.com](https://resend.com), verify the `niyodaya.in` domain (they supply DNS records — TXT + MX), then:

```env
RESEND_API_KEY=re_xxxxxxxxxxxx
EMAIL_FROM="Niyodaya Foundation <contact@niyodaya.in>"
EMAIL_ADMIN=contact@niyodaya.in
```

Leave all `SMTP_*` values blank.

### Quick test

Submit the Contact form with your real email in the `email` field. Two emails should arrive: one to you (the form submitter) and one to `contact@niyodaya.in` (CC). If only the terminal prints `[email:fallback]`, your SMTP / Resend credentials aren't being picked up — re-check `.env` and restart the server.

---

## 6. Razorpay payment gateway

### Create the merchant account
1. Go to [razorpay.com](https://razorpay.com) → *Sign up → Continue with business email*.
2. Choose **Non-profit / Trust** during onboarding. Upload:
   - Foundation PAN (`AAHCN6260D`)
   - Bank proof (cancelled cheque — Axis Bank A/C 921010023379607, IFSC UTIB0004426)
   - Certificate of incorporation (`static/MemorandumofAssociation.pdf`)
   - 80G certificate (`static/80G_Certificate.pdf`)
3. Razorpay typically approves NGOs within 2-3 business days.

### Generate test keys
1. Sign in to the Razorpay Dashboard → **Settings → API Keys**.
2. Toggle **Test Mode** (top right).
3. Click **Generate Test Key**. A popup shows the Key Id (`rzp_test_…`) and Key Secret **once** — copy both immediately.
4. Put them in `.env`:

```env
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
RAZORPAY_KEY_SECRET=<paste from popup>
PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx     # same as KEY_ID
```

Restart the site. The Donate page now opens the real Razorpay Checkout widget.

### Test-mode card numbers

| Purpose             | Card number            | CVV   | Expiry           |
|---------------------|------------------------|-------|------------------|
| Successful payment  | `4111 1111 1111 1111`  | `123` | any future date  |
| Failed payment      | `5104 0600 0000 0008`  | `123` | any future date  |

Full list: [razorpay.com/docs/payments/payments/test-card-details](https://razorpay.com/docs/payments/payments/test-card-details/).

### Webhook (recommended)
1. Razorpay Dashboard → **Settings → Webhooks → Add New Webhook**.
2. URL: `https://niyodaya.in/api/razorpay-webhook`
3. Events: `payment.captured`, `payment.failed`.
4. Copy the shown webhook secret into `.env`:
   ```env
   RAZORPAY_WEBHOOK_SECRET=<paste from razorpay>
   ```
5. Webhooks ensure that if the donor's browser closes before our success handler runs, the payment is still recorded (idempotent — replay-safe).

### Flip to live mode
1. Complete Razorpay's KYC activation (bank verification).
2. Toggle to **Live Mode** in the dashboard; regenerate keys (`rzp_live_…`).
3. Replace `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `PUBLIC_RAZORPAY_KEY_ID` in `.env`.
4. Redeploy. Test with a real ₹10 donation and refund it from the dashboard.

### How the flow works in code
```
Donor fills form (incl. address) → POST /api/donate → server creates Razorpay order → returns order_id + public key
Browser opens Razorpay Checkout → donor pays → Razorpay returns signed payload
Browser calls PUT /api/donate → server verifies signature → inserts donations row (with address)
Donation receipt PDF generated (pdfkit) → archived in Insforge bucket `receipts` (URL saved to receipt_url)
                                       → attached to email → donor (To) + contact@niyodaya.in (Cc)
```

### Razorpay direct link (alternative)
The Donate page also surfaces the public Razorpay payment-page link **`https://razorpay.me/@niyodayafoundation`** (`site.razorpayHandle` in `src/lib/data/site.js`). This is for donors who prefer paying outside the embedded checkout (UPI from their banking app, etc.). Payments through this link are **not** captured by `/api/donate`, so no donations row, no automatic receipt, and no archive copy is created. The donate page asks those donors to email their PAN and address to `contact@niyodaya.in` so a receipt can be issued manually. If you want auto-receipts here too, enable a Razorpay webhook on `payment.captured` for the same merchant account and extend `/api/razorpay-webhook`.

---

## 7. Insforge backend (database + storage)

Insforge is used for:
- Form submission storage (applications, volunteer requests, contact messages, donations)
- Gallery photo file storage (production)
- Optional Auth for a future v0.3 multi-admin setup

### Create the project

1. Go to [insforge.io](https://insforge.io) and create a project named `niyodaya`.
2. From *Settings → API*, copy the base URL and the server API key into `.env`:
   ```env
   INSFORGE_URL=https://your-project.insforge.io
   INSFORGE_API_KEY=sk_insforge_xxxxxxxxxxxx
   ```

### Create the tables

Paste this into Insforge's SQL console:

```sql
create table vridhi_applications (
  id            text primary key default gen_random_uuid()::text,
  student_name  text not null,
  age           int,
  father_name   text,
  phone         text,
  email         text,
  school_name   text,
  reason        text,
  status        text default 'new',
  created_at    timestamptz default now()
);

create table vinaya_requests (
  id                text primary key default gen_random_uuid()::text,
  type              text not null,
  name              text not null,
  contact           text not null,
  city              text,
  needs_or_skills   text,
  description       text,
  hours_per_week    int,
  status            text default 'new',
  created_at        timestamptz default now()
);

create table contact_messages (
  id         text primary key default gen_random_uuid()::text,
  name       text not null,
  email      text not null,
  subject    text,
  message    text not null,
  created_at timestamptz default now()
);

create table donations (
  id                    text primary key default gen_random_uuid()::text,
  donor_name            text not null,
  email                 text not null,
  phone                 text,
  pan                   text,
  address               text,
  amount                numeric(12,2) not null,
  purpose               text,
  razorpay_order_id     text,
  razorpay_payment_id   text,
  receipt_url           text,
  cert_sent             boolean default false,
  status                text default 'captured',
  created_at            timestamptz default now()
);

-- For projects that already created `donations` before address / receipt_url
-- existed, run these to bring the schema up-to-date and refresh PostgREST's
-- column cache (otherwise inserts fail with PGRST204):
-- alter table donations add column if not exists address text;
-- alter table donations add column if not exists receipt_url text;
-- notify pgrst, 'reload schema';

create table disbursements (
  id                text primary key default gen_random_uuid()::text,
  project           text not null,           -- 'vidya' | 'vinaya' | 'vridhi' | 'general'
  institution_name  text not null,           -- the donee (school / partner / vendor)
  beneficiaries     text not null,
  description       text,
  amount            numeric(12,2) not null,
  bank_ref          text not null,
  payment_date      date not null,
  status            text default 'paid',     -- 'planned' | 'paid' | 'cancelled'
  notes             text,
  created_at        timestamptz default now()
);

create table gallery_photos (
  id            text primary key default gen_random_uuid()::text,
  image_url     text not null,
  caption       text,
  photo_date    date,
  programme_tag text,
  event_tag     text,
  consent_ok    boolean default false,
  approved      boolean default false,
  created_at    timestamptz default now()
);
```

### Row-level rules (recommended)
- `gallery_photos` — anonymous reads allowed *only* where `approved = true`.
- All other tables — no anonymous reads; only the admin role can read. Inserts come from our server with the `INSFORGE_API_KEY`; the browser never talks to Insforge directly.

### Storage buckets
Create two buckets in **Insforge → Storage**:
- **`gallery`** — *public*. Approved gallery photos uploaded from `/admin/gallery` land here.
- **`receipts`** — *private*. Holds an archival copy of every donation-receipt PDF emailed to a donor. Receipts contain donor PAN and address, so this bucket must NOT allow anonymous reads. The donate endpoint writes here as `donation_<donation_id>.pdf` and saves the returned URL to `donations.receipt_url`.

---

## 8. Admin dashboard

Visit **`/admin`** (e.g. http://localhost:5173/admin).

### Enabling login

Add to `.env`:

```env
ADMIN_PASSWORD=<16+ character random string>
ADMIN_SESSION_SECRET=<32+ character random string>
ADMIN_EMAILS=contact@niyodaya.in,ganesh@niyodaya.in
```

Restart. `/admin` now redirects to `/admin/login`. Sign in with any allow-listed email + the shared password. The cookie lasts 8 hours. A **Sign out** button sits in the admin top-bar.

Leave `ADMIN_PASSWORD` blank in dev to keep pages open (the server prints a warning on startup).

### What's inside

- **Reports → Donors** — year filter, running totals, per-donor donation-receipt download (regenerated from the row, including donor address if captured), mark receipt sent/pending, CSV export.
- **Reports → Volunteers** — year filter, **inline status dropdown** (new / active / inactive / declined), CSV export.
- **Reports → Applications** — year filter, **inline status dropdown** (new / counselling / enrolled / declined / closed), CSV export.
- **Reports → Contact inbox** — per-message card view, one-click **Reply by email** (opens mailto with quoted original).
- **Disbursements** (`/admin/disbursements`) — record outgoing payments to donee institutions. The actual transfer is made offline from the bank; this page is the audit trail. Per-record fields: project (`vidya` / `vinaya` / `vridhi` / `general`), donee institution, beneficiaries, free-text description, amount, bank reference, payment date, status (`planned` / `paid` / `cancelled`), notes. Filter by year and project, change status inline, export CSV.
- **Content → Gallery** — drag-and-drop photo upload with caption, date, programme tag, event tag, consent checkbox. Publishes to the public gallery instantly.

### Editing the status vocabulary

`src/lib/utils/statuses.js` — add / rename values there, both the API validation and the dropdowns pick up the change automatically.

---

## 9. Environment variables — full reference

Copy `.env.example` to `.env` and fill in the blanks. Never commit `.env` (already in `.gitignore`).

```env
# ---- Insforge (data + storage) ----
INSFORGE_URL=https://your-project.insforge.io
INSFORGE_API_KEY=sk_insforge_...

# ---- Razorpay (payment gateway) ----
RAZORPAY_KEY_ID=rzp_test_...
RAZORPAY_KEY_SECRET=...
RAZORPAY_WEBHOOK_SECRET=...
PUBLIC_RAZORPAY_KEY_ID=rzp_test_...     # same as KEY_ID, exposed to browser

# ---- Email — Option A: SMTP (preferred) ----
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=contact@niyodaya.in
SMTP_PASS=<app-password>

# ---- Email — Option B: Resend HTTP API (alternative) ----
# RESEND_API_KEY=re_...

# ---- Email — shared ----
EMAIL_FROM="Niyodaya Foundation <contact@niyodaya.in>"
EMAIL_ADMIN=contact@niyodaya.in

# ---- Admin access ----
ADMIN_PASSWORD=<leave blank in dev to open admin pages>
ADMIN_SESSION_SECRET=<long random string>
ADMIN_EMAILS=contact@niyodaya.in,ganesh@niyodaya.in

# ---- Public site URL (used in receipts, webhooks) ----
PUBLIC_SITE_URL=https://niyodaya.in
```

Any missing variable silently falls back to the dev behaviour described in §3.

---

## 10. Deploying to production

The site uses `@sveltejs/adapter-node`, so any Node-capable host works. Four options, easiest first:

### Option 0 — Tarball + VPS (fastest path to a public URL)
Best for a first public test drive when you already have a Linux server with SSH access.
```bash
# On your laptop:
npm run package
scp dist/niyodaya-website-<stamp>.tar.gz  user@your-server:~

# On the server:
tar xzf niyodaya-website-<stamp>.tar.gz
cd niyodaya-website
cp .env.example .env      # edit with real SMTP / Razorpay / Insforge values
npm install
npm run start:bg          # → http://localhost:3000 in background
npm run status            # confirm it's alive
npm run logs              # tail the log
```
Put nginx or Caddy in front of port 3000 for HTTPS + your custom domain. See [`DEPLOYMENT.md`](./DEPLOYMENT.md) for the nginx snippet.

### Option 1 — Render (simplest managed)
1. Push this folder to a GitHub repo.
2. In Render → **New Web Service** → connect the repo.
3. **Build command:** `npm install && npm run build`.
4. **Start command:** `node build/index.js`.
5. Copy every `.env` value into Render's Environment tab.
6. Add `niyodaya.in` as a custom domain; follow Render's DNS instructions.
7. Pushes to `main` auto-deploy.
8. Set Render's **Health check path** to `/health`. The endpoint returns 200 with a small JSON body (no DB calls), so it's safe to ping aggressively.

#### Keeping a Render free-tier service warm
Render's free tier puts a Web Service to sleep after 15 minutes of no traffic — the next visit then waits ~30 seconds for cold-start. The `/health` endpoint exists so a free uptime monitor can hit it at a regular interval and keep the dyno warm. Pick **one** of:

- **UptimeRobot** (easiest, free) — create an HTTP(s) monitor for `https://<your-render-app>.onrender.com/health`, interval 5 minutes. Done.
- **GitHub Actions cron** — a `schedule: cron: '*/10 * * * *'` workflow that `curl`s `/health` every 10 minutes.
- **cron-job.org** — same idea, web UI, free.

Note: keeping a free instance permanently warm is in a grey area of Render's terms (they do not strictly disallow it, but the free tier is meant for prototyping). If the site grows past a hobby project, upgrade to the $7/mo Starter plan and drop the keep-alive ping.

### Option 2 — Vercel
1. `vercel` CLI or connect the repo in the dashboard.
2. Swap the adapter to `@sveltejs/adapter-vercel` in `svelte.config.js`.
3. Copy env vars in the Vercel dashboard.
4. Add the custom domain.

### Option 3 — Your own VPS
1. Install Node 18+ and `pm2`.
2. `git clone`, `npm install`, `npm run build`.
3. `pm2 start build/index.js --name niyodaya -- --port 3000`.
4. nginx or Caddy in front for HTTPS + domain routing.

### 60-second post-deploy smoke test
- Visit every top-level page (`/`, `/about`, the three `/programmes/*`, `/gallery`, `/resources`, `/donate`, `/contact`).
- Submit the Contact form — confirm the acknowledgement + admin copy arrive.
- In Razorpay **Test Mode**, donate ₹10 — confirm (a) Razorpay dashboard shows the payment, (b) the `donations` table has a row with `address` and `receipt_url` populated, (c) a copy of the PDF appears in the Insforge `receipts` bucket, (d) the donor receives a thank-you email **with the donation receipt PDF attached**, and `contact@niyodaya.in` is on Cc.
- Hit `https://<your-host>/health` — expect a 200 response with `{ ok: true, ts, uptime_s }` and no auth challenge.
- Log into `/admin` and open each of the reports plus `/admin/disbursements` — all should render without error.
- Upload a test photo from `/admin/gallery` — confirm it appears on `/gallery` immediately.

See [`DEPLOYMENT.md`](./DEPLOYMENT.md) for the deeper reference (webhook setup, swapping auth, upgrading adapters).

---

## 11. Version history

**v0.2.2 (current)** — New **Disbursements** report at `/admin/disbursements` records outgoing payments to donee institutions (project, beneficiaries, amount, bank ref, payment date, status, notes). Backed by a new `disbursements` table; CSV export and inline status editing reuse the existing report patterns. Admin-home tile added. New public **`/health`** endpoint returns `200 { ok, ts, uptime_s }` with no DB calls — point Render's Health Check Path here, and use it as the keep-alive target for an UptimeRobot / GitHub-Actions-cron pinger to stop free-tier instances from sleeping.

**v0.2.1** — Donor form now captures **donor address** (required, used on the receipt). Donate page surfaces the public Razorpay handle **`razorpay.me/@niyodayafoundation`** as an alternative to the embedded Checkout. Receipt PDF re-titled **"Donation Receipt"** (a payment acknowledgement, not the 80G certificate); the body now carries the exact statutory clause *"Donations are exempt u/s 80G of the IT Act vide Regn No. AAHCN6260DF20241 for the period AY 2025-26 to AY 2027-28."* with **Donor PAN** and **Niyodaya PAN (`AAHCN6260D`)** both shown as separate rows. After a successful payment the PDF is **archived in Insforge Storage** in a new private bucket `receipts` (key `donation_<donation_id>.pdf`) and the URL is saved to `donations.receipt_url`. Schema added two columns: `address text`, `receipt_url text` (with `notify pgrst, 'reload schema'` required after the alter to avoid a `PGRST204` schema-cache miss). Email copy reworded throughout (attachment is `Niyodaya_Donation_Receipt.pdf`, body shows Donor PAN and the 80G clause as a footer).

**v0.2** — admin session-cookie authentication (`/admin/login`, 8-hour cookies, email allow-list); per-donor **donation receipt PDF** generated with pdfkit (attached to the thank-you email, re-downloadable by donor, admin download from Donors report); Razorpay webhook endpoint for server-side payment reconciliation; **contact-message inbox report** with one-click email reply; **gallery upload UI** in `/admin/gallery` (Insforge Storage in prod, `static/gallery/uploads/` in dev); keyless OSM **map embed** on Contact; **inline status editing** in Volunteers and Applications reports (dropdown saves optimistically); **Team section** extracted to its own file `src/lib/data/team.js` for easy editing with a drop-in `static/team/` photo folder; background-run scripts (`npm run start:bg / status / logs / stop`); **deployment packaging** via `npm run package` for tarball-based first deploys.

**v0.1** — public site, all nine pages, form endpoints with local fallback, Razorpay Checkout in mock mode, content-in-data-files refactor.

What's planned for v0.3: Annual report uploads under Resources; Insforge Auth magic-link for per-user admin credentials; per-member team bios & richer About page; optional Kannada translation; admin UI to edit the `/admin/gallery` upload caption after the fact.

---

## 12. Troubleshooting

- **`npm install` fails with EACCES / permission errors.** The folder is read-only. Copy `niyodaya-website/` to a location you own (e.g. `~/Documents/`).
- **Port 5173 already in use.** Another app is using it. Stop that app, or run `npm run dev -- --port 5174`.
- **Images don't load.** Confirm filenames in `src/lib/data/gallery.js` match the files in `static/gallery/` (case-sensitive).
- **Forms show "Network error".** The dev server may have stopped. Check the terminal. Restart with `npm run dev`.
- **Admin pages redirect to `/admin/login` unexpectedly.** Your session cookie expired (8 hours). Sign in again.
- **Admin API returns 401 in curl tests.** Login first and save cookies to a jar (`-c cookies.txt`), then send with `-b cookies.txt` on subsequent calls.
- **Razorpay checkout shows "Payment widget still loading".** Your `.env` is missing `PUBLIC_RAZORPAY_KEY_ID`, or the CDN script at `checkout.razorpay.com` is blocked on your network.
- **SMTP emails not delivered.** Check the server terminal for `[email:smtp] failed` lines. Most common cause: Gmail requires an *app password*, not your regular password (see §5).
- **`Insforge 400: PGRST204 — Could not find the 'address' (or 'receipt_url') column of 'donations' in the schema cache`** after a successful Razorpay payment. The `donations` table on Insforge predates these columns. Fix once: run `alter table donations add column if not exists address text; alter table donations add column if not exists receipt_url text; notify pgrst, 'reload schema';` in the Insforge SQL console. The `notify` is essential — without it PostgREST keeps the stale column list cached. The donor's payment is still safe in the Razorpay dashboard; insert the row manually from the Razorpay payment record (donor name, email, PAN are in the Razorpay `notes` field) and re-issue the receipt from `/admin/reports/donors`.
- **"Invalid export 'X'" build error.** SvelteKit endpoint files can only export HTTP handlers. Put constants in `src/lib/utils/*.js`.

---

*Niyodaya Foundation — a new dawn for every child's learning.*
