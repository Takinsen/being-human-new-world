"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, Marker, TileLayer, Tooltip } from "react-leaflet";
import type { Place } from "@/content/types";

function pinIcon(n: number) {
  return L.divIcon({
    className: "map-pin",
    html: `<span>${n}</span>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
}

// The map is only an index: a pin jumps to the Place's know-how card (docs/adr/0002).
export default function MapInner({ places }: { places: Place[] }) {
  const bounds = L.latLngBounds(places.map((p) => [p.lat, p.lng]));
  return (
    <MapContainer
      className="map"
      bounds={bounds}
      boundsOptions={{ padding: [40, 40], maxZoom: 16 }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {places.map((p, i) => (
        <Marker
          key={p.id}
          position={[p.lat, p.lng]}
          icon={pinIcon(i + 1)}
          title={p.name}
          eventHandlers={{
            click: () => {
              window.location.hash = p.id;
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
