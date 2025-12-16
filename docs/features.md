# QuranicAudio.com — Pages & Features

Status legend:

- ✅ complete
- 🟨 partial
- ⬜ not started

## Verification

- 🟨 Clicked on prod: home tabs, `/quran/:id` playback + options, `/sura/:id` page render
- 🟨 Clicked on dev: `/sura/1` row plays + bottom player; qari name navigates to `/quran/:id`
- ⬜ Not yet systematically verified: all qaris, all edge routes, download/stream routes, mobile behaviors

## Site-wide

- ✅ Header nav: `About`, `Contact Us`
- ✅ Header icons: `Home` (hidden on `/` + `/section/*`), `Quran.com`
- ✅ Branding: Montserrat, background image, teal brand color
- ✅ SEO/meta tags + favicon
- 🟨 Responsive layout (home matches closely; some pages still need visual parity checks)
- 🟨 Persistent audio player
  - ✅ Desktop: play/pause, next/prev, seek
  - ✅ Repeat + random (basic)
  - ⬜ Mobile UI parity (expand/collapse player)
  - ⬜ Keyboard shortcuts

## Pages

### `/` (Home: Recitations)

- ✅ Section tabs (Recitations, Haramain Taraweeh, Non-Hafs, Translations)
- ✅ Qari list grouped by first letter
- ✅ “Go to the top”

Repo:

- `src/routes/+page.js`
- `src/routes/+page.svelte` (renders `src/routes/_home.svelte`)
- `src/routes/_home.svelte`

### `/section/:section` (Home filtered by section)

- ✅ Section tabs (active state)
- ✅ Qari list filtered to the selected section
- ✅ Special case for section 2: split into Makkah / Madinah
- ✅ Redirect `/section/1` → `/`

Repo:

- `src/routes/section/[section]/+page.js`
- `src/routes/section/[section]/+page.svelte` (renders `src/routes/_home.svelte`)

### `/qaris`

- ✅ Alias of home (reciters list)

Repo:

- `src/routes/qaris/+page.js`
- `src/routes/qaris/+page.svelte`

### `/reciters`

- ✅ Redirect `/reciters` → `/qaris`

Repo:

- `src/routes/reciters/+page.js`

### `/about`

- ✅ About text page

Repo:

- `src/routes/about/+page.svelte`

### `/quran/:id` (Qari page)

- ✅ Qari header + “Shuffle Play” (toggles random + starts playback)
- ✅ Qari description (HTML) and “Other Recitations” toggle (when available)
- 🟨 Surah list
  - ✅ Clicking a surah row plays it in the in-page audio player
  - ✅ Active row state + progress bar
  - ✅ Desktop per-row actions (Other Qaris, Read, Download)
  - ⬜ Exact UI parity (spacing/hover) + mobile behavior

Repo:

- `src/routes/quran/[id]/+page.js`
- `src/routes/quran/[id]/+page.svelte`

### `/download/:id`

- ✅ “Surat X by Y” + Download button (MP3)
- ✅ Not Found state

Repo:

- `src/routes/download/[id]/+page.js`
- `src/routes/download/[id]/+page.svelte` (renders `src/routes/_download.svelte`)
- `src/routes/_download.svelte`

### `/stream.m3u/:id`

- ✅ Same behavior/UI as `/download/:id` (matches old app routing)

Repo:

- `src/routes/stream.m3u/[id]/+page.js`
- `src/routes/stream.m3u/[id]/+page.svelte`

### `/sura`

- ✅ Redirects to `/`

Repo:

- `src/routes/sura/+page.js`

### `/sura/:id` (Surah page)

- ✅ Surah header + “Read” (quran.com)
- 🟨 List of qaris
  - ✅ Clicking a qari row starts playback in the persistent audio player (row click, not the qari link)
  - ✅ Qari name navigates to `/quran/:id` (does not trigger playback)
  - ✅ Active qari highlight while playing
  - ✅ Download button for this surah

Repo:

- `src/routes/sura/[id]/+page.js`
- `src/routes/sura/[id]/+page.svelte`

### `*` (404)

- ✅ “Doh! 404!” page

Repo:

- `src/routes/[...path]/+page.js`
- `src/routes/+error.svelte`
