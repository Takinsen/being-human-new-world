import Link from "next/link";
import { categories } from "@/content/categories";
import { seniors } from "@/content/seniors";
import { ChecklistProgress } from "@/components/Checklist";

export default function Home() {
  return (
    <>
      <section className="hero">
        <h1>
          บ้านยังเป็นบ้าน
          <br />
          ที่นี่คือที่ตั้งหลัก
        </h1>
        <p className="lede">
          เพิ่งย้ายมาอยู่แถวจุฬาฯ? นี่คือเรื่องที่แผนที่ไม่ได้บอก ค่ารถเท่าไหร่ถึงปกติ ข้าวจานละเท่าไหร่ ซักผ้ายังไง
          จากรุ่นพี่ที่เคยมาใหม่เหมือนกัน
        </p>
        <ChecklistProgress />
      </section>

      <section className="categories" aria-label="หมวด">
        {categories.map((c) => (
          <Link key={c.id} href={`/${c.id}`} className={`category category-${c.id}`}>
            <h2>{c.name}</h2>
            <p>{c.blurb}</p>
          </Link>
        ))}
      </section>

      <section className="seniors-teaser">
        <h2>รุ่นพี่ก็เคยมาใหม่</h2>
        {seniors.map((s) => (
          <Link key={s.id} href={`/seniors#${s.id}`} className="teaser">
            <p className="handwriting">&ldquo;{s.story[0]}&rdquo;</p>
            <p className="teaser-from">
              {s.name} บ้านอยู่{s.hometown}
            </p>
          </Link>
        ))}
      </section>
    </>
  );
}
