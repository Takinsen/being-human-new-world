"use client";

import { ArrowRight, BowlSteam, PencilSimpleLine } from "@phosphor-icons/react";
import type { Place, Region } from "@/content/types";
import { keepPhrases } from "@/lib/thaiBreaks";
import { useHomeRegion } from "@/lib/useHomeRegion";
import { NavLink } from "./NavLink";
import { Photo } from "./Photo";
import { PriceFigure } from "./Price";

/** What the page hands over: each region with its dishes and up to three Places */
export type HomeTasteData = {
  region: Region;
  dishes: string;
  picks: { place: Place; by?: { name: string; hometown: string } }[];
}[];

// Home Taste (.scratch/more-know-how/spec.md Q5, Q9–Q14, Q21): until a Newcomer says where
// home is, ask with one big button per region; then show that region's Places as photo
// cards, with chips to look at another region. The choice stays in this browser.
export function HomeTaste({ regions }: { regions: HomeTasteData }) {
  const { region, setRegion } = useHomeRegion();
  const current = regions.find((r) => r.region === region);

  if (!current)
    return (
      <section className="home-ask" aria-labelledby="home-ask-q">
        <h2 id="home-ask-q">บ้านอยู่ภาคไหน</h2>
        <p>{keepPhrases("เลือกครั้งเดียว ครั้งหน้าเปิดมาก็เจอร้านภาคเราเลย")}</p>
        <div className="home-ask-regions">
          {regions.map((r) => (
            <button key={r.region} type="button" onClick={() => setRegion(r.region)}>
              <b>{r.region}</b>
              <small>{keepPhrases(r.dishes)}</small>
              <span className="home-ask-count">{r.picks.length ? `${r.picks.length} ร้าน` : "ยังไม่มีร้าน"}</span>
            </button>
          ))}
        </div>
      </section>
    );

  return (
    <section className="home-taste" aria-labelledby="home-taste-region">
      <div className="home-chips" role="group" aria-label="บ้านอยู่ภาคไหน">
        {regions.map((r) => (
          <button key={r.region} type="button" className="home-chip" aria-pressed={r.region === current.region} onClick={() => setRegion(r.region)}>
            {r.region}
            <span className="home-chip-count">{r.picks.length || "–"}</span>
          </button>
        ))}
      </div>
      <h2 id="home-taste-region">{keepPhrases(`อาหาร${current.region}`)}</h2>
      <p className="home-dishes">{keepPhrases(current.dishes)}</p>
      {current.picks.length ? (
        <ul className="home-cards">
          {current.picks.map(({ place, by }) => (
            <li key={place.id}>
              {/* The name is the link and stretches over the card; the photo's credit stays its own link */}
              <article className="home-card">
                {place.photo ? (
                  <Photo photo={place.photo} className="home-card-photo" />
                ) : (
                  <span className="home-card-photo is-empty" aria-hidden="true">
                    <BowlSteam weight="duotone" />
                  </span>
                )}
                <div className="home-card-body">
                  <h3>
                    <NavLink href={`/?place=${place.id}`}>{keepPhrases(place.name)}</NavLink>
                  </h3>
                  <p>{keepPhrases(place.summary)}</p>
                  {place.price && (
                    <p className="home-card-price">
                      <PriceFigure price={place.price} />
                    </p>
                  )}
                  <p className={by ? "home-vouch is-vouched" : "home-vouch"}>
                    {keepPhrases(by ? `${by.name} บ้านอยู่${by.hometown} บอกว่าเหมือนบ้าน` : "ทีมหามาให้ลอง")}
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      ) : (
        // Nobody has found one yet: ask someone from there (Q14)
        <div className="home-empty">
          <p>{keepPhrases(`ยังไม่มีร้านอาหาร${current.region}แถวนี้ บ้านอยู่ภาค${current.region} รู้ร้านที่ใช่ บอกหน่อย`)}</p>
          <NavLink href="/notes/new?line=food" className="home-empty-cta">
            <PencilSimpleLine weight="bold" aria-hidden="true" /> {keepPhrases("เขียนโน้ตบอกร้าน")}
          </NavLink>
        </div>
      )}
    </section>
  );
}

/** The way in from /guides: says how many Places the Newcomer's region has, once they've said */
export function HomeTasteLink({ counts }: { counts: Partial<Record<Region, number>> }) {
  const { region } = useHomeRegion();
  const count = region && (counts[region] ?? 0);
  const line = !region
    ? "คิดถึงกับข้าวที่บ้าน เลือกภาคแล้วดูร้านแถวนี้"
    : count
      ? `ร้านอาหาร${region} ${count} ร้านใกล้จุฬาฯ`
      : `ยังไม่มีร้านอาหาร${region} ช่วยบอกได้`;
  return (
    <NavLink href="/guides/home-taste" className="home-taste-link" id="home-taste">
      <span className="guide-icon">
        <BowlSteam weight="bold" aria-hidden="true" />
      </span>
      <span>
        <b>รสชาติบ้าน</b>
        <small>{keepPhrases(line)}</small>
      </span>
      <ArrowRight weight="bold" aria-hidden="true" className="home-taste-arrow" />
    </NavLink>
  );
}
