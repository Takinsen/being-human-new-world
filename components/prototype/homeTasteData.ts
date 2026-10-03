// PROTOTYPE (home-taste), throwaway: lives only on the prototype/home-taste branch.
// Up to 3 Home Taste places per region, vouched first, then team picks (.scratch/more-know-how/spec.md Q9).
import type { Place, Region } from "@/content/types";
import type { Content } from "@/lib/content";

export type Pick = { place: Place; by?: { name: string; hometown: string } };
export type RegionPicks = { region: Region; dishes: string; picks: Pick[] };

export const REGIONS: { region: Region; dishes: string }[] = [
  { region: "เหนือ", dishes: "ข้าวซอย น้ำเงี้ยว ไส้อั่ว" },
  { region: "อีสาน", dishes: "ส้มตำ ลาบ ไส้กรอกอีสาน" },
  { region: "กลาง", dishes: "แกงส้ม ปลาช่อน ก๋วยเตี๋ยวเรือ" },
  { region: "ใต้", dishes: "แกงไตปลา คั่วกลิ้ง ขนมจีนแกงใต้" },
  { region: "ตะวันออก", dishes: "เส้นจันท์ผัดปู หมูชะมวง" },
  { region: "ตะวันตก", dishes: "ขนมจีนทอดมัน แกงหัวตาล" },
];

export function homeTasteRegions(content: Content): RegionPicks[] {
  return REGIONS.map(({ region, dishes }) => {
    const picks: Pick[] = [];
    for (const n of content.notes) {
      if (!n.homeTaste || n.region !== region || !n.placeId || picks.some((p) => p.place.id === n.placeId)) continue;
      const place = content.places.find((p) => p.id === n.placeId);
      if (place) picks.push({ place, by: { name: n.name, hometown: n.hometown } });
    }
    for (const place of content.places) {
      if (place.homeTaste === region && !picks.some((p) => p.place.id === place.id)) picks.push({ place });
    }
    return { region, dishes, picks: picks.slice(0, 3) };
  });
}
