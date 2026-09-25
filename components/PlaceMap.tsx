"use client";

import dynamic from "next/dynamic";
import type { Place } from "@/content/types";

// Leaflet touches `window`, so the map renders only in the browser.
const MapInner = dynamic(() => import("./MapInner"), {
  ssr: false,
  loading: () => <div className="map map-loading">กำลังโหลดแผนที่</div>,
});

export function PlaceMap({ places }: { places: Place[] }) {
  return <MapInner places={places} />;
}
