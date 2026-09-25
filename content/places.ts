import type { Place } from "./types";

// Coordinates and price ranges below are desk-research drafts.
// Before the pitch, walk each Place: fix the pin, confirm the price on the
// spot and fill in `price.checked`. Unchecked prices show "รอตรวจราคา".
export const places: Place[] = [
  // การเดินทาง
  {
    id: "mrt-samyan",
    name: "MRT สามย่าน",
    category: "transport",
    lat: 13.7324,
    lng: 100.5294,
    summary: "สถานีที่ใกล้ฝั่งสามย่านที่สุด มีทางเดินใต้ดินเชื่อมสามย่านมิตรทาวน์",
    knowhow: [
      "แตะบัตรเครดิตหรือเดบิตที่มีสัญลักษณ์ contactless ผ่านประตูได้เลย ไม่ต้องซื้อเหรียญ",
      "ใช้บัตรใบเดียวกันแตะทั้งตอนเข้าและตอนออก",
    ],
    price: { min: 17, max: 45, per: "ต่อเที่ยว" },
  },
  {
    id: "bts-siam",
    name: "BTS สยาม",
    category: "transport",
    lat: 13.7456,
    lng: 100.5347,
    summary: "สถานีเปลี่ยนสายสุขุมวิทกับสีลม เดินต่อหรือขึ้นรถป๊อปเข้าจุฬาฯ",
    knowhow: [
      "ถ้าขึ้นทุกวัน ทำบัตร Rabbit ดีกว่าซื้อตั๋วเที่ยวเดียว ไม่ต้องต่อคิวที่ตู้",
      "ช่วง 7:30–9:00 คนแน่นมาก เผื่อเวลาไว้อย่างน้อย 15 นาที",
    ],
    cautions: ["ยืนชิดขวาบนบันไดเลื่อน ฝั่งซ้ายเว้นให้คนเดินขึ้น"],
    price: { min: 17, max: 47, per: "ต่อเที่ยว" },
  },
  {
    id: "bts-national-stadium",
    name: "BTS สนามกีฬาแห่งชาติ",
    category: "transport",
    lat: 13.7466,
    lng: 100.529,
    summary: "ใกล้ฝั่งบรรทัดทองและหอพักแถวนั้น",
    knowhow: ["ลงสถานีนี้แล้วเดินเลียบถนนบรรทัดทองลงมาทางจุฬาฯ ได้"],
  },

  // ของกิน
  {
    id: "samyan-mitrtown-food",
    name: "ศูนย์อาหาร สามย่านมิตรทาวน์",
    category: "food",
    lat: 13.7338,
    lng: 100.5282,
    summary: "มีหลายร้านในที่เดียว แอร์เย็น เปิดดึก นั่งอ่านหนังสือต่อได้",
    knowhow: ["แลกบัตรหรือเติมเงินที่เคาน์เตอร์ก่อนสั่ง เงินที่เหลือคืนได้ที่เคาน์เตอร์เดิม"],
    price: { min: 50, max: 80, per: "ต่อจาน" },
  },
  {
    id: "samyan-market",
    name: "ตลาดสามย่าน",
    category: "food",
    lat: 13.7371,
    lng: 100.5253,
    summary: "ตลาดสดกับร้านอาหาร ชั้นบนมีร้านข้าวให้เลือกเยอะ",
    knowhow: ["ร้านข้าวราดแกงคิดตามจำนวนกับข้าวที่ตัก บอกก่อนว่าจะเอากี่อย่าง"],
    price: { min: 40, max: 60, per: "ต่อจาน" },
  },
  {
    id: "banthat-thong",
    name: "ถนนบรรทัดทอง",
    category: "food",
    lat: 13.742,
    lng: 100.5222,
    summary: "ร้านอาหารเรียงยาวทั้งถนน คึกคักตอนเย็นถึงดึก",
    knowhow: ["หลายร้านดังคิวยาวช่วงหัวค่ำ ถ้าหิวจริงให้มาก่อน 18:00 หรือหลัง 20:30"],
    cautions: ["ร้านที่ขึ้นรีวิวบ่อยมักแพงกว่าร้านข้างๆ ที่คนแถวนั้นกิน"],
    price: { min: 50, max: 120, per: "ต่อจาน" },
  },

  // อยู่คนเดียว
  {
    id: "chula-hospital",
    name: "โรงพยาบาลจุฬาลงกรณ์",
    category: "living",
    lat: 13.731,
    lng: 100.5362,
    summary: "โรงพยาบาลใหญ่ใกล้มหาลัย สำหรับกรณีหนักหรือต้องพบแพทย์เฉพาะทาง",
    knowhow: [
      "ถ้าไม่ฉุกเฉิน ลองไปที่บริการสุขภาพนิสิตก่อน (ดูในวิธี \"ถ้าป่วย\")",
      "พกบัตรประชาชนกับบัตรนิสิตไปด้วยทุกครั้ง",
    ],
  },
  {
    id: "samyan-mitrtown-supermarket",
    name: "ซูเปอร์มาร์เก็ต สามย่านมิตรทาวน์",
    category: "living",
    lat: 13.7334,
    lng: 100.5289,
    summary: "ซื้อของใช้เข้าห้อง น้ำดื่มแพ็คใหญ่ ผงซักฟอก",
    knowhow: ["ซื้อน้ำดื่มแพ็คใหญ่ถูกกว่าซื้อขวดเดี่ยวจากร้านสะดวกซื้อทุกวัน"],
  },
];

export function placesIn(category: Place["category"]): Place[] {
  return places.filter((p) => p.category === category);
}
