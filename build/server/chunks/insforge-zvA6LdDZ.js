import { b as private_env } from './shared-server-CO0iTl3r.js';

const mem = {
  vridhi_applications: [],
  vinaya_requests: [],
  contact_messages: [],
  donations: [],
  gallery_photos: []
};
function hasInsforge() {
  return Boolean(private_env.INSFORGE_URL && private_env.INSFORGE_API_KEY);
}
async function insert(table, row) {
  const payload = { ...row, created_at: (/* @__PURE__ */ new Date()).toISOString() };
  if (!hasInsforge()) {
    const id = `local_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    mem[table] = mem[table] || [];
    mem[table].push({ id, ...payload });
    console.log(`[insforge:fallback] inserted into ${table}`, { id });
    return { ok: true, id };
  }
  try {
    const res = await fetch(`${private_env.INSFORGE_URL}/api/tables/${table}/rows`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${private_env.INSFORGE_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      const t = await res.text();
      return { ok: false, error: `Insforge ${res.status}: ${t}` };
    }
    const data = await res.json();
    return { ok: true, id: data.id };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}
async function list(table, where = {}) {
  if (!hasInsforge()) return mem[table] || [];
  try {
    const q = new URLSearchParams(where).toString();
    const res = await fetch(`${private_env.INSFORGE_URL}/api/tables/${table}/rows?${q}`, {
      headers: { "Authorization": `Bearer ${private_env.INSFORGE_API_KEY}` }
    });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}
async function update(table, id, patch) {
  if (!hasInsforge()) {
    const rows = mem[table] || [];
    const idx = rows.findIndex((r) => r.id === id);
    if (idx === -1) return { ok: false, error: "Row not found" };
    rows[idx] = { ...rows[idx], ...patch, updated_at: (/* @__PURE__ */ new Date()).toISOString() };
    return { ok: true, row: rows[idx] };
  }
  try {
    const res = await fetch(`${private_env.INSFORGE_URL}/api/tables/${table}/rows/${id}`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${private_env.INSFORGE_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(patch)
    });
    if (!res.ok) {
      const t = await res.text();
      return { ok: false, error: `Insforge ${res.status}: ${t}` };
    }
    return { ok: true, row: await res.json() };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}
let _seeded = false;
function seedSampleData() {
  if (_seeded || hasInsforge()) return;
  _seeded = true;
  const daysAgo = (n) => new Date(Date.now() - n * 864e5).toISOString();
  if (mem.donations.length === 0) mem.donations = [
    { id: "sample_d1", donor_name: "Asha Mehta", email: "asha@example.com", phone: "9810000001", pan: "AAAPM1234A", amount: 7500, purpose: "Uniform & books", razorpay_payment_id: "pay_sample_1", cert_sent: true, status: "captured", created_at: daysAgo(310) },
    { id: "sample_d2", donor_name: "Rahul Iyer", email: "rahul@example.com", phone: "9810000002", pan: "BBBPM1234B", amount: 25e3, purpose: "NIOS fees", razorpay_payment_id: "pay_sample_2", cert_sent: false, status: "captured", created_at: daysAgo(200) },
    { id: "sample_d3", donor_name: "Lakshmi Rao", email: "lakshmi@example.com", phone: "9810000003", pan: "CCCPM1234C", amount: 3e5, purpose: "Adopt a classroom", razorpay_payment_id: "pay_sample_3", cert_sent: true, status: "captured", created_at: daysAgo(120) },
    { id: "sample_d4", donor_name: "Sneha Kapoor", email: "sneha@example.com", phone: "9810000004", pan: "DDDPM1234D", amount: 1e4, purpose: null, razorpay_payment_id: "pay_sample_4", cert_sent: false, status: "captured", created_at: daysAgo(45) },
    { id: "sample_d5", donor_name: "Arjun Nair", email: "arjun@example.com", phone: "9810000005", pan: "EEEPM1234E", amount: 7500, purpose: "Uniform & books", razorpay_payment_id: "pay_sample_5", cert_sent: false, status: "captured", created_at: daysAgo(10) }
  ];
  if (mem.vinaya_requests.length === 0) mem.vinaya_requests = [
    { id: "sample_v1", type: "volunteer", name: "Meera Joshi", contact: "meera@example.com", city: "Bengaluru", needs_or_skills: "Maths, Spoken English", description: null, hours_per_week: 4, status: "new", created_at: daysAgo(180) },
    { id: "sample_v2", type: "volunteer", name: "Rohan Das", contact: "9020000002", city: "Mysuru", needs_or_skills: "Computers", description: null, hours_per_week: 2, status: "active", created_at: daysAgo(95) },
    { id: "sample_v3", type: "volunteer", name: "Priyanka Verma", contact: "priyanka@example.com", city: "Bengaluru", needs_or_skills: "Art & craft, Mentorship", description: "Weekends only", hours_per_week: 6, status: "new", created_at: daysAgo(30) },
    { id: "sample_v4", type: "school", name: "GMV Vidya Mandir", contact: "principal@gmv.example", city: "Bengaluru", needs_or_skills: "Maths volunteers", description: "Need two teachers", hours_per_week: null, status: "active", created_at: daysAgo(150) }
  ];
  if (mem.vridhi_applications.length === 0) mem.vridhi_applications = [
    { id: "sample_a1", student_name: "Kiran S.", age: 16, father_name: "Suresh S.", phone: "9900000001", email: "suresh@example.com", school_name: "Govt High School, Hebbal", reason: "Missed Class 10 board — needs NIOS route", status: "enrolled", created_at: daysAgo(260) },
    { id: "sample_a2", student_name: "Radhika P.", age: 14, father_name: "Prakash P.", phone: "9900000002", email: null, school_name: "Govt Primary School, New Thippasandra", reason: "Dropped out due to financial hardship", status: "counselling", created_at: daysAgo(110) },
    { id: "sample_a3", student_name: "Arif K.", age: 17, father_name: "Karim K.", phone: "9900000003", email: "karim@example.com", school_name: "Govt PU College", reason: "Failed Class 12 — wants vocational training", status: "new", created_at: daysAgo(60) },
    { id: "sample_a4", student_name: "Deepika N.", age: 15, father_name: "Nagesh N.", phone: "9900000004", email: null, school_name: null, reason: "Displaced during floods — needs bridge support", status: "new", created_at: daysAgo(15) }
  ];
  if (mem.contact_messages.length === 0) mem.contact_messages = [
    { id: "sample_m1", name: "Vikram Rao", email: "vikram@example.com", subject: "Partnership enquiry", message: "Hello team,\n\nOur company CSR team is looking to partner with NGOs in education. Could we schedule a call to learn more about your programmes?\n\nRegards,\nVikram", created_at: daysAgo(21) },
    { id: "sample_m2", name: "Anjali Shah", email: "anjali@example.com", subject: "Volunteering from abroad", message: "Hi, I am a retired teacher based in Dubai. Is remote volunteering possible — maybe online maths tutoring for the children?", created_at: daysAgo(5) },
    { id: "sample_m3", name: "Nikhil Menon", email: "nikhil@example.com", subject: "Question about 80G", message: "I would like to donate ₹50,000 this financial year. Can you confirm the 80G status is active and share your receipt format?", created_at: daysAgo(2) }
  ];
}

export { insert as i, list as l, seedSampleData as s, update as u };
//# sourceMappingURL=insforge-zvA6LdDZ.js.map
