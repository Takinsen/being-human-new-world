import { Suspense } from "react";
import { categories } from "@/content/categories";
import { MapExplorer } from "@/components/map/MapExplorer";
import type { Place } from "@/content/types";
import { getContent, notesOn, placesIn } from "@/lib/content";

// Cheapest first, so "where can I eat cheaply" is answered by the list order.
const byPrice = (a: Place, b: Place) => (a.price?.checked ? a.price.min : Infinity) - (b.price?.checked ? b.price.min : Infinity);

// Home is the map (docs/adr/0006).
export default async function Home() {
  const content = await getContent();
  const stops = categories.flatMap((c) => {
    const places = placesIn(content, c.id);
    return (c.id === "food" ? [...places].sort(byPrice) : places).map((place) => {
      const guide = content.guides.find((g) => g.id === place.guide);
      const vouch = content.homeTaste.find((h) => h.place.id === place.id)?.by;
      return {
        place,
        notes: notesOn(content, place.id),
        guide: guide && { id: guide.id, title: guide.title },
        homeTasteBy: vouch && `${vouch.name} บ้านอยู่${vouch.hometown}`,
      };
    });
  });
  return (
    <Suspense fallback={<div className="explorer map-loading">กำลังโหลดแผนที่</div>}>
      <MapExplorer stops={stops} categories={categories} />
    </Suspense>
  );
}
