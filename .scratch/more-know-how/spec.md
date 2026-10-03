Status: needs-triage

# More know-how: Household Places, food and health, Home Taste, the CU POP BUS logo

The user asked (2026-10-03) for more Household Places, more information in Everyday Food and Health, a better Home Taste section (prototype first), and the CU POP BUS logo in the Guides.

Research: `research-household.md`, `research-food-health.md` (this folder).

## Decisions (grilling, 2026-10-03)

- **Q1 Household scope:** laundry, drinking water, rubbish, everyday supplies, plus keeping the room and things in order (key cutting, shoe and clothes repair, hardware). Post, parcels and printing are not Household. `CONTEXT.md` updated.
- **Q2 How true:** it's a demo. Use what desk research finds; where unsure, estimate (pin, hours, price) and still show a price. Every price keeps a Price Check (`by: "ทีมตั้งหลัก", how: "web"`), so readers see a number and a date (docs/adr/0001 still holds). Mark estimated values with a code comment so they can be swapped for real ones.
- **Q3 Everyday Food:** (a) add the Chula canteens open to everyone, with hours, to `eat-cheap`; (b) a new Guide for eating late at night (after 22:00); (f) more food Places on the map. One line on how paying works goes in `eat-cheap`.
- **Q4 Health:** (a)+(b) one new Guide, see Q15; (e) new Places: the Chuan Chom dorm first-aid room, B&W Drugs Chula soi 16, a clinic open evenings or weekends.
- **Q5 Home Taste, what's wrong today:** (a) a plain text list that doesn't look appetising; (c) a Newcomer can't pick their own region; (e) regions with no place are silent and don't invite anyone to add one.
- **Q6 More Home Taste places:** the agent finds and adds them (team picks), every region it can find a real place for.
- **Q7 CU POP BUS logo:** from the official CU POP BUS page. Treat it like the BTS and MRT logos: the owner's mark, named in the footer notice, behind the same off switch (`NEXT_PUBLIC_TRANSIT_LOGOS=off`). This reverses `.scratch/logos` (CU Pop Bus kept our own icon because no official logo was found).
- **Q8 Where the logo shows:** the `pop-bus` Guide's page head and its icon on `/guides`. The whole square, uncropped.
- **Q9 Places per region:** up to 3, the ones vouched for by someone from that region first, then team picks.
- **Q10 Remember the region:** yes, in the browser, like the Starter Checklist (docs/adr/0003).
- **Q11 Pictures:** a dish photo from Wikimedia Commons per place, captioned as an illustration, not that shop's.
- **Q12 Prototype variants:** A region chips + cards; B "บ้านอยู่ภาคไหน" first, six big buttons, your region on top; C one horizontal-scroll row per region, yours first. All three, switchable on screen.
- **Q13 Where it lives:** the prototype switches between (a) the top of the food section on `/guides` and (b) its own page `/home-taste`. The home page strip waits until a variant is picked.
- **Q14 Empty regions:** a region with no place shows "ยังไม่มีร้านภาค… บ้านอยู่แถวนั้น รู้ร้านที่ใช่ บอกหน่อย" with a button to the Note form, "tastes like home" already ticked. Regions with only team picks show nothing extra.
- **Q15 Health rights:** one Guide, options: gold card (and moving it to Bangkok), Chula student accident insurance, other rights such as a parent's civil-servant cover.
- **Q16 Starter Checklist:** add the gold-card check to the first month, and trying a Home Taste place to the first month.
- **Q17 Gaps with no real shop:** leave them out; never invent a shop. Estimates are only for a real shop's pin, hours or price.
- **Q18 Order:** the content (Household, food and health Places, the two new Guides, the logo, the Starter Checklist) goes into `main` first, through tickets. Home Taste follows after the prototype, together with its extra places per region.
