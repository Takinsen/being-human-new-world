# Things that change on a page move too

Status: done

The owner wants every button that changes something to show it (see `../spec.md`, Q4 and Q5). Today some do (a ticked station pops, the Place card rises, the map's sheet changes height, buttons give a little when pressed; app/globals.css "Motion: soft and small"). Add the rest.

## Change

1. **Map category chips and "มีโน้ต"** (components/map/MapExplorer.tsx, ExplorerMap.tsx): pins that appear fade in and pins that go fade out; the list in the sheet rises in again (the same rise-up as the Feed's list, staggered a little).
2. **Back from a Place card to the list** (the sheet's back button, `back` in MapExplorer): the list fades back in. The Place card's own rise-in stays.
3. **The welcome tip** (`.welcome`, `welcome.dismiss`): fades and folds away (height to zero) when dismissed, rather than vanishing.
4. **"ทำแล้ว" on a Guide** (components/MarkDone.tsx): pops like a ticked station in the Starter Checklist (`@keyframes pop`).
5. **Sending a form** (app/notes/new/NoteForm.tsx, app/contribute/ContributeForms.tsx, components/FormStatus.tsx, PostedStatus.tsx): while sending, the button pulses the way a loading tab does (`.tab-pending`'s `tab-pending` keyframes); the result message (sent or not) rises in. A posted Note's arrival in the Feed belongs to ticket 02; don't touch the redirect.
6. **A category chip on the Guides page** (app/guides/page.tsx, chips are `#transport` style anchors to `section.guides-line`): the category heading it lands on glows once, faintly, after the smooth scroll (e.g. `:target` on the section, animating the heading's background from a soft tint to none over about 1s; the glow is the one thing allowed past 250ms). Coming in from `/transport`-style redirects (next.config.ts) lands on the same anchors; that should glow too.

## Rules

- ADR 0007: soft and small, fades and short rises, nothing over ~250ms (bar the glow), no springs, all of it inside `@media (prefers-reduced-motion: no-preference)` so nothing moves for reduced motion. Leaflet's own zoom animation is not yours to change.
- Put the CSS in app/globals.css's motion section (or next to the component's own rules where that's the file's habit), one short "why" comment where it isn't obvious, tokens rather than raw values where one fits.
- Page-to-page transitions are ticket 02 (it may wrap the page in a `<ViewTransition>` and edit SwipeTabs and the motion section's end); stay out of navigation.

## Done when

- `npm run typecheck` and `npm run build` pass.
- Checked in Chromium with Playwright (`/opt/node22/lib/node_modules/playwright/index.mjs`, browsers at /opt/pw-browsers; `next start` on the build): slow animations with CDP (`Animation.enable`, `Animation.setPlaybackRate` 0.05) and screenshot each of the six mid-motion. Check with `reducedMotion: "reduce"` that nothing moves. Map tiles don't load in this sandbox; the pins and the sheet do.
- Commit with a clear message. Don't push.

## Comments

Done. All the CSS is in one block in app/globals.css's motion section ("Things a tap changes on a page"), inside `prefers-reduced-motion: no-preference`; new keyframes are `fade-out` and `land-glow`, the rest reuse `rise-in`, `rise-up`, `pop` and `tab-pending`. Everything is 250ms or less except the glow (1s, after a 0.35s delay). Checked in Chromium against a production build (`next start`), animations slowed to 0.05 through CDP, screenshots in /tmp/claude-0/t03/ (not in the repo).

1. **Map chips and "มีโน้ต"** (ExplorerMap.tsx, MapExplorer.tsx). A pin that appears gets `is-entering` (set on the element, not in the icon, so selecting a pin doesn't make it fade in again) and fades in. A pin that goes is kept for 200ms as a non-interactive ghost with `is-leaving` and fades out, where it was last drawn. The list is keyed on the filter, so its headings and rows rise in again with a 40ms stagger (0.25s, not the Feed's 0.4s, to stay inside the ADR). Seen: 6 pins at about 63% opacity mid-fade, rows at 62/42/19/0% mid-rise (1b, 1d). "มีโน้ต" has no Notes without the Sheet, so it only shows all pins fading out.
2. **Back from a Place card**: `data-enter="fade"` on the remounted list, worked out from what changed (the selected Place went away) rather than set in `back`, so Esc and the browser's back fade it too. The Place card's rise-in is untouched. Seen at 61% opacity mid-fade (2b).
3. **Welcome tip**: wrapped in a one-row grid (`.welcome-fold`) that goes from `1fr` to `0fr` while fading, 0.22s, then unmounts after 240ms; `inert` while closing. With reduced motion it unmounts at once. Seen at 11px of 56px and 20% opacity mid-fold (3b).
4. **"ทำแล้ว"**: the tick icon runs `pop` (0.25s, not the station's 0.35s) only when ticked on this page (`just-done`), not when the page opens on a Guide already done. Seen scaled to 1.14 (4a).
5. **Sending a form**: all four submit buttons (Note, price, senior story, Guide check) get `aria-busy` while pending and run `tab-pending`; `.form-status` rises in (`FormStatus` now gives a second answer a new `<p>` so it rises again). PostedStatus gets the same rise through `.form-status`; the redirect is untouched. Seen: button pulsing (opacity 0.83 then 0.25) with the server action held back 5s through a Playwright route, and the result at 44% opacity, 4px down, mid-rise (5b). Without SHEET_API_URL the action returns "ส่งไม่ขึ้น", so the not-sent result was seen for real; the sent result uses the same element and was not stubbed.
6. **Guides chip**: `.guides-line:target .line-head .inner` runs `land-glow` (18% category colour to none) with a 0.35s delay so it starts after the smooth scroll. Seen on a chip tap (6b) and on the `/food` redirect (6d).

With `reducedMotion: "reduce"`, `document.getAnimations()` stayed empty after every one of the six, and the pins, list, welcome tip and glow show no animation (the welcome tip leaves at once).

Not covered: a real phone; Leaflet's own zoom was left alone; tapping a Guides chip whose hash is already in the URL doesn't glow again (`:target` doesn't re-match), nor does the heading glow again on a second tap of the same chip after scrolling away.
