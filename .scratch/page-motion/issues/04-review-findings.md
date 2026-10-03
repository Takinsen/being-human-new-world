# What the code review of page motion left open

Status: needs-triage

Two-axis `/code-review` of `git diff 90dbeb8...7f25a1a` (tickets 01–03), 2026-10-03. The one likely bug, a motion staying armed after "ดูโน้ตจากทุกที่" on a Place's Notes, was reproduced and fixed in the commit that adds this file (components/NavLink.tsx). The rest is below, for the owner to pick from; none of it blocks the PR.

## Spec

- **The glow doesn't repeat.** Q4.6: "the heading it lands on glows once". It runs off `:target`, so tapping the Guides chip whose hash is already in the URL doesn't glow again (ticket 03 noted it).
- **A swipe between tabs shows no waiting pulse.** Q6: "the tapped thing pulses until the next page is ready". SwipeTabs calls `router.push`, not a link, so on a slow network nothing says it's loading.
- **A name with no partner moves the wrong way** (lower confidence, not reproduced). `::view-transition-old(.fly):only-child` always sinks and `-new(.fly):only-child` always rises, whichever way the page goes; the comment says it "goes with its page".
- Not asked for, all small; keep or drop:
  - Pins fade in on every map load, not only after a chip.
  - The footer fades with every page change.
  - After posting, the Feed scrolls by the `#fresh` hash instead of `scrollIntoView`; focus is unchanged.
  - `.flying-name { display: inline-block }` changes how Guide titles and "โน้ตที่…" wrap at rest.
- Accepted: a Place's name flies from its card's heading rather than the "ดูโน้ต…" link, which fits Q8 ("from its card").

## Standards

- **Tracker statuses.** Tickets 01–03 say `Status: done`, not one of the five roles in docs/agents/triage-labels.md (other features already do the same; decide once what a finished ticket says).
- **ADR 0007's 2026-10-03 amendment** is an inline sub-bullet, not a `## Amendment (date)` section, and the status line doesn't count it like the others.
- **The glow** (`@keyframes land-glow` in app/globals.css) mixes its own tint (`color-mix … 18%`) instead of `--tint`, and runs 1s where ADR 0007 says nothing over about 250ms; the exception is only in a CSS comment.
- **`--page-shift`** is set on `<html>` by `keepOldPicture` (components/PageMotion.tsx) and never reset; a later transition could pick up the old value.
- Smells, judgement calls:
  - Five components in PageMotion.tsx each turn the motion into a class with their own ternary; `PageLeave` and `PageArrive` are nearly the same.
  - `` `guide-title-${id}` `` is built in four files and `` `place-name-${id}` `` in two.
  - NavLink decides "back" from the `back-link` class; a `back` prop would say it.
  - `FADE_MS` / `WELCOME_FOLD_MS` must match numbers in globals.css; durations repeat with no token.
  - `useLinkStatus` runs twice on the tab bar's links (NavLink's `Going`, TabBar's `Pending`).
  - Names: `went`, `Going`, `shown.n`.
  - WeekRoute's `guideAt(href)` searches the Guides from outside; it would sit better in lib/content.
