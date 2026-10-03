import type { ChecklistItem } from "./types";

// Starter Checklist: first week. Ids are stored in the browser, so don't rename them.
// Each title promises only what its link teaches (UX audit 7, U3).
export const firstWeek: ChecklistItem[] = [
  { id: "to-chula", title: "รู้ว่าลงรถไฟฟ้าแล้วเข้าจุฬาฯ ยังไง", href: "/guides/to-chula", category: "transport" },
  { id: "rabbit", title: "ทำบัตร Rabbit ถ้าต้องนั่ง BTS ทุกวัน", href: "/guides/rabbit", category: "transport" },
  { id: "bus", title: "ลองขึ้นรถป๊อป รถฟรีของจุฬาฯ", href: "/guides/pop-bus", category: "transport" },
  { id: "normal-price", title: "รู้ว่าข้าวจานหนึ่งแถวนี้ควรราคาเท่าไหร่", href: "/guides/eat-cheap", category: "food" },
  { id: "laundry", title: "ซักผ้าหยอดเหรียญเองให้ได้สักรอบ", href: "/guides/coin-laundry", category: "household" },
  { id: "water", title: "เลือกว่าจะกินน้ำแบบไหน", href: "/guides/drinking-water", category: "household" },
  { id: "sick", title: "รู้ไว้ก่อนว่าไม่สบายแล้วไปไหน", href: "/guides/sick", category: "health" },
  { id: "rights", title: "เช็กว่าเราใช้สิทธิ์รักษาอะไรได้", href: "/guides/rights", category: "health" },
  { id: "home-taste", title: "ลองกินร้านรสชาติบ้านสักร้าน", href: "/guides/home-taste", category: "food" },
  { id: "senior-story", title: "อ่านเรื่องปีแรกของรุ่นพี่สักคน", href: "/seniors", category: "adjusting" },
];
