# More Household Places

Status: done

From `../spec.md` Q1, Q2, Q17 and `../research-household.md`. Only real shops; estimate a real shop's pin, hours or price where unsure, with a code comment.

## Change

- content/places.ts, under งานบ้าน:
  - Rename `samyan-mitrtown-supermarket` to Big C Food Place, B1 Samyan Mitrtown, open 24 hours (keep the id: Notes may point at it).
  - Add: Otteri I'm Park (coin laundry, 24 hours, from 40 baht), PMCU free drinking-water dispensers at the Centenary Park and under U-Center, Lotus's go fresh Chamchuri Square, Lotus's go fresh I'm Park, Daiso Samyan Mitrtown B1, MR.DIY MBK 5th floor, Magnano key cutting Samyan Mitrtown B1.
  - Each with a `guides` link where one fits (`coin-laundry`, `drinking-water`).
- New icon keys where the category's basket doesn't say it: `laundry` and `water` exist; add `key` (Phosphor Key) with its map-pin icon in app/globals.css.
- content/guides.ts:
  - `coin-laundry` intro names Otteri I'm Park as open 24 hours.
  - `drinking-water` gains the free PMCU dispensers as an option, and the BMA licence sticker (filter-change and water-test dates) as what to look for on a coin machine.

## Done when

- The map's งานบ้าน chip shows the new pins, each with a card.
- `npm run typecheck` and `npm run build` pass.
