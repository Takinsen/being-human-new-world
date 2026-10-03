import { NavLink } from "../NavLink";
import { useEffect, useRef } from "react";
import {
  ArrowLeft,
  BookOpenText,
  CaretRight,
  CheckCircle,
  NavigationArrow,
  PencilSimpleLine,
  SignIn,
  Warning,
} from "@phosphor-icons/react";
import { mapsUrl } from "@/lib/format";
import { keepPhrases } from "@/lib/thaiBreaks";
import { PlaceIcon } from "../icons";
import { NoteCard } from "../NoteCard";
import { FlyingName } from "../PageMotion";
import { Photo } from "../Photo";
import { Price } from "../Price";
import { TelText } from "../TelText";
import type { MapStop } from "./types";

// The selected Place (docs/adr/0006, amended 2026-10-02): the photo, the name large and what
// the Place is, then sections split by hairlines, each with a quiet heading; nothing waits
// behind "อ่านเพิ่ม". The price and นำทาง sit in a bar stuck to the bottom of the card.
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
  const [latest] = notes;
  const cautions = place.cautions ?? [];
  const heading = useRef<HTMLHeadingElement>(null);

  const status = useRef<HTMLParagraphElement>(null);
  const noteBox = useRef<HTMLElement>(null);

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
          <ArrowLeft weight="bold" aria-hidden="true" /> ดูที่อื่น
        </button>
      )}
      <Photo photo={place.photo} className="detail-photo" />

      <header className="detail-head">
        <div className="detail-title">
          <span className="place-icon">
            <PlaceIcon place={place} />
          </span>
          <h2 ref={heading} tabIndex={-1}>
            <FlyingName name={`place-name-${place.id}`}>{keepPhrases(place.name)}</FlyingName>
          </h2>
        </div>
        {/* What the place is, first: someone opening a health centre at night needs its hours before anything else */}
        <p className="detail-summary">
          <TelText text={place.summary} />
        </p>
        {place.homeTaste && (
          <p className="detail-taste">
            {keepPhrases(
              stop.homeTasteBy
                ? `อาหาร${place.homeTaste}ที่${stop.homeTasteBy} บอกว่าเหมือนบ้าน`
                : `อาหาร${place.homeTaste} ทีมหามาให้ลอง ยังรอคน${place.homeTaste}มาบอกว่าใช่ไหม`,
            )}
          </p>
        )}
      </header>

      {place.toChula && (
        <section className="detail-section" aria-labelledby="detail-to-chula">
          <h3 id="detail-to-chula" className="detail-h">
            <SignIn weight="bold" aria-hidden="true" /> เข้าจุฬาฯ ยังไง
          </h3>
          <p>{keepPhrases(place.toChula)}</p>
        </section>
      )}

      {(cautions.length > 0 || place.knowhow.length > 0) && (
        <section className="detail-section" aria-labelledby="detail-know">
          <h3 id="detail-know" className="detail-h">
            รู้ไว้ก่อนไป
          </h3>
          <ul className="detail-know">
            {/* A caution is a heads-up from someone who's been there: ink, not red (audit 12, F5) */}
            {cautions.map((c) => (
              <li key={c} className="is-caution">
                <Warning weight="bold" aria-hidden="true" />
                <span>
                  <span className="visually-hidden">ข้อควรระวัง: </span>
                  <TelText text={c} />
                </span>
              </li>
            ))}
            {place.knowhow.map((k) => (
              <li key={k}>
                <span className="detail-leaf" aria-hidden="true" />
                <span>{keepPhrases(k)}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="detail-section detail-notes" aria-labelledby="detail-notes" ref={noteBox}>
        <div className="detail-h-row">
          <h3 id="detail-notes" className="detail-h">
            โน้ตจากคนที่เคยไป
          </h3>
          <NavLink href={`/notes/new?place=${place.id}`} className="detail-write">
            <PencilSimpleLine weight="bold" aria-hidden="true" /> เขียนโน้ต
          </NavLink>
        </div>
        {posted && (
          <p className="form-status" role="status" tabIndex={-1} ref={status}>
            <CheckCircle weight="fill" aria-hidden="true" /> {keepPhrases("โน้ตขึ้นแล้ว ขอบคุณนะ")}
          </p>
        )}
        {latest ? (
          <>
            <NoteCard note={latest} compact />
            {notes.length > 1 && (
              <NavLink href={`/notes?place=${place.id}`} className="related-link">
                {keepPhrases(`อ่านโน้ตที่นี่ทั้งหมด ${notes.length} อัน`)}
              </NavLink>
            )}
          </>
        ) : (
          <p className="detail-empty">{keepPhrases("ยังไม่มีใครเขียนถึงที่นี่")}</p>
        )}
      </section>

      {guides.length > 0 && (
        <section className="detail-section" aria-labelledby="detail-guides">
          <h3 id="detail-guides" className="detail-h">
            อ่านคู่มือ
          </h3>
          <ul className="detail-guides">
            {guides.map((guide) => (
              <li key={guide.id}>
                <NavLink href={`/guides/${guide.id}`}>
                  <BookOpenText weight="bold" aria-hidden="true" />
                  <span>
                    <FlyingName name={`guide-title-${guide.id}`}>{keepPhrases(guide.title)}</FlyingName>
                  </span>
                  <CaretRight weight="bold" aria-hidden="true" />
                </NavLink>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Stuck to the bottom while the card scrolls: what it costs and the way there */}
      <div className="detail-bar">
        {place.price ? (
          <Price price={place.price}>
            {/* Prices get checked by whoever was just there (docs/adr/0001, 0005) */}
            <NavLink href={`/contribute?place=${place.id}#price`} className="price-report">
              {place.price.checked ? "ราคาไม่ตรง?" : "บอกราคา"}
            </NavLink>
          </Price>
        ) : (
          <span />
        )}
        <a className="action" href={mapsUrl(place.lat, place.lng)} target="_blank" rel="noreferrer">
          <NavigationArrow weight="bold" aria-hidden="true" />
          นำทาง
          <span className="visually-hidden"> ไป{place.name} ใน Google Maps (เปิดแท็บใหม่)</span>
        </a>
      </div>
    </article>
  );
}
