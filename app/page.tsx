import { Suspense } from "react";
import { placeCategories } from "@/content/categories";
import { MapExplorer } from "@/components/map/MapExplorer";
import { PageArrive } from "@/components/PageMotion";
import type { Place } from "@/content/types";
import { getContent, notesOn, placesIn } from "@/lib/content";

// Cheapest first, so "where can I eat cheaply" is answered by the list order.
const byPrice = (a: Place, b: Place) => (a.price?.checked ? a.price.min : Infinity) - (b.price?.checked ? b.price.min : Infinity);

// Home is the map (docs/adr/0006).
export default async function Home() {
  const content = await getContent();
  // Adjusting has no Places, so it has no map chip either (docs/adr/0008).
  const stops = placeCategories.flatMap((c) => {
    const places = placesIn(content, c.id);
    return (c.id === "food" ? [...places].sort(byPrice) : places).map((place) => {
      const guides = (place.guides ?? []).flatMap((id) => content.guides.filter((g) => g.id === id));
      const vouch = content.homeTaste.find((h) => h.place.id === place.id)?.by;
      return {
        place,
        notes: notesOn(content, place.id),
        guides: guides.map((g) => ({ id: g.id, title: g.title })),
        homeTasteBy: vouch && `${vouch.name} บ้านอยู่${vouch.hometown}`,
      };
    });
  });
  return (
    <PageArrive>
      <Suspense fallback={<div className="explorer map-loading">กำลังโหลดแผนที่</div>}>
        <MapExplorer stops={stops} categories={placeCategories} />
      </Suspense>
    </PageArrive>
  );
}
