import Link from "next/link";
import { useEffect, useRef } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpenText,
  BowlSteam,
  CheckCircle,
  NavigationArrow,
  PencilSimpleLine,
  SignIn,
  Warning,
} from "@phosphor-icons/react";
import { mapsUrl } from "@/lib/format";
import { NoteCard } from "../NoteCard";
import { Photo } from "../Photo";
import { Price } from "../Price";
import { TelText } from "../TelText";
import type { MapStop } from "./types";

const categoryIcon = { transport: "train", food: "food", living: "laundry" } as const;

// The selected Place (docs/adr/0006): photo, name and price, what to do next,
// then one line, one caution and the latest Note. The rest waits behind "อ่านเพิ่ม".
export function PlaceDetail({
  stop,
  posted,
  focusOnOpen,
  onBack,
}: {
  stop: MapStop;
  posted?: boolean;
  /** Move focus to the card: only when the user opened it, not on page load */
  focusOnOpen: boolean;
  onBack: () => void;
}) {
  const { place, notes, guide } = stop;
  const [caution, ...moreCautions] = place.cautions ?? [];
  const [latest] = notes;
  const heading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (focusOnOpen) heading.current?.focus({ preventScroll: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [place.id]);

  return (
    <article className="detail" data-line={place.category}>
      <button type="button" className="detail-back" onClick={onBack}>
        <ArrowLeft weight="bold" aria-hidden="true" /> ทุกที่บนแผนที่
      </button>
      <Photo photo={place.photo} category={place.category} icon={place.icon ?? categoryIcon[place.category]} className="detail-photo" />

      <header className="detail-head">
        <h2 ref={heading} tabIndex={-1}>
          {place.name}
        </h2>
        {place.homeTaste && (
          <p className="home-taste-tag">
            <BowlSteam weight="bold" aria-hidden="true" /> รสชาติบ้าน อาหาร{place.homeTaste}
          </p>
        )}
        {place.price && <Price price={place.price} />}
      </header>

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

      {posted && (
        <p className="form-status" role="status">
          <CheckCircle weight="fill" aria-hidden="true" /> โน้ตของคุณขึ้นแล้ว
        </p>
      )}

      {place.toChula && (
        <p className="to-chula">
          <SignIn weight="bold" aria-hidden="true" />
          <span>
            <b>เข้าจุฬาฯ:</b> {place.toChula}
          </span>
        </p>
      )}

      <div className="detail-body">
        <p className="stop-summary">{place.summary}</p>
        {caution && (
          <p className="caution">
            <Warning weight="bold" aria-hidden="true" />
            <span>
              <span className="visually-hidden">ข้อควรระวัง: </span>
              <TelText text={caution} />
            </span>
          </p>
        )}
      </div>

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

      {guide && (
        <Link href={`/guides/${guide.id}`} className="detail-guide">
          <BookOpenText weight="bold" aria-hidden="true" />
          <span>
            <small>วิธีที่เกี่ยวข้อง</small>
            {guide.title}
          </span>
          <ArrowRight weight="bold" aria-hidden="true" />
        </Link>
      )}
    </article>
  );
}
