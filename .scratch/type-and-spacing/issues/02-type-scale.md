# One type scale for the whole site, bold only where it matters

Status: ready-for-agent
Blocked by: 01

The owner found a Guide too big (on a laptop, and in places on a phone), too many things equally loud and bold, and headings too close to body text (`../spec.md`, Q3, Q8–Q10, Q12, Q13, Q16; docs/adr/0007's type and spacing amendment). The prototype's type layer is `app/prototype-type.css` on branch `prototype/type-and-spacing` (local to this repo: `git show 458cc8f:app/prototype-type.css`); fold its decisions into app/globals.css's own rules and tokens rather than layering overrides.

## Change

- **Tokens** (`:root` in app/globals.css): five sizes about 1.25 apart. Meta 14 (`--step--1`), body 16 (`--step-0`), item title / sub-heading 20, section heading 25, page title 32 (36 from 900px). Drop 18px (`--step-half` as it is today) and `--type-quote` as a separate size: a person's own words are body text. `--type-big` (a Place card's name, a number to call) becomes the section size. Rename tokens if it makes them read better (e.g. `--t-meta`, `--t-body`, `--t-item`, `--t-section`, `--t-page`) and update the "Type by role" comment.
- **Every rule that sets a size** goes onto the scale. The prototype's list of rules that only borrowed `--step-1` (the wordmark is not one of them; leave its sizes), the lede, the composer prompt, the Note text and the Senior story body is a good start; grep for `font-size` and `font:` for the rest.
- **A Guide** (`.guide-page` and the `.guide-*`/`.step-*` rules): `--read` 16px, 17px from 900px; line-height 1.65; the title 28px, 36px from 900px; the lede at `--read`; "ทำตามนี้" (`.guide-steps-title`) at the item size; a step's action line (`.step-do`) at 1em in the heading face, line-height 1.5, its station padding recomputed; the words to say at 1em, 500; the end line at 1em; "ต่อไป" links at the item size; a number to call at the section size.
- **Weights:** headings (h1–h3 and item titles: the Guides list title, the map list's Place name, the next Starter Checklist stop, the week's progress) at `--w-head` in the heading face. Bold (700) only on a price on platform yellow (`.price-strip`, `.stop-price`), a number to call (`.tel`, `.help-contact`) and the main button (`.action`, the forms' submit). Everything else that is 600 or 700 today becomes 500 (or 400 for the box's fact names), quieter by colour. The prototype's list is the inventory.
- **Root growth:** remove the 112.5% at 900px; from 1600px only, 112.5% (it is 125% today). Check what else hangs off those two media queries (the tab bar's sizes, the canopy) still looks right.
- **Guide box on a laptop:** `.guide-know` `max-width` 20rem (at 18rem "17–47 บาท/เที่ยว" spills out, on today's scale too).

## Done when

- At 390px and 1440px the map, the Feed, the Guides list, a Guide (rabbit, sick), the Starter Checklist, Seniors and both forms match the prototype's `?font=D&scale=new&mark=mitr` screenshots in size and weight (`../spec.md` lists what was sent).
- No 18px text is left (`getComputedStyle` sweep), and no 700 outside the four kinds above.
- Text in category colours still reads at 4.5:1 or more.
- `npm run typecheck` and `npm run build` pass.
