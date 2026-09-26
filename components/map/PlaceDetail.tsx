import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowLeft, BowlSteam, CheckCircle, NavigationArrow, PencilSimpleLine, Warning } from "@phosphor-icons/react";
import { mapsUrl } from "@/lib/format";
import { CategoryIcon } from "../icons";
import { NoteCard } from "../NoteCard";
import { Price } from "../Price";
import type { MapStop } from "./types";

// The selected Place, short: what it costs, one line, one caution, the latest
// Note. Everything else waits behind "อ่านเพิ่ม" (docs/adr/0006).
export function PlaceDetail({ stop, posted, onBack }: { stop: MapStop; posted?: boolean; onBack: () => void }) {
  const { place, notes } = stop;
  const [caution, ...moreCautions] = place.cautions ?? [];
  const [latest] = notes;
  const heading = useRef<HTMLHeadingElement>(null);

  // Keyboard and screen-reader users land on the card they just opened.
  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
    heading.current?.scrollIntoView({ block: "nearest" });
  }, [place.id]);

  return (
    <article className="detail" data-line={place.category}>
      <button type="button" className="detail-back" onClick={onBack}>
        <ArrowLeft weight="bold" aria-hidden="true" /> ทุกที่บนแผนที่
      </button>
      <header className="detail-head">
        <span className="place-icon">
          <CategoryIcon id={place.category} />
        </span>
        <h2 ref={heading} tabIndex={-1}>
          {place.name}
        </h2>
      </header>
      {place.homeTaste && (
        <p className="home-taste-tag">
          <BowlSteam weight="bold" aria-hidden="true" /> รสชาติบ้าน อาหาร{place.homeTaste}
        </p>
      )}
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
      {posted && (
        <p className="form-status" role="status">
          <CheckCircle weight="fill" aria-hidden="true" /> โน้ตของคุณขึ้นแล้ว
        </p>
      )}
      {latest && (
        <div className="detail-notes">
          <NoteCard note={latest} compact />
          {notes.length > 1 && (
            <Link href={`/notes?place=${place.id}`} className="related-link">
              ดูโน้ตที่นี่ทั้งหมด ({notes.length})
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
