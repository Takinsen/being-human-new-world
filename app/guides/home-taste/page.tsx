import type { Metadata } from "next";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { HomeTaste, type HomeTasteData } from "@/components/HomeTaste";
import { NavLink } from "@/components/NavLink";
import { PageHead } from "@/components/PageHead";
import { regions } from "@/content/regions";
import { getContent } from "@/lib/content";

export const metadata: Metadata = { title: "รสชาติบ้าน | ตั้งหลัก" };

// Home Taste on its own page, under the Guides tab (.scratch/more-know-how/spec.md Q22).
export default async function HomeTastePage() {
  const content = await getContent();
  const data: HomeTasteData = content.homeTaste.map(({ region, picks }) => ({
    region,
    dishes: regions.find((r) => r.id === region)?.dishes ?? "",
    picks: picks.map(({ place, by }) => ({ place, by: by && { name: by.name, hometown: by.hometown } })),
  }));
  return (
    <div className="home-taste-page" data-line="food">
      <PageHead
        title="รสชาติบ้าน"
        lede="คิดถึงกับข้าวที่บ้าน ร้านแถวนี้ที่คนจากภาคนั้นบอกว่าใช่ บางร้านทีมหามาให้ลองไปก่อน"
        back={
          <NavLink href="/guides#food" className="back-link">
            <ArrowLeft weight="bold" aria-hidden="true" /> คู่มือทั้งหมด
          </NavLink>
        }
      />
      <div className="inner">
        <HomeTaste regions={data} />
      </div>
    </div>
  );
}
