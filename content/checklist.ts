import type { ChecklistItem } from "./types";

// Starter Checklist: first week. Ids are stored in the browser, so don't rename them.
// Each title promises only what its link teaches (UX audit 7, U3).
export const firstWeek: ChecklistItem[] = [
  { id: "to-chula", title: "รู้ทางจากรถไฟฟ้าเข้าจุฬาฯ", href: "/guides/to-chula", category: "transport" },
  { id: "rabbit", title: "ทำบัตร Rabbit (ถ้านั่ง BTS ทุกวัน)", href: "/guides/rabbit", category: "transport" },
  { id: "bus", title: "ขึ้นรถป๊อปฟรีของจุฬาฯ เป็น", href: "/guides/pop-bus", category: "transport" },
  { id: "normal-price", title: "รู้ว่าข้าวจานเดียวแถวนี้ราคาปกติเท่าไหร่", href: "/guides/eat-cheap", category: "food" },
  { id: "laundry", title: "ซักผ้าหยอดเหรียญเองได้ 1 รอบ", href: "/guides/coin-laundry", category: "living" },
  { id: "water", title: "ตัดสินใจเรื่องน้ำดื่ม", href: "/guides/drinking-water", category: "living" },
  { id: "sick", title: "รู้ว่าถ้าป่วยต้องไปที่ไหน", href: "/guides/sick", category: "living" },
  { id: "senior-story", title: "อ่านเรื่องของรุ่นพี่อย่างน้อย 1 เรื่อง", href: "/seniors" },
];
