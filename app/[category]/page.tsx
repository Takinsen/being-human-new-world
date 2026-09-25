import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, getCategory } from "@/content/categories";
import { guidesIn } from "@/content/guides";
import { placesIn } from "@/content/places";
import { seniors } from "@/content/seniors";
import { GuideBlock } from "@/components/GuideBlock";
import { PlaceCard } from "@/components/PlaceCard";
import { PlaceMap } from "@/components/PlaceMap";

type Props = { params: Promise<{ category: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = getCategory((await params).category);
  return { title: category ? `${category.name} · ตั้งหลัก` : "ตั้งหลัก" };
}

export default async function CategoryPage({ params }: Props) {
  const category = getCategory((await params).category);
  if (!category) notFound();

  const places = placesIn(category.id);
  const guides = guidesIn(category.id);

  return (
    <>
      <header className="page-head">
        <h1>{category.name}</h1>
        <p className="lede">{category.blurb}</p>
      </header>

      {places.length > 0 && (
        <section aria-label="ที่ต่างๆ">
          <PlaceMap places={places} />
          <div className="places">
            {places.map((p, i) => (
              <PlaceCard key={p.id} place={p} number={i + 1} />
            ))}
          </div>
        </section>
      )}

      {category.id === "food" && <HomeTaste />}

      {guides.length > 0 && (
        <section className="guides">
          <h2>วิธี</h2>
          {guides.map((g) => (
            <GuideBlock key={g.id} guide={g} />
          ))}
        </section>
      )}
    </>
  );
}

function HomeTaste() {
  const vouched = placesIn("food").filter((p) => p.homeTaste);
  return (
    <section className="home-taste">
      <h2>รสชาติบ้าน</h2>
      <p>ร้านอาหารภาคต่างๆ แถวจุฬาฯ ที่รุ่นพี่จากภาคนั้นกินแล้วบอกว่าใช่</p>
      <ul>
        {seniors.map((s) => {
          const place = vouched.find((p) => p.homeTaste === s.region && p.senior?.id === s.id);
          return (
            <li key={s.id}>
              <span className="region">อาหาร{s.region}</span>
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
    </section>
  );
}
