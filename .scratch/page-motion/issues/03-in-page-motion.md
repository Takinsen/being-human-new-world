# Things that change on a page move too

Status: ready-for-agent

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
