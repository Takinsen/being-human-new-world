import type { Metadata } from "next";
import { PageHead } from "@/components/PageHead";
import { WeekRoute } from "@/components/WeekRoute";

export const metadata: Metadata = { title: "สัปดาห์แรก | ตั้งหลัก" };

export default function ChecklistPage() {
  return (
    <>
      <PageHead title="สัปดาห์แรก" />
      <div className="inner">
        <WeekRoute />
      </div>
    </>
  );
}
