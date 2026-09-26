import type { Place } from "./types";

// Coordinates and price ranges below are desk research (Sep 2026), credited to
// the team "from the web". A Price Check made on the spot comes in through
// /contribute and replaces it (docs/adr/0005). Unchecked prices show "รอตรวจราคา".
// Photos come from Wikimedia Commons; replace them with the team's own shots when you have them.
export const places: Place[] = [
  // การเดินทาง
  {
    id: "mrt-samyan",
    name: "MRT สามย่าน",
    category: "transport",
    lat: 13.7324,
    lng: 100.5294,
    summary: "สถานีที่ใกล้ฝั่งสามย่านที่สุด มีทางเดินใต้ดินเชื่อมสามย่านมิตรทาวน์",
    photo: { file: "Exit no.2 Sam Yan MRT.jpg", alt: "ทางออก 2 สถานี MRT สามย่าน" },
    knowhow: [
      "แตะบัตรเครดิตหรือเดบิตที่มีสัญลักษณ์ contactless ผ่านประตูได้เลย ไม่ต้องซื้อเหรียญ",
      "ใช้บัตรใบเดียวกันแตะทั้งตอนเข้าและตอนออก",
      "ไม่มีบัตร contactless ก็ซื้อเหรียญเที่ยวเดียวที่ตู้หรือห้องขายตั๋วได้",
      "ออกทางออก 2 จะขึ้นมาที่จามจุรีสแควร์ เดินเข้าจุฬาฯ ได้เลย หรือต่อรถป๊อปสาย 4 ที่สามย่านมิตรทาวน์",
    ],
    cautions: ["บัตร MRT แบบเดิมและ MRT Plus ใช้ไม่ได้แล้วตั้งแต่ 1 มิ.ย. 2569"],
    price: { min: 17, max: 44, per: "ต่อเที่ยว", checked: { on: "2026-09", by: "ทีมตั้งหลัก (ข้อมูลจากเว็บ)" } },
  },
  {
    id: "bts-siam",
    name: "BTS สยาม",
    category: "transport",
    lat: 13.7456,
    lng: 100.5347,
    summary: "สถานีเปลี่ยนสายสุขุมวิทกับสีลม เดินต่อหรือขึ้นรถป๊อปเข้าจุฬาฯ",
    photo: { file: "Siam BTS Station, view from Siam Paragon.jpg", alt: "สถานี BTS สยาม มองจากสยามพารากอน" },
    knowhow: [
      "ถ้าขึ้นทุกวัน ทำบัตร Rabbit ดีกว่าซื้อตั๋วเที่ยวเดียว ไม่ต้องต่อคิวที่ตู้",
      "รถป๊อปสาย 1 และสาย 4 วิ่งจากสยามเข้าจุฬาฯ ขึ้นฟรี",
      "ช่วง 7:30–9:00 คนแน่นมาก เผื่อเวลาไว้อย่างน้อย 15 นาที",
    ],
    cautions: ["ยืนชิดขวาบนบันไดเลื่อน ฝั่งซ้ายเว้นให้คนเดินขึ้น"],
    price: { min: 17, max: 47, per: "ต่อเที่ยว", checked: { on: "2026-09", by: "ทีมตั้งหลัก (ข้อมูลจากเว็บ)" } },
  },
  {
    id: "bts-national-stadium",
    name: "BTS สนามกีฬาแห่งชาติ",
    category: "transport",
    lat: 13.7466,
    lng: 100.529,
    summary: "ใกล้ฝั่งบรรทัดทองและหอพักแถวนั้น",
    photo: { file: "Early morning in National Stadium BTS sky train station, Bangkok, Thailand.jpg", alt: "สถานี BTS สนามกีฬาแห่งชาติตอนเช้า" },
    knowhow: ["ลงสถานีนี้แล้วเดินเลียบถนนบรรทัดทองลงมาทางจุฬาฯ ได้", "รถป๊อปสาย 2 วิ่งจากสถานีนี้เข้าจุฬาฯ ขึ้นฟรี"],
    price: { min: 17, max: 47, per: "ต่อเที่ยว", checked: { on: "2026-09", by: "ทีมตั้งหลัก (ข้อมูลจากเว็บ)" } },
  },

  // ของกิน
  {
    id: "samyan-mitrtown-food",
    name: "ศูนย์อาหาร สามย่านมิตรทาวน์",
    category: "food",
    lat: 13.7338,
    lng: 100.5282,
    summary: "มีหลายร้านในที่เดียว แอร์เย็น เปิดดึก นั่งอ่านหนังสือต่อได้",
    photo: { file: "Samyan Mitrtown สามย่านมิตรทาวน์.jpg", alt: "อาคารสามย่านมิตรทาวน์" },
    knowhow: ["แลกบัตรหรือเติมเงินที่เคาน์เตอร์ก่อนสั่ง เงินที่เหลือคืนได้ที่เคาน์เตอร์เดิม"],
    price: { min: 60, max: 150, per: "ต่อจาน", checked: { on: "2026-09", by: "ทีมตั้งหลัก (ข้อมูลจากเว็บ)" } },
  },
  {
    id: "samyan-market",
    name: "ตลาดสามย่าน",
    category: "food",
    lat: 13.7371,
    lng: 100.5253,
    summary: "ตลาดสดกับร้านอาหาร ชั้นบนมีร้านข้าวให้เลือกเยอะ",
    knowhow: ["ร้านข้าวราดแกงคิดตามจำนวนกับข้าวที่ตัก บอกก่อนว่าจะเอากี่อย่าง"],
    price: { min: 50, max: 80, per: "ต่อจาน", checked: { on: "2026-09", by: "ทีมตั้งหลัก (ข้อมูลจากเว็บ)" } },
  },
  {
    id: "banthat-thong",
    name: "ถนนบรรทัดทอง",
    category: "food",
    lat: 13.742,
    lng: 100.5222,
    summary: "ร้านอาหารเรียงยาวทั้งถนน คึกคักตอนเย็นถึงดึก",
    photo: { file: "Banthat Thong Road.jpg", alt: "ถนนบรรทัดทอง" },
    knowhow: ["หลายร้านดังคิวยาวช่วงหัวค่ำ ถ้าหิวจริงให้มาก่อน 18:00 หรือหลัง 20:30"],
    cautions: ["ร้านที่ขึ้นรีวิวบ่อยมักแพงกว่าร้านข้างๆ ที่คนแถวนั้นกิน"],
    price: { min: 60, max: 200, per: "ต่อจาน", checked: { on: "2026-09", by: "ทีมตั้งหลัก (ข้อมูลจากเว็บ)" } },
  },
  {
    id: "niyom-paktai",
    name: "นิยมปักษ์ใต้ บรรทัดทอง",
    category: "food",
    // Pin is an estimate from the address; check it on the spot.
    lat: 13.7375,
    lng: 100.5225,
    summary: "ร้านอาหารใต้บนถนนบรรทัดทอง ฝั่งตรงข้ามจุฬาฯ ซอย 34 เปิดทุกวันตั้งแต่ 11:00",
    knowhow: ["อาหารใต้รสจัดตามแบบใต้ ถ้าไม่ไหวบอกลดเผ็ดตอนสั่ง", "ไปกันหลายคนแล้วแบ่งกันกินคุ้มกว่า ราคาต่อจานสูงกว่าร้านข้าวทั่วไป"],
    price: { min: 120, max: 250, per: "ต่อจาน", checked: { on: "2026-09", by: "ทีมตั้งหลัก (ข้อมูลจากเว็บ)" } },
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
    knowhow: ["ร้านเปิดตอนเย็น มาหลังเลิกเรียนหรือหลังซ้อมได้พอดี", "ส้มตำไทยกับคอหมูย่างเป็นเมนูที่คนสั่งกันเยอะ"],
    price: { min: 50, max: 150, per: "ต่อจาน", checked: { on: "2026-09", by: "ทีมตั้งหลัก (ข้อมูลจากเว็บ)" } },
    homeTaste: "อีสาน",
  },

  // อยู่คนเดียว
  {
    id: "chula-hospital",
    name: "โรงพยาบาลจุฬาลงกรณ์",
    category: "living",
    lat: 13.731,
    lng: 100.5362,
    summary: "โรงพยาบาลใหญ่ใกล้มหาลัย สำหรับกรณีหนักหรือต้องพบแพทย์เฉพาะทาง",
    photo: { file: "King Chulalongkorn Memorial Hospital and MDCU Chulalongkorn University.jpg", alt: "โรงพยาบาลจุฬาลงกรณ์" },
    knowhow: [
      "ถ้าไม่ฉุกเฉิน ไปศูนย์บริการสุขภาพ จุฬาฯ ที่อาคารจามจุรี 9 ชั้น 2 ก่อน นิสิตไม่เสียเงิน (ดูในวิธี \"ถ้าป่วย\")",
      "พกบัตรประชาชนกับบัตรนิสิตไปด้วยทุกครั้ง",
    ],
  },
  {
    id: "otteri-im-park",
    name: "ร้านซักผ้า Otteri ไอแอมปาร์ค จุฬาฯ",
    category: "living",
    lat: 13.7400345,
    lng: 100.5252956,
    summary: "ร้านซักผ้าหยอดเหรียญในอาคารไอแอมปาร์ค ซอยจุฬาฯ 9",
    knowhow: [
      "เครื่องเล็ก 9 กก. พอสำหรับผ้าหนึ่งสัปดาห์ของคนเดียว",
      "ซักเสร็จแล้วย้ายผ้าออกเลย คนอื่นรอใช้เครื่องอยู่",
    ],
    cautions: ["ข้อมูลร้านมาจากเว็บ ดูเวลาเปิดใน Google Maps ก่อนไป"],
    price: { min: 40, max: 40, per: "ต่อรอบ ซักหรืออบ เครื่อง 9 กก.", checked: { on: "2024-01", by: "ทีมตั้งหลัก (ข้อมูลจากข่าว)" } },
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
