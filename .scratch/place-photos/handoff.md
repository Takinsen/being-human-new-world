# Handoff: Place card photos and layout (2026-10-04)

Branch `claude/keen-planck-ofo3uc`, pushed. **Not merged and no PR: the owner wants to review
first.** Don't open or merge a PR until they say so.

## Done

- **Photo strip, variant C** (owner's pick): a row of small squares at the top of every Place card,
  running to the screen's edge so the next photo peeks; one credit line under it links the first
  photo in view. One photo only: shown the card's width. `components/PhotoStrip.tsx`, CSS under
  "Place photo strip" in `app/globals.css`.
- **Data:** `Place.photo` became `Place.photos: Photo[]` (`content/types.ts`); the first one also
  stands for the Place on Home Taste cards. 132 Commons files in `content/places.ts`, 5 per Everyday
  Food Place, 2–3 elsewhere, all checked to exist (JPEG, ≥1000px, free licence, no file on two
  Places). Most are illustrations and their alt says so.
- **Layout pass:** one 24px rhythm; Home Taste as a tag under the name; price figure on a yellow
  marker; section headings in ink; an empty Notes section invites the first Note.
- Decisions in `spec.md` (Q1–Q10); `docs/adr/0006` has an amendment for it.
- The three-variant prototype (A full width + dots, B 82% peek + 1/5 counter, C squares, switched
  with `?variant=`) is commit 71777a8 on this branch, if anyone wants to look again.

## Open

- **Review by the owner**, then a PR to main when they ask.
- **Slides:** many photos are CC BY / CC BY-SA, so a slide showing one needs its author and licence.
- **Photo picks to eyeball:** some dishes weren't on Commons and stand in with something close
  (gristle khao soi → beef khao soi; ใบเหลียงผัดไข่ → the Gnetum plant; มาม่าโอ้โห → phat mama;
  ตำเส้นเล็ก → ตำลาว; เม็ดขนุน → golden desserts). `chuan-chom-first-aid`'s first photo is "a Chula
  dorm", not confirmed to be Chuan Chom. A few photos are portrait and get cropped square.
- **The map in screenshots is grey:** the app loads tiles from `{a,b,c}.tile.openstreetmap.org`;
  the environment allows only `tile.openstreetmap.org`. Add the three to Allowed domains, or
  re-render `design/reveal.png` locally (`node design/reveal.mjs`), whose map card now has photos.

## Running it in the cloud sandbox

- `npx next build && npx next start -p 3100`, then reach it at `http://192.0.2.2:3100`
  (Playwright forces loopback through the proxy). Chromium needs
  `proxy: { server: HTTPS_PROXY, bypass: "192.0.2.2" }` and `executablePath: /opt/pw-browsers/chromium`.
- Commons' API rate-limits (429): send a User-Agent and wait ~3s between calls.
- Stop the server with `ps -eo pid,args | awk ...` + kill, never `pkill -f` (kills the shell).
