# Prices carry a Price Check or are not shown

Status: accepted (2026-09-25), amended 2026-09-27 and 2026-10-02

"What's normal" is the core of the product, and prices are its sharpest form. If the site says a dish costs 45 baht and the shop charges 60, every other piece of Local Know-how loses credibility. So every price shown as a number must carry a Price Check: who confirmed it on the spot, and when (e.g. "40–50 บาท · ตรวจ ก.ย. 69 โดยพี่บอส"). A price without one renders as "รอตรวจราคา" instead of a number.

## Considered options

- Show price ranges without provenance: rejected, an unsourced price is worse than none.
- Show no prices: rejected, it removes the thing Maps can't give.

## Consequences

- The team must walk the Campus Area and check prices before the pitch; until then cards show "รอตรวจราคา".
- The attribution doubles as proof that the content comes from real people, which is the pitch's "Being Human" argument.

## Amendment (2026-09-27): prices found online

For the demo the team filled prices from the web before anyone had walked the area. Those prices are shown as numbers, but labelled "ข้อมูลจากเว็บ <month> ยังไม่มีใครไปดูราคาจริง", never "ตรวจ … โดย …". A check made on the spot through the site's form replaces it. Users in the UX audit read "ตรวจ … (ข้อมูลจากเว็บ)" as a contradiction and trusted the price less.

## Amendment (2026-10-02): prices in Guides

A price in a Guide follows the same rule and looks the same as a price on a Place: the yellow strip and the same label, drawn by the same component. Guides used to type the label into the text ("ข้อมูลจากเว็บ ก.ย. 2569"), so the same BTS fare showed two ways on two pages (UX audit 4, D2).
