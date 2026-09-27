# UX/UI audit 4: after the Guide page redesign (2026-09-27)

Status: needs-info (waiting on the owner's answers to Q1–Q5)

Three agents tested a production build of `ae378a8` (same as main) in Chromium against the stand-in Sheet:

- **Design:** 22 routes at 390×844, 1280×800 and 1920×1080, with Bai Jamjuree served locally. Commons photos were replaced by a local PNG, so their size and position were measured but not the photos themselves.
- **Personas:** บอส at 390×844; แทน at 360×640 with 125% text and 50KB/s; โดม at 1280×800, walking through the demo. This round also checked, step by step, whether each Guide can actually be followed.
- **Accessibility:** 22 routes × 5 viewports, including 320px at 200%. axe-core was not installed, so the checks were written by hand. The accessibility tree was taken with `page.accessibility.snapshot()`.

Map tiles and Commons photos could not load in the sandbox. Test Notes marked "(ทดสอบ audit5)" went to the stand-in Sheet only. Nothing fixed in audit 3 has broken again, except R3, which is half back (A2).

Previous: `ux-audit.md`, `ux-audit-2.md`, `ux-audit-3.md`.

## Guide content: can a newcomer follow it?

| # | ระดับ | ปัญหา | ใครเจอ |
|---|---|---|---|
| G1 | สูง | ถ้าป่วย: ป่วยกลางดึกแต่ไม่ฉุกเฉินไปต่อไม่ได้ ศูนย์สุขภาพปิด 15:30 ไม่มีร้านยาเปิดดึก ไม่มีทางเข้า ER จุฬาฯ และค่าใช้จ่าย ไม่มี "เตรียมให้พร้อม" (บัตรประชาชน บัตรนิสิต ยาที่แพ้) และไม่บอกให้เตรียมที่อยู่หอก่อนโทร 1669 | แทน |
| G2 | สูง | Rabbit: ไม่มีค่าทำบัตรหรือยอดเติมขั้นต่ำ "ค่าโดยสารถูกกว่าบัตรผู้ใหญ่" ต้องตรวจ (ส่วนลดนักศึกษาอาจได้แค่ตอนซื้อเที่ยวเดินทาง) ไม่บอกว่าใช้กับ MRT ไม่ได้ เช็กลิสต์สัญญาว่า "รู้ค่ารถจากที่พักถึงจุฬาฯ" แต่วิธีไม่ได้ตอบ | บอส |
| G3 | กลาง | จากรถไฟฟ้าเข้าจุฬาฯ: ไม่บอกทางออกที่ไปถึงป้ายหน้า 7-Eleven คนมาใหม่ไม่รู้จัก "ฝั่งลิโด" ใช้คณะอักษรฯ เป็นจุดอ้างอิงเดียว ไม่มีลิงก์ไปวิธีรถป๊อป ทางเลือก MRT ให้ขึ้นสาย 4 โดยไม่เตือนเรื่องวันเสาร์ | บอส |
| G4 | กลาง | การ์ด BTS สยามเขียน "สาย 1 ทุกวัน จ.–ส." ขัดกันเอง | โดม |
| G5 | กลาง | ซักผ้า: ไม่บอกเวลาซักหรืออบ (แต่ให้ตั้งนาฬิกาปลุก) โปรแกรมที่ควรเลือก เหรียญที่ใช้หรือจุดแลกเหรียญ และวิธีดูว่าเครื่องไหนซักเครื่องไหนอบ หัวขั้น 1 ไม่ตรงกับเนื้อหา ร้าน Otteri ไม่มีลิงก์นำทาง ป้ายราคาเป็น "ข่าวราคาปี 2567" แทนรูปแบบปกติ | แทน |
| G6 | กลาง | กินให้อิ่มในงบ: หัว "ทำตามนี้ 3 ขั้น" แต่ขั้น 2 และ 3 เป็นทางเลือก ไม่ใช่ลำดับ โรงอาหารคณะไม่บอกที่ตั้งหรือราคา | บอส |
| G7 | ต่ำ | ข้อความนำซ้ำกับบรรทัดสรุป (pop-bus) และซ้ำกับหัวข้อ (sick "เลือกตามอาการ") 1669 ขึ้น 3 ครั้งก่อนเลื่อนจอ | Design |
| G8 | ต่ำ | "พูดว่า": Rabbit ควรเป็น "ขอทำบัตร Rabbit นักศึกษา" ส่วนร้านข้าวแกงคนพูดจริงว่า "ข้าวสองอย่าง" | บอส |

## Layout and design

| # | ระดับ | ปัญหา | ใครเจอ |
|---|---|---|---|
| D1 | สูง | จอคอม: รูปในหน้าวิธีสูง 387px ที่ 1280 ดันขั้นแรกลงไปใต้แถบเมนูใน 7 จาก 12 วิธี (pop-bus y 1010, fold ≈740) จอแรกเห็นแค่หัว รูป และ "เตรียมให้พร้อม" | Design, โดม |
| D2 | สูง | ราคาในการ์ดข้อเท็จจริงไม่ใช้ `Price` จึงไม่มีแถบเหลืองและไม่มีป้าย "ยังไม่มีใครไปดูราคาจริง" ตามที่ตกลงไว้ใน ADR 0001 ปีเขียนเป็น "2569" ขณะที่ Place card เขียน "69" | Design |
| D3 | กลาง | หน้าวิธีเป็นภาษาการออกแบบที่สองที่ไม่มีหน้าอื่นใช้ (พื้นเทา การ์ดมีเงา หัวสีจาง) หน้ารายการวิธีข้างๆ ยังเป็นแถบสีทึบกับแถวเรียบ ลิงก์ "ไปต่อ" มี 3 หน้าตา (D4) และสัญลักษณ์สถานีมี 3 ขนาด (D9) | Design |
| D5 | กลาง | ชิปที่ถูกเลือก contrast ไม่ถึงเกณฑ์: ของกิน 3.87:1 และการเดินทาง 4.17:1 (มีมาตั้งแต่ f07ca0a รอบก่อนไม่ได้จับ) | Design |
| D6 | กลาง | การ์ดข้อเท็จจริงใช้ `auto-fill` ที่ 1280 จึงกว้างแค่ 166px "บาท/ เที่ยว" ตัดบรรทัด และที่ 390 การ์ดใบที่ 3 ของ to-chula ตกไปอยู่แถวใหม่คนเดียว | Design, โดม |
| D7 | กลาง | h2 "เตรียมให้พร้อม" 16px เล็กกว่า h3 ของขั้นที่ 17px ลำดับหัวข้อจึงกลับด้าน | Design |
| P6 | กลาง | รายการ "เตรียมให้พร้อม" มีกล่องสี่เหลี่ยมเหมือนช่องติ๊ก แต่กดไม่ได้ | Personas |
| D10–D15 | ต่ำ | ค่าที่ไม่ใช่ token (ขนาดตัวอักษร 1.0625/1.125/0.75/1.1/1.15rem, มุม 4px, `#fff`, `#f4f6f9`, พื้นจาง 9/10/14%) CSS ที่ไม่ได้ใช้ (`.guide-facts .tel`, `.guide-page .page-head h1`, ชิปบรรทัด 759) หมายเหตุราคา 12px อ่านยาก ระยะเกินเมื่อวิธีไม่มี intro หัวหมวดอยู่คนเดียวแทบกลืนกับพื้นเทา ขอบบนของการ์ดตัวเลือกโค้งตามมุม | Design |

## Accessibility

| # | ระดับ | WCAG | ปัญหา |
|---|---|---|---|
| A1 | สูง | 2.4.11, 2.4.3 | บนจอเตี้ยการ์ดเปิดเต็มจอ แต่ wordmark ชิป หมุด 11 อัน และลิงก์ attribution ยังกด Tab ถึงได้ทั้งที่อยู่ใต้การ์ด (ราว 18 จุด) ต้องใส่ `inert` ตอน `sheetFull` (MapExplorer.tsx:337) |
| A2 | กลาง | 4.1.3 | ลงโน้ตแบบไม่ผูกกับที่ แล้วโฟกัสค้างที่ body การนำทางฝั่ง client ไม่ย้ายโฟกัสไปที่ `#fresh` (notes/page.tsx:67) |
| A3 | กลาง | 2.5.5 | 1669 และ 1323 ในการ์ดข้อเท็จจริง และ "โทร 1669" ในหัวการ์ด สูงแค่ 20–21px ทั้งที่เป็นปุ่มที่รีบกดที่สุด |
| A4 | กลาง | 2.4.11 | ชิปที่เห็นแค่บางส่วนไม่ถูกเลื่อนเข้าจอเมื่อได้โฟกัส (/guides, /notes ที่ 360 และ 320@200) |
| A5 | กลาง | 1.4.10 | 320@200 หน้าแรก: รายการในแผ่นครึ่งจอสูงแค่ 80px ปุ่มสูง 360px กรอบโฟกัสจึงถูกตัด |
| A6–A12 | ต่ำ | | /contribute ช่องตัวเลขยังเตือนเป็นภาษาอังกฤษ; เลขในวงสถานีล้นวงที่ 200%; เบอร์โทรตัดบรรทัดตรงขีด; `.step-when` อ่านต่อกับหัวโดยไม่มีตัวคั่น; MarkDone บอกสถานะซ้ำและมีช่องว่างเกินหน้า ":"; `list-style:none` ควรมี `role="list"`; attribution สูง 14px และ skip link 42px |

## What works (all three)

- ขั้นเป็นสถานีบนเส้นสีหมวด: หัวขั้นสั้น → วิธีทำ → "พูดว่า" → 💡 อ่านง่ายบนมือถือ และโดมบอกว่า "ดูเป็นผลิตภัณฑ์จริง"
- screen reader อ่าน "ขั้นที่ n: …" เป็น h3 ตัวเลขในวงถูกซ่อน อ่าน "เคล็ดลับ:" นำหน้าเคล็ดลับ และการ์ดข้อเท็จจริงอ่านเป็นคู่ term/definition
- ข้อความใหม่บนพื้นจางผ่าน contrast ทั้งหมด ("พูดว่า" 5.8–7.7)
- MarkDone ท้ายวิธีซิงก์กับ /checklist และจำค่าได้หลังรีโหลด
- 1669 และ 1323 อยู่บนสุดของ "ถ้าป่วย" โทรได้ทันที
- ไม่มีเลื่อนแนวนอนและไม่มี JS error ทุกหน้าทุกขนาดจอ บนเน็ต 50KB/s เปิดหน้าวิธีได้ใน ~1s

## Questions for the owner

- **Q1: will cards and shadows be the look of the whole site, or only of Guide pages?** (D3)
  - a) only Guide pages; merge the "ไปต่อ" link cards into one style and the stations into one size; update the globals.css header comment. **Recommended.**
  - b) the whole site: the Guides list, Feed Notes and link cards all become cards.
  - c) take the Guide page back to white, with cards kept only for "เตรียมให้พร้อม" and options.
- **Q2: how should prices on a Guide page look?** (D2)
  - a) the same `Price` component as the Place card: yellow strip and the agreed web-price label. **Recommended.**
  - b) keep the white cards but give the number a yellow underline.
  - c) remove prices from the fact cards.
- **Q3: the Guide photo on desktop?** (D1)
  - a) cap its height at about 240px with object-fit: cover, and shorten the head where the intro repeats the summary. **Recommended.**
  - b) put the photo beside the head text at ≥1024px.
  - c) move the photo below the steps.
- **Q4: fill in the missing Guide content (G1, G2, G5)?**
  - a) send a sub-agent to research: Rabbit card fee, top-up and student discount; wash and dry times; the Chula hospital ER entrance and cost; a pharmacy open late. Label web data "ข้อมูลจากเว็บ" and leave out anything unconfirmed. Add the after-hours non-emergency option, the bring list and what to say when calling 1669 to "ถ้าป่วย". **Recommended.**
  - b) change only the structure and wording now; wait for the team to go and check the numbers.
- **Q5: the reference point for getting into Chula?** (G3)
  - a) keep คณะอักษรฯ.
  - b) use a landmark everyone knows (such as the auditorium or ศาลาพระเกี้ยว) with a directions link. **Recommended**, if the research can confirm the route.
  - c) split by faculty zone.

To be fixed without asking, since each has only one correct answer: A1–A12, D5–D7, D10–D15, G4, G6–G8, P6 (plain bullets instead of boxes), and the links from to-chula to the Pop Bus Guide.
