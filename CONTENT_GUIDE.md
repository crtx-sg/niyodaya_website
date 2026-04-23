# Content editing guide

This file tells you **exactly which file to open** when you want to change text, numbers, or links anywhere on the Niyodaya website. Every piece of editable content has been lifted out of the page code and placed in a small, well-commented file — you will never need to touch the "app code" to update copy.

All editable content lives in **`src/lib/data/`**. That's eight files total:

```
src/lib/data/
├── site.js        ← address, email, bank, footer, navigation menu
├── gallery.js     ← the curated gallery photo list
├── home.js        ← Home page (hero, stats, programme teasers)
├── about.js       ← About page (Our Story, Mission/Vision/Values, Team)
├── vridhi.js      ← Project Vridhi (impact numbers, list copy)
├── vinaya.js      ← Project Vinaya (impact numbers, list copy)
├── vidya.js       ← Project Vidya (adopted schools, spotlight)
├── resources.js   ← Resources page (external links + documents)
└── donate.js      ← Donate page (where-money-goes table, headings)
```

You can open any of these in Notepad, TextEdit, VS Code, Sublime, or any text editor — they are plain text files.

---

## 1. "Where do I change X?" cheat sheet

| I want to change…                                                   | Open this file                   | Find this field              |
|---------------------------------------------------------------------|----------------------------------|------------------------------|
| Registered office address                                           | `site.js`                        | `address`                    |
| Contact email                                                       | `site.js`                        | `email`                      |
| Bank account number / IFSC                                          | `site.js`                        | `bank`                       |
| Top menu items (Home / About / …)                                   | `site.js`                        | `nav`                        |
| Social media handles                                                | `site.js`                        | `social`                     |
| Home-page hero headline or tagline                                  | `home.js`                        | `hero.heading`, `hero.lede`  |
| Home-page statistics (1 in 2, 28-30%, etc.)                         | `home.js`                        | `impact.stats`               |
| Home-page programme teaser copy                                     | `home.js`                        | `programmeCards`             |
| **Our Story** paragraph                                             | `about.js`                       | `story.paragraphs`           |
| Mission / Vision / Values                                           | `about.js`                       | `pillars`                    |
| Objectives list                                                     | `about.js`                       | `objectives.columns`         |
| Team names / roles                                                  | `about.js`                       | `team.members`               |
| **Vridhi impact numbers** (15, 11, 50%, ₹5,00,000, "as of 2025")    | `vridhi.js`                      | `impact.stats` + `impact.note` |
| Vridhi "Who this is for" / "How we support" lists                  | `vridhi.js`                      | `whoFor.items`, `howSupport.items` |
| **Vinaya impact numbers** (5, ₹75,000, categories)                 | `vinaya.js`                      | `impact.stats` + `impact.note` |
| List of adopted schools (Vidya)                                     | `vidya.js`                       | `currentlyAdopted.schools`   |
| Resource card links (DIKSHA, DIYA, Darpan, etc.)                    | `resources.js`                   | `externalResources.items`    |
| Niyodaya document cards (MoA, Annual Reports, 80G, Darpan)          | `resources.js`                   | `documents.items`            |
| "Where your money goes" donation tiers                              | `donate.js`                      | `whereMoneyGoes.rows`        |
| Gallery: add / remove / caption photos                              | `gallery.js`                     | `galleryImages` array        |

If a field you need is not in the table above, open the file whose name best matches the page — every text string on that page is inside it.

---

## 2. How to edit — three rules

### Rule 1. Change the text between the quotes; don't change the field names.

**Change this:**
```js
heading: 'Every child deserves an education rooted in values.'
```

**To this:**
```js
heading: 'Every child deserves a brighter tomorrow.'
```

**Don't** rename `heading` to anything else — the page code looks for that exact name.

### Rule 2. Long paragraphs use backticks `` ` `` instead of quotes.

Backticks let the text span multiple lines. You'll see them already used for every paragraph:

```js
lede: `Niyodaya Foundation — a Section 8 non-profit based in Karnataka —
       supports underprivileged, displaced, and specially-abled children.`
```

You can break the text across as many lines as you want. Just keep both backticks.

### Rule 3. Commas matter.

Every item in a list ends with a **comma** except (optionally) the last one. If you add a new item, remember to put a comma after the item before it. If you see an "unexpected token" error when the site reloads, a missing comma is the usual culprit.

```js
items: [
  'First item',
  'Second item',
  'Third item'          // last one: comma optional
]
```

---

## 3. Inline formatting (bold, italics, links)

Any paragraph labelled **"may contain HTML"** in the file comments accepts these safe tags:

| What you want       | Syntax                                                           |
|---------------------|------------------------------------------------------------------|
| **Bold**            | `<strong>text here</strong>`                                     |
| *Italics*           | `<em>text here</em>`                                             |
| A link              | `<a href="https://example.com">example</a>`                      |
| A link to a new tab | `<a href="https://example.com" target="_blank" rel="noopener">example</a>` |
| An internal link    | `<a href="/gallery">Gallery</a>`                                 |
| A line break        | `<br>`                                                           |

Keep tags balanced — every `<strong>` needs a matching `</strong>`.

Fields that explicitly allow HTML:
- `about.js` → `story.paragraphs`
- `vridhi.js` → `impact.note`, stat `label` fields
- `vinaya.js` → `impact.note`
- `vidya.js` → `currentlyAdopted.schools`

Fields **without** HTML support treat `<` and `>` as literal text. If unsure, preview locally first (see §5).

---

## 4. Worked examples

### Update Vridhi impact for 2026
Open `src/lib/data/vridhi.js`. Find:

```js
impact: {
  heading: 'Our impact so far',
  note: `Niyodaya operates on modest funds. Every rupee is stewarded carefully —
         here is what we have been able to do under Project Vridhi
         <strong>as of 2025</strong>.`,
  stats: [
    { num: '15',        label: 'children supported<br>(including dropouts)' },
    { num: '11',        label: 'partner schools across Bengaluru' },
    { num: '50%',       label: 'of children supported are girls' },
    { num: '₹5,00,000', label: 'disbursed toward their education' }
  ]
},
```

Change `2025` → `2026`, update the four numbers. Save. Done.

### Add a new school under Vidya
Open `src/lib/data/vidya.js`. Find `currentlyAdopted.schools`. Copy an existing line, paste below it, edit the text:

```js
schools: [
  `<strong>Gandhiji Memorial …</strong>, Bengaluru — our flagship …`,
  `Government Primary School, New Thippasandra, Bengaluru — …`,
  `<strong>New School Name</strong>, City — description of support.`   // ← added
]
```

### Add a resource link
Open `src/lib/data/resources.js`. Inside `externalResources.items`, copy one card object and edit:

```js
{
  heading: 'NCERT Online',
  body: 'Free textbooks and teaching aids from NCERT.',
  links: [{ label: 'Visit ncert.nic.in', href: 'https://ncert.nic.in/', external: true }]
}
```

### Add a gallery photo
1. Place the new `.jpg` file in `static/gallery/` (e.g. `static/gallery/2026_diwali.jpg`).
2. Open `src/lib/data/gallery.js` and add a row:
   ```js
   { file: '2026_diwali.jpg', date: '2026-11-12', event: 'Diwali', programme: 'vidya', caption: 'Diwali celebration at GMV Vidya Mandir' },
   ```

---

## 5. Previewing your changes

Save the file. If the dev server is already running (`npm run dev` / `start.sh` / `start.bat`), your browser will reload automatically within 1–2 seconds and show the change.

If something breaks:
- Look at the terminal window — Svelte prints the line number and problem.
- Undo your last edit and save again to return to a working state.

---

## 6. Files you should NOT edit unless you know what you're doing

These control how the site **behaves**, not what it says:

- `src/routes/**/*.svelte` — page layouts & logic
- `src/lib/components/*.svelte` — header, footer
- `src/lib/server/*.js` — database, payment, email hooks
- `src/app.css` — visual design
- `package.json`, `svelte.config.js`, `vite.config.js` — build configuration

All editable **copy** has been lifted out into `src/lib/data/*.js` — you shouldn't need to open anything outside that folder for routine content updates.
