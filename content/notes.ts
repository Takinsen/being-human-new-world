import type { Note } from "./types";

// Seed Notes: the Seniors' own words from the meet-2 interviews (data/meet-2.pdf),
// trimmed to one point each. Both Seniors have okayed them.
// Notes people write on the site come from the Google Sheet (docs/adr/0005).
/** Longest Note, in characters */
export const NOTE_MAX = 280;

export const seedNotes: Note[] = [
  {
    id: "seed-boss-food",
    text: "ช่วงแรกหาร้านข้าวที่ถูกปากยาก เลยกินเซเว่นเยอะ เดินหาไปเรื่อยๆ ไม่ก็นั่งวินวนสำรวจแถวที่พัก เสียทั้งเวลาทั้งเงิน",
    name: "พี่บอส",
    hometown: "สุราษฎร์ธานี",
    region: "ใต้",
    category: "food",
    seniorId: "boss",
  },
  {
    id: "seed-boss-time",
    text: "ที่บ้านได้ใช้รถยนต์ไปไหนมาไหน อยู่นี่ต้องคิดเรื่องเวลาเยอะ ใช้ BTS ในการเดินทาง",
    name: "พี่บอส",
    hometown: "สุราษฎร์ธานี",
    region: "ใต้",
    category: "transport",
    seniorId: "boss",
  },
  {
    id: "seed-boss-alone",
    text: "ตอนนอนคนเดียว ไม่มีใครกินข้าวด้วย แอบเหงานิดหน่อย แต่พ่อแม่โทรมาตลอด แล้วก็เจอเพื่อนที่น่ารัก มันเลยค่อยๆ โอเค",
    name: "พี่บอส",
    hometown: "สุราษฎร์ธานี",
    region: "ใต้",
    category: "living",
    seniorId: "boss",
  },
  {
    id: "seed-boss-explore",
    text: "มาแรกๆ สำรวจแถวที่พักค่อนข้างยาก เสียเวลาเสียตังค์เยอะ อยากได้อะไรที่บอกจุดต่างๆ ชัดๆ เช่น ร้านข้าว ที่ซักผ้า การเดินทาง",
    name: "พี่บอส",
    hometown: "สุราษฎร์ธานี",
    region: "ใต้",
    category: "living",
    seniorId: "boss",
  },
  {
    id: "seed-tan-maps",
    text: "มาใหม่ๆ ไม่รู้ว่าต้องลงสถานีไหน ต่อรถยังไง ต้องเปิด Google Maps ตลอด แม้แต่ไปจุฬาฯ หรือกลับหอ",
    name: "พี่แทน",
    hometown: "อำนาจเจริญ",
    region: "อีสาน",
    category: "transport",
    seniorId: "tan",
  },
  {
    id: "seed-tan-walk",
    text: "ตอนนี้แถวมหาลัยแทบไม่ต้องเปิดแผนที่แล้ว ชอบเดินเพราะที่ต่างๆ อยู่ใกล้กัน",
    name: "พี่แทน",
    hometown: "อำนาจเจริญ",
    region: "อีสาน",
    category: "transport",
    seniorId: "tan",
  },
  {
    id: "seed-tan-cost",
    text: "อีกเรื่องที่ปรับตัวยากคือค่าครองชีพสูงกว่าต่างจังหวัด ตอนนี้ชินแล้ว",
    name: "พี่แทน",
    hometown: "อำนาจเจริญ",
    region: "อีสาน",
    category: "food",
    seniorId: "tan",
  },
  {
    id: "seed-tan-friends",
    text: "ก่อนเปิดเทอมปี 1 มาคนเดียว ต้องหาเพื่อนใหม่ ยังไม่รู้จะเข้ากลุ่มไหน",
    name: "พี่แทน",
    hometown: "อำนาจเจริญ",
    region: "อีสาน",
    category: "living",
    seniorId: "tan",
  },
];
