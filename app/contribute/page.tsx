import type { Metadata } from "next";
import { categories } from "@/content/categories";
import { getContent } from "@/lib/content";
import { provincesByRegion } from "@/lib/provinces";
import { sheetConfigured } from "@/lib/sheet";
import { PageHead } from "@/components/PageHead";
import { ContributeForms } from "./ContributeForms";

export const metadata: Metadata = { title: "ช่วยเติมข้อมูล | ตั้งหลัก" };

type Props = { searchParams: Promise<{ place?: string }> };

export default async function ContributePage({ searchParams }: Props) {
  const { place } = await searchParams;
  const content = await getContent();
  // Once every Guide is confirmed, the confirm form has nothing left to do (UX audit 7, U11).
  const guidesToConfirm = content.guides.some((g) => !g.checked);
  return (
    <>
      <PageHead title="ช่วยเติมข้อมูล" lede="กดบันทึกแล้วขึ้นเว็บเลย เลือกเรื่องที่จะเติม">
        {/* Several forms on one long page: jump straight to the one you came for */}
        <nav className="jump-links" aria-label="ไปที่ฟอร์ม">
          <a href="#price">ตรวจราคา</a>
          <a href="#senior">เรื่องปีแรกของรุ่นพี่</a>
          {guidesToConfirm && <a href="#guide">ลองทำตามวิธีแล้ว</a>}
        </nav>
      </PageHead>
      <div className="inner">
      {!sheetConfigured() && (
        <p className="form-status is-error">ยังไม่ได้ต่อ Google Sheet (ตั้งค่า SHEET_API_URL) ฟอร์มจะยังบันทึกไม่ได้</p>
      )}
      <ContributeForms
        lines={categories.map((c) => ({ id: c.id, name: c.name }))}
        places={content.places.map((p) => ({ id: p.id, name: p.name, category: p.category, per: p.price?.per }))}
        guides={guidesToConfirm ? content.guides.map((g) => ({ id: g.id, title: g.title, category: g.category, checked: g.checked })) : []}
        provinces={provincesByRegion}
        initialPlace={content.places.some((p) => p.id === place) ? place : undefined}
      />
      </div>
    </>
  );
}
