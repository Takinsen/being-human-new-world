"use server";

import { updateTag } from "next/cache";
import { places } from "@/content/places";
import { regionOf } from "@/lib/provinces";
import { appendRow, SHEET_TAG } from "@/lib/sheet";
import { stripJoiners } from "@/lib/thaiBreaks";

/** `link` labels `href`; without one it reads "ไปดู" */
export type FormState = { ok: boolean; message: string; href?: string; link?: string } | null;

function text(form: FormData, key: string, max = 2000): string {
  // Text pasted from the site may carry its word joiners; none are stored
  return stripJoiners(String(form.get(key) ?? "")).trim().slice(0, max);
}

async function save(write: () => Promise<void>, href: string, link?: string): Promise<FormState> {
  try {
    await write();
  } catch (err) {
    console.error(err);
    return { ok: false, message: "ส่งไม่ขึ้น ลองกดอีกทีนะ" };
  }
  // The person who just saved sees their row straight away.
  updateTag(SHEET_TAG);
  return { ok: true, message: "ขึ้นแล้ว ขอบคุณนะ", href, link };
}

export async function savePrice(_: FormState, form: FormData): Promise<FormState> {
  const placeId = text(form, "placeId", 100);
  const min = Number(text(form, "min", 10));
  const max = Number(text(form, "max", 10) || min);
  const per = text(form, "per", 50);
  const by = text(form, "by", 80);
  if (!placeId || !by || !Number.isFinite(min) || !Number.isFinite(max) || min < 0) {
    return { ok: false, message: "ยังขาดที่ ราคา หรือชื่อเรา" };
  }
  const name = places.find((p) => p.id === placeId)?.name;
  return save(
    () => appendRow("prices", { placeId, min: String(min), max: String(max), per, by }),
    `/?place=${placeId}`,
    name ? `ไปดูที่${name}` : undefined,
  );
}

export async function saveSenior(_: FormState, form: FormData): Promise<FormState> {
  // Always a new Senior: a story already on the site can't be overwritten from the form.
  const id = `s-${Date.now().toString(36)}`;
  const name = text(form, "name", 60);
  const hometown = text(form, "hometown", 60);
  // The region follows from the province, as on a Note (UX audit 7, U11).
  const region = regionOf(hometown);
  const story = text(form, "story", 4000);
  if (!name || !region || !story) {
    return { ok: false, message: "ยังขาดชื่อ จังหวัด หรือเรื่องปีแรก" };
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
        // Nothing shows a quote any more; the Sheet keeps the column, left empty.
        quote: "",
      }),
    `/seniors#${id}`,
  );
}

export async function saveGuideCheck(_: FormState, form: FormData): Promise<FormState> {
  const guideId = text(form, "guideId", 100);
  const by = text(form, "by", 80);
  if (!guideId || !by) return { ok: false, message: "เลือกคู่มือแล้วใส่ชื่อเราด้วย" };
  return save(() => appendRow("guides", { guideId, by }), `/guides/${guideId}`);
}
