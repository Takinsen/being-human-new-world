import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, HandHeart } from "@phosphor-icons/react/dist/ssr";
import { helpLinks } from "@/content/help";
import { PageHead } from "@/components/PageHead";
import { SeniorStory } from "@/components/SeniorStory";
import { getContent } from "@/lib/content";

export const metadata: Metadata = { title: "รุ่นพี่ | ตั้งหลัก" };

export default async function SeniorsPage() {
  const { seniors } = await getContent();
  return (
    <>
      <PageHead
        title="รุ่นพี่ก็เคยมาใหม่"
        lede="ปีแรกของทุกคนมีช่วงที่ยาก เหงา หรือหลง ไม่ได้แปลว่าเราปรับตัวไม่เก่ง"
        back={
          <Link href="/notes" className="back-link">
            <ArrowLeft weight="bold" aria-hidden="true" /> โน้ต
          </Link>
        }
      />
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
                <div className="help-contacts">
                  {h.contact &&
                    (h.href ? (
                      <a href={h.href} className="help-contact">
                        {h.contact}
                      </a>
                    ) : (
                      <span className="help-contact">{h.contact}</span>
                    ))}
                  {h.web && (
                    <a href={h.web} className="help-contact" target="_blank" rel="noreferrer">
                      {h.web.replace(/^https:\/\/|\/$/g, "")}
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
