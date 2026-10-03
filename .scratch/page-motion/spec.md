# Page motion and the word คู่มือ

## What the owner said

- Every tap that changes the page, or a button that changes something on it, should have an animation or transition.
- Guides are called "คู่มือ", not "วิธี".

## What's there today (2026-10-03)

- Swiping between tabs slides the page (components/SwipeTabs.tsx). Tapping a tab or a link has no transition: `main` stays mounted, so its rise-in plays only on the first load.
- Lists rise in one by one, buttons give a little when pressed, a ticked station pops, the Place card rises, the map's sheet changes height, the tab bar slides away while reading (ADR 0007: soft and small, none for reduced motion).

## Decisions (grilling, 2026-10-03)

- **Q1, คู่มือ:** it is the name of every Guide (the tab, the page heading and its browser title, "คู่มือทั้งหมด", "อ่านคู่มือ", the contribute form's "ลองทำตามคู่มือแล้ว / คู่มือไหน / เลือกคู่มือ", the Place caution that points to a Guide). The Guides page lede becomes "พี่ๆ เขียนคู่มือไว้ให้แล้ว". The site description keeps "วิธีใช้ชีวิตแถวจุฬาฯ" (plain "how", not the Guide). The URL stays `/guides`. Glossary updated.
- **Q2, how a page change moves:** prototype first (below).
- **Q7, the prototype's verdict:** D. Tabs slide sideways in tab order, going deeper rises in, "← กลับ" sinks away, a Feed category moves only the list, and a Guide's name flies from where it was tapped into its heading.
- **Q8, where a name flies:** wherever the same name is on both sides of the tap: a Guide from the Guides list or from a Place card's Guides into its heading; a Place's name from its card into "โน้ตที่…" on its Notes; a Starter Checklist stop only when its title is the Guide's title (otherwise it just rises in).
- **Q9, flying back:** yes. On "← กลับ" the name flies back to where it came from when that spot is on screen; otherwise the page just sinks away.
- **Q10, after posting a Note:** the form sinks away like "← กลับ", then the new Note rises in at the top of the Feed (or the Place's card) with "โน้ตขึ้นแล้ว".
- **Q3, browser back/forward and iOS's edge swipe:** no transition (the browser already animates its own back). Only taps inside the site move.
- **Q4, changes within a page, all six:**
  1. Map category chips and "มีโน้ต": pins fade in and out, the list rises in again.
  2. Back from a Place card to the list: the list fades back in.
  3. The welcome tip: fades and folds away when dismissed.
  4. "ทำแล้ว" (MarkDone) on a Guide pops like a ticked station.
  5. Sending a form: the button pulses while sending (like a tab that is loading), the result rises in.
  6. A category chip on the Guides page: the heading it lands on glows once, faintly.
- **Q5, strength:** ADR 0007's soft and small: fades and short rises, nothing over ~250ms, no springs, none for reduced motion. Amend ADR 0007 ("every page change moves") rather than write a new ADR.
- **Q6, slow network:** the old page stays on screen and the tapped thing pulses until the next page is ready, then it moves. No blank screen, no skeleton.

## Prototype

- Branch: `prototype/page-motion` (c7ee3c1), local only.
- Build with `NEXT_PUBLIC_PROTOTYPE=1`. Switch with `?motion=A|B|C|D`, the ←/→ keys or the black bar at the top.
  - **A**, direction says what happened: tabs slide sideways in tab order (as swiping does), going deeper (a Guide, writing a Note, Senior Stories, a Place's Notes) rises in, "← กลับ" sinks away, a Feed category moves only the list.
  - **B**, one quiet cross-fade for everything.
  - **C**, like a phone app: tabs cross-fade, going deeper pushes in from the right, "← กลับ" slides out to the right.
  - **D**, A plus a Guide's name flying from the list into its heading.
- How it works: each in-site link tap navigates with a React transition type and the page sits in a `<ViewTransition>` that moves by type; the browser's back has no type, so it doesn't move. With React driving it the old page stays live until the next one is ready, which is what Q6 asks for (there's no 0.8s cap any more: nothing freezes while waiting).
- Not seen here: real phones (recorded in headless Chromium), and map tiles (blocked in the agent's session).
