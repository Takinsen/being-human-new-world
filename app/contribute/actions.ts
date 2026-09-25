"use server";

import { updateTag } from "next/cache";
import { isRegion } from "@/lib/content";
import { appendRow, SHEET_TAG } from "@/lib/sheet";

export type FormState = { ok: boolean; message: string; href?: string } | null;

function text(form: FormData, key: string, max = 2000): string {
  return String(form.get(key) ?? "").trim().slice(0, max);
}

async function save(write: () => Promise<void>, href: string): Promise<FormState> {
  try {
    await write();
  } catch (err) {
    console.error(err);
    return { ok: false, message: "บันทึกไม่สำเร็จ ลองใหม่อีกครั้ง" };
  }
  // The person who just saved sees their row straight away.
  updateTag(SHEET_TAG);
  return { ok: true, message: "บันทึกแล้ว ขึ้นบนเว็บเรียบร้อย", href };
}

export async function savePrice(_: FormState, form: FormData): Promise<FormState> {
  const placeId = text(form, "placeId", 100);
  const min = Number(text(form, "min", 10));
  const max = Number(text(form, "max", 10) || min);
  const per = text(form, "per", 50);
  const by = text(form, "by", 80);
  if (!placeId || !by || !Number.isFinite(min) || !Number.isFinite(max) || min < 0) {
    return { ok: false, message: "กรอกที่ ราคา และชื่อคนตรวจให้ครบ" };
  }
  return save(
    () => appendRow("prices", { placeId, min: String(min), max: String(max), per, by }),
    `/map?place=${placeId}`,
  );
}

export async function saveSenior(_: FormState, form: FormData): Promise<FormState> {
  const picked = text(form, "id", 100);
  const id = picked && picked !== "new" ? picked : `s-${Date.now().toString(36)}`;
  const name = text(form, "name", 60);
  const hometown = text(form, "hometown", 60);
  const region = text(form, "region", 20);
  const story = text(form, "story", 4000);
  if (!name || !hometown || !isRegion(region) || !story) {
    return { ok: false, message: "กรอกชื่อ บ้านเกิด ภาค และเรื่องปีแรกให้ครบ" };
  }
  return save(
    () =>
      appendRow("seniors", {
        id,
        name,
        hometown,
        region,
        about: text(form, "about", 80),
        story,
        quote: text(form, "quote", 300),
      }),
    `/seniors#${id}`,
  );
}

export async function saveGuideCheck(_: FormState, form: FormData): Promise<FormState> {
  const guideId = text(form, "guideId", 100);
  const category = text(form, "category", 20);
  const by = text(form, "by", 80);
  if (!guideId || !by) return { ok: false, message: "เลือกวิธีและใส่ชื่อคนที่ลองทำ" };
  return save(() => appendRow("guides", { guideId, by }), `/${category}#${guideId}`);
}
