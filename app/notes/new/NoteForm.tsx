"use client";

import { useActionState, useState } from "react";
import type { CategoryId, Region } from "@/content/types";
import { NOTE_MAX } from "@/content/notes";
import { saveNote } from "../actions";

type Line = { id: CategoryId; name: string };
type PlaceOption = { id: string; name: string; category: CategoryId };

export function NoteForm({
  lines,
  places,
  provinces,
  initialPlace,
}: {
  lines: Line[];
  places: PlaceOption[];
  provinces: Record<Region, string[]>;
  initialPlace?: string;
}) {
  const [state, action, pending] = useActionState(saveNote, null);
  const [placeId, setPlaceId] = useState(initialPlace ?? "");
  const [length, setLength] = useState(0);
  const place = places.find((p) => p.id === placeId);
  // Bangkok first: the list is long and many writers live here already.
  const regionsFirst = (Object.keys(provinces) as Region[]).sort((a, b) => Number(b === "กลาง") - Number(a === "กลาง"));

  return (
    <form action={action} className="contribute-form" onInvalidCapture={thaiValidity} onInput={clearValidity}>
      <label>
        โน้ต
        <textarea
          name="text"
          rows={4}
          maxLength={NOTE_MAX}
          required
          aria-describedby="note-counter"
          placeholder="เช่น วินหน้าซอย 20 ไปสามย่านคิด 20 บาท อย่าจ่ายเกิน"
          onChange={(e) => setLength(e.target.value.length)}
        />
      </label>
      <small className="counter field-counter" id="note-counter">
        {length}/{NOTE_MAX} ตัวอักษร
      </small>
      <p className="visually-hidden" aria-live="polite">
        {length >= NOTE_MAX - 20 ? `เหลือ ${NOTE_MAX - length} ตัวอักษร` : ""}
      </p>
      <label>
        ที่บนแผนที่ (ไม่ใส่ก็ได้)
        <select name="placeId" value={placeId} onChange={(e) => setPlaceId(e.target.value)}>
          <option value="">ไม่ผูกกับที่ไหน</option>
          {lines.map((l) => (
            <optgroup key={l.id} label={l.name}>
              {places
                .filter((p) => p.category === l.id)
                .map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
            </optgroup>
          ))}
        </select>
      </label>
      {!place && (
        <fieldset className="line-pick">
          <legend>เรื่องหมวดไหน</legend>
          {lines.map((l) => (
            <label key={l.id} className="check" data-line={l.id}>
              <input type="radio" name="category" value={l.id} required />
              {l.name}
            </label>
          ))}
        </fieldset>
      )}
      {place?.category === "food" && (
        <label className="check">
          <input type="checkbox" name="homeTaste" />
          ร้านนี้รสชาติเหมือนอาหารบ้านเรา (ขึ้นในรสชาติบ้าน)
        </label>
      )}
      <div className="form-row">
        <label>
          ชื่อ
          <input name="name" placeholder="ชื่อเล่นก็ได้ เช่น ต้น" required maxLength={60} autoComplete="nickname" />
        </label>
        <label>
          บ้านเกิด
          <select name="hometown" required defaultValue="">
            <option value="" disabled>
              เลือกจังหวัด
            </option>
            {regionsFirst.map((r) => (
              <optgroup key={r} label={`ภาค${r}`}>
                {[...provinces[r]].sort((a, b) => Number(b === "กรุงเทพมหานคร") - Number(a === "กรุงเทพมหานคร")).map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </optgroup>
            ))}
          </select>
        </label>
      </div>
      <p className="form-status is-error" role="alert" hidden={!state}>
        {state?.message}
      </p>
      <button type="submit" disabled={pending}>
        {pending ? "กำลังบันทึก" : "ลงโน้ต"}
      </button>
    </form>
  );
}

// The browser's own messages follow the browser's language; the site is Thai.
function thaiValidity(e: React.FormEvent<HTMLFormElement>) {
  const field = e.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
  if (!field.validity.valueMissing) return;
  const message: Record<string, string> = {
    text: "เขียนโน้ตก่อน",
    category: "เลือกหมวดของโน้ตนี้",
    name: "ใส่ชื่อที่จะให้ขึ้นกับโน้ต",
    hometown: "เลือกจังหวัดบ้านเกิด",
  };
  field.setCustomValidity(message[field.name] ?? "กรอกช่องนี้ก่อน");
}

function clearValidity(e: React.FormEvent<HTMLFormElement>) {
  const target = e.target as HTMLInputElement;
  target.setCustomValidity?.("");
  // A radio group shares one message; clear it on every radio.
  if (target.type === "radio") target.form?.querySelectorAll<HTMLInputElement>(`input[name="${target.name}"]`).forEach((r) => r.setCustomValidity(""));
}
