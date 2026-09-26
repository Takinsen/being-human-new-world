"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import type { CategoryId } from "@/content/types";
import { type FormState, saveGuideCheck, savePrice, saveSenior } from "./actions";

type Line = { id: CategoryId; name: string };
type PlaceOption = { id: string; name: string; category: CategoryId; per?: string };
type GuideOption = { id: string; title: string; category: CategoryId; checked: boolean };

const regions = ["เหนือ", "อีสาน", "กลาง", "ใต้", "ตะวันออก", "ตะวันตก"];

function Status({ state }: { state: FormState }) {
  if (!state) return null;
  return (
    <p className={state.ok ? "form-status" : "form-status is-error"} role="status">
      {state.message}
      {state.href && (
        <>
          {" "}
          <Link href={state.href}>ดูบนเว็บ</Link>
        </>
      )}
    </p>
  );
}

function PlaceSelect({ lines, places, onChange }: { lines: Line[]; places: PlaceOption[]; onChange?: (id: string) => void }) {
  return (
    <label>
      ที่
      <select name="placeId" required defaultValue="" onChange={(e) => onChange?.(e.target.value)}>
        <option value="" disabled>
          เลือกที่
        </option>
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
  );
}

export function ContributeForms({
  lines,
  places,
  guides,
}: {
  lines: Line[];
  places: PlaceOption[];
  guides: GuideOption[];
}) {
  const [priceState, priceAction, pricePending] = useActionState(savePrice, null);
  const [seniorState, seniorAction, seniorPending] = useActionState(saveSenior, null);
  const [guideState, guideAction, guidePending] = useActionState(saveGuideCheck, null);

  const [per, setPer] = useState("");
  const [guideId, setGuideId] = useState("");

  return (
    <div className="contribute">
      <form action={priceAction} className="contribute-form">
        <h2>ตรวจราคา</h2>
        <p className="status-note">ไปถึงที่แล้วเห็นราคาจริง กรอกตรงนี้ ราคาจะขึ้นพร้อมชื่อคนตรวจและเดือนนี้</p>
        <PlaceSelect lines={lines} places={places} onChange={(id) => setPer(places.find((p) => p.id === id)?.per ?? "")} />
        <div className="form-row">
          <label>
            ต่ำสุด (บาท)
            <input name="min" type="number" inputMode="numeric" min={0} required />
          </label>
          <label>
            สูงสุด (บาท)
            <input name="max" type="number" inputMode="numeric" min={0} />
          </label>
        </div>
        <label>
          คิดแบบไหน
          <input name="per" placeholder="เช่น ต่อจาน ต่อเที่ยว" value={per} onChange={(e) => setPer(e.target.value)} />
        </label>
        <label>
          ชื่อคนตรวจ
          <input name="by" placeholder="เช่น พี่บอส" required />
        </label>
        <button type="submit" disabled={pricePending}>
          {pricePending ? "กำลังบันทึก" : "บันทึกราคา"}
        </button>
        <Status state={priceState} />
      </form>

      <form action={seniorAction} className="contribute-form">
        <h2>เรื่องปีแรกของรุ่นพี่</h2>
        <p className="status-note">เพิ่มเรื่องของรุ่นพี่คนใหม่ เรื่องที่ขึ้นเว็บแล้วแก้จากตรงนี้ไม่ได้</p>
        <div className="form-row">
          <label>
            ชื่อที่ให้แสดง
            <input name="name" placeholder="เช่น พี่บอส" required />
          </label>
          <label>
            บ้านเกิด (จังหวัด)
            <input name="hometown" required />
          </label>
        </div>
        <div className="form-row">
          <label>
            ภาค
            <select name="region" defaultValue="" required>
              <option value="" disabled>
                เลือกภาค
              </option>
              {regions.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </label>
          <label>
            ปีและคณะ
            <input name="about" placeholder="เช่น ปี 3 วิศวะ" />
          </label>
        </div>
        <label>
          เรื่องปีแรก (เว้นบรรทัดเพื่อขึ้นย่อหน้าใหม่)
          <textarea name="story" rows={8} required />
        </label>
        <label>
          ประโยคเด่นที่ให้ขึ้นหน้าแรก
          <input name="quote" />
        </label>
        <button type="submit" disabled={seniorPending}>
          {seniorPending ? "กำลังบันทึก" : "บันทึกเรื่อง"}
        </button>
        <Status state={seniorState} />
      </form>

      <form action={guideAction} className="contribute-form">
        <h2>ลองทำตามวิธีแล้ว</h2>
        <p className="status-note">ทำตามขั้นตอนจริงแล้วได้ผล ป้าย &ldquo;ร่าง&rdquo; ของวิธีนั้นจะหายไป</p>
        <label>
          วิธี
          <select name="guideId" required value={guideId} onChange={(e) => setGuideId(e.target.value)}>
            <option value="" disabled>
              เลือกวิธี
            </option>
            {lines.map((l) => (
              <optgroup key={l.id} label={l.name}>
                {guides
                  .filter((g) => g.category === l.id)
                  .map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.title}
                      {g.checked ? " (ยืนยันแล้ว)" : ""}
                    </option>
                  ))}
              </optgroup>
            ))}
          </select>
        </label>
        <label>
          ชื่อคนที่ลองทำ
          <input name="by" required />
        </label>
        <button type="submit" disabled={guidePending}>
          {guidePending ? "กำลังบันทึก" : "ยืนยันวิธีนี้"}
        </button>
        <Status state={guideState} />
      </form>
    </div>
  );
}
