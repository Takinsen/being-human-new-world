# The map is the home page; a bottom tab bar replaces the category pages

Status: accepted (2026-09-25), amended 2026-09-26, 2026-09-27 and 2026-10-02 after the UX audits in `.scratch/map-first/` (`ux-audit.md` to `ux-audit-4.md`). Supersedes 0004. Its look (the transit-line language, and cards only on Guide pages) is replaced by 0007.

Friends who tried the site said it has too much text, is laid out messily, and they didn't know where to start reading. The long home page (hero, line diagram, Starter Checklist, three category bands, quotes) and the long Place cards were both to blame.

- `/` is the full-screen map. A thin bar floats over it with the wordmark, the tagline and filter chips: the three categories plus "มีโน้ต". No category chip selected shows every Place; selecting categories narrows to those categories (any of them); "มีโน้ต" then narrows further to Places with a Note.
- Pins show their category's icon, not a code. Pins that would overlap are nudged apart on screen.
- A bottom tab bar replaces the top navigation: แผนที่ | โน้ต | วิธี | สัปดาห์แรก. On wide screens it stays full width at the bottom with its tabs grouped in the centre, and text is larger. Off the map it slides away while you scroll down and comes back when you scroll up, reach the bottom, or Tab into it; on the three other tabs' own pages a sideways swipe moves to the next or previous tab (amended 2026-10-02).
- The three category pages merge into one Guides page (วิธี), grouped by category. Places leave it: they live on the map. The Guides page lists each Guide by title and a one-line summary; each Guide's steps are on its own page, `/guides/<id>`. A Guide's page opens with its summary and, where known, the facts at a glance (cost, hours, a number to call) on a band tinted with the category's colour. Below come what to bring, then the steps as numbered stations on the category's line. Each step is a card: a short action as its heading, how to do it, and, where they help, the words to say and a tip. The line ends at a done station that carries the Starter Checklist tick. A Guide that offers choices (which station, which kind of drinking water, where to go when sick) shows them as cards to choose from instead of stations. Cards with shadows on a grey ground are the Guide page's own look; lists elsewhere (the Guides list, the Feed, the checklist) stay flat so they read fast. Every "go next" link card, and every station marker, has one style across the site. On wide screens a Guide's photo is capped at about 240px high, so the first step shows on the first screen.
- Senior Stories are reached from the Feed (a link after the Notes) and from a Senior's name on a Note, not from the tab bar. The Feed opens with an invitation to write: a composer above the first Note, a single link to the Note form that names what you might write about (all Notes, the chosen category, or the Place); its head holds no button (amended 2026-10-02).
- A selected Place shows only its photo, name and price, its two actions (directions, write a Note), a one-line summary, one caution and its latest Note; a station also says how to get into Chula from it. With no photo (or one that fails to load) there is no stand-in box: the Place's icon sits beside its name, as a Guide's does beside its title. On phones the sheet's top bar becomes the way back while a card is open. The rest of its know-how sits behind "อ่านเพิ่ม". A Senior's recommendation on a Place becomes a Note.
- After posting a Note pinned to a Place, the writer lands on the map with that Place open; a Note with no Place lands on the Feed with the new Note first.
- On first visit the bottom sheet points to the Starter Checklist. Dismissing it is remembered in the browser.

What stays from 0004: the map is an index into Local Know-how, not a directory. Leaflet and OpenStreetMap stay, and the map's state stays in the URL.

## Considered options

- Keep the home page and shorten it: rejected. The map is what a Newcomer opens the site for, and a scrolling page still leaves them to find where to start.
- Keep a top navigation cut to four links: rejected. On a phone a bottom bar is within thumb reach.
- Keep the category pages beside the map: rejected. Every Place would appear in two places, as two different cards.

## Consequences

- Links to `/transport`, `/food`, `/living` and `/map` must redirect: to the Guides page for categories, and to `/` for the map. Links to one Guide (`/guides#<id>`, used by the Starter Checklist) become `/guides/<id>`.
- The pitch's "Being Human" line is now only the tagline on the map bar and the Senior Stories, so the demo script has to walk to the Feed.
