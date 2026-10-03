# Home Taste: pick your region, see its places

Status: done

From `../spec.md` Q5, Q9–Q14, Q16, Q20–Q22. The prototype is on branch `prototype/home-taste` (316b7d1); it is reference, not code to copy.

## Change

- content/places.ts: the prototype's team picks become real Places, with their dish photos: north (ข้าวซอยดอยคำ, ลำดวนฟ้าฮ่าม, หอมด่วน), Isan (พาข้าว, คำแพง), south (ศรีขมิ้น), central (ขนมไทยแม่เดือน, เส้นสุโข), west (ก๋งตุ๋ย ไก่ย่างบางตาล).
- lib/content.ts: `homeTaste` holds every region, each with up to 3 places, vouched ones first, then team picks.
- The dishes each region is known for, for the region buttons (content).
- The chosen region is kept in this browser, like the Starter Checklist (docs/adr/0003).
- A Home Taste section, used on the new page `/guides/home-taste`:
  - no region chosen: "บ้านอยู่ภาคไหน" and six big buttons, each with its dishes and how many places;
  - region chosen: region chips (count on each, yours selected) and that region's places as cards: dish photo, name, summary, price, who vouched or "ทีมหามาให้ลอง", linking to the Place on the map;
  - a region with no place: "ยังไม่มีร้านอาหาร… บ้านอยู่ภาค… รู้ร้านที่ใช่ บอกหน่อย" and a button to write a Note in ของกิน.
- `/guides`: the old Home Taste list goes; a card at the top of the food section links to the page and says how many places your region has.
- Starter Checklist: "ลองกินร้านรสชาติบ้านสักร้าน" linking to the page.

## Done when

- `/guides/home-taste` asks first, then shows the chosen region's cards; reloading keeps the region.
- A region with nothing shows the prompt.
- `npm run typecheck` and `npm run build` pass.

## Comments

- Built from the prototype's B (ask first) and A (chips + cards), on `/guides/home-taste`. Checked in headless Chromium at 390 and 1440 px: the ask, a region's cards, the region kept after reload, the empty east, the link card on `/guides`; no console errors.
- The dish photo keeps its Commons credit (CC BY-SA needs it), so the card's link is the shop name stretched over the card, not a link wrapping the card.
- The "tell us" button opens the Note form in ของกิน; "tastes like home" can't be ticked there yet, because a Home Taste Note has to be pinned to a Place and a shop nobody has added has no Place.
