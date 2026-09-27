# UX/UI audit 2: after the audit-1 fixes (2026-09-27)

Three agents tested a production build of `dcda03c` in Chromium against the stand-in Sheet, at 390×844, 360×640 (125% text, 50KB/s), 320px at 200%, 1280×800 and 1920×1080:

- **Design:** spacing, layout, hierarchy, images
- **บอส / แทน:** Newcomers doing real tasks
- **Accessibility and projector**

The owner's four observations were checked first:

1. Spacing is cramped.
2. The tab bar floats up on Guide pages, and Guides have few images.
3. The Place card needs a better layout.
4. The Notes header buttons and chips look random.

All four were confirmed. Map tiles and Wikimedia photos could not load in the sandbox. Test Notes went to the stand-in Sheet only.

Previous: `ux-audit.md`.

## Owner's four, with root causes

| # | ปัญหา | สาเหตุ | ใครเจอ |
|---|---|---|---|
| O1 | Spacing เบียดและไม่สม่ำเสมอ | ใน globals.css ใช้ค่า px 18 ค่า และ rem/em อีก 12 ค่า ไม่มี scale ร่วมกัน มีค่าคี่ 10/14/18 กฎบางตัวประกาศซ้ำ (`.price`, `.caution`, `.explorer-top`) ขั้นตอนในวิธีห่างกันแค่ gap 8px | Design, บอส, แทน |
| O2a | แถบเมนูลอยกลางจอในหน้าที่สั้น (11–12 หน้าวิธี, /checklist, /notes?place=) เช่น /guides/rubbish แถบอยู่ที่ y=483 จาก 844 | `.tab-bar{position:sticky;bottom:0}` แต่ body ไม่ได้สูงเต็มจอ มีแค่หน้าแผนที่ที่ใช้ flex 100dvh | ทั้ง 3 |
| O2b | วิธีแทบไม่มีรูป มีข้อมูลรูปแค่ 2/14 วิธี (pop-bus, taxi) และถ้าโหลดไม่ได้ ช่องรูปจะหายไป | content/guides.ts; Photo.tsx คืนค่า null | ทั้ง 3 |
| O3 | การ์ดที่: 7/10 ที่มีข้อมูลรูปแต่การ์ดไม่แสดง ปุ่มนำทางและเขียนโน้ตตกอยู่ใต้จอ "อ่านเพิ่ม" ดูเด่นเท่าปุ่มหลัก ราคา ป้ายตรวจ และคำอธิบายชิดกันเกินไป ถ้าเปิดลิงก์ `?place=` ตรงๆ หัวการ์ดมีกรอบโฟกัสดำเหลืองค้าง | PlaceDetail.tsx ไม่ใช้ Photo; ระยะในการ์ดปนกัน 4–16px; focus-visible บน h2 | Design, บอส, แทน, a11y |
| O4 | /notes: ปุ่มทึบกับลิงก์ขีดเส้นใต้ 2 อันอยู่แถวเดียวกันแต่แนวไม่ตรงกัน ชิปตัดเป็น 3+1 โน้ตอันแรกเริ่มที่ y≈540 | `.head-actions{gap:8px 20px}` + `.related-link{margin-top:8px}`; `.feed-filters` ไม่ได้ตั้ง nowrap | Design, บอส, แทน |

## Other findings

| # | ระดับ | ปัญหา | ใครเจอ |
|---|---|---|---|
| N1 | สูง | "จากสยามไปจุฬาฯ เท่าไหร่" ยังต้องต่อข้อมูลเอง: "รถป๊อปฟรี" อยู่ใน "อ่านเพิ่ม" การ์ดสถานีไม่ลิงก์ไปวิธี "จากรถไฟฟ้าเข้าจุฬาฯ" และไม่บอกว่าป้ายรถป๊อปอยู่ไหน | บอส |
| N2 | สูง | จอเล็กตัวอักษรใหญ่: เปิดการ์ดแล้วเห็นแค่ชื่อกับ 2 บรรทัด ต้องขยายเต็มจอก่อน ที่ 320px 200% แถบเมนูสูง 133px เหลือแผนที่ราว 106px และชิปหลุดขอบโดยไม่มีอะไรบอกว่าเลื่อนได้ | แทน, a11y |
| N3 | กลาง | จอกว้าง: แถบเมนู 480px ทำให้มีแถบขาวข้างๆ บนหน้าแผนที่ และเห็นตัวหนังสือโผล่สองข้างบนหน้าเนื้อหา ตัวอักษรบนจอฉาย 1920 ยังเล็ก แผงแผนที่ 380px มีที่ว่างเยอะ | Design, a11y |
| N4 | กลาง | ฟอร์มที่ 320px 200% ล้นจอแนวนอน (`.form-row minmax(12rem,1fr)`) | a11y |
| N5 | กลาง | ขนาด wordmark ไม่เท่ากันทุกหน้า หน้าวิธีไม่ได้ใช้ PageHead | Design |
| N6 | กลาง | วิธี "กินให้อิ่มในงบ" บอกว่า "ที่ไหนถูกที่สุด" แต่ไม่มีชื่อร้านหรือราคา รายการของกินไม่เรียงตามราคา | บอส |
| N7 | กลาง | เรื่องป่วยและนักจิตวิทยาซ่อนอยู่ลึก (Wellness อยู่ท้าย /seniors) และ chula.wellness.in.th ไม่ใช่ลิงก์ | แทน |
| N8 | กลาง | ลิงก์ย้อนกลับอ่านว่า "วิธีหมวดของกิน" (ไม่มีเว้นวรรค) | บอส, แทน |
| N9 | ต่ำ | หัวแผ่นเขียน "หมวดการเดินทาง" ทั้งที่ไม่ได้เลือกชิปไหน ทำให้สับสน | บอส |
| N10 | ต่ำ | หลังโพสต์บน Feed ข้อความ "อยู่บนสุด" ขึ้นแต่โน้ตยังอยู่ใต้จอ บนแผนที่ แผ่นล่างบังโน้ตใหม่ครึ่งหนึ่ง | แทน, a11y |
| N11 | ต่ำ | ไม่มีลิงก์ข้ามไปเนื้อหา หน้าแรกต้องกด Tab ~32 ครั้งถึงแถบเมนู Esc ไม่ปิดการ์ด ชื่อปุ่มในรายการอ่านชื่อกับคำอธิบายติดกัน | a11y |
| N12 | ต่ำ | ปุ่มซูม Leaflet 30px, attribution 14px | a11y |
| N13 | ต่ำ | ลิงก์รสชาติบ้านตัดบรรทัดห่างมาก (line-height 44px) | Design |
| N14 | ต่ำ | label ชิดช่องกรอก ปุ่มส่งเตี้ย | Design |
| N15 | ต่ำ | โน้ตรุ่นพี่ไม่มีวันที่ แต่โน้ตใหม่มี คำแนะนำในหน้าสัปดาห์แรกซ้ำ 2 ที่ | บอส, แทน |

## What works (all three)

- ชิปหมวดทำงานถูก ราคาขึ้นในรายการ ปุ่ม "อ่านเพิ่ม" ดูเป็นปุ่มแล้ว
- ลงโน้ตไม่ถึง 1 วินาที แล้วกลับไปเจอการ์ดที่มีข้อความยืนยัน ข้อความเตือนเป็นภาษาไทย
- เปลี่ยนหน้าแล้วเปิดที่บนสุดเสมอ
- contrast ผ่านทุกหน้า (ต่ำสุด 4.66) ทุกหน้ามี h1 เดียว มี landmark และชื่อปุ่มครบ โฟกัสถูกที่ทั้งตอนเปิดการ์ด ตอนย้อนกลับ และหลังโพสต์
- ระบบสีประจำหมวดใช้สม่ำเสมอ แถบราคาเหลืองอ่านง่าย แถบหัวหมวดในหน้าวิธีจัดกลุ่มชัด
- เน็ตช้า หน้าแรกโหลดใน 4.4 วินาที

## Proposed spacing scale (Design)

`--space-1:4px` (icon↔text, label↔input), `--space-2:8px` (inside a group), `--space-3:12px` (between items), `--space-4:16px` (between sub-groups, gutter), `--space-5:24px` (between sections), `--space-6:32px` (page head↔content), `--space-7:48px` (between big sections). 6→4/8, 10 and 14→12/16, 18 and 20→16/24, 28 and 36→32.

Screenshots and scripts: scratchpad `audit3/{design,personas,a11y}/` of the session that ran this audit.
