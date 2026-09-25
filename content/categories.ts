import type { CategoryId } from "./types";

export type Category = {
  id: CategoryId;
  name: string;
  /** What this category helps with, in the Newcomer's words */
  blurb: string;
  /** Code prefix for its Places, like a line's station codes (T1, F2) */
  prefix: string;
  /** The topics on this line, shown as stations on its band */
  stops: { label: string; href: string }[];
};

export const categories: Category[] = [
  {
    id: "transport",
    name: "การเดินทาง",
    blurb: "มาจุฬาฯ ยังไง ค่ารถเท่าไหร่ วินคิดเท่าไหร่ถึงเรียกว่าปกติ",
    prefix: "T",
    stops: [
      { label: "BTS MRT", href: "/transport#rabbit" },
      { label: "รถป๊อป", href: "/transport#pop-bus" },
      { label: "รถเมล์", href: "/transport#city-bus" },
      { label: "วิน", href: "/transport#motorbike-taxi" },
      { label: "แท็กซี่", href: "/transport#taxi" },
    ],
  },
  {
    id: "food",
    name: "ของกิน",
    blurb: "กินอิ่มในงบนักศึกษา และร้านที่รสชาติเหมือนบ้าน",
    prefix: "F",
    stops: [
      { label: "ราคาปกติ", href: "/food#places" },
      { label: "โรงอาหาร", href: "/food#eat-cheap" },
      { label: "ตลาด", href: "/food#samyan-market" },
      { label: "รสชาติบ้าน", href: "/food#home-taste" },
    ],
  },
  {
    id: "living",
    name: "อยู่คนเดียว",
    blurb: "ซักผ้า น้ำดื่ม ขยะ และถ้าป่วยต้องไปไหน",
    prefix: "L",
    stops: [
      { label: "ซักผ้า", href: "/living#coin-laundry" },
      { label: "น้ำดื่ม", href: "/living#drinking-water" },
      { label: "ขยะ", href: "/living#rubbish" },
      { label: "ป่วย", href: "/living#sick" },
    ],
  },
];

export function getCategory(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}
