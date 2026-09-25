import type { Metadata } from "next";
import { categories } from "@/content/categories";
import { PageHead } from "@/components/PageHead";
import { getContent } from "@/lib/content";
import { provincesByRegion } from "@/lib/provinces";
import { sheetConfigured } from "@/lib/sheet";
import { NoteForm } from "./NoteForm";

export const metadata: Metadata = { title: "เขียนโน้ต | ตั้งหลัก" };

type Props = { searchParams: Promise<{ place?: string }> };

export default async function NewNotePage({ searchParams }: Props) {
  const { place } = await searchParams;
  const content = await getContent();
  return (
    <>
      <PageHead title="เขียนโน้ต" lede="สิ่งที่อยากให้คนมาใหม่รู้ สั้นๆ ในคำพูดของเราเอง" />
      <div className="inner">
        {!sheetConfigured() && (
          <p className="form-status is-error">ยังไม่ได้ต่อ Google Sheet (ตั้งค่า SHEET_API_URL) โน้ตจะยังบันทึกไม่ได้</p>
        )}
        <NoteForm
          lines={categories.map((c) => ({ id: c.id, name: c.name }))}
          places={content.places.map((p) => ({ id: p.id, name: p.name, category: p.category }))}
          provinces={provincesByRegion}
          initialPlace={content.places.some((p) => p.id === place) ? place : undefined}
        />
      </div>
    </>
  );
}
