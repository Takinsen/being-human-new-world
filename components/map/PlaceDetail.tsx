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
import { PlaceIcon } from "../icons";
import { NoteCard } from "../NoteCard";
import { Photo } from "../Photo";
import { Price } from "../Price";
import { TelText } from "../TelText";
import type { MapStop } from "./types";

// The selected Place (docs/adr/0006): photo, name and price, what to do next,
// its Guides, then one line, one caution and the latest Note. The rest waits behind "อ่านเพิ่ม".
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
  /** Wide screens show a back button here; on phones the sheet's top bar is the way back */
  onBack?: () => void;
}) {
  const { place, notes, guides } = stop;
  const [caution, ...moreCautions] = place.cautions ?? [];
  const [latest] = notes;
  const heading = useRef<HTMLHeadingElement>(null);

  const status = useRef<HTMLParagraphElement>(null);
  const noteBox = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (focusOnOpen) heading.current?.focus({ preventScroll: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [place.id]);

  // Just posted a Note here: show it and say so.
  useEffect(() => {
    if (!posted) return;
    status.current?.focus({ preventScroll: true });
    noteBox.current?.scrollIntoView({ block: "center" });
  }, [posted]);

  return (
    <article className="detail" data-line={place.category}>
      {onBack && (
        <button type="button" className="back-link detail-back" onClick={onBack}>
          <ArrowLeft weight="bold" aria-hidden="true" /> ทุกที่บนแผนที่
        </button>
      )}
      <Photo photo={place.photo} className="detail-photo" />

      <header className="detail-head">
        <div className="detail-title">
          <span className="place-icon">
            <PlaceIcon place={place} />
          </span>
          <h2 ref={heading} tabIndex={-1}>
            {place.name}
          </h2>
        </div>
        {place.homeTaste && (
          <p className="home-taste-tag">
            <BowlSteam weight="bold" aria-hidden="true" /> รสชาติบ้าน อาหาร{place.homeTaste}
            {stop.homeTasteBy ? ` · ${stop.homeTasteBy} แนะนำ` : " · ทีมหามาให้ลอง"}
          </p>
        )}
        {place.price && (
          <>
            <Price price={place.price} />
            {/* Prices get checked by whoever was just there (docs/adr/0001, 0005) */}
            <Link href={`/contribute?place=${place.id}#price`} className="related-link price-fix">
              {place.price.checked && place.price.checked.how !== "web"
                ? "ไปมาแล้ว ราคาไม่ตรง? บอกราคาที่เห็น"
                : "ใครไปมาแล้ว ช่วยบอกราคาจริงได้"}
            </Link>
          </>
        )}
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
        <p className="form-status" role="status" tabIndex={-1} ref={status}>
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

      {/* Up here so a wide screen's side panel shows it without scrolling (UX audit 7, U14) */}
      {guides.map((guide) => (
        <Link key={guide.id} href={`/guides/${guide.id}`} className="detail-guide">
          <BookOpenText weight="bold" aria-hidden="true" />
          <span>
            <small>วิธีที่เกี่ยวข้อง</small>
            {guide.title}
          </span>
          <ArrowRight weight="bold" aria-hidden="true" />
        </Link>
      ))}

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
        <div className="detail-notes" ref={noteBox}>
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

    </article>
  );
}
