# Prices carry a Price Check or are not shown

Status: accepted (2026-09-25), amended 2026-09-27 and three times on 2026-10-02

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

## Amendment (2026-10-02): a shorter label in a Guide's facts

With the look in 0007, a Guide's facts show the web label without its last words: "ข้อมูลจากเว็บ <month>". The words "ยังไม่มีใครไปดูราคาจริง" are still there for screen readers. A Place card, where someone decides whether to go, keeps the full label. The owner chose this so a Guide's head isn't crowded.

## Amendment (2026-10-02): a price says only when it was last updated

The owner found the labels cluttered ("ดูจากเว็บเมื่อ … ยังไม่มีใครไปเช็กเอง" under every price, a long "ไปมาแล้วเห็นราคา…" link under it) and chose, in `prototype/readable-pages`, to show only "อัปเดตล่าสุด <month>" beside a price, on a Place card and in a Guide's facts alike. This replaces the labels in the two amendments above.

- A price is still shown as a number only with a Price Check, and a Price Check still stores who confirmed it and how (on the spot, or found online for the demo). The site no longer says either.
- A Place card keeps a short way to report a price beside the date ("ราคาไม่ตรง?"), since checks come from people standing at the Place.
- Considered: keep "<name> ไปดูมา <month>" for prices checked on the spot, so they stand apart from prices found online (recommended, not taken); a tick beside checked prices (not taken).
- Consequences: a reader can no longer tell a price someone checked from one found online. The "Being Human" proof now rests on the signed Notes rather than on the price labels.
