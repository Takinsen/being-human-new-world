import type { Metadata } from "next";
import { Checklist } from "@/components/Checklist";

export const metadata: Metadata = { title: "สัปดาห์แรก · ตั้งหลัก" };

export default function ChecklistPage() {
  return (
    <>
      <header className="page-head">
        <h1>สัปดาห์แรก</h1>
        <p className="lede">
          เรียงตามลำดับที่ต้องใช้จริง ติ๊กได้เลยเมื่อทำแล้ว ข้อมูลเก็บไว้ในเครื่องนี้เท่านั้น ไม่ต้องสมัครสมาชิก
        </p>
      </header>
      <Checklist />
    </>
  );
}
