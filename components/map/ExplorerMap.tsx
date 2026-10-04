"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { MapContainer, Marker, TileLayer, Tooltip, ZoomControl, useMap, useMapEvents } from "react-leaflet";
import { logoFor } from "@/lib/brands";
import { placeIconKey } from "../icons";
import type { MapStop } from "./types";

// Fallback view when nothing is visible: Chula.
const CHULA: L.LatLngTuple = [13.7384, 100.5320];
const PIN = 44; // px, also the tap target
const GAP = PIN + 4; // pins closer than this on screen get nudged apart

// The pin shows its category's icon (docs/adr/0006); the icon itself is CSS.
// A station or a chain's branch shows its logo instead, on white, ringed in the category's
// colour (lib/brands.ts). The logo is decorative: the marker's tooltip names the Place.
// Built once per look, so Leaflet only swaps a marker's element when it changes.
const icons = new Map<string, L.DivIcon>();
function pinIcon(category: string, icon: string, logo: string | undefined, selected: boolean, leaving = false) {
  const key = `${category}:${icon}:${logo}:${selected}:${leaving}`;
  if (!icons.has(key)) icons.set(key, makePinIcon(category, icon, logo, selected, leaving));
  return icons.get(key)!;
}

function makePinIcon(category: string, icon: string, logo: string | undefined, selected: boolean, leaving: boolean) {
  return L.divIcon({
    className: `map-pin${selected ? " is-selected" : ""}${leaving ? " is-leaving" : ""}`,
    html: logo
      ? `<span class="pin has-logo" data-line="${category}"><img class="brand-logo" src="${logo}" alt=""></span>`
      : `<span class="pin" data-line="${category}" data-icon="${icon}"></span>`,
    iconSize: [PIN, PIN],
    iconAnchor: [PIN / 2, PIN / 2],
  });
}

type Inset = { left: number; top: number; bottom: number };

// Keeps the view on what matters: all visible stops, or the selected one,
// clear of the sidebar (wide screens) or the bottom sheet (phones).
function Camera({ stops, selected, inset, animate }: { stops: MapStop[]; selected?: MapStop; inset: Inset; animate: boolean }) {
  const map = useMap();
  const visibleKey = stops.map((s) => s.place.id).join(",");

  useEffect(() => {
    if (selected) return;
    const opts = { paddingTopLeft: [inset.left + 40, inset.top + 24] as L.PointTuple, paddingBottomRight: [40, inset.bottom + 40] as L.PointTuple, maxZoom: 16, animate };
    if (stops.length) map.fitBounds(L.latLngBounds(stops.map((s) => [s.place.lat, s.place.lng])), opts);
    else map.setView(CHULA, 15, { animate });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleKey, inset.left, inset.top, inset.bottom]);

  useEffect(() => {
    if (!selected) return;
    const { lat, lng } = selected.place;
    map.fitBounds(L.latLngBounds([[lat, lng]]), {
      paddingTopLeft: [inset.left + 40, inset.top + 24],
      paddingBottomRight: [40, inset.bottom + 40],
      // 16 keeps the neighbours in view, not just the one pin
      maxZoom: 16,
      animate,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected?.place.id]);

  // A pan or zoom still running when the page changes throws `_leaflet_pos`
  // errors once the map is gone. Layout cleanups run before MapContainer
  // removes the map, so finish the animation here while the map still exists.
  useLayoutEffect(
    () => () => {
      const m = map as L.Map & { _animatingZoom?: boolean; _onZoomTransitionEnd?: () => void };
      if (m._animatingZoom) m._onZoomTransitionEnd?.();
      m.stop();
    },
    [map],
  );

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

const FADE_MS = 200; // how long a filtered-out pin lingers; keep in step with .is-leaving in globals.css

function Pins({
  stops,
  selectedId,
  onSelect,
  inset,
  animate,
}: {
  stops: MapStop[];
  selectedId?: string;
  onSelect: (id: string) => void;
  inset: Inset;
  animate: boolean;
}) {
  const map = useMap();
  const positions = useSpreadPositions(stops);
  const markers = useRef(new Map<string, L.Marker>());

  // A pin filtered out isn't removed at once: it stays, unclickable, for FADE_MS while CSS fades it.
  // The ghosts are worked out during render (not in an effect) so the pin never blinks off first.
  const stopsKey = stops.map((s) => s.place.id).join(",");
  const [shown, setShown] = useState({ key: stopsKey, stops });
  const [ghosts, setGhosts] = useState<MapStop[]>([]);
  if (shown.key !== stopsKey) {
    setShown({ key: stopsKey, stops });
    setGhosts(animate ? shown.stops.filter((old) => !stops.some((s) => s.place.id === old.place.id)) : []);
  }
  useEffect(() => {
    if (!ghosts.length) return;
    const t = setTimeout(() => setGhosts([]), FADE_MS);
    return () => clearTimeout(t);
  }, [ghosts]);
  // Where each pin was last drawn, so a ghost fades where it stood rather than at its true spot
  const drawn = useRef(new Map<string, L.LatLng>());
  const ghostAt = (s: MapStop) => drawn.current.get(s.place.id) ?? L.latLng(s.place.lat, s.place.lng);

  // Pins that weren't on the map a moment ago fade in. Done on the element, not in the icon,
  // because Leaflet swaps the element when a pin is selected, and that must not fade again.
  const known = useRef(new Set<string>());
  useEffect(() => {
    const now = new Set(stops.map((s) => s.place.id));
    for (const id of now) {
      if (known.current.has(id)) continue;
      const el = markers.current.get(id)?.getElement();
      if (!el) continue;
      el.classList.add("is-entering");
      el.addEventListener("animationend", () => el.classList.remove("is-entering"), { once: true });
    }
    known.current = now;
  }, [stopsKey]); // eslint-disable-line react-hooks/exhaustive-deps

  // Leaflet rebuilds a marker's element when its icon changes, so label every render.
  useEffect(() => {
    for (const { place } of stops) {
      const el = markers.current.get(place.id)?.getElement();
      if (!el) continue;
      drawn.current.set(place.id, markers.current.get(place.id)!.getLatLng());
      el.setAttribute("aria-label", place.name);
      // Tabbing to a pin brings it out from under the chips or the sheet.
      el.onfocus = () =>
        map.panInside(markers.current.get(place.id)!.getLatLng(), {
          paddingTopLeft: [inset.left + 24, inset.top + 24],
          paddingBottomRight: [24, inset.bottom + 24],
        });
      if (place.id === selectedId) el.setAttribute("aria-current", "true");
      else el.removeAttribute("aria-current");
    }
  });

  const live = stops.map(({ place }) => (
    <Marker
      key={place.id}
      ref={(m) => {
        if (m) markers.current.set(place.id, m);
        else markers.current.delete(place.id);
      }}
      position={positions.get(place.id) ?? [place.lat, place.lng]}
      icon={pinIcon(place.category, placeIconKey(place), logoFor(place.brand)?.src, place.id === selectedId)}
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

  const leaving = ghosts
    .filter((g) => !stops.some((s) => s.place.id === g.place.id))
    .map((g) => (
      <Marker
        key={g.place.id}
        position={ghostAt(g)}
        icon={pinIcon(g.place.category, placeIconKey(g.place), logoFor(g.place.brand)?.src, false, true)}
        interactive={false}
        keyboard={false}
      />
    ));

  return [...live, ...leaving];
}

function Inert({ when }: { when: boolean }) {
  const map = useMap();
  useEffect(() => {
    map.getContainer().toggleAttribute("inert", when);
  }, [map, when]);
  return null;
}

export default function ExplorerMap({
  stops,
  selectedId,
  onSelect,
  inset,
  covered = false,
}: {
  stops: MapStop[];
  selectedId?: string;
  onSelect: (id: string) => void;
  inset: Inset;
  /** A full sheet hides the map, so its pins and links leave the Tab order */
  covered?: boolean;
}) {
  const animate = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const selected = stops.find((s) => s.place.id === selectedId);
  return (
    <MapContainer
      className="explorer-map"
      ref={(m) => m?.getContainer().setAttribute("aria-label", "แผนที่ย่านจุฬาฯ")}
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
      <ZoomControl position="topright" zoomInTitle="ขยายแผนที่" zoomOutTitle="ย่อแผนที่" />
      <Camera stops={stops} selected={selected} inset={inset} animate={animate} />
      <Pins stops={stops} selectedId={selectedId} onSelect={onSelect} inset={inset} animate={animate} />
      <Inert when={covered} />
    </MapContainer>
  );
}
