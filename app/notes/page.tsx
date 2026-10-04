import type { Metadata } from "next";
import { Feed } from "./Feed";

export const metadata: Metadata = { title: "โน้ต | ตั้งหลัก" };

export default function NotesPage() {
  return <Feed />;
}
