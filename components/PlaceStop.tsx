import { CheckCircle, NavigationArrow, Warning } from "@phosphor-icons/react/dist/ssr";
import type { Place } from "@/content/types";
import { getSenior } from "@/content/seniors";
import { mapsUrl } from "@/lib/format";
import { Photo } from "./Photo";
import { Price } from "./Price";
import { StationCode } from "./StationCode";

// A Place as a station on its category's line: no card, the line joins them.
export function PlaceStop({ place, code }: { place: Place; code: string }) {
  const senior = place.senior && getSenior(place.senior.id);
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
        <a className="nav-link" href={mapsUrl(place.lat, place.lng)} target="_blank" rel="noreferrer">
          <NavigationArrow weight="bold" aria-hidden="true" />
          นำทางใน Google Maps
        </a>
      </div>
    </article>
  );
}
