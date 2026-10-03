"use server";

import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { places } from "@/content/places";
import { isCategory } from "@/lib/content";
import { NOTE_MAX } from "@/content/notes";
import { regionOf } from "@/lib/provinces";
import { appendRow, SHEET_TAG } from "@/lib/sheet";
import { stripJoiners } from "@/lib/thaiBreaks";

export type NoteFormState = { message: string } | null;

function text(form: FormData, key: string, max: number): string {
  // Text pasted from the site may carry its word joiners; none are stored
  return stripJoiners(String(form.get(key) ?? "")).trim().slice(0, max);
}

export async function saveNote(_: NoteFormState, form: FormData): Promise<NoteFormState> {
  const body = text(form, "text", NOTE_MAX);
  const name = text(form, "name", 60);
  const hometown = text(form, "hometown", 40);
  const place = places.find((p) => p.id === text(form, "placeId", 100));
  const category = place?.category ?? text(form, "category", 20);
  if (!body || !name) return { message: "เขียนก่อนว่าอยากบอกอะไร แล้วใส่ชื่อด้วย" };
  if (!regionOf(hometown)) return { message: "เลือกจังหวัดที่บ้านอยู่ก่อน" };
  if (!isCategory(category)) return { message: "บอกหน่อยว่าเรื่องนี้อยู่ที่ไหน หรือเป็นเรื่องอะไร" };
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
    return { message: "ส่งไม่ขึ้น ลองกดอีกทีนะ" };
  }
  updateTag(SHEET_TAG);
  // The writer sees their Note where it landed (docs/adr/0006); one who came from a
  // filtered Feed goes back to it, filtered to the Note's own category so it shows (UX audit 7, U10).
  if (place) redirect(`/?place=${place.id}&posted=1`);
  redirect(isCategory(text(form, "from", 20)) ? `/notes?line=${category}&posted=1#fresh` : "/notes?posted=1#fresh");
}
