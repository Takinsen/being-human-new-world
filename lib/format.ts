import { getSenior } from "@/content/seniors";
import type { PriceCheck } from "@/content/types";

const thaiMonths = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];

/** "2026-09" -> "ก.ย. 69" */
export function thaiMonthYear(yyyyMm: string): string {
  const [y, m] = yyyyMm.split("-").map(Number);
  return `${thaiMonths[m - 1]} ${String(y + 543).slice(-2)}`;
}

/** ISO timestamp -> "25 ก.ย. 69" */
export function thaiDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const local = new Date(d.getTime() + 7 * 3600 * 1000); // Bangkok
  return `${local.getUTCDate()} ${thaiMonths[local.getUTCMonth()]} ${String(local.getUTCFullYear() + 543).slice(-2)}`;
}

export function checkedBy(check: PriceCheck): string {
  return getSenior(check.by)?.name ?? check.by;
}

export function mapsUrl(lat: number, lng: number): string {
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
}

export function commonsImage(file: string, width = 960): string {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${width}`;
}

export function commonsPage(file: string): string {
  return `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file.replace(/ /g, "_"))}`;
}
