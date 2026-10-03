# Readable pages: the map list, a Guide's head and the Note card

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

- Branch: `prototype/readable-pages` (round 1 fe4144e, round 2 4e50d0b).
- Build with `NEXT_PUBLIC_PROTOTYPE=1`. Switch with `?list=O|A|B|C` (map), `?guide=O|N` (a Guide), `?note=O|A1` (Feed and Place card) and `?card=O|P1|P2|P3` (Place card), or the ←/→ keys and the black bar.
- Seed Notes get made-up times and Places there, only so the cards have something to show.

## Round 2 (owner's verdict on round 1, 2026-10-02)

- **Map list:** take the line under each Place's name out (cluttered). A, B or C still to pick.
- **Guide:** N, without the notes under a fact ("ค่าบัตร 100 กับ…") and without "ยังไม่มีใครไปเช็กเอง".
- **Note card:** A1, but the name and province on one line joined with "•", and no Place after the category. The owner asked for "•" here, though " · " between fragments is out elsewhere (audit 11, T11).
- **Prices on a Place card:** only "อัปเดตล่าสุด <month>"; no "ไปมาแล้วเห็นราคา… บอกราคาที่เห็นได้เลย" link.
- **Place card:** there's a better layout; prototype it. Round 2 has P1 (facts as rows, then sections), P2 (sections, the price and นำทาง in a bar stuck to the bottom) and P3 (the latest Note first).

## Verdict on round 2 (2026-10-02)

- **Q10, map list:** A, plain rows with a small icon, no line under the name.
- **Q11, Place card:** P2.
- **Q12, price labels:** "อัปเดตล่าสุด <month>" for every price; ADR 0001 and the Price Check entry in CONTEXT.md amended. (Recommended keeping "<name> ไปดูมา" for prices checked on the spot; not taken.)
- **Q13:** a short "ราคาไม่ตรง?" beside the date on a Place card goes to the price form.
- **Q14:** what sat under a fact moved into the steps ("ไม่มีมัดจำ" into the Rabbit top-up step); "ตามเว็บจุฬาฯ" and "โทรได้ 24 ชม." were already said in the steps, so they went.
- **Q15:** "พี่บอส • สุราษฎร์ธานี".
- **Q16:** a number to call stays large in the box; every Guide's lede is its gist.

## Built (2026-10-02)

- ADRs 0001, 0006 and 0007 amended; CONTEXT.md's Price Check updated.
- Code on `claude/youthful-newton-2zia7g`, written fresh, not copied from the prototype.
- Ledes rewritten for the owner to read: ขึ้น MRT, ซักผ้าหยอดเหรียญ, น้ำดื่มในห้อง and กินให้อิ่มในงบนิสิต (new intro). The rest keep their intro (Rabbit, รถป๊อป, เข้าจุฬาฯ) or summary as the lede.
- Not seen working here: a Note's "… ที่แล้ว" on the live Sheet (seed Notes have no time; the prototype showed it with made-up times), and photos on the Place card (Wikimedia is blocked in the agent's session).

## Found while building

- The intro isn't always the gist. On "จากรถไฟฟ้าเข้าจุฬาฯ" it is; on "ขึ้น MRT" the summary ("แตะบัตรเครดิตหรือเดบิตเข้าได้เลย") says more than the intro ("บัตรแบบเดิมใช้ไม่ได้แล้ว").
- In rows, the emergency numbers on "ไม่สบาย ไปไหนดี" (1669, 1323) shrink to the body's size; today they are the biggest thing in the box.

## After the verdict

- Fold the winners into the real code (not the prototype CSS as is).
- Amend docs/adr/0007: the dotted path joins only things in order (Guide steps, first-week stations).

## Comments

- 2026-10-03: `/code-review` against 138ccff. Fixes in `issues/01-review-fixes.md`; the unit field deferred to `issues/02-price-unit-field.md`.
