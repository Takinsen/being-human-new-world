Status: needs-triage (2026-10-02). Waiting on the owner's choices of voice and decoration in grilling round 3.

# Audit 11: what makes the site look AI-made

Audited on the build of 08db1cf. Screenshots are in the session's scratchpad/audit11/shots.
Found 20 tells: 7 high, 9 medium, 4 low. 10 are visual, 5 are punctuation and 5 are wording.

## Overall

The base is good: the canopy, the cream paper, the dotted path, the Open Peeps people and the Senior stories.
What reads as AI comes from three things:
- the same decoration repeated on every row
- English-UI punctuation
- sentences built from one template

Most of it is fixed by removing things.

## Visual

- **T1 [high] Every list item is the same rounded white card with a shadow.** On wide screens they also form a symmetric 2-column grid. One screen of /notes holds 18 shadowed boxes and /guides holds 12.
  - Proposed fix: the Guide list becomes one card with rows split by lines.
  - Remove the shadow from Notes, `.feed-more`, `.detail-guide` and `.guide-next`.
  - Keep shadows only on Guide step cards and the map sheet.
- **T2 [high] An icon in a tinted circle before every heading and row.** `.guide-icon` appears 13 times on /guides.
  - Proposed fix: remove it from the Guides list and from the Guide h1.
  - `.line-head svg` becomes a plain icon.
  - Keep `.place-icon` on the map, because those are stations on the path.
- **T3 [high] Colour bars on the top or left of boxes.** 15 option cards have one, plus the left border of `.form-status`.
  - Proposed fix: remove them all. Emergency options keep only a faint red wash.
- **T4 [medium] Pills everywhere.** The "5 ขั้น" step count, the "ถัดไป" badge, the phone numbers on Seniors, the jump links and the draft tag.
  - Proposed fix: remove the step-count pill and the "ถัดไป" badge. Phone numbers become large linked numbers instead of buttons.
- **T5 [medium] A yellow price pill on every row of the map list.** It turns into background pattern.
  - Proposed fix: in the list, show the price in bold ink. Keep the yellow only on the Place card and in Guide facts.
- **T6 [medium] An arrow or caret at the end of every link.**
  - Proposed fix: remove them all, keeping only the arrow on "อ่านต่อ" at the end of a Guide. Remove the ↓ from jump links too.
- **T7 [medium] An icon before every sub-box.** Lightbulb before every tip, plus Backpack, HandHeart, SignIn and BookOpenText.
  - Proposed fix: remove them. Keep only the speech bubble on "พูดว่า".
- **T8 [low] A ✓ before the selected chip.** This is the Material filter-chip pattern.
  - Proposed fix: show the selected chip with a solid fill instead.
- **T9 [low] Several tinted boxes stacked on one screen.** Rabbit has 3 layers.
- **T10 [low] Every page has the same shape:** canopy, h1, grey lede, row of chips, then cards.

## Punctuation

- **T11 [high] " · " joining fragments.** It appears 11 times in source and 25 times on rendered /notes.
- **T12 [medium] Arrows inside sentences**, such as "ฉุกเฉิน → 1669".
- **T13 [medium] Colons used as labels.** 8 places: "เข้าจุฬาฯ:", "ราคาปกติ:", "ภาพ:", "ถัดไป:", "ไม่อยากเดิน:", "มีบัตรทอง:", "บอกให้ชัด:", "…ชักไม่หยุด:".
- **T14 [medium] Form-style marks in a spoken voice:** "ค่ะ/ครับ" (8 times), "บัตร / เหรียญ", "100 + 100", "@ {place}".
- **T15 [low] Parenthetical asides**, about 20 places.

## Wording

- **T16 [high] All 13 Guide summaries use the same template.** They are three verbs or two commands of similar length.
- **T17 [high] Therapist or marketing lines, and leading questions.** Examples: "ไม่ได้แปลว่าเราปรับตัวไม่เก่ง", "ทำเรื่องที่เคยมีคนทำให้ ด้วยตัวเอง ทีละขั้น", "เพิ่งมาใหม่?", "เคยเป็นคนมาใหม่เหมือนกัน?", "ราคาไม่ตรง?", "ในคำพูดของเราเอง".
  - The seed note at notes.ts:39 is product feedback that reads like a testimonial.
- **T18 [medium] System or form language.** "บันทึก…", "บันทึกไม่สำเร็จ ลองใหม่อีกครั้ง", "โน้ตของคุณ", "ชื่อที่ให้แสดง", "วิธีที่เกี่ยวข้อง", "ต่อจากนี้", "เตรียมให้พร้อม", "ผู้โดยสาร", "ระบบตัดเงิน", "ไม่เสียค่าใช้จ่าย".
- **T19 [medium] The same thing named in different ways.**

  | Thing | Names in use now | Proposed single name |
  |---|---|---|
  | Health centre | ศูนย์สุขภาพนิสิต, ศูนย์บริการสุขภาพ จุฬาฯ | ศูนย์บริการสุขภาพ จุฬาฯ |
  | Ticket counter | ห้องจำหน่ายตั๋ว, ห้องขายตั๋ว | ห้องขายตั๋ว |
  | Campus shuttle | รถป๊อป, CU Pop Bus, Pop bus | รถป๊อป |
  | Reporting a price | ตรวจราคา, บอกราคาจริง, บอกราคาที่เห็น | บอกราคา |
  | Submit button | บันทึก, ลง, ยืนยัน | ส่ง |
  | Hometown | บ้านเกิด, บ้านอยู่ | บ้านอยู่ |
  | Address to the reader | คุณ, เรา | เรา |

- **T20 [low] "contactless".** Proposed: "รูปคลื่นแตะจ่าย".

## What already feels human and should stay

- "พูดว่า" bubbles. Only the ค่ะ/ครับ needs to go.
- "เท่านี้เอง" and "ครบแล้ว ตั้งหลักได้แล้ว".
- The Senior stories.
- Details only someone who has been there would know:
  - "อย่าแตะทั้งกระเป๋าสตางค์"
  - "ยืนชิดขวาบนบันไดเลื่อน"
  - "มาก่อน 18:00 หรือหลัง 20:30"
  - "ถ้าไม่โบก รถอาจไม่จอด"
  - "นับว่าไม่สบายเหมือนกัน"
- Being honest about sources: "ยังไม่มีใครไปดูราคาจริง", "ร่าง", "ภาพประกอบ ไม่ใช่ของร้านนี้".
- "ไม่สบาย ไปไหนดี", "เหงาหรือเครียด คุยกับคนได้", "รุ่นพี่ก็เคยมาใหม่".
- The Note's leaf corner, the dotted path, and the station icons on the map list.

## Copy table

The audit proposes about 190 rewrites, old to new, with file:line. Every fact, price, time and place name stays exactly the same.
The table itself is not copied here. The person who takes this work asks the session for the full table, or re-runs audit 11 on the current build.
Before rewriting, the owner chooses the voice in grilling round 3. That decides whether to drop ค่ะ/ครับ, whether to use "เรา" or "คุณ", and how informal to go.
