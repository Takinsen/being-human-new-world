# The map is the home page; a bottom tab bar replaces the category pages

Status: accepted (2026-09-25). Supersedes 0004.

Friends who tried the site said it has too much text, is laid out messily, and they didn't know where to start reading. The long home page (hero, line diagram, Starter Checklist, three category bands, quotes) and the long Place cards were both to blame.

- `/` is the full-screen map. A thin bar floats over it with the wordmark, the tagline and filter chips: the three categories plus "มีโน้ต". Selected chips combine (a Place must match all of them).
- A bottom tab bar replaces the top navigation: แผนที่ | โน้ต | วิธี | สัปดาห์แรก.
- The three category pages merge into one Guides page (วิธี), grouped by category. Places leave it: they live on the map.
- Senior Stories are reached from the top of the Feed and from a Senior's name on a Note, not from the tab bar.
- A selected Place shows only its name and price, a one-line summary, one caution and its latest Note. The rest of its know-how sits behind "อ่านเพิ่ม". A Senior's recommendation on a Place becomes a Note.
- On first visit the bottom sheet points to the Starter Checklist. Dismissing it is remembered in the browser.

What stays from 0004: the map is an index into Local Know-how, not a directory. Leaflet and OpenStreetMap stay, and the map's state stays in the URL.

## Considered options

- Keep the home page and shorten it: rejected. The map is what a Newcomer opens the site for, and a scrolling page still leaves them to find where to start.
- Keep a top navigation cut to four links: rejected. On a phone a bottom bar is within thumb reach.
- Keep the category pages beside the map: rejected. Every Place would appear in two places, as two different cards.

## Consequences

- Links to `/transport`, `/food`, `/living` and `/map` must redirect: to the Guides page for categories, and to `/` for the map.
- The pitch's "Being Human" line is now only the tagline on the map bar and the Senior Stories, so the demo script has to walk to the Feed.
