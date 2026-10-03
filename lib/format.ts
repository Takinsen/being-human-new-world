import type { Price } from "@/content/types";

const thaiMonths = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];

/** "2026-09" -> "ก.ย. 69" */
export function thaiMonthYear(yyyyMm: string): string {
  const [y, m] = yyyyMm.split("-").map(Number);
  return `${thaiMonths[m - 1]} ${String(y + 543).slice(-2)}`;
}

const bangkok = 7 * 3600 * 1000; // UTC+7
const day = 24 * 3600 * 1000;

/** How long ago, counted back all the way: "เมื่อกี้", "2 ชั่วโมงที่แล้ว", "เมื่อวาน", "2 ปีที่แล้ว".
 * Days count calendar days in Bangkok, so "เมื่อวาน" is the day before today, however few hours ago. */
export function timeAgo(iso: string, now = Date.now()): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "";
  const minutes = Math.max(0, now - then) / 60000;
  if (minutes < 1) return "เมื่อกี้";
  if (minutes < 60) return `${Math.floor(minutes)} นาทีที่แล้ว`;
  const days = Math.floor((now + bangkok) / day) - Math.floor((then + bangkok) / day);
  if (days < 1) return `${Math.floor(minutes / 60)} ชั่วโมงที่แล้ว`;
  if (days < 2) return "เมื่อวาน";
  if (days < 7) return `${days} วันที่แล้ว`;
  if (days < 30) return `${Math.floor(days / 7)} สัปดาห์ที่แล้ว`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} เดือนที่แล้ว`;
  const years = Math.floor(days / 365);
  return years <= 1 ? "ปีที่แล้ว" : `${years} ปีที่แล้ว`;
}

/** A price with its unit joined on: "17–44 บาท/เที่ยว", "40 บาท ขึ้นไป/ครั้ง" */
export function priceFigure(price: Price): string {
  const range = price.min === price.max ? `${price.min}` : `${price.min}–${price.max}`;
  const unit = price.per.replace(/^ต่อ/, "/").replace(/ ต่อ/, "/");
  return `${range} บาท${unit.startsWith("/") ? "" : " "}${unit}`;
}

export function mapsUrl(lat: number, lng: number): string {
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
}

/** Walking directions from wherever the phone is */
export function directionsUrl(lat: number, lng: number): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=walking`;
}

export function commonsImage(file: string, width = 960): string {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${width}`;
}

export function commonsPage(file: string): string {
  return `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file.replace(/ /g, "_"))}`;
}
