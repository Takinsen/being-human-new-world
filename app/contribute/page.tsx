import type { Metadata } from "next";
import { placeCategories } from "@/content/categories";
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
      <PageHead title="ช่วยเติมข้อมูล" lede="รู้อะไรที่เว็บยังไม่มี เติมตรงนี้ได้ กดส่งแล้วขึ้นเลย" />
      <div className="inner">
      {!sheetConfigured() && (
        <p className="form-status is-error">ยังไม่ได้ต่อ Google Sheet ต้องตั้ง SHEET_API_URL ก่อน ตอนนี้กดส่งยังไม่ขึ้น</p>
      )}
      <ContributeForms
        // Places and Guides only: Adjusting has neither (docs/adr/0008)
        lines={placeCategories.map((c) => ({ id: c.id, name: c.name }))}
        places={content.places.map((p) => ({ id: p.id, name: p.name, category: p.category, per: p.price?.per }))}
        guides={guidesToConfirm ? content.guides.map((g) => ({ id: g.id, title: g.title, category: g.category, checked: g.checked })) : []}
        provinces={provincesByRegion}
        initialPlace={content.places.some((p) => p.id === place) ? place : undefined}
      />
      </div>
    </>
  );
}
