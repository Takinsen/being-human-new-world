import type { ChecklistItem } from "./types";

// Starter Checklist: first week. Ids are stored in the browser, so don't rename them.
export const firstWeek: ChecklistItem[] = [
  { id: "rabbit", title: "ทำบัตร Rabbit และรู้ค่ารถจากที่พักถึงจุฬาฯ", href: "/transport#rabbit", category: "transport" },
  { id: "bus", title: "รู้ว่าขึ้นรถป๊อปและรถเมล์ผ่านจุฬาฯ ยังไง", href: "/transport#pop-bus", category: "transport" },
  { id: "normal-price", title: "รู้ว่าข้าวจานเดียวแถวนี้ราคาปกติเท่าไหร่", href: "/food", category: "food" },
  { id: "laundry", title: "ซักผ้าหยอดเหรียญเองได้ 1 รอบ", href: "/living#coin-laundry", category: "living" },
  { id: "water", title: "ตัดสินใจเรื่องน้ำดื่ม", href: "/living#drinking-water", category: "living" },
  { id: "sick", title: "รู้ว่าถ้าป่วยต้องไปที่ไหน", href: "/living#sick", category: "living" },
  { id: "senior-story", title: "อ่านเรื่องของรุ่นพี่อย่างน้อย 1 เรื่อง", href: "/seniors" },
];
