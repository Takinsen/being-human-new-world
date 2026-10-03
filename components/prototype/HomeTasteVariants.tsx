"use client";

// PROTOTYPE (home-taste), throwaway: lives only on the prototype/home-taste branch.
// Three Home Taste sections, switchable with ?ht=A|B|C, shown either at the top of the food
// section on /guides or on its own page /home-taste (?at=guides|page). See .scratch/more-know-how/spec.md Q5, Q9–Q14.
//   A  region chips, then that region's places as photo cards
//   B  "บ้านอยู่ภาคไหน" first: six big buttons; once picked, your region on top, the rest folded
//   C  one sideways-scrolling row per region, yours first
// The chosen region lives in the URL (?region=) for the prototype; the real thing remembers it in the browser (Q10).

import { useEffect, useState } from "react";
import { ArrowRight, BowlSteam, MapPin, PencilSimpleLine } from "@phosphor-icons/react";
import type { Region } from "@/content/types";
import { NavLink } from "@/components/NavLink";
import { Photo } from "@/components/Photo";
import { PriceFigure } from "@/components/Price";
import { keepPhrases } from "@/lib/thaiBreaks";
import type { Pick, RegionPicks } from "./homeTasteData";
import "./home-taste.css";

export const VARIANTS = [
  { key: "A", name: "ชิปภาค + การ์ด" },
  { key: "B", name: "ถามก่อน บ้านอยู่ภาคไหน" },
  { key: "C", name: "แถวเลื่อนแนวนอน" },
];

function useParam(name: string): [string | null, (v: string | null) => void] {
  const [value, setValue] = useState<string | null>(null);
  useEffect(() => {
    const read = () => setValue(new URLSearchParams(location.search).get(name));
    read();
    window.addEventListener("prototype-params", read);
    return () => window.removeEventListener("prototype-params", read);
  }, [name]);
  const set = (v: string | null) => {
    const url = new URL(location.href);
    if (v) url.searchParams.set(name, v);
    else url.searchParams.delete(name);
    history.replaceState(history.state, "", url);
    window.dispatchEvent(new Event("prototype-params"));
  };
  return [value, set];
}

export function useVariant() {
  const [ht] = useParam("ht");
  const [at] = useParam("at");
  return { variant: ht ?? "A", at: at ?? "guides" };
}

/** Mounted on /guides: the section itself, or (with ?at=page) a card to its own page */
export function HomeTasteOnGuides({ regions }: { regions: RegionPicks[] }) {
  const { at } = useVariant();
  const [region] = useParam("region");
  if (at === "page") {
    const mine = regions.find((r) => r.region === region);
    return (
      <NavLink href={`/home-taste${region ? `?region=${encodeURIComponent(region)}` : ""}`} className="ht-teaser">
        <span className="guide-icon">
          <BowlSteam weight="bold" aria-hidden="true" />
        </span>
        <span>
          <b>รสชาติบ้าน</b>
          <small>
            {keepPhrases(
              mine
                ? mine.picks.length
                  ? `ร้านอาหาร${mine.region} ${mine.picks.length} ร้านใกล้จุฬาฯ`
                  : `ยังไม่มีร้านอาหาร${mine.region} ช่วยบอกได้`
                : "คิดถึงกับข้าวที่บ้าน เลือกภาคแล้วดูร้านแถวนี้",
            )}
          </small>
        </span>
        <ArrowRight weight="bold" aria-hidden="true" className="ht-teaser-arrow" />
      </NavLink>
    );
  }
  return <HomeTaste regions={regions} />;
}

export function HomeTaste({ regions, onPage }: { regions: RegionPicks[]; onPage?: boolean }) {
  const { variant } = useVariant();
  return (
    <section className={`ht ht-${variant}${onPage ? " ht-page" : ""}`} id="home-taste" aria-labelledby="ht-title">
      {!onPage && (
        <h3 id="ht-title" className="ht-title">
          <span className="guide-icon">
            <BowlSteam weight="bold" aria-hidden="true" />
          </span>
          รสชาติบ้าน
        </h3>
      )}
      {variant === "A" && <VariantA regions={regions} />}
      {variant === "B" && <VariantB regions={regions} />}
      {variant === "C" && <VariantC regions={regions} />}
    </section>
  );
}

/* ---------- A: chips, then cards ---------- */

function VariantA({ regions }: { regions: RegionPicks[] }) {
  const [region, setRegion] = useParam("region");
  const current = regions.find((r) => r.region === region) ?? regions[0];
  return (
    <>
      <p className="ht-lede">{keepPhrases("คิดถึงกับข้าวที่บ้าน เลือกภาคของเรา แล้วดูร้านแถวนี้ที่รสชาติใกล้บ้านที่สุด")}</p>
      <div className="ht-chips" role="group" aria-label="บ้านอยู่ภาคไหน">
        {regions.map((r) => (
          <button
            key={r.region}
            type="button"
            className="ht-chip"
            aria-pressed={r.region === current.region}
            onClick={() => setRegion(r.region)}
          >
            {r.region}
            <span className="ht-count">{r.picks.length || "–"}</span>
          </button>
        ))}
      </div>
      <p className="ht-dishes">{keepPhrases(`อาหาร${current.region}: ${current.dishes}`)}</p>
      {current.picks.length ? (
        <ul className="ht-cards">
          {current.picks.map((p) => (
            <li key={p.place.id}>
              <PlaceCard pick={p} region={current.region} />
            </li>
          ))}
        </ul>
      ) : (
        <Empty region={current.region} />
      )}
    </>
  );
}

/* ---------- B: ask first ---------- */

function VariantB({ regions }: { regions: RegionPicks[] }) {
  const [region, setRegion] = useParam("region");
  const mine = regions.find((r) => r.region === region);
  if (!mine)
    return (
      <div className="ht-ask">
        <p className="ht-ask-q">บ้านอยู่ภาคไหน</p>
        <p className="ht-lede">{keepPhrases("เลือกครั้งเดียว ครั้งหน้าเปิดมาก็เจอร้านภาคเราเลย")}</p>
        <div className="ht-big">
          {regions.map((r) => (
            <button key={r.region} type="button" onClick={() => setRegion(r.region)}>
              <b>{r.region}</b>
              <small>{keepPhrases(r.dishes)}</small>
              <span className="ht-big-count">{r.picks.length ? `${r.picks.length} ร้าน` : "ยังไม่มีร้าน"}</span>
            </button>
          ))}
        </div>
      </div>
    );
  const others = regions.filter((r) => r.region !== mine.region);
  return (
    <>
      <div className="ht-mine-head">
        <p>
          <span>บ้านเราอยู่</span> <b>{`ภาค${mine.region}`}</b>
        </p>
        <button type="button" className="ht-change" onClick={() => setRegion(null)}>
          เปลี่ยนภาค
        </button>
      </div>
      {mine.picks.length ? (
        <ol className="ht-mine">
          {mine.picks.map((p) => (
            <li key={p.place.id}>
              <PlaceRow pick={p} region={mine.region} big />
            </li>
          ))}
        </ol>
      ) : (
        <Empty region={mine.region} />
      )}
      <details className="ht-others">
        <summary>ร้านภาคอื่น</summary>
        {others.map((r) => (
          <div key={r.region} className="ht-other">
            <p className="ht-other-name">{r.region}</p>
            {r.picks.length ? (
              <ul>
                {r.picks.map((p) => (
                  <li key={p.place.id}>
                    <PlaceRow pick={p} region={r.region} />
                  </li>
                ))}
              </ul>
            ) : (
              <Empty region={r.region} small />
            )}
          </div>
        ))}
      </details>
    </>
  );
}

/* ---------- C: one row per region ---------- */

function VariantC({ regions }: { regions: RegionPicks[] }) {
  const [region, setRegion] = useParam("region");
  const ordered = [...regions].sort((a, b) => Number(b.region === region) - Number(a.region === region));
  return (
    <>
      <label className="ht-select">
        บ้านเราอยู่ภาค
        <select value={region ?? ""} onChange={(e) => setRegion(e.target.value || null)}>
          <option value="">เลือกภาค</option>
          {regions.map((r) => (
            <option key={r.region} value={r.region}>
              {r.region}
            </option>
          ))}
        </select>
      </label>
      {ordered.map((r) => (
        <div key={r.region} className={r.region === region ? "ht-row is-mine" : "ht-row"}>
          <p className="ht-row-head">
            <b>{r.region}</b> <small>{keepPhrases(r.dishes)}</small>
          </p>
          <ul className="ht-strip">
            {r.picks.map((p) => (
              <li key={p.place.id}>
                <PlaceCard pick={p} region={r.region} compact />
              </li>
            ))}
            {!r.picks.length && (
              <li>
                <Empty region={r.region} card />
              </li>
            )}
          </ul>
        </div>
      ))}
    </>
  );
}

/* ---------- shared bits ---------- */

function Vouch({ pick, region }: { pick: Pick; region: Region }) {
  return (
    <small className={pick.by ? "ht-vouch is-vouched" : "ht-vouch"}>
      {keepPhrases(pick.by ? `${pick.by.name} บ้านอยู่${pick.by.hometown} บอกว่าเหมือนบ้าน` : "ทีมหามาให้ลอง")}
    </small>
  );
}

function PlaceCard({ pick, region, compact }: { pick: Pick; region: Region; compact?: boolean }) {
  const { place } = pick;
  return (
    <NavLink href={`/?place=${place.id}`} className={compact ? "ht-card is-compact" : "ht-card"}>
      {place.photo ? (
        <Photo photo={place.photo} className="ht-photo" />
      ) : (
        <span className="ht-photo ht-photo-none" aria-hidden="true">
          <BowlSteam weight="duotone" />
        </span>
      )}
      <span className="ht-card-body">
        <b>{keepPhrases(place.name)}</b>
        {!compact && <small>{keepPhrases(place.summary)}</small>}
        {place.price && (
          <span className="ht-price">
            <PriceFigure price={place.price} />
          </span>
        )}
        <Vouch pick={pick} region={region} />
      </span>
    </NavLink>
  );
}

function PlaceRow({ pick, region, big }: { pick: Pick; region: Region; big?: boolean }) {
  const { place } = pick;
  return (
    <NavLink href={`/?place=${place.id}`} className={big ? "ht-row-item is-big" : "ht-row-item"}>
      {big && place.photo && <Photo photo={place.photo} className="ht-thumb" />}
      <span>
        <b>{keepPhrases(place.name)}</b>
        {big && <small>{keepPhrases(place.summary)}</small>}
        {place.price && (
          <span className="ht-price">
            <PriceFigure price={place.price} />
          </span>
        )}
        {big && <Vouch pick={pick} region={region} />}
      </span>
      <MapPin weight="bold" aria-hidden="true" className="ht-pin" />
    </NavLink>
  );
}

/** A region nobody has found a place for yet: ask someone from there (Q14) */
function Empty({ region, small, card }: { region: Region; small?: boolean; card?: boolean }) {
  return (
    <div className={`ht-empty${small ? " is-small" : ""}${card ? " is-card" : ""}`}>
      <p>{keepPhrases(`ยังไม่มีร้านอาหาร${region}แถวนี้ บ้านอยู่ภาค${region} รู้ร้านที่ใช่ บอกหน่อย`)}</p>
      <NavLink href="/notes/new?line=food" className="ht-empty-cta">
        <PencilSimpleLine weight="bold" aria-hidden="true" /> {keepPhrases("เขียนโน้ตบอกร้าน")}
      </NavLink>
    </div>
  );
}
