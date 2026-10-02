# The site looks like shade under the rain trees, not a transit map

Status: accepted (2026-10-02). Replaces the look in 0006: the transit-line language, and cards with shadows only on Guide pages.

The owner found the site "tidy but bland, crowded, like elements pasted all over a sheet of paper". Every part sat on one flat white surface, at about the same loudness, with nothing for the eye to rest on. The transit-map language (solid colour bands, rails through stations, saturated line colours) spoke of a system, while the site is about people: a Senior who has been there looking after a Newcomer. The pitch is judged first, on a projector, so the first glance matters most.

The whole site takes the look of shade under the rain trees (จามจุรี, Chula's tree):
- A canopy runs across the top of every page and of the map. The ground is warm cream and cards are white. Category colours are softer, and text in them stays at 4.5:1 or more.
- Lists everywhere become soft rounded cards, Notes included; a Note has one corner tucked in like a leaf. Category heads are an icon and a name, not a full-width band. Amended 2026-10-02: this no longer holds for a Guide's steps; see below.
- A Guide reads like an article, the way Medium does (amended 2026-10-02, after the owner chose the "calm list" in `prototype/guide-cards`): a reading column about 38–40rem wide, body around 18px (17px on a phone) at 1.7, a big Mitr title and a calm lede. Steps are not cards: each is a numbered station on the dotted path with one action line in Mitr, then short plain lines, the words to say in a speech bubble and a tip as a quiet sentence. Options sit one after another between thin rules, with no colour bars; emergency ones keep a faint red wash. What a Newcomer needs at a glance stands out in one "need to know" box (cost, hours, numbers to call, what to bring), with prices in platform yellow on the figure and their source in one fine line; on wide screens the box sits beside the column, sticky. Real traps and emergency criteria get the page's one callout style, used sparingly. No icon circle before the title, no step-count pill, no lightbulb, no arrow on the "อ่านต่อ" link.
- Steps in a Guide and stations in the Starter Checklist are joined by a dotted path rather than a rail.
- People drawn from Open Peeps (CC0) appear where the site is about people: the Feed, the Seniors page, and a finished first week.
- Headings and the wordmark are set in Mitr, text and numbers in IBM Plex Sans Thai Looped. The wordmark's mark is a rain tree leaf, which is also the favicon; the three transit bars went with the transit look.
- Pictures are illustrations; real photos stay only on Place cards, so a Guide shows no photo.
- Motion is soft and small (things rise in, buttons give a little when pressed, a ticked station pops), and all of it is off for anyone who asks for reduced motion.
- Each screen has one thing that stands out; secondary text is quieter. The tagline is no longer shown on the site, only in the description a shared link shows (amended 2026-10-02 at the owner's request).

## Considered options

Both were tried side by side on the real pages; see branch `prototype/look-and-feel` and `.scratch/look-and-feel/`.

- Keep the transit map, made softer: rejected. It looked calmer, but still like a system rather than people.
- The transit map reduced to a trace, with no boxes and plenty of room (prototype A): rejected by the owner in favour of B.
- A notebook of notes from Seniors: not tried. Paper and stickers would make the "pasted on a sheet" feeling worse.

## Consequences

- 0006's rule that cards and shadows are the Guide page's own look no longer holds; the rest of 0006 (map first, the tab bar, one Guide per page) stands.
- The look leans on illustration. A canopy drawn badly reads as a tree-planting campaign, so the shapes stay simple.
- The Starter Checklist and Guides keep their order and stations; only how they are drawn changes.
