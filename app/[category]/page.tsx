import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BowlSteam, MapTrifold } from "@phosphor-icons/react/dist/ssr";
import { categories, getCategory } from "@/content/categories";
import { guidesIn } from "@/content/guides";
import { placesIn } from "@/content/places";
import { seniors } from "@/content/seniors";
import { CategoryHead } from "@/components/CategoryBand";
import { GuideBlock } from "@/components/GuideBlock";
import { PlaceStop } from "@/components/PlaceStop";
import { placeCode } from "@/lib/format";

type Props = { params: Promise<{ category: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = getCategory((await params).category);
  return { title: category ? `${category.name} | ตั้งหลัก` : "ตั้งหลัก" };
}

export default async function CategoryPage({ params }: Props) {
  const category = getCategory((await params).category);
  if (!category) notFound();

  const places = placesIn(category.id);
  const guides = guidesIn(category.id);

  return (
    <div data-line={category.id}>
      <CategoryHead category={category} />

      {places.length > 0 && (
        <section id="places" aria-labelledby="places-heading">
          <h2 id="places-heading" className="visually-hidden">
            ที่ต่างๆ บนสาย{category.name}
          </h2>
          <div className="inner places-intro">
            <Link href={`/map?line=${category.id}`} className="map-link">
              <MapTrifold weight="bold" aria-hidden="true" />
              ดูทุกที่บนสาย{category.name}ในแผนที่
            </Link>
            <p className="status-note">ราคาจะขึ้นเป็นตัวเลขเมื่อมีคนไปตรวจที่หน้าร้านหรือหน้าสถานีแล้ว พร้อมชื่อคนตรวจและเดือนที่ตรวจ</p>
          </div>
          <div className="line-stops">
            {places.map((p, i) => (
              <PlaceStop key={p.id} place={p} code={placeCode(p.category, i)} />
            ))}
          </div>
        </section>
      )}

      {category.id === "food" && <HomeTaste />}

      {guides.length > 0 && (
        <section className="guides inner">
          <h2>วิธี</h2>
          {guides.some((g) => !g.checked) && (
            <p className="status-note">วิธีที่มีป้าย &ldquo;ร่าง&rdquo; ทีมเขียนจากข้อมูลที่หาได้ ยังไม่ได้ลองทำจริง</p>
          )}
          {guides.map((g) => (
            <GuideBlock key={g.id} guide={g} />
          ))}
        </section>
      )}
    </div>
  );
}

function HomeTaste() {
  const vouched = placesIn("food").filter((p) => p.homeTaste);
  return (
    <section className="home-taste" id="home-taste">
      <div className="inner">
        <h2>
          <BowlSteam weight="bold" aria-hidden="true" /> รสชาติบ้าน
        </h2>
        <p>ร้านอาหารภาคต่างๆ แถวจุฬาฯ ที่รุ่นพี่จากภาคนั้นกินแล้วบอกว่าใช่</p>
        <ul>
          {seniors.map((s) => {
            const place = vouched.find((p) => p.homeTaste === s.region && p.senior?.id === s.id);
            return (
              <li key={s.id}>
                <b>อาหาร{s.region}</b>
                {place ? (
                  <a href={`#${place.id}`}>
                    {place.name}, {s.name}แนะนำ
                  </a>
                ) : (
                  <span className="pending">{s.name}กำลังเลือกร้านให้</span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
