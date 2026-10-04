import type { Metadata } from "next";
import { Feed, type FeedQuery } from "../Feed";

export const metadata: Metadata = { title: "โน้ต | ตั้งหลัก" };

// /notes with a query lands here (next.config.ts); the address bar still says /notes?…
export default async function FilteredNotesPage({ searchParams }: { searchParams: Promise<FeedQuery> }) {
  return <Feed {...await searchParams} />;
}
