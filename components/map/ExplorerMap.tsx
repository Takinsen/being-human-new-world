"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, Marker, TileLayer, Tooltip, ZoomControl, useMap, useMapEvents } from "react-leaflet";
import type { MapStop } from "./types";

// Fallback view when nothing is visible: Chula.
const CHULA: L.LatLngTuple = [13.7384, 100.5320];
const PIN = 44; // px, also the tap target
const GAP = PIN + 4; // pins closer than this on screen get nudged apart

// The pin shows its category's icon (docs/adr/0006); the icon itself is CSS.
function pinIcon(category: string, selected: boolean) {
  return L.divIcon({
    className: selected ? "map-pin is-selected" : "map-pin",
    html: `<span class="pin" data-line="${category}"></span>`,
    iconSize: [PIN, PIN],
    iconAnchor: [PIN / 2, PIN / 2],
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

  // A pan still running when the page changes throws `_leaflet_pos` errors.
  useEffect(() => () => void map.stop(), [map]);

  return null;
}

/** Where each pin is drawn at the current zoom: its true spot, pushed apart from pins it would cover. */
function useSpreadPositions(stops: MapStop[]) {
  const map = useMap();
  const [zoom, setZoom] = useState(() => map.getZoom());
  useMapEvents({ zoomend: () => setZoom(map.getZoom()) });

  return useMemo(() => {
    const pts = stops.map((s) => map.project([s.place.lat, s.place.lng], zoom));
    for (let round = 0; round < 12; round++) {
      let moved = false;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          let dx = pts[j].x - pts[i].x;
          let dy = pts[j].y - pts[i].y;
          let dist = Math.hypot(dx, dy);
          if (dist >= GAP) continue;
          if (dist < 0.01) {
            // Same spot: split them along a fixed direction so it's stable.
            dx = Math.cos(j);
            dy = Math.sin(j);
            dist = 1;
          }
          const push = (GAP - dist) / 2 / dist;
          pts[i] = pts[i].subtract([dx * push, dy * push]);
          pts[j] = pts[j].add([dx * push, dy * push]);
          moved = true;
        }
      }
      if (!moved) break;
    }
    return new Map(stops.map((s, i) => [s.place.id, map.unproject(pts[i], zoom)]));
  }, [stops, zoom, map]);
}

function Pins({ stops, selectedId, onSelect }: { stops: MapStop[]; selectedId?: string; onSelect: (id: string) => void }) {
  const positions = useSpreadPositions(stops);
  const markers = useRef(new Map<string, L.Marker>());

  // Leaflet rebuilds a marker's element when its icon changes, so label every render.
  useEffect(() => {
    for (const { place } of stops) {
      const el = markers.current.get(place.id)?.getElement();
      if (!el) continue;
      el.setAttribute("aria-label", place.name);
      if (place.id === selectedId) el.setAttribute("aria-current", "true");
      else el.removeAttribute("aria-current");
    }
  });

  return stops.map(({ place }) => (
    <Marker
      key={place.id}
      ref={(m) => {
        if (m) markers.current.set(place.id, m);
        else markers.current.delete(place.id);
      }}
      position={positions.get(place.id) ?? [place.lat, place.lng]}
      icon={pinIcon(place.category, place.id === selectedId)}
      zIndexOffset={place.id === selectedId ? 1000 : 0}
      eventHandlers={{
        click: () => onSelect(place.id),
        keypress: (e) => {
          const key = (e.originalEvent as KeyboardEvent).key;
          if (key === "Enter" || key === " ") onSelect(place.id);
        },
      }}
    >
      <Tooltip direction="top" offset={[0, -PIN / 2 + 4]}>
        {place.name}
      </Tooltip>
    </Marker>
  ));
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
      <Pins stops={stops} selectedId={selectedId} onSelect={onSelect} />
    </MapContainer>
  );
}
