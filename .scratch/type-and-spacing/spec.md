# Type and spacing: a new font, a smaller scale, one rhythm

Status: needs-info (prototype built 2026-10-03; waiting for the owner's pick)

## What the owner said

- They don't like the current fonts and want to try others.
- The spacing, visual hierarchy and font size feel off in places; a Guide (คู่มือ) looks too big.

## What's there today (2026-10-03)

- Headings, the wordmark, a step's action line, the words to say and the Guide's end line are in Mitr; text and numbers are in IBM Plex Sans Thai Looped (app/globals.css `--font`, `--font-head`; ADR 0007).
- Sizes: 14 / 16 / 18 / 20 / 24px plus a clamped h1 (`--step--1` … `--step-3`), a Place name or number to call at 28px.
- A Guide sets its own sizes: body 17px (18px from 40rem) at 1.7, the lede 12% bigger, the title up to 48px, a step's action line 20px, "ขั้นตอน" 24px.
- The whole site grows to 112.5% from 900px wide and to 125% from 1600px (for the projector). On a laptop a Guide's body is about 20px and its title about 54px.
- The spacing scale has 7 values (4 / 8 / 12 / 16 / 24 / 32 / 48), picked differently page to page. Weight 700 is used in about 40 places.

## Decisions (grilling, 2026-10-03)

- **Q1, which font:** both; Mitr and IBM Plex Sans Thai Looped go.
- **Q2, loops:** loopless, site-wide.
- **Q3, where it's too big:** on a laptop, and on a phone in places such as each Guide.
- **Q4, scope:** one type scale, spacing and hierarchy for the whole site; a Guide no longer has sizes of its own.
- **Q5, process:** prototype first.
- **Q6, target feel:** still Airbnb + Headspace.
- **Q7, fonts to try:** O (today, to compare), A Anuphan throughout, B Google Sans throughout (it has Thai on Google Fonts), C LINE Seed Sans TH for headings + IBM Plex Sans Thai (loopless) for text, LINE Seed self-hosted (OFL; not on Google Fonts). Kanit and Prompt are out (read as posters), Bai Jamjuree too (reads as tech).
- **Q8, a Guide's sizes:** body 16px on a phone, 17px on a laptop, at 1.65; title 28px on a phone, 36px on a laptop; the lede at the body's size (no longer 12% bigger). Q8 also said a step's action line 18px and "ขั้นตอน" 20px, but Q12 drops 18px: see Q16. Final numbers are tuned per font (their x-heights differ).
- **Q9, growing the root:** no growth at 900px; from 1600px only, at 112.5% (the projector).
- **Q10, what feels off in the hierarchy:** (a) too many things equally loud, too much bold; (b) headings too close to body text; (d) tight in places; (e) spacing inconsistent. Not (c): it isn't too loose.
- **Q12, scale:** five sizes about 1.25 apart: 14 meta, 16 body (17 in a Guide on a laptop), 20 item title and sub-heading, 25 section heading, 32 page title (at most 36 on a laptop). 18px goes. Headings are weight 600 in ink, text 400.
- **Q13, bold:** only headings (600), a price on platform yellow and a number to call, and the main button. Everything else 400 or 500, quieter by colour (`--ink-soft`) instead of weight.
- **Q14, spacing:** proximity, strictly: 8 inside one thing, 16 between things in a list and inside a card, 32 between sections, 48 under a page head and between big sections. 4 / 12 / 24 only where there's a real reason (inside a small label). Every page gets audited for spots that are too tight or break the rule; the prototype points them out.
- **Q15, the wordmark:** the prototype shows it both in Mitr (as a logo, splash unchanged) and in the new heading font; decide on seeing it.
- **Q16, a step's action line and "ขั้นตอน":** the action line at the body's size in the heading font at 600 (its numbered station already marks it); "ขั้นตอน" at 20px, a sub-heading. So a Guide gets smaller and headings still stand apart by weight.
- Everything else in Mitr (a step's action line, the words to say, the Guide's end line) takes the new heading font.

## Prototype

- Branch: `prototype/type-and-spacing` (beb5d4b), local only.
- Build with `NEXT_PUBLIC_PROTOTYPE=1`. Switch with `?font=O|A|B|C`, `?scale=old|new`, `?mark=mitr|new`, or the black bar at the top (←/→ font, S scale, M wordmark).
  - Fonts: `app/prototype-type.css`. LINE Seed Sans TH is self-hosted from `public/prototype/fonts/`; it has Regular and Bold only, so C's headings are 700, the others 600. Its files came from the npm package `@fontpkg/line-seed-sans-th` (LINE's site was unreachable from the agent); their name table says LINE, Dalton Maag, Thai by Cadson Demak. Take the files from LINE itself if C wins.
  - The new scale and weights: `app/prototype-type.css`. The spacing rhythm: `app/prototype-spacing.css`, every rule under `:root[data-scale="new"]`.
- Spacing judgement calls made in the prototype: filters sit 32 over the list they filter (Feed and Guides), not 48; the laptop Guide box is 20rem (at 18rem "17–47 บาท/เที่ยว" spilled out, on the old scale too).
- Known, not fixed by spacing: a Place card's icon box is a fixed 40px, so the icon still looks far from the name; the Guides list is about 10% longer on a phone (16 between cards and inside them).
- Screenshots sent to the owner (2026-10-03): a Guide (phone top and steps, laptop), the Feed (phone, laptop), the map, the Guides list, the Starter Checklist, and the wordmark in Mitr against each font.
- Not seen here: real phones (headless Chromium), map tiles (blocked in the agent's session).

## Next

- Once the owner picks, amend ADR 0007 (type and the projector growth) and write tickets under `issues/`.
