"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";
import { MapContainer, Marker, TileLayer, Tooltip, ZoomControl, useMap } from "react-leaflet";
import type { MapStop } from "./types";

// Fallback view when nothing is visible: Chula.
const CHULA: L.LatLngTuple = [13.7384, 100.5320];

function pinIcon(code: string, line: string, selected: boolean) {
  return L.divIcon({
    className: selected ? "map-pin is-selected" : "map-pin",
    html: `<span class="code" data-line="${line}">${code}</span>`,
    iconSize: [44, 44],
    iconAnchor: [22, 22],
  });
}

type Inset = { left: number; bottom: number };

// Keeps the view on what matters: all visible stops, or the selected one,
// clear of the sidebar (wide screens) or the bottom sheet (phones).
function Camera({ stops, selected, inset, animate }: { stops: MapStop[]; selected?: MapStop; inset: Inset; animate: boolean }) {
  const map = useMap();
  const visibleKey = stops.map((s) => s.place.id).join(",");

  useEffect(() => {
    if (selected) return;
    const opts = { paddingTopLeft: [inset.left + 40, 80] as L.PointTuple, paddingBottomRight: [40, inset.bottom + 40] as L.PointTuple, maxZoom: 16, animate };
    if (stops.length) map.fitBounds(L.latLngBounds(stops.map((s) => [s.place.lat, s.place.lng])), opts);
    else map.setView(CHULA, 15, { animate });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleKey, inset.left, inset.bottom]);

  useEffect(() => {
    if (!selected) return;
    const { lat, lng } = selected.place;
    map.fitBounds(L.latLngBounds([[lat, lng]]), {
      paddingTopLeft: [inset.left + 40, 80],
      paddingBottomRight: [40, inset.bottom + 40],
      maxZoom: 17,
      animate,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected?.place.id]);

  return null;
}

export default function ExplorerMap({
  stops,
  selectedId,
  onSelect,
  inset,
}: {
  stops: MapStop[];
  selectedId?: string;
  onSelect: (id: string) => void;
  inset: Inset;
}) {
  const animate = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const selected = stops.find((s) => s.place.id === selectedId);
  return (
    <MapContainer
      className="explorer-map"
      center={CHULA}
      zoom={15}
      zoomControl={false}
      zoomAnimation={animate}
      fadeAnimation={animate}
      markerZoomAnimation={animate}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ZoomControl position="topright" />
      <Camera stops={stops} selected={selected} inset={inset} animate={animate} />
      {stops.map(({ place, code }) => (
        <Marker
          key={place.id}
          position={[place.lat, place.lng]}
          icon={pinIcon(code, place.category, place.id === selectedId)}
          zIndexOffset={place.id === selectedId ? 1000 : 0}
          eventHandlers={{
            add: (e) => e.target.getElement()?.setAttribute("aria-label", `${code} ${place.name}`),
            click: () => onSelect(place.id),
            keypress: (e) => {
              const key = (e.originalEvent as KeyboardEvent).key;
              if (key === "Enter" || key === " ") onSelect(place.id);
            },
          }}
        >
          <Tooltip direction="top" offset={[0, -16]}>
            {place.name}
          </Tooltip>
        </Marker>
      ))}
    </MapContainer>
  );
}
