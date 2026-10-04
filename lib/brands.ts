import type { Brand } from "@/content/types";

// BTS and MRT logos name a station, the way its signs do (.scratch/logos/research.md);
// the CU POP BUS logo names the Guide to Chula's free bus (.scratch/more-know-how/spec.md, Q7);
// a shop's logo names a chain's branch, as its sign does (.scratch/map-polish/spec.md, Q1).
// They are the owners' marks, used without permission: if an owner asks, or the pitch
// needs to play safe, set NEXT_PUBLIC_LOGOS=off (or this to false) and every
// pin, card and Guide goes back to our own icons, and the footer line goes too.
export const SHOW_LOGOS = process.env.NEXT_PUBLIC_LOGOS !== "off";

/** Shown wherever the logos are: the footer, and the map list (the map has no footer) */
export const LOGO_NOTICE = "โลโก้ร้านและบริการเป็นเครื่องหมายของเจ้าของ ใช้เพื่อบอกว่าเป็นที่ไหนเท่านั้น เว็บนี้ไม่ได้เกี่ยวข้องกับเจ้าของ";

type Logo = { src: string; alt: string };

// bts.svg and mrt.svg are Wikimedia Commons' copies, byte for byte; cu-pop-bus.jpg is the
// file from the CU POP BUS page, and the shops' files are as the owner of this site sent them
// (originals in .scratch/map-polish/, scaled to 256px at most). Never recolour, crop or stretch
// them. Logos go on white; most shop logos, and CU POP BUS, are squares on their own colour.
// A brand in content/types.ts with no file here shows its Places' icon.
const logos: Partial<Record<Brand, Logo>> = {
  bts: { src: "/logos/bts.svg", alt: "BTS" },
  mrt: { src: "/logos/mrt.svg", alt: "MRT" },
  pop: { src: "/logos/cu-pop-bus.jpg", alt: "CU POP BUS" },
  bigc: { src: "/logos/bigc.png", alt: "Big C Foodplace" },
  lotuss: { src: "/logos/lotuss.png", alt: "Lotus's go fresh" },
  daiso: { src: "/logos/daiso.png", alt: "DAISO" },
  mrdiy: { src: "/logos/mrdiy.png", alt: "MR.DIY" },
  otteri: { src: "/logos/otteri.jpg", alt: "Otteri" },
  magnano: { src: "/logos/magnano.png", alt: "Magnano" },
  "bw-drugs": { src: "/logos/bw-drugs.jpg", alt: "B&W Drugs" },
};

/** The logo to show for this brand, or nothing when logos are off or its file hasn't come */
export function logoFor(brand?: Brand): Logo | undefined {
  return SHOW_LOGOS && brand ? logos[brand] : undefined;
}
