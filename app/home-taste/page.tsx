// PROTOTYPE (home-taste), throwaway: Home Taste on its own page (?at=page, spec Q13 b).
import type { Metadata } from "next";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { NavLink } from "@/components/NavLink";
import { PageHead } from "@/components/PageHead";
import { HomeTaste } from "@/components/prototype/HomeTasteVariants";
import { homeTasteRegions } from "@/components/prototype/homeTasteData";
import { getContent } from "@/lib/content";

export const metadata: Metadata = { title: "รสชาติบ้าน | ตั้งหลัก" };

export default async function HomeTastePage() {
  const content = await getContent();
  return (
    <div data-line="food">
      <PageHead
        title="รสชาติบ้าน"
        lede="คิดถึงกับข้าวที่บ้าน ร้านพวกนี้คนจากภาคนั้นบอกว่าใช่ บางร้านทีมหามาให้ลองไปก่อน"
        back={
          <NavLink href="/guides#food" className="back-link">
            <ArrowLeft weight="bold" aria-hidden="true" /> คู่มือ ของกิน
          </NavLink>
        }
      />
      <div className="inner">
        <HomeTaste regions={homeTasteRegions(content)} onPage />
      </div>
    </div>
  );
}
