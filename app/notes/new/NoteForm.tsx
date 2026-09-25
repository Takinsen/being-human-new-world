"use client";

import Link from "next/link";
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

  return (
    <form action={action} className="contribute-form">
      <label>
        โน้ต
        <textarea
          name="text"
          rows={4}
          maxLength={NOTE_MAX}
          required
          placeholder="เช่น วินหน้าซอย 20 ไปสามย่านคิด 20 บาท อย่าจ่ายเกิน"
          onChange={(e) => setLength(e.target.value.length)}
        />
        <small className="counter">
          {length}/{NOTE_MAX}
        </small>
      </label>
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
          <legend>เรื่องของสายไหน</legend>
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
          <input name="name" placeholder="เช่น พี่บอส" required maxLength={60} />
        </label>
        <label>
          บ้านเกิด
          <select name="hometown" required defaultValue="">
            <option value="" disabled>
              เลือกจังหวัด
            </option>
            {(Object.keys(provinces) as Region[]).map((r) => (
              <optgroup key={r} label={`ภาค${r}`}>
                {provinces[r].map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </optgroup>
            ))}
          </select>
        </label>
      </div>
      <button type="submit" disabled={pending}>
        {pending ? "กำลังบันทึก" : "ลงโน้ต"}
      </button>
      {state && (
        <p className={state.ok ? "form-status" : "form-status is-error"} role="status">
          {state.message}
          {state.href && (
            <>
              {" "}
              <Link href={state.href}>ดูโน้ต</Link>
            </>
          )}
        </p>
      )}
    </form>
  );
}
