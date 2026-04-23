import { c as create_ssr_component, e as each, f as add_attribute, d as escape } from './ssr--GcvDUzA.js';

const css = {
  code: ".crumbs.svelte-ojurqn.svelte-ojurqn{margin-bottom:8px;font-size:13px}.toolbar.svelte-ojurqn.svelte-ojurqn{display:flex;gap:14px;align-items:center;margin:16px 0 12px;flex-wrap:wrap}.toolbar.svelte-ojurqn label.svelte-ojurqn{font-size:13.5px;color:var(--ink-soft)}.toolbar.svelte-ojurqn select.svelte-ojurqn{margin-left:6px;padding:6px 10px;border-radius:6px;border:1px solid var(--line-strong);background:#fff;font:inherit}.spacer.svelte-ojurqn.svelte-ojurqn{flex:1}.card.tight.svelte-ojurqn.svelte-ojurqn{padding:14px 18px}.summary.svelte-ojurqn.svelte-ojurqn{display:flex;gap:28px;flex-wrap:wrap}.summary.svelte-ojurqn .lbl.svelte-ojurqn{display:block;color:var(--muted);font-size:12px;letter-spacing:1px;text-transform:uppercase}.summary.svelte-ojurqn .v.svelte-ojurqn{display:block;font-family:'Playfair Display', Georgia, serif;font-size:22px;color:var(--accent)}.messages.svelte-ojurqn.svelte-ojurqn{display:flex;flex-direction:column;gap:14px}.msg-head.svelte-ojurqn.svelte-ojurqn{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:8px}.email.svelte-ojurqn.svelte-ojurqn{color:var(--muted);font-size:13px;margin-left:6px}.subj.svelte-ojurqn.svelte-ojurqn{font-weight:600;margin-bottom:6px;color:var(--ink)}.body.svelte-ojurqn.svelte-ojurqn{white-space:pre-wrap;color:var(--ink-soft);font-size:14.5px;line-height:1.55;padding:8px 12px;border-left:3px solid var(--saffron);background:#fffbeb;border-radius:4px}.actions.svelte-ojurqn.svelte-ojurqn{margin-top:10px}.muted.svelte-ojurqn.svelte-ojurqn{color:var(--muted)}.small.svelte-ojurqn.svelte-ojurqn{font-size:12px}",
  map: `{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script>\\n  import { onMount } from 'svelte';\\n\\n  let rows = [];\\n  let years = [];\\n  let year = 'all';\\n  let loading = true;\\n  let errorMessage = '';\\n\\n  async function load() {\\n    loading = true;\\n    try {\\n      const res = await fetch(\`/api/admin/contact?year=\${year}\`);\\n      const data = await res.json();\\n      rows = data.rows || [];\\n      years = data.years || [];\\n    } catch (err) {\\n      errorMessage = err.message;\\n    } finally {\\n      loading = false;\\n    }\\n  }\\n\\n  function formatDate(iso) {\\n    if (!iso) return '';\\n    return new Date(iso).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });\\n  }\\n  function mailto(row) {\\n    const subject = encodeURIComponent(\`Re: \${row.subject || 'Your message to Niyodaya'}\`);\\n    const body = encodeURIComponent(\`Dear \${row.name},\\\\n\\\\n> \${(row.message || '').replace(/\\\\n/g, '\\\\n> ')}\\\\n\\\\n\`);\\n    return \`mailto:\${row.email}?subject=\${subject}&body=\${body}\`;\\n  }\\n\\n  onMount(load);\\n  $: if (year !== undefined) load();\\n<\/script>\\n\\n<svelte:head><title>Contact inbox — Niyodaya Admin</title></svelte:head>\\n\\n<section class=\\"section\\">\\n  <div class=\\"container\\">\\n    <div class=\\"crumbs\\"><a href=\\"/admin\\">← Admin</a></div>\\n    <h1>Contact inbox</h1>\\n    <p class=\\"text-muted\\">Messages submitted via the public Contact form. Click a sender to reply by email.</p>\\n\\n    <div class=\\"toolbar\\">\\n      <label>\\n        Year:\\n        <select bind:value={year}>\\n          <option value=\\"all\\">All years</option>\\n          {#each years as y}<option value={y}>{y}</option>{/each}\\n        </select>\\n      </label>\\n      <div class=\\"spacer\\"></div>\\n      <a class=\\"btn sm\\" href={\`/api/admin/contact?year=\${year}&format=csv\`} download>⬇ Download CSV</a>\\n    </div>\\n\\n    {#if errorMessage}<div class=\\"alert error\\">{errorMessage}</div>{/if}\\n\\n    <div class=\\"card tight\\">\\n      <div class=\\"summary\\">\\n        <div><span class=\\"lbl\\">Messages</span><span class=\\"v\\">{rows.length}</span></div>\\n      </div>\\n    </div>\\n\\n    {#if loading}\\n      <p class=\\"text-muted mt-2\\">Loading…</p>\\n    {:else if rows.length === 0}\\n      <div class=\\"card mt-2 text-center\\"><p class=\\"text-muted\\">No messages received for this filter yet.</p></div>\\n    {:else}\\n      <div class=\\"messages mt-2\\">\\n        {#each rows as row (row.id)}\\n          <div class=\\"card msg\\">\\n            <div class=\\"msg-head\\">\\n              <div>\\n                <strong>{row.name}</strong>\\n                <a class=\\"email\\" href={mailto(row)}>&lt;{row.email}&gt;</a>\\n              </div>\\n              <div class=\\"muted small\\">{formatDate(row.created_at)}</div>\\n            </div>\\n            {#if row.subject}<div class=\\"subj\\">{row.subject}</div>{/if}\\n            <div class=\\"body\\">{row.message}</div>\\n            <div class=\\"actions\\">\\n              <a class=\\"btn sm primary\\" href={mailto(row)}>Reply by email</a>\\n            </div>\\n          </div>\\n        {/each}\\n      </div>\\n    {/if}\\n  </div>\\n</section>\\n\\n<style>\\n  .crumbs { margin-bottom: 8px; font-size: 13px; }\\n  .toolbar { display: flex; gap: 14px; align-items: center; margin: 16px 0 12px; flex-wrap: wrap; }\\n  .toolbar label { font-size: 13.5px; color: var(--ink-soft); }\\n  .toolbar select { margin-left: 6px; padding: 6px 10px; border-radius: 6px; border: 1px solid var(--line-strong); background: #fff; font: inherit; }\\n  .spacer { flex: 1; }\\n\\n  .card.tight { padding: 14px 18px; }\\n  .summary { display: flex; gap: 28px; flex-wrap: wrap; }\\n  .summary .lbl { display: block; color: var(--muted); font-size: 12px; letter-spacing: 1px; text-transform: uppercase; }\\n  .summary .v   { display: block; font-family: 'Playfair Display', Georgia, serif; font-size: 22px; color: var(--accent); }\\n\\n  .messages { display: flex; flex-direction: column; gap: 14px; }\\n  .msg-head { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px; }\\n  .email { color: var(--muted); font-size: 13px; margin-left: 6px; }\\n  .subj { font-weight: 600; margin-bottom: 6px; color: var(--ink); }\\n  .body { white-space: pre-wrap; color: var(--ink-soft); font-size: 14.5px; line-height: 1.55; padding: 8px 12px; border-left: 3px solid var(--saffron); background: #fffbeb; border-radius: 4px; }\\n  .actions { margin-top: 10px; }\\n  .muted { color: var(--muted); }\\n  .small { font-size: 12px; }\\n</style>\\n"],"names":[],"mappings":"AA6FE,mCAAQ,CAAE,aAAa,CAAE,GAAG,CAAE,SAAS,CAAE,IAAM,CAC/C,oCAAS,CAAE,OAAO,CAAE,IAAI,CAAE,GAAG,CAAE,IAAI,CAAE,WAAW,CAAE,MAAM,CAAE,MAAM,CAAE,IAAI,CAAC,CAAC,CAAC,IAAI,CAAE,SAAS,CAAE,IAAM,CAChG,sBAAQ,CAAC,mBAAM,CAAE,SAAS,CAAE,MAAM,CAAE,KAAK,CAAE,IAAI,UAAU,CAAG,CAC5D,sBAAQ,CAAC,oBAAO,CAAE,WAAW,CAAE,GAAG,CAAE,OAAO,CAAE,GAAG,CAAC,IAAI,CAAE,aAAa,CAAE,GAAG,CAAE,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,aAAa,CAAC,CAAE,UAAU,CAAE,IAAI,CAAE,IAAI,CAAE,OAAS,CAClJ,mCAAQ,CAAE,IAAI,CAAE,CAAG,CAEnB,KAAK,kCAAO,CAAE,OAAO,CAAE,IAAI,CAAC,IAAM,CAClC,oCAAS,CAAE,OAAO,CAAE,IAAI,CAAE,GAAG,CAAE,IAAI,CAAE,SAAS,CAAE,IAAM,CACtD,sBAAQ,CAAC,kBAAK,CAAE,OAAO,CAAE,KAAK,CAAE,KAAK,CAAE,IAAI,OAAO,CAAC,CAAE,SAAS,CAAE,IAAI,CAAE,cAAc,CAAE,GAAG,CAAE,cAAc,CAAE,SAAW,CACtH,sBAAQ,CAAC,gBAAK,CAAE,OAAO,CAAE,KAAK,CAAE,WAAW,CAAE,kBAAkB,CAAC,CAAC,OAAO,CAAC,CAAC,KAAK,CAAE,SAAS,CAAE,IAAI,CAAE,KAAK,CAAE,IAAI,QAAQ,CAAG,CAExH,qCAAU,CAAE,OAAO,CAAE,IAAI,CAAE,cAAc,CAAE,MAAM,CAAE,GAAG,CAAE,IAAM,CAC9D,qCAAU,CAAE,OAAO,CAAE,IAAI,CAAE,eAAe,CAAE,aAAa,CAAE,WAAW,CAAE,QAAQ,CAAE,aAAa,CAAE,GAAK,CACtG,kCAAO,CAAE,KAAK,CAAE,IAAI,OAAO,CAAC,CAAE,SAAS,CAAE,IAAI,CAAE,WAAW,CAAE,GAAK,CACjE,iCAAM,CAAE,WAAW,CAAE,GAAG,CAAE,aAAa,CAAE,GAAG,CAAE,KAAK,CAAE,IAAI,KAAK,CAAG,CACjE,iCAAM,CAAE,WAAW,CAAE,QAAQ,CAAE,KAAK,CAAE,IAAI,UAAU,CAAC,CAAE,SAAS,CAAE,MAAM,CAAE,WAAW,CAAE,IAAI,CAAE,OAAO,CAAE,GAAG,CAAC,IAAI,CAAE,WAAW,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,SAAS,CAAC,CAAE,UAAU,CAAE,OAAO,CAAE,aAAa,CAAE,GAAK,CAChM,oCAAS,CAAE,UAAU,CAAE,IAAM,CAC7B,kCAAO,CAAE,KAAK,CAAE,IAAI,OAAO,CAAG,CAC9B,kCAAO,CAAE,SAAS,CAAE,IAAM"}`
};
function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}
function mailto(row) {
  const subject = encodeURIComponent(`Re: ${row.subject || "Your message to Niyodaya"}`);
  const body = encodeURIComponent(`Dear ${row.name},

> ${(row.message || "").replace(/\n/g, "\n> ")}

`);
  return `mailto:${row.email}?subject=${subject}&body=${body}`;
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let rows = [];
  let years = [];
  let year = "all";
  let loading = true;
  let errorMessage = "";
  async function load() {
    loading = true;
    try {
      const res = await fetch(`/api/admin/contact?year=${year}`);
      const data = await res.json();
      rows = data.rows || [];
      years = data.years || [];
    } catch (err) {
      errorMessage = err.message;
    } finally {
      loading = false;
    }
  }
  $$result.css.add(css);
  {
    load();
  }
  return `${$$result.head += `<!-- HEAD_svelte-1lo3574_START -->${$$result.title = `<title>Contact inbox — Niyodaya Admin</title>`, ""}<!-- HEAD_svelte-1lo3574_END -->`, ""} <section class="section"><div class="container"><div class="crumbs svelte-ojurqn" data-svelte-h="svelte-5arcu7"><a href="/admin">← Admin</a></div> <h1 data-svelte-h="svelte-1cj6qty">Contact inbox</h1> <p class="text-muted" data-svelte-h="svelte-tlnmlh">Messages submitted via the public Contact form. Click a sender to reply by email.</p> <div class="toolbar svelte-ojurqn"><label class="svelte-ojurqn">Year:
        <select class="svelte-ojurqn"><option value="all" data-svelte-h="svelte-g0pm6q">All years</option>${each(years, (y) => {
    return `<option${add_attribute("value", y, 0)}>${escape(y)}</option>`;
  })}</select></label> <div class="spacer svelte-ojurqn"></div> <a class="btn sm"${add_attribute("href", `/api/admin/contact?year=${year}&format=csv`, 0)} download>⬇ Download CSV</a></div> ${errorMessage ? `<div class="alert error">${escape(errorMessage)}</div>` : ``} <div class="card tight svelte-ojurqn"><div class="summary svelte-ojurqn"><div><span class="lbl svelte-ojurqn" data-svelte-h="svelte-18c12cb">Messages</span><span class="v svelte-ojurqn">${escape(rows.length)}</span></div></div></div> ${loading ? `<p class="text-muted mt-2" data-svelte-h="svelte-wd2mww">Loading…</p>` : `${rows.length === 0 ? `<div class="card mt-2 text-center" data-svelte-h="svelte-l2on2o"><p class="text-muted">No messages received for this filter yet.</p></div>` : `<div class="messages mt-2 svelte-ojurqn">${each(rows, (row) => {
    return `<div class="card msg"><div class="msg-head svelte-ojurqn"><div><strong>${escape(row.name)}</strong> <a class="email svelte-ojurqn"${add_attribute("href", mailto(row), 0)}>&lt;${escape(row.email)}&gt;</a></div> <div class="muted small svelte-ojurqn">${escape(formatDate(row.created_at))}</div></div> ${row.subject ? `<div class="subj svelte-ojurqn">${escape(row.subject)}</div>` : ``} <div class="body svelte-ojurqn">${escape(row.message)}</div> <div class="actions svelte-ojurqn"><a class="btn sm primary"${add_attribute("href", mailto(row), 0)}>Reply by email</a></div> </div>`;
  })}</div>`}`}</div> </section>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-YbDHuuxn.js.map
