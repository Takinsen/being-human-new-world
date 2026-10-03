"use client";

import { useActionState, useState } from "react";
import type { CategoryId, Region } from "@/content/types";
import { NOTE_MAX } from "@/content/notes";
import { FormStatus } from "@/components/FormStatus";
import { ProvinceSelect } from "@/components/ProvinceSelect";
import { clearValidity, thaiValidity } from "@/lib/thaiValidity";
import { saveNote } from "../actions";

const noteMessages = {
  text: "เขียนก่อนว่าอยากบอกอะไร",
  category: "เลือกก่อนว่าเป็นเรื่องอะไร",
  name: "ใส่ชื่อด้วย ชื่อเล่นก็ได้",
  hometown: "เลือกจังหวัดที่บ้านอยู่",
};

type Line = { id: CategoryId; name: string; hasPlaces: boolean };
type PlaceOption = { id: string; name: string; category: CategoryId };

export function NoteForm({
  lines,
  places,
  provinces,
  initialPlace,
  initialLine,
}: {
  lines: Line[];
  places: PlaceOption[];
  provinces: Record<Region, string[]>;
  initialPlace?: string;
  /** The Feed category the writer came from; picked already, and kept after posting */
  initialLine?: CategoryId;
}) {
  const [state, action, pending] = useActionState(saveNote, null);
  const [placeId, setPlaceId] = useState(initialPlace ?? "");
  const [length, setLength] = useState(0);
  const place = places.find((p) => p.id === placeId);

  return (
    <form action={action} className="contribute-form" onInvalidCapture={thaiValidity(noteMessages)} onInput={clearValidity}>
      {initialLine && <input type="hidden" name="from" value={initialLine} />}
      <label>
        อยากบอกอะไร
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
        เรื่องนี้อยู่ที่ไหน
        <select name="placeId" value={placeId} onChange={(e) => setPlaceId(e.target.value)}>
          <option value="">ไม่ได้เจาะจงที่ไหน</option>
          {/* Adjusting has no Places, so no empty group for it (docs/adr/0008) */}
          {lines.filter((l) => l.hasPlaces).map((l) => (
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
          <legend>เป็นเรื่องอะไร</legend>
          {lines.map((l) => (
            <label key={l.id} className="check" data-line={l.id}>
              <input type="radio" name="category" value={l.id} required defaultChecked={l.id === initialLine} />
              {l.name}
            </label>
          ))}
        </fieldset>
      )}
      {place?.category === "food" && (
        <label className="check">
          <input type="checkbox" name="homeTaste" />
          ร้านนี้รสชาติเหมือนที่บ้านเลย
        </label>
      )}
      <div className="form-row">
        <label>
          ชื่อ
          <input name="name" placeholder="ชื่อเล่นก็ได้ เช่น ต้น" required maxLength={60} autoComplete="nickname" />
        </label>
        <ProvinceSelect provinces={provinces} />
      </div>
      {state && (
        <FormStatus error signal={state}>
          {state.message}
        </FormStatus>
      )}
      {/* Say it before they press: there's no edit or delete on the site (docs/adr/0005) */}
      <p className="status-note" id="note-public">
        กดแล้วขึ้นเว็บเลย พร้อมชื่อกับจังหวัด กลับมาแก้หรือลบเองไม่ได้นะ
      </p>
      <button type="submit" disabled={pending} aria-busy={pending} aria-describedby="note-public">
        {pending ? "กำลังส่ง" : "ส่งโน้ต"}
      </button>
    </form>
  );
}
