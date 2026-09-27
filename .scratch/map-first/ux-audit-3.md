# UX/UI audit 3: after the audit-2 fixes (2026-09-27)

Three agents tested a production build of `f07ca0a` (same as main) in Chromium against the stand-in Sheet:

- **Design:** at 390×844, 1280×800 and 1920×1080, with Bai Jamjuree served locally.
- **Personas:** บอส at 390×844; แทน at 360×640 with 125% text and 50KB/s; โดม at 1280×800, walking through the demo.
- **Accessibility:** 22 pages × 5 viewports, including 320px at 200%.

Map tiles and Commons photos could not load in the sandbox. The test Notes marked "(ทดสอบ audit4)" went to the stand-in Sheet only.

Previous: `ux-audit.md`, `ux-audit-2.md`.

## Bugs

| # | ระดับ | ปัญหา | ใครเจอ |
|---|---|---|---|
| R1 | สูง | ถ้ารูปโหลดไม่ขึ้นก่อน hydrate จะไม่สลับไปใช้ภาพประกอบ แต่ขึ้นไอคอนรูปเสีย ข้อความ alt และเครดิตสีขาวบนพื้นเทา (contrast 1.31:1) เกิด 5/20 และ 11/24 ครั้งที่โหลด บนเว็บจริงจะเจอเมื่อชื่อไฟล์ Commons ผิด สาเหตุคือ `onError` ของ Photo.tsx ยังไม่ทำงานตอนนั้น | Design, a11y |
| R2 | กลาง | ปุ่มซูมยังเป็น 30px เพราะ leaflet.css โหลดทีหลังจึงชนะ และชื่อปุ่มเป็นภาษาอังกฤษ | a11y |
| R3 | กลาง | หลังลงโน้ต โฟกัสไปอยู่ที่ body ข้อความ "ขึ้นแล้ว" อยู่ขอบแผ่น และตัวโน้ตอยู่ใต้จอ ทั้งบนมือถือและ 1280 บน Feed ข้อความยืนยันเลื่อนพ้นจอไปแล้ว | a11y, บอส, โดม |
| R4 | กลาง | หมุดและไอคอนในรายการของโรงพยาบาลเป็นเครื่องซักผ้า แต่การ์ดของที่เดียวกันเป็นกล่องยา | Design |
| R5 | กลาง | รูปแทนหน้าพี่แทนขึ้นเป็นตัว "แ" เพราะตัดตัวแรกของชื่อแล้วได้สระหน้า (SeniorStory.tsx:8) | Design, โดม |
| R6 | กลาง | เลื่อนแนวนอนได้: /seniors ที่ 360@125% (ลิงก์ chula.wellness.in.th) และหัวข้อยาวที่ 320@200% | แทน, a11y |
| R7 | ต่ำ | footer หดเหลือ 455px บนจอคอม มีเส้นคั่นซ้อน 2 เส้นใน /notes/new และ /contribute | Design |
| R8 | ต่ำ | /contribute ข้อความเตือนยังเป็นภาษาอังกฤษ | a11y |

## Layout and design

| # | ระดับ | ปัญหา | ใครเจอ |
|---|---|---|---|
| L1 | สูง | ภาพประกอบแทนรูปเป็นของใหญ่สุดบนจอ แต่ไม่ให้ข้อมูลอะไร ดูเหมือนรูปยังโหลดไม่เสร็จ ที่ 1280 กว้าง 688×387 ดันขั้นตอนลงใต้จอ ในแผงที่บนจอคอมก็ดันคำอธิบายลง | Design, โดม, แทน |
| L2 | กลาง | การ์ดบนมือถือเสียพื้นที่ 104px ให้หัวแผ่น "รายละเอียด" (คำที่ไม่บอกอะไร) กับแถว "← ทุกที่บนแผนที่" ก่อนถึงชื่อ | Design |
| L3 | กลาง | หมุดจมใต้แถวชิปหรือใต้แผ่นล่าง: pad บน 80px แต่แถบลอยสูง 114px หมุดที่ได้โฟกัสก็ไม่ถูกเลื่อนเข้าจอ | Design, a11y, บอส |
| L4 | กลาง | /notes: ชิป "ทั้งหมด" ที่ถูกเลือกกับปุ่ม "เขียนโน้ต" หน้าตาเหมือนกัน | Design |
| L5 | กลาง | ลิงก์ย้อนกลับมี 3 แบบ และ /seniors ไม่มีเลย /notes?place= ยังใช้ h1 ว่า "โน้ต" /checklist ไม่ได้ใช้ PageHead | Design |
| L6 | กลาง | ชิปที่เลื่อนได้: Tab ไปชิปตัวสุดท้ายแล้วชิปไม่เลื่อนเข้าจอ ชิปยังจางอยู่ตอนโฟกัส กรอบโฟกัสถูกตัดขอบบน และชิปบนแผนที่เหลือแค่เส้นเหลือง | a11y |
| L7 | กลาง | 320@200%: แผ่นเต็มจอสูงกว่าพื้นที่จริง (ใช้ innerHeight) หัวแผ่นหลุดขอบบน scroll-padding 88px ไม่พอกับแถบเมนูสูง 133px กด Esc แล้วโฟกัสกลับไปที่รายการนอกจอ | a11y |
| L8 | ต่ำ | ลิงก์เบอร์โทรในย่อหน้าสูง 44px ทำให้บรรทัดห่างไม่เท่ากัน ลิงก์ 1669 ในการ์ดสูงแค่ 19px ปุ่มเบอร์โทรกับปุ่มเว็บของ Wellness ติดกัน | Design, a11y, โดม |
| L9 | ต่ำ | "สัปดาห์แรก" ในกล่องต้อนรับยังตัดกลางคำบนจอคอม | Design |
| L10 | ต่ำ | globals.css: selector 31 ตัวประกาศซ้ำ มุมโค้ง 9 ค่าไม่มี token ขนาดตัวอักษร 7 ค่าอยู่นอก scale มีกฎที่ไม่ได้ใช้แล้ว และ comment หัวไฟล์ยังบอกว่า "nothing sits in a card" | Design |
| L11 | ต่ำ | ข้อความ "แสดง 10 ที่" ถูกอ่านก่อน h1 กล่องแผนที่ชื่อ "Leaflet \| © OpenStreetMap" attribution สูง 14px | a11y |
| L12 | ต่ำ | เน็ตช้า: แตะแล้ว 1.8–3.7 วินาทีไม่มีอะไรบอกว่ากำลังโหลด | แทน |
| L13 | ต่ำ | เปิดที่แล้วแผนที่ซูมจนเหลือหมุดเดียว | โดม |

## Content and trust

| # | ระดับ | ปัญหา | ใครเจอ |
|---|---|---|---|
| C1 | สูง | ชิป "มีโน้ต" ได้ 0 ที่ ข้อความบอก "ในหมวดที่เลือก" ทั้งที่ไม่ได้เลือกหมวด (ยังค้างจาก A1) | บอส, โดม |
| C2 | สูง | Feed มีแต่โน้ตความรู้สึก 8 อันจากพี่บอสกับพี่แทน ซ้ำกับหน้ารุ่นพี่ ไม่มีวันที่ (ยังค้างจาก A5, N15) | ทั้ง 3 |
| C3 | กลาง | "ตรวจ ก.ย. 69 โดยทีมตั้งหลัก (ข้อมูลจากเว็บ)" คำว่า "ตรวจ" ขัดกับ "ข้อมูลจากเว็บ" | บอส, โดม |
| C4 | กลาง | เช็กลิสต์สัญญา "ค่ารถจากที่พักถึงจุฬาฯ" และ "ข้าวจานเดียวราคาปกติ" แต่วิธีที่ลิงก์ไปไม่มีตัวเลขเลย โรงอาหารคณะก็ไม่อยู่บนแผนที่ | บอส |
| C5 | กลาง | การ์ด BTS ไม่บอกทางออกหรือเวลาเดิน และไม่บอกว่ารถป๊อปสาย 4 ไม่วิ่งวันเสาร์ | บอส |
| C6 | กลาง | อาหารใต้มีร้านเดียว ราคา 120–250 บาท ไม่มีร้านราคานักศึกษา | บอส |
| C7 | กลาง | หมวดอยู่คนเดียวมีแค่ 2 ที่ ไม่มีร้านซักผ้า ตู้น้ำ ร้านยา หรือศูนย์บริการสุขภาพ | แทน |
| C8 | ต่ำ | ป้ายรสชาติบ้านบนการ์ดไม่บอกว่า "ทีมหามาให้ลอง" โน้ตอันเดียวจากใครก็ได้ก็เปลี่ยนเป็น "…แนะนำ" | บอส |
| C9 | ต่ำ | ทางไปหาคนคุยตอนเหงามีแค่ในวิธี "ถ้าป่วย" หรือท้าย Feed | แทน |
| C10 | ต่ำ | รูปวิธีซักผ้าเป็นร้านในเท็กซัส | แทน |

## Demo path (โดม)

แผนที่ → ชิปของกิน → การ์ด BTS สยาม → เขียนโน้ต → Feed → วิธี "ถ้าป่วย" แล้วกดทำแล้ว → สัปดาห์แรก → รุ่นพี่

ตอนนี้ 3 ขั้นยังดูไม่ดี:
- หลังโพสต์ ไม่เห็นตัวโน้ต (R3)
- ใต้โน้ตใหม่ใน Feed เป็นโน้ตความรู้สึกไม่มีวันที่ (C2)
- หน้ารุ่นพี่ รูปแทนหน้าขึ้นเป็น "แ" และปุ่มติดกัน (R5, L8)

อย่ากด "มีโน้ต" ตอน demo จนกว่าทีมจะโพสต์โน้ตผูกกับที่ (C1)

## What works (all three)

- แถบเมนูอยู่ล่างสุดทุกหน้า
- การ์ดที่เรียงตามที่ตกลงไว้ กล่อง "เข้าจุฬาฯ" กับลิงก์ไปวิธีที่เกี่ยวข้องตอบคำถามเรื่องสถานีได้
- ของกินเรียงจากถูกไปแพง ลงโน้ตไม่ถึง 1.3 วินาที
- จอเล็กเปิดการ์ดเต็มจอให้เอง
- หัว Feed มีปุ่มเดียว สีเหลืองใช้กับราคาเท่านั้น
- skip link ใช้ได้ เปิดการ์ดเองแล้วโฟกัสที่ชื่อ เปิดจากลิงก์ไม่มีกรอบค้าง Esc ปิดการ์ดได้
- contrast ต่ำสุด 4.66 ไม่มี JS error

## Status (2026-09-27)

Decided with the owner:
- Q1: no stand-in box when there's no photo; the icon sits beside the title.
- Q2: web-sourced prices read "ข้อมูลจากเว็บ <เดือน> ยังไม่มีใครไปดูราคาจริง". ADR 0001 is amended and CONTEXT.md updated.
- Q3: on phones the sheet's top bar is the back button while a card is open.
- Q4: research in `content-research-2.md`. Only the CU Health Service Center qualified for a pin (Chamchuri 9, [กลาง]). BTS Siam exits and the Pop Bus stop were added, and line 4 is marked as not running on Saturdays. Fares and normal food prices are in the Guides, labelled as web data.

Fixed and checked in Chromium:
- R1: 0 broken figures in 8 loads.
- R2: zoom buttons are 44×44 with Thai titles.
- R3: after posting, focus goes to the status and the Note is in view.
- R4: the hospital and health-centre pins use the first-aid icon.
- R5: avatars read บ / ท.
- R6: no sideways scroll at 360@125%.
- R7, R8.
- L2–L9, L11, L12, L13.
- C1 (empty-state wording), C5, C8 ("ทีมหามาให้ลอง"), C9 (link under the map list), C10 (US laundry photo removed).

Open:
- C1 and C2: team members post their Notes (`team-notes-draft.md`).
- C6: no student-priced southern restaurant was found with a location.
- C7: no pharmacy, laundry or water machine could be confirmed open.
- L10: the duplicate selectors in globals.css are only partly cleaned. Radius tokens and the header comment are done.
