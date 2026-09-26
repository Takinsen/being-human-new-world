import type { Metadata } from "next";
import { categories } from "@/content/categories";
import { getContent } from "@/lib/content";
import { sheetConfigured } from "@/lib/sheet";
import { PageHead } from "@/components/PageHead";
import { ContributeForms } from "./ContributeForms";

export const metadata: Metadata = { title: "ช่วยเติมข้อมูล | ตั้งหลัก" };

export default async function ContributePage() {
  const content = await getContent();
  return (
    <>
      <PageHead title="ช่วยเติมข้อมูล" lede="ตรวจราคา เล่าเรื่องปีแรก หรือบอกว่าลองทำตามวิธีแล้ว กดบันทึกแล้วขึ้นเว็บเลย" />
      <div className="inner">
      {!sheetConfigured() && (
        <p className="form-status is-error">ยังไม่ได้ต่อ Google Sheet (ตั้งค่า SHEET_API_URL) ฟอร์มจะยังบันทึกไม่ได้</p>
      )}
      <ContributeForms
        lines={categories.map((c) => ({ id: c.id, name: c.name }))}
        places={content.places.map((p) => ({ id: p.id, name: p.name, category: p.category, per: p.price?.per }))}
        guides={content.guides.map((g) => ({ id: g.id, title: g.title, category: g.category, checked: g.checked }))}
      />
      </div>
    </>
  );
}
