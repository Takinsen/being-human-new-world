# ตรวจ Accessibility / Responsive / Interaction / Motion — ตั้งหลัก (prod :3005)

ขอบเขต: 11 หน้าตามโจทย์ (notes filter param จริงคือ `?line=`). เครื่องมือ: Playwright + axe-core (inject), ไม่แก้ repo.
หลักฐานภาพ: `audit7/a11y/`. สคริปต์: `audit7/t1.js`–`t20.js`.

## สรุปสิ่งที่ผ่าน (ไม่รายงานซ้ำเป็น finding)
- axe-core ที่ 390px ทุกหน้า: violation จริงมีข้อเดียว (A2). Console: ไม่มี error/warning/hydration นอกจาก tile map ที่ถูก block (ERR_FAILED บน `/` และ `/?place=`) ซึ่งคาดไว้.
- Landmarks: main + nav[เมนูหลัก] + footer ครบ, h1 หน้าละ 1, ลำดับ heading ไม่ข้ามระดับ, skip link 2 อัน (`#main`, `#menu`) มีปลายทางจริงทุกหน้า. รูป Open Peeps ไม่มี `<img>` ที่ alt หาย/ซ้ำซ้อน; svg ตกแต่งเป็น aria-hidden.
- Keyboard: Tab ทุกหน้าไม่ติดกับดัก, ไม่มีองค์ประกอบ inert ได้ focus, outline ทุกตัว >=2px (ไม่มี element ไร้ focus indicator), ไม่มีเนื้อหาที่ถูก tab bar บัง (เมื่อรอ smooth scroll จบ).
- Wordmark paper บน `--leaf-dark`: 5.33:1 (ตัวอักษรอยู่บนใบเข้มจริงที่ 320/390/768/1280, ดูภาพ `B-wordmark-*.png`); home ink บนใบ >=13.7:1. ink-soft บน paper 6.17, บน ground 5.57. Placeholder `#757575` บน paper ~4.53. ผลคำนวณ "ต่ำ" จาก tab bar/tagline/week-next เป็น false positive ของ `color-mix`/`color()` (วัดจริงด้วย pixel: 5.70 และ 6.11).
- Overflow แนวนอน: ไม่มีที่ 320/360/390/768/1024/1280/1440 ทุกหน้า. Zoom 200% (320px+root 32px) และ 640@DPR2: ไม่มี scrollX ยกเว้น A4. Chip row เลื่อนแนวนอนในกล่องตัวเอง (ตั้งใจ).
- prefers-reduced-motion: reduce → `document.getAnimations()` = 0 ทุกหน้า (sway, rise-in, rise-up, pop หยุด; scroll-behavior เป็น auto). ปกติมี 2–14 animation.
- ฟอร์ม: ทุก input มี `<label>` (labels.length=1), radio หมวดอยู่ใน fieldset/legend, submit ว่างได้ native message ภาษาไทยและ focus ไปที่ field แรกที่ผิด. Checkbox checklist 40px แต่ label 44x44 ผ่าน.

## Findings

### A1 [สูง] error จาก server ไม่เห็น + focus หลุดไป `<body>` หลัง submit ผิดพลาด
- หน้า/viewport: `/notes/new` และ `/contribute` (ฟอร์ม ตรวจราคา ฯลฯ), 390x844
- วิธีทำซ้ำ: `/notes/new` ใส่โน้ตเป็นช่องว่างล้วน + เลือกหมวด/ชื่อ/บ้านเกิด, focus ปุ่ม แล้วกด Enter. `/contribute` ฟอร์มแรก: เลือกที่ + min=5 + by="   ".
- วัดได้: หลัง action จบ `document.activeElement === BODY` (ปุ่ม `disabled={pending}` ทำให้ blur แล้ว focus ไม่ถูกคืน); กด Tab ต่อไปที่ "แผนที่" (tab bar ท้ายหน้า) ไม่ใช่ field/error. ข้อความ error (`.form-status`) อยู่ top=895 / 984 > viewport 844, scrollY≈0 → ผู้ใช้สายตาปกติบนมือถือกดแล้ว "ไม่มีอะไรเกิดขึ้น". ข้อความ `เขียนโน้ตและใส่ชื่อก่อน` / `กรอกที่ ราคา และชื่อคนตรวจให้ครบ`. ภาพ: `F-notes-new-after-error-focus.png`, `F-contribute-after-error.png`.
- WCAG: 3.3.1 Error Identification, 2.4.3 Focus Order, 4.1.3 Status Messages (notes/new ใช้ `role="alert"` บน element ที่สลับ `hidden` — การประกาศไม่น่าเชื่อถือกว่า region ที่ render ไว้ก่อน; contribute ใช้ `role="status"` สำหรับ error)
- แก้:
  1. `app/notes/new/NoteForm.tsx` และ `app/contribute/ContributeForms.tsx` (`Status`): เก็บ ref ของ `<p className="form-status">` ใส่ `tabIndex={-1}` และใน `useEffect(() => { if (state) ref.current?.focus({ preventScroll: false }); }, [state])` (หรือ `scrollIntoView({block:"center"})` + focus). แล้ว focus จะเห็น error และอ่านออกเสียงได้.
  2. ไม่ใช้ `hidden` toggle กับ `role="alert"`: render `<p role="alert">` ไว้เสมอ แล้วใส่ข้อความตอนมี state; `Status` ใน contribute เปลี่ยน error เป็น `role="alert"` (success คง `status`).
  3. CSS `.form-status { scroll-margin-bottom: 6rem; }` ให้พ้น tab bar (sticky สูง 60px).

### A2 [กลาง] ตัวอักษรเล็ก `ต่อใบ` / `ต่อเที่ยว` ใน price mark ตัดกันไม่พอ
- หน้า/viewport: `/guides/rabbit`, 390 (axe color-contrast, serious, 2 nodes): `.price > mark > small`
- วัดได้: ink-soft `#59616c` บนพื้น mark `#ffd100` = 4.29:1 (ต้อง 4.5), ขนาด 14px/10.5pt ปกติ.
- WCAG 1.4.3
- แก้: `app/globals.css` (`.price-strip small` บรรทัด 555 ไม่ได้ตั้งสี จึงรับ ink-soft จาก rule อื่น) เพิ่ม `.price-strip small { color: var(--ink); }` หรือ `.price mark small { color: var(--ink); }` (ink บน #ffd100 ≈ 11:1). ตรวจ `.price-pending`/`.detail .price`/`.guide-facts .price` ที่ใช้ mark เดียวกันด้วย.

### A3 [ต่ำ] เป้าสัมผัสที่ต่ำกว่า 44px (390 กว้าง) — ทุกตัว ≥24px จึงผ่าน WCAG 2.5.8 AA แต่ไม่ถึงเป้า 44
| selector | หน้า | ขนาดวัด |
|---|---|---|
| `a.line-chip` (ในแถว `.feed-filters`/`.page-head .line-filters`) | /guides, /notes, /notes?line= | ปุ่ม 36px สูง; พื้นที่กดจริง (elementFromPoint) ประมาณ -3px..+38px = ~41px ไม่ถึง 44 เพราะ `::after{inset:-4px 0}` ถูก clip ด้วย `overflow-x:auto` และ padding กล่อง 2px บน |
| `.note-by a` (พี่บอส / พี่แทน) | /notes | 39x46 และ 41x46 (กว้าง <44) |
| `a.tel` (1669, 1323) | /guides/sick | 38x49, 40x51 (กว้าง <44) |
| `.leaflet-control-attribution a` (Leaflet, OpenStreetMap) | / , /?place= | 51x27, 85x27 |
- WCAG 2.5.8 (ผ่าน), เป้าหมายโปรเจกต์ 44px
- แก้ (`app/globals.css`): chip: `.feed-filters, .page-head .line-filters { padding: 4px var(--gutter) 4px; }` (แทน `2px … var(--space-1)`) เพื่อให้ `::after` ไม่ถูกตัด. `.note-by a, .guide .tel { display:inline-block; min-width:44px; text-align:center; }` (หรือ `padding-inline: 4px` + `margin-inline:-4px`). Attribution: `padding-block: 8px` ที่ `.explorer-map .leaflet-control-attribution a` (บรรทัด 838).

### A4 [ต่ำ] ซูม 200% ที่ 320px: รายการวิธีล้น 6px และ tab bar กินจอ 23%
- `/guides`, viewport 320x568 + root font-size 32px: `document.documentElement.scrollWidth = 326 > 320`. ต้นเหตุ `.guide-list li`/`a` กว้าง 310px เริ่มที่ x=16 (container 288) เพราะ flex item text (`<span>` กว้าง 182) มี min-content ใหญ่ (`min-width:auto`). ภาพ `Z-z200-320-guides-list.png`.
- ที่ขนาดเดียวกัน `.tab-bar` สูง 132px จาก 568 (23%) เพราะ label "สัปดาห์แรก" ตัดสองบรรทัด (ภาพ `Z-z200-320-tabbar.png`); 150% ที่ 390 → 99px.
- WCAG 1.4.10 Reflow (ล้นเล็กน้อย)
- แก้: `app/globals.css` ~1589: `.guide-list li { min-width: 0; } .guide-list a > span { min-width: 0; overflow-wrap: anywhere; }`. Tab bar: `.tab-bar a { font-size: min(var(--step--1), 0.8rem); }` หรือที่ breakpoint ซูม (`@media (max-width: 400px) and (min-resolution: 2dppx)`) ซ่อน label ยกเว้นหน้าปัจจุบัน — เป็นทางเลือก ไม่บังคับ.

## ไม่พบ (ตรวจแล้วไม่มี)
ปัญหา hydration, ปุ่มลำดับ tab ผิด, heading ข้ามระดับ, alt ซ้ำ/หาย, ล้นแนวนอนที่ 7 ความกว้าง, animation ที่ไม่หยุดเมื่อ reduced-motion. Canopy `sway` (4px/4%, วนไม่สิ้นสุด) ถูก gate ด้วย `no-preference` จึงไม่รายงานเป็น 2.2.2.
