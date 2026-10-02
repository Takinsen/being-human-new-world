import type { Place } from "./types";

// Coordinates and price ranges below are desk research (Sep 2026), credited to
// the team "from the web". A Price Check made on the spot comes in through
// /contribute and replaces it (docs/adr/0005). Unchecked prices show "ยังไม่รู้ราคาจริง".
// Photos come from Wikimedia Commons; replace them with the team's own shots when you have them.
export const places: Place[] = [
  // การเดินทาง
  {
    id: "mrt-samyan",
    brand: "mrt",
    name: "MRT สาม\u2060ย่าน",
    category: "transport",
    lat: 13.7324,
    lng: 100.5294,
    summary: "ใกล้ฝั่งสาม\u2060ย่านสุด เดินใต้ดินทะลุเข้าสาม\u2060ย่านมิตรทาวน์ได้",
    photo: { file: "Exit no.2 Sam Yan MRT.jpg", alt: "ทางออก 2 สถานี MRT สาม\u2060ย่าน" },
    knowhow: [
      "บัตรเครดิตหรือเดบิตที่มีรูปคลื่นแตะจ่าย แตะผ่านประตูได้เลย ไม่ต้องซื้อเหรียญ",
      "ใช้บัตรใบเดียวกันแตะทั้งตอนเข้าและตอนออก",
      "ไม่มีบัตรแบบนี้ ก็ซื้อเหรียญเที่ยวเดียวที่ตู้หรือห้องขายตั๋ว",
      "ขึ้นทางออก 2 จะโผล่ที่จามจุรีสแควร์ เดินเข้าจุฬาฯ ได้เลย หรือต่อรถป๊อปสาย\u00a04 ที่สาม\u2060ย่านมิตรทาวน์",
    ],
    cautions: ["บัตร MRT แบบเดิมและ MRT Plus ใช้ไม่\u2060ได้แล้วตั้งแต่ 1 มิ.ย. 2569"],
    toChula: "ขึ้นทางออก 2 แล้วเดินเข้าจุฬาฯ ได้เลย หรือต่อรถป๊อปสาย\u00a04 ฟรีที่สาม\u2060ย่านมิตรทาวน์ แต่วันเสาร์สาย\u00a04 ไม่วิ่ง",
    guides: ["to-chula"],
    price: { min: 17, max: 44, per: "ต่อเที่ยว", checked: { on: "2026-09", by: "ทีมตั้งหลัก", how: "web" } },
  },
  {
    id: "bts-siam",
    brand: "bts",
    name: "BTS สยาม",
    category: "transport",
    lat: 13.7456,
    lng: 100.5347,
    summary: "ที่เปลี่ยนสายสุขุมวิทกับสีลม จะเดินหรือต่อรถป๊อปเข้าจุฬาฯ ก็ได้",
    photo: { file: "Siam BTS Station, view from Siam Paragon.jpg", alt: "สถานี BTS สยาม มองจากสยามพารากอน" },
    knowhow: [
      "ขึ้นทุกวันก็ทำบัตร Rabbit ไปเลย ไม่ต้องต่อคิวตู้ทุกเช้า",
      "ช่วง 7:30–9:00 คนแน่นมาก เผื่อเวลาไว้อย่างน้อย 15 นาที",
    ],
    cautions: ["ยืนชิดขวาบนบันไดเลื่อน ฝั่งซ้ายเว้นให้คนเดินขึ้น"],
    toChula: "ลงทางออก 2 ไปป้ายรถป๊อป \"ลิ\u2060โด้\" หน้า 7-Eleven ขึ้นสาย\u00a01 ที่วิ่ง จ.–ส. หรือสาย\u00a04 ที่วิ่ง จ.–ศ. ฟรีทั้งคู่ ลงที่ศาลา\u2060พระ\u2060เกี้ยว",
    guides: ["to-chula", "rabbit"],
    price: { min: 17, max: 47, per: "ต่อเที่ยว", checked: { on: "2026-09", by: "ทีมตั้งหลัก", how: "web" } },
  },
  {
    id: "bts-national-stadium",
    brand: "bts",
    name: "BTS สนามกีฬาแห่งชาติ",
    category: "transport",
    lat: 13.7466,
    lng: 100.529,
    summary: "ใกล้ฝั่งบรรทัดทองกับหอแถวนั้น",
    photo: { file: "Early morning in National Stadium BTS sky train station, Bangkok, Thailand.jpg", alt: "สถานี BTS สนามกีฬาแห่งชาติตอนเช้า" },
    knowhow: ["ลงสถานีนี้แล้วเดินเลียบถนนบรรทัดทองลงมาทางจุฬาฯ ได้"],
    toChula: "ขึ้นรถป๊อปสาย\u00a02 ฟรี วิ่ง จ.–ส. หรือเดินเลียบถนนบรรทัดทองลงมาก็ได้",
    guides: ["to-chula", "rabbit"],
    price: { min: 17, max: 47, per: "ต่อเที่ยว", checked: { on: "2026-09", by: "ทีมตั้งหลัก", how: "web" } },
  },

  // ของกิน
  {
    id: "samyan-mitrtown-food",
    name: "ศูนย์อาหาร สาม\u2060ย่านมิตรทาวน์",
    category: "food",
    lat: 13.7338,
    lng: 100.5282,
    summary: "กินเสร็จนั่งอ่านหนังสือต่อได้ แอร์เย็น เปิดถึงดึก ร้านให้เลือกเยอะ",
    guides: ["eat-cheap"],
    photo: { file: "Samyan Mitrtown สาม\u2060ย่านมิตรทาวน์.jpg", alt: "อาคารสาม\u2060ย่านมิตรทาวน์" },
    knowhow: ["ต้องเติมเงินใส่บัตรที่เคาน์เตอร์ก่อนสั่ง กินแล้วเงินเหลือ เอาบัตรไปขอคืนที่เคาน์เตอร์เดิม"],
    price: { min: 60, max: 150, per: "ต่อจาน", checked: { on: "2026-09", by: "ทีมตั้งหลัก", how: "web" } },
  },
  {
    id: "samyan-market",
    name: "ตลาดสาม\u2060ย่าน",
    category: "food",
    lat: 13.7371,
    lng: 100.5253,
    summary: "ตลาดสดกับร้านอาหาร ชั้นบนมีร้านข้าวให้เลือกเยอะ",
    guides: ["eat-cheap"],
    knowhow: ["ร้านข้าวราดแกงคิดตามจำนวนกับข้าวที่ตัก บอกก่อนว่าจะเอากี่อย่าง"],
    price: { min: 50, max: 80, per: "ต่อจาน", checked: { on: "2026-09", by: "ทีมตั้งหลัก", how: "web" } },
  },
  {
    id: "banthat-thong",
    name: "ถนนบรรทัดทอง",
    category: "food",
    lat: 13.742,
    lng: 100.5222,
    summary: "ร้านอาหารเรียงยาวทั้งถนน คนเยอะตั้งแต่เย็นยันดึก",
    guides: ["eat-cheap"],
    photo: { file: "Banthat Thong Road.jpg", alt: "ถนนบรรทัดทอง" },
    knowhow: ["หลายร้านดังคิวยาวช่วงหัวค่ำ ถ้าหิวจริงให้มาก่อน 18:00 หรือหลัง 20:30"],
    cautions: ["ร้านที่ขึ้นรีวิวบ่อยมักแพงกว่าร้านข้างๆ ที่คนแถวนั้นกิน"],
    price: { min: 60, max: 200, per: "ต่อจาน", checked: { on: "2026-09", by: "ทีมตั้งหลัก", how: "web" } },
  },
  {
    id: "niyom-paktai",
    name: "นิยมปักษ์ใต้ บรรทัดทอง",
    category: "food",
    // Pin is an estimate from the address; check it on the spot.
    lat: 13.7375,
    lng: 100.5225,
    summary: "ร้านอาหารใต้บนถนนบรรทัดทอง ฝั่งตรง\u2060ข้ามจุฬาฯ ซอย 34 เปิดทุกวันตั้งแต่ 11:00",
    photo: { file: "Kaeng tai pla.JPG", alt: "แกงไตปลา อาหารใต้ เป็นภาพประกอบ ไม่ใช่ของร้านนี้" },
    knowhow: ["เผ็ดแบบใต้จริง กินเผ็ดไม่เก่งก็บอกลดเผ็ดตอนสั่ง", "ราคาต่อจานแรงกว่าร้านข้าวทั่วไป ชวนเพื่อนไปหลายคนแล้วแบ่งกันกินคุ้มกว่า"],
    price: { min: 120, max: 250, per: "ต่อจาน", checked: { on: "2026-09", by: "ทีมตั้งหลัก", how: "web" } },
    homeTaste: "ใต้",
  },
  {
    id: "somtam-chula-20",
    name: "ส้มตำเจ๊อ้อย จุฬาฯ ซอย 20",
    category: "food",
    // Pin is an estimate from the address; check it on the spot.
    lat: 13.739,
    lng: 100.5235,
    summary: "ส้มตำโต๊ะแดงในจุฬาฯ ซอย 20 ใกล้อุทยาน 100 ปี เปิดเย็นถึงดึก 16:30–23:30",
    photo: { file: "Som Tam green papaya salad, Bangkok, Thailand.jpg", alt: "ส้มตำ เป็นภาพประกอบ ไม่ใช่ของร้านนี้" },
    knowhow: ["ร้านเปิดตอนเย็น มาหลังเลิกเรียนหรือหลังซ้อมได้พอดี", "คนชอบสั่งส้มตำไทยกับคอหมูย่าง"],
    price: { min: 50, max: 150, per: "ต่อจาน", checked: { on: "2026-09", by: "ทีมตั้งหลัก", how: "web" } },
    homeTaste: "อีสาน",
  },

  // สุขภาพ
  {
    id: "chula-hospital",
    icon: "sick",
    name: "โรงพยาบาลจุฬาลงกรณ์",
    category: "health",
    lat: 13.731,
    lng: 100.5362,
    // The ER is what people come here for at night, so it leads; it isn't a caution (UX audit 7, U2).
    summary: "ห้องฉุกเฉินเปิด 24 ชั่วโมง ชั้น 1 อาคาร ภ.ป.ร. ฝั่งถนนราชดำริ ไปเองไม่ไหวโทร 1669",
    photo: { file: "King Chulalongkorn Memorial Hospital and MDCU Chulalongkorn University.jpg", alt: "โรงพยาบาลจุฬาลงกรณ์" },
    knowhow: [
      "โรงพยาบาลใหญ่ใกล้มหาลัย ไว้ตอนเป็นหนักหรือต้องหาหมอเฉพาะทาง",
      "ถ้าไม่ฉุกเฉิน ไปศูนย์บริการสุขภาพ จุฬาฯ ที่อาคารจามจุรี 9 ชั้น 2 ก่อน นิสิตไม่เสียเงิน",
      "พกบัตรประชาชนกับบัตรนิสิตไปด้วยทุกครั้ง",
    ],
    guides: ["sick"],
  },
  {
    id: "cu-health-service",
    name: "ศูนย์บริการสุขภาพ จุฬาฯ",
    category: "health",
    icon: "sick",
    lat: 13.736,
    lng: 100.5257,
    // Hours lead: it's closed at night, which is when people look (UX audit 7, U2).
    summary: "ไม่สบายแต่ไม่ฉุกเฉิน มาที่นี่ก่อน เปิด จ.–ศ. 8:00–15:30 เที่ยงปิดพัก อยู่อาคารจามจุรี 9 ชั้น 2 นิสิตไม่เสียเงิน",
    knowhow: [
      "พกบัตรนิสิตไปด้วย",
      "เปิดวันจันทร์–ศุกร์ 8:00–11:30 และ 13:00–15:30 น. ปิดพักเที่ยง โทรถามก่อนได้ที่ 02-218-0568",
      "เลยเวลานี้แล้ว ไปห้องปฐมพยาบาลที่หอพักนิสิตชวนชม ดูในวิธี \"ไม่สบาย ไปไหนดี\"",
    ],
    cautions: ["เวลานี้เอามาจากเว็บจุฬาฯ อาจเปลี่ยนได้ โทรเช็กก่อนไปที่ 02-218-0568"],
    guides: ["sick"],
  },

  // งานบ้าน
  {
    id: "samyan-mitrtown-supermarket",
    name: "ซูเปอร์มาร์เก็ต สาม\u2060ย่านมิตรทาวน์",
    category: "household",
    lat: 13.7334,
    lng: 100.5289,
    summary: "ของใช้เข้าห้องซื้อที่นี่ได้ ทั้งน้ำแพ็คใหญ่ ผง\u2060ซักฟอก",
    knowhow: ["ซื้อน้ำดื่มแพ็คใหญ่ถูกกว่าซื้อขวดเดี่ยวจากร้านสะดวกซื้อทุกวัน"],
  },
];
