import type { Metadata } from "next";
import { helpLinks } from "@/content/help";
import { seniors } from "@/content/seniors";
import { SeniorStory } from "@/components/SeniorStory";

export const metadata: Metadata = { title: "รุ่นพี่ · ตั้งหลัก" };

export default function SeniorsPage() {
  return (
    <>
      <header className="page-head">
        <h1>รุ่นพี่ก็เคยมาใหม่</h1>
        <p className="lede">ปีแรกของทุกคนมีช่วงที่ยาก เหงา หรือหลง ไม่ได้แปลว่าเราปรับตัวไม่เก่ง</p>
      </header>
      <div className="stories">
        {seniors.map((s) => (
          <SeniorStory key={s.id} senior={s} />
        ))}
      </div>
      <section className="help">
        <h2>ถ้าหนักเกินไป คุยกับคนได้</h2>
        <ul>
          {helpLinks.map((h) => (
            <li key={h.name}>
              <h3>{h.name}</h3>
              <p>{h.what}</p>
              {h.contact &&
                (h.href ? (
                  <a href={h.href} className="help-contact">
                    {h.contact}
                  </a>
                ) : (
                  <span className="help-contact">{h.contact}</span>
                ))}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
