# Every page change moves (prototype D)

Status: ready-for-agent

The owner wants every tap that changes the page to have a transition, and picked prototype D (see `../spec.md`, Q2–Q10). Build it fresh in the real code; the prototype is reference, not code to copy.

## What it does

- **Kinds of page change**, decided from where you are and where the link goes:
  - **Tab to tab** (`/`, `/notes`, `/guides`, `/checklist`, in that order, `components/TabBar.tsx` `tabs`): the page slides sideways the way swiping does today: going to a tab on the right, the old page leaves to the left and the new one comes in from the right; the other way round going left. The tab bar stays still.
  - **Going deeper** (a Guide, writing a Note, Senior Stories, contribute, a Place's Notes `/notes?place=…`): the old page fades, the new one rises in (about 16px) and fades in.
  - **Going back up** (any `.back-link`, "← กลับ…", or a link to a shallower page): the old page sinks (about 16px) and fades, the one under it fades in.
  - **A Feed category** (`/notes` ↔ `/notes?line=…`): the chips and head stay put; only the list of Notes fades and rises in again.
  - **Browser back/forward, iOS's edge swipe:** nothing moves (the browser animates its own back).
- **A name that flies** (Q8, Q9): where the same name is on both sides of the tap, it flies from where it was tapped into the new page's heading, and on "← กลับ" it flies back when its old spot is on screen (otherwise the page just sinks):
  - a Guide's title from the Guides list (app/guides/page.tsx) or from a Place card's Guides (components/map/PlaceDetail.tsx) into the Guide's `h1`;
  - a Place's name from its card's "ดูโน้ต…" link into "โน้ตที่{name}" on `/notes?place=…` (only the name part flies);
  - a Starter Checklist stop (components/WeekRoute.tsx) only when its title is exactly the Guide's title; otherwise it just rises in.
- **After posting a Note** (Q10): app/notes/actions.ts redirects to the Feed (or the map with `?place=…&posted=1`). That counts as going back: the form sinks away, the Feed fades in, and the new Note (already marked `fresh`, with "โน้ตขึ้นแล้ว") rises in at the top.
- **Slow network** (Q6): the old page stays on screen, live, and the tapped link pulses until the next page is ready; then it moves. No blank screen or skeleton. The tab bar's `Pending` (useLinkStatus) must keep working.
- **Strength** (Q5): soft and small, as ADR 0007 says: fades and short moves, nothing over ~250ms, no springs. With `prefers-reduced-motion: reduce` nothing moves at all.
- Swiping between tabs (components/SwipeTabs.tsx) uses the same tab-to-tab slide, through the same mechanism (drop its own `document.startViewTransition` and the `html[data-swipe]` CSS).

## What the prototype found (branch `prototype/page-motion`, commit c7ee3c1, local to this repo: `git show c7ee3c1`)

- Next 16.3 and React 19.3 here ship `<ViewTransition>`, `addTransitionType`, `<Link transitionTypes>` and `router.push(href, { transitionTypes })` with no config flag. React passes the types to `document.startViewTransition({ types })`, and keeps the old page live while the next one loads, which is what Q6 wants.
- React cancels the root's view transition, so the page itself must sit in a `<ViewTransition>` boundary (the prototype wrapped `{children}` inside `<main>` in a `div.page-frame` with `update={{ "tab-left": …, default: "none" }}`). An untyped navigation (browser back, the map's own `router.replace`) then doesn't move.
- The frame needs a box (not `display: contents`), and on the map it must pass the height on (`body:has(.explorer) .page-frame { height: 100% }`) or the map collapses.
- The page scrolls to the top on arrival, so turn off the frame's group animation (`::view-transition-group(.tab-left …) { animation: none }`) or it jumps vertically; only the old and new pictures should move.
- The prototype typed every tap with a global capture-phase click listener calling `router.push`. That bypasses next/link, so `useLinkStatus` (the tab bar's pulse) stops working. Prefer a small client link (e.g. `NavLink`) that works out the type from `usePathname`/`useSearchParams` and passes `transitionTypes` to next/link, used wherever a page links to another page. Your call, but keep the tab bar's pending pulse and make every tapped link pulse while waiting.
- Shared names: `<ViewTransition name="guide-title-{id}" share="…">` on both sides. Names must be unique on a page.
- The Feed list: its own `<ViewTransition>` with `update={{ "nav-filter": …, default: "none" }}` around `.feed`.

## Also

- Amend docs/adr/0007 (don't write a new ADR): every page change moves, in the four ways above, a name flies where it's the same on both sides, browser back never moves, all off for reduced motion. Update its Status line the way earlier amendments did ("amended … on 2026-10-03: page motion (`.scratch/page-motion/`)").
- Keep app/globals.css's habits: motion lives under `prefers-reduced-motion: no-preference`, one short "why" comment per rule where it isn't obvious, tokens rather than raw values where one fits.
- Leave in-page motion (map chips, the welcome tip, MarkDone, forms, the Guides page's chips) to ticket 03.

## Done when

- `npm run typecheck` and `npm run build` pass.
- Checked in Chromium with Playwright (`/opt/node22/lib/node_modules/playwright/index.mjs`, browsers at /opt/pw-browsers; run `next start` on the build): slow the animations with CDP (`Animation.enable`, then `Animation.setPlaybackRate` 0.05) and screenshot mid-transition for: tab right, tab left, a swipe, Guides list → Guide (the title flies), "← คู่มือทั้งหมด" (sinks, the title flies back), Place card → its Notes, a Feed category, posting a Note (sinks, then the new Note rises). Confirm the browser's back calls no transition (patch `Document.prototype.startViewTransition` to log types). Confirm with `reducedMotion: "reduce"` that nothing moves. Check the map page keeps its full height.
- Commit with a clear message. Don't push.
