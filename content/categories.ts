import type { CategoryId } from "./types";

export type Category = {
  id: CategoryId;
  name: string;
  /** What this category helps with, in the Newcomer's words */
  blurb: string;
};

export const categories: Category[] = [
  {
    id: "transport",
    name: "การเดินทาง",
    blurb: "มาจุฬาฯ ยังไง ค่ารถเท่าไหร่ วินคิดเท่าไหร่ถึงเรียกว่าปกติ",
  },
  {
    id: "food",
    name: "ของกิน",
    blurb: "กินอิ่มในงบนักศึกษา และร้านที่รสชาติเหมือนบ้าน",
  },
  {
    id: "living",
    name: "อยู่คนเดียว",
    blurb: "ซักผ้า น้ำดื่ม ขยะ และถ้าป่วยต้องไปไหน",
  },
];

export function getCategory(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}
