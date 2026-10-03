import type { Metadata } from "next";
import { NavLink } from "@/components/NavLink";
import { BowlSteam } from "@phosphor-icons/react/dist/ssr";
import { placeCategories } from "@/content/categories";
import { BrandLogo, CategoryIcon, IconFor } from "@/components/icons";
import { PageHead } from "@/components/PageHead";
import { FlyingName } from "@/components/PageMotion";
import { type Content, getContent, guidesIn } from "@/lib/content";
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
            <ul className="guide-list">
              {guidesIn(content, c.id).map((g) => (
                <li key={g.id}>
                  <NavLink href={`/guides/${g.id}`}>
                    <span className="guide-icon">
                      <BrandLogo brand={g.brand} fallback={<IconFor name={g.icon} />} />
                    </span>
                    <span>
                      <b>
                        <FlyingName name={`guide-title-${g.id}`}>{g.title}</FlyingName>
                      </b>
                      <small>{g.summary}</small>
                    </span>
                  </NavLink>
                </li>
              ))}
            </ul>
            {c.id === "food" && <HomeTaste content={content} />}
          </div>
        </section>
      ))}
    </>
  );
}

function HomeTaste({ content }: { content: Content }) {
  if (!content.homeTaste.length) return null;
  return (
    <section className="home-taste-list" id="home-taste">
      <h3>
        <span className="guide-icon">
          <BowlSteam weight="bold" aria-hidden="true" />
        </span>
        รสชาติบ้าน
      </h3>
      <p className="guide-intro">คิดถึงกับข้าวที่บ้าน ร้านพวกนี้คนจากภาคนั้นบอกว่าใช่ บางร้านทีมหามาให้ลองไปก่อน</p>
      <ul className="options">
        {content.homeTaste.map(({ place, region, by }) => (
          <li key={region}>
            <span>
              <b>อาหาร{region}</b> <NavLink href={`/?place=${place.id}`}>{place.name}</NavLink>
              <small>{by ? ` ${by.name} บ้านอยู่${by.hometown} แนะนำ` : " ทีมหามาให้ลอง"}</small>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
