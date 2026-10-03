import type { Brand } from "@/content/types";

// BTS and MRT logos name a station, the way its signs do (.scratch/logos/research.md);
// the CU POP BUS logo names the Guide to Chula's free bus (.scratch/more-know-how/spec.md, Q7).
// They are the owners' marks, used without permission: if an owner asks, or the pitch
// needs to play safe, set NEXT_PUBLIC_TRANSIT_LOGOS=off (or this to false) and every
// pin, card and Guide goes back to our own icons, and the footer line goes too.
export const SHOW_TRANSIT_LOGOS = process.env.NEXT_PUBLIC_TRANSIT_LOGOS !== "off";

/** Shown wherever the logos are: the footer, and the map list (the map has no footer) */
export const LOGO_NOTICE = "โลโก้ BTS, MRT และ CU POP BUS เป็นเครื่องหมายของเจ้าของ ใช้เพื่อบอกว่าเป็นบริการอะไรเท่านั้น เว็บนี้ไม่ได้เกี่ยวข้องกับผู้ให้บริการ";

type Logo = { src: string; alt: string };

// bts.svg and mrt.svg are Wikimedia Commons' copies, byte for byte; cu-pop-bus.jpg is the
// file from the CU POP BUS page, as the owner of this site received it. Never recolour,
// crop or stretch them. BTS and MRT go on white; CU POP BUS is a square on its own pink.
const logos: Record<Brand, Logo> = {
  bts: { src: "/logos/bts.svg", alt: "BTS" },
  mrt: { src: "/logos/mrt.svg", alt: "MRT" },
  pop: { src: "/logos/cu-pop-bus.jpg", alt: "CU POP BUS" },
};

/** The logo to show for this brand, or nothing when logos are off */
export function logoFor(brand?: Brand): Logo | undefined {
  return SHOW_TRANSIT_LOGOS && brand ? logos[brand] : undefined;
}
