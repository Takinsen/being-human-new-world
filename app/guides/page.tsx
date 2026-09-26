import type { Metadata } from "next";
import Link from "next/link";
import { BowlSteam, CaretRight } from "@phosphor-icons/react/dist/ssr";
import { categories } from "@/content/categories";
import { CategoryIcon, IconFor } from "@/components/icons";
import { PageHead } from "@/components/PageHead";
import { type Content, getContent, guidesIn } from "@/lib/content";
import { OldGuideLinks } from "./OldGuideLinks";

export const metadata: Metadata = { title: "วิธี | ตั้งหลัก" };

// Every Guide as one line, grouped by category; the steps are on /guides/<id> (docs/adr/0006).
export default async function GuidesPage() {
  const content = await getContent();
  return (
    <>
      <OldGuideLinks ids={content.guides.map((g) => g.id)} />
      <PageHead title="วิธี" lede="ทำเรื่องที่เคยมีคนทำให้ ด้วยตัวเอง ทีละขั้น">
        <nav className="line-filters" aria-label="ไปที่หมวด">
          {categories.map((c) => (
            <a key={c.id} href={`#${c.id}`} className="line-chip" data-line={c.id}>
              <CategoryIcon id={c.id} />
              {c.name}
            </a>
          ))}
        </nav>
      </PageHead>
      {categories.map((c) => (
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
                  <Link href={`/guides/${g.id}`}>
                    <span className="guide-icon">
                      <IconFor name={g.icon} />
                    </span>
                    <span>
                      <b>{g.title}</b>
                      <small>{g.summary}</small>
                    </span>
                    <CaretRight weight="bold" aria-hidden="true" />
                  </Link>
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
      <p className="guide-intro">ร้านอาหารภาคต่างๆ แถวจุฬาฯ ที่คนจากภาคนั้นบอกว่าใช่ หรือที่ทีมหามาให้ลอง</p>
      <ul className="options">
        {content.homeTaste.map(({ place, region, by }) => (
          <li key={region}>
            <span>
              <b>อาหาร{region}</b> <Link href={`/?place=${place.id}`}>{place.name}</Link>
              <small>{by ? ` ${by.name} บ้านอยู่${by.hometown} แนะนำ` : " ทีมหามาให้ลอง"}</small>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
