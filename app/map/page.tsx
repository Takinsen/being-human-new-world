import type { Metadata } from "next";
import { Suspense } from "react";
import { categories } from "@/content/categories";
import { MapExplorer } from "@/components/map/MapExplorer";
import { getContent, placesIn, seniorFor } from "@/lib/content";
import { placeCode } from "@/lib/format";

export const metadata: Metadata = { title: "แผนที่ | ตั้งหลัก" };

export default async function MapPage() {
  const content = await getContent();
  const stops = categories.flatMap((c) =>
    placesIn(content, c.id).map((place, i) => ({ place, code: placeCode(c.id, i), senior: seniorFor(content, place) })),
  );
  return (
    <Suspense fallback={<div className="explorer map-loading">กำลังโหลดแผนที่</div>}>
      <MapExplorer stops={stops} lines={categories} />
    </Suspense>
  );
}
