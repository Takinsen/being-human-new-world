import { Suspense } from "react";
import { categories } from "@/content/categories";
import { MapExplorer } from "@/components/map/MapExplorer";
import { getContent, notesOn, placesIn } from "@/lib/content";
import { placeCode } from "@/lib/format";

// Home is the map (docs/adr/0006).
export default async function Home() {
  const content = await getContent();
  const stops = categories.flatMap((c) =>
    placesIn(content, c.id).map((place, i) => ({ place, code: placeCode(c.id, i), notes: notesOn(content, place.id) })),
  );
  return (
    <Suspense fallback={<div className="explorer map-loading">กำลังโหลดแผนที่</div>}>
      <MapExplorer stops={stops} lines={categories} />
    </Suspense>
  );
}
