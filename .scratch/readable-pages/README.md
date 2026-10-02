# Readable pages: the map list, a Guide's head and the Note card

Status: needs-info (2026-10-02). Waiting on the owner's verdict on the prototype.

## What the owner said

- Map drawer: the station line that copies a train line doesn't fit Places like food.
- Guide page: the white box (MRT, BTS) is cramped; the page is hard to read because it isn't clear where to start.
- Note card: lay out what's inside the card so it reads easily and tidily.

## Decisions (grilling, 2026-10-02)

- **Q1, map list:** drop the dotted path; the Places in a category have no order. Which list wins is up to the prototype (O/A/B/C).
- **Q2, map pins:** unchanged.
- **Q3, Guide reading order:** title, then the gist (the intro replaces the grey summary as the lede; the summary stays on the Guides list), then the "need to know" box, then the steps.
- **Q4, the box:** one fact per row, the name on the left and the value beside it, the unit joined on ("17–44 บาท/เที่ยว"). The price keeps platform yellow (ADR 0001) at the body's size. Where prices come from stays one fine line.
- **Q5, Note card:** the category (and the Place, if pinned) small on top, then the words, then a signature: the name in bold, then "บ้านอยู่…". No " · " (already a rule, audit 11 T11). Time is counted back, never a full date.
- **Q6:** still one card per Note, a little tighter.
- **Q7:** prototype first.
- **Q8, time:** counted back all the way: เมื่อกี้, N นาทีที่แล้ว, N ชั่วโมงที่แล้ว, เมื่อวาน, N วันที่แล้ว, N สัปดาห์ที่แล้ว, N เดือนที่แล้ว, ปีที่แล้ว, N ปีที่แล้ว. A Note with no time shows none.
- **Q9:** prototype as below.

## Prototype

- Branch: `prototype/readable-pages` (commit fe4144e).
- Build with `NEXT_PUBLIC_PROTOTYPE=1`. Switch with `?list=O|A|B|C` (map), `?guide=O|N` (a Guide) and `?note=O|A1|A2` (Feed and Place card), or the ←/→ keys and the black bar.
- Seed Notes get made-up times and Places there, only so the cards have something to show.

## Found while building

- The intro isn't always the gist. On "จากรถไฟฟ้าเข้าจุฬาฯ" it is; on "ขึ้น MRT" the summary ("แตะบัตรเครดิตหรือเดบิตเข้าได้เลย") says more than the intro ("บัตรแบบเดิมใช้ไม่ได้แล้ว").
- In rows, the emergency numbers on "ไม่สบาย ไปไหนดี" (1669, 1323) shrink to the body's size; today they are the biggest thing in the box.

## After the verdict

- Fold the winners into the real code (not the prototype CSS as is).
- Amend docs/adr/0007: the dotted path joins only things in order (Guide steps, first-week stations).
