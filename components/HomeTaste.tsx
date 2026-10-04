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

// Home Taste (.scratch/more-know-how/spec.md Q5, Q9–Q14, Q21, Q23): one big button per region
// until a Newcomer picks theirs, then region chips over that region's Places. Nothing says how
// it works or where a place came from: tapping shows it, and only a vouch is worth a line.
export function HomeTaste({ regions }: { regions: HomeTasteData }) {
  const { region, setRegion } = useHomeRegion();
  const current = regions.find((r) => r.region === region);

  if (!current)
    return (
      <div className="home-ask" role="group" aria-label="บ้านอยู่ภาคไหน">
        {regions.map((r) => (
          <button key={r.region} type="button" onClick={() => setRegion(r.region)}>
            <b>{r.region}</b>
            <small>{keepPhrases(r.dishes)}</small>
          </button>
        ))}
      </div>
    );

  return (
    <section className="home-taste" aria-label={`อาหาร${current.region}`}>
      <div className="home-chips" role="group" aria-label="บ้านอยู่ภาคไหน">
        {regions.map((r) => (
          <button key={r.region} type="button" className="home-chip" aria-pressed={r.region === current.region} onClick={() => setRegion(r.region)}>
            {r.region}
            {r.picks.length > 0 && <span className="home-chip-count">{r.picks.length}</span>}
          </button>
        ))}
      </div>
      {current.picks.length ? (
        <ul className="home-cards">
          {current.picks.map(({ place, by }) => (
            <li key={place.id}>
              {/* The name is the link and stretches over the card; the photo's credit stays its own link */}
              <article className="home-card">
                {place.photos?.[0] ? (
                  <Photo photo={place.photos[0]} className="home-card-photo" />
                ) : (
                  <span className="home-card-photo is-empty" aria-hidden="true">
                    <BowlSteam weight="duotone" />
                  </span>
                )}
                <div className="home-card-body">
                  <h3>
                    <NavLink href={`/?place=${place.id}`}>{keepPhrases(place.name)}</NavLink>
                  </h3>
                  {place.dishes && <p className="home-card-dishes">{keepPhrases(place.dishes)}</p>}
                  {by && <p className="home-vouch">{keepPhrases(`${by.name} จาก${by.hometown} บอกว่าเหมือนบ้าน`)}</p>}
                  {place.price && (
                    <p className="home-card-price">
                      <PriceFigure price={place.price} />
                    </p>
                  )}
                </div>
              </article>
            </li>
          ))}
        </ul>
      ) : (
        // Nobody has found one yet: ask someone from there (Q14)
        <div className="home-empty">
          <p>{keepPhrases(`ยังไม่มีร้านอาหาร${current.region}`)}</p>
          <NavLink href="/notes/new?line=food" className="home-empty-cta">
            <PencilSimpleLine weight="bold" aria-hidden="true" /> {keepPhrases("บอกร้านที่รู้จัก")}
          </NavLink>
        </div>
      )}
    </section>
  );
}

/** The way in from /guides; once a Newcomer has picked a region, it names that region */
export function HomeTasteLink({ counts }: { counts: Partial<Record<Region, number>> }) {
  const { region } = useHomeRegion();
  const count = region && (counts[region] ?? 0);
  const line = !region ? "กับข้าวรสบ้านเรา แถวจุฬาฯ" : count ? `ร้านอาหาร${region} ${count} ร้าน` : `ยังไม่มีร้านอาหาร${region}`;
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
