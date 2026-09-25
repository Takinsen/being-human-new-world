import Link from "next/link";
import { CheckCircle, MapPin, NavigationArrow, Warning } from "@phosphor-icons/react/dist/ssr";
import type { Place, Senior } from "@/content/types";
import { mapsUrl } from "@/lib/format";
import { Photo } from "./Photo";
import { Price } from "./Price";
import { StationCode } from "./StationCode";

// A Place as a station on its category's line: no card, the line joins them.
export function PlaceStop({ place, code, senior }: { place: Place; code: string; senior?: Senior }) {
  return (
    <article className="stop" id={place.id}>
      {place.photo && <Photo photo={place.photo} className="stop-photo" />}
      <header className="stop-head">
        <StationCode code={code} />
        <h3>{place.name}</h3>
      </header>
      <div className="stop-body">
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
        <div className="stop-links">
          <Link className="nav-link" href={`/map?place=${place.id}`}>
            <MapPin weight="bold" aria-hidden="true" />
            ดูบนแผนที่
            <span className="visually-hidden"> {place.name}</span>
          </Link>
          <a className="nav-link" href={mapsUrl(place.lat, place.lng)} target="_blank" rel="noreferrer">
            <NavigationArrow weight="bold" aria-hidden="true" />
            นำทางใน Google Maps
            <span className="visually-hidden"> ไป{place.name} (เปิดแท็บใหม่)</span>
          </a>
        </div>
      </div>
    </article>
  );
}
