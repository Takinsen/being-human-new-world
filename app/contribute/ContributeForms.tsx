"use client";

import Link from "next/link";
import { type FormEvent, useActionState, useState } from "react";
import type { CategoryId, Region } from "@/content/types";
import { FormStatus } from "@/components/FormStatus";
import { ProvinceSelect } from "@/components/ProvinceSelect";
import { clearValidity, thaiValidity } from "@/lib/thaiValidity";
import { type FormState, saveGuideCheck, savePrice, saveSenior } from "./actions";

type Line = { id: CategoryId; name: string };
type PlaceOption = { id: string; name: string; category: CategoryId; per?: string };
type GuideOption = { id: string; title: string; category: CategoryId; checked: boolean };

function Status({ state }: { state: FormState }) {
  if (!state) return null;
  return (
    <FormStatus error={!state.ok} signal={state}>
      {state.message}
      {state.href && (
        <>
          {" "}
          <Link href={state.href}>{state.link ?? "ดูบนเว็บ"}</Link>
        </>
      )}
    </FormStatus>
  );
}

function PlaceSelect({
  lines,
  places,
  initial,
  onChange,
}: {
  lines: Line[];
  places: PlaceOption[];
  initial?: string;
  onChange?: (id: string) => void;
}) {
  return (
    <label>
      ที่
      <select name="placeId" required defaultValue={initial ?? ""} onChange={(e) => onChange?.(e.target.value)}>
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

const contributeMessages = {
  placeId: "เลือกที่",
  min: "ใส่ราคาต่ำสุด",
  by: "ใส่ชื่อเรา",
  name: "ใส่ชื่อที่ให้แสดง",
  hometown: "เลือกจังหวัดบ้านเกิด",
  story: "เล่าเรื่องปีแรก",
  guideId: "เลือกวิธี",
};

export function ContributeForms({
  lines,
  places,
  guides,
  provinces,
  initialPlace,
}: {
  lines: Line[];
  places: PlaceOption[];
  /** Empty once every Guide is confirmed: the form then has nothing to do */
  guides: GuideOption[];
  provinces: Record<Region, string[]>;
  /** Came from a Place card's price (?place=) */
  initialPlace?: string;
}) {
  const [priceState, priceAction, pricePending] = useActionState(savePrice, null);
  const [seniorState, seniorAction, seniorPending] = useActionState(saveSenior, null);
  const [guideState, guideAction, guidePending] = useActionState(saveGuideCheck, null);

  const [per, setPer] = useState(places.find((p) => p.id === initialPlace)?.per ?? "");
  const [guideId, setGuideId] = useState("");

  // The server would quietly swap a max below the min; ask instead (UX audit 7, U12).
  const checkRange = (e: FormEvent<HTMLFormElement>) => {
    const { min, max } = e.currentTarget.elements as unknown as Record<"min" | "max", HTMLInputElement>;
    if (max.value && min.value && Number(max.value) < Number(min.value)) {
      max.setCustomValidity("ราคาสูงสุดต้องไม่น้อยกว่าต่ำสุด");
      max.reportValidity();
      e.preventDefault();
    }
  };
  // Fixing either number clears the range message.
  const clearRange = (e: FormEvent<HTMLFormElement>) => {
    clearValidity(e);
    (e.currentTarget.elements.namedItem("max") as HTMLInputElement | null)?.setCustomValidity("");
  };

  return (
    <div className="contribute">
      <form
        action={priceAction}
        className="contribute-form"
        onInvalidCapture={thaiValidity(contributeMessages)}
        onInput={clearRange}
        onSubmit={checkRange}
      >
        <h2 id="price">ตรวจราคา</h2>
        <p className="status-note">ไปถึงที่แล้วเห็นราคาจริง กรอกตรงนี้ ราคาจะขึ้นพร้อมชื่อเราและเดือนนี้</p>
        <PlaceSelect
          lines={lines}
          places={places}
          initial={initialPlace}
          onChange={(id) => setPer(places.find((p) => p.id === id)?.per ?? "")}
        />
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
          ราคานี้ต่ออะไร
          <input name="per" placeholder="เช่น ต่อจาน ต่อเที่ยว" value={per} onChange={(e) => setPer(e.target.value)} />
        </label>
        <label>
          ชื่อเรา (ขึ้นคู่กับราคา)
          <input name="by" placeholder="เช่น พี่บอส" required />
        </label>
        <button type="submit" disabled={pricePending}>
          {pricePending ? "กำลังบันทึก" : "บันทึกราคา"}
        </button>
        <Status state={priceState} />
      </form>

      <form action={seniorAction} className="contribute-form" onInvalidCapture={thaiValidity(contributeMessages)} onInput={clearValidity}>
        <h2 id="senior">เรื่องปีแรกของรุ่นพี่</h2>
        <p className="status-note">เพิ่มเรื่องของรุ่นพี่คนใหม่ เรื่องที่ขึ้นเว็บแล้วแก้จากตรงนี้ไม่ได้</p>
        <div className="form-row">
          <label>
            ชื่อที่ให้แสดง
            <input name="name" placeholder="เช่น พี่บอส" required />
          </label>
          {/* Same list as the Note form; the region follows from the province */}
          <ProvinceSelect provinces={provinces} />
        </div>
        <label>
          ปีและคณะ
          <input name="about" placeholder="เช่น ปี 3 วิศวะ" />
        </label>
        <label>
          เรื่องปีแรก (เว้นบรรทัดเพื่อขึ้นย่อหน้าใหม่)
          <textarea name="story" rows={8} required />
        </label>
        <button type="submit" disabled={seniorPending}>
          {seniorPending ? "กำลังบันทึก" : "บันทึกเรื่อง"}
        </button>
        <Status state={seniorState} />
      </form>

      {guides.length > 0 && (
        <form action={guideAction} className="contribute-form" onInvalidCapture={thaiValidity(contributeMessages)} onInput={clearValidity}>
          <h2 id="guide">ลองทำตามวิธีแล้ว</h2>
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
      )}
    </div>
  );
}
