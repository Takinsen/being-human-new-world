import type { Place } from "@/content/types";
import { getSenior } from "@/content/seniors";
import { mapsUrl } from "@/lib/format";
import { Price } from "./Price";

export function PlaceCard({ place, number }: { place: Place; number: number }) {
  const senior = place.senior && getSenior(place.senior.id);
  return (
    <article className="place" id={place.id}>
      <header className="place-head">
        <span className="pin-number" aria-hidden="true">
          {number}
        </span>
        <div>
          <h3>{place.name}</h3>
          <p className="place-summary">{place.summary}</p>
        </div>
      </header>
      {place.price && <Price price={place.price} />}
      <ul className="knowhow">
        {place.knowhow.map((k) => (
          <li key={k}>{k}</li>
        ))}
      </ul>
      {place.cautions && (
        <ul className="cautions" aria-label="ข้อควรระวัง">
          {place.cautions.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      )}
      {senior && place.senior && (
        <blockquote className="senior-note">
          <p>{place.senior.note}</p>
          <footer>
            {senior.name} จาก{senior.hometown}
          </footer>
        </blockquote>
      )}
      <a className="maps-link" href={mapsUrl(place.lat, place.lng)} target="_blank" rel="noreferrer">
        นำทางใน Google Maps
      </a>
    </article>
  );
}
