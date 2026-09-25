import type { Metadata } from "next";
import Link from "next/link";
import { BowlSteam } from "@phosphor-icons/react/dist/ssr";
import { categories } from "@/content/categories";
import { GuideBlock } from "@/components/GuideBlock";
import { CategoryIcon } from "@/components/icons";
import { PageHead } from "@/components/PageHead";
import { type Content, getContent, guidesIn } from "@/lib/content";

export const metadata: Metadata = { title: "วิธี | ตั้งหลัก" };

// Every Guide on one page, grouped by line (docs/adr/0006). Places live on the map.
export default async function GuidesPage() {
  const content = await getContent();
  return (
    <>
      <PageHead title="วิธี" lede="ทำเรื่องที่เคยมีคนทำให้ ด้วยตัวเอง ทีละขั้น">
        <nav className="line-filters" aria-label="ไปที่สาย">
          {categories.map((c) => (
            <a key={c.id} href={`#${c.id}`} className="line-chip" data-line={c.id}>
              <CategoryIcon id={c.id} />
              {c.name}
            </a>
          ))}
        </nav>
      </PageHead>
      {categories.map((c) => {
        const guides = guidesIn(content, c.id);
        return (
          <section key={c.id} id={c.id} className="guides-line" data-line={c.id}>
            <h2 className="line-head">
              <span className="inner">
                <CategoryIcon id={c.id} /> {c.name}
              </span>
            </h2>
            <div className="guides inner">
              <p className="guide-intro">{c.blurb}</p>
              {guides.some((g) => !g.checked) && (
                <p className="status-note">วิธีที่มีป้าย &ldquo;ร่าง&rdquo; ยังไม่มีใครลองทำจริง</p>
              )}
              {guides.map((g) => (
                <GuideBlock key={g.id} guide={g} />
              ))}
              {c.id === "food" && <HomeTaste content={content} />}
            </div>
          </section>
        );
      })}
    </>
  );
}

function HomeTaste({ content }: { content: Content }) {
  if (!content.homeTaste.length) return null;
  return (
    <section className="guide home-taste-list" id="home-taste">
      <h3>
        <span className="guide-icon">
          <BowlSteam weight="bold" aria-hidden="true" />
        </span>
        <span>รสชาติบ้าน</span>
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
