Status: ready-for-human

# Re-file the Notes that still say `living`

Living Alone (อยู่คนเดียว, id `living`) split into Health (`health`), Household (`household`) and Adjusting (`adjusting`) in docs/adr/0008. The code no longer knows `living`, but rows already in the Google Sheet still carry it. Until someone fixes them, the site shows every such Note under Household (`noteCategory` in `lib/content.ts`), which is wrong for any Note about feeling lonely, friends, money or being sick.

Guessing from the words in code would misfile some without anyone noticing (ADR 0008), so a person re-files them, once, in the Sheet.

## Seed Notes (`content/notes.ts`): done in code

| Note | Was | Now | Why |
|---|---|---|---|
| `seed-boss-alone` พี่บอส: "ตอนนอนคนเดียว ไม่มีใครกินข้าวด้วย แอบเหงานิดหน่อย …" | living | adjusting | Loneliness, and how it got better: the first months themselves |
| `seed-tan-friends` พี่แทน: "ก่อนเปิดเทอมปี 1 มาคนเดียว ต้องหาเพื่อนใหม่ …" | living | adjusting | Making friends |
| `seed-tan-cost` พี่แทน: "อีกเรื่องที่ปรับตัวยากคือค่าครองชีพสูงกว่าต่างจังหวัด …" | food | adjusting | Getting used to the cost of living, not about food (moved too, though it was never `living`) |
| `seed-boss-explore` พี่บอส: "มาแรกๆ สำรวจแถวที่พักค่อนข้างยาก … อยากได้อะไรที่บอกจุดต่างๆ ชัดๆ …" | living | deleted | Reads as feedback on the product, not know-how for a Newcomer. Owner asked to remove it |

No seed Note was about being sick or about chores, so none went to Health or Household.

## Notes in the Sheet

The live Sheet can't be reached from the agent's session, so this list is what could be seen: the mock Sheet used for testing. **Before fixing, filter the live `notes` tab on `category` = `living` and add any row that isn't below.**

| Row (timestamp) | Name | Note | Now | Why |
|---|---|---|---|---|
| 2026-10-02T10:33:30Z, 10:50:38Z, 11:04:06Z, 11:09:55Z | ทดสอบสอง | "สัปดาห์แรกอย่าเพิ่งซื้อเครื่องกรองน้ำ ลองตู้หยอดเหรียญก่อน" | household (or delete) | Drinking water is a household task. These are test rows from the team's own runs; delete them if they're in the live Sheet |

How to choose for any other row:
- **health**: being sick, a pharmacy, a clinic or hospital, feeling low enough to need someone to talk to
- **household**: laundry, drinking water, rubbish, buying things for the room
- **adjusting**: loneliness, missing home, friends, money and the cost of living, getting used to the area

A row with a `placeId` already shows under its Place's category whatever `category` says; set `category` to match anyway, so the Sheet reads right.

## Steps (one pass, about 5 minutes)

1. Open the Sheet, tab **`notes`**.
2. Select the column headed **`category`** (column F if the tab was made by the current `sheet/apps-script.gs`; check the header, older tabs may differ) and turn on a filter (Data → Create a filter).
3. Filter `category` to show only `living`.
4. For each row, read `text` and type `health`, `household` or `adjusting` into its `category` cell, lower case, exactly as written here. Delete rows that are test entries.
5. Clear the filter and check none show `living` any more.
6. Open the site's Feed (`/notes`) after 30 seconds and check the chips สุขภาพ, งานบ้าน and ปรับตัว each show the Notes you expect.

Once no row says `living`, the fallback in `lib/content.ts` (`noteCategory`) and the `[data-line="living"]` rule in `app/globals.css` can be removed.
