import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, PencilSimpleLine } from "@phosphor-icons/react/dist/ssr";
import { categories } from "@/content/categories";
import { CategoryIcon } from "@/components/icons";
import { NoteCard } from "@/components/NoteCard";
import { PageHead } from "@/components/PageHead";
import { getContent, isCategory } from "@/lib/content";

export const metadata: Metadata = { title: "โน้ต | ตั้งหลัก" };

type Props = { searchParams: Promise<{ line?: string; place?: string }> };

// The Feed: every Note, newest first, filterable by line (CONTEXT.md).
export default async function NotesPage({ searchParams }: Props) {
  const { line, place: placeId } = await searchParams;
  const content = await getContent();
  const place = placeId ? content.places.find((p) => p.id === placeId) : undefined;
  const active = line && isCategory(line) ? line : undefined;
  const notes = content.notes.filter((n) => (place ? n.placeId === place.id : !active || n.category === active));
  const placeName = (id?: string) => content.places.find((p) => p.id === id)?.name;

  return (
    <>
      <PageHead title="โน้ต" lede="เรื่องสั้นๆ ที่คนแถวนี้อยากบอกคนมาใหม่">
        <div className="head-actions">
          <Link href={place ? `/notes/new?place=${place.id}` : "/notes/new"} className="action is-primary">
            <PencilSimpleLine weight="bold" aria-hidden="true" /> เขียนโน้ต
          </Link>
          <Link href="/seniors" className="related-link">
            อ่านเรื่องปีแรกของรุ่นพี่ <ArrowRight weight="bold" aria-hidden="true" />
          </Link>
        </div>
      </PageHead>
      <div className="inner">
        {place ? (
          <p className="feed-scope">
            โน้ตที่ <Link href={`/?place=${place.id}`}>{place.name}</Link> · <Link href="/notes">ดูโน้ตทั้งหมด</Link>
          </p>
        ) : (
          <nav className="line-filters feed-filters" aria-label="กรองตามสาย">
            <Link href="/notes" className="line-chip" data-line="general" aria-current={!active ? "page" : undefined}>
              ทั้งหมด
            </Link>
            {categories.map((c) => (
              <Link
                key={c.id}
                href={`/notes?line=${c.id}`}
                className="line-chip"
                data-line={c.id}
                aria-current={active === c.id ? "page" : undefined}
              >
                <CategoryIcon id={c.id} />
                {c.name}
              </Link>
            ))}
          </nav>
        )}
        <div className="feed">
          {notes.length === 0 && <p className="status-note">ยังไม่มีโน้ตตรงนี้ เขียนโน้ตแรกได้เลย</p>}
          {notes.map((n) => (
            <NoteCard key={n.id} note={n} placeName={place ? undefined : placeName(n.placeId)} />
          ))}
        </div>
      </div>
    </>
  );
}
