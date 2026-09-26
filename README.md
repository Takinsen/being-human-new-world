# ตั้งหลัก

บ้านยังเป็นบ้าน ที่นี่คือที่ตั้งหลัก: Starter pack สำหรับคนที่เพิ่งย้ายมาอยู่แถวจุฬาฯ
โปรเจกต์กลุ่มวิชา Being Human in the Age of AI

- คำศัพท์ของโปรเจกต์: `CONTEXT.md`
- การตัดสินใจหลัก: `docs/adr/`
- Spec และงานที่เหลือ: `.scratch/tanglak-mvp/`

## รันในเครื่อง

```bash
npm install
npm run dev   # http://localhost:3000
```

### ต่อ Google Sheet (ฟอร์มช่วยเติมข้อมูล)

โน้ตที่เขียนผ่านหน้า `/notes/new` และข้อมูลที่กรอกผ่านหน้า `/contribute` (ไม่มีลิงก์บนเว็บ ให้ทีมเปิดเองตอน demo และเพิ่มเรื่องรุ่นพี่ได้อย่างเดียว แก้เรื่องเดิมไม่ได้) เก็บใน Google Sheet (ดู `docs/adr/0005-google-sheet-as-the-store.md`)

1. สร้าง Google Sheet ใหม่ แล้วเปิด **Extensions → Apps Script**
2. ลบโค้ดเดิม วางโค้ดจาก `sheet/apps-script.gs` แล้วกดบันทึก
3. กด **Deploy → New deployment** เลือกชนิด **Web app** ตั้ง *Execute as* = **Me** และ *Who has access* = **Anyone** แล้วกด Deploy (ครั้งแรก Google จะขอสิทธิ์ ให้กดอนุญาต)
4. copy ลิงก์ที่ลงท้ายด้วย `/exec` ใส่ใน `.env.local` (ดูตัวอย่างใน `.env.example`) และใน Environment Variables ของ Vercel

```
SHEET_API_URL=https://script.google.com/macros/s/XXXX/exec
```

แท็บ `prices`, `notes`, `seniors`, `guides` จะถูกสร้างเองตอนมีคนกรอกครั้งแรก จะแก้หรือลบแถวใน Sheet ตรงๆ ก็ได้ (ลบโน้ตที่ไม่เหมาะสมก็ลบแถวในแท็บ `notes`)

ถ้าเคย deploy Apps Script เวอร์ชันก่อนหน้าไว้แล้ว ให้วางโค้ดใหม่จาก `sheet/apps-script.gs` แล้วกด **Deploy → Manage deployments → แก้ไข (ไอคอนดินสอ) → Version: New version → Deploy** ลิงก์ `/exec` จะเหมือนเดิม ถ้าไม่ตั้ง `SHEET_API_URL` เว็บจะใช้ข้อมูลใน `content/` อย่างเดียว

## แก้เนื้อหา

เนื้อหาทั้งหมดอยู่ใน `content/` แก้ไฟล์เหล่านี้ได้เลย ไม่ต้องแตะ component

| ไฟล์ | เนื้อหา |
| --- | --- |
| `content/places.ts` | ที่ต่างๆ บนแผนที่ พร้อมราคาและข้อควรระวัง |
| `content/guides.ts` | วิธีทำเรื่องต่างๆ ที่ทีมเขียน |
| `content/seniors.ts` | รุ่นพี่และเรื่องปีแรกของรุ่นพี่ |
| `content/notes.ts` | โน้ตตั้งต้นจากบทสัมภาษณ์ (โน้ตที่คนเขียนบนเว็บอยู่ใน Sheet) |
| `content/checklist.ts` | เช็กลิสต์สัปดาห์แรก |
| `content/help.ts` | ช่องทางขอความช่วยเหลือ |

รูปใส่ได้ที่ `photo: { file: "ชื่อไฟล์บน Wikimedia Commons", alt: "คำอธิบายรูป" }` ไอคอนของแต่ละวิธีเลือกจากชื่อใน `components/icons.tsx`

หน้าตาของเว็บ: แนวแผนผังรถไฟฟ้า ดู `design/board-d.html` (ภาพที่ approve แล้ว)

ถ้าจะให้ราคาขึ้นเป็นตัวเลข ต้องใส่ `checked: { on: "2026-09", by: "boss" }` ด้วย ถ้าไม่ใส่ เว็บจะแสดงว่า "รอตรวจราคา" (ADR 0001)
