import type { Metadata } from "next";
import { NavLink } from "@/components/NavLink";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { categories } from "@/content/categories";
import { PageHead } from "@/components/PageHead";
import { getContent, isCategory } from "@/lib/content";
import { provincesByRegion } from "@/lib/provinces";
import { sheetConfigured } from "@/lib/sheet";
import { NoteForm } from "./NoteForm";

export const metadata: Metadata = { title: "เขียนโน้ต | ตั้งหลัก" };

type Props = { searchParams: Promise<{ place?: string; line?: string }> };

export default async function NewNotePage({ searchParams }: Props) {
  const { place, line } = await searchParams;
  const content = await getContent();
  const from = content.places.find((p) => p.id === place);
  // Came from a filtered Feed: keep that category through the form and back (UX audit 7, U10).
  const fromLine = !from && line && isCategory(line) ? categories.find((c) => c.id === line) : undefined;
  return (
    <>
      <PageHead
        title="เขียนโน้ต"
        lede="อยากบอกอะไรน้องที่เพิ่งมา เขียนสั้นๆ เหมือนพิมพ์บอกเพื่อน"
        back={
          <NavLink href={from ? `/?place=${from.id}` : fromLine ? `/notes?line=${fromLine.id}` : "/notes"} className="back-link">
            <ArrowLeft weight="bold" aria-hidden="true" /> {from ? from.name : fromLine ? `โน้ตเรื่อง${fromLine.name}` : "โน้ต"}
          </NavLink>
        }
      />
      <div className="inner">
        {!sheetConfigured() && (
          <p className="form-status is-error">ยังไม่ได้ต่อ Google Sheet ต้องตั้ง SHEET_API_URL ก่อน ตอนนี้ส่งโน้ตยังไม่ขึ้น</p>
        )}
        <NoteForm
          lines={categories.map((c) => ({ id: c.id, name: c.name, hasPlaces: c.hasPlaces }))}
          places={content.places.map((p) => ({ id: p.id, name: p.name, category: p.category }))}
          provinces={provincesByRegion}
          initialPlace={from?.id}
          initialLine={fromLine?.id}
        />
      </div>
    </>
  );
}
