import type { Metadata } from "next";
import { NavLink } from "@/components/NavLink";
import { placeCategories } from "@/content/categories";
import { BrandLogo, CategoryIcon, IconFor } from "@/components/icons";
import { PageHead } from "@/components/PageHead";
import { FlyingName } from "@/components/PageMotion";
import { HomeTasteLink } from "@/components/HomeTaste";
import { getContent, guidesIn } from "@/lib/content";
import { keepPhrases } from "@/lib/thaiBreaks";
import { OldGuideLinks } from "./OldGuideLinks";

export const metadata: Metadata = { title: "คู่มือ | ตั้งหลัก" };

// Every Guide as one line, grouped by category; the steps are on /guides/<id> (docs/adr/0006).
// Adjusting has no Guides, so it has no section here (docs/adr/0008).
export default async function GuidesPage() {
  const content = await getContent();
  return (
    <>
      <OldGuideLinks ids={content.guides.map((g) => g.id)} />
      <PageHead title="คู่มือ" lede="ตอนอยู่บ้านมีคนทำให้ มาอยู่นี่ต้องทำเอง พี่ๆ เขียนคู่มือไว้ให้แล้ว">
        <nav className="line-filters" aria-label="ไปที่หมวด">
          {placeCategories.map((c) => (
            <a key={c.id} href={`#${c.id}`} className="line-chip" data-line={c.id}>
              <CategoryIcon id={c.id} />
              {c.name}
            </a>
          ))}
        </nav>
      </PageHead>
      {placeCategories.map((c) => (
        <section key={c.id} id={c.id} className="guides-line" data-line={c.id}>
          <h2 className="line-head">
            <span className="inner">
              <CategoryIcon id={c.id} /> {c.name}
            </span>
          </h2>
          <div className="inner">
            {c.id === "food" && (
              <HomeTasteLink counts={Object.fromEntries(content.homeTaste.map((r) => [r.region, r.picks.length]))} />
            )}
            <ul className="guide-list">
              {guidesIn(content, c.id).map((g) => (
                <li key={g.id}>
                  <NavLink href={`/guides/${g.id}`}>
                    <span className="guide-icon">
                      <BrandLogo brand={g.brand} fallback={<IconFor name={g.icon} />} />
                    </span>
                    <span>
                      <b>
                        <FlyingName name={`guide-title-${g.id}`}>{keepPhrases(g.title)}</FlyingName>
                      </b>
                      <small>{keepPhrases(g.summary)}</small>
                    </span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}
    </>
  );
}
