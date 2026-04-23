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
  amount                numeric(12,2) not null,
  purpose               text,
  razorpay_order_id     text,
  razorpay_payment_id   text,
  status                text default 'captured',
  created_at            timestamptz default now()
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

---

## 3. Razorpay — payment gateway

1. Sign up at **https://razorpay.com** → Merchant account for Niyodaya Foundation (you'll need PAN, GSTIN if any, bank proof).
2. In *Settings → API Keys*, generate **Test Mode** keys first. You get:
   - `RAZORPAY_KEY_ID` starts with `rzp_test_…`
   - `RAZORPAY_KEY_SECRET`
3. Copy the same `KEY_ID` to `PUBLIC_RAZORPAY_KEY_ID` (safe to expose to the browser — Razorpay's Checkout needs it on the client).
4. (Optional, for v0.2) Create a webhook endpoint pointing at `https://niyodaya.in/api/razorpay-webhook` and copy the secret to `RAZORPAY_WEBHOOK_SECRET`.
5. Test donations end-to-end with test cards from Razorpay's docs.
6. Once comfortable, switch to **Live Mode** and replace the keys.

### How the flow works in this site
```
Donor fills form → POST /api/donate → we create order → return order_id + key
Browser opens Razorpay Checkout → donor pays → Razorpay returns a signed payload
Browser posts payload to PUT /api/donate → server verifies signature → inserts row
Donor + admin receive email receipts.
```

### Test cards (for Test Mode only)
- Card: `4111 1111 1111 1111`, CVV: any, Expiry: any future date.
- Full list: https://razorpay.com/docs/payments/payments/test-card-details/

---

## 4. Email — transactional

Default integration: **Resend** (https://resend.com).

1. Create a Resend account, verify the `niyodaya.in` domain (they'll give you DNS records to add — TXT + MX).
2. Copy the API key → `RESEND_API_KEY`.
3. Set `EMAIL_FROM="Niyodaya Foundation <contact@niyodaya.in>"` — Resend needs an address on the verified domain.
4. Set `EMAIL_ADMIN=contact@niyodaya.in` — admin alerts go here.

Swapping for Sendgrid / Postmark: edit `src/lib/server/email.js` and change the `fetch` target + body. The rest of the code just calls `sendEmail({ to, subject, html })`.

---

## 5. Admin access (v0.1)

In v0.1 `/admin` is a public placeholder — it lists what v0.2 will do but doesn't expose any data. If you want to protect it immediately, the simplest approach is:

**Option A — URL-based obscurity (weak, but fine for v0.1):** rename the folder `src/routes/admin` to something like `src/routes/admin-7f3k2`. Still accessible to anyone who has the URL. Use only while the page has no real data.

**Option B — HTTP Basic Auth (quick, hosting-level):** on Vercel / Netlify, add a function or edge middleware to require username/password for `/admin/*`. Ten-minute setup.

**Option C — Real auth (target for v0.2):** Insforge Auth magic-link, email allow-list from `ADMIN_EMAILS` environment variable.

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
# Insforge
INSFORGE_URL=https://your-project.insforge.io
INSFORGE_API_KEY=sk_insforge_...

# Razorpay
RAZORPAY_KEY_ID=rzp_test_...
RAZORPAY_KEY_SECRET=...
RAZORPAY_WEBHOOK_SECRET=...
PUBLIC_RAZORPAY_KEY_ID=rzp_test_...     # mirror of KEY_ID, exposed to browser

# Email
RESEND_API_KEY=re_...
EMAIL_FROM="Niyodaya Foundation <contact@niyodaya.in>"
EMAIL_ADMIN=contact@niyodaya.in

# Admin
ADMIN_EMAILS=contact@niyodaya.in,ganesh@niyodaya.in

# Public site URL (used in receipt links, webhook URLs)
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

## 9. What's still pending for v0.2

The parts deliberately stubbed out in v0.1 (so you can launch quickly) are:

1. **Auth for `/admin`** — magic-link email login with allow-list.
2. **Admin gallery upload UI** — drag-and-drop, EXIF-auto-date.
3. **80G receipt PDF** — generated on successful donation, attached to email.
4. **Razorpay webhook endpoint** — for server-side reconciliation independent of the browser flow.
5. **Annual report uploads** — under `/resources`.
6. **Team photos & bios.**
7. **Google Map embed** on `/contact`.
8. **Kannada translation** — can be added via `$lib/data/i18n` when desired.

These are all small, well-scoped additions that won't change the shape of the app.
