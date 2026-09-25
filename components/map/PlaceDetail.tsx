import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle, NavigationArrow, Warning } from "@phosphor-icons/react";
import { getCategory } from "@/content/categories";
import { mapsUrl } from "@/lib/format";
import { Price } from "../Price";
import { StationCode } from "../StationCode";
import type { MapStop } from "./types";

// The selected Place's know-how, in the sidebar or bottom sheet.
export function PlaceDetail({ stop, onBack }: { stop: MapStop; onBack: () => void }) {
  const { place, code, senior } = stop;
  const line = getCategory(place.category);
  return (
    <article className="detail" data-line={place.category}>
      <button type="button" className="detail-back" onClick={onBack}>
        <ArrowLeft weight="bold" aria-hidden="true" /> ทุกที่บนแผนที่
      </button>
      <header className="detail-head">
        <StationCode code={code} />
        <h2>{place.name}</h2>
      </header>
      <p className="stop-summary">{place.summary}</p>
      {place.price && <Price price={place.price} />}
      <ul className="knowhow">
        {place.knowhow.map((k) => (
          <li key={k}>
            <CheckCircle weight="bold" aria-hidden="true" />
            <span>{k}</span>
          </li>
        ))}
      </ul>
      {place.cautions?.map((c) => (
        <p className="caution" key={c}>
          <Warning weight="bold" aria-hidden="true" />
          <span>
            <span className="visually-hidden">ข้อควรระวัง: </span>
            {c}
          </span>
        </p>
      ))}
      {senior && place.senior && (
        <blockquote className="voice">
          <p>&ldquo;{place.senior.note}&rdquo;</p>
          <footer>
            {senior.name} บ้านอยู่{senior.hometown}
          </footer>
        </blockquote>
      )}
      <div className="detail-links">
        {line && (
          <Link href={`/${line.id}#${place.id}`} className="related-link">
            อ่านต่อในสาย{line.name}
            <ArrowRight weight="bold" aria-hidden="true" />
          </Link>
        )}
        <a className="nav-link" href={mapsUrl(place.lat, place.lng)} target="_blank" rel="noreferrer">
          <NavigationArrow weight="bold" aria-hidden="true" />
          นำทางใน Google Maps
          <span className="visually-hidden"> ไป{place.name} (เปิดแท็บใหม่)</span>
        </a>
      </div>
    </article>
  );
}
