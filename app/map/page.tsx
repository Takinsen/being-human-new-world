import type { Metadata } from "next";
import { Suspense } from "react";
import { categories } from "@/content/categories";
import { placesIn } from "@/content/places";
import { MapExplorer } from "@/components/map/MapExplorer";
import { placeCode } from "@/lib/format";

export const metadata: Metadata = { title: "แผนที่ | ตั้งหลัก" };

export default function MapPage() {
  const stops = categories.flatMap((c) => placesIn(c.id).map((place, i) => ({ place, code: placeCode(c.id, i) })));
  return (
    <Suspense fallback={<div className="explorer map-loading">กำลังโหลดแผนที่</div>}>
      <MapExplorer stops={stops} lines={categories} />
    </Suspense>
  );
}
