import Link from "next/link";
import { ArrowLeft, NavigationArrow, PencilSimpleLine, Warning } from "@phosphor-icons/react";
import { mapsUrl } from "@/lib/format";
import { NoteCard } from "../NoteCard";
import { Price } from "../Price";
import { StationCode } from "../StationCode";
import type { MapStop } from "./types";

// The selected Place, short: what it costs, one line, one caution, the latest
// Note. Everything else waits behind "อ่านเพิ่ม" (docs/adr/0006).
export function PlaceDetail({ stop, onBack }: { stop: MapStop; onBack: () => void }) {
  const { place, code, notes } = stop;
  const [caution, ...moreCautions] = place.cautions ?? [];
  const [latest] = notes;
  return (
    <article className="detail" data-line={place.category}>
      <button type="button" className="detail-back" onClick={onBack}>
        <ArrowLeft weight="bold" aria-hidden="true" /> ทุกที่บนแผนที่
      </button>
      <header className="detail-head">
        <StationCode code={code} />
        <h2>{place.name}</h2>
      </header>
      {place.price && <Price price={place.price} />}
      <p className="stop-summary">{place.summary}</p>
      {caution && (
        <p className="caution">
          <Warning weight="bold" aria-hidden="true" />
          <span>
            <span className="visually-hidden">ข้อควรระวัง: </span>
            {caution}
          </span>
        </p>
      )}
      {latest && (
        <div className="detail-notes">
          <NoteCard note={latest} compact />
          {notes.length > 1 && (
            <Link href={`/notes?place=${place.id}`} className="related-link">
              ดูโน้ตทั้งหมด ({notes.length})
            </Link>
          )}
        </div>
      )}
      {(place.knowhow.length > 0 || moreCautions.length > 0) && (
        <details className="more">
          <summary>อ่านเพิ่ม</summary>
          <ul className="knowhow">
            {place.knowhow.map((k) => (
              <li key={k}>{k}</li>
            ))}
          </ul>
          {moreCautions.map((c) => (
            <p className="caution" key={c}>
              <Warning weight="bold" aria-hidden="true" />
              <span>{c}</span>
            </p>
          ))}
        </details>
      )}
      <div className="detail-actions">
        <a className="action" href={mapsUrl(place.lat, place.lng)} target="_blank" rel="noreferrer">
          <NavigationArrow weight="bold" aria-hidden="true" />
          นำทาง
          <span className="visually-hidden"> ไป{place.name} ใน Google Maps (เปิดแท็บใหม่)</span>
        </a>
        <Link className="action is-primary" href={`/notes/new?place=${place.id}`}>
          <PencilSimpleLine weight="bold" aria-hidden="true" />
          เขียนโน้ต
        </Link>
      </div>
    </article>
  );
}
