"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import type { CategoryId, Senior } from "@/content/types";
import { type FormState, saveGuideCheck, saveNote, savePrice, saveSenior } from "./actions";

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
  seniors,
  guides,
}: {
  lines: Line[];
  places: PlaceOption[];
  seniors: Senior[];
  guides: GuideOption[];
}) {
  const [priceState, priceAction, pricePending] = useActionState(savePrice, null);
  const [noteState, noteAction, notePending] = useActionState(saveNote, null);
  const [seniorState, seniorAction, seniorPending] = useActionState(saveSenior, null);
  const [guideState, guideAction, guidePending] = useActionState(saveGuideCheck, null);

  const [per, setPer] = useState("");
  const [seniorId, setSeniorId] = useState("new");
  const [guideId, setGuideId] = useState("");
  const editing = seniors.find((s) => s.id === seniorId);

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

      <form action={noteAction} className="contribute-form">
        <h2>รุ่นพี่แนะนำที่</h2>
        <p className="status-note">คำแนะนำสั้นๆ ในคำพูดของรุ่นพี่เอง จะขึ้นในการ์ดของที่นั้น</p>
        <PlaceSelect lines={lines} places={places} />
        <label>
          รุ่นพี่
          <select name="seniorId" required defaultValue="">
            <option value="" disabled>
              เลือกรุ่นพี่
            </option>
            {seniors.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.hometown})
              </option>
            ))}
          </select>
        </label>
        <label>
          คำแนะนำ
          <textarea name="note" rows={3} required />
        </label>
        <label className="check">
          <input type="checkbox" name="homeTaste" />
          ร้านนี้รสชาติเหมือนอาหารบ้านของรุ่นพี่ (ขึ้นในหัวข้อรสชาติบ้าน)
        </label>
        <button type="submit" disabled={notePending}>
          {notePending ? "กำลังบันทึก" : "บันทึกคำแนะนำ"}
        </button>
        <Status state={noteState} />
      </form>

      <form action={seniorAction} className="contribute-form" key={seniorId}>
        <h2>เรื่องปีแรกของรุ่นพี่</h2>
        <p className="status-note">เพิ่มรุ่นพี่ใหม่ หรือเลือกชื่อเดิมเพื่อแก้เรื่องของตัวเอง</p>
        <label>
          รุ่นพี่
          <select name="id" value={seniorId} onChange={(e) => setSeniorId(e.target.value)}>
            <option value="new">เพิ่มรุ่นพี่ใหม่</option>
            {seniors.map((s) => (
              <option key={s.id} value={s.id}>
                แก้เรื่องของ{s.name}
              </option>
            ))}
          </select>
        </label>
        <div className="form-row">
          <label>
            ชื่อที่ให้แสดง
            <input name="name" placeholder="เช่น พี่บอส" defaultValue={editing?.name} required />
          </label>
          <label>
            บ้านเกิด (จังหวัด)
            <input name="hometown" defaultValue={editing?.hometown} required />
          </label>
        </div>
        <div className="form-row">
          <label>
            ภาค
            <select name="region" defaultValue={editing?.region ?? ""} required>
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
            <input name="about" placeholder="เช่น ปี 3 วิศวะ" defaultValue={editing?.about} />
          </label>
        </div>
        <label>
          เรื่องปีแรก (เว้นบรรทัดเพื่อขึ้นย่อหน้าใหม่)
          <textarea name="story" rows={8} defaultValue={editing?.story.join("\n\n")} required />
        </label>
        <label>
          ประโยคเด่นที่ให้ขึ้นหน้าแรก
          <input name="quote" defaultValue={editing?.quote} />
        </label>
        <button type="submit" disabled={seniorPending}>
          {seniorPending ? "กำลังบันทึก" : "บันทึกเรื่อง"}
        </button>
        <Status state={seniorState} />
      </form>

      <form action={guideAction} className="contribute-form">
        <h2>ลองทำตามวิธีแล้ว</h2>
        <p className="status-note">ทำตามขั้นตอนจริงแล้วได้ผล ป้าย &ldquo;ร่าง&rdquo; ของวิธีนั้นจะหายไป</p>
        <input type="hidden" name="category" value={guides.find((g) => g.id === guideId)?.category ?? ""} />
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
