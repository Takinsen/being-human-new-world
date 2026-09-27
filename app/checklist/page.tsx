import type { Metadata } from "next";
import { PageHead } from "@/components/PageHead";
import { WeekRoute } from "@/components/WeekRoute";

export const metadata: Metadata = { title: "สัปดาห์แรก | ตั้งหลัก" };

export default function ChecklistPage() {
  return (
    <>
      <PageHead title="สัปดาห์แรก" lede="กดวงกลมเมื่อทำแล้ว กดชื่อเพื่ออ่านวิธี" />
      <div className="inner">
        <WeekRoute />
        <p className="fine-print">เรียงตามลำดับที่ต้องใช้จริง ข้อมูลเก็บไว้ในเครื่องนี้เท่านั้น ไม่ต้องสมัครสมาชิก</p>
      </div>
    </>
  );
}
