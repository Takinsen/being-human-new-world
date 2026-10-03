import type { Region } from "./types";

/** The regions in the order Home Taste lists them, each with dishes people from there miss */
export const regions: { id: Region; dishes: string }[] = [
  { id: "เหนือ", dishes: "ข้าวซอย น้ำเงี้ยว ไส้อั่ว" },
  { id: "อีสาน", dishes: "ส้มตำ ลาบ ไส้กรอกอีสาน" },
  { id: "กลาง", dishes: "แกงส้ม ขนมไทย ก๋วยเตี๋ยวสุโขทัย" },
  { id: "ใต้", dishes: "แกงไตปลา คั่วกลิ้ง ขนมจีนแกงใต้" },
  { id: "ตะวันออก", dishes: "เส้นจันท์ผัดปู หมูชะมวง" },
  { id: "ตะวันตก", dishes: "ไก่ย่างบางตาล ขนมจีนทอดมัน" },
];

export function isRegion(value: string): value is Region {
  return regions.some((r) => r.id === value);
}
