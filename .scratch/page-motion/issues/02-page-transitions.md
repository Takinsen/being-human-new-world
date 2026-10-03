# Every page change moves (prototype D)

Status: done

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

## Comments

Done (2026-10-03). Built fresh from prototype D; no switcher, no `?motion=`.

**How it works.** `components/PageMotion.tsx` works out the kind of change (`navType`: tab-left/right in `components/tabs.ts` order, nav-forward, nav-back, nav-filter; a `.back-link` is always back) and holds it in a small store from the tap until the new page is in. `PageFrame` (around `{children}` in `<main>`) and `FeedMotion` (around `.feed`) are `<ViewTransition>`s whose `update` class comes from that store; `FlyingName` wraps a name on both sides (`guide-title-<id>`, `place-name-<id>`) with `share="fly"` for forward/back. `components/NavLink.tsx` is next/link plus two things: on click it starts the motion, and a `useLinkStatus` child marks the link `data-going` so it pulses (dimmed, still, with reduced motion) while the old page stays live. Every page-to-page link now uses it; the tab bar keeps its own `Pending` bar. SwipeTabs starts a tab-left/right motion and `router.push`es (its own `startViewTransition` and the `html[data-swipe]` CSS are gone). Nothing is started for reduced motion, so no transition is even captured. CSS is in the motion section of app/globals.css; ADR 0007 is amended.

**Where it differs from the prototype, and why.**
- Not React transition types. `addTransitionType` / `<Link transitionTypes>` queue the types on the root and the next transition to commit takes them; Next commits small transitions of its own right after a tap, and in a loop of Feed-category taps about half the navigations came through untyped and didn't move. Holding the motion in a store (`useSyncExternalStore`) and putting it in the `update`/`share` props is reliable; it ends when the pathname changes, when the tapped link stops pending, or on `popstate` (so the browser's back never moves, even mid-tap).
- The old picture stays where it was on screen. With the frame's group animation off (as in the prototype), a page that was scrolled, or a page that arrives scrolled to a `#section` ("← คู่มือทั้งหมด" lands on `/guides#transport`), made the old picture jump. `keepOldPicture` (the frame's `onUpdate`) reads the old and new positions from the browser's own group keyframes, cancels that animation and sets `--page-shift`, which the old picture is translated by.
- The tab bar and footer have their own `view-transition-name`s and the root doesn't animate: otherwise the moving page was drawn over the tab bar and the root cross-faded.
- A name whose other spot is off screen isn't paired by React; it then sinks or rises with its page (`:only-child`) instead of fading on its own.
- Q10: the form keeps `useActionState(saveNote, null)`, so it still posts without JavaScript (a native POST, Next's 303 to the Feed). With JavaScript, the form's `onSubmit` arms a "posted" motion that moves only pages leaving and arriving, not the frame: the Note form's page sits in `PageLeave` (sinks on exit) and the Feed and the map in `PageArrive` (fade in on enter). A Note that didn't go up only updates the form in place, so nothing moves; the motion is dropped as soon as sending ends (`pending` false) or the form unmounts, so an error (the network failing shows Next's "This page couldn't load") can't leave it armed for a later navigation. PostedStatus no longer calls `scrollIntoView`: Next already scrolls to `#fresh`, and a second (smooth) scroll dragged the arriving page; it still takes focus (UX audit 4, A2 was about focus). The fresh Note and "โน้ตขึ้นแล้ว" keep ticket 03's rise, playing as the Feed fades in.
- Tabs moved to `components/tabs.ts` so NavLink/PageMotion can read the order without a TabBar import cycle.

**Checked** (`npm run typecheck`, `npm run build`; `next start` on the build, Chromium via Playwright at 390×844 with touch, animations at 0.05 through CDP, screenshots in /tmp/claude-0/t02/, not in the repo): tab right (1), tab left (2), a swipe (3), Guides list → Guide with the title flying, from a scrolled list (4), "← คู่มือทั้งหมด" sinking with the title flying back (5), and with its spot off screen at 390×560 not flying (5b), Place card → its Notes with the name flying, and back (6, 6b), a Feed category (7), posting a Note to the Feed (8a sink, 8b the Note rising, 8c end) and to a Place (8d, 8e), a failed post (Sheet down, "ส่งไม่ขึ้น") not moving (8f) with the next tab taps moving their own way (8g sinks to /guides, a shallower page; 8h slides on to /checklist), a post with the network off making no transition and the browser's back after it none either (8i), a post with JavaScript disabled landing on the Feed with the new Note fresh (14), wide screen 1280×800 (12), slow network: the old page stays, the tapped link pulses, the tab bar's pending bar shows (13, 13b). Selecting a Place on the map makes no transition; `startViewTransition` patched to log: two taps made two, then back, back, forward made none. With `reducedMotion: "reduce"` five taps made no transition and `document.getAnimations()` stayed empty. The map keeps its full height (main, frame, explorer and map all 784px above the tab bar at 844). For Place Notes and posting, a throwaway local stand-in for the Sheet (SHEET_API_URL pointed at it for that build only; no code changed for it).

**Not verified:** real phones and iOS's own edge swipe (headless Chromium only); Safari/Firefox (both without these view transition features fall back to no motion, not checked); map tiles (blocked here).
