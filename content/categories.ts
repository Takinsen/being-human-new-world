import type { CategoryId } from "./types";

export type Category = {
  id: CategoryId;
  name: string;
  /** What this category helps with, in the Newcomer's words */
  blurb: string;
  /** Has Places and Guides. Adjusting has Notes only, so it gets no map chip and no Guides section (docs/adr/0008). */
  hasPlaces: boolean;
};

export const categories: Category[] = [
  {
    id: "transport",
    name: "การเดินทาง",
    blurb: "มาจุฬาฯ ยังไง ค่ารถเท่าไหร่ วินคิดเท่าไหร่ถึงเรียกว่าปกติ",
    hasPlaces: true,
  },
  {
    id: "food",
    name: "ของกิน",
    blurb: "กินอิ่มในงบนิสิต และร้านที่รสชาติเหมือนบ้าน",
    hasPlaces: true,
  },
  {
    id: "health",
    name: "สุขภาพ",
    blurb: "ไม่สบายไปไหน ร้านยา หาหมอ ฉุกเฉิน และคุยกับใครได้เมื่อไม่สบายใจ",
    hasPlaces: true,
  },
  {
    id: "household",
    name: "งานบ้าน",
    blurb: "ซักผ้า น้ำดื่ม ขยะ ของใช้เข้าห้อง",
    hasPlaces: true,
  },
  {
    id: "adjusting",
    name: "ปรับตัว",
    blurb: "เหงา คิดถึงบ้าน หาเพื่อน ค่าครองชีพ เรื่องปีแรกจากรุ่นพี่",
    hasPlaces: false,
  },
];

/** The categories that have Places and Guides: the map's chips and the Guides page's sections */
export const placeCategories = categories.filter((c) => c.hasPlaces);

export function getCategory(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}
