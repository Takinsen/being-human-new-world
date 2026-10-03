import type { Metadata } from "next";
import { PageHead } from "@/components/PageHead";
import { WeekRoute } from "@/components/WeekRoute";
import { keepPhrases } from "@/lib/thaiBreaks";

export const metadata: Metadata = { title: "สัปดาห์แรก | ตั้งหลัก" };

export default function ChecklistPage() {
  return (
    <>
      <PageHead title="สัปดาห์แรก" />
      <div className="inner">
        <WeekRoute />
        <p className="fine-print">{keepPhrases("เรียงตามที่ต้องใช้ก่อนหลัง ที่ติ๊กไว้จำอยู่ในเครื่องนี้ ไม่ต้องสมัครอะไร")}</p>
      </div>
    </>
  );
}
