import Link from "next/link";
import { categories } from "@/content/categories";
import { seniors } from "@/content/seniors";
import { CategoryBand } from "@/components/CategoryBand";
import { LineMap } from "@/components/LineMap";
import { WeekRoute } from "@/components/WeekRoute";

export default function Home() {
  return (
    <>
      <section className="hero inner">
        <h1>
          บ้านยังเป็นบ้าน
          <br />
          ที่นี่คือที่ตั้งหลัก
        </h1>
        <p className="lede">เรื่องที่แผนที่ไม่ได้บอก จากรุ่นพี่ที่เคยมาใหม่แถวจุฬาฯ</p>
        <LineMap />
      </section>

      <div className="inner">
        <WeekRoute />
      </div>

      {categories.map((c) => (
        <CategoryBand key={c.id} category={c} />
      ))}

      <section className="voices inner">
        <h2>รุ่นพี่ก็เคยมาใหม่</h2>
        {seniors.map((s) => (
          <Link key={s.id} href={`/seniors#${s.id}`} className="voice">
            <p>&ldquo;{s.story[0]}&rdquo;</p>
            <span>
              {s.name} บ้านอยู่{s.hometown}
            </span>
          </Link>
        ))}
      </section>
    </>
  );
}
