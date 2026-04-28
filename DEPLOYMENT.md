# Deployment & configuration guide

Niyodaya Foundation website — how to take v0.1 from "runs on my laptop" to **live at niyodaya.in**.

---

## 1. The decision tree

| You want to…                                | Read section |
|---------------------------------------------|--------------|
| Test everything locally with real keys      | §2, §3, §4, §5 |
| Deploy the site to production               | §6           |
| Connect a Razorpay account                  | §3           |
| Connect Insforge (database + storage)       | §2           |
| Send real emails to donors / admin          | §4           |
| Restrict the /admin area to specific emails | §5 and v0.2 roadmap |

---

## 2. Insforge — data, storage, auth

Insforge will store every form submission and donation record.

### a. Create the project
1. Go to **https://insforge.io** (or your self-hosted instance) and sign in.
2. Create a new project. Name it `niyodaya`.
3. From *Settings → API*, copy:
   - `INSFORGE_URL` (the base URL of your project API)
   - `INSFORGE_API_KEY` (server-side secret — treat like a password)
   - `INSFORGE_ANON_KEY` (public key for future client-side reads)

### b. Create the tables
Paste the following SQL in Insforge's SQL console (or create the tables via the UI with the equivalent columns):

```sql
create table vridhi_applications (
  id            text primary key default gen_random_uuid()::text,
  student_name  text not null,
  age           int,
  father_name   text,
  phone         text,
  school_name   text,
  reason        text,
  status        text default 'new',
  created_at    timestamptz default now()
);

create table vinaya_requests (
  id                text primary key default gen_random_uuid()::text,
  type              text not null,          -- 'school' | 'volunteer'
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
  status                text default 'captured',
  created_at            timestamptz default now()
);

-- For existing deployments missing newer columns:
-- alter table donations add column if not exists address text;
-- alter table donations add column if not exists receipt_url text;

create table disbursements (
  id                text primary key default gen_random_uuid()::text,
  project           text not null,           -- 'vidya' | 'vinaya' | 'vridhi' | 'general'
  institution_name  text not null,           -- the donee — school / partner / vendor
  beneficiaries     text not null,           -- e.g. '120 students (Classes 6–10)'
  description       text,                    -- what the payment was for
  amount            numeric(12,2) not null,
  bank_ref          text not null,           -- NEFT / IMPS / cheque ref from your bank
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
  programme_tag text,     -- 'vridhi' | 'vinaya' | 'vidya'
  event_tag     text,
  consent_ok    boolean default false,
  approved      boolean default false,
  created_at    timestamptz default now()
);
```

### c. Row-level rules (recommended)
- `gallery_photos` — anonymous reads allowed ONLY where `approved = true`.
- `vridhi_applications`, `vinaya_requests`, `contact_messages`, `donations` — no anonymous reads; only the admin role (see §5) can read rows.
- Inserts are accepted from our server using `INSFORGE_API_KEY` — clients never talk to Insforge directly.

### d. Storage buckets
Create two buckets in **Insforge → Storage**:
- `gallery` — **public**. Holds approved photos served on `/gallery`.
- `receipts` — **private**. Holds an archival copy of every donation-receipt PDF emailed to a donor. Receipts contain donor PAN and address, so the bucket must NOT allow anonymous reads. The donate endpoint writes to it; the `receipt_url` saved on the donation row is for admin reference.

---

## 3. Razorpay — payment gateway

### a. Create the merchant account
1. Go to **https://razorpay.com** and click *Sign up → Continue with business email*.
2. Choose *Non-profit / Trust* and complete the KYC form. You'll need:
   - PAN of the foundation (`AAHCN6260D` is on the 80G cert)
   - Bank proof (a cancelled cheque or bank letter — Axis Bank A/C 921010023379607, IFSC UTIB0004426)
   - Certificate of incorporation (uploadable — same PDF as the Memorandum)
   - 80G certificate (attached in `static/80G_Certificate.pdf`)
3. Razorpay typically approves NGOs within 2-3 business days.

### b. Generate API keys
1. Sign in to the Razorpay Dashboard → **Settings → API Keys**.
2. Toggle **Test Mode** (top-right) so you can try it out risk-free.
3. Click **Generate Test Key** — a popup shows:
   - **Key Id** (starts with `rzp_test_…`)
   - **Key Secret** (shown *once* — copy immediately)
4. Put those in your `.env`:
   ```env
   RAZORPAY_KEY_ID=rzp_test_ABCxyz...
   RAZORPAY_KEY_SECRET=<copy from the popup>
   PUBLIC_RAZORPAY_KEY_ID=rzp_test_ABCxyz...     # same value as KEY_ID
   ```
5. Restart the site (`npm run dev`). Now the Donate page opens the real Razorpay Checkout widget.

### c. Webhook (for reliability — optional but recommended)
1. In the Razorpay Dashboard → **Settings → Webhooks → Add New Webhook**.
2. URL: `https://niyodaya.in/api/razorpay-webhook`  (this endpoint ships in v0.2)
3. Events to listen for: `payment.captured`, `payment.failed`.
4. Razorpay shows a **Webhook Secret** — copy it into `RAZORPAY_WEBHOOK_SECRET`.
5. Webhooks ensure that if the donor's browser closes before our success handler runs, we still record the donation.

### d. Test-mode card numbers
| Purpose                 | Card number              | CVV   | Expiry         |
|-------------------------|--------------------------|-------|----------------|
| Successful payment      | `4111 1111 1111 1111`    | `123` | any future date |
| Failed payment          | `5104 0600 0000 0008`    | `123` | any future date |

Full list: https://razorpay.com/docs/payments/payments/test-card-details/

### e. Flip to Live Mode
1. Complete KYC activation (bank verification).
2. Dashboard → toggle **Live Mode**, generate new keys (start with `rzp_live_…`).
3. Replace the three Razorpay values in `.env`.
4. Redeploy. Test with a small real donation (₹10) and refund it from the dashboard.

### f. How the flow works in code
```
Donor fills form → POST /api/donate → server creates Razorpay order → returns order_id + public key
Browser opens Razorpay Checkout → donor pays → Razorpay returns a signed payload
Browser posts payload to PUT /api/donate → server verifies signature → inserts `donations` row
Donor + contact@niyodaya.in receive a thank-you email with the payment ref.
```

---

## 4. Email — transactional (SMTP is now the primary option)

The site tries three transports, in this order:
1. **SMTP** — if `SMTP_HOST` is set in `.env`. Works with any email provider.
2. **Resend HTTP API** — if `RESEND_API_KEY` is set.
3. **Console fallback** — prints to the terminal (for local dev without credentials).

### Option A — SMTP (recommended)

This is the simplest path if you already have `contact@niyodaya.in` set up on any email service (Google Workspace, Zoho, GoDaddy, Outlook, Hostinger, etc.). You just add four values to `.env`:

```env
SMTP_HOST=smtp.gmail.com        # provider's SMTP hostname
SMTP_PORT=587                   # 587 for STARTTLS (most common), 465 for SSL
SMTP_SECURE=false               # true only if you use port 465
SMTP_USER=contact@niyodaya.in   # full email address
SMTP_PASS=xxxxxxxxxxxxxxxx      # app password — see below
EMAIL_FROM="Niyodaya Foundation <contact@niyodaya.in>"
EMAIL_ADMIN=contact@niyodaya.in
```

#### Typical settings per provider

| Provider                              | SMTP host                    | Port | Secure | Username        | Password                                                    |
|---------------------------------------|------------------------------|------|--------|-----------------|-------------------------------------------------------------|
| **Google Workspace / Gmail**          | `smtp.gmail.com`             | 587  | false  | full email      | App password from https://myaccount.google.com/apppasswords |
| **Zoho Mail**                         | `smtp.zoho.in`               | 587  | false  | full email      | Account password or app password (2FA)                      |
| **Microsoft 365 / Outlook**           | `smtp-mail.outlook.com`      | 587  | false  | full email      | Account password (no 2FA) or app password                   |
| **GoDaddy Professional Email**        | `smtpout.secureserver.net`   | 587  | false  | full email      | Mailbox password                                            |
| **Hostinger**                         | `smtp.hostinger.com`         | 465  | true   | full email      | Mailbox password                                            |
| **Your own server (e.g. Postfix)**    | your hostname                | 587  | false  | SMTP user       | SMTP password                                               |

#### Creating a Gmail app password (most common case)
1. Turn on 2-Factor Authentication for contact@niyodaya.in (Google refuses app passwords otherwise).
2. Visit https://myaccount.google.com/apppasswords.
3. App: *Mail*; Device: *Other → "Niyodaya Website"*. Click **Generate**.
4. Copy the 16-character password → paste as `SMTP_PASS` in `.env`.
5. Restart the site. Done.

#### Quick SMTP test
Once credentials are in `.env`, submit the Contact form with a real email in the `email` field. You should see **two emails arrive**: one in the submitter's inbox, one CC'd to contact@niyodaya.in.

### Option B — Resend HTTP API (alternative)
If you prefer an API-based sender, sign up at https://resend.com, verify the `niyodaya.in` domain (add the TXT/MX records Resend supplies), then set `RESEND_API_KEY=re_...`. Leave all `SMTP_*` values blank.

### Submitter + admin copies
Every form (Vridhi, Vinaya, Contact, Donate) now sends:
- A friendly branded acknowledgement to the **submitter's email**.
- The same email CC'd to **`EMAIL_ADMIN` (contact@niyodaya.in)**.

Reply-To on the submitter's copy is set to `EMAIL_ADMIN`, so when they hit reply it goes to the foundation inbox.

If no email was provided (Vridhi applicant may skip it), only the admin gets notified.

### Swapping providers
Everything runs through `src/lib/server/email.js` → `sendEmail()` → `sendToUserAndAdmin()`. Endpoints just call the function; they don't know which transport is active.

---

## 5. Admin access (v0.2 — signed-cookie login)

`/admin` is now protected by a simple session-cookie login.

### To enable it for production
1. Choose a strong shared admin password and put it in `.env`:
   ```env
   ADMIN_PASSWORD=<16+ char random string>
   ADMIN_SESSION_SECRET=<another 32+ char random string>
   ADMIN_EMAILS=contact@niyodaya.in,ganesh@niyodaya.in
   ```
2. Restart the site. Visit `/admin` → you will be redirected to `/admin/login`.
3. Sign in with any of the emails on the allow-list + the shared password.
4. The cookie lasts 8 hours. Use the "Sign out" button in the admin top-bar to clear it immediately.

### Local / dev behaviour
Leave `ADMIN_PASSWORD` blank — the admin pages stay open. The server prints a one-time warning on startup. Perfect for demos and previewing the reports without setting anything up.

### How it works
- `src/hooks.server.js` checks every request. Anything under `/admin/*` or `/api/admin/*` needs a valid session cookie (HMAC-signed with `ADMIN_SESSION_SECRET`).
- Pages without a session are redirected to `/admin/login?next=<orig>`.
- API calls without a session return `401 Unauthorised`.
- The login endpoint validates `(email ∈ ADMIN_EMAILS)` AND `(password === ADMIN_PASSWORD)`, then sets the cookie.
- The razorpay-webhook endpoint is deliberately NOT protected — it authenticates via the Razorpay signature instead.

### Moving to per-user credentials later (v0.3)
The current flow uses a single shared password. If/when you want individual passwords or magic-link email login, swap `src/lib/server/auth.js` for Insforge Auth — the only callers are `hooks.server.js` and the login endpoint, so it's a localised change.

---

## 6. Deploying to production

The app uses `@sveltejs/adapter-node`, so any Node-capable host works. Three options, easiest first:

### Option 1 — Render (easiest, free tier)
1. Push this folder to a GitHub repo.
2. In Render, create a new **Web Service** → connect the repo.
3. Settings:
   - **Build command:** `npm install && npm run build`
   - **Start command:** `node build/index.js`
   - **Environment:** copy each variable from `.env` into Render's Environment tab.
4. Add a custom domain `niyodaya.in` → follow Render's DNS instructions.
5. Done. Pushes to `main` auto-deploy.

### Option 2 — Vercel
1. `vercel` CLI or connect the repo in the Vercel dashboard.
2. Vercel detects SvelteKit; **swap the adapter** to `@sveltejs/adapter-vercel` in `svelte.config.js`.
3. Add env vars in the Vercel dashboard.
4. Add the domain.

### Option 3 — Your own server / VPS
1. Install Node 18+ and a process manager (e.g. `pm2`).
2. `git clone`, `npm install`, `npm run build`.
3. `pm2 start build/index.js --name niyodaya -- --port 3000`.
4. Put nginx (or Caddy) in front for HTTPS + domain routing.

### After deploying — the 60-second smoke test
- Visit every top-level page: `/`, `/about`, `/programmes/vridhi`, `/programmes/vinaya`, `/programmes/vidya`, `/gallery`, `/resources`, `/donate`, `/contact`.
- Submit the Contact form with a test message → confirm you receive the admin email.
- In Razorpay **Test Mode**, make a ₹10 donation with a test card → confirm (a) the Razorpay dashboard shows the payment, (b) the `donations` table has a row, (c) two emails arrive (donor + admin).
- Confirm the images under `/gallery` all load.

---

## 7. Environment variables — full reference

Copy `.env.example` to `.env` (never commit `.env` to git — it's already in `.gitignore`).

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

# ---- Admin ----
ADMIN_EMAILS=contact@niyodaya.in,ganesh@niyodaya.in

# ---- Public site URL (used in receipts, webhooks) ----
PUBLIC_SITE_URL=https://niyodaya.in
```

Any that are missing → the site falls back to local dev behaviour (see README §4). You can, for example, set just the Razorpay keys and leave Insforge empty; donations will go through Razorpay but be stored in memory.

---

## 8. Day-to-day operations

### Update impact numbers (Vridhi / Vinaya)
Edit the files under `src/routes/programmes/<project>/+page.svelte` → the "Our impact so far" section. Commit + redeploy (or push to your auto-deploy branch).

### Add a new photo to the gallery
Until the admin upload UI lands in v0.2:
1. Drop the cleaned JPG into `static/gallery/`.
2. Add a row to `galleryImages` in `src/lib/data/gallery.js`.
3. Commit + redeploy.

### View form submissions
- **With Insforge:** open the Insforge dashboard → Tables → browse rows.
- **Without Insforge:** they live only in the running server's memory, which is fine for dev but not production.

### Export donations for audit
In Insforge, run `select * from donations order by created_at desc` and export as CSV. v0.2 will add a button on `/admin` that does this.

---

## 9. What shipped in v0.2

- ✅ **Admin authentication** — signed session cookie, `ADMIN_PASSWORD` + `ADMIN_EMAILS` allow-list, /admin/login page, logout button, 8-hour sessions. See §5.
- ✅ **80G receipt PDF, per donor** — generated on-demand with pdfkit, attached to the thank-you email, re-downloadable via `/api/receipt?payment_id=<id>&pan=<PAN>`, admin download from the Donors report.
- ✅ **Razorpay webhook** — `/api/razorpay-webhook` records `payment.captured` events idempotently in case the browser flow is interrupted.
- ✅ **Contact inbox** — new `/admin/reports/contact` report with per-message view and one-click reply.
- ✅ **Gallery upload UI** — `/admin/gallery` with multipart upload, caption, date, programme / event tags, consent checkbox. Photos land in Insforge Storage in production, `static/gallery/uploads/` in dev.
- ✅ **Map embed on Contact** — keyless OpenStreetMap iframe + "Open in Google Maps" link.

### Still pending → v0.3

1. **Annual report uploads** under `/resources` (same pattern as gallery).
2. **Team photos & bios** on `/about` (content task + small upload UI).
3. **Kannada translation** — add an i18n layer under `src/lib/data/i18n/`.
4. **Per-user admin credentials** — swap the shared-password `auth.js` for Insforge Auth magic-link if a multi-admin org needs it.
