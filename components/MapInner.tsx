"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, Marker, TileLayer, Tooltip } from "react-leaflet";
import { categories } from "@/content/categories";
import type { Place } from "@/content/types";
import { placeCode } from "@/lib/format";

function pinIcon(code: string, line: string) {
  return L.divIcon({
    className: "map-pin",
    html: `<span class="code" data-line="${line}">${code}</span>`,
    iconSize: [44, 44],
    iconAnchor: [22, 22],
  });
}

// The map is only an index: a pin jumps to the Place's know-how (docs/adr/0002).
export default function MapInner({ places }: { places: Place[] }) {
  const bounds = L.latLngBounds(places.map((p) => [p.lat, p.lng]));
  const animate = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const lineName = categories.find((c) => c.id === places[0]?.category)?.name ?? "";
  const go = (id: string) => {
    window.location.hash = id;
  };
  return (
    <MapContainer
      className="map"
      bounds={bounds}
      boundsOptions={{ padding: [40, 40], maxZoom: 16 }}
      scrollWheelZoom={false}
      zoomAnimation={animate}
      fadeAnimation={animate}
      markerZoomAnimation={animate}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {places.map((p, i) => (
        <Marker
          key={p.id}
          position={[p.lat, p.lng]}
          icon={pinIcon(placeCode(p.category, i), p.category)}
          title={p.name}
          eventHandlers={{
            add: (e) => {
              const code = placeCode(p.category, i);
              e.target.getElement()?.setAttribute("aria-label", `${code} ${p.name} สาย${lineName}`);
            },
            click: () => go(p.id),
            keypress: (e) => {
              const key = (e.originalEvent as KeyboardEvent).key;
              if (key === "Enter" || key === " ") go(p.id);
            },
          }}
        >
          <Tooltip direction="top" offset={[0, -14]}>
            {p.name}
          </Tooltip>
        </Marker>
      ))}
    </MapContainer>
  );
}
