// PROTOTYPE (readable-pages), throwaway: three other ways to lay out a Place card, picked
// with ?card=P1|P2|P3 (O is today's card in PlaceDetail; ?place= already names the Place).
//   P1  facts as rows, like a Guide's box, then sections with headings
//   P2  a big head and sections, with the price and นำทาง in a bar stuck to the bottom
//   P3  the latest Note leads, right under the name
// All three: no "ไปมาแล้วเห็นราคา…" link, and a price says only when it was last updated.
import Link from "next/link";
import { BookOpenText, CaretRight, NavigationArrow, PencilSimpleLine, SignIn, Warning } from "@phosphor-icons/react";
import type { Place, Price as PriceData } from "@/content/types";
import { mapsUrl, thaiMonthYear } from "@/lib/format";
import { PlaceIcon } from "../icons";
import { NoteCard } from "../NoteCard";
import { Photo } from "../Photo";
import { TelText } from "../TelText";
import type { MapStop } from "../map/types";

function priceFigure(price: PriceData) {
  const range = price.min === price.max ? `${price.min}` : `${price.min}–${price.max}`;
  const unit = price.per.replace(/^ต่อ/, "/").replace(/ ต่อ/, "/");
  return `${range} บาท${unit.startsWith("/") ? unit : ` ${unit}`}`;
}

/** The price on platform yellow, then only when it was last updated */
export function UpdatedPrice({ price, inline }: { price: PriceData; inline?: boolean }) {
  if (!price.checked) return <p className="price-pending">ยังไม่รู้ราคาจริง รอคนไปดู</p>;
  return (
    <p className={inline ? "pp-price is-inline" : "pp-price"}>
      <span className="visually-hidden">ราคาปกติ </span>
      <mark className="pn-price">{priceFigure(price)}</mark>
      <small className="pp-updated">อัปเดตล่าสุด {thaiMonthYear(price.checked.on)}</small>
    </p>
  );
}

function homeTasteLine(place: Place, by?: string) {
  if (!place.homeTaste) return null;
  return by ? `อาหาร${place.homeTaste}ที่${by} บอกว่าเหมือนบ้าน` : `อาหาร${place.homeTaste} ทีมหามาให้ลอง`;
}

function Head({ place, big }: { place: Place; big?: boolean }) {
  return (
    <div className={big ? "pp-head is-big" : "pp-head"}>
      <span className="place-icon">
        <PlaceIcon place={place} />
      </span>
      <h2>{place.name}</h2>
    </div>
  );
}

function Actions({ place, only }: { place: Place; only?: "go" }) {
  return (
    <div className="detail-actions pp-actions">
      <a className="action" href={mapsUrl(place.lat, place.lng)} target="_blank" rel="noreferrer">
        <NavigationArrow weight="bold" aria-hidden="true" />
        นำทาง
      </a>
      {only !== "go" && (
        <Link className="action is-primary" href={`/notes/new?place=${place.id}`}>
          <PencilSimpleLine weight="bold" aria-hidden="true" />
          เขียนโน้ต
        </Link>
      )}
    </div>
  );
}

/** Every caution (ink, a heads-up) then every line of know-how: nothing behind "อ่านเพิ่ม" */
function KnowList({ place }: { place: Place }) {
  if (!place.cautions?.length && !place.knowhow.length) return null;
  return (
    <ul className="pp-know">
      {place.cautions?.map((c) => (
        <li key={c} className="is-caution">
          <Warning weight="bold" aria-hidden="true" />
          <span>
            <TelText text={c} />
          </span>
        </li>
      ))}
      {place.knowhow.map((k) => (
        <li key={k}>
          <span className="pp-dot" aria-hidden="true" />
          <span>{k}</span>
        </li>
      ))}
    </ul>
  );
}

function GuideRows({ stop }: { stop: MapStop }) {
  if (!stop.guides.length) return null;
  return (
    <ul className="pp-guides">
      {stop.guides.map((g) => (
        <li key={g.id}>
          <Link href={`/guides/${g.id}`}>
            <BookOpenText weight="bold" aria-hidden="true" />
            <span>{g.title}</span>
            <CaretRight weight="bold" aria-hidden="true" />
          </Link>
        </li>
      ))}
    </ul>
  );
}

function Notes({ stop }: { stop: MapStop }) {
  const [latest] = stop.notes;
  if (!latest) return <p className="pp-empty">ยังไม่มีใครเขียนถึงที่นี่ <Link href={`/notes/new?place=${stop.place.id}`}>เขียนเป็นคนแรกเลย</Link></p>;
  return (
    <>
      <NoteCard note={latest} compact />
      {stop.notes.length > 1 && (
        <Link href={`/notes?place=${stop.place.id}`} className="related-link">
          อ่านโน้ตที่นี่ทั้งหมด {stop.notes.length} อัน
        </Link>
      )}
    </>
  );
}

/** P1: what you need at a glance in rows, like a Guide's box; then sections with headings */
export function PlaceP1({ stop }: { stop: MapStop }) {
  const { place } = stop;
  const taste = homeTasteLine(place, stop.homeTasteBy);
  const rows = [
    place.price && { label: "ราคา", value: <UpdatedPrice price={place.price} /> },
    place.toChula && { label: "เข้าจุฬาฯ", value: place.toChula },
    taste && { label: "รสชาติบ้าน", value: taste },
  ].filter(Boolean) as { label: string; value: React.ReactNode }[];
  return (
    <article className="detail pp pp-1" data-line={place.category}>
      <Photo photo={place.photo} className="detail-photo" />
      <header className="pp-top">
        <Head place={place} />
        <p className="pp-summary">{place.summary}</p>
      </header>
      <Actions place={place} />
      {rows.length > 0 && (
        <dl className="pn-facts pp-rows">
          {rows.map((r) => (
            <div key={r.label}>
              <dt>{r.label}</dt>
              <dd>{r.value}</dd>
            </div>
          ))}
        </dl>
      )}
      {(place.cautions?.length || place.knowhow.length) ? (
        <section>
          <h3 className="pp-h">รู้ไว้ก่อนไป</h3>
          <KnowList place={place} />
        </section>
      ) : null}
      <section>
        <h3 className="pp-h">โน้ตจากคนที่เคยไป</h3>
        <Notes stop={stop} />
      </section>
      {stop.guides.length > 0 && (
        <section>
          <h3 className="pp-h">อ่านวิธี</h3>
          <GuideRows stop={stop} />
        </section>
      )}
    </article>
  );
}

/** P2: a big head, sections split by hairlines, and the price with นำทาง in a bar stuck to the bottom */
export function PlaceP2({ stop }: { stop: MapStop }) {
  const { place } = stop;
  const taste = homeTasteLine(place, stop.homeTasteBy);
  return (
    <article className="detail pp pp-2" data-line={place.category}>
      <Photo photo={place.photo} className="detail-photo" />
      <header className="pp-top">
        <Head place={place} big />
        <p className="pp-summary">{place.summary}</p>
        {taste && <p className="pp-taste">{taste}</p>}
      </header>
      {place.toChula && (
        <section className="pp-sec">
          <h3 className="pp-h">
            <SignIn weight="bold" aria-hidden="true" /> เข้าจุฬาฯ ยังไง
          </h3>
          <p>{place.toChula}</p>
        </section>
      )}
      {(place.cautions?.length || place.knowhow.length) ? (
        <section className="pp-sec">
          <h3 className="pp-h">รู้ไว้ก่อนไป</h3>
          <KnowList place={place} />
        </section>
      ) : null}
      <section className="pp-sec">
        <div className="pp-h-row">
          <h3 className="pp-h">โน้ตจากคนที่เคยไป</h3>
          <Link href={`/notes/new?place=${place.id}`} className="pp-write">
            <PencilSimpleLine weight="bold" aria-hidden="true" /> เขียนโน้ต
          </Link>
        </div>
        <Notes stop={stop} />
      </section>
      {stop.guides.length > 0 && (
        <section className="pp-sec">
          <h3 className="pp-h">อ่านวิธี</h3>
          <GuideRows stop={stop} />
        </section>
      )}
      <div className="pp-bar">
        {place.price ? <UpdatedPrice price={place.price} /> : <span />}
        <Actions place={place} only="go" />
      </div>
    </article>
  );
}

/** P3: someone who's been there speaks first, right under the name and price */
export function PlaceP3({ stop }: { stop: MapStop }) {
  const { place } = stop;
  const taste = homeTasteLine(place, stop.homeTasteBy);
  return (
    <article className="detail pp pp-3" data-line={place.category}>
      <header className="pp-top">
        <Head place={place} />
        <p className="pp-summary">{place.summary}</p>
        {place.price && <UpdatedPrice price={place.price} inline />}
        {taste && <p className="pp-taste">{taste}</p>}
      </header>
      <div className="pp-voice">
        <Notes stop={stop} />
      </div>
      <Actions place={place} />
      <Photo photo={place.photo} className="detail-photo" />
      {(place.toChula || place.cautions?.length || place.knowhow.length) ? (
        <section>
          <h3 className="pp-h">รู้ไว้ก่อนไป</h3>
          {place.toChula && (
            <p className="pp-tochula">
              <b>เข้าจุฬาฯ</b> {place.toChula}
            </p>
          )}
          <KnowList place={place} />
        </section>
      ) : null}
      <GuideRows stop={stop} />
    </article>
  );
}
