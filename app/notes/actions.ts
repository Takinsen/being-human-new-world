"use server";

import { updateTag } from "next/cache";
import { places } from "@/content/places";
import { isCategory } from "@/lib/content";
import { NOTE_MAX } from "@/content/notes";
import { regionOf } from "@/lib/provinces";
import { appendRow, SHEET_TAG } from "@/lib/sheet";

export type NoteFormState = { ok: boolean; message: string; href?: string } | null;

function text(form: FormData, key: string, max: number): string {
  return String(form.get(key) ?? "").trim().slice(0, max);
}

export async function saveNote(_: NoteFormState, form: FormData): Promise<NoteFormState> {
  const body = text(form, "text", NOTE_MAX);
  const name = text(form, "name", 60);
  const hometown = text(form, "hometown", 40);
  const place = places.find((p) => p.id === text(form, "placeId", 100));
  const category = place?.category ?? text(form, "category", 20);
  if (!body || !name) return { ok: false, message: "เขียนโน้ตและใส่ชื่อก่อน" };
  if (!regionOf(hometown)) return { ok: false, message: "เลือกจังหวัดบ้านเกิด" };
  if (!isCategory(category)) return { ok: false, message: "เลือกที่บนแผนที่ หรือเลือกสายของโน้ตนี้" };
  try {
    await appendRow("notes", {
      text: body,
      name,
      hometown,
      placeId: place?.id ?? "",
      category,
      homeTaste: place?.category === "food" && form.get("homeTaste") ? "yes" : "",
    });
  } catch (err) {
    console.error(err);
    return { ok: false, message: "บันทึกไม่สำเร็จ ลองใหม่อีกครั้ง" };
  }
  updateTag(SHEET_TAG);
  return { ok: true, message: "โน้ตขึ้นแล้ว", href: place ? `/?place=${place.id}` : `/notes?line=${category}` };
}
