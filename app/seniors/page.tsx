import type { Metadata } from "next";
import { HandHeart } from "@phosphor-icons/react/dist/ssr";
import { helpLinks } from "@/content/help";
import { seniors } from "@/content/seniors";
import { SeniorStory } from "@/components/SeniorStory";

export const metadata: Metadata = { title: "รุ่นพี่ | ตั้งหลัก" };

export default function SeniorsPage() {
  return (
    <>
      <header className="page-head inner">
        <h1>รุ่นพี่ก็เคยมาใหม่</h1>
        <p className="lede">ปีแรกของทุกคนมีช่วงที่ยาก เหงา หรือหลง ไม่ได้แปลว่าเราปรับตัวไม่เก่ง</p>
      </header>
      <div className="inner">
        {seniors.map((s) => (
          <SeniorStory key={s.id} senior={s} />
        ))}
      </div>
      <section className="help" id="help">
        <div className="inner">
          <h2>
            <HandHeart weight="bold" aria-hidden="true" /> ถ้าหนักเกินไป คุยกับคนได้
          </h2>
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
        </div>
      </section>
    </>
  );
}
