import type { Region } from "@/content/types";

// Hometown as a province picked from a list, so the region follows from it (lib/provinces.ts).
// Shared by the Note form and the Senior Story form.
export function ProvinceSelect({ provinces, label = "บ้านอยู่จังหวัดไหน" }: { provinces: Record<Region, string[]>; label?: string }) {
  // Bangkok first: the list is long and many writers live here already.
  const regionsFirst = (Object.keys(provinces) as Region[]).sort((a, b) => Number(b === "กลาง") - Number(a === "กลาง"));
  return (
    <label>
      {label}
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
  );
}
