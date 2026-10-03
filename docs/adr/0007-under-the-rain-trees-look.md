# The site looks like shade under the rain trees, not a transit map

Status: accepted (2026-10-02), amended four times on 2026-10-02: a Guide that reads like an article, the splash, the tagline, and readable pages (`.scratch/readable-pages/`); amended on 2026-10-03: page motion (`.scratch/page-motion/`). Replaces the look in 0006: the transit-line language, and cards with shadows only on Guide pages.

The owner found the site "tidy but bland, crowded, like elements pasted all over a sheet of paper". Every part sat on one flat white surface, at about the same loudness, with nothing for the eye to rest on. The transit-map language (solid colour bands, rails through stations, saturated line colours) spoke of a system, while the site is about people: a Senior who has been there looking after a Newcomer. The pitch is judged first, on a projector, so the first glance matters most.

The whole site takes the look of shade under the rain trees (จามจุรี, Chula's tree):
- A canopy runs across the top of every page and of the map. The ground is warm cream and cards are white. Category colours are softer, and text in them stays at 4.5:1 or more.
- Lists everywhere become soft rounded cards, Notes included; a Note has one corner tucked in like a leaf. Category heads are an icon and a name, not a full-width band. Amended 2026-10-02: this no longer holds for a Guide's steps; see below.
- A Guide reads like an article, the way Medium does (amended 2026-10-02, after the owner chose the "calm list" in `prototype/guide-cards`): a reading column about 38–40rem wide, body around 18px (17px on a phone) at 1.7, a big Mitr title and a calm lede. Steps are not cards: each is a numbered station on the dotted path with one action line in Mitr, then short plain lines, the words to say in a speech bubble and a tip as a quiet sentence. Options sit one after another between thin rules, with no colour bars; emergency ones keep a faint red wash. What a Newcomer needs at a glance stands out in one "need to know" box (cost, hours, numbers to call, what to bring), with prices in platform yellow on the figure and their source in one fine line (replaced: see the amendment below); on wide screens the box sits beside the column, sticky. Real traps and emergency criteria get the page's one callout style, used sparingly. No icon circle before the title, no step-count pill, no lightbulb, no arrow on the "อ่านต่อ" link.
- Steps in a Guide and stations in the Starter Checklist are joined by a dotted path rather than a rail. Amended 2026-10-02: the path joins only things done in order; the Places in the map's list have no order, so they are plain rows (see below).
- People drawn from Open Peeps (CC0) appear where the site is about people: the Feed, the Seniors page, and a finished first week.
- Headings and the wordmark are set in Mitr, text and numbers in IBM Plex Sans Thai Looped. The wordmark's mark is a rain tree leaf, which is also the favicon; the three transit bars went with the transit look.
- Pictures are illustrations; real photos stay only on Place cards, so a Guide shows no photo.
- Motion is soft and small (things rise in, buttons give a little when pressed, a ticked station pops), and all of it is off for anyone who asks for reduced motion.
  - Amended 2026-10-02: a short splash on the first page load of a browser session (concept A, the leaf drawing itself, then the green lifting into the page's canopy), about 1.5s, skipped by any tap or key, and never shown with reduced motion.
  - Amended 2026-10-03 (`.scratch/page-motion/`, the owner chose prototype D): every page change moves, one of four ways depending on where you are and where the tap goes. Tab to tab, the page slides sideways in tab order, as a swipe does, and the tab bar stays still; going deeper (a Guide, the Note form, a Place's Notes) the new page rises in; going back up (a "← กลับ" link, a link to a shallower page, or landing on the Feed or the map after posting a Note) the page sinks away; a Feed category moves only its list of Notes. A name that is the same on both sides of the tap (a Guide's title, a Place's name) flies from where it was tapped into the new page's heading, and back again when its old spot is on screen. The browser's own back and forward never move: the browser animates those itself. While the next page loads the old one stays, live, and the tapped link pulses; there is no blank screen or skeleton. Fades and short moves, nothing over about 250ms, no springs; nothing moves for reduced motion.
- Each screen has one thing that stands out; secondary text is quieter. The tagline is no longer shown on the site, only in the description a shared link shows (amended 2026-10-02 at the owner's request).

## Amendment (2026-10-02): readable pages

The owner found the map's list out of place for food, a Guide's head hard to start reading and the Note card untidy. Chosen in `prototype/readable-pages` (see `.scratch/readable-pages/`):
- The map's list: plain rows split by hairlines, each with a small category icon (no ring, no dotted path), the Place's name and its tags (price, Home Taste, Notes). No summary line under the name.
- A Guide: under the title, the lede is the gist of the Guide (its intro, or its summary when it has none), in ink. The "need to know" box puts one fact per row, the name on the left and the value beside it, a price at the body's size on platform yellow with its unit joined on ("17–44 บาท/เที่ยว"); a number to call stays large. One fine line says when the prices were last updated (0001). Notes under a fact moved into the steps.
- A Note card: the category small on top, the words, then the signature on one line, "name • province", with how long ago at the right ("2 ชั่วโมงที่แล้ว"), never a full date. On a Place card the category is left out. The owner asked for "•" here, though " · " between fragments is out elsewhere.

## Considered options

Both were tried side by side on the real pages; see branch `prototype/look-and-feel` and `.scratch/look-and-feel/`.

- Keep the transit map, made softer: rejected. It looked calmer, but still like a system rather than people.
- The transit map reduced to a trace, with no boxes and plenty of room (prototype A): rejected by the owner in favour of B.
- A notebook of notes from Seniors: not tried. Paper and stickers would make the "pasted on a sheet" feeling worse.

## Consequences

- 0006's rule that cards and shadows are the Guide page's own look no longer holds; the rest of 0006 (map first, the tab bar, one Guide per page) stands.
- The look leans on illustration. A canopy drawn badly reads as a tree-planting campaign, so the shapes stay simple.
- The Starter Checklist and Guides keep their order and stations; only how they are drawn changes.
