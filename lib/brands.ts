import type { Brand } from "@/content/types";

// BTS and MRT logos name a station, the way its signs do (.scratch/logos/research.md).
// They are the owners' marks, used without permission: if an owner asks, or the pitch
// needs to play safe, set NEXT_PUBLIC_TRANSIT_LOGOS=off (or this to false) and every
// pin, card and Guide goes back to our own icons, and the footer line goes too.
export const SHOW_TRANSIT_LOGOS = process.env.NEXT_PUBLIC_TRANSIT_LOGOS !== "off";

/** Shown wherever the logos are: the footer, and the map list (the map has no footer) */
export const LOGO_NOTICE = "โลโก้ BTS และ MRT เป็นเครื่องหมายของเจ้าของ ใช้เพื่อบอกว่าเป็นสถานีอะไรเท่านั้น เว็บนี้ไม่ได้เกี่ยวข้องกับผู้ให้บริการ";

type Logo = { src: string; alt: string };

// The files in public/logos are Wikimedia Commons' copies, byte for byte. Never
// recolour, crop or stretch them; always show them on white.
const logos: Record<Brand, Logo> = {
  bts: { src: "/logos/bts.svg", alt: "BTS" },
  mrt: { src: "/logos/mrt.svg", alt: "MRT" },
};

/** The logo to show for this brand, or nothing when logos are off */
export function logoFor(brand?: Brand): Logo | undefined {
  return SHOW_TRANSIT_LOGOS && brand ? logos[brand] : undefined;
}
