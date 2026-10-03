# Give a price's unit its own field

Status: needs-triage

Deferred by the owner on 2026-10-03: no bug comes from it yet, and it touches every price in the content.

`Price.per` (content/types.ts) is free text ("ต่อจาน", "ต่อเที่ยว", "ขึ้นไป ต่อครั้ง"), and `priceFigure` in lib/format.ts turns it into a unit with regexes (`per.replace(/^ต่อ/, "/").replace(/ ต่อ/, "/")`) to print "17–44 บาท/เที่ยว". A new wording in the content, or one from the Google Sheet's price form, can come out wrong ("40 บาท ขึ้นไป/ครั้ง" already reads oddly). Split it into a unit ("จาน", "เที่ยว", "ครั้ง", "ใบ") and an optional qualifier ("ขึ้นไป"), and check what the price form on /contribute writes to the Sheet.
