import type { Metadata } from "next";
import { Wordmark } from "@/components/PageHead";
import { WeekRoute } from "@/components/WeekRoute";

export const metadata: Metadata = { title: "สัปดาห์แรก | ตั้งหลัก" };

export default function ChecklistPage() {
  return (
    <div className="inner page">
      <Wordmark />
      <WeekRoute heading="h1" />
      <p className="fine-print">
        เรียงตามลำดับที่ต้องใช้จริง ข้อมูลเก็บไว้ในเครื่องนี้เท่านั้น ไม่ต้องสมัครสมาชิก
      </p>
    </div>
  );
}
