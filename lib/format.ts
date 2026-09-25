import { getSenior } from "@/content/seniors";
import type { PriceCheck } from "@/content/types";

const thaiMonths = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];

/** "2026-09" -> "ก.ย. 69" */
export function thaiMonthYear(yyyyMm: string): string {
  const [y, m] = yyyyMm.split("-").map(Number);
  return `${thaiMonths[m - 1]} ${String(y + 543).slice(-2)}`;
}

export function checkedBy(check: PriceCheck): string {
  return getSenior(check.by)?.name ?? check.by;
}

export function mapsUrl(lat: number, lng: number): string {
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
}

const prefixes = { transport: "T", food: "F", living: "L" } as const;

/** Station-style code for the nth Place on a category's line: T1, F2, L3 */
export function placeCode(category: keyof typeof prefixes, index: number): string {
  return `${prefixes[category]}${index + 1}`;
}

export function commonsImage(file: string, width = 960): string {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${width}`;
}

export function commonsPage(file: string): string {
  return `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file.replace(/ /g, "_"))}`;
}
