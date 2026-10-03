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
          <Link href={state.href}>{state.link ?? "ไปดู"}</Link>
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
      ที่ไหน
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
  placeId: "เลือกก่อนว่าที่ไหน",
  min: "ใส่ราคาถูกสุดด้วย",
  by: "ใส่ชื่อเราด้วย",
  name: "ใส่ชื่อที่อยากให้ขึ้น",
  hometown: "เลือกจังหวัดที่บ้านอยู่",
  story: "เล่าเรื่องปีแรกก่อน",
  guideId: "เลือกก่อนว่าคู่มือไหน",
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
      max.setCustomValidity("แพงสุดต้องไม่ต่ำกว่าถูกสุดนะ");
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
        <h2 id="price">บอกราคาที่เห็น</h2>
        <p className="status-note">ไปมาแล้วเห็นราคาเท่าไหร่ ใส่ไว้ตรงนี้ ราคาจะขึ้นพร้อมชื่อเรากับเดือนนี้</p>
        <PlaceSelect
          lines={lines}
          places={places}
          initial={initialPlace}
          onChange={(id) => setPer(places.find((p) => p.id === id)?.per ?? "")}
        />
        <div className="form-row">
          <label>
            ถูกสุดกี่บาท
            <input name="min" type="number" inputMode="numeric" min={0} required />
          </label>
          <label>
            แพงสุดกี่บาท
            <input name="max" type="number" inputMode="numeric" min={0} />
          </label>
        </div>
        <label>
          ราคานี้ต่ออะไร
          <input name="per" placeholder="เช่น ต่อจาน ต่อเที่ยว" value={per} onChange={(e) => setPer(e.target.value)} />
        </label>
        <label>
          ชื่อเรา
          <input name="by" placeholder="เช่น พี่บอส" required />
        </label>
        <button type="submit" disabled={pricePending} aria-busy={pricePending}>
          {pricePending ? "กำลังส่ง" : "ส่งราคา"}
        </button>
        <Status state={priceState} />
      </form>

      <form action={seniorAction} className="contribute-form" onInvalidCapture={thaiValidity(contributeMessages)} onInput={clearValidity}>
        <h2 id="senior">เล่าปีแรกของเรา</h2>
        <p className="status-note">ปีแรกเราเจออะไรมาบ้าง เล่าให้น้องฟัง ขึ้นเว็บแล้วกลับมาแก้ตรงนี้ไม่ได้นะ</p>
        <div className="form-row">
          <label>
            ชื่อที่อยากให้ขึ้น
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
          เรื่องปีแรก
          <textarea name="story" rows={8} required placeholder="อยากขึ้นย่อหน้าใหม่ก็เว้นบรรทัด" />
        </label>
        <button type="submit" disabled={seniorPending} aria-busy={seniorPending}>
          {seniorPending ? "กำลังส่ง" : "ส่งเรื่อง"}
        </button>
        <Status state={seniorState} />
      </form>

      {guides.length > 0 && (
        <form action={guideAction} className="contribute-form" onInvalidCapture={thaiValidity(contributeMessages)} onInput={clearValidity}>
          <h2 id="guide">ลองทำตามคู่มือแล้ว</h2>
          <p className="status-note">ลองทำตามแล้วใช้ได้จริง บอกเราตรงนี้ ป้าย &ldquo;ร่าง&rdquo; จะหายไป</p>
          <label>
            คู่มือไหน
            <select name="guideId" required value={guideId} onChange={(e) => setGuideId(e.target.value)}>
              <option value="" disabled>
                เลือกคู่มือ
              </option>
              {lines.map((l) => (
                <optgroup key={l.id} label={l.name}>
                  {guides
                    .filter((g) => g.category === l.id)
                    .map((g) => (
                      <option key={g.id} value={g.id}>
                        {g.title}
                        {g.checked ? " ลองแล้ว" : ""}
                      </option>
                    ))}
                </optgroup>
              ))}
            </select>
          </label>
          <label>
            ชื่อเรา
            <input name="by" required />
          </label>
          <button type="submit" disabled={guidePending} aria-busy={guidePending}>
            {guidePending ? "กำลังส่ง" : "ลองแล้ว ใช้ได้"}
          </button>
          <Status state={guideState} />
        </form>
      )}
    </div>
  );
}
